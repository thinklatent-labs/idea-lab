---
id: TL-018
slug: tlm-roadmap
title: "TLM roadmap: the model suite. One build plan for the TLM line: decision models (TL-014), the Domain tier (TL-011), the omni conversational model (TL-019) and TLM5, sequenced on shared data, recipe, evaluation and serving"
aliases: ["TLM roadmap", "model suite", "TLM model suite", "TL Model dev", "model dev"]
type: Idea
parent: null
themes: ["T-001"]
stage: "Seed"
stage_since: "2026-11-07"
horizon: "H2"
stream: null
appetite_weeks: null
appetite_ends: null
owner: "Head of ThinkLatent (Jithin), sponsor and product lead; TLM roadmap lead (Claude)"
score: null
score_status: none
doc_url: null
standard: "pre-v1"
last_touched: 2026-11-07
sensitivity: none
critique_recorded: null
next_step: "Shaping session in TL-018's own chat (Brainstorm, then Critic on the umbrella itself): write the idea card around what the umbrella owns that its features do not: (1) the sequence across the suite (TLM4 adoption now; decision adapter on 7B Core; Judge family first in the Domain tier; omni's Thinker stage; TLM5), (2) one training-data and recipe pipeline, (3) one evaluation path on the TL Index, (4) one serving path through TL-008 (vLLM 0.26 interim vs 0.32+). Decide whether TLM5 (trajectory engine) becomes a fourth feature. Declare capabilities reused and created. Pre-registered demotion test: if the card finds nothing the umbrella owns beyond listing its features, demote TL-018 to a theme and return the three rows to Ideas"
next_step_due: "2026-11-21"
---

# TLM roadmap: the model suite. One build plan for the TLM line: decision models (TL-014), the Domain tier (TL-011), the omni conversational model (TL-019) and TLM5, sequenced on shared data, recipe, evaluation and serving

<!-- generated:start -->
## Lab record

**TL-018 tlm-roadmap** · Idea · Seed (Registered 2026-11-07 as the umbrella over TL-011, TL-014 and TL-019 (D-175); no idea card yet) · H2

Owner: Head of ThinkLatent (Jithin), sponsor and product lead; TLM roadmap lead (Claude). Appetite: not set. Score: not scored .

Next step: Shaping session in TL-018's own chat (Brainstorm, then Critic on the umbrella itself): write the idea card around what the umbrella owns that its features do not: (1) the sequence across the suite (TLM4 adoption now; decision adapter on 7B Core; Judge family first in the Domain tier; omni's Thinker stage; TLM5), (2) one training-data and recipe pipeline, (3) one evaluation path on the TL Index, (4) one serving path through TL-008 (vLLM 0.26 interim vs 0.32+). Decide whether TLM5 (trajectory engine) becomes a fourth feature. Declare capabilities reused and created. Pre-registered demotion test: if the card finds nothing the umbrella owns beyond listing its features, demote TL-018 to a theme and return the three rows to Ideas (due 2026-11-21)

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
| serves | T-001 Sovereign AI | Owned models on owned infrastructure |
| depends-on | TL-008 harness-served | One serving path for every suite model |
| depends-on | TL-004 index | One evaluation path for every suite model |
| related-to | TL-015 group-evolving-agents | TL-015 runs on the suite; it stays its own idea |

### Artifacts
_None recorded._

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-175 | 2026-11-07 | TL-011 domain-model-portfolio and TL-014 model-mix become features of a new umbrella idea, TL-018 tlm-roadmap (TLM roadmap: the model suite), keeping their own docs, stages and next steps; chosen over a full merge so TL-014's decided architecture and dataset work are not reset. The umbrella owns sequencing and the shared data, recipe, evaluation and serving paths; it is demoted to a theme if Shaping finds it owns nothing else | Jithin | accepted |
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
