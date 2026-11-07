---
id: TL-017
slug: team-hub
title: "Team hub: a Claude Code plugin plus an AWS service giving the team's sessions shared rules, memory, artifacts, presence and a message path"
aliases: []
type: Idea
parent: null
themes: []
stage: "Seed"
stage_since: null
horizon: "H1"
stream: null
appetite_weeks: null
appetite_ends: null
owner: "Head of ThinkLatent (sponsor); build owner to be named"
score: null
score_status: none
doc_url: null
standard: "pre-v1"
last_touched: 2026-11-06
sensitivity: none
critique_recorded: null
next_step: "Build phase (spike) approved 2026-11-06: see claude/Team hub (team-hub) - Build brief.md (overrides Architecture v0.1 where they differ). Named Project Cortex; Cortex 0.4 built on thinklatent-labs/cortex (branch spike/messaging-core, commit 1d03123, 57 tests passing; Build brief v5; design in docs/design.md, research summary in docs/research/command-center.md; console is now a Needs-you queue on a live event stream, with graph, activity, ADRs, catalogue and hypotheses; new pre-registered H21 to H23). 0.4 merged (PR 1). No spike participants yet, so the backlog moved forward without them: docs/backlog.md and GitHub issues 2 to 15 (releases 0.5 to 0.7, plus a Blocked list); 0.5 built in PR 16 (CI, simulated-team spike harness: H1 proxy, H2, H6 pass with 6 simulated people; risk detectors v2; start-of-day briefing; console code-split). PR 16 (0.5) merged. 0.6 built in PR 17, all CI green including the whole suite on PostgreSQL 16: Postgres adapter, multi-node LISTEN/NOTIFY fan-out, ask the log with citations, delivery ranges. PR 17 (0.6) merged. Jithin's four calls (2026-11-06): co-editing via a Node sidecar (ADR-0001), design gate for epics only, licence exceptions for scramp and lightningcss, kit blocks upstream. 0.7 built in PR 18, all six CI jobs green (light path, co-editing sidecar with live cursors, kit blocks proposal). PR 18 (0.7) merged. 2026-11-07: Bedrock is provisioned per person through an IAM role inside Claude Code, so model work runs in sessions and the hub stays model-free (ADR-0002); 0.8 in PR 19 adds cortex cite-check so session answers cite the record. PR 19 (0.8) merged. Spike participants are about two weeks out (around 2026-11-21), when Cortex moves inside the Enterprise for testing. KIT_READ_TOKEN added 2026-11-07; CI console job now builds against the kit (all six jobs green). Next: the inside-the-Enterprise readiness pack (0.9) before the pilot; kit blocks go to a TL-013 session; the pilot waits on participants. Spike participants still needed for H1b, H9, H13, H18 to H23. Critique pass still owed before the idea leaves Stress test. Open for later phases: Jira Cloud or Data Center and plugin, capability in Jira, compulsory fields, IT managed settings, build owner and participants. Provider answered: Bedrock (Opus 5), no claude.ai. Jithin answers: Claude Code version and operating systems on laptops, whether managed settings restrict cross-session messages, Jira, offline default; name the build owner and 2 to 4 spike participants; then a one-week spike: hook-based inbox on a minimal API (H1, H2), then a per-session watcher that posts into its own session's socket to wake an idle session (H1b), plus group naming such as server-dev-jp (H6). Declared reuse to confirm: the AI Gateway's multi-tenant memory substrate for central memory, and Claude Code's native session messaging for the last hop. Related: TL-003 portal bridge (the portal reaches sessions through the hub); the AI guide (carried as a plugin skill)."
next_step_due: null
---

# Team hub: a Claude Code plugin plus an AWS service giving the team's sessions shared rules, memory, artifacts, presence and a message path

<!-- generated:start -->
## Lab record

**TL-017 team-hub** · Idea · Seed (captured 2026-11-06; idea card v0 written the same day) · H1

Owner: Head of ThinkLatent (sponsor); build owner to be named. Appetite: not set. Score: not scored .

Next step: Build phase (spike) approved 2026-11-06: see claude/Team hub (team-hub) - Build brief.md (overrides Architecture v0.1 where they differ). Named Project Cortex; Cortex 0.4 built on thinklatent-labs/cortex (branch spike/messaging-core, commit 1d03123, 57 tests passing; Build brief v5; design in docs/design.md, research summary in docs/research/command-center.md; console is now a Needs-you queue on a live event stream, with graph, activity, ADRs, catalogue and hypotheses; new pre-registered H21 to H23). 0.4 merged (PR 1). No spike participants yet, so the backlog moved forward without them: docs/backlog.md and GitHub issues 2 to 15 (releases 0.5 to 0.7, plus a Blocked list); 0.5 built in PR 16 (CI, simulated-team spike harness: H1 proxy, H2, H6 pass with 6 simulated people; risk detectors v2; start-of-day briefing; console code-split). PR 16 (0.5) merged. 0.6 built in PR 17, all CI green including the whole suite on PostgreSQL 16: Postgres adapter, multi-node LISTEN/NOTIFY fan-out, ask the log with citations, delivery ranges. PR 17 (0.6) merged. Jithin's four calls (2026-11-06): co-editing via a Node sidecar (ADR-0001), design gate for epics only, licence exceptions for scramp and lightningcss, kit blocks upstream. 0.7 built in PR 18, all six CI jobs green (light path, co-editing sidecar with live cursors, kit blocks proposal). PR 18 (0.7) merged. 2026-11-07: Bedrock is provisioned per person through an IAM role inside Claude Code, so model work runs in sessions and the hub stays model-free (ADR-0002); 0.8 in PR 19 adds cortex cite-check so session answers cite the record. PR 19 (0.8) merged. Spike participants are about two weeks out (around 2026-11-21), when Cortex moves inside the Enterprise for testing. KIT_READ_TOKEN added 2026-11-07; CI console job now builds against the kit (all six jobs green). Next: the inside-the-Enterprise readiness pack (0.9) before the pilot; kit blocks go to a TL-013 session; the pilot waits on participants. Spike participants still needed for H1b, H9, H13, H18 to H23. Critique pass still owed before the idea leaves Stress test. Open for later phases: Jira Cloud or Data Center and plugin, capability in Jira, compulsory fields, IT managed settings, build owner and participants. Provider answered: Bedrock (Opus 5), no claude.ai. Jithin answers: Claude Code version and operating systems on laptops, whether managed settings restrict cross-session messages, Jira, offline default; name the build owner and 2 to 4 spike participants; then a one-week spike: hook-based inbox on a minimal API (H1, H2), then a per-session watcher that posts into its own session's socket to wake an idle session (H1b), plus group naming such as server-dev-jp (H6). Declared reuse to confirm: the AI Gateway's multi-tenant memory substrate for central memory, and Claude Code's native session messaging for the last hop. Related: TL-003 portal bridge (the portal reaches sessions through the hub); the AI guide (carried as a plugin skill).

Production surface: not named (reads as an H3 experiment).

Governance: not recorded.

### Decisions due
_None._

### Hypotheses
_None recorded._

### Kill signals
_None recorded._

### Open questions
_None recorded._

### Links
_None recorded._

### Artifacts
_None recorded._

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
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._
