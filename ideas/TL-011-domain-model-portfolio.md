---
id: TL-011
slug: domain-model-portfolio
title: "TLM Domain tier — which domain and task models to build (Advice, Compliance, Judge, Cybersecurity) and in what order"
aliases: []
type: Feature
parent: "TL-018"
themes: ["T-001"]
stage: "Merged"
stage_since: "2026-11-16"
horizon: "H1"
stream: null
appetite_weeks: null
appetite_ends: null
owner: "Head of ThinkLatent (sponsor); domain leads to be named per build"
score: null
score_status: none
doc_url: null
standard: "pre-v1"
last_touched: 2026-11-16
sensitivity: none
critique_recorded: null
next_step: "None here: work continues in TL-018 tlm-roadmap's Domain tier track (TL-018.domain-tier), which carries this row's next step and open items (D-391)."
next_step_due: null
merged_into: "TL-018"
track: "TL-018.domain-tier"
---

# TLM Domain tier — which domain and task models to build (Advice, Compliance, Judge, Cybersecurity) and in what order

<!-- generated:start -->
## Lab record

> **Merged** into [TL-018 tlm-roadmap](TL-018-tlm-roadmap.md) as the **Domain tier** track (TL-018.domain-tier) on 2026-11-16 (D-391). Its purpose, next step and every open item continue on the track, listed in the parent's doc under Tracks; this record stays as it stood at the merge.

**TL-011 domain-model-portfolio** · Feature of TL-018 · Merged (Merged into TL-018 tlm-roadmap as the Domain tier track (TL-018.domain-tier) on 2026-11-16 (D-391); its purpose and every open item moved to the track; this row is the record up to the merge. Before: Scout brief recorded and validated against the TL-003 TLM session 2026-11-02; three design decisions logged; Idea card not yet written) · H1

Owner: Head of ThinkLatent (sponsor); domain leads to be named per build. Appetite: not set. Score: not scored .

Next step: None here: work continues in TL-018 tlm-roadmap's Domain tier track (TL-018.domain-tier), which carries this row's next step and open items (D-391).

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
| reuses | TLM4 Core 27B and Distil tier | Scout finding: Domain tier as adapter families on existing bases, not new domain bases |
| reuses | HyperPod serving | Scout finding: Domain tier as adapter families on existing bases, not new domain bases |
| reuses | model compression pipeline | Scout finding: Domain tier as adapter families on existing bases, not new domain bases |
| reuses | self-healing system | Scout finding: Domain tier as adapter families on existing bases, not new domain bases |
| reuses | evaluation register and harness (the TL Index) | Scout finding: Domain tier as adapter families on existing bases, not new domain bases |
| creates | Judge family (groundedness, rubric, reward) | Candidate catalogue rows; to be confirmed at Shaping |
| creates | house PII and injection encoders | Candidate catalogue rows; to be confirmed at Shaping |
| creates | compliance document-intelligence adapter layer | Candidate catalogue rows; to be confirmed at Shaping |
| creates | advice suitability layer and benchmark | Candidate catalogue rows; to be confirmed at Shaping |
| related-to | TL-004 index | Judge family is the harness the TL Index needs; adapters are served through the TL-008 harness |
| related-to | TL-008 harness-served | Judge family is the harness the TL Index needs; adapters are served through the TL-008 harness |
| depends-on | TL-009 telemetry-contract | First Domain adapters are chosen from the tasks mined behind the flagship use case |
| depends-on | TL-003 portal task mining | First Domain adapters are chosen from the tasks mined behind the flagship use case |
| enables | TL-003 portal improvement loop | The 'train a specialist in N hours' step produces Domain-tier adapters; TL-011 is the content of that loop |
| feature-of | TL-018 tlm-roadmap | Domain tier of the suite (D-175) |
| depends-on | TL-020 judge-family | Domain adapters are scored by the judges (gate 3) |

### Artifacts
| Artifact | Kind | In this repo | Live | Exported |
| --- | --- | --- | --- | --- |
| scout-brief-domain-model-portfolio.md | brief | [artifacts/TL-011-domain-model-portfolio/scout-brief-domain-model-portfolio.md](../artifacts/TL-011-domain-model-portfolio/scout-brief-domain-model-portfolio.md) | [claude.ai](project-knowledge:claude/scout-brief-domain-model-portfolio.md) | 2026-11-04 |

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-039 | 2026-11-02 | Registered at Seed with a scout brief; proposed order: Judge family and house PII encoders now, Compliance pre-review adapters now, Advice evaluation harness and suitability layer (no advice model) now, Cyber reuse evaluation with no training now; Core flywheel, Compliance document-intelligence layer, Advice narrative adapters and a conditional Cyber adapter in 12–24 months | Thinking partner, pending Jithin | proposed |
| D-041 | 2026-11-02 | Three design decisions after validating the scout brief against the TLM line: (1) Core-only rule stays: every Domain-tier model, judges and classifiers included, is built on Core, not Distil; (2) Advice stays one domain, not split into servicing and recommendation; (3) Cybersecurity stays on Core as its base, no separate foundation model, reuse evaluation before any training. Dissent recorded: the brief's evidence puts scoring and gating models at 0.6–8B with no gain above, so Core-sized judges carry a compute cost the index should measure | Jithin | accepted |
| D-391 | 2026-11-16 | TL-011 domain-model-portfolio, TL-014 model-mix, TL-019 tlm-omni, TL-020 judge-family and TL-021 tlm5 merged into TL-018 tlm-roadmap as five tracks (domain-tier, model-mix, omni, judges, tlm5), each keeping its stage, doc, next step and dates. Supersedes D-175 on purpose: D-175 kept them as features so TL-014's decided architecture and dataset work would not reset, and tracks keep that work intact. D-175's demotion test lapses, since TL-018 now owns seven running tracks. The Domain tier gets its Shaping read at gate 1 on 5 Dec (date set on Jithin's call). | Jithin (question prompt) | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._
