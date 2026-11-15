# Experiment design: the fast-lane proof (TL-022)

These hypotheses were fixed before any run. The kit judges every one of them
mechanically from the measurements (`fastlane/analysis/hypotheses.py`, thresholds in
`config/proof.yaml` under `hypotheses:`). Change a threshold only with a new
decision line in the register, never after seeing results.

## The question

Can a shared vLLM cluster on H100s meet all three fast-lane targets?

- **(a) Speed:** more than 1,000 output tokens a second for each call.
- **(b) Short replies:** for some SLAs, replies of up to 300 tokens finished in under 200 ms.
- **(c) Volume:** about 1 million input tokens a minute, with prompts of 1,000 to 10,000 tokens.

If it can, what can each range of prompt and reply length promise? That is the
bucket sheet: "send calls in this range and we serve them within these times".

## What stands in for what

The lab works on public data, so the proof uses public stand-ins.

| In production | In the proof | How the result transfers |
| --- | --- | --- |
| TLM4 Core 27B (Gemma 4 31B width-pruned), FP8 | Gemma 4 31B, FP8 (`RedHatAI/gemma-4-31B-it-FP8-dynamic`) | The 31B has about 13% more weights, so its speeds understate the Core's. Acceptance is model-specific, so the Core's own acceptance is measured in the company version. |
| 7B Core (E2B-based) | Gemma 4 E2B in FP8 with Google's MTP drafter | Same base family. |
| Drafters trained on the Core | Public drafters trained on the 31B (Red Hat EAGLE-3, DFlash and DSpark; Google MTP), plus our own trained by the train stage | The public ones are a known result. Matching them (H9) shows the training pipeline is ready for the Core. |
| Langfuse traffic | Real public text: CNN/DailyMail articles as document tasks (classify, extract, answer, brief) at exact token lengths; UltraChat; GSM8K | Real text, not random tokens, because drafters are judged on predictable text. The traffic mix is assumed (`config.load.apps`) until Langfuse lengths arrive. |
| Envoy with the ext_proc picker | This kit's router, running the same picking logic (`fastlane/picker.py`) | The picking logic carries over. The ext_proc integration is the production step. |

## Hypotheses

H1 to H6 are TL-022's register hypotheses. H7 to H10 were added for this proof.

| ID | Claim | Measured as | Confirmed if | Refuted if | What it decides |
| --- | --- | --- | --- | --- | --- |
| H1 | The best drafter reaches a mean accepted length (tau) of at least 3.5 on service-level calls | Pooled tau over Quick and Answer cells (prompts up to 4,000 tokens, replies up to 300) at temperature 0, profile `fp8_tp8_best` | tau ≥ 3.5 | tau < 2.5 | Whether the 1,000 tok/s target is reachable on H100 with today's drafters |
| H2 | TP8 with the drafter gives at least 1,000 tok/s per call at p50 with 8 in flight | Per-call decode speed (tokens after the first, over the time after the first) in Answer cells: prompts of 1,000 to 4,000, 300-token replies, 8 in flight | p50 ≥ 1,000 | p50 < 1,000 | Whether target (a) holds on one H100 node. **Kill signal:** if H1 and H2 both refute, stop the GPU fast lane for the 27B. |
| H3 | 4-bit weights stay within 1 point of FP8 on quality | GSM8K accuracy (all 1,319 questions, temperature 0), FP8 minus W4A16 (Google's QAT checkpoint). This is a proxy: the TL Index check is company-side. | Drop ≤ 1 point | Drop > 2 points | 4-bit on or off for the fast lane. The report also gives 4-bit's speed gain at 1 in flight. |
| H4 | The small model returns 300-token replies in 200 ms at p95, with up to 8 in flight per TP4 replica, across 1,000 to 10,000-token prompts | p95 end to end at 1,000, 4,000 and 10,000-token prompts and 1, 4 and 8 in flight, profile `small_tp4_mtp` | Every cell ≤ 200 ms | Any cell > 200 ms | Whether the small model carries the 200 ms class. If not: shorter replies, a smaller prompt range, or faster silicon. |
| H5 | Units of 8 H100s scale linearly behind the picker | Fast-class p95: 2 nodes at twice the load against 1 node at 1x (plan `two_node`) | Rise ≤ 10% | Rise > 10% | Whether capacity grows by adding units |
| H6 | Borrowing raises a busy bucket's sustainable rate by 50% or more, and the lender keeps its promise when its own traffic returns | Sustainable calls/s of the Answer bucket (95% within promise), without and with borrowing; the lender's p95 once its own traffic returns | Gain ≥ 50% and the lender inside its promise | The lender breaks its promise | Borrowing on by default |
| H7 | One 8× H100 node serves 1 million input tokens a minute with 95% of fast calls inside their bucket's promise | Fast-class attainment of mixed traffic at 1x, with the bucketed picker | ≥ 95% | < 95% | Whether one node covers today's volume (target c) |
| H8 | The bucketed picker beats round robin | Fast-class attainment points, bucketed minus round robin, on the same 1x traffic | +5 points or more | 0 or less | Whether to build the picker (CAP-039) or stay on plain load balancing |
| H9 | Our drafter, trained on public data, comes within 10% of the public drafter's tau | tau ours ÷ tau public on the same held-out prompts, per training route (Speculators EAGLE-3 in standard; Speculators DFlash and Model Optimizer EAGLE-3 in full) | ≥ 0.90 | < 0.75 | Whether the training pipeline is ready to train on the Core (D-377) |
| H10 | Gemma 4 31B on 8× H100 returns 300 tokens in 200 ms at p95 | p95 end to end, 1,000-token prompt, 300-token reply, 1 in flight | ≤ 200 ms | > 200 ms | Expected to refute: it needs tau near 7 on H100. A refutation confirms the 200 ms class belongs on the small model. |

"Inconclusive" means the result fell between the confirm and refute lines, or a
part was missing (for example, borrowing never saturated within its step limit).
"Not run" means the stage did not run or produced nothing.

## Method

| Stage | What it does | Answers |
| --- | --- | --- |
| preflight | Checks GPUs, driver, NVLink, environments, weights and disk | |
| data | Builds the prompt library from public data: pools of distinct contexts at each length, GSM8K, and training prompts with 30% long documents. Evaluation and training use disjoint documents. | |
| screen | Every public drafter, at several draft lengths, on the 31B FP8 at TP8, one call at a time, on identical prompts. Records tau, decode speed and whether replies match the no-drafter baseline. The winner becomes `best`. | H1 context |
| grid | Profiles × prompt {1K, 2K, 4K, 6K, 8K, 10K} × reply {10, 64, 300, 1,000} × in flight {1, 4, 8, 16}, plus prefix sharing at 50% and 80%. The 4-bit quality check runs while its profiles are up. | H1, H2, H3, H10, bucket sheet |
| small | Gemma 4 E2B with MTP at TP1, TP2 and TP4 over the same prompt range | H4 |
| layouts | The 8 GPUs as 1×TP8, 2×TP4, 4×TP2 and 8×TP1, from 1 to 512 in flight | Latency against bulk |
| load | Two TP4 replicas behind the router. Capacity sweep from 0.5x to 2x, policy comparison, borrowing test. | H6, H7, H8 |
| scale | Two nodes (plan `two_node`) | H5 |
| train | Generate on-policy replies with the BF16 31B. Train EAGLE-3 with Speculators (and DFlash and Model Optimizer in full). Evaluate against the public drafters. | H9 |
| report | Verdicts, bucket sheet, charts and tables | |

## Definitions

- **Decode speed per call:** (completion tokens − 1) ÷ (time of the last streamed token − time of the first). This is the output speed after the first token.
- **End to end (E2E):** client send to last byte, measured on the client.
- **TTFT:** client send to first content token.
- **tau:** 1 + accepted draft tokens ÷ drafts, from vLLM's counters for that cell.
- **Promise:** p95 E2E at the bucket's range edge (the largest measured prompt and reply inside it) with up to 8 in flight per replica, plus 15% margin.
- **Attainment:** the share of fast-class calls whose E2E is within their bucket's promise. Errors count as misses.

## Controls

- **Fixed reply lengths.** `min_tokens = max_tokens` sets every reply's length. Each instruction asks for a longer reply than the cap, so the model never has to keep generating past its natural end.
- **No accidental cache hits.** Each request in a cell has its own context, and each cell its own cache salt. Prefix-sharing cells share a prefix on purpose.
- **Same prompts for every drafter in the screen.** At temperature 0, replies are checked against the baseline (speculative decoding is lossless).
- **No start-up burst.** The first round of every closed-loop cell is dropped, so the synchronised start is not measured.
- **One cell per replica at a time.** Metrics deltas are per replica.
- **Identical settings.** Every replica of a profile runs the same flags (D-376). If a server refuses an optional flag (FP8 KV cache, async scheduling), it restarts without it, and the report records that.
- **Open-loop load.** Arrivals are Poisson, so they do not wait on the server. The client's own scheduling lag is recorded; a lag p99 above 1 s means the client, not the cluster, was the bottleneck.

## Threats to validity

- **The 31B stands in for the Core 27B.** Acceptance on Enterprise prompts will differ. Red Hat's own numbers show summarisation and RAG accepting least: EAGLE-3 at about 2.1 to 2.5, DFlash at about 2.5 to 3.4. Those task types dominate 1,000 to 10,000-token prompts.
- **The traffic mix and bucket edges are assumed** until Langfuse gives per-application lengths and repetition.
- **Where 200 ms is measured is still open.** Here it is the client on the same node, with no gateway or network.
- **Single runs.** There is one run per configuration, with 3 rounds per cell. Treat differences under about 5% as noise.
- **Simulated dry runs** test the pipeline only.

## What happens with the results

Results land in `results/<run-id>/`. With `PUBLISH=1` they are pushed to this
repository, where the lab session reads them. That session records each
hypothesis's evidence and result in the TL-022 register row and adds the bucket
sheet to the serving design. If the kill signal fired, it routes the 200 ms class
per the register. The company version then repeats the grid and the load test on
the Core 27B, with drafters trained on the Core and Langfuse traffic replayed.
