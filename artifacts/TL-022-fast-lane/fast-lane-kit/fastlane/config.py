"""Configuration: one YAML file (config/proof.yaml), environment expansion, plans.

A plan (smoke, quick, standard, full, two_node) chooses which stages run and how
large each stage is. Everything else (models, drafters, profiles, buckets, the
traffic mix and the hypothesis thresholds) is shared by every plan.
"""

from __future__ import annotations

import copy
import os
import re
from pathlib import Path
from typing import Any

import yaml

from fastlane.util import read_json

REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_CONFIG = REPO_ROOT / "config" / "proof.yaml"

_ENV = re.compile(r"\$\{([A-Za-z_][A-Za-z0-9_]*)(?::-([^}]*))?\}")


class ConfigError(RuntimeError):
    pass


def _expand(value: Any) -> Any:
    if isinstance(value, str):
        def repl(m: re.Match) -> str:
            return os.environ.get(m.group(1), m.group(2) if m.group(2) is not None else "")
        return _ENV.sub(repl, value)
    if isinstance(value, list):
        return [_expand(v) for v in value]
    if isinstance(value, dict):
        return {k: _expand(v) for k, v in value.items()}
    return value


def _set_path(d: dict, dotted: str, value: Any) -> None:
    keys = dotted.split(".")
    cur = d
    for k in keys[:-1]:
        if k not in cur or not isinstance(cur[k], dict):
            cur[k] = {}
        cur = cur[k]
    cur[keys[-1]] = value


def deep_merge(base: dict, over: dict) -> dict:
    out = copy.deepcopy(base)
    for k, v in (over or {}).items():
        if isinstance(v, dict) and isinstance(out.get(k), dict):
            out[k] = deep_merge(out[k], v)
        else:
            out[k] = copy.deepcopy(v)
    return out


class Config(dict):
    """The loaded configuration. `plan` is the selected plan's settings."""

    @property
    def plan(self) -> dict:
        return self["plan"]

    @property
    def plan_name(self) -> str:
        return self["plan_name"]

    @property
    def dry_run(self) -> bool:
        return bool(self.get("dry_run"))

    def path(self, key: str) -> Path:
        p = Path(self["paths"][key])
        if not p.is_absolute():
            p = REPO_ROOT / p
        return p

    def env_bin(self, env: str, exe: str) -> str:
        return str(Path(self["envs"][env]) / "bin" / exe)

    def stage(self, name: str) -> dict:
        return self.plan.get(name) or {}


def load(path: str | Path | None = None, plan: str | None = None,
         overrides: list[str] | None = None, dry_run: bool = False) -> Config:
    path = Path(path) if path else DEFAULT_CONFIG
    raw = yaml.safe_load(path.read_text())
    cfg = _expand(raw)
    for item in overrides or []:
        if "=" not in item:
            raise ConfigError(f"override must be key=value: {item}")
        k, v = item.split("=", 1)
        _set_path(cfg, k.strip(), yaml.safe_load(v))
    plan = plan or cfg.get("default_plan", "standard")
    plans = cfg.get("plans", {})
    if plan not in plans:
        raise ConfigError(f"unknown plan {plan!r}; choose one of {sorted(plans)}")
    cfg["plan_name"] = plan
    cfg["plan"] = copy.deepcopy(plans[plan])
    # A plan may override shared sections (for example prompts.lengths).
    for section in ("prompts", "serving", "load", "sim"):
        if isinstance(cfg["plan"].get(section), dict):
            cfg[section] = deep_merge(cfg.get(section, {}), cfg["plan"][section])
    cfg["dry_run"] = bool(dry_run or cfg["plan"].get("dry_run", False))
    cfg["config_path"] = str(path)
    return Config(cfg)


# ---------------------------------------------------------------- models and drafters

def model_dir(cfg: Config, key: str) -> Path:
    m = cfg["models"].get(key)
    if m is None:
        raise ConfigError(f"unknown model {key!r}")
    if m.get("path"):
        return Path(m["path"])
    return cfg.path("models") / m["repo"]


def parse_drafter(spec: str | None) -> tuple[str | None, int | None]:
    """'eagle3_redhat@5' -> ('eagle3_redhat', 5); 'none' -> (None, None)."""
    if spec is None or str(spec).lower() in ("none", "null", ""):
        return None, None
    s = str(spec)
    if "@" in s:
        name, k = s.split("@", 1)
        return name, int(k)
    return s, None


def runtime_drafters(run_dir: Path | None) -> dict:
    """Drafters registered during a run (best-of-screen, trained checkpoints)."""
    if run_dir is None:
        return {}
    return read_json(Path(run_dir) / "drafters.json", {}) or {}


def resolve_drafter(cfg: Config, spec: str | None, run_dir: Path | None = None) -> dict | None:
    """Return a full drafter description, or None for no speculative decoding.

    'best' resolves to the screen stage's winner (run_dir/drafters.json), else to
    plan.default_best, else to the config's default_best.
    """
    if spec == "best":
        rt = runtime_drafters(run_dir)
        spec = (rt.get("best") or {}).get("spec") or cfg.plan.get("default_best") or cfg.get("default_best")
        if not spec:
            raise ConfigError("drafter 'best' is unresolved: run the screen stage or set default_best")
    name, k = parse_drafter(spec)
    if name is None:
        return None
    rt = runtime_drafters(run_dir)
    base = cfg["drafters"].get(name) or (rt.get("trained") or {}).get(name)
    if base is None:
        raise ConfigError(f"unknown drafter {name!r}")
    d = copy.deepcopy(base)
    d["name"] = name
    d["k"] = int(k if k is not None else d.get("k", 3))
    d["spec"] = f"{name}@{d['k']}"
    if d.get("path"):
        d["dir"] = str(d["path"])
    elif d.get("repo"):
        d["dir"] = str(cfg.path("models") / d["repo"])
    else:
        d["dir"] = None  # model-free methods (suffix, ngram)
    return d


def profile(cfg: Config, name: str, run_dir: Path | None = None) -> dict:
    """A serving profile with its drafter resolved. Raises ConfigError if unknown."""
    p = cfg["profiles"].get(name)
    if p is None:
        raise ConfigError(f"unknown profile {name!r}")
    p = copy.deepcopy(p)
    p["name"] = name
    p["drafter_spec"] = p.get("drafter", "none")
    p["drafter"] = resolve_drafter(cfg, p["drafter_spec"], run_dir)
    p.setdefault("dp", 1)
    p.setdefault("nodes", 1)
    p["gpus_per_replica"] = int(p["tp"]) * int(p["dp"])
    return p


def ad_hoc_profile(cfg: Config, *, model: str, tp: int, replicas: int, drafter: str | None,
                   mode: str = "latency", name: str | None = None, run_dir: Path | None = None,
                   dp: int = 1, extra_flags: list[str] | None = None) -> dict:
    d = resolve_drafter(cfg, drafter, run_dir)
    label = name or f"{model}_tp{tp}_{(d or {}).get('spec', 'none').replace('@', 'k')}"
    return {
        "name": label, "model": model, "tp": tp, "dp": dp, "replicas": replicas, "mode": mode,
        "drafter_spec": drafter or "none", "drafter": d, "nodes": 1,
        "gpus_per_replica": tp * dp, "extra_flags": extra_flags or [],
    }
