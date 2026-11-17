# Team hub (team-hub) · Console build 6

16 November 2026, evening (US Eastern) · TL-017 Cortex 0.18.0 and 0.19.0 · cortex PR 49 (`build/0.18.0`) and PR 50 (`build/0.19.0`, stacked on PR 49), merged by Jithin; CI tagged `v0.18.0` on 93b89ea and `v0.19.0` on bb4465f · design kit v0.9.0 (e2a4cac) · for Jithin, Head of ThinkLatent · follows "Team hub (team-hub) - Console build 5 2026-11-16" (0.17.0)

## 1. The answer

Every board is built.

- **0.18.0 (PR 49)** builds the Projects boards, S-14 to S-33.
- **0.19.0 (PR 50)** builds This week, My session, Evidence, Knowledge, Operations and Help: S-06, S-10 and S-34 to S-49.

Each page asks its board's numbered questions, in the board's order. The page from before stays one switch away (`?view=`), so no link breaks and nothing is removed (R-12).

Jithin merged PR 49 at 19:39 and PR 50 at 20:33 (US Eastern). CI was green on main for both and tagged `v0.18.0` and `v0.19.0` by itself.

## 2. Jithin's decision, 16 November 2026, evening

1. **Everything drawn on the boards is built now, not kept for later** (D-417). In his words: "you have lot of things in board what are you waiting on are you not going to build them into the build."
   - What follows: two releases, Projects first, then the rest.
   - V-1a is still no dependency for any of it (D-398).

## 3. What was built

### 3.1 Cortex 0.18.0 (PR 49): the Projects boards

| Board | What the page answers now | New in the hub |
|---|---|---|
| S-14 Flows | Six numbers; the stage columns, with what opens each card's next stage; work piling up by week; days per stage; the stage map with its gates | — |
| S-15 Roadmap | Epic lanes by release, with late blockers; the blocked-by map with its critical path (P-07); how often first ranges held; plans waiting for Jira | `map` in `GET /v1/program?release=`; `track_record.items`; `GET /v1/plans`. A forecast is kept only while work is open |
| S-16 Requirements | One requirement in focus with one hop out; the checks; every requirement, sortable; links to review; the slice a session gets | Revisions kept |
| S-17 Decisions | Ask the log; the why chain of every flow; bets against their lines; ADRs; rooms; ideas | A flow hypothesis can carry `confirm_at`, `refute_at` and a unit; `cortex flow reading`; event `flow.reading` |
| S-20 Jira | Gaps by epic, each naming what it stops | Hygiene names its epic and kind |
| S-22 to S-27, an epic | Whether it will make the release; the relay across regions; your next hand-off, drafted; its requirements graph; how it was decided and what could change it; numbers at any level | `GET /v1/epics/{key}/relay`; per-subtask estimate against measured |
| S-28 to S-33, records | A release's gate as steps, with landing dates and the version advisor (F-68); a room's rounds; a requirement's revisions; a flow's four depths | `ready`, `landing`, `advice`; room rounds kept |

### 3.2 Cortex 0.19.0 (PR 50): the rest

| Board | What the page answers now | New in the hub |
|---|---|---|
| S-06 This week | A switch over the last three weeks; six numbers; what shipped and moved, what was decided, learned and raised; this week against the one before | Weekly hand-off pick-up time, loops green first time and corrections (team level only) |
| S-10 My session | Where it stands (map and steps, timeline, record); what is left on the epic; ask the team's memory; claims, with "claim a path"; tests; commits; `cortex doctor` as the laptop last reported it. No sample output is left | The doctor's report now carries the plugin version |
| S-34 Metrics | By level and by family. Delivery opens with whether the gain is real, then delivery by week, estimate against measured per epic, and the gain by size | Size spreads (IQR) |
| S-35 Experiments | The sixteen pre-registered tests on a calendar, each with its claim, what refutes it and its reading | `GET /v1/experiments`. Readings build from the record; a curator reads each once, never edited (`POST /v1/experiments/{id}/read`) |
| S-36 Feedback | Signals to patterns to rules as one flow; each rule before and after; rules to decide (accept, make personal, decline); training counts | A rule can be made personal |
| S-37 Detectors | Useful share against the switch-off line; how a card moves; each detector's switch; last week's cards | `GET /v1/detectors/log`: each card as first raised, with votes |
| S-38 Memory | The tree from subtask notes to component memory, each node citing its sources and opening them; what waits for you as a curator; what was added last week and from where | Subtask notes in the tree; `can_curate` on proposed entries; `recalled` per entry |
| S-39 Learnings | From draft to reuse as one flow; the most reused first, each opening its fix; your drafts to confirm | `funnel` |
| S-40 Catalogue | Reuse across projects; every component with maturity and flag; what a new room could reuse | — |
| S-41 Project map | What the selected project builds on and what builds on it; its links with who set them; the ten link types | — |
| S-42 Pilot readiness | What each blocker holds (the kill-date reading or the pilot's start) and whether it has a date; the preflight's verdict; what is switched on | `holds`, `dated` |
| S-43 Health | What runs where; hook time against the 300 ms budget; three ways to switch Cortex off; plugin versions in use and your laptop | `GET/POST /v1/hooks/timings`: round trips measured on the laptop and sent with a later batch, never an extra blocking call, with breaker openings riding along. `GET /v1/clients` (H19). `parts` |
| S-44 Settings | Each setting and the pages it reaches; what is in force; how a setting changes | `settings` |
| S-45 Live checks | Who each check waits on and what it unlocks; how each runs and where its report lands; the simulated-team reports | `waits_on`, `unlocks`, `runs`, `report`; `sim_reports` |
| S-47 Commands | A working day; what `cortex --help` prints first; the vocabulary, one tip per term; all 52 commands and 25 skills by area | — |
| S-48 What Cortex shows about you | Who sees what, as three circles with what is never recorded outside them; the full list; how to step back | — |
| S-49 What is coming | Now, next and later, with who or what each waits on; the backlog's blocked list | `coming` in readiness |

## 4. Settled by Claude, for Jithin to overrule

1. **The page from before stays as a view of each tab:**
   - Every event
   - Every measure
   - Flow bets and decisions
   - Patterns and records
   - Switches
   - Search and propose
   - Every learning
   - Search and record a reuse
   - Canvas
   - Burn-down and scope
   - Preflight detail
   - My alerts and what I share
   - Checks and blockers
   - All, with what each does
   - Built and running
2. **Help's copies are checked, not trusted.** The command list, the skills and the blocked list are copies of the CLI, the plugin and `docs/backlog.md`. `server/tests/test_pilot.py` fails when a copy drifts.
3. **Health shows breakers opened in seven days, not breakers open.** A laptop with its breaker open cannot reach the hub. It counts the openings and reports them once the hub answers again.
4. **What is coming opens on the next date (the pilot's start), not the next release.** The hub cannot know what a release will hold before it is planned.
5. **The vocabulary is one tip per term (`Term`).** It is used on Commands and Health; other pages adopt it as they are touched.
6. **PR 50 is stacked on PR 49**, so each release is tagged in turn.

## 5. Fixed along the way

| Fault | Fix |
|---|---|
| The smoke test timed out when a segment it had clicked, an audit vote, went away | It skips a segment an earlier click used up |
| `server/schema/postgres.sql` had fallen 48 tables behind the code | Regenerated: 81 tables |
| The live-check plan said V-1a takes about an hour, and that V-7 waits on "the model approvers" | About 15 minutes, as the verify guide says; Platform and InfoSec |
| Metrics part 1 carried a second numbered heading inside it | The calibration block renders without its own heading there |
| A reading exactly at its line read "Between" or "Below the line" | At the line counts as at the line, as the hub's verdict says |
| Captions read "1 were", "1 times", "1 records" | Plurals in words |

## 6. Results

- **Tests:** the full list in CLAUDE.md passes on SQLite and on local PostgreSQL 16:
  - 319 tests on 0.19.0;
  - 311 tests on 0.18.0.
- **CI:** all six jobs green on PR 49 (0.18.0) and on PR 50 (0.19.0).
- **Checks:**
  - The plugin validates.
  - The usable-imports and responsive checks pass.
  - First load is 248 KB of the 250 KB budget.
- **Headless Chrome:**
  - Smoke test: 55 pages and 78 steps, with no page errors, no blank pages, and every menu and sheet opening.
  - Every new page was screenshotted at 1,440 and checked beside its board.
- **Demo:** republished as version 1794878527-dd2b, with:
  - two weeks of hook timings from three laptops;
  - each laptop's doctor report;
  - memory recalls;
  - three weeks of detector cards with votes;
  - an entry remembered from a room's record.

## 7. Honest gaps

- **The first load is 2 KB from its budget.** New pages load as their own chunks, but the next feature that lands in the first chunk needs a split.
- **The new numbers in the demo are seeded:** timings, breaker openings, plugin versions, card votes and recalls. No laptop has reported any of them yet. Laptops start reporting with the 0.19.0 plugin.
- **"This week, so far" is thin early in the week.** The switch shows the weeks before.
- **What is coming is the hub's copy of the backlog.** It changes with a release, not live, and the test keeps it equal to the backlog.
- **Experiments read previews** on the record so far until each group's window starts. The kill-date core waits on real sessions, which come with V-1a and the pilot.
- **Where the build differs from the boards:**
  - S-43 shows breakers opened, not open (§4).
  - S-49 opens on the next date (§4).
  - S-38's sources open from a panel under the tree, not from inside each node.

## 8. Next

The pilot starts inside the Enterprise on `v0.19.0` from about 21 November.
