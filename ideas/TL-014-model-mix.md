---
id: TL-014
slug: model-mix
title: "TLM model mix — decision models (CLM, CDM) served through vLLM beside SLMs, BERT-style models, LLMs and TLM5 (the trajectory engine)"
aliases: []
type: Idea
parent: null
themes: ["T-001"]
stage: "Shaping"
stage_since: null
horizon: "H2"
stream: null
appetite_weeks: null
appetite_ends: null
owner: "Jithin"
score: null
score_status: none
doc_url: "https://claude.ai/artifact/LEufPZM5G332V5Co5oDk8X"
standard: "v1"
last_touched: 2026-11-07
sensitivity: none
critique_recorded: null
next_step: "Dataset lead (Claude): check the licences, then build the typed-decision dataset from Banking77, CLINC150 and the financial-news topic set (5-option questions, options set per row); confirm multi-LoRA on vLLM 0.26; train the general adapter leave-one-out for H-DM2 and on all three; run the latency curve (model time p50 and p95, end-to-end through Relay recorded) and the index shadow test on the 0.26 interim path while TL-008 provides the 0.32+ environment"
next_step_due: "2026-11-21"
---

# TLM model mix — decision models (CLM, CDM) served through vLLM beside SLMs, BERT-style models, LLMs and TLM5 (the trajectory engine)

<!-- generated:start -->
## Lab record

**TL-014 model-mix** · Idea · Shaping (architecture decided 2026-11-03; Critic pass recorded 2026-11-03) · H2

Owner: Jithin. Appetite: not set. Score: not scored .

Next step: Dataset lead (Claude): check the licences, then build the typed-decision dataset from Banking77, CLINC150 and the financial-news topic set (5-option questions, options set per row); confirm multi-LoRA on vLLM 0.26; train the general adapter leave-one-out for H-DM2 and on all three; run the latency curve (model time p50 and p95, end-to-end through Relay recorded) and the index shadow test on the 0.26 interim path while TL-008 provides the 0.32+ environment (due 2026-11-21)

Production surface: not named (reads as an H3 experiment).

Governance: not recorded.

### Decisions due
_None._

### Hypotheses
_None recorded._

### Kill signals
_None recorded._

### Open questions
_None recorded._

### Links
| Link | To | Note |
| --- | --- | --- |
| depends-on | TL-008 harness-served | The decision endpoint needs a HyperPod environment on vLLM 0.32 or later (/v1/systemone); the stack runs 0.26.0 today, and Jithin wants multiple environments so endpoints can run different versions (2026-11-03). Captured for TL-008's own session. |
| related-to | TL-011 domain-model-portfolio | Adds model classes beside the TLM4 Core, Distil and Domain tiers; all served on the same vLLM stack |
| related-to | TL-008 harness-served | Adds model classes beside the TLM4 Core, Distil and Domain tiers; all served on the same vLLM stack |

### Artifacts
| Artifact | Kind | In this repo | Live | Exported |
| --- | --- | --- | --- | --- |
| TLM model mix (model-mix) — Idea card | doc | [artifacts/TL-014-model-mix/idea-card.md](../artifacts/TL-014-model-mix/idea-card.md) | [claude.ai](https://claude.ai/artifact/LEufPZM5G332V5Co5oDk8X) | 2026-11-04 |

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-053 | 2026-11-02 | Registered at Seed: a CLM and CDMs served through vLLM as a System 1 thinking model in the TLM mix beside SLMs, BERT-style models, LLMs and the LWM; and group evolving agents that evolve and encode enterprise institutional knowledge. Definitions and scope left for their own chats | Jithin | accepted |
| D-054 | 2026-11-02 | CLM defined as a Context / Contrastive Language Model (JEPA-type, predicts in embedding space) and CDM as a Constrained Decoding Model; Idea card created; stays at Seed | Jithin (definitions); thinking partner (card) | accepted |
| D-055 | 2026-11-02 | CDM's purpose set: a high-speed classification and extraction decision tool (choose an option or fill a rigid schema), not a writer; candidate hypothesis H-CDM1 recorded in the card | Jithin | accepted |
| D-056 | 2026-11-02 | CLM placed in the decision-model market (Jev, Laya, Kev, CLM-8B); the earlier JEPA reading corrected; Jev ruled out as a dependency under the sovereign stance (benchmark only); CLM and CDM proposed as one class with three architectures | Jithin (landscape); thinking partner (proposal, pending Jithin) | proposed |
| D-057 | 2026-11-02 | The trajectory engine (formerly System 1) is referred to only as TLM5: advanced System 1 thinking that learns from observation and predicts from the factors in play; the name System 1 is retired and the name clash with the market's System One decision models is resolved | Jithin | accepted |
| D-058 | 2026-11-03 | Critic pass recorded: build one decision-model architecture, not three; recommended B (decision adapter on TLM4 Core) over an encoder head and contrastive heads; H-DM1 and kill criteria pre-registered; decision pending Jithin | Jithin (one architecture); thinking partner (recommendation) | accepted |
| D-059 | 2026-11-03 | Decision-model requirements set: yes/no for agents and routing off the LLM, extraction, classification, a confidence score on every decision, several tasks in one call, promptable; only B (decision adapter on Core) meets all, with calibration as its risk | Jithin (requirements); thinking partner (check) | accepted |
| D-060 | 2026-11-03 | (sync) reconciled standard from doc: v1 (register had pre-v1); Last touched set to 2026-11-03 from the Critic session recorded in the doc | Nightly sync | accepted |
| D-061 | 2026-11-03 | H-DM1 latency target set: a 5-option classification in under 50 ms; this points the decision adapter at the smallest Core (4B class), with Core 27B as the accuracy reference only | Jithin (target); thinking partner (implication) | accepted |
| D-062 | 2026-11-03 | The 7B Core (comparable to Gemma E4B) is the candidate base for the decision adapter; estimated inside the 50 ms target for a single request on a \~500-token prompt; concurrency, prompt length and prefix caching are the variables the shadow test must measure first | Jithin (base); thinking partner (estimate) | accepted |
| D-063 | 2026-11-03 | The 7B Core decision adapter is to be served in FP8 for concurrency headroom; calibration and accuracy are measured on the FP8 model, and the latency curve runs in both precisions | Jithin | accepted |
| D-064 | 2026-11-03 | Serving options recorded: speculative decoding is irrelevant to option choice and a later knob for extraction; four pooled-inference options listed, starting with the generate runner plus one-token logprobs, then prompt-logprobs over a JSON skeleton for multi-task, with the pooling runner in reserve | thinking partner (options); pending Jithin | proposed |
| D-065 | 2026-11-03 | Scout: vLLM v0.32 serves decision models natively (/v1/systemone and /v1/decisions, up to 64 questions per request, state prefilled once via prefix cache); Kev's pointer head is not vLLM-served, so B's recipe is revised to a label-token LoRA on the 7B Core served on /v1/systemone; three single-request parallel designs recorded (separate reads with shared prefix, packed sequence, joint schema head) | thinking partner (scout); pending Jithin | proposed |
| D-066 | 2026-11-03 | Kev ruled out as a recipe: its pointer-head architecture is not served by vLLM and the ThinkLatent stack is vLLM-based; the decision model follows the vLLM-native path only (label-token adapter on Core, /v1/systemone) | Jithin | accepted |
| D-067 | 2026-11-03 | The 7B Core is confirmed as Gemma 4 E2B-based, which vLLM supports on /v1/systemone with no registration; latency for a 5-option classification is expected well inside 50 ms at light load, and the main risk moves to accuracy at E2B scale, making the label-token adapter mandatory | Jithin (base); thinking partner (latency and risk view) | accepted |
| D-068 | 2026-11-03 | Published decision-model latency numbers collected in the card: no standalone vLLM benchmark for /v1/systemone; a Gemma 4 E2B decision LoRA measured 102 ms median per question on an H100 on JevBench, while a 4B model on vLLM measures 19 ms on short requests; prompt length added as an axis of the latency curve | thinking partner (scout) | accepted |
| D-070 | 2026-11-03 | Unsloth's decision-model trainer (Clef-style joint head plus LoRA, Gemma 4 supported, 0.8B models reach 73 to 78%) recorded as a second training recipe; its vLLM serving is unverified, so the recipe choice (label-token vs Clef head) is to be settled by a paired test on Enterprise data plus a vLLM load check | Jithin (link); thinking partner (assessment) | accepted |
| D-072 | 2026-11-03 | Unsloth kept as reference only: ThinkLatent stays on its own recipe and pipeline; the paired recipe test is dropped | Jithin | accepted |
| D-073 | 2026-11-03 | Architecture settled: B, a label-token LoRA on the 7B Core (Gemma 4 E2B) in FP8 on vLLM's /v1/systemone; stage advanced to Shaping; reuse list (Core, self-healing SFT, FP8 pipeline, HyperPod, vLLM multi-LoRA, Relay, Langfuse, AI index) and create list (typed-decision dataset, prompt contract, calibration step, decision eval suite, serving config, Relay decision client) recorded in the card | Jithin (architecture); thinking partner (capability check) | accepted |
| D-074 | 2026-11-03 | HyperPod runs vLLM 0.26.0, so /v1/systemone is absent; TL-014 now depends on TL-008 for a per-endpoint environment on vLLM 0.32 or later; interim path on 0.26 is the generate runner with one-token allowed_token_ids and logprobs, so training and the shadow test are not blocked | Jithin (fact, direction); thinking partner (interim path) | accepted |
| D-075 | 2026-11-03 | Dataset and deployment shape proposed: a common decision dataset and one general adapter as the default, a per-application adapter only when the index shows a gap, never per task; tasks are questions in the request, not heads; H-DM2 pre-registered; pending Jithin | thinking partner (proposal) | accepted |
| D-081 | 2026-11-04 | Questions in one request run in parallel in vLLM's continuous batch (first-arrival prefix sharing to be measured); a task never gets its own LoRA: improvement ladder is rewrite the question, calibrate per task, add rows to the common dataset, then the application adapter | thinking partner (clarification); pending Jithin | proposed |
| D-158 | 2026-11-07 | First use case and dataset settled on public data, as the lab requires: intent routing on Banking77 and CLINC150 plus the financial-news topic set, each row a typed question with its options set per row; the dataset is owned by the Dataset lead role, played by Claude (D-134). H-DM2 is tested leave-one-out (train on two, score the third, rotate), giving three held-out reads against the two required. The 50 ms target stays as pre-registered in H-DM1: p50 model time per request on the production GPU (FP8, warm prefix, prompt of 500 tokens or less, capped batch); p95 and end-to-end through Relay are measured and carry no target until TL-008's 0.32+ environment exists. The card's line drawing data from the Enterprise's own use cases is replaced by these public stand-ins inside the lab | Jithin (datasets, latency definition); thinking partner (leave-one-out design, public stand-ins) | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._

### 2026-11-07 · Spec · D-158

**First use case: three public datasets.** The lab runs on public data, so the card's plan to draw the typed-decision dataset from the Enterprise's own routing, intent and pre-review use cases is replaced, inside the lab, by public stand-ins:

| Set | Decision type | Role |
|---|---|---|
| Banking77 | Intent routing, 77 banking intents | Closest analogue to the Enterprise's routing use case |
| CLINC150 | Intent routing, 150 intents plus out-of-scope | Tests abstention and a broad option space |
| Financial-news topic set | Topic tagging, 20 topics | Finance content, short texts |

Each row becomes `state`, `questions`, `gold`: one 5-option question, with options drawn per row (the gold label plus confusable distractors), so the adapter learns to answer options set in the request rather than a fixed label set. Licences are checked before any row is built; a non-commercial or share-alike licence takes the set out.

**H-DM2 runs leave-one-out.** With all three sets in the common dataset, no application is held out by default. The test trains the general adapter on two sets and scores the third, rotating, which gives three held-out reads against the two the hypothesis needs. The production general adapter then trains on all three.

**Owner.** Dataset lead, played by Claude (Roles, D-134).

**50 ms stays as pre-registered.** H-DM1's target is p50 model time per request on the production GPU: FP8 base, warm prefix, prompt of 500 tokens or less, 5 options, at the capped batch size. p95 model time and end-to-end time through Relay are measured on every latency-curve run but carry no target until TL-008's 0.32+ environment exists, because on the 0.26 interim path end-to-end time mostly measures serving work outside this idea.

**Where it is thin.** The only published Gemma 4 E2B decision measurement on an H100 is 102 ms per question on long states, and E2B-class accuracy trails 4B on typed decisions. Both H-DM1 conditions remain the real risk; the dataset is now unblocked.

**Register hygiene, flagged and not changed in this session.** `critiqueRecorded` is empty although the stage note records a Critic pass on 2026-11-03 (it must be set before Stress test can pass). D-075 is accepted but its text says pending. D-056, D-064, D-065 and D-081 are still proposed.
