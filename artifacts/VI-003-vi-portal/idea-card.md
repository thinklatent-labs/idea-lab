<!-- Exported from https://claude.ai/artifact/QtTppN7KFdEDvjX7RRkEFn (rev 44) on 2026-11-04. Read-only mirror; edit the live doc, not this file. -->
# VI Portal (vi-portal) — Idea card

Nov 1, 2026 · @Jithin Pradeep

The VI Portal is the one place where anyone at Vanguard adopts, builds, approves or improves a Vanguard model. This card shapes the problem and the feature map; VAI (VI-004) is one feature of it and is already at Proposal.

**Lab record** (Idea Lab standard v1)

| Field | Value |
| --- | --- |
| ID and slug | VI-003 · vi-portal |
| Aliases | the portal; VI Portal; one shop; showroom and workbench |
| Type and parent | Idea · no parent |
| Theme served | T-001 Sovereign AI: owned models on owned infrastructure |
| Stage | Shaping (Idea card v2 after the vision session of 2026-11-02; Stress test next) |
| Horizon and appetite | H2 · phased, set 2026-11-02: phase 0 telemetry contract, phase 1 showroom, phase 2 the loop when VAI delivers; engineer-weeks set at the Building gate |
| Owner | Head of VI (sponsor); portal product lead to be named |
| Rubric | Not scored; scored at Stress test |
| Reuses | AI Gateway and multi-tenant memory; HyperPod serving; model compression pipeline; self-healing system; evaluation register and harness (from VAI); Nucleus SDK; Langfuse telemetry store; Hermes harness and Nucleus sessions (via VI-008) |
| Creates | Model catalogue; use-case record (one object with the usage-approval record); onboarding flow; SLM build workspace; use-case telemetry contract (VI-009); blueprints (VI-010) |
| Links | depends-on VI-004 vai · depends-on VI-009 telemetry-contract for phase 1 · VI-004 vai, VI-009 telemetry-contract and VI-010 blueprints are feature-of this · reuses VI-005 self-healing · VI-008 harness-served enables this |
| Sensitivity | Internal strategy; no client data in this doc |
| Standard and last reviewed | v1 · 2026-11-02 |
| Register | [Idea Register](https://claude.ai/artifact/6WzPg7fvvAf2tn8Z9X2Q2h) |

## Problem

Getting a Vanguard-built model into a workflow today means four separate conversations with four groups, and none of them shares a record. A business team does not know which models exist or which one fits its workflow. An SLM team rebuilds evaluation and serving setup for each build. The VI foundation team cannot see which skills the enterprise keeps asking for. Risk and Governance review each model from scratch because no approved-usage record exists to start from.

The result is slow adoption of the models VI builds, duplicated evaluation work across the US, Canada and India teams, and governance review stretching for every new workflow. Owned models only pay off if they are adopted, and adoption today has no front door.

Statement a stranger could repeat: **Vanguard teams have no single place to find, choose, get approved for and build on Vanguard's own models, so owned models are adopted slowly and every adoption is rebuilt from scratch.**

Sharpened 2026-11-02 by the Head of VI: the models exist and run at scale, and nobody outside VI can see it. Adoption fails on three things: no one can see what runs or at what scale; a small team cannot evangelise by hand; and the lift to use an in-house model is higher than the lift to call a vendor API. The portal exists to close all three.

## Who feels it

Four groups, one portal. Each comes for a different job and each one's use makes the portal more useful to the others.

| Group | Job they hire the portal for | What they fire to do it today | Evidence of the pain (to collect) |
| --- | --- | --- | --- |
| Enterprise users and business teams | Find a model that fits a workflow and get access with the evidence attached | Vendor benchmarks, asking around, defaulting to the largest model | Time from request to approved access for the last five workflows |
| SLM developer teams | Build an application model from a VGLM foundation model and ship it | One-off training and eval scripts per build | Evaluation and setup effort per SLM build |
| VI foundation team | Know which skills to build next and where models fall short | Guesswork and ad-hoc requests | Count of capability requests with no recorded outcome |
| Risk, Compliance, Security, Audit | Approve a usage knowing what the model does and does not do | Bespoke reviews per model | Review cycle time and rework per approval |

The evidence column is empty on purpose: evidence of need is the criterion this idea is weakest on today, and the stress test will ask for these numbers.

## Hypothesis

One front door with shared evidence will make adoption of Vanguard-built models faster and cheaper than the current path, and will turn adoption data into the foundation team's roadmap.

| Claim | Measurement | Confirmed if | Refuted if |
| --- | --- | --- | --- |
| P1. A single front door shortens adoption | Days from a team's request to approved access, before vs after, on comparable workflows | Median time falls by half on the first five workflows onboarded through the portal | No measurable change, or teams route around the portal |
| P2. Usage-based approval cuts governance rework | Review cycle time and repeat-review count | Second and later usages of an approved model clear review materially faster | Governance still runs bespoke reviews for each usage |
| P3. SLM teams reuse instead of rebuild | Setup effort per SLM build | The second SLM build on the portal reuses harness, bars and serving with no new eval scaffolding | Each build still needs its own scaffolding |
| P4. Demand signals steer the foundation roadmap | Share of foundation-model roadmap items traceable to portal requests or gaps | At least one roadmap decision in two quarters cites portal demand data | No roadmap decision cites it |
| P5. Visible scale converts non-users | Showroom visitors outside VI; onboarding requests; first calls through Nucleus, per month | A quarter after phase 1 ships, at least five new use cases have started through the portal and visitors outside VI outnumber VI's own staff | Visitors are mostly VI, or onboarding requests do not rise |
| P6. The loop produces specialists teams migrate to | For one use case: specialist versus incumbent on its VAI line item, latency and cost; canary feedback; share of traffic migrated | A specialist clears the incumbent's bars at lower latency and cost and reaches 100% of traffic within the phase-2 appetite | No specialist clears the bars, or the product owner declines migration |

The thresholds are proposals for Jithin to set before Stress test; they are deliberately coarse until the baseline numbers exist.

## Why now, why us

**Why now.** The pieces a portal sits on are now in production or proposed: the AI Gateway with multi-tenant memory, HyperPod serving with per-setting endpoints, the compression pipeline, the self-healing system, and VGLM foundation models that SLM teams can build from. VAI supplies the evidence layer. Without a front door, each of these is adopted one conversation at a time.

**Why us.** No vendor portal can host Vanguard's own models with Vanguard's own bars, sensitivity tiers and approval records inside the boundary. That combination is the cornered resource: our evaluation evidence and our approval history. A bought model catalogue would list models; it could not tell a team whether a model is sufficient for a Vanguard workflow or approved for it.

**Contrarian truth held.** The bottleneck to owned-model adoption is not model quality but the path to adoption: discovery, evidence and approval. If that is wrong, the portal is a nice catalogue and the effort belongs in the models.

## Feature map

&#91;embedded content: portal feature map · 7 surfaces, 4 groups, one evidence layer\]

Seven surfaces sit on one evidence layer (VAI) and four reused capabilities. The first version is catalogue, onboarding and governance; every other surface is a later feature that gets its own register row when it is shaped. Under the lab's feature rule, VAI is the P0 feature, and it is already ahead of its parent at Proposal.

**Feature map v2 (2026-11-02).** The diagram above is v1 and is redrawn at Stress test; this table is current. Phases follow decision 1: phase 0 the telemetry contract, phase 1 the showroom, phase 2 the loop.

**Interface sketch v1 (2026-11-02).** An IA map of three tiers (front door; use-case page; the capabilities underneath) was agreed in the vision session, and fourteen linked screens are on a design canvas (v2, 2026-11-02: front door; VGLM4 page; use-cases portfolio; index scorecard; training monitor; model registry; the use case split into Overview, Traffic, Models, Quality, Improve and Record; onboarding; blueprints): [VI Portal (vi-portal) — Interface sketch v2](https://claude.ai/artifact/JuvPWSqT6SZFuyuxWv1Wn8). Every page follows the page-map rule (one headline strip, one primary exhibit, one secondary list, air around them); the Traffic page carries the input-by-output length matrix with a metric selector (share, TTFT, decode, completion), the Models page splits every number by model behind the alias, and the engineering toggle reveals lineage and the per-request trace. Stated figures only; everything else is a placeholder or an illustrative shape until VI-009, the pipeline and the index feed the pages. Open questions the sketch raised: a playground (decision pending), engineering view as a toggle rather than a role, cost avoided shown above the fold.

**Interface sketch v3 (2026-11-02).** Twenty linked screens on the same [design canvas](https://claude.ai/artifact/JuvPWSqT6SZFuyuxWv1Wn8), built against Feature plan v2 after decision 6, in two passes. **Pass A, the gaps and the revisions.** A Capacity page joins the use-case rail: goodput, error budget with burn rate, the throughput-versus-interactivity curve, a saturation strip by hour with 80 and 90 percent lines, prefix-cache hit rate by session depth, cost cards. Traffic rebuilt: p50·p99 in every cell of the input-by-output length matrix with a p90 output column, time to first token split into queue, prefill and decoding by input length, inter-token latency p99 against time per output token p50 by prompt length, and the finish-reason mix as a headline. Record rebuilt as the single governed object: a status strip from Draft to Decommissioned, a computed risk tier with a dated override, the base-model record beside the use record, three validation layers each pointing at an Official index run, findings with severity and owner, attestations, Warning and Critical thresholds set relative to the approved baseline that open tasks on named owners, budget and rate limits naming the approval that granted them, and an audit-pack export. Quality rebuilt around acceptance and persistence as the headline, judge calibration shown before any judge number, an annotation queue with rubric, claim lock and corrections, a drift panel against the baseline month, and clusters compared with the last run with NEW labels and add-to-dataset. Models gained a canary judgement (critical metrics must each pass, the rest weighted into one score; promote and roll back; the sample needed for the intervals to separate) and a prompt-versions table with aliases and change alerts. Improve gained alias semantics (prod, canary, candidate, previous; rollback needs no approval), a teacher, incumbent and specialist comparison, and side-by-side preference capture. The VGLM4 page gained generation-against-last deltas by pillar, a composite trend across releases, a health card (regression suite, uptime, incidents, findings) and a migration panel naming the use cases still on the old generation. The Index gained Official versus Practice runs, score ± interval with n on every cell, judge calibration per pillar, a release diff listing the cells that flipped and the configuration pinned on every Official row, and a panel on what the index cannot tell you. The Overview gained compare-to-previous deltas on every tile and a what-the-portal-noticed strip that includes the smaller-model recommendation. Blueprints gained fork-and-provision as one action in six steps. **Pass B, the workbench and adoption.** A Workbench group in the use-case rail: Prompts (versions as releases with aliases, a diff with its evaluation, hygiene checks, change alerts), Datasets and queues (sets with purpose, sources, checks, users and lineage; review queues with a service target; composition by source and task) and Alerts and weekly digest (alerts from the record's thresholds with routing and noise control; the digest as it will be sent). Two portal-level pages under Use cases: Usage and limits by team (tokens by day stacked by use case with a ceiling-pace line and forecast, per-use-case ceilings naming their approval, showback by business line) and Unregistered usage for VI operations (calls without a record, tags missing, unknown prompt ids, the side door seen at egress, front door against side door by month, a dated grace policy). The Use cases page gained time to first call as the north star, the 10-day stall count, 28-day retention, a value ledger with declared hours attested by owners, and champions; the front door gained an adoption strip and a what's-new changelog. Every link between the twenty screens was checked. Stated figures only; everything else is a placeholder or an illustrative shape until VI-009 feeds the pages.

**Sketch v3.1 (2026-11-02) and a standing design rule.** The harness (VI-008) is built into the API and is never a user-facing feature: nothing in the showroom or the workbench names it, offers it or explains it. What it produces (session summaries, entities, a prepared next step, background checks) is shown as results of the endpoint, and the only trace of it in the UI is an endpoint build version on the use-case record, kept for Audit because a new build is a new usage, and behind the engineering toggle. Applied: the Blueprints card "Agent harness patterns" became "Session-aware application" (how an application uses a Nucleus session and what comes back); the Quality panel now says "session intelligence"; the Capacity, Index, Training, Overview, Models, Record and Registry copy no longer uses the word.

**Decision 7 (2026-11-02, Jithin): the grace policy for unregistered usage.** Day 0, seen: the likely team is told what the portal saw and offered the assistant or a blueprint; nothing changes for them. Day 14, tags required: calls without use\_case and stage get a warning header and the digest names the share. Day 30, record required: unregistered keys lose production endpoints and keep the sandbox, with a week's notice to the owner. Approved vendors stay reachable through the same blueprint with the vendor behind the alias; unapproved hosts go to Risk the day they appear. Enforcement dates and exceptions are approvals on the record; VI cannot block a key on its own. Risk's concurrence is the remaining step before the day-30 step is live; until then the portal runs days 0 and 14 only. Pre-registered: the policy is working if the side-door share falls quarter on quarter and the median time from first contact to a record falls below 14 days; it is failing if teams go quiet rather than register, which the egress volumes will show.

**Governance parked outside the design sessions (2026-11-02, Jithin).** Two items are recorded as assumptions the design rests on, not as blockers, and return at Stress test: (1) the SR 11-7 rescission claim from brief 3 is unverified, so every governance screen is drawn against the stricter reading (layered validation, evidence on the record, dated approvals) and loses nothing if the claim is false; (2) Risk's concurrence on the grace policy's day-30 step. If either comes back the other way, the Record and Unregistered usage pages change copy and thresholds, not structure.

**Training UI benchmark against Unsloth Studio (2026-11-03, Scout).** Jithin asked whether the portal offers what Unsloth's training screens offer out of the gate. Sources: unsloth.ai/docs (train-your-own-decision-model, desktop, new/studio, new/studio/start, new/studio/data-recipe), read 2026-11-03. What Unsloth Studio has: a Train tab with model and data set pickers (Hugging Face Hub or local upload of PDF, DOCX, JSONL, JSON, CSV, Parquet), format options (auto, alpaca, chatml, sharegpt), subset, train and eval split, slice, and a Dataset Preview dialog that maps columns to roles; a config card with Upload, Save, Reset and Start Training, configs saved as `{model}_{method}_{dataset}_{timestamp}.yaml` with training, lora and logging sections; a live progress view with epoch, step progress, Loss, LR, Grad Norm, Model, Method, a timing row (elapsed, ETA, steps per second, tokens), a GPU monitor (utilisation, temperature, VRAM, power), four charts (training loss raw, EMA-smoothed and average; learning rate; gradient norm; eval loss) each with window, smoothing, linear or log scale and outlier clipping; a Stop Training dialog offering Stop and Save (checkpoint) or Cancel; a "Train as: Decision model" mode that reports held-out accuracy before and after training plus calibration error; Model Arena to compare a trained model with its base side by side; export to GGUF, safetensors or LoRA; stored training history to revisit and re-export runs; one-click Use in Decision API; Data Recipes, a graph of Seed, LLM Text, LLM Structured, LLM Code, LLM Judge, Tool Profile, Expression, Validators and Samplers blocks with Validate, Preview and an Executions view, powered by NVIDIA NeMo Data Designer. What the portal had before this pass: a managed-pipeline monitor (stage stepper, ETA, GPU hours, eval at checkpoints against the bar, what the job produces), the loop with approvals, data accumulation and eligibility, the regression gate, the registry. Verdict: equal or ahead on governance, multi-tenancy, evidence and the canary; behind on the hands-on trainer surface an SLM builder expects. Added in sketch v3.2 (Pass C): the Training page gained an engineering view with live metrics (epoch, step, loss, learning rate, gradient norm, method; elapsed, ETA, steps per second, tokens; GPU utilisation, VRAM, temperature, power, nodes), the four charts with their settings, a pinned recipe card (YAML with training, lora, data and logging sections; upload, save, reset; a change is a new run), a run history per task (recipe, data-set version, metrics, gate result, checkpoint kept, re-run and re-export inside the boundary), job controls (owner cancels; VI stops and keeps a checkpoint; both dated on the record), a Train-as line on the job card and a before-and-after line with calibration for decision specialists; the Datasets page gained a bring-data-in strip (upload or point; preview and map columns; split, slice, dedupe and leak check; checks then an immutable version) and a generated-data note (the self-healing recipe runs as a set with its own executions view, rows tagged generated and never counted as production evidence); the Improve page's train step gained Train as generate, extract or decide. Deliberately not copied: weight export outside the boundary (adapters and merged weights go to the registry only), hyperparameter dials for business users (behind the engineering view), and one-click routing to production (the canary and its approvals stay). Two questions this raises: (1) reuse first — Unsloth Studio is free and open source (the library is Apache-2.0; the Desktop app's licence is unnamed in its docs and must be checked) and supports Gemma, which VGLM4 is built on, so the engineering trainer could be Unsloth Studio hosted inside the boundary with the portal reading its train API (`/api/train/status`, `/metrics`, `/stream`) rather than a trainer the portal builds; the open points are HyperPod and Slurm fit, multi-node training, and whether its data path can be made to respect the PII and compliance checks; (2) the playground decision — Model Arena is the evidence that a compare-with-base playground belongs in the engineering view.

**Decision 8 (2026-11-03, Jithin): the portal trains; Unsloth is a reference only.** Users train models on the portal's own UI; Unsloth Studio was looked at for the features a training surface should have, not as something to host or depend on. The reuse question above is closed. Sketch v3.3 turns the Training page from a monitor into a trainer: a New training run card with six choices and recommended values filled in — base model (the smallest VGLM4 that clears the task's bar is marked recommended, with its index composite and bars cleared), train as (generate, extract with a schema, decide with a calibrated choice), data set (a version from Datasets with its checks, a 5% held-out eval split and a leak check), recipe (recommended, custom with Optimisation, Schedule and Logging, or an uploaded YAML; saved recipes reusable), compute and cost (shared training pool, queue position, estimated hours, GPU hours and cost against the use case's training budget; over budget asks the owner), name and start (auto-named run, Start training, Dry run of 60 steps). Start stays off until a base model, a data set and a use case are set; what follows without asking is the evaluation on the use case's line item, the regression gate, a registry entry and a candidate slot at 0%; moving traffic remains the owner's approval on Improve. Pre-registered: the trainer is right if an SLM builder can start a run from a fresh use case in under 15 minutes without VI's help and the run lands in the registry with its recipe and gate result; it is wrong if runs are started outside the portal to avoid it, which the unregistered-usage view will show as registry entries without a run.

## Numbers the portal surfaces (KPI inventory v0, 2026-11-02)

Fifty-odd numbers, drawn from the scout brief (what every comparable measures), the vision (scale, per-model split, the input-by-output length matrix, TTFT, decode and completion time, harness intelligence), the index and the loop. Each has a source and a home; a number with no home is not shown, and a page with more than one primary exhibit is split. Every number is per use case unless marked, and the contract's tags split any of them by task, model behind the alias, prompt version and stage.

**Queued Scout pass: run on 2026-11-02** as five parallel briefs; findings and the resulting plan are in Scout pass 2, Feature plan v2 and Contract v0.1 below.

**A. Traffic and latency** (source: the canonical gateway event plus vLLM serving metrics, through the contract)

| Number | What it answers | Home |
| --- | --- | --- |
| Requests per minute; tokens in and out per minute; calls per day (speech) | Scale | Overview tiles; Use cases list |
| Input-length buckets (2k, 4k, 8k, 16k, 32k) and output-length buckets | What the model is asked and what it produces | Traffic page, matrix axes |
| Input-by-output length matrix: share of requests per cell | The mix; the same input length produces very different outputs and the reverse | Traffic page, the primary exhibit |
| TTFT p50 and p95; decode rate (tokens per second); time to completion p50 and p95, per cell | Where latency comes from, by request shape | Traffic page, metric selector on the matrix; decomposition bars |
| Concurrency; queue depth; errors and timeouts; prefix-cache hit rate; speculative-decoding acceptance (engineering) | Headroom and health | Traffic page, secondary strip; engineering panel |
| SLO attainment, 30 days; daily regression suite result | Reliability proof | Overview tile; Record |

**B. Cost and capacity** (source: gateway cost telemetry; serving metrics; budgets on the record)

| Number | What it answers | Home |
| --- | --- | --- |
| Cost per 1,000 requests; cost per month; vendor-equivalent cost avoided | Why in-house | Overview tile; front door; Use cases list |
| Utilisation of dedicated machines; busy versus idle hours; GPU hours | What dedicated isolation costs | Overview tile; Traffic page; Training monitor |
| Budget used against ceiling; tpm and rpm quota headroom; fallback-slot usage | Whether a team will hit a limit | Record |

**C. Quality and feedback** (source: feedback call; judge scores; annotation queues; prompt mining with privacy thresholds)

| Number | What it answers | Home |
| --- | --- | --- |
| Feedback coverage (share of requests scored); score trend; judge score; agreement with human labels | Is it good, and do we know | Quality page tiles |
| Tasks mined behind one model, with share, latency and quality per task | What one endpoint really does | Quality page; feeds the index line items |
| Content clusters above the minimum-user threshold; hidden-cluster count | What is flowing through, safely | Quality page |
| Poor-interaction clusters by root cause; input-mix drift | Where to look first | Quality page |

**D. Models behind the alias** (source: gateway routing; per-target telemetry)

| Number | What it answers | Home |
| --- | --- | --- |
| Traffic weight per target (incumbent, candidate, fallback) | What is serving now | Models page; Routing panel |
| Per-model requests, latency, cost, quality, errors; per-model length matrix | Performance split when several models serve one use case | Models page, comparison table and small multiples |
| Canary deltas: quality, feedback, latency, cost, candidate versus incumbent | Whether to move the next step | Models page; Improve page |
| Lineage, variant, harness version (engineering view) | What sits behind the alias | Models page, engineering panel |

**E. Improvement loop and training** (source: feedback and eligibility checks; the training pipeline; the regression gate)

| Number | What it answers | Home |
| --- | --- | --- |
| Feedback samples accumulated against target; eligible share after PII and compliance checks | When a specialist can be trained | Improve page gauge; Training monitor |
| Job status, progress, ETA, GPU hours; loss and eval at checkpoints; rounds before pass | What training is doing | Training monitor |
| Regression gate pass or fail; candidate against incumbent on the line item | Whether it is better | Training monitor; Improve page |
| Share of traffic migrated; incumbent retirement date | Whether adoption happened | Improve page; Record |

**F. Evaluation and the index** (source: VAI line items, pillars and bars)

| Number | What it answers | Home |
| --- | --- | --- |
| Pillar scores and bars cleared (sufficiency) per model; composite | Is this model enough for this job | Index page scorecard; model page Evidence |
| Line items per use case; freshness of the last evaluation | Evidence for this use case | Use-case Evidence panel |
| Model against model, generation against generation, frontier comparison | What to choose | Index page comparison |
| Cost per unit of quality (sufficiency over size) | The index hypothesis, visible | Index page chart |
| Judge agreement with human labels | Can the judge be trusted | Index page; Quality page |

**G. Harness intelligence** (source: VI-008, once served; per use case)

| Number | What it answers | Home |
| --- | --- | --- |
| Context tokens saved per session; session depth; knowledge-graph size and growth | Is the harness paying for itself | Quality page panel; Trace |
| Retrieval hits; async check outcomes (PII, compliance, toxicity, abuse flags); actions taken from the next call | What it did | Trace; Quality page |

**H. Adoption** (source: portal analytics; onboarding records; assistant logs)

| Number | What it answers | Home |
| --- | --- | --- |
| Showroom visitors outside VI; funnel: intake, record, key, first call, pilot, production; time to first call | Is the portal converting | Use cases list header |
| Keys issued; active teams; office-hours attendance; unanswered assistant questions | Where people get stuck | Use cases list; assistant report |
| Request-a-model and blueprint demand counts; forks | What the roadmap should build | Blueprints page; catalogue |

**I. Governance** (source: the use-case record; approvals; change log)

| Number | What it answers | Home |
| --- | --- | --- |
| Approvals pending and granted; review cycle time; repeat-review count | Is the path faster than the side door | Record; Use cases list |
| Tier distribution; change-log entries; audit exports | What Risk needs | Record |

## Page map v2 (2026-11-02)

Rule for every page: one headline strip of at most four numbers, one primary exhibit, one secondary list or table, and air around them. Anything that would make a fourth element becomes its own page. The use case gets a left rail of six pages instead of one long scroll; training, the model registry and the index become top-level pages because their readers are different people from the showroom's.

| Page | Reader and job | Primary exhibit | Reached from |
| --- | --- | --- | --- |
| Front door | Anyone at Vanguard: see what runs | Models by generation, scale strip | Entry |
| VGLM4 page | A team choosing a model: pick by use case, learn to call it | Use-case table; the Nucleus snippet | Front door |
| Use cases | VI and leadership: the portfolio across models | Table of every use case with its KPIs and funnel strip | Top nav |
| Use case · Overview | Product owner, visitor: is it big, healthy, cheap | Tokens over the window; four tiles | Model page, Use cases |
| Use case · Traffic | Engineer, owner: what shapes of requests, where latency goes | Input-by-output length matrix with a metric selector (share, TTFT, decode, completion); latency decomposition per bucket | Left rail |
| Use case · Models | Owner, engineer: which model serves what, how each performs | Per-model comparison table; small-multiple matrices; canary deltas | Left rail |
| Use case · Quality | Owner, VI: is it good, what is it doing | Feedback and judge trend; tasks with per-task metrics; clusters | Left rail |
| Use case · Improve | Owner: get a faster, cheaper specialist | The loop with its gauge and not-ready states | Left rail; Quality |
| Use case · Record | Owner, Risk: what is approved, what is budgeted | Validation and approvals; budget and quota; change log | Left rail |
| Training monitor | VI engineers, owners with a job in flight | Jobs in flight with progress, ETA, checkpoints, gate; data accumulation across use cases | Top nav; Improve |
| Model registry | VI, owners: every model and specialist, where deployed, how it scored | Registry table with index composite, status, deployment | Top nav; Training; Index |
| Index | Leadership, VI, Risk: which models are enough for which jobs, at what cost | Domain scorecard: pillars by models with bars; cost per unit of quality | Top nav; Evidence panels |
| Onboarding | A new team | Intake form with the assistant | Every header |
| Blueprints | Developers | Blueprint cards with demand counts | Top nav |

The engineering trace stays behind the engineering toggle on the Models page rather than being a page of its own; the serving and capacity view (endpoints, GPU fractions, headroom across the cluster) is a later page once the infrastructure conversation has happened.

**Page map v3 (2026-11-02).** The use-case rail grows from six pages to seven (Capacity sits between Traffic and Models) plus a Workbench group of three (Prompts; Datasets and queues; Alerts and digest). Two portal-level pages sit under Use cases: Usage and limits, per team, and Unregistered usage, for VI operations. Twenty screens in all. The one-headline-strip rule held on every page; where a page would have grown a fourth element, that element became a Workbench page. The serving and capacity view the v2 map deferred is now the Capacity page, scoped to one use case; the cluster-wide view remains later.

## Scout pass 2 (2026-11-02): five briefs, 172 sources

Five parallel passes, public sources only, generic queries, each kept in project knowledge beside this card: scout-brief-kpis-feedback.md (temporal KPIs, derived metrics, feedback data, proactive intelligence; 40 sources), scout-brief-adoption.md (28), scout-brief-eval-governance.md (34), scout-brief-platform-features.md (37), scout-brief-serving-telemetry.md (33). What each settled:

- **Time and derived metrics (B1).** Store every request event at full granularity and cut it later (Datadog keeps LLM spans 15 months); three time framings recur: window against previous window, window against a fixed baseline, rolling 28 days. Adoption framings come from product analytics, not LLM-ops (Copilot's 28-day actives with power, habitual and novice levels; GitHub's 28-day cohorts; Amplitude retention). Seasonal anomaly bands and forecast-to-threshold are commodities. The SRE error-budget burn rate and DistServe's goodput are absent from every LLM-ops product: an open lane. Acceptance rate is the one feedback signal with independent validation; persistence is second. Canary judgement borrows Kayenta (Mann-Whitney per metric at 98%, critical metrics, weighted pass score) and Chatbot Arena (Bradley-Terry with intervals). Drift: PSI bands on consecutive and baseline windows, output-length drift, a domain-classifier score for embeddings, autothresholds at a 14-day mean plus or minus one standard deviation. Topic clustering has converged on one pipeline; the useful extras are compare-to-last-run and NEW labels. Evidence that users value insight cards is thin and vendor-written; no product recommends a smaller model for a task.
- **Adoption (B2).** About 5% of pilots produce rapid impact (MIT NANDA); bought tools succeed about three times as often as internal builds; 76% of enterprise use cases were bought in 2025 (Menlo). Portals stall near 10% of developers when they give no day-to-day benefit (Spotify). Time to first successful call is the north-star metric (under 30 minutes is best in class; Twilio targets five; manual key approval is the top roadblock). The scalers share seven levers: default self-serve access, the tool inside an existing surface, visible evals and a daily regression suite (Morgan Stanley), one abstraction with model choice (JPMorgan, Wells Fargo), value in a unit leaders repeat (BNY, BCG), near-total training with embedded champions, a visible executive owner. Define adopted team once and report against it.
- **Evaluation and governance (B3).** Trust in leaderboards comes from six moves: intervals and n on every score, item-level transparency, pinned configuration and versioned datasets, structural contamination handling (LiveBench, MLCommons Official versus Practice), confounder control, explicit limitation panels. Cost on an axis is rare (Artificial Analysis); nobody frames results as sufficiency against a workflow's bars. Judge calibration is a card (kappa, n, per-class recall, evaluator version). The brief reports that the US agencies rescinded SR 11-7 in April 2026 with non-binding guidance that leaves generative AI out of scope (unverified by the thinking partner; the Risk liaison to confirm); design the Record to EU AI Act Annex IV and NIST AI 600-1. Contradiction recorded: bank practice attaches validation to the model, our design to the use case; the resolution is both records, validated once meaning once per model version and serving configuration, and a monitoring plan with live thresholds on every use.
- **Platform features (B4).** Adopt: Anthropic's usage page (limit beside hourly peak, rate-limited requests, drill to the minute); OpenAI's one-surface loop; MLflow's immutable versions plus mutable aliases for prompts and models; Hugging Face's model tree; Azure's leaderboard-and-compare and per-row judge reasoning; Portkey and TrueFoundry's gateway vocabulary and scoped keys; Fireworks' training monitor fields and promote-then-deploy; SageMaker's approval status read by CI; LangSmith's add-to-dataset with provenance and rubric queues; Langfuse's prompt-change alerts; Pinterest's cost beside every score; Uber's start-a-workflow-from-the-model-card. Gaps nobody fills: model cards by generation with deltas, one use-case record joining approval, budget, routing and quality, canary with quality per arm and a promote button, the loop as a visible state machine, forkable blueprints with a provisioning assistant.
- **Serving telemetry (B5).** TTFT decomposes into queue, prefill and KV transfer; ITL p99 differs from time per output token; goodput is the capacity unit; saturation has agreed thresholds (KV usage 80 and 90%, pre-emptions, queue p99); finish-reason mix is the truncation fingerprint. No public dashboard renders input-by-output with latency per cell; it needs request-level logs, which the contract captures. Traces show output length only loosely tied to input length. Capacity is sold as tokens per minute at SLO; the one curve everyone draws is throughput per GPU against interactivity per user. Prefix-cache reuse pays (llm-d: 87% hits, TTFT 2,850 ms cold against 340 ms warm), but depends on cache size and session affinity; the harness hypothesis for VI-008 is pre-registered in the brief with seven measures.

## Feature plan v2 (2026-11-02) — adopted in full on 2026-11-02

Everything below is traced to a brief (B1 to B5). Items marked gap are lanes no comparable product fills. Grouped by page; within each, the order is the build order.

**Decision 6 (2026-11-02, Jithin).** All five briefs adopted: B1 temporal and derived KPIs folded into the portal; B2 adoption findings adopted as the guiding light; B3 evaluation and governance approved; B4 platform features adopted in full; B5 serving telemetry adopted. The table below stands as the build list, in build order per page. Interface sketch v3 (below, under Feature map) builds every row of it as a screen the same day, so the team critiques pictures rather than prose at Stress test. Still open from B3: the SR 11-7 rescission claim is unverified and goes to the Risk liaison before any governance feature is built on it.

| Page | Build | Source |
| --- | --- | --- |
| Every page | Window selector with compare-to-previous on every tile; period-over-period deltas; seasonal anomaly bands; forecast-to-threshold (budget and capacity exhaustion dates) | B1 |
| Front door, model page | Generation N beside N-1 with quality and cost deltas and the use cases still on the old one (gap); regression-suite status, eval pass-rate trend and uptime on every card; migration guide (change the base URL and the model name); who else uses this; model tree as the lineage spine; start fine-tune or deploy from the card | B2, B3, B4 |
| Use cases | Funnel with time to first successful call as the north star (target under 30 minutes); adopted-team definition stated once; rolling 28-day active teams with power, habitual and novice levels and 90-day retention; value ledger with the method stated | B1, B2 |
| Use case · Overview | Insight cards: acceptance fell, NEW topic, forecast to budget, SLO burn; the one recommendation nobody makes (a smaller model clears this task's bar at lower cost) (gap) | B1 |
| Use case · Traffic | Goodput beside throughput; TTFT decomposed into queue, prefill, KV transfer; p50 and p99 per matrix cell with a p90 output column; ITL p99 with prompt-length overlay; throughput-against-interactivity curve with the operating point and SLO line; saturation strip with the 80 and 90% lines; prefix-cache hit rate by session depth with TTFT by hit or miss; finish-reason mix; capacity line in tokens per minute at SLO; SLO error budget with multiwindow burn-rate alerts | B5, B1 |
| Use case · Models | Canary judgement with a composite score, critical metrics and intervals, and a promote or rollback button (gap); prompt versions as immutable numbers with mutable aliases and a compare tab; prompt-change alerts; per-arm quality and feedback joined to traffic share | B1, B4 |
| Use case · Quality | Acceptance and persistence as the headline; unified score model (numeric, boolean, categorical on trace, span, session); implicit events as scores; annotation queue with rubrics, corrections saved as expected outputs, claim-and-lock; judge calibration card; drift panel (PSI bands, output-length drift, embedding drift, autothresholds); clusters with compare-to-last-run and NEW labels; poor interactions by root cause; add-to-dataset from any trace with provenance | B1, B3, B4 |
| Use case · Improve | The loop as a visible state machine naming the alias and version the job will become (gap); stored-completion loop with teacher comparison; dataset eligibility after checks; pairwise preference capture feeding Bradley-Terry and DPO pairs | B1, B4 |
| Use case · Record | Base-model record beside the use record, pinned to model version and access mode; status from Draft to Decommissioned; risk tier from inherent risk and materiality that sets review cadence; the three validation components as evidence links to Official Index runs; findings with severity and owner, approval blocked on open Critical; dated attestations; Warning and Critical monitoring thresholds relative to baseline that open a task; one-click audit export and activity log; budget and rate limit tied to the approval that granted them (gap) | B3, B4 |
| Index | Pillar-by-metric matrix with drill-down to every item; intervals and n on every cell; quality against cost-per-task scatter with the Pareto frontier and the bars drawn; sufficiency view, cheapest model that clears every bar per workflow (gap); pinned configuration per row (same model, different serving, different row); dataset versions with freshness stamps and held-out rotation; judge calibration card per pillar; release diff counting flipped items with a comparison grade; Official versus Practice labels; limitations panel and confounder toggles | B3 |
| Training | Fireworks' monitor fields (state, steps, throughput, validation, logs, inspect sample rollouts, stop on regression); promote checkpoint then deploy adapter; the job names its alias and version; GPU hours and cost per job | B4 |
| Registry | Model tree with base-only toggle; approval status as a field CI reads; Owner column; cost per million tokens beside every quality score with one-button deploy; expiring evidence for vendor model versions | B3, B4 |
| Onboarding, blueprints | Instant self-serve keys with a sandbox and one runnable blueprint per model; fork this use case with routing, eval set, budget and approval template prefilled, provisioned by the assistant (gap); champions programme and weekly demo slot tracked as funnel stages; transactional feedback at failure points | B2, B4 |
| New pages | Prompts (registry, versions, aliases, compare, alerts); Datasets and queues; Alerts and weekly digest (compare-to-last-run, NEW topics, trace links); Usage and limits (Anthropic-style, limit beside peak, rate-limited requests); Unregistered usages | B1, B3, B4 |

## Contract v0.1 additions (VI-009) and derived metrics

**Fields added to the canonical event or its enrichment record:** finish\_reason (stop, length, abort); queue\_time, prefill\_time, kv\_transfer\_time (from the engine, by request id); ttft, itl\_p99, tpot; cached\_tokens and prefix-cache hit flag; turn\_index and session depth; serving pod id (affinity); prompt\_version; canary arm; rate\_limited flag; price snapshot at request time; eligibility flags (pii\_ok, compliance\_ok, toxicity\_ok); judge score references; cohort and role with a privacy floor (no cut below 30 responses from 5 users).

**Feedback events (Nucleus SDK, all keyed by request id):** explicit score with comment; accept, copy, retry, regenerate, time on output; correction (edited final text); pairwise preference; outcome event id from the business system, joined later.

**Derived metrics, with inputs:** acceptance rate (accepted over shown); persistence (share of accepted output unchanged after 2, 5, 10 minutes); goodput (requests meeting TTFT, ITL and completion SLOs); error-budget burn rate (error rate over 1 minus SLO; page at 14x over 1 h with a 5-minute short window, ticket at 1x over 3 days); cache efficiency (cached over all input tokens, savings at the price delta); cost per unit of quality (cost over score, by model and task); specialist uplift (outcome per engaged over per passive); rolling 28-day active teams and 90-day retention; PSI drift on consecutive and baseline windows, output-length drift as average delta, embedding drift as domain-classifier score; canary composite (Mann-Whitney per metric at 98%, critical metrics fail the whole, weighted pass score); Bradley-Terry ranking with intervals from pairwise preferences; forecast headroom days (seasonal forecast against capacity or budget); automation rate (involvement times resolution); rescued-request rate; time to first successful call. VI-009's next session turns this list into the schema.

**Harness hypothesis (VI-008, pre-registered from B5):** with session affinity, prefix-cache hit rate rises with session depth and the TTFT gap between hit and miss widens with prompt length, at no ITL cost. Refuted if hit rate is flat across depth or ITL p99 worsens on affinity pods. Measures per use case: context tokens per turn by turn index; cached tokens per turn; hit rate by depth bucket; TTFT by hit or miss; inter-turn gap against block eviction; session-to-pod stickiness; GPU-seconds saved.

| Node | Type | Phase | What it is |
| --- | --- | --- | --- |
| Model catalogue | Surface | 1 | Cards by generation; VGLM4 opens its use cases; Core and Distil hidden by default, lineage shown to engineering roles; lifecycle state and retirement date on every card |
| Use-case page, live view | Surface | 1 | Tokens, requests, input-length buckets, SLOs, throughput, latency, cost per use case with vendor-equivalent cost avoided, utilisation; 7 and 30-day windows; content insights only privacy-thresholded and tiered |
| Onboarding assistant | Surface | 1 | Intake form with the assistant as helper; model size recommended from the index; access, service levels, endpoints; runs on VGLM through the gateway, so the portal is its own first use case with a public live view |
| Use-case record | Surface; one object with the usage-approval record | 1 | Use case, lifecycle (POC, pilot, production), alias, model, harness version, tags, budget, tier, approvals; approvers join once the mechanism exists |
| Improvement loop | Surface (workbench) | 2, when VAI delivers | Task mining on one use case first; gap against the index; train a specialist with an ETA and visible not-ready states; offline eval; canary 5, 50, 100 percent by alias weights; migrate |
| Use-case telemetry contract | Feature VI-009 | 0, before any page | Required fields in Nucleus, the canonical event, enrichment records; the audit of what Langfuse captures today |
| Blueprints | Feature VI-010, promotion candidate | 2 | Forkable inner-source packages (RAG, GraphRAG, embeddings, harness patterns) with gateway, observability and eval wired in; an enhance path for existing apps; vendor models later through the same blueprint |
| Playground | Surface, undecided | 1 or 2 | Try a model in the browser without Nucleus; absent from the vision, table stakes elsewhere; open question |
| VAI | Feature VI-004 | Evidence layer | Model-size advice at onboarding, the per-use-case line item, offline eval before canary; runs against the endpoint (the served system), not the raw model |
| Harness-served models | Idea VI-008; enables this | Own chat | The portal shows what the harness did per request (engineering roles) and records the harness version in the use-case record |

## First version and what it is not

**First version: one journey, end to end, for one business line.** A team arrives at the catalogue with a workflow, sees which Vanguard models clear the bars for its pillars, requests access with the index profile attached, and Governance approves the usage against named pillars and bars. That is the catalogue, onboarding and governance surfaces at their thinnest, on the five VAI MVP pillars, for one beachhead business line.

Build an SLM, live runs, contribute and reports come after the first journey proves P1 and P2.

**Revised 2026-11-02 (decision 1).** Showroom and workbench run as one programme in three phases. Phase 0: the telemetry contract and the audit of what Langfuse captures today. Phase 1, the showroom: the catalogue, the flagship use case's live view, the onboarding assistant running as the portal's own use case, the use-case record, and task mining on one use case. Phase 2, the loop, when VAI delivers its first sufficiency map. The one-journey version above is subsumed: the use-case record is created in phase 1 and approvals attach when Risk joins. The harness (VI-008) is not the portal: the portal shows what it did and records its version.

**What it is not**

- Not a general AI marketplace or an app store for prompts and agents.
- Not a replacement for the AI Gateway: the portal sits on it and enforces approvals through it.
- Not a training platform: the training pipeline stays where it is; the portal is where a team starts and tracks a build.
- Not a vendor-model storefront: frontier models appear in the catalogue for comparison and approved usages, but the portal exists to make owned models adoptable.
- Not a governance system of record for the whole firm: it holds model-usage approvals and feeds Risk's systems.

## Appetite

Proposed: **one quarter for the first journey**, starting once VAI Phase 1 delivers its first sufficiency map, since onboarding has nothing to show without index evidence. The full portal (all seven surfaces) is a year-scale programme and should be re-shaped at Proposal rather than committed now. If the first journey cannot fit a quarter, it goes back to Shaping, not forward. Jithin sets the appetite.

**Set 2026-11-02:** phased as in First version. Phase 1 is sized to a quarter; phase 2 starts when VAI delivers and is sized then; the whole programme is re-shaped at Proposal. Engineer-weeks per phase are set at the Building gate.

## Capabilities reused and created

The portal is mostly a composition of capabilities that already exist or are proposed by VAI; its own new build is the catalogue, the approval record and the journeys that join them.

| Capability | Direction | Maturity | Used for |
| --- | --- | --- | --- |
| AI Gateway and multi-tenant memory | Reuses | In production | Access, sensitivity tiers, enforcement of approved usages, cost telemetry |
| HyperPod serving with per-setting endpoints | Reuses | In production | Serving settings shown by outcome in the catalogue |
| Model compression pipeline | Reuses | In production | Speed-optimised serving settings |
| Self-healing gap-closing system | Reuses | Built | Heal loop inside Build an SLM |
| Evaluation register and harness | Reuses (from VAI) | Proposed | Every evidence surface; the portal inherits this risk in feasibility |
| Contribution flow | Reuses (from VAI) | Proposed | Contribute surface |
| Model catalogue | Creates | Idea | Discovery for any future model or agent product |
| Usage-approval record (model, setting, pillars, bars) | Creates | Idea | Governance for any AI usage, portal or not |
| Onboarding flow | Creates | Idea | Reusable intake for any VI service |
| SLM build workspace | Creates | Idea | Any team building on VGLM |
| Nucleus SDK (Python and Node, OpenAI client patterns) | Reuses | In production | Contract carrier: required use case and stage, per-call task tag, request id returned, feedback call |
| Langfuse telemetry store (modified) | Reuses | In production | The database behind the live view and the loop; schema extended inside it (decision 5) |
| Hermes harness and Nucleus sessions | Reuses (via VI-008) | Proposed | Session intelligence and per-use-case knowledge; the portal shows their effect and records the harness version |
| Use-case telemetry contract | Creates (VI-009) | Proposed | Every page, the weekly digest, the SRE and portal agents |
| Use-case record | Creates | Proposed | One object with the usage-approval record: alias, lifecycle, tags, budget, tier, approvals |
| Blueprints registry | Creates (VI-010) | Idea | Any developer, portal or not; promotion candidate |

The usage-approval record is the strongest promotion candidate: it has value for Risk whether or not the rest of the portal ships.

## Governance story

The portal touches model risk directly, so governance is a design input, not a gate at the end.

- **Approval attaches to a usage, not a model name:** model, serving setting, the pillars the workflow relies on, and the bars it cleared. A new release or setting is a new usage and re-runs the regression gate.
- **Enforcement at the gateway:** a team can call a model only for usages it holds an approval for; the gateway, not the UI, is the control.
- **Sensitivity tiers travel with the request:** a workflow's tier decides which models it may even see in the catalogue; Tier 3 never leaves the boundary.
- **Human review stays for high-stakes usages:** client-advice and regulated-data workflows keep a human approver; an index pass informs the decision and never replaces it.
- **Audit trail by default:** every approval, the evidence it rested on and every later change are versioned and exportable for Audit.

Open: Risk has not yet agreed the approval format or that index evidence can stand in for bespoke review. That is the same test as VAI's Phase 0 and should be run once for both.

**Decision 2 (2026-11-02, Head of VI): validation is layered.** The base model and the VAI methodology are validated once, through the existing governance process outside the platform. Each new use case is evaluated on top of them: inside the portal when it is mature enough to have human-curated labels, outside when it is not. The loop's training evidence and the same inferencing path give approvers their confidence. Approvers join the system later, once the mechanism exists and they have agreed the process; the use-case record exists from phase 1 so there is something for them to join.

## Backend as it runs today (2026-11-02)

Engineering section, from the Head of VI's description; internal figures, not for enterprise-facing material unless cleared.

- **Hosting.** AWS HyperPod on Slurm. Each production use case has dedicated, isolated machines (the flagship call-summarisation use case has its own). vLLM serving with KV caching, speculative decoding and GPU fractions; a separate VGLM codebase is deployed to the cluster with vLLM and transformers as its dependencies.
- **Client.** Nucleus (Python from Vanguard's Artifactory; a Node variant), OpenAI client patterns. The model name names the endpoint: for dedicated hosting that is the use case (VGLM4 for this use case); shared test instances use the model name. Nucleus creates sessions; session id, project id and project stage can be passed and are tagged on the request. The tags are optional today and, in the Head of VI's judgement, not in good shape.
- **Endpoint.** Model only. The application does its own post-processing; VI handles the request side.
- **Logging.** A modified Langfuse (open source, extra metrics added) captures requests. Its UI is to be retired; its database stays. Which database it runs on, and how much of what is captured is usable, is not yet known.
- **Scale.** The flagship use case runs at about 1.7M input and 170k output tokens a minute; the speech system behind it processes about 120k calls a day in a 10-hour window at about 20 minutes a call.
- **Not yet covered.** Routing-weight mechanics, Envoy's current ext\_proc role, what a session holds, self-healing's triggers, and which of the US, Canada and India teams owns each piece; see Open questions.

## Use-case telemetry contract v0 (VI-009)

The portal defines the contract and Nucleus follows it (decision 3). The first engineering task, before any page, is an audit of what Langfuse captures today, per endpoint, against these fields.

| Field | Carried by | Required | Why |
| --- | --- | --- | --- |
| use\_case | Nucleus client creation (today: the endpoint name) | Yes | Attribution for every page; the alias |
| stage (POC, pilot, production) | Client creation | Yes | Lifecycle on the record; POCs and pilots kept out of production views |
| task | Per call, Nucleus metadata | Optional at first; required once the loop runs | One application runs several tasks on one model; task mining is checked against it |
| alias → model, adapter, harness version, canary weight | Resolved at the gateway, set by VI | Yes | Migration is a config change, never a client change |
| request\_id | Returned to the client | Yes | Feedback and enrichment join on it |
| session\_id | Nucleus | When sessions are used | The harness's unit of work |
| prompt\_id, versioned | Per call | Recommended | Prompt version against trace outcomes |
| end\_user, hashed | Per call | Recommended | Privacy thresholds for insights |
| tokens in and out, latency, status, input-length bucket | Gateway, synchronous event | Yes | The live view |
| feedback(request\_id, score) | New Nucleus method | Recommended | The loop's feedback data, one line in the application |
| sensitivity tier | On the use-case record, copied to the event | Yes | What may be shown to whom |

**Design (decision 4): two layers.** The gateway emits one canonical event synchronously (ids, tags, counts, latency, status; no content). Checks run as asynchronous consumers of that stream and write enrichment records keyed by request\_id: compliance, PII, toxicity and language, dataset eligibility, per-call rating, the self-evaluating loop; the harness (VI-008) is one such consumer. Hard blocks (PII before any vendor model, policy stops) stay in-band at Envoy's ext\_proc filter.

**Store (decision 5).** The Langfuse database houses everything; VI modifies its schema to its liking; the portal shows a condensed view; SRE and portal agents read the full data behind the scenes. Standing critique, recorded not re-argued: Langfuse upgrades become merges, and access control has to be built per consumer. The alternative stays on file: VI-owned tables beside Langfuse's, keyed by trace and observation ids, with one read API serving per-audience views (portal aggregates and thresholded insights, SRE traces, raw content only for cleared tiers).

**Registered** 2026-11-02 as VI-009, a feature of VI-003, at Seed; this section is its v0 until it has a session of its own.

## Harness-served models (VI-008), captured for its own chat

Models would be served wrapped in a harness agent (Envoy → harness → vLLM endpoint): it answers at once with what it has and does the background work on the session, acting from the next call. Registered 2026-11-02 as VI-008 at Seed, theme T-001, enables VI-003; its own chat shapes it. What follows is the capture, not the shaping.

- **What the harness does.** Session intelligence: entities, running summaries with formatting, the right level of detail, what to add next. A knowledge graph per use case built from its requests; retrieval from knowledge bases; abuse detection handled in the background. Nucleus sessions hold the state; Hermes (the Nous Research agent) and its plugins are the runtime. Dedicated endpoint, knowledge graph and sessions per use case.
- **Why it matters to the portal.** It is the strongest answer to why in-house rather than a vendor API: a vendor sells a stateless model, VI sells one that remembers the session, learns the use case and improves. Its effect is the showroom's best exhibit if it is visible on the use-case page: context tokens saved, quality over the session, and for engineering roles what it did on each request.
- **What it changes, carried to VI-008's stress test.** (1) The served system, not the model, is what VAI evaluates and governance approves; the use-case record carries the harness version and policy. (2) Applications already manage context, so the harness is opt-in per use case with an owner-set policy (what it may summarise, extract, retrieve, store), and runs in shadow mode first: it records what it would have done and changes nothing. (3) vLLM's prefix caching rests on stable prefixes: append, do not rewrite. (4) The per-use-case knowledge graph is a store of client data (tier, retention, erasure, access); it belongs in the gateway's multi-tenant memory substrate, one tenant per use case. (5) Always answering with what we have cannot be absolute: hard blocks stay in-band.
- **Cost signal.** Dedicated isolation shows its cost on the live view: ten busy hours a day leaves idle GPU the rest of the time. Specialists as adapters on shared serving are the answer where governance allows; the portal shows utilisation either way.

## Scout brief (2026-11-02)

Thirty public sources, generic queries only, no Vanguard terms or figures used. The vision's core is new: model card → use cases → live traffic in one click exists nowhere public, and the coupled loop (mine tasks → gap against the index → train → canary → migrate) exists only in pieces. The full brief with per-category tables is kept beside this card as scout-brief-vi-portal.md.

**Confirms**

- The one-click path from model to use case to live traffic: Azure's catalogue stops at endpoints, Hugging Face at downloads, Databricks has the right telemetry tables but admin-only and about an hour late \[S3, S2, S4\].
- The loop's pieces exist separately, never joined: OpenAI's distillation flow (store, evaluate, fine-tune, re-evaluate), OpenPipe's tagged logs to datasets, LangSmith's Insights Agent for task clustering, Portkey's weighted canary \[S14, S15, S7, S11\]. OpenAI's own loop takes several rounds before a distilled model passes, so the train-a-specialist action needs visible not-ready states \[S14\].
- Model-size recommendation from an evaluation index inside an assistant: nothing comparable; nearest is Goldman's automated model-by-question tests \[S21\].

**Changes**

- Bank adoption turned on cost structure and proof, not features: JPMorgan's internal build meant unused seats cost nothing, about 200k of 250k staff by May 2025; Goldman ran a year-long all-levels pilot whose Q&A became the benchmark; Morgan Stanley reached 98% of advisor teams with expert grading and a daily regression suite \[S20, S21, S22\]. The live view needs cost per use case, vendor-equivalent cost avoided, and reliability proof beside the SLOs.
- The migration primitive is a use-case-scoped alias over a model group with a 0%-weight fallback slot; 5/50/100 and the final cut-over become a config change with no client change \[S10, S4\]. Specialists serve as adapters, not a GPU each \[S16\].
- Content insights have a published privacy design: minimum unique-user threshold, hierarchical clusters, automated audit of summaries \[S9\].
- Grounded assistants fail on compound intake questions, so intake is a form with the assistant as helper \[S30\]. Hide variant details by default, reveal for engineering roles; engineers ask what sits behind the alias \[S1, S3\].
- The portal as its own first use case: Spotify's knowledge assistant inside its developer portal reached 70% of staff ever and 25% weekly \[S25\]; the onboarding assistant on VGLM through the gateway gives the showroom live scale on day one.

**Comparables, condensed**

| Example | Borrow | Gap against the portal |
| --- | --- | --- |
| Hugging Face Hub, Enterprise \[S1, S2\] | Machine-readable card front matter; base\_model and new\_version for generation and latest; gating groups as the tier pattern | No link from model to workloads; analytics are downloads |
| Azure AI Foundry catalogue \[S3\] | Lifecycle state and retirement date on every card; a Deployments tab; request-a-model as a demand signal | Endpoints, not business use cases; no per-workload telemetry |
| Databricks AI Gateway \[S4\] | Two-table telemetry schema (endpoint usage with a usage-context tag; served entities); the 0% fallback slot | Admin-only, hour-late; no card, mining or training action |
| Langfuse \[S6\] | Alerting; annotation queues; three-type scores; prompt-version-to-trace link | No SLO view per use case; no prompt clustering |
| LangSmith Insights Agent \[S7\] | The published shape of tasks hiding behind one model: categories, metrics split per category, one click to a dataset | No training or routing follows |
| Anthropic Clio \[S9\] | The privacy design for content insights | Internal, consumer chat |
| LiteLLM proxy \[S10\] | Aliases over model groups; budgets with duration and ceilings; required tags per key | No feedback attribution per target |
| Portkey \[S11\] | Weighted targets with per-target model override | No stepped schedule |
| Uber GenAI Gateway \[S13\] | One security review at the gateway; PII tokenised before vendor models | No catalogue or use-case view |
| OpenAI model distillation \[S14\] | The four-step loop as the UX of train a specialist; capture by default | No task discovery; no canary |
| OpenPipe \[S15\] | Log incumbent and candidate under the same tags so canary comparison is free | Hosted; no routing |
| NVIDIA Blueprints, Microsoft templates, Google agent-starter-pack \[S17, S18, S19\] | Deploy chart and customisation guide per blueprint; a building-block tier with security trimming; an enhance path to retrofit an existing app | Vendor-centric; no inner-source governance |
| Red Hat Developer Hub on Backstage \[S26\] | Model as a catalogue entity with its card, approved use cases, sign-up steps and curl and Python samples | No traffic or loop |

**Additional features to consider, ranked**

| # | Feature | Why | Source |
| --- | --- | --- | --- |
| 1 | Cost per use case and a vendor-equivalent cost-avoided counter on the live view | Bank adoption turned on cost; the live view has no cost line | S24, S20, S6 |
| 2 | Use-case-scoped alias with a 0% fallback slot | Migration as a config change | S10, S4 |
| 3 | Lifecycle state, retirement date and latest-version pointer on every card | Generations need a deprecation path | S3, S2 |
| 4 | Privacy-thresholded, hierarchical content insights with automated checks | Output-derived insights need a minimum-user threshold | S9 |
| 5 | The portal as its own first use case, with a public live view | Live scale is the cheapest evangelism | S27, S25 |
| 6 | Self-serve budgets (duration, temporary increase, ceiling) and token quotas per model | Usage-based approval needs a budget object | S10, S12, S4 |
| 7 | Mandatory request metadata at key issuance (use case, prompt id, hashed end user) | Without tags the loop cannot filter or attribute | S4, S15, S10 |
| 8 | Category view of mined tasks, metrics per category, one click to a dataset | Discovered tasks become a backlog with evidence | S7, S6 |
| 9 | Threshold alerts per use case to chat and webhooks | SLOs without alerts are dashboards nobody opens | S6 |
| 10 | Blueprint enhance path and a building-block tier with document-level security trimming | Most teams already have an app | S19, S18 |
| 11 | Multi-adapter serving for specialists | A specialist per use case without a GPU each | S16 |
| 12 | Inventory fields for audit: owner contact, incident plan, dated change log, monitoring plan | The governance surface becomes an inventory regulators recognise | S29, S28 |
| 13 | Request-a-model button; unanswered-questions report from the assistant | Demand signals; doc gaps surface themselves | S3, S25 |
| 14 | Office hours as a funnel stage; daily regression suite beside SLOs | The fastest-adopted tools paired software with people and proof | S24, S21, S22 |
| 15 | PII tokenisation at the gateway before any vendor model | Needed the day blueprints admit vendor models | S13, S23 |

**Table stakes**, present in every comparable: an OpenAI-compatible endpoint; per-key and per-team spend with rate limits; request, token, latency and error analytics; searchable trace logs with tags; weight-based traffic split with fallbacks; cards with licence, intended use, limitations and eval results; lifecycle state; user feedback scores; datasets with offline evaluation. Not in the brief's list but present in every vendor path: a browser playground; its absence is an open question.

**Warning signs** on the differentiators: the loop needs not-ready states; the assistant needs a form; hidden variants need an engineering view; content insights are a privacy feature before they are an analytics feature.

**Adoption lessons**

1. Remove the per-seat decision; unused access that costs nothing is what business leaders accepted \[S20\].
2. Pilot across every level, use the pilot's questions as the benchmark, gate rollout on data and safety readiness, train people \[S21\].
3. Prove reliability with experts grading outputs and a daily regression suite; keep humans reviewing; answer data-retention worries; let one win fund the next \[S22\].
4. Put the assistant where people already work; its usage exposes documentation gaps that teams then fix \[S25\].
5. GUIs over APIs; a human hotline and hackathons; fund production once lightweight tools show demand \[S24, unverified\].
6. Match the vendor API so switching is seamless; do the security review once at the gateway \[S13\].
7. Let an orchestration layer pick the model per task so teams do not have to \[S23\].
8. On every model entry show how to sign up, get a key and call it in curl and Python \[S26\].

**Sources** (published date where shown, otherwise as of 2026-11-02; S16 and S24 unverified secondary)

| ID | Source | Date |
| --- | --- | --- |
| S1 | [Hugging Face: Enterprise Hub](https://huggingface.co/docs/hub/enterprise-hub) | 2026-11-02 |
| S2 | [Hugging Face: Model Cards](https://huggingface.co/docs/hub/model-cards) | 2026-11-02 |
| S3 | [Microsoft Learn: Foundry Models catalog overview](https://learn.microsoft.com/azure/ai-foundry/how-to/model-catalog-overview) | 2026-11-02 |
| S4 | [Databricks: Configure AI Gateway on model serving endpoints](https://docs.databricks.com/ai-gateway/configure-ai-gateway-endpoints.html) | 2026-11-02 |
| S5 | [AWS: SageMaker Model Registry supports ML governance information](https://aws.amazon.com/about-aws/whats-new/2024/06/amazon-sagemaker-model-registry-machine-learning-governance/) | 2024-06-06 |
| S6 | [Langfuse: Core features](https://langfuse.com/docs/core-features) | 2026-11-02 |
| S7 | [LangChain: Insights Agent and multi-turn evals in LangSmith](https://www.langchain.com/blog/insights-agent-multiturn-evals-langsmith) | 2025-10-23 |
| S8 | [Arize: Embedding cluster summarization](https://docs.arize.com/arize/large-language-models/troubleshoot-retrieval-with-vector-stores/embedding-cluster-summarization) | 2026-11-02 |
| S9 | [Anthropic: Clio](https://anthropic.com/news/clio) | 2024-12-12 |
| S10 | [LiteLLM: Virtual keys](https://docs.litellm.ai/docs/proxy/virtual_keys) | 2026-11-02 |
| S11 | [Portkey: Canary testing](https://portkey.ai/docs/product/ai-gateway/canary-testing) | 2026-11-02 |
| S12 | [Kong: AI Gateway](https://konghq.com/products/kong-ai-gateway) | 2026-11-02 |
| S13 | [Uber Engineering: GenAI Gateway](https://www.uber.com/us/en/blog/genai-gateway/) | 2024-07-11 |
| S14 | [OpenAI: API model distillation](https://openai.com/index/api-model-distillation/) | 2024-10-01 |
| S15 | [OpenPipe: Logging requests](https://docs.openpipe.ai/features/request-logs/logging-requests) | 2026-11-02 |
| S16 | [Predibase press release via Silicon UK](https://www.silicon.co.uk/press-release/predibase-launches-next-gen-inference-stack-for-faster-cost-effective-small-language-model-serving) | 2024-10-15 |
| S17 | [NVIDIA: NIM Agent Blueprints](https://blogs.nvidia.com/?p=73861) | 2024-08-27 |
| S18 | [Microsoft Learn: AI app templates](https://learn.microsoft.com/en-us/azure/developer/ai/intelligent-app-templates) | 2026-11-02 |
| S19 | [GitHub: GoogleCloudPlatform/agent-starter-pack](https://github.com/GoogleCloudPlatform/agent-starter-pack) | 2026-11-02, archived |
| S20 | [American Banker: How JPMorganChase democratized employee access to gen AI](https://www.americanbanker.com/news/how-jpmorganchase-democratized-employee-access-to-gen-ai) | 2025-05-22 |
| S21 | [American Banker: Goldman Sachs staff now write a million gen AI prompts a month](https://www.americanbanker.com/news/goldman-sachs-staff-now-write-a-million-gen-ai-prompts-a-month) | 2025-07-25 |
| S22 | [OpenAI: Morgan Stanley customer story](https://openai.com/index/morgan-stanley/) | undated |
| S23 | [VentureBeat: Wells Fargo's AI assistant crossed 245 million interactions](https://www.venturebeat.com/ai/wells-fargos-ai-assistant-just-crossed-245-million-interactions-with-zero-humans-in-the-loop-and-zero-pii-to-the-llm) | 2025-04-08 |
| S24 | [ZenML LLMOps Database: Pinterest, democratizing prompt engineering](https://www.zenml.io/llmops-database/democratizing-prompt-engineering-through-platform-architecture-and-employee-empowerment) | 2025 |
| S25 | [Spotify Backstage: AI knowledge assistant and data plugins coming to Portal](https://backstage.spotify.com/blog/aika-data-plugins-coming-to-portal) | 2025-04-15 |
| S26 | [Red Hat Developer: LLMs in Developer Hub, catalog AI assets](https://developers.redhat.com/articles/2024/11/12/llms-developer-hub-catalog-ai-assets) | 2024-11-12 |
| S27 | [Spotify Portal docs: AI Gateway](https://backstage.spotify.com/docs/portal/core-features-and-plugins/ai-gateway) | 2026-11-02 |
| S28 | [EU AI Act, Annex IV](https://artificialintelligenceact.eu/annex/4/) | 2026-11-02 |
| S29 | [NIST AI RMF Playbook, GOVERN 1.6 (mirror)](https://www.stigviewer.com/controls/ai-rmf/GOVERN%201.6) | 2026-11-02 |
| S30 | [The Platform Log: Catalog-aware LLM Q&A for Backstage](https://theplatformlog.pages.dev/catalog-assistant) | 2026-06-03 |

Not examined: LinkedIn's GenAI platform post, Google Vertex Model Garden access control, Port and Cortex AI features, the Google Model Cards paper.

## Early critique and open questions

Not the stress test, which is recorded at the next stage; these are the weaknesses visible at Shaping, so the next session starts from them.

- **Evidence of need is thin.** Every pain in "Who feels it" is plausible and none is measured. Five recent adoptions, timed end to end, would settle it.
- **It is a platform before it is a product.** Seven surfaces for four audiences is the classic year-long build with no decision shipped. The one-journey first version is the defence; anything added to it removes something.
- **The portal is only as useful as the models in it.** If few Vanguard models clear the bars, the catalogue mostly shows frontier models and the portal argues against its own theme. VAI's decision spike answers this first.
- **A front door can become a toll booth.** If approval through the portal is slower than the side door, teams route around it. P1 must be measured against the side door, not against nothing.
- **Existing systems may already own part of this.** Risk's model inventory, an internal developer portal or an access-request tool may overlap. A Scout pass should find them before anything is built.

**Added 2026-11-02**, after the vision session; the first three in the list above are answered by decision 1, the scout brief and the phase plan, and stay as the stress test's record.

- **No playground.** Every vendor path lets a team try a model in the browser in minutes; the vision has no way to experiment without Nucleus. Decide whether phase 1 ships one.
- **Content insights are a privacy feature first.** Insights derived from client-call outputs need a minimum-user threshold, hierarchical clusters, an automated check of summaries and a tier before anyone outside VI sees them.
- **The loop's feedback data has no source yet.** Nothing emits per-request feedback today. The Nucleus feedback call is the fix, one line in the application, and the application owner has to add it.
- **Most product owners do not want to own a model.** Sell the outcome (faster, cheaper, same bars); the specialist stays VI's; the owner approves a canary.
- **Dedicated isolated hosting shows its cost on the live view.** Idle GPU outside the busy window will be visible; specialists as adapters on shared serving are the answer where governance allows.
- **Two standing critiques recorded against decisions taken:** the Langfuse fork (decision 5) and the harness's answer-first policy (VI-008), each in its own section.

| Open question | Owner | Blocking |
| --- | --- | --- |
| Which business line is the beachhead for the first journey? | Head of VI with business partners | Yes, for Proposal |
| Who is the portal product lead? | Head of VI | Yes, for Proposal |
| What does Risk already use as its model inventory, and does the portal feed it or replace part of it? | Risk and Compliance liaison | Yes, for Stress test |
| Is there an internal developer portal the catalogue should live inside rather than beside? | Harness and platform lead | No |
| What is the baseline time from request to approved access today? | Portal product lead | Yes, for Stress test |
| What does Langfuse capture today, per endpoint, against the contract fields (the audit)? | Harness and platform lead | Yes, for phase 1 |
| How are routing weights set today, and what does Envoy's ext\_proc do now? | Harness and platform lead | Yes, for the loop |
| What does a Nucleus session hold, and how will Hermes read and write it? | VI-008 session | No |
| What triggers self-healing today, and what does it hand back? | VI-005 interface owner | Yes, for the loop |
| Which of the US, Canada and India teams owns hosting, Nucleus, logging and the portal? | Head of VI | Yes, for the Building gate |
| Does phase 1 ship a playground? | Head of VI | No |
| How do SRE and portal agents get tiered access to the full telemetry without a read layer? | Harness and platform lead; Risk and Compliance liaison | Yes, before any agent reads production data |
| Which use case is second on the showroom after the flagship, and which business line is first for onboarding? | Head of VI with business partners | Yes, for Proposal |

## Decision log

| Date | Decision | By |
| --- | --- | --- |
| 2026-11-01 | Idea card drafted in Shaping: problem statement, four-group users, pre-registered hypotheses P1 to P4, feature map, one-journey first version, governance story; appetite of one quarter proposed | Thinking partner, pending Jithin |
| 2026-11-02 | Vision session: VGLM line, the adoption problem and five portal surfaces recorded from the Head of VI's dictation; feature map v2; hypotheses P5 and P6 added; backend as-is recorded; scout brief recorded with 30 sources | Thinking partner |
| 2026-11-02 | Decision 1: showroom and workbench as one programme, phased (0 contract, 1 showroom, 2 loop when VAI delivers); the one-journey first version subsumed; appetite phase 1 a quarter, phase 2 sized when it starts | Jithin (thinking partner had recommended showroom first) |
| 2026-11-02 | Decision 2: layered validation; base model and VAI methodology validated once outside the platform; each use case evaluated on top, inside the portal when mature enough for curated labels; approvers join once the mechanism exists | Jithin |
| 2026-11-02 | Decision 3: today's logging and project-ID tags not fit; the portal defines the use-case telemetry contract (VI-009) and Nucleus follows it; the audit of captured fields is the first engineering task | Jithin |
| 2026-11-02 | Decision 4: two-layer telemetry, canonical event in-band and checks asynchronous, the harness as the async layer; hard blocks stay in-band (thinking partner's caveat, recorded) | Jithin |
| 2026-11-02 | Decision 5: the Langfuse database houses everything, schema modified inside it; the portal shows a condensed view and agents read the full data; standing critique recorded (upgrade merges, per-consumer access control) | Jithin (thinking partner had recommended extending beside, with one read layer) |
| 2026-11-02 | Registered: harness-served models as VI-008 (idea, Seed, enables this); use-case telemetry contract as VI-009 (feature of this, Seed, v0 here); blueprints as VI-010 (feature of this, Seed, promotion candidate) | Thinking partner |
| 2026-11-02 | Decision 6: all five scout-pass-2 briefs adopted (temporal and derived KPIs folded in; adoption findings as guiding light; evaluation and governance approved; platform features adopted in full; serving telemetry adopted); Feature plan v2 stands as the build list; SR 11-7 claim still to be verified by the Risk liaison | Jithin |
| 2026-11-02 | Interface sketch v3 built against the plan: twenty screens (Pass A: Capacity page, Traffic, Record and Quality rebuilt, Models, Improve, VGLM4 page, Index, Overview and Blueprints revised; Pass B: Prompts, Datasets and queues, Alerts and digest, Usage and limits, Unregistered usage, adoption features on the front door and Use cases); page map v3 | Thinking partner |
| 2026-11-02 | Captured for its own chat: agents as first-class citizens of the portal — harness-served endpoints are agents, task-specific agents beside task-specific models, and a prefilled library of reusable agents; folded into VI-012 agent-portfolio, which the VI-011 session registered at Seed minutes earlier with a 40-agent list (claude/agent-portfolio-seed.md); the library thought sits in its next step, and the register links VI-003 enables VI-012 | Jithin (queued) |
| 2026-11-02 | Design rule: the harness lives inside the API and is invisible in the portal UI; only an endpoint build version remains, on the record and in engineering view. Sketch v3.1 applied it (Blueprints card renamed to Session-aware application; eight pages reworded) | Jithin (rule); thinking partner (applied) |
| 2026-11-02 | Decision 7: grace policy for unregistered usage approved (day 0 seen and offered help; day 14 tags required; day 30 record required, production endpoints withdrawn with a week's notice; unapproved vendor hosts to Risk at once); Risk's concurrence pending before day 30 goes live | Jithin |
| 2026-11-02 | Governance sits outside the design sessions for now; SR 11-7 verification and Risk's concurrence on the grace policy parked as recorded assumptions, back at Stress test | Jithin |
| 2026-11-02 | Design kit and design language split out as VI-013 design-kit (a capability for every VI product); the portal reuses it and is its first consumer; scout brief with the recommendation in project knowledge (claude/scout-brief-design-kit.md); the sketch is re-skinned with the kit once VI-013 decides | Jithin |
| 2026-11-03 | Training UI benchmarked against Unsloth Studio at Jithin's request; sketch v3.2 adds the engineering trainer surface (live metrics, charts, recipe, run history, job controls, Train as, before-and-after with calibration) and the Datasets bring-data-in flow; two questions opened: host Unsloth Studio inside the boundary as the engineering trainer (reuse first), and the playground decision | Thinking partner, pending Jithin |
| 2026-11-03 | Decision 8: users train on the portal's own UI; Unsloth is a feature reference only, not hosted or depended on; sketch v3.3 adds the New training run card (base model, train as, data set, recipe, compute and cost, name and start) | Jithin |
