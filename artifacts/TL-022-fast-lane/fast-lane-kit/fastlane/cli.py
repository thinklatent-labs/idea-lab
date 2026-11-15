"""Command line.

  python -m fastlane run --plan standard            every stage of the plan, then the report
  python -m fastlane run --plan smoke --dry-run      the whole pipeline on simulated servers
  python -m fastlane stage grid --run-id <id>        one stage of an existing run
  python -m fastlane download --plan standard        weights the plan needs
  python -m fastlane data --plan standard            the prompt library
  python -m fastlane report --run-id <id>            rebuild the report
  python -m fastlane publish --run-id <id>           commit and push results
  python -m fastlane status [--run-id <id>]          what has run
  python -m fastlane plans                           what each plan runs

Runs are resumable: rerun the same command with the same --run-id and finished
cells and stages are skipped.
"""

from __future__ import annotations

import argparse
import importlib
import shutil
import sys
import time
import traceback
from datetime import datetime
from pathlib import Path

from fastlane import config as C
from fastlane.servers import install_signal_handlers, stop_everything
from fastlane.stages import STAGE_ORDER
from fastlane.util import LOG, env_flag, human_s, now_iso, read_json, setup_logging, write_json


def _load(args) -> C.Config:
    return C.load(args.config, plan=args.plan, overrides=args.set, dry_run=args.dry_run)


def _run_dir(cfg: C.Config, run_id: str) -> Path:
    d = cfg.path("results") / run_id
    d.mkdir(parents=True, exist_ok=True)
    return d


def _latest(cfg: C.Config) -> str | None:
    base = cfg.path("results")
    runs = sorted((p for p in base.glob("*") if (p / "run.json").exists()), key=lambda p: p.stat().st_mtime)
    return runs[-1].name if runs else None


def run_stages(cfg: C.Config, run_id: str, stages: list[str], *, force: bool = False, publish: bool = False) -> dict:
    from fastlane.analysis import report
    from fastlane.stages.common import Ctx
    from fastlane.stages.preflight import PreflightError

    run_dir = _run_dir(cfg, run_id)
    setup_logging(run_dir / "run.log")
    install_signal_handlers()
    run = read_json(run_dir / "run.json") or {"run_id": run_id, "plan": cfg.plan_name, "started": now_iso(),
                                               "dry_run": cfg.dry_run, "stages": {}}
    run["plan"] = cfg.plan_name
    shutil.copy(cfg["config_path"], run_dir / "config.yaml")
    write_json(run_dir / "run.json", run)
    ctx = Ctx(cfg=cfg, run_dir=run_dir, run_id=run_id)
    LOG.info("run %s: plan %s, stages %s%s", run_id, cfg.plan_name, ", ".join(stages),
             " (DRY RUN on simulated servers)" if cfg.dry_run else "")
    t_run = time.time()
    for name in [s for s in STAGE_ORDER if s in stages and s != "report"]:
        prev = run["stages"].get(name, {})
        if prev.get("status") in ("ok", "skipped") and not force:
            LOG.info("stage %s: already %s, skipping", name, prev["status"])
            continue
        LOG.info("==== stage %s ====", name)
        t0 = time.time()
        try:
            mod = importlib.import_module(f"fastlane.stages.{name}")
            result = mod.run(ctx) or {}
            status = result.get("status", "ok")
        except PreflightError as e:
            LOG.error("preflight failed: %s", e)
            run["stages"][name] = {"status": "failed", "seconds": time.time() - t0, "error": str(e)}
            write_json(run_dir / "run.json", run)
            LOG.error("stopping: fix the preflight problems above and rerun with --run-id %s", run_id)
            break
        except Exception as e:
            LOG.error("stage %s failed: %s\n%s", name, e, traceback.format_exc())
            result, status = {"error": str(e)[-2000:]}, "failed"
        finally:
            stop_everything()
        run["stages"][name] = {"status": status, "seconds": time.time() - t0, "finished": now_iso(),
                               "result": result}
        write_json(run_dir / "run.json", run)
        LOG.info("stage %s: %s in %s", name, status, human_s(time.time() - t0))
    run["finished"] = now_iso()
    run["seconds"] = run.get("seconds", 0) + (time.time() - t_run)
    write_json(run_dir / "run.json", run)
    if "report" in stages:
        try:
            summary = report.build(run_dir, cfg)
            for v in summary["verdicts"]:
                LOG.info("  %-22s %-12s %s", v["id"], v["verdict"], v.get("value"))
        except Exception as e:
            LOG.error("report failed: %s\n%s", e, traceback.format_exc())
    if publish:
        from fastlane import publish as P

        LOG.info("publish: %s", P.run(run_dir))
    LOG.info("run %s done in %s. Report: %s", run_id, human_s(time.time() - t_run), run_dir / "REPORT.md")
    return run


def main(argv: list[str] | None = None) -> None:
    ap = argparse.ArgumentParser(prog="fastlane", description="Fast-lane proof kit (TL-022)")
    sub = ap.add_subparsers(dest="cmd", required=True)

    def common(p):
        p.add_argument("--config", default=None, help="config YAML (default config/proof.yaml)")
        p.add_argument("--plan", default=None, help="smoke, quick, standard, full or two_node")
        p.add_argument("--set", action="append", default=[], metavar="KEY=VALUE",
                       help="override a config value, e.g. --set load.input_tokens_per_minute=2000000")
        p.add_argument("--dry-run", action="store_true", help="simulated servers, no GPUs (tests the pipeline)")

    p = sub.add_parser("run", help="run a plan")
    common(p)
    p.add_argument("--run-id", default=None)
    p.add_argument("--stages", default=None, help="comma-separated subset (default: the plan's stages)")
    p.add_argument("--force", action="store_true", help="rerun stages already marked ok")
    p.add_argument("--publish", action="store_true", help="commit and push results at the end")

    p = sub.add_parser("stage", help="run one stage of a run")
    common(p)
    p.add_argument("name", choices=[s for s in STAGE_ORDER])
    p.add_argument("--run-id", required=True)
    p.add_argument("--force", action="store_true")

    for name, help_ in (("download", "download the weights a plan needs"), ("data", "build the prompt library")):
        p = sub.add_parser(name, help=help_)
        common(p)

    p = sub.add_parser("report", help="rebuild the report of a run")
    common(p)
    p.add_argument("--run-id", default=None)

    p = sub.add_parser("publish", help="commit and push a run's results")
    common(p)
    p.add_argument("--run-id", default=None)
    p.add_argument("--no-push", action="store_true")

    p = sub.add_parser("status", help="show a run's stages")
    common(p)
    p.add_argument("--run-id", default=None)

    p = sub.add_parser("plans", help="list plans")
    common(p)

    p = sub.add_parser("router", help="(internal) run the picker router")
    p.add_argument("--spec", required=True)
    p.add_argument("--port", type=int, default=9000)
    p.add_argument("--host", default="0.0.0.0")

    a = ap.parse_args(argv)

    if a.cmd == "router":
        from fastlane.router import main as router_main

        router_main(["--spec", a.spec, "--port", str(a.port), "--host", a.host])
        return

    cfg = _load(a)
    setup_logging()

    if a.cmd == "run":
        run_id = a.run_id or f"{datetime.now().strftime('%Y%m%d-%H%M')}-{cfg.plan_name}" + ("-dry" if cfg.dry_run else "")
        stages = a.stages.split(",") if a.stages else list(cfg.plan["stages"])
        if "report" not in stages and not a.stages:
            stages.append("report")
        run_stages(cfg, run_id, stages, force=a.force, publish=a.publish or env_flag("FASTLANE_PUBLISH"))
    elif a.cmd == "stage":
        run_stages(cfg, a.run_id, [a.name], force=a.force)
    elif a.cmd == "download":
        from fastlane import download

        print(download.run(cfg))
    elif a.cmd == "data":
        from fastlane.stages.common import Ctx
        from fastlane.stages.data import run as data_run

        print(data_run(Ctx(cfg=cfg, run_dir=_run_dir(cfg, "_data"), run_id="_data")))
    elif a.cmd == "report":
        from fastlane.analysis import report

        run_id = a.run_id or _latest(cfg)
        if not run_id:
            sys.exit("no runs found")
        report.build(cfg.path("results") / run_id, cfg)
        print(cfg.path("results") / run_id / "REPORT.md")
    elif a.cmd == "publish":
        from fastlane import publish as P

        run_id = a.run_id or _latest(cfg)
        if not run_id:
            sys.exit("no runs found")
        print(P.run(cfg.path("results") / run_id, push=not a.no_push))
    elif a.cmd == "status":
        run_id = a.run_id or _latest(cfg)
        run = read_json(cfg.path("results") / (run_id or "") / "run.json") if run_id else None
        if not run:
            sys.exit("no runs found")
        print(f"run {run['run_id']} plan {run.get('plan')} started {run.get('started')} finished {run.get('finished', '-')}")
        for k, v in run.get("stages", {}).items():
            print(f"  {k:<10} {v.get('status'):<9} {human_s(v.get('seconds'))}")
    elif a.cmd == "plans":
        for name, p in cfg["plans"].items():
            print(f"{name:<10} {p.get('hours', '?'):>5} h  stages: {', '.join(p.get('stages', []))}")
            if p.get("about"):
                print(f"{'':<10}        {p['about']}")


if __name__ == "__main__":
    main()
