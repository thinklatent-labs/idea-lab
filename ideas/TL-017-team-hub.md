---
id: TL-017
slug: team-hub
title: "Team hub: a Claude Code plugin plus an AWS service giving the team's sessions shared rules, memory, artifacts, presence and a message path"
aliases: []
type: Idea
parent: null
themes: []
stage: "Building"
stage_since: "2026-11-07"
horizon: "H1"
stream: "S-D"
appetite_weeks: 4
appetite_ends: "2026-12-05"
owner: "Platform lead (Claude, building with Claude Code, as the S-D stream engineer); Head of ThinkLatent (Jithin), sponsor, decider and product lead"
score: null
score_status: none
doc_url: null
standard: "pre-v1"
last_touched: 2026-11-18
sensitivity: none
critique_recorded: true
next_step: "Jithin makes the tags v0.21.0 to v0.25.0 by hand at their merge commits (5410ae4, 79ae838, 3023fc7, 4f6917a, 7282e75). The lead compares boards S-34 to S-51 with the demo and fixes what differs, with the known gaps on S-07, S-08, S-10 and S-24"
next_step_due: "2026-11-20"
---

# Team hub: a Claude Code plugin plus an AWS service giving the team's sessions shared rules, memory, artifacts, presence and a message path

<!-- generated:start -->
## Lab record

**TL-017 team-hub** · Idea · Building (Building gate passed 2026-11-07 (D-152, D-165) on Jithin's call against both red-team seats' recommendation of Stress test: owner role Platform lead (Claude), stream S-D, appetite 4 engineer-weeks ending 2026-12-05, Jithin's review slot Mondays 30 min. Critique recorded (D-164): two passes, docs/critique in the cortex repo) · H1 · S-D

Owner: Platform lead (Claude, building with Claude Code, as the S-D stream engineer); Head of ThinkLatent (Jithin), sponsor, decider and product lead. Appetite: 4 engineer-weeks, ends 2026-12-05. Score: not scored .

Next step: Jithin makes the tags v0.21.0 to v0.25.0 by hand at their merge commits (5410ae4, 79ae838, 3023fc7, 4f6917a, 7282e75). The lead compares boards S-34 to S-51 with the demo and fixes what differs, with the known gaps on S-07, S-08, S-10 and S-24 (due 2026-11-20)

Production surface: not named (reads as an H3 experiment).

Governance (separate team): cleared, The Enterprise's InfoSec and IT sign-off for the pilot inside the Enterprise (SSO, hosting, managed settings, data retention). Marked done for the lab by Jithin on 2026-11-17 (D-427): he takes Cortex inside and obtains the sign-offs; each built-ahead integration still switches on only after its live check passes

### Decisions due
_None._

### Hypotheses
_None recorded._

### Kill signals
| Signal | By | Status | Action |
| --- | --- | --- | --- |
| H1 median over 30 s, or any planted H2 injection acted on, in the pilot's first week | 2026-11-28 | open | Stop the pilot; park the messaging route |
| Fewer than 2 of the 3 to 5 pilot volunteers use it weekly by pilot week 3 | 2026-12-12 | open | Park |
| Any of C-22 to C-25 open on the pilot date | 2026-11-21 | open | No pilot; the appetite clock keeps running |
| Appetite ends with no H1 and H2 reading from real sessions | 2026-12-05 | open | Stop; back to Stress test |

### Open questions
_None recorded._

### Links
_None recorded._

### Artifacts
| Artifact | Kind | In this repo | Live | Exported |
| --- | --- | --- | --- | --- |
| Team hub (team-hub) - Critique pass, 2026-11-07 (second pass) | doc | [artifacts/TL-017-team-hub/critique-2026-11-07.md](../artifacts/TL-017-team-hub/critique-2026-11-07.md) |  | 2026-11-07 |
| Team hub (team-hub) - Console build 5 (Cortex 0.17.0), 2026-11-16 | doc | [artifacts/TL-017-team-hub/console-build-5-2026-11-16.md](../artifacts/TL-017-team-hub/console-build-5-2026-11-16.md) |  | 2026-11-16 |
| Team hub (team-hub) - Console build 6 (Cortex 0.18.0 and 0.19.0), 2026-11-16 | doc | [artifacts/TL-017-team-hub/console-build-6-2026-11-16.md](../artifacts/TL-017-team-hub/console-build-6-2026-11-16.md) |  | 2026-11-16 |
| Cortex (TL-017): every requirement from the build session, and what is built | doc | [artifacts/TL-017-team-hub/requirements-2026-11-17.md](../artifacts/TL-017-team-hub/requirements-2026-11-17.md) | [claude.ai](https://claude.ai/artifact/3LwCJDi6sJHptQU8AdbePW) | 2026-11-18 |

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-116 | 2026-11-06 | Registered at Seed: a Claude Code plugin plus an AWS hub giving the team's sessions shared rules, memory, artifacts, presence and a message path; first step is a one-week hook-based inbox spike, and the design waits on which provider Claude Code uses (no push or monitors on Bedrock) | Jithin (idea); thinking partner (card and recommendation), pending Jithin | accepted |
| D-117 | 2026-11-06 | Provider is Bedrock with Opus 5 and no claude.ai, so channels and monitors are out; sessions are named group-initials (server-dev-jp) and the plugin derives the group and shares its context; the last hop into a session uses Claude Code's native session messaging fed by a per-session watcher, to be proven in the spike (H1b, H6). Build waits until the brainstorm settles | Jithin (provider, naming); thinking partner (watcher design), pending Jithin | accepted |
| D-118 | 2026-11-06 | Two purposes added: impact alerts when one person's change affects another (H8), and hand-off packets so the hub carries work across time zones and a teammate picks up where the last person stopped (H7) | Jithin (purposes); thinking partner (hypotheses), pending Jithin | accepted |
| D-119 | 2026-11-06 | Session start is a handshake with the hub: the session registers, the hub marks it online, delivers what is queued and tells its group that a member is up (opt-in, group only). Presence ends on missed check-ins, not on a goodbye; states are online, away and offline. Card wording to follow at its next edit | Jithin (idea); thinking partner (states, privacy), pending Jithin | accepted |
| D-120 | 2026-11-06 | Adopt harness, loop and graph engineering as the team's standard practice in the plugin: a phase pipeline (idea, requirements, design, build, verify, hand-off) with gates enforced by hooks, bounded build-and-verify loops with a separate verifier, and a shared brainstorm room where every connected user's session contributes to an idea (blind round, cluster, critique, converge). Card v0.4 section 5b adds H9 (room beats solo) and H10 (gates cut rework without slowing small tickets); handshake wording now in the card. Nothing built. | Jithin (idea); thinking partner (mapping, critique), pending Jithin on the light-path rule and who converges a room | accepted |
| D-121 | 2026-11-06 | Architecture v0.1 drafted (claude/Team hub (team-hub) - Architecture.md): hub stores and routes, sessions think; project rooms with local drafts pushed by choice; one-writer spec from an accepted ledger, merged by pull request; plugin-assigned session names from the work item; Jira plan of record (component, capability, release component/version, epic, bucketed stories, subtasks with frozen human-day estimates); release recommendation and version advisor; one daemon per machine; user-scope plugin from a private GitHub marketplace pushed by managed settings, updated by version bump; command center. H11 to H19 pre-registered there. Nothing built. | Jithin (operating model, Jira model, run-down); thinking partner (architecture, estimate method), pending Jithin review | accepted |
| D-122 | 2026-11-06 | Build decisions taken; spike approved as an experiment (idea stays pre-Proposal; critique pass still owed before Stress test ends). Name TARS (plugin tars, daemon tarsd, hub endurance, verifier case, command center cooper), repo thinklatent-labs/tars, local first then moved inside; Jira through the team's existing Jira plugin, no adapter; offline messages kept 24 h/72 h; universal story kinds named 'Kind ~ EPIC-KEY'; Jira default states; convener writes the spec; light path at most 1 day; one session per person per epic; estimate table adopted pending calibration. Messaging core built first. Detail in claude/Team hub (team-hub) - Build brief.md. | Jithin | accepted |
| D-123 | 2026-11-06 | Named Project Cortex (plugin and repo cortex, cortexd, cortex-server, cortex-console; /cortex:* commands; sessions epic-/room-/plan-). Messaging core built on thinklatent-labs/cortex branch spike/messaging-core: server, hooks, cortex command, cortexd, 4 skills, marketplace; 19 tests pass; idle-session wake still unverified (H1b). Build brief v2 records it. | Jithin (name, go); thinking partner (build) | accepted |
| D-124 | 2026-11-06 | Cortex 0.2 built on spike/messaging-core: projects and links with a context pack, curated memory, brainstorm rooms (drafts, blind round, decision record), one-writer specs with approvals, claims and impact alerts, Jira gate records, ideas, component registry, planning helpers (estimates, release recommendation, version advisor), cortex-console, 13 skills; 39 tests pass. Not yet run in live Claude Code; SSO, Postgres, verifier loops and Enterprise hosting outstanding. Build brief v3. | Jithin (go); thinking partner (build) | accepted |
| D-125 | 2026-11-06 | Cortex 0.3: design finished (docs/design.md, Postgres schema verified on PostgreSQL 16; recommend Postgres with pgvector plus S3); every Enterprise dependency behind an interface with a mock (auth incl. SSO mock, embeddings, db, Jira mock enforcing the team model); workflow graph with guards, Stop-hook build-and-verify loop with an independent verifier agent, active-time productivity metrics; console Flows, Roadmap, Metrics, Jira views checked in a headless browser. 47 tests pass. H20 added (loops). Build brief v4. | Jithin (approach: mock what needs the Enterprise); thinking partner (build) | accepted |
| D-126 | 2026-11-06 | Console rebuilt on the design kit (TL-013): kit submodule in the cortex repo, kit shell, tiles, surfaces, status, data rows and tokens, light and dark; the hand-written page is gone. Jithin's direction: the command center becomes one workspace, a portal for all development activity, where the group sees everyone's work and every input lands in one place. Overlap with the ThinkLatent Portal (TL-003) to be settled in TL-003's own session. | Jithin (kit, workspace direction); thinking partner (build) | accepted |
| D-127 | 2026-11-06 | Cortex 0.4 built from the command-center research: the console is an attention router (Needs-you decision cards with evidence, dissent and reversibility; urgency tiers with breakpoint delivery and focus; since-you-were-away; time-zone escalation) on a live SSE event stream, plus a graph (React Flow + dagre, MIT), activity, decisions (ADRs, hypothesis ledger) and a component catalogue, reusing TL-007 dashboard patterns and the kit's motion components. Lifecycle extended past ideas: a design stage needing a pre-registered hypothesis, and an accepted ADR before planning. Per-person estimate rows made private. Reuse: TL-007 motion wrappers, decision card, catalogue rule. Creates for others: decision card, event-stream client, ADR model (candidates for the kit, TL-013). | Jithin (build it out, think beyond ideas); thinking partner (build) | accepted |
| D-128 | 2026-11-06 | 0.4 merged. With no spike participants yet, Jithin asked to put the work into a backlog and keep moving: backlog written in Cortex's own planning model (docs/backlog.md, GitHub issues 2 to 15) with a Blocked list naming what unblocks each item; 0.5 built (CI, simulated-team spike harness standing in for H1, H2 and H6, risk detectors with self-switch-off on precision, start-of-day briefing, console code-split) and opened as PR 16. Licence check surfaced lightningcss (MPL-2.0, build-time only) for a decision. | Jithin (backlog and move forward); thinking partner (build) | accepted |
| D-129 | 2026-11-06 | 0.5 merged; 0.6 built from the backlog (PR 17, CI green on sqlite, Python 3.9 and PostgreSQL 16): the database recommendation is now running code, several hub nodes share one Postgres, the team's record can be asked with citations and honest not-found, and delivery is forecast as ranges at team level. CI caught a Python 3.9 bug that would have hit every Mac user in the pilot; the Postgres run caught an event-ordering race. Both fixed. | Jithin (move forward on the backlog); thinking partner (build) | accepted |
| D-130 | 2026-11-06 | Four calls, each taking the recommendation: live co-editing through a Yjs and Hocuspocus Node sidecar that owns nothing (identity, access and storage stay in cortex-server); the design gate (hypothesis plus ADR) for epics only, light-path work skips it; scramp (MIT-0) and lightningcss (MPL-2.0, build-time) recorded as licence exceptions; the decision card and motion pieces proposed upstream to the design kit (TL-013). Recorded as ADR-0001 in the cortex repo; 0.7 built (PR 18). | Jithin (decisions); thinking partner (build) | accepted |
| D-131 | 2026-11-07 | Model access settled by the Enterprise's setup: each person's Claude Code reaches Bedrock through their own IAM role, so Cortex's summaries are written in the person's session and checked by cortex cite-check; the hub calls no model and needs no model role or approval (ADR-0002). The hub-side Bedrock client stays in the code, off by default. | Jithin (model access fact); thinking partner (build) | accepted |
| D-164 | 2026-11-07 | Critique pass recorded. Two passes: one in cortex PR 22 (proceed with conditions) and a second with separate feasibility and Risk seats (both recommend Stress test, not Building). No evidence from real sessions yet; the Risk seat proved four high findings with a live probe (spoofable sender, unframed claim text, hand-off and invite-only room text readable by the team, default collab secret) plus no real authentication. Kept as docs/critique/2026-11-07-red-team.md and -2.md in the cortex repo and artifacts/TL-017-team-hub/critique-2026-11-07.md | Thinking partner (feasibility and Risk red-team seats, separate agents); Jithin (business-line seat) | accepted |
| D-165 | 2026-11-07 | Building gate passed under D-152; moved from Seed to Building against both red-team seats' recommendation of Stress test (dissent recorded in D-164). Owner role Platform lead (Claude) as the S-D stream engineer; appetite 4 engineer-weeks ending 2026-12-05; review slot Mondays 30 min. Building holds three ideas against three committed slots (TL-004 Fridays, TL-007 Thursdays, TL-017 Mondays) | Jithin | accepted |
| D-166 | 2026-11-07 | 0.9 is pilot hardening and readiness under a feature freeze (C-14 to C-29; no pilot while C-22 to C-25 are open), and the first pilot inside the Enterprise is 3 to 5 volunteers before any wider group. Rooms, specs, co-editing, gates, loops, detectors, forecasts and ask stay built but off in the pilot scope | Jithin (on the thinking partner's recommendation) | accepted |
| D-398 | 2026-11-16 | V-1a (the live Claude Code session test) is no dependency for any build work: Jithin runs it when he judges the time is right, and Claude neither asks about it nor runs it. Everything that needs nobody else is built out, including P-11 to P-15, which the console register had left for later: Cortex 0.17.0 in cortex PR 47 (search from the Cmd-K palette, Needs you from the keyboard, answers from your session with tables and charts, the epic's pull requests, checks, test runs and commits, the training-data counts), with away status (cortex out) and notifications read one at a time. The browser check for it found and fixed two console faults shipped since 0.14.0: the account and scope menus stopped the console when opened, and below 1,536 px the header hid the account menu and theme switch. Release tags come from CI's release-tag job (cortex PR 45), since Claude Code cloud sessions cannot push tags. | Jithin | accepted |
| D-401 | 2026-11-16 | A browser smoke test runs in CI on every pull request (cortex PR 48), as recommended: headless Chrome opens every page, menu and sheet of the replay demo and fails on an uncaught page error, a blank page, a page in its error state, a menu or sheet that does not open, or a header wider than the window. It catches the 0.16.2 menu fault when that is put back. Playwright is installed in CI only and is not a dependency of Cortex. | Jithin | accepted |
| D-417 | 2026-11-16 | Everything drawn on the boards is built now, not kept for later ("you have lot of things in board what are you waiting on are you not going to build them into the build"). Built as two releases: Cortex 0.18.0 (cortex PR 49) for the Projects boards S-14 to S-33, and 0.19.0 (PR 50, stacked on 49) for This week, My session, Evidence, Knowledge, Operations and Help (S-06, S-10, S-34 to S-49). Each page asks its board's numbered questions in order; the page from before stays one switch away (?view=). V-1a stays no dependency (D-398). | Jithin | accepted |
| D-427 | 2026-11-17 | The six Seed-era proposals D-116 to D-121 accepted as the record. The Enterprise side (hosting, IT install, InfoSec and IT sign-off) is Jithin's and marked done for the lab: "mark them as done and move forward"; he takes Cortex inside. Data stores: one PostgreSQL 16 with pgvector, the graph as tables, no separate vector or graph store (ADR-0003), built and load-tested for the team of 45. Taking part in rooms and tests from the browser, and a live demo where actions work, come before the six intelligence features. Order from here (Jithin): a requirements document of everything asked this session, then the gaps, then the boards, then UI and backend. Diagnosis recorded: the boards drew rooms and tests to be watched, participation lived only in Claude Code, and the replay demo could not act, so 'every board built' meant pages that show, not things a person can do; from now on built means a person can do it end to end. | Jithin | accepted |
| D-429 | 2026-11-17 | TL-017 team-hub: after the 17 November audit (every board, all 1,430 clicks and the console code; 221 new requirements: 176 board rows B-, 21 click items CL-, 24 clean-up items O-; the worst finding a privacy leak of proposed memory, B-S38-1), Jithin chose the recommended option on each of five calls. (1) Build order in five waves, each a release that is done only when a person can do every action in it end to end in the live demo: 0.20.0 fixes, speed and scale; 0.21.0 rooms and tests from the browser plus the live demo; 0.22.0 every click opens its record; 0.23.0 the rest of the boards; 0.24.0 the six intelligence features; clean-up items go into the wave that touches the same code. (2) Room votes: 3 dot votes per person in the converge round, totals shown when the round ends; the convener still accepts or rejects each idea with a reason. (3) Comments: reply threads on each idea, spec and test result, @name notifies, closed during the blind round, seen by Claude Code through safety.frame(). (4) The published demo opens on the recording and switches to the real hub running in the page once it has loaded. (5) The 19 old pages: each one's unique part moves onto its board and the old address opens the board, lifting the additive-only rule (10 November, console feature register) for those pages. Wave 1 started the same day with four parallel workers. | Jithin | accepted |
| D-435 | 2026-11-17 | TL-017 team-hub, Jithin's calls while waves 1 and 2 were built (17 November), each the recommended option unless noted. (1) Detectors: a curator switches a detector for the whole team; a project owner switches it only for their own project, so creating a project no longer reaches a team-wide switch. (2) Epic notes: proposed notes are seen and accepted by the hub's curators and the owner of the epic's project. (3) Passing a decision on ('Not mine'): work (hand-offs, pick requests, tests) moves to the new person at once; a spec approval or an ADR seat moves only once the room's convener or the ADR's author taps OK. (4) Rooms need no call feature (Jithin's own answer, not an offered option): the call link, Join the call and the convener's link setting are removed from the hub, the console and the demo; the column stays unused so schema changes stay additive. Lead's calls recorded with them: the number of people who have voted shows during converge (never totals); a test's owner must be a curator; 'Not today' returns a request to its asker; three unused GET routes retire in 0.22.0. | Jithin | accepted |
| D-440 | 2026-11-17 | TL-017 team-hub, Jithin's two calls on GitHub Actions minutes (17 November). (1) While the organisation's Actions billing keeps CI from running, he makes Cortex release tags by hand (his own offer); he made v0.20.0 at the 0.20.0 merge commit the same day. (2) Cortex CI is trimmed (the recommended option): a new push to a pull request cancels the run it supersedes; the Postgres suite and the browser checks run on pull requests only, so a merge to main bills about 12 minutes instead of 23; release-tag still tags only once every job that runs on main passes. The lead runs the full checks, Postgres and browser included, before every merge. | Jithin | accepted |
| D-442 | 2026-11-17 | TL-017 team-hub, Evidence › Metrics (B-S34-5): the metric families follow the board (the recommended option). Experience adds hand-offs between regions and people in context; Knowledge adds learnings confirmed and memory accepted; each tab keeps four charts or fewer, and Every measure keeps everything. Built in Cortex 0.21.0 (#53). | Jithin | accepted |
| D-445 | 2026-11-17 | TL-017 team-hub: Cortex 0.22.0 (wave 3 of D-429, every click opens its record) is built and ready on #54, stacked on #53. Every record kind with no page has a read and opens in the drawer, commits included, with the actions its reader may take (release your claim); every board row marked Opens nothing opens; the routes the console did not call are shown, marked plugin-only or retired (GET /v1/rollups retired, the room ledger plugin-only). One row layout per record type (O-20) moves to 0.23.0, where the boards those lists sit on are rebuilt. Checked locally: 462 tests on SQLite and on Postgres, plugin validate, budgets, smoke 59 pages and 260 steps with no dead click, live demo 34 of 34. | Claude (lead) | accepted |
| D-452 | 2026-11-17 | TL-017 team-hub: Cortex 0.23.0 (wave 4 of D-429, the rest of the boards) is built and ready on #55, which now targets main after #53 and #54 so it cannot land on a stale branch. Runs and Remote at three depths; releases at a glance with each one's range, call and hold; calibration verdicts; Feedback in your own words with a training-export opt-out; a recall box on Memory; planned links on the map; the newest version's roll-out, sign-in, retention and hub nodes on Health; Settings in groups; the approved vocabulary, with one meaning for gate. One row layout per record type and one StageGrid (O-20), plurals through one helper (O-11); the first-load budget tightened from 250 to 200 KB (182 KB now). Checked locally: 471 tests on SQLite and on Postgres, plugin validate, budgets, smoke 61 pages and 277 steps with no dead click, live demo 43 of 43. | Claude (lead) | accepted |
| D-453 | 2026-11-17 | TL-017 team-hub: Cortex 0.24.0 (wave 5 of D-429, the intelligence features K-10 to K-15) is built and ready on #56, which targets main after #53, #54 and #55. Rules and stored vectors on the hub, never a model there: the start context ranked for the session's subtask with why each entry was chosen (K-11); a usefulness vote on every start-context item, alert and answer, counts only (K-15); a card when someone in another epic works on the same thing (K-12); who knows a topic or a path from shared records, no score (K-13); memory hygiene for curators with retire and keep (K-14); and the session digest, drafted by the person's own Claude at one deliberate Stop hold and private until approved, when it becomes the hand-off and proposes memory and decisions (K-10; CORTEX_DIGEST=0 turns it off). Checked locally: 497 tests on SQLite and on Postgres, plugin validate, budgets, smoke 61 pages and 277 steps with no dead click, live demo 49 of 49. All five waves of the audit are built. | Claude (lead) | accepted |
| D-454 | 2026-11-18 | TL-017 team-hub: Jithin merged Cortex #53 (0.21.0), #54 (0.22.0), #55 (0.23.0) and #56 (0.24.0) into main on 18 November, in that order; all five waves of the 17 November audit (D-429) are in, and main is at 0.24.0. The tags v0.21.0 to v0.24.0 are his to make by hand at the merge commits 5410ae4, 79ae838, 3023fc7 and 4f6917a, while CI cannot run (the organisation's Actions billing). | Jithin (sponsor) | accepted |
| D-455 | 2026-11-18 | TL-017 team-hub: on Jithin's ask (18 November: every board on the design canvas in the demo, looking like its board and working, before anything else), Cortex 0.25.0 is built on #57 and not merged: the demo hub holds the boards' world (six people in India, Canada and the US, four projects, the ten flows at their boards' stages), pages follow their boards' layouts (the Projects tabs under the numbers, Missing in Jira as the grid of epics in flight, Activity in plain sentences), and the published demo was replaced with this build. Checked: 499 tests, the plugin validates, the smoke test 61 pages in 131 steps, the live demo check 47 of 47. The tag v0.25.0 is Jithin's to make by hand after the merge. | Jithin (sponsor) | accepted |
| D-456 | 2026-11-18 | TL-017 team-hub: Jithin merged Cortex #57 (0.25.0, the demo as the design canvas draws it) into main on 18 November at 09:30 New York time; main is at 0.25.0. The tags v0.21.0 to v0.25.0 are his to make by hand at their merge commits (v0.25.0 at 7282e75), while CI cannot run (the organisation's Actions billing). | Jithin (sponsor) | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._

### 2026-11-07 · Critic, then Spec (build)

- **Critique pass recorded (D-164).** Separate feasibility and Risk agents ran it cold. A parallel single-agent pass already sat in cortex PR 22, and both stand.
  - Both seats recommended Stress test. Every hypothesis so far rests on simulation.
  - The Risk seat proved four high findings with a live probe: a spoofable sender, unframed claim text, hand-off and invite-only room text readable by the team, and a default collab secret. It also found no real authentication.
  - Full write-up: `artifacts/TL-017-team-hub/critique-2026-11-07.md`.
- **Moved to Building on Jithin's call (D-165),** against the seats' recommendation:
  - owner role: Platform lead (Claude);
  - stream: S-D;
  - appetite: 4 engineer-weeks, ending 2026-12-05;
  - review: Mondays, 30 min.
- **0.9 is pilot hardening under a feature freeze (D-166).** It covers C-14 to C-29, and no pilot runs while C-22 to C-25 are open. The first pilot inside the Enterprise is 3 to 5 volunteers.
- **Watch:**
  - The hardening alone, about 17 principal-engineer days, nearly fills the appetite.

### 2026-11-16 · Build (0.17.0)

- **Jithin's call (D-398).** V-1a is no dependency for any build work. He runs it when he judges the time is right, and Claude neither asks about it nor runs it. Everything that needs nobody else is built out.
- **Cortex 0.17.0 (cortex PR 47, all six CI jobs green, waiting for his merge).** It builds the five features the console register had left for later:
  - P-11 search from ⌘K;
  - P-12 Needs you from the keyboard;
  - P-13 answers from your session with tables and charts;
  - P-14 the epic's pull requests, checks, test runs and commits;
  - P-15 the training-data counts.

  It also adds away status (`cortex out`) and notifications read one at a time. 307 tests pass on SQLite and Postgres, and the first load is 247 KB of 250.
- **Found by a browser check of the demo, and fixed:**
  - Since 0.14.0, opening the account menu or the scope switcher stopped the whole console (a menu label outside its group).
  - Below 1,536 px the header hid the account menu and the theme switch.
  - Nothing automated opened the console, so this shipped in three releases. Jithin chose a browser smoke test on every pull request (D-401): cortex PR 48 opens 52 pages and every menu and sheet of the demo in headless Chrome, and fails when the menu fault is put back.
- **Earlier in the session:**
  - CI's release-tag job (PR 45). Cloud sessions cannot push tags, so CI tags each merged version bump, and it tagged `v0.16.2`.
  - The backlog as of 16 November (PR 46).
- **Records:**
  - Build log: `claude/Team hub (team-hub) - Console build 5 2026-11-16.md`, mirrored in `artifacts/TL-017-team-hub/`.
  - The feature register is at v0.5.
  - Board S-05 is redrawn with six numbers.

### 2026-11-16 (evening) · Build (0.18.0 and 0.19.0)

- **Jithin's call (D-417).** Everything drawn on the boards is built now, not kept for later.
- **Cortex 0.18.0 (cortex PR 49, all six CI jobs green, waiting for his merge)** builds the Projects boards, S-14 to S-33:
  - Flows; Roadmap, with the blocked-by map and its critical path; Requirements; Decisions, with the why chain and bets against their lines; Jira gaps by epic.
  - An epic's landing, relay, drafted hand-off, requirements, decisions and numbers.
  - The release, room, requirement and flow records.
- **Cortex 0.19.0 (PR 50, stacked on 49)** builds the rest: This week, My session (no sample left), Evidence, Knowledge, Operations and Help (S-06, S-10, S-34 to S-49). New in the hub:
  - the sixteen pre-registered tests, read from the record and read once by a curator;
  - hook time against the 300 ms budget, with breaker openings, from the laptops;
  - plugin versions in use;
  - the detector card log;
  - the learning funnel;
  - memory recalls, and who may accept a proposed entry;
  - the memory tree from subtask notes;
  - what each readiness blocker holds;
  - what is coming, with the backlog's blocked list.
- **Copies checked against their sources.** Help's command list, skills and blocked list are copies of the CLI, the plugin and the backlog, and a test fails when one drifts.
- **Results.** 319 tests pass on SQLite and Postgres. First load is 248 KB of 250. The smoke test covers 55 pages and 78 steps, clean. The demo is republished.
- **Records:**
  - Build log: `claude/Team hub (team-hub) - Console build 6 2026-11-16.md`, mirrored in `artifacts/TL-017-team-hub/`.
  - The feature register is at v0.6.
- **Merged.** Jithin merged PR 49 and PR 50 the same evening; CI tagged `v0.18.0` and `v0.19.0` by itself.
- **Watch.** The kill signal still needs real sessions from the pilot.

### 2026-11-17 · Build (requirements and diagnosis)

- **Why nobody can join a room or test from the browser.** The boards drew rooms and tests to be watched; taking part lived only in Claude Code (`cortex join`, `cortex test`); and the published demo replays recorded pages, so it refuses every action but a handful. "Every board built" meant pages that show, not things a person can do. From now on, built means a person can do it end to end, in the live demo or on a running hub (D-427).
- **Requirements document:** [Cortex (TL-017): every requirement from the build session, and what is built](https://claude.ai/artifact/3LwCJDi6sJHptQU8AdbePW). 130 requirements: 97 work on invented data, 9 are Claude Code only or need a session, 9 are missing, 15 are on a branch, blocked, unproven or standing rules. Seven gaps, collaboration first.
- **Jithin's calls today:** D-116 to D-121 accepted; the Enterprise side is his and marked done for the lab; one PostgreSQL 16 with pgvector (ADR-0003) for the team of 45; collaboration in the browser and a live demo before the intelligence features; the order from here is requirements, gaps, boards, then UI and backend.
- **On the branch `build/0.20.0` (unmerged):** stored vectors, the recipient index, the load test and the install handover draft. The first load test failed: one database connection per node and three unindexed queries.

### 2026-11-17 (night) · Build (waves 1 to 4: Cortex 0.20.0 to 0.23.0)

- **Jithin's order (D-429), built in waves.** Fixes, speed and scale (0.20.0, merged and tagged by hand); taking part from the browser with a live demo (0.21.0, #52 merged, #53 ready); every click opening its record (0.22.0, #54 ready); the rest of the boards (0.23.0, #55 ready). Wave 5, the intelligence features, is 0.24.0.
- **0.23.0 in four groups on #55:**
  - the shell, Assistant, drawer, Home, Activity, Runs, Remote and Start here: a process read as Map, Timeline and Record, a list beside every graph, Ask the record, Ask my session and Tell my session;
  - the Projects boards: releases at a glance (each one's range, call against its target and hold), pace with its range, a plan applied to Jira from its room, tests by suite;
  - Evidence, Knowledge and Operations: calibration verdicts, Feedback in your own words with a training-export opt-out, a recall box on Memory, planned links on the map, the newest version's roll-out against 48 hours, sign-in, retention and hub nodes on Health, Settings in groups;
  - one row layout per record type and one StageGrid, plurals through one helper, the version, and wave 4 steps in the live demo check.
- **Words.** The approved vocabulary is in place. "Gate" now means only the condition that opens a flow's next stage; a release has a hold, and a session start checks what is missing in Jira.
- **Checks, run locally while CI cannot run:** 471 tests on SQLite and on Postgres, the plugin validates, the budgets hold with first load cut to a 200 KB budget (182 KB), the smoke test opens 61 pages in 277 steps with no dead click, and the live demo check passes 43 of 43.
- **For Jithin.** Merge #53, then #54, then #55, and tag each merge commit by hand. #55 now targets main, like #54, so it cannot land on a stale branch.

### 2026-11-17 (nearly midnight) · Build (wave 5: Cortex 0.24.0, the intelligence features)

- **K-10 to K-15 on #56, rules and stored vectors on the hub, never a model there.** The one piece of writing, the session digest, is done by the person's own Claude in their own session. Nobody is scored: every count is the team's, and who voted stays with the voter.
- **What a person can do now:**
  - start a session with memory ranked for its subtask (closeness in meaning, scope, votes, age), each entry saying why it was chosen (K-11);
  - say whether a start-context item, an alert or an answer helped, from My session, Notifications, Ask, the Assistant or `cortex useful`; Detectors reads the votes by kind (K-15);
  - get a card when someone in another epic works on a subtask about the same thing: close in meaning and sharing words few subtasks use (K-12);
  - ask who knows a topic or a path, from People, ⌘K or `cortex who-knows`: shared records only, each person with the records, no score (K-13);
  - as a curator, retire or keep memory that may be in conflict, duplicated or stale, from Memory, a card or `cortex memory hygiene` (K-14);
  - approve the digest your Claude drafted at a stop (one deliberate Stop hold, at most every 4 hours after new edits): it becomes the hand-off and proposes memory and decisions, each through its usual gate; `CORTEX_DIGEST=0` turns it off (K-10).
- **One behaviour change.** With the digest on, the Stop hook's quiet hand-off offer gives way to the digest's one hold.
- **Checks, run locally while CI cannot run:** 497 tests on SQLite and on Postgres, the plugin validates, every budget holds (My session 233 of 240 KB: the new parts load after the page), the smoke test opens 61 pages in 277 steps with no dead click, and the live demo check passes 49 of 49, with six new steps.
- **For Jithin.** Merge #53, #54, #55 and #56 in that order and tag each merge commit by hand. With that, all five waves of the 17 November audit are in.

### 2026-11-18 (early morning) · Build (the five waves merged)

- **Merged.** Jithin merged #53 (0.21.0), #54 (0.22.0), #55 (0.23.0) and #56 (0.24.0), in that order; main is at 0.24.0 with all five waves of the 17 November audit.
- **CI.** The red checks on those pull requests were GitHub never starting the jobs (the organisation's Actions billing), not the code; every release was checked locally before its merge. Said once on #54, the one whose description did not already say it.
- **For Jithin.** The tags v0.21.0, v0.22.0, v0.23.0 and v0.24.0, by hand, at the merge commits 5410ae4, 79ae838, 3023fc7 and 4f6917a.
