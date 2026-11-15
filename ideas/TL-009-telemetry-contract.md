---
id: TL-009
slug: telemetry-contract
title: "Use-case telemetry contract — required fields in Relay, the canonical event, enrichment records"
aliases: []
type: Feature
parent: "TL-003"
themes: ["T-001"]
stage: "Seed"
stage_since: null
horizon: "H1"
stream: null
appetite_weeks: null
appetite_ends: null
owner: "Harness and platform lead to be named"
score: null
score_status: none
doc_url: null
standard: null
last_touched: 2026-11-02
sensitivity: none
critique_recorded: null
next_step: "Audit what Langfuse captures today against the v0 fields, per endpoint; then a Shaping session to set the schema and the Relay changes. From TL-003 (2026-11-02): Contract v0.1 additions and the derived-metric list are in the ThinkLatent Portal card. From TL-012 (2026-11-02): task mining reads the store; v0 fields are enough for a first pass From Portfolio (2026-11-07): Next #1. Cheapest unblocker: it feeds the index's per-use-case line, the portal and task mining. Run the Langfuse audit first. From TL-004 (2026-11-07): classifying gateway telemetry into token-shape cells and pillar families moved out of the TL Index's Phase 0 to this contract. From TL-022 (2026-11-15): the telemetry contract needs bucket, service class, borrowed flag, priority, replica, and prompt and reply tokens per call, so each bucket's promise can be tracked."
next_step_due: null
---

# Use-case telemetry contract — required fields in Relay, the canonical event, enrichment records

<!-- generated:start -->
## Lab record

**TL-009 telemetry-contract** · Feature of TL-003 · Seed (v0 recorded 2026-11-02 in the parent card) · H1

Owner: Harness and platform lead to be named. Appetite: not set. Score: not scored .

Next step: Audit what Langfuse captures today against the v0 fields, per endpoint; then a Shaping session to set the schema and the Relay changes. From TL-003 (2026-11-02): Contract v0.1 additions and the derived-metric list are in the ThinkLatent Portal card. From TL-012 (2026-11-02): task mining reads the store; v0 fields are enough for a first pass From Portfolio (2026-11-07): Next #1. Cheapest unblocker: it feeds the index's per-use-case line, the portal and task mining. Run the Langfuse audit first. From TL-004 (2026-11-07): classifying gateway telemetry into token-shape cells and pillar families moved out of the TL Index's Phase 0 to this contract. From TL-022 (2026-11-15): the telemetry contract needs bucket, service class, borrowed flag, priority, replica, and prompt and reply tokens per call, so each bucket's promise can be tracked.

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
| feature-of | TL-003 portal | v0 in the parent card; every page, the digest and the agents read through it |

### Artifacts
_None recorded._

### Decision log
_None recorded._
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._
