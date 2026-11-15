#!/usr/bin/env bash
# Create the Python environments the proof needs, on shared storage so every node sees them.
#
#   bash scripts/setup.sh            serving environment + training environments
#   bash scripts/setup.sh serve      serving environment only (enough for the quick plan)
#   bash scripts/setup.sh train      training environments only
#
# Environments (paths in scripts/env.sh):
#   fastlane-serve     vLLM 0.33.0 (latest release; EAGLE-3, DFlash, DSpark and Gemma 4 MTP),
#                      arctic-inference (suffix decoding), datasets, this kit
#   fastlane-hs        vLLM 0.27.1 + hs_connectors: the hidden-states server for Speculators
#                      (the version Speculators' training tutorial pins)
#   fastlane-train     Speculators at a pinned commit
#   fastlane-modelopt  NVIDIA Model Optimizer at a pinned commit (NVIDIA's EAGLE-3 route)
# uv picks the PyTorch build that matches the node's CUDA driver (--torch-backend=auto).
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source "$HERE/scripts/env.sh"
WHAT="${1:-all}"
PYV="${FASTLANE_PYTHON:-3.12}"
pin() { grep -E "^\s*$1:" "$HERE/config/proof.yaml" | head -1 | sed -E 's/^[^:]*: *"?([^" #]+)"?.*/\1/'; }
VLLM_SERVE="$(pin vllm_serve)"
VLLM_HS="$(pin vllm_hidden_states)"
SPEC_COMMIT="$(pin speculators_commit)"
MO_COMMIT="$(pin modelopt_commit)"

if ! command -v uv >/dev/null 2>&1; then
  echo "installing uv"
  python3 -m pip install --user --quiet uv
fi
mkdir -p "$FASTLANE_ENVS" "$FASTLANE_REPOS" "$FASTLANE_MODELS" "$FASTLANE_DATA" "$FASTLANE_WORK"

clone() {  # clone <url> <dir> <commit>
  if [ ! -d "$2/.git" ]; then git clone --quiet "$1" "$2"; fi
  git -C "$2" fetch --quiet origin "$3" 2>/dev/null || git -C "$2" fetch --quiet origin
  git -C "$2" checkout --quiet "$3"
  echo "  $(basename "$2") at $(git -C "$2" rev-parse --short HEAD)"
}

setup_serve() {
  local E="$FASTLANE_ENVS/fastlane-serve"
  echo "== serving environment: $E (vLLM $VLLM_SERVE)"
  uv venv --quiet --allow-existing --python "$PYV" "$E"
  uv pip install --quiet --python "$E/bin/python" "vllm==$VLLM_SERVE" --torch-backend=auto
  uv pip install --quiet --python "$E/bin/python" arctic-inference "datasets>=3.0" huggingface_hub pytest
  uv pip install --quiet --python "$E/bin/python" -e "$HERE"
  "$E/bin/python" -c "import vllm, torch; print('  vllm', vllm.__version__, 'torch', torch.__version__, 'cuda', torch.version.cuda)"
}

setup_train() {
  echo "== Speculators ($SPEC_COMMIT)"
  clone https://github.com/vllm-project/speculators.git "$FASTLANE_REPOS/speculators" "$SPEC_COMMIT"
  local HS="$FASTLANE_ENVS/fastlane-hs" TR="$FASTLANE_ENVS/fastlane-train" MO="$FASTLANE_ENVS/fastlane-modelopt"
  echo "== hidden-states environment: $HS (vLLM $VLLM_HS + hs_connectors)"
  uv venv --quiet --allow-existing --python "$PYV" "$HS"
  uv pip install --quiet --python "$HS/bin/python" "vllm==$VLLM_HS" --torch-backend=auto
  uv pip install --quiet --python "$HS/bin/python" -e "$FASTLANE_REPOS/speculators/hs_connectors"
  echo "== training environment: $TR (Speculators)"
  uv venv --quiet --allow-existing --python "$PYV" "$TR"
  uv pip install --quiet --python "$TR/bin/python" -e "$FASTLANE_REPOS/speculators/hs_connectors" \
    -e "$FASTLANE_REPOS/speculators" --torch-backend=auto
  "$TR/bin/speculators" --version || true
  echo "== Model Optimizer ($MO_COMMIT)"
  clone https://github.com/NVIDIA/Model-Optimizer.git "$FASTLANE_REPOS/Model-Optimizer" "$MO_COMMIT"
  uv venv --quiet --allow-existing --python "$PYV" "$MO"
  uv pip install --quiet --python "$MO/bin/python" -e "$FASTLANE_REPOS/Model-Optimizer[hf]" --torch-backend=auto
  uv pip install --quiet --python "$MO/bin/python" \
    -r "$FASTLANE_REPOS/Model-Optimizer/examples/speculative_decoding/requirements.txt"
}

case "$WHAT" in
  serve) setup_serve ;;
  train) setup_train ;;
  all) setup_serve; setup_train ;;
  *) echo "usage: $0 [all|serve|train]"; exit 2 ;;
esac
echo "done. Next: bash scripts/download.sh"
