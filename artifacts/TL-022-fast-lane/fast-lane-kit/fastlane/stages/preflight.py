"""Preflight: check the node, the environments and the weights before spending GPU hours."""

from __future__ import annotations

import shutil
import socket
import subprocess
from pathlib import Path

from fastlane.config import model_dir, profile
from fastlane.download import needed, plan_profiles
from fastlane.stages.common import Ctx
from fastlane.util import LOG, now_iso, write_json


class PreflightError(RuntimeError):
    pass


def _cmd(argv: list[str], timeout: float = 60) -> tuple[int, str]:
    try:
        p = subprocess.run(argv, capture_output=True, text=True, timeout=timeout)
        return p.returncode, (p.stdout + p.stderr).strip()
    except (OSError, subprocess.SubprocessError) as e:
        return -1, str(e)


def run(ctx: Ctx) -> dict:
    cfg = ctx.cfg
    info: dict = {"time": now_iso(), "plan": cfg.plan_name, "dry_run": cfg.dry_run, "host": socket.gethostname(),
                  "checks": []}
    problems: list[str] = []

    def check(name: str, ok: bool, detail: str = "", hard: bool = True) -> None:
        info["checks"].append({"check": name, "ok": ok, "detail": detail})
        (LOG.info if ok else LOG.error)("preflight %-28s %s %s", name, "ok " if ok else "FAIL", detail)
        if not ok and hard:
            problems.append(f"{name}: {detail}")

    if cfg.dry_run:
        check("mode", True, "dry run: simulated servers, no GPUs needed")
        write_json(ctx.run_dir / "env.json", info)
        return {"status": "ok", "dry_run": True}

    rc, out = _cmd(["nvidia-smi", "--query-gpu=index,name,memory.total,driver_version", "--format=csv,noheader"])
    gpus = [l for l in out.splitlines() if l.strip()] if rc == 0 else []
    info["gpus"] = gpus
    need = 1
    for pname in plan_profiles(cfg):
        p = cfg["profiles"][pname]
        if int(p.get("nodes", 1)) == 1:
            need = max(need, int(p["tp"]) * int(p.get("dp", 1)) * int(p["replicas"]))
    if "screen" in cfg.plan.get("stages", []):
        need = max(need, int((cfg.plan.get("screen") or {}).get("tp", 8)))
    check("gpus", len(gpus) >= need, f"{len(gpus)} visible, plan needs {need}")
    if gpus:
        driver = gpus[0].split(",")[-1].strip()
        info["driver"] = driver
        try:
            major = int(driver.split(".")[0])
            check("driver", major >= 550, f"{driver} (vLLM 0.33 wheels want a recent CUDA driver; "
                                         "setup.sh picks the matching torch build)", hard=False)
        except ValueError:
            pass
    rc, topo = _cmd(["nvidia-smi", "topo", "-m"])
    if rc == 0:
        (ctx.run_dir / "gpu_topology.txt").write_text(topo + "\n")
        check("nvlink", "NV" in topo, "NVLink/NVSwitch links present" if "NV" in topo else "no NVLink seen",
              hard=False)

    py = cfg.env_bin("serve", "python")
    rc, ver = _cmd([py, "-c", "import vllm, torch; print(vllm.__version__, torch.__version__, torch.version.cuda)"],
                   timeout=300)
    want = str(cfg["versions"]["vllm_serve"])
    check("vllm (serve env)", rc == 0 and ver.split()[0:1] == [want] if rc == 0 else False,
          ver.splitlines()[-1] if ver else "not importable; run scripts/setup.sh")
    info["serve_env"] = ver
    stages = cfg.plan.get("stages", [])
    if "screen" in stages or any(cfg["drafters"].get(d, {}).get("method") == "suffix" for d in needed(cfg)[1]):
        rc, _ = _cmd([py, "-c", "import arctic_inference"], timeout=120)
        check("arctic_inference", rc == 0, "needed for suffix decoding", hard=False)
    routes = (cfg.plan.get("train") or {}).get("routes") or []
    if "train" in stages and routes:
        for env in (["hs", "train"] if any(r.startswith("speculators") for r in routes) else []) + \
                   (["modelopt"] if "modelopt_eagle3" in routes else []):
            exe = Path(cfg.env_bin(env, "python"))
            check(f"env {env}", exe.exists(), str(exe))
        for repo in (["speculators"] if any(r.startswith("speculators") for r in routes) else []) + \
                    (["Model-Optimizer"] if "modelopt_eagle3" in routes else []):
            path = cfg.path("repos") / repo
            check(f"repo {repo}", path.exists(), str(path))

    models, drafters = needed(cfg)
    for m in models:
        d = model_dir(cfg, m)
        check(f"model {m}", (d / "config.json").exists(), str(d))
    for name in drafters:
        dd = cfg["drafters"].get(name, {})
        if dd.get("repo"):
            d = cfg.path("models") / dd["repo"]
            check(f"drafter {name}", (d / "config.json").exists(), str(d), hard=False)
    for key in ("work", "data", "models"):
        p = cfg.path(key)
        p.mkdir(parents=True, exist_ok=True)
        free = shutil.disk_usage(p).free / 1e9
        check(f"disk {key}", free > 50, f"{free:,.0f} GB free at {p}", hard=False)
    for pname in plan_profiles(cfg):
        try:
            profile(cfg, pname, ctx.run_dir)
        except Exception as e:  # unresolved 'best' is fine before screening
            if "best" not in str(e):
                check(f"profile {pname}", False, str(e))
    info["problems"] = problems
    write_json(ctx.run_dir / "env.json", info)
    if problems:
        raise PreflightError("; ".join(problems))
    return {"status": "ok", "gpus": len(gpus)}
