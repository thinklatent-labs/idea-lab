<!-- Exported from https://claude.ai/artifact/4pwnZVstw8ZpcAP6sofN4U (rev 39) on 2026-11-04. Read-only mirror; edit the live doc, not this file. -->
# TL Index (index) — Project Proposal

Nov 1, 2026 · @Jithin Pradeep

**Lab record** (Idea Lab standard v1)

| Field | Value |
| --- | --- |
| ID and slug | TL-004 · index |
| Type and parent | Feature · feature-of TL-003 portal |
| Theme served | T-001 Sovereign AI: owned models on owned infrastructure |
| Stage | Proposal. Stress test recorded 2026-11-01 (critique log and kill criteria below); ready for team review |
| Horizon and appetite | H1 · two quarters to the first quarterly index report (Phase 0 to Phase 2) |
| Owner | Head of ThinkLatent (sponsor); index lead and harness lead to be named |
| Rubric | 4.0 proposed on 2026-11-01 after the stress test, pending Jithin: strategic fit 5, evidence of need 3, differentiation 4, feasibility 3, value at stake 4, governance exposure 4, reversibility 4, compounding 5 |
| Reuses | AI Gateway; HyperPod serving; model compression pipeline; self-healing system; scheduled-task patterns; the university lab |
| Creates | Evaluation register and harness; contribution flow; sandboxed tool replicas; skill-tandem records |
| Links | depends-on TL-005 self-healing · related-to TL-001 neo |
| Sensitivity | Internal strategy; no client data in this doc |
| Standard and last reviewed | v1 · 2026-11-01 |
| Register | [Idea Register](https://claude.ai/artifact/6WzPg7fvvAf2tn8Z9X2Q2h) |

## Executive summary

We propose building the TL Index (the TL Index) as a feature of the ThinkLatent Portal: a private, versioned evaluation layer that scores AI models on sixteen Enterprise-relevant capability pillars and on end-to-end use cases built from our own tools, and prices every score against cost and deployability. Its first job is to test one hypothesis: our workload does not need frontier models by default, and task-specific smaller models trained in-house outperform general models in our context. Its lasting job is to be the instrument every model decision at the Enterprise runs through: selection for a workflow, adoption of a new release, in-house training targets, production swaps and vendor spend.

The MVP proves the hypothesis on five pillars and three use cases within one quarter of foundation work; the full index and first quarterly report follow in the next. The ask of the team is to challenge the pillars, contribute datasets and use cases from their domains, own production bars with their business partners, and build the harness, scoring and product surface described below.

**How to use this proposal.** This is a draft for the team to improve, not a finished plan. Each section ends in a decision or an owner; where it does not, that is a gap to fill. Comment inline, and in particular:

- Add or merge pillars where your domain is under- or over-represented, and name the datasets that should compose them.
- Propose use cases from your area with the skill chain they exercise, using the ten candidates as the template.
- Challenge the production bars and the expected sufficiency column; those are hypotheses, not findings.
- Flag anything in the design principles that conflicts with Risk, Security or Data Governance policy as you know it.
- Claim ownership in the roles table and add names to the open questions.

## What the project is

The TL Index (the TL Index) is a private, versioned benchmark that scores AI models on the capabilities the Enterprise's core operations actually depend on, and prices every score against cost, latency and deployability. It answers one question per model and per task family: is this model sufficient for this job at the Enterprise, and at what cost?

It is built to test a specific hypothesis: the Enterprise's workload mix does not require frontier models by default. Most task families plateau at a model size well below frontier, and task-specific trained smaller models outperform general-purpose models in the Enterprise's context. Upgrading to each new frontier release on the strength of general-intelligence claims, without reference to our own task complexity, is spending money for gains we do not realise.

The index is therefore not a leaderboard. It is a decision instrument: it tells platform, product and procurement teams which model class to target for in-house training and hosting, where frontier capability is worth paying for, and when a new release has moved anything we care about.

## Why we should do it

We currently have no evidence-based way to say whether a model is good enough for an Enterprise task. Model selection today rests on public benchmarks (MMLU, GPQA, SWE-bench, coding and reasoning leaderboards) and vendor release notes. None of these measure fund-accounting reconciliation, retirement-plan client conversations, SEC and FINRA scenario adjudication, or recognition of our own fund and counterparty entities. Public scores are also contaminated: open test sets appear in training data, so they overstate capability on exactly the tasks they claim to measure.

The result is a default toward the largest available model. Each new frontier release triggers migration effort, re-validation, prompt rework and higher per-token spend, justified by headline intelligence gains rather than by movement on tasks we run. The index replaces that reflex with a measurement.

What the index changes:

- Model decisions become a question of sufficiency per task family, with a documented production bar, rather than a question of which model is newest.
- We get a target model size for in-house training, distillation and hosting, grounded in what our tasks need rather than what the market is shipping.
- Specialist versus generalist stops being a belief and becomes a measured gap per pillar, with retraining cost included.
- Cost per unit of quality becomes a first-class metric alongside accuracy, so spend conversations with Finance and Procurement have numbers behind them.
- Risk, Compliance and Security get a standing view of model behaviour on their own scenarios, re-run on every candidate release.
- Vendor claims become checkable: a release either moves the index or it does not.

The index also compounds. Every task set we build is reusable for regression testing, fine-tuning evaluation, judge-model calibration and vendor negotiation, so the cost is paid once and the asset is used continuously.

## What happens if we don't

Without the index, the default of chasing the largest model continues, and each of the following costs keeps accruing.

- **Direct spend.** Frontier inference is priced at a multiple of mid-size and small models. Routing bounded tasks (extraction, classification, routing, entity recognition) through frontier models pays that multiple for no measurable gain. Each release migration adds engineering and re-validation cost on top.
- **No basis for the sovereign-AI strategy.** The in-house training, distillation and hosting programme needs a target model size and a proof that specialists win in our context. Without the index, those targets are guesses, and the business case for self-hosted models cannot be defended against the "just use the API" argument.
- **Unmanaged regression risk.** Every model swap changes behaviour on compliance, safety and client-care scenarios. Today those changes are discovered in production or in ad-hoc reviews. A standing scenario set catches them before deployment.
- **Vendor dependency and negotiation weakness.** Without our own measurements we accept vendor benchmarks as the basis for spend. We cannot show a vendor that their new release did not move our metrics, and we cannot credibly switch.
- **Fragmented evaluation.** Teams across the US, Canada and India build one-off evals per project. The work is duplicated, not comparable, and not reusable. Model choices differ by team for reasons nobody can reconstruct.
- **Slower adoption.** Business units cannot adopt AI for a workflow without an answer to "is it safe and good enough for this?" Without the index, that answer is built from scratch each time, and governance review stretches.
- **Reputational exposure.** A model that handles client conversations or regulatory content without a measured safety and compliance profile is a known-unknown. The index turns it into a measured, versioned record that Risk and Audit can inspect.

## Goals and non-goals

**Goals**

1. Publish a sufficiency map: for every pillar and MVP use case, the smallest model class that clears the production bar, with confidence, by the end of Phase 1.
2. Give a measured answer to the frontier question: for each new frontier release, a before-and-after on our pillars and use cases within a fixed window of its availability.
3. Set in-house training targets from evidence: a target model size and a ranked list of pillars where a specialist beats the best general model at equal latency, including retraining cost.
4. Make model swaps safe: a regression gate on safety, compliance, client-care and workflow pillars that no production model change bypasses.
5. Turn evaluation into a shared asset: one task library and harness used by every team, with datasets and use cases contributed from the business lines.

**Non-goals**

- Not a standalone application: the index lives inside the ThinkLatent Portal, and its product surface is delivered as portal features on the register API. Not a public leaderboard either. Scores and task sets stay inside the Enterprise; publishing externally is a separate decision for later.
- Not a replacement for workflow-specific acceptance testing. The index decides model class and catches regressions; a product team still tests its own prompts and integration.
- Not a general-intelligence measure. We deliberately do not try to reproduce Epoch or Artificial Analysis composites; those remain the external reference.
- Not a training pipeline. The index evaluates specialists; it does not build them. The training programme consumes its outputs.
- Not a vendor-management system. It supplies evidence to procurement; contracts and negotiation stay with Procurement.

## Success metrics

| Metric | Type | Target | Measured by |
| --- | --- | --- | --- |
| Pillars with a published sufficiency class | Leading | 5 by end of Phase 1; 16 by end of Phase 2 | Index register |
| Use cases runnable end to end in the sandbox | Leading | 3 by end of Phase 1; 10 by end of Phase 2 | Harness |
| Datasets contributed from outside the AI team | Leading | At least 1 per MVP pillar in Phase 1; at least 3 per pillar at steady state | Contribution portal |
| Time to score a new model release | Leading | Within 10 working days of API or weights availability | Register timestamps |
| Model decisions citing the index | Lagging | 100% of new-workflow model selections and production swaps from Phase 3 | Governance submissions |
| Share of inference volume on the sufficient (non-frontier) class | Lagging | Baseline measured in Phase 1; target set from the sufficiency map in Phase 2 | Gateway telemetry |
| Inference spend per unit of workload | Lagging | Reduction against the Phase 1 baseline, target set with Finance once the map exists | Gateway cost reporting |
| Regressions caught before production | Lagging | Zero model-swap behaviour changes discovered in production after Phase 3 | Incident records |
| Judge-panel agreement with human raters on judged pillars | Quality | Above an agreed threshold per pillar, re-checked quarterly | Pillar 8 results |

## Capability pillars

Sixteen pillars, each mapped to the Enterprise operations that depend on it. Every pillar is composed of several contributed datasets (minimum three active), a production bar, and an expected sufficiency class (the smallest model class predicted to clear the bar) that the index will confirm or overturn.

| Pillar | What it measures | Enterprise operations served | Example task types | Expected sufficiency |
| --- | --- | --- | --- | --- |
| 1. Financial data processing | Extraction, reconciliation, numerical fidelity on structured and semi-structured financial data | Fund accounting, operations, finance, data engineering | Statement-to-ledger extraction, trade break reconciliation, NAV and performance arithmetic | Small / specialist |
| 2. Financial analysis and reasoning | Multi-step quantitative reasoning, market and portfolio interpretation, temporal reasoning (settlement, rate changes, fiscal periods) | Investment management, research, advice, finance | Attribution explanation, scenario what-ifs, rebalancing logic, market commentary drafting | Mid to frontier |
| 3. Client care | Intent, multi-turn coherence, tone, resolution; staying inside education-not-advice boundaries | Retail, Advice, Institutional client services | Account and transaction queries, retirement-plan questions, complaint handling, escalation routing | Small / specialist for routing; mid for resolution |
| 4. Compliance and regulatory | Adjudication of SEC, FINRA, DOL and other regulatory scenarios; policy Q\&A; recordkeeping awareness | Compliance, Legal, Risk, marketing review | Communication pre-review, suitability scenarios, policy lookup, regulatory change impact summaries | Mid / specialist |
| 5. Cybersecurity | Threat triage, secure-code generation, phishing and social-engineering detection, prompt-injection resistance | Security operations, engineering, fraud | Alert triage, log interpretation, vulnerability explanation, injection attack scenarios | Mid; frontier for novel triage |
| 6. Safety and grounding | Refusal calibration, jailbreak resistance, hallucination rate, faithfulness to retrieved context | All deployments; Risk, Governance | Adversarial prompts, grounded QA with contradictory context, unanswerable-question handling | Measured on every model regardless of size |
| 7. Entity recognition | Financial entities (tickers, CUSIP, ISIN, fund names, counterparties), sensitive entities (PII, PHI, account data), general entities | Data governance, privacy, operations, client care | Entity tagging in conversations, documents and market text; redaction; disambiguation (ticker vs. common word) | Small / specialist |
| 8. Judging and scoring | Agreement with human raters, calibration, consistency when used as an evaluator | AI platform, QA, the index itself | Rubric-based grading, pairwise preference, rationale quality | Mid |
| 9. Coding | Software engineering tasks, SQL and data engineering, legacy modernization, test generation | Engineering across all divisions | Repo-level fixes, SQL from specification, COBOL and Java modernization, pytest generation | Mid to frontier |
| 10. Agentic competence | Tool use, long-horizon workflow completion, planning, error recovery, state tracking | Enterprise AI platform, operations automation | Multi-step workflows over internal tools, recovery from failed calls, handoff between agents | Mid to frontier |
| 11. Document understanding | Comprehension of long and visually complex financial documents, including scanned and tabular PDFs | Operations, compliance, research, client onboarding | Prospectus and 10-K QA, statement parsing, form field extraction, table reconstruction | Mid / specialist |
| 12. Multilingual | Equivalent capability across the languages the Enterprise operates in | Canada (French), India operations, international clients | Cross-lingual client care, document translation fidelity, entity recognition in non-English text | Mid |
| 13. Long context | Retention and retrieval across very long inputs | Research, compliance, legal review | Needle-in-haystack over filings, multi-document synthesis, long conversation memory | Mid to frontier |
| 14. Instruction and format fidelity | Adherence to schemas, output constraints and multi-part instructions | Any system-integrated deployment | JSON schema compliance, constrained generation, negative instruction following | Small / specialist |
| 15. Summarization | Faithful, complete, audience-appropriate condensation | Executive communications, research, client care | Meeting and call summaries, research digests, regulatory change summaries | Small to mid |
| 16. Deployability | Cost per task, latency, throughput, license terms, self-hostability, robustness after pruning and quantization | Platform, Procurement, Architecture, Sovereign AI programme | Quality-per-dollar, p95 latency at target load, score retention at INT8/INT4, license review | Reported for every model |

Pillars 1, 3, 7, 14 and 15 are where the hypothesis is expected to hold most strongly. Pillars 2, 5, 9, 10 and 13 are where it is expected to strain, and where the index must show frontier gains credibly if they exist.

Proposed additions surfaced by early use-case requests, to be confirmed by the pillar council: **17. Visual and chart understanding** (reading graphs, tables rendered as images, statements and dashboards; multimodal grounding) and **18. UI and front-end generation** (screens and components generated against a design system, judged on fidelity, accessibility and code quality). Both have no coverage in the current sixteen and would be seeded through the contribution flow by the requesting teams.

## Context length, context rot and the token-shape matrix

A model's fit for a workload depends on the shape of the work as much as on its skill: how much it has to read, how much it has to write, and whether its quality holds as the window fills. The index measures all three and presents them as one matrix per model, because that is the view a team needs to say "this model suits our statement-summarisation job but not our long-document review".

**Context rot: quality as a function of fill**

Context rot is the decay in accuracy, grounding and instruction adherence as the context grows, long before the window limit. It is measured separately from raw context length, because a model that accepts 200k tokens and degrades past 30k is a 30k model for our purposes.

- Every long-context dataset in pillar 13 is run at fill levels (for example 4k, 16k, 32k, 64k, 128k and the model's maximum), with the relevant evidence placed at the start, middle and end of the context and with distractor material drawn from the same domain.
- The score at each fill level is recorded, and the **effective context** is the largest fill at which the model still clears the pillar's bar. Effective context, not advertised context, is what appears on the model profile and in the sufficiency map.
- Rot is tracked for the skills that matter in long inputs: fact retrieval, numerical consistency across the document, instruction adherence set at the start of a long conversation, and refusal and policy behaviour late in a long session.
- Multi-turn rot is measured through the use cases: a long servicing conversation where a policy constraint given early must still hold at turn thirty.

**The token-shape matrix**

Performance is benchmarked in buckets of input tokens by output tokens, and every cell holds quality, cost and latency together.

|  | Short output (≈2k) | Medium output (≈8k) | Long output (≈16k+) |
| --- | --- | --- | --- |
| Short input (≈2k) | Chat turns, classification, entity tagging, short servicing replies | Drafting from a brief, code snippets, summaries of short inputs | Long-form generation from a prompt: documents, decks, code files |
| Medium input (≈16k) | Document Q&A, extraction from a statement, compliance check of a draft | Analysis memos from a filing section, multi-step tool reasoning | Full report generation from a source document |
| Long input (≈64k to maximum) | Needle retrieval, prospectus and 10-K Q&A, long-conversation continuations | Multi-document synthesis, long-log triage | Long-document rewriting and translation, large code changes |

For each cell and each model and serving setting the index records: quality on the datasets and use cases whose shape falls in that cell; time to first token; output tokens per second; total latency at p50 and p95 under a target concurrency; cost per task from token prices or from self-hosted compute; and effective-context pass or fail for the input side. Enterprise workloads are classified into the same cells from gateway telemetry, so the matrix also shows how much of our volume sits in each cell and therefore which cells matter most for spend.

**Visualisation**

The model profile shows the matrix as a heatmap with three switchable layers (quality, cost, latency) and a composite suitability layer that marks each cell as suitable, marginal or unsuitable against the cell's bar and the team's cost and latency ceilings. A second view overlays the Enterprise's own volume per cell, so a model that is excellent in cells we rarely use and marginal in our busiest cell is seen for what it is. Side-by-side comparison shows two to four models' matrices on the same scale, and the sufficiency filter accepts a cell as an input ("models that are suitable for medium input, short output under 2 seconds p95").

**What it changes in the index**

- Pillar 13 reports effective context and a rot curve, not a single score.
- Pillar 16 reports the token-shape matrix per serving setting, not one cost and one latency number.
- Use cases record their token shape per instance, so use-case results populate the matrix without separate benchmarking runs.
- Hypothesis H1 gains a dimension: a smaller model may be sufficient in the cells where our volume sits even where it loses in cells we rarely use.

## Deliverables

The project produces six durable assets plus a quarterly publication.

| Deliverable | What it is | Owner | Consumers |
| --- | --- | --- | --- |
| Task-set library | Private, versioned task sets per pillar, held out from any training data, with labels, rubrics and provenance; a complexity rating per task | AI Research | Platform, product teams, fine-tuning programme |
| Evaluation harness | Reproducible runner that executes every task set against any model endpoint (API or self-hosted), with deterministic checks, calibrated judge models and a human-sample loop | AI Platform | All evaluating teams |
| Scoring model | Per-pillar scores, a production bar per pillar, cost-adjusted scores (quality per dollar, per watt, per second), and business-line composites with explicit weights | AI Research with business-line leads | Leadership, Finance, Procurement |
| Sufficiency map | For each pillar, the smallest model class that clears the bar, with confidence; the direct output of the core hypothesis | AI Research | Sovereign AI programme, Architecture |
| Model register | Every evaluated model and version with its full score profile, deployability data, license and evaluation date; frontier and open-weight tracked as two reported tracks | AI Platform | Governance, Risk, Procurement, engineering |
| Index report | Quarterly publication: movement since last release, new models, sufficiency changes, a specialist-vs-generalist scoreboard, and a spend-impact estimate | AI Research | Executive leadership, Risk, Finance, business units |

Secondary outputs that fall out of the above: a regression gate for model swaps in production, a fine-tuning evaluation standard for the training pipeline, a vendor scorecard for procurement, and the gap-report interface that feeds the team's self-healing system for every Enterprise-built model.

## Usage patterns

The index is used at five decision points. Each has a named consumer, a trigger and a concrete output, so the index earns its keep by changing decisions rather than by being read.

| Decision point | Who | Trigger | How the index is used | Output |
| --- | --- | --- | --- | --- |
| Model selection for a new workflow | Product and platform teams | A business unit wants AI in a workflow | Map the workflow to its pillars, read the sufficiency map, pick the smallest model class that clears the bar | Model choice with a documented justification; governance review starts from a known profile |
| New release evaluation | AI Platform | A frontier or open-weight release lands | Run the full harness; compare against the current incumbent on the pillars we use | Adopt, ignore, or adopt for named pillars only; spend impact stated |
| In-house training targets | Sovereign AI and training programme | Quarterly planning | Use the sufficiency map and specialist-vs-generalist gap to set the target model size and the pillars worth a specialist | Training and distillation roadmap with expected score and cost outcomes |
| Production model swap | Engineering, Risk | Any change of model behind a live system | Run the regression gate on safety, compliance, client-care and the workflow's own pillars | Pass/fail with diffs; no silent behaviour change reaches clients |
| Vendor and spend review | Procurement, Finance, Head of ThinkLatent office | Contract renewal, budget cycle | Show quality-per-dollar by pillar and which vendor claims moved our metrics | Negotiating position; reallocation between frontier and self-hosted |

Behaviour the index should create over time:

- Teams ask "which pillars does this workflow need?" before asking "which model?"
- A frontier upgrade is a measured event with a before-and-after, not an assumed improvement.
- Specialist models are proposed with a predicted index gain and a retraining cadence, and judged on both.
- Evaluation work is contributed to the shared task library rather than rebuilt per project.
- Risk and Compliance consume the model register directly instead of requesting bespoke reviews.

## Who uses the index and the operating loop

Four groups use the same index for different jobs, and each one's use strengthens it for the others. The index is the hub; the pillars and use cases are the spokes that every group adds to.

| Group | Uses the index to | Contributes | Gets back |
| --- | --- | --- | --- |
| ThinkLatent build team (foundation and SLM builders) | Score every checkpoint and release candidate; find domain and skill gaps; feed the self-healing loop; decide the next model class to build | Models, gap reports, generated data (to the training pool, never to the index) | Ranked gaps per application, a target model size per workflow, proof of where specialists win |
| Index users and enterprise contributors (use-case and product teams) | Choose a model class for a workflow; request a model trial for a new scenario; compare models in the same scenario | Datasets, use cases, production bars, practitioner grading, new skill requests that grow the pillars | A sufficiency answer with cost, a governance-ready profile, a skill-tandem view of what their workflow needs |
| Governance (Risk, Compliance, Security, Audit) | Approve a model for a usage with knowledge of what it does and does not do; inspect safety, compliance and sensitivity-tier results; enforce the regression gate | Scenario sets for the safety, compliance and cyber pillars; sensitivity-tier rules; the approval criteria | A model register they can rely on without bespoke reviews; a usage approval tied to named pillars and bars, not to a model name |
| Platform and training operations | Run the harness, sandboxes and register; schedule release and checkpoint scoring; operate the heal-and-rescore loop | Cost and latency telemetry; serving configurations; drift monitoring hooks | A single evaluation standard and a regression gate wired into deployment |

**Drift validation for SLMs built on TLM foundation models**

An SLM trained on application data from a TLM foundation model is scored three times: the foundation model alone, the SLM after application training, and the SLM again on a schedule once it is in production. The comparison answers three questions: what the application training gained on the application's pillars and use cases; what it cost elsewhere, since specialisation can erode safety, grounding, instruction fidelity or general reasoning inherited from the foundation; and whether behaviour has drifted since release as application data, tools or policies changed. A drift beyond the bar on any pillar the application uses triggers a gap report into the self-healing loop, or a rollback through the regression gate if the pillar is safety or compliance.

**The loop in one pass**

1. A use-case team states a scenario and the skills it needs.
2. The index runs candidate models in that scenario and returns the sufficient class, cost and a governance profile.
3. Governance approves the usage against named pillars and bars.
4. If no sufficient model exists at acceptable cost, the gap becomes a build request for the ThinkLatent team.
5. The ThinkLatent team's checkpoints are scored, gaps are healed, and the resulting SLM is validated against the same scenario.
6. The scenario, its datasets and its skill-tandem records stay in the index, so the next team with a similar need starts from evidence.

## Where the index lives: a feature of the ThinkLatent Portal

The index is not a standalone product. It is a feature of the ThinkLatent Portal, the one shop for every enterprise user adopting an Enterprise model, every developer team building an SLM, the ThinkLatent team building the foundation models, and the Risk and Governance teams approving model usage. Everything in this proposal flows back into the portal UI, and the index is the evidence layer underneath each of the portal's journeys.

**Portal surfaces the index feeds**

| Portal surface | What the user sees | What the index supplies |
| --- | --- | --- |
| Model catalogue | Every Enterprise-built, open-weight and frontier model available to the enterprise, with status, owner, approved usages and serving settings | Model profile, pillar radar, token-shape heatmap, sufficiency per pillar, governance status |
| Onboarding | A team picks a model for a workflow and gets access, with the evidence that it fits | Workflow-to-pillar mapper, sufficiency filter, decision package, the governance profile attached to the access request |
| Live runs | Use cases and trial requests running now: progress, partial results, cost so far, queue position | Orchestrator run state, skill-tandem records as they arrive, per-instance results streaming into the comparison view |
| Build an SLM | A use-case team starts from a TLM foundation model, trains on application data, and ships | Checkpoint scoring, gap reports and the heal loop, drift validation after release, the same bars the team was onboarded against |
| Contribute | Datasets, use cases and skill declarations submitted by any team | Contribution flow, pillar composition, contributor credit |
| Governance | Approvals of model usages, regression gates, sensitivity-tier enforcement, audit trail | Model register, safety and compliance pillar results, governance export, version history |
| Reports | Quarterly index report, spend impact, frontier-release verdicts, demand signals from skill declarations | Index report, business-line composites, trend charts |

**One journey, four groups**

1. An enterprise team arrives at the catalogue with a workflow and leaves onboarded to a model class, with the index's evidence attached to the access it was granted.
2. If no model fits, the same team moves to Build an SLM: it starts from a TLM foundation model, trains on its application data, and the index scores every checkpoint against the bars it was onboarded against, so the method it used to choose a model is the method it uses to build one.
3. Governance sees the request, the evidence and the regression results in one place and approves the usage against named pillars and bars.
4. The ThinkLatent team sees, across every onboarding and build, which skills are asked for and where models fall short, and sets the foundation-model roadmap from that demand rather than from guesswork.

**What this changes in the proposal**

- The product-surface deliverable is delivered as portal features, not as a separate application; the register API is the contract between the index and the portal.
- Live-run visibility is a P0 requirement, because onboarding users and trial requesters will watch their runs in the portal.
- Onboarding is the first consumer of index reporting: a team never receives access to a model without the index's profile for that model and that workflow.
- The SLM-building workflow uses the same bars, graders and gap reports as onboarding, so a team's model is measured exactly as the model it replaced was.
- Governance approval is attached to a usage (model, serving setting, pillars, bars) rather than to a model name, and the portal enforces it at the gateway.

## What other AI indices do, and what to borrow

The public indices have each solved one part of the problem we face: Epoch solved cross-time comparability, Artificial Analysis solved cost-aware composite scoring, and Vals solved private, expert-built professional task sets. None scores the Enterprise's tasks, and none answers the sufficiency question. The index takes the mechanics from each and applies them to our pillars.

| Index | What it measures | Method highlights | Borrow for the TL Index |
| --- | --- | --- | --- |
| [Epoch Capabilities Index (ECI)](https://epoch.ai/eci) | General capability on a single difficulty-weighted scale, stitched from \~40 public benchmarks across 2023 to present | Item Response Theory places models and benchmarks on one scale, so comparisons survive individual benchmarks saturating; domain-specific ECIs (software engineering, math, cyber) re-fit model parameters on a subset; takes the best score across inference settings; minimum of 4 benchmarks per model for a stable score; public code and data | IRT-based stitching so the TL Index scores stay comparable when a task set is retired or replaced; domain sub-indices per pillar on the same scale as the composite, so over- and under-performance per pillar is visible; a difficulty parameter per task, which is exactly the complexity rating the hypothesis needs |
| [Artificial Analysis Intelligence Index](https://artificialanalysis.ai/methodology/intelligence-benchmarking) | Composite of 9 evaluations (v5.0) weighted 25% each across knowledge work, coding, science and general; agentic, multilingual, hallucination, visual and speed reported separately | Standardised zero-shot runs at fixed temperature and token limits; pass@1 with repeats; a panel of three frontier judges rather than one; Omniscience scores accuracy and non-hallucination separately and rewards abstention over guessing; guardrail violations score zero on automation tasks; cost per index task computed from provider token counts; intelligence-vs-cost Pareto chart; open-weights and proprietary shown as two tracks | The two-track frontier/open-weights view; cost per task as a published metric and the quality-vs-cost Pareto chart; separate accuracy and hallucination components; zero credit for a guardrail breach in agentic tasks; judge panels drawn from several labs to limit same-family bias; a public methodology page with prompts and version history |
| [Vals AI](https://www.vals.ai) | Professional-work benchmarks in finance, legal, healthcare and software (Finance Agent, Excel modelling, legal, custom repo-based coding), composed into a Vals Index weighted by sector share of US GDP | Private test sets with capped runs to block contamination; tasks built with domain experts from real working procedures; benchmarks retired when they stop separating models (CorpFin replaced by Excel Modelling in May 2026); custom suites from a client's own repo or data; frontier-risk benchmark covering cyber and safety | Treat task sets as consumables with a retirement rule; build tasks with Enterprise practitioners from real procedures, not from synthetic prompts; consider licensing their Finance Agent suite as an external reference pillar so TL Index results can be sanity-checked against a public finance benchmark |
| LMArena and crowd-preference arenas | Human pairwise preference, Elo | Blind side-by-side votes from real users | An internal arena for client-care and summarization pillars, where associate preference is a legitimate signal and rubrics are weak |
| IBM and Stanford HELM enterprise extensions | Domain-specific HELM scenarios for finance, legal, climate and cyber | Open harness extended with domain datasets | Harness reuse: HELM's scenario and metric abstractions are a reasonable base for our runner rather than building from scratch |

Features from these indices that go into the deliverables above:

- Difficulty-weighted, stitched scoring (Epoch) so the index survives task-set churn and gives a complexity rating per task.
- Cost per task and a quality-vs-cost Pareto view (Artificial Analysis) as the headline chart of every quarterly report.
- Two reported tracks, frontier and open-weights, plus a third TL-Index-specific track for Enterprise-trained specialists.
- Separate accuracy and hallucination scores, with abstention rewarded; zero credit for guardrail breaches.
- Judge panels from multiple labs; human sampling on every judged pillar.
- Private task sets, capped runs, retirement when a set stops discriminating, and a published version history.
- Practitioner-built tasks from real Enterprise procedures.

What none of them do, and the TL Index must: score against a production bar per task family rather than rank; report the smallest sufficient model class; and include post-compression robustness and self-hostability in the deployability axis.

## Product features for the index consumer

The index is a product used by engineers, product owners, Risk and Procurement, so it needs the consumer features that make the public indices usable, plus the features that only a sufficiency-based internal index can offer.

| Feature | Seen in | What it gives the consumer |
| --- | --- | --- |
| Leaderboard with filters: open-weight vs proprietary, size class, reasoning mode, hosting location, license | Artificial Analysis, Epoch explorer | Narrows to the models the consumer is allowed or able to deploy before reading a score |
| Quality-vs-cost Pareto chart with a highlighted "most attractive" quadrant | Artificial Analysis | Makes the sufficiency argument visible in one picture per pillar |
| Model profile page: radar across pillars, cost, latency, context window, license, version history, evaluation date | Artificial Analysis, Vals | One page to attach to a governance submission |
| Side-by-side comparison of two to four models with per-dataset diffs | Artificial Analysis, Vals | Answers "does the new release beat the incumbent on my pillars" directly |
| Capability over time charts, per pillar and composite | Epoch, Artificial Analysis trends | Shows whether progress on our tasks is tracking or lagging public progress |
| Sub-score drill-down: pillar to dataset to task, with sample tasks and failure examples | Vals, Artificial Analysis evaluation pages | Lets an engineer see why a model failed, not only that it did |
| Confidence intervals and repeat counts on every score | Artificial Analysis | Stops teams reading noise as a ranking change |
| Saturation curves per dataset | Epoch | Signals which datasets are due for retirement |
| Methodology page with prompts, grading rubrics, harness settings and a changelog | Artificial Analysis, Epoch | Auditability for Risk and reproducibility for engineers |
| Retired-dataset ledger | Vals | Shows what used to count and why it was dropped |
| Provider and endpoint comparison: tokens per second, time to first token, by serving configuration | Artificial Analysis inference benchmarks | Separates model quality from serving quality, which matters for self-hosting decisions |
| Data export and internal API | Epoch (CC-BY data), Artificial Analysis API | Lets platform tooling, dashboards and the regression gate consume scores programmatically |
| New-model evaluation feed and subscriptions | Artificial Analysis insights feed | Consumers hear when a model they care about is scored |
| Internal preference arena for subjective pillars | LMArena | Associate votes on client-care and summarization outputs where rubrics are weak |

Features specific to the TL Index that no public index offers:

- **Workflow-to-pillar mapper.** The consumer describes a workflow, picks the pillars it touches and the volume, and gets the smallest model class that clears every bar, with projected monthly cost at Enterprise volumes.
- **Sufficiency filter.** "Show me every model that clears pillars 1, 3 and 7" sorted by cost, rather than a global rank.
- **Business-line composite selector.** Weight sliders per pillar, with saved presets per business line, so Retail and Asset Management see different composites from the same data.
- **Regression diff.** Before-and-after view for a proposed model swap, limited to the pillars the live system uses, with a pass/fail against the bar.
- **Deployability overlay.** A speed-optimisation setting the user picks by outcome, not by technique (see below), plus a toggle to hide models that cannot be self-hosted.
- **Governance export.** One-click PDF of a model's profile and regression diff formatted for Risk and Audit submission.
- **Evaluation request queue.** Any team can request a model or a serving configuration be scored, with visible status.
- **Dataset contribution portal.** The bring-your-own-data flow below, with contributor credit and visible pillar composition.

**Model trial requests: compare models in the same scenario**

The feature use-case teams will use most. A team does not ask "which model is best"; it states what it wants to try and what the model must be able to do, and the index answers in that scenario.

1. **Intent.** The team names the application and the models it wants to try, for example "generate UI screens from our design system" or "answer questions about charts in client statements".
2. **Requirements.** Functional requirements, the inputs and outputs, the tools involved, the sensitivity tier, latency and cost ceilings, and the governance constraints.
3. **Skill declaration.** The team lists the specific skills the scenario depends on. The index maps each to an existing pillar or dataset, and where a skill has no coverage (graph and chart understanding, UI code generation against a design system, layout fidelity) it opens a candidate dataset or pillar through the contribution flow, with the requesting team as first contributor.
4. **Scenario build.** The scenario becomes a use case: sandboxed tools, instances, an outcome definition and a skill-tandem record, with the team validating instances.
5. **Run and compare.** Every requested model, plus the current incumbent and the sufficient class the index predicts, runs on the same instances under the same settings. The comparison view shows pass rate, cost per completed run, latency, per-skill results from the tandem record, and failure modes side by side.
6. **Decision package.** The sufficient class, the gap between it and the best model, and a governance profile for the chosen model against the named pillars. If nothing clears the bar at the cost ceiling, the gap is handed to the ThinkLatent build team as a build request with the skill declaration attached.

Each trial request leaves the index more robust: the new skills, datasets and scenario stay, and the next team declaring similar skills gets an answer from evidence rather than a fresh trial. Skill declarations across requests also show which capabilities Enterprise teams actually ask for, which is a direct input to the pillar council and to the ThinkLatent team's build roadmap.

**Serving settings shown by outcome, not by technique**

Enterprise users choosing a model should see what a setting gives them, never how it is implemented. Quantization methods, precision formats and kernel choices matter to the ThinkLatent build team and the platform team, and they stay in the register's technical fields. The consumer surface shows one speed-optimisation setting with three levels and the numbers that follow from it.

| Setting | What the user gets | Typical use | Under the hood (register only) |
| --- | --- | --- | --- |
| High | Fastest responses and lowest cost; some accuracy given up, shown as the measured delta per pillar | High-volume, bounded tasks: routing, tagging, extraction, short replies | INT4 weights, aggressive serving optimisation |
| Medium | Balanced speed and cost; small accuracy delta on most pillars | Default for most workflows | FP8 |
| Low | Full accuracy; slower and more expensive | Reasoning-heavy, compliance and client-facing work where accuracy delta must be zero | BF16 or FP16, no compression |

Every level is a separately scored serving configuration in the register, so the consumer sees for each model and level: the accuracy per pillar and the delta from the Low setting, the token-shape matrix for that level, cost per task and latency. The recommendation engine picks the highest setting whose accuracy delta stays inside the workflow's bar, so the user gets the cheapest configuration that is still correct.

This applies to Enterprise-built and open-weight models we host. For frontier models consumed through an API there is one configuration, the vendor's, shown as a single row with the vendor's own tiers (for example reasoning effort) where they exist; no speed setting is offered because we do not control it. The two kinds are shown side by side on the same accuracy, cost and latency scales so the comparison stays fair.

## Bring your own data and pillar composition

A pillar is never a single dataset. Each pillar is a weighted aggregate of several datasets, and any Enterprise team can contribute a dataset that either joins an existing pillar or seeds a new one. This is how the index stays representative of real work and how the task library grows without the AI team writing every task.

**Pillar composition model**

- A pillar holds a minimum of three active datasets before its score is published, so no single contributor defines a pillar.
- Each dataset carries: owner, business line, task format, label type, grading method, sensitivity tier, difficulty (fitted, not declared), size, version, status (candidate, active, retired) and weight within the pillar.
- The pillar score is the IRT-stitched aggregate of its active datasets. Weights default to equal and are adjusted by the pillar council when a dataset is far more representative of production volume than the others.
- Dataset composition is visible to consumers on the pillar page: who contributed what, how much it weighs, and when it was last refreshed.
- Retiring a dataset re-fits the pillar on the same scale, so historical scores remain comparable.

**Contribution flow**

1. **Submit.** A team uploads a dataset through the portal with a short intake form: what the task is, where it comes from in production, how a correct answer is judged, and the sensitivity tier.
2. **Profile.** The harness profiles the dataset automatically: format validation, label coverage, duplicate and near-duplicate detection, PII and client-data scan, size and difficulty estimate from a quick run on reference models, and a leakage check against public benchmarks and known training corpora.
3. **Classify.** The dataset is matched against the pillar taxonomy by task semantics (embedding similarity plus a reviewer). The outcome is one of three decisions below.
4. **Validate.** For the chosen pillar, a sample is graded by practitioners to confirm label quality and that the production bar is meaningful on this data. Grading method is locked (deterministic, judge panel or human).
5. **Admit.** The dataset enters as a candidate, runs across the model register, and becomes active once its scores are stable and its difficulty is fitted. The contributor is credited on the pillar page.
6. **Maintain.** Datasets are re-fitted each quarter; a dataset that stops discriminating between models, or shows leakage, is retired and recorded in the ledger. Contributors are asked to refresh when their production process changes.

**Classification decisions**

| Decision | Rule | Result |
| --- | --- | --- |
| Join an existing pillar | Task semantics match an existing pillar and the dataset adds coverage (new business line, document type, language or difficulty band) | Dataset is added with an initial weight; pillar composition updates |
| Seed a new pillar | No existing pillar covers the task, and there is a business sponsor plus at least two further datasets planned or identified | New candidate pillar created; published once it reaches three active datasets and an agreed production bar |
| Hold or return | Dataset duplicates existing coverage, fails the leakage or sensitivity scan, or has labels that practitioners cannot validate | Returned to the contributor with the profile report and what would make it admissible |

**Sensitivity tiers decide where a dataset can run**

- Tier 1, synthetic or public-derived: runs against any model, including external APIs.
- Tier 2, de-identified internal: runs against external APIs only under contract terms that exclude training; otherwise self-hosted only.
- Tier 3, client or regulated data: self-hosted models inside the Enterprise boundary only. Frontier models are scored on this tier only when a self-hosted deployment of them exists.

A pillar whose datasets span tiers reports a sub-score per tier, so a frontier model is not penalised for tiers it was never allowed to run on, and the gap is shown rather than hidden.

**Governance**

- A pillar council (AI Research chair, one representative per contributing business line, Risk) approves new pillars, weight changes and retirements, and meets on the quarterly release cadence.
- Contributors own their datasets' labels and refresh cadence; the AI team owns the harness, fitting and publication.
- Every admission, weight change and retirement is logged in the version history with a reason.

## Use-case evaluations: the second layer

Datasets measure a capability in isolation. Use cases measure whether a model, equipped with Enterprise tools, produces the right outcome for a real client or associate scenario. The index scores both layers, because a model can pass every dataset in a pillar and still fail the workflow that pillar exists to serve. The sufficiency decision for a workflow is made on the use-case score; dataset scores explain why a model passed or failed.

**Why the Enterprise's public tools are the starting environment**

The public site carries a large set of free tools that are, underneath, backend JSON schemas behind open APIs: retirement income and savings calculators, asset-mix questionnaires, fund comparison and expense-ratio tools, cost-of-investing calculators, RMD and tax tools, fund and ETF screeners, college savings planners. They are deterministic, have known-correct outputs, carry no client data, and map directly onto the client-care, financial analysis, data processing and agentic pillars. Wrapped as agent skills in a sandbox, they become resettable environments in which a model is judged on the outcome it reaches, not on a single answer.

**How a use case is built**

1. **Pick a scenario.** A real client or associate goal, stated in plain words, with a business owner: "a client five years from retirement asks whether to increase contributions", "compare two target-date funds for cost and allocation", "an associate needs the RMD for a client's inherited IRA".
2. **Wrap the tools.** The relevant public-tool APIs are mirrored from their JSON schemas into a sandbox replica with seeded state, so runs are repeatable and never touch production. Each tool becomes a skill with a contract, rate limits and failure modes the agent must handle.
3. **Define the outcome.** The correct end state: the right numbers from the right tools, the right recommendation boundary (education, not advice), the right escalation, and no guardrail breach (no fabricated figures, no unauthorised tool call, no disclosure of restricted data).
4. **Vary the scenario.** Each use case has many instances: different client parameters, ambiguous inputs, missing data, tool errors, a mid-conversation change of mind. Instances are generated from the parameter space and validated by the business owner.
5. **Grade.** Deterministic checks on the end state and tool trace; judge-panel grading of conversation quality where the scenario is conversational; zero credit on any guardrail breach, following the AutomationBench convention.
6. **Score.** Each use case reports pass rate, cost per completed run, steps and tool calls used, and latency. Use cases are attached to the pillars they exercise and roll up to a use-case score per pillar alongside the dataset score.

**Scoring layers**

| Layer | Unit | What it answers | How it is used |
| --- | --- | --- | --- |
| Dataset | Task with a label | Can the model do this capability | Explains results; drives specialist training targets |
| Use case | Scenario with an end state | Does the model, with Enterprise tools, reach the right outcome | Decides sufficiency for a workflow; feeds the regression gate |
| Business-line composite | Weighted pillars | Which model class for this part of the business | Leadership and procurement view |

**What this adds to the hypotheses**

- H1 and H3 get a harder test: a small specialist that wins on datasets must also complete the use case end to end, including tool use and error handling. If it cannot, the sufficient class for that workflow is the smallest general model that can, and the index says so.
- H2 gets its most credible evidence: a frontier release that does not improve use-case pass rates on our workflows has not improved anything we pay for.

**Guardrails for this layer**

- Sandboxed replicas only; no evaluation traffic to production endpoints, and schema mirrors are refreshed from the API contracts on a schedule.
- Public tools first, internal tools second: internal tools enter as skills only with the owning team's approval and under the sensitivity tiers above.
- A use case has a named business owner who validates instances and the outcome definition, as a dataset contributor does.
- Use cases contribute to the bring-your-own-data flow: a team can submit a scenario and tool set as readily as a dataset, and the same admission, maintenance and retirement rules apply.

## Candidate use cases from open-source libraries

Ten use cases, each built on an open-source environment or benchmark we can run on day one, each sliced into the skills that must work in tandem, and each with a named Enterprise transfer. The point of the slicing is the skill-tandem record: every run logs which skill was exercised at each step, so a failed use case is attributed to the skill that broke, and the sufficiency map can say "this model class is fine for the conversation but not for the calculation".

| # | Use case | Open-source base | Scenario | Skills in tandem (pillar) | Outcome graded | Enterprise transfer |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Account-servicing conversation with tools and policy | [tau2-bench](https://github.com/sierra-research/tau2-bench) (τ³ banking domain) and [TauIndianBankBench](https://github.com/npci/TauIndianBankBench) | A simulated customer asks for a change that requires identity checks, policy rules and several tool calls, with a transfer-to-human option | Intent and entity recognition (7) → policy retrieval and compliance (4) → multi-turn conversation and tone (3) → tool use and state tracking (10) → escalation judgment (8) | Final database state matches the goal; policy never breached; correct escalation | Beneficiary change, RMD request, contribution change, transfer between accounts, with the Enterprise's servicing policy |
| 2 | Filing-grounded financial research question | [Finance Agent v2](https://github.com/aowang-ai/awesome-finance-agents) (EDGAR, web and price tools) and FinanceBench | An expert-authored question that needs recent SEC filings and market data, answered with citations | Search and retrieval (13, 6) → document understanding (11) → extraction and numerical reasoning (1, 2) → grounded synthesis with no hallucination (6) → summarization (15) | Correct figure and reasoning; every claim cited; contradiction grader finds none | Fund research notes, competitor and holdings analysis, prospectus Q&A for associates |
| 3 | Analyst workspace build over MCP | [OpenBB Workspace Bench](https://github.com/DidierRLopes/openbb-workspace-bench) | Build, update and repair a financial dashboard through MCP tools from a plain-language brief | Tool discovery and planning (10) → data analysis (2) → state manipulation and repair (10) → format and schema fidelity (14) | Final workspace state, widget configuration and tool-use discipline | Internal research and risk dashboards built or amended by agents through our MCP gateway |
| 4 | End-to-end investment-banking analytical workflow | [BankerToolBench](https://www.alphaxiv.org/abs/2604.11304v1) | Retrieve data, build a spreadsheet model, produce a deliverable the way a junior analyst would | Document understanding (11) → data processing (1) → spreadsheet and code manipulation (9) → financial reasoning (2) → deliverable summarization (15) | Model correctness, file artifacts, rubric on the deliverable | Fund accounting reconciliations, performance attribution packs, board deck data appendices |
| 5 | Multi-app back-office automation | [AutomationBench](https://github.com/zapier/AutomationBench) finance domain; EnterpriseOps-Gym pattern | Complete a SaaS workflow across simulated apps via REST tools without crossing a guardrail | API tool selection and argument fidelity (10, 14) → cross-system state tracking (10) → guardrail adherence (6) → verification before commit (8) | Goals achieved; zero credit on any guardrail breach | Operations workflows across ticketing, CRM, document and ledger systems |
| 6 | Large-catalogue financial tool calling | FinToolBench (hundreds of executable financial tools) | Pick the right tools from a large catalogue and compose them for a query | Tool retrieval (13) → selection and composition (10) → argument schema fidelity (14) → numerical sanity check (1) | Correct tool chain and result | Our internal tool catalogue once the gateway exposes it as skills |
| 7 | Retirement and contribution planning chain | Open calculator building blocks: [numpy-financial](https://github.com/numpy/numpy-financial), [QuantLib](https://github.com/lballabio/QuantLib), [Ghostfolio](https://github.com/ghostfolio/ghostfolio) portfolio APIs | A client gives partial information about age, balance, contributions and goals; the agent elicits the rest, runs the projections and explains them inside the education boundary | Parameter elicitation in conversation (3) → temporal and numerical reasoning (2, 1) → calculator tool chain (10) → education-not-advice boundary (4, 6) → plain-language explanation (15) | Correct projection from the tools; no advice-boundary breach; all assumptions stated | The Enterprise's public retirement income, savings and asset-mix tools wrapped as skills |
| 8 | Compliance pre-review of a client communication | [FinBen](https://github.com/The-FinAI/PIXIU) classification tasks plus a public rule set (FINRA 2210 communications rules) | Review a draft client email or marketing paragraph against the rule set and propose edits | Entity recognition, including sensitive entities (7) → rule retrieval (4, 13) → judgment and scoring with rationale (8) → redline generation (15, 14) | Agreement with compliance reviewers on pass/fail and on required edits | Marketing and advisor communication review, with the Enterprise's own policy manual |
| 9 | Numerical reasoning over financial documents | [FinQA](https://github.com/czyssrs/FinQA), [TAT-QA](https://github.com/NExTplusplus/TAT-QA), and DocFinQA-style long-document variants | Answer a multi-step numerical question from text and tables in a long report | Document and table understanding (11) → multi-step arithmetic with program generation (1, 9) → long-context retention (13) → structured output (14) | Exact numerical answer and a valid program | Statement, prospectus and 10-K extraction for operations and research |
| 10 | Market and fund event explanation | FinSearchComp-style expert search tasks with price and news tools | Explain what happened to a fund or sector over a period and why, with sources | Search and temporal reasoning (2, 13) → entity disambiguation, ticker vs. common word (7) → grounded synthesis (6) → audience-appropriate summary (15) | Factual accuracy against ground truth; no fabricated causes; sources present | Client-care explanations of fund performance and market commentary drafts |

**Skill-tandem record**

Every use-case run writes one row per step so that skills can be scored inside the use case, not only at the end.

| Field | Content |
| --- | --- |
| Step | Position in the chain and the sub-goal ("elicit missing parameters") |
| Skill and pillar | The capability exercised, mapped to the pillar number |
| Observable signal | What the harness checks at that step: tool called with correct arguments, entity extracted, policy cited, number within tolerance |
| Dependency | Which earlier step's output this step consumed, so an upstream error is not charged to a downstream skill |
| Failure mode | Taxonomy tag when the step fails: wrong tool, wrong argument, hallucinated fact, policy breach, premature escalation, format error |
| Cost at step | Tokens and latency consumed, so expensive skills are visible |

Aggregating these records across use cases gives two things the dataset layer cannot: which skill combinations co-occur in Enterprise work (the real training target for specialists), and which single skill most often breaks a chain (the first thing to fix or to route to a stronger model).

**Transfer rule**

Each open-source use case is run first as published, to anchor our harness against public results. It is then forked: tools are replaced with sandboxed Enterprise skill replicas, policies with our own, and instances regenerated from our parameter space. The public and Enterprise variants are kept side by side in the register so drift between them is visible.

## Gap analysis for Enterprise-built models and the self-healing loop

Every SLM and foundation model the Enterprise builds is scored on the index at each training checkpoint and release candidate, not only at launch. The index becomes the sensor for the team's self-healing system: it detects where a model falls short of the bar, classifies the shortfall as a domain gap or a skill gap, and hands the self-healing system a structured gap report. That system then generates data or retrieves it from the enterprise data stores to close the gap, the model is retrained or tuned, and the index re-scores it. The loop runs until the model clears its application's bars or the gap is shown to need a larger model class.

**What a gap report contains**

| Field | Content |
| --- | --- |
| Model and checkpoint | Which build, which serving configuration (precision, context, reasoning effort) |
| Application | The workflow and the pillars and use cases it requires |
| Failing unit | Pillar, dataset or use case, and the step in the skill-tandem record where the chain broke |
| Gap type | Domain gap (knows the skill, lacks the facts, vocabulary, entities or document types) or skill gap (has the knowledge, cannot execute the capability: reasoning depth, tool use, format fidelity, policy adherence) |
| Evidence | Failure-mode tags with counts, sample failing items (from a quarantined slice, never the held-out set), score distance from the bar |
| Difficulty band | Where in the fitted difficulty range the failures sit, so the self-healing system targets data of the right hardness |
| Co-occurring skills | Which other skills were in the chain, so generated data exercises the combination rather than the skill alone |
| Suggested remedy class | Data generation, data retrieval from named stores, distillation from a stronger model on that pillar, or escalation to a larger model class |

**How the loop runs**

1. Checkpoint scored on the application's pillars and use cases; results written to the register.
2. Gap reports emitted for every unit below the bar, ranked by business weight and distance from the bar.
3. Self-healing system consumes the reports: for a domain gap it retrieves or synthesises in-domain material matching the failing entities, document types and difficulty band; for a skill gap it generates targeted task data, including the co-occurring skill combinations, or distils from a model that clears that pillar.
4. Model is tuned on the new data; the index re-scores the same units plus a regression sweep across every other pillar the application uses, so a fix in one place cannot silently cost another.
5. Loop closes when all bars are met, or the index reports that the gap persists across a set number of iterations, which is evidence for H1 that this workflow needs the next model class.

**Guardrails the loop must have**

- **Evaluation data never enters training.** Index datasets and use-case instances are held out absolutely. Gap reports carry failure-mode tags and quarantined examples drawn from a separate slice, never the scored items. Every training batch is screened for canary strings and near-duplicates of index items before use.
- **Generated data is itself admitted through the contribution flow**, with the same profiling, leakage and sensitivity checks, and is marked as synthetic in provenance. It can join the training pool; it does not join the index.
- **Overfitting detection.** A model that improves on the targeted dataset but not on the pillar's other datasets, or not on the use case that exercises the skill, is flagged rather than passed. That is the reason pillars hold several datasets and the reason use cases sit beside them.
- **Iteration budget.** Each gap has a maximum number of heal-and-rescore cycles and a cost ceiling; exceeding either escalates to a model-class decision instead of more tuning.
- **Human sign-off on domain-gap retrieval** from enterprise stores under the sensitivity tiers, so the loop cannot pull Tier 3 data into a model that will run outside the boundary.

**What this adds to the deliverables and hypotheses**

- A new deliverable: the gap-report interface and the checkpoint scoring hook, owned jointly by the index lead and the self-healing system's owners.
- H3 gains a direct mechanism: specialists are not only measured against general models, they are improved against a named gap until they win or until the index shows they cannot.
- The training programme's roadmap can be stated as a list of gaps per application with predicted cost to close, rather than as a list of models to build.

## Hypotheses and what would confirm or refute them

The project tests one thesis through three claims. Each has a measurement, a confirming result and a refuting result, so the outcome is decided by data rather than by preference.

| Claim | Measurement | Confirmed if | Refuted if |
| --- | --- | --- | --- |
| H1. Task complexity, not model size, predicts fit for Enterprise tasks | Per-pillar score against parameter count and cost per task, with a complexity rating per task | Most pillars plateau at a mid-size or small model class; score correlates with task complexity more than with model size | Scores keep rising with model size across most pillars, including bounded tasks |
| H2. Frontier upgrades do not move Enterprise-relevant metrics | Re-run the full task library on each new frontier release and compare with the incumbent on the pillars we use | Public benchmark gains are large while TL Index pillar movement is within noise, except on named reasoning-heavy pillars | Each release moves several TL Index pillars past the production bar where the incumbent fell short |
| H3. Task-specific trained smaller models beat general models in Enterprise context | For each pillar, a fine-tuned or distilled specialist against the best general model at equal latency budget, with retraining cost included | Specialists win on bounded pillars (1, 3-routing, 7, 14, 15) at lower cost, and the gap holds across two quarterly re-runs | General models match specialists at similar cost, or specialist gains erode between re-runs faster than retraining is affordable |

The expected honest result is mixed: specialists and mid-size models for the majority of volume, frontier models for a narrow set of reasoning-heavy and agentic workflows. That outcome is still a large saving and an easier story to defend than "we never need frontier".

## Design principles and guardrails

- **Private by default.** Task sets never leave the Enterprise. Runs against external APIs use synthetic or de-identified data; real client data is used only against self-hosted models inside our boundary.
- **Sufficiency over ranking.** Every pillar has a production bar agreed with its business owner. The headline per model is pass or fail against that bar, then cost; rank order is secondary.
- **Cost is a first-class score.** Quality per dollar, per second and per watt are published beside accuracy. A model that wins on accuracy and loses on cost-adjusted score is not the recommendation.
- **Contamination control.** Held-out sets, capped runs per model, canary strings, and retirement of any set that stops discriminating or shows evidence of leakage.
- **Hybrid grading.** Deterministic checks wherever the task allows; multi-lab judge panels with human sampling elsewhere; judge agreement with humans is itself tracked under pillar 8.
- **Measure the whole stack.** Scores are recorded per model and per serving configuration (quantization level, context length, reasoning effort) so that compression and deployment choices are visible.
- **Versioned and reproducible.** Every score carries the task-set version, harness version, model version and date. Results are re-runnable from the register.
- **Credible on frontier gains.** Where frontier models win, the index shows it plainly. The index earns trust outside the AI team only if it is not a foregone conclusion.
- **Practitioner-built.** Tasks come from real Enterprise procedures with named business owners, not from synthetic prompts written by the AI team alone.
- **Governance-ready.** Safety and compliance pillar results are structured so Risk, Compliance and Audit can consume them without reinterpretation.

## Requirements by priority

**P0, the MVP cannot ship without these**

- [ ] Harness runs any model behind an API or a self-hosted endpoint with standardised settings, repeats, and recorded cost and latency per task
- [ ] Private task sets for the five MVP pillars, each with at least three datasets, a practitioner-validated sample and an agreed production bar
- [ ] Three MVP use cases running in a sandbox with mirrored tool schemas, state-based grading and zero credit on guardrail breach
- [ ] Skill-tandem records written for every use-case run
- [ ] Model register with full score profile, version, date and deployability fields, exposed through the register API to the ThinkLatent Portal, with live-run visibility (progress, partial results, cost) for use cases and trial requests
- [ ] Sufficiency map and cost-adjusted scores for the MVP pillars, with confidence intervals
- [ ] Contamination controls: held-out sets, capped runs, canary strings, leakage check at dataset admission

**P1, fast follows after the MVP**

- [ ] Remaining eleven pillars and IRT stitching across datasets
- [ ] Contribution portal with automated profiling and the three-way classification
- [ ] Consumer product surface: leaderboard filters, Pareto chart, model profile pages, side-by-side comparison, sufficiency filter, workflow-to-pillar mapper
- [ ] Regression gate integrated with the model-swap process
- [ ] Quarterly index report template and business-line composites

**P2, design for now, build later**

- [ ] Internal preference arena for subjective pillars
- [ ] Governance export and API for platform tooling
- [ ] Enterprise-specific forks of all ten open-source use cases
- [ ] External reference pillar licensed from a public finance benchmark
- [ ] Multilingual and voice variants of client-care use cases

## How we build it

The harness is six layers. Requests flow down from the product surface to the model endpoints; results flow back up into the register, and the register feeds the self-healing loop that produces the next checkpoint to score.

&#91;embedded content: evaluation architecture · 6 layers, one heal loop\]

The task library sits under everything and is read only by the orchestrator; training jobs cannot reach it. The register is the single source of truth, so every score on the product surface is reproducible from a manifest.

**Model endpoints on HyperPod**

Every model the Enterprise builds is registered once and launched as an API on demand, one endpoint per serving setting (High, Medium, Low), on the HyperPod cluster. The orchestrator requests the endpoint, waits for a health check, runs, and tears it down, so evaluation capacity is paid for only while a run is live. Checkpoints from a training job are launched the same way, which is what lets the self-healing loop score a model mid-training. Frontier and externally hosted open-weight models are reached through the AI Gateway, which enforces sensitivity tiers and records token counts for cost.

**Agent runtime: Hermes as the default candidate**

Hermes (the Nous Research hermes-agent) is a reasonable default runtime for use-case evaluations: an open agent loop with skills, tool use, a sandboxed execution model, and an existing community of benchmark adapters. Two conditions apply. First, the harness changes the score: benchmarks that run the same model through several harnesses see differences of several points, so the Hermes version, its enabled toolsets and its prompts are pinned and recorded as part of every scored configuration, and the index never compares a model run under one harness with a model run under another. Second, Hermes runs inside our sandbox with memory, web and self-editing toolsets disabled, and goes through the same security and licence review as any open-source component we host. Open-source use cases are first run under their published harness (tau2-bench, mini-swe-agent, Stirrup) to anchor our numbers to public results, then forked onto the pinned runtime for the Enterprise variants.

**Orchestrator and run modes**

A run is a manifest: models and serving settings, task-set versions, harness version, repeats, concurrency, graders and a write-back target. The orchestrator supports two modes and chooses by purpose:

| Mode | When | How |
| --- | --- | --- |
| Parallel | Release-day scoring of a new model, a full index refresh, token-shape matrix sweeps, trial requests comparing several models | Fan out across endpoints and task sets; quality runs at high concurrency; results cached by model, setting and task-set version so nothing is re-run |
| Sequential | Checkpoint-by-checkpoint scoring in the self-healing loop, A/B at fixed load, any latency or throughput measurement | One model, one setting at a time at a controlled concurrency, because latency numbers taken while other runs share the cluster are not comparable |

Quality and performance are therefore separate passes: quality can run in parallel, performance always runs in isolation, and the register joins them by configuration.

**Graders**

Deterministic checkers (exact match, numerical tolerance, end-state comparison, schema validation, canary detection), a judge panel drawn from several model families with a fixed rubric per dataset, and a human-sample queue that routes a fixed share of judged items to practitioners. Judge agreement is written back as a pillar 8 score. Skill-tandem records are produced by the runtime trace and attached to every use-case result.

**Write-back contract**

Every result row carries: model, build or checkpoint id, serving setting, endpoint and harness versions, task-set and instance version, repeat index, raw output reference, grader and verdict, tokens in and out, time to first token, total latency, cost, and run manifest id. Scoring, IRT fitting, sufficiency and gap reports are computed from the register, never inside the run, so they can be recomputed when methodology changes.

**Build sequence**

1. Endpoint launcher on HyperPod and gateway adapter, with cost and latency instrumentation.
2. Orchestrator with manifests, caching and the two run modes; register schema and write-back API.
3. Deterministic graders and the judge panel; one public benchmark reproduced within published error bars as the exit gate.
4. Pinned agent runtime and the first sandboxed use case, with skill-tandem recording.
5. Task library service with held-out enforcement and canaries; contribution portal.
6. Product surface on the register API; gap-report interface to the self-healing system.

## Roles and ownership

| Role | Owns | Proposed |
| --- | --- | --- |
| Sponsor | Decision rights on scope, funding and publication cadence | Head of ThinkLatent (Head of ThinkLatent) |
| Index lead | Methodology, scoring model, hypothesis design, quarterly report | AI Research lead, to be named |
| Harness and platform lead | Runner, sandbox, register, cost instrumentation, contribution portal | AI Platform lead, to be named |
| Pillar owners (one per pillar) | Task sets, production bar with the business partner, dataset admission | Named per pillar by the team |
| Use-case owners | Scenario definition, tool mirrors, instance validation | Named per use case by the team |
| Business partners | Production bar sign-off, practitioner grading, dataset contribution | One per business line, recruited by pillar owners |
| Risk and Compliance liaison | Safety and compliance pillar design, sensitivity tiers, governance export | Named with Risk |
| Security liaison | Cyber pillar, sandbox isolation, external API data terms | Named with Security |
| Training programme liaison | Specialist models for H3, retraining cadence and cost | Sovereign AI programme |
| Research partner | Methodology review, IRT stitching, external validity | The university lab |

## Risks and mitigations

| Risk | Effect | Mitigation |
| --- | --- | --- |
| Index confirms what the team already believes and loses credibility outside it | Results dismissed by business and vendors | Pre-register the hypotheses and refutation criteria; report frontier wins plainly; external methodology review |
| Task sets leak into training data | Scores inflate silently | Private sets, capped runs, canaries, periodic leakage checks, retirement rule |
| Judge models bias toward their own family | Mis-ranked models on judged pillars | Multi-lab panels, human sampling, judge agreement tracked as a pillar |
| Business partners do not engage | Production bars are set by the AI team alone and carry no authority | Pillar owners recruit a named partner before a pillar is published; contribution credited visibly |
| Sandboxes drift from real tool contracts | Use-case scores stop predicting production outcomes | Schema mirrors refreshed on a schedule; a periodic shadow run against staging |
| Specialist models go stale between quarterly runs | H3 result overstates specialist value | Retraining cadence and cost included in H3 scoring; re-run both variants every quarter |
| Scope grows to all sixteen pillars before the hypothesis is tested | MVP slips | P0 list is fixed; any addition removes something or extends the phase |
| Evaluation volume against external APIs creates data-handling exposure | Policy or contract breach | Sensitivity tiers enforced at the harness; Tier 3 never leaves the boundary |

## Stress test: critique log and kill criteria

Recorded 2026-11-01 in Critic mode by the thinking partner; Jithin answers the open items. The scout brief is the "What other AI indices do" section above, with sources.

**Strongest case against**

The TL Index is an evaluation programme dressed as a product. The decision it exists to inform, whether smaller models suffice for most Enterprise work, could be tested in four weeks by hand: three real workflows, three model classes, one practitioner panel. Model choice is a two-way door; a wrong pick costs a migration, not a franchise, so a sixteen-pillar instrument with a portal, a contribution flow and a nightly loop is disproportionate to the reversibility of the decision. The hypothesis is also convenient for a team whose mandate is to build models, which is exactly when motivated reasoning is most likely and when outside readers will discount the result. The scarce input is not measurement but practitioner time to build and label tasks, and nothing in the proposal yet proves that time will be given. Finally, the proposal measures today's workload mix; the volume growing fastest, agentic and reasoning-heavy work, is where frontier models win, so the index risks being right about 2026 and wrong about 2028.

**Strongest case for**

In a regulated firm every model decision needs defensible evidence, and today none exists: selection runs on vendor benchmarks that are contaminated and measure the wrong things. The index is the one asset that compounds across onboarding, SLM building, governance approval and procurement, and the sovereign-AI strategy has no business case without a measured sufficiency line. The regression gate alone, catching behaviour changes in compliance and client-care workflows before production, justifies the harness. The honest mixed result (specialists for bounded volume, frontier for a narrow reasoning set) is still a large saving and a stronger negotiating position than any vendor scorecard. And the four-week spike the case against proposes is not an alternative to the index; it is its first experiment, and it has been added to the phasing below.

**Pre-mortem: it is November 2027 and the TL Index has failed**

| Failure story | Root cause | Status |
| --- | --- | --- |
| The sufficiency map exists; model decisions still follow vendor relationships and habit | Adoption and governance wiring were left to Phase 3, after the build | Changed: the Phase 1 exit gate now includes one real model decision made through the index and one governance approval citing it |
| Production bars were set by the AI team alone and carry no authority; results dismissed as the AI team grading its own work | Business partners never recruited | Open: a pillar owner must name a partner before a pillar is published; a kill criterion below enforces it |
| Task sets cost three times the estimate; five pillars took two quarters; the index was stale against the year's model releases | Practitioner time and data approvals under-estimated | Open: Phase 0 produces a per-dataset cost estimate; the MVP starts with Tier 1 (public-derived and synthetic) sets to decouple from approvals |
| The hypothesis was confirmed, and nobody outside the team believed it | Bars and tasks designed by the hypothesis holders | Partly answered: pre-registration, partner-set bars, the university methodology review; add an external read of the first report |
| The index described 2026 volume while the workload moved to agentic work where frontier wins | Static workload assumptions | Changed: composites and the token-shape overlay re-weight to current gateway volume each quarter |
| Judged pillars stalled because frontier judges could not see Tier 2 and Tier 3 data | Judge location unresolved | Open question 2 stands; proposed default: self-hosted judge models inside the boundary plus human sampling for Tier 3 |
| A task set leaked into training through the heal loop's generated data; specialist scores were inflated; trust lost | The evaluation wall relied on process, not audit | Changed: quarterly independent audit of training batches against the task library, by someone outside both programmes |
| Teams tuned prompts to the index; scores rose; production did not improve | Goodhart's law | Changed: rotating held-out slices each quarter and a standing correlation check between index scores and production outcome metrics |
| The team built platform for a year and shipped no decision | Scope: sixteen pillars, portal, contribution flow, heal loop, all at once | Changed: a four-week decision spike precedes Phase 0; the P0 list is fixed; any addition removes something |
| The programme stalled when attention moved; no one owned it | Index lead and harness lead never named | Open: naming them is a blocking open question and a kill criterion |

**What would have to be true for the TL Index to be worth it, and how each is tested**

- The Enterprise's inference volume is dominated by bounded tasks (classification, extraction, routing, short servicing). Test: gateway telemetry classified into token-shape cells and pillar families in Phase 0; if the bounded share is below half, H1 is weaker than assumed.
- Practitioners will give enough time to build and validate task sets within appetite. Test: three named partners with time committed before Phase 1 starts.
- Governance will accept index evidence in place of bespoke reviews. Test: Risk agrees the pillar 4 and pillar 6 scenario sets and the approval format in Phase 0, not after.
- Judging can run inside the boundary for Tier 2 and Tier 3. Test: a self-hosted judge agrees with human raters above the pillar 8 threshold on one pilot set.
- The cost gap between frontier and smaller models persists long enough to matter. Test: re-run the quality-per-dollar view at each release; if frontier prices fall far enough that the gap disappears, the sovereignty and governance arguments must carry the case alone, and the proposal says so.

**Inversion: how to guarantee failure**

Build all sixteen pillars before making any decision; set bars without business partners; judge everything with external APIs; launch the index only with the portal; let the heal loop read the task library; never publish a frontier win; leave the index lead unnamed.

**Second-order effects**

- Goodhart: once the index gates decisions, teams optimise for it. Rotating held-out sets and production correlation are the controls.
- A central gate becomes a bottleneck if slow; the ten-working-day scoring target becomes a service level with a named owner.
- Specialist proliferation: many small models to retrain and operate. Retraining and operations cost belong in H3 and in the cost-per-task view, or the saving is overstated.
- Vendor relations: publishing that a release did not move our metrics is leverage in negotiation and friction in partnership; the index report is internal by default.
- Governance over-reliance: an index pass must not become a rubber stamp for high-stakes usages; human review stays for client-advice and regulated-data workflows.
- Models healed against our bars may be brittle outside them; overfitting detection across a pillar's datasets and its use cases must be real, not aspirational.

**Cost of attention**

Phase 0 and the MVP need roughly four to six people from the forty-five for two quarters, plus practitioner time from three business lines, while the portal, the foundation models and the training pipeline compete for the same people. The case for spending it: the current constraint on ThinkLatent is evidence for adoption and governance throughput, and the TL Index relieves that constraint directly; of the ideas in the register it is the one that turns the flywheel (evidence, better models, more adoption, more data) fastest.

**Kill and park criteria, pre-committed**

| Criterion | Checked | Action |
| --- | --- | --- |
| The four-week decision spike finds no bounded workflow where a mid-size or small model clears a practitioner-set bar | End of the spike | Re-scope the TL Index to a regression gate and release-evaluation service; drop the training-targets claim |
| Fewer than three business partners have signed a production bar | End of Phase 1 | Park; the index has no authority |
| The harness cannot reproduce a public benchmark within published error bars | Phase 0 exit | Stop until fixed; nothing is published from an uncalibrated harness |
| No sufficiency decision for at least two real workflows within two quarters of Phase 1 start | Two quarters after Phase 1 start | Kill, or re-scope to the regression gate only |
| No model decision cites the index in the two quarters after the first report | Two quarters after Phase 2 | Park; the product is not used |
| Any task-library item or near-duplicate found in a training batch | Any audit | Freeze both programmes until the wall is rebuilt and audited |
| Index lead and harness lead not named | Phase 0 start | Do not start Phase 0 |

**Rubric after the stress test**

Feasibility moves from 4 to 3 (practitioner dependency and judge location unresolved); the rest hold. Composite 4.0 on equal weights, proposed, pending Jithin: strategic fit 5, evidence of need 3, differentiation 4, feasibility 3, value at stake 4, governance exposure 4, reversibility 4, compounding 5.

**Changes made to the proposal from this critique**

1. A four-week decision spike precedes Phase 0 (see Scope, phasing and open questions).
2. The Phase 1 exit gate now requires one real model decision and one governance approval made through the index.
3. Quarterly independent audit of training batches against the task library.
4. Composites and the token-shape overlay re-weight to current gateway volume each quarter.
5. Rotating held-out slices and a standing index-to-production correlation check.
6. The kill criteria above are part of the proposal and are reviewed at each phase gate.

## Scope, phasing and open questions

The MVP proves the hypothesis on five pillars before the index is widened. Phases are gated on evidence, not on calendar.

1. **Decision spike, four weeks, before Phase 0.** Three real bounded workflows, three model classes (small, mid-size, frontier), practitioner-set bars, run by hand with no harness. Exit gate: a first read on H1 at trivial cost. If no bounded workflow clears its bar on a smaller model, the TL Index is re-scoped to a regression gate and release-evaluation service before any platform is built.
2. **Phase 0, foundation.** Harness built on an open base (HELM-style scenarios or an in-house runner), model register schema, cost and latency instrumentation, judge-panel and human-sampling loop, gateway telemetry classified into token-shape cells and pillar families. Exit gate: one public benchmark reproduced within published error bars; index lead and harness lead named.
3. **Phase 1, MVP on five pillars.** Financial data processing, client care, entity recognition, compliance and regulatory, safety and grounding. Each with a practitioner-built private task set and an agreed production bar signed by a business partner. Run across one frontier model, two open-weight model classes and one Enterprise specialist. Exit gate: first sufficiency map, a first H1/H3 read, one real model decision and one governance approval made through the index.
4. **Phase 2, full pillar set and first quarterly report.** Remaining eleven pillars, deployability axis including post-quantization scores, business-line composites re-weighted to current volume, IRT stitching so later task-set churn stays comparable, first independent audit of training batches. Exit gate: first Index report to leadership with a spend-impact estimate.
5. **Phase 3, operationalise.** Regression gate wired into the model-swap process, release evaluation on every new model within ten working days, fine-tuning programme adopts the index as its evaluation standard, procurement scorecard in use, rotating held-out slices and the index-to-production correlation check running each quarter.

Open questions to settle before Phase 1:

- [ ] Which business-line leaders own the production bar for each MVP pillar? (Pillar owners; blocking)
- [ ] Where does the judge panel run, given that frontier judges may sit outside our boundary? (Security and Risk liaisons; blocking)
- [ ] Do we license an external finance benchmark as a reference pillar, or stay fully private? (Index lead with Procurement; non-blocking)
- [ ] What retraining cadence are we willing to fund for specialists, since that cost belongs in H3? (Training programme liaison with Finance; blocking for H3)
- [ ] Which business-line weights define the composites, and who signs them off? (Sponsor with business partners; non-blocking until Phase 2)
- [ ] How do the university lab and the India and Canada teams split task-set and use-case construction? (Index lead; blocking)
- [ ] Which three use cases form the MVP, and which public tools do we mirror first? (Use-case owners; blocking)
- [ ] What is the production bar format: a single pass rate, or pass rate plus a cost ceiling? (Index lead with Risk; blocking)

## Sources

- [Epoch Capabilities Index](https://epoch.ai/eci) and [ECI documentation](https://epoch.ai/data/eci-documentation)
- [Artificial Analysis Intelligence Benchmarking Methodology, v5.0](https://artificialanalysis.ai/methodology/intelligence-benchmarking)
- [Vals AI company profile](https://sacra.com/c/vals-ai) and [Vals AI Series A coverage](https://www.kucoin.com/blog/vals-ai-40m-series-a-real-world-benchmarks?lang=en_US)
- [IBM HELM enterprise benchmark](https://www.alphaxiv.org/resources/2506.20274)

## Decision log

| Date | Decision | By |
| --- | --- | --- |
| 2026-11-01 | Index is a feature of the ThinkLatent Portal, not a standalone product | Jithin |
| 2026-11-01 | Core hypotheses pre-registered (H1 sufficiency over size, H2 frontier upgrades do not move Enterprise metrics, H3 specialists beat generalists in context) | Jithin |
| 2026-11-01 | Candidate pillars 17 (visual and chart understanding) and 18 (UI generation) proposed for the pillar council | Jithin |
| 2026-11-01 | Registered in the Idea Lab as TL-004; rubric 4.1 proposed, pending Jithin; critique log to be recorded before team review | Thinking partner, pending Jithin |
| 2026-11-01 | Stress test recorded: critique log, pre-mortem, kill criteria; decision spike added before Phase 0; Phase 1 exit gate tightened; rubric revised to 4.0 proposed | Thinking partner, pending Jithin |
