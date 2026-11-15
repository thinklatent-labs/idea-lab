#!/usr/bin/env bash
# The whole proof on simulated vLLM servers: every stage, the router, the report and
# the verdicts, in a few minutes, on any machine (no GPUs, no network, no weights).
# It tests the pipeline. Its numbers mean nothing.
#
#   bash scripts/dry_run.sh            (needs Python 3.11+ with aiohttp, pyyaml, numpy)
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PY="${FL_PY:-python3}"
OUT="${1:-$(mktemp -d /tmp/fastlane-dry.XXXX)}"
export FASTLANE_RESULTS="$OUT/results" FASTLANE_DATA="$OUT/data" FASTLANE_WORK="$OUT/work" \
       FASTLANE_MODELS="$OUT/models" FASTLANE_REPOS="$OUT/repos" FASTLANE_ENVS="$OUT/envs"
cd "$HERE"
"$PY" -m fastlane run --plan smoke --dry-run --run-id dry
echo "report: $OUT/results/dry/REPORT.md"
