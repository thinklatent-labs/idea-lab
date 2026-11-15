"""Data: build the prompt library (pools of real-text prompts at each length,
the math set for the 4-bit check, and drafter-training prompts when needed)."""

from __future__ import annotations

from fastlane.stages.common import Ctx
from fastlane.util import write_json


def run(ctx: Ctx) -> dict:
    plan = ctx.cfg.plan
    train = plan.get("train") or {}
    samples = int(train.get("samples", 0)) if ("train" in plan.get("stages", []) and train.get("routes")) else 0
    manifest = ctx.lib.build(train_samples=samples, long_share=float(train.get("long_share", 0.3)))
    write_json(ctx.run_dir / "data_manifest.json", manifest)
    return {"status": "ok", "pools": manifest.get("pools"), "train_prompts": manifest.get("train_prompts", 0)}
