"""Small model: the 200 ms class on public Gemma 4 E2B in FP8 (stand-in for the
7B Core) with Google's MTP drafter, at TP1, TP2 and TP4, across 1,000 to
10,000-token prompts (H4)."""

from __future__ import annotations

from fastlane.stages.common import Ctx
from fastlane.stages.grid import run_grid


def run(ctx: Ctx) -> dict:
    st = ctx.cfg.stage("small")
    if not st:
        return {"status": "skipped"}
    return run_grid(ctx, "small", st)
