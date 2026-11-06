<!-- Exported from Idea Lab project knowledge (claude/scout-brief-eval-governance.md, created 2026-11-02T08:02:12.259103Z) on 2026-11-04. Read-only mirror; edit the project doc, not this file. -->
# Scout brief: evaluation presentation and model-governance tooling

Prepared 2 November 2026 from public web sources only. Scope: (1) how the best evaluation products present results so a reader can decide, for the Index page; (2) what regulated firms use to inventory, validate, approve and monitor models, for the Record page; (3) synthesis. Out of lane and covered elsewhere: temporal KPIs, feedback loops, platform feature catalogues, serving metrics, adoption.

Method and coverage: 25 searches and 43 fetches, mostly original documentation, regulator texts and papers. Not reached in this pass (gaps, not findings): TruLens, DeepEval/Confident AI, Ragas, Galileo, W&B Weave, Vertex Gen AI evaluation, OpenAI Evals UI, Holistic AI, Collibra, Alation, Monitaur, Arthur, ModelOp, Domino, and public descriptions of model-risk tooling at named banks.

## Part 1 — Evaluation presentation

### Public leaderboards

**HELM (Stanford CRFM).** The founding move is a scenario × metric matrix: 16 core scenarios each measured on seven metrics (accuracy, calibration, robustness, fairness, bias, toxicity, efficiency), 98 of 112 cells filled, so trade-offs are visible instead of accuracy-first. All 30 models ran under the same adaptation, and every raw prompt and completion is published. *Adopt:* the matrix as the Index's native shape (pillar × metric, not one score) and per-item drill-down to the prompt and output; a bar is only credible if a reviewer can open the failing items.

**LMArena.** Rankings are Bradley–Terry with closed-form 95% confidence intervals (bootstrap dropped for a 30× speed-up); the ranking code is open source (Arena-Rank, Apache 2.0, December 2025). Style control fits length and markdown as covariates, "separating the effect of writing style from the content", and moved frontier models several places. *Adopt:* show rank as an interval, not an integer; make confounder control a visible toggle; publish the scoring code so any score can be recomputed.

**Scale SEAL.** Expert human pairwise ratings, Bradley–Terry on the Elo scale, 95% CIs from about 1,000 bootstrap resamples (2.5th/97.5th percentiles). Footnotes record when each model was scraped relative to its predecessor as the argument against overfitting. *Adopt:* per-result provenance notes (when run, which version, why contamination risk is judged low) as first-class data beside the score.

**Open LLM Leaderboard (Hugging Face).** Reproducibility is literal: the exact harness fork, command line and per-task settings (shots, metric variant, number of choices) are documented, and per-model input/output "details" are a public dataset. Community-flagged models carry "Flagged" in the name with a link to the discussion. The docs say to compare only within the same parameter class, precision and model type, and warn that closed models drift behind APIs. *Adopt:* harness and config pinned on every row; flags with a linked discussion; size, precision and type as default filters.

**LiveBench.** Contamination is handled structurally: questions come from recent sources, about a sixth are refreshed monthly and withheld for a month, and only objectively gradable items are used because LLM judges erred on 10–46% of hard math and reasoning items. Rank correlation across refreshes exceeded 0.997. *Adopt:* a dated, held-out rotation for each pillar with a published freshness stamp; report rank stability across refreshes as a trust metric.

**Artificial Analysis.** Three axes in one view: intelligence, price and speed, with blended price at a declared 7:2:1 cache/input/output token ratio and a Cost per Task metric. Latency separates time to first token from time to first answer token (after reasoning). The 2024 method description reports medians and P5–P95 over a rolling 14-day window, eight runs a day. *Adopt:* a quality-versus-cost scatter with the Pareto frontier drawn, cost per task rather than per token, and the token-mix assumption printed on the chart. This is the direct visual for the small-model hypothesis.

**Epoch AI Benchmarking Hub.** "Our internal evaluations are powered by Inspect"; data is CC BY 4.0; each benchmark page carries a versioned changelog (v2.0.0 on 12 February 2026 re-ran key models after a scaffold change), the scaffold and token limits, and the reason 16 of 500 SWE-bench Verified tasks are excluded. *Adopt:* benchmark pages with a changelog and an explicit "what changed, which rows were re-run" note; keep internal and externally reported numbers visibly distinct.

**Vals AI.** Finance suites (Finance Agent v2.1, Excel Modeling v1.1, Tax Agent Bench, ClaimBench) carry version suffixes, "Updated" dates and model counts; archived suites keep their results. Indexes weight sub-sectors by GDP share. The Inference Provider Index runs the same open-weight model across providers on accuracy, cost and speed. *Adopt:* version suffixes and archive semantics for every pillar dataset; and the provider-index idea turned inward: the same model on a different serving configuration is a different row.

**FinanceBench (Patronus).** 10,231 open-book questions on public filings with evidence strings; the headline was GPT-4-Turbo with retrieval failing or refusing on 81% of a 150-case sample. The Patronus platform is retired; the dataset remains public. *Adopt:* every finance item carries an evidence pointer so a failure can be audited against the source document, and the retrieval configuration is part of the result.

**MLCommons AILuminate.** Every result is labelled Official (confidential prompt set) or Practice; a purpose-built deterministic evaluator replaced LLM-as-judge; scores are "percentile scores on a fixed 0 to 100 scale"; the assessment standard is versioned (v1.4, May 2026). *Adopt:* an Official/Practice label on each run so developer self-tests and governance-grade evidence are never confused.

### Cloud-vendor catalogues

**Microsoft Foundry model leaderboards.** A quality index (mean of dataset accuracies), cost per benchmark run in USD from actual token usage, latency at mean/P50–P99 plus TTFT, safety as attack success rate, and scenario leaderboards grouping datasets by use. The page states its limitations (saturation, prompt sensitivity, unclear risk definitions) but contradicts itself on the cost token ratio (3:1 in one section, 80:20 in another). *Adopt:* the limitations panel, the scenario grouping, and one declared cost assumption.

**Amazon Bedrock evaluations.** Judge jobs return a score plus a written explanation per prompt; the console shows a histogram of score frequency, with the full report written to S3. *Adopt:* score distributions rather than means alone, and the judge's rationale visible on each item.

### Evaluation tooling

**Inspect (UK AISI).** Eval logs capture samples, messages and events; epochs (repeat runs) with clustered standard errors; model grading with multi-model voting and deferred re-scoring; sandboxing. *Adopt:* epochs with standard error as the unit of a score; store the log, not just the number, so a pillar can be re-scored under a new judge without re-running the model.

**Braintrust experiment comparison.** A baseline is chosen (default: latest on the same branch); each score shows improvement and regression counts; a "Comparison grade" labels a run Improvement, Regression, Tradeoff or Tie and includes latency, cost and errors; rows turn green or red with an inline diff; trials per input collapse into one group. *Adopt:* release-over-release view as counts of items that flipped, not only the delta of the mean; a comparison grade that folds in cost and latency.

**Judge calibration (Arize).** "No single number can tell you whether an LLM judge is trustworthy": report human–human agreement (kappa or alpha), judge–human agreement against that baseline, and per-class precision and recall; about 100 labelled items gives ±10 points, about 400 gives ±5; version the evaluator (rubric, prompt, model, date). *Adopt:* a calibration card on every judged pillar with kappa, n, per-class recall and evaluator version.

### Cross-cutting patterns

Trust in these products comes from six repeated moves: intervals (SEAL, LMArena, Inspect); transparency down to the item (HELM, Open LLM Leaderboard, Bedrock); pinned configuration and versioned datasets (Open LLM Leaderboard, Vals, Epoch, AILuminate); structural contamination handling (LiveBench, AILuminate); confounder control (LMArena); and explicit limitation statements (Foundry). Pareto views are rarer than expected: only Artificial Analysis, and loosely Foundry, put cost on an axis, and none frames results as sufficiency against a workflow's bars.

## Part 2 — Model governance tooling

### Regulatory baselines

**SR 11-7 (2011) and its 2026 replacement.** SR 11-7 set the vocabulary: an inventory of models in use, in development or recently retired; validation as conceptual soundness, ongoing monitoring and outcomes analysis; independent "effective challenge"; review at least annually; rigour scaled to materiality; vendor models validated like internal ones. On 17 April 2026 the OCC, Federal Reserve and FDIC rescinded it with revised interagency guidance (OCC Bulletin 2026-13; the Fed's SR 26-2 per secondary sources) that "does not set forth enforceable standards or prescriptive requirements", narrows "model" to complex quantitative methods, raises the relevance threshold to $30bn in assets, and excludes generative and agentic AI as novel, with a request for information promised. Orrick's reading: validator independence now "depends on the rigor and effectiveness of the review rather than on organizational structure". *Adopt:* keep the three validation components and the inventory fields as the Record's skeleton (auditors still speak this language), but tier by inherent risk × materiality and let the tier set cadence and depth.

**PRA SS1/23 (UK).** Five principles: identification and risk classification, governance, development and use, independent validation, mitigants; a Senior Management Function holder is accountable; model risk is treated as "a risk discipline in its own right"; a revised version took effect 23 April 2026. *Adopt:* a named accountable executive on every record and a tier field that drives validation depth.

**EU AI Act.** Annex IV technical documentation requires intended purpose, system version and its link to earlier versions, data provenance, validation and test procedures with dated and signed logs, justification of the chosen metrics, significant changes over the lifecycle, and a post-market monitoring plan. Article 72 requires a system that will "actively and systematically collect, document and analyse relevant data" on performance over the lifetime; the plan is part of Annex IV; the Commission's template is due by 2 September 2027. General-purpose model obligations attach to the model provider, while high-risk obligations attach to the system in its intended purpose [unverified in this pass]. *Adopt:* version lineage, dated and signed test logs, and a monitoring-plan field on every approved use.

**NIST AI 600-1 (Generative AI Profile, July 2024).** The actions that map most directly: GV-1.6-003, inventory entries include data provenance, known issues, human-oversight roles and the underlying foundation models with versions and access modes; MP-1.1-002, document the acceptable context of use; MS-2.3-003, share pre-deployment test results with those holding release authority; MS-2.9-002, document proposed use, data provenance, training approach and evaluation data; GV-1.7-002, decommissioning considerations. *Adopt:* the use-case record pins base-model version and access mode, and the approval screen shows the test results the approver is signing.

**ISO/IEC 42001 (2023) [unverified; ISO page unreachable].** AI management-system standard with Annex A controls on system documentation, data provenance and incident handling; the certification layer an auditor may ask the Record to map to.

### Products

**IBM watsonx.governance (AI use cases and AI Factsheets).** A use case has name, inventory, description, risk level, owner(s), supporting-data links, tags and a status that runs from Draft through Use case approved, Awaiting development, Validation complete, Approval, Deployed, In operation, Under revision and Decommissioned; the Lifecycle tab groups tracked assets (models, prompt templates, deployments) into develop, validate and operate; a factsheet opens per asset; basic and full PDF reports export; the Governance console adds workflows and questionnaires. *Adopt:* prompt templates and deployments as tracked assets of a use, not only the model; the status enumeration; one-click full export.

**ValidMind.** Inventory records with custom fields, versions and interdependencies; risk-tier templates with scoring, thresholds and override rules; workflows with custom stages, states and conditional requirements; findings ("artifacts") with severities; evidence mapped to validation reports; monitoring with thresholds and alerts that trigger workflows; attestations that certify record attributes at a point in time; activity logs and exports of documents, inventory, findings and analytics. Its MRM material is organised by SR 26-2, SS1/23 and E-23. *Adopt:* findings with severity and owner as child objects of the record; attestation as a dated, signed event; a threshold breach opens a workflow task.

**Credo AI.** Intake questionnaire → AI Registry; reviewers approve, reject or request changes; an admin advances Intake → Governance; the Governance Plan splits into a Risk Plan and a Compliance Plan with controls assigned to owners; Policy Packs and Risk Scenarios are reusable assets; a Model Registry sits beside the use-case registry. *Adopt:* intake as a questionnaire that routes, and a visible separation of model registry from use-case registry.

**ServiceNow AI Control Tower (Brazil release, September 2026).** One inventory of systems, models, prompts, agents and tools with discovery from the major hyperscalers; lifecycle playbooks onboard → assess → build and test → deploy, with routed approvals; classification against NIST AI RMF and the EU AI Act; a portfolio home page of priority actions, posture and value. *Adopt:* auto-discovery so a usage that bypassed intake appears as "unregistered", and a portfolio view above the records.

**Fiddler.** Alert rules on traffic, drift, data integrity, performance and custom metrics; absolute or relative thresholds (versus a previous period); a required Critical and optional Warning threshold; alerts revised when later data changes their severity. *Adopt:* two-level thresholds and relative-to-baseline alerts on each approved use.

**Microsoft Responsible AI dashboard.** Cohort-based disaggregated metrics and a PDF scorecard for compliance stakeholders. *Adopt:* cohort cuts inside validation evidence and a scorecard export per approval.

## Part 3 — Synthesis

### Ten features for the Index page

| # | Feature | Source | Why | Class |
|---|---|---|---|---|
| 1 | Pillar × metric matrix with drill-down to the prompt and output of every item | HELM; Open LLM Leaderboard | A bar is only credible if the failing items are inspectable | Table stakes |
| 2 | Every score carries n, an interval (bootstrap or closed-form) and epochs | SEAL; LMArena; Inspect | Separates real gaps from noise before a model is called sufficient | Table stakes |
| 3 | Quality versus cost-per-task scatter with the Pareto frontier drawn and workflow bars as horizontal lines | Artificial Analysis; Foundry | The visual argument for the small-model hypothesis | Differentiator |
| 4 | Sufficiency view: per workflow, which models clear every pillar bar, cheapest first | Vals indexes; Foundry scenario leaderboards | No public leaderboard frames results as pass/fail against a workflow | Differentiator |
| 5 | Pinned config on every row: harness version, prompt template, shots, judge version, serving configuration | Open LLM Leaderboard; Epoch; Vals provider index | Same model, different serving, is a different row | Table stakes |
| 6 | Dataset versioning with freshness stamp, held-out rotation and archive semantics | LiveBench; Vals; AILuminate | Contamination and drift handled structurally, not by assertion | Table stakes |
| 7 | Judge calibration card: kappa, n, per-class recall, evaluator version | Arize; Inspect | Judged pillars are only as good as the judge | Differentiator |
| 8 | Release-over-release diff: counts of items that flipped, comparison grade including cost and latency | Braintrust; Epoch changelog | Means hide the regressions that matter | Differentiator |
| 9 | Official versus Practice label on every run | AILuminate | Developer self-tests must never look like governance-grade evidence | Table stakes |
| 10 | Limitations panel and confounder toggles | Foundry; LMArena style control | Honest framing is part of presentation | Table stakes |

### Ten features for the Record page

| # | Feature | Source | Why | Class |
|---|---|---|---|---|
| 1 | Base-model record separate from usage record, with the usage pinned to a model version and access mode | NIST GV-1.6-003; Credo; EU AI Act Annex IV | The context's two-layer design, made explicit in the schema | Table stakes |
| 2 | Status enumeration from Draft to Decommissioned with a develop/validate/operate lifecycle tab | watsonx.governance | A reviewer sees where a use stands in one glance | Table stakes |
| 3 | Risk tier computed from inherent risk × materiality, with override and reason; tier sets cadence | ValidMind; 2026 interagency guidance; SS1/23 | Proportionality is now the regulatory direction | Table stakes |
| 4 | The three validation components recorded as evidence: conceptual soundness, outcomes analysis, monitoring plan | SR 11-7 lineage | Still the vocabulary auditors and examiners use | Table stakes |
| 5 | Evidence attachments are links to Official Index runs, dated and signed, not uploaded PDFs | EU AI Act Annex IV; NIST MS-2.3-003 | Evidence stays live and reproducible | Differentiator |
| 6 | Findings with severity, owner and due date as child objects; approval blocked on open Critical findings | ValidMind | Approval with unresolved findings is the commonest audit failure | Table stakes |
| 7 | Attestation events: who certified what, when, against which model version | ValidMind | Periodic review becomes a dated signature, not a calendar reminder | Differentiator |
| 8 | Monitoring thresholds with Warning and Critical levels, relative to baseline; a breach opens a task on the record | Fiddler; ValidMind; EU AI Act Art. 72 | Post-market monitoring attaches to the use, not the model | Table stakes |
| 9 | One-click audit export (basic and full) plus activity log | watsonx.governance; ValidMind | Every tool reviewed has it; its absence is noticed | Table stakes |
| 10 | Auto-discovered usages flagged "unregistered", and a portfolio view above the records | ServiceNow AI Control Tower | Shadow usage is the risk inventories miss | Differentiator |

### Where practice cuts against the context's approach

1. **Approval anchoring.** Bank MRM practice (SR 11-7 and its 2026 successor) attaches validation to the model; the use is a field on the model record. The context inverts this: the use case is the record and the model is validated once. The EU AI Act supports the inversion, since obligations follow intended purpose, and NIST GV-1.6-003 bridges both by making the inventory entry name the foundation model and version. Recommendation: keep both records, and define "validated once" as once per model version and serving configuration; a re-serve, quantisation or prompt-template change re-opens the base record, not only the use.
2. **Scope of regulation.** The 2026 US guidance removed generative and agentic AI from model-risk scope and is non-binding. The firm's internal process is ahead of the supervisors; design the Record to the EU AI Act Annex IV and NIST 600-1 field lists, which are more demanding and specific to this technology.
3. **"Validated once" versus continuous monitoring.** SR 11-7's third component, Article 72 and every product reviewed assume monitoring attaches to each deployed use. Without a monitoring-plan field and live thresholds per use, the claim will not survive an audit.
4. **Drift behind APIs.** Closed-model scores decay (Open LLM Leaderboard docs); treat a vendor model version as expiring evidence and re-run it on a schedule.
5. **Thresholds as the unit of truth.** No public leaderboard presents sufficiency bars, and Foundry's cost-ratio inconsistency shows the risk of unstated assumptions. Publish the bar, the sample size and the interval together; any one alone is contestable.

## Sources

1. Liang et al., "Holistic Evaluation of Language Models", arXiv 2211.09110 (v2, 1 Oct 2023; TMLR Aug 2023). https://arxiv.org/abs/2211.09110
2. LMArena, "Arena-Rank: Open Sourcing the Leaderboard Methodology", 18 Dec 2025 (updated 21 Feb 2026). https://arena.ai/blog/arena-rank
3. LMArena, "Does style matter? Disentangling style and substance", 29 Aug 2024 (updated 13 Jun 2025). https://arena.ai/blog/style-control/
4. Scale AI, SEAL Leaderboards methodology, undated (models through mid-2024). https://scale.com/leaderboard/methodology
5. Hugging Face, Open LLM Leaderboard "About" (reproducibility and task settings), undated. https://huggingface.co/docs/leaderboards/en/open_llm_leaderboard/about
6. Hugging Face, Leaderboards documentation introduction, undated. https://huggingface.co/docs/leaderboards/en/leaderboards/intro
7. White et al., "LiveBench: A Challenging, Contamination-Free LLM Benchmark", arXiv 2406.19314 (v2, Apr 2025; ICLR 2025). https://arxiv.org/abs/2406.19314
8. Artificial Analysis, Methodology, undated (accessed 2 Nov 2026). https://artificialanalysis.ai/methodology
9. Hugging Face blog, "Introducing the Artificial Analysis LLM Performance Leaderboard", May 2024. https://github.com/huggingface/blog/blob/main/leaderboard-artificial-analysis.md
10. Epoch AI, Benchmarking Hub "About", 2026. https://epoch.ai/benchmarks/about
11. Epoch AI, SWE-bench Verified benchmark page (changelog to 6 Mar 2026). https://epoch.ai/benchmarks/swe-bench-verified
12. Vals AI, Public Enterprise LLM Benchmarks, as of 29 Oct 2026. https://www.vals.ai/benchmarks
13. Patronus AI, FinanceBench documentation (paper 20 Nov 2023, arXiv 2311.11944). https://docs.patronus.ai/docs/research_and_differentiators/financebench
14. MLCommons, AILuminate (Safety 1.2.1, Jailbreak 1.1; results Oct 2026). https://mlcommons.org/ailuminate/
15. Microsoft Learn, "Model leaderboards in Microsoft Foundry (preview)", updated 28 Aug 2026. https://learn.microsoft.com/en-us/azure/foundry/concepts/model-benchmarks
16. AWS, "Evaluate model performance using another LLM as a judge", Amazon Bedrock User Guide, undated. https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html
17. UK AI Security Institute, Inspect documentation, undated. https://inspect.aisi.org.uk
18. Braintrust, "Compare experiments", undated. https://docs.braintrust.dev/evaluate/compare-experiments
19. Hutton, "How to measure human-LLM judge alignment", Arize, 22 Jul 2026 (updated 7 Oct 2026). https://arize.com/blog/measuring-human-llm-judge-alignment/
20. Federal Reserve, SR 11-7 "Guidance on Model Risk Management", 4 Apr 2011. https://www.federalreserve.gov/supervisionreg/srletters/sr1107.htm
21. OCC, Bulletin 2026-13 "Model Risk Management: Revised Guidance", 17 Apr 2026. https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html
22. Orrick, "Agencies Overhaul Model Risk Management Guidance for Banks", Apr 2026. https://www.orrick.com/ja-JP/Insights/2026/04/Agencies-Overhaul-Model-Risk-Management-Guidance-for-Banks-Heres-What-Changed
23. Bank of England PRA, SS1/23 "Model risk management principles for banks", 17 May 2023 (current version 23 Apr 2026). https://www.bankofengland.co.uk/prudential-regulation/publication/2023/may/model-risk-management-principles-for-banks-ss
24. EU AI Act (Regulation 2024/1689), Annex IV technical documentation. https://artificialintelligenceact.eu/annex/4/
25. European Commission AI Act Service Desk, Article 72 post-market monitoring. https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-72
26. NIST, AI 600-1 "Artificial Intelligence Risk Management Framework: Generative AI Profile", Jul 2024. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
27. IBM, "Setting up an AI use case", watsonx.governance documentation, undated. https://www.ibm.com/docs/SSYOK8/wsj/analyze-data/xgov-use-cases.html
28. IBM, "AI Factsheets", Cloud Pak for Data 5.4.0 documentation. https://www.ibm.com/docs/SSNFH6_latest/svc-welcome/aifact.html
29. ValidMind, Guides index (inventory, tiering, workflows, findings, monitoring, attestation, auditing), 2026. https://docs.validmind.ai/guide/guides.html
30. ValidMind, "About ValidMind", 30 Oct 2026. https://docs.validmind.ai/about/overview.html
31. Credo AI, "Getting Started: New User Guide", undated. https://knowledge.credo.ai/getting-started
32. ServiceNow, "Exploring AI Control Tower", Brazil release, updated 10 Sep 2026. https://www.servicenow.com/docs/r/intelligent-experiences/aict-exploring.html
33. Fiddler AI, "Alerts" product guide, undated. https://docs.fiddler.ai/product-guide/monitoring-platform/alerts-platform
34. Microsoft Learn, "Assess AI systems by using the Responsible AI dashboard", updated 13 Oct 2025. https://learn.microsoft.com/en-us/azure/machine-learning/concept-responsible-ai-dashboard
