---
id: VI-003
slug: vi-portal
title: "VI Portal — one shop for enterprise users, SLM builders, the VI foundation team and governance"
aliases: ["VI Portal", "the portal", "Vanguard Proprietary Intelligence portal"]
type: Idea
parent: null
themes: ["T-001"]
stage: "Shaping"
stage_since: "2026-11-01"
horizon: "H2"
stream: "S-C"
appetite_weeks: 9
appetite_ends: null
owner: "Head of VI (sponsor); portal product lead to be named"
score: null
score_status: none
doc_url: "https://claude.ai/artifact/QtTppN7KFdEDvjX7RRkEFn"
standard: "v1"
last_touched: 2026-11-05
sensitivity: none
critique_recorded: false
next_step: "Jithin walks the requirements doc (12 sections, 46 screen requirements, nine epics on six tracks, and a Gap backlog tab of 114 gaps with 12 P1 and 11 fixes) and interface v5 (48 screens on the kit) with the team and divides the work by track: Platform (E0, E9), Serving (E1), Product showroom (E2), Product workbench (E3), Training (E4), Evaluation and governance (E5), Data (E6), Intelligence (E7), Agents (E8); each screen id is one backlog item. Then: name the portal product lead; run the Langfuse capture audit (VI-009); port the v5 boards to routes in the kit playground. Parked for Stress test: Risk's concurrence on the grace policy, the SR 11-7 verification, the open decisions in section 12 of the requirements doc. From VI-012: the agent library is the portal's A1 page. From VI-010: Blueprints are retired in favour of the agent library (recorded in the requirements doc; VI-010's own chat to confirm)."
next_step_due: null
---

# VI Portal — one shop for enterprise users, SLM builders, the VI foundation team and governance

<!-- generated:start -->
## Lab record

**VI-003 vi-portal** · Idea · Shaping (Idea card v2, 2026-11-02; decisions 1 to 9 taken; sketch v3.3 built; requirements v1 and interface v5 on the VI kit built 2026-11-05, decision 10; Stress test next) · H2 · S-C

Owner: Head of VI (sponsor); portal product lead to be named. Appetite: 9 engineer-weeks. Score: not scored .

Next step: Jithin walks the requirements doc (12 sections, 46 screen requirements, nine epics on six tracks, and a Gap backlog tab of 114 gaps with 12 P1 and 11 fixes) and interface v5 (48 screens on the kit) with the team and divides the work by track: Platform (E0, E9), Serving (E1), Product showroom (E2), Product workbench (E3), Training (E4), Evaluation and governance (E5), Data (E6), Intelligence (E7), Agents (E8); each screen id is one backlog item. Then: name the portal product lead; run the Langfuse capture audit (VI-009); port the v5 boards to routes in the kit playground. Parked for Stress test: Risk's concurrence on the grace policy, the SR 11-7 verification, the open decisions in section 12 of the requirements doc. From VI-012: the agent library is the portal's A1 page. From VI-010: Blueprints are retired in favour of the agent library (recorded in the requirements doc; VI-010's own chat to confirm).

Production surface: A team in one business line requesting a model for one workflow · The VI Portal: request, approved access, served model · Days from request to approved access on the first five workflows

Governance (separate team): not started, Usage-approval record aligned with Risk's model inventory — on the critical path

### Decisions due
- Name the beachhead business line for the first journey (needs the chat)

### Hypotheses
| Claim | Confirmed if | Refuted if | Evidence | Confidence | Result |
| --- | --- | --- | --- | --- | --- |
| P1. A single front door shortens adoption | Median time falls by half on the first five workflows onboarded through the portal | No measurable change, or teams route around the portal | not set | not set | open |
| P2. Usage-based approval cuts governance rework | Second and later usages of an approved model clear review materially faster | Governance still runs bespoke reviews for each usage | not set | not set | open |
| P3. SLM teams reuse instead of rebuild | The second SLM build on the portal reuses harness, bars and serving with no new eval scaffolding | Each build still needs its own scaffolding | not set | not set | open |
| P4. Demand signals steer the foundation roadmap | At least one roadmap decision in two quarters cites portal demand data | No roadmap decision cites it | not set | not set | open |

### Kill signals
_None recorded._

### Open questions
| Question | Owner | Blocking |
| --- | --- | --- |
| Which business line is the beachhead for the first journey? | Head of VI with business partners | Yes, for Proposal |
| Who is the portal product lead? | Head of VI | Yes, for Proposal |
| What does Risk already use as its model inventory, and does the portal feed it or replace part of it? | Risk and Compliance liaison | Yes, for Stress test |
| Is there an internal developer portal the catalogue should live inside rather than beside? | Harness and platform lead | No |
| What is the baseline time from request to approved access today? | Portal product lead | Yes, for Stress test |

### Links
| Link | To | Note |
| --- | --- | --- |
| depends-on | VI-004 vai | Onboarding, catalogue and governance surfaces need index evidence |
| serves | T-001 Sovereign AI |  |
| reuses | AI Gateway and multi-tenant memory | Declared at Shaping |
| reuses | HyperPod serving with per-setting endpoints | Declared at Shaping |
| reuses | Model compression pipeline | Declared at Shaping |
| reuses | Self-healing gap-closing system | Declared at Shaping |
| reuses | Evaluation register and harness | Declared at Shaping; evaluation register is still Proposed, so the portal inherits that risk |
| reuses | Contribution flow | Declared at Shaping |
| creates | Model catalogue | Catalogue row at Idea maturity |
| creates | Usage-approval record | Catalogue row at Idea maturity; a promotion candidate |
| creates | Onboarding flow | Catalogue row at Idea maturity |
| creates | SLM build workspace | Catalogue row at Idea maturity |
| depends-on | VI-009 telemetry-contract | Phase 1 cannot show a live view without it |
| reuses | Nucleus SDK | Declared 2026-11-02 |
| reuses | Langfuse telemetry store | Declared 2026-11-02 |
| reuses | Hermes harness and Nucleus sessions (via VI-008) | Declared 2026-11-02 |
| creates | Use-case telemetry contract (VI-009) | Added 2026-11-02 |
| creates | use-case record, one object with the usage-approval record | Added 2026-11-02 |
| creates | blueprints registry (VI-010) | Added 2026-11-02 |
| enables | VI-012 agent-portfolio | The portal's agent library is where the portfolio's agents are found, forked and governed; captured 2026-11-02 from the VI-003 session |
| reuses | VI-013 design-kit | First consumer and proving ground; the sketch's implicit language (Inter, one accent, tiles of four, one exhibit, honest placeholders, intervals, engineering view as a layer) is the kit's starting point |

### Artifacts
| Artifact | Kind | In this repo | Live | Exported |
| --- | --- | --- | --- | --- |
| VI Portal (vi-portal) — Idea card | doc | [artifacts/VI-003-vi-portal/idea-card.md](../artifacts/VI-003-vi-portal/idea-card.md) | [claude.ai](https://claude.ai/artifact/QtTppN7KFdEDvjX7RRkEFn) | 2026-11-04 |
| VI Portal playground | page | [artifacts/VI-003-vi-portal/playground/README.md](../artifacts/VI-003-vi-portal/playground/README.md) | [claude.ai](https://claude.ai/artifact/LHMeaT54htG3mzg914N7Ew) | 2026-11-05 |
| VI Portal (vi-portal) — Interface sketch v3 | design | [artifacts/VI-003-vi-portal/interface-sketch-v3/project/canvas.json](../artifacts/VI-003-vi-portal/interface-sketch-v3/project/canvas.json) | [claude.ai](https://claude.ai/artifact/JuvPWSqT6SZFuyuxWv1Wn8) | 2026-11-04 |
| scout-brief-vi-portal.md | brief | [artifacts/VI-003-vi-portal/scout-brief-vi-portal.md](../artifacts/VI-003-vi-portal/scout-brief-vi-portal.md) | [claude.ai](project-knowledge:claude/scout-brief-vi-portal.md) | 2026-11-04 |
| scout-brief-kpis-feedback.md | brief | [artifacts/VI-003-vi-portal/scout-brief-kpis-feedback.md](../artifacts/VI-003-vi-portal/scout-brief-kpis-feedback.md) | [claude.ai](project-knowledge:claude/scout-brief-kpis-feedback.md) | 2026-11-04 |
| scout-brief-adoption.md | brief | [artifacts/VI-003-vi-portal/scout-brief-adoption.md](../artifacts/VI-003-vi-portal/scout-brief-adoption.md) | [claude.ai](project-knowledge:claude/scout-brief-adoption.md) | 2026-11-04 |
| scout-brief-eval-governance.md | brief | [artifacts/VI-003-vi-portal/scout-brief-eval-governance.md](../artifacts/VI-003-vi-portal/scout-brief-eval-governance.md) | [claude.ai](project-knowledge:claude/scout-brief-eval-governance.md) | 2026-11-04 |
| scout-brief-platform-features.md | brief | [artifacts/VI-003-vi-portal/scout-brief-platform-features.md](../artifacts/VI-003-vi-portal/scout-brief-platform-features.md) | [claude.ai](project-knowledge:claude/scout-brief-platform-features.md) | 2026-11-04 |
| scout-brief-serving-telemetry.md | brief | [artifacts/VI-003-vi-portal/scout-brief-serving-telemetry.md](../artifacts/VI-003-vi-portal/scout-brief-serving-telemetry.md) | [claude.ai](project-knowledge:claude/scout-brief-serving-telemetry.md) | 2026-11-04 |

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-011 | 2026-11-01 | Idea card drafted in Shaping: problem statement, hypotheses P1 to P4, feature map, one-journey first version, governance story; one-quarter appetite proposed | Thinking partner, pending Jithin | superseded |
| D-024 | 2026-11-02 | Set the appetite: Accept one quarter (about 9 engineer-weeks under S-C) (decided on the dashboard 2026-11-02) | Jithin (dashboard) | accepted |
| D-025 | 2026-11-02 | Approve or amend the idea card: Approve the idea card as drafted (decided on the dashboard 2026-11-02) | Jithin (dashboard) | accepted |
| D-031 | 2026-11-02 | (sync) reconciled owner from doc: Head of VI (sponsor); portal product lead to be named (register had Jithin) | Nightly sync | accepted |
| D-033 | 2026-11-02 | Decision 1: showroom and workbench as one programme, phased (0 telemetry contract, 1 showroom, 2 loop when VAI delivers); the one-journey first version subsumed; phase 1 sized to a quarter | Jithin (thinking partner had recommended showroom first) | accepted |
| D-034 | 2026-11-02 | Decision 2: layered validation; base model and VAI methodology validated once outside the platform; each use case evaluated on top, inside the portal when mature enough for curated labels; approvers join once the mechanism exists | Jithin | accepted |
| D-035 | 2026-11-02 | Decision 3: current logging and project-ID tags not fit; the portal defines the use-case telemetry contract (VI-009) and Nucleus follows it; the capture audit is the first engineering task | Jithin | accepted |
| D-036 | 2026-11-02 | Decision 4: two-layer telemetry, canonical event in-band and checks asynchronous with the harness as the async layer; hard blocks stay in-band (recorded caveat) | Jithin | accepted |
| D-037 | 2026-11-02 | Decision 5: the Langfuse database houses everything with its schema modified inside; the portal shows a condensed view and agents read the full data; standing critique recorded (upgrade merges, per-consumer access control) | Jithin (against the thinking partner's recommendation) | accepted |
| D-040 | 2026-11-02 | Feature plan v2 proposed from scout pass 2 (per page, build order, five gaps to own: generation deltas, one use-case record tying budget to approval, canary with quality per arm, the loop as a state machine, forkable use cases with a provisioning assistant); Contract v0.1 additions and derived metrics listed; the eval-governance brief's claim that SR 11-7 was rescinded in April 2026 recorded as unverified for the Risk liaison | Thinking partner, pending Jithin | proposed |
| D-042 | 2026-11-02 | Decision 6: all five scout-pass-2 briefs adopted; Feature plan v2 stands as the build list; interface sketch v3 (20 screens) built against it the same day; SR 11-7 claim still to be verified before any governance feature rests on it | Jithin (adoption); thinking partner (sketch) | accepted |
| D-044 | 2026-11-02 | Two sessions registered VI-012 within minutes (agent-portfolio from the VI-011 chat; agent-library from the VI-003 chat); reconciled to one row, VI-012 agent-portfolio, with the agent-library thought carried in its next step and a VI-003 enables VI-012 link | Thinking partner (VI-003 session) | accepted |
| D-046 | 2026-11-02 | Design rule: the harness (VI-008) is inside the API and invisible in the portal UI; only an endpoint build version stays, on the record and in engineering view. Sketch v3.1 applied it; sketch v3 otherwise accepted by Jithin | Jithin | accepted |
| D-047 | 2026-11-02 | Decision 7: grace policy for unregistered usage approved (day 0 seen and offered help; day 14 tags required; day 30 record required, production endpoints withdrawn with a week's notice; unapproved vendor hosts to Risk at once); Risk's concurrence pending before day 30 goes live; sketch v3.1 shows the approval on the page | Jithin | accepted |
| D-048 | 2026-11-02 | Governance sits outside the design sessions for now: the SR 11-7 rescission check and Risk's concurrence on the grace policy are parked as recorded assumptions, not blockers, and return at Stress test | Jithin | accepted |
| D-071 | 2026-11-03 | Training surface benchmarked against Unsloth Studio; sketch v3.2 adds the engineering trainer view, recipe, run history, job controls, Train-as and the Datasets bring-data-in flow; weight export outside the boundary, business-user hyperparameter dials and one-click routing to production deliberately not copied | Thinking partner, pending Jithin | proposed |
| D-076 | 2026-11-03 | Decision 8: users train models on the portal's own UI; Unsloth is a feature reference only (not hosted, not a dependency); the reuse question is closed; sketch v3.3 adds the New training run card to the Training page | Jithin | accepted |
| D-099 | 2026-11-05 | Decision 9: the portal hosts the ten features handed over from the VI site and every VAI evaluation surface (results page, index page, annual report hub, corrections log, leaderboard, source and as-of on every number); VAI is built separately but its evaluation is visible only in the portal; the site links in | Jithin | accepted |
| D-101 | 2026-11-05 | Decision 10: the portal is specified in a requirements document (12 sections, 46 screen requirements, nine epics on six parallel tracks) and built as interface v5 on the VI kit (48 screens) so the team can divide the work; the sixth scout brief's four behaviours adopted (dependents graph with retirement notices, budget cap that pauses and checkpoints, three-level agent evals with pass^k, production health in the stage gate); kit-test artboards dropped as references | Jithin | accepted |
| D-104 | 2026-11-05 | Features from earlier canvases and documents that interface v5 lacks are recorded as backlog, not built: a Gap backlog tab in the requirements doc with 114 gaps (12 P1, 66 P2, 36 P3), 11 fixes where v5 or the requirements contradict a decision, and 6 items dropped on purpose | Jithin | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._
