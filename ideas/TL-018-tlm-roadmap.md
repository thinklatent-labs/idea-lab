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
last_touched: 2026-11-07
sensitivity: none
critique_recorded: null
next_step: "Hold at Shaping until gate 1: TL-014's Core adapter pipeline v1 in use and its shadow test read on the index. Then the Critic pass for Stress test: red-team the card (feasibility and Risk seats as a separate agent, business-line seat Jithin) and read the demotion test (the umbrella owns at least two of its four jobs as running work). Meanwhile, the features run in their own chats: TL-014 dataset (due 2026-11-21), TL-020 Shaping, TL-019 Brainstorm, TL-021 Seed capture"
next_step_due: "2026-12-05"
---

# TLM roadmap: the model suite. One build plan for the TLM line: decision models (TL-014), the Domain tier (TL-011), the omni conversational model (TL-019) and TLM5, sequenced on shared data, recipe, evaluation and serving

<!-- generated:start -->
## Lab record

**TL-018 tlm-roadmap** · Idea · Shaping (Idea card v1 written 2026-11-07; sequence approved (D-187); Judge family split out as TL-020 (D-188); TLM5 registered as TL-021 (D-189); Judge Build 1 planned on S-A after week 3 (D-190)) · H2

Owner: Head of ThinkLatent (Jithin), sponsor and product lead; TLM roadmap lead (Claude). Appetite: not set. Score: not scored .

Next step: Hold at Shaping until gate 1: TL-014's Core adapter pipeline v1 in use and its shadow test read on the index. Then the Critic pass for Stress test: red-team the card (feasibility and Risk seats as a separate agent, business-line seat Jithin) and read the demotion test (the umbrella owns at least two of its four jobs as running work). Meanwhile, the features run in their own chats: TL-014 dataset (due 2026-11-21), TL-020 Shaping, TL-019 Brainstorm, TL-021 Seed capture (due 2026-12-05)

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

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-175 | 2026-11-07 | TL-011 domain-model-portfolio and TL-014 model-mix become features of a new umbrella idea, TL-018 tlm-roadmap (TLM roadmap: the model suite), keeping their own docs, stages and next steps; chosen over a full merge so TL-014's decided architecture and dataset work are not reset. The umbrella owns sequencing and the shared data, recipe, evaluation and serving paths; it is demoted to a theme if Shaping finds it owns nothing else | Jithin | accepted |
| D-187 | 2026-11-07 | TLM roadmap build sequence approved, and TL-018 moves to Shaping with Idea card v1: TL-014's decision adapter now (it lays the Core adapter pipeline), then the Judge family, then Domain adapters, omni's Thinker, and TLM5 last; one finished model at a time, four gates | Jithin | accepted |
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
