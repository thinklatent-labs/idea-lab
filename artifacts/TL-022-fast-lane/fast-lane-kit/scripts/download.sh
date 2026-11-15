#!/usr/bin/env bash
# Download the weights a plan needs and build the prompt library.
# Run where there is internet access (the HyperPod login node).
#
#   PLAN=standard bash scripts/download.sh
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source "$HERE/scripts/env.sh"
PLAN="${PLAN:-standard}"
cd "$HERE"
"$FL_PY" -m fastlane download --plan "$PLAN"
"$FL_PY" -m fastlane data --plan "$PLAN"
echo "done. Next: PLAN=quick sbatch scripts/proof.sbatch"
