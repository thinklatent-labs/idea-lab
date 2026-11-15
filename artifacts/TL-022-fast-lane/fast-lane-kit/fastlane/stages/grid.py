"""Grid: the bucket sheet's raw material.

For each profile, every (prompt length x reply length x in-flight) cell, plus
prefix-sharing cells, on real-text prompts. Cells run in parallel across a
profile's replicas (each cell on one replica, so its numbers are that
replica's). From these cells the report builds the bucket sheet: for each
prompt and reply range, the p95 time it can promise at up to N in flight.

While a profile named in plan.quality.profiles is up, the 4-bit quality check
(GSM8K accuracy) runs against it too, so no extra server start is needed.
"""

from __future__ import annotations

from fastlane.client import Request, run_closed_loop
from fastlane.config import profile
from fastlane.prompts import extract_number, gsm8k_prompt
from fastlane.servers import ServerGroup
from fastlane.stages.common import Ctx, record_failure, run_cells_parallel, warmup
from fastlane.util import LOG, read_json, write_json, write_jsonl


def build_jobs(ctx: Ctx, pname: str, drafter_label: str, st: dict, stage: str) -> list[dict]:
    jobs = []
    rounds = int(st.get("rounds", 3))
    nmin = int(st.get("requests_min", 16))
    for L in st["inputs"]:
        for out in st["outputs"]:
            for c in st["concurrency"]:
                key = f"{pname}__in{L}__out{out}__c{c}"
                jobs.append({"key": key, "L": L, "out": out, "concurrency": c, "n": max(nmin, rounds * c),
                             "cell_id": f"{stage}-in{L}-out{out}-c{c}", "prefix_share": 0.0,
                             "meta": {"stage": stage, "profile": pname, "drafter": drafter_label, "L": L,
                                      "out": out, "prefix_share": 0.0, "temperature": ctx.temperature}})
    px = st.get("prefix") or {}
    for L in px.get("inputs", []):
        for out in px.get("outputs", []):
            for share in px.get("shares", []):
                for c in px.get("concurrency", [8]):
                    key = f"{pname}__in{L}__out{out}__c{c}__share{int(share * 100)}"
                    jobs.append({"key": key, "L": L, "out": out, "concurrency": c,
                                 "n": max(nmin, rounds * c), "prefix_share": float(share),
                                 "cell_id": f"{stage}-in{L}-out{out}-c{c}-s{int(share * 100)}",
                                 "meta": {"stage": stage, "profile": pname, "drafter": drafter_label, "L": L,
                                          "out": out, "prefix_share": float(share),
                                          "temperature": ctx.temperature}})
    # Longest prompts first: a slow profile shows its worst case early.
    jobs.sort(key=lambda j: (-j["L"] * j["out"], j["concurrency"]))
    return jobs


def run_grid(ctx: Ctx, stage: str, st: dict) -> dict:
    cfg = ctx.cfg
    out_dir = ctx.sdir(stage)
    quality = cfg.stage("quality") if stage == "grid" else {}
    qprofiles = set(quality.get("profiles") or [])
    done_profiles, failed = [], []
    for pname in st.get("profiles", []):
        try:
            prof = profile(cfg, pname, ctx.run_dir)
        except Exception as e:
            LOG.error("%s: profile %s unavailable: %s", stage, pname, e)
            failed.append(pname)
            record_failure(out_dir, pname, str(e))
            continue
        label = (prof.get("drafter") or {}).get("spec", "none")
        jobs = build_jobs(ctx, pname, label, st, stage)
        todo = [j for j in jobs if read_json(out_dir / f"{j['key']}.json") is None]
        need_q = pname in qprofiles and read_json(ctx.sdir("quality") / f"{pname}.json") is None
        if not todo and not need_q:
            done_profiles.append(pname)
            continue
        LOG.info("%s: profile %s (%s, drafter %s): %d cells to run", stage, pname,
                 f"{prof['replicas']}x TP{prof['tp']}", label, len(todo))
        group = ServerGroup(cfg, prof, ctx.log_dir(stage))
        try:
            if not group.start():
                failed.append(pname)
                record_failure(out_dir, pname, group.error)
                continue
            write_json(out_dir / f"SERVER__{pname}.json", {"profile": pname, "startup_s": group.started_s,
                                                          "optional_flags": group.optional_flags_used,
                                                          "argv": group.replicas[0].argv,
                                                          "drafter": label})
            warmup(ctx, group)
            run_cells_parallel(ctx, group, todo, out_dir)
            if need_q:
                run_quality(ctx, group, pname, int(quality.get("questions", 250)))
            done_profiles.append(pname)
        finally:
            group.stop()
    return {"status": "ok" if not failed else "partial", "profiles": done_profiles, "failed": failed}


def run_quality(ctx: Ctx, group: ServerGroup, pname: str, n: int) -> dict:
    qs = ctx.lib.gsm8k(n)
    reqs = [Request(rid=q["id"], messages=gsm8k_prompt(q["question"]), max_tokens=768, temperature=0.0,
                    cache_salt=f"quality-{pname}", meta={"answer": q["answer"]}) for q in qs]
    results, wall = run_closed_loop(group.urls, group.served_name, reqs, 32 * len(group.urls), stream=False,
                                    req_cfg=ctx.req_cfg, timeout_s=ctx.timeout_s, keep_text=True)
    answers = {}
    correct = 0
    for r in results:
        got = extract_number(r.get("text", "")) if r.get("ok") else None
        want = str(r["meta"]["answer"]).strip()
        ok = got is not None and _num_eq(got, want)
        correct += int(ok)
        answers[r["rid"]] = {"got": got, "want": want, "ok": ok}
    row = {"profile": pname, "questions": len(qs), "answered": sum(1 for r in results if r.get("ok")),
           "correct": correct, "accuracy": correct / len(qs) if qs else None, "wall_s": wall}
    qdir = ctx.sdir("quality")
    write_json(qdir / f"{pname}.json", row)
    write_jsonl(qdir / f"{pname}.answers.jsonl", ({"rid": k, **v} for k, v in answers.items()))
    LOG.info("quality %s: %d/%d correct (%.1f%%)", pname, correct, len(qs), 100 * (row["accuracy"] or 0))
    return row


def _num_eq(a: str, b: str) -> bool:
    try:
        return abs(float(a) - float(b.replace(",", ""))) < 1e-6
    except ValueError:
        return a.strip() == b.strip()


def run(ctx: Ctx) -> dict:
    st = ctx.cfg.stage("grid")
    if not st:
        return {"status": "skipped"}
    return run_grid(ctx, "grid", st)
