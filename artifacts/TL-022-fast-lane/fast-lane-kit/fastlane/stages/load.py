"""Load: the shared cluster under mixed traffic, behind the picker.

One profile (default: two TP4 replicas of Gemma 4 31B FP8 with the best
drafter), the bucket edges and promises from the grid, and a traffic mix of
applications (config.load.apps) sent as Poisson arrivals through the router.

  capacity   bucketed picker at 0.5x, 1x, 1.5x, 2x ... the target input rate
             (1 million input tokens a minute): share of fast calls inside
             their bucket's promise (H7)
  policies   the same 1x traffic under round_robin, least_load, affinity and
             bucketed: does the picker buy attainment and cache hits (H8)
  borrowing  the answer bucket alone, rate raised step by step until fewer
             than 95% of calls keep the promise, without and with borrowing;
             then the lender's own traffic returns and its p95 is checked
             against its promise (H6)

The scale stage reuses this module across two nodes (H5).
"""

from __future__ import annotations

import json
import math
import random
import sys
import time
import urllib.request
from pathlib import Path

from fastlane import metrics as M
from fastlane.analysis.tables import bucket_sheet, stage_rows
from fastlane.client import Request, poisson_times, run_open_loop
from fastlane.config import profile
from fastlane.prompts import instruction, task_for
from fastlane.servers import ServerGroup, http_ok, node_hosts, start_background, stop_background
from fastlane.stages.common import Ctx, record_failure, run_cell, warmup
from fastlane.util import LOG, percentile, read_json, summarize, write_json, write_jsonl


# ------------------------------------------------------------------------ traffic

def _draw(dist: dict, rng: random.Random) -> int:
    kind = dist.get("dist", "fixed")
    if kind == "fixed":
        return int(dist["value"])
    if kind == "uniform":
        return rng.randint(int(dist["min"]), int(dist["max"]))
    if kind == "choice":
        return int(rng.choice(dist["values"]))
    if kind == "lognormal":
        v = rng.lognormvariate(math.log(float(dist["median"])), float(dist["sigma"]))
        return int(min(max(v, dist.get("min", 1)), dist.get("max", 10 ** 9)))
    raise ValueError(f"unknown distribution {kind}")


def mean_prompt_tokens(apps: list[dict], n: int = 20000) -> float:
    rng = random.Random(7)
    tot = sum(a["share"] for a in apps)
    s = 0.0
    for a in apps:
        k = max(1, int(n * a["share"] / tot))
        s += (a["share"] / tot) * sum(_draw(a["prompt"], rng) for _ in range(k)) / k
    return s


def build_schedule(ctx: Ctx, apps: list[dict], *, duration_s: float, seed: str,
                   tokens_per_min: float | None = None, rate_per_app: dict | None = None,
                   start_offset: float = 0.0) -> list[tuple[float, Request]]:
    rng = random.Random(seed)
    overhead = ctx.lib.overhead()
    tot = sum(a["share"] for a in apps)
    total_rate = (tokens_per_min / 60.0) / mean_prompt_tokens(apps) if tokens_per_min else 0.0
    sched: list[tuple[float, Request]] = []
    for a in apps:
        rate = (rate_per_app or {}).get(a["name"], total_rate * a["share"] / tot)
        shared_n = int(a.get("shared_prefix_tokens", 0))
        shared = ctx.lib.shared_prefix(a["name"], shared_n) if shared_n else ""
        system = ctx.lib.system + ("\n\n" + shared if shared else "")
        for t in poisson_times(rate, duration_s, rng):
            plen = _draw(a["prompt"], rng)
            reply = _draw(a["reply"], rng)
            text = ctx.lib.context(max(64, plen - shared_n - overhead), rng)
            session = f"s{rng.randrange(max(1, int(a.get('sessions', 1))))}"
            req = Request(
                rid=f"{a['name']}-{len(sched)}",
                messages=[{"role": "system", "content": system},
                          {"role": "user", "content": text + "\n\n" + instruction(task_for(reply), reply)}],
                max_tokens=reply, min_tokens=reply if ctx.fixed_length else 0, temperature=ctx.temperature,
                headers={"x-tl-app": a["name"], "x-tl-session": session, "x-tl-class": a["cls"],
                         "x-tl-prompt-tokens": str(plen), "x-tl-max-tokens": str(reply)},
                meta={"app": a["name"], "cls": a["cls"], "prompt_len": plen, "reply": reply})
            sched.append((start_offset + t, req))
    sched.sort(key=lambda x: x[0])
    return sched


# ------------------------------------------------------------------------ promises

def promises_for(ctx: Ctx, group: ServerGroup, prof: dict) -> dict[str, float]:
    """Bucket -> promised end-to-end seconds, from the grid if it measured this
    profile, else measured now at each bucket's edge on replica 0."""
    cfg = ctx.cfg
    pc = cfg["promise"]
    out_dir = ctx.sdir("load")
    saved = read_json(out_dir / "promises.json")
    if saved:
        return {k: v for k, v in saved["promises"].items()}
    rows = stage_rows(ctx.run_dir, "grid")
    sheet = bucket_sheet(rows, cfg["buckets"], profile=prof["name"], concurrency=int(pc["concurrency"]),
                         margin=float(pc["margin"]))
    source = "grid"
    if not sheet or not all(s.get("measured") for s in sheet):
        source = "edge cells measured in the load stage"
        lengths = sorted(int(x) for x in cfg["prompts"]["lengths"])
        edge_rows = []
        for b in cfg["buckets"]:
            if "fast" not in b["classes"]:
                continue
            Ls = [L for L in lengths if b["prompt"][0] <= L <= b["prompt"][1]] or [lengths[-1]]
            out = min(int(b["reply"][1]), 1000)
            c = int(pc["concurrency"])
            reqs = ctx.lib.cell_requests(Ls[-1], out, max(16, 3 * c), cell_id=f"edge-{b['name']}",
                                         temperature=ctx.temperature, fixed_length=ctx.fixed_length)
            edge_rows.append(run_cell(ctx, group.urls[0], group.served_name, reqs, c, out_dir=out_dir,
                                      key=f"edge__{prof['name']}__{b['name']}",
                                      meta={"stage": "load-edge", "profile": prof["name"], "L": Ls[-1], "out": out,
                                            "bucket": b["name"]}))
        sheet = bucket_sheet(edge_rows, cfg["buckets"], profile=prof["name"], concurrency=int(pc["concurrency"]),
                             margin=float(pc["margin"]))
    promises = {s["bucket"]: s["promise_e2e_ms"] / 1000.0 for s in sheet if s.get("promise_e2e_ms")}
    write_json(out_dir / "promises.json", {"profile": prof["name"], "source": source, "promises": promises,
                                           "sheet": sheet})
    LOG.info("load: promises (%s): %s", source, ", ".join(f"{k} {v * 1000:,.0f} ms" for k, v in promises.items()))
    return promises


# ------------------------------------------------------------------------ router + scenario

def _router_spec(ctx: Ctx, urls: list[str], homes: list[list[str]], *, policy: str, borrowing: bool,
                 salt: str, log: Path) -> dict:
    cfg = ctx.cfg
    cl = cfg["load"]["cluster"]
    return {
        "policy": policy, "borrowing": borrowing, "salt_prefix": salt,
        "buckets": cfg["buckets"], "class_priority": cfg["class_priority"],
        "borrow_penalty": int(cfg.get("borrow_priority_penalty", 20)),
        "eps": float(cl.get("bounded_load_eps", 0.25)), "lend_max_load": float(cl.get("lend_max_load", 2)),
        "log": str(log),
        "replicas": [{"name": f"r{i}", "url": u, "home": homes[i % len(homes)],
                      "max_inflight": int(cl.get("max_inflight_per_replica", 8))} for i, u in enumerate(urls)],
    }


def homes_for(ctx: Ctx, n: int) -> list[list[str]]:
    home = ctx.cfg["load"]["cluster"]["home"]
    base = [home.get(i) or home.get(str(i)) or [] for i in range(len(home))]
    return [base[i % len(base)] for i in range(n)]


def run_scenario(ctx: Ctx, urls: list[str], served_name: str, *, name: str, policy: str, borrowing: bool,
                 schedule: list[tuple[float, Request]], duration_s: float, warmup_s: float,
                 promises: dict[str, float], out_dir: Path, homes: list[list[str]] | None = None) -> dict:
    out_file = out_dir / f"{name}.json"
    prev = read_json(out_file)
    if prev is not None:
        return prev
    port = int(ctx.cfg["hardware"].get("base_port", 8100)) + 900
    spec = _router_spec(ctx, urls, homes or homes_for(ctx, len(urls)), policy=policy, borrowing=borrowing,
                        salt=f"{ctx.run_id}:{name}", log=out_dir / f"{name}.router.jsonl")
    spec_path = out_dir / f"{name}.router-spec.json"
    write_json(spec_path, spec)
    router = start_background([sys.executable, "-m", "fastlane", "router", "--spec", str(spec_path),
                               "--port", str(port)], ctx.log_dir("load") / f"router-{name}.log")
    rurl = f"http://127.0.0.1:{port}"
    try:
        t0 = time.time()
        while not http_ok(rurl + "/health") and time.time() - t0 < 60:
            time.sleep(0.2)
        before = M.scrape_all(urls)
        LOG.info("load %s: %d calls over %.0fs, policy %s, borrowing %s", name, len(schedule), duration_s,
                 policy, borrowing)
        results, wall = run_open_loop(rurl, served_name, schedule, stream=True, req_cfg=ctx.req_cfg,
                                      timeout_s=ctx.timeout_s)
        after = M.scrape_all(urls)
        try:
            with urllib.request.urlopen(rurl + "/stats", timeout=5) as r:
                stats = json.loads(r.read())
        except OSError:
            stats = {}
    finally:
        stop_background(router, grace=10)
    d = M.merge([M.delta(b, a) for b, a in zip(before, after)])
    summary = summarize_scenario(results, wall, warmup_s=warmup_s, duration_s=duration_s, promises=promises)
    summary.update({"name": name, "policy": policy, "borrowing": borrowing, "replicas": len(urls),
                    "router": stats, "spec": M.spec_stats(d), "prefix": M.prefix_stats(d)})
    write_jsonl(out_dir / f"{name}.requests.jsonl.gz", results)
    write_json(out_file, summary)
    f = summary["classes"].get("fast", {})
    LOG.info("load %s: fast-class attainment %s, p95 e2e %s, input %s tok/min, errors %d", name,
             f"{f.get('attainment', 0) * 100:.1f}%" if f.get("attainment") is not None else "n/a",
             f"{(f.get('e2e') or {}).get('p95', 0) * 1000:,.0f} ms", f"{summary['input_tokens_per_min']:,.0f}",
             summary["errors"])
    return summary


def summarize_scenario(results: list[dict], wall: float, *, warmup_s: float, duration_s: float,
                       promises: dict[str, float], t_from: float | None = None, t_to: float | None = None) -> dict:
    lo = warmup_s if t_from is None else t_from
    hi = duration_s if t_to is None else t_to
    use = [r for r in results if lo <= r.get("t_sched", 0) < hi]

    def group(rs: list[dict]) -> dict:
        ok = [r for r in rs if r.get("ok")]
        out = {"n": len(rs), "ok": len(ok), "errors": len(rs) - len(ok),
               "ttft": summarize(r.get("ttft") for r in ok), "e2e": summarize(r.get("e2e") for r in ok),
               "decode_tps": summarize(r.get("decode_tps") for r in ok)}
        judged = [r for r in rs if promises.get(r.get("bucket") or "")]
        if judged:
            met = sum(1 for r in judged if r.get("ok") and r.get("e2e", 1e9) <= promises[r["bucket"]])
            out["attainment"] = met / len(judged)
            out["judged"] = len(judged)
        return out

    classes, buckets, apps = {}, {}, {}
    for r in use:
        classes.setdefault((r.get("meta") or {}).get("cls", "?"), []).append(r)
        buckets.setdefault(r.get("bucket") or "?", []).append(r)
        apps.setdefault((r.get("meta") or {}).get("app", "?"), []).append(r)
    window_min = max(1e-9, (hi - lo) / 60.0)
    lags = [r.get("lag") for r in use if r.get("lag") is not None]
    return {
        "requests": len(use), "errors": sum(1 for r in use if not r.get("ok")), "wall_s": wall,
        "window_s": hi - lo,
        "input_tokens_per_min": sum((r.get("prompt_tokens") or 0) for r in use if r.get("ok")) / window_min,
        "output_tokens_per_min": sum((r.get("completion_tokens") or 0) for r in use if r.get("ok")) / window_min,
        "classes": {k: group(v) for k, v in classes.items()},
        "buckets": {k: group(v) for k, v in buckets.items()},
        "apps": {k: group(v) for k, v in apps.items()},
        "borrowed_share": (sum(1 for r in use if r.get("borrowed") == "1") / len(use)) if use else 0.0,
        "client_lag_p99_s": percentile(lags, 99),
        "pick_us_p50": percentile([float(r["pick_us"]) for r in use if r.get("pick_us")], 50),
        "promises_s": promises,
    }


# ------------------------------------------------------------------------ the stage

def run(ctx: Ctx) -> dict:
    cfg = ctx.cfg
    st = cfg.stage("load")
    if not st:
        return {"status": "skipped"}
    lc = cfg["load"]
    out_dir = ctx.sdir("load")
    try:
        prof = profile(cfg, lc["cluster"]["profile"], ctx.run_dir)
    except Exception as e:
        record_failure(out_dir, lc["cluster"]["profile"], str(e))
        return {"status": "failed", "error": str(e)}
    dur, wu = float(st.get("duration_s", 300)), float(st.get("warmup_s", 30))
    tpm = float(lc["input_tokens_per_minute"])
    apps = lc["apps"]
    group = ServerGroup(cfg, prof, ctx.log_dir("load"))
    results: dict = {"capacity": [], "policies": [], "borrowing": None}
    try:
        if not group.start():
            record_failure(out_dir, prof["name"], group.error)
            return {"status": "failed", "error": group.error}
        warmup(ctx, group)
        promises = promises_for(ctx, group, prof)
        for mult in st.get("capacity", [1.0]):
            sched = build_schedule(ctx, apps, duration_s=dur, seed=f"capacity-{mult}", tokens_per_min=tpm * mult)
            results["capacity"].append(run_scenario(
                ctx, group.urls, group.served_name, name=f"capacity_x{mult:g}", policy="bucketed", borrowing=True,
                schedule=sched, duration_s=dur, warmup_s=wu, promises=promises, out_dir=out_dir))
        for pol in st.get("policies", []):
            if pol == "bucketed" and 1.0 in [float(m) for m in st.get("capacity", [])]:
                continue  # same as capacity_x1
            sched = build_schedule(ctx, apps, duration_s=dur, seed="capacity-1.0", tokens_per_min=tpm)
            results["policies"].append(run_scenario(
                ctx, group.urls, group.served_name, name=f"policy_{pol}", policy=pol,
                borrowing=(pol == "bucketed"), schedule=sched, duration_s=dur, warmup_s=wu, promises=promises,
                out_dir=out_dir))
        b = st.get("borrowing") or {}
        if b.get("enabled") and len(group.urls) >= 2:
            results["borrowing"] = borrowing_test(ctx, group, promises, b, out_dir)
    finally:
        group.stop()
    return {"status": "ok", "scenarios": len(results["capacity"]) + len(results["policies"]),
            "borrowing": (results["borrowing"] or {}).get("verdict_inputs")}


def borrowing_test(ctx: Ctx, group: ServerGroup, promises: dict, b: dict, out_dir: Path) -> dict:
    """H6: sustainable rate of a busy bucket without and with borrowing, then the lender's promise."""
    saved = read_json(out_dir / "borrowing.json")
    if saved:
        return saved
    apps = {a["name"]: a for a in ctx.cfg["load"]["apps"]}
    busy = apps[b.get("busy_app", "assist")]
    lender = apps[b.get("lender_app", "docqa")]
    target = float(ctx.cfg["hypotheses"]["H7"]["attainment"])
    step_s = float(b.get("step_s", 120))
    wu = min(20.0, step_s * 0.15)

    def search(borrow: bool) -> tuple[float | None, list, bool]:
        """Raise the rate until attainment drops below target. Returns (last passing
        rate, trail, saturated). saturated=False means the step limit came first, so
        the sustainable rate is only a lower bound."""
        rate = float(b.get("start_rps", 0.5))
        best, trail = None, []
        for i in range(int(b.get("max_steps", 8))):
            sched = build_schedule(ctx, [dict(busy, share=1.0)], duration_s=step_s, seed=f"borrow-{i}",
                                   rate_per_app={busy["name"]: rate})
            s = run_scenario(ctx, group.urls, group.served_name, name=f"borrow_{'on' if borrow else 'off'}_{i}",
                             policy="bucketed", borrowing=borrow, schedule=sched, duration_s=step_s, warmup_s=wu,
                             promises=promises, out_dir=out_dir)
            att = (s["classes"].get(busy["cls"]) or {}).get("attainment")
            trail.append({"rate_rps": rate, "attainment": att, "borrowed_share": s.get("borrowed_share")})
            if att is not None and att >= target:
                best = rate
                rate *= float(b.get("growth", 1.3))
            else:
                return best, trail, True
        return best, trail, False

    r_off, trail_off, sat_off = search(False)
    r_on, trail_on, sat_on = search(True)
    lead = float(b.get("lead_s", 60))
    window = float(b.get("lender_window_s", 120))
    rate_busy = r_on or r_off or float(b.get("start_rps", 0.5))
    nominal = (float(ctx.cfg["load"]["input_tokens_per_minute"]) / 60.0) / mean_prompt_tokens(
        list(apps.values())) * lender["share"] / sum(a["share"] for a in apps.values())
    sched = build_schedule(ctx, [dict(busy, share=1.0)], duration_s=lead + window, seed="lender-busy",
                           rate_per_app={busy["name"]: rate_busy})
    sched += build_schedule(ctx, [dict(lender, share=1.0)], duration_s=window, seed="lender-own",
                            rate_per_app={lender["name"]: nominal}, start_offset=lead)
    sched.sort(key=lambda x: x[0])
    run_scenario(ctx, group.urls, group.served_name, name="borrow_lender", policy="bucketed", borrowing=True,
                     schedule=sched, duration_s=lead + window, warmup_s=0.0, promises=promises, out_dir=out_dir)
    settle = min(10.0, window * 0.2)  # let calls already borrowed drain before judging the lender
    reqs = [r for r in _load_requests(out_dir / "borrow_lender.requests.jsonl.gz")
            if (r.get("meta") or {}).get("app") == lender["name"] and r.get("t_sched", 0) >= lead + settle]
    lender_bucket = max(((r.get("bucket") or "?") for r in reqs), key=lambda k: sum(1 for r in reqs if r.get("bucket") == k),
                        default="long_read")
    p95 = percentile([r["e2e"] for r in reqs if r.get("ok")], 95)
    promise = promises.get(lender_bucket)
    gain = (r_on / r_off - 1.0) if (r_on and r_off) else None
    out = {"busy_app": busy["name"], "lender_app": lender["name"], "rate_off_rps": r_off, "rate_on_rps": r_on,
           "saturated_off": sat_off, "saturated_on": sat_on, "gain": gain, "trail_off": trail_off,
           "trail_on": trail_on, "lender_bucket": lender_bucket, "lender_p95_s": p95, "lender_promise_s": promise,
           "lender_calls": len(reqs), "busy_rate_during_lender_test": rate_busy,
           "verdict_inputs": {
               "gain": gain,
               # without saturation off, the gain is unmeasured (a lower bound at best)
               "gain_measured": bool(sat_off),
               "lender_ok": None if (p95 is None or promise is None) else p95 <= promise}}
    write_json(out_dir / "borrowing.json", out)
    LOG.info("borrowing: sustainable %s rps without, %s with; lender p95 %s vs promise %s", r_off, r_on,
             f"{(p95 or 0) * 1000:,.0f} ms", f"{(promises.get(lender_bucket) or 0) * 1000:,.0f} ms")
    return out


def _load_requests(path: Path) -> list[dict]:
    from fastlane.util import read_jsonl

    return list(read_jsonl(path))


# ------------------------------------------------------------------------ scale (H5, two nodes)

def run_scale(ctx: Ctx) -> dict:
    cfg = ctx.cfg
    st = cfg.stage("scale")
    if not st:
        return {"status": "skipped"}
    out_dir = ctx.sdir("scale")
    hosts = node_hosts()
    if len(hosts) < 2 and not cfg.dry_run:
        write_json(out_dir / "scale.json", {"status": "not run", "reason": f"allocation has {len(hosts)} node(s)"})
        return {"status": "skipped", "reason": "needs two nodes"}
    base = profile(cfg, st.get("profile", cfg["load"]["cluster"]["profile"]), ctx.run_dir)
    per_node = int(cfg["hardware"]["gpus_per_node"]) // int(base["gpus_per_replica"])
    prof = dict(base, replicas=per_node * 2, name=base["name"] + "_2node", nodes=2)
    if cfg.dry_run:
        hosts = hosts * 2
    dur, wu = float(st.get("duration_s", 300)), float(st.get("warmup_s", 30))
    tpm = float(cfg["load"]["input_tokens_per_minute"])
    group = ServerGroup(cfg, prof, ctx.log_dir("scale"), nodes=hosts[:2])
    try:
        if not group.start():
            record_failure(out_dir, prof["name"], group.error)
            return {"status": "failed", "error": group.error}
        warmup(ctx, group)
        promises = promises_for(ctx, group, base)
        one = group.urls[:per_node]
        s1 = run_scenario(ctx, one, group.served_name, name="one_node_x1", policy="bucketed", borrowing=True,
                          schedule=build_schedule(ctx, cfg["load"]["apps"], duration_s=dur, seed="scale-1",
                                                  tokens_per_min=tpm),
                          duration_s=dur, warmup_s=wu, promises=promises, out_dir=out_dir)
        s2 = run_scenario(ctx, group.urls, group.served_name, name="two_nodes_x2", policy="bucketed", borrowing=True,
                          schedule=build_schedule(ctx, cfg["load"]["apps"], duration_s=dur, seed="scale-2",
                                                  tokens_per_min=2 * tpm),
                          duration_s=dur, warmup_s=wu, promises=promises, out_dir=out_dir)
    finally:
        group.stop()
    p1 = ((s1["classes"].get("fast") or {}).get("e2e") or {}).get("p95")
    p2 = ((s2["classes"].get("fast") or {}).get("e2e") or {}).get("p95")
    res = {"status": "ok", "p95_one_node_x1_s": p1, "p95_two_nodes_x2_s": p2,
           "rise": (p2 / p1 - 1.0) if (p1 and p2) else None}
    write_json(out_dir / "scale.json", res)
    return res
