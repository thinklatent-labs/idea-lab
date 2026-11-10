# Board audit: features in the past boards against the current prototype

Scope: every board in `interface-v5.1/project/canvas.json` (208 boards on 17 canvas pages; v6 pages read together with the v5.1 boards of the same code). Prototype: `/home/claude/portal/apps/portal/src` (routes in `router.tsx`, menus in `shell/menus.ts`). Read on 10 Nov 2026.

Status key:
- **Present**: the prototype has the capability or the information, in substance.
- **Partial**: something of it exists but thinner (what is thinner is said).
- **Missing**: nothing in the prototype does it; `/soon/<Name>` placeholders count as Missing.
- **Moved on purpose**: removed by a recorded decision (core-team view, Jira, Claude Code bridge to Cortex TL-017; blueprints replaced by the agent library; harness never shown; production traces sealed; proprietary records never shown).

Workspace ids used in the last column: Application team (app), Foundation team, Approver, Head of ThinkLatent (Head), Operations (Ops), Explore, Shell (all workspaces), Cortex (TL-017).

Prototype file shorthand: `Home` = pages/Home.tsx; `Journey` = pages/Journey.tsx; panels/*, flows/*, homes/*, workspaces/*.

## Counts by canvas page

The two v6 pages (p0 batch 1, pb2 batch 2) are folded into the v5.1 page of the same code, as asked.

| Canvas page | Present | Partial | Missing | Moved on purpose | Rows |
|---|---|---|---|---|---|
| p1 Home and shell (+ v6-Main) | 1 | 21 | 31 | 2 | 55 |
| p2 Models (+ v6-M2) | 0 | 18 | 45 | 0 | 63 |
| p3 Projects (+ v6-J0, J1, J2, J10) | 6 | 25 | 30 | 0 | 61 |
| p4 Use case: running (+ v6-J3, J4, J5, J6, J11) | 10 | 15 | 36 | 1 | 62 |
| p5 Use case: quality and record (+ v6-J7, J8, J9) | 8 | 16 | 31 | 0 | 55 |
| p6 Use case workbench (+ v6-W2, W3) | 5 | 9 | 27 | 0 | 41 |
| p7 Training (+ v6-T1, T2, T6) | 0 | 10 | 30 | 0 | 40 |
| p8 Data | 0 | 6 | 26 | 0 | 32 |
| p9 Evaluation: results and index (+ v6-E1) | 2 | 11 | 25 | 0 | 38 |
| p9b Evaluation: requests, trials, pillars | 0 | 1 | 17 | 0 | 18 |
| p10 Agents and playground | 1 | 3 | 27 | 0 | 31 |
| p11 Approvals and governance (+ v6-V1, V1b) | 3 | 5 | 13 | 0 | 21 |
| p12 Operations | 1 | 10 | 14 | 0 | 25 |
| p12b Help and core team | 0 | 0 | 8 | 4 | 12 |
| p13 Dark | 1 | 0 | 1 | 0 | 2 |
| **Total** | **38** | **150** | **361** | **7** | **556** |

---

## p1 · Home and shell (8 boards; v6-Main from p0 read with H1)

| Board | Feature | Status | Where now / what is missing | Which workspace should own it |
|---|---|---|---|---|
| H1 Main + v6-Main | Headline KPI tiles: models in production, evaluation runs today with pass rate, decisions waiting, attestations due, each against yesterday | Partial | homes/Head.tsx shows one "next step" and portfolio by stage; no run count, attestation count or day-on-day comparison | Head |
| H1 | Time window switch (today / 7 d / 30 d / quarter) with compare-to-previous | Missing | No window control anywhere; story day replaces it | Shell |
| H1 | Preview home as another role (Head, Foundation, App, Validator, Everyone) | Present | Workspace switcher in shell/Shell.tsx (it switches, not previews) | Shell |
| H1 | Quality-against-the-bar strip for every use case (score, interval, bar tick, this-week call On plan / May miss / Below bar) | Partial | homes/Head.tsx and workspaces/head/Portfolio.tsx list use cases by stage with blocker text; no per-use-case score against bar, no May-miss call | Head |
| H1 | Operations brief from the agents (portfolio call with confidence and time) | Missing | No composed brief; only per-page "Where things stand" | Head |
| H1 | Flagged finding with root-cause "Why?" (contributing causes with share of the drop, regression start date, evidence list) | Missing | Finding F-0412 shown as text in Quality panel; no attribution, no regression start, no evidence list | Head (also Approver) |
| H1 | Agent proposal actions on a finding (rerun evaluations, notify owners, proposal awaiting owner) | Missing | Only the improve-plan approval exists (flows/Improve.tsx) | Head |
| H1 + v6 | "Needs you" ordered list mixing decisions, attestations, tasks with numbered order and filters (All / Decisions / Attestations / Tasks) | Partial | workspaces/head/Decisions.tsx lists waiting requests and the improve plan; no attestations, tasks or filters | Head |
| H1 | Sign off a TL Index edition | Missing | No edition sign-off anywhere | Head |
| H1 | Attest monitoring thresholds / Q4 model inventory | Missing | No attestation objects | Head, Approver |
| H1 | PII reviews assigned to me | Missing | Data.tsx shows queue counts only, no personal assignment | Foundation |
| H1 | Unregistered usage to register (grace day count, enforcement pending Risk) | Partial | workspaces/ops/Usage.tsx has the grace policy; not surfaced on Head home, no Risk concurrence | Ops (surface to Head) |
| H1 | Jira tasks on home | Moved on purpose | Cortex (TL-017) | Cortex |
| v6-Main | Evaluation runs today: missed gates, scoring now with ETA, grouped by daily scoring / regression suites / practice | Partial | workspaces/foundation/Evaluation.tsx lists Official and Practice runs; no daily regression suites, no "missed gates" grouping, no scoring-now ETA | Foundation (summary to Head) |
| v6-Main | What the agents did: actions per agent, open proposals, 30-day acceptance rate, pause an agent with reason | Missing | Agents appear only as AgentNote/AgentBrief inside pages | Ops (summary to Head) |
| v6-Main | Every number carries an (i) source and as-of popover | Partial | Charts carry `source`; DataTable columns have `info`; tiles and figures mostly lack it | Shell |
| H2 Home-FoundationDev | KPI tiles: runs in flight, overnight findings, data reviews due, self-healing marks over 14 days | Partial | homes/Foundation.tsx shows next step, one training run's steps, practice run, official runs, models to watch; no overnight findings, reviews due or mark ageing | Foundation |
| H2 | Runs in flight table across the cluster, filter All / Mine / Started from Relay, with stage, progress, cost against estimate, signal | Partial | Training.tsx shows run cards (state, checkpoints); no progress %, cost, Relay origin or filter | Foundation |
| H2 | Engineering view: GPUs, utilisation, step time, tokens/s, MFU, last checkpoint per run | Missing | Loss curve and metrics "not measured in this prototype" | Foundation |
| H2 | Overnight findings from agents with Accept / Reject with reason (SRE retrain proposal, node drained, eval agent info) | Missing | No overnight feed; only the improve plan hold-to-approve | Foundation |
| H2 | Self-healing marks: new marks, marks escalated at day 14, Decide / Nudge owner | Partial | Data.tsx "Why advisor-notes-v4 exists" shows one gap report; no marks list, escalation or decide action | Foundation |
| H2 | Tagging-pipeline change awaiting data-lead approval | Missing | Data.tsx lists pipelines with approved share only | Foundation |
| H2 | PII review queue claim | Partial | Data.tsx queue counts and masked sample; no claim action | Foundation |
| H2 | Jira tasks | Moved on purpose | Cortex | Cortex |
| H3 Home-AppTeam | Project switcher across my use cases | Partial | Home.tsx lists two use cases (one as member); no switcher | Application team |
| H3 | KPI tiles: runs and jobs today, open alerts, approvals waiting, usage against monthly ceiling with pace | Partial | Home.tsx gives next step only; Journey health tiles give quality/safety/speed/availability; no ceiling or pace | Application team |
| H3 | Runs and jobs today for the project (training, deploy to candidate alias, nightly eval, data job, replay) | Missing | No per-project job list | Application team |
| H3 | Open alerts with acknowledge, why, renotify, Slack/webhook channel | Partial | Performance panel lists alerts with state; no acknowledge, why or channel | Application team |
| H3 | Approvals waiting with SLA (phase request, cohort extension, monitoring attestation) | Partial | Record panel shows approval history; no SLA, no cohort extension, no attestation | Application team |
| H3 | Usage against ceiling and rate limit | Missing | Cost panel shows 30-day spend vs frontier; no ceiling, no rate limit | Application team |
| H4 Home-Validator | Validation queue with gate pillars cleared, due date, state (re-validate, ready, in review, needs Official run) | Partial | Approver Requests/RequestDetail handle stage requests; no validation queue, no re-validation, no base-model validation | Approver |
| H4 | Attestations due (monitoring, judge calibration, Q4 validation) | Missing | None | Approver |
| H4 | Open findings tracked with severity, owner and due date | Missing | One finding (F-0412) shown inside Quality panel; no findings list | Approver |
| H4 | Approvals with SLA and concurrence (cohort extension, exception to keep serving below bar) | Missing | Only approve / send back of a stage request | Approver |
| H4 | Index edition method and data validation | Missing | None | Approver |
| H5 Home-Everyone | Entry actions: Ask ThinkLatent, Log a problem, Try playground, Start a project | Partial | homes/Explore.tsx offers catalogue, playground, start a project; Ask and Log a problem are /soon | Explore |
| H5 | Playground without a project (shared sandbox pool) | Partial | workspaces/approver/Playground.tsx works without a request, Enterprise-hosted models only; no agents, no sessions kept | Explore |
| H5 | Catalogue highlights with score, cost per task, p95 latency, Try / Open, incl. an adoptable agent | Partial | pages/Models.tsx shows score and cost per 1,000 tasks; no latency, no agents, no Try | Explore |
| H5 | Using AI at the Enterprise (approved tools list, firm AI training links) | Missing | None | Explore |
| H5 | What's new: releases, Index changes, corrections, portal changes | Missing | None | Explore (Shell) |
| H5 | Was this helpful? feedback on the home | Missing | None | Shell |
| H5 | First-visit empty state with three steps | Partial | Explore home is effectively the three doors; no state change after first use | Explore |
| S1 Settings | Profile with roles and projects from access management | Missing | /soon/Settings | Shell |
| S1 | Defaults: theme, density, engineering view | Partial | Dark mode toggle only (session.tsx); no density, no engineering view | Shell |
| S1 | Notification matrix (what x portal/email/Slack x frequency), test send | Missing | None | Shell |
| S1 | Quiet hours, time zone, out of office | Missing | None | Shell |
| S1 | My open access requests (break-glass, project membership, model access) with withdraw | Partial | Audit.tsx can request break-glass; no list of own requests, no membership or model-access requests | Shell |
| S1 | Data and privacy: what the portal records about me, download, retention | Missing | None | Shell |
| X1 Ask ThinkLatent | Chat with modes (ask anything, the index, a model, deeper research) and answer depth | Missing | /soon/Ask | Shell (Ask) |
| X1 | Conversation history logged to records, saved and shared prompts | Missing | None | Shell (Ask) |
| X1 | Answers with sourced chart, confidence, "Save to a page", "Use in UA-xxxx" | Missing | None | Shell (Ask) |
| X1 | Starter prompts (explain a score, compare models, draft an approval note) | Missing | None | Shell (Ask) |
| X2 Inbox | Conversations between owners, ThinkLatent and agents, filter Needs you / Agents | Missing | None | Shell |
| X2 | Agent-drafted replies with tone, edit, regenerate; people send | Missing | None | Shell |
| X2 | Thread context panel (record, score vs bar, quality window, retrain progress, thread summary, suggested replies) | Missing | None | Shell |

## p2 · Models (18 boards; v6-M2-ModelPage from p0 read with M2)

| Board | Feature | Status | Where now / what is missing | Which workspace should own it |
|---|---|---|---|---|
| M1 Catalogue | Adoption tiles: median time to first call, keys still calling after 28 days, teams with a use case, front door against side door | Missing | No adoption measures anywhere | Head (catalogue for Explore) |
| M1 | Generation cards (TLM5 preview, TLM4 serving, TLM3 retiring, TLM2/1 retired) with use cases on each, calls per day, health and trust, what's new | Partial | pages/Models.tsx groups by family (Core/Distil/Domain/external) with a status word; no generations, adoption or health | Explore / Foundation |
| M1 | Register interest / preview access for the next generation | Missing | None | Explore |
| M1 | Retirement calendar: versions leaving in 120 days, dependants, owners notified | Missing | Status "retiring" word only | Foundation |
| M1 | Health and trust per model (regression suite, 30-day uptime, incidents, findings) | Missing | None on the catalogue | Foundation |
| M1-AllModels | Every model incl. open-weight and vendor, with approved usages, use cases, data tiers | Partial | Models.tsx lists TLM and one external model with hosting; no approved usages, use-case counts or data tiers | Explore |
| M1-AllModels | Filter by my data tier (Tier 1/2/3) and by source (TLM / open-weight / vendor) | Partial | Family filter only; Start flow notes vendor models cannot be chosen for boundary data | Explore |
| M1-AllModels | Vendor evidence expired flag (no new use cases) | Missing | None | Foundation |
| M1-AllModels | Cost per 1M tokens and status per model | Partial | Cost per 1,000 tasks shown; no per-token price | Explore |
| M1-AllModels | Select up to three to compare | Missing | No compare on the catalogue (Evaluation compares runs, not models) | Explore |
| M1-AllModels | Index agent recommendations per endpoint (task clusters, cheaper model that clears the cluster, privacy floor) | Missing | None | Application team |
| M1-Asks | Ask for a model (need, data tier), add my ask to an existing request, dedup | Missing | None | Explore |
| M1-Asks | Asks register with decision list, 14-day answer target, planned / declined with reason | Missing | None | Head |
| M1-Asks | Vendor-equivalent cost avoided by model this quarter (Finance method) | Partial | panels/Cost.tsx and head/Portfolio.tsx show avoided cost for one use case vs frontier path; no by-model or portfolio total | Head |
| M1-Compare | Compare up to three models in plain words: what it is, good for, approved usages, pillar quality, cost, TTFT, context, data tiers, where it runs, licence, health, choose it when | Missing | Start flow lists models against one job's bars; no model-to-model comparison | Explore |
| M1-Compare | What each model is approved for (usage x model matrix) | Missing | None | Approver |
| M1-Compare | Share this comparison / try all three in the playground | Missing | Playground compares two, not from a comparison | Explore |
| M2 Model page + v6 | A page per model (header: status, alias, approval, use-with-care tier, try it, use for a new use case) | Missing | No model page; catalogue card is the only view | Explore / Foundation |
| M2 + v6 | Health in parts: regression suite, uptime vs target, incidents, findings (incl. red-team) | Missing | None | Foundation |
| M2 + v6 | Adoption and cost per model (use cases by stage, tasks a weekday, cost vs previous version) | Partial | Cost per 1,000 tasks on the card; no adoption | Foundation |
| M2 + v6 | Pillar profile against bars, against previous versions, radar/table, Phase 2 pillars shown as dash | Partial | workspaces/approver/Evidence.tsx shows every Official run by pillar; not per model, not against prior versions | Foundation / Approver |
| M2 + v6 | Index agent model brief and proposal (adapter for missed common items) with Propose / Schedule review / Dismiss | Missing | None | Foundation |
| M2 + v6 | Facts: base and method, size, modalities, context window, licence, data tiers, service levels, energy | Partial | Size and precision on the catalogue card; nothing else | Explore |
| M2 + v6 | Owner, approver, serving contacts; models built on it | Missing | None | Explore |
| M2 + v6 | Use cases on this model with phase, hosting tier, TTFT target, quality | Missing | ops/Usage.tsx inventory shows model per use case (the reverse view) | Foundation |
| M2 + v6 | Conversations about this model; message owner | Missing | None | Explore |
| M2-Evidence + v6 | Releases over time (composite, eval pass rate, regression, cost, findings at release) | Missing | None | Foundation |
| M2-Evidence | Thinnest margin over a bar / watch | Partial | Evidence.tsx "Cleared, thin" status per use case; not per model | Approver |
| M2-HowToCall + v6 | How to call through Relay: alias vs pinned version, five required tags, outcome and feedback calls, Python and curl | Partial | flows/FirstCall.tsx has one Python snippet with alias; no tags, outcome or feedback, no curl | Application team |
| M2-HowToCall + v6 | Telemetry contract health tiles: calls with all tags, with outcome, with feedback, time to first call | Missing | None | Ops |
| M2-HowToCall + v6 | Migration guides: from a vendor API, from the previous version; differences to expect | Missing | None | Application team |
| M2-Serving + v6 | Serving KPIs per model: calls/day, TTFT p95, error rate, goodput | Partial | panels/Performance.tsx gives these per use case, not per model | Foundation |
| M2-Serving + v6 | Token-shape heatmap with layers (quality, cost, latency, suitability, Enterprise volume) | Missing | None | Foundation |
| M2-Serving + v6 | Effective context and context-rot curve | Missing | None | Foundation |
| M2-Serving + v6 | Serving settings by outcome (precision high/medium/low: accuracy deltas, cost, latency, tokens/s, recommended) | Missing | Precision shown as a word on the card | Foundation |
| M3 Catalogue card | Model card with per-field owner and last-reviewed date; field past 90 days blocks export | Missing | None | Foundation |
| M3 | Model-card agent drafts fields, a person owns each | Missing | None | Foundation |
| M3 | Intended use / not for / languages / limits and known issues / fairness slice | Missing | None | Explore |
| M3 | Service levels by hosting tier; how to get access | Partial | Start flow lists sandbox / pilot / production hosting; no service levels | Explore |
| M3 | Data boundary described by class (trained on, excluded, residency) | Missing | None | Explore |
| M3 | Card changelog and export-to-site history (PDF) | Missing | None | Foundation |
| M4 Release bundle | Release notes per version with dated changes and what needs a template change | Missing | None | Foundation |
| M4 | Lineage card (built from, replaced, built on it, agents running on it) | Missing | None | Explore |
| M4-Evidence | Evaluation summary that cleared the release, vs previous | Partial | Evaluation.tsx compare-two-runs forest plot covers a pair; not tied to a release | Foundation |
| M4-Evidence | Code and package (repository tag, training run, package, endpoint build, templates, demo preset) | Missing | None (engineering view) | Foundation |
| M4-Migration | Migration notes for dependants with owner tasks | Missing | None | Application team |
| M4-Migration | Candidate gated: cannot mark current without an Official run; request Official run | Partial | Practice-vs-Official rule is explained throughout; no "mark current" gate or request-Official action | Foundation |
| M5 Lineage | Lineage graph Base → Core → Distil → Domain → adapters, status, deployed count, agents on each node | Missing | /soon/Lineage | Explore (all) |
| M5 | Where each branch is going (branch end, replacement, build from next) | Missing | None | Foundation |
| M5 | Export static lineage image for the site | Missing | None | Foundation |
| M5-Generations | Generation-to-generation comparison (pillars, pass rate, context, cost, TTFT, use cases) | Missing | None | Head / Foundation |
| M5-Generations | Evidence over time (every Core release composite, next generation target quarter) | Missing | None | Head |
| M6 Registry | Registry table of every version (kind, built from, training run, Official run, pillar scores, bars, cost, serving alias), filters, select two to compare, CSV | Partial | Models.tsx cards; Evaluation.tsx runs table; no registry with lineage fields, filters or compare | Foundation |
| M6 | Registry reconciliation with gateway; endpoints not in the registry | Partial | ops/Usage.tsx lists unregistered callers; no registry reconciliation | Ops |
| M6 | What the registry stores and Registry API snippet | Missing | None | Foundation |
| M6-Serving | Serving settings per endpoint (precision, adapters per replica, speculative decoding, replicas, build, TTFT, tokens/s, cost) | Missing | None | Foundation |
| M6-Serving | Propose a setting change; setting change log with approver and evidence | Missing | None | Foundation |
| M6-Vendor | Open-weight and vendor models scored on the same pillars, licence, owner | Partial | One external model on the catalogue; no open-weight list, no licence | Foundation |
| M6-Vendor | Evidence expiry rule (90 days for vendor) and scheduled re-runs | Missing | None | Foundation |
| M7 Lifecycle | Lifecycle state track per version (candidate → evaluated → approved pilot → production → serving → deprecated → retired) | Missing | Status word only | Foundation |
| M7 | Set retirement date (Head only, 60-day minimum) opening tasks on dependants | Missing | None | Head |
| M7 | Dependants list with notification and migration-task state; notify dependants | Missing | None | Foundation |
| M7 | Lifecycle activity log (who changed state, evidence) | Partial | ops/Audit.tsx has a trail incl. model changes; not per model | Ops |

## p3 · Projects (17 boards; v6-J0, v6-J1, v6-J2, v6-J10 from p0/pb2 read with them)

| Board | Feature | Status | Where now / what is missing | Which workspace should own it |
|---|---|---|---|---|
| J0 + v6 Start a project | Four-step guided start, Onboarding agent drafts, person confirms | Present | flows/Start.tsx (job and data boundary, model and hosting, members and owner, review) | Application team / Explore |
| J0 + v6 | Started from a "Bring us a problem" request, keeping its intake-queue place | Missing | Start flow begins from a pre-filled job; no request origin or queue | Application team |
| J0 + v6 | Start fresh or from an existing use case or library agent (copies routing, eval set, budget, approval template) | Missing | None | Application team |
| J0 + v6 | Intake fields: business line, sensitivity tier, volume, latency need, labels, vendor already in use | Partial | Job and data boundary only | Application team |
| J0 + v6 | Accept all / clear drafts; per-answer "Drafted · check" marks | Partial | One AgentNote with confidence and a single "I have checked" box | Application team |
| J0 + v6 | Duplicate check: similar use cases and agents with overlap %, add as use case there / reuse eval items / add as a step | Missing | None | Application team |
| J0-Model + v6 | Recommended model: smallest that clears every live bar the job needs, pillar-by-pillar with why each pillar matters, Phase 2 pillars as dash | Present | Start.tsx step 2 lists candidates with each pillar bar and status, recommends the closest | Application team |
| J0-Model + v6 | Monthly cost in production for each choice beside the vendor path, POC per-token estimate | Partial | Cost per 1,000 tasks shown; monthly cost "not measured yet" | Application team |
| J0-Model + v6 | Hosting tiers with published service levels (sandbox, shared 99.5%, dedicated 99.9%) | Partial | Start.tsx details: sandbox now, pilot, production; no service levels or ceilings | Application team |
| J0-Good + v6 | What good looks like: rubric with weights, musts, must-nots, thresholds (target / warning / critical), versioned requirements | Missing | flows/DataEvaluate.tsx confirms bars only | Application team |
| J0-Good + v6 | What the scorer runs on every request (judge calibration need, rule checks, paging on must-not violation) | Missing | None | Application team |
| J0-Sandbox + v6 | POC record saved with owner, requirements, model | Partial | Start flow "Project created" done state; no record id or requirements | Application team |
| J0-Sandbox + v6 | Standing sandbox approval issues key at once (no wait) | Present | flows/FirstCall.tsx creates a sandbox key | Application team |
| J0-Sandbox + v6 | Six required tags fixed on the key and in the snippet | Missing | Snippet has project and model only | Application team |
| J0-Sandbox + v6 | Time to first successful call clock with target | Missing | None | Application team |
| J0-Sandbox + v6 | Intake queue: my place, priority, next review; others by type only | Missing | None | Application team (Head runs the review) |
| J0 v6 | What happens after you submit (first call, intake review, production gate) | Partial | Start done state names the next step only | Application team |
| J1 + v6 Projects | Projects list with phase, health (production only), owner, business line, alerts; All / Mine / Production / Alerts | Partial | workspaces/ops/Usage.tsx inventory and head/Portfolio.tsx use-case list; no health, alerts, Mine filter; app home shows only own use cases | Head (and Application team for Mine) |
| J1 | Headline tiles: projects by phase, use cases in production, adopted teams, intake queue size | Partial | head/Portfolio.tsx by-stage chart; no adopted teams or intake | Head |
| J1 | Intake queue across the Enterprise with place, type, status, priority, waiting days; Bring us a problem | Missing | None | Head |
| J1 | Public live view of the portal's own use case (UC-0001) linked from the list | Missing | None (see J12) | Explore |
| v6-J1 | Why nothing is in Production: the Safety floor, best Official runs, next evidence | Present | head/Portfolio.tsx "The Safety floor" and homes/Head.tsx "In Production" | Head |
| v6-J1 | Portfolio agent recommendation on the order of resubmissions | Missing | None | Head |
| v6-J1 | Held-by-the-floor items with reply to owner | Partial | Portfolio.tsx lists "still held by the floor"; no reply | Head |
| J1-Portfolio + v6 | Use-case portfolio table: model, stage, tokens/min, 30-day SLO, cost per 1k, quality, loop state, approval state, review days; filters; CSV | Partial | Usage.tsx inventory has stage, model, owner, tasks a weekday; Portfolio.tsx adds blocker; no SLO, cost, quality, loop state, filters or export | Head |
| J1-Portfolio + v6 | Portfolio evidence: each use case's model on its own bars (bars cleared, safety, cost per 1,000) | Present | workspaces/approver/Evidence.tsx "Which models clear what" per use case | Approver (and Head) |
| J1-Portfolio | Waiting for a decision, oldest first, with review days against a 5-day target | Partial | head/Decisions.tsx waiting list; no review-day target or non-request approvals | Head |
| v6-J1 | Approvals log across the portfolio (scope, run, outcome) | Present | Decisions.tsx and approver/Requests.tsx "Already decided" | Head / Approver |
| J1-Adoption + v6 | Adoption north star (adopted teams), returning users, power / habitual / novice by business line | Missing | None | Head |
| J1-Adoption | Path to adoption funnel (discover → sandbox → key → first call → production → retained) | Missing | None | Head |
| J1-Adoption + v6 | Stalled teams after 10 days, champions, pair with a champion, nudge, office hours, unanswered questions | Missing | None | Head |
| J1-Value + v6 | Value ledger per use case: cost to run, vendor-equivalent, avoided, hours saved declared and attested, before-and-after measure | Partial | Cost panel and Portfolio value show paid / frontier path / avoided for UC-0291 only; no hours, no before-and-after, no other use cases | Head |
| J1-Value | Owner attestation of value overdue, remind owner | Missing | None | Head |
| J1-Value + v6 | Monthly statements for Finance (issued, restated, PDF/CSV, method version) | Missing | None | Head (Ops) |
| J2 + v6 Project home | Project header with request next phase gated by named reasons | Partial | Journey checklist "To reach X" with blocking items and request-stage flow; no project level above the use case | Application team |
| J2 + v6 | Tiles: phase since, quality vs bar, spend against ceiling with forecast, intake position | Partial | Journey health tiles (quality, safety, speed, availability); no ceiling, forecast or intake | Application team |
| J2 + v6 | Phase stepper with each gate's checks and current values (POC, Active build, Pilot, Production, Under review, Decommissioned) | Partial | Journey Steps tracker and checklist per stage; no Under review / Decommissioned, no review cadence | Application team |
| J2 + v6 | Readiness summary drafted, review and sign | Missing | None | Application team |
| J2 + v6 | Under review rules and review cadence by risk tier; draft a decommission plan | Missing | None | Application team / Approver |
| v6-J2 | Needs a decision on the project (critical finding, exit gate, spend, access, attestation, untagged calls) with ways to close the finding | Partial | Journey checklist; Improve flow for findings; no access, attestation or tag items | Application team |
| J2 + v6 | Use cases, runs, data sets the project owns; first traced call | Partial | Journey "What has happened" timeline; no first-call trace or owned objects list | Application team |
| J2-Members + v6 | Members with role, what the role can do, data access; change role | Partial | Start.tsx adds members with Engineer / Reviewer / Viewer; no capabilities table, no data access, no change role after start | Application team |
| J2-Members + v6 | Requests to join and access requests (owner + data owner), approve / decline with reason, reminders, median time to decide | Missing | None | Application team |
| J2-Attest + v6 | Attestations with cadence, who, due, state; overdue opens a finding; attest action | Partial | Record panel "Owner and reviews" shows review dates from the checklist; no attestations | Application team |
| J2-Attest + v6 | Open approvals and booked reviews (security review, data release, scheduled review); export audit pack | Partial | Record panel approval history; no booked reviews or audit pack | Application team |
| J2-Keys + v6 | Keys on the project with required tags, last used, calls 7 d, untagged grace | Partial | ops/Usage.tsx keys per use case (count, last rotated); no tags or per-key calls | Application team |
| J2-Keys + v6 | Production endpoint and service level; first and latest traced calls (sandbox open, production sealed) | Missing | None | Application team |
| J10 + v6 Usage | Spend this month against team / use-case ceiling, month-end forecast, tokens by day against ceiling pace | Missing | Cost panel is 30-day spend vs frontier only | Application team (Ops for all teams) |
| J10 + v6 | Spend by use case: requests, tokens, cost, ceiling used, rpm/tpm peak vs limit, rate-limit hits, approval | Missing | None | Application team |
| J10 | Filters: team, project, window, environment | Missing | None | Ops |
| J10-Keys + v6 | Key register: masked key, six tags, environment, created, last used, calls, expiry, rotate, fix tags, new sandbox key | Partial | Usage.tsx keys per use case (environment, count, last rotated); FirstCall creates one key; no tags, rotate or fix | Application team / Ops |
| J10-Keys + v6 | Calls missing a required tag under the grace policy (day 7 notice, day 14 header, day 30 enforcement pending Risk) | Partial | Usage.tsx grace policy for callers with no record (0/14/30); not for untagged calls on registered keys | Ops |
| J10-Limits + v6 | Limits beside the hourly peak with headroom | Missing | None | Application team |
| J10-Limits + v6 | Request a temporary increase (named approver, at most 30 days, auto-revert), decide / withdraw | Missing | None | Application team (Head decides) |
| J10-Limits + v6 | Rate-limited requests log per hour (retries, waits) | Missing | None | Ops |
| J10-Showback + v6 | Showback by business line (dedicated share, shared serving, vendor-equivalent, avoided) and how cost is counted | Partial | Cost panel explains paid = serving + endpoint share for one use case | Ops / Head |
| J10-Showback + v6 | Monthly statements for Finance with method version and restatements | Missing | None | Ops |
| v6-J10 | First call guide (key, snippet, see it land) with time-to-first-call against target and contract health | Partial | flows/FirstCall.tsx (key, snippet, test request); no tags, timing or trace link | Application team |
| J12 Live view | Public live view of UC-0001 for all staff: questions today vs last week, answered without expert, helpful, time to answer | Missing | None | Explore |
| J12 | Service level and evidence (availability, citations, Official run scores, cost per 1,000) on the public view | Missing | None | Explore |
| J12 | What people ask this week (topics, counted never shown) | Missing | None | Explore |

## p4 · Use case: running (17 boards; v6-J3, v6-J4, v6-J5, v6-J6, v6-J11 read with them)

| Board | Feature | Status | Where now / what is missing | Which workspace should own it |
|---|---|---|---|---|
| J3 + v6 Overview | Use-case header: stage, alias and canary split, open alerts, owner, one-line job | Partial | pages/Journey.tsx header (id, business line, owner, stage, standing); no alias/canary or alert count in the header | Application team |
| J3 + v6 | Window switch (live / 24 h / 7 d / 30 d) with compare to previous period | Missing | Story day only; no window or comparison | Application team |
| J3 + v6 | KPI tiles: quality vs bar, tasks a weekday, TTFT p95, cost per 1,000 tasks, each against the previous period | Partial | Journey "How it is doing": quality, safety, TTFT, availability; no cost or traffic tile, no previous-period delta | Application team |
| v6-J3 | Quality and traffic daily chart against the previous week | Partial | Quality panel daily chart and Performance tasks-by-day; no previous-week overlay | Application team |
| J3 + v6 | "What the portal noticed": agent findings with basis, confidence, actions (train a specialist, see failing cluster, propose max_tokens, open canary judgement, remind me, dismiss with log) | Partial | Improve flow presents the self-healing plan for the two findings; no notices feed, no dismiss log, no max_tokens or canary-judgement notices | Application team |
| v6-J3 | Critical finding card with ways to close it (promote v3, train a specialist, review long threads) | Partial | flows/Improve.tsx "What failed" and plan; only one route (retrain + canary + Official run) | Application team |
| J3 | Tokens over the window (input/output, cached share, per request, by alias, largest task) | Missing | None | Application team |
| J3 | Pages for this use case, one question each | Present | Journey "Look closer" panels with blurbs | Application team |
| J3-Adoption + v6 | Active users by level (power / habitual / novice / not active) in the pilot cohort, returning users | Missing | None | Application team |
| J3-Adoption + v6 | Teams in the pilot with adopted / not yet, walkthrough offer | Missing | None | Application team |
| J3-Outcomes + v6 | Specialist uplift: outcome events from business systems, engaged vs passive advisors | Missing | None | Application team (Head) |
| J3-Outcomes + v6 | Where outcome events come from (join coverage), automation rate | Missing | None | Application team |
| J3-Outcomes + v6 | Cost avoided with Finance method | Present | panels/Cost.tsx paid / frontier path / avoided with method | Application team |
| J3-Tasks + v6 | Each task against its own bar, smallest model that clears it, saving if right-sized | Missing | None | Application team |
| J3-Tasks + v6 | Right-sizing proposal (route tasks to a smaller model) with regression gate on the task slice | Missing | None | Application team |
| J3-Tasks + v6 | Tokens by task against previous window | Missing | None | Application team |
| v6-J3 | Alerts tab: open alerts with acknowledge, why, escalation timing, digest link | Partial | Performance panel lists alerts and states; no acknowledge, escalation or digest | Application team |
| J4 + v6 Traffic | Serving SLO summary (TTFT p95, error rate, availability) for 30 days, met / not met | Present | panels/Performance.tsx figures with limits | Application team |
| v6-J4 | Latency against the SLO daily p50/p95 chart with table twin | Present | Performance.tsx LineChart p95 and p50 with limit | Application team |
| v6-J4 | SLO table: target, 30-day value, worst day, days over, availability budget used / left | Partial | Figures and limits shown; no worst day, days over or error budget | Application team |
| v6-J4 | Incident timeline with impact; postmortem drafted by SRE agent, owner signs to close | Partial | ops/Alerts.tsx incident timeline (fired, cause, resolved, after); no postmortem or sign-off | Ops (owner signs) |
| v6-J4 | Traffic by day and error rate by day | Present | Performance.tsx "Traffic and errors by day" | Application team |
| v6-J4 | Availability by day | Present | Performance.tsx CalendarHeatmap | Application team |
| v6-J4 | Alerts in the window with linked incident or finding | Present | Performance.tsx incident and alerts list | Application team |
| v6-J4 | Serving detail: by week, pinned serving setting, endpoint, build, gateway rule | Missing | None (engineering view) | Foundation / Ops |
| J4 | Input x output length matrix with metric switch (share, TTFT, decode, completion) | Missing | None (v6 marks it "not in this export") | Ops (engineering) |
| J4 | Busiest shapes with all four metrics | Missing | None | Ops (engineering) |
| J4 + J4-Latency | Requests, input and output tokens, sessions per day | Partial | Tasks per day only | Application team |
| J4-Latency | TTFT decomposed (queue, prefill, transfer) by input length; ITL, TPOT, stalls by prompt length | Missing | None | Ops (engineering) |
| J4-Errors | Rejected at the gateway by hour (queue full), retries | Missing | None | Ops |
| J4-Errors | Finish reasons (stop, length, abort, error, timeout) with record limits; propose max_tokens change | Missing | None (v6 asks the SRE agent to add finish reasons) | Application team |
| J4-Engineering | Engine telemetry: speculative acceptance by draft position, batch tokens, chunked prefill, adapter wait, rescued requests | Missing | None | Foundation (engineering) |
| J5 + v6 Capacity | GPU use mean and peak against the scale-out line, days over, cache hits, spend | Present | workspaces/ops/Capacity.tsx (meter, figures, AreaChart, cache chart); not on the use-case page | Ops (also Application team) |
| v6-J5 | SRE agent scale-out proposal, owner approves, reversible | Present | Capacity.tsx AgentBrief with HoldToConfirm (approved by Ops, board has the owner approve) | Ops / Application team |
| v6-J5 | Peaks by week table | Missing | Daily chart only | Ops |
| v6-J5 | Endpoint and hosting options (always on, scale out, shared adapter) with when allowed | Missing | None | Application team |
| v6-J5 | Capacity detail, last 7 days by day | Partial | Daily chart covers it; no table | Ops |
| J5 | Goodput, multiwindow error-budget burn, headroom forecast in days | Missing | None | Ops |
| J5 | Saturation strip (running vs waiting, KV cache, preemptions, queue p99) with thresholds | Missing | None | Ops (engineering) |
| J5 | Capacity line and request more capacity | Partial | Scale-out proposal stands in for it | Ops |
| J5-Cache | Cache by session depth, TTFT on hit vs miss, stickiness, GPU-seconds saved, inter-turn gap vs eviction | Missing | Cache hit share only | Ops (engineering) |
| J5-Engineering | Throughput vs interactivity sweep with operating point and SLO line | Missing | None | Foundation (engineering) |
| J5-Nodes | Dedicated node utilisation by hour, idle-allocated share, overnight one-node proposal, hosting cost options | Missing | None | Ops |
| J6 + v6 Models | Aliases (prod, canary, candidate, previous, fallback) with model, traffic share, prompt version, max_tokens, fallback slot and uses | Partial | panels/ModelsCanary.tsx "Serving now" names serving model, canary share and roll-back target; no alias table, prompts or fallback | Application team |
| J6 + v6 | Stepped rollout: shadow, 5%, 10/50%, promote; current step and next | Partial | ModelsCanary canary 5% → 10% → closed by date; no shadow step shown | Application team |
| J6 + v6 | Canary judgement table: each metric prod vs canary, paired difference, p value, critical flag, judgement | Missing | ModelsCanary shows a pillar forest plot, not the traffic metrics judgement | Application team |
| J6 + v6 | Sample sufficiency for the judgement | Missing | None | Application team |
| J6 + v6 | Composite score with weights from the record | Missing | None | Application team |
| J6 + v6 | Promote canary (hold), gated with named reasons; remind me Friday | Missing | No promote action (roll back only) | Application team |
| J6 + v6 | Roll back to previous, no approval, about 40 s | Present | ModelsCanary HoldToConfirm "Hold to roll back" / "stop the canary" | Application team |
| J6 + v6 | Fallback alias points at a retiring model, update the record | Missing | None | Application team |
| J6-Gate + v6 | Regression gate table: always-gated pillars plus the workflow's, before/after, bar, pass/fail; download PDF for Risk | Partial | RequestDetail.tsx forest plot "no pillar may get worse" and checks list; ModelsCanary forest plot; no gate verdict table or PDF | Application team / Approver |
| J6-Gate + v6 | Evaluation agent diagnosis of a gate fail with proposed data fix | Missing | None | Application team |
| J6-Routing | Route by task: gateway orchestration rules, propose a rule change, shadow first, serving config YAML | Missing | None | Application team |
| J6-Shapes | Shapes by model: length matrix small multiples per alias; canary difference by input length | Missing | None (v6 keeps "by input length" as a line) | Application team (engineering) |
| J11 + v6 Traces | Pilot / build / integration traces table with masked text, filters (errors, slow, env, task), checks | Missing | /soon/Traces | Application team (engineering) |
| J11 + v6 | Single trace waterfall (gateway, checks, engine spans), tags, Sensitive switch for masked text | Missing | None | Application team (engineering) |
| J11 + v6 | Production traces sealed, aggregates only | Moved on purpose | Production traces sealed (prototype says so in Quality and Audit) | n/a |
| v6-J11 | Who sees what by environment | Missing | None | Application team |
| v6-J11 | Break-glass request from the traces page (1 hour, second approver, logged) | Partial | ops/Audit.tsx break-glass request and explanation | Ops |
| v6-J11 | Access log of every trace opened | Missing | Audit trail has no trace-open events | Ops |
| J11 | Agent note on a trace (e.g. first call of a new task needs a task rule and bar) | Missing | None | Application team |

## p5 · Use case: quality and record (12 boards; v6-J7, v6-J8, v6-J9 read with them)

| Board | Feature | Status | Where now / what is missing | Which workspace should own it |
|---|---|---|---|---|
| v6-J7 Quality | Quality, Safety and grounding, consistency tiles against bars and floor | Present | Journey health tiles and panels/Quality.tsx checks table | Application team |
| v6-J7 | Daily quality in production (judged), with bar and floor, table twin | Present | Quality.tsx LineChart quality + safety with thresholds | Application team |
| v6-J7 | Production against the Official run (two reads agree) | Partial | Quality.tsx caption says the sample and the run agree; no side-by-side table | Application team |
| v6-J7 | How production is judged: sample, judge, person grades 25%, κ agreement band | Present | Quality.tsx "How quality is judged" facts with κ | Application team |
| v6-J7 | Open finding with what holds Production and closing rule | Present | Quality.tsx finding; RequestStage blockers; Improve flow | Application team |
| v6-J7 | Where Safety falls short: pillar line items on the Official run vs Practice checkpoint | Partial | Evaluation.tsx line items per run (Foundation); not on the use case | Application team |
| v6-J7 + J7-Review | Review queue (daily person-graded quarter, oversampled long threads, escalation) with claim | Partial | Data.tsx review queue counts (waiting / claimed / done); no queues by reason, no claim | Application team / Foundation |
| J7 + v6 | Advisor signals: acceptance (used / edited / discarded), feedback score and reasons, persistence, implicit signals (copy, retry, regenerate, edit distance) | Missing | None (v6 shows "not counted in this window") | Application team |
| J7 | Where the signals come from: calling apps, outcome and feedback event coverage, missing app; copy the two calls | Missing | None | Application team |
| J7 | Checks run on every response (PII, compliance, toxicity holds) | Missing | None | Application team |
| J7-Analysis | Poor interactions by root cause and cluster, with summary check, tier gate, proposed fix | Missing | None | Application team |
| J7-Analysis | Drift watch: input PSI, language, speakers, output length, embedding drift, auto band vs fixed thresholds | Missing | None | Application team / Ops |
| J7-Analysis + J8-Release | Post-release re-score against the foundation model weekly (gap, warning opens gap report, critical proposes roll back) | Missing | None | Foundation |
| J7-Review | Annotation: rubric dimensions with mean, low share, reason, blind second-reviewer κ | Missing | None | Application team |
| J7-Review | Corrections saved as expected outputs and training data, queue into eval set for validator | Missing | None | Application team / Approver |
| J7-Review | Reusable evaluators built from reviews (in use / to sign) | Missing | None | Approver |
| J7-Review | Judge calibration per judge (κ, recall per class, below-floor greyed, not citable) | Partial | Quality.tsx one κ for the judge; no per-judge, no greying | Approver |
| J7-Review | Judge bias checks (length, position, self-preference) and slices where judge and humans disagree | Missing | None | Approver |
| J7-Tasks | Tasks mined behind the model (share, shape, used as written, judge score, trend), Specialise | Missing | None | Application team |
| J7-Tasks | Any number split by task | Missing | None | Application team |
| J7-Tasks | Topic clusters inside tasks with privacy floor | Missing | None | Application team |
| J8 + v6 Improve | Improve loop timeline from finding to resubmission, with who decides and state | Present | panels/ImprovePlan.tsx timeline chart and steps; flows/Improve.tsx progress | Application team |
| J8 | Eight-stage loop (capture, gap, data set, train, evaluate, canary, promote, watch) with approval per stage | Partial | ImprovePlan's five work stretches; no per-stage approver | Application team |
| J8 + v6 | Approve proposals in the loop (start Official run, schedule step, canary plan, candidate gate) | Partial | flows/Improve.tsx one "Approve the plan" hold | Application team |
| v6-J8 | Checkpoint vs incumbent paired comparison (Practice, never citable) with line items to watch | Present | ModelsCanary forest plot of Practice run vs incumbent; Evaluation.tsx compare and line items | Application team / Foundation |
| v6-J8 | Self-healing gap report table (gap, measure, now, bar, fix, state) | Partial | Data.tsx "Why advisor-notes-v4 exists" gap report card; Improve flow names the finding | Application team / Foundation |
| v6-J8 | Training run for the fix with checkpoints scored as Practice / Official | Present | workspaces/foundation/Training.tsx run card with checkpoints | Foundation |
| J8 + v6 | Release plan / ramp and migration: canary steps, candidate, hold, promote, v2 on previous 30 days, retire; who decides; earliest | Partial | ModelsCanary and ImprovePlan dates; no "previous 30 days then retire" or per-step gate | Application team |
| J8 + v6 | What the canary must show (consistency, TTFT, errors, availability) | Partial | Improve flow "What to watch" lists the canary and consistency | Application team |
| J8 + v6 | One-way doors: hold to promote (gated), hold to roll back | Partial | Roll back hold present; promote absent | Application team |
| J8 | Loops by task (specialist loops, started from Quality) | Missing | None | Application team |
| J8-Data | Data accumulation toward the next specialist (samples vs target, eval threads vs interval, days to target) | Missing | None | Application team |
| J8-Data | Eligible share funnel (consent, tier, PII, quality filters) and sample sources | Missing | None | Foundation |
| J8-Data | Side-by-side preferences: in-app pairs and rater pairs, Bradley-Terry | Missing | None | Application team |
| J8-Specialist | Specialist pass targets (match quality, beat latency and cost), distillation recipe, teacher comparison | Missing | None | Foundation |
| J8-Release + v6 | Endpoint builds by alias; a new build is a new usage needing approval | Missing | None | Foundation (engineering) |
| J9 + v6 Record | Bars on the record against the Official run with base comparison, who set each bar | Present | panels/Record.tsx bars table (set by record / policy floor / gate only); RequestDetail checks with bar source | Application team |
| J9 + v6 | Risk tier (computed, override) and sensitivity tier on the record | Missing | None | Application team / Approver |
| J9 | Governance steps (intake, risk review, evaluation, human review, monitoring) | Missing | None | Approver |
| J9 + v6 | Lifecycle with Under review / Decommissioned and review cadence by risk tier | Missing | None | Approver |
| J9 + v6 | Findings register with severity, owner, due, state (incl. closed) | Partial | One finding at a time in Quality / Improve; no register | Application team |
| J9 + v6 | Record completeness (12 parts, who keeps each) | Missing | None | Approver |
| v6-J9 | Needs a decision on the record: book the resubmission, cohort extension (hold to approve) with Governance agent plan | Partial | RequestStage flow sends a resubmission on the right day; no booking, no cohort extension | Application team / Head |
| J9-Evidence + v6 | Validation components (conceptual soundness, outcomes analysis, ongoing monitoring) with sign-offs | Missing | None | Approver |
| J9-Evidence + v6 | Evidence list: Official runs, Practice (not citable), production sample, outside-the-portal study, withdrawn data flags | Partial | Evidence.tsx official and practice runs; no outside evidence or withdrawn-data flag | Approver |
| J9-Evidence | Regression gate table with PDF for Risk | Partial | Forest plot on RequestDetail and Record; no table or PDF | Approver |
| J9-Evidence + v6 | Sign-offs: approvals and recurring attestations with attest action | Partial | Record panel approval history; no attestations | Application team |
| J9-Evidence | What each approval covers (model, serving setting, endpoint build, usage) | Missing | None | Approver (engineering) |
| J9-Monitoring + v6 | Monitoring plan: signals, baseline, warning, critical, task owner, now | Missing | Performance/Quality show bars and limits, not a monitoring plan | Application team |
| J9-Monitoring | Limits ledger (budget, rate limit, cohort, capture consent, boundary, retention) | Missing | None | Application team |
| J9-Monitoring | Incident plan with steps and last drill | Missing | None | Ops |
| J9-Monitoring + v6 | Record activity log, every change a dated row with tier; export audit pack | Partial | ops/Audit.tsx global audit trail with kind filter and copy rows; not per record, no pack | Ops / Approver |
| J9-Requirements | Owner requirements versions (rubric, musts, must-nots, thresholds) with scorer results on every request | Missing | None | Application team |
| J9-Requirements | Compare versions; propose v5; validator approves | Missing | None | Application team / Approver |
| J9 | Request a change to the record | Missing | None | Application team |

## p6 · Use case workbench (12 boards; v6-W2 and v6-W3 from pb2 read with them)

| Board | Feature | Status | Where now / what is missing | Which workspace should own it |
|---|---|---|---|---|
| W1 Prompts | Prompt versions per use case, immutable, with commit message, state (draft / canary / prod / previous / retired), traffic, score | Missing | /soon/Prompts | Application team |
| W1 | Compare two versions side by side (text diff, tokens, cacheable prefix, finish reasons, score) | Missing | None | Application team |
| W1 | Propose a version; run Practice on a draft; promote gated on Official score and hygiene | Missing | None | Application team |
| W1 | Registered calls (share carrying a known prompt_id) | Missing | None | Application team |
| W1-Library | Prompt and template library across use cases (owner, pillar, adopters, hygiene), filter, publish a template | Missing | None | Explore / Application team |
| W1-Library | Fork a template into a project, upstream tracking (behind by n versions), compare with upstream | Missing | None | Application team |
| W1-Hygiene | Eight hygiene checks per version (variables declared, no secrets, disclosure, no client ids in examples, static prefix, schema, contradictions, length) | Missing | None | Application team |
| W1-Hygiene | Evaluation agent drafts the fix version | Missing | None | Application team |
| W1-Hygiene | Change alerts (alias moves, check newly fails, unscored serving) and the promotion rule | Missing | None | Application team |
| W1-Rollout | Stepped prompt rollout (5 / 25 / 50 / 100%) with guards at hold and roll-back levels; advance, hold, roll back | Missing | None | Application team |
| W1-Rollout | Cost of a version at 100% (token deltas priced) | Missing | None | Application team |
| W1-Rollout | Rollout history per version | Missing | None | Application team |
| W2 + v6 Data sets | Data-set register: kind, rows, data boundary, retention class, used by, checks, lineage | Partial | workspaces/foundation/Data.tsx dataset versions (id, kind, versioned date, use case, note, runs that use it); no rows, boundary, retention or checks | Foundation (Application team for its own) |
| v6-W2 | Lineage from sources to data set to training run to checkpoints to Official run | Partial | Data.tsx links versions to training runs; Training.tsx links checkpoints to runs | Foundation |
| W2 + v6 | Composition by task against the per-task floor; split | Missing | "Row counts per version: not measured in this prototype" | Foundation |
| v6-W2 | The corrected data for the gap report (gap tags, sources) | Partial | Data.tsx gap report card says the set was corrected; no gap-row breakdown | Foundation |
| W2 + v6 | Schema with roles and masked preview (values never shown) | Present | Data.tsx masked sample row; flows/DataEvaluate.tsx schema table with roles | Foundation / Application team |
| W2 | Training readiness (eligible samples vs target, daily accrual, unlock date) | Missing | None | Foundation |
| W2 + v6 | Queues holding data back (PII review, self-healing marks, corrections, new topics) with service targets | Partial | Data.tsx review queue counts only | Foundation |
| W2 | Export manifest; copy to another project with steward approval | Missing | None | Foundation |
| W2-EvalSets + v6 | Eval set / TL Index edition manifest: items per pillar and line item, interval each supports, bars, judge, attempts, exclusions | Partial | Evaluation.tsx line items per run with item counts; Evidence.tsx clearing rule; no edition manifest | Foundation / Approver |
| v6-W2 | Runs on this edition, including partial runs (vendor items that may not leave, errored items) | Partial | Evaluation.tsx Official and Practice runs; no partial-run notes | Foundation |
| W2-EvalSets | Build the next eval set version (target interval, scope, data from upload / traces / generation, evaluators, validator sign-off) | Missing | None | Approver / Application team |
| W2-EvalSets + v6 | Corrections waiting to enter the eval set (accept / reject with reason); frozen-edition rule queues them to the next edition | Missing | None | Approver |
| W2-EvalSets + v6 | New topics to triage into scope (add / generate edge cases / not in scope) | Missing | None | Application team |
| W2-Generate + v6 | Generated data pipeline: gap report → seed rows → generation → judge → validators; tagged generated for life | Missing | None | Foundation |
| W2-Generate | Checks on generated rows (PII echo, compliance, duplicates, contamination, schema) and agent-proposed edge-case families | Missing | None | Foundation |
| W2-Import + v6 | Bring data in: upload or stage from S3 | Present | flows/DataEvaluate.tsx "Upload a file" / "Stage in S3" | Application team |
| W2-Import + v6 | Staging job status (objects, size, formats, rows) within a minute of each change | Partial | DataEvaluate import status as four done steps; no progress | Application team |
| W2-Import + v6 | Format detection with confidence and role mapping per column; PDF/DOCX chunking | Partial | DataEvaluate illustrative schema with fixed roles; no detection or mapping control | Application team |
| W2-Import + v6 | Split and checks, then approve versioning | Partial | DataEvaluate "Versioned as an evaluation set" as done; no split or approve step | Application team |
| W2-Import + v6 | Rejected rows by check (PII, compliance, duplicates) over 30 days | Missing | None | Foundation |
| W3 + v6 Alerts | Alerts in the window with value, threshold, severity, state, linked incident or finding | Present | workspaces/ops/Alerts.tsx open and resolved, linked items; Performance panel list | Ops / Application team |
| W3 + v6 | Open alert with why, owner, closing rule | Present | Alerts.tsx "Why", "Who owns the next step", "closes when an Official run meets the bar" | Ops |
| W3 + v6 | Acknowledge / acknowledge all; silence renotification until a date | Missing | None | Application team / Ops |
| W3 + v6 | Alert rules from the record (kind, warning / critical, window, route, noise control, no-data behaviour); propose a threshold change | Missing | None | Application team |
| W3-Escalation + v6 | Escalation chain (route, ack, 60-min page, resolve), quiet hours, governance reminders, threshold review flag, seasonal band | Missing | None | Ops |
| W3-Outcomes | Time to acknowledge / resolve, share that led to a change, resolved alerts with outcome | Missing | None | Ops |
| W3-Outcomes | Why? root-cause view for an alert with contributing causes and ruled-out factors | Missing | None | Application team |
| v6-W3 | Incident timeline from alert events | Present | Alerts.tsx incident timeline and TTFT chart around it | Ops |
| W3-Digest + v6 | Weekly digest: numbered decisions, coming up, stale queues, untagged calls, traffic by pattern, quality; subscribers, readership, mute by reply | Missing | None | Application team (Shell for subscription) |

## p7 · Training (13 boards; v6-T1, v6-T2, v6-T6 from p0 read with them)

| Board | Feature | Status | Where now / what is missing | Which workspace should own it |
|---|---|---|---|---|
| T1 + v6 New training run | Guided start of a run on one page | Partial | workspaces/foundation/Training.tsx "Start a retraining run": base model, dataset version, review and hold to start | Foundation |
| T1 + v6 | Start from a base (with live pillar scores and recommendation) or continue from a kept checkpoint | Partial | Base picked from Core/Distil list with family and status only; no scores, recommendation or continue-from-checkpoint | Foundation |
| T1 + v6 | Train as Generate / Extract / Decide | Missing | None | Foundation |
| T1 + v6 | Data set with eligible items after self-healing marks (set aside by reason), split, checks | Partial | Dataset version picker (training versions only, never the eval set); no eligibility or checks | Foundation |
| T1-Recipe + v6 | Recipe: Recommended / saved / custom / upload YAML; frozen at start; changed-field chips | Missing | None | Foundation |
| T1-Recipe | Recipe library with versions and gate results of runs that used each | Missing | None | Foundation |
| T1-Recipe | Metrics sinks (portal, TensorBoard, W&B; scalars only) | Missing | None | Foundation |
| T1 + v6 | Compute, cost and queue: GPU tier, estimate, queue position, project budget, cost cap | Missing | Review step says "Compute and duration: not measured in this prototype" | Foundation |
| T1-DryRun + v6 | Dry run of 60 steps proving recipe, data load, memory, loss, checkpoint round trip, logging, eval hook; refined estimate | Missing | None | Foundation |
| T1 + v6 | Needs a decision before Start (project not set, custom recipe not dry-run, memory tight) | Missing | None | Foundation |
| T1 + v6 | Projected score from a Practice run, marked not citable | Missing | None | Foundation |
| T5 Pre-flight | Pre-flight validation (schema, token count, PII flags to review queue, near-duplicates of the eval set) | Missing | None | Foundation |
| T5 | Estimate against remaining budget, cost cap that pauses and keeps a checkpoint, raise cap asks the owner | Missing | None | Foundation |
| T2 + v6 Runs in flight | Runs in flight with stage tracker (queued, data checks, training, evaluating, gate, done) | Partial | Training.tsx run cards with Running / Finished state and checkpoints; no stage tracker | Foundation |
| T2 + v6 | Status, ETA, step / epoch, validation loss vs best, cost so far vs estimate and cap, GPU utilisation | Missing | Loss curve and metrics "not measured in this prototype" | Foundation |
| T2 + v6 | Training charts (train loss, eval loss, learning rate, grad norm) with range, smoothing, log scale, clip outliers, spike flags | Missing | None | Foundation |
| T2 + v6 | Overfitting alert rule with best checkpoint kept | Missing | None | Foundation |
| T2 + v6 | Stop and keep (ThinkLatent) / cancel (owner) | Missing | None | Foundation |
| T2 + v6 | Runs started from Relay appear with project id | Missing | None | Foundation |
| T2 + v6 | GPU monitor per node (utilisation, VRAM, power, temperature, step time, tokens/s, MFU) | Missing | None | Foundation (engineering) |
| T2-Logs + v6 | Job log live tail with filters (warnings, errors, source), find, follow; warnings explained in plain words | Missing | None | Foundation (engineering) |
| T2-UpNext + v6 | Data toward each next specialist across projects (samples vs target, rate, days, ready) | Missing | None | Foundation |
| T2-UpNext + v6 | Agent proposals: set up a ready run, locate similar data (data owner approves) | Missing | None | Foundation |
| T3 Run history | Every run with recipe, data version, validation, use-case score, gate result and round, checkpoint, origin, logs; filters | Partial | Training.tsx lists runs begun by the story day with checkpoints and scored-as runs; no recipe, gate round, origin or filters | Foundation |
| T3 | Tiles: runs this quarter, gate pass rate, rounds to pass, spent vs estimated, started from Relay | Missing | None | Foundation |
| T3 | Compare two runs | Partial | Evaluation.tsx compares two scored runs (not training runs) | Foundation |
| T3 | Re-run; re-export weights to the registry only (adapter or merged), with reason | Missing | None | Foundation |
| T3 | Withdrawn-data flag on runs trained on withdrawn sets | Missing | None | Foundation |
| T4 Base models | Selectable bases by pipeline status, licence, size, recommended train-as, weakest live pillar | Partial | StartRun lists Core and Distil models only | Foundation |
| T4 | Which base for which job: pillar scores of every base | Partial | Evidence.tsx has every Official run by pillar (not framed as bases) | Foundation |
| T4 | Add a base to the pipeline (import, validation, Official run, finalised) | Missing | None | Foundation |
| T4-NewBase | New base retraining plan (derived models in order, owners, estimates, gates), approve / approve partly / decline with reason | Missing | None | Head (Foundation drafts) |
| T6 + v6 Checkpoints | Checkpoints kept with losses, gate-pillar quick scores, use-case score, cost to here, gaps; best selected by default | Partial | Training.tsx checkpoint list with date and what it was scored as; no losses, quick scores, cost or gaps | Foundation |
| T6 + v6 | Export a checkpoint to the registry (adapter or merged) and promote as candidate alias | Missing | None | Foundation |
| T6 + v6 | Send to the TL Index (Official run on a checkpoint) | Partial | Checkpoints show "scored as Practice / Official run" but no send action | Foundation |
| T6 | Loss mask on a rendered synthetic sample | Missing | None | Foundation (engineering) |
| T6-Gaps + v6 | Gap report per checkpoint: gaps ranked by pillar and skill, error classes, failure slices, blocking | Missing | Data.tsx single gap report summary | Foundation |
| T6-Gaps | Heal return per gap (generated / located items, provenance, review state, reason if not addressed) | Missing | None | Foundation |
| T6-Gaps | Over-fitting flag (new vs training-like inputs) | Missing | None | Foundation |
| T6-Decide + v6 | Decide specialists: held-out accuracy and calibration error before/after per checkpoint, over-confident errors, by route; recalibration proposal | Missing | None | Foundation |

## p8 · Data (17 boards)

| Board | Feature | Status | Where now / what is missing | Which workspace should own it |
|---|---|---|---|---|
| D1 Review queue | Reviews assigned to me with service target, oldest, completed this week, past target | Partial | workspaces/foundation/Data.tsx review queue counts (waiting / claimed / done today); not per reviewer, no target | Foundation |
| D1 | Claim next; item in focus with masked snippet, context on demand (logged), flag sources (PII pipeline, self-healing scorer), claim lock | Partial | Data.tsx "What a reviewer sees: one masked row" illustration; no claim, no flag sources, no lock | Foundation |
| D1 | Rubric: PII decision with reason code, usability per training kind, approve / reject with reason / skip | Missing | None | Foundation |
| D1 | Similar items decided this month (pattern from the graph) | Missing | None | Foundation |
| D1-Quality | Second reviews (10% blind), confusion matrix, team and personal κ, settled by validator | Missing | None | Foundation |
| D1-Quality | Reviewers table: decisions, speed, κ, status | Missing | None | Foundation |
| D2 Tagging pipelines | Pipeline cards: status (live / shadow / planned), version, coverage, precision from reviews, flagged per day, threshold with history | Partial | Data.tsx tagging pipelines table: name, approved share, last tuned | Foundation |
| D2 | Where each pipeline is enabled by data set; enable on a set (back-fill) | Missing | None | Foundation |
| D2 | Tune thresholds (ThinkLatent) with replay | Missing | None | Foundation |
| D2-Engineering | Threshold history with precision before / after and the decisions behind each change | Missing | None | Foundation (engineering) |
| D2-Engineering | Staging and graph ingestion by batch (rows in, accepted, rejected with reasons, arrival to graph lag) | Missing | None | Foundation (engineering) |
| D2-Propose | Propose a new tagging pipeline (what to flag, evidence, data sets, kinds of training, precision target) | Missing | None | Foundation |
| D2-Propose | Proposals with ask counts, decision list, 14-day answer, accepted / declined with reason | Missing | None | Foundation |
| D3 Approvals and insight | Decisions in 30 days approved / rejected by tag, reviewer, reason | Missing | None | Foundation |
| D3 | What the decisions taught the pipeline (traced insights) | Missing | None | Foundation |
| D3 | Triage agent pattern proposal sent to the pipeline | Missing | None | Foundation |
| D3-Engineering | Precision by reviewer and reason code; rating model vs reviews confusion matrix | Missing | None | Foundation (engineering) |
| D3-Patterns | Review patterns (PII-P-04 etc.) with decisions explained, state; what else looks like this across projects; queue similar items | Missing | None | Foundation |
| D4 Self-healing marks | Marks awaiting review by data set and training kind, scorer reason, owner requirement, confidence, confirm / overrule with reason, confirm all above 0.90 | Partial | Data.tsx gap report "Proposed: correct the training data"; decided by people; no marks list or actions | Foundation |
| D4 | 14-day escalation to the data lead; eligible rows effect | Missing | None | Foundation |
| D4-Decisions | Decisions and escalations: median days, within 14 days, by data set, escalation log | Missing | None | Foundation |
| D5 Data-set versions | Versions of a set: immutable, created by, checks, rows, size, used by (projects, runs, Official evaluations), status | Partial | Data.tsx lists versions with kind, date, note and linked training runs; no checks, rows, size or Official evaluations | Foundation |
| D5 | Lineage graph version → training runs → Official runs, with withdrawn marks | Partial | Data.tsx links version to training run; Training.tsx links checkpoints to runs | Foundation |
| D5-Diff | Diff two versions (added, removed, changed, tag coverage, checks), cached diffs | Missing | None | Foundation |
| D5-Export | Export the manifest (JSON / CSV / PDF), never row content; export log | Missing | None | Foundation |
| D5-Export | Steward copies to other projects inside the boundary, data-owner approval, blocked outside | Missing | None | Foundation |
| D5-Retention | Data boundary and retention class per set | Missing | None | Foundation |
| D5-Retention | Source deletion flow: versions withdrawn, new version cut, runs and evidence flagged withdrawn data, owner and validator decide | Missing | None | Foundation / Approver |
| D6 Knowledge graph | Status: nodes and edges by type, size and growth, ingestion by source with cadence and lag | Missing | None | Foundation |
| D6-Coverage | Topic coverage by project and topic group; biggest uncovered topic; send gaps to owners | Missing | None | Foundation |
| D6-Insight | Enterprise-wide insight: most-asked question types with coverage, weakest domains with Index score | Missing | None | Head / Foundation |
| D6-Insight | Next-generation (TLM5) data plan lines with owner, due, status | Missing | None | Head / Foundation |

## p9 · Evaluation: results and index (15 boards; v6-E1 from p0 read with E1)

| Board | Feature | Status | Where now / what is missing | Which workspace should own it |
|---|---|---|---|---|
| E1 + v6 Evaluation results | A results page per run: headline, overall quality with interval, against the previous run (paired), cited on the record | Partial | workspaces/foundation/Evaluation.tsx runs table plus compare-two-runs (paired forest plot, rose / fell); no per-run results page | Foundation |
| E1 + v6 | Accuracy and hallucination scored apart; abstention never below a wrong answer | Missing | None | Foundation / Approver |
| E1 + v6 | Scores by pillar and line item with accuracy, hallucination, n, epochs, previous run, change | Partial | Evaluation.tsx "Line items for a run" (score, items); no accuracy / hallucination / epochs / change | Foundation |
| E1 + v6 | Phase 2 and candidate pillars listed as dash | Partial | Phase 2 pillars not listed anywhere; only live pillars appear | Foundation |
| E1 + v6 | Stale or below-floor judge greys the pillar ("read with care") | Missing | None | Foundation / Approver |
| E1 + v6 | Request an evaluation, run the TL Index, mark Official (validators) | Partial | flows/DataEvaluate.tsx runs one Official evaluation for the use case; no mark-Official or general request | Foundation / Approver |
| v6-E1 | Comparison grade weighing quality, accuracy, hallucination, cost, latency | Partial | Evaluation.tsx compare shows quality and pillars; RequestDetail shows checks incl. TTFT; no combined grade | Foundation |
| E1-Items + v6 | Items that fell with judge rationale summary, item detail (epochs, flipped, hallucination), replay as Practice | Missing | Only counts of items that rose and fell | Foundation |
| E1-Items + v6 | Failure clusters by the Evaluation agent with proposals | Missing | None | Foundation |
| E1-Items | Add failing items to an eval / regression data set, held-out guard blocks training until rotation | Missing | None | Foundation |
| E1-Judge + v6 | Judge trust per pillar (κ, bias, labelled n, last calibrated, trust state), recall by label | Partial | Quality.tsx one κ for the production judge | Approver |
| E1-Judge + v6 | Judge finding with recalibration plan (accept / assign reviewers) | Missing | None | Approver |
| E1-Judge | Method and exclusions (items, rotation, bootstrap, judge, harness build, seed) | Partial | Evidence.tsx states the clearing rule and edition / judge; no exclusions or method panel | Approver |
| E1-Runs + v6 | Live and recent runs with evaluator compute vs judge spend | Partial | Evaluation.tsx lists runs with cost per 1,000 tasks served (not evaluation spend); no live progress | Foundation |
| E1-Runs | Vendor evidence that expires (90 days or vendor change), re-runs booked, notify record owners | Missing | None | Foundation |
| E2 Index | Index overview tiles: models, items per edition, rank stability, cheapest model clearing every bar | Partial | Evidence.tsx "Which models clear what" names the cheapest clearing model per use case; no edition tiles | Approver / Head |
| E2 | Quality against cost per task frontier chart (Pareto line, workflow bars), filter by pillar | Missing | Table only | Head / Explore |
| E2 | In plain language: how to read the Index | Present | Evidence.tsx "The rule for clearing a bar" with status words | Approver |
| E2 | Per workflow: bars from the record, sufficient models cheapest first | Present | Evidence.tsx "Which models clear what" per use case with every model against its bars | Approver |
| E2-Scorecard | Scorecard pillar x model against the Index bar set by the pillar council, too few, greyed stale | Partial | Evidence.tsx Official runs table has every pillar score with too-few flag; no Index bars or clears marks | Approver |
| E2-Scorecard + E3-Dimensions | Metric dimensions per cell: calibration, robustness, fairness, toxicity, efficiency | Missing | None | Foundation |
| E2-Scorecard | Judge trust and data sets per pillar in this edition | Missing | None | Approver |
| E2-Sufficiency | Sufficiency filter: choose pillars and bars (Index, a workflow's, my own) and a token-shape cell; sufficient models sorted by cost | Missing | Fixed per use case only | Explore / Application team |
| E2-Sufficiency | Cheaper variant check (Core vs Distil gap and saving) | Missing | None | Explore |
| E2-Sufficiency | Demand signals to the pillar council (ask for a skill, asks, decision list, answers) | Missing | None | Head |
| E2-Editions | Edition report drafted by the Index agent; Head signs off (publishes, fixes edition) or asks to revise | Missing | None | Head |
| E2-Editions | Quarterly report entry: spend impact, frontier-release verdicts, capability trends | Missing | None | Head |
| E2-Editions | Business-line composites with saved weights | Missing | None | Head |
| E2-Editions + E4-Feed | Evaluation feed; follow a model to hear when it is scored | Missing | None | Shell |
| E3 Leaderboard | Ranked leaderboard with rank as interval, ties, Practice greyed, pinned configuration, style control | Missing | Evidence.tsx table sortable by quality; no rank intervals or ties | Explore / Approver |
| E3 | Filters: size, precision, type, reasoning mode, hosting, licence | Missing | None | Explore |
| E3-Compare | Compare two to four models per data set against a baseline, ties vs worse, save comparison | Partial | Evaluation.tsx compares two runs by pillar; not per data set, not up to four | Foundation / Approver |
| E3-Arena | Preference arena: blind pairwise votes, Bradley-Terry ratings, beside judge score; vote | Missing | None | Explore |
| E3-Dimensions | Accuracy and hallucination with hallucination-adjusted score | Missing | None | Approver |
| E4 Corrections | Corrections changelog (what, why, runs affected, approved by, status) | Missing | /soon/Corrections | Approver |
| E4 | Propose a correction; subscribe | Missing | None | Approver / Shell |
| E4-Feed | Feed and subscriptions: models you follow, corrections touching what you cite, delivery channel | Missing | None | Shell |
| E4-Editions | Edition diff (items rotated, judge version, bars moved, cells that flipped with reason); edition history | Missing | None | Approver |

## p9b · Evaluation: requests, trials, pillars (15 boards)

| Board | Feature | Status | Where now / what is missing | Which workspace should own it |
|---|---|---|---|---|
| E6 Requests | Evaluation request queue with ordering rules (gate and corrections first), position, priority, estimate, filters | Missing | None (approver Requests are stage requests, not evaluation requests) | Foundation |
| E6 | Queue tiles: waiting, scoring now, median wait, next to start | Missing | None | Foundation |
| E6-Live | Live run progress per pillar with provisional partial scores, cost so far vs cap, ETA, notify me per pillar, cancel | Missing | Evaluation.tsx says a run "is being scored today, no result to read yet" | Foundation |
| E6-Live | Regression gate so far, decided only on final intervals | Missing | None | Foundation |
| E6-New | New evaluation request form: model, serving setting (incl. copy a use case's prod setting), pillars (gate pillars locked on), Official vs Practice, reason, budget, predicted position, similar requests | Partial | flows/DataEvaluate.tsx "Run the evaluation" queues one Official run on fixed settings | Foundation / Application team |
| E7 Model trials | Trial brief: intent, requirements with bars, skill declaration mapped to pillars | Missing | None | Application team (Foundation supports) |
| E7-Scenarios | Scenario set built from real decisions, per-scenario items and production share, label agreement, overlap check, build checks, locked version | Missing | None | Application team |
| E7-Results | Run and compare two models on the scenario set against requirements, per scenario | Missing | None | Application team |
| E7-Decision | Decision package drafted by the agent: options with requirements met, cost, time to live; recommendation with confirms / refutes; build request; owner decides | Missing | None | Application team / Head |
| E8 Contribute | Offer a registered data-set version to the Index (purpose, pillar, sensitivity, licence) | Missing | None | Explore / Foundation |
| E8-Profile | Automatic profile report (schema, size, sensitivity, licence, duplicates, malformed, overlap, label quality, coverage, difficulty) and decision join / seed / hold | Missing | None | Approver |
| E8-Validation | Practitioner validation (blind sample, agreement vs bar, changed items back to contributor) | Missing | None | Approver |
| E8-Validation | Contributor credit in edition notes, pillar page and profile | Missing | None | Head |
| E8-Council | Pillar council: candidate pillars with readiness, asks, accept / decline with reason, next sitting | Missing | None | Head |
| E9 Pillar page | Pillar definition, task families, operations served, production bars, gate role, cheapest model clearing | Missing | Pillar names only (pillarName) | Explore / Approver |
| E9-Composition | Pillar composition: active / candidate / retired data sets with weights, contributors, retired ledger | Missing | None | Approver |
| E9-Judge | Pillar judge calibration (confusion matrix vs practitioners, agreement by criterion, judge configuration) | Missing | None | Approver |
| E9-Saturation | Saturation curves and watch (ceiling, headroom, top-four spread, retire or harden) | Missing | None | Approver |

## p10 · Agents and playground (16 boards)

The agent library is the recorded replacement for blueprints, so its absence is a gap, not a decision. `/soon/Agents` is the only trace.

| Board | Feature | Status | Where now / what is missing | Which workspace should own it |
|---|---|---|---|---|
| A1 Agent library | Library of packaged agents (pattern, models via gateway, built-in algorithms, versions, used by, register id, Official evaluation) | Missing | /soon/Agents | Explore (Foundation owns content) |
| A1 | Adopt into a project (opens Start a project prefilled: routing, eval set, budget, approval template), gated on an Official result | Missing | None | Application team |
| A1 | Try an agent; request a feature | Missing | None | Explore |
| A1 | "Which tool should I use?" pointer to the firm's licensed vendor assistant for non-boundary work | Missing | None | Explore |
| A1-Build | Three ways to start: adopt, fork a starter repo (preset client, CI eval hook, deploy chart), retrofit an existing app | Missing | None | Application team |
| A1-Build | Inner-source contributions and retrofitted apps counts | Missing | None | Foundation |
| A1-Register | Agent register (business owner, build owner, autonomy tier, three-axis class, volume, labelled data, corrections, judge rubric, status); register an agent; export | Missing | None | Approver / Ops |
| A1-Register | Agent traffic not on the register (grace to register) | Missing | ops/Usage.tsx covers unregistered callers in general, not agents | Ops |
| A1-Requests | Agent requests with asks, decision lists, 14-day answer, accepted / declined with reason | Missing | None | Head / Foundation |
| A2 Agent page | Agent overview with metrics (pass^3, pass@1, task success, groundedness, abstention, steps, latency, acceptance) against targets | Missing | None | Explore |
| A2 | Book office hours with the agent owner; changelog | Missing | None | Explore |
| A2-Record | Agent record: owners, volume, labelled data, corrections, judge rubric, autonomy tier, class, models it may use | Missing | None | Approver |
| A2-Record | Tools and policy (may call / may not, enforced at the gateway) | Missing | None | Approver |
| A2-Record | Versions and next default change with adopter notice | Missing | None | Foundation |
| A2-RunsOn | Same items on every model the agent may use (task success, cost per task, latency), cheaper route check, gap to frontier, vendor non-production only with tokenisation | Missing | None | Foundation |
| A2-Use | Call and adopt: alias, tags, feedback call; MCP server use; starter repo release | Missing | None | Application team |
| A3 Agent evaluation | Three-level metrics (step, trace, thread) with n; regression and capability suites; version switch | Missing | None | Foundation / Approver |
| A3-Variants | Build variants vs frontier baseline (rubric, latency, pass^3, cost, governance exposure); send for approval | Missing | None | Foundation |
| A3-Trace | Failing trace step by step with skill, pillar and score, failure tag, cost; add to regression suite; dispute judgement | Missing | None | Foundation |
| A3-Engineering | Failure clusters with replay on any version; red-team suite; tools and policy diff between versions | Missing | None | Foundation (engineering) |
| P1 Playground | Compare two models side by side on one prompt | Present | workspaces/approver/Playground.tsx (two models, sample prompts, canned answers) | Approver / Explore |
| P1 | Set-up: alias / route (prod, canary, candidate, previous), system prompt from the prompt store, temperature, max tokens, tools, files (masked) | Partial | Model A / B selects and a prompt box only | Application team |
| P1 | Agents and vendor models (non-production) in the playground | Missing | Enterprise-hosted models only; no agents | Explore |
| P1 | Per-answer tokens, latency, cost, tool calls; trace id | Missing | "no speed, cost or score is shown" | Application team |
| P1 | Grade 1-5, prefer one, flag a problem; save session as prompt version / evaluation case / data-set row; mark as evidence (validators) | Partial | Questions kept on the request's record when opened from a request; no grading or save-as | Approver / Application team |
| P1 | Sessions list kept 30 days; share within the project; demo gallery | Missing | None | Application team |
| P1-EvalSet | Run the use case's eval set on both routes (Practice), by criterion, threads where they differ, request an Official run | Missing | None | Application team |
| P1-Code | View the session as code (alias, tags, feedback call, trace id), Python and curl | Missing | None (FirstCall has a separate snippet) | Application team |
| P1b Open playground | Playground without a project, daily run allowance, nothing saved, no client data | Partial | Playground works when opened on its own; nothing kept; no allowance; models only | Explore |
| P1b | Two agents or model vs agent with citations from demo corpora | Missing | None | Explore |
| P1b | Demo gallery labelled with governance status (approved for what) | Missing | None | Explore |

## p11 · Approvals and governance (3 boards; v6-V1 from p0 and v6-V1b from pb2 read with V1)

| Board | Feature | Status | Where now / what is missing | Which workspace should own it |
|---|---|---|---|---|
| V1 + v6 Approval decision | Decision case for a usage approval: header, use case, phase change, risk tier, recommendation | Present | workspaces/approver/RequestDetail.tsx "What is asked", Evidence agent recommendation | Approver |
| V1 + v6 | What the approval names: one model, one serving setting, one endpoint build, enforced at the gateway (rule, key); a new build is a new usage | Missing | Request names model and scope only | Approver |
| V1 + v6 | Evidence against the bars with base comparison (regression gate) | Present | RequestDetail checks list (bar source, paired verdict) and forest plot against the model it replaces | Approver |
| V1 + v6 | Thresholds table with where each comes from (record, Policy C-2 sections, onboarding targets), review cadence | Partial | Checks list carries "bar from policy / record"; no policy section, no review cadence | Approver |
| V1 + v6 | Evidence sessions sealed from the playground | Partial | Playground questions kept on the request's record when opened from it; not sealed sessions | Approver |
| V1 + v6 | Policy checks (12 of C-2) run by the Governance agent, one routed to the approver as a judgement (pass with change / fail) | Missing | None | Approver |
| V1 + v6 | SLA timer (4 working hours) and escalation to the delegate; hand to the delegate now | Missing | None | Approver |
| V1 + v6 | Decision options: approve / approve with a condition / reject or send back with reason; options blocked with the reason | Partial | Approve and send back (hold), note required to send back; no conditional approval, no blocked-with-reason | Approver |
| V1 + v6 | Message to the owner drafted by the Governance agent (tone, edit), sent on record | Missing | Note to the team only | Approver |
| V1 | Similar approvals in 90 days and standing review proposal for repeat usages | Missing | None | Approver |
| V1 + v6 | Case timeline and internal notes (@mentions) | Missing | None | Approver |
| V1 + v6 | Assign; export audit pack; open the record | Partial | Link to use case; no assign or export | Approver |
| v6-V1b | Resubmission case: against the request sent back, findings closed, all bars met | Present | RequestStage flow and RequestDetail handle UA-0291-R2 on the resubmit day | Approver |
| V2 Queue and validation | Validation queue (models, agents, usages ready with Official run and sealed sessions) | Partial | approver/Requests.tsx lists stage requests waiting and decided; no models or agents | Approver |
| V2 | Validation document drafted by the Evaluation agent: sections with sourced claims, edit, ask agent to redraft, sign once | Missing | None | Approver |
| V2 | Layered evidence (base model, Index method inherited; only the use-case layer reviewed) with validity | Missing | None | Approver |
| V2 | Questions asked and answered log on a validation | Missing | None | Approver |
| V2 | Tiles: validations signed and median time, attestations due, approved for use | Missing | None | Approver |
| V3 Governance portfolio | Every record under governance (use cases, models, agents) with tier, phase, findings, attestations, breaches, last review, repeat reviews; filters; export; send to Risk monthly | Missing | /soon/Governance | Approver / Head |
| V3 | Review cycle time against the side-door share (egress), by month, target | Missing | None | Head |
| V3 | Tier distribution and median cycle time by tier | Missing | None | Head |

## p12 · Operations (14 boards)

| Board | Feature | Status | Where now / what is missing | Which workspace should own it |
|---|---|---|---|---|
| O1 Unregistered usage | Triage list of unregistered keys and apps: first seen, calls, model, probable owner with confidence, grace day, approvals the policy requires | Partial | workspaces/ops/Usage.tsx "Callers with no record": caller, business line, first seen, grace day with steps 0 / 14 / 30; no calls, model, owner confidence | Ops |
| O1 | Claim, notify, escalate, block at day 30 pending Risk concurrence; export for Risk | Missing | Grace steps shown, no actions | Ops |
| O1 | Tiles: unregistered sources, calls a day, oldest, escalated | Partial | "Where things stand" names the worst caller and count | Ops |
| O1-Kinds | Usage the portal cannot place: tags missing, unknown prompt ids (register as a version), unattributed usage charged to the key's team; day-14 warning header | Missing | None | Ops |
| O1-SideDoor | Side door: vendor APIs called directly, by team and host, approved-tools list, escalation of unapproved hosts, alias route offered, teams converted | Missing | None | Ops |
| O2 Capacity across the cluster | Saturation, goodput and headroom per serving endpoint (hosting tier, alias, GPUs, running / waiting, KV, preemptions, headroom days) | Partial | workspaces/ops/Capacity.tsx covers one pilot endpoint (GPU mean / peak, cache hits); no fleet table | Ops |
| O2 | SRE agent rebalance proposal; rebalance request | Partial | Capacity.tsx scale-out proposal (hold to approve) | Ops |
| O2-GPUs | GPUs allocated / utilised / idle-allocated / unallocated; by region and card; training vs serving split; release idle allocation | Missing | None | Ops |
| O2-GPUs | Lower-region GPU tiers and the training queue (what fits where) | Missing | None | Ops / Foundation |
| O2-Teams | Usage and spend by team against plan, GPU hours by project, over-plan review | Missing | None | Ops / Head |
| O3 Agents' activity | Action log of every portal agent action (time, agent, action, object, outcome, proposal) | Missing | Agents appear only inside pages | Ops |
| O3 | Proposals open, accepted rate 30 days, pause an agent (reason required) or pause all | Missing | None | Ops |
| O3-SRE | SRE agent runbook drafts (trigger, reviewer, publish) and issues it opened | Missing | None | Ops |
| O3-SelfHealing | Self-healing agent: gaps found, items for review, retrain proposals, marks waiting; action log; pause | Partial | Data.tsx gap report card and the improve plan's agent note | Ops / Foundation |
| O4 Break-glass log | Grants table: who, why, approver, scope, start / end, active now, revoke, review status | Partial | workspaces/ops/Audit.tsx break-glass section lists grants (empty) and policy text | Ops |
| O4 | Request a grant | Present | Audit.tsx "Hold to request break-glass" with what it would grant | Ops |
| O4 | Weekly review of grants by someone other than the approver; findings (wider than needed) | Missing | None | Ops / Approver |
| O4 | Active-now chip on the page a grant opens | Missing | None | Shell |
| O4-Policy | Break-glass policy text with versions, proposed change pending Risk | Partial | Audit.tsx shows the current policy line; no versions or proposal | Ops / Head |
| O5 Audit export | Audit trail of decisions and accesses (who, what, when, why, evidence id) | Partial | Audit.tsx trail: date, kind, what, who, reference; no "why" or evidence id | Ops |
| O5 | Scope by project, model or period and kinds of event; preview | Partial | Kind filter only | Ops |
| O5 | Export CSV / JSON with evidence links; export for Risk; schedule monthly; file expiry | Partial | Copy visible rows to clipboard (tab-separated); no file export or schedule | Ops |
| O6 Contract and identity health | Tag completeness per production use case against the telemetry contract | Missing | None | Ops |
| O6 | IAM group mirror lag, resync | Missing | None | Ops |
| O6-Freshness | Pages older than an hour with the late source and its owner; sources behind the pages | Missing | None | Ops |

## p12b · Help and core team (6 boards)

| Board | Feature | Status | Where now / what is missing | Which workspace should own it |
|---|---|---|---|---|
| K1 Help | Ask a question: help agent answers with sources and confidence, pages the expert on duty when unsure, "Was this helpful?" | Missing | /soon/Help and /soon/Ask | Shell (Help) |
| K1 | Help agent proposes an FAQ entry; expert approves | Missing | None | Shell (Help) |
| K1 | Links to the approved AI tools list and firm-wide AI training (owned by AI governance) | Missing | None | Shell (Help) |
| K1 | The AI guide (how to build on ThinkLatent with Claude Code) linked from Help | Moved on purpose | Claude Code material moved to Cortex (TL-017) | Cortex |
| K1-Problems | Log a problem (issue / dependency / risk) and open problem register with owner and status, subscribe | Missing | None | Shell (Help) |
| K1-Problems | Problem becomes a Jira ticket within a minute | Moved on purpose | Jira display moved to Cortex; the register itself is still missing | Cortex (ticket) / Shell (register) |
| K1-Knowledge | Knowledge base with provenance (from answers, from fixes, written), write an article | Missing | None | Shell (Help) |
| K1-Knowledge | Weekly report of questions the help agent could not answer | Missing | None | Shell (Help) |
| K1-OfficeHours | Book office hours, attendance and what people brought | Missing | None | Shell (Help) |
| K1-OfficeHours | Was-this-helpful ratings by place and the quarterly survey | Missing | None | Shell |
| C1 Core team | Claude Code bridge: requests awaiting approval, send an instruction to a session, bridge log | Moved on purpose | Cortex (TL-017) | Cortex |
| C1-Backlog | Portal backlog by epic, sprint 46 Jira tickets | Moved on purpose | Cortex (TL-017) | Cortex |

## p13 · Dark (3 boards)

These boards are dark-theme renders of Home (H1), Use case overview (J3) and Runs in flight (T2); their features are counted on those pages.

| Board | Feature | Status | Where now / what is missing | Which workspace should own it |
|---|---|---|---|---|
| Dark-Home, Dark-Overview, Dark-RunsInFlight | Dark theme for every page | Present | Shell dark mode toggle (state/session.tsx, documentElement class) | Shell |
| Dark-RunsInFlight | Run headline with cost and ETA in the engineering view | Missing | See T2 rows | Foundation |

---

## Whole areas missing

Canvas pages or sub-pages with no counterpart in the prototype at all (no route, or only a `/soon/<Name>` placeholder):

1. **Agent library and agent pages** (p10 A1, A2, A3): library, adopt, build paths, agent register, agent requests, agent page, runs-on, call and adopt, agent evaluation (metrics, variants, trace, failure clusters). `/soon/Agents`. This is the recorded replacement for blueprints, so it is owed, not dropped.
2. **Model lineage and lifecycle** (p2 M5, M7, plus M4 release bundle and M3 catalogue card): lineage graph, generation-to-generation, retirement calendar, dependants, release notes, model card with field owners. `/soon/Lineage`.
3. **Model page** (p2 M2 and v6-M2): no per-model page at all (health, pillar profile, serving by token shape, context curve, serving settings, how to call, migration guides, conversations).
4. **Registry** (p2 M6): version registry, serving settings and change log, open-weight and vendor evidence expiry.
5. **Prompts** (p6 W1): versions, compare, hygiene checks, stepped rollout, prompt and template library with forks. `/soon/Prompts`.
6. **Traces** (p4 J11 and v6-J11): pilot, build and integration traces with masked text and the span waterfall (production sealing is on purpose; the non-production trace view is not). `/soon/Traces`.
7. **Help** (p12b K1): ask with sources, problem register, knowledge base, office hours, survey. `/soon/Help`.
8. **Ask ThinkLatent and Inbox** (p1 X1, X2): chat over the portal's records, saved prompts, conversations with agent-drafted replies. `/soon/Ask`; no Inbox at all.
9. **Settings and notifications** (p1 S1): profile, defaults, notification matrix, quiet hours, access requests, data and privacy. `/soon/Settings`.
10. **Corrections and the evaluation feed** (p9 E4): changelog, edition diffs, follow a model. `/soon/Corrections`.
11. **TL Index as a product** (p9 E2 overview frontier, editions and sign-off, sufficiency filter, demand to the pillar council; E3 leaderboard, arena, dimensions; E9 pillar pages; E8 contribute to the Index; pillar council). Evidence.tsx covers only the approver's slice (Official runs table, clearing rule, which models clear what per use case).
12. **Evaluation requests, live runs and model trials** (p9b E6, E7).
13. **Governance portfolio and validation** (p11 V2 validation document and layered evidence, V3 governance portfolio and side-door cycle time). `/soon/Governance`.
14. **Data operations beyond the summary** (p8 D1 review rubric and second reviews, D2 pipeline cards / proposals, D3 approvals and insight, D4 self-healing marks, D5 diff / export / retention and source deletion, D6 knowledge graph).
15. **Training depth** (p7 T1 recipe and dry run, T2 live monitor and job logs, T2 up next, T3 run history, T4 base models and new-base plan, T5 pre-flight, T6 checkpoints, gap report, Decide specialists). Training.tsx has run cards and a three-step start only.
16. **Operations governance views** (p12 O1 usage kinds and side door, O2 cluster fleet / GPUs / teams, O3 agents' activity, O6 contract and identity health and page freshness).
17. **Use-case adoption, outcomes, tasks** (p4 J3 sub-pages), **workbench alerts rules / escalation / digest** (p6 W3), **use-case record governance** (p5 J9 requirements, monitoring plan, validation, completeness).
18. **Projects as a level above use cases** (p3 J1 intake queue, adoption, value ledger and Finance statements; J2 project home with members, join and access requests, attestations, keys; J10 spend, limits and temporary increases; J12 public live view).

Moved on purpose and not counted as missing: core-team view, Jira display and the Claude Code bridge (Cortex TL-017); blueprints (replaced by the agent library); the harness; production trace contents; proprietary records.
