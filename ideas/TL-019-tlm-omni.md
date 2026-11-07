---
id: TL-019
slug: tlm-omni
title: "TLM omni: a real-time, full-duplex conversational model on Gemma that listens, talks, takes interruption and realigns, carrying the register and institutional knowledge of call handling"
aliases: ["omni", "TLM omni", "tlm-duplex", "omni model", "full-duplex model"]
type: Feature
parent: "TL-018"
themes: ["T-001"]
stage: "Seed"
stage_since: "2026-11-07"
horizon: "H3"
stream: null
appetite_weeks: null
appetite_ends: null
owner: "Head of ThinkLatent (Jithin), sponsor; omni lead (Claude)"
score: null
score_status: none
doc_url: null
standard: "pre-v1"
last_touched: 2026-11-07
sensitivity: none
critique_recorded: null
next_step: "Brainstorm in TL-019's own chat: re-plan the brief under the lab's public-data rule (Enterprise call recordings are company-version only): which public or licensed two-channel conversation corpus can carry a lab spike, and whether the lab spike is the cascade control (option C) or a PersonaPlex fine-tune (option D); pick where the model talks first (the brief leans to the simulated caller, which also builds the τ-style eval TL-004 needs); state H1 to H3 from the brief with confirm and refute. Sequencing sits with TL-018: the Thinker stage reuses Core and the Judge family"
next_step_due: "2026-12-05"
---

# TLM omni: a real-time, full-duplex conversational model on Gemma that listens, talks, takes interruption and realigns, carrying the register and institutional knowledge of call handling

<!-- generated:start -->
## Lab record

**TL-019 tlm-omni** · Feature of TL-018 · Seed (Registered 2026-11-07 as a feature of TL-018 (D-176), from the 2026-11-05 scout brief (pre-idea until now)) · H3

Owner: Head of ThinkLatent (Jithin), sponsor; omni lead (Claude). Appetite: not set. Score: not scored .

Next step: Brainstorm in TL-019's own chat: re-plan the brief under the lab's public-data rule (Enterprise call recordings are company-version only): which public or licensed two-channel conversation corpus can carry a lab spike, and whether the lab spike is the cascade control (option C) or a PersonaPlex fine-tune (option D); pick where the model talks first (the brief leans to the simulated caller, which also builds the τ-style eval TL-004 needs); state H1 to H3 from the brief with confirm and refute. Sequencing sits with TL-018: the Thinker stage reuses Core and the Judge family (due 2026-12-05)

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
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._

### 2026-11-07 · Portfolio session · registration

Registered from the 2026-11-05 scout brief (mirrored at `artifacts/TL-019-tlm-omni/scout-brief-tlm-omni.md`) as a Seed feature of TL-018 tlm-roadmap (D-176). The slug is tlm-omni, with tlm-duplex as an alias. Horizon H3.

**The gap the brief leaves for the lab.** Every route the brief gives into an idea runs on Enterprise data: dual-channel call recordings, outcome labels and Legal's position. The lab works on public data only, so the first Brainstorm has to find a lab route. Two candidates: a public or licensed two-channel conversation corpus (the Fisher corpus is licensed through LDC, not free), or the cascade control (option C) on public task data, which needs no duplex training data. Enterprise call data is for the company version only.

Candidate hypotheses H1 to H3 sit in the brief. They are pre-registered at Shaping, not before.
