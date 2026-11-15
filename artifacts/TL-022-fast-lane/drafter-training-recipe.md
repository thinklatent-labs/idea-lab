# Fast lane (fast-lane) — Draft-model training recipe (EAGLE-3 and DFlash), 2026-11-15

TL-022 fast-lane · Seed · engineering material. A draft model (drafter) proposes the next few tokens and the served model checks them all in one step. Output is unchanged; only speed changes. The drafter's acceptance on your own outputs decides whether the 27B passes 1,000 tok/s on H100 (H1).

## 1. What NVIDIA did

- NVIDIA built the EAGLE-3 head behind its 1,000 tok/s Llama 4 Maverick record with TensorRT Model Optimizer (ModelOpt). Its published drafters are ModelOpt-built speculative decoding modules, among them Llama 4 Maverick, gpt-oss-120b, Qwen3-235B and Kimi K2.
- **Data scale:** NVIDIA's gpt-oss-120b EAGLE-3 card lists about 1.6 million training samples, mostly synthetic, meaning prompts answered by the target model itself. It is evaluated on MT-Bench.
- **Serving:** on TensorRT-LLM, with a draft length of 3 and the batch capped at 8 in its min-latency configuration.
- **ModelOpt's steps**, from its speculative_decoding example:
  1. Install ModelOpt with its Hugging Face extras.
  2. Prepare prompt conversations.
  3. Synthesize data: have the base model answer the prompts.
  4. Compute the base model's hidden states, offline (run_hf_compute_hiddens_dp.sh or run_trtllm_compute_hiddens_dp.sh), or train online when the base model fits beside the drafter.
  5. Train: `./launch_train.sh --model $BASE_MODEL --output_dir $OUTPUT_DIR --data input_conversations/train.jsonl --num_epochs $NUM_EPOCH --eagle_config eagle_config.json`.
  6. Compress the draft vocabulary, evaluate, export, deploy.

  A one-line demo, `bash train_eagle3_and_export.sh --base_model <model>`, runs the whole loop on a small model. Check ModelOpt's support matrix for Gemma 4 before choosing it.

## 2. Both routes, compared (D-377)

Jithin decided to train with both routes and compare acceptance. Steps 1 and 2 below (prompts, and the target writing the answers) are shared. The two routes then differ only in hidden states and training:

- **Speculators (vLLM-native), steps 3 to 5 below.** You serve on vLLM, and Speculators trains EAGLE-3, P-EAGLE, DFlash, DSpark and MTP drafters for your own model in vLLM's format. Gemma 4 31B already has EAGLE-3 and DFlash speculators trained with it, so the pipeline can first be checked against a known result.
- **Model Optimizer (NVIDIA's route), section 1's steps 4 to 6.** Run it on the same on_policy_conversations.jsonl, with an eagle_config.json set to EAGLE-3, one layer and a 32K draft vocabulary. First check its support matrix for Gemma 4 and that its export loads in vLLM 0.26.0. If either check fails, record that as the comparison's first finding.
- **The comparison:** serve each drafter on the same target, at the same draft length, on the same held-out prompts per bucket and the same temperature. Compare mean accepted length per bucket, tok/s per request at 1 and 8 in flight, and training hours. Keep the drafter with the higher accepted length on the Answer and Long-read buckets. Training hours break a tie.
- **Cost:** one extra training run per model, about a day on one 8× H100 node (estimate).

**Two environments:** a speculators environment for data preparation and training, and a vLLM environment for the target during training. Speculators' current guide installs vLLM 0.27.1 or later there, separate from the 0.26.0 serving stack. That is one more reason for TL-008's per-endpoint environments.

### Step 0. Install

```bash
git clone https://github.com/vllm-project/speculators.git && cd speculators
uv venv speculators_venv && source speculators_venv/bin/activate && uv pip install -e .
uv venv vllm_venv && source vllm_venv/bin/activate && uv pip install "vllm>=0.27.1"
```

### Step 1. Prompts

- **Lab:** public prompts shaped like your calls. Use UltraChat and ShareGPT for breadth, plus public sets close to the use cases (question answering over documents, summarization, extraction, classification). Include long prompts: 20% or more of samples at 4K to 12K tokens, because a drafter trained only on short contexts loses acceptance at 10K.
- **Company version:** production prompts per bucket from Langfuse, with sensitive data redacted, deduplicated, and weighted by each bucket's share of traffic.
- **Size:** start at 100K to 300K conversations. NVIDIA's own drafters use hundreds of thousands to 1.6 million. Speculators' own 5K-sample sanity runs reach an acceptance length of only about 1.5, so small sets give little.

### Step 2. Have the target write the answers

The drafter must learn your model's outputs, not the dataset's original answers.

- Serve the exact target you will deploy: the same pruned weights, and ideally the same FP8 precision.
- Use production sampling settings: system prompts, chat template, temperature and reply caps.
- Answer every prompt with a batch job, for example `vllm run-batch -i requests.jsonl -o answers.jsonl --model <target>` on the bulk profile. Write the result as conversations (`on_policy_conversations.jsonl`).

### Step 3. Prepare the data

Start the target's server for chat-template rendering, then run:

```bash
source speculators_venv/bin/activate
speculators prepare-data \
  --model google/gemma-4-31B-it \
  --data ./on_policy_conversations.jsonl \
  --render-endpoint http://localhost:8000 \
  --output ./data \
  --max-samples 200000 \
  --seq-length 12288 \
  --no-skip-token-freq
```

- `--no-skip-token-freq` writes token_freq.pt, which the reduced draft vocabulary needs. Gemma's vocabulary is 262K tokens, and the drafter predicts over the 32K most frequent in your data.
- The server's --max-model-len must exceed --seq-length (for example 12289).
- For the Core 27B, replace the model with its path.

### Step 4. Serve the target for hidden states

Use GPUs 0 to 3:

```bash
source vllm_venv/bin/activate
CUDA_VISIBLE_DEVICES=0,1,2,3 python scripts/launch_vllm.py google/gemma-4-31B-it -- \
  --tensor-parallel-size 2 --data-parallel-size 2 --port 8000 --max-model-len 12289
```

Wait for "Application startup complete". EAGLE-3 reads hidden states from three layers (early, middle, late); the script picks defaults. If you pass --target-layer-ids, pass the matching layers to training.

### Step 5. Train online on GPUs 4 to 7

Online training keeps the hidden states off disk. Offline they would run to terabytes: about 30 to 50 KB per token for a 27B, so 200 million training tokens is about 6 to 10 TB.

EAGLE-3 first:

```bash
source speculators_venv/bin/activate
CUDA_VISIBLE_DEVICES=4,5,6,7 torchrun --standalone --nproc_per_node 4 -m speculators.train \
  --verifier-name-or-path google/gemma-4-31B-it \
  --data-path ./data \
  --save-path ./ckpt-eagle3 \
  --draft-vocab-size 32000 \
  --epochs 5 \
  --total-seq-len 12288 \
  --vllm-endpoint http://localhost:8000/v1 \
  --on-missing generate
```

DFlash second: the same command with `--speculator-type dflash --num-layers 5 --lr 3e-4`, saving to ./ckpt-dflash.

Each epoch writes a self-contained checkpoint, and checkpoint_best points at the one with the lowest validation loss.

**Time on one 8× H100 node, estimated, for 200K conversations of about 4K tokens:**

| Step | Time |
| --- | --- |
| Writing the answers (step 2) | 2 to 3 hours |
| Five epochs with hidden states served on 4 GPUs | 10 to 18 hours |
| Total | About a day |

The proof's day 4 times the real numbers on a smaller set.

### Step 6. Measure acceptance, per bucket

Serve the target with the drafter:

```bash
vllm serve google/gemma-4-31B-it --tensor-parallel-size 8 --max-num-seqs 8 \
  --speculative-config '{"method": "eagle3", "model": "./ckpt-eagle3/checkpoint_best", "num_speculative_tokens": 3}'
```

- Replay held-out prompts per bucket at production temperature, and at temperature 0 for reference.
- Read acceptance from vLLM's metrics: mean accepted length τ = 1 + accepted tokens ÷ drafts, from the vllm:spec_decode_* counters. Per-position acceptance shows where drafts break.
- Compare against the public Gemma 4 31B speculators on the same prompts. Matching them proves the pipeline before you train on the Core.

**Targets that matter:**

| Target | What it needs |
| --- | --- |
| Core 27B over 1,000 tok/s on one 8× H100 node | τ of 3.9 in FP8 (4.3 with 8 in flight), or 3.3 with 4-bit weights |
| 7B Core, 300 tokens in 200 ms at TP2 | τ of about 3.7 to 4.0 |
| Kill signal | τ under 2.5 on Answer-bucket prompts (H1 refuted) |

### Step 7. Tune

- **EAGLE-3 draft length:** num_speculative_tokens 3 first (NVIDIA's best for Maverick), then 2 and 4.
- **DFlash:** match the block it was trained with; try two block sizes.
- **Draft vocabulary:** 32K by default. Try 64K if acceptance is low on rare domain terms.
- **Data mix:** add more of whichever bucket accepts worst.

### Step 8. Ship and keep it aligned

- A drafter belongs to one exact target version. Register them together, deploy them together, and roll them back together.
- Retrain the drafter on every Core refresh, since self-healing SFT changes the target. NeMo RL can also train an EAGLE-3 drafter online alongside the policy, keeping it aligned during RL; consider that if Core training moves that way.
- Watch acceptance in production per bucket. A drop means the traffic has drifted from the drafter's training data, and is a cue to retrain.

## 3. Lab version and company version

| | Lab (public) | Company version (inside the Enterprise) |
| --- | --- | --- |
| Target | Gemma 4 31B (and Gemma 4 E2B for the 7B track) | TLM4 Core 27B and the 7B Core |
| Prompts | Public sets shaped like the calls | Langfuse prompts per bucket, redacted |
| Proves | The pipeline reproduces the public speculators; timings | H1: acceptance on Enterprise outputs; the go or no-go for 1,000 tok/s on H100 |

## 4. Pitfalls

- Training on a dataset's original answers instead of the target's own: acceptance drops sharply.
- Hidden states from a different checkpoint than the served one (a width-pruned Core changes them): retrain on the Core, never reuse the 31B drafter.
- Short training contexts with long production prompts.
- A chat template or system prompt different from production.
- Judging a drafter on random-token benchmarks.
- Expecting much in the Quick bucket: with replies of 64 tokens or fewer, reading the prompt dominates.

## Decisions

| ID | Decision | By |
| --- | --- | --- |
| D-377 | Train draft models by both routes, Speculators and Model Optimizer, and compare acceptance per bucket. Dissent recorded: the recommendation was Speculators with Model Optimizer as a cross-check, because both routes cost an extra training run per model | Jithin |

## Sources

- [NVIDIA Llama 4 Maverick Eagle3 model card](https://huggingface.co/nvidia/Llama-4-Maverick-17B-128E-Eagle3) and [NVIDIA speculative decoding modules](https://www.huggingface.co/collections/nvidia/speculative-decoding-modules)
- [NVIDIA gpt-oss-120b Eagle3 card (data scale)](https://huggingface.co/nvidia/gpt-oss-120b-Eagle3-throughput)
- [Model Optimizer speculative decoding example](https://github.com/NVIDIA/Model-Optimizer/tree/main/examples/speculative_decoding)
- [TensorRT-LLM Maverick + EAGLE-3 guide](https://nvidia.github.io/TensorRT-LLM/blogs/tech_blog/blog6_Llama4_maverick_eagle_guide.html)
- [Speculators: train a speculator](https://docs.vllm.ai/projects/speculators/en/latest/user_guide/tutorials/train/) and [supported models](https://docs.vllm.ai/projects/speculators)
- [vLLM speculative decoding](https://docs.vllm.ai/en/v0.25.0/features/speculative_decoding/) and [vLLM production metrics](https://docs.vllm.ai/en/latest/usage/metrics/)
- [NeMo RL: Eagle3 online draft training](https://docs.nvidia.com/nemo/rl/latest/guides/eagle3-speculative-decoding.html)
