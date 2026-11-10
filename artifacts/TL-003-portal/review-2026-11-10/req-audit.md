# Requirements audit: ThinkLatent Portal prototype against requirements v1 and the gap backlog

Audited 10 Nov 2026 by reading every source file under `/home/claude/portal/apps/portal/src` (4,460 lines: router, shell, homes, pages, panels, flows, workspaces) and the scenario it reads (`packages/scenario/out/scenario.json`). Paths below are relative to `apps/portal/src`. A route under `/soon/<Name>` renders only "Not in this prototype yet" (`pages/Misc.tsx`), so anything that lives only there is Missing.

Skipped as moved or dropped on purpose (CONTEXT.md, gap backlog "Dropped on purpose"): C1 core-team view and Claude Code bridge, E9 epic, foundation journey step 6, the core-developer role row, Jira tasks on H1/H2, the AI guide (all moved to Cortex, TL-017); E5 annual report hub; blueprints; harness views; Unsloth hosting; copies of the approved-tools list. The v5.1 sub-page list is not graded separately: v6 rules replace it. Data points, Backend to UI and Open decisions were not in scope.

Status: Present = does what the item asks · Partial = exists but thinner · Missing = no page or part does it · N/A = not applicable, reason given.
Priority: P1 = a role's core job cannot be done without it · P2 = the job is weaker without it · P3 = nice to have.

Cross-cutting facts that recur below: there is no engineering switch, no role or membership gating (the workspace switcher says "You see the same data; only what is put in front of you changes", `shell/Shell.tsx`), no breadcrumbs, no command palette, no hover cards, no toasts, no model or agent detail page, and the prototype writes nothing (every action ends in "This prototype writes nothing").

## 1. Screen requirements

| Source | Item | Status | Where in the prototype | What is missing | Priority |
| --- | --- | --- | --- | --- | --- |
| Screens H1 | Home: tasks, reviews, projects with phase and health, agent findings, what's new | Partial | `pages/Home.tsx`, `homes/*.tsx`: a home per workspace, each with "Your next step" and one-click open | Reviews with due dates, health per project, agent findings with dismiss/act, what's new; "10 reviews within 5 s" untestable | P2 |
| Screens M1 | Catalogue: generations with status, adoption strip, what's new; Open, Try it, Start a project | Partial | `pages/Models.tsx`: model cards, family filter, status word, latest Official quality ± interval, cost per 1,000 | Adoption strip, what's new, Open / Try it / Start a project buttons (cards are not links); "retired" status | P2 |
| Screens M2 | Model page | Missing | none (cards on `/models` do not open) | Development status, use cases on it, how to call, evidence vs last generation, health, migration, dependents | P2 |
| Screens M3 | Catalogue card per release | Missing | none | Owner, intended use, limits, access, data boundary, known issues, PDF export | P2 |
| Screens M4 | Release bundle | Missing | none | Whole page | P3 |
| Screens M5 | Lineage view | Missing | `/soon/Lineage` placeholder; `base` field exists in scenario but is not rendered | Whole page | P3 |
| Screens M6 | Registry (engineering) | Missing | none | Versions, built from, bars cleared, endpoint build, filter, compare | P2 |
| Screens A1 | Agent library | Missing | `/soon/Agents` placeholder | Whole page | P2 |
| Screens A2 | Agent page | Missing | none | Whole page | P2 |
| Screens A3 | Agent evaluation | Missing | none | Whole page | P2 |
| Screens P1 | Playground | Partial | `workspaces/approver/Playground.tsx`: two Enterprise-hosted models, sample prompts, side-by-side answers (canned text, labelled), "kept on the record" when opened from a request | System prompt, parameters, tools, files, agents, saved sessions; Save to project, Share, View as code, Mark as evidence, replay | P2 |
| Screens E1 | Evaluation results page | Partial | `workspaces/foundation/Evaluation.tsx`: Official and Practice tables, line items per pillar with ± and n, "Too few items", paired compare with forest plot, rose/fell | Method and exclusions, judge calibration, item drill-down, Run TL Index, Mark Official | P2 |
| Screens E2 | Index page | Partial | `workspaces/approver/Evidence.tsx`: Official runs with every pillar ± interval, rule for clearing a bar, "Which models clear what" per use case (sufficiency) | Ranked graphic, method and data panels, variant comparison card, filter by pillar, download; as-of per number (edition only in hints) | P2 |
| Screens E3 | Leaderboard | Partial | `Evidence.tsx` DataTable sorted by quality, with intervals | Ties rendered as ties in the ranking, filters, compare from the board | P3 |
| Screens E4 | Corrections log | Missing | `/soon/Corrections` placeholder | Whole page | P3 |
| Screens J1 | Projects list | Partial | `workspaces/head/Portfolio.tsx` (Head only): use cases with stage, owner, business line, model, tasks a day, blocker; bar chart by stage; value for one use case | Health, open alerts, adoption funnel, champions, Start a project; only UC-0291 opens; not reachable as a project list for other roles except via All | P2 |
| Screens J2 | Project home | Partial | `pages/Journey.tsx` (a use-case page, not a project page): stage stepper, "To reach X" checklist with one action each, history timeline | Project-level page, members and roles, runs, data sets, open approvals, Add a member, intake backlog position | P2 |
| Screens J3 | Use case: Overview | Partial | `pages/Journey.tsx`: four health tiles, "Look closer" to six panels | Headline deltas, "what the portal noticed", environment label (POC/Build numbers are simply absent, not labelled non-production) | P2 |
| Screens J4 | Use case: Traffic | Partial | `panels/Performance.tsx`: tasks, TTFT p95/p50 by day, errors, availability calendar, incident and alerts | Length matrix p50·p99, TTFT split, stalls, finish reasons, contract buckets | P3 |
| Screens J5 | Use case: Capacity | Partial | `panels/Cost.tsx` (cost) and `workspaces/ops/Capacity.tsx` (platform GPU, cache) | Goodput, error budget, saturation and cache by session depth for the use case | P3 |
| Screens J6 | Use case: Models | Partial | `panels/ModelsCanary.tsx`: serving now, canary share and result, paired forest plot, Practice "not citable" warning, hold-to-roll-back | Promote action and its disabled rule, prompt versions, endpoint build version | P2 |
| Screens J7 | Use case: Quality | Partial | `panels/Quality.tsx`: checks vs bars, daily judged quality chart, finding F-0412, κ with word band | Acceptance, persistence, annotation queue, drift, clusters, Claim, Add to data set, greying below calibration floor | P2 |
| Screens J8 | Use case: Improve | Partial | `panels/ImprovePlan.tsx`, `flows/Improve.tsx`: loop steps and timeline, hold to approve the plan; roll back needs no approval (`ModelsCanary.tsx`) | Aliases, teacher comparison, pairwise capture, Train a specialist | P2 |
| Screens J9 | Use case: Record | Partial | `panels/Record.tsx`: bars with "set by", approval history timeline with Official runs, owner, attestation and review dates on the Production day | Risk tier with override, base-model record, findings, limits with approval, governance steps, Request a change, Export audit pack | P2 |
| Screens W1 | Prompts | Missing | `/soon/Prompts` placeholder | Whole page | P2 |
| Screens W2 | Data sets and queues (project) | Partial | `flows/DataEvaluate.tsx`: upload or S3 stage, import status, schema with column roles, versioned as evaluation set | Project data-sets page, split and checks, queues with service targets, composition, Approve | P2 |
| Screens W3 | Alerts and digest | Partial | `workspaces/ops/Alerts.tsx` (open, resolved, owner of next step, incident timeline); alert list in `panels/Performance.tsx` | Routing and noise control, Acknowledge, Change routing, digest as sent, task opened on the owner | P2 |
| Screens T1 | New training run | Partial | `workspaces/foundation/Training.tsx` StartRun: base model, dataset version, review, hold to start | Recommended base, train as, recipe, compute and cost ("Not measured"), name, project, dry run, over-budget rule | P2 |
| Screens T2 | Runs in flight | Partial | `Training.tsx` RunCard: state, checkpoints, what each was scored as | Stage stepper, Stop and keep, Cancel, live metrics and charts ("Not measured in this prototype"), recipe, GPU monitor | P2 |
| Screens T3 | Run history | Partial | `Training.tsx` lists finished runs with checkpoints | Recipe, data-set version per run, gate result, Relay-started runs by project ID, Re-run, Compare two runs | P3 |
| Screens T4 | Base models | Missing | bases appear only as radio options inside StartRun | Pipeline status, Add a base, Phi/Gemma selection | P3 |
| Screens T5 | Pre-flight check | Missing | StartRun shows "Compute and duration: Not measured in this prototype" | Data-set validation, GPU hours and cost estimate, budget, pause-with-checkpoint cap | P2 |
| Screens T6 | Checkpoints | Partial | `Training.tsx`: per checkpoint step, date, scored-as run with quality ± interval, link to Evaluation | Loss, cost to that point, best-validation default, Open in playground, Send to TL Index, Promote to registry | P2 |
| Screens M7 | Model lifecycle and dependents | Missing | model status words only (`Models.tsx`, Foundation "Models to watch") | Lifecycle states with dates, activity feed, dependents panel, retirement tasks | P3 |
| Screens H2 | Home, foundation developer | Partial | `homes/Foundation.tsx`: next step, training run R-2291 steps, Practice run, Official runs table, models to watch | Relay-started runs, overnight findings, data reviews assigned, undecided self-healing marks | P2 |
| Screens H3 | Home, application team | Partial | `pages/Home.tsx` AppTeamHome: next step, your use cases with stage | Runs and jobs, open alerts, approvals waiting, usage against ceiling with forecast date | P2 |
| Screens H4 | Home, validator | Partial | `homes/Approver.tsx`: requests waiting oldest first with recommendation and basis, already decided | SLA, attestations due, open findings, delegate escalation | P2 |
| Screens H5 | Home, everyone | Partial | `homes/Explore.tsx`: welcome, "See the models", playground, start a project | What's new, Ask or log, approved-tools and AI-training links, first-time three-step progress | P3 |
| Screens S1 | Settings and notifications | Missing | `/soon/Settings`; only a dark-mode toggle in the header | Notifications per channel, quiet hours, profile, defaults, access requests, what is recorded | P3 |
| Screens X1 | Ask ThinkLatent | Missing | `/soon/Ask` (on the Application team menu) | Whole page | P2 |
| Screens X2 | Inbox | Missing | none | Whole page | P3 |
| Screens J0 | Start a project | Partial | `flows/Start.tsx`: agent-drafted job and data boundary with confirm, candidates vs this job's bars with cost and "Recommended", hosting by stage, owner and members, review and create | Business line, sensitivity tier, volume, latency, labels, app/vendor inputs; monthly cost vs vendor ("not measured"); similar use cases and agents; "what good looks like"; intake queue position; start from existing; duplicate flag; sandbox key with tags (key comes later, untagged, in `flows/FirstCall.tsx`) | P2 |
| Screens J10 | Usage, keys and limits | Partial | `workspaces/ops/Usage.tsx` (Operations only): inventory with tasks a weekday, keys per use case with environment and last rotation | Tokens and spend vs ceiling, forecast, rpm/tpm, rate-limit hits, showback, temporary increase, CSV, statement; nothing per project for the team | P2 |
| Screens J11 | Use case: Traces | Missing | `/soon/Traces` placeholder | Whole page | P2 |
| Screens V1 | Approval decision | Partial | `workspaces/approver/RequestDetail.tsx`: checks n of m with bar source and paired regression vs base run, forest plot vs replaced model, Evidence agent recommendation with basis, note, hold to approve or send back (note required) | Approve with a condition, evidence sessions, similar approvals, case timeline, internal notes vs message, agent confidence, model + serving setting + endpoint build named, gateway enforcement | P2 |
| Screens V2 | Validation workspace and queue | Partial | `workspaces/approver/Requests.tsx` (use-case stage requests only) and `RequestDetail.tsx` | Queue of models and agents with SLA, drafted validation document with sources, layered evidence with valid-until, Q&A log, Run TL Index again, Edit, Sign off for portal and Relay together | P1 |
| Screens V3 | Governance portfolio | Missing | `/soon/Governance`; Head `Portfolio.tsx` shows stage and blocker only | Records with tier, findings, attestations, breaches, cycle time vs side door, filters, Export for Risk | P2 |
| Screens D6 | Knowledge graph | Missing | none | Whole page | P3 |
| Screens E6 | Evaluation requests and live runs | Partial | `flows/DataEvaluate.tsx` "Run the evaluation" queues an Official run; `Evaluation.tsx` "being scored today" | Request form (serving setting, pillars, reason), queue position, progress per pillar, provisional results, cost so far, Cancel | P2 |
| Screens E7 | Model trials | Missing | none | Whole page | P3 |
| Screens E8 | Contribute to the index | Missing | none | Whole page | P3 |
| Screens E9 | Pillar page | Missing | none | Whole page | P3 |
| Screens P1b | Playground without a project | Partial | `Playground.tsx` opened alone says nothing is kept on a request; `homes/Explore.tsx` says nothing typed touches production | Agents, demo gallery with approved-use labels, explicit "nothing is saved" banner, Start a project to save | P3 |
| Screens O1 | Unregistered usage | Partial | `Usage.tsx`: callers with no record, grace steps day 0/14/30, likely project | Claim, Notify, Escalate; usage kinds; side door; grace approvals | P2 |
| Screens O2 | Capacity across the cluster | Partial | `workspaces/ops/Capacity.tsx`: GPU peak/mean meter and chart, days over the scale-out line, cache hits, SRE agent scale-out proposal with hold to approve | Saturation by endpoint, headroom, queue, GPU hours by project | P2 |
| Screens O3 | Agents' activity | Missing | none | Whole page, Pause an agent, proposal acceptance rate | P2 |
| Screens O4 | Break-glass log | Partial | `workspaces/ops/Audit.tsx` Break-glass: policy, grants list (id, date, who, why; empty), hold to request | Approver, scope, start and end columns; Revoke; active grant shown on the pages it opens | P2 |
| Screens O5 | Audit export | Partial | `Audit.tsx`: trail to the story day, filter by kind, "Copy N rows" as TSV | Filters by project, model, period; why and evidence id; export logged; Export for Risk | P2 |
| Screens O6 | Contract and identity health | Missing | none | Whole page | P3 |
| Screens J12 | Use case: Public live view | Missing | none | Whole page | P3 |
| Screens K1 | Help: ask and log | Missing | `/soon/Help` placeholder | Ask, log a problem with Jira status, FAQs, knowledge base, office hours | P2 |
| Screens D1 | Review queue | Partial | `workspaces/foundation/Data.tsx`: waiting, claimed, done counts; one illustrative masked row | Assigned items, rubric, claim lock, reason codes, due dates, Claim, Approve, Reject or Skip with reason; overdue flag on Home | P1 |
| Screens D2 | Tagging pipelines | Partial | `Data.tsx`: pipelines with approved share and last tuned | Coverage, precision from reviews, items flagged per day, Enable, Tune | P3 |
| Screens D3 | Approvals and insight | Missing | none | Whole page | P3 |
| Screens D4 | Self-healing marks | Missing | `Data.tsx` has a self-healing gap-report proposal, not marks | Do-not-use marks, Confirm, Overrule, eligible-count effect | P2 |
| Screens D5 | Data-set versions and lineage | Partial | `Data.tsx`: versions with kind, use case, date, note, link to the training run that used it | Checks, Official runs fed, Diff two versions, immutability stated | P3 |

## 2. Journeys

| Source | Item | Status | Where in the prototype | What is missing | Priority |
| --- | --- | --- | --- | --- | --- |
| Journeys App day one 1 | Front door, open TLM4 card, Try it | Partial | `Models.tsx`; `homes/Explore.tsx` points to it | Generations view, what's new, adoption strip, catalogue card, Try it | P2 |
| Journeys App day one 2 | Playground: compare two models, try the knowledge agent, nothing saved | Partial | `Playground.tsx` (not on the Application team menu; via All or Explore) | Agents; real answers (canned text) | P2 |
| Journeys App day one 3 | Start a project with onboarding agent; POC, Draft record, tagged sandbox key, Relay snippet | Partial | `flows/Start.tsx`, then `flows/FirstCall.tsx` (key, snippet, test request) | Volume and business-line questions, Draft record, tags on key, time-to-first-call measured | P2 |
| Journeys App day one 4 | Project home: POC, members, first traced call with tags, non-production traffic labelled | Partial | `Journey.tsx` stage tracker; FirstCall "Answered" | Members on the page, traced call with tags, non-production Traffic numbers | P2 |
| Journeys App day N 1 | Home: projects with health, open alert, overnight run, approval waiting | Partial | `pages/Home.tsx` | Health, alerts, runs, approvals on Home | P2 |
| Journeys App day N 2 | Overview: what the portal noticed, deltas, digest | Partial | `Journey.tsx` tiles | Noticed, deltas, digest | P2 |
| Journeys App day N 3 | Request Build / Pilot with checks; backlog position | Partial | `flows/RequestStage.tsx`: evidence, approver named, note, hold to send; refuses when evidence would fail | Intake backlog position; no separate Request Build step | P2 |
| Journeys App day N 4 | Pilot numbers production-grade and on the record; readiness summary signed | Partial | `panels/Performance.tsx` shows pilot numbers | "Production-grade" label on record, signed readiness summary | P2 |
| Journeys App day N 5 | Stage data, job status, start a run, general beside use-case score, canary decides | Partial | `DataEvaluate.tsx` (upload/S3, status, result line with use-case score); canary in `ModelsCanary.tsx` | Application team cannot start a training run; TL Index general score beside use-case score | P2 |
| Journeys Foundation 1 | Home: reviews assigned, runs in flight, overnight agent findings | Partial | `homes/Foundation.tsx` | Reviews count, overnight SRE/self-healing findings | P2 |
| Journeys Foundation 2 | Review queue with rubric and claim lock; approve/reject; insight panel | Partial | `Data.tsx` counts and masked row | The review itself and the insight panel | P1 |
| Journeys Foundation 3 | Retraining Core/Distil, new base, recipe, metrics, gate, Relay runs | Partial | `Training.tsx` | Recipe, metrics, gate, new base, Relay runs | P2 |
| Journeys Foundation 4 | Models: TLM4/TLM5 status, regression suites, migration, deployment | Partial | `Models.tsx` status incl. TLM5 "In development" | Regression suites, migration guides, where deployed | P2 |
| Journeys Foundation 5 | Red-team sessions as evidence, findings on the record | Missing | none | Mark as red-team evidence, open a finding | P2 |
| Journeys Validator 1 | Home: validation queue, models awaiting approval, attestations due | Partial | `homes/Approver.tsx` | Models awaiting approval, attestations | P2 |
| Journeys Validator 2 | Run the TL Index themselves; score ± interval with n; method; vs last generation | Partial | `Evidence.tsx`, `RequestDetail.tsx` forest plot | Run TL Index, n per score on Evidence, method and exclusions | P2 |
| Journeys Validator 3 | Evidence sessions reproducible from the record | Partial | `Playground.tsx` from a request says questions are kept on its record | Saved evidence sessions, replay | P2 |
| Journeys Validator 4 | Drafted validation document; edit, sign, approve once for portal and Relay | Partial | `RequestDetail.tsx` decision with note and hold to approve | Validation document, sign-off, model approval for portal and Relay | P1 |
| Journeys Everyone 1 | Browse models and agents; try any model; aggregate status | Partial | `Models.tsx`, `Playground.tsx`, `Journey.tsx` open to all | Agents; vendor models never tryable (by design) | P2 |
| Journeys Everyone 2 | Ask a question, expert named and paged | Missing | `/soon/Ask` | Whole step | P2 |
| Journeys Everyone 3 | Log a problem, Jira ticket, status shown | Missing | `/soon/Help` | Whole step | P2 |
| Journeys Agents 1 | Onboarding agent: creation flow and intake backlog | Partial | `flows/Start.tsx` AgentNote | Intake backlog | P3 |
| Journeys Agents 2 | SRE agent: diagnose, draft runbooks, open issues | Partial | `Capacity.tsx` SRE agent scale-out proposal | Runbooks, issues, latency diagnosis | P3 |
| Journeys Agents 3 | Triage agent | Missing | none | Whole step | P3 |
| Journeys Agents 4 | Self-healing: score, mark, drift, findings to Home and Overview | Partial | `Data.tsx` gap report; finding in `Quality.tsx`; plan in `Improve.tsx` | Marks, drift, findings on Home and Overview | P2 |
| Journeys Agents 5 | Analyst agent on demand | Missing | none | Whole step | P3 |
| Journeys Agents 6 | Every action a proposal in a person's queue and a row in the activity log | Partial | "proposes · you decide" in `Start.tsx`, `Improve.tsx`, `Data.tsx`, `Capacity.tsx`, `head/Decisions.tsx` | Agents' activity log | P2 |

## 3. Access model

| Source | Item | Status | Where in the prototype | What is missing | Priority |
| --- | --- | --- | --- | --- | --- |
| Access env: Production | Sealed; time-boxed break-glass with reason, approver, audit; grant shown on the page | Partial | `Audit.tsx` break-glass policy and request; "traces are sealed" in `Playground.tsx`, `Quality.tsx` | Approval and grant flow, active-grant banner on pages | P2 |
| Access env: Pilot in production | Engineering roles see detail by switching the engineering view on; masked fields | Missing | none (no engineering switch) | Switch, pilot drill-in, masked fields by role | P2 |
| Access env: POC and Build | Engineering roles and members; numbers labelled non-production | Partial | sandbox labelled in `Start.tsx`, `FirstCall.tsx` | No non-production numbers or labels on any page | P3 |
| Access layer 2: Project | Membership with owner, engineer, reviewer, viewer; non-members aggregate only | Partial | `Start.tsx` adds members with roles; Home notes "You are a member" of R-0418 | Members list, enforcement, non-member view | P2 |
| Access layer 3: Depth | Aggregate open; drill-in gated by environment role and membership, logged | Missing | none | Any drill-in state or gate | P2 |
| Access "One rule across groups" | Membership decides what you can do; role decides depth | Missing | none; every workspace can reach every page through All | Gating | P2 |
| Access role: Viewer | Aggregates only | Partial | `homes/Explore.tsx` lens | Explore can still reach approval and training actions via All | P2 |
| Access role: Member viewer | Own projects' detail | Missing | none | Project scoping | P3 |
| Access role: Member engineer | Drill-in lower regions and pilot; start training for own projects | Missing | none | Drill-in; training start from a project | P2 |
| Access role: Member owner | Use-case approvals in own projects | Partial | owner approves the improvement plan (`flows/Improve.tsx`), rolls back (`ModelsCanary.tsx`), sends stage requests (`RequestStage.tsx`) | Promote approvals, canary approval | P3 |
| Access role: Reviewer (data) | Assigned queues; item under review; data-set approvals | Missing | masked-row illustration only (`Data.tsx`) | Reviewer workspace (see D1) | P2 |
| Access role: Validator | Validation views of any model; evaluation items not production; model approval for portal and Relay | Partial | Approver workspace sees all runs (`Evidence.tsx`) | Model approval for portal and Relay (see V2) | P2 |
| Access role: Foundation developer | All aggregates, detail where member, drill-in, start training, request break-glass | Partial | `Training.tsx` start; break-glass request sits in Operations, not here | Drill-in, break-glass request from this role | P2 |
| Access role: Production break-glass | Granted on top of any role, time-boxed, one use case | Partial | `Audit.tsx` "What a request would grant" | Grant, expiry, scope enforcement | P2 |
| Access role: Portal agent | Scoped, logged like a person, never acts alone, proposes | Partial | every agent output is a proposal a person confirms; Audit "Who" note names the confirming person | Agent scope and activity log | P3 |
| Access note 1 | SSO identity, IAM groups, membership mirrored to IAM | N/A | backend; the prototype has no identity layer by design (sample data) | — | — |
| Access note 2 | Audit row for every drill-in, grant, approval, phase move, training start | Partial | `Audit.tsx` rows for approvals, model changes, incidents, key rotations | Drill-ins, training starts, phase moves; why and from which page | P2 |
| Access note 3 | Masking is a property of the field | Partial | `Data.tsx` masked sample row | A shared masked-field component that renders by role | P3 |
| Access note 4 | Agents as service identities; proposals land as approvals for people | Partial | proposals with HoldToConfirm by a person (`Capacity.tsx`, `Improve.tsx`) | Approvals queue for agent proposals | P3 |

## 4. Experience rules (v6)

| Source | Item | Status | Where in the prototype | What is missing | Priority |
| --- | --- | --- | --- | --- | --- |
| v6 Page anatomy | Orient, judge, decide, act, trace with sticky section bar and Decide anchor | Partial | `shell/parts.tsx` PageHead; a coloured "Your next step / Where things stand" block with one action on every page; four tiles on `Journey.tsx` | Breadcrumb, "Needs a decision" block, sticky section bar, Decide anchor (only RequestDetail scrolls to its decision) | P2 |
| v6 Sections and tabs | Sections per topic; tabs only for alternative views | Partial | pages are sections; no tabs | The use case's six topics sit in a side sheet behind "Look closer", not as sections on the page | P3 |
| v6 Creation flows | One page, vertical stepper, finished steps fold with Edit, live summary, drafts kept | Partial | `flows/FlowFrame.tsx` vertical Steps beside one step at a time; summary only at the end | Folded summaries with Edit, live summary, drafts kept (state is lost on leave) | P3 |
| v6 Text budget | Title and one line; no paragraphs in sections | Partial | most heads follow it | Paragraphs inside sections (`Quality.tsx` "How quality is judged", `Audit.tsx` break-glass, `Capacity.tsx` bullets, flow hints) | P3 |
| v6 Tooltips | ⓘ on hover, focus and tap; ≤2 sentences | Partial | `InfoTip` in `Start.tsx`, `DataEvaluate.tsx`; DataTable column `info` | Definitions mostly in inline text and `<details>` disclosures instead | P3 |
| v6 Scores | Whole percent ± interval, points, paired difference decides Better or Tie | Present | kit `pct`, `diffVerdict`, ForestPlot paired on shared items (`Evaluation.tsx`, `RequestDetail.tsx`, `ModelsCanary.tsx`) | — | — |
| v6 Precision | Availability 99.95%, money compact from $1,000, cents for unit prices | Partial | availability to two decimals, unit prices with cents | Money shows full dollars (`money()` in `data/scenario.ts`), not compact ($25.6k) | P3 |
| v6 Statistics | κ and similar as word band with glyph; raw value only in tooltip or engineering view | Partial | `Quality.tsx` shows κ band | Raw κ value shown beside the band to everyone | P3 |
| v6 Drill-down | Side sheet ≤420 px; hover cards; drawer under row for ≥5 columns | Partial | use-case panels open in a Sheet | Sheet is up to 768 px (`sm:max-w-3xl`); no hover cards; no row drawers on wide DataTables | P3 |
| v6 Navigation | Breadcrumbs, ⌘K, use-case rail of six | Partial | Overview plus Performance, Quality, Models, Improve, Record panels (and Cost) | Breadcrumbs, ⌘K, a rail | P2 |
| v6 Rollout | Boards redrawn in v6 before code | N/A | a process rule for the canvas, not a prototype behaviour | — | — |

## 5. UX improvements

| Source | Item | Status | Where in the prototype | What is missing | Priority |
| --- | --- | --- | --- | --- | --- |
| UX 1 | Command palette | Missing | none | Whole feature | P2 |
| UX 2 | Explain this number (ⓘ to Ask ThinkLatent) | Missing | none | Whole feature | P3 |
| UX 3 | Guided first call on new user's home | Partial | `flows/FirstCall.tsx` from the use-case checklist | Not on the Everyone home; no progress meter | P3 |
| UX 4 | One agent conversation pattern | Missing | AgentNote/AgentBrief show basis and confidence, but no conversation surface exists | Ask, Inbox, Help conversations | P3 |
| UX 5 | Side-sheet drill-downs | Partial | use-case panels in a Sheet (`Journey.tsx`) | Runs, findings, traces, approvals in sheets | P3 |
| UX 6 | What changed since your last visit | Missing | none | Whole feature | P3 |
| UX 7 | Hover cards | Missing | none | Whole feature | P3 |
| UX 8 | Saved views | Missing | DataTable sort only | Saved, shareable filters | P3 |
| UX 9 | Activity timeline | Partial | kit Timeline on Record, history, improve loop, incident | Model lifecycle timeline (no page) | P3 |
| UX 10 | Notification centre | Missing | none | Whole feature | P3 |
| UX 11 | Undo instead of confirm | Missing | HoldToConfirm used for one-way doors, correctly | No reversible actions (dismiss, mute) or toasts exist | P3 |
| UX 12 | Compare mode | Partial | playground side by side; Compare two runs (`Evaluation.tsx`) | Catalogue and checkpoint compare | P3 |
| UX 13 | Freshness signal | Partial | window and "no newer reading" notes in text | Amber as-of with the late source in a tooltip | P3 |
| UX 14 | Keyboard shortcuts | Missing | none | Whole feature | P3 |
| UX 15 | Phone-ready actions | Present | `Shell.tsx` phone drawer, 44 px targets, phone stage tracker (`Journey.tsx`), table view of forest plots on narrow screens | — | — |

## 6. Intelligence layer

| Source | Item | Status | Where in the prototype | What is missing | Priority |
| --- | --- | --- | --- | --- | --- |
| Intel: Per-request scorer | Quality and drift panels, "what the portal noticed", data marks | Partial | daily judged sample and finding in `Quality.tsx` | Drift, noticed, marks | P2 |
| Intel: Session builder | Context reused, checks run on Quality, never named | Missing | none (and nothing names the harness: compliant) | The two outcome metrics | P3 |
| Intel: Knowledge graph | "What else looks like this", clusters, coverage | Missing | none | All outputs | P3 |
| Intel: Rating of data points | Eligible counts, marks, composition | Missing | `Data.tsx` "Rows it flagged: Not measured" | All outputs | P2 |
| Intel: Review feedback loop | Precision per tag, what was learned | Partial | `Data.tsx` pipelines' approved share and last tuned | Precision, what was learned | P3 |
| Intel: Drift detection | Drift panel, thresholds open tasks | Missing | none | All outputs | P2 |
| Intel: Finding generation | Findings with action and evidence on Home, Overview, digest, Data | Partial | F-0412 with plan on `Quality.tsx`, `Alerts.tsx`, `Improve.tsx`, `Data.tsx` | On Home and Overview; digest | P2 |
| Intel: Project and Enterprise insight | Portfolio view, data plan | Partial | Head `Portfolio.tsx` by stage | Question types, weak domains, data plan | P3 |
| Intel: Analyst agent | Answer with source and as-of, saveable | Missing | none | Whole mechanism (see X1) | P2 |
| Intel rule 1 | Scoring on smaller models | N/A | backend rule | — | — |
| Intel rule 2 | Every finding links to its aggregate with confidence and n | Partial | finding states pass rate vs bar and source | Confidence and n ("Not measured in this prototype" in `Data.tsx`) | P3 |
| Intel rule 3 | Finding unacted for 30 days is reviewed | Missing | none | Whole rule | P3 |
| Intel rule 4 | Generated data tagged, never production evidence | N/A | the prototype shows no generated data | — | — |

## 7. Backlog epics

| Source | Item | Status | Where in the prototype | What is missing | Priority |
| --- | --- | --- | --- | --- | --- |
| Backlog E0 | Foundations: kit parts, identity and roles, audit rows, as-of conventions, environment labels, Settings | Partial | kit components and chart sources throughout | Identity, roles, environment labels, Settings | P2 |
| Backlog E1 | Telemetry contract and gateway: contract, aliases, unregistered usage, J10, J11, O6 | Partial | `Usage.tsx` unregistered callers and keys; `FirstCall.tsx` snippet | Contract tags, aliases, limits, traces, O6 | P2 |
| Backlog E2 | Showroom: role homes, catalogue, model pages, lineage, registry, lifecycle, playground, P1b, Help | Partial | homes, `Models.tsx`, `Playground.tsx` | Model page, card, bundle, lineage, registry, lifecycle, Help | P2 |
| Backlog E3 | Projects and use cases: J0, list, project home, use-case pages, Workbench | Partial | `Start.tsx`, `Journey.tsx` and panels, Head `Portfolio.tsx` | Project home, Prompts, data-set page, digest | P2 |
| Backlog E4 | Training | Partial | `Training.tsx` | Recipe, metrics, controls, pre-flight, bases, Relay runs | P2 |
| Backlog E5 | Evaluation and governance | Partial | `Evaluation.tsx`, `Evidence.tsx`, `Requests.tsx`, `RequestDetail.tsx`, `Audit.tsx` | V2 validation document and sign-off, V3, corrections, trials, contribute, pillars, Official marking | P1 |
| Backlog E6 | Data | Partial | `Data.tsx`, `DataEvaluate.tsx` | Review actions, insight, marks, diff | P1 |
| Backlog E7 | Intelligence | Partial | one finding and its plan | Scorer outputs, rating, drift, graph, Ask, Inbox, digest | P2 |
| Backlog E8 | Agents | Partial | agent proposals inside flows and pages | Library, agent page, agent evaluation, activity log | P2 |

## 8. Gap backlog: P1 gaps and fixes

| Source | Item | Status | Where in the prototype | What is missing | Priority |
| --- | --- | --- | --- | --- | --- |
| Gap G-01 | Start a project with intake, agent, recommendation, sandbox key | Partial | `flows/Start.tsx`, `flows/FirstCall.tsx` | As J0 | P2 |
| Gap G-02 | Usage, keys and limits per project and team | Partial | `Usage.tsx` | As J10 | P2 |
| Gap G-03 | Approval decision page | Partial | `RequestDetail.tsx` | As V1 | P2 |
| Gap G-04 | Validation workspace, drafted document, one sign-off for portal and Relay | Partial | `Requests.tsx`, `RequestDetail.tsx` | As V2 | P1 |
| Gap G-05 | Home by role, preview as a role, empty state | Partial | six homes; workspace switcher works as "preview as a role" (`Shell.tsx`); empty states on every home | Content listed under H2–H5 | P2 |
| Gap G-06 | Trace explorer behind the engineering switch | Missing | `/soon/Traces` | Whole feature | P2 |
| Gap G-07 | Playground without a project | Partial | `Playground.tsx` opened alone | As P1b | P3 |
| Gap G-35 | Telemetry contract in the snippet and on the record | Partial | `FirstCall.tsx` snippet with project and model alias | Required tags, outcome and feedback calls, contract on the record, "add these calls" prompt on Quality | P2 |
| Gap G-36 | Unregistered usage kinds with Register and Resolve | Partial | `Usage.tsx` grace stages ("Tags required") | Kinds (tags missing, unknown prompt, unattributed), Register as a version, Resolve | P2 |
| Gap G-37 | Owner requirements the scorer checks against | Partial | bars agreed with the owner (`Record.tsx`, `DataEvaluate.tsx` confirm step) | Rubric, must and must-not, stated as the scorer's input | P2 |
| Gap G-38 | Request to join a project; "Can" column | Missing | none | Whole feature | P2 |
| Gap G-39 | Adoption north star | Missing | FirstCall says "about 5 minutes"; nothing is measured | Time to first call, 28-day active, stall count, adopted-team definition | P2 |
| Fix F-01 | Harness not named on A1, A2, P1 | Present | no "harness" anywhere in the source; playground shows no session ids or code view | — | — |
| Fix F-02 | Harness wording in requirements sections | N/A | a document fix; the prototype shows no session intelligence | — | — |
| Fix F-03 | No shared production endpoints on O2 | Present | `Capacity.tsx` names no shared production pool; `Start.tsx` and `Cost.tsx` say Production runs on a dedicated endpoint | — | — |
| Fix F-04 | Day 30 shown as pending Risk concurrence; day-14 header; blocked key keeps sandbox | Partial | `Usage.tsx` never blocks a key and says callers are "never cut off silently" | Day 30 reads "Record required" / "a record is required now" with no "pending Risk concurrence"; no day-14 header, digest share or sandbox rule | P3 |
| Fix F-05 | Engineering sections behind the switch | N/A | no engineering sections exist (graded as Missing under J11, M6, T2) | — | — |
| Fix F-06 | Page rule panel counts | N/A | superseded by v6 page anatomy, graded above | — | — |
| Fix F-07 | C1 epic numbering | N/A | C1 moved to Cortex | — | — |
| Fix F-08 | Fallback alias mismatch | N/A | no aliases are shown anywhere | — | — |
| Fix F-09 | "Gateway serving log", not harness | Present | sources read "Serving telemetry" (`Performance.tsx`, `Capacity.tsx`) | — | — |
| Fix F-10 | Lineage for everyone; serving settings only in engineering view | Partial | catalogue shows family to everyone, as confirmed (default A2) | `Models.tsx` shows precision ("4-bit"), a serving setting, to every role with no engineering view | P3 |
| Fix F-11 | Deletion against immutable versions | N/A | no deletion or immutability is shown | — | — |
