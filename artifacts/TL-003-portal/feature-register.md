# ThinkLatent Portal (portal): feature register

11 Nov 2026 · TL-003 portal · companion to the project proposal. One row per feature, so nothing can be dropped without a recorded decision.

- **C rows** are the features on the design canvas (Interface v5.1 with the v6 pilot: 208 boards, 17 pages), in the order of the board audit of 10 Nov. The state column is that audit's; the prototype has changed since and a recount is the first step of the build.
- **Q rows** are requirements from the requirements document that are not a board: journeys, the access model, experience rules, UX improvements and the intelligence layer.
- **N rows** are what Jithin asked for in conversation after the canvas was drawn (10 and 11 Nov), with the decision that records each.
- **V rows** are proposed by Claude for the five-year horizon in the project proposal. Jithin has not asked for them; he decides which stay.

State words: Present, Partial, Missing (audit of 10 Nov); for N rows: Built (sample data), Partly, Not built, Open decision.

Totals: 556 canvas features, 85 requirements, 46 from conversation, 25 proposed for the horizon. Canvas state on 10 Nov: Missing 361, Partial 150, Present 38, Moved on purpose 7.

## N · Asked for in conversation

| ID | Feature | Area | Recorded in | State |
|---|---|---|---|---|
| N-01 | Home is the board's Home and is the same for everyone: what the Head of ThinkLatent sees is what anyone sees first | Home | D-234, D-236; 11 Nov | Not built |
| N-02 | A separate, clearly named tab for a person's own dashboard (working name: My work): their use cases, tasks, approvals, alerts and next step | My work | 11 Nov | Partly |
| N-03 | The journey: a tab that guides a person to the next step, with stage tracker and checklist, sending them into the pages | My work | D-220, D-234 | Built (sample data) |
| N-04 | Onboarding is a conversation with an agent that finds the right use-case strategy, not a form | Onboarding | D-234 | Built (sample data) |
| N-05 | A guide on every page: right level of detail, builds components inside the chat (chart, tiles, link, person, draft), links to the page behind, pages a real person; live AI with a scripted fallback | Ask and the guide | D-234 | Built (sample data) |
| N-06 | Organised by use case and model, not by role; the only tie to a person is membership of a use case, given by company email with a link sent; every use case has its own space; non-members get the open view | Use case space | D-236 | Built (sample data) |
| N-07 | Leaderboard of use cases open to everyone: usage, share, paid, value avoided, API use, dedicated or shared cluster, contact | Home | D-236 | Built (sample data) |
| N-08 | A value index across use cases for the leaderboard | Home | D-236 | Open decision |
| N-09 | The model is the core pillar: foundation model, domain model built from it, use case on top; versions move together, so a new foundation version flags each domain version due | Models | D-236 | Partly |
| N-10 | Catalogue of foundation models only; a version trained for one use case is not listed outside it | Models | D-236 | Built (sample data) |
| N-11 | Model page lists every use case on the model, row by row, with live production numbers, point of contact and a link to the use case | Models | D-236, D-238 | Built (sample data) |
| N-12 | A graph of what is built from what; flows and graphs that carry meaning | Models | D-236 | Partly |
| N-13 | Every card and number links to the page behind it | Shell and theme | D-236 | Partly |
| N-14 | Data loop: the system finds kinds of data its training sets lack (entity extraction and classification) and shows them as numbers | Data | D-236 | Built (sample data) |
| N-15 | Application teams share their users' feedback (thumbs up and down) back; a team can be asked to share | Data | D-236 | Built (sample data) |
| N-16 | The loop: the compounding followed one turn at a time, shown not stated | Home | D-236 | Built (sample data) |
| N-17 | Signals: every request, and each call inside it, tracked and displayed; signals not yet captured are listed | Observe | D-236 | Built (sample data) |
| N-18 | TL Index opens with every model's overall score, the best model on each pillar and a model picker that the page follows | TL Index and evaluation | D-236 | Built (sample data) |
| N-19 | General-purpose pillars for a later edition: security and misuse resistance, privacy and data handling, robustness, numeracy and tables, attribution, fair treatment | TL Index and evaluation | D-236 | Partly |
| N-20 | The TL Index is built inside the portal | TL Index and evaluation | D-238 | Partly |
| N-21 | Preference rating (an Elo-style score from blind votes) on a page named Head to head, beside the Index score, never cited by an approval | TL Index and evaluation | D-238 | Built (sample data) |
| N-22 | Real Enterprise category: a score per use case from its own items, combined across use cases, as proof that training on Enterprise data helps | TL Index and evaluation | D-238 | Not built |
| N-23 | Enterprise benchmark programme: 12 categories, one item format, three splits, the ask to the team; public benchmark samples adopted on day one | TL Index and evaluation | D-238 | Partly |
| N-24 | Index leaderboard as a sortable table: score, pillars, preference rating, cost, speed, size, class | TL Index and evaluation | D-238 | Not built |
| N-25 | Single-model Index page: rank tiles, score against cost and time, capability scores, benchmarks | TL Index and evaluation | D-238 | Not built |
| N-26 | Trends: frontier, open and TLM models over time; cost and speed to reach a score; size against score | TL Index and evaluation | D-238 | Not built |
| N-27 | Traces: every request step by step, in the portal's own design, from what the serving backend logs | Observe | D-238 | Built (sample data) |
| N-28 | Sessions and session replay | Observe | D-238 | Built (sample data) |
| N-29 | Scores and a review queue (judge, grounding check, user feedback, reviewer) | Observe | D-238 | Built (sample data) |
| N-30 | Everything at use-case level also rolled up across use cases at model level | Models | D-238 | Built (sample data) |
| N-31 | Flow watch: requests by size (tokens in against tokens out) with time, cost and quality per cell, and the spread of answer length for the same input | Observe | D-238 | Built (sample data) |
| N-32 | Requests and responses classified, entities extracted, trends over the last hour and day, deviations flagged | Observe | D-238 | Partly |
| N-33 | A watch agent (an SRE agent) that monitors the data flow as well as performance and raises what moved | Observe | D-238 | Partly |
| N-34 | Desktop-first layout as on the boards: content beside the nav and filling the screen | Shell and theme | 11 Nov | Not built |
| N-35 | The form of every exhibit is chosen before it is built, with three alternatives recorded | Shell and theme | D-240; 11 Nov | Partly |
| N-36 | Like a frontier lab inside the company: model, dedicated or shared hosting, training, direct use and the engineering behind the API in one place | Models | D-236 | Partly |
| N-37 | Self-serve end to end: evaluate a use case, pick a model, train, deploy, onboard, run and monitor | Onboarding | D-234 | Partly |
| N-38 | AI runs it: an agent at every stage from onboarding to production and monitoring | Agents and playground | D-234 | Partly |
| N-39 | On-screen word for a use case: keep 'use case' or change to 'Project' | Shell and theme | 11 Nov | Open decision |
| N-40 | Phone: responsive from the start, bottom bar on phones, after desktop | Shell and theme | D-222 | Partly |
| N-41 | 85% policy bar on Safety and grounding for every use case | Approvals and governance | D-180 | Built (sample data) |
| N-42 | Controlled vocabulary on every screen | Shell and theme | D-229 | Built (sample data) |
| N-43 | Sealed production text with break-glass asked by hold-to-confirm | Observe | D-144; 11 Nov | Built (sample data) |
| N-44 | Whether to license the outside benchmark's validation sets | TL Index and evaluation | 11 Nov | Open decision |
| N-45 | The wireframe is the living requirement the backend is built and connected to | Shell and theme | 11 Nov | Partly |
| N-46 | Five-year vision with nothing held back; what is enabled is decided after the wireframe | Shell and theme | 11 Nov | Partly |

## V · Proposed for the five-year horizon

| ID | Feature | Area | Year proposed | State |
|---|---|---|---|---|
| V-01 | Compounding index: one measure of how much Enterprise knowledge the models hold and how fast it grows | Home | 2031 | Proposed |
| V-02 | Intelligence balance sheet: what the Enterprise owns (models, data sets, evaluated skills, agents), what each cost and returns | Home | 2031 | Proposed |
| V-03 | Morning briefing from the guide: what moved on my use cases overnight and the one thing to decide | My work | 2028 | Proposed |
| V-04 | Voice in and out for the guide, once the omni model exists | Ask and the guide | 2029 | Proposed |
| V-05 | The guide acts with approval: starts a run, files a request, drafts a record, each held to confirm | Ask and the guide | 2029 | Proposed |
| V-06 | Use-case twin: replay traffic against a proposed change of model, prompt or hosting and project cost, quality and time before it ships | Use cases: portfolio | 2028 | Proposed |
| V-07 | Automatic right-sizing of tasks to the smallest model that clears the bar | Use case: running | 2028 | Proposed |
| V-08 | The model mix as first-class kinds in the catalogue, each with its own measures: decision models, constrained decoding, speech, the omni model, TLM5 | Models | 2028 | Proposed |
| V-09 | TLM5 surfaces: predicted next steps, and Enterprise history guiding a frontier model's prompting | Models | 2029 | Proposed |
| V-10 | Group evolving agents that encode institutional knowledge, each evolution shown and approved | Agents and playground | 2029 | Proposed |
| V-11 | Continuous training from the data loop on a schedule, a person approving each release, budgets set as policy | Training | 2028 | Proposed |
| V-12 | Compression as a service: prune, distil and quantise from the portal with the accuracy and cost trade shown | Training | 2028 | Proposed |
| V-13 | Data agreements with application teams: what each shares, under what consent, and what it gets back | Data | 2028 | Proposed |
| V-14 | Continuous Index: every release scored automatically, outside benchmarks tracked beside it | TL Index and evaluation | 2028 | Proposed |
| V-15 | Forecast of when a TLM model clears a bar or passes the frontier on a pillar, with its interval | TL Index and evaluation | 2029 | Proposed |
| V-16 | SRE agent with bounded authority: pre-approved, reversible actions, reported after | Observe | 2029 | Proposed |
| V-17 | Sealed replay of a production sample through a candidate with no one reading it | Observe | 2029 | Proposed |
| V-18 | Continuous validation: policy runs as checks on every release and the approver sees only what changed | Approvals and governance | 2029 | Proposed |
| V-19 | An outside reader's view: export of the full evidence chain for one usage | Approvals and governance | 2030 | Proposed |
| V-20 | Chargeback beyond showback, GPU trading between use cases, energy per 1,000 tasks | Operations | 2028 | Proposed |
| V-21 | Resilience view: failover drills and residency per use case | Operations | 2030 | Proposed |
| V-22 | Academy: learning paths, where finishing one can unlock an action such as starting a training run | Help | 2029 | Proposed |
| V-23 | Portal API and MCP server: other tools and agents read what the portal shows under the same access rules | Shell and theme | 2030 | Proposed |
| V-24 | Federation: a subsidiary or region with its own boundary and a shared catalogue | Shell and theme | 2030 | Proposed |
| V-25 | Portfolio simulation: what if a model retires, a price changes or a bar moves | Shell and theme | 2030 | Proposed |

## C · p1 · Home and shell

| ID | Board | Feature | Area in the proposal | State, 10 Nov |
|---|---|---|---|---|
| C-p1-01 | H1 Main + v6-Main | Headline KPI tiles: models in production, evaluation runs today with pass rate, decisions waiting, attestations due, each against yesterday | Home | Partial |
| C-p1-02 | H1 | Time window switch (today / 7 d / 30 d / quarter) with compare-to-previous | Home | Missing |
| C-p1-03 | H1 | Preview home as another role (Head, Foundation, App, Validator, Everyone) | Home | Present |
| C-p1-04 | H1 | Quality-against-the-bar strip for every use case (score, interval, bar tick, this-week call On plan / May miss / Below bar) | Home | Partial |
| C-p1-05 | H1 | Operations brief from the agents (portfolio call with confidence and time) | Home | Missing |
| C-p1-06 | H1 | Flagged finding with root-cause "Why?" (contributing causes with share of the drop, regression start date, evidence list) | Home | Missing |
| C-p1-07 | H1 | Agent proposal actions on a finding (rerun evaluations, notify owners, proposal awaiting owner) | Home | Missing |
| C-p1-08 | H1 + v6 | "Needs you" ordered list mixing decisions, attestations, tasks with numbered order and filters (All / Decisions / Attestations / Tasks) | Home | Partial |
| C-p1-09 | H1 | Sign off a TL Index edition | Home | Missing |
| C-p1-10 | H1 | Attest monitoring thresholds / Q4 model inventory | Home | Missing |
| C-p1-11 | H1 | PII reviews assigned to me | Home | Missing |
| C-p1-12 | H1 | Unregistered usage to register (grace day count, enforcement pending Risk) | Home | Partial |
| C-p1-13 | H1 | Jira tasks on home | Home | Moved on purpose |
| C-p1-14 | v6-Main | Evaluation runs today: missed gates, scoring now with ETA, grouped by daily scoring / regression suites / practice | Home | Partial |
| C-p1-15 | v6-Main | What the agents did: actions per agent, open proposals, 30-day acceptance rate, pause an agent with reason | Home | Missing |
| C-p1-16 | v6-Main | Every number carries an (i) source and as-of popover | Home | Partial |
| C-p1-17 | H2 Home-FoundationDev | KPI tiles: runs in flight, overnight findings, data reviews due, self-healing marks over 14 days | My work | Partial |
| C-p1-18 | H2 | Runs in flight table across the cluster, filter All / Mine / Started from Relay, with stage, progress, cost against estimate, signal | My work | Partial |
| C-p1-19 | H2 | Engineering view: GPUs, utilisation, step time, tokens/s, MFU, last checkpoint per run | My work | Missing |
| C-p1-20 | H2 | Overnight findings from agents with Accept / Reject with reason (SRE retrain proposal, node drained, eval agent info) | My work | Missing |
| C-p1-21 | H2 | Self-healing marks: new marks, marks escalated at day 14, Decide / Nudge owner | My work | Partial |
| C-p1-22 | H2 | Tagging-pipeline change awaiting data-lead approval | My work | Missing |
| C-p1-23 | H2 | PII review queue claim | My work | Partial |
| C-p1-24 | H2 | Jira tasks | My work | Moved on purpose |
| C-p1-25 | H3 Home-AppTeam | Project switcher across my use cases | My work | Partial |
| C-p1-26 | H3 | KPI tiles: runs and jobs today, open alerts, approvals waiting, usage against monthly ceiling with pace | My work | Partial |
| C-p1-27 | H3 | Runs and jobs today for the project (training, deploy to candidate alias, nightly eval, data job, replay) | My work | Missing |
| C-p1-28 | H3 | Open alerts with acknowledge, why, renotify, Slack/webhook channel | My work | Partial |
| C-p1-29 | H3 | Approvals waiting with SLA (phase request, cohort extension, monitoring attestation) | My work | Partial |
| C-p1-30 | H3 | Usage against ceiling and rate limit | My work | Missing |
| C-p1-31 | H4 Home-Validator | Validation queue with gate pillars cleared, due date, state (re-validate, ready, in review, needs Official run) | My work | Partial |
| C-p1-32 | H4 | Attestations due (monitoring, judge calibration, Q4 validation) | My work | Missing |
| C-p1-33 | H4 | Open findings tracked with severity, owner and due date | My work | Missing |
| C-p1-34 | H4 | Approvals with SLA and concurrence (cohort extension, exception to keep serving below bar) | My work | Missing |
| C-p1-35 | H4 | Index edition method and data validation | My work | Missing |
| C-p1-36 | H5 Home-Everyone | Entry actions: Ask ThinkLatent, Log a problem, Try playground, Start a project | Home | Partial |
| C-p1-37 | H5 | Playground without a project (shared sandbox pool) | Home | Partial |
| C-p1-38 | H5 | Catalogue highlights with score, cost per task, p95 latency, Try / Open, incl. an adoptable agent | Home | Partial |
| C-p1-39 | H5 | Using AI at the Enterprise (approved tools list, firm AI training links) | Home | Missing |
| C-p1-40 | H5 | What's new: releases, Index changes, corrections, portal changes | Home | Missing |
| C-p1-41 | H5 | Was this helpful? feedback on the home | Home | Missing |
| C-p1-42 | H5 | First-visit empty state with three steps | Home | Partial |
| C-p1-43 | S1 Settings | Profile with roles and projects from access management | Settings | Missing |
| C-p1-44 | S1 | Defaults: theme, density, engineering view | Settings | Partial |
| C-p1-45 | S1 | Notification matrix (what x portal/email/Slack x frequency), test send | Settings | Missing |
| C-p1-46 | S1 | Quiet hours, time zone, out of office | Settings | Missing |
| C-p1-47 | S1 | My open access requests (break-glass, project membership, model access) with withdraw | Settings | Partial |
| C-p1-48 | S1 | Data and privacy: what the portal records about me, download, retention | Settings | Missing |
| C-p1-49 | X1 Ask ThinkLatent | Chat with modes (ask anything, the index, a model, deeper research) and answer depth | Ask and the guide | Missing |
| C-p1-50 | X1 | Conversation history logged to records, saved and shared prompts | Ask and the guide | Missing |
| C-p1-51 | X1 | Answers with sourced chart, confidence, "Save to a page", "Use in UA-xxxx" | Ask and the guide | Missing |
| C-p1-52 | X1 | Starter prompts (explain a score, compare models, draft an approval note) | Ask and the guide | Missing |
| C-p1-53 | X2 Inbox | Conversations between owners, ThinkLatent and agents, filter Needs you / Agents | Inbox | Missing |
| C-p1-54 | X2 | Agent-drafted replies with tone, edit, regenerate; people send | Inbox | Missing |
| C-p1-55 | X2 | Thread context panel (record, score vs bar, quality window, retrain progress, thread summary, suggested replies) | Inbox | Missing |

## C · p2 · Models

| ID | Board | Feature | Area in the proposal | State, 10 Nov |
|---|---|---|---|---|
| C-p2-01 | M1 Catalogue | Adoption tiles: median time to first call, keys still calling after 28 days, teams with a use case, front door against side door | Models | Missing |
| C-p2-02 | M1 | Generation cards (TLM5 preview, TLM4 serving, TLM3 retiring, TLM2/1 retired) with use cases on each, calls per day, health and trust, what's new | Models | Partial |
| C-p2-03 | M1 | Register interest / preview access for the next generation | Models | Missing |
| C-p2-04 | M1 | Retirement calendar: versions leaving in 120 days, dependants, owners notified | Models | Missing |
| C-p2-05 | M1 | Health and trust per model (regression suite, 30-day uptime, incidents, findings) | Models | Missing |
| C-p2-06 | M1-AllModels | Every model incl. open-weight and vendor, with approved usages, use cases, data tiers | Models | Partial |
| C-p2-07 | M1-AllModels | Filter by my data tier (Tier 1/2/3) and by source (TLM / open-weight / vendor) | Models | Partial |
| C-p2-08 | M1-AllModels | Vendor evidence expired flag (no new use cases) | Models | Missing |
| C-p2-09 | M1-AllModels | Cost per 1M tokens and status per model | Models | Partial |
| C-p2-10 | M1-AllModels | Select up to three to compare | Models | Missing |
| C-p2-11 | M1-AllModels | Index agent recommendations per endpoint (task clusters, cheaper model that clears the cluster, privacy floor) | Models | Missing |
| C-p2-12 | M1-Asks | Ask for a model (need, data tier), add my ask to an existing request, dedup | Models | Missing |
| C-p2-13 | M1-Asks | Asks register with decision list, 14-day answer target, planned / declined with reason | Models | Missing |
| C-p2-14 | M1-Asks | Vendor-equivalent cost avoided by model this quarter (Finance method) | Models | Partial |
| C-p2-15 | M1-Compare | Compare up to three models in plain words: what it is, good for, approved usages, pillar quality, cost, TTFT, context, data tiers, where it runs, licence, health, choose it when | Models | Missing |
| C-p2-16 | M1-Compare | What each model is approved for (usage x model matrix) | Models | Missing |
| C-p2-17 | M1-Compare | Share this comparison / try all three in the playground | Models | Missing |
| C-p2-18 | M2 Model page + v6 | A page per model (header: status, alias, approval, use-with-care tier, try it, use for a new use case) | Models | Missing |
| C-p2-19 | M2 + v6 | Health in parts: regression suite, uptime vs target, incidents, findings (incl. red-team) | Models | Missing |
| C-p2-20 | M2 + v6 | Adoption and cost per model (use cases by stage, tasks a weekday, cost vs previous version) | Models | Partial |
| C-p2-21 | M2 + v6 | Pillar profile against bars, against previous versions, radar/table, Phase 2 pillars shown as dash | Models | Partial |
| C-p2-22 | M2 + v6 | Index agent model brief and proposal (adapter for missed common items) with Propose / Schedule review / Dismiss | Models | Missing |
| C-p2-23 | M2 + v6 | Facts: base and method, size, modalities, context window, licence, data tiers, service levels, energy | Models | Partial |
| C-p2-24 | M2 + v6 | Owner, approver, serving contacts; models built on it | Models | Missing |
| C-p2-25 | M2 + v6 | Use cases on this model with phase, hosting tier, TTFT target, quality | Models | Missing |
| C-p2-26 | M2 + v6 | Conversations about this model; message owner | Models | Missing |
| C-p2-27 | M2-Evidence + v6 | Releases over time (composite, eval pass rate, regression, cost, findings at release) | Models | Missing |
| C-p2-28 | M2-Evidence | Thinnest margin over a bar / watch | Models | Partial |
| C-p2-29 | M2-HowToCall + v6 | How to call through Relay: alias vs pinned version, five required tags, outcome and feedback calls, Python and curl | Models | Partial |
| C-p2-30 | M2-HowToCall + v6 | Telemetry contract health tiles: calls with all tags, with outcome, with feedback, time to first call | Models | Missing |
| C-p2-31 | M2-HowToCall + v6 | Migration guides: from a vendor API, from the previous version; differences to expect | Models | Missing |
| C-p2-32 | M2-Serving + v6 | Serving KPIs per model: calls/day, TTFT p95, error rate, goodput | Models | Partial |
| C-p2-33 | M2-Serving + v6 | Token-shape heatmap with layers (quality, cost, latency, suitability, Enterprise volume) | Models | Missing |
| C-p2-34 | M2-Serving + v6 | Effective context and context-rot curve | Models | Missing |
| C-p2-35 | M2-Serving + v6 | Serving settings by outcome (precision high/medium/low: accuracy deltas, cost, latency, tokens/s, recommended) | Models | Missing |
| C-p2-36 | M3 Catalogue card | Model card with per-field owner and last-reviewed date; field past 90 days blocks export | Models | Missing |
| C-p2-37 | M3 | Model-card agent drafts fields, a person owns each | Models | Missing |
| C-p2-38 | M3 | Intended use / not for / languages / limits and known issues / fairness slice | Models | Missing |
| C-p2-39 | M3 | Service levels by hosting tier; how to get access | Models | Partial |
| C-p2-40 | M3 | Data boundary described by class (trained on, excluded, residency) | Models | Missing |
| C-p2-41 | M3 | Card changelog and export-to-site history (PDF) | Models | Missing |
| C-p2-42 | M4 Release bundle | Release notes per version with dated changes and what needs a template change | Models | Missing |
| C-p2-43 | M4 | Lineage card (built from, replaced, built on it, agents running on it) | Models | Missing |
| C-p2-44 | M4-Evidence | Evaluation summary that cleared the release, vs previous | Models | Partial |
| C-p2-45 | M4-Evidence | Code and package (repository tag, training run, package, endpoint build, templates, demo preset) | Models | Missing |
| C-p2-46 | M4-Migration | Migration notes for dependants with owner tasks | Models | Missing |
| C-p2-47 | M4-Migration | Candidate gated: cannot mark current without an Official run; request Official run | Models | Partial |
| C-p2-48 | M5 Lineage | Lineage graph Base → Core → Distil → Domain → adapters, status, deployed count, agents on each node | Models | Missing |
| C-p2-49 | M5 | Where each branch is going (branch end, replacement, build from next) | Models | Missing |
| C-p2-50 | M5 | Export static lineage image for the site | Models | Missing |
| C-p2-51 | M5-Generations | Generation-to-generation comparison (pillars, pass rate, context, cost, TTFT, use cases) | Models | Missing |
| C-p2-52 | M5-Generations | Evidence over time (every Core release composite, next generation target quarter) | Models | Missing |
| C-p2-53 | M6 Registry | Registry table of every version (kind, built from, training run, Official run, pillar scores, bars, cost, serving alias), filters, select two to compare, CSV | Models | Partial |
| C-p2-54 | M6 | Registry reconciliation with gateway; endpoints not in the registry | Models | Partial |
| C-p2-55 | M6 | What the registry stores and Registry API snippet | Models | Missing |
| C-p2-56 | M6-Serving | Serving settings per endpoint (precision, adapters per replica, speculative decoding, replicas, build, TTFT, tokens/s, cost) | Models | Missing |
| C-p2-57 | M6-Serving | Propose a setting change; setting change log with approver and evidence | Models | Missing |
| C-p2-58 | M6-Vendor | Open-weight and vendor models scored on the same pillars, licence, owner | Models | Partial |
| C-p2-59 | M6-Vendor | Evidence expiry rule (90 days for vendor) and scheduled re-runs | Models | Missing |
| C-p2-60 | M7 Lifecycle | Lifecycle state track per version (candidate → evaluated → approved pilot → production → serving → deprecated → retired) | Models | Missing |
| C-p2-61 | M7 | Set retirement date (Head only, 60-day minimum) opening tasks on dependants | Models | Missing |
| C-p2-62 | M7 | Dependants list with notification and migration-task state; notify dependants | Models | Missing |
| C-p2-63 | M7 | Lifecycle activity log (who changed state, evidence) | Models | Partial |

## C · p3 · Projects

| ID | Board | Feature | Area in the proposal | State, 10 Nov |
|---|---|---|---|---|
| C-p3-01 | J0 + v6 Start a project | Four-step guided start, Onboarding agent drafts, person confirms | Onboarding | Present |
| C-p3-02 | J0 + v6 | Started from a "Bring us a problem" request, keeping its intake-queue place | Onboarding | Missing |
| C-p3-03 | J0 + v6 | Start fresh or from an existing use case or library agent (copies routing, eval set, budget, approval template) | Onboarding | Missing |
| C-p3-04 | J0 + v6 | Intake fields: business line, sensitivity tier, volume, latency need, labels, vendor already in use | Onboarding | Partial |
| C-p3-05 | J0 + v6 | Accept all / clear drafts; per-answer "Drafted · check" marks | Onboarding | Partial |
| C-p3-06 | J0 + v6 | Duplicate check: similar use cases and agents with overlap %, add as use case there / reuse eval items / add as a step | Onboarding | Missing |
| C-p3-07 | J0-Model + v6 | Recommended model: smallest that clears every live bar the job needs, pillar-by-pillar with why each pillar matters, Phase 2 pillars as dash | Onboarding | Present |
| C-p3-08 | J0-Model + v6 | Monthly cost in production for each choice beside the vendor path, POC per-token estimate | Onboarding | Partial |
| C-p3-09 | J0-Model + v6 | Hosting tiers with published service levels (sandbox, shared 99.5%, dedicated 99.9%) | Onboarding | Partial |
| C-p3-10 | J0-Good + v6 | What good looks like: rubric with weights, musts, must-nots, thresholds (target / warning / critical), versioned requirements | Onboarding | Missing |
| C-p3-11 | J0-Good + v6 | What the scorer runs on every request (judge calibration need, rule checks, paging on must-not violation) | Onboarding | Missing |
| C-p3-12 | J0-Sandbox + v6 | POC record saved with owner, requirements, model | Onboarding | Partial |
| C-p3-13 | J0-Sandbox + v6 | Standing sandbox approval issues key at once (no wait) | Onboarding | Present |
| C-p3-14 | J0-Sandbox + v6 | Six required tags fixed on the key and in the snippet | Onboarding | Missing |
| C-p3-15 | J0-Sandbox + v6 | Time to first successful call clock with target | Onboarding | Missing |
| C-p3-16 | J0-Sandbox + v6 | Intake queue: my place, priority, next review; others by type only | Onboarding | Missing |
| C-p3-17 | J0 v6 | What happens after you submit (first call, intake review, production gate) | Onboarding | Partial |
| C-p3-18 | J1 + v6 Projects | Projects list with phase, health (production only), owner, business line, alerts; All / Mine / Production / Alerts | Use cases: portfolio | Partial |
| C-p3-19 | J1 | Headline tiles: projects by phase, use cases in production, adopted teams, intake queue size | Use cases: portfolio | Partial |
| C-p3-20 | J1 | Intake queue across the Enterprise with place, type, status, priority, waiting days; Bring us a problem | Use cases: portfolio | Missing |
| C-p3-21 | J1 | Public live view of the portal's own use case (UC-0001) linked from the list | Use cases: portfolio | Missing |
| C-p3-22 | v6-J1 | Why nothing is in Production: the Safety floor, best Official runs, next evidence | Use cases: portfolio | Present |
| C-p3-23 | v6-J1 | Portfolio agent recommendation on the order of resubmissions | Use cases: portfolio | Missing |
| C-p3-24 | v6-J1 | Held-by-the-floor items with reply to owner | Use cases: portfolio | Partial |
| C-p3-25 | J1-Portfolio + v6 | Use-case portfolio table: model, stage, tokens/min, 30-day SLO, cost per 1k, quality, loop state, approval state, review days; filters; CSV | Use cases: portfolio | Partial |
| C-p3-26 | J1-Portfolio + v6 | Portfolio evidence: each use case's model on its own bars (bars cleared, safety, cost per 1,000) | Use cases: portfolio | Present |
| C-p3-27 | J1-Portfolio | Waiting for a decision, oldest first, with review days against a 5-day target | Use cases: portfolio | Partial |
| C-p3-28 | v6-J1 | Approvals log across the portfolio (scope, run, outcome) | Use cases: portfolio | Present |
| C-p3-29 | J1-Adoption + v6 | Adoption north star (adopted teams), returning users, power / habitual / novice by business line | Use cases: portfolio | Missing |
| C-p3-30 | J1-Adoption | Path to adoption funnel (discover → sandbox → key → first call → production → retained) | Use cases: portfolio | Missing |
| C-p3-31 | J1-Adoption + v6 | Stalled teams after 10 days, champions, pair with a champion, nudge, office hours, unanswered questions | Use cases: portfolio | Missing |
| C-p3-32 | J1-Value + v6 | Value ledger per use case: cost to run, vendor-equivalent, avoided, hours saved declared and attested, before-and-after measure | Use cases: portfolio | Partial |
| C-p3-33 | J1-Value | Owner attestation of value overdue, remind owner | Use cases: portfolio | Missing |
| C-p3-34 | J1-Value + v6 | Monthly statements for Finance (issued, restated, PDF/CSV, method version) | Use cases: portfolio | Missing |
| C-p3-35 | J2 + v6 Project home | Project header with request next phase gated by named reasons | Use case space | Partial |
| C-p3-36 | J2 + v6 | Tiles: phase since, quality vs bar, spend against ceiling with forecast, intake position | Use case space | Partial |
| C-p3-37 | J2 + v6 | Phase stepper with each gate's checks and current values (POC, Active build, Pilot, Production, Under review, Decommissioned) | Use case space | Partial |
| C-p3-38 | J2 + v6 | Readiness summary drafted, review and sign | Use case space | Missing |
| C-p3-39 | J2 + v6 | Under review rules and review cadence by risk tier; draft a decommission plan | Use case space | Missing |
| C-p3-40 | v6-J2 | Needs a decision on the project (critical finding, exit gate, spend, access, attestation, untagged calls) with ways to close the finding | Use case space | Partial |
| C-p3-41 | J2 + v6 | Use cases, runs, data sets the project owns; first traced call | Use case space | Partial |
| C-p3-42 | J2-Members + v6 | Members with role, what the role can do, data access; change role | Use case space | Partial |
| C-p3-43 | J2-Members + v6 | Requests to join and access requests (owner + data owner), approve / decline with reason, reminders, median time to decide | Use case space | Missing |
| C-p3-44 | J2-Attest + v6 | Attestations with cadence, who, due, state; overdue opens a finding; attest action | Use case space | Partial |
| C-p3-45 | J2-Attest + v6 | Open approvals and booked reviews (security review, data release, scheduled review); export audit pack | Use case space | Partial |
| C-p3-46 | J2-Keys + v6 | Keys on the project with required tags, last used, calls 7 d, untagged grace | Use case space | Partial |
| C-p3-47 | J2-Keys + v6 | Production endpoint and service level; first and latest traced calls (sandbox open, production sealed) | Use case space | Missing |
| C-p3-48 | J10 + v6 Usage | Spend this month against team / use-case ceiling, month-end forecast, tokens by day against ceiling pace | Usage, keys and limits | Missing |
| C-p3-49 | J10 + v6 | Spend by use case: requests, tokens, cost, ceiling used, rpm/tpm peak vs limit, rate-limit hits, approval | Usage, keys and limits | Missing |
| C-p3-50 | J10 | Filters: team, project, window, environment | Usage, keys and limits | Missing |
| C-p3-51 | J10-Keys + v6 | Key register: masked key, six tags, environment, created, last used, calls, expiry, rotate, fix tags, new sandbox key | Usage, keys and limits | Partial |
| C-p3-52 | J10-Keys + v6 | Calls missing a required tag under the grace policy (day 7 notice, day 14 header, day 30 enforcement pending Risk) | Usage, keys and limits | Partial |
| C-p3-53 | J10-Limits + v6 | Limits beside the hourly peak with headroom | Usage, keys and limits | Missing |
| C-p3-54 | J10-Limits + v6 | Request a temporary increase (named approver, at most 30 days, auto-revert), decide / withdraw | Usage, keys and limits | Missing |
| C-p3-55 | J10-Limits + v6 | Rate-limited requests log per hour (retries, waits) | Usage, keys and limits | Missing |
| C-p3-56 | J10-Showback + v6 | Showback by business line (dedicated share, shared serving, vendor-equivalent, avoided) and how cost is counted | Usage, keys and limits | Partial |
| C-p3-57 | J10-Showback + v6 | Monthly statements for Finance with method version and restatements | Usage, keys and limits | Missing |
| C-p3-58 | v6-J10 | First call guide (key, snippet, see it land) with time-to-first-call against target and contract health | Usage, keys and limits | Partial |
| C-p3-59 | J12 Live view | Public live view of UC-0001 for all staff: questions today vs last week, answered without expert, helpful, time to answer | Use cases: portfolio | Missing |
| C-p3-60 | J12 | Service level and evidence (availability, citations, Official run scores, cost per 1,000) on the public view | Use cases: portfolio | Missing |
| C-p3-61 | J12 | What people ask this week (topics, counted never shown) | Use cases: portfolio | Missing |

## C · p4 · Use case: running

| ID | Board | Feature | Area in the proposal | State, 10 Nov |
|---|---|---|---|---|
| C-p4-01 | J3 + v6 Overview | Use-case header: stage, alias and canary split, open alerts, owner, one-line job | Use case: running | Partial |
| C-p4-02 | J3 + v6 | Window switch (live / 24 h / 7 d / 30 d) with compare to previous period | Use case: running | Missing |
| C-p4-03 | J3 + v6 | KPI tiles: quality vs bar, tasks a weekday, TTFT p95, cost per 1,000 tasks, each against the previous period | Use case: running | Partial |
| C-p4-04 | v6-J3 | Quality and traffic daily chart against the previous week | Use case: running | Partial |
| C-p4-05 | J3 + v6 | "What the portal noticed": agent findings with basis, confidence, actions (train a specialist, see failing cluster, propose max_tokens, open canary judgement, remind me, dismiss with log) | Use case: running | Partial |
| C-p4-06 | v6-J3 | Critical finding card with ways to close it (promote v3, train a specialist, review long threads) | Use case: running | Partial |
| C-p4-07 | J3 | Tokens over the window (input/output, cached share, per request, by alias, largest task) | Use case: running | Missing |
| C-p4-08 | J3 | Pages for this use case, one question each | Use case: running | Present |
| C-p4-09 | J3-Adoption + v6 | Active users by level (power / habitual / novice / not active) in the pilot cohort, returning users | Use case: running | Missing |
| C-p4-10 | J3-Adoption + v6 | Teams in the pilot with adopted / not yet, walkthrough offer | Use case: running | Missing |
| C-p4-11 | J3-Outcomes + v6 | Specialist uplift: outcome events from business systems, engaged vs passive advisors | Use case: running | Missing |
| C-p4-12 | J3-Outcomes + v6 | Where outcome events come from (join coverage), automation rate | Use case: running | Missing |
| C-p4-13 | J3-Outcomes + v6 | Cost avoided with Finance method | Use case: running | Present |
| C-p4-14 | J3-Tasks + v6 | Each task against its own bar, smallest model that clears it, saving if right-sized | Use case: running | Missing |
| C-p4-15 | J3-Tasks + v6 | Right-sizing proposal (route tasks to a smaller model) with regression gate on the task slice | Use case: running | Missing |
| C-p4-16 | J3-Tasks + v6 | Tokens by task against previous window | Use case: running | Missing |
| C-p4-17 | v6-J3 | Alerts tab: open alerts with acknowledge, why, escalation timing, digest link | Use case: running | Partial |
| C-p4-18 | J4 + v6 Traffic | Serving SLO summary (TTFT p95, error rate, availability) for 30 days, met / not met | Use case: running | Present |
| C-p4-19 | v6-J4 | Latency against the SLO daily p50/p95 chart with table twin | Use case: running | Present |
| C-p4-20 | v6-J4 | SLO table: target, 30-day value, worst day, days over, availability budget used / left | Use case: running | Partial |
| C-p4-21 | v6-J4 | Incident timeline with impact; postmortem drafted by SRE agent, owner signs to close | Use case: running | Partial |
| C-p4-22 | v6-J4 | Traffic by day and error rate by day | Use case: running | Present |
| C-p4-23 | v6-J4 | Availability by day | Use case: running | Present |
| C-p4-24 | v6-J4 | Alerts in the window with linked incident or finding | Use case: running | Present |
| C-p4-25 | v6-J4 | Serving detail: by week, pinned serving setting, endpoint, build, gateway rule | Use case: running | Missing |
| C-p4-26 | J4 | Input x output length matrix with metric switch (share, TTFT, decode, completion) | Use case: running | Missing |
| C-p4-27 | J4 | Busiest shapes with all four metrics | Use case: running | Missing |
| C-p4-28 | J4 + J4-Latency | Requests, input and output tokens, sessions per day | Use case: running | Partial |
| C-p4-29 | J4-Latency | TTFT decomposed (queue, prefill, transfer) by input length; ITL, TPOT, stalls by prompt length | Use case: running | Missing |
| C-p4-30 | J4-Errors | Rejected at the gateway by hour (queue full), retries | Use case: running | Missing |
| C-p4-31 | J4-Errors | Finish reasons (stop, length, abort, error, timeout) with record limits; propose max_tokens change | Use case: running | Missing |
| C-p4-32 | J4-Engineering | Engine telemetry: speculative acceptance by draft position, batch tokens, chunked prefill, adapter wait, rescued requests | Use case: running | Missing |
| C-p4-33 | J5 + v6 Capacity | GPU use mean and peak against the scale-out line, days over, cache hits, spend | Use case: running | Present |
| C-p4-34 | v6-J5 | SRE agent scale-out proposal, owner approves, reversible | Use case: running | Present |
| C-p4-35 | v6-J5 | Peaks by week table | Use case: running | Missing |
| C-p4-36 | v6-J5 | Endpoint and hosting options (always on, scale out, shared adapter) with when allowed | Use case: running | Missing |
| C-p4-37 | v6-J5 | Capacity detail, last 7 days by day | Use case: running | Partial |
| C-p4-38 | J5 | Goodput, multiwindow error-budget burn, headroom forecast in days | Use case: running | Missing |
| C-p4-39 | J5 | Saturation strip (running vs waiting, KV cache, preemptions, queue p99) with thresholds | Use case: running | Missing |
| C-p4-40 | J5 | Capacity line and request more capacity | Use case: running | Partial |
| C-p4-41 | J5-Cache | Cache by session depth, TTFT on hit vs miss, stickiness, GPU-seconds saved, inter-turn gap vs eviction | Use case: running | Missing |
| C-p4-42 | J5-Engineering | Throughput vs interactivity sweep with operating point and SLO line | Use case: running | Missing |
| C-p4-43 | J5-Nodes | Dedicated node utilisation by hour, idle-allocated share, overnight one-node proposal, hosting cost options | Use case: running | Missing |
| C-p4-44 | J6 + v6 Models | Aliases (prod, canary, candidate, previous, fallback) with model, traffic share, prompt version, max_tokens, fallback slot and uses | Use case: running | Partial |
| C-p4-45 | J6 + v6 | Stepped rollout: shadow, 5%, 10/50%, promote; current step and next | Use case: running | Partial |
| C-p4-46 | J6 + v6 | Canary judgement table: each metric prod vs canary, paired difference, p value, critical flag, judgement | Use case: running | Missing |
| C-p4-47 | J6 + v6 | Sample sufficiency for the judgement | Use case: running | Missing |
| C-p4-48 | J6 + v6 | Composite score with weights from the record | Use case: running | Missing |
| C-p4-49 | J6 + v6 | Promote canary (hold), gated with named reasons; remind me Friday | Use case: running | Missing |
| C-p4-50 | J6 + v6 | Roll back to previous, no approval, about 40 s | Use case: running | Present |
| C-p4-51 | J6 + v6 | Fallback alias points at a retiring model, update the record | Use case: running | Missing |
| C-p4-52 | J6-Gate + v6 | Regression gate table: always-gated pillars plus the workflow's, before/after, bar, pass/fail; download PDF for Risk | Use case: running | Partial |
| C-p4-53 | J6-Gate + v6 | Evaluation agent diagnosis of a gate fail with proposed data fix | Use case: running | Missing |
| C-p4-54 | J6-Routing | Route by task: gateway orchestration rules, propose a rule change, shadow first, serving config YAML | Use case: running | Missing |
| C-p4-55 | J6-Shapes | Shapes by model: length matrix small multiples per alias; canary difference by input length | Use case: running | Missing |
| C-p4-56 | J11 + v6 Traces | Pilot / build / integration traces table with masked text, filters (errors, slow, env, task), checks | Observe: traces | Missing |
| C-p4-57 | J11 + v6 | Single trace waterfall (gateway, checks, engine spans), tags, Sensitive switch for masked text | Observe: traces | Missing |
| C-p4-58 | J11 + v6 | Production traces sealed, aggregates only | Observe: traces | Moved on purpose |
| C-p4-59 | v6-J11 | Who sees what by environment | Observe: traces | Missing |
| C-p4-60 | v6-J11 | Break-glass request from the traces page (1 hour, second approver, logged) | Observe: traces | Partial |
| C-p4-61 | v6-J11 | Access log of every trace opened | Observe: traces | Missing |
| C-p4-62 | J11 | Agent note on a trace (e.g. first call of a new task needs a task rule and bar) | Observe: traces | Missing |

## C · p5 · Use case: quality and record

| ID | Board | Feature | Area in the proposal | State, 10 Nov |
|---|---|---|---|---|
| C-p5-01 | v6-J7 Quality | Quality, Safety and grounding, consistency tiles against bars and floor | Use case: quality and record | Present |
| C-p5-02 | v6-J7 | Daily quality in production (judged), with bar and floor, table twin | Use case: quality and record | Present |
| C-p5-03 | v6-J7 | Production against the Official run (two reads agree) | Use case: quality and record | Partial |
| C-p5-04 | v6-J7 | How production is judged: sample, judge, person grades 25%, κ agreement band | Use case: quality and record | Present |
| C-p5-05 | v6-J7 | Open finding with what holds Production and closing rule | Use case: quality and record | Present |
| C-p5-06 | v6-J7 | Where Safety falls short: pillar line items on the Official run vs Practice checkpoint | Use case: quality and record | Partial |
| C-p5-07 | v6-J7 + J7-Review | Review queue (daily person-graded quarter, oversampled long threads, escalation) with claim | Use case: quality and record | Partial |
| C-p5-08 | J7 + v6 | Advisor signals: acceptance (used / edited / discarded), feedback score and reasons, persistence, implicit signals (copy, retry, regenerate, edit distance) | Use case: quality and record | Missing |
| C-p5-09 | J7 | Where the signals come from: calling apps, outcome and feedback event coverage, missing app; copy the two calls | Use case: quality and record | Missing |
| C-p5-10 | J7 | Checks run on every response (PII, compliance, toxicity holds) | Use case: quality and record | Missing |
| C-p5-11 | J7-Analysis | Poor interactions by root cause and cluster, with summary check, tier gate, proposed fix | Use case: quality and record | Missing |
| C-p5-12 | J7-Analysis | Drift watch: input PSI, language, speakers, output length, embedding drift, auto band vs fixed thresholds | Use case: quality and record | Missing |
| C-p5-13 | J7-Analysis + J8-Release | Post-release re-score against the foundation model weekly (gap, warning opens gap report, critical proposes roll back) | Use case: quality and record | Missing |
| C-p5-14 | J7-Review | Annotation: rubric dimensions with mean, low share, reason, blind second-reviewer κ | Use case: quality and record | Missing |
| C-p5-15 | J7-Review | Corrections saved as expected outputs and training data, queue into eval set for validator | Use case: quality and record | Missing |
| C-p5-16 | J7-Review | Reusable evaluators built from reviews (in use / to sign) | Use case: quality and record | Missing |
| C-p5-17 | J7-Review | Judge calibration per judge (κ, recall per class, below-floor greyed, not citable) | Use case: quality and record | Partial |
| C-p5-18 | J7-Review | Judge bias checks (length, position, self-preference) and slices where judge and humans disagree | Use case: quality and record | Missing |
| C-p5-19 | J7-Tasks | Tasks mined behind the model (share, shape, used as written, judge score, trend), Specialise | Use case: quality and record | Missing |
| C-p5-20 | J7-Tasks | Any number split by task | Use case: quality and record | Missing |
| C-p5-21 | J7-Tasks | Topic clusters inside tasks with privacy floor | Use case: quality and record | Missing |
| C-p5-22 | J8 + v6 Improve | Improve loop timeline from finding to resubmission, with who decides and state | Use case: quality and record | Present |
| C-p5-23 | J8 | Eight-stage loop (capture, gap, data set, train, evaluate, canary, promote, watch) with approval per stage | Use case: quality and record | Partial |
| C-p5-24 | J8 + v6 | Approve proposals in the loop (start Official run, schedule step, canary plan, candidate gate) | Use case: quality and record | Partial |
| C-p5-25 | v6-J8 | Checkpoint vs incumbent paired comparison (Practice, never citable) with line items to watch | Use case: quality and record | Present |
| C-p5-26 | v6-J8 | Self-healing gap report table (gap, measure, now, bar, fix, state) | Use case: quality and record | Partial |
| C-p5-27 | v6-J8 | Training run for the fix with checkpoints scored as Practice / Official | Use case: quality and record | Present |
| C-p5-28 | J8 + v6 | Release plan / ramp and migration: canary steps, candidate, hold, promote, v2 on previous 30 days, retire; who decides; earliest | Use case: quality and record | Partial |
| C-p5-29 | J8 + v6 | What the canary must show (consistency, TTFT, errors, availability) | Use case: quality and record | Partial |
| C-p5-30 | J8 + v6 | One-way doors: hold to promote (gated), hold to roll back | Use case: quality and record | Partial |
| C-p5-31 | J8 | Loops by task (specialist loops, started from Quality) | Use case: quality and record | Missing |
| C-p5-32 | J8-Data | Data accumulation toward the next specialist (samples vs target, eval threads vs interval, days to target) | Use case: quality and record | Missing |
| C-p5-33 | J8-Data | Eligible share funnel (consent, tier, PII, quality filters) and sample sources | Use case: quality and record | Missing |
| C-p5-34 | J8-Data | Side-by-side preferences: in-app pairs and rater pairs, Bradley-Terry | Use case: quality and record | Missing |
| C-p5-35 | J8-Specialist | Specialist pass targets (match quality, beat latency and cost), distillation recipe, teacher comparison | Use case: quality and record | Missing |
| C-p5-36 | J8-Release + v6 | Endpoint builds by alias; a new build is a new usage needing approval | Use case: quality and record | Missing |
| C-p5-37 | J9 + v6 Record | Bars on the record against the Official run with base comparison, who set each bar | Use case: quality and record | Present |
| C-p5-38 | J9 + v6 | Risk tier (computed, override) and sensitivity tier on the record | Use case: quality and record | Missing |
| C-p5-39 | J9 | Governance steps (intake, risk review, evaluation, human review, monitoring) | Use case: quality and record | Missing |
| C-p5-40 | J9 + v6 | Lifecycle with Under review / Decommissioned and review cadence by risk tier | Use case: quality and record | Missing |
| C-p5-41 | J9 + v6 | Findings register with severity, owner, due, state (incl. closed) | Use case: quality and record | Partial |
| C-p5-42 | J9 + v6 | Record completeness (12 parts, who keeps each) | Use case: quality and record | Missing |
| C-p5-43 | v6-J9 | Needs a decision on the record: book the resubmission, cohort extension (hold to approve) with Governance agent plan | Use case: quality and record | Partial |
| C-p5-44 | J9-Evidence + v6 | Validation components (conceptual soundness, outcomes analysis, ongoing monitoring) with sign-offs | Use case: quality and record | Missing |
| C-p5-45 | J9-Evidence + v6 | Evidence list: Official runs, Practice (not citable), production sample, outside-the-portal study, withdrawn data flags | Use case: quality and record | Partial |
| C-p5-46 | J9-Evidence | Regression gate table with PDF for Risk | Use case: quality and record | Partial |
| C-p5-47 | J9-Evidence + v6 | Sign-offs: approvals and recurring attestations with attest action | Use case: quality and record | Partial |
| C-p5-48 | J9-Evidence | What each approval covers (model, serving setting, endpoint build, usage) | Use case: quality and record | Missing |
| C-p5-49 | J9-Monitoring + v6 | Monitoring plan: signals, baseline, warning, critical, task owner, now | Use case: quality and record | Missing |
| C-p5-50 | J9-Monitoring | Limits ledger (budget, rate limit, cohort, capture consent, boundary, retention) | Use case: quality and record | Missing |
| C-p5-51 | J9-Monitoring | Incident plan with steps and last drill | Use case: quality and record | Missing |
| C-p5-52 | J9-Monitoring + v6 | Record activity log, every change a dated row with tier; export audit pack | Use case: quality and record | Partial |
| C-p5-53 | J9-Requirements | Owner requirements versions (rubric, musts, must-nots, thresholds) with scorer results on every request | Use case: quality and record | Missing |
| C-p5-54 | J9-Requirements | Compare versions; propose v5; validator approves | Use case: quality and record | Missing |
| C-p5-55 | J9 | Request a change to the record | Use case: quality and record | Missing |

## C · p6 · Use case workbench

| ID | Board | Feature | Area in the proposal | State, 10 Nov |
|---|---|---|---|---|
| C-p6-01 | W1 Prompts | Prompt versions per use case, immutable, with commit message, state (draft / canary / prod / previous / retired), traffic, score | Workbench: prompts, data sets, alerts | Missing |
| C-p6-02 | W1 | Compare two versions side by side (text diff, tokens, cacheable prefix, finish reasons, score) | Workbench: prompts, data sets, alerts | Missing |
| C-p6-03 | W1 | Propose a version; run Practice on a draft; promote gated on Official score and hygiene | Workbench: prompts, data sets, alerts | Missing |
| C-p6-04 | W1 | Registered calls (share carrying a known prompt_id) | Workbench: prompts, data sets, alerts | Missing |
| C-p6-05 | W1-Library | Prompt and template library across use cases (owner, pillar, adopters, hygiene), filter, publish a template | Workbench: prompts, data sets, alerts | Missing |
| C-p6-06 | W1-Library | Fork a template into a project, upstream tracking (behind by n versions), compare with upstream | Workbench: prompts, data sets, alerts | Missing |
| C-p6-07 | W1-Hygiene | Eight hygiene checks per version (variables declared, no secrets, disclosure, no client ids in examples, static prefix, schema, contradictions, length) | Workbench: prompts, data sets, alerts | Missing |
| C-p6-08 | W1-Hygiene | Evaluation agent drafts the fix version | Workbench: prompts, data sets, alerts | Missing |
| C-p6-09 | W1-Hygiene | Change alerts (alias moves, check newly fails, unscored serving) and the promotion rule | Workbench: prompts, data sets, alerts | Missing |
| C-p6-10 | W1-Rollout | Stepped prompt rollout (5 / 25 / 50 / 100%) with guards at hold and roll-back levels; advance, hold, roll back | Workbench: prompts, data sets, alerts | Missing |
| C-p6-11 | W1-Rollout | Cost of a version at 100% (token deltas priced) | Workbench: prompts, data sets, alerts | Missing |
| C-p6-12 | W1-Rollout | Rollout history per version | Workbench: prompts, data sets, alerts | Missing |
| C-p6-13 | W2 + v6 Data sets | Data-set register: kind, rows, data boundary, retention class, used by, checks, lineage | Workbench: prompts, data sets, alerts | Partial |
| C-p6-14 | v6-W2 | Lineage from sources to data set to training run to checkpoints to Official run | Workbench: prompts, data sets, alerts | Partial |
| C-p6-15 | W2 + v6 | Composition by task against the per-task floor; split | Workbench: prompts, data sets, alerts | Missing |
| C-p6-16 | v6-W2 | The corrected data for the gap report (gap tags, sources) | Workbench: prompts, data sets, alerts | Partial |
| C-p6-17 | W2 + v6 | Schema with roles and masked preview (values never shown) | Workbench: prompts, data sets, alerts | Present |
| C-p6-18 | W2 | Training readiness (eligible samples vs target, daily accrual, unlock date) | Workbench: prompts, data sets, alerts | Missing |
| C-p6-19 | W2 + v6 | Queues holding data back (PII review, self-healing marks, corrections, new topics) with service targets | Workbench: prompts, data sets, alerts | Partial |
| C-p6-20 | W2 | Export manifest; copy to another project with steward approval | Workbench: prompts, data sets, alerts | Missing |
| C-p6-21 | W2-EvalSets + v6 | Eval set / TL Index edition manifest: items per pillar and line item, interval each supports, bars, judge, attempts, exclusions | Workbench: prompts, data sets, alerts | Partial |
| C-p6-22 | v6-W2 | Runs on this edition, including partial runs (vendor items that may not leave, errored items) | Workbench: prompts, data sets, alerts | Partial |
| C-p6-23 | W2-EvalSets | Build the next eval set version (target interval, scope, data from upload / traces / generation, evaluators, validator sign-off) | Workbench: prompts, data sets, alerts | Missing |
| C-p6-24 | W2-EvalSets + v6 | Corrections waiting to enter the eval set (accept / reject with reason); frozen-edition rule queues them to the next edition | Workbench: prompts, data sets, alerts | Missing |
| C-p6-25 | W2-EvalSets + v6 | New topics to triage into scope (add / generate edge cases / not in scope) | Workbench: prompts, data sets, alerts | Missing |
| C-p6-26 | W2-Generate + v6 | Generated data pipeline: gap report → seed rows → generation → judge → validators; tagged generated for life | Workbench: prompts, data sets, alerts | Missing |
| C-p6-27 | W2-Generate | Checks on generated rows (PII echo, compliance, duplicates, contamination, schema) and agent-proposed edge-case families | Workbench: prompts, data sets, alerts | Missing |
| C-p6-28 | W2-Import + v6 | Bring data in: upload or stage from S3 | Workbench: prompts, data sets, alerts | Present |
| C-p6-29 | W2-Import + v6 | Staging job status (objects, size, formats, rows) within a minute of each change | Workbench: prompts, data sets, alerts | Partial |
| C-p6-30 | W2-Import + v6 | Format detection with confidence and role mapping per column; PDF/DOCX chunking | Workbench: prompts, data sets, alerts | Partial |
| C-p6-31 | W2-Import + v6 | Split and checks, then approve versioning | Workbench: prompts, data sets, alerts | Partial |
| C-p6-32 | W2-Import + v6 | Rejected rows by check (PII, compliance, duplicates) over 30 days | Workbench: prompts, data sets, alerts | Missing |
| C-p6-33 | W3 + v6 Alerts | Alerts in the window with value, threshold, severity, state, linked incident or finding | Workbench: prompts, data sets, alerts | Present |
| C-p6-34 | W3 + v6 | Open alert with why, owner, closing rule | Workbench: prompts, data sets, alerts | Present |
| C-p6-35 | W3 + v6 | Acknowledge / acknowledge all; silence renotification until a date | Workbench: prompts, data sets, alerts | Missing |
| C-p6-36 | W3 + v6 | Alert rules from the record (kind, warning / critical, window, route, noise control, no-data behaviour); propose a threshold change | Workbench: prompts, data sets, alerts | Missing |
| C-p6-37 | W3-Escalation + v6 | Escalation chain (route, ack, 60-min page, resolve), quiet hours, governance reminders, threshold review flag, seasonal band | Workbench: prompts, data sets, alerts | Missing |
| C-p6-38 | W3-Outcomes | Time to acknowledge / resolve, share that led to a change, resolved alerts with outcome | Workbench: prompts, data sets, alerts | Missing |
| C-p6-39 | W3-Outcomes | Why? root-cause view for an alert with contributing causes and ruled-out factors | Workbench: prompts, data sets, alerts | Missing |
| C-p6-40 | v6-W3 | Incident timeline from alert events | Workbench: prompts, data sets, alerts | Present |
| C-p6-41 | W3-Digest + v6 | Weekly digest: numbered decisions, coming up, stale queues, untagged calls, traffic by pattern, quality; subscribers, readership, mute by reply | Workbench: prompts, data sets, alerts | Missing |

## C · p7 · Training

| ID | Board | Feature | Area in the proposal | State, 10 Nov |
|---|---|---|---|---|
| C-p7-01 | T1 + v6 New training run | Guided start of a run on one page | Training | Partial |
| C-p7-02 | T1 + v6 | Start from a base (with live pillar scores and recommendation) or continue from a kept checkpoint | Training | Partial |
| C-p7-03 | T1 + v6 | Train as Generate / Extract / Decide | Training | Missing |
| C-p7-04 | T1 + v6 | Data set with eligible items after self-healing marks (set aside by reason), split, checks | Training | Partial |
| C-p7-05 | T1-Recipe + v6 | Recipe: Recommended / saved / custom / upload YAML; frozen at start; changed-field chips | Training | Missing |
| C-p7-06 | T1-Recipe | Recipe library with versions and gate results of runs that used each | Training | Missing |
| C-p7-07 | T1-Recipe | Metrics sinks (portal, TensorBoard, W&B; scalars only) | Training | Missing |
| C-p7-08 | T1 + v6 | Compute, cost and queue: GPU tier, estimate, queue position, project budget, cost cap | Training | Missing |
| C-p7-09 | T1-DryRun + v6 | Dry run of 60 steps proving recipe, data load, memory, loss, checkpoint round trip, logging, eval hook; refined estimate | Training | Missing |
| C-p7-10 | T1 + v6 | Needs a decision before Start (project not set, custom recipe not dry-run, memory tight) | Training | Missing |
| C-p7-11 | T1 + v6 | Projected score from a Practice run, marked not citable | Training | Missing |
| C-p7-12 | T5 Pre-flight | Pre-flight validation (schema, token count, PII flags to review queue, near-duplicates of the eval set) | Training | Missing |
| C-p7-13 | T5 | Estimate against remaining budget, cost cap that pauses and keeps a checkpoint, raise cap asks the owner | Training | Missing |
| C-p7-14 | T2 + v6 Runs in flight | Runs in flight with stage tracker (queued, data checks, training, evaluating, gate, done) | Training | Partial |
| C-p7-15 | T2 + v6 | Status, ETA, step / epoch, validation loss vs best, cost so far vs estimate and cap, GPU utilisation | Training | Missing |
| C-p7-16 | T2 + v6 | Training charts (train loss, eval loss, learning rate, grad norm) with range, smoothing, log scale, clip outliers, spike flags | Training | Missing |
| C-p7-17 | T2 + v6 | Overfitting alert rule with best checkpoint kept | Training | Missing |
| C-p7-18 | T2 + v6 | Stop and keep (ThinkLatent) / cancel (owner) | Training | Missing |
| C-p7-19 | T2 + v6 | Runs started from Relay appear with project id | Training | Missing |
| C-p7-20 | T2 + v6 | GPU monitor per node (utilisation, VRAM, power, temperature, step time, tokens/s, MFU) | Training | Missing |
| C-p7-21 | T2-Logs + v6 | Job log live tail with filters (warnings, errors, source), find, follow; warnings explained in plain words | Training | Missing |
| C-p7-22 | T2-UpNext + v6 | Data toward each next specialist across projects (samples vs target, rate, days, ready) | Training | Missing |
| C-p7-23 | T2-UpNext + v6 | Agent proposals: set up a ready run, locate similar data (data owner approves) | Training | Missing |
| C-p7-24 | T3 Run history | Every run with recipe, data version, validation, use-case score, gate result and round, checkpoint, origin, logs; filters | Training | Partial |
| C-p7-25 | T3 | Tiles: runs this quarter, gate pass rate, rounds to pass, spent vs estimated, started from Relay | Training | Missing |
| C-p7-26 | T3 | Compare two runs | Training | Partial |
| C-p7-27 | T3 | Re-run; re-export weights to the registry only (adapter or merged), with reason | Training | Missing |
| C-p7-28 | T3 | Withdrawn-data flag on runs trained on withdrawn sets | Training | Missing |
| C-p7-29 | T4 Base models | Selectable bases by pipeline status, licence, size, recommended train-as, weakest live pillar | Training | Partial |
| C-p7-30 | T4 | Which base for which job: pillar scores of every base | Training | Partial |
| C-p7-31 | T4 | Add a base to the pipeline (import, validation, Official run, finalised) | Training | Missing |
| C-p7-32 | T4-NewBase | New base retraining plan (derived models in order, owners, estimates, gates), approve / approve partly / decline with reason | Training | Missing |
| C-p7-33 | T6 + v6 Checkpoints | Checkpoints kept with losses, gate-pillar quick scores, use-case score, cost to here, gaps; best selected by default | Training | Partial |
| C-p7-34 | T6 + v6 | Export a checkpoint to the registry (adapter or merged) and promote as candidate alias | Training | Missing |
| C-p7-35 | T6 + v6 | Send to the TL Index (Official run on a checkpoint) | Training | Partial |
| C-p7-36 | T6 | Loss mask on a rendered synthetic sample | Training | Missing |
| C-p7-37 | T6-Gaps + v6 | Gap report per checkpoint: gaps ranked by pillar and skill, error classes, failure slices, blocking | Training | Missing |
| C-p7-38 | T6-Gaps | Heal return per gap (generated / located items, provenance, review state, reason if not addressed) | Training | Missing |
| C-p7-39 | T6-Gaps | Over-fitting flag (new vs training-like inputs) | Training | Missing |
| C-p7-40 | T6-Decide + v6 | Decide specialists: held-out accuracy and calibration error before/after per checkpoint, over-confident errors, by route; recalibration proposal | Training | Missing |

## C · p8 · Data

| ID | Board | Feature | Area in the proposal | State, 10 Nov |
|---|---|---|---|---|
| C-p8-01 | D1 Review queue | Reviews assigned to me with service target, oldest, completed this week, past target | Data | Partial |
| C-p8-02 | D1 | Claim next; item in focus with masked snippet, context on demand (logged), flag sources (PII pipeline, self-healing scorer), claim lock | Data | Partial |
| C-p8-03 | D1 | Rubric: PII decision with reason code, usability per training kind, approve / reject with reason / skip | Data | Missing |
| C-p8-04 | D1 | Similar items decided this month (pattern from the graph) | Data | Missing |
| C-p8-05 | D1-Quality | Second reviews (10% blind), confusion matrix, team and personal κ, settled by validator | Data | Missing |
| C-p8-06 | D1-Quality | Reviewers table: decisions, speed, κ, status | Data | Missing |
| C-p8-07 | D2 Tagging pipelines | Pipeline cards: status (live / shadow / planned), version, coverage, precision from reviews, flagged per day, threshold with history | Data | Partial |
| C-p8-08 | D2 | Where each pipeline is enabled by data set; enable on a set (back-fill) | Data | Missing |
| C-p8-09 | D2 | Tune thresholds (ThinkLatent) with replay | Data | Missing |
| C-p8-10 | D2-Engineering | Threshold history with precision before / after and the decisions behind each change | Data | Missing |
| C-p8-11 | D2-Engineering | Staging and graph ingestion by batch (rows in, accepted, rejected with reasons, arrival to graph lag) | Data | Missing |
| C-p8-12 | D2-Propose | Propose a new tagging pipeline (what to flag, evidence, data sets, kinds of training, precision target) | Data | Missing |
| C-p8-13 | D2-Propose | Proposals with ask counts, decision list, 14-day answer, accepted / declined with reason | Data | Missing |
| C-p8-14 | D3 Approvals and insight | Decisions in 30 days approved / rejected by tag, reviewer, reason | Data | Missing |
| C-p8-15 | D3 | What the decisions taught the pipeline (traced insights) | Data | Missing |
| C-p8-16 | D3 | Triage agent pattern proposal sent to the pipeline | Data | Missing |
| C-p8-17 | D3-Engineering | Precision by reviewer and reason code; rating model vs reviews confusion matrix | Data | Missing |
| C-p8-18 | D3-Patterns | Review patterns (PII-P-04 etc.) with decisions explained, state; what else looks like this across projects; queue similar items | Data | Missing |
| C-p8-19 | D4 Self-healing marks | Marks awaiting review by data set and training kind, scorer reason, owner requirement, confidence, confirm / overrule with reason, confirm all above 0.90 | Data | Partial |
| C-p8-20 | D4 | 14-day escalation to the data lead; eligible rows effect | Data | Missing |
| C-p8-21 | D4-Decisions | Decisions and escalations: median days, within 14 days, by data set, escalation log | Data | Missing |
| C-p8-22 | D5 Data-set versions | Versions of a set: immutable, created by, checks, rows, size, used by (projects, runs, Official evaluations), status | Data | Partial |
| C-p8-23 | D5 | Lineage graph version → training runs → Official runs, with withdrawn marks | Data | Partial |
| C-p8-24 | D5-Diff | Diff two versions (added, removed, changed, tag coverage, checks), cached diffs | Data | Missing |
| C-p8-25 | D5-Export | Export the manifest (JSON / CSV / PDF), never row content; export log | Data | Missing |
| C-p8-26 | D5-Export | Steward copies to other projects inside the boundary, data-owner approval, blocked outside | Data | Missing |
| C-p8-27 | D5-Retention | Data boundary and retention class per set | Data | Missing |
| C-p8-28 | D5-Retention | Source deletion flow: versions withdrawn, new version cut, runs and evidence flagged withdrawn data, owner and validator decide | Data | Missing |
| C-p8-29 | D6 Knowledge graph | Status: nodes and edges by type, size and growth, ingestion by source with cadence and lag | Data | Missing |
| C-p8-30 | D6-Coverage | Topic coverage by project and topic group; biggest uncovered topic; send gaps to owners | Data | Missing |
| C-p8-31 | D6-Insight | Enterprise-wide insight: most-asked question types with coverage, weakest domains with Index score | Data | Missing |
| C-p8-32 | D6-Insight | Next-generation (TLM5) data plan lines with owner, due, status | Data | Missing |

## C · p9 · Evaluation: results and index

| ID | Board | Feature | Area in the proposal | State, 10 Nov |
|---|---|---|---|---|
| C-p9-01 | E1 + v6 Evaluation results | A results page per run: headline, overall quality with interval, against the previous run (paired), cited on the record | TL Index and evaluation | Partial |
| C-p9-02 | E1 + v6 | Accuracy and hallucination scored apart; abstention never below a wrong answer | TL Index and evaluation | Missing |
| C-p9-03 | E1 + v6 | Scores by pillar and line item with accuracy, hallucination, n, epochs, previous run, change | TL Index and evaluation | Partial |
| C-p9-04 | E1 + v6 | Phase 2 and candidate pillars listed as dash | TL Index and evaluation | Partial |
| C-p9-05 | E1 + v6 | Stale or below-floor judge greys the pillar ("read with care") | TL Index and evaluation | Missing |
| C-p9-06 | E1 + v6 | Request an evaluation, run the TL Index, mark Official (validators) | TL Index and evaluation | Partial |
| C-p9-07 | v6-E1 | Comparison grade weighing quality, accuracy, hallucination, cost, latency | TL Index and evaluation | Partial |
| C-p9-08 | E1-Items + v6 | Items that fell with judge rationale summary, item detail (epochs, flipped, hallucination), replay as Practice | TL Index and evaluation | Missing |
| C-p9-09 | E1-Items + v6 | Failure clusters by the Evaluation agent with proposals | TL Index and evaluation | Missing |
| C-p9-10 | E1-Items | Add failing items to an eval / regression data set, held-out guard blocks training until rotation | TL Index and evaluation | Missing |
| C-p9-11 | E1-Judge + v6 | Judge trust per pillar (κ, bias, labelled n, last calibrated, trust state), recall by label | TL Index and evaluation | Partial |
| C-p9-12 | E1-Judge + v6 | Judge finding with recalibration plan (accept / assign reviewers) | TL Index and evaluation | Missing |
| C-p9-13 | E1-Judge | Method and exclusions (items, rotation, bootstrap, judge, harness build, seed) | TL Index and evaluation | Partial |
| C-p9-14 | E1-Runs + v6 | Live and recent runs with evaluator compute vs judge spend | TL Index and evaluation | Partial |
| C-p9-15 | E1-Runs | Vendor evidence that expires (90 days or vendor change), re-runs booked, notify record owners | TL Index and evaluation | Missing |
| C-p9-16 | E2 Index | Index overview tiles: models, items per edition, rank stability, cheapest model clearing every bar | TL Index and evaluation | Partial |
| C-p9-17 | E2 | Quality against cost per task frontier chart (Pareto line, workflow bars), filter by pillar | TL Index and evaluation | Missing |
| C-p9-18 | E2 | In plain language: how to read the Index | TL Index and evaluation | Present |
| C-p9-19 | E2 | Per workflow: bars from the record, sufficient models cheapest first | TL Index and evaluation | Present |
| C-p9-20 | E2-Scorecard | Scorecard pillar x model against the Index bar set by the pillar council, too few, greyed stale | TL Index and evaluation | Partial |
| C-p9-21 | E2-Scorecard + E3-Dimensions | Metric dimensions per cell: calibration, robustness, fairness, toxicity, efficiency | TL Index and evaluation | Missing |
| C-p9-22 | E2-Scorecard | Judge trust and data sets per pillar in this edition | TL Index and evaluation | Missing |
| C-p9-23 | E2-Sufficiency | Sufficiency filter: choose pillars and bars (Index, a workflow's, my own) and a token-shape cell; sufficient models sorted by cost | TL Index and evaluation | Missing |
| C-p9-24 | E2-Sufficiency | Cheaper variant check (Core vs Distil gap and saving) | TL Index and evaluation | Missing |
| C-p9-25 | E2-Sufficiency | Demand signals to the pillar council (ask for a skill, asks, decision list, answers) | TL Index and evaluation | Missing |
| C-p9-26 | E2-Editions | Edition report drafted by the Index agent; Head signs off (publishes, fixes edition) or asks to revise | TL Index and evaluation | Missing |
| C-p9-27 | E2-Editions | Quarterly report entry: spend impact, frontier-release verdicts, capability trends | TL Index and evaluation | Missing |
| C-p9-28 | E2-Editions | Business-line composites with saved weights | TL Index and evaluation | Missing |
| C-p9-29 | E2-Editions + E4-Feed | Evaluation feed; follow a model to hear when it is scored | TL Index and evaluation | Missing |
| C-p9-30 | E3 Leaderboard | Ranked leaderboard with rank as interval, ties, Practice greyed, pinned configuration, style control | TL Index and evaluation | Missing |
| C-p9-31 | E3 | Filters: size, precision, type, reasoning mode, hosting, licence | TL Index and evaluation | Missing |
| C-p9-32 | E3-Compare | Compare two to four models per data set against a baseline, ties vs worse, save comparison | TL Index and evaluation | Partial |
| C-p9-33 | E3-Arena | Preference arena: blind pairwise votes, Bradley-Terry ratings, beside judge score; vote | TL Index and evaluation | Missing |
| C-p9-34 | E3-Dimensions | Accuracy and hallucination with hallucination-adjusted score | TL Index and evaluation | Missing |
| C-p9-35 | E4 Corrections | Corrections changelog (what, why, runs affected, approved by, status) | TL Index and evaluation | Missing |
| C-p9-36 | E4 | Propose a correction; subscribe | TL Index and evaluation | Missing |
| C-p9-37 | E4-Feed | Feed and subscriptions: models you follow, corrections touching what you cite, delivery channel | TL Index and evaluation | Missing |
| C-p9-38 | E4-Editions | Edition diff (items rotated, judge version, bars moved, cells that flipped with reason); edition history | TL Index and evaluation | Missing |

## C · p9b · Evaluation: requests, trials, pillars

| ID | Board | Feature | Area in the proposal | State, 10 Nov |
|---|---|---|---|---|
| C-p9b-01 | E6 Requests | Evaluation request queue with ordering rules (gate and corrections first), position, priority, estimate, filters | TL Index and evaluation | Missing |
| C-p9b-02 | E6 | Queue tiles: waiting, scoring now, median wait, next to start | TL Index and evaluation | Missing |
| C-p9b-03 | E6-Live | Live run progress per pillar with provisional partial scores, cost so far vs cap, ETA, notify me per pillar, cancel | TL Index and evaluation | Missing |
| C-p9b-04 | E6-Live | Regression gate so far, decided only on final intervals | TL Index and evaluation | Missing |
| C-p9b-05 | E6-New | New evaluation request form: model, serving setting (incl. copy a use case's prod setting), pillars (gate pillars locked on), Official vs Practice, reason, budget, predicted position, similar requests | TL Index and evaluation | Partial |
| C-p9b-06 | E7 Model trials | Trial brief: intent, requirements with bars, skill declaration mapped to pillars | TL Index and evaluation | Missing |
| C-p9b-07 | E7-Scenarios | Scenario set built from real decisions, per-scenario items and production share, label agreement, overlap check, build checks, locked version | TL Index and evaluation | Missing |
| C-p9b-08 | E7-Results | Run and compare two models on the scenario set against requirements, per scenario | TL Index and evaluation | Missing |
| C-p9b-09 | E7-Decision | Decision package drafted by the agent: options with requirements met, cost, time to live; recommendation with confirms / refutes; build request; owner decides | TL Index and evaluation | Missing |
| C-p9b-10 | E8 Contribute | Offer a registered data-set version to the Index (purpose, pillar, sensitivity, licence) | TL Index and evaluation | Missing |
| C-p9b-11 | E8-Profile | Automatic profile report (schema, size, sensitivity, licence, duplicates, malformed, overlap, label quality, coverage, difficulty) and decision join / seed / hold | TL Index and evaluation | Missing |
| C-p9b-12 | E8-Validation | Practitioner validation (blind sample, agreement vs bar, changed items back to contributor) | TL Index and evaluation | Missing |
| C-p9b-13 | E8-Validation | Contributor credit in edition notes, pillar page and profile | TL Index and evaluation | Missing |
| C-p9b-14 | E8-Council | Pillar council: candidate pillars with readiness, asks, accept / decline with reason, next sitting | TL Index and evaluation | Missing |
| C-p9b-15 | E9 Pillar page | Pillar definition, task families, operations served, production bars, gate role, cheapest model clearing | TL Index and evaluation | Missing |
| C-p9b-16 | E9-Composition | Pillar composition: active / candidate / retired data sets with weights, contributors, retired ledger | TL Index and evaluation | Missing |
| C-p9b-17 | E9-Judge | Pillar judge calibration (confusion matrix vs practitioners, agreement by criterion, judge configuration) | TL Index and evaluation | Missing |
| C-p9b-18 | E9-Saturation | Saturation curves and watch (ceiling, headroom, top-four spread, retire or harden) | TL Index and evaluation | Missing |

## C · p10 · Agents and playground

| ID | Board | Feature | Area in the proposal | State, 10 Nov |
|---|---|---|---|---|
| C-p10-01 | A1 Agent library | Library of packaged agents (pattern, models via gateway, built-in algorithms, versions, used by, register id, Official evaluation) | Agents and playground | Missing |
| C-p10-02 | A1 | Adopt into a project (opens Start a project prefilled: routing, eval set, budget, approval template), gated on an Official result | Agents and playground | Missing |
| C-p10-03 | A1 | Try an agent; request a feature | Agents and playground | Missing |
| C-p10-04 | A1 | "Which tool should I use?" pointer to the firm's licensed vendor assistant for non-boundary work | Agents and playground | Missing |
| C-p10-05 | A1-Build | Three ways to start: adopt, fork a starter repo (preset client, CI eval hook, deploy chart), retrofit an existing app | Agents and playground | Missing |
| C-p10-06 | A1-Build | Inner-source contributions and retrofitted apps counts | Agents and playground | Missing |
| C-p10-07 | A1-Register | Agent register (business owner, build owner, autonomy tier, three-axis class, volume, labelled data, corrections, judge rubric, status); register an agent; export | Agents and playground | Missing |
| C-p10-08 | A1-Register | Agent traffic not on the register (grace to register) | Agents and playground | Missing |
| C-p10-09 | A1-Requests | Agent requests with asks, decision lists, 14-day answer, accepted / declined with reason | Agents and playground | Missing |
| C-p10-10 | A2 Agent page | Agent overview with metrics (pass^3, pass@1, task success, groundedness, abstention, steps, latency, acceptance) against targets | Agents and playground | Missing |
| C-p10-11 | A2 | Book office hours with the agent owner; changelog | Agents and playground | Missing |
| C-p10-12 | A2-Record | Agent record: owners, volume, labelled data, corrections, judge rubric, autonomy tier, class, models it may use | Agents and playground | Missing |
| C-p10-13 | A2-Record | Tools and policy (may call / may not, enforced at the gateway) | Agents and playground | Missing |
| C-p10-14 | A2-Record | Versions and next default change with adopter notice | Agents and playground | Missing |
| C-p10-15 | A2-RunsOn | Same items on every model the agent may use (task success, cost per task, latency), cheaper route check, gap to frontier, vendor non-production only with tokenisation | Agents and playground | Missing |
| C-p10-16 | A2-Use | Call and adopt: alias, tags, feedback call; MCP server use; starter repo release | Agents and playground | Missing |
| C-p10-17 | A3 Agent evaluation | Three-level metrics (step, trace, thread) with n; regression and capability suites; version switch | Agents and playground | Missing |
| C-p10-18 | A3-Variants | Build variants vs frontier baseline (rubric, latency, pass^3, cost, governance exposure); send for approval | Agents and playground | Missing |
| C-p10-19 | A3-Trace | Failing trace step by step with skill, pillar and score, failure tag, cost; add to regression suite; dispute judgement | Agents and playground | Missing |
| C-p10-20 | A3-Engineering | Failure clusters with replay on any version; red-team suite; tools and policy diff between versions | Agents and playground | Missing |
| C-p10-21 | P1 Playground | Compare two models side by side on one prompt | Agents and playground | Present |
| C-p10-22 | P1 | Set-up: alias / route (prod, canary, candidate, previous), system prompt from the prompt store, temperature, max tokens, tools, files (masked) | Agents and playground | Partial |
| C-p10-23 | P1 | Agents and vendor models (non-production) in the playground | Agents and playground | Missing |
| C-p10-24 | P1 | Per-answer tokens, latency, cost, tool calls; trace id | Agents and playground | Missing |
| C-p10-25 | P1 | Grade 1-5, prefer one, flag a problem; save session as prompt version / evaluation case / data-set row; mark as evidence (validators) | Agents and playground | Partial |
| C-p10-26 | P1 | Sessions list kept 30 days; share within the project; demo gallery | Agents and playground | Missing |
| C-p10-27 | P1-EvalSet | Run the use case's eval set on both routes (Practice), by criterion, threads where they differ, request an Official run | Agents and playground | Missing |
| C-p10-28 | P1-Code | View the session as code (alias, tags, feedback call, trace id), Python and curl | Agents and playground | Missing |
| C-p10-29 | P1b Open playground | Playground without a project, daily run allowance, nothing saved, no client data | Agents and playground | Partial |
| C-p10-30 | P1b | Two agents or model vs agent with citations from demo corpora | Agents and playground | Missing |
| C-p10-31 | P1b | Demo gallery labelled with governance status (approved for what) | Agents and playground | Missing |

## C · p11 · Approvals and governance

| ID | Board | Feature | Area in the proposal | State, 10 Nov |
|---|---|---|---|---|
| C-p11-01 | V1 + v6 Approval decision | Decision case for a usage approval: header, use case, phase change, risk tier, recommendation | Approvals and governance | Present |
| C-p11-02 | V1 + v6 | What the approval names: one model, one serving setting, one endpoint build, enforced at the gateway (rule, key); a new build is a new usage | Approvals and governance | Missing |
| C-p11-03 | V1 + v6 | Evidence against the bars with base comparison (regression gate) | Approvals and governance | Present |
| C-p11-04 | V1 + v6 | Thresholds table with where each comes from (record, Policy C-2 sections, onboarding targets), review cadence | Approvals and governance | Partial |
| C-p11-05 | V1 + v6 | Evidence sessions sealed from the playground | Approvals and governance | Partial |
| C-p11-06 | V1 + v6 | Policy checks (12 of C-2) run by the Governance agent, one routed to the approver as a judgement (pass with change / fail) | Approvals and governance | Missing |
| C-p11-07 | V1 + v6 | SLA timer (4 working hours) and escalation to the delegate; hand to the delegate now | Approvals and governance | Missing |
| C-p11-08 | V1 + v6 | Decision options: approve / approve with a condition / reject or send back with reason; options blocked with the reason | Approvals and governance | Partial |
| C-p11-09 | V1 + v6 | Message to the owner drafted by the Governance agent (tone, edit), sent on record | Approvals and governance | Missing |
| C-p11-10 | V1 | Similar approvals in 90 days and standing review proposal for repeat usages | Approvals and governance | Missing |
| C-p11-11 | V1 + v6 | Case timeline and internal notes (@mentions) | Approvals and governance | Missing |
| C-p11-12 | V1 + v6 | Assign; export audit pack; open the record | Approvals and governance | Partial |
| C-p11-13 | v6-V1b | Resubmission case: against the request sent back, findings closed, all bars met | Approvals and governance | Present |
| C-p11-14 | V2 Queue and validation | Validation queue (models, agents, usages ready with Official run and sealed sessions) | Approvals and governance | Partial |
| C-p11-15 | V2 | Validation document drafted by the Evaluation agent: sections with sourced claims, edit, ask agent to redraft, sign once | Approvals and governance | Missing |
| C-p11-16 | V2 | Layered evidence (base model, Index method inherited; only the use-case layer reviewed) with validity | Approvals and governance | Missing |
| C-p11-17 | V2 | Questions asked and answered log on a validation | Approvals and governance | Missing |
| C-p11-18 | V2 | Tiles: validations signed and median time, attestations due, approved for use | Approvals and governance | Missing |
| C-p11-19 | V3 Governance portfolio | Every record under governance (use cases, models, agents) with tier, phase, findings, attestations, breaches, last review, repeat reviews; filters; export; send to Risk monthly | Approvals and governance | Missing |
| C-p11-20 | V3 | Review cycle time against the side-door share (egress), by month, target | Approvals and governance | Missing |
| C-p11-21 | V3 | Tier distribution and median cycle time by tier | Approvals and governance | Missing |

## C · p12 · Operations

| ID | Board | Feature | Area in the proposal | State, 10 Nov |
|---|---|---|---|---|
| C-p12-01 | O1 Unregistered usage | Triage list of unregistered keys and apps: first seen, calls, model, probable owner with confidence, grace day, approvals the policy requires | Operations | Partial |
| C-p12-02 | O1 | Claim, notify, escalate, block at day 30 pending Risk concurrence; export for Risk | Operations | Missing |
| C-p12-03 | O1 | Tiles: unregistered sources, calls a day, oldest, escalated | Operations | Partial |
| C-p12-04 | O1-Kinds | Usage the portal cannot place: tags missing, unknown prompt ids (register as a version), unattributed usage charged to the key's team; day-14 warning header | Operations | Missing |
| C-p12-05 | O1-SideDoor | Side door: vendor APIs called directly, by team and host, approved-tools list, escalation of unapproved hosts, alias route offered, teams converted | Operations | Missing |
| C-p12-06 | O2 Capacity across the cluster | Saturation, goodput and headroom per serving endpoint (hosting tier, alias, GPUs, running / waiting, KV, preemptions, headroom days) | Operations | Partial |
| C-p12-07 | O2 | SRE agent rebalance proposal; rebalance request | Operations | Partial |
| C-p12-08 | O2-GPUs | GPUs allocated / utilised / idle-allocated / unallocated; by region and card; training vs serving split; release idle allocation | Operations | Missing |
| C-p12-09 | O2-GPUs | Lower-region GPU tiers and the training queue (what fits where) | Operations | Missing |
| C-p12-10 | O2-Teams | Usage and spend by team against plan, GPU hours by project, over-plan review | Operations | Missing |
| C-p12-11 | O3 Agents' activity | Action log of every portal agent action (time, agent, action, object, outcome, proposal) | Operations | Missing |
| C-p12-12 | O3 | Proposals open, accepted rate 30 days, pause an agent (reason required) or pause all | Operations | Missing |
| C-p12-13 | O3-SRE | SRE agent runbook drafts (trigger, reviewer, publish) and issues it opened | Operations | Missing |
| C-p12-14 | O3-SelfHealing | Self-healing agent: gaps found, items for review, retrain proposals, marks waiting; action log; pause | Operations | Partial |
| C-p12-15 | O4 Break-glass log | Grants table: who, why, approver, scope, start / end, active now, revoke, review status | Operations | Partial |
| C-p12-16 | O4 | Request a grant | Operations | Present |
| C-p12-17 | O4 | Weekly review of grants by someone other than the approver; findings (wider than needed) | Operations | Missing |
| C-p12-18 | O4 | Active-now chip on the page a grant opens | Operations | Missing |
| C-p12-19 | O4-Policy | Break-glass policy text with versions, proposed change pending Risk | Operations | Partial |
| C-p12-20 | O5 Audit export | Audit trail of decisions and accesses (who, what, when, why, evidence id) | Operations | Partial |
| C-p12-21 | O5 | Scope by project, model or period and kinds of event; preview | Operations | Partial |
| C-p12-22 | O5 | Export CSV / JSON with evidence links; export for Risk; schedule monthly; file expiry | Operations | Partial |
| C-p12-23 | O6 Contract and identity health | Tag completeness per production use case against the telemetry contract | Operations | Missing |
| C-p12-24 | O6 | IAM group mirror lag, resync | Operations | Missing |
| C-p12-25 | O6-Freshness | Pages older than an hour with the late source and its owner; sources behind the pages | Operations | Missing |

## C · p12b · Help and core team

| ID | Board | Feature | Area in the proposal | State, 10 Nov |
|---|---|---|---|---|
| C-p12b-01 | K1 Help | Ask a question: help agent answers with sources and confidence, pages the expert on duty when unsure, "Was this helpful?" | Help | Missing |
| C-p12b-02 | K1 | Help agent proposes an FAQ entry; expert approves | Help | Missing |
| C-p12b-03 | K1 | Links to the approved AI tools list and firm-wide AI training (owned by AI governance) | Help | Missing |
| C-p12b-04 | K1 | The AI guide (how to build on ThinkLatent with Claude Code) linked from Help | Help | Moved on purpose |
| C-p12b-05 | K1-Problems | Log a problem (issue / dependency / risk) and open problem register with owner and status, subscribe | Help | Missing |
| C-p12b-06 | K1-Problems | Problem becomes a Jira ticket within a minute | Help | Moved on purpose |
| C-p12b-07 | K1-Knowledge | Knowledge base with provenance (from answers, from fixes, written), write an article | Help | Missing |
| C-p12b-08 | K1-Knowledge | Weekly report of questions the help agent could not answer | Help | Missing |
| C-p12b-09 | K1-OfficeHours | Book office hours, attendance and what people brought | Help | Missing |
| C-p12b-10 | K1-OfficeHours | Was-this-helpful ratings by place and the quarterly survey | Help | Missing |
| C-p12b-11 | C1 Core team | Claude Code bridge: requests awaiting approval, send an instruction to a session, bridge log | Moved to Cortex (TL-017) | Moved on purpose |
| C-p12b-12 | C1-Backlog | Portal backlog by epic, sprint 46 Jira tickets | Moved to Cortex (TL-017) | Moved on purpose |

## C · p13 · Dark

| ID | Board | Feature | Area in the proposal | State, 10 Nov |
|---|---|---|---|---|
| C-p13-01 | Dark-Home, Dark-Overview, Dark-RunsInFlight | Dark theme for every page | Shell and theme | Present |
| C-p13-02 | Dark-RunsInFlight | Run headline with cost and ETA in the engineering view | Shell and theme | Missing |

## Q · Journeys

| ID | Source | Requirement | State, 10 Nov |
|---|---|---|---|
| Q-2-01 | Journeys App day one 1 | Front door, open TLM4 card, Try it | Partial |
| Q-2-02 | Journeys App day one 2 | Playground: compare two models, try the knowledge agent, nothing saved | Partial |
| Q-2-03 | Journeys App day one 3 | Start a project with onboarding agent; POC, Draft record, tagged sandbox key, Relay snippet | Partial |
| Q-2-04 | Journeys App day one 4 | Project home: POC, members, first traced call with tags, non-production traffic labelled | Partial |
| Q-2-05 | Journeys App day N 1 | Home: projects with health, open alert, overnight run, approval waiting | Partial |
| Q-2-06 | Journeys App day N 2 | Overview: what the portal noticed, deltas, digest | Partial |
| Q-2-07 | Journeys App day N 3 | Request Build / Pilot with checks; backlog position | Partial |
| Q-2-08 | Journeys App day N 4 | Pilot numbers production-grade and on the record; readiness summary signed | Partial |
| Q-2-09 | Journeys App day N 5 | Stage data, job status, start a run, general beside use-case score, canary decides | Partial |
| Q-2-10 | Journeys Foundation 1 | Home: reviews assigned, runs in flight, overnight agent findings | Partial |
| Q-2-11 | Journeys Foundation 2 | Review queue with rubric and claim lock; approve/reject; insight panel | Partial |
| Q-2-12 | Journeys Foundation 3 | Retraining Core/Distil, new base, recipe, metrics, gate, Relay runs | Partial |
| Q-2-13 | Journeys Foundation 4 | Models: TLM4/TLM5 status, regression suites, migration, deployment | Partial |
| Q-2-14 | Journeys Foundation 5 | Red-team sessions as evidence, findings on the record | Missing |
| Q-2-15 | Journeys Validator 1 | Home: validation queue, models awaiting approval, attestations due | Partial |
| Q-2-16 | Journeys Validator 2 | Run the TL Index themselves; score ± interval with n; method; vs last generation | Partial |
| Q-2-17 | Journeys Validator 3 | Evidence sessions reproducible from the record | Partial |
| Q-2-18 | Journeys Validator 4 | Drafted validation document; edit, sign, approve once for portal and Relay | Partial |
| Q-2-19 | Journeys Everyone 1 | Browse models and agents; try any model; aggregate status | Partial |
| Q-2-20 | Journeys Everyone 2 | Ask a question, expert named and paged | Missing |
| Q-2-21 | Journeys Everyone 3 | Log a problem, Jira ticket, status shown | Missing |
| Q-2-22 | Journeys Agents 1 | Onboarding agent: creation flow and intake backlog | Partial |
| Q-2-23 | Journeys Agents 2 | SRE agent: diagnose, draft runbooks, open issues | Partial |
| Q-2-24 | Journeys Agents 3 | Triage agent | Missing |
| Q-2-25 | Journeys Agents 4 | Self-healing: score, mark, drift, findings to Home and Overview | Partial |
| Q-2-26 | Journeys Agents 5 | Analyst agent on demand | Missing |
| Q-2-27 | Journeys Agents 6 | Every action a proposal in a person's queue and a row in the activity log | Partial |

## Q · Access model

| ID | Source | Requirement | State, 10 Nov |
|---|---|---|---|
| Q-3-01 | Access env: Production | Sealed; time-boxed break-glass with reason, approver, audit; grant shown on the page | Partial |
| Q-3-02 | Access env: Pilot in production | Engineering roles see detail by switching the engineering view on; masked fields | Missing |
| Q-3-03 | Access env: POC and Build | Engineering roles and members; numbers labelled non-production | Partial |
| Q-3-04 | Access layer 2: Project | Membership with owner, engineer, reviewer, viewer; non-members aggregate only | Partial |
| Q-3-05 | Access layer 3: Depth | Aggregate open; drill-in gated by environment role and membership, logged | Missing |
| Q-3-06 | Access "One rule across groups" | Membership decides what you can do; role decides depth | Missing |
| Q-3-07 | Access role: Viewer | Aggregates only | Partial |
| Q-3-08 | Access role: Member viewer | Own projects' detail | Missing |
| Q-3-09 | Access role: Member engineer | Drill-in lower regions and pilot; start training for own projects | Missing |
| Q-3-10 | Access role: Member owner | Use-case approvals in own projects | Partial |
| Q-3-11 | Access role: Reviewer (data) | Assigned queues; item under review; data-set approvals | Missing |
| Q-3-12 | Access role: Validator | Validation views of any model; evaluation items not production; model approval for portal and Relay | Partial |
| Q-3-13 | Access role: Foundation developer | All aggregates, detail where member, drill-in, start training, request break-glass | Partial |
| Q-3-14 | Access role: Production break-glass | Granted on top of any role, time-boxed, one use case | Partial |
| Q-3-15 | Access role: Portal agent | Scoped, logged like a person, never acts alone, proposes | Partial |
| Q-3-16 | Access note 1 | SSO identity, IAM groups, membership mirrored to IAM | N/A |
| Q-3-17 | Access note 2 | Audit row for every drill-in, grant, approval, phase move, training start | Partial |
| Q-3-18 | Access note 3 | Masking is a property of the field | Partial |
| Q-3-19 | Access note 4 | Agents as service identities; proposals land as approvals for people | Partial |

## Q · Experience rules (v6)

| ID | Source | Requirement | State, 10 Nov |
|---|---|---|---|
| Q-4-01 | v6 Page anatomy | Orient, judge, decide, act, trace with sticky section bar and Decide anchor | Partial |
| Q-4-02 | v6 Sections and tabs | Sections per topic; tabs only for alternative views | Partial |
| Q-4-03 | v6 Creation flows | One page, vertical stepper, finished steps fold with Edit, live summary, drafts kept | Partial |
| Q-4-04 | v6 Text budget | Title and one line; no paragraphs in sections | Partial |
| Q-4-05 | v6 Tooltips | ⓘ on hover, focus and tap; ≤2 sentences | Partial |
| Q-4-06 | v6 Scores | Whole percent ± interval, points, paired difference decides Better or Tie | Present |
| Q-4-07 | v6 Precision | Availability 99.95%, money compact from $1,000, cents for unit prices | Partial |
| Q-4-08 | v6 Statistics | κ and similar as word band with glyph; raw value only in tooltip or engineering view | Partial |
| Q-4-09 | v6 Drill-down | Side sheet ≤420 px; hover cards; drawer under row for ≥5 columns | Partial |
| Q-4-10 | v6 Navigation | Breadcrumbs, ⌘K, use-case rail of six | Partial |
| Q-4-11 | v6 Rollout | Boards redrawn in v6 before code | N/A |

## Q · UX improvements

| ID | Source | Requirement | State, 10 Nov |
|---|---|---|---|
| Q-5-01 | UX 1 | Command palette | Missing |
| Q-5-02 | UX 2 | Explain this number (ⓘ to Ask ThinkLatent) | Missing |
| Q-5-03 | UX 3 | Guided first call on new user's home | Partial |
| Q-5-04 | UX 4 | One agent conversation pattern | Missing |
| Q-5-05 | UX 5 | Side-sheet drill-downs | Partial |
| Q-5-06 | UX 6 | What changed since your last visit | Missing |
| Q-5-07 | UX 7 | Hover cards | Missing |
| Q-5-08 | UX 8 | Saved views | Missing |
| Q-5-09 | UX 9 | Activity timeline | Partial |
| Q-5-10 | UX 10 | Notification centre | Missing |
| Q-5-11 | UX 11 | Undo instead of confirm | Missing |
| Q-5-12 | UX 12 | Compare mode | Partial |
| Q-5-13 | UX 13 | Freshness signal | Partial |
| Q-5-14 | UX 14 | Keyboard shortcuts | Missing |
| Q-5-15 | UX 15 | Phone-ready actions | Present |

## Q · Intelligence layer

| ID | Source | Requirement | State, 10 Nov |
|---|---|---|---|
| Q-6-01 | Intel: Per-request scorer | Quality and drift panels, "what the portal noticed", data marks | Partial |
| Q-6-02 | Intel: Session builder | Context reused, checks run on Quality, never named | Missing |
| Q-6-03 | Intel: Knowledge graph | "What else looks like this", clusters, coverage | Missing |
| Q-6-04 | Intel: Rating of data points | Eligible counts, marks, composition | Missing |
| Q-6-05 | Intel: Review feedback loop | Precision per tag, what was learned | Partial |
| Q-6-06 | Intel: Drift detection | Drift panel, thresholds open tasks | Missing |
| Q-6-07 | Intel: Finding generation | Findings with action and evidence on Home, Overview, digest, Data | Partial |
| Q-6-08 | Intel: Project and Enterprise insight | Portfolio view, data plan | Partial |
| Q-6-09 | Intel: Analyst agent | Answer with source and as-of, saveable | Missing |
| Q-6-10 | Intel rule 1 | Scoring on smaller models | N/A |
| Q-6-11 | Intel rule 2 | Every finding links to its aggregate with confidence and n | Partial |
| Q-6-12 | Intel rule 3 | Finding unacted for 30 days is reviewed | Missing |
| Q-6-13 | Intel rule 4 | Generated data tagged, never production evidence | N/A |
