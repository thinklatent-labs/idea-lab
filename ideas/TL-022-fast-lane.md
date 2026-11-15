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
last_touched: 2026-11-15
sensitivity: none
critique_recorded: null
next_step: "Run the proof on one 8x H100 node per the serving design (section 7): day 1 the 27B at TP8 with no drafter, EAGLE-3 and DFlash in FP8 and 4-bit across the prompt x reply grid; day 2 layouts (TP4, TP2, TP1, bulk) and the 7B at two TP4 replicas; day 3 two 27B buckets behind Envoy and the picker with mixed-traffic replay and borrowing (H6); day 4 a drafter-training dry run on public Gemma 4 31B by both routes (Speculators and Model Optimizer) to time the pipeline and compare acceptance (D-377). Inputs Jithin holds: from Langfuse, the prompt and reply length distributions per application and how much of each prompt repeats, to set bucket boundaries and mean shapes; where 200 ms is measured; today's TP and any drafter on the 27B endpoints. Drafters trained on the Core models and H1 run in the company version"
next_step_due: "2026-11-27"
---

# Fast lane: a low-latency serving tier for TLM4 Core 27B on HyperPod and vLLM (over 1,000 tok/s per request; 300 tokens in 200 ms; about 1 million input tokens a minute), proven on one 8x H100 node and scaled out by adding H100 nodes

<!-- generated:start -->
## Lab record

**TL-022 fast-lane** · Idea · Seed (Registered 2026-11-15 at Seed from a Scout session (D-371); three targets run together (D-372); proof on one 8x H100 node, then scale out with H100s as they come (D-373); prompts average 1,000 to 10,000 tokens (D-374); serving design (shared bucketed cluster, D-375 and D-376) and drafter recipe with both training routes (D-377) written 2026-11-15) · H1

Owner: Head of ThinkLatent (Jithin), sponsor and decider; serving lead (Claude). Appetite: not set. Score: not scored .

Next step: Run the proof on one 8x H100 node per the serving design (section 7): day 1 the 27B at TP8 with no drafter, EAGLE-3 and DFlash in FP8 and 4-bit across the prompt x reply grid; day 2 layouts (TP4, TP2, TP1, bulk) and the 7B at two TP4 replicas; day 3 two 27B buckets behind Envoy and the picker with mixed-traffic replay and borrowing (H6); day 4 a drafter-training dry run on public Gemma 4 31B by both routes (Speculators and Model Optimizer) to time the pipeline and compare acceptance (D-377). Inputs Jithin holds: from Langfuse, the prompt and reply length distributions per application and how much of each prompt repeats, to set bucket boundaries and mean shapes; where 200 ms is measured; today's TP and any drafter on the 27B endpoints. Drafters trained on the Core models and H1 run in the company version (due 2026-11-27)

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
