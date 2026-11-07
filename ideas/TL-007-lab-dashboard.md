---
id: TL-007
slug: lab-dashboard
title: "Idea Lab dashboard — bird's-eye view of the lab (React, responsive)"
aliases: ["the dashboard", "lab dashboard", "bird's-eye view", "portfolio view"]
type: Feature
parent: "TL-006"
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
last_touched: 2026-11-05
sensitivity: none
critique_recorded: true
next_step: "Jithin runs the week from the command center and Jarvis; H1 (weekly use), H2 (decisions citing a flag) and H5 (Jarvis use) are read at the 30-day review on 2026-12-01. The Lab-operations chat still owes the Operating Model lifecycle amendment, the register columns and the five stream engineers (S-A's engineer takes this row) From Portfolio (2026-11-07): Now, run only. No new build before the 2026-12-01 review."
next_step_due: "2026-12-01"
---

# Idea Lab dashboard — bird's-eye view of the lab (React, responsive)

<!-- generated:start -->
## Lab record

**TL-007 lab-dashboard** · Feature of TL-006 · Building (under S-A; the Building gate passed 2026-11-01; rebuilt on ThinkLatent kit with the command center and Jarvis 2026-11-05) · H1 · S-A

Owner: Thinking partner (owner and builder under S-A until the stream engineer is named); Jithin sponsor. Appetite: 1.5 engineer-weeks, ends 2026-12-01. Score: not scored .

Next step: Jithin runs the week from the command center and Jarvis; H1 (weekly use), H2 (decisions citing a flag) and H5 (Jarvis use) are read at the 30-day review on 2026-12-01. The Lab-operations chat still owes the Operating Model lifecycle amendment, the register columns and the five stream engineers (S-A's engineer takes this row) From Portfolio (2026-11-07): Now, run only. No new build before the 2026-12-01 review. (due 2026-12-01)

Production surface: Jithin, weekly triage and the monthly portfolio review · A private claude.ai artifact fed by the nightly sync · Decisions per month that cite a dashboard flag (H2)

Governance (separate team): not needed, None: internal strategy, no client data

### Decisions due
_None._

### Hypotheses
| Claim | Confirmed if | Refuted if | Evidence | Confidence | Result |
| --- | --- | --- | --- | --- | --- |
| H1 Use: once the register passes 15 rows, Jithin runs his weekly triage from the dashboard | At least one visit a week over 8 weeks | Fewer than one visit a fortnight | opinion | 60% | open |
| H2 Decisions: the dashboard changes decisions | At least one park, kill or booked session a month traced to a flag | Two monthly reviews pass with none | opinion | 60% | open |
| H3 Pipeline: the nightly sync exports register.json without manual repair | 27 of 30 nights clean | The export breaks twice in a month for structural reasons | opinion | 60% | open |
| H4 Reach: a read-only snapshot is enough | Fewer than one a week | Write-back asked for in two consecutive reviews | opinion | 60% | open |
| H5 Jarvis: Jithin works the lab through Jarvis | Twice a week, and at least one confirmed card a month, over 8 weeks | Fewer than one conversation a fortnight after the first month | opinion | 50% | open |

### Kill signals
| Signal | By | Status | Action |
| --- | --- | --- | --- |
| The register is under ten rows two quarters from now | 2027-04-01 | open | Park; the register doc suffices |
| Jithin opens it less than weekly after 60 days | 2026-12-31 | open | Park; fold the best view into the weekly digest |
| The export needs manual repair more than twice in a month and the fix is not structural | no date | open | Stop the sync step; review the contract |
| A portfolio review runs without it and loses nothing | no date | open | Kill |
| Jarvis unused for 30 days after the first month | 2027-01-05 | open | Remove the Jarvis panel and the sample capability; keep the brief the page writes from the rule table |

### Open questions
| Question | Owner | Blocking |
| --- | --- | --- |
| Register columns to add: stage-since, per-criterion scores, appetite, sensitivity, feature priority, critique-recorded, capability IDs | Jithin, in a Lab-operations chat | No, until the sync export is wired |
| Add a register.json export step to the nightly lab sync | Jithin, in a Lab-operations chat | Yes, for the 30-day review |

### Links
| Link | To | Note |
| --- | --- | --- |
| feature-of | TL-006 idea-lab | Tooling for the lab itself; inherits no theme because TL-006 serves none |
| reuses | Idea Register | Declared at Shaping |
| reuses | Scheduled-task and brief patterns | Declared at Shaping |
| reuses | Idea doc standard v1 | Declared at Shaping |
| creates | Register data contract (register.json, JSON Schema, sync export step) | Catalogue row at Proposed maturity once the contract is written; demand already 3 (weekly digest, portfolio deck, nightly sync) |
| related-to | Weekly lab digest (TL-006 operations) | Same data contract; the digest answers the decision and staleness questions without a page |
| reuses | TL-013 design-kit | ThinkLatent kit vendored at 969f885 into dashboard/vendor/design-kit; the lab dashboard is the kit's third consumer |
| creates | Register assistant (Jarvis) | Claude through the artifact's sample capability, five page tools, propose-only cards into the decision inbox |
| reuses | Propose-only harness policy | Jarvis proposes; Jithin confirms every card |

### Artifacts
| Artifact | Kind | In this repo | Live | Exported |
| --- | --- | --- | --- | --- |
| Idea Lab dashboard (lab-dashboard) — Idea card | doc | [artifacts/TL-007-lab-dashboard/idea-card.md](../artifacts/TL-007-lab-dashboard/idea-card.md) | [claude.ai](https://claude.ai/artifact/WFSu2rXsSAFzS6tqsDvHH8) | 2026-11-05 |
| Idea Lab dashboard | page | [docs/index.html](../docs/index.html) | [claude.ai](https://claude.ai/artifact/X1ebYqg9d1QRr1GYJkaLMr) | 2026-11-05 |

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-017 | 2026-11-01 | Registered as a feature of TL-006 with an idea card; read-only v1 recommended; build waits on seven open decisions and a research session | Thinking partner, pending Jithin | accepted |
| D-018 | 2026-11-01 | Recommendations accepted: read-only v1, Jithin-only audience, private artifact plus source, Lab-operations changes left for their own chat; build to proceed | Jithin | accepted |
| D-019 | 2026-11-01 | Feature backlog recorded in the idea card: 23 candidates in three waves; wave 1 proposed as the next build; twelve process rules proposed for the Lab-operations chat; wave 3 not before mid-2027 | Thinking partner, pending Jithin | proposed |
| D-020 | 2026-11-01 | All three waves ordered for build, one after the other; wave 2 and 3 views ship against the contract with not-recorded states until the register carries the fields | Jithin | accepted |
| D-022 | 2026-11-02 | Dashboard moved to Building under S-A (owner, stream and appetite present); contract v1.2 built: new stages, rejection decisions, streams and phases, production surface, governance dependency, shipped record | Thinking partner, per Jithin's order | accepted |
| D-023 | 2026-11-02 | Decision inbox: quick calls are made on the dashboard (fixed options, stored in the artifact's database), anything needing input goes to the chat; Claude applies quick calls at session open and in a morning pickup, then syncs to GitHub. Contract v1.3 | Jithin | accepted |
| D-029 | 2026-11-02 | Approve the lifecycle change and the register columns: Approve; amend the Operating Model in a Lab-operations chat (decided on the dashboard 2026-11-02) | Jithin (dashboard) | accepted |
| D-030 | 2026-11-02 | Moved to Building under S-A (owner, stream and appetite of 1.5 engineer-weeks present); version 3 published with the lifecycle, streams and phases, production surface, governance dependency and Shipped record | Thinking partner, per Jithin's order | accepted |
| D-110 | 2026-11-05 | The dashboard is built on ThinkLatent kit, vendored at a pinned commit (969f885) and never edited in the product: kit-pull refreshes it and refuses when a kit file was changed locally; the product's own wrappers (Shell D, spring motion, the command center, the record sheet) live in dashboard/src/kit and are candidates to upstream | Jithin (order); thinking partner (build) | accepted |
| D-111 | 2026-11-05 | Jarvis joins the dashboard: it answers through Claude on Jithin's own account and reads only the register and the page; it proposes quick calls and drafts requests for the next lab chat, and nothing reaches the decision inbox until Jithin confirms a card; it never writes the register; it speaks with the device's own voices and does not listen (a claude.ai page has no microphone, and browser dictation would send the audio to a third party) | Jithin (order); thinking partner (build) | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._
