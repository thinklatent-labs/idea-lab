---
id: TL-020
slug: judge-family
title: "Judge family: groundedness, rubric and reward adapters on TLM4 Core, the shared scorer for every model in the suite and for the TL Index"
aliases: ["Judge family", "judges", "TL-011 Build 1", "rubric grader", "reward model"]
type: Feature
parent: "TL-018"
themes: ["T-001"]
stage: "Merged"
stage_since: "2026-11-16"
horizon: "H1"
stream: null
appetite_weeks: 6
appetite_ends: null
owner: "Judge lead (Claude); Head of ThinkLatent (Jithin), sponsor"
score: null
score_status: none
doc_url: null
standard: "pre-v1"
last_touched: 2026-11-16
sensitivity: none
critique_recorded: null
next_step: "None here: work continues in TL-018 tlm-roadmap's Judge family track (TL-018.judges), which carries this row's next step and open items (D-391)."
next_step_due: null
merged_into: "TL-018"
track: "TL-018.judges"
---

# Judge family: groundedness, rubric and reward adapters on TLM4 Core, the shared scorer for every model in the suite and for the TL Index

<!-- generated:start -->
## Lab record

> **Merged** into [TL-018 tlm-roadmap](TL-018-tlm-roadmap.md) as the **Judge family** track (TL-018.judges) on 2026-11-16 (D-391). Its purpose, next step and every open item continue on the track, listed in the parent's doc under Tracks; this record stays as it stood at the merge.

**TL-020 judge-family** · Feature of TL-018 · Merged (Merged into TL-018 tlm-roadmap as the Judge family track (TL-018.judges) on 2026-11-16 (D-391); its purpose and every open item moved to the track; this row is the record up to the merge. Before: Split out of TL-011 as its own feature of TL-018 on 2026-11-07 (D-188); was TL-011 Build 1) · H1

Owner: Judge lead (Claude); Head of ThinkLatent (Jithin), sponsor. Appetite: 6 engineer-weeks. Score: not scored .

Next step: None here: work continues in TL-018 tlm-roadmap's Judge family track (TL-018.judges), which carries this row's next step and open items (D-391).

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
| feature-of | TL-018 tlm-roadmap | Shared scorer of the suite (D-188) |
| enables | TL-004 index | House judges replace frontier stand-ins in the index |
| supersedes | TL-011 domain-model-portfolio (Build 1) | Build 1 moved out of TL-011 |
| creates | Judge family as the shared scorer |  |

### Artifacts
_None recorded._

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-188 | 2026-11-07 | The Judge family becomes its own feature row, TL-020 judge-family, under TL-018 (Jithin's call over the thinking partner's recommendation that TL-011 keep it as Build 1); TL-011 keeps Builds 2 to 8 | Jithin | accepted |
| D-190 | 2026-11-07 | Judge Build 1 is planned on stream S-A once its lab-plumbing work ends in week 3; the Building gate still needs an appetite and a review slot | Jithin | accepted |
| D-193 | 2026-11-07 | Judge Build 1 appetite set at 6 engineer-weeks on S-A (rubric grader and public data, groundedness and reward, the 100-item audit and the co-hosting test) | Jithin | accepted |
| D-194 | 2026-11-07 | TL-020's weekly review shares TL-012's Friday 30-min slot; no new slot | Jithin | accepted |
| D-391 | 2026-11-16 | TL-011 domain-model-portfolio, TL-014 model-mix, TL-019 tlm-omni, TL-020 judge-family and TL-021 tlm5 merged into TL-018 tlm-roadmap as five tracks (domain-tier, model-mix, omni, judges, tlm5), each keeping its stage, doc, next step and dates. Supersedes D-175 on purpose: D-175 kept them as features so TL-014's decided architecture and dataset work would not reset, and tracks keep that work intact. D-175's demotion test lapses, since TL-018 now owns seven running tracks. The Domain tier gets its Shaping read at gate 1 on 5 Dec (date set on Jithin's call). | Jithin (question prompt) | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._

### 2026-11-07 · registered from TL-018

Split out of TL-011 (it was Build 1) by Jithin's call D-188. The suite's critical path runs through it: TL-014's shadow test, TL-011's Domain adapters, TL-019's Thinker, TL-012 wave 1 and the TL Index all score on it. TL-018's H-R2 is its gate: agreement of 0.6 or higher with a 100-item human audit within 12 weeks of Build 1 starting. Planned on stream S-A after week 3 (D-190). Note that TL-011's scout brief puts the judges on Distil, but the Core-only rule (2026-11-02) applies.
