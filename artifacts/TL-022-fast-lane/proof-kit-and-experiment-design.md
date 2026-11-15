# Fast lane (fast-lane): proof kit and experiment design, 2026-11-15

TL-022 fast-lane · Seed · Spec (proof build) · engineering material · D-378
Head of ThinkLatent (Jithin), sponsor and decider; serving lead (Claude).

## What it is

A runnable proof of the fast-lane design. One Slurm job on one 8× H100 node does three things:

- measures, on public Gemma 4 31B with vLLM 0.33.0, everything the design rests on;
- writes a report that judges ten pre-registered hypotheses;
- pushes the results to GitHub for the next lab session to read.

**Repository:** thinklatent-labs/fast-lane (private). Jithin is creating it. Until then the kit is mirrored here at `artifacts/TL-022-fast-lane/fast-lane-kit/` and was sent to him as `fast-lane-kit.zip`.

**Status:** built and tested end to end on simulated vLLM servers. All 10 tests pass, including a dry run of every stage. It has not yet run on GPUs, so the first real run (`PLAN=quick`) is the check of flags and versions on the cluster.

## How to run (HyperPod Slurm, FSx at /fsx)

```bash
git clone git@github.com:thinklatent-labs/fast-lane.git /fsx/fastlane/fast-lane && cd /fsx/fastlane/fast-lane
bash scripts/setup.sh                                  # environments on FSx, about 20 min
PLAN=standard bash scripts/download.sh                 # weights (about 150 GB) and the prompt library
PLAN=quick sbatch scripts/proof.sbatch                 # about 3 h: every serving stage at small size
PLAN=standard PUBLISH=1 sbatch scripts/proof.sbatch    # about 24 h: the proof; pushes results when done
```

Runs resume: resubmit with the same `RUN_ID` and finished cells and stages are skipped. The report is at `results/<run-id>/REPORT.md` (and `report.html`). It contains the verdicts, the bucket sheet, charts and every cell. `summary.json` is the file the lab reads.

## Hypotheses (pre-registered; thresholds fixed in config/proof.yaml)

| ID | Claim | Confirmed if | Refuted if |
| --- | --- | --- | --- |
| H1 | The best drafter reaches mean accepted length (tau) 3.5 on Quick and Answer calls at temperature 0 | tau ≥ 3.5 | tau < 2.5 |
| H2 | TP8 with the drafter gives 1,000 tok/s per call at p50 with 8 in flight (prompts up to 4,000, 300-token replies) | p50 ≥ 1,000 | p50 < 1,000 |
| H3 | 4-bit (Google's QAT W4A16) stays within 1 point of FP8. Proxy: GSM8K, all 1,319 questions. The TL Index check is company-side. | Drop ≤ 1 point | Drop > 2 points |
| H4 | Gemma 4 E2B with MTP (the 7B stand-in) returns 300 tokens in 200 ms at p95, at up to 8 in flight per TP4 replica, at 1K, 4K and 10K prompts | All cells ≤ 200 ms | Any cell > 200 ms |
| H5 | Units scale linearly: two nodes at 2x load against one at 1x (plan `two_node`) | p95 rise ≤ 10% | p95 rise > 10% |
| H6 | Borrowing raises a busy bucket's sustainable rate by 50%, and the lender keeps its promise | Both hold | The lender breaks its promise |
| H7 (new) | One node serves 1M input tokens a minute with 95% of fast calls inside their bucket's promise | ≥ 95% | < 95% |
| H8 (new) | The bucketed picker beats round robin on fast-call attainment | +5 points or more | 0 or less |
| H9 (new) | Our drafter, trained on public data, comes within 10% of the public drafter's tau (per route) | ratio ≥ 0.90 | ratio < 0.75 |
| H10 (new) | The 31B returns 300 tokens in 200 ms at p95 (1K prompt, 1 in flight). Expected to refute. | ≤ 200 ms | > 200 ms |

The kill signal is unchanged: if H1 and H2 both refute, stop the GPU fast lane for the 27B.

## Stages and plans

| Stage | What | Answers |
| --- | --- | --- |
| screen | Every public 31B drafter on identical prompts at TP8, one call at a time: Red Hat EAGLE-3, DFlash and DSpark, Google MTP, and suffix decoding. Picks the fastest, and checks replies match plain decoding. | Best drafter, H1 context |
| grid | Prompts 1K to 10K × replies 10 to 1,000 × 1 to 16 in flight, for TP8, TP4 and 4-bit, plus 50% and 80% prefix sharing. The GSM8K check runs alongside. | H1, H2, H3, H10, bucket sheet |
| small | E2B with MTP at TP1, TP2 and TP4 | H4 |
| layouts | 1×TP8, 2×TP4, 4×TP2 and 8×TP1, from 1 to 512 in flight | Speed per call against total output |
| load | Two TP4 replicas behind the router: capacity at 0.5x to 2x, four policies, the borrowing test | H6, H7, H8 |
| scale | Two nodes | H5 |
| train | On-policy replies from the BF16 31B, then EAGLE-3 by Speculators (standard). The full plan adds Speculators DFlash and Model Optimizer EAGLE-3 (D-377). Each is compared with its public counterpart. | H9 |

Plans: `smoke` (simulated, 4 min), `quick` (about 3 h), `standard` (about 24 h, everything except H5), `full` (about 60 h, all three training routes), and `two_node` (H5).

## Design choices worth knowing

- **Real text, not random tokens.** Prompts are public news articles cut to exact token lengths, with document tasks (classify, extract, answer, brief). Replies are fixed to length with min_tokens, and each instruction asks for a longer reply.
- **Public drafters first, then our training.** The screen tests the public drafters, and our training is measured against them (H9). The standard plan trains one route to fit a day; the full plan runs both, as D-377 decided.
- **The picker is pure code** (`fastlane/picker.py`). The proof's router uses it now, and an Envoy ext_proc service can use it later (CAP-039). Policies: round robin, least load, affinity with bounded load, and bucketed with borrowing and priorities.
- **vLLM 0.33.0 for serving.** Production runs 0.26.0, but the newest drafters (DSpark, Gemma 4 MTP) need 0.33.0, so the results also make the case for the upgrade. The Speculators hidden-states server uses 0.27.1, as its tutorial pins.
- **Licences.** The kit is MIT. Its dependencies are Apache-2.0, MIT or BSD. The datasets are CNN/DailyMail (Apache-2.0), UltraChat (MIT) and GSM8K (MIT). Magpie (Llama 3.1 licence) is not used. The z-lab DFlash drafter is off by default because it needs trust-remote-code.

## Corrections to earlier TL-022 docs

The scout brief and the drafter recipe said the public 31B drafters "will not fit the Core", and that every Core refresh retrains. That was too strong.

A drafter reads the target's internal states, so a public 31B drafter loads on the Core only if the width prune kept the hidden size. Google's MTP drafter also needs the attention layout unchanged, because it shares the KV cache. If one loads, measure acceptance per bucket before deciding to train, and fine-tune from it if it falls short.

Both docs were corrected on 2026-11-15. Two questions are now open in the register:

- **Q8:** which dimensions did the prune cut?
- **Q7:** at each Core release, retrain the drafter every time, or check acceptance first?

## Risks for the first hardware run

- **Version-specific flags.** FP8 KV cache and async scheduling are optional. If a server refuses them, it restarts without them and the report records it.
- **Model Optimizer on a 31B.** Online training needs FSDP sharding, which the kit sets with cp_size 2. Verify this on the first full run.
- **H1 and H2 are genuinely at risk on document prompts.** On Red Hat's own cards, summarisation and RAG accept least (EAGLE-3 about 2.1 to 2.5, DFlash about 2.5 to 3.4).

## Decision

D-378: Jithin directed (2026-11-15) that the proof be built as runnable code on public Gemma 4 31B rather than more answers. The kit is one Slurm job that writes the report and pushes results to GitHub. It adds H7 to H10 to H1 to H6. It tests the public drafters first and measures our training against them, which keeps D-377 in the full plan. Its home is thinklatent-labs/fast-lane, created by Jithin.

## Next step

Jithin creates thinklatent-labs/fast-lane (private, empty), and Claude pushes the kit. Then run `PLAN=quick`, then `PLAN=standard PUBLISH=1`, on one 8× H100 node, by 27 Nov. The next session reads the results and records the evidence for H1 to H10.

## Sources

- vLLM releases: v0.33.0 (2 Nov 2026), with DSpark and DFlash in speculative decoding. https://github.com/vllm-project/vllm/releases
- vLLM speculative decoding methods (suffix, MTP for the Gemma 4 assistant checkpoints). https://docs.vllm.ai/en/latest/features/speculative_decoding/
- Speculators at commit 05f9ba2 (prepare-data, launch_vllm.py, train, regenerate-responses). https://github.com/vllm-project/speculators
- NVIDIA Model Optimizer at commit ef893e7 (launch_train.sh, export_hf_checkpoint.py, convert_to_vllm_ckpt.py). https://github.com/NVIDIA/Model-Optimizer
- Red Hat Gemma 4 31B speculators (EAGLE-3, DFlash): commands and acceptance per task. https://huggingface.co/RedHatAI/gemma-4-31B-it-speculator.eagle3 and https://huggingface.co/RedHatAI/gemma-4-31B-it-speculator.dflash
- Google Gemma 4 31B MTP drafter. https://huggingface.co/google/gemma-4-31B-it-assistant
- vLLM recipe for Gemma 4 31B (text-only flags, the W4A16 QAT and FP8 checkpoints). https://recipes.vllm.ai/Google/gemma-4-31B-it
