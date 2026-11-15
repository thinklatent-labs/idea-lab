---
id: TL-022
slug: fast-lane
title: "Fast lane: a low-latency serving tier for TLM4 Core 27B on HyperPod and vLLM (over 1,000 tok/s per request; 300 tokens in 200 ms; about 1 million input tokens a minute), proven on one 8x H100 node and scaled out by adding H100 nodes"
aliases: ["fast lane", "low-latency serving", "latency tier", "1,000 tok/s", "200 ms SLA", "inference speed", "serving speed"]
type: Idea
parent: null
themes: ["T-001"]
stage: "Seed"
stage_since: "2026-11-15"
horizon: "H1"
stream: null
appetite_weeks: null
appetite_ends: null
owner: "Head of ThinkLatent (Jithin), sponsor and decider; serving lead (Claude)"
score: null
score_status: none
doc_url: null
standard: "pre-v1"
last_touched: 2026-11-16
sensitivity: none
critique_recorded: null
next_step: "Jithin runs the proof inside the Enterprise from thinklatent-labs/fast-lane (kit 0.2.1, ENTERPRISE.md): fill config/enterprise.yaml (Core 27B FP8 and BF16 paths, 7B Core), scripts/setup.sh, preflight on a GPU node, PLAN=quick then PLAN=standard on one 8x H100 node, then python -m fastlane export. If Q9 allows, the numbers-only export comes back and the next session records H1 to H10 from it. Inputs Jithin holds: Langfuse prompt and reply lengths per application (scripts/langfuse_to_replay.py --stats prints them), where 200 ms is measured, today's TP and drafter on the 27B endpoints, and which dimensions the prune cut (Q8). In parallel: Jithin answers Q10 to Q12 (G7 or G7e; Trainium2 now or Trainium3 and the discount terms; g7e quota), and Claude builds the G7e overlay once Q10 is settled; phases 0 to 4 are in the roadmap doc"
next_step_due: "2026-11-27"
---

# Fast lane: a low-latency serving tier for TLM4 Core 27B on HyperPod and vLLM (over 1,000 tok/s per request; 300 tokens in 200 ms; about 1 million input tokens a minute), proven on one 8x H100 node and scaled out by adding H100 nodes

<!-- generated:start -->
## Lab record

**TL-022 fast-lane** · Idea · Seed (Registered 2026-11-15 at Seed from a Scout session (D-371); three targets run together (D-372); proof on one 8x H100 node, then scale out with H100s as they come (D-373); prompts average 1,000 to 10,000 tokens (D-374); serving design (shared bucketed cluster, D-375 and D-376) and drafter recipe with both training routes (D-377) written 2026-11-15; proof built as a runnable kit on public Gemma 4 31B with H7 to H10 added (D-378); kit moved to thinklatent-labs/fast-lane and made the company version 0.2.1 on 2026-11-16 (runs inside the Enterprise on the Core itself, results stay inside, independent audit fixed) (D-382); roadmap after the proof with a hardware track (G7e, Trainium) and H11 to H15 proposed (D-384)) · H1

Owner: Head of ThinkLatent (Jithin), sponsor and decider; serving lead (Claude). Appetite: not set. Score: not scored .

Next step: Jithin runs the proof inside the Enterprise from thinklatent-labs/fast-lane (kit 0.2.1, ENTERPRISE.md): fill config/enterprise.yaml (Core 27B FP8 and BF16 paths, 7B Core), scripts/setup.sh, preflight on a GPU node, PLAN=quick then PLAN=standard on one 8x H100 node, then python -m fastlane export. If Q9 allows, the numbers-only export comes back and the next session records H1 to H10 from it. Inputs Jithin holds: Langfuse prompt and reply lengths per application (scripts/langfuse_to_replay.py --stats prints them), where 200 ms is measured, today's TP and drafter on the 27B endpoints, and which dimensions the prune cut (Q8). In parallel: Jithin answers Q10 to Q12 (G7 or G7e; Trainium2 now or Trainium3 and the discount terms; g7e quota), and Claude builds the G7e overlay once Q10 is settled; phases 0 to 4 are in the roadmap doc (due 2026-11-27)

Production surface: Applications with a service level on TLM4 Core 27B calls (replies under 300 tokens in 200 ms) · A fast-lane pool on HyperPod: 8x H100 units behind Envoy with service-class routing, vLLM with a drafter per served model · p95 end-to-end latency and tok/s per request at the stated load

Governance: not recorded.

### Decisions due
- Faster silicon if (b) must hold on the 27B: B300 nodes or Cerebras on AWS (Q5); recommendation: decide after the 8x H100 proof and track Cerebras on AWS as the benchmark

### Hypotheses
| Claim | Confirmed if | Refuted if | Evidence | Confidence | Result |
| --- | --- | --- | --- | --- | --- |
| H1. A DFlash or EAGLE-3 drafter trained on the served model reaches a mean accepted length of at least 3.5 on service-level calls at temperature 0.3 or lower | 3.5 or more | Under 2.5: the 27B cannot pass 1,000 tok/s on H100; the 200 ms class moves to the 7B Core, shorter replies or faster silicon | opinion | not set | open |
| H2. One 8x H100 node serving the Core 27B at TP8 with that drafter gives at least 1,000 tok/s per request at p50 with up to 8 in flight | p50 of 1,000 tok/s or more at 8 in flight | p50 under 1,000 at 8 in flight | opinion | not set | open |
| H3. 4-bit weights (W4A16 on H100, NVFP4 on Blackwell) stay within 1 point of FP8 on the TL Index tasks of the fast-lane use cases | Within 1 point overall and no task worse by more than 2 | Any task drops more than 2 points: stay on FP8 | opinion | not set | open |
| H4. The 7B Core with its drafter returns 300-token replies in 200 ms or less at p95 with up to 8 in flight per TP4 replica across 1,000 to 10,000-token prompts, and the TL Index shows it sufficient on those use cases | Both met | Either fails: the 200 ms class moves to shorter replies or faster silicon | opinion | not set | open |
| H5. Units of 8 H100s scale linearly behind the prefix-aware Envoy | p95 within 10% at twice the load | p95 rises more than 10% | opinion | not set | open |
| H6. Borrowing works: with one bucket idle, a busy bucket's sustainable rate rises at least 50% by borrowing the idle bucket's replicas, and the lender's p95 stays inside its promise once its own traffic returns | Rate up 50% or more and the lender's promise held | The lender's p95 breaks its promise | opinion | not set | open |
| H7. One 8x H100 node serves 1 million input tokens a minute of mixed 1,000 to 10,000-token traffic with 95% of fast calls inside their bucket's promise (bucketed picker) | 95% or more | Under 95% | opinion | not set | open |
| H8. The bucketed picker beats round robin on fast-call attainment on the same traffic | 5 points or more | 0 points or less: plain load balancing is enough | opinion | not set | open |
| H9. A drafter we train on public data comes within 10% of the public drafter's mean accepted length (per route: Speculators EAGLE-3; in the full plan also Speculators DFlash and Model Optimizer EAGLE-3) | 0.90 or more: the pipeline is ready for the Core | Under 0.75 | opinion | not set | open |
| H10. Gemma 4 31B on 8x H100 returns 300 tokens in 200 ms at p95 (1,000-token prompt, one call); pre-registered expectation: refuted | 200 ms or less | Over 200 ms: the 200 ms class belongs on the small model | opinion | not set | open |
| H11. The Core 27B on g7e.48xlarge (Blackwell RTX PRO 6000), best layout and drafter, gives 1,000 tok/s per call at p50 with 8 in flight; pre-registered expectation: refuted at FP8 (proposed 2026-11-16; Jithin fixes it before any chip run) | 1,000 or more | Under 1,000: G7e serves throughput classes, not the fast lane | opinion | not set | open |
| H12. G7e keeps the standard, bulk and long-write promises at 30% or more below H100's cost per million output tokens (on-demand prices) (proposed 2026-11-16; Jithin fixes it before any chip run) | 30% or more cheaper | Not cheaper than H100 | opinion | not set | open |
| H13a. Within 2 engineer-weeks, vLLM Neuron on Trn2 serves the public Gemma 4 31B and then the Core 27B, greedy outputs matching the GPU token for token on the screen prompts; H13b. within up to 2 more weeks an EAGLE-3 drafter runs on it (proposed 2026-11-16, split after the Gemma on Trainium scout; Jithin fixes it before any chip run) | Both | H13a fails: Trainium leaves the fast lane; H13b fails: Trainium runs without speculation | opinion | not set | open |
| H14. At the discounted price, Trn2 keeps the fast buckets' promises at lower cost per million tokens than H100 (stretch: 1,000 tok/s per call) (proposed 2026-11-16; Jithin fixes it before any chip run) | Cheaper at the promise | Dearer, or promises missed | opinion | not set | open |
| H15. A mixed fleet (each bucket on its cheapest chip that keeps the promise) costs 25% or more below all-H100 at equal attainment for 1M input tokens a minute, counting the operating cost of more chip types (proposed 2026-11-16; Jithin fixes it before any chip run) | 25% or more cheaper | Under 10% cheaper | opinion | not set | open |

### Kill signals
| Signal | By | Status | Action |
| --- | --- | --- | --- |
| H1 and H2 both refute in the proof | 2026-11-27 | open | Stop building a GPU fast lane for the 27B; choose the 7B Core, shorter replies or faster silicon for the 200 ms class |

### Open questions
| Question | Owner | Blocking |
| --- | --- | --- |
| Traffic shape of service-level calls: prompts average 1,000 to 10,000 tokens (answered 2026-11-15); still needed from Langfuse: the distribution within that range, reply lengths, how much of each prompt repeats across calls, their share of the 1 million input tokens a minute, and bursts | Head of ThinkLatent | Yes, for unit counts |
| Where is 200 ms measured: at the client, at the gateway, or at vLLM? | Head of ThinkLatent | Yes, for the latency budget |
| The TP degree of today's 27B endpoints, and whether any drafter is in use | Head of ThinkLatent | No |
| Which service-level use cases may move to the 7B Core if the TL Index shows it sufficient? | Head of ThinkLatent, with TL-004 | No |
| Faster silicon (B300, or Cerebras on AWS): in scope if (b) must hold on the 27B? | Head of ThinkLatent | No |
| Sampling settings of service-level calls (temperature, structured outputs) | Head of ThinkLatent | No |
| Drafter refresh at each Core release: retrain every release, or check acceptance first and refresh (warm-started) only when a bucket falls below its promise? Recommendation: check first | Head of ThinkLatent | No |
| Which dimensions did the Core 27B's width prune cut (hidden size, attention heads, MLP)? Public Gemma 4 31B drafters load on the Core only if the hidden size was kept (Google's MTP drafter also needs the attention layout) | Head of ThinkLatent | No (yes for reusing public drafters on the Core) |
| Q9: may a numbers-only export of the Enterprise run (report, verdicts, tables and charts; no prompts, replies, logs, paths or host names) come back to the lab, so H1 to H10 are recorded here? Recommendation: yes, after Jithin reviews the export | Head of ThinkLatent | Yes, for recording H1 to H10 in the lab |
| Q10: G7 (RTX PRO 4500, 32 GB per GPU) or G7e (RTX PRO 6000, 96 GB, 1.6 TB/s)? Recommendation: G7e for the 27B; G7 only later for the 7B bulk tier | Head of ThinkLatent | Yes, for the G7e overlay |
| Q11: Trainium2 now or wait for Trainium3, and the discount terms (rate, term, minimum)? Recommendation: porting check on Trn2 now (trn2.3xlarge, then trn2.48xlarge); ask AWS for Trn3 slice sizes and the discount in writing before the bake-off | Head of ThinkLatent | Yes, for Phase 2b |
| Q12: can the Enterprise account get g7e quota in US East for about three days? | Head of ThinkLatent | Yes, for Phase 2a |
| Q13: make Gemma 4 support part of the Trainium discount deal (Annapurna engineering help or an existing internal port) before we spend our own weeks porting? Recommendation: yes | Head of ThinkLatent | No, but it decides who carries the porting risk |

### Links
| Link | To | Note |
| --- | --- | --- |
| depends-on | TL-008 harness-served | Per-endpoint serving environments; the harness steps aside on service-level calls so the hot path stays under 15 ms outside the model |
| depends-on | TL-004 index | The TL Index gates 4-bit weights (H3) and the 7B Core track (H4, sufficiency over size) |
| related-to | TL-014 model-mix | Same latency engineering; TL-014's 50 ms decision target runs on the 7B Core |
| related-to | TL-018 tlm-roadmap | One serving path for the TLM suite; one drafter per served model joins the suite plan |
| serves | T-001 Sovereign AI | Keeps speed-critical use cases on owned models and owned infrastructure |
| reuses | AI Gateway and multi-tenant memory | Envoy routes by service class with the prefix-aware hashing already in place |
| reuses | HyperPod serving with per-setting endpoints | The fast lane is a pool of 8x H100 units on HyperPod |
| reuses | Model compression pipeline | FP8, 4-bit weights and speculative-decoding tuning |
| reuses | Evaluation register and harness | Quality gate for 4-bit weights and the 7B track |
| reuses | Relay SDK | Carries the service class on each call |
| reuses | Langfuse telemetry store | Latency telemetry, written asynchronously |
| creates | Latency-tier serving profile | At Idea maturity |
| creates | Drafter recipe and registry | At Idea maturity |
| creates | Latency benchmark harness | At Idea maturity |
| creates | Inference picker (Envoy ext_proc) | At Idea maturity; ports the llm-d endpoint-picker pattern into the existing ext_proc |

### Artifacts
| Artifact | Kind | In this repo | Live | Exported |
| --- | --- | --- | --- | --- |
| Fast lane (fast-lane) - Scout brief, 2026-11-15 | brief | [artifacts/TL-022-fast-lane/scout-brief-fast-lane.md](../artifacts/TL-022-fast-lane/scout-brief-fast-lane.md) | [claude.ai](project-knowledge:claude/scout-brief-fast-lane.md) | 2026-11-15 |
| Fast lane (fast-lane) - Serving design and proof plan 2026-11-15 | doc | [artifacts/TL-022-fast-lane/serving-design-and-proof-plan.md](../artifacts/TL-022-fast-lane/serving-design-and-proof-plan.md) | [claude.ai](project-knowledge:claude/Fast lane (fast-lane) - Serving design and proof plan 2026-11-15.md) | 2026-11-15 |
| Fast lane (fast-lane) - Drafter training recipe 2026-11-15 | doc | [artifacts/TL-022-fast-lane/drafter-training-recipe.md](../artifacts/TL-022-fast-lane/drafter-training-recipe.md) | [claude.ai](project-knowledge:claude/Fast lane (fast-lane) - Drafter training recipe 2026-11-15.md) | 2026-11-15 |
| Proof kit: bench_grid.sh (vllm bench serve sweep) and bucket_sheet.py (bucket sheet from results) | code | [artifacts/TL-022-fast-lane/proof-kit/](../artifacts/TL-022-fast-lane/proof-kit/) |  | 2026-11-15 |
| Fast lane (fast-lane) - Proof kit and experiment design 2026-11-15 | doc | [artifacts/TL-022-fast-lane/proof-kit-and-experiment-design.md](../artifacts/TL-022-fast-lane/proof-kit-and-experiment-design.md) | [claude.ai](project-knowledge:claude/Fast lane (fast-lane) - Proof kit and experiment design 2026-11-15.md) | 2026-11-16 |
| fast-lane kit: pointer to thinklatent-labs/fast-lane (kit 0.2.1, company version) | code | [artifacts/TL-022-fast-lane/fast-lane-kit/](../artifacts/TL-022-fast-lane/fast-lane-kit/) | [claude.ai](https://github.com/thinklatent-labs/fast-lane) | 2026-11-16 |
| Fast lane (fast-lane) - Roadmap and hardware plan 2026-11-16 | doc | [artifacts/TL-022-fast-lane/roadmap-and-hardware-plan.md](../artifacts/TL-022-fast-lane/roadmap-and-hardware-plan.md) | [claude.ai](project-knowledge:claude/Fast lane (fast-lane) - Roadmap and hardware plan 2026-11-16.md) | 2026-11-16 |
| Scout brief: Gemma on Trainium with vLLM, 2026-11-16 | brief | [artifacts/TL-022-fast-lane/scout-brief-gemma-on-trainium.md](../artifacts/TL-022-fast-lane/scout-brief-gemma-on-trainium.md) | [claude.ai](project-knowledge:claude/scout-brief-gemma-on-trainium.md) | 2026-11-16 |

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-371 | 2026-11-15 | Registered as TL-022 fast-lane at Seed, its own row rather than a feature of TL-008, linked to TL-008, TL-004, TL-014 and TL-018; the scout brief (claude/scout-brief-fast-lane.md) is its doc. Scout finding recorded: 'over 1,000 tok/s' and '300 tokens in 200 ms' are different bars; the second needs about 1,700 to 2,000 tok/s per request once prefill and network are counted, and at 1,000 tok/s about 175 tokens fit in 200 ms | Jithin (on a question with a recommendation) | accepted |
| D-372 | 2026-11-15 | Run the three targets together: (a) over 1,000 tok/s per request on the Core 27B, (b) 300 tokens in 200 ms on the Core 27B, (c) the 200 ms class on the 7B Core where the TL Index shows it sufficient. Dissent recorded: the recommendation was (a) with 200 ms for replies of 150 tokens or fewer first, because (b) on H100 needs a drafter accepting about 6.9 tokens a step in FP8 (5.7 with 4-bit weights), beyond published chat results (DFlash on Gemma 4 31B: 3.0x on chat, 5.8x on math) | Jithin (against the recommendation) | accepted |
| D-373 | 2026-11-15 | Prove the fast lane on one 8x H100 node from the ~16 H100s in hand, then scale out by adding H100 nodes as they come; the unit is one node (Core 27B as one TP8 replica, or the 7B Core as four TP2 replicas). Recorded with it: more H100s add capacity (about 0.5 to 0.8 million input tokens a minute per 27B unit and about 3 million or more per 7B unit, estimated), not per-request speed. Faster silicon (B300, Cerebras on AWS) is not decided: decisionsDue, recommended after the proof | Jithin | accepted |
| D-374 | 2026-11-15 | Prompts average 1,000 to 10,000 tokens. Consequences recorded: 1 million input tokens a minute is 100 to 1,000 requests a minute; prefill becomes the largest cost inside 200 ms (about 146 ms for a 10,000-token prompt on the 27B on 8x H100), so 300 tokens in 200 ms is out of reach on the 27B on H100 at any prompt length and 150 tokens only up to about 3,250-token prompts without prefix-cache hits; the 7B Core at TP4 fits the whole range (156 to 182 ms for 300 tokens at drafter acceptance 4.0); one 27B unit carries about 0.7 to 0.8 million input tokens a minute at any prompt length (prefill-bound); the proof grid moves to 1,000, 4,000 and 10,000-token prompts with prefix-cache hit rates of 0%, 50% and 80% | Jithin (fact); Claude (consequences) | accepted |
| D-375 | 2026-11-15 | One shared cluster for many applications: the gateway (Envoy with the ext_proc picker) diverts each call by bucket (prompt tokens x reply cap), service class, task and session, keeping an application's or session's calls on the same replica; each bucket publishes a per-range promise ('send requests in these ranges and you get these numbers'); pools are planned at each bucket's mean shape; idle replicas lend capacity to other buckets at lower priority. What is done now: dedicated, isolated machines per production use case | Jithin | accepted |
| D-376 | 2026-11-15 | Every replica of a model runs the same vLLM settings, so buckets are routing groups and borrowing is instant; a bucket gets its own settings only where the proof shows a gain of 20% or more. Promises are p95 at the bucket's range edge plus a margin, and GPUs are sized at the bucket mean. Shared by default, with dedicated pools on request, per-application cache salt, priorities and quotas | Jithin (on questions with recommendations) | accepted |
| D-377 | 2026-11-15 | Draft models (EAGLE-3, then DFlash) are trained by both routes, Speculators (vLLM-native) and Model Optimizer (NVIDIA's route), on the same target-written data, and compared on accepted length per bucket, tok/s per request and training hours. Dissent recorded: the recommendation was Speculators with Model Optimizer as a cross-check; both routes cost an extra training run per model | Jithin (against the recommendation) | accepted |
| D-378 | 2026-11-15 | The proof is built as runnable code, not more answers: one Slurm job on one 8x H100 node runs public Gemma 4 31B (FP8, vLLM 0.33.0) through a drafter screen, the prompt x reply x in-flight grid, the small-model 200 ms class, layouts, mixed traffic behind the picker (capacity, policies, borrowing) and drafter training, then writes a report that judges pre-registered H1 to H10 and pushes results to GitHub. H7 to H10 added. Public drafters are tested first and our training is measured against them; the full plan keeps both training routes (D-377). The kit lives in thinklatent-labs/fast-lane, which Jithin creates | Jithin | accepted |
| D-382 | 2026-11-16 | The proof runs inside the Enterprise, separately from the lab: Jithin takes the kit from thinklatent-labs/fast-lane (created 2026-11-16) and runs it there. Kit 0.2.1 is that company version: one config overlay runs it on TLM4 Core 27B itself, weights, data and results stay inside, and only a numbers-only export may come back to the lab, if Jithin clears it (Q9). Thresholds unchanged. The 12 findings of an independent audit are fixed in 0.2.1. | Jithin | accepted |
| D-384 | 2026-11-16 | After the H100 proof, test two more chips: AWS G7-family Blackwell (cheaper, easier to get now) and Trainium (a discount is promised). The roadmap runs phases 0 to 4: the H100 proof, making it real on H100, a hardware bake-off (G7e quickly with the same kit; Trainium behind a 2-week porting check of the Core and an EAGLE-3 drafter on vLLM Neuron), fleet design by cost per million tokens at each bucket's promise, then production. H11 to H15 proposed; Jithin fixes them before any chip run | Jithin | accepted |
| D-385 | 2026-11-16 | Trainium track re-scoped after the scout: no one serves Gemma 4 on Trainium through vLLM (AWS's Neuron stack has no Gemma model class; one community engineer hand-ported Gemma 4 to Inferentia2 outside vLLM, and the vendor vLLM path served fluent gibberish). H13 splits into H13a (public Gemma 4 31B, then the Core, on vLLM Neuron Trn2 with greedy outputs matching the GPU, 2 engineer-weeks) and H13b (EAGLE-3 on it, up to 2 more weeks); recommend making Gemma 4 support part of the Trainium discount deal (Q13) | Thinking partner, pending Jithin | proposed |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._

### 2026-11-15 · TL-022 session · Scout (new)

Jithin asked how inference providers reach their speeds, and how to get the TLM4 Core 27B (width-pruned Gemma 4 31B, FP8, vLLM 0.26.0 on HyperPod) to over 1,000 tok/s per request, with some calls finishing 300 tokens in under 200 ms, at about 1 million input tokens a minute. The scout brief is at `artifacts/TL-022-fast-lane/scout-brief-fast-lane.md` (live in project knowledge as `claude/scout-brief-fast-lane.md`).

- **The two targets are different bars.** 300 tokens in 200 ms needs about 1,700 to 2,000 tok/s per request once prefill and network are counted. At 1,000 tok/s about 175 tokens fit.
- **The volume is light.** 1 million input tokens a minute is about 16,700 tokens a second, which is 17 requests a second at 1,000-token prompts and about 3 in flight at once. Requests per second scale inversely with prompt length (67 at 250 tokens, 8 at 2,000), which is why the traffic shape decides the unit count.
- **What the providers do.** SRAM-first chips (Cerebras, Groq, SambaNova) keep the weights on the chip. Only Cerebras is measured above 1,000 tok/s on Gemma 4 31B (about 1,200 to 1,800). GPU fast tiers use a drafter trained for the exact model, low precision, small batches across 8 GPUs and fused kernels.
- **One 8x H100 node (D-373).** The 27B passes 1,000 tok/s only if its drafter accepts about 3.9 tokens a step, or 3.3 with 4-bit weights. 300 tokens in 200 ms on the 27B needs about 6.9 (5.7 with 4-bit weights), so it is out of reach except on highly predictable outputs. The 7B Core at TP2 reaches 300 tokens in about 185 ms at 4.0. More H100s add capacity, about 0.5 to 0.8 million input tokens a minute per 27B unit, but they do not make one request faster.
- **Jithin's calls.** Register as TL-022 at Seed (D-371). Run all three targets together, against the recommendation to start with 1,000 tok/s and 200 ms for short replies (D-372). Prove the lane on one 8x H100 node from the ~16 in hand, then scale out with more H100 nodes (D-373). Faster silicon is not decided.

### 2026-11-15 · TL-022 session (continued) · Spec (serving design and drafter recipe)

Jithin set the shape of the serving system. One cluster serves many applications, and the gateway diverts each call by bucket (prompt and reply ranges), class, task and session. Each bucket publishes a promise for its range. Pools are sized at each bucket's mean, and idle replicas lend capacity (D-375).

On questions with recommendations he chose four things:
- the same vLLM settings for every replica of a model, so buckets are routing groups;
- promises measured at each range's edge, with GPUs sized at the mean;
- shared by default, with dedicated pools on request (D-376);
- both drafter routes, Speculators and Model Optimizer, compared on acceptance (D-377, against the recommendation).

The serving design (`artifacts/TL-022-fast-lane/serving-design-and-proof-plan.md`) holds:
- the request path and picker steps;
- buckets with draft promises, and the full prompt-by-reply grid of estimates;
- how one replica runs requests in parallel, with latency mode against bulk mode and the replica layouts on 8 H100s (about 1,000 tok/s for each of 8 requests, or about 65 tok/s for each of 512);
- the vLLM profiles with checked flags;
- the benchmark and a four-day proof.

The drafter recipe (`artifacts/TL-022-fast-lane/drafter-training-recipe.md`) gives NVIDIA's route and the Speculators route step by step. The proof kit in `proof-kit/` turns `vllm bench serve` results into the bucket sheet.

### 2026-11-15 · TL-022 session (continued) · Spec (proof build)

Jithin asked for the proof as code he runs, with the results made available afterwards, instead of more answers. The result is the fast-lane kit. It will live in `thinklatent-labs/fast-lane`, a private repository Jithin is creating. Until then it is mirrored at `artifacts/TL-022-fast-lane/fast-lane-kit/`.

One Slurm job on one 8× H100 node runs public Gemma 4 31B (FP8, vLLM 0.33.0) through these stages:

- a drafter screen: Red Hat EAGLE-3, DFlash and DSpark, Google MTP, and suffix decoding, all on identical prompts;
- the prompt × reply × in-flight grid that yields the bucket sheet, with the 4-bit GSM8K check alongside;
- the 200 ms class on Gemma 4 E2B with MTP;
- the four layouts from TP8 to 8× TP1;
- mixed traffic behind the picker at 0.5x to 2x of 1M input tokens a minute, with four policies and the borrowing test;
- drafter training by Speculators, plus Model Optimizer in the full plan.

The job writes a report that judges H1 to H10 mechanically against thresholds fixed in advance, and pushes the results to GitHub.

New hypotheses for the proof:
- H7: capacity at 1M input tokens a minute;
- H8: the picker against round robin;
- H9: our drafter against the public one;
- H10: the 31B's 200 ms ceiling, expected to refute.

The kit passed every test on simulated servers. It has not yet run on GPUs, so `PLAN=quick` comes first.

This session also corrected the drafter recipe and the scout brief. They said the public 31B drafters would not fit the Core and that every Core refresh retrains. A drafter loads on the Core only if the width prune kept the hidden size, so it should be tested before deciding to train. Q7 (refresh policy) and Q8 (which dimensions the prune cut) are open. The design and the hypothesis table are in `artifacts/TL-022-fast-lane/proof-kit-and-experiment-design.md` (D-378).

### 2026-11-16 · TL-022 session (continued) · Spec (company version and audit)

Jithin created thinklatent-labs/fast-lane, and the kit now lives there. The copy in
idea-lab is a pointer, so the code has one home. Jithin will run the proof inside the
Enterprise, separately from the lab (D-382).

Kit 0.2.1 is that company version:
- One overlay, `config/enterprise.yaml`, points at the staged Core 27B and 7B Core.
- It renames the report and turns off stand-in scaling.
- It keeps results inside, with a numbers-only export for the lab (Q9).
- It works behind a firewall: package, Git and Hugging Face mirrors, staged public
  prompts, and checked CUDA 13 torch builds.

A fit check skips any public 31B drafter that cannot load on the Core (hidden size or
tapped layers). So on a width-pruned Core, the drafter the train stage builds is what
carries H1 and H2.

An independent audit by a separate agent found 12 problems, and all are fixed with
regression tests:
- two would have stopped a real run (CPU-only torch from a GPU-less login node; Model
  Optimizer's conversion on Gemma 4's config);
- four would have skewed numbers or verdicts (repeated load-test contexts, uncounted
  failures, crashed cells read as results, and a start-up failure firing the kill signal).

Verdicts now read NOT RUN whenever their data is missing.

Checked on a real install: vLLM 0.33.0 from PyPI brings torch 2.14.0 built for CUDA
13.0, and its own request model accepts every field the client sends. All ten Hugging
Face repositories the kit uses exist, are Apache-2.0 and are not gated.

### 2026-11-16 · TL-022 session (continued) · Scout and Spec (roadmap)

Jithin asked what comes after the H100 proof, and to plan for two more chips: AWS G7
(Blackwell, cheaper and easier to get now) and Trainium (a discount is promised).
The roadmap doc sets out five phases:

0. the H100 proof;
1. making it real on H100;
2. a hardware bake-off;
3. fleet design;
4. production.

Each phase has a gate and an appetite.

The bake-off has two sides:
- **G7e** (RTX PRO 6000, 96 GB, 1.6 TB/s per GPU, about $33 an hour for eight) runs the
  kit as is.
- **Trainium2** (2.9 TB/s per chip, $35.76 an hour for 16 as a Capacity Block) first
  needs a 2-week porting check. vLLM on Neuron lists no Gemma models, and EAGLE-3 is its
  only learned drafter.

The plain G7 (32 GB per GPU) is a poor fit for the 27B.

Bandwidth ceilings say G7e cannot give 1,000 tok/s per call on the 27B at FP8. Its role
is cheaper throughput for the standard, bulk and long-write buckets.

H11 to H15 are proposed, for Jithin to fix before any chip run. The decision metric is
cost per million tokens at each bucket's promise, so each bucket can go to the cheapest
chip that keeps it (D-384). Q10 to Q12 are open: G7 or G7e, Trainium generation and
discount terms, and g7e quota.

### 2026-11-16 · TL-022 session (continued) · Scout (Gemma on Trainium)

Jithin asked whether anyone runs Gemma on Trainium with vLLM. Nobody we found serves
Gemma 4 on Trainium through vLLM:
- AWS's Neuron stack has no Gemma model class.
- One community engineer hand-ported the Gemma 4 family to Inferentia2 and Trn1, but
  outside vLLM, after the vendor path served fluent gibberish.

So Trainium is a porting project, not an instance swap. The blockers are in
`scout-brief-gemma-on-trainium`. The main ones:
- Gemma 4's mixed attention, with different head sizes and KV heads per layer type;
- K equals V on global layers;
- dual RoPE;
- soft-capping;
- fixed shapes;
- EAGLE as the only speculative method;
- silent wrongness.

H13 is now H13a (Gemma 4, then the Core, greedy-exact on vLLM Neuron, 2 weeks) and H13b
(EAGLE-3, up to 2 more weeks). Q13 asks to make Gemma 4 support part of the Trainium
discount deal.
