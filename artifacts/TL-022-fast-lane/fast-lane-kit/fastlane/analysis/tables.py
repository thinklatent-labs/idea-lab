"""Read stage outputs into flat rows; build the bucket sheet; write CSV tables."""

from __future__ import annotations

import csv
from pathlib import Path

from fastlane.util import read_json

CELL_FIELDS = [
    "stage", "profile", "drafter", "temperature", "L", "out", "concurrency", "prefix_share",
    "requests", "ok", "errors", "measured", "prompt_tokens_mean", "completion_tokens_mean",
    "ttft_p50_ms", "ttft_p95_ms", "e2e_p50_ms", "e2e_p95_ms", "e2e_p99_ms",
    "decode_tps_p50", "decode_tps_p05", "tokens_per_chunk_p50", "tau", "acceptance_rate",
    "output_tps_total", "input_tps_total", "prefix_hit_rate", "identical_to_baseline", "key",
]


def stage_rows(run_dir: Path, stage: str) -> list[dict]:
    d = Path(run_dir) / "stages" / stage
    if not d.exists():
        return []
    rows = []
    for p in sorted(d.glob("*.json")):
        if p.name.startswith(("FAILED__", "SERVER__")) or p.name.endswith(".requests.json"):
            continue
        r = read_json(p)
        if isinstance(r, dict) and "ttft" in r:
            rows.append(r)
    return rows


def failures(run_dir: Path, stage: str) -> list[dict]:
    d = Path(run_dir) / "stages" / stage
    return [read_json(p) for p in sorted(d.glob("FAILED__*.json"))] if d.exists() else []


def servers(run_dir: Path, stage: str) -> list[dict]:
    d = Path(run_dir) / "stages" / stage
    return [read_json(p) for p in sorted(d.glob("SERVER__*.json"))] if d.exists() else []


def _ms(v):
    return None if v is None else v * 1000.0


def flat(r: dict) -> dict:
    ttft, e2e, dec, tpc = r.get("ttft") or {}, r.get("e2e") or {}, r.get("decode_tps") or {}, r.get("tokens_per_chunk") or {}
    spec, pre = r.get("spec") or {}, r.get("prefix") or {}
    return {
        "stage": r.get("stage"), "profile": r.get("profile"), "drafter": r.get("drafter"),
        "temperature": r.get("temperature"), "L": r.get("L"), "out": r.get("out"),
        "concurrency": r.get("concurrency"), "prefix_share": r.get("prefix_share", 0.0),
        "requests": r.get("requests"), "ok": r.get("ok"), "errors": r.get("errors"), "measured": r.get("measured"),
        "prompt_tokens_mean": r.get("prompt_tokens_mean"), "completion_tokens_mean": r.get("completion_tokens_mean"),
        "ttft_p50_ms": _ms(ttft.get("p50")), "ttft_p95_ms": _ms(ttft.get("p95")),
        "e2e_p50_ms": _ms(e2e.get("p50")), "e2e_p95_ms": _ms(e2e.get("p95")), "e2e_p99_ms": _ms(e2e.get("p99")),
        "decode_tps_p50": dec.get("p50"), "decode_tps_p05": dec.get("min") if dec.get("n", 0) < 20 else None,
        "tokens_per_chunk_p50": tpc.get("p50"), "tau": spec.get("tau"), "acceptance_rate": spec.get("acceptance_rate"),
        "output_tps_total": r.get("output_tps_total"), "input_tps_total": r.get("input_tps_total"),
        "prefix_hit_rate": pre.get("hit_rate"), "identical_to_baseline": r.get("identical_to_baseline"),
        "key": r.get("key"),
    }


def write_csv(path: Path, rows: list[dict], fields: list[str] | None = None) -> None:
    if not rows:
        return
    fields = fields or list(rows[0].keys())
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
        w.writeheader()
        for r in rows:
            w.writerow({k: _fmt(r.get(k)) for k in fields})


def _fmt(v):
    if isinstance(v, float):
        return f"{v:.4g}" if abs(v) < 1000 else f"{v:.1f}"
    return v


def find(rows: list[dict], **kw) -> list[dict]:
    out = []
    for r in rows:
        if all(r.get(k) == v for k, v in kw.items()):
            out.append(r)
    return out


def bucket_sheet(rows: list[dict], buckets: list[dict], *, profile: str, concurrency: int, margin: float) -> list[dict]:
    """For each fast bucket: the measured worst case at the range's edge, plus margin.

    Edge = the largest measured prompt length and reply length inside the
    bucket's range, at the promise concurrency (or the nearest measured level
    at or below it). The promise is p95 x (1 + margin)."""
    prof_rows = [r for r in rows if r.get("profile") == profile and not r.get("prefix_share")]
    out = []
    for b in buckets:
        if "fast" not in b.get("classes", []):
            continue
        Ls = sorted({r["L"] for r in prof_rows if b["prompt"][0] <= r["L"] <= b["prompt"][1]})
        outs = sorted({r["out"] for r in prof_rows if b["reply"][0] <= r["out"] <= b["reply"][1]})
        if not Ls or not outs:
            out.append({"bucket": b["name"], "profile": profile, "measured": False})
            continue
        L, o = Ls[-1], outs[-1]
        cands = [r for r in prof_rows if r["L"] == L and r["out"] == o]
        levels = sorted({r["concurrency"] for r in cands})
        use = [c for c in levels if c <= concurrency]
        c = use[-1] if use else levels[0]
        r = next(r for r in cands if r["concurrency"] == c)
        e2e, ttft, dec = r.get("e2e") or {}, r.get("ttft") or {}, r.get("decode_tps") or {}
        out.append({
            "bucket": b["name"], "profile": profile, "measured": True,
            "prompt_range": b["prompt"], "reply_range": b["reply"], "edge_prompt": L, "edge_reply": o,
            "in_flight": c, "e2e_p50_ms": _ms(e2e.get("p50")), "e2e_p95_ms": _ms(e2e.get("p95")),
            "promise_e2e_ms": _ms(e2e.get("p95")) * (1 + margin) if e2e.get("p95") else None,
            "promise_ttft_ms": _ms(ttft.get("p95")) * (1 + margin) if ttft.get("p95") else None,
            "promise_decode_tps": dec.get("p50") / (1 + margin) if dec.get("p50") else None,
            "decode_tps_p50": dec.get("p50"), "tau": (r.get("spec") or {}).get("tau"),
        })
    return out
