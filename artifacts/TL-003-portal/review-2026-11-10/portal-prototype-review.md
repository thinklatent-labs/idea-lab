# ThinkLatent Portal (portal) — Prototype review against past work

10 Nov 2026 · TL-003 portal · prototype version 1794320190-ba47 (portal 708c169) · three independent checks, none of which saw how the prototype was built

## Verdict

The role workspaces and the journey made the portal easier to follow, and that part should stay. But the prototype is a thin slice of what was designed:

- **Features:** of 556 features on the 208 past boards, 38 are fully in the prototype, 150 in part and 361 are missing (7 moved on purpose). Of 174 requirements, 5 are fully met, 107 in part, 52 missing.
- **Design:** the prototype kept the boards' information and journey logic but dropped the kit's visual layer: no Shell with the dock, no glass, tiles without sparklines, almost no charts on a first screen, agent proposals as plain text, almost no ⓘ, no section bar, no Decision Red. Every section is the same flat card, which is why it reads as stripped down.
- **Wording:** the journey mixes "use case" and "project", "bar", "floor" and "gate", and marks findings you can fix as "Blocked".

Who lost most: **Foundation team** (data review, training monitor, model pages, registry), then **Approver** (validation document, model validation once for the portal and Relay, running the TL Index themselves), then **everyone** (Ask, Help, agent library). The Application team journey holds up best.

## 1. Features

### Whole areas with no counterpart (shown as "not in this prototype yet")
1. Agent library and agent pages (owed: it replaced blueprints)
2. Model page, lineage, lifecycle, release bundle, model card, registry
3. Prompts (versions, hygiene checks, stepped rollout)
4. Traces for pilot, POC and integration
5. Help: ask an expert, problem register, knowledge base, office hours; Ask ThinkLatent; Inbox
6. Settings and notifications
7. TL Index as a product: leaderboard, arena, pillar pages, contribute, corrections, evaluation requests, trials
8. Governance portfolio and validation documents
9. Most of Data (review queue, tagging pipelines, self-healing marks, knowledge graph) and Training (live monitor, dry run, pre-flight, checkpoint export)
10. Project level: intake, adoption, value ledger, live view

### Biggest lost features inside areas that exist
1. Canary judgement with sample sufficiency, and a gated promote (only roll back exists)
2. Use-case record: attestations, findings register, record completeness, monitoring plan with owners, limits ledger, incident plan
3. Spend ceilings, forecast and temporary limit increases
4. Project members, join and access requests
5. Advisor signals: acceptance, feedback, persistence, outcome events
6. Approval detail: what the approval names (model, setting, build), policy checks, SLA escalation, conditional approval, agent-drafted message to the owner
7. Self-healing marks with confirm or overrule, and the 14-day escalation
8. Index edition sign-off by the Head, corrections log, follow a model
9. Agents' activity log with pause; the side-door view of vendor APIs
10. Every page: engineering switch, membership gating, breadcrumbs, ⌘K search

### Requirements that matter most (P1, all partly met)
- **Validation (V2, G-04, E5):** approvers can decide a stage request, but there is no drafted validation document, no validation queue for models and agents, and no single sign-off that approves for the portal and Relay together.
- **Data review (D1, E6):** the Data page shows queue counts only; a reviewer cannot claim, approve or reject with a reason against a rubric.

## 2. Design: what to restore (journey structure kept)

| # | Change | Effort | Needs the kit |
| --- | --- | --- | --- |
| 1 | Shell D: dock inside the frame, ⌘K search, green field backdrop; the demo date becomes a top-bar chip | M | Yes: the kit does not export `Shell` (TL-013 request) |
| 2 | Four tiles with sparklines and 52 px numbers on every first screen | M | No |
| 3 | One exhibit straight after the tiles (measures against bars on the journey; quality against the bar on the Head's home) | M | No |
| 4 | Every agent proposal as an `AgentBrief`: agent chip, basis, confidence, View sources | S | No |
| 5 | A "Needs a decision" block in Decision Red; on the approver page, above the evidence | M | No |
| 6 | The v6 sticky section bar (Overview · Performance · Models · Quality · Improve · Record) instead of "Look closer" and wide sheets | M | No |
| 7 | Glass on, coloured surfaces only for briefs and decisions, brand-green primary buttons, a chip strip under the title | S | Partly (MetaStrip, KpiStrip not exported) |
| 8 | Type scale: 40 px titles, 22 px sections, 52 px numbers; ⓘ and as-of on every surface | S | No |

## 3. Journey vocabulary (proposed)

| Concept | Today | Proposed |
| --- | --- | --- |
| The thing that moves through stages | use case, project | **use case** ("Start a use case") |
| Stages | Start · POC · Active build · Pilot in production · Production | **Set up · Try · Build · Pilot · Production** (alt.: Draft · Proof of concept · Build · Pilot in production · Production) |
| Moving a stage | pilot gate, request, ask for | **Pilot approval / Production approval**; "Ask for pilot approval"; "Ask again" |
| A score to clear | bar, floor, threshold, gate | **bar**; set by policy: **policy bar** |
| One tested item | check, bar, measure, pillar | **check** ("8 of 10 checks met"); **measure** on use-case pages, **pillar** on Index pages |
| Checklist states | Done, To do, Blocked (misused), Waiting | **To do** (yours now) · **Blocked by …** · **Waiting on / until …** · **Done**; bars are **Met** |
| Sections | How it is doing, Look closer, What has happened | **Health**, the section bar, **History** |
| Fixing | Fix this, Fix the findings, Improve | Flow **Fix findings**, button **Fix**, section **Improve** |
| Data | Bring data and evaluate | **Add data and evaluate** |
| Index page | Index, Evidence | **TL Index** |
| Workspace for no role | Explore | **Everyone** |
| Prototype control | Story day | **Demo date** |
| Jargon | pass^3; canary; UA-0291 first | **Consistency on long threads**; **trial on 10% of traffic** (canary in engineering view); "Production request · UA-0291" |

Each stage gets a one-line goal under the tracker, for example *Build: agree the bars, add your evaluation data and get an Official run that meets every pilot bar.*

## Detail

Full tables are in the idea-lab repository under `artifacts/TL-003-portal/review-2026-11-10/`: `req-audit.md` (174 requirements, graded), `board-audit.md` (556 board features, graded, by canvas page), `design-vocab.md` (element-by-element design comparison and the full vocabulary).

## Status after the restore (11 Nov 2026)

Prototype version 1794338271-fb86, portal 7a51791. Decisions D-230 and D-231.

### Done
- **Design layer and vocabulary** (section 2 rows 2 to 8, section 3): on every page. Row 6 is a view bar that swaps the page body, not the kit's scrolling section bar.
- **P1 Validation:** validation queue for models and agents, a validation document drafted by the Evidence agent (what is validated, evidence, questions asked, limits), one hold-to-approve sign-off for the portal and Relay, the pattern validated once. Validators are simulated.
- **P1 Data review:** claim a row, tick the rubric, approve, or reject with a reason; self-healing marks with confirm or overrule and the 14-day escalation. The record itself is never shown.
- **Whole areas restored:** model page (lineage, lifecycle, release bundle, runs, agents on it), agent library and agent pages (pre-review first; agent pick in set-up), prompts, traces (production sealed, break-glass ask), help (ask an expert, problem register, kept answers), Ask (five questions answered with a chart), settings, governance portfolio, TL Index corrections and edition sign-off, search (⌘K).
- **Inside existing areas:** gated promote with trial judgement, record completeness, members and join requests, monitoring plan with owners, limits, attestations, incident plan, spend ceiling with forecast and a temporary-increase ask, what an approval covers.

### Not done
- Shell D with the dock (waits on DK-003) and the phone bottom bar (DK-002).
- TL Index as a product: arena, pillar pages, contribute, evaluation requests, follow a model.
- Training: live monitor, dry run, pre-flight, checkpoint export. Data: tagging-pipeline detail, knowledge graph.
- Use-case level: intake, adoption, value ledger, advisor signals (acceptance, feedback).
- Approval detail: policy checks list, SLA escalation, conditional approval.
- Agents' activity log with pause; side-door view of vendor APIs; inbox and real notifications.
- Engineering switch and membership gating on every page (membership is shown on traces and the record only).
- The requirements doc has not been re-graded against this build; the 38 of 556 and 5 of 174 counts above are from before the restore.

## Rebase on the command centre (11 Nov 2026, later)

Prototype version 1794371511-924f, portal b873742. Decisions D-233 to D-235.

Jithin stopped the journey-first build: the command centre from the boards had been replaced by the journey, and the portal read as boxes to click. What changed:

- **Frame:** the kit's Shell D with the dock at the side (kit pin moved to v0.7.0); a bottom bar on phones.
- **Home:** the command centre: KPI strip, quality against the bar across every use case, live traffic, what needs a decision, then the ways in.
- **Use case:** its own command centre (Overview, Performance, Models, Quality, Improve, Record, Cost).
- **Journey:** one tab. It holds each role's next step, the stage tracker and the checklist, and sends people into the command-centre pages.
- **Guide:** a chat beside any page and at Ask. It answers through Claude where the page may ask and from a script elsewhere, draws charts and numbers in the conversation, links to the page with more, and offers to page a person.
- **Onboarding:** a conversation with the Onboarding agent that ends in a proposed use case for the person to create. The four-step form stays as a fallback.
- **Also built:** TL Index arena, pillar pages, contribute and evaluation requests; the training run page; pipeline detail and the knowledge graph.

Still not done: a board-by-board match of the command-centre pages (time window, preview as, the Why? sheet, attestations on the home); the guide acting on the page it is beside; intake, adoption and value ledger; approval policy checks and conditional approval; agents' activity log; inbox; engineering switch; the re-grade against the requirements.
