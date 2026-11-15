"""Scale: one unit at 1x load against two units at 2x load across two nodes (H5).

Needs a two-node allocation: sbatch --nodes=2 scripts/proof.sbatch with PLAN=two_node.
"""

from __future__ import annotations

from fastlane.stages.common import Ctx
from fastlane.stages.load import run_scale


def run(ctx: Ctx) -> dict:
    return run_scale(ctx)
