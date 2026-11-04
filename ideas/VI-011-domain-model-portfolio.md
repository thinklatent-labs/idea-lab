---
id: VI-011
slug: domain-model-portfolio
title: "VGLM Domain tier — which domain and task models to build (Advice, Compliance, Judge, Cybersecurity) and in what order"
aliases: []
type: Idea
parent: null
themes: ["T-001"]
stage: "Seed"
stage_since: null
horizon: "H1"
stream: null
appetite_weeks: null
appetite_ends: null
owner: "Head of VI (sponsor); domain leads to be named per build"
score: null
score_status: none
doc_url: null
standard: "pre-v1"
last_touched: 2026-11-02
sensitivity: none
critique_recorded: null
next_step: "Shaping session: write the idea card (domain = domain knowledge plus its tasks; all Domain models on Core; first adapters from task mining on the flagship), set the appetite for Build 1 (Judge family on Core) and declare the capabilities reused and created. From VI-012 (2026-11-02): wave 1 raises demand on the Judge family (the advisor-summary rubric grader first) and on the Compliance pre-review adapter (the same work as Build 3); the task-mining agent runs as VI-012's wave-1 spike and supplies the first adapters from the flagship"
next_step_due: null
---

# VGLM Domain tier — which domain and task models to build (Advice, Compliance, Judge, Cybersecurity) and in what order

<!-- generated:start -->
## Lab record

**VI-011 domain-model-portfolio** · Idea · Seed (Scout brief recorded and validated against the VI-003 VGLM session 2026-11-02; three design decisions logged; Idea card not yet written) · H1

Owner: Head of VI (sponsor); domain leads to be named per build. Appetite: not set. Score: not scored .

Next step: Shaping session: write the idea card (domain = domain knowledge plus its tasks; all Domain models on Core; first adapters from task mining on the flagship), set the appetite for Build 1 (Judge family on Core) and declare the capabilities reused and created. From VI-012 (2026-11-02): wave 1 raises demand on the Judge family (the advisor-summary rubric grader first) and on the Compliance pre-review adapter (the same work as Build 3); the task-mining agent runs as VI-012's wave-1 spike and supplies the first adapters from the flagship

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
| reuses | VGLM4 Core 27B and Distil tier | Scout finding: Domain tier as adapter families on existing bases, not new domain bases |
| reuses | HyperPod serving | Scout finding: Domain tier as adapter families on existing bases, not new domain bases |
| reuses | model compression pipeline | Scout finding: Domain tier as adapter families on existing bases, not new domain bases |
| reuses | self-healing system | Scout finding: Domain tier as adapter families on existing bases, not new domain bases |
| reuses | evaluation register and harness (VAI) | Scout finding: Domain tier as adapter families on existing bases, not new domain bases |
| creates | Judge family (groundedness, rubric, reward) | Candidate catalogue rows; to be confirmed at Shaping |
| creates | house PII and injection encoders | Candidate catalogue rows; to be confirmed at Shaping |
| creates | compliance document-intelligence adapter layer | Candidate catalogue rows; to be confirmed at Shaping |
| creates | advice suitability layer and benchmark | Candidate catalogue rows; to be confirmed at Shaping |
| related-to | VI-004 vai | Judge family is the harness VAI needs; adapters are served through the VI-008 harness |
| related-to | VI-008 harness-served | Judge family is the harness VAI needs; adapters are served through the VI-008 harness |
| depends-on | VI-009 telemetry-contract | First Domain adapters are chosen from the tasks mined behind the flagship use case |
| depends-on | VI-003 vi-portal task mining | First Domain adapters are chosen from the tasks mined behind the flagship use case |
| enables | VI-003 vi-portal improvement loop | The 'train a specialist in N hours' step produces Domain-tier adapters; VI-011 is the content of that loop |

### Artifacts
| Artifact | Kind | In this repo | Live | Exported |
| --- | --- | --- | --- | --- |
| scout-brief-domain-model-portfolio.md | brief | [artifacts/VI-011-domain-model-portfolio/scout-brief-domain-model-portfolio.md](../artifacts/VI-011-domain-model-portfolio/scout-brief-domain-model-portfolio.md) | [claude.ai](project-knowledge:claude/scout-brief-domain-model-portfolio.md) | 2026-11-04 |

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-039 | 2026-11-02 | Registered at Seed with a scout brief; proposed order: Judge family and house PII encoders now, Compliance pre-review adapters now, Advice evaluation harness and suitability layer (no advice model) now, Cyber reuse evaluation with no training now; Core flywheel, Compliance document-intelligence layer, Advice narrative adapters and a conditional Cyber adapter in 12–24 months | Thinking partner, pending Jithin | proposed |
| D-041 | 2026-11-02 | Three design decisions after validating the scout brief against the VGLM line: (1) Core-only rule stays: every Domain-tier model, judges and classifiers included, is built on Core, not Distil; (2) Advice stays one domain, not split into servicing and recommendation; (3) Cybersecurity stays on Core as its base, no separate foundation model, reuse evaluation before any training. Dissent recorded: the brief's evidence puts scoring and gating models at 0.6–8B with no gain above, so Core-sized judges carry a compute cost the index should measure | Jithin | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._
