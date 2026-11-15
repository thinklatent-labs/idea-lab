# Paths for the fast-lane proof on SageMaker HyperPod (Slurm, FSx for Lustre at /fsx).
# Source this file; set any variable before sourcing to override it.

export FASTLANE_HOME="${FASTLANE_HOME:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
export FASTLANE_ENVS="${FASTLANE_ENVS:-/fsx/envs}"
export FASTLANE_MODELS="${FASTLANE_MODELS:-/fsx/models}"
export FASTLANE_DATA="${FASTLANE_DATA:-/fsx/fastlane/data}"
export FASTLANE_WORK="${FASTLANE_WORK:-/fsx/fastlane/work}"
export FASTLANE_REPOS="${FASTLANE_REPOS:-/fsx/fastlane/repos}"
export HF_HOME="${HF_HOME:-/fsx/fastlane/hf-cache}"
export FL_PY="$FASTLANE_ENVS/fastlane-serve/bin/python"
export PATH="$HOME/.local/bin:$PATH"
