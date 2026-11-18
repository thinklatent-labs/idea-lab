# Cortex (TL-017): every requirement from the build session, and what is built

Nov 18, 2026 · @Jithin Pradeep

## How to read this

This document lists every requirement Jithin set for Cortex in this build session, 7 to 17 November 2026. Each one has a status that says whether **a person can actually do it today**, not whether a page shows it.

**Sources.** The requirements come from Jithin's messages and question-prompt answers, as recorded in:

- the feature and screen register v0.6 (asks N-01 to N-28, boards S-01 to S-51);
- the build logs of 16 November;
- the decision lines in the register;
- today's messages.

The chat itself has 246 turns, and its search cannot look inside this chat. If an ask is missing here, it was missed in those records too: tell me, and it goes in.

**Status words**

| Status | Meaning |
| --- | --- |
| Works | Built and covered by automated tests that play two or more people, on invented data. No real person has used it on a running hub yet |
| Claude Code only | Works, but only from a Claude Code session. The console shows nothing, or only a command to copy |
| View only | The console shows it, but doing it takes a Claude Code session |
| Needs your session | The console button exists, but appears only while you have a live Claude Code session on that epic |
| Missing | Not built |
| Blocked | Built ahead and tested against stand-ins. It switches on only after its live check (V-n) passes inside the Enterprise |
| On a branch | Built on 17 November, not merged or finished |
| Decided against | Jithin decided not to build it |

**The demo.** The published demo, [Cortex command center (demo)](https://claude.ai/artifact/L9EwdSEy1UuTUXv62sLaj7), opens on a recording of the real hub, then starts the real hub inside the page, so every action works and the simulated teammates answer. It was republished with the 0.25.0 build on 18 November.

## Summary

This session set 130 requirements, and 118 of them work. Everything in the console can be tried in the live demo or on a hub run on a laptop; no team has used it yet on a shared running hub.

| Area | Requirements | Works | Claude Code only, or needs your session | Missing | Other |
| --- | --- | --- | --- | --- | --- |
| Collaboration | 30 | 28 | 1 | 0 | 1 blocked |
| Projects and planning | 20 | 20 | 0 | 0 | 0 |
| Knowledge and intelligence | 17 | 16 | 0 | 0 | 1 blocked |
| Evidence and measures | 12 | 11 | 0 | 0 | 1 blocked |
| Console and design | 17 | 14 | 0 | 0 | 3 standing rules |
| Plugin, sessions and commands | 13 | 12 | 0 | 0 | 1 unproven |
| Platform, data, scale and install | 9 | 7 | 0 | 1 | 1 blocked |
| Privacy, safety, operations and the pilot | 12 | 10 | 0 | 1 | 1 blocked |
| **Total** | **130** | **118** | **1** | **2** | **9** |

**What is left**

- **A running hub for the team** (X-09), which the pilot (V-10) needs. The Enterprise side is Jithin's (X-07, D-427).
- **Five rows wait on Enterprise systems or teams**, each built ahead against a stand-in: chat alerts (C-26), embeddings and summaries through Bedrock (K-17), token use against Bedrock's logs (E-09), the live checks (X-06) and Risk's review of remote approvals (V-11).
- **Waking an idle session** (S-11) is built and unproven.

**The audit, 17 November.** The boards, every click and the code were checked; the detail is on the Audit tab. The boards drew 639 items: 296 were built as drawn, 256 differently and 87 not at all. Of 1,430 clicks, 55 do nothing, 14 kinds of record have no page or drawer, and 219 of 272 number tiles link nowhere. The code holds 18 groups of duplicates and 31 dead items, and first-load script sits at 248 KB of its 250 KB budget. That adds 221 requirements: 176 from the boards (B-), 21 from the clicks (CL-) and 24 to consolidate and speed up the console (O-). The worst finding is a privacy leak: the hub returns the text of every proposed memory entry to anyone, though the page promises nobody sees it until a curator accepts it (B-S38-1).

## Collaboration

Rooms and tests work from the browser as well as from Claude Code (0.21.0), and the live demo does all of it. Only alerts in Teams or Slack wait, on the platform allowing chat (C-26).

| ID | What a person can do | Asked | Where you do it | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| C-01 | Open a brainstorm room for a project and invite its people | 6 Nov (N-05) | `cortex room`, `/cortex:room`; in the console: Projects › Decisions › Rooms › Open a room | Works (0.21.0) |  |
| C-02 | Join a room and add ideas | 6 Nov: "others join from their Claude Code" | `cortex join <room>`; your Claude adds items; in the console: Join and Add on the room's page | Works (0.21.0) |  |
| C-03 | Blind round, then reveal, critique, converge, close | 6 Nov (architecture v0.1) | `/cortex:room` as convener; in the console: the round buttons on the room's page | Works (0.21.0) |  |
| C-04 | Accept or reject items into the decision record, each with a reason | 6 Nov | `/cortex:room` as convener; in the console: Accept or Reject, each with a reason, several at once | Works (0.21.0) |  |
| C-05 | Join the room's or epic's call | 16 Nov | Room page, Focus room | Works |  |
| C-06 | Write the spec from the decision record, one writer | 6 Nov | `/cortex:spec` | Claude Code only, by design |  |
| C-07 | Co-edit the spec draft and room notes with live cursors | 6 Nov (N-06) | Room page, co-edit tab | Works on a running hub with the co-editing service | Not in the demo |
| C-08 | Approve the spec; the pull request opens once all approve | 6 Nov | Needs you card, `/cortex:spec` | Works |  |
| C-09 | Ask the room to test a commit ("one session tests while another builds") | 9 Nov (N-19); 16 Nov: a room request | Focus room, `/cortex:test`; in the console: Ask for a test, to a person, an epic's room or a brainstorm room | Works (0.21.0) |  |
| C-10 | Take a test someone else asked for, or give it back | 16 Nov | Focus room "Take the test", `cortex test take`; in the console: Take the test or Give it back, on Today, Needs you and the focus room | Works (0.21.0) |  |
| C-11 | Run the test and record pass or fail per requirement, with a short log | 9 Nov (C-42) | The tester's Claude Code; in the console: Record the result, pass or fail per requirement, with the command and the log | Works (0.21.0) |  |
| C-12 | A test nobody finishes goes back to the room after 24 hours; asker and tester are told | 16 Nov | Hub | Works |  |
| C-13 | Room test rotation | 16 Nov | Focus room | Works |  |
| C-14 | Pick up a subtask: mark it mine, the owner or deputy approves, Jira shows it | 16 Nov | Focus room, `cortex` | Works | Jira itself waits on V-2 |
| C-15 | Watch a teammate's session, opt-in, the epic's people only | 16 Nov | Focus room "Watch" | Works once the teammate shares |  |
| C-16 | Code with a teammate as a named co-driver | 16 Nov | Remote cockpit | Works; permission prompts stay with the owner |  |
| C-17 | Ask someone to pair | 16 Nov | Focus room | Works |  |
| C-18 | Message a person, session, group or room | 6 Nov | `/cortex:send`; console "Post to a group" | Works |  |
| C-19 | A message reaches the other person's session | 6 Nov (H1) | Hooks | Works at the next prompt or tool call | Waking an idle session (H1b) unproven |
| C-20 | Hand off to the next person, drafted from commits and checks at stop | 6 and 10 Nov | `/cortex:handoff`, `cortex handoff --draft`; in the console: Hand off on My session or the epic; from 0.24.0 your Claude drafts it at a stop, as the session digest, for you to approve | Works |  |
| C-21 | Accept a hand-off, or ask the sender | 7 Nov | Needs you card | Works |  |
| C-22 | Claim files; "change in your claim" alerts | 6 Nov | Hooks, `/cortex:claim`, My session | Works |  |
| C-23 | Overlap warnings when parallel subtasks touch the same files | 16 Nov | Focus room | Works |  |
| C-24 | Presence across time zones: who is on what, working hours | 6 Nov | People, person page | Works |  |
| C-25 | Notifications in Cortex; the talk happens in the team's own chat | 16 Nov | Header bell | Works |  |
| C-26 | Alerts in Teams or Slack | 16 Nov | Personal webhook | Blocked: the platform allowing chat |  |
| C-27 | See and steer your own session from the console (Remote) | 7 Nov (N-12) | My work › Remote | Works |  |
| C-28 | Allow or deny a permission prompt from the console | 7 Nov (N-13) | Remote | Works | Risk reviews it before it is switched on |
| C-29 | Take part in rooms and tests from the browser, without Claude Code | 17 Nov | The console: rooms on Projects › Decisions › Rooms; tests on Today, Needs you and the focus room | Works (0.21.0) |  |
| C-30 | A demo where every action works | 17 Nov | [Cortex command center (demo)](https://claude.ai/artifact/L9EwdSEy1UuTUXv62sLaj7), on claude.ai | Works (published 18 Nov at 0.24.0) |  |

## Projects and planning

Planning works end to end on the built-in Jira mock. The real Jira waits on the Jira admins (V-2).

| ID | What a person can do | Asked | Where you do it | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| P-01 | Plan in the team's Jira model: capability, epic, bucketed stories (`Kind ~ EPIC-KEY`), subtasks; component is the project; releases named component/version; compulsory fields | 6 Nov (N-09) | `/cortex:plan`, Projects › Jira | Works on the mock | Real Jira blocked (V-2) |
| P-02 | No feature work before it is in Jira (the Jira gate) | 6 Nov | `/cortex:check`, hooks | Works on the mock | Off in the thin pilot |
| P-03 | Frozen estimates in human-engineer days, to measure the AI gain | 6 Nov (N-10) | `/cortex:plan` | Works |  |
| P-04 | Turn an approved spec into epics, releases and the Jira structure | 6 Nov | `/cortex:plan` | Works on the mock |  |
| P-05 | Release recommendation and version advisor (stay in the line) | 6 Nov | `/cortex:release`, release page | Works |  |
| P-06 | Delivery ranges, never a single date, with how often past ranges held | 8 Nov (C-9) | Roadmap, epic and release pages, `cortex forecast` | Works |  |
| P-07 | Roadmap: releases and epic lanes against today, gates, the blocked-by map with the critical path | 9 and 16 Nov | Projects › Roadmap, release page | Works |  |
| P-08 | The workflow from idea to done, each step opening only when its condition is met; a light path for small fixes; the design gate for epics only | 6 Nov (D-120), 7 Nov (N-07) | `/cortex:flow`, Projects › Flows, flow page | Works | Guards off in the thin pilot |
| P-09 | Requirements with typed links checked by the hub; each session's slice; Claude proposes links, a person confirms | 9 Nov (N-20) | `/cortex:req`, Projects › Requirements | Works | The trial waits for two squads (Jithin) |
| P-10 | Architecture decision records with real options and a pre-registered test | 6 Nov (N-03) | `/cortex:adr`, Decisions, ADR page | Works |  |
| P-11 | A pre-registered hypothesis per flow, read after release | 6 Nov | `/cortex:flow`, Decisions | Works |  |
| P-12 | Ideas linked to projects and to people with similar ideas | 6 Nov (N-04) | `/cortex:idea`, Decisions | Works |  |
| P-13 | Projects that know their linked projects; a catalogue of reusable components | 6 Nov (N-03, N-04) | `cortex project`, `cortex component`, Catalogue, Project map | Works |  |
| P-14 | A focus room per epic: the work graph in buckets and waves, needs, the standard process on top, picks with a deputy and approver rota, who could take work now, session replay, needs proposed from the code, burn-up, bucket templates | 16 Nov | Projects › epic › Focus room | Works | Picks and tests need sessions (C-09, C-10) |
| P-15 | The portal's two levels: All projects ▸ project ▸ epic, with tabs per level | 16 Nov | Projects | Works |  |
| P-16 | Pages for every epic, project, release, person, room, decision, requirement and flow, and a context drawer | 16 Nov (P-01 to P-04) | Console | Works |  |
| P-17 | The needs that cross epics, on the release page | 16 Nov | Release page | Works |  |
| P-18 | What is missing in Jira, by epic | 6 Nov | Projects › Jira | Works on the mock | Real Jira blocked (V-2) |
| P-19 | Pull requests and CI per subtask, beside the work | 16 Nov (P-14) | Focus room, epic Work tab | Works with a stand-in | Blocked: a read-only GitHub token on the hosted hub |
| P-20 | A Done made in Jira tells the next people they can start | 16 Nov | Hub | Works on the mock |  |

## Knowledge and intelligence

The team's knowledge and the six intelligence features work (K-10 to K-15, 0.24.0). Embeddings and summaries through Bedrock wait on V-7.

| ID | What a person can do | Asked | Where you do it | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| K-01 | Propose shared memory; curators accept it; it reaches sessions framed as data | 6 Nov | `/cortex:remember`, `/cortex:recall`, Knowledge › Memory | Works |  |
| K-02 | Find a memory entry by meaning across all of memory, not only the newest 500 | 17 Nov | `/cortex:recall`, Memory search | Works (0.20.0) |  |
| K-03 | The memory tree: subtask notes rolled up to epic, release and component, citing sources | 8 Nov (N-17) | `/cortex:rollup`, Knowledge › Memory | Works |  |
| K-04 | Learnings drafted when a failed command later passes; confirmed, vouched, reused | 8 Nov (N-17) | `/cortex:learned`, Knowledge › Learnings | Works |  |
| K-05 | Ask the log ("why did we drop X?"), with citations and "not found" rather than a guess | 7 Nov | `/cortex:ask`, Decisions, Assistant | Works |  |
| K-06 | Answers written in your own session, with tables and charts | 7 Nov (ADR-0002), 16 Nov | Assistant, Remote | Works |  |
| K-07 | Search everything from ⌘K | 16 Nov | Console | Works |  |
| K-08 | Context at session start: the project, linked projects, memory, others' claims, the requirement slice, what changed since you last worked | 6 and 10 Nov | Hooks | Works | Ranked for the subtask since 0.24.0, each entry with why it was chosen (K-11) |
| K-09 | Session information extracted and analysed: sessions, claims, file paths, learnings, corrections, counters; never transcripts, by design | 17 Nov | Hooks and hub | Works | What a session decided or left open leaves it in the session digest, once its owner approves it (K-10, 0.24.0) |
| K-10 | Session digest: at stop, your own Claude drafts what was done, decided and left open; on your approval it becomes the hand-off and proposes memory and decisions | 17 Nov | Stop hook, My session, `cortex digest` | Works (0.24.0, #56) | One deliberate Stop hold, at most every 4 hours after new edits; `CORTEX_DIGEST=0` turns it off |
| K-11 | Start context ranked for this subtask | 17 Nov | SessionStart hook, My session | Works (0.24.0, #56) |  |
| K-12 | Overlap alerts by intent, not only by file | 17 Nov | Needs you (a detector) | Works (0.24.0, #56) |  |
| K-13 | "Who knows this", from shared records | 17 Nov | People, ⌘K, `cortex who-knows` | Works (0.24.0, #56) |  |
| K-14 | Memory hygiene: stale, duplicate and conflicting entries go to curators | 17 Nov | Knowledge › Memory, a card, `cortex memory hygiene` | Works (0.24.0, #56) |  |
| K-15 | A usefulness read on every alert, answer and context item | 17 Nov | Needs you, My session, Notifications, Ask and the Assistant; read on Detectors | Works (0.24.0, #56) | Counts per item; who voted stays with the voter |
| K-16 | Corrections people give Claude, grouped into rules; training data for the team's own models | 10 Nov (N-24) | `/cortex:feedback`, Evidence › Feedback | Works | The export stays off until Legal reviews it |
| K-17 | Embeddings and summaries on the hub, through Bedrock | 8 Nov | Hub | Blocked (V-7) |  |

## Evidence and measures

Every measure works on invented data. Two depend on Enterprise sign-offs or logs.

| ID | What a person can do | Asked | Where you do it | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| E-01 | See delivery, flow, quality, AI-use and knowledge measures weekly, at team, component, capability, release and epic level | 8 and 10 Nov (N-17, N-25) | Evidence › Metrics, Numbers tabs | Works |  |
| E-02 | Check whether the AI gain is real: blind second estimates, audits, the pre-AI baseline | 8 Nov | Evidence › Metrics | Works |  |
| E-03 | Everyone sees everyone's numbers, in context, never ranked | 8 Nov (N-16) | Visibility set to open | Works | Inside the Enterprise only after HR, privacy and legal sign-off |
| E-04 | Track team and project performance | 10 Nov (N-25) | Metrics, project Numbers | Works |  |
| E-05 | Read Cortex's own 16 pre-registered tests from the record | 16 Nov (P-06) | Evidence › Experiments | Works |  |
| E-06 | Risk detectors as rules with thresholds; "not useful" votes switch one off | 7 Nov | Evidence › Detectors, Needs you | Works |  |
| E-07 | This week: what shipped, moved, was decided and learned | 16 Nov (P-05) | Home › This week | Works |  |
| E-08 | A weekly two-question pulse | 8 Nov | `cortex pulse` | Works | Asked in the terminal only |
| E-09 | Token use reconciled against Bedrock's invocation logs | 8 Nov | Evidence | Blocked (V-3, V-4) |  |
| E-10 | Follow the sun: hours by region and hand-offs between regions | 8 Nov (N-15) | People, Metrics | Works |  |
| E-11 | Keep every page; add estimate against actual, the collision radar and loop health | 8 Nov (N-15) | Console | Works |  |
| E-12 | Dataset progress for curators | 16 Nov (P-15) | Evidence › Feedback | Works |  |

## Console and design

Every screen is built as drawn, taking part in rooms and tests included, and the published demo acts.

| ID | What a person can do | Asked | Where you do it | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| D-01 | Use one command centre where the team's work and every person's input come together | 6 Nov (N-01) | Console | Works |  |
| D-02 | See it visually and live: a graph of sessions, projects and features; screens react as events happen | 6 Nov (N-02) | Home, Graph, live stream | Works |  |
| D-03 | Review the whole console as an artifact, built on the kit's newer components, with workflows as screens that help developers | 7 Nov (this session's first ask) | Published demo | Works: the published demo acts (C-30) |  |
| D-04 | A console made only of design-kit components and tokens | 6 Nov | Console | Works | Cortex's card proposals wait upstream in the kit (TL-013) |
| D-05 | Use what is meaningful from kit v0.9.0 | 14 Nov (N-27) | Console | Works |  |
| D-06 | A phone view that works; the desktop stays the spec | 10 and 14 Nov (N-26) | Console | Works |  |
| D-07 | Every feature and screen listed so nothing is missed; all screens decided and drawn, then built | 15 Nov (N-28) | Feature and screen register, 49 boards | Works for screens | Boards were judged by what pages show, not by what people can do; this document fixes that |
| D-08 | Start the build while the boards are reviewed; replace the console in place | 16 Nov | Console | Works |  |
| D-09 | Guided steps wherever work moves | 16 Nov (R-13) | Every board | Works |  |
| D-10 | Information structured as graphs and flows | 16 Nov (R-14) | Every board | Works |  |
| D-11 | Three views of each main exhibit, as a switch, on eleven pages | 16 Nov | Console | Works |  |
| D-12 | Records as full pages | 16 Nov | Console | Works |  |
| D-13 | Everything drawn on the boards built now, not kept for later | 16 Nov (D-417) | Cortex 0.18.0 to 0.24.0 | Works, taking part included (C-29) |  |
| D-14 | Three options for each design component, in the question pop-up with the recommendation marked | 16 Nov | Every question | Standing rule |  |
| D-15 | Readable updates: faces and names, sentences rather than log lines, day groups, rows that open in place | 15 and 16 Nov | Console | Works |  |
| D-16 | Additive only: nothing already built is taken away | 10 Nov (N-22) | Every release | Standing rule |  |
| D-17 | Everyone using Cortex is one team | 10 Nov (N-23) | Console | Standing rule |  |

## Plugin, sessions and commands

The plugin is complete for the pilot. Its behaviour inside a real Claude Code session is proven only against a stand-in.

| ID | What a person can do | Asked | Where you do it | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| S-01 | Sessions named from the epic or room by the plugin (`epic-PORT-41-ab`, `room-…`, `plan-…`) | 6 Nov (N-11) | Plugin | Works |  |
| S-02 | One session per person per epic; `cortex start <EPIC>` opens its worktree and branch | 6 Nov | `cortex start` | Works |  |
| S-03 | Session start as a handshake: registers, shows online, delivers what is waiting | 6 Nov (D-119) | Hooks | Works |  |
| S-04 | Hooks never block work: they fail open, make one call per tool call within budget, and stop calling a hub that is down | 7 and 8 Nov | Hooks | Works |  |
| S-05 | Teammates' text reaches Claude framed as data, never as instructions | 6 and 8 Nov | Hooks | Works against a stand-in | No live session has tested it yet |
| S-06 | Bounded build-and-verify loops with an independent verifier agent | 6 Nov (D-120) | `/cortex:loop` | Works |  |
| S-07 | `cortex` on its own shows your state; status-line segments | 10 Nov | Terminal | Works |  |
| S-08 | `cortex doctor` checks the token, hub, hooks, daemon and version, and reports to the hub | 6 and 16 Nov | Terminal | Works |  |
| S-09 | 52 commands and 25 skills, each listed by area in Help | 16 Nov | Help › Commands | Works |  |
| S-10 | Install from the Enterprise's pinned mirror; updates move by tag in managed settings | 6 Nov (architecture) | IT managed settings | Works | Needs IT's managed settings |
| S-11 | Wake an idle session when a message arrives | 6 Nov (H1b) | `cortexd` | Built, unproven |  |
| S-12 | Away for a meeting, the day or leave; focus for 90 minutes | 16 Nov | `cortex out`, header | Works |  |
| S-13 | A release becomes a tag by itself once Jithin merges | 16 Nov | GitHub | Works |  |

## Platform, data, scale and install

The database work is merged and passes the load test for 45 people, and the install handover is written. No running hub exists for the team yet (X-09).

| ID | What a person can do | Asked | Where you do it | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| X-01 | Run the hub on PostgreSQL with two nodes; any node serves any request | 8 Nov | Hub | Works | The whole suite runs on PostgreSQL 16 in CI |
| X-02 | One PostgreSQL 16 database with pgvector: the graph as tables, no separate vector or graph store | 17 Nov (Jithin's choice) | Hub | Works (0.20.0) |  |
| X-03 | Built and load-tested for the team of 45 | 17 Nov | `scripts/load_test.py`; results in `docs/scale.md` | Works: passes for 45 people (0.20.0) |  |
| X-04 | An install and integration handover, with what Cortex is built for, that a Claude Code session inside the Enterprise can follow | 17 Nov | `docs/enterprise/install-and-integrate.md` | Works (written for v0.20.0 and later) |  |
| X-05 | A go-live preflight that says GO or NO-GO | 8 Nov | `python -m cortex_server preflight` | Works |  |
| X-06 | Every Enterprise integration built now and checked live later: SSO, hosting, Jira, Bedrock, logs, telemetry | 8 Nov (N-18) | Hub | Blocked (V-2 to V-7) |  |
| X-07 | The Enterprise side handled by Jithin and not tracked as a lab blocker | 17 Nov | Register | Works: recorded in D-427 |  |
| X-08 | Mocks keep working when real providers are added | 6 Nov | Providers | Works |  |
| X-09 | A running hub the team can use | 17 Nov: "I take this into the actual environment and start using it" | Inside the Enterprise | Missing | Phases 1 to 4 of the handover |

## Privacy, safety, operations and the pilot

The safety and privacy rules work on invented data. The pilot cannot start until a hub runs inside the Enterprise.

| ID | What a person can do | Asked | Where you do it | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| V-01 | Trust that prompts, code and model output are never stored, except what a person shares | 6 Nov | Hub, plugin | Works |  |
| V-02 | A message is refused unless its sender is a live session of the signed-in person | 8 Nov (C-22) | Hub | Works |  |
| V-03 | Secrets removed on the laptop and again on the hub | 8 Nov | Plugin, hub | Works |  |
| V-04 | Privacy promises hold: hand-off text for sender and recipient only; invite-only rooms stay with their members | 8 Nov (C-24) | Hub | Works |  |
| V-05 | TLS required; no default secrets | 8 Nov (C-25) | Hub | Works |  |
| V-06 | See what Cortex shows about you, as three circles, and how to step back | 16 Nov | Help | Works |  |
| V-07 | Records kept 13 months; one person's data deleted on request | 8 Nov | Hub, curators | Works |  |
| V-08 | Turn Cortex off for the team, or on one laptop | 8 Nov | Hub, laptop | Works |  |
| V-09 | The thin pilot: messaging, hand-offs, claims with alerts, the start-of-day brief, ask-the-log | 7 Nov (D-166) | `CORTEX_PILOT=thin` | Works |  |
| V-10 | Pilot with 3 to 5 volunteers from about 21 November, kill criteria read weekly | 7 Nov (D-166) | Inside the Enterprise | Missing | No running hub (X-09) |
| V-11 | Remote approvals switched on after Risk's review | 7 Nov | Remote | Blocked (Risk) |  |
| V-12 | Pilot readiness, health, settings and live checks from the hub's real state | 16 Nov (P-16) | Operations | Works |  |

## Build plan

Proposed on 17 November after the audit, for Jithin's call; waves 1 to 5 are built and merged. Each wave is a release, and a wave is done only when a person can do every action in it, end to end, in the live demo. The clean-up items (O-) go into the wave that touches the same code, so nothing new is built on the duplicates.

**Jithin's calls, 17 November.** The order below, fixes first. In a room's converge round each person spreads 3 votes across the ideas, and the totals show when the round ends; the convener still accepts or rejects each idea with a reason. Comments are reply threads on each idea, spec and test result, with @name to notify, closed during the blind round and seen by Claude Code too. The published demo opens on the recording and switches to the real hub running in the page once it has loaded, so every action works. The 19 old pages: each one's unique part moves onto its board and the old address opens the board, which lifts the additive-only rule for those pages. Wave 1 started the same day.

**Two more calls the same morning, from the hub fixes.** Detectors: a curator switches a detector for the whole team, and a project owner can switch it only for their own project, so creating a project no longer reaches a team-wide switch. Epic notes: proposed notes are seen and accepted by the hub's curators and the owner of the epic's project, the same people as for the project's memory.

**Two more calls, 17 November (D-435).** Passing a decision on: work (hand-offs, pick requests, tests) moves at once, while a spec approval or an ADR seat moves only once the convener or author taps OK. Rooms need no call feature: the call link, Join the call and the convener's link setting are removed from the hub, the console and the demo.

**Where to watch it.** Each wave landed as commits on its pull request, with a checklist of what is done: wave 1 is [#51](https://github.com/thinklatent-labs/cortex/pull/51), wave 2 is [#52](https://github.com/thinklatent-labs/cortex/pull/52) and [#53](https://github.com/thinklatent-labs/cortex/pull/53), which finishes it, wave 3 is [#54](https://github.com/thinklatent-labs/cortex/pull/54), wave 4 is [#55](https://github.com/thinklatent-labs/cortex/pull/55), and wave 5 is [#56](https://github.com/thinklatent-labs/cortex/pull/56). All of them are merged.

**Where it stands, 18 November, early morning.** All five waves are merged. 0.20.0 was merged and tagged v0.20.0 (Jithin made the tag by hand). On 18 November Jithin merged [#53](https://github.com/thinklatent-labs/cortex/pull/53) (0.21.0, taking part from the browser), [#54](https://github.com/thinklatent-labs/cortex/pull/54) (0.22.0, every click opens its record), [#55](https://github.com/thinklatent-labs/cortex/pull/55) (0.23.0, the rest of the boards) and [#56](https://github.com/thinklatent-labs/cortex/pull/56) (0.24.0, the intelligence features), in that order, so main is at 0.24.0. The tags v0.21.0 to v0.24.0 are his to make by hand at the four merge commits (5410ae4, 79ae838, 3023fc7 and 4f6917a), because CI cannot run while the organisation's Actions billing is blocked. With 0.24.0, a session starts with memory ranked for its subtask, each entry saying why; every start-context item, alert and answer takes a usefulness vote; a card says when someone in another epic works on the same thing; who knows a topic comes from shared records, with no score; curators retire or keep memory that may be stale, duplicated or in conflict; and the session digest, drafted by your own Claude at a stop, becomes the hand-off when you approve it. Every release was checked locally before its merge; for 0.24.0: 497 tests on SQLite and on Postgres, the plugin validates, every budget holds (first load 182 KB of 200), the smoke test opens 61 pages in 277 steps with no dead click, and the live demo check passes 49 of 49. The published demo was replaced with this build on 18 November; against it, the smoke test opened 61 pages in 277 steps and the live demo check passed 47 of 47.

**Where it stands, 18 November, morning.** Jithin merged 0.25.0 as [#57](https://github.com/thinklatent-labs/cortex/pull/57): the demo as the design canvas draws it. The demo hub now holds the boards' world: six people in India, Canada and the US, four projects, and the ten flows at their boards' stages. Pages follow their boards: one row of numbers, parts paired as drawn, and the Projects tabs under the numbers. Missing in Jira is the grid of epics in flight, and Activity reads in plain sentences. Checked before the push: 499 tests pass, the plugin validates, the smoke test opens 61 pages in 131 steps with no failure, and the live demo check passes 47 of 47. The published demo was replaced with this build. Main is at 0.25.0, and the tags v0.21.0 to v0.25.0 are his to make by hand at their merge commits (v0.25.0 at 7282e75).

**Where it stands, 18 November, afternoon.** Jithin merged 0.26.0 as [#58](https://github.com/thinklatent-labs/cortex/pull/58) (merge commit 9e1cbea): boards S-34 to S-51, checked side by side against the live demo. Every flow graph (S-38, S-41 to S-45, S-49 and the other screens that draw one) is now columns that fit the page, as the boards draw them: boxes in their tone, curved lines in the colour of the box they leave, dashed where nothing is dated, and no panning or zooming. A rule row on Feedback (S-36) no longer squeezes to a word a line. Two boards still differ: S-37 part 1 is a list where the board draws bullet bars against a 50% line, and S-50 (the focus room) is laid out differently. Checked before the push: the full test list passes, the plugin validates, the smoke test opens 61 pages in 131 steps with no failure, and the live demo check passes 47 of 47 three times in a row. CI did not run because of the organisation's Actions billing. The published demo was replaced with this build. Main is at 0.26.0; the tag v0.26.0 is Jithin's to make by hand at 9e1cbea.

**Where it stands, 19 November.** Jithin merged 0.27.0 as [#59](https://github.com/thinklatent-labs/cortex/pull/59) (merge commit 110ad54): the last boards that still differed. Detectors (S-37) draws bullet bars against the 50% line from votes that now reach the board's shares, with each detector and each card as a row. The focus room (S-50) is a grid of waves by buckets with every subtask whole and its needs drawn between the boxes, and the rail in the board's order. The graph (S-07) opens around the epic your session is on, as dots on rings, with the selected epic's project, release, people, decisions and room. Needs you (S-08) has Focus 90 min and one-line card rows. My session (S-10) is titled by its subtask, with the session map as the board's chain. Epic sessions (S-24) shows sessions and hand-offs as rows with faces and names. What still differs is data, not layout: the demo's PORT-2 has 7 subtasks where the board draws 10, and no build loop is running on it. Checked before the push: 499 tests pass, the plugin validates, the smoke test opens 61 pages in 134 steps with no failure, and the live demo check passes 47 of 47 twice. CI did not run because of the organisation's Actions billing. The published demo was replaced with this build. Main is at 0.27.0; the tag v0.27.0 is Jithin's to make by hand at 110ad54.

1. **Wave 1, 0.20.0: fixes, speed and scale.** The privacy leak first (B-S38-1), then the other 32 board fixes and nine click fixes (CL-03, CL-06, CL-07, CL-12, CL-13, CL-16 to CL-19). The bundle work (O-1 to O-10) takes first-load script from 248 KB to 188 KB and styles from 202 KB to 52 KB. The database work already on the branch is finished: a pool of connections per node, three indexes, and the load test passing (X-02, X-03, K-02).
2. **Wave 2, 0.21.0: take part from the browser** (C-29, C-30 and the 47 board rows marked Collaboration). In a room: open, join, add ideas, move the rounds, react and vote, comment, accept or reject with a reason, join the call, read the spec on the page. In a test: request one without a session, see its commit and requirements, take it, record pass or fail per requirement. Message someone from their card. The live demo runs the real hub in the page, and simulated teammates answer. Built on one people helper, one data hook with one action helper, and one sheet and form (O-12, O-13, O-16).
3. **Wave 3, 0.22.0: every click opens its record** (CL-01, CL-02, CL-04, CL-05, CL-08 to CL-11, CL-14, CL-15, CL-20, CL-21 and the 32 board rows marked Opens nothing). Pages and drawers for the 14 records with none, links on every number and record key, and a CI check that fails any click that does nothing. Built with one map from reference to page, one graph canvas and one row layout per record (O-11, O-14, O-19 to O-21).
4. **Wave 4, 0.23.0: the rest of the boards** (the 64 board rows marked Missing), on one board layout (O-15, O-17, O-18, O-22, O-23), with a decision on the 19 old pages (O-24).
5. **Wave 5, 0.24.0: the intelligence features** (K-10 to K-15): the session digest, intent overlap, ranked start context, who knows, memory hygiene and usefulness reads.
6. **Jithin's, in the Enterprise** (X-04, X-09, V-10, and C-26, E-03, E-09, K-16, K-17, V-11, X-06): the install from the handover, the live checks and the sign-offs. Jithin takes these inside; the lab treats them as done (17 November).

**Size and the appetite.** By the audit's sizes the waves hold about 150 small, 66 medium and 5 large items, before the six intelligence features. TL-017's four-week appetite ends on 5 December, and the lab never extends it. The order lands the privacy fix and taking part from the browser first, so they are done whatever happens at the breaker; on 5 December the register shows what is left.

**How "built" is judged from now on.** A requirement counts as built only when a person can do it end to end, in the live demo or on a running hub. Each board lists the actions a person takes, and the check clicks through every one of them.

## Sources

- Project knowledge, "Team hub (team-hub) - Console feature and screen register", v0.6: asks N-01 to N-28, features F-01 to F-115, boards S-01 to S-49.
- Project knowledge, "Team hub (team-hub) - Console build 1 2026-11-16": Jithin's question-prompt decisions for builds 1 to 4.
- Project knowledge, "Team hub (team-hub) - Console build 5" and "Console build 6", 16 November.
- Project knowledge, "Team hub (team-hub) - Build brief" v5 and "Architecture" v0.1, 6 November.
- The register's decision lines for TL-017, D-116 to D-417.
- The repository: [docs/backlog.md](https://github.com/thinklatent-labs/cortex/blob/main/docs/backlog.md), [docs/design.md](https://github.com/thinklatent-labs/cortex/blob/main/docs/design.md), [docs/enterprise/](https://github.com/thinklatent-labs/cortex/tree/main/docs/enterprise), and the console's code for which actions exist.
- Jithin's messages of 17 November in this session.
