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
last_touched: 2026-11-08
sensitivity: none
critique_recorded: true
next_step: "Run only, with the measurement exception (D-163): Jithin runs the week from the command center and Jarvis and reviews TL-007 in his Thursday slot. At the 30-day review on 2026-12-01, which is also the appetite's circuit breaker, read H1 from the usage visit days, H2 from decision lines that cite \"(flag R-##)\", and H5 from the usage Jarvis conversations and inbox cards marked via jarvis, against the 1 Dec checkpoints in each hypothesis. Owed by Lab operations: the Operating Model lifecycle amendment, the register columns, a decision-line field naming the flag that prompted it (H2), a review-slot field for the Building gate (D-152; the dashboard already reads buildingGate.reviewSlot), R-17's rule text (still 'an owner who is not Jithin') and the stale generatedBy text the sync writes. Maintenance pass 2026-11-08 (D-204): H5 counts answered conversations from 8 Nov; the v2 backlog for the 1 Dec review is in the doc. S-A is played by Claude (D-151). From TL-013 (2026-11-07): design-kit v0.1.0 (8653232) replaces the 969f885 pin and the retired package names; repin at the 2026-12-01 review, not before. From TL-013 (2026-11-07): at the repin, v0.2.0 (3fa04b6) is current; the vendored kit needs its own @source for streamdown and @streamdown/code. From TL-013 (2026-11-07, D-196): start the next chat by upgrading to design-kit at commit d76a3b3 (v0.3.1: 2,269 of 2,402 vendored components usable through the gates) and add `node <kit>/scripts/check-usable.mjs src` to the checks; look at any vendored piece on screen the first time it is used. TL-007 can also drop its own @source for the markdown renderer."
next_step_due: "2026-12-01"
---

# Idea Lab dashboard — bird's-eye view of the lab (React, responsive)

<!-- generated:start -->
## Lab record

**TL-007 lab-dashboard** · Feature of TL-006 · Building (under S-A; the Building gate passed 2026-11-01; rebuilt on ThinkLatent kit with the command center and Jarvis 2026-11-05) · H1 · S-A

Owner: Thinking partner (owner and builder under S-A until the stream engineer is named); Jithin sponsor. Appetite: 1.5 engineer-weeks, ends 2026-12-01. Score: not scored .

Next step: Run only, with the measurement exception (D-163): Jithin runs the week from the command center and Jarvis and reviews TL-007 in his Thursday slot. At the 30-day review on 2026-12-01, which is also the appetite's circuit breaker, read H1 from the usage visit days, H2 from decision lines that cite "(flag R-##)", and H5 from the usage Jarvis conversations and inbox cards marked via jarvis, against the 1 Dec checkpoints in each hypothesis. Owed by Lab operations: the Operating Model lifecycle amendment, the register columns, a decision-line field naming the flag that prompted it (H2), a review-slot field for the Building gate (D-152; the dashboard already reads buildingGate.reviewSlot), R-17's rule text (still 'an owner who is not Jithin') and the stale generatedBy text the sync writes. Maintenance pass 2026-11-08 (D-204): H5 counts answered conversations from 8 Nov; the v2 backlog for the 1 Dec review is in the doc. S-A is played by Claude (D-151). From TL-013 (2026-11-07): design-kit v0.1.0 (8653232) replaces the 969f885 pin and the retired package names; repin at the 2026-12-01 review, not before. From TL-013 (2026-11-07): at the repin, v0.2.0 (3fa04b6) is current; the vendored kit needs its own @source for streamdown and @streamdown/code. From TL-013 (2026-11-07, D-196): start the next chat by upgrading to design-kit at commit d76a3b3 (v0.3.1: 2,269 of 2,402 vendored components usable through the gates) and add `node <kit>/scripts/check-usable.mjs src` to the checks; look at any vendored piece on screen the first time it is used. TL-007 can also drop its own @source for the markdown renderer. (due 2026-12-01)

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
| D-163 | 2026-11-07 | Measurement-only exception to TL-007's run-only rule (Portfolio, 2026-11-07): the dashboard records the days Jithin opens it (H1) and the Jarvis conversations he starts (H5) in its own database (collection usage, owner only, dates only, no text), and inbox cards carry via page or jarvis. Nothing visible changed (host check pixel-identical) and the kit pin is untouched. H2 is read from "(flag R-##)" in decision text until a field exists. 1 Dec checkpoints pre-registered for H1, H2 and H5. TL-007's weekly review slot under the Building gate (D-152) is Thursday. Audited by a separate agent before publishing: no blockers; two should-fixes applied (a question asked before the database is ready is counted at the next one; a tab open past midnight logs the new day), the owner-only usage rule declared in the same publish | Jithin (exception and Thursday slot); Claude (S-A build and audit) | accepted |
| D-204 | 2026-11-08 | Maintenance pass under run-only: Jithin chose maintenance over lifting run-only (the 1.5 ew appetite stays spent and the 1 Dec circuit breaker stands). Fixed: due dates were counted in UTC, Scores dropped composite-only rows, logo clipped and header truncation, views crushed when Jarvis docked (now container queries), audience presets leaked hidden sections and flagged rows (now one filtered register for views, rules, the diff snapshot and Jarvis), the Building gate restated to D-152 (review slot reported 'not recorded' until the register has the field), a stale tab could overwrite an applied inbox call, a frozen clock, Jarvis over-counting H5 and failed cards without a retry, plus all eight nits. 'Needs you' keeps quick calls and input items; a separate 'awaiting your accept' line opens the Log at Pending. H5 now counts a conversation when Claude first answers and the usage write lands (from 8 Nov). Tests 60 to 82, pinned to UTC; host-check adds layout probes at 390 to 1920 px. An independent audit before the build and two independent reviews of the fixes; every finding fixed. Kit pin untouched. | Jithin (maintenance only, the 'Needs you' split, nits now); Claude (S-A, build) | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._

### 2026-11-07 · 30-day review readiness (D-163)

**Dashboard after the rename.** TL-017 team-hub shows up: it's in the Seed column and in search, and its six decision lines are in Changes. The published data matched GitHub at rev 368. Two issues were noted but not fixed, because the row is run only: TL-017's card says Seed while its code is merged to 0.8 (no rule fires; passed to TL-017's next step), and the ThinkLatent logo is clipped at desktop width.

**Instruments for the review.** Before today, H1, H2 and H5 had nothing to read: the page kept only the last visit date in the browser, Jarvis conversations were not counted, and decision lines had no field for a flag. Jithin allowed a measurement-only exception to run only:

- `usage` collection in the dashboard's own database, readable and writable by the owner only. It holds `visit-YYYY-MM-DD` (one per local day opened, also logged when a tab open past midnight is looked at again) and `jarvis-YYYY-MM-DD-<t>` (one per conversation, at its first question or brief sent to Claude; Clear starts a new one). Dates, kind and how only.
- Inbox cards carry `via: page | jarvis`.
- H2 is read from "(flag R-##)" in decision text until Lab operations adds a field.

**Reading on 1 Dec.** `db_list` the `usage` collection: H1 is the visit-* dates per week from 9 Nov, H5 is the jarvis-* count plus inbox cards with `via: jarvis`. Each hypothesis's measurement holds its checkpoint. Known limits: before 7 Nov nothing was counted; a failed question still counts as a started conversation; a brief replayed from the page cache counts too; the hook-level behaviour has no unit tests (the audit's nit, left for after the review).

**Database rules live on the artifact, not in this repo.** They are now `inbox` (read view, write owner) and `usage` (read owner, write owner).

Weekly review slot: Thursday (D-152).

### 2026-11-08 · Maintenance pass (D-204)

**Scope.** Jithin asked for development and maintenance. TL-007 is run-only until the 1 Dec review, and its appetite is spent, so he chose maintenance only: fix what exists, add no new surfaces, leave the kit pin alone. Feature ideas go into a backlog for the 1 Dec review to price as a v2 appetite. Run-only and the circuit breaker stand. Two separate agents did the work around the build: one audited the page first, and one reviewed the fixes twice. Neither had seen the build.

**Fixed (audit, 2026-11-07).**
- **Day counts.** Every day count uses the viewer's local calendar day, not UTC. Before this, an item went overdue a day early in US Eastern and a day late before 05:30 in India. Jarvis's "today" was also wrong in the evening.
- **Scores.** The view counts composite-only rows (TL-003's 3.75) and marks them "composite only", with no rank under trial weights.
- **Header.** The logo badge sizes to the wordmark, "Idea Lab" no longer wraps, and the agenda shows from 1536 px with whole chips. The status pill and "View as" show from 1280 px.
- **Layout with Jarvis docked.** Views lay out by the width they actually get (container queries on the main area), so docking Jarvis reflows them.
- **Audience presets.** The register is filtered once per preset and only that copy reaches the views, the rules, the diff snapshot and Jarvis. Flagged rows and hidden sections can no longer leak, and the Enterprise preset no longer shows scores, decisions, sessions, links or the rule table. Jarvis clears its conversation when the preset changes.
- **Building gate.** It follows D-152: an owner role, a stream, an appetite, and a weekly review slot. The slot shows "not recorded" until the register has a field for it.
- **"Needs you".** It still counts quick calls and input items. A separate "awaiting your accept" line counts the proposed decision lines (21 today) and opens the Log filtered to Pending.
- **Clock and data.** The clock moves every five minutes and whenever the tab is looked at again. The register and the diff snapshot are re-read when the tab returns after five minutes.
- **Inbox writes.** "Decide" and "Withdraw" read the live inbox document first and refuse a call Claude has already applied or sent to a chat.
- **Jarvis cards.** A failed card can be retried. A failed decision on the page shows on its card.
- **Robustness.** Each view has its own error boundary. Jarvis gives up waiting on Claude after 8 s. Escape closes only the topmost layer (record sheet, floating Jarvis, palette), and the floating panel is a dialog.
- **Last visit.** It now means the previous day this browser opened the page, so reloads no longer reset it. Views compare against it the same way.
- **History.** Snapshots are ordered by instant, not by string. Index entries for missing snapshot files are dropped and the validator checks for them. The footer no longer prints the stale `generatedBy` text.

**H5 changed with this pass.** From 8 Nov a Jarvis conversation is counted when Claude first answers in it, not when the question is sent. It is marked counted only when the usage write lands. Before, a failed or refused question counted and a failed write was never retried. The 1 Dec reading treats 7 Nov as the old definition. H1 is unchanged.

**Checks.** 82 tests, up from 60, now pinned to UTC, with explicit zone tests for US Eastern, India and the date-line zones. `host-check` keeps the D-107 host-versus-plain pixel comparison and adds layout probes:
- widths: 390, 768, 1024, 1280 and 1920 px, plus Jarvis docked at 1024 and 1280;
- what it looks for: no sideways scroll, no text spilling out of its box, no truncated or wrapped text in the app bar.

Run against the old build, the probes catch the clipped logo and the crushed tiles.

**Not done here.**
- **Owed by Lab operations:** the review-slot field (`buildingGate.reviewSlot`, which the dashboard already reads), R-17's rule text (it still says "owner who is not Jithin"), and the stale `generatedBy` text the sync writes.
- **Data hygiene:** some proposed lines are already accepted, for example D-051 by D-159. That is passed to TL-012's next step.
- **Kit:** TL-013's request to upgrade to design-kit d76a3b3 now (D-196) conflicts with "repin at the 1 Dec review, not before". It stays for 1 Dec.

**Backlog for the 1 Dec review (v2, not built).** Decision IDs in free text still show under the Enterprise preset. The diff view could name the audience it filters for. Existing browsers see one "first visit" day after the last-visit change. Jithin will add his own features and Jarvis changes.
