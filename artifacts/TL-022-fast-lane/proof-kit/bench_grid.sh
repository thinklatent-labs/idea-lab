#!/usr/bin/env bash
# TL-022 fast-lane proof kit: sweep one served profile across the input x reply grid and concurrency levels.
# Every cell writes one vLLM bench JSON; bucket_sheet.py turns the folder into the bucket sheet.
#
#   BASE_URL=http://10.0.0.5:8001 MODEL=core-27b-fast PROFILE=27b-tp8-fp8-eagle3 ./bench_grid.sh
#   DATA=text PROMPTS_DIR=./prompts ...   real text, needed for any drafter arm (acceptance on random tokens means nothing)
#
# Knobs (environment): INPUTS, OUTPUTS, CONCURRENCY, PREFIX_SHARES (percent of the prompt repeated across calls),
# NUM_PROMPTS (per cell), SLO_MS (goodput threshold, end to end), OUT_DIR.
set -euo pipefail
: "${BASE_URL:?set BASE_URL to the server or gateway}" "${MODEL:?set MODEL to the served model name}" "${PROFILE:?set PROFILE, e.g. 27b-tp8-fp8-eagle3}"
DATA="${DATA:-random}"                      # random | text
PROMPTS_DIR="${PROMPTS_DIR:-./prompts}"     # text mode: prompts_<input>.jsonl, one {"prompt": ...} per line, trimmed to that length
INPUTS="${INPUTS:-1000 2000 4000 6000 8000 10000}"
OUTPUTS="${OUTPUTS:-10 64 150 300 500 1000}"
CONCURRENCY="${CONCURRENCY:-1 4 8 16}"
PREFIX_SHARES="${PREFIX_SHARES:-0}"         # e.g. "0 50 80" (random mode only: shared prefix via --random-prefix-len)
NUM_PROMPTS="${NUM_PROMPTS:-120}"
SLO_MS="${SLO_MS:-200}"
OUT_DIR="${OUT_DIR:-./results/${PROFILE}}"
mkdir -p "$OUT_DIR"

for in_len in $INPUTS; do
  for out_len in $OUTPUTS; do
    for conc in $CONCURRENCY; do
      for share in $PREFIX_SHARES; do
        name="${PROFILE}__in${in_len}__out${out_len}__c${conc}__p${share}"
        [[ -f "$OUT_DIR/$name.json" ]] && { echo "skip $name"; continue; }
        if [[ "$DATA" == "random" ]]; then
          prefix=$(( in_len * share / 100 ))
          data_args=(--dataset-name random --random-prefix-len "$prefix" --random-input-len $(( in_len - prefix )) --random-output-len "$out_len" --ignore-eos)
        else
          data_args=(--dataset-name custom --dataset-path "$PROMPTS_DIR/prompts_${in_len}.jsonl" --custom-output-len "$out_len")
        fi
        echo "run $name"
        vllm bench serve --base-url "$BASE_URL" --model "$MODEL" \
          "${data_args[@]}" \
          --num-prompts "$NUM_PROMPTS" --max-concurrency "$conc" --request-rate inf \
          --percentile-metrics ttft,tpot,itl,e2el --metric-percentiles 50,95,99 \
          --goodput "e2el:${SLO_MS}" \
          --save-result --result-dir "$OUT_DIR" --result-filename "$name.json"
      done
    done
  done
done
echo "done: $(ls "$OUT_DIR" | wc -l) result files in $OUT_DIR"
