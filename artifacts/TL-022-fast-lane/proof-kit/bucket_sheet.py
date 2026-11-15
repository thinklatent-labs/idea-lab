#!/usr/bin/env python3
"""TL-022 fast-lane proof kit: turn a folder of `vllm bench serve` result files into the bucket sheet.

Each file is named <profile>__in<input>__out<reply>__c<concurrency>__p<prefix share>.json (bench_grid.sh does this).
Output: one cell table per profile, and the bucket sheet, which takes each bucket's worst p95 inside its range,
because a promise must hold for every request in the range, not only the average one.

    python3 bucket_sheet.py results/27b-tp8-fp8-eagle3 [--buckets buckets.json] [--concurrency 8] > sheet.md
"""
import argparse
import json
import re
import sys
from pathlib import Path

NAME = re.compile(r"^(?P<profile>.+)__in(?P<inp>\d+)__out(?P<out>\d+)__c(?P<conc>\d+)__p(?P<share>\d+)\.json$")

# Draft buckets (TL-022 serving design, section 2). Ranges are inclusive; edit or pass --buckets.
DEFAULT_BUCKETS = [
    {"name": "Quick", "input": [0, 4000], "reply": [0, 64]},
    {"name": "Answer", "input": [0, 4000], "reply": [65, 300]},
    {"name": "Long-read", "input": [4001, 12000], "reply": [0, 300]},
    {"name": "Long-write", "input": [0, 12000], "reply": [301, 1000]},
]


def pick(d, *keys):
    """First key present in the result JSON (key names have shifted a little across vLLM versions)."""
    for k in keys:
        if k in d and d[k] is not None:
            return float(d[k])
    return None


def load(folder):
    rows = []
    for f in sorted(Path(folder).glob("*.json")):
        m = NAME.match(f.name)
        if not m:
            continue
        d = json.loads(f.read_text())
        tpot = pick(d, "mean_tpot_ms", "median_tpot_ms")
        completed = pick(d, "completed") or 0
        goodput = pick(d, "request_goodput", "request_goodput:")
        throughput = pick(d, "request_throughput")
        rows.append({
            "profile": m["profile"], "inp": int(m["inp"]), "out": int(m["out"]),
            "conc": int(m["conc"]), "share": int(m["share"]),
            "ttft_p95": pick(d, "p95_ttft_ms"), "e2e_p50": pick(d, "p50_e2el_ms", "median_e2el_ms"),
            "e2e_p95": pick(d, "p95_e2el_ms"), "e2e_p99": pick(d, "p99_e2el_ms"),
            "tok_s": (1000.0 / tpot) if tpot else None,
            "req_s": throughput,
            "good_share": (goodput / throughput) if goodput is not None and throughput else None,
            "completed": int(completed),
        })
    return rows


def fmt(v, unit=""):
    return "n/a" if v is None else f"{v:,.0f}{unit}"


def cell_table(rows, conc, share):
    sel = [r for r in rows if r["conc"] == conc and r["share"] == share]
    if not sel:
        return f"_No results at {conc} in flight and {share}% prefix share._\n"
    ins = sorted({r["inp"] for r in sel})
    outs = sorted({r["out"] for r in sel})
    by = {(r["inp"], r["out"]): r for r in sel}
    lines = [f"p95 end-to-end ms at {conc} in flight, {share}% prefix share (tok/s per request in brackets)", "",
             "| Input \\ reply | " + " | ".join(str(o) for o in outs) + " |",
             "|---" * (len(outs) + 1) + "|"]
    for i in ins:
        cells = []
        for o in outs:
            r = by.get((i, o))
            cells.append("—" if not r else f"{fmt(r['e2e_p95'])} ({fmt(r['tok_s'])})")
        lines.append(f"| {i:,} | " + " | ".join(cells) + " |")
    return "\n".join(lines) + "\n"


def bucket_sheet(rows, buckets, conc, share):
    lines = [f"Bucket sheet at {conc} in flight per replica, {share}% prefix share", "",
             "| Bucket | Input range | Reply range | p95 end-to-end at the range edge | p95 first token | Slowest tok/s per request | Cells measured |",
             "|---|---|---|---|---|---|---|"]
    for b in buckets:
        sel = [r for r in rows if r["conc"] == conc and r["share"] == share
               and b["input"][0] <= r["inp"] <= b["input"][1] and b["reply"][0] <= r["out"] <= b["reply"][1]]
        if not sel:
            lines.append(f"| {b['name']} | {b['input'][0]:,}–{b['input'][1]:,} | {b['reply'][0]}–{b['reply'][1]} | not measured | | | 0 |")
            continue
        worst = max((r for r in sel if r["e2e_p95"] is not None), key=lambda r: r["e2e_p95"], default=None)
        ttft = max((r["ttft_p95"] for r in sel if r["ttft_p95"] is not None), default=None)
        slow = min((r["tok_s"] for r in sel if r["tok_s"] is not None and r["out"] > 1), default=None)
        edge = f"{fmt(worst['e2e_p95'], ' ms')} (at {worst['inp']:,} in / {worst['out']} out)" if worst else "n/a"
        lines.append(f"| {b['name']} | {b['input'][0]:,}–{b['input'][1]:,} | {b['reply'][0]}–{b['reply'][1]} | {edge} | {fmt(ttft, ' ms')} | {fmt(slow)} | {len(sel)} |")
    lines.append("")
    lines.append("Publish each bucket's promise as its measured edge p95 plus a margin; size its pool from its mean shape.")
    return "\n".join(lines) + "\n"


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("folder")
    ap.add_argument("--buckets", help="JSON file with a list of {name, input:[lo,hi], reply:[lo,hi]}")
    ap.add_argument("--concurrency", type=int, default=8)
    ap.add_argument("--share", type=int, default=0)
    a = ap.parse_args()
    rows = load(a.folder)
    if not rows:
        sys.exit(f"no result files named <profile>__in<n>__out<n>__c<n>__p<n>.json in {a.folder}")
    buckets = json.loads(Path(a.buckets).read_text()) if a.buckets else DEFAULT_BUCKETS
    for profile in sorted({r["profile"] for r in rows}):
        pr = [r for r in rows if r["profile"] == profile]
        print(f"## {profile}\n")
        print(bucket_sheet(pr, buckets, a.concurrency, a.share))
        print(cell_table(pr, a.concurrency, a.share))
        low = [r for r in pr if r["good_share"] is not None and r["good_share"] < 0.95]
        if low:
            print(f"Cells where under 95% of requests met the goodput threshold: {len(low)}\n")


if __name__ == "__main__":
    main()
