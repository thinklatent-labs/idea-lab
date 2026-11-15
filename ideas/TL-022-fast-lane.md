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
next_step: "Prove it on one 8x H100 node (scout brief section 10): public Gemma 4 31B in FP8 and 4-bit with its public EAGLE-3 and DFlash drafters on vLLM 0.26.0 (SGLang as control) for targets (a) and (b), and public Gemma 4 E2B as the 7B Core stand-in at TP2 for target (c); read H2 and H4, record the 27B's 200 ms token ceiling, and size units of 8 H100s for the scale-out (H5 on the second node). Inputs Jithin holds: the traffic shape of service-level calls from Langfuse (prompt and reply token distributions, share of the 1 million a minute, bursts), where 200 ms is measured, and today's TP and any drafter on the 27B endpoints. Drafters trained on the Core models and H1 run in the company version"
next_step_due: "2026-11-27"
---

# Fast lane: a low-latency serving tier for TLM4 Core 27B on HyperPod and vLLM (over 1,000 tok/s per request; 300 tokens in 200 ms; about 1 million input tokens a minute), proven on one 8x H100 node and scaled out by adding H100 nodes

<!-- generated:start -->
## Lab record

**TL-022 fast-lane** · Idea · Seed (Registered 2026-11-15 at Seed from a Scout session (D-371); three targets run together (D-372); proof on one 8x H100 node, then scale out with H100s as they come (D-373)) · H1

Owner: Head of ThinkLatent (Jithin), sponsor and decider; serving lead (Claude). Appetite: not set. Score: not scored .

Next step: Prove it on one 8x H100 node (scout brief section 10): public Gemma 4 31B in FP8 and 4-bit with its public EAGLE-3 and DFlash drafters on vLLM 0.26.0 (SGLang as control) for targets (a) and (b), and public Gemma 4 E2B as the 7B Core stand-in at TP2 for target (c); read H2 and H4, record the 27B's 200 ms token ceiling, and size units of 8 H100s for the scale-out (H5 on the second node). Inputs Jithin holds: the traffic shape of service-level calls from Langfuse (prompt and reply token distributions, share of the 1 million a minute, bursts), where 200 ms is measured, and today's TP and any drafter on the 27B endpoints. Drafters trained on the Core models and H1 run in the company version (due 2026-11-27)

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
| H4. The 7B Core with its drafter returns 300-token replies in 200 ms or less at p95 with up to 8 in flight per TP2 replica, and the TL Index shows it sufficient on those use cases | Both met | Either fails: the 200 ms class moves to shorter replies or faster silicon | opinion | not set | open |
| H5. Units of 8 H100s scale linearly behind the prefix-aware Envoy | p95 within 10% at twice the load | p95 rises more than 10% | opinion | not set | open |

### Kill signals
| Signal | By | Status | Action |
| --- | --- | --- | --- |
| H1 and H2 both refute in the proof | 2026-11-27 | open | Stop building a GPU fast lane for the 27B; choose the 7B Core, shorter replies or faster silicon for the 200 ms class |

### Open questions
| Question | Owner | Blocking |
| --- | --- | --- |
| Traffic shape of service-level calls: prompt and reply token distributions, their share of the 1 million input tokens a minute, burst profile (from Langfuse) | Head of ThinkLatent | Yes, for unit counts |
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

### Artifacts
| Artifact | Kind | In this repo | Live | Exported |
| --- | --- | --- | --- | --- |
| Fast lane (fast-lane) - Scout brief, 2026-11-15 | brief | [artifacts/TL-022-fast-lane/scout-brief-fast-lane.md](../artifacts/TL-022-fast-lane/scout-brief-fast-lane.md) | [claude.ai](project-knowledge:claude/scout-brief-fast-lane.md) | 2026-11-15 |

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-371 | 2026-11-15 | Registered as TL-022 fast-lane at Seed, its own row rather than a feature of TL-008, linked to TL-008, TL-004, TL-014 and TL-018; the scout brief (claude/scout-brief-fast-lane.md) is its doc. Scout finding recorded: 'over 1,000 tok/s' and '300 tokens in 200 ms' are different bars; the second needs about 1,700 to 2,000 tok/s per request once prefill and network are counted, and at 1,000 tok/s about 175 tokens fit in 200 ms | Jithin (on a question with a recommendation) | accepted |
| D-372 | 2026-11-15 | Run the three targets together: (a) over 1,000 tok/s per request on the Core 27B, (b) 300 tokens in 200 ms on the Core 27B, (c) the 200 ms class on the 7B Core where the TL Index shows it sufficient. Dissent recorded: the recommendation was (a) with 200 ms for replies of 150 tokens or fewer first, because (b) on H100 needs a drafter accepting about 6.9 tokens a step in FP8 (5.7 with 4-bit weights), beyond published chat results (DFlash on Gemma 4 31B: 3.0x on chat, 5.8x on math) | Jithin (against the recommendation) | accepted |
| D-373 | 2026-11-15 | Prove the fast lane on one 8x H100 node from the ~16 H100s in hand, then scale out by adding H100 nodes as they come; the unit is one node (Core 27B as one TP8 replica, or the 7B Core as four TP2 replicas). Recorded with it: more H100s add capacity (about 0.5 to 0.8 million input tokens a minute per 27B unit and about 3 million or more per 7B unit, estimated), not per-request speed. Faster silicon (B300, Cerebras on AWS) is not decided: decisionsDue, recommended after the proof | Jithin | accepted |
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
