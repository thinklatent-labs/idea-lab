---
id: TL-018
slug: tlm-roadmap
title: "TLM roadmap: the model suite. One build plan for the TLM line: decision models (TL-014), the Domain tier (TL-011), the omni conversational model (TL-019) and TLM5, sequenced on shared data, recipe, evaluation and serving"
aliases: ["TLM roadmap", "model suite", "TLM model suite", "TL Model dev", "model dev"]
type: Idea
parent: null
themes: ["T-001"]
stage: "Shaping"
stage_since: "2026-11-07"
horizon: "H2"
stream: null
appetite_weeks: null
appetite_ends: null
owner: "Head of ThinkLatent (Jithin), sponsor and product lead; TLM roadmap lead (Claude)"
score: null
score_status: none
doc_url: "https://claude.ai/artifact/Y13puZytpv3ycwGYbySaAV"
standard: "v1"
last_touched: 2026-11-16
sensitivity: none
critique_recorded: null
next_step: "Programme since 16 Nov (D-391, D-392): seven tracks, each with its own stage, next step and open items: Domain tier (TL-018.domain-tier, Seed, 5 Dec), Model mix (TL-018.model-mix, Shaping, 21 Nov), Omni (TL-018.omni, Seed, 5 Dec), Judge family (TL-018.judges, Seed, 28 Nov), TLM5 (TL-018.tlm5, Seed, 19 Dec), Harness serving (TL-018.harness, Seed, 4 Dec), Fast lane (TL-018.fast-lane, Seed, 27 Nov). The serving path is now inside the programme. D-175's demotion test lapses (seven running tracks). Gate 1 and the Critic pass on 5 Dec read the programme. A track can have its own chat (D-387). Carried, as before: Hold at Shaping until gate 1: TL-014's Core adapter pipeline v1 in use and its shadow test read on the index. Then the Critic pass for Stress test: red-team the card (feasibility and Risk seats as a separate agent, business-line seat Jithin) and read the demotion test (the umbrella owns at least two of its four jobs as running work). Meanwhile, the features run in their own chats: TL-014 dataset (due 2026-11-21), TL-020 Shaping, TL-019 Brainstorm, TL-021 Seed capture. TLM5 gets its own base-training and serving lane (D-192); the Stress test critique runs after gate 1, target 2026-12-05 (D-195)"
next_step_due: "2026-12-05"
tracks: ["TL-018.domain-tier", "TL-018.model-mix", "TL-018.omni", "TL-018.judges", "TL-018.tlm5", "TL-018.harness", "TL-018.fast-lane"]
---

# TLM roadmap: the model suite. One build plan for the TLM line: decision models (TL-014), the Domain tier (TL-011), the omni conversational model (TL-019) and TLM5, sequenced on shared data, recipe, evaluation and serving

<!-- generated:start -->
## Lab record

**TL-018 tlm-roadmap** · Idea · Shaping (Idea card v1 written 2026-11-07; sequence approved (D-187); Judge family split out as TL-020 (D-188); TLM5 registered as TL-021 (D-189); Judge Build 1 planned on S-A after week 3 (D-190)) · H2

Owner: Head of ThinkLatent (Jithin), sponsor and product lead; TLM roadmap lead (Claude). Appetite: not set. Score: not scored .

Next step: Programme since 16 Nov (D-391, D-392): seven tracks, each with its own stage, next step and open items: Domain tier (TL-018.domain-tier, Seed, 5 Dec), Model mix (TL-018.model-mix, Shaping, 21 Nov), Omni (TL-018.omni, Seed, 5 Dec), Judge family (TL-018.judges, Seed, 28 Nov), TLM5 (TL-018.tlm5, Seed, 19 Dec), Harness serving (TL-018.harness, Seed, 4 Dec), Fast lane (TL-018.fast-lane, Seed, 27 Nov). The serving path is now inside the programme. D-175's demotion test lapses (seven running tracks). Gate 1 and the Critic pass on 5 Dec read the programme. A track can have its own chat (D-387). Carried, as before: Hold at Shaping until gate 1: TL-014's Core adapter pipeline v1 in use and its shadow test read on the index. Then the Critic pass for Stress test: red-team the card (feasibility and Risk seats as a separate agent, business-line seat Jithin) and read the demotion test (the umbrella owns at least two of its four jobs as running work). Meanwhile, the features run in their own chats: TL-014 dataset (due 2026-11-21), TL-020 Shaping, TL-019 Brainstorm, TL-021 Seed capture. TLM5 gets its own base-training and serving lane (D-192); the Stress test critique runs after gate 1, target 2026-12-05 (D-195) (due 2026-12-05)

Production surface: not named (reads as an H3 experiment).

Governance: not recorded.

### Decisions due
_None._

### Hypotheses
| Claim | Confirmed if | Refuted if | Evidence | Confidence | Result |
| --- | --- | --- | --- | --- | --- |
| H-R1. Shared recipe: the pipeline built for TL-014's decision adapter carries the Judge rubric adapter without a fork | Second adapter trains through it with under 1 engineer-week of new pipeline code | Over 2 engineer-weeks of new code, or the pipeline is forked | not set | not set | open |
| H-R2. Judge first: building the Judge family first replaces frontier stand-ins across the suite | Judge agreement with a 100-item human audit of 0.6 or higher, and TL-014's shadow test and TL-012 wave 1 read on it, within 12 weeks of Build 1 starting | Agreement below 0.6 at week 12; stand-ins stay and the sequence is re-cut | not set | not set | open |
| H-R3. Shared serving: one multi-LoRA Core deployment serves the decision and Judge adapters together | Decision adapter holds under 50 ms model time for a 5-option classification with the Judge adapter co-hosted | Co-hosting breaks the 50 ms target; the serving job shrinks to version management | not set | not set | open |

### Kill signals
_None recorded._

### Open questions
_None recorded._

### Links
| Link | To | Note |
| --- | --- | --- |
| serves | T-001 Sovereign AI | Owned models on owned infrastructure |
| depends-on | TL-008 harness-served | One serving path for every suite model |
| depends-on | TL-004 index | One evaluation path for every suite model |
| related-to | TL-015 group-evolving-agents | TL-015 runs on the suite; it stays its own idea |
| creates | Core adapter pipeline | Job 2 |
| creates | Suite roadmap view | Job 1 |
| reuses | HyperPod serving with per-setting endpoints | Declared at Shaping 2026-11-07 |
| reuses | Model compression pipeline (pruning, distillation, quantizat | Declared at Shaping 2026-11-07 |
| reuses | Self-healing gap-closing system | Declared at Shaping 2026-11-07 |
| reuses | Evaluation register and harness | Declared at Shaping 2026-11-07 |

### Artifacts
| Artifact | Kind | In this repo | Live | Exported |
| --- | --- | --- | --- | --- |
| TLM roadmap (tlm-roadmap) — Idea card | doc | [artifacts/TL-018-tlm-roadmap/idea-card.md](../artifacts/TL-018-tlm-roadmap/idea-card.md) | [claude.ai](https://claude.ai/artifact/Y13puZytpv3ycwGYbySaAV) | 2026-11-07 |


## Tracks

Rows merged into TL-018 under the merge rule (D-387). Each track keeps its purpose, owner, stage, next step and every open item; links that named a merged row now point at its track. A track can have its own chat: `Lab session · TL-018 tlm-roadmap › <track> · <mode>`.

| Track | Merged from | Stage | Status | Owner | Next step due |
| --- | --- | --- | --- | --- | --- |
| **Domain tier** (TL-018.domain-tier) | [TL-011 domain-model-portfolio](TL-011-domain-model-portfolio.md) | Seed | planned | Head of ThinkLatent (Jithin), sponsor; Domain lead per build (Claude) | 2026-12-05 |
| **Model mix (decision models)** (TL-018.model-mix) | [TL-014 model-mix](TL-014-model-mix.md) | Shaping | active | Jithin | 2026-11-21 |
| **Omni** (TL-018.omni) | [TL-019 tlm-omni](TL-019-tlm-omni.md) | Seed | planned | Head of ThinkLatent (Jithin), sponsor; omni lead (Claude) | 2026-12-05 |
| **Judge family** (TL-018.judges) | [TL-020 judge-family](TL-020-judge-family.md) | Seed | active | Judge lead (Claude); Head of ThinkLatent (Jithin), sponsor | 2026-11-28 |
| **TLM5** (TL-018.tlm5) | [TL-021 tlm5](TL-021-tlm5.md) | Seed | planned | TLM5 lead (Claude); Head of ThinkLatent (Jithin), sponsor and the only source of what TLM5 is | 2026-12-19 |
| **Harness serving** (TL-018.harness) | [TL-008 harness-served](TL-008-harness-served.md) | Seed | planned | Head of ThinkLatent (Jithin), sponsor; Harness and platform lead (Claude) | 2026-12-04 |
| **Fast lane** (TL-018.fast-lane) | [TL-022 fast-lane](TL-022-fast-lane.md) | Seed | active | Head of ThinkLatent (Jithin), sponsor and decider; serving lead (Claude) | 2026-11-27 |

<details><summary><strong>Domain tier</strong> · TL-018.domain-tier · Seed · planned · due 2026-12-05</summary>

**Purpose.** TLM Domain tier — which domain and task models to build (Advice, Compliance, Judge, Cybersecurity) and in what order

**Merged** 2026-11-16 from [TL-011 domain-model-portfolio](TL-011-domain-model-portfolio.md) (D-391). Stage at merge: TL-011 Seed.

**Owner.** Head of ThinkLatent (Jithin), sponsor; Domain lead per build (Claude). Stream none; appetite not set; review none of its own; critique not recorded.

**Next step** (due 2026-12-05). Next: the Shaping read at TLM roadmap's gate 1, 5 Dec (D-391); it waits on the Judge family track's Shaping (28 Nov). Carried from TL-011: Shaping session: write the idea card (domain = domain knowledge plus its tasks; all Domain models on Core; first adapters from task mining on the flagship), set the appetite for Build 1 (Judge family on Core) and declare the capabilities reused and created. From TL-012 (2026-11-02): wave 1 raises demand on the Judge family (the advisor-summary rubric grader first) and on the Compliance pre-review adapter (the same work as Build 3); the task-mining agent runs as TL-012's wave-1 spike and supplies the first adapters from the flagship Now a feature of TL-018 tlm-roadmap (D-175): stage, doc and next step unchanged; cross-suite sequencing is decided in TL-018. TL-018 (2026-11-07, D-188): the Judge family (Build 1) is now its own feature, TL-020 judge-family; TL-011 keeps Builds 2 to 8 and depends on TL-020 for scoring.

**Production surface.** Not named.

**Governance.** Not recorded.

**Decisions due.**
_None._

**Hypotheses.**

_None recorded._

**Kill criteria.**

_None recorded._

**Kill signals.**

_None recorded._

**Open questions.**

_None recorded._

Doc: none of its own; see the merged row.

</details>

<details><summary><strong>Model mix (decision models)</strong> · TL-018.model-mix · Shaping · active · due 2026-11-21</summary>

**Purpose.** TLM model mix — decision models (CLM, CDM) served through vLLM beside SLMs, BERT-style models, LLMs and TLM5 (the trajectory engine)

**Merged** 2026-11-16 from [TL-014 model-mix](TL-014-model-mix.md) (D-391). Stage at merge: TL-014 Shaping.

**Owner.** Jithin. Stream none; appetite not set; review none of its own; critique not recorded.

**Next step** (due 2026-11-21). Dataset lead (Claude): check the licences, then build the typed-decision dataset from Banking77, CLINC150 and the financial-news topic set (5-option questions, options set per row); confirm multi-LoRA on vLLM 0.26; train the general adapter leave-one-out for H-DM2 and on all three; run the latency curve (model time p50 and p95, end-to-end through Relay recorded) and the index shadow test on the 0.26 interim path while TL-008 provides the 0.32+ environment Now a feature of TL-018 tlm-roadmap (D-175): stage, doc and next step unchanged; cross-suite sequencing is decided in TL-018.

**Production surface.** Not named.

**Governance.** Not recorded.

**Decisions due.**
_None._

**Hypotheses.**

_None recorded._

**Kill criteria.**

_None recorded._

**Kill signals.**

_None recorded._

**Open questions.**

_None recorded._

Doc: [TLM model mix (model-mix) — Idea card](https://claude.ai/artifact/LEufPZM5G332V5Co5oDk8X)

</details>

<details><summary><strong>Omni</strong> · TL-018.omni · Seed · planned · due 2026-12-05</summary>

**Purpose.** TLM omni: a real-time, full-duplex conversational model on Gemma that listens, talks, takes interruption and realigns, carrying the register and institutional knowledge of call handling

**Merged** 2026-11-16 from [TL-019 tlm-omni](TL-019-tlm-omni.md) (D-391). Stage at merge: TL-019 Seed.

**Owner.** Head of ThinkLatent (Jithin), sponsor; omni lead (Claude). Stream none; appetite not set; review none of its own; critique not recorded.

**Next step** (due 2026-12-05). Brainstorm in TL-019's own chat: re-plan the brief under the lab's public-data rule (Enterprise call recordings are company-version only): which public or licensed two-channel conversation corpus can carry a lab spike, and whether the lab spike is the cascade control (option C) or a PersonaPlex fine-tune (option D); pick where the model talks first (the brief leans to the simulated caller, which also builds the τ-style eval TL-004 needs); state H1 to H3 from the brief with confirm and refute. Sequencing sits with TL-018: the Thinker stage reuses Core and the Judge family

**Production surface.** Not named.

**Governance.** Not recorded.

**Decisions due.**
_None._

**Hypotheses.**

_None recorded._

**Kill criteria.**

_None recorded._

**Kill signals.**

_None recorded._

**Open questions.**

_None recorded._

Doc: none of its own; see the merged row.

</details>

<details><summary><strong>Judge family</strong> · TL-018.judges · Seed · active · due 2026-11-28</summary>

**Purpose.** Judge family: groundedness, rubric and reward adapters on TLM4 Core, the shared scorer for every model in the suite and for the TL Index

**Merged** 2026-11-16 from [TL-020 judge-family](TL-020-judge-family.md) (D-391). Stage at merge: TL-020 Seed.

**Owner.** Judge lead (Claude); Head of ThinkLatent (Jithin), sponsor. Stream none; appetite 6 engineer-weeks; review Fridays 30 min, shared with the Agents library track (TL-003.agents); critique not recorded.

**Next step** (due 2026-11-28). Shaping in TL-020's own chat: write the idea card from TL-011's Build 1 (Core-only rule, not Distil as the scout brief first said); choose the first rubric (TL-012's advisor-summary grader) and the public rubric data that can reach 0.6 agreement on a 100-item human audit (H-R2); plan to train through TL-014's Core adapter pipeline (H-R1). Building on S-A once its plumbing ends in week 3 (D-190): the Building gate still needs the appetite and Jithin's review slot. Building-gate inputs set 2026-11-07 (D-193, D-194): owner role Judge lead (Claude), stream S-A, 6 engineer-weeks, review slot shared with TL-012's Friday 30 min. The gate is read after Shaping and a recorded critique, not before

**Production surface.** Not named.

**Governance.** Not recorded.

**Decisions due.**
_None._

**Hypotheses.**

_None recorded._

**Kill criteria.**

_None recorded._

**Kill signals.**

_None recorded._

**Open questions.**

_None recorded._

Doc: none of its own; see the merged row.

</details>

<details><summary><strong>TLM5</strong> · TL-018.tlm5 · Seed · planned · due 2026-12-19</summary>

**Purpose.** TLM5: the trajectory engine, a text-only large world model that predicts where an interaction is heading and guides a frontier model from past interactions

**Merged** 2026-11-16 from [TL-021 tlm5](TL-021-tlm5.md) (D-391). Stage at merge: TL-021 Seed.

**Owner.** TLM5 lead (Claude); Head of ThinkLatent (Jithin), sponsor and the only source of what TLM5 is. Stream none; appetite not set; review none of its own; critique not recorded.

**Next step** (due 2026-12-19). Seed capture in TL-021's own chat: TLM5 is on a new base (D-192), so name what can be shared in the lab (base family and size class, training signal, serving stack) as outcomes and public analogues; give it its own lane in TL-018 for base training and serving, outside the Core adapter pipeline; set what its index lane measures

**Production surface.** Not named.

**Governance.** Not recorded.

**Decisions due.**
_None._

**Hypotheses.**

_None recorded._

**Kill criteria.**

_None recorded._

**Kill signals.**

_None recorded._

**Open questions.**

_None recorded._

Doc: none of its own; see the merged row.

</details>

<details><summary><strong>Harness serving</strong> · TL-018.harness · Seed · planned · due 2026-12-04</summary>

**Purpose.** Harness-served models — every endpoint wrapped in a harness agent (Envoy → harness → vLLM): answer at once, work on the session in the background

**Merged** 2026-11-16 from [TL-008 harness-served](TL-008-harness-served.md) (D-392). Stage at merge: TL-008 Seed.

**Owner.** Head of ThinkLatent (Jithin), sponsor; Harness and platform lead (Claude). Stream none; appetite not set; review none of its own; critique not recorded.

**Next step** (due 2026-12-04). Next, by 4 Dec (D-392): the Shaping session, ahead of TLM roadmap's gate 1; a short critique before it builds (Seed track, D-387). The harness stays out of the portal's screens (12 Nov); the portal lists it as a backend dependency for the guardrail, sensitive-data, entity and seen-in-training fields on its traces. Carried from TL-008: Book a Shaping session: what a session holds, Hermes plugins, shadow mode, the owner-set policy; the five changes captured in the ThinkLatent Portal card are its stress-test inputs. From TL-003 (2026-11-02): a pre-registered cache-reuse hypothesis with seven measures is in the card and scout-brief-serving-telemetry.md. Also from TL-003 (2026-11-02): Jithin's queued thought that harness-served endpoints are agents, now folded into TL-012 agent-portfolio (Seed); the Shaping session should decide what an agent is to the gateway. From TL-012 (2026-11-02): the after-call agent is the harness's first customer, propose-only; the scout brief's harness findings (own the loop; permission control plane, approval ledger and cache discipline first; a conformance suite per fine-tuned model) are in claude/scout-brief-agent-portfolio.md From TL-018 (2026-11-07): one serving request for the whole TLM suite: an environment on vLLM 0.32+ beside 0.26, multi-LoRA so the decision, Judge and Domain adapters share one Core deployment, and a named exception path for omni's Talker (not stock vLLM). From TL-022 (2026-11-15): the fast lane depends on per-endpoint serving environments and on the harness stepping aside on service-level calls, keeping everything outside the model under 15 ms. From TL-022 (2026-11-15, D-375, D-376): the fast lane moves to shared bucket pools per model (same vLLM settings per model, dedicated pools on request) instead of dedicated machines per use case, with Relay names mapped to buckets at the gateway; drafter training needs a vLLM 0.27.1 or later environment beside 0.26.0.

**Production surface.** Not named.

**Governance.** Not recorded.

**Decisions due.**
_None._

**Hypotheses.**

_None recorded._

**Kill criteria.**

_None recorded._

**Kill signals.**

_None recorded._

**Open questions.**

_None recorded._

Doc: none of its own; see the merged row.

</details>

<details><summary><strong>Fast lane</strong> · TL-018.fast-lane · Seed · active · due 2026-11-27</summary>

**Purpose.** Fast lane: a low-latency serving tier for TLM4 Core 27B on HyperPod and vLLM (over 1,000 tok/s per request; 300 tokens in 200 ms; about 1 million input tokens a minute), proven on one 8x H100 node and scaled out by adding H100 nodes

**Merged** 2026-11-16 from [TL-022 fast-lane](TL-022-fast-lane.md) (D-392). Stage at merge: TL-022 Seed.

**Owner.** Head of ThinkLatent (Jithin), sponsor and decider; serving lead (Claude). Stream none; appetite not set; review none of its own; critique not recorded.

**Next step** (due 2026-11-27). Merged into TLM roadmap on 16 Nov as part of its serving path (D-392); D-385 (Trainium re-scope) still waits for Jithin's accept. Carried from TL-022: Jithin runs the proof inside the Enterprise from thinklatent-labs/fast-lane (kit 0.2.1, ENTERPRISE.md): fill config/enterprise.yaml (Core 27B FP8 and BF16 paths, 7B Core), scripts/setup.sh, preflight on a GPU node, PLAN=quick then PLAN=standard on one 8x H100 node, then python -m fastlane export. If Q9 allows, the numbers-only export comes back and the next session records H1 to H10 from it. Inputs Jithin holds: Langfuse prompt and reply lengths per application (scripts/langfuse_to_replay.py --stats prints them), where 200 ms is measured, today's TP and drafter on the 27B endpoints, and which dimensions the prune cut (Q8). In parallel: Jithin answers Q10 to Q12 (G7 or G7e; Trainium2 now or Trainium3 and the discount terms; g7e quota), and Claude builds the G7e overlay once Q10 is settled; phases 0 to 4 are in the roadmap doc

**Production surface.** Applications with a service level on TLM4 Core 27B calls (replies under 300 tokens in 200 ms) · A fast-lane pool on HyperPod: 8x H100 units behind Envoy with service-class routing, vLLM with a drafter per served model · p95 end-to-end latency and tok/s per request at the stated load

**Governance.** Not recorded.

**Decisions due.**
- Faster silicon if (b) must hold on the 27B: B300 nodes or Cerebras on AWS (Q5); recommendation: decide after the 8x H100 proof and track Cerebras on AWS as the benchmark

**Hypotheses.**

| Claim | Confirmed if | Refuted if | Result |
| --- | --- | --- | --- |
| H1. A DFlash or EAGLE-3 drafter trained on the served model reaches a mean accepted length of at least 3.5 on service-level calls at temperature 0.3 or lower | 3.5 or more | Under 2.5: the 27B cannot pass 1,000 tok/s on H100; the 200 ms class moves to the 7B Core, shorter replies or faster silicon | open |
| H2. One 8x H100 node serving the Core 27B at TP8 with that drafter gives at least 1,000 tok/s per request at p50 with up to 8 in flight | p50 of 1,000 tok/s or more at 8 in flight | p50 under 1,000 at 8 in flight | open |
| H3. 4-bit weights (W4A16 on H100, NVFP4 on Blackwell) stay within 1 point of FP8 on the TL Index tasks of the fast-lane use cases | Within 1 point overall and no task worse by more than 2 | Any task drops more than 2 points: stay on FP8 | open |
| H4. The 7B Core with its drafter returns 300-token replies in 200 ms or less at p95 with up to 8 in flight per TP4 replica across 1,000 to 10,000-token prompts, and the TL Index shows it sufficient on those use cases | Both met | Either fails: the 200 ms class moves to shorter replies or faster silicon | open |
| H5. Units of 8 H100s scale linearly behind the prefix-aware Envoy | p95 within 10% at twice the load | p95 rises more than 10% | open |
| H6. Borrowing works: with one bucket idle, a busy bucket's sustainable rate rises at least 50% by borrowing the idle bucket's replicas, and the lender's p95 stays inside its promise once its own traffic returns | Rate up 50% or more and the lender's promise held | The lender's p95 breaks its promise | open |
| H7. One 8x H100 node serves 1 million input tokens a minute of mixed 1,000 to 10,000-token traffic with 95% of fast calls inside their bucket's promise (bucketed picker) | 95% or more | Under 95% | open |
| H8. The bucketed picker beats round robin on fast-call attainment on the same traffic | 5 points or more | 0 points or less: plain load balancing is enough | open |
| H9. A drafter we train on public data comes within 10% of the public drafter's mean accepted length (per route: Speculators EAGLE-3; in the full plan also Speculators DFlash and Model Optimizer EAGLE-3) | 0.90 or more: the pipeline is ready for the Core | Under 0.75 | open |
| H10. Gemma 4 31B on 8x H100 returns 300 tokens in 200 ms at p95 (1,000-token prompt, one call); pre-registered expectation: refuted | 200 ms or less | Over 200 ms: the 200 ms class belongs on the small model | open |
| H11. The Core 27B on g7e.48xlarge (Blackwell RTX PRO 6000), best layout and drafter, gives 1,000 tok/s per call at p50 with 8 in flight; pre-registered expectation: refuted at FP8 (proposed 2026-11-16; Jithin fixes it before any chip run) | 1,000 or more | Under 1,000: G7e serves throughput classes, not the fast lane | open |
| H12. G7e keeps the standard, bulk and long-write promises at 30% or more below H100's cost per million output tokens (on-demand prices) (proposed 2026-11-16; Jithin fixes it before any chip run) | 30% or more cheaper | Not cheaper than H100 | open |
| H13a. Within 2 engineer-weeks, vLLM Neuron on Trn2 serves the public Gemma 4 31B and then the Core 27B, greedy outputs matching the GPU token for token on the screen prompts; H13b. within up to 2 more weeks an EAGLE-3 drafter runs on it (proposed 2026-11-16, split after the Gemma on Trainium scout; Jithin fixes it before any chip run) | Both | H13a fails: Trainium leaves the fast lane; H13b fails: Trainium runs without speculation | open |
| H14. At the discounted price, Trn2 keeps the fast buckets' promises at lower cost per million tokens than H100 (stretch: 1,000 tok/s per call) (proposed 2026-11-16; Jithin fixes it before any chip run) | Cheaper at the promise | Dearer, or promises missed | open |
| H15. A mixed fleet (each bucket on its cheapest chip that keeps the promise) costs 25% or more below all-H100 at equal attainment for 1M input tokens a minute, counting the operating cost of more chip types (proposed 2026-11-16; Jithin fixes it before any chip run) | 25% or more cheaper | Under 10% cheaper | open |

**Kill criteria.**

_None recorded._

**Kill signals.**

| Signal | By | Status | Action |
| --- | --- | --- | --- |
| H1 and H2 both refute in the proof | 2026-11-27 | open | Stop building a GPU fast lane for the 27B; choose the 7B Core, shorter replies or faster silicon for the 200 ms class |

**Open questions.**

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

Doc: none of its own; see the merged row.

</details>

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-175 | 2026-11-07 | TL-011 domain-model-portfolio and TL-014 model-mix become features of a new umbrella idea, TL-018 tlm-roadmap (TLM roadmap: the model suite), keeping their own docs, stages and next steps; chosen over a full merge so TL-014's decided architecture and dataset work are not reset. The umbrella owns sequencing and the shared data, recipe, evaluation and serving paths; it is demoted to a theme if Shaping finds it owns nothing else | Jithin | superseded |
| D-187 | 2026-11-07 | TLM roadmap build sequence approved, and TL-018 moves to Shaping with Idea card v1: TL-014's decision adapter now (it lays the Core adapter pipeline), then the Judge family, then Domain adapters, omni's Thinker, and TLM5 last; one finished model at a time, four gates | Jithin | accepted |
| D-195 | 2026-11-07 | TL-018's Stress test critique runs after gate 1 (TL-014's pipeline in use and its shadow test read), target 2026-12-05 | Jithin | accepted |
| D-391 | 2026-11-16 | TL-011 domain-model-portfolio, TL-014 model-mix, TL-019 tlm-omni, TL-020 judge-family and TL-021 tlm5 merged into TL-018 tlm-roadmap as five tracks (domain-tier, model-mix, omni, judges, tlm5), each keeping its stage, doc, next step and dates. Supersedes D-175 on purpose: D-175 kept them as features so TL-014's decided architecture and dataset work would not reset, and tracks keep that work intact. D-175's demotion test lapses, since TL-018 now owns seven running tracks. The Domain tier gets its Shaping read at gate 1 on 5 Dec (date set on Jithin's call). | Jithin (question prompt) | accepted |
| D-392 | 2026-11-16 | The serving path joins TL-018 tlm-roadmap (Jithin's call, over a home in the portal, a separate platform idea, or waiting for the fast-lane proof): TL-008 harness-served and TL-022 fast-lane merged as the Harness serving (TL-018.harness) and Fast lane (TL-018.fast-lane) tracks. The harness stays off the portal's screens (12 Nov); the portal lists both as backend dependencies. Harness serving: Shaping session by 4 Dec, ahead of gate 1 (date set on Jithin's call), with a short critique before it builds. Fast lane carries the proof Jithin runs inside the Enterprise (due 27 Nov), H1 to H15, its thirteen open questions, its kill signal and the faster-silicon decision; D-385 still waits for his accept. | Jithin (question prompt) | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._

### 2026-11-07 · Portfolio session · registration

Jithin asked to merge TL-011 domain-model-portfolio, TL-014 model-mix and the omni model, because they are parts of one bigger model-suite initiative. He chose the umbrella-plus-features shape and the name TLM roadmap (D-175). The features keep their own docs, stages and next steps. TL-014's decided architecture and dataset work carry on as they were.

**Suite map (as of registration)**

| Feature | What it builds | Stage | Horizon |
| --- | --- | --- | --- |
| TL-014 model-mix | Decision models: a label-token LoRA on the 7B Core, served through vLLM (/v1/systemone) | Shaping | H2 |
| TL-011 domain-model-portfolio | Domain tier on Core: Judge, Compliance, Advice, Cybersecurity | Seed | H1 / H2 |
| TL-019 tlm-omni | Full-duplex conversational model: Thinker on Core, then Listener, Talker, Duplex | Seed | H3 |
| TLM5 (not a row) | Trajectory engine; whether it becomes a fourth feature is a Shaping question | — | H3 |

**What the umbrella has to own to earn its row.** It must own (1) the build sequence across the suite, (2) one training-data and recipe pipeline, (3) one evaluation path on the TL Index and (4) one serving path through TL-008. If it owns none of these, it is a label, and labels belong in themes.

**Honest read.** The merge makes sense: the three already share Core, the Judge family, vLLM serving and the index. The risk is that the umbrella turns into a container that slows its fastest feature. TL-014 is the only one with a decided architecture and a dated next step. The suite's first job is to keep that work moving and to put the Judge family (TL-011 Build 1) on the critical path for both TL-014's index shadow test and omni's Thinker.

**Pre-registered demotion test.** If the Shaping idea card names nothing the umbrella owns beyond its list of features, demote TL-018 to a register theme and return TL-011, TL-014 and TL-019 to Ideas.

### 2026-11-07 · TL-018 session · Brainstorm (Shaping)

The Idea card v1 is written ([live doc](https://claude.ai/artifact/Y13puZytpv3ycwGYbySaAV), mirror at `artifacts/TL-018-tlm-roadmap/idea-card.md`). The umbrella now has named work in four jobs: the sequence, one Core adapter pipeline, one index lane per model class, and one serving request to TL-008. Jithin made four calls:

- D-187: approved the sequence (TL-014, then judges, then Domain adapters, then omni's Thinker, then TLM5); TL-018 moves to Shaping.
- D-188: split the Judge family out of TL-011 as TL-020.
- D-189: registered TLM5 as TL-021.
- D-190: put Judge Build 1 on S-A after week 3.

H-R1 to H-R3 are pre-registered in the row. The demotion test is read at Stress test, after gate 1.

### 2026-11-16 · Portfolio · the suite becomes a programme (merges)

Jithin merged the five features into TL-018 under the merge rule (D-387, D-391), superseding D-175's "features, not a full merge" on purpose: tracks keep TL-014's architecture and dataset work intact, which was D-175's reason. The serving path joined too (D-392): TL-008 as Harness serving and TL-022 as Fast lane. TL-018 moved to Now (D-393).

| Track | From | Stage | Next step due |
| --- | --- | --- | --- |
| Domain tier | TL-011 | Seed | 5 Dec (Shaping read at gate 1) |
| Model mix (decision models) | TL-014 | Shaping | 21 Nov |
| Omni | TL-019 | Seed | 5 Dec |
| Judge family | TL-020 | Seed | 28 Nov |
| TLM5 | TL-021 | Seed | 19 Dec |
| Harness serving | TL-008 | Seed | 4 Dec (Shaping session) |
| Fast lane | TL-022 | Seed | 27 Nov (the proof inside the Enterprise) |

D-175's demotion test lapses: the programme owns seven running tracks. Gate 1 and the Critic pass on 5 Dec now read the whole programme. The faster-silicon decision and D-385 (Trainium re-scope) still wait on Jithin, on the Fast lane track.
