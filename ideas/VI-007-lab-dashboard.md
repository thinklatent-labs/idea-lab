---
id: VI-007
slug: lab-dashboard
title: "Idea Lab dashboard — bird's-eye view of the lab (React, responsive)"
aliases: ["the dashboard", "lab dashboard", "bird's-eye view", "portfolio view"]
type: Feature
parent: "VI-006"
themes: []
stage: "Building"
stage_since: "2026-11-01"
horizon: "H1"
stream: "S-A"
appetite_weeks: 1.5
appetite_ends: "2026-12-01"
owner: "Thinking partner (owner and builder under S-A until the stream engineer is named); Jithin sponsor"
score: null
score_status: none
doc_url: "https://claude.ai/artifact/WFSu2rXsSAFzS6tqsDvHH8"
standard: "v1"
last_touched: 2026-11-01
sensitivity: none
critique_recorded: true
next_step: "Lab-operations chat: lifecycle change, sync export with snapshots, register columns, process rules; first Shipped read when Jithin runs a weekly triage from the page"
next_step_due: "2026-12-01"
---

# Idea Lab dashboard — bird's-eye view of the lab (React, responsive)

<!-- generated:start -->
## Lab record

**VI-007 lab-dashboard** · Feature of VI-006 · Building (Building under S-A; waves 1 to 3 shipped to a private artifact; first user read pending) · H1 · S-A

Owner: Thinking partner (owner and builder under S-A until the stream engineer is named); Jithin sponsor. Appetite: 1.5 engineer-weeks, ends 2026-12-01. Score: not scored .

Next step: Lab-operations chat: lifecycle change, sync export with snapshots, register columns, process rules; first Shipped read when Jithin runs a weekly triage from the page (due 2026-12-01)

Production surface: Jithin, weekly triage and the monthly portfolio review · A private claude.ai artifact fed by the nightly sync · Decisions per month that cite a dashboard flag (H2)

Governance (separate team): not needed, None: internal strategy, no client data

### Decisions due
- Approve the lifecycle change (Building and Shipped stages, rejection as a decision type) and the register columns (quick call on the dashboard: Approve; amend the Operating Model in a Lab-operations chat / Discuss in chat)

### Hypotheses
| Claim | Confirmed if | Refuted if | Evidence | Confidence | Result |
| --- | --- | --- | --- | --- | --- |
| H1 Use: once the register passes 15 rows, Jithin runs his weekly triage from the dashboard | At least one visit a week over 8 weeks | Fewer than one visit a fortnight | opinion | 60% | open |
| H2 Decisions: the dashboard changes decisions | At least one park, kill or booked session a month traced to a flag | Two monthly reviews pass with none | opinion | 60% | open |
| H3 Pipeline: the nightly sync exports register.json without manual repair | 27 of 30 nights clean | The export breaks twice in a month for structural reasons | opinion | 60% | open |
| H4 Reach: a read-only snapshot is enough | Fewer than one a week | Write-back asked for in two consecutive reviews | opinion | 60% | open |

### Kill signals
| Signal | By | Status | Action |
| --- | --- | --- | --- |
| The register is under ten rows two quarters from now | 2027-04-01 | open | Park; the register doc suffices |
| Jithin opens it less than weekly after 60 days | 2026-12-31 | open | Park; fold the best view into the weekly digest |
| The export needs manual repair more than twice in a month and the fix is not structural | no date | open | Stop the sync step; review the contract |
| A portfolio review runs without it and loses nothing | no date | open | Kill |

### Open questions
| Question | Owner | Blocking |
| --- | --- | --- |
| Register columns to add: stage-since, per-criterion scores, appetite, sensitivity, feature priority, critique-recorded, capability IDs | Jithin, in a Lab-operations chat | No, until the sync export is wired |
| Add a register.json export step to the nightly lab sync | Jithin, in a Lab-operations chat | Yes, for the 30-day review |

### Links
| Link | To | Note |
| --- | --- | --- |
| feature-of | VI-006 idea-lab | Tooling for the lab itself; inherits no theme because VI-006 serves none |
| reuses | Idea Register | Declared at Shaping |
| reuses | Scheduled-task and brief patterns | Declared at Shaping |
| reuses | Idea doc standard v1 | Declared at Shaping |
| creates | Register data contract (register.json, JSON Schema, sync export step) | Catalogue row at Proposed maturity once the contract is written; demand already 3 (weekly digest, portfolio deck, nightly sync) |
| related-to | Weekly lab digest (VI-006 operations) | Same data contract; the digest answers the decision and staleness questions without a page |

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-017 | 2026-11-01 | Registered as a feature of VI-006 with an idea card; read-only v1 recommended; build waits on seven open decisions and a research session | Thinking partner, pending Jithin | accepted |
| D-018 | 2026-11-01 | Recommendations accepted: read-only v1, Jithin-only audience, private artifact plus source, Lab-operations changes left for their own chat; build to proceed | Jithin | accepted |
| D-019 | 2026-11-01 | Feature backlog recorded in the idea card: 23 candidates in three waves; wave 1 proposed as the next build; twelve process rules proposed for the Lab-operations chat; wave 3 not before mid-2027 | Thinking partner, pending Jithin | proposed |
| D-020 | 2026-11-01 | All three waves ordered for build, one after the other; wave 2 and 3 views ship against the contract with not-recorded states until the register carries the fields | Jithin | accepted |
| D-022 | 2026-11-02 | Dashboard moved to Building under S-A (owner, stream and appetite present); contract v1.2 built: new stages, rejection decisions, streams and phases, production surface, governance dependency, shipped record | Thinking partner, per Jithin's order | accepted |
| D-023 | 2026-11-02 | Decision inbox: quick calls are made on the dashboard (fixed options, stored in the artifact's database), anything needing input goes to the chat; Claude applies quick calls at session open and in a morning pickup, then syncs to GitHub. Contract v1.3 | Jithin | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._
