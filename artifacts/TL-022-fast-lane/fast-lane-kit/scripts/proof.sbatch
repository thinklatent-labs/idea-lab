#!/bin/bash
# The fast-lane proof on one 8x H100 node (two for PLAN=two_node).
#
#   PLAN=quick sbatch scripts/proof.sbatch                     about 3 hours
#   PLAN=standard PUBLISH=1 sbatch scripts/proof.sbatch        about a day; pushes results when done
#   PLAN=two_node sbatch --nodes=2 scripts/proof.sbatch        H5 across two nodes
#   RUN_ID=<id> PLAN=standard sbatch scripts/proof.sbatch      resume a run where it stopped
#
#SBATCH --job-name=fastlane-proof
#SBATCH --nodes=1
#SBATCH --exclusive
#SBATCH --time=3-00:00:00
#SBATCH --output=slurm-%x-%j.out
#SBATCH --signal=B:USR1@300
set -euo pipefail
cd "${SLURM_SUBMIT_DIR:-$(pwd)}"
source scripts/env.sh
mkdir -p logs
PLAN="${PLAN:-standard}"
RUN_ID="${RUN_ID:-$(date +%Y%m%d-%H%M)-$PLAN}"
echo "fast-lane proof: plan $PLAN, run $RUN_ID, nodes ${SLURM_JOB_NODELIST:-$(hostname)}"
echo "resume later with: RUN_ID=$RUN_ID PLAN=$PLAN sbatch scripts/proof.sbatch"
# exec, so the kit receives Slurm's warning signal and stops every vLLM server cleanly
exec "$FL_PY" -m fastlane run --plan "$PLAN" --run-id "$RUN_ID" ${PUBLISH:+--publish} "$@"
