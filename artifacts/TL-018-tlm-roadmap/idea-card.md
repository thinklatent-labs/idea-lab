# TLM roadmap (tlm-roadmap) — Idea card

Nov 7, 2026 · @Jithin Pradeep

> Mirror of https://claude.ai/artifact/Y13puZytpv3ycwGYbySaAV (doc rev 31), exported 2026-11-07. The live doc wins; the build-sequence drawing is in the live doc only.

TLM roadmap is the one build plan for the TLM line. It decides the order the suite's models are built in, and it owns the shared paths they all train, evaluate and serve on. The features build the models themselves.

## Lab record

| Field | Value |
| --- | --- |
| ID and slug | TL-018 tlm-roadmap |
| Type and stage | Idea · Shaping (from 2026-11-07, with this card) |
| Horizon | H2 (its features run from H1 to H3) |
| Theme | T-001 Sovereign AI: owned models on owned infrastructure |
| Owner | Head of ThinkLatent (Jithin): sponsor, decider and product lead · TLM roadmap lead (Claude) |
| Features | TL-014 model-mix (Shaping) · TL-020 judge-family (Seed) · TL-011 domain-model-portfolio (Seed) · TL-019 tlm-omni (Seed) · TL-021 tlm5 (Seed) |
| Feature docs | [TLM model mix — Idea card](https://claude.ai/artifact/LEufPZM5G332V5Co5oDk8X) · TL-011 and TL-019 have scout briefs in project knowledge, no idea card yet |
| Registered | 2026-11-07 (D-175, D-176) |
| Data rule | The lab works on public data. Enterprise data such as call recordings or its curated corpus belongs to the company version only |

## Problem: four model bets planned as if they were independent

The TLM line now has four model bets in flight, each with its own lab row and its own plan. Three of them need the same thing first, and none of them owns it.

- **The Judge family is everyone's first dependency.** TL-014's shadow test needs it as the scorer. TL-011 made it Build 1, and TL-019's Thinker needs it as the compliance guard. TL-012 wave 1 needs it as the rubric grader. Until this card it sat as a Seed inside TL-011 with no appetite set. It is now its own feature, TL-020.
- **Serving splits on a vLLM version.** TL-014 needs vLLM 0.32+ for /v1/systemone, while the stack runs 0.26. TL-019's Talker cannot be served on stock vLLM at all. Each feature handles this separately through TL-008.
- **Every feature writes its own training recipe.** The decision adapter, the Domain adapters and omni's Thinker are all post-training on Core. Each would build its own data pipeline, its own leave-one-out evaluation and its own adapter registry.
- **Nobody decides the order.** With five streams and Jithin's review slots as the constraint, building the four in parallel puts four half-built models on the index. A sequence puts one finished model there at a time.

What goes wrong without a roadmap: the Judge family is built three times or not at all, each feature waits on TL-008 for a different reason, and TLM5 never gets planned against the rest.

## What the umbrella owns, and what it leaves to the features

The umbrella has four jobs. Each one produces something a feature can't produce for itself.

| Job | What it produces | Why a feature can't own it |
| --- | --- | --- |
| 1. Sequence | The build order, the critical path and the gate each model passes before the next starts | Each feature sees only its own model |
| 2. Data and recipe pipeline | One post-training pipeline on Core: dataset cards, the adapter recipe, leave-one-out evaluation, an adapter registry | Three features would each write it otherwise |
| 3. Evaluation path | One TL Index lane per model class, the Judge family as the shared scorer, one shadow-test protocol | The index (TL-004) serves the whole lab, not the TLM line |
| 4. Serving path | One request to TL-008 for every suite model: vLLM versions per environment, multi-LoRA, non-vLLM exceptions | TL-008 needs one customer, not four |

**Not owned here:**

- Each model's architecture, dataset and hypotheses stay in its feature's doc.
- The agents that use the models stay in TL-012.
- The harness itself stays in TL-008, and the index method stays in TL-004.
- TL-015 group-evolving-agents runs on the suite and stays its own idea.

## Suite map

Every new model class except TLM5 sits on TLM4 Core. Only omni's Talker, and possibly TLM5, need serving outside stock vLLM.

| Model class | Lab row | Base | What it returns | Stage | Horizon | Serving |
| --- | --- | --- | --- | --- | --- | --- |
| TLM4 Core 27B and 7B, Distil | In production (not a lab row) | Gemma, pruned and healed | Text | Production | — | vLLM 0.26 |
| Decision model (label-token LoRA) | TL-014 model-mix | 7B Core (gemma-4-E2B-it), FP8 | A label, scores, a schema fill | Shaping | H2 | vLLM 0.32+ /v1/systemone, 0.26 interim |
| Judge family (groundedness, rubric, reward) | TL-020 judge-family | Core (Core-only rule, 2026-11-02) | A score with a reason | Seed | H1 | vLLM, multi-LoRA |
| Compliance, Advice, Cybersecurity adapters | TL-011 Builds 3 to 8 | Core | Text and extraction | Seed | H1 to H2 | vLLM, multi-LoRA |
| Omni: Thinker, Listener, Talker, Duplex | TL-019 tlm-omni | Core Thinker, plus speech stages | Speech, in real time | Seed | H3 | Thinker on vLLM; Talker not on stock vLLM |
| TLM5 trajectory engine | TL-021 tlm5 | A new base, not TLM4 Core (Jithin, 2026-11-07) | Where an interaction is heading | In work (outside the lab) | H3 | To be set |

## Build sequence

The suite builds one finished model at a time. TL-014's decision adapter goes first because it is the only feature ready to build, and it lays down the pipeline everyone else reuses.

*Drawing in the live doc: TLM roadmap build sequence · 5 phases, 4 gates.*

1. Now: decision adapter on the 7B Core (TL-014). Typed-decision dataset from public sets, label-token LoRA, leave-one-out check; builds the Core adapter pipeline v1; runs on the vLLM 0.26 interim path. Gate: pipeline v1 in use and the shadow test read on the index.
2. Next: Judge family (TL-020). Groundedness, rubric and reward adapters through the same pipeline (H-R1); co-hosted with the decision adapter on one multi-LoRA Core (H-R3). Gate: judge agreement 0.6 or higher on a 100-item human audit (H-R2).
3. Then: Domain adapters (TL-011 Builds 2 to 8). Compliance pre-review first, then adapters chosen from task clusters (TL-012); scored by the Judge family; served on the vLLM 0.32+ environment from TL-008. Gate: an adapter beats base Core on its house rubric.
4. Later: omni, Thinker first (TL-019). Dialogue policy on Core, scored on a τ-style environment with simulated callers; then Listener, Talker and Duplex, each tested on the index before the next. Gate: TLM5's base and serving known.
5. Horizon: TLM5 trajectory engine (TL-021). Placed against the shared pipeline, index lanes and serving once its base is set.

Under all of them: the shared paths owned by the roadmap (one Core adapter pipeline, one TL Index lane per model class, one serving request to TL-008).

The critical path runs through the Judge family. Every phase after it is scored by the judges, so a miss at gate 2 re-cuts the whole sequence.

## Shared paths

The three paths are where the umbrella saves work. Each path is a capability the features reuse rather than rebuild.

**Data and recipe pipeline (job 2).** This is one post-training path for every adapter on Core:

1. A dataset card for every set: source, licence, what it can and cannot prove. Public sets only in the lab.
2. One adapter recipe on ThinkLatent's own training pipeline, run as Slurm jobs on HyperPod: SFT and label-token LoRA, with preference tuning later.
3. A leave-one-out check by default, so every adapter is tested on a dataset it never saw (TL-014's H-DM2 is the first user).
4. An adapter registry: base version, dataset cards, recipe version, index run ids. When Core refreshes, every adapter it carries is retrained.

**Evaluation path (job 3).** The TL Index gets one lane per model class, each with its own headline measure:

- decision models: accuracy, calibration error and latency at p50 and p95;
- judges: agreement with human graders;
- Domain adapters: the rubric score from the Judge family;
- omni: task success and pass^k on a τ-style environment.

The Judge family scores the other lanes once it is calibrated. Until then, frontier judges stand in, marked as stand-ins.

**Serving path (job 4).** The roadmap makes one request to TL-008:

- an environment on vLLM 0.32+ beside 0.26;
- multi-LoRA, so the decision, Judge and Domain adapters share one Core deployment;
- a named exception path for omni's Talker.

The first two are already TL-014's next step. Asking for them once, for every adapter, is the saving.

## Capabilities reused and created

The roadmap reuses eight capabilities from the catalogue and creates three. The Judge family is the one with the most demand.

**Reused, in catalogue order:**

| Capability | Maturity | Used for |
| --- | --- | --- |
| HyperPod serving with per-setting endpoints | In production | Every suite model |
| Model compression pipeline | In production | FP8 decision model; Distil kept as the cheaper path |
| Self-healing gap-closing system | Built | Heals each adapter and Core between releases |
| Evaluation register and harness (TL Index) | Proposed | The four evaluation lanes |
| Relay SDK | In production | Every suite endpoint, including /v1/systemone |
| Langfuse telemetry store | In production | Latency and task-mining reads |
| Harness runtime (TL-008) | Proposed | Serving environments, barge-in for omni |
| Task clusters per endpoint (TL-012) | Idea | Choosing the first Domain adapters |

**Created:**

| Capability | Kind | Demand at creation |
| --- | --- | --- |
| Core adapter pipeline (dataset cards, recipe, leave-one-out, adapter registry) | Platform | 3: TL-014, TL-011, TL-019 |
| Judge family as the shared scorer (built by TL-020) | Evidence | 5: TL-014, TL-011, TL-019, TL-012, TL-004 |
| Suite roadmap view (sequence, gates, per-model status) | Process | 2: the dashboard, TL-016 Products pages |

The register's own count shows that capabilities reused by three or more ideas are platform priorities. Both of the first two created capabilities clear that bar on the day they are created.

## Hypotheses

These three hypotheses test the umbrella, not the models. Each model's own hypotheses stay in its feature doc: H-DM1 to H-DM3 in TL-014, Builds 1 to 8 in TL-011, H1 to H3 in TL-019.

| ID | Hypothesis | Confirmed if | Refuted if |
| --- | --- | --- | --- |
| H-R1 Shared recipe | The pipeline built for TL-014's decision adapter carries the next adapter (the Judge rubric grader) without a fork | The second adapter trains through it with under 1 engineer-week of new pipeline code | Over 2 engineer-weeks of new code, or the pipeline is forked for the second adapter |
| H-R2 Judge first | Building the Judge family first replaces frontier stand-ins across the suite | Judge agreement with a 100-item human audit is 0.6 or higher, and TL-014's shadow test and TL-012 wave 1 read on it, within 12 weeks of Build 1 starting | Agreement below 0.6 at week 12 (TL-012's I-3 threshold); stand-ins stay and the sequence is re-cut |
| H-R3 Shared serving | One multi-LoRA Core deployment serves the decision and Judge adapters together | The decision adapter holds under 50 ms model time for a 5-option classification with the Judge adapter co-hosted | Co-hosting breaks the 50 ms target, forcing separate deployments; the serving job then shrinks to version management only |

## Demotion test, kill criteria and risks

The umbrella is demoted to a theme if it stops owning work. Its features carry on either way.

**Demotion test (from D-175).** At Stress test, check whether the umbrella owns at least two of the four jobs as running work: a pipeline in use, an index lane defined, a serving request open with TL-008, or a sequence the features follow. If it owns fewer, TL-018 becomes a register theme and TL-011, TL-014 and TL-019 return to Ideas.

**Kill criteria for the roadmap itself:**

| Criterion | Checked | Action |
| --- | --- | --- |
| H-R1 refuted: the second adapter forks the pipeline | When the Judge rubric adapter trains | Drop job 2; each feature keeps its own recipe |
| H-R2 refuted: Judge agreement below 0.6 | Week 12 of Build 1 | Keep frontier judges as stand-ins; re-cut the sequence around TL-014 alone |
| TL-014's dataset work slips past its due date (2026-11-21) because of roadmap overhead | 2026-11-21 | The roadmap gives way; TL-014 runs on its own plan |

**Risks:**

- **The umbrella slows the fastest feature.** TL-014 is the only feature with a decided architecture. Mitigation: TL-014's next step is not gated by this card.
- **Proxy-only evidence.** Every lab result runs on public data. Enterprise data, the curated Core corpus and call recordings are company-version only. The roadmap proves the plumbing, not Enterprise-data quality.
- **One person reviews everything.** The roadmap adds no review slot. It must fit inside the slots Jithin already holds.
- **TLM5 sits outside the shared paths.** It is on a new base (D-192), so the Core adapter pipeline and Core multi-LoRA serving don't cover it. The roadmap gives TLM5 its own lane for base training and its own serving request. Jobs 1 (sequence) and 3 (index lane) still apply to it.

## Decisions for Jithin and open questions

Jithin decided all four on 2026-11-07 (D-187 to D-190). He took the recommendation on 1, 3 and 4. On 2 he chose a row of its own for the Judge family.

| # | Decision | Recommendation |
| --- | --- | --- |
| 1 | Approve the build sequence (drawn above) | Decided: approved. TL-014's dataset now, the Judge family next, then Domain adapters, omni's Thinker and TLM5 |
| 2 | Where the Judge family lives | Recommended: TL-011 builds it. Decided: its own feature row, TL-020 judge-family, on the critical path |
| 3 | Whether TLM5 becomes a fourth feature | Decided: yes, TL-021 tlm5 as a Seed feature, so its base and serving needs are planned against jobs 2 and 4 |
| 4 | Which stream builds Judge Build 1 | Decided: S-A, once its lab-plumbing work ends in week 3. S-B to S-D carry TL-004, TL-003, TL-012 and TL-017, and S-E is protected for TL-004's task sets |

**Second round, 2026-11-07 (D-192 to D-195):**

| # | Decision | Decided |
| --- | --- | --- |
| 5 | What TLM5 is built on | A new base model, not TLM4 Core (the thinking partner had recommended planning it as a Core derivative) |
| 6 | Appetite for the first judge build | 6 engineer-weeks on S-A: rubric grader and its public data, groundedness and reward, then the 100-item audit and the co-hosting test |
| 7 | Review slot for TL-020 | Shared with TL-012's Friday 30 min; no new slot |
| 8 | When TL-018's Stress test critique runs | After gate 1, target 2026-12-05, so the demotion test reads running work |

**Open questions:**

- [ ] TLM5 is on a new base (D-192): which base family and size, and what serving stack does it need? Owner: TLM roadmap lead (Claude), from what Jithin can share in the lab.
- [ ] Can Judge Build 1 reach 0.6 agreement on public rubric data alone, or does it need house labels (company version)? Owner: Judge lead (Claude), in TL-020's chat.
- [ ] Does TL-008 plan for one 0.32+ environment or one per model class? Owner: Harness and platform lead (Claude), in TL-008's chat.
- [ ] Does omni's lab spike use the cascade control or a PersonaPlex fine-tune? Owner: Omni lead (Claude), in TL-019's chat.

## Critique log

No formal critique pass yet. It runs at Stress test, with the feasibility and Risk seats played by a separate agent that has not seen this card, and the business-line seat played by Jithin.

| Date | Seat | Point | Status |
| --- | --- | --- | --- |
| 2026-11-07 | Thinking partner (Shaping read) | The case for the umbrella rests on the Judge family being shared. If TL-011 delivers Build 1 on its own, the umbrella's work shrinks to sequencing alone, which is too little for a row | Open; tested by H-R2 and the demotion test |
| 2026-11-07 | Thinking partner (Shaping read) | Every hypothesis runs on public proxies. Nothing here shows Core adapters beat frontier models on Enterprise work | Open; carried as a risk, company version only |
| 2026-11-07 | Thinking partner (Shaping read) | TLM5 is the largest bet in the line and the least known. A roadmap that cannot place it is a roadmap for TLM4 adapters | Open; decision 3 |
