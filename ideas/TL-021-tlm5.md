---
id: TL-021
slug: tlm5
title: "TLM5: the trajectory engine, a text-only large world model that predicts where an interaction is heading and guides a frontier model from past interactions"
aliases: ["TLM5", "trajectory engine", "large world model", "LWM"]
type: Feature
parent: "TL-018"
themes: ["T-001"]
stage: "Merged"
stage_since: "2026-11-16"
horizon: "H3"
stream: null
appetite_weeks: null
appetite_ends: null
owner: "TLM5 lead (Claude); Head of ThinkLatent (Jithin), sponsor and the only source of what TLM5 is"
score: null
score_status: none
doc_url: null
standard: "pre-v1"
last_touched: 2026-11-16
sensitivity: none
critique_recorded: null
next_step: "None here: work continues in TL-018 tlm-roadmap's TLM5 track (TL-018.tlm5), which carries this row's next step and open items (D-391)."
next_step_due: null
merged_into: "TL-018"
track: "TL-018.tlm5"
---

# TLM5: the trajectory engine, a text-only large world model that predicts where an interaction is heading and guides a frontier model from past interactions

<!-- generated:start -->
## Lab record

> **Merged** into [TL-018 tlm-roadmap](TL-018-tlm-roadmap.md) as the **TLM5** track (TL-018.tlm5) on 2026-11-16 (D-391). Its purpose, next step and every open item continue on the track, listed in the parent's doc under Tracks; this record stays as it stood at the merge.

**TL-021 tlm5** · Feature of TL-018 · Merged (Merged into TL-018 tlm-roadmap as the TLM5 track (TL-018.tlm5) on 2026-11-16 (D-391); its purpose and every open item moved to the track; this row is the record up to the merge. Before: Registered 2026-11-07 as a feature of TL-018 (D-189); the Enterprise's TLM5 work is outside the lab, this row plans the lab view of it; TLM5 is a new base model, not TLM4 Core (D-192)) · H3

Owner: TLM5 lead (Claude); Head of ThinkLatent (Jithin), sponsor and the only source of what TLM5 is. Appetite: not set. Score: not scored .

Next step: None here: work continues in TL-018 tlm-roadmap's TLM5 track (TL-018.tlm5), which carries this row's next step and open items (D-391).

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
| feature-of | TL-018 tlm-roadmap | The line's H3 bet (D-189) |

### Artifacts
_None recorded._

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-189 | 2026-11-07 | TLM5 (the trajectory engine) registered as TL-021 tlm5, a Seed feature of TL-018 at H3, so its base and serving needs are planned against the shared paths | Jithin | accepted |
| D-192 | 2026-11-07 | TLM5 is a new base model, not a TLM4 Core derivative (Jithin, over the recommendation to plan it as Core); TL-018 gives it its own base-training and serving lane, and the Core adapter pipeline and Core multi-LoRA serving do not cover it | Jithin | accepted |
| D-391 | 2026-11-16 | TL-011 domain-model-portfolio, TL-014 model-mix, TL-019 tlm-omni, TL-020 judge-family and TL-021 tlm5 merged into TL-018 tlm-roadmap as five tracks (domain-tier, model-mix, omni, judges, tlm5), each keeping its stage, doc, next step and dates. Supersedes D-175 on purpose: D-175 kept them as features so TL-014's decided architecture and dataset work would not reset, and tracks keep that work intact. D-175's demotion test lapses, since TL-018 now owns seven running tracks. The Domain tier gets its Shaping read at gate 1 on 5 Dec (date set on Jithin's call). | Jithin (question prompt) | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._

### 2026-11-07 · registered from TL-018

Registered by Jithin's call D-189 so TLM5 is planned against the suite's shared paths. The Enterprise's TLM5 work stays outside the lab. This row holds the lab's view: outcomes, public analogues, and where TLM5 sits on the roadmap. Its base and serving stack are the open question that gates the Horizon phase.
