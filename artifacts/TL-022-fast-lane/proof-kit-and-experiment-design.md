# Fast lane (fast-lane): proof kit and experiment design, 2026-11-15

TL-022 fast-lane · Seed · Spec (proof build) · engineering material · D-378, D-382
Head of ThinkLatent (Jithin), sponsor and decider; serving lead (Claude).

## What it is

A runnable proof of the fast-lane design. One Slurm job on one 8× H100 node does three things:

- measures everything the design rests on, with vLLM 0.33.0;
- writes a report that judges ten pre-registered hypotheses;
- leaves the results where the lab can read them.

The kit runs in two places:

- **In the lab:** on public Gemma 4 31B, the stand-in, with results pushed to GitHub.
- **Inside the Enterprise (the company version, D-382):** on TLM4 Core 27B itself, with
  results kept inside.

**Repository:** thinklatent-labs/fast-lane (private), at kit 0.2.1. It is the code's
only home. The copy that used to sit in idea-lab is now a pointer.

**Status.** It has not yet run on GPUs. What has been checked:

- **Tests.** Tested on simulated vLLM servers: 42 unit tests and two end-to-end dry runs
  pass (the public plan, and the company overlay). CI runs them on every push.
- **Upstream sources.** Checked against the pinned upstream sources:
  - every vLLM flag, metric name and request field (vLLM's own request model accepts the client's body);
  - the Speculators and Model Optimizer commands;
  - all ten Hugging Face repositories (Apache-2.0, none gated).
- **Real install.** A fresh install from PyPI brings vLLM 0.33.0 with torch 2.14.0
  (CUDA 13.0), and arctic-inference built from source.
- **Independent audit.** A separate agent that had not seen the code audited it and
  found 12 problems (see "Independent audit" below). All are fixed, each with a
  regression test.

## How to run

**In the lab (HyperPod Slurm, FSx at /fsx):**

```bash
git clone git@github.com:thinklatent-labs/fast-lane.git /fsx/fastlane/fast-lane && cd /fsx/fastlane/fast-lane
bash scripts/setup.sh                                  # environments on FSx, about 20 min
PLAN=standard bash scripts/download.sh                 # weights (about 150 GB) and the prompt library
PLAN=quick sbatch scripts/proof.sbatch                 # about 3 h: every serving stage at small size
PLAN=standard PUBLISH=1 sbatch scripts/proof.sbatch    # about 24 h: the proof; pushes results when done
```

**Inside the Enterprise:** follow `ENTERPRISE.md` in the repository. In short:

1. Fill in the overlay `config/enterprise.yaml`.
2. Run `setup.sh`.
3. Run preflight on a GPU node.
4. Run `PLAN=quick`, then `PLAN=standard`.
5. Run `python -m fastlane export`.

Runs resume: resubmit with the same `RUN_ID`, and finished cells and stages are skipped.
The report is at `results/<run-id>/REPORT.md` (and `report.html`), with the verdicts,
the bucket sheet, charts and every cell. `summary.json` is the file the lab reads.

## The company version (kit 0.2.1, D-382)

Jithin runs the proof inside the Enterprise, separately from the lab. The code does not
change; one overlay (`config/enterprise.yaml`, from `config/enterprise.example.yaml`)
says what does:

- **The Core itself.** The overlay points at staged Core 27B weights: FP8 to serve, BF16
  to train drafters. The 7B Core takes the small-model rows.
  - Nothing is downloaded.
  - The report names the Core, and the stand-in-to-Core scaling is off (`core_ratio 1.0`).
  - Thresholds are untouched, so a verdict means the same thing in both places.
- **Drafter fit check.** Before any server starts, the kit compares each drafter's
  config with the target's: hidden size, and the layers it taps.
  - A public 31B drafter cannot load on a width-pruned Core. It is skipped and the reason
    recorded, so no start is wasted.
  - In that case the drafter the train stage builds on the Core carries H1 and H2. H9,
    ours against public, reads NOT RUN and says why.
- **Behind a firewall.** These all have stand-ins:
  - package, Git and Hugging Face mirrors;
  - public prompts staged as JSONL;
  - CUDA 13 torch builds, installed and checked even from a login node without GPUs.
- **Real traffic, optionally.** The load test can replay calls exported from Langfuse.
  Application names become `app-1`, `app-2` and so on. The converter also prints prompt
  and reply lengths per application, which answers open question 1 (bucket edges).
- **Results stay inside.** `publish.git` is false.
  - `python -m fastlane export` writes a numbers-only copy: report, verdicts, tables and
    charts.
  - It carries no prompts, replies, logs, paths or host names.
  - Whether that copy may come back to the lab is Q9.

## Hypotheses (pre-registered; thresholds fixed in config/proof.yaml)

| ID | Claim | Confirmed if | Refuted if |
| --- | --- | --- | --- |
| H1 | The best drafter reaches mean accepted length (tau) 3.5 on Quick and Answer calls at temperature 0 | tau ≥ 3.5 | tau < 2.5 |
| H2 | TP8 with the drafter gives 1,000 tok/s per call at p50 with 8 in flight (prompts up to 4,000, 300-token replies) | p50 ≥ 1,000 | p50 < 1,000 |
| H3 | 4-bit (Google's QAT W4A16) stays within 1 point of FP8. Proxy: GSM8K, all 1,319 questions. The TL Index check is company-side. | Drop ≤ 1 point | Drop > 2 points |
| H4 | Gemma 4 E2B with MTP (the 7B stand-in) returns 300 tokens in 200 ms at p95, at up to 8 in flight per TP4 replica, at 1K, 4K and 10K prompts | All cells ≤ 200 ms | Any cell > 200 ms |
| H5 | Units scale linearly: two nodes at 2x load against one at 1x (plan `two_node`) | p95 rise ≤ 10% | p95 rise > 10% |
| H6 | Borrowing raises a busy bucket's sustainable rate by 50%, and the lender keeps its promise | Both hold | The lender breaks its promise |
| H7 | One node serves 1M input tokens a minute with 95% of fast calls inside their bucket's promise | ≥ 95% | < 95% |
| H8 | The bucketed picker beats round robin on fast-call attainment | +5 points or more | 0 or less |
| H9 | Our drafter, trained on public data, comes within 10% of the public drafter's tau (per route) | ratio ≥ 0.90 | ratio < 0.75 |
| H10 | The 31B returns 300 tokens in 200 ms at p95 (1K prompt, 1 in flight). Expected to refute. | ≤ 200 ms | > 200 ms |

In the company version, each claim is about the Core 27B (H4: the 7B Core) itself.

The kill signal is unchanged: if H1 and H2 both refute, stop the GPU fast lane for the 27B.

A verdict reads NOT RUN, and never CONFIRMED or REFUTED, when the data behind it is
missing. That covers four cases:

- every drafter failed to start;
- a cell's calls failed;
- a bucket has no promise;
- the metrics baseline is missing.

## Stages and plans

| Stage | What | Answers |
| --- | --- | --- |
| screen | Every public drafter that fits the target, on identical prompts at TP8, one call at a time: Red Hat EAGLE-3, DFlash and DSpark, Google MTP, and suffix decoding. Picks the fastest, and checks replies match plain decoding. | Best drafter, H1 context |
| grid | Prompts 1K to 10K × replies 10 to 1,000 × 1 to 16 in flight, for TP8, TP4 and 4-bit, plus 50% and 80% prefix sharing. The GSM8K check runs alongside. | H1, H2, H3, H10, bucket sheet |
| small | The small model at TP1, TP2 and TP4 | H4 |
| layouts | 1×TP8, 2×TP4, 4×TP2 and 8×TP1, from 1 to 512 in flight | Speed per call against total output |
| load | Two TP4 replicas behind the router: capacity at 0.5x to 2x, four policies, the borrowing test. Mixed traffic, or replayed calls. | H6, H7, H8 |
| scale | Two nodes | H5 |
| train | On-policy replies from the BF16 target, then EAGLE-3 by Speculators (standard). The full plan adds Speculators DFlash and Model Optimizer EAGLE-3 (D-377). Each is compared with its public counterpart, where one fits. | H9 |

Plans: `smoke` (simulated, 4 min), `quick` (about 3 h), `standard` (about 24 h, everything except H5), `full` (about 60 h, all three training routes), and `two_node` (H5).

## Design choices worth knowing

- **Real text, not random tokens.** Prompts are public news articles cut to exact token lengths, with document tasks (classify, extract, answer, brief). Replies are fixed to length with min_tokens. In the load test, every call gets its own window of text, so the only shared prefix is the one each application is designed to have.
- **Public drafters first, then our training.** The screen tests the public drafters, and our training is measured against them (H9). The standard plan trains one route to fit a day; the full plan runs both, as D-377 decided.
- **The picker is pure code** (`fastlane/picker.py`). The proof's router uses it now, and an Envoy ext_proc service can use it later (CAP-039). Policies: round robin, least load, affinity with bounded load, and bucketed with borrowing and priorities.
- **vLLM 0.33.0 for serving.** Production runs 0.26.0, but the newest drafters (DSpark, Gemma 4 MTP) need 0.33.0, so the results also make the case for the upgrade. The Speculators hidden-states server uses 0.27.1, the minimum its tutorial asks for (it knows Gemma 4). Both are CUDA 13 builds, which need driver 580 or newer.
- **Failures are failures.** These all count as misses against their bucket's promise:
  - a mid-stream engine error;
  - a stream with no finish;
  - a short fixed-length reply;
  - a call the router refused.

  A cell where most calls fail is never saved as a result. It reruns on resume, and a
  crashed profile restarts once.
- **Licences.** The kit is MIT. Its dependencies are Apache-2.0, MIT or BSD. The datasets are CNN/DailyMail (Apache-2.0), UltraChat (MIT) and GSM8K (MIT). Magpie (Llama 3.1 licence) is not used. The z-lab DFlash drafter is off by default because it needs trust-remote-code.

## Independent audit (2026-11-16)

A separate agent that had not seen the kit audited version 0.2.0 against the pinned
upstream sources. Every finding is fixed in 0.2.1, with a regression test.

**Two would have stopped a real run:**
- `setup.sh`, run on a login node without GPUs, installed CPU-only torch.
- Model Optimizer's conversion failed on Gemma 4's composite config.

**Four would have skewed numbers or verdicts:**
- Load-test contexts repeated, which flattered the bucketed picker (H7, H8).
- Engine errors, and calls the router refused, counted as successes or were not judged.
- A server crash left empty cells that read as results; H10 could read CONFIRMED at 0 ms.
- If every drafter failed to start, plain decoding was crowned the best drafter, which
  fired the kill signal on a start-up failure.

**The other six were robustness fixes:**
- cell keys without the drafter;
- `--set` not reaching plan settings;
- a training timeout throwing away saved epochs;
- arctic-inference as a hard dependency;
- GPUs on a second node under gres constraints;
- a retry that did not wait for GPU memory.

## Corrections to earlier TL-022 docs

The scout brief and the drafter recipe said the public 31B drafters "will not fit the Core", and that every Core refresh retrains. That was too strong.

A drafter reads the target's internal states, so a public 31B drafter loads on the Core only if the width prune kept the hidden size. Google's MTP drafter also needs the attention layout unchanged, because it shares the KV cache. If one loads, measure acceptance per bucket before deciding to train, and fine-tune from it if it falls short. The kit's fit check now settles the first part on the cluster.

Both docs were corrected on 2026-11-15. Two questions remain open in the register:

- **Q8:** which dimensions did the prune cut?
- **Q7:** at each Core release, retrain the drafter every time, or check acceptance first?

## Risks for the first hardware run

- **Version-specific flags.**
  - Preflight asks the installed vLLM and Speculators for every flag and method the plan
    uses.
  - FP8 KV cache and async scheduling are optional: a server that refuses them restarts
    without them, and the report records it.
- **Driver and GPU visibility.** The nodes need driver 580 or newer. On clusters that
  constrain GPUs, the job must ask for them (`--gpus-per-node=8`). Preflight checks both.
- **Public drafters on the Core.** If the prune changed the hidden size, no public 31B
  drafter loads. H1 and H2 then rest on the drafter trained on the Core, which makes the
  train stage the critical path inside the Enterprise.
- **Model Optimizer on a 31B.** Online training needs FSDP sharding, which the kit sets
  with cp_size 2. Verify this on the first full run.
- **H1 and H2 are genuinely at risk on document prompts.** On Red Hat's own cards, summarisation and RAG accept least (EAGLE-3 about 2.1 to 2.5, DFlash about 2.5 to 3.4).

## Decisions

D-378: Jithin directed (2026-11-15) that the proof be built as runnable code on public Gemma 4 31B rather than more answers. The kit is one Slurm job that writes the report and pushes results to GitHub. It adds H7 to H10 to H1 to H6. It tests the public drafters first and measures our training against them, which keeps D-377 in the full plan. Its home is thinklatent-labs/fast-lane, created by Jithin.

D-382: Jithin decided (2026-11-16) to run the proof inside the Enterprise, separately from the lab, from thinklatent-labs/fast-lane.
- Kit 0.2.1 is that company version. It runs on TLM4 Core 27B itself through a config overlay.
- Weights, data and results stay inside.
- Only a numbers-only export may come back, if Jithin clears it (Q9).
- The thresholds are unchanged.

## Next step

Jithin runs the kit inside the Enterprise by 27 Nov, following `ENTERPRISE.md`:

1. Fill in the overlay.
2. Run setup, then preflight on a GPU node.
3. Run `PLAN=quick`, then `PLAN=standard`, on one 8× H100 node.
4. Export the numbers.

The next lab session records H1 to H10 from that export, if Q9 allows it.

## Sources

- vLLM releases: v0.33.0 (2 Nov 2026), with DSpark and DFlash in speculative decoding. https://github.com/vllm-project/vllm/releases
- vLLM 0.33.0 and 0.27.1 package metadata (torch 2.14.0 / 2.13.0, nvidia-cutlass-dsl[cu13]). https://pypi.org/project/vllm/0.33.0/ and https://pypi.org/project/vllm/0.27.1/
- vLLM speculative decoding methods (suffix, MTP for the Gemma 4 assistant checkpoints). https://docs.vllm.ai/en/latest/features/speculative_decoding/
- Speculators at commit 05f9ba2 (prepare-data, launch_vllm.py train, train, hs_connectors). https://github.com/vllm-project/speculators
- NVIDIA Model Optimizer at commit ef893e7 (launch_train.sh, export_hf_checkpoint.py, convert_to_vllm_ckpt.py). https://github.com/NVIDIA/Model-Optimizer
- Red Hat Gemma 4 31B speculators (EAGLE-3 k3, DFlash k8, DSpark k7): commands and acceptance per task. https://huggingface.co/RedHatAI/gemma-4-31B-it-speculator.eagle3, https://huggingface.co/RedHatAI/gemma-4-31B-it-speculator.dflash and https://huggingface.co/RedHatAI/gemma-4-31B-it-speculator.dspark
- Google Gemma 4 31B and E2B MTP drafters. https://huggingface.co/google/gemma-4-31B-it-assistant and https://huggingface.co/google/gemma-4-E2B-it-assistant
- vLLM recipe for Gemma 4 31B (text-only flags, the W4A16 QAT and FP8 checkpoints). https://recipes.vllm.ai/Google/gemma-4-31B-it
- Slurm generic resources: what job steps receive on an exclusive job. https://slurm.schedmd.com/gres.html
