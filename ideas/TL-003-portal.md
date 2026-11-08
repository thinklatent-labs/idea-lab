---
id: TL-003
slug: portal
title: "ThinkLatent Portal — one shop for enterprise users, SLM builders, the ThinkLatent foundation team and governance"
aliases: ["ThinkLatent Portal", "the portal", "ThinkLatent portal"]
type: Idea
parent: null
themes: ["T-001"]
stage: "Proposal"
stage_since: "2026-11-06"
horizon: "H2"
stream: "S-C"
appetite_weeks: 9
appetite_ends: null
owner: "Idea owner and product lead (Jithin); business head for the beachhead, Retail Advice (Jithin); platform lead and builder, stream S-C (Claude)"
score: 3.75
score_status: set
doc_url: "https://claude.ai/artifact/QtTppN7KFdEDvjX7RRkEFn"
standard: "v1"
last_touched: 2026-11-07
sensitivity: none
critique_recorded: true
next_step: "PAUSED on DK-001 (D-203): resumes when the TL-013 design-kit session ships @kit/charts (kit v0.4.0) and closes the defect. On resume: draw v6 batch 2, the live use case UC-0291 (pilot in production, then production after the 20 Nov resubmission): Traffic, Capacity, Quality, Improve, Record, Alerts, Traces, Projects, Datasets and the UA-0291-R2 approval (10 pages), each a long page replacing its v5.1 boards, numbers from facts.md (portal 6d0104b) and components named per the Kit component map; lint, independent audit, then publish (the daily artifact limit blocked publishing on the night of 7 Nov). Before that, owed by Jithin: review v6 batch 1 (canvas version 1794058450-24d4) with the resolutions table in facts.md, and read the Kit component map. Convert the component map from project knowledge into a Docs artifact once the artifact limit resets. Generator v0.2 with batch 2: use-case inventory, usage, spend, the finance method and the model approval history (audit items 7, 12, 13). Smaller review items: J10's alias tlm4-core:prod for UC-0291; UC-0142's 78% use-case bar on T2 and T6; T6 '6 gaps'; M2 serving cost and latency figures are the 8-bit row's; Main and J0 still show UC-0142 in Production (D-201 moves it to pilot; fix in batch 2's pass). After the redraw: build thinklatent-labs/portal config-first on the scenario (decisions 13 to 15), every vendored component through a @kit/kit wrapper (D-202). Alongside: write the proposal from the requirements doc (beachhead Retail Advice, D-200); share the canvas and the requirements doc; Enterprise-side items as listed in D-149. Parked until the backend: Risk's concurrence on the grace policy, the SR 11-7 verification, Risk's model inventory, a request-to-access baseline, open decisions 4 to 8, and the C2 flag. From TL-013 (2026-11-08, D-205): DK-001 is closed; the portal can resume. Pin design-kit at c7b3cc9 (v0.4.0; supersedes the d76a3b3 line above): @kit/charts (ForestPlot, LineChart, Distribution, Heatmap, SmallMultiples, ChartFrame with table view) and the InfoTip, SectionBar, Steps, Timeline, DataTable and HoldToConfirm wrappers are in."
next_step_due: "2026-11-15"
---

# ThinkLatent Portal — one shop for enterprise users, SLM builders, the ThinkLatent foundation team and governance

<!-- generated:start -->
## Lab record

**TL-003 portal** · Idea · Proposal (from 2026-11-06; Stress test closed the same day: critique answered or carried into the proposal, score set, Jithin proceeded) · H2 · S-C

Owner: Idea owner and product lead (Jithin); business head for the beachhead, Retail Advice (Jithin); platform lead and builder, stream S-C (Claude). Appetite: 9 engineer-weeks. Score: 3.75 (set).

Next step: PAUSED on DK-001 (D-203): resumes when the TL-013 design-kit session ships @kit/charts (kit v0.4.0) and closes the defect. On resume: draw v6 batch 2, the live use case UC-0291 (pilot in production, then production after the 20 Nov resubmission): Traffic, Capacity, Quality, Improve, Record, Alerts, Traces, Projects, Datasets and the UA-0291-R2 approval (10 pages), each a long page replacing its v5.1 boards, numbers from facts.md (portal 6d0104b) and components named per the Kit component map; lint, independent audit, then publish (the daily artifact limit blocked publishing on the night of 7 Nov). Before that, owed by Jithin: review v6 batch 1 (canvas version 1794058450-24d4) with the resolutions table in facts.md, and read the Kit component map. Convert the component map from project knowledge into a Docs artifact once the artifact limit resets. Generator v0.2 with batch 2: use-case inventory, usage, spend, the finance method and the model approval history (audit items 7, 12, 13). Smaller review items: J10's alias tlm4-core:prod for UC-0291; UC-0142's 78% use-case bar on T2 and T6; T6 '6 gaps'; M2 serving cost and latency figures are the 8-bit row's; Main and J0 still show UC-0142 in Production (D-201 moves it to pilot; fix in batch 2's pass). After the redraw: build thinklatent-labs/portal config-first on the scenario (decisions 13 to 15), every vendored component through a @kit/kit wrapper (D-202). Alongside: write the proposal from the requirements doc (beachhead Retail Advice, D-200); share the canvas and the requirements doc; Enterprise-side items as listed in D-149. Parked until the backend: Risk's concurrence on the grace policy, the SR 11-7 verification, Risk's model inventory, a request-to-access baseline, open decisions 4 to 8, and the C2 flag. From TL-013 (2026-11-08, D-205): DK-001 is closed; the portal can resume. Pin design-kit at c7b3cc9 (v0.4.0; supersedes the d76a3b3 line above): @kit/charts (ForestPlot, LineChart, Distribution, Heatmap, SmallMultiples, ChartFrame with table view) and the InfoTip, SectionBar, Steps, Timeline, DataTable and HoldToConfirm wrappers are in. (due 2026-11-15)

Production surface: A team in one business line requesting a model for one workflow · The ThinkLatent Portal: request, approved access, served model · Days from request to approved access on the first five workflows

Governance (separate team): not started, Usage-approval record aligned with Risk's model inventory — on the critical path

### Decisions due
_None._

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
| Which business line is the beachhead for the first journey? | Head of ThinkLatent with business partners | Yes, for Proposal |
| Who is the portal product lead? | Head of ThinkLatent | Yes, for Proposal |
| What does Risk already use as its model inventory, and does the portal feed it or replace part of it? | Risk and Compliance liaison | Yes, for Stress test |
| Is there an internal developer portal the catalogue should live inside rather than beside? | Harness and platform lead | No |
| What is the baseline time from request to approved access today? | Portal product lead | Yes, for Stress test |

### Links
| Link | To | Note |
| --- | --- | --- |
| depends-on | TL-004 index | Onboarding, catalogue and governance surfaces need index evidence |
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
| depends-on | TL-009 telemetry-contract | Phase 1 cannot show a live view without it |
| reuses | Relay SDK | Declared 2026-11-02 |
| reuses | Langfuse telemetry store | Declared 2026-11-02 |
| reuses | Hermes harness and Relay sessions (via TL-008) | Declared 2026-11-02 |
| creates | Use-case telemetry contract (TL-009) | Added 2026-11-02 |
| creates | use-case record, one object with the usage-approval record | Added 2026-11-02 |
| creates | blueprints registry (TL-010) | Added 2026-11-02 |
| enables | TL-012 agent-portfolio | The portal's agent library is where the portfolio's agents are found, forked and governed; captured 2026-11-02 from the TL-003 session |
| reuses | TL-013 design-kit | First consumer and proving ground; the sketch's implicit language (Inter, one accent, tiles of four, one exhibit, honest placeholders, intervals, engineering view as a layer) is the kit's starting point |
| depends-on | design-kit | Blocked on DK-001 (@kit/charts not built), raised 2026-11-07; the portal resumes when the kit ships v0.4.0 |

### Artifacts
| Artifact | Kind | In this repo | Live | Exported |
| --- | --- | --- | --- | --- |
| ThinkLatent Portal (portal) — Idea card | doc | [artifacts/TL-003-portal/idea-card.md](../artifacts/TL-003-portal/idea-card.md) | [claude.ai](https://claude.ai/artifact/QtTppN7KFdEDvjX7RRkEFn) | 2026-11-04 |
| ThinkLatent Portal — playground | page | [artifacts/TL-003-portal/playground/index.html](../artifacts/TL-003-portal/playground/index.html) | [claude.ai](https://claude.ai/artifact/LHMeaT54htG3mzg914N7Ew) | 2026-11-07 |
| ThinkLatent Portal (portal) — Interface sketch v4 | design | [artifacts/TL-003-portal/interface-sketch-v4/project/canvas.json](../artifacts/TL-003-portal/interface-sketch-v4/project/canvas.json) | [claude.ai](https://claude.ai/artifact/JuvPWSqT6SZFuyuxWv1Wn8) | 2026-11-07 |
| scout-brief-portal.md | brief | [artifacts/TL-003-portal/scout-brief-portal.md](../artifacts/TL-003-portal/scout-brief-portal.md) | [claude.ai](project-knowledge:claude/scout-brief-portal.md) | 2026-11-04 |
| scout-brief-kpis-feedback.md | brief | [artifacts/TL-003-portal/scout-brief-kpis-feedback.md](../artifacts/TL-003-portal/scout-brief-kpis-feedback.md) | [claude.ai](project-knowledge:claude/scout-brief-kpis-feedback.md) | 2026-11-04 |
| scout-brief-adoption.md | brief | [artifacts/TL-003-portal/scout-brief-adoption.md](../artifacts/TL-003-portal/scout-brief-adoption.md) | [claude.ai](project-knowledge:claude/scout-brief-adoption.md) | 2026-11-04 |
| scout-brief-eval-governance.md | brief | [artifacts/TL-003-portal/scout-brief-eval-governance.md](../artifacts/TL-003-portal/scout-brief-eval-governance.md) | [claude.ai](project-knowledge:claude/scout-brief-eval-governance.md) | 2026-11-04 |
| scout-brief-platform-features.md | brief | [artifacts/TL-003-portal/scout-brief-platform-features.md](../artifacts/TL-003-portal/scout-brief-platform-features.md) | [claude.ai](project-knowledge:claude/scout-brief-platform-features.md) | 2026-11-04 |
| scout-brief-serving-telemetry.md | brief | [artifacts/TL-003-portal/scout-brief-serving-telemetry.md](../artifacts/TL-003-portal/scout-brief-serving-telemetry.md) | [claude.ai](project-knowledge:claude/scout-brief-serving-telemetry.md) | 2026-11-04 |
| ThinkLatent Portal (portal) — Interface v5.1 on the ThinkLatent kit, with v6 batch 1 | design | [artifacts/TL-003-portal/interface-v5.1/project/canvas.json](../artifacts/TL-003-portal/interface-v5.1/project/canvas.json) | [claude.ai](https://claude.ai/artifact/Wh5WQ4GDkdMkDekAtF4Cud) | 2026-11-07 |
| ThinkLatent Portal (portal) — Kit component map | brief | [artifacts/TL-003-portal/kit-component-map.md](../artifacts/TL-003-portal/kit-component-map.md) | [claude.ai](project knowledge: claude/ThinkLatent Portal (portal) — Kit component map) | 2026-11-08 |
| Defect DK-001 · @kit/charts not built (blocks TL-003) | brief | [artifacts/TL-003-portal/design-kit-defect-DK-001.md](../artifacts/TL-003-portal/design-kit-defect-DK-001.md) | [claude.ai](project knowledge: claude/Defect DK-001 · @kit/charts not built (blocks TL-003)) | 2026-11-08 |

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-011 | 2026-11-01 | Idea card drafted in Shaping: problem statement, hypotheses P1 to P4, feature map, one-journey first version, governance story; one-quarter appetite proposed | Thinking partner, pending Jithin | superseded |
| D-024 | 2026-11-02 | Set the appetite: Accept one quarter (about 9 engineer-weeks under S-C) (decided on the dashboard 2026-11-02) | Jithin (dashboard) | accepted |
| D-025 | 2026-11-02 | Approve or amend the idea card: Approve the idea card as drafted (decided on the dashboard 2026-11-02) | Jithin (dashboard) | accepted |
| D-031 | 2026-11-02 | (sync) reconciled owner from doc: Head of ThinkLatent (sponsor); portal product lead to be named (register had Jithin) | Nightly sync | accepted |
| D-033 | 2026-11-02 | Decision 1: showroom and workbench as one programme, phased (0 telemetry contract, 1 showroom, 2 loop when the TL Index delivers); the one-journey first version subsumed; phase 1 sized to a quarter | Jithin (thinking partner had recommended showroom first) | accepted |
| D-034 | 2026-11-02 | Decision 2: layered validation; base model and TL Index methodology validated once outside the platform; each use case evaluated on top, inside the portal when mature enough for curated labels; approvers join once the mechanism exists | Jithin | accepted |
| D-035 | 2026-11-02 | Decision 3: current logging and project-ID tags not fit; the portal defines the use-case telemetry contract (TL-009) and Relay follows it; the capture audit is the first engineering task | Jithin | accepted |
| D-036 | 2026-11-02 | Decision 4: two-layer telemetry, canonical event in-band and checks asynchronous with the harness as the async layer; hard blocks stay in-band (recorded caveat) | Jithin | accepted |
| D-037 | 2026-11-02 | Decision 5: the Langfuse database houses everything with its schema modified inside; the portal shows a condensed view and agents read the full data; standing critique recorded (upgrade merges, per-consumer access control) | Jithin (against the thinking partner's recommendation) | accepted |
| D-040 | 2026-11-02 | Feature plan v2 proposed from scout pass 2 (per page, build order, five gaps to own: generation deltas, one use-case record tying budget to approval, canary with quality per arm, the loop as a state machine, forkable use cases with a provisioning assistant); Contract v0.1 additions and derived metrics listed; the eval-governance brief's claim that SR 11-7 was rescinded in April 2026 recorded as unverified for the Risk liaison | Thinking partner, pending Jithin | proposed |
| D-042 | 2026-11-02 | Decision 6: all five scout-pass-2 briefs adopted; Feature plan v2 stands as the build list; interface sketch v3 (20 screens) built against it the same day; SR 11-7 claim still to be verified before any governance feature rests on it | Jithin (adoption); thinking partner (sketch) | accepted |
| D-044 | 2026-11-02 | Two sessions registered TL-012 within minutes (agent-portfolio from the TL-011 chat; agent-library from the TL-003 chat); reconciled to one row, TL-012 agent-portfolio, with the agent-library thought carried in its next step and a TL-003 enables TL-012 link | Thinking partner (TL-003 session) | accepted |
| D-046 | 2026-11-02 | Design rule: the harness (TL-008) is inside the API and invisible in the portal UI; only an endpoint build version stays, on the record and in engineering view. Sketch v3.1 applied it; sketch v3 otherwise accepted by Jithin | Jithin | accepted |
| D-047 | 2026-11-02 | Decision 7: grace policy for unregistered usage approved (day 0 seen and offered help; day 14 tags required; day 30 record required, production endpoints withdrawn with a week's notice; unapproved vendor hosts to Risk at once); Risk's concurrence pending before day 30 goes live; sketch v3.1 shows the approval on the page | Jithin | accepted |
| D-048 | 2026-11-02 | Governance sits outside the design sessions for now: the SR 11-7 rescission check and Risk's concurrence on the grace policy are parked as recorded assumptions, not blockers, and return at Stress test | Jithin | accepted |
| D-071 | 2026-11-03 | Training surface benchmarked against Unsloth Studio; sketch v3.2 adds the engineering trainer view, recipe, run history, job controls, Train-as and the Datasets bring-data-in flow; weight export outside the boundary, business-user hyperparameter dials and one-click routing to production deliberately not copied | Thinking partner, pending Jithin | proposed |
| D-076 | 2026-11-03 | Decision 8: users train models on the portal's own UI; Unsloth is a feature reference only (not hosted, not a dependency); the reuse question is closed; sketch v3.3 adds the New training run card to the Training page | Jithin | accepted |
| D-099 | 2026-11-05 | Decision 9: the portal hosts the ten features handed over from the ThinkLatent site and every TL Index evaluation surface (results page, index page, annual report hub, corrections log, leaderboard, source and as-of on every number); the TL Index is built separately but its evaluation is visible only in the portal; the site links in | Jithin | accepted |
| D-101 | 2026-11-05 | Decision 10: the portal is specified in a requirements document (12 sections, 46 screen requirements, nine epics on six parallel tracks) and built as interface v5 on the ThinkLatent kit (48 screens) so the team can divide the work; the sixth scout brief's four behaviours adopted (dependents graph with retirement notices, budget cap that pauses and checkpoints, three-level agent evals with pass^k, production health in the stage gate); kit-test artboards dropped as references | Jithin | accepted |
| D-104 | 2026-11-05 | Features from earlier canvases and documents that interface v5 lacks are recorded as backlog, not built: a Gap backlog tab in the requirements doc with 114 gaps (12 P1, 66 P2, 36 P3), 11 fixes where v5 or the requirements contradict a decision, and 6 items dropped on purpose | Jithin | accepted |
| D-142 | 2026-11-05 | Decision 11: the whole Gap backlog is built into interface v5.1 (185 boards on 15 pages); where no owner had decided, twelve defaults (A1 to A12) are taken and listed on the Gap backlog tab for their owners to confirm or change (backfilled 7 Nov from the Idea card; the 5 and 6 Nov sessions recorded it in the claude.ai docs only) | Jithin (scope); thinking partner (defaults) | accepted |
| D-143 | 2026-11-05 | Decision 12: Jithin is product lead and sole developer until the first use case is in production; Stress test before phase 0; defaults A2, A4, A7, A9 and A12 confirmed (backfilled 7 Nov from the Idea card; the 5 and 6 Nov sessions recorded it in the claude.ai docs only) | Jithin (on questions with recommendations) | accepted |
| D-144 | 2026-11-06 | Stress test closed, moved to Proposal: critique C1 to C8 recorded; C1 answered (two projects, end to end from onboarding through the lifecycle processes); C2 answered (Jithin approves his own break-glass grants with everything logged; flagged for a model-risk review before any production access); C3, C4, C5 and C8 carried into the proposal; kill criteria not set for now; score set at 3.75 (backfilled 7 Nov from the Idea card; the 5 and 6 Nov sessions recorded it in the claude.ai docs only) | Jithin (on questions with recommendations; thinking partner had recommended the Risk liaison approve his grants) | accepted |
| D-145 | 2026-11-06 | Decision 13: a functional UI connected end to end on realistic dummy data comes first, to prove the experience; the backend follows with the same functionality; replaces phase 0 first (decision 12) (backfilled 7 Nov from the Idea card; the 5 and 6 Nov sessions recorded it in the claude.ai docs only) | Jithin | accepted |
| D-146 | 2026-11-06 | Decision 14: the first build is two sample portal projects run end to end (an app team onboarding a new use case through to production; a live use case through canary, alert, improve, retrain and retire); the functional UI lives in a new private repo, thinklatent-labs/portal, carrying the kit at a pinned commit with one pull command; dummy data from one fake API on the real backend contract; onboarding to production first (backfilled 7 Nov from the Idea card; the 5 and 6 Nov sessions recorded it in the claude.ai docs only) | Jithin (on questions with recommendations) | accepted |
| D-147 | 2026-11-06 | Decision 15, naming: the employer is 'the Enterprise' (capital E) and its real name is never written; ThinkLatent spelled out everywhere (Head of ThinkLatent); TLM for the model line; the TL Index; register IDs TL-### with the same numbers; neutral code names set once (@kit packages, thinklatent-labs/design-kit, thinklatent-labs/portal); in code every brand word is configuration and every domain name is data (backfilled 7 Nov from the Idea card; the 5 and 6 Nov sessions recorded it in the claude.ai docs only) | Jithin (on questions with recommendations) | accepted |
| D-148 | 2026-11-06 | Decision 16, experience: every board is redrawn in v6 on the canvas before any code, and the code follows the boards; when two runs share test items, the paired difference decides Better or Tie; one ⓘ per table column header and about 15 a page outside tables; the pilot's other findings adopted as defaults (requirements doc, experience rules) (backfilled 7 Nov from the Idea card; the 5 and 6 Nov sessions recorded it in the claude.ai docs only) | Jithin (thinking partner had recommended building v6 straight into code); defaults by thinking partner | accepted |
| D-149 | 2026-11-06 | Answers given while the rename ran, recorded 7 Nov: the v6 redraw runs in batches of about ten pages, the onboarding-to-production journey first, each batch reviewed before the next (Jithin first said all at once, then chose batches once the artifact limit hit); the Enterprise-side items stay in the next step as they are; testing is self-test only; previews as a private artifact link and as a local run; sample data from a seeded scenario generator; stack: TypeScript (strict), React on the kit, Vite, TanStack Router and Query, Zod, MSW, Vitest, Playwright, pnpm; the portal API as an OpenAPI 3.1 file (REST plus server-sent events), model calls kept OpenAI-compatible as vLLM serves them, a FastAPI backend later; the portal repo is MIT and its dependencies limited to MIT, Apache-2.0, BSD, ISC, Unlicense or CC0 with a licence check in the build (stated lab-wide by Jithin; recorded here for the portal only, the lab-wide rule is a Lab-operations line) | Jithin (on questions with recommendations) | accepted |
| D-150 | 2026-11-07 | v6 batch 1 drawn and published on the canvas (version 1794034973-c666, page "v6 · batch 1: onboarding to production"): seven new long pages (project home; usage, keys and first call; new training run as a stepper; runs in flight; checkpoints; approval UA-0291; models and canary) replacing 35 v5.1 boards with the five pilot pages, and the five pilots revised to decision 16 (cell tooltips removed, at most 15 outside tables, paired-difference verdicts where the page holds them). Every page passes the lint (names, tooltip budget, links, anchors). Waiting on Jithin's review before batch 2; the v5.1 boards stay until it is approved | Thinking partner, pending Jithin | proposed |
| D-167 | 2026-11-07 | Independent audit of v6 batch 1 (auditor role, a separate agent that had not seen the work) found the approval page's run 1183 Safety and grounding wrong (91% ± 2 against the Official 78% ± 4 that E1, E3 and E4 agree on), so UA-0291 misses the 85% Safety bar: the approval page's recommendation changes from 'Approve with one condition' to 'Send back with two findings' (Safety and grounding; consistency 71% against 75%). Also corrected: run 1180 scores set to the Official leaderboard on four pages (Core 4.2 now misses its Safety bar too); an unsourced activity table removed from Home; ± worked out from p-values removed from Models and canary (difference and p shown); run IDs, spend and precision made consistent; every verdict between runs sharing items that rested only on overlapping intervals now reads 'paired test pending'. Canvas version 1794037863-533a. Left for review: Distil 4.2 scores on Start a project and New training run contradict the leaderboard's run 1179 (the 'Distil clears all five' recommendation would flip); the model page's Core 4.1 column mixes runs 1141 and 1171; approval check C-2.4 needs a ruling while paired tests are pending | Auditor (Claude, separate agent); fixes by platform lead (Claude) | accepted |
| D-177 | 2026-11-07 | Cortex boundary (settles the overlap left open in D-126): Cortex (TL-017) stays a separate web application with its own Claude Code plugin and is not part of the portal; development activity (Jira, Claude Code sessions and the bridge, the AI guide) lives there. The portal's core-team view, its Jira display and the portal-to-Claude-Code bridge leave TL-003's scope: those v5.1 boards (C1 core team and backlog, and the bridge flows) are retired, not redrawn in v6 | Jithin | accepted |
| D-178 | 2026-11-07 | Agent library first entry (D-170 left the call to TL-003): marketing pre-review comes first, matching TL-012's wave-1 order so the first entry has a variant comparison behind it; the knowledge agent is shown as coming next. Supersedes the 5 Nov call that the knowledge agent ships first | Thinking partner's recommendation, taken as the default (Jithin: no preference) | accepted |
| D-179 | 2026-11-07 | Pending paired test and approval (check C-2.4): when a paired test between the candidate and its base is not complete, the check shows pending and blocks approval until it reads | Thinking partner's recommendation, taken as the default (Jithin: no preference) | accepted |
| D-180 | 2026-11-07 | Safety and grounding gate: the Policy C-2 floor of 85% is held by every use case and a lower record bar is superseded (thinking partner had recommended one bar per pillar at 75% so v2 is sent back and a retrained v3 is approved). Consequence, recorded: no model on the Index clears 85% today (the frontier API scores 84%, Domain-Advice v2 78% ± 3), so under the current anchors no sample project reaches production and the onboarding-to-production story of decision 14 stops at send back; UC-0142 and UC-0307, shown in production, sit below the gate | Jithin (against the thinking partner's recommendation) | accepted |
| D-181 | 2026-11-07 | Scenario generator built before batch 2 (thinking partner's default; Jithin: no preference): thinklatent-labs/portal e654af0, packages/scenario. One seed and the anchors produce runs, intervals, paired tests, sufficiency and approval checks; out/facts.md is the sheet every board redraw reads. Rules set in it: the Official leaderboard is the source of every run's scores; a bar is cleared only when the interval's lower end clears it, on every page; Core 4.1 evidence is run 1171, TLM3 Core 3.4 is run 1165, run 1162 is Domain-Advice v1; Core and Domain 27B, Distil 4.2 4B; paired tests computed for every pair that shares items. Consequences: the custodian-breaks project no longer recommends Distil 4.2 (0 of 5; Core 4.2 closest at 4 of 5), UA-0291 is sent back 7 of 9, quality intervals narrow to ±1 because they are computed over all items. Repo scaffolded on the 6 Nov stack (TypeScript strict, Zod, Vitest, pnpm, MIT, licence check, CI) | Platform lead (Claude); Jithin to review the resolutions in facts.md | accepted |
| D-182 | 2026-11-07 | v6 batch 1 regenerated from the scenario (seed 1183): six builder agents brought all 12 pages onto facts.md; an independent auditor (a separate agent) found the core numbers matching on every page and 21 further items; the six that contradicted the scenario and nine cross-page or implausible ones were fixed, three inventory and finance conflicts wait for generator v0.2. Added to the generator: the TL Index method v1 §3 interval check (UA-0291 now 8 of 10 met, sent back on Safety and grounding and consistency), UC-0307 in Active build, and pnpm lint:boards (batch 1 before: 10 findings; after: clean). Visible changes for review: the custodian-breaks project no longer recommends Distil 4.2 (Core 4.2 closest, 4 of 5); every 'paired test pending' replaced by a computed result; Core 4.1 on run 1171 and TLM3 Core 3.4 on run 1165; Core 27B 4-bit; quality intervals ±1. Canvas version 1794058450-24d4; portal 3bcf143 | Platform lead (Claude); audit by the auditor role (Claude, separate agent) | accepted |
| D-200 | 2026-11-07 | TL-003-q2 decided: Retail Advice is the beachhead business line for the first journey (UC-0291 Advisor summary, sample project 1); business head Jithin | Jithin | accepted |
| D-201 | 2026-11-07 | Sample story completed under the kept 85% Safety gate (thinking partner's recommendation): Official run 1203, TLM4 Domain-Advice v3 after retraining, completes 20 Nov with Safety and grounding 88% ± 2 (lower end 86%) and quality 88% ± 1; resubmission UA-0291-R2 meets 10 of 10 (consistency 79% closes F-0412) and is approved, so the onboarding-to-production story reaches production. UC-0142 Claims triage moves from Production to Pilot in production, held below Production by the floor (Jithin chose this over a grace exception). thinklatent-labs/portal 6d0104b; 11 tests | Jithin | accepted |
| D-202 | 2026-11-07 | Kit component map adopted (claude/ThinkLatent Portal (portal) - Kit component map.md, design-kit v0.3.0): about 250 of the 2,208 usable vendored components fit the portal, mapped section by section; every vendored component is wrapped in @kit/kit before a page imports it; hold-to-confirm (kokonut hold button) for one-way doors (promote, approve or send back, break-glass); batch 2 boards name their kit components in their notes | Jithin | accepted |
| D-203 | 2026-11-07 | Portal work paused, batch 2 included: @kit/charts is specified but not built, and every evaluation, training and operations page needs it. Raised as defect DK-001 for the TL-013 design-kit session (claude/design-kit defect DK-001 - charts not built (blocks portal).md), with acceptance tests on the portal's scenario fixtures and the six wrappers the portal needs first. The portal resumes when TL-013 closes DK-001 (kit v0.4.0) | Jithin | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._

### 2026-11-07 · Spec · v6 batch 1 (onboarding to production)

- **Register drift fixed.** The 5 and 6 Nov sessions recorded decisions 11 to 16, the Stress test close and the answers given during the rename only in the claude.ai docs. They are now D-142 to D-149, with the stage history (Stress test and Proposal, 6 Nov) and the critique flag corrected.
- **Batch 1 published** on the canvas page "v6 · batch 1: onboarding to production", in journey order:
  1. Start a project (J0)
  2. Project home (J2)
  3. Usage, keys and first call (J10)
  4. New training run (T1, a stepper)
  5. Runs in flight (T2)
  6. Checkpoints (T6)
  7. Evaluation results (E1)
  8. Approval UA-0291 (V1)
  9. Models and canary (J6)
  10. Use case overview in production (J3)

  Home and the model page were brought to decision 16 too. Together the pages cover 35 v5.1 boards, which stay on the canvas until Jithin approves the batch.
- **How it was built.** One brief (`v6-brief`: anatomy, text budget, tooltip budget, scores, precision, names, links) went to eight parallel agents, one page each, plus one for the pilots. A lint checked names, the tooltip budget, links and anchors. Per page, tooltips now run 1 to 8 in column headers, 0 in table cells and 8 to 15 elsewhere (the pilots had 18 to 35, plus up to 14 in cells).
- **For the review: numbers that disagree or are missing.**
  - V1 kept its source's run 1183 pillar scores, which disagree with E1. Safety and grounding is 91% ± 2 in V1's source and 78% ± 4 in E1, and E1's figure would fail the 85% bar.
  - J6's paired ± values were worked out from the source's p-values, not copied from given intervals.
  - Paired intervals are still missing in four places, which show verdicts without ± or read "ungraded" rather than invented values:
    - E1's pillar table (run 1183 against 1162)
    - M2's profile against Core 4.1
    - J3's Distil 4.2 tie
    - T6's checkpoint changes
  - V1 follows J3's consistency figure (71% against a 75% bar), not its source's 64% against 70%.
- **Next batches.** About 146 v5.1 boards remain, in three or four batches. Batch 2 is the live use case: Performance, Quality, Improve, Record and alerts.
- **Audit, same day.** A separate agent checked the batch against the v5.1 boards; it had not seen how the pages were made. Its main finding: run 1183's Safety and grounding is 78% ± 4, not the 91% ± 2 shown on the approval page. So UA-0291 misses its 85% bar, and the approval page now recommends sending it back with two findings.
- **Corrected after the audit:**
  - Run 1180 now uses the Official leaderboard scores on all four pages.
  - The unsourced activity table on Home is removed.
  - Models and canary no longer shows ± worked out from p-values; it shows the difference and p instead.
  - Verdicts that rested only on overlapping intervals now read "paired test pending".
- **Left for review:**
  - Distil 4.2's scores against run 1179
  - the Core 4.1 column on the model page
  - approval check C-2.4

  The mock data disagrees across the v5.1 boards themselves. The seeded scenario generator (decision 14) fixes that by construction.

### 2026-11-07 (evening) · Spec · scenario generator; batch 1 regenerated

- **Decisions.** D-177: Cortex stays a separate app and plugin; the core-team, Jira and bridge boards leave the portal. D-178: pre-review is the agent library's first entry. D-179: a pending paired test blocks approval (C-2.4). D-180: the 85% Safety gate is kept on every use case. D-181 and D-182: the generator is built and batch 1 is regenerated.
- **Generator.** `thinklatent-labs/portal`, `packages/scenario`. The anchors (the leaderboard's run scores, model facts, use-case bars, policy floors, approval checks) feed one seed. It builds item-level scores, bootstrap intervals, paired tests, sufficiency and approval checks.
  - `pnpm scenario` writes `out/scenario.json` and `out/facts.md`. `pnpm lint:boards <dir>` checks boards.
  - Ten tests cover determinism, the anchors, the bar rule, the verdicts and both stories.
- **Audit.** A separate agent checked all 12 pages and found the core numbers matching. Of its 21 items, 15 are fixed. Three wait for generator v0.2: use-case inventory, finance method and token volumes. The rest are small review items, listed in the row's next step.
- **The consequence to weigh.** At an 85% Safety floor, the best Official score is the frontier API's 84%. No sample project can reach production until a model clears it.

### 2026-11-07 (night) · Spec · sample story completed; kit component map; paused on DK-001

- **D-200:** Retail Advice is the beachhead.
- **D-201:**
  - A new Official run of Domain-Advice v3 (run 1203, 20 Nov) clears the 85% floor at 88% ± 2, so UA-0291-R2 is approved and the sample story reaches production.
  - UC-0142 moves to pilot.
- **D-202:** the kit component map is adopted: always wrap, and hold-to-confirm for one-way doors.
- **D-203:** `@kit/charts` was found unbuilt. It is raised as defect DK-001 to TL-013, and portal work is paused until the kit ships v0.4.0.
