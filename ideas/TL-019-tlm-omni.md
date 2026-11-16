---
id: TL-019
slug: tlm-omni
title: "TLM omni: a real-time, full-duplex conversational model on Gemma that listens, talks, takes interruption and realigns, carrying the register and institutional knowledge of call handling"
aliases: ["omni", "TLM omni", "tlm-duplex", "omni model", "full-duplex model"]
type: Feature
parent: "TL-018"
themes: ["T-001"]
stage: "Merged"
stage_since: "2026-11-16"
horizon: "H3"
stream: null
appetite_weeks: null
appetite_ends: null
owner: "Head of ThinkLatent (Jithin), sponsor; omni lead (Claude)"
score: null
score_status: none
doc_url: null
standard: "pre-v1"
last_touched: 2026-11-16
sensitivity: none
critique_recorded: null
next_step: "None here: work continues in TL-018 tlm-roadmap's Omni track (TL-018.omni), which carries this row's next step and open items (D-391)."
next_step_due: null
merged_into: "TL-018"
track: "TL-018.omni"
---

# TLM omni: a real-time, full-duplex conversational model on Gemma that listens, talks, takes interruption and realigns, carrying the register and institutional knowledge of call handling

<!-- generated:start -->
## Lab record

> **Merged** into [TL-018 tlm-roadmap](TL-018-tlm-roadmap.md) as the **Omni** track (TL-018.omni) on 2026-11-16 (D-391). Its purpose, next step and every open item continue on the track, listed in the parent's doc under Tracks; this record stays as it stood at the merge.

**TL-019 tlm-omni** · Feature of TL-018 · Merged (Merged into TL-018 tlm-roadmap as the Omni track (TL-018.omni) on 2026-11-16 (D-391); its purpose and every open item moved to the track; this row is the record up to the merge. Before: Registered 2026-11-07 as a feature of TL-018 (D-176), from the 2026-11-05 scout brief (pre-idea until now)) · H3

Owner: Head of ThinkLatent (Jithin), sponsor; omni lead (Claude). Appetite: not set. Score: not scored .

Next step: None here: work continues in TL-018 tlm-roadmap's Omni track (TL-018.omni), which carries this row's next step and open items (D-391).

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
| feature-of | TL-018 tlm-roadmap | Conversational omni model of the suite (D-176) |
| depends-on | TL-008 harness-served | Barge-in, re-plan and account tools run in the harness |
| depends-on | TL-014 model-mix | A turn-taking or duplex controller is a decision-model class |
| reuses | TL-011 domain-model-portfolio | Judge and Compliance adapters guard the Thinker |
| evidence-for | TL-012 agent-portfolio | A voice agent purpose for the library |
| depends-on | TL-020 judge-family | Thinker guarded and scored by the judges |

### Artifacts
| Artifact | Kind | In this repo | Live | Exported |
| --- | --- | --- | --- | --- |
| TLM omni (tlm-omni) - Scout brief, 2026-11-05 | doc | [artifacts/TL-019-tlm-omni/scout-brief-tlm-omni.md](../artifacts/TL-019-tlm-omni/scout-brief-tlm-omni.md) |  | 2026-11-07 |

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-176 | 2026-11-07 | The omni model (scout brief 2026-11-05, "not an idea yet") registered as TL-019 tlm-omni, a Seed feature of TL-018 at H3; Enterprise call data stays company-version only, so the lab spike needs a public or licensed two-channel corpus | Jithin | accepted |
| D-391 | 2026-11-16 | TL-011 domain-model-portfolio, TL-014 model-mix, TL-019 tlm-omni, TL-020 judge-family and TL-021 tlm5 merged into TL-018 tlm-roadmap as five tracks (domain-tier, model-mix, omni, judges, tlm5), each keeping its stage, doc, next step and dates. Supersedes D-175 on purpose: D-175 kept them as features so TL-014's decided architecture and dataset work would not reset, and tracks keep that work intact. D-175's demotion test lapses, since TL-018 now owns seven running tracks. The Domain tier gets its Shaping read at gate 1 on 5 Dec (date set on Jithin's call). | Jithin (question prompt) | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._

### 2026-11-07 · Portfolio session · registration

Registered from the 2026-11-05 scout brief (mirrored at `artifacts/TL-019-tlm-omni/scout-brief-tlm-omni.md`) as a Seed feature of TL-018 tlm-roadmap (D-176). The slug is tlm-omni, with tlm-duplex as an alias. Horizon H3.

**The gap the brief leaves for the lab.** Every route the brief gives into an idea runs on Enterprise data: dual-channel call recordings, outcome labels and Legal's position. The lab works on public data only, so the first Brainstorm has to find a lab route. Two candidates: a public or licensed two-channel conversation corpus (the Fisher corpus is licensed through LDC, not free), or the cascade control (option C) on public task data, which needs no duplex training data. Enterprise call data is for the company version only.

Candidate hypotheses H1 to H3 sit in the brief. They are pre-registered at Shaping, not before.
