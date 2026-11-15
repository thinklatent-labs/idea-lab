"""Layouts: the same 8 GPUs as one TP8 replica, two TP4, four TP2 or eight TP1.

One request shape (default 4,000-token prompt, 300-token reply), swept from 1
to 512 calls in flight spread evenly over the replicas. Shows the trade the
design rests on: few wide replicas with a drafter give each call the most
speed; many narrow replicas give the cluster the most total tokens.
"""

from __future__ import annotations

from fastlane.config import profile
from fastlane.servers import ServerGroup
from fastlane.stages.common import Ctx, record_failure, run_cell, warmup
from fastlane.util import LOG, read_json, write_json


def run(ctx: Ctx) -> dict:
    cfg = ctx.cfg
    st = cfg.stage("layouts")
    if not st:
        return {"status": "skipped"}
    out_dir = ctx.sdir("layouts")
    L, out = st.get("shape", [4000, 300])
    done, failed = [], []
    for pname in st["profiles"]:
        try:
            prof = profile(cfg, pname, ctx.run_dir)
        except Exception as e:
            failed.append(pname)
            record_failure(out_dir, pname, str(e))
            continue
        label = (prof.get("drafter") or {}).get("spec", "none")
        levels = [c for c in st["concurrency"]]
        keys = {c: f"{pname}__in{L}__out{out}__c{c}" for c in levels}
        if all(read_json(out_dir / f"{k}.json") is not None for k in keys.values()):
            done.append(pname)
            continue
        group = ServerGroup(cfg, prof, ctx.log_dir("layouts"))
        try:
            if not group.start():
                failed.append(pname)
                record_failure(out_dir, pname, group.error)
                continue
            write_json(out_dir / f"SERVER__{pname}.json", {"profile": pname, "startup_s": group.started_s,
                                                          "optional_flags": group.optional_flags_used,
                                                          "argv": group.replicas[0].argv})
            warmup(ctx, group)
            for c in levels:
                n = max(8, int(st.get("requests_per_level", 3)) * c)
                reqs = ctx.lib.cell_requests(L, out, n, cell_id=f"layouts-{pname}-c{c}", temperature=ctx.temperature,
                                             fixed_length=ctx.fixed_length)
                procs = 1 if c <= 64 else min(8, c // 64)
                row = run_cell(ctx, group.urls, group.served_name, reqs, c, out_dir=out_dir, key=keys[c],
                               meta={"stage": "layouts", "profile": pname, "drafter": label, "L": L, "out": out,
                                     "replicas": prof["replicas"], "tp": prof["tp"]},
                               procs=procs, bind_workers=True)
                if row.get("errors", 0) > row.get("requests", 1) * 0.2:
                    LOG.warning("layouts %s: >20%% errors at %d in flight; stopping this layout's sweep", pname, c)
                    break
            done.append(pname)
        finally:
            group.stop()
    return {"status": "ok" if not failed else "partial", "profiles": done, "failed": failed}
