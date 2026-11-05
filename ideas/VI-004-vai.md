---
id: VI-004
slug: vai
title: "Vanguard AI Index"
aliases: ["VAI", "the index", "AI index", "model index"]
type: Feature
parent: "VI-003"
themes: ["T-001"]
stage: "Proposal"
stage_since: "2026-11-01"
horizon: "H1"
stream: "S-B"
appetite_weeks: null
appetite_ends: null
owner: "Head of VI (sponsor); index lead and harness lead to be named"
score: 3.95
score_status: set
doc_url: "https://claude.ai/artifact/4pwnZVstw8ZpcAP6sofN4U"
standard: "v1"
last_touched: 2026-11-01
sensitivity: none
critique_recorded: true
next_step: "Name the index and harness leads and set the appetite in engineer-weeks so the four-week decision spike can start under S-B (the Building gate; due 2026-11-15); set the score; share with the team. From VI-003 (2026-11-02): the per-use-case line item should run against the endpoint (the served system) once harnesses exist; the Judge domain model and the judge-location question are one decision; scout-brief-eval-governance.md (2026-11-02) lists ten presentation features for the index (intervals and n per score, item drill-down, Official versus Practice runs, judge calibration cards, sufficiency view). From VI-012 (2026-11-02): add the variant comparison card (variants against rubric, cost per task, latency, pass^k, a frontier baseline, the team's choice logged) to the index's presentation features; VI-012's H3, H4, H7 and H8 run on the index. From VI-016 (2026-11-05, scout-brief-vi-site.md): add a living evaluations hub with method and exclusions stated, an index-as-artifact page (ranked graphic, method, data, plain-language explainer), an annual report hub (takeaways, chapters, leadership digest, data download, recorded launch, archive), a corrections log, the leaderboard as its own section, and a source and as-of date on every number; the site carries a VAI summary tile and links here"
next_step_due: "2026-11-15"
---

# Vanguard AI Index

<!-- generated:start -->
## Lab record

**VI-004 vai** · Feature of VI-003 · Proposal (Funded by default; Building gate not passed: leads unnamed, appetite unset) · H1 · S-B

Owner: Head of VI (sponsor); index lead and harness lead to be named. Appetite: Two quarters to the first quarterly index report (Phase 0 to Phase 2). Score: 3.95 (set).

Next step: Name the index and harness leads and set the appetite in engineer-weeks so the four-week decision spike can start under S-B (the Building gate; due 2026-11-15); set the score; share with the team. From VI-003 (2026-11-02): the per-use-case line item should run against the endpoint (the served system) once harnesses exist; the Judge domain model and the judge-location question are one decision; scout-brief-eval-governance.md (2026-11-02) lists ten presentation features for the index (intervals and n per score, item drill-down, Official versus Practice runs, judge calibration cards, sufficiency view). From VI-012 (2026-11-02): add the variant comparison card (variants against rubric, cost per task, latency, pass^k, a frontier baseline, the team's choice logged) to the index's presentation features; VI-012's H3, H4, H7 and H8 run on the index. From VI-016 (2026-11-05, scout-brief-vi-site.md): add a living evaluations hub with method and exclusions stated, an index-as-artifact page (ranked graphic, method, data, plain-language explainer), an annual report hub (takeaways, chapters, leadership digest, data download, recorded launch, archive), a corrections log, the leaderboard as its own section, and a source and as-of date on every number; the site carries a VAI summary tile and links here (due 2026-11-15)

Production surface: Head of VI, model owners, Risk reviewers · The VI Portal's evidence layer (register API) · Model decisions and governance approvals made through the index per quarter

Governance (separate team): not started, Judge-panel location and training-data wall sign-off

### Decisions due
- Name the index lead and the harness lead (the Building gate; nothing starts without them) (needs the chat)
- Set the appetite in engineer-weeks for the spike and Phase 0 (needs the chat)

### Hypotheses
| Claim | Confirmed if | Refuted if | Evidence | Confidence | Result |
| --- | --- | --- | --- | --- | --- |
| H1. Task complexity, not model size, predicts fit for Vanguard tasks | Most pillars plateau at a mid-size or small model class; score correlates with task complexity more than with model size | Scores keep rising with model size across most pillars, including bounded tasks | opinion | not set | open |
| H2. Frontier upgrades do not move Vanguard-relevant metrics | Public benchmark gains are large while VAI pillar movement is within noise, except on named reasoning-heavy pillars | Each release moves several VAI pillars past the production bar where the incumbent fell short | opinion | not set | open |
| H3. Task-specific trained smaller models beat general models in Vanguard context | Specialists win on bounded pillars (1, 3-routing, 7, 14, 15) at lower cost, and the gap holds across two quarterly re-runs | General models match specialists at similar cost, or specialist gains erode between re-runs faster than retraining is affordable | opinion | not set | open |

### Kill signals
| Signal | By | Status | Action |
| --- | --- | --- | --- |
| The four-week decision spike finds no bounded workflow where a mid-size or small model clears a practitioner-set bar | no date | open | Re-scope VAI to a regression gate and release-evaluation service; drop the training-targets claim |
| Fewer than three business partners have signed a production bar | no date | open | Park; the index has no authority |
| The harness cannot reproduce a public benchmark within published error bars | no date | open | Stop until fixed; nothing is published from an uncalibrated harness |
| No sufficiency decision for at least two real workflows within two quarters of Phase 1 start | no date | open | Kill, or re-scope to the regression gate only |
| No model decision cites the index in the two quarters after the first report | no date | open | Park; the product is not used |
| Any task-library item or near-duplicate found in a training batch | no date | open | Freeze both programmes until the wall is rebuilt and audited |
| Index lead and harness lead not named | no date | open | Do not start Phase 0 |

### Open questions
| Question | Owner | Blocking |
| --- | --- | --- |
| Which business-line leaders own the production bar for each MVP pillar? | Pillar owners | Yes |
| Where does the judge panel run, given that frontier judges may sit outside our boundary? | Security and Risk liaisons | Yes |
| Do we license an external finance benchmark as a reference pillar, or stay fully private? | Index lead with Procurement | No |
| What retraining cadence are we willing to fund for specialists, since that cost belongs in H3? | Training programme liaison with Finance | Yes, for H3 |
| Which business-line weights define the composites, and who signs them off? | Sponsor with business partners | No, until Phase 2 |
| How do the University of Toronto lab and the India and Canada teams split task-set and use-case construction? | Index lead | Yes |
| Which three use cases form the MVP, and which public tools do we mirror first? | Use-case owners | Yes |
| What is the production bar format: a single pass rate, or pass rate plus a cost ceiling? | Index lead with Risk | Yes |

### Links
| Link | To | Note |
| --- | --- | --- |
| feature-of | VI-003 vi-portal | Index is delivered as portal features on the register API |
| depends-on | VI-005 self-healing | Gap reports feed the heal loop; evaluation data must never enter training |
| related-to | VI-001 neo | Both consume the morning brief and scheduled-task patterns |
| reuses | AI Gateway and multi-tenant memory | Declared at Proposal |
| reuses | HyperPod serving with per-setting endpoints | Declared at Proposal |
| reuses | Model compression pipeline | Declared at Proposal |
| reuses | Self-healing gap-closing system | Declared at Proposal |
| reuses | Scheduled-task and brief patterns | Declared at Proposal |
| reuses | University of Toronto lab | Declared at Proposal |
| creates | Evaluation register and harness | Catalogue row at Proposed maturity |
| creates | Contribution flow | Catalogue row at Proposed maturity |
| creates | Sandboxed tool replicas | Catalogue row at Proposed maturity |
| creates | Skill-tandem records | Catalogue row at Proposed maturity |
| serves | T-001 Sovereign AI | VAI inherits the theme from its parent |

### Artifacts
| Artifact | Kind | In this repo | Live | Exported |
| --- | --- | --- | --- | --- |
| Vanguard AI Index — Project Definition | doc | [artifacts/VI-004-vai/proposal.md](../artifacts/VI-004-vai/proposal.md) | [claude.ai](https://claude.ai/artifact/4pwnZVstw8ZpcAP6sofN4U) | 2026-11-04 |

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-001 | 2026-11-01 | Index is a feature of the VI Portal, not a standalone product | Jithin | accepted |
| D-002 | 2026-11-01 | Core hypothesis pre-registered: sufficiency over size; specialists beat generalists in Vanguard context; frontier upgrades do not move Vanguard metrics | Jithin | accepted |
| D-003 | 2026-11-01 | Proposal drafted for team review; two candidate pillars (visual and chart understanding, UI generation) proposed for the pillar council | Jithin | accepted |
| D-004 | 2026-11-01 | Registered as VI-004 with a lab record; rubric composite 4.1 proposed, pending Jithin; stress-test critique log to be recorded before team review | Thinking partner, pending Jithin | superseded |
| D-009 | 2026-11-01 | Stress test recorded in the proposal: critique log, pre-mortem, kill criteria; four-week decision spike added before Phase 0; Phase 1 exit gate now requires one real model decision and one governance approval through the index; rubric revised to 4.0 proposed. Open: business partners, judge location, index and harness leads | Thinking partner, pending Jithin | superseded |
| D-026 | 2026-11-02 | Set the rubric score: Set 3.95 (proposed quarter weights) (decided on the dashboard 2026-11-02) | Jithin (dashboard) | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._
