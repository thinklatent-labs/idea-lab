"""Download the weights a plan needs (public Hugging Face repos) to paths.models.

  python -m fastlane download --plan standard

Gemma 4 weights are Apache-2.0. Set HF_TOKEN if your account or network needs
it. Run on a node with internet access (the login node on HyperPod).
"""

from __future__ import annotations

import os
import shutil
from pathlib import Path

from fastlane.config import Config, ConfigError, parse_drafter
from fastlane.util import LOG, write_json


def plan_profiles(cfg: Config) -> list[str]:
    plan = cfg.plan
    names: list[str] = []
    stages = plan.get("stages", [])
    if "grid" in stages:
        names += (plan.get("grid") or {}).get("profiles", [])
    if "small" in stages:
        names += (plan.get("small") or {}).get("profiles", [])
    if "layouts" in stages:
        names += (plan.get("layouts") or {}).get("profiles", [])
    if "load" in stages or "scale" in stages:
        names.append(cfg["load"]["cluster"]["profile"])
    if "scale" in stages:
        names.append((plan.get("scale") or {}).get("profile", cfg["load"]["cluster"]["profile"]))
    if "train" in stages and (plan.get("train") or {}).get("routes"):
        names.append((plan.get("train") or {}).get("generator_profile", "gen_bf16_dp4"))
    return list(dict.fromkeys(names))


def needed(cfg: Config) -> tuple[list[str], list[str]]:
    """(model keys, drafter names) the plan uses. 'best' expands to every screened drafter."""
    plan = cfg.plan
    models: list[str] = []
    drafters: list[str] = []
    stages = plan.get("stages", [])
    if "screen" in stages:
        models.append("target_fp8")
        for spec in (plan.get("screen") or {}).get("drafters", []):
            name, _ = parse_drafter(spec)
            if name:
                drafters.append(name)
    default_best = plan.get("default_best") or cfg.get("default_best")
    for pname in plan_profiles(cfg):
        p = cfg["profiles"].get(pname)
        if p is None:
            raise ConfigError(f"plan {cfg.plan_name} names unknown profile {pname}")
        models.append(p["model"])
        d = p.get("drafter", "none")
        if d == "best":
            name, _ = parse_drafter(default_best)
            if name:
                drafters.append(name)
        else:
            name, _ = parse_drafter(d)
            if name:
                drafters.append(name)
    if "train" in stages and (plan.get("train") or {}).get("routes"):
        models += ["target_bf16", "target_fp8"]
        drafters += ["eagle3_redhat", "dflash_redhat"]
    if "grid" in stages and (plan.get("quality") or {}).get("profiles"):
        for pname in plan["quality"]["profiles"]:
            models.append(cfg["profiles"][pname]["model"])
    return list(dict.fromkeys(models)), list(dict.fromkeys(drafters))


def repos(cfg: Config) -> list[str]:
    models, drafters = needed(cfg)
    out = [cfg["models"][m]["repo"] for m in models if cfg["models"][m].get("repo")]
    out += [cfg["drafters"][d]["repo"] for d in drafters if cfg["drafters"].get(d, {}).get("repo")]
    return list(dict.fromkeys(out))


def dir_size_gb(p: Path) -> float:
    total = 0
    for root, _dirs, files in os.walk(p):
        for f in files:
            try:
                total += (Path(root) / f).stat().st_size
            except OSError:
                pass
    return total / 1e9


def run(cfg: Config) -> dict:
    base = cfg.path("models")
    base.mkdir(parents=True, exist_ok=True)
    wanted = repos(cfg)
    LOG.info("plan %s needs %d repositories under %s", cfg.plan_name, len(wanted), base)
    if cfg.dry_run:
        for r in wanted:
            LOG.info("  (dry run) would download %s", r)
        return {"status": "dry-run", "repos": wanted}
    from huggingface_hub import snapshot_download  # Apache-2.0

    free_gb = shutil.disk_usage(base).free / 1e9
    LOG.info("free space at %s: %.0f GB (expect about 150 GB for the standard plan)", base, free_gb)
    done = {}
    for r in wanted:
        dest = base / r
        LOG.info("downloading %s -> %s", r, dest)
        snapshot_download(repo_id=r, local_dir=str(dest), token=os.environ.get("HF_TOKEN") or None,
                          ignore_patterns=["original/*", "*.pth", "*.gguf", "*.onnx"])
        done[r] = round(dir_size_gb(dest), 1)
        LOG.info("  %s: %.1f GB", r, done[r])
    write_json(base / "fastlane-downloads.json", done)
    return {"status": "ok", "repos": done}
