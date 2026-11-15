"""Screen: try every public draft model on Gemma 4 31B FP8 at TP8 and pick the best.

For each drafter (and draft length), one server; the same prompts for all of
them; one request at a time, so the numbers are per-request speed. Records the
mean accepted length (tau) from vLLM's counters, decode tokens per second, and
whether replies at temperature 0 match the no-drafter baseline (speculative
decoding should not change outputs beyond numerical noise).

The winner (highest median decode speed at temperature 0) becomes 'best' for
every later profile that says drafter: best.
"""

from __future__ import annotations

import statistics

from fastlane.config import ad_hoc_profile, parse_drafter, runtime_drafters
from fastlane.servers import ServerGroup
from fastlane.stages.common import Ctx, record_failure, run_cell, warmup
from fastlane.util import LOG, read_json, read_jsonl, write_json


def _label(spec: str) -> str:
    name, k = parse_drafter(spec)
    return "none" if name is None else f"{name}@{k}" if k else name


def run(ctx: Ctx) -> dict:
    cfg = ctx.cfg
    st = cfg.stage("screen")
    if not st:
        return {"status": "skipped"}
    out_dir = ctx.sdir("screen")
    rows: list[dict] = []
    failures: list[str] = []
    for spec in st["drafters"]:
        label = _label(spec)
        prof = ad_hoc_profile(cfg, model="target_fp8", tp=int(st.get("tp", 8)), replicas=1,
                              drafter=None if label == "none" else spec, mode="latency",
                              name=f"screen_{label.replace('@', 'k')}", run_dir=ctx.run_dir)
        jobs = []
        for temp in st.get("temperatures", [ctx.temperature]):
            for L in st["inputs"]:
                for out in st["outputs"]:
                    for c in st.get("concurrency", [1]):
                        key = f"d{label}__t{float(temp):g}__in{L}__out{out}__c{c}".replace("@", "k")
                        jobs.append((key, temp, L, out, c))
        missing = [j for j in jobs if read_json(out_dir / f"{j[0]}.json") is None]
        if missing:
            group = ServerGroup(cfg, prof, ctx.log_dir("screen"))
            try:
                if not group.start():
                    failures.append(label)
                    record_failure(out_dir, prof["name"], group.error)
                    continue
                warmup(ctx, group)
                for key, temp, L, out, c in jobs:
                    reqs = ctx.lib.cell_requests(L, out, int(st.get("requests", 24)),
                                                 cell_id=f"screen-in{L}-out{out}-t{temp}", temperature=float(temp),
                                                 fixed_length=ctx.fixed_length)
                    rows.append(run_cell(ctx, group.urls[0], group.served_name, reqs, c, out_dir=out_dir, key=key,
                                         meta={"stage": "screen", "profile": prof["name"], "drafter": label,
                                               "temperature": float(temp), "L": L, "out": out}))
            finally:
                group.stop()
        else:
            rows += [read_json(out_dir / f"{j[0]}.json") for j in jobs]
    _lossless(out_dir, rows)
    best = _choose(ctx, rows, failures)
    return {"status": "ok", "best": best, "failed": failures, "cells": len(rows)}


def _lossless(out_dir, rows: list[dict]) -> None:
    """Share of replies identical to the no-drafter baseline at temperature 0."""
    base: dict[str, str] = {}
    for r in rows:
        if r.get("drafter") == "none" and r.get("temperature") == 0.0:
            for q in read_jsonl(out_dir / f"{r['key']}.requests.jsonl.gz"):
                if q.get("ok"):
                    base[q["rid"]] = q.get("text_sha1")
    if not base:
        return
    for r in rows:
        if r.get("drafter") == "none" or r.get("temperature") != 0.0:
            continue
        same = total = 0
        for q in read_jsonl(out_dir / f"{r['key']}.requests.jsonl.gz"):
            if q.get("ok") and q["rid"] in base:
                total += 1
                same += int(q.get("text_sha1") == base[q["rid"]])
        if total:
            r["identical_to_baseline"] = same / total
            write_json(out_dir / f"{r['key']}.json", r)


def _choose(ctx: Ctx, rows: list[dict], failures: list[str]) -> dict:
    by: dict[str, list[float]] = {}
    taus: dict[str, list[float]] = {}
    for r in rows:
        if r.get("temperature") != 0.0 or not r.get("ok"):
            continue
        v = (r.get("decode_tps") or {}).get("p50")
        if v:
            by.setdefault(r["drafter"], []).append(v)
        t = (r.get("spec") or {}).get("tau")
        if t:
            taus.setdefault(r["drafter"], []).append(t)
    ranking = sorted(({"drafter": d, "decode_tps_p50": statistics.median(v),
                       "tau": statistics.median(taus[d]) if d in taus else None} for d, v in by.items()),
                     key=lambda x: -x["decode_tps_p50"])
    rt = runtime_drafters(ctx.run_dir)
    override = (ctx.cfg.stage("screen") or {}).get("force_best")
    winner = override or (ranking[0]["drafter"] if ranking else None)
    if winner:
        rt["best"] = {"spec": winner, "ranking": ranking, "failed": failures, "forced": bool(override)}
        write_json(ctx.run_dir / "drafters.json", rt)
        LOG.info("screen: best drafter %s (ranking: %s)", winner,
                 ", ".join(f"{r['drafter']} {r['decode_tps_p50']:,.0f} tok/s" for r in ranking))
    return {"winner": winner, "ranking": ranking}
