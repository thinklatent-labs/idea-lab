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
last_touched: 2026-11-16
sensitivity: none
critique_recorded: true
next_step: "Pilot inside the Enterprise on Cortex v0.19.0 from about 2026-11-21: 3 to 5 volunteers, H1 and H2 read by 2026-12-05. Every board is built (D-417); Jithin merged cortex PR 49 (0.18.0) and PR 50 (0.19.0) on 2026-11-16, and CI tagged v0.18.0 on 93b89ea and v0.19.0 on bb4465f by itself. V-1a runs when Jithin judges the time is right; no build work waits on it."
next_step_due: "2026-11-21"
---

# Team hub: a Claude Code plugin plus an AWS service giving the team's sessions shared rules, memory, artifacts, presence and a message path

<!-- generated:start -->
## Lab record

**TL-017 team-hub** · Idea · Building (Building gate passed 2026-11-07 (D-152, D-165) on Jithin's call against both red-team seats' recommendation of Stress test: owner role Platform lead (Claude), stream S-D, appetite 4 engineer-weeks ending 2026-12-05, Jithin's review slot Mondays 30 min. Critique recorded (D-164): two passes, docs/critique in the cortex repo) · H1 · S-D

Owner: Platform lead (Claude, building with Claude Code, as the S-D stream engineer); Head of ThinkLatent (Jithin), sponsor, decider and product lead. Appetite: 4 engineer-weeks, ends 2026-12-05. Score: not scored .

Next step: Pilot inside the Enterprise on Cortex v0.19.0 from about 2026-11-21: 3 to 5 volunteers, H1 and H2 read by 2026-12-05. Every board is built (D-417); Jithin merged cortex PR 49 (0.18.0) and PR 50 (0.19.0) on 2026-11-16, and CI tagged v0.18.0 on 93b89ea and v0.19.0 on bb4465f by itself. V-1a runs when Jithin judges the time is right; no build work waits on it. (due 2026-11-21)

Production surface: not named (reads as an H3 experiment).

Governance (separate team): not started, The Enterprise's InfoSec and IT sign-off for the pilot inside the Enterprise (SSO, hosting, managed settings, data retention); a simulated pre-review is recorded in the critique

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

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-116 | 2026-11-06 | Registered at Seed: a Claude Code plugin plus an AWS hub giving the team's sessions shared rules, memory, artifacts, presence and a message path; first step is a one-week hook-based inbox spike, and the design waits on which provider Claude Code uses (no push or monitors on Bedrock) | Jithin (idea); thinking partner (card and recommendation), pending Jithin | proposed |
| D-117 | 2026-11-06 | Provider is Bedrock with Opus 5 and no claude.ai, so channels and monitors are out; sessions are named group-initials (server-dev-jp) and the plugin derives the group and shares its context; the last hop into a session uses Claude Code's native session messaging fed by a per-session watcher, to be proven in the spike (H1b, H6). Build waits until the brainstorm settles | Jithin (provider, naming); thinking partner (watcher design), pending Jithin | proposed |
| D-118 | 2026-11-06 | Two purposes added: impact alerts when one person's change affects another (H8), and hand-off packets so the hub carries work across time zones and a teammate picks up where the last person stopped (H7) | Jithin (purposes); thinking partner (hypotheses), pending Jithin | proposed |
| D-119 | 2026-11-06 | Session start is a handshake with the hub: the session registers, the hub marks it online, delivers what is queued and tells its group that a member is up (opt-in, group only). Presence ends on missed check-ins, not on a goodbye; states are online, away and offline. Card wording to follow at its next edit | Jithin (idea); thinking partner (states, privacy), pending Jithin | proposed |
| D-120 | 2026-11-06 | Adopt harness, loop and graph engineering as the team's standard practice in the plugin: a phase pipeline (idea, requirements, design, build, verify, hand-off) with gates enforced by hooks, bounded build-and-verify loops with a separate verifier, and a shared brainstorm room where every connected user's session contributes to an idea (blind round, cluster, critique, converge). Card v0.4 section 5b adds H9 (room beats solo) and H10 (gates cut rework without slowing small tickets); handshake wording now in the card. Nothing built. | Jithin (idea); thinking partner (mapping, critique), pending Jithin on the light-path rule and who converges a room | proposed |
| D-121 | 2026-11-06 | Architecture v0.1 drafted (claude/Team hub (team-hub) - Architecture.md): hub stores and routes, sessions think; project rooms with local drafts pushed by choice; one-writer spec from an accepted ledger, merged by pull request; plugin-assigned session names from the work item; Jira plan of record (component, capability, release component/version, epic, bucketed stories, subtasks with frozen human-day estimates); release recommendation and version advisor; one daemon per machine; user-scope plugin from a private GitHub marketplace pushed by managed settings, updated by version bump; command center. H11 to H19 pre-registered there. Nothing built. | Jithin (operating model, Jira model, run-down); thinking partner (architecture, estimate method), pending Jithin review | proposed |
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
