<!-- Exported from Idea Lab project knowledge (claude/scout-brief-platform-features.md, created 2026-11-02T08:02:13.283359Z) on 2026-11-04. Read-only mirror; edit the project doc, not this file. -->
# Scout brief: platform feature catalogue

**Lane:** user-facing features of vendor platforms, LLM-ops products, ML registries and publicly described internal portals, screen by screen where sources allow. Temporal KPIs, feedback-loop capture, leaderboards/governance, serving metrics and adoption are covered by other researchers and are only mentioned where a screen bundles them.
**Date:** 2 November 2026. **Method:** public vendor docs, changelogs and engineering blogs only; 37 sources. Claims drawn from general knowledge rather than a fetched page are marked *[unverified]*. Vendor-versus-vendor comparison pages are marked *[vendor comparison]*.
**Verdict key:** **Adopt** (copy the pattern), **Adapt** (take the idea, change the shape), **Ignore** (not worth the team's attention).

---

## 1. Vendor platforms

### OpenAI platform
- **Stored Completions → Evals → fine-tune loop.** A `store=true` flag saves input/output pairs with caller-supplied metadata (user, session). The dashboard lets you review, filter and tag them into datasets, run Evals (beta) against stored data or uploaded files, train a fine-tune directly from the stored set, then return to Evals to check the result. OpenAI frames it as iterative: refine the dataset, adjust parameters, capture more examples. (Oct 2024.) The Evals screens were upgraded a month later to compare models and iterate on prompts against your test data.
- **Projects, keys, rate-limit tiers.** Per-project API keys, members, budgets and rate limits exist *[unverified: the help article could not be fetched]*.
- **Serves:** app developers who own one use case end to end.
- **Verdict: Adopt** the stored-completions-to-fine-tune loop as the backbone of the improvement-loop page; it is the only vendor that draws the loop on one surface.

### Anthropic (Claude) Console
- **Usage page.** Filters: workspace, model, month or day, API key. Group by model, date/time or key; clicking a bar drills to hour and minute. Input and output tokens as chart and totals. A list of requests blocked by rate limits. A per-model dropdown shows hourly-peak input tokens per minute alongside the cache-read rate and the current limit, and the same for output tokens. CSV export.
- **Cost page.** Workspace, model and month filters; daily cost chart; token plus tool-use costs; CSV export. Stated limitation: no breakdown by individual user.
- **Serves:** workspace owners and billing.
- **Verdict: Adopt** the usage page almost verbatim, especially "rate-limited requests" and the limit-next-to-peak view; those two answer the questions a use-case owner actually asks.

### Google AI Studio and Vertex AI
- **Model Garden.** 150+ first-party, partner and open models; **org policies** restrict which models a project may see or tune.
- **Prompt Management** (preview, 2024): shared library with versioning, restore, AI-generated improvement suggestions, notes and tags; side-by-side comparison of iterations; **Prompt Optimizer** rewrites prompts for a target model.
- **Gen AI evaluation service** with templated criteria; **Model Monitoring** attached to the model rather than the endpoint. Model Registry versions and aliases *[unverified: page body did not load]*.
- **Serves:** platform admins (policies), prompt authors.
- **Verdict: Adapt** org-policy gating per model and per tuning right; **Ignore** the consumer playground.

### Azure AI Foundry
- **Model leaderboard** (public preview, May 2026): four top-10 bar charts (quality, safety, throughput, estimated cost) above a sortable table; a **trade-off chart** with a "Compare quality against" dropdown (cost, throughput, safety) and a model picker; **leaderboards by scenario** (reasoning, coding, question answering).
- **Compare** up to three models in four tabs: performance benchmarks, model details (context, training data, languages), supported endpoints, feature support (function calling, structured output, vision). Each has **View details** and **Deploy**.
- **Evaluation wizard** (July 2026 walkthrough): target (agent, model or dataset) → scope (turn or conversation) → data (synthetic generation, upload, benchmark, or existing traces) → auto-suggested evaluators plus judge model → review. Results show pass rate per evaluator and a per-row table with the judge's reasoning, which the author calls "the most valuable part". The agent's **Monitor** tab offers "Set up continuous evaluation" beside latency, tokens and success rate; charts stay empty when prerequisites are missing, which generates support tickets.
- **Fine-tuning:** reinforcement fine-tuning is gated; access is requested through the model catalog and approved. **Project-level cost attribution** for chargeback; a **quota page** showing consumption.
- **Serves:** model selectors (leaderboard), app teams (wizard), finance (attribution).
- **Verdict: Adopt** the leaderboard-plus-compare pattern for the internal evaluation index and the wizard's per-row reasoning; **Adapt** approval-gated access to training.

### Amazon Bedrock
- **Prompt Management:** a prompt builder with TEXT or CHAT templates (system prompt, history, tools, caching), `{{variables}}`, a bound model and inference settings; **variants** with a Compare-variants mode showing up to three side by side (authoring only, one variant per prompt in the API); mutable draft versus numbered immutable versions; one-click **prompt optimisation** for a target model. **Flows** reference a prompt version, so updates mean cutting a version, not editing the flow. (Third-party guide, July 2026.)
- Model evaluation jobs (automatic, LLM-as-judge, human work team, RAG, bring-your-own responses), Guardrails and provisioned throughput exist *[unverified: userguide page body did not load]*.
- **Serves:** prompt authors; agent builders.
- **Verdict: Adapt** draft-versus-immutable-version and compare-variants; **Ignore** Flows.

### Hugging Face
- **Inference Endpoints Analytics:** top bar selects replica (one or all), view (requests, hardware, replica timeline) and time range (click-and-drag on any graph), with auto-refresh. Panels: HTTP requests by status class with percentage boxes; pending (queued) requests; latency p50/p90/p95/p99; running replicas against a red max line; a **timeline** of replica states from pending to running; CPU, memory, GPU and VRAM with average or per-replica detail. OpenMetrics export for Prometheus/Grafana/Datadog.
- **Model tree:** a model page links base model to its fine-tunes, adapters, merges and quantisations; a "Base only" toggle hides derivatives and a Model-tree filter lists one relation type Hub-wide (May 2026).
- **Serves:** endpoint operators; anyone navigating model lineage.
- **Verdict: Adopt** the model tree as the lineage spine of model cards by generation; **Adapt** the replica timeline.

### Fireworks, Together, Mistral, Cohere
- **Fireworks** fine-tuning web UI (RFT, now deprecated): guided first run picks model, dataset, evaluator, rollout settings and an optional W&B project, then a summary; the **job monitor** shows state, optimiser steps, rollout throughput, reward distribution, validation results and logs, and tells you to inspect sample rollouts for reward hacking and stop on regression; **promote checkpoint → deploy LoRA**.
- **Mistral AI Studio:** playground to compare models; Build (agents, workflows), Libraries, Monitor, Admin (API keys, usage), Secrets Manager.
- **Cohere:** four-stage flow (upload, train, evaluate, deploy); a finished model "will start appearing in the model selection dropdown on the Playground". Deprecated 15 Sept 2025. **Together:** not researched.
- **Verdict: Adopt** Fireworks' monitor fields and promote-then-deploy; **Adopt** Cohere's "appears in the playground dropdown" as the definition of done.

---

## 2. LLM-ops products

### Langfuse
- Prompt full-text search; **Slack/webhook alerts when a prompt version, label or tag changes**; playground opens several chat windows side by side to compare prompts, models, variables or tools and restores test state; dataset runs and custom experiments triggered from the UI by non-engineers; sessions added to annotation queues; usage alerts per billing cycle. (July 2025.)
- **Verdict: Adopt** prompt-change alerts; **Adapt** UI-triggered experiments for non-engineers.

### LangSmith
From the Sept–Oct 2026 changelog:
- **Datasets:** "Add to dataset" from a trace saves full source-run metadata; dataset tables preview the most distinguishing input field.
- **Experiments:** comparison view with computed columns and expandable previews; batches that time out still return a result per run.
- **Annotation queues:** same top bar as tracing with Trajectory and Details views; rubrics with feedback config enforced before submit; reviewer notes autosave.
- **Online evaluators:** "Add existing evaluator" in the empty state; sandbox test with tracebacks; code evaluators use workspace secrets; **evaluator spend** charted per agent.
- **Custom dashboards:** token and cost metrics, a prompt-cache-hit-rate template, ratio KPIs shown as percentages, any environment of any agent on one chart. Alerts on error percentage.
- **Agent builder:** "+ Agent" offers Build (with or without code) or Connect (trace an existing agent); the All Agents table has an Owner column.
- **Usage limits:** a dedicated permission to change spend limits and pause/resume runs. **Workspaces:** one API-keys table with a Workspaces column.
- **Verdict: Adopt** add-to-dataset-with-provenance, enforced rubrics, evaluator spend and the Owner column; **Adapt** the pause/resume permission for budget enforcement.

### Braintrust
- Objects: projects, experiments (offline eval of a task on a dataset), logs, versioned datasets, scorers (code, LLM, human), prompts, spans with **Thread** and **Timeline** views, alerts on log conditions, Brainstore as the trace engine. The **playground** compares prompts and models against a dataset and can be saved as an experiment. **Loop** is an agent that writes prompts, scorers and dataset rows; **human review** routes tasks to reviewers; side-by-side experiment diffs and GitHub Actions gates *[vendor comparison]*.
- **Verdict: Adopt** "save playground as experiment" and the Thread/Timeline toggle.

### Arize AX and Phoenix
- Tracing across 30+ frameworks; **Signal** groups recurring production failures into ranked issues, each with trace evidence and a proposed fix; evaluators (LLM, agent or code judges) can be created from a Signal issue and calibrated against human labels; annotation; datasets and experiments with version comparison and remote runs against a deployed agent; **Alyx** answers plain-language questions about your data inside the UI; dashboards, alerts, CLI, MCP. Phoenix (open source) not separately researched.
- **Verdict: Adapt** Signal-style issue clustering; **Adapt** Alyx as the pattern for the onboarding assistant.

### Weights & Biases Weave
- The public feature report is locked; nothing could be verified *[unverified]*. **Verdict: Ignore** until a source is found.

### Humanloop and PromptLayer
- Humanloop shut down 8 Sept 2025. PromptLayer offers a **Prompt Registry** with Git-style history, diff and rollback; **A/B traffic splitting switched on in the UI**; a spreadsheet-like evaluation pipeline and a multi-turn conversation simulator; request logs; an analytics dashboard; a WYSIWYG editor for non-engineers.
- **Verdict: Adapt** UI-toggled A/B split; **Ignore** the rest.

### Galileo and Patronus *[vendor comparison, Dec 2025]*
- **Galileo:** Luna-2 small-model evaluators; Insights Engine groups failures and recommends fixes; Agent Graph with timeline and conversation views; Protect blocks violations inline; dashboards with live diffs and A/B comparisons; reviewers accept/reject outputs and **expert reviews become reusable evaluators** (CLHF); plain-English custom metrics; PII redaction.
- **Patronus:** Percival analyses traces across four failure categories, explains in plain English and suggests prompt fixes; Glider and Lynx judges; Loop generates test and edge cases; Evaluation Runs compare models, datasets and criteria side by side.
- **Verdict: Adapt** reviews-become-evaluators; **Adapt** auto-generated edge cases for new use cases.

### Helicone, Confident AI, Literal AI
- **Helicone** *[vendor comparison, Feb 2025]*: one-line proxy; prompt versioning; UI experiments and playground; cost analytics; alerts; customer rate limits independent of the provider's. Confident AI and Literal AI: not researched.
- **Verdict: Ignore** beyond the custom-rate-limit idea.

### Portkey
- Gateway **configs** express routing: fallbacks, load balancing across keys, conditional routing on custom checks, **canary testing of new models in production**, retries, circuit breaker per strategy, timeouts, custom hosts for private models; simple and semantic caching; **budget limits by cost or tokens** and **rate limits per minute, hour or day on requests or tokens**; MCP; gRPC beta. Now part of a larger security vendor's gateway.
- **Verdict: Adopt** the config vocabulary (fallback, weight, canary, circuit breaker) as the routing-alias model.

### TrueFoundry
- One OpenAI-compatible endpoint for 1000+ models; **scoped keys per user, team and application**; spend limits and cost attribution across teams; per-user, per-model and per-app rate limits; routing by weight, latency or priority with retries; versioned prompts with a playground; guardrails (PII, injection, moderation, custom); MCP registry and virtual MCP servers; agent and skills registries; RBAC; OpenTelemetry logs.
- **Verdict: Adopt** three-level scoped keys (user/team/app) tied to limits.

### Opik (Comet) *[vendor comparison, Sept 2026]*
- Full trace trees and agent graphs; multi-turn and multimodal logging; 22 LLM-judge and 20+ heuristic metrics; annotation queues with claim/lock; **Agent Optimizer** with six algorithms; versioned agent configurations; test suites; Ollie AI diagnostics; CI/CD quality gates; MCP server.
- **Verdict: Adapt** claim/lock on review queues; **Ignore** optimiser.

---

## 3. ML platforms and registries

### MLflow (prompt and model registry)
- **Prompt registry:** prompts are named entities; versions are immutable with auto-increment numbers and commit messages; **aliases** (beta, staging, production) are mutable pointers loaded as `prompts:/name@alias`, with reserved `@latest`; moving an alias is the rollback and A/B mechanism. UI: open a version, click **Add** beside Aliases, **Save aliases**; aliases listed on the prompt list page with a pencil to edit; a **Compare** tab diffs selected versions. On Databricks (Sept 2026) prompts live in Unity Catalog with its permissions and audit, tags per version, and lineage to experiments and evaluation results.
- **Model registry:** model-version aliases such as champion/challenger replaced staged transitions *[unverified: registry page body did not load]*.
- **Serves:** engineers and non-engineers who edit prompts.
- **Verdict: Adopt** alias-plus-immutable-version for both prompts and served models; it is the cleanest routing-alias semantics in the catalogue.

### Databricks Mosaic AI
- **AI Gateway on serving endpoints** (Oct 2026, now "legacy" behind a Unity Gateway): permission and **rate limiting**; **payload logging** to inference tables; **usage tracking** to system tables; AI Guardrails (Llama Guard 2 safety plus Presidio PII); **traffic splitting across served entities** ("Load balance traffic across models."); fallbacks on external models; all configured through the Serving UI; an **importable AI Gateway dashboard** over the logged tables. Payload logging and usage tracking are paid; limits and routing are free.
- **AI Playground:** press **+** to add an endpoint and see responses side by side; tool-calling prototyping, now steered to a CLI.
- **Verdict: Adopt** the importable dashboard over logged tables; **Adapt** traffic split per served entity as the canary control.

### Amazon SageMaker
- **Model Registry:** model groups hold versions registered per pipeline run; **collections** group related model groups; each version carries metrics, **Model Card** information and lineage; **approval status** (PendingManualApproval, Approved, Rejected) *[values unverified]* gates deployment through an event rule or pipeline condition; cross-account sharing. Studio screens for browsing and approving exist *[unverified]*.
- **Verdict: Adopt** approval status as a first-class field on a model version that CI reads.

### ClearML, Neptune, Comet, W&B Models
- Not researched within budget. **Verdict:** no finding.

---

## 4. Internal platforms with screen-level detail

### Uber (Michelangelo and GenAI Gateway)
- **GenAI Gateway** (July 2024): mirrors the OpenAI HTTP interface so "developers write code as if they're using native OpenAI client"; PII redaction before third-party calls and restoration on the way back; **a security-team review of each use case against the data-handling standard before gateway access is granted**; centralised usage and budget per team; metrics for alerting; audit logs used for cost attribution, security audits and quality evaluation.
- **Michelangelo** (May 2024): MA Studio is one UI from data prep to monitoring; a **Model Catalog** of third-party and in-house LLMs where each entry **starts workflows (fine-tune, deploy) from the model page**; cost guardrails with usage attribution and over-usage alerts; an evaluation framework comparing in-house, prompted and fine-tuned third-party models; prompt templates in a central repo under code review.
- **Verdict: Adopt** review-before-access and start-workflow-from-model-card.

### LinkedIn (Oct 2025)
- A central GenAI proxy applies responsible-AI checks, handles streaming and enforces quotas per team behind one OpenAI-compatible API. A **Playground** where developers inspect memory contents, test identity and authorisation rules and watch live execution traces before deploying. A **Prompt Source of Truth** of Jinja templates supporting gradual rollout of prompt versions and shared fragments (for example guardrail text). A **skills registry** with automated similarity checks to flag duplicates and human approval before deployment. Production traces feed offline regression datasets. Engineers credit standardised prompt management, the registry and memory infrastructure as foundations every later team reused.
- **Verdict: Adopt** gradual rollout of prompt versions; **Adapt** duplicate detection for use-case and blueprint registration.

### Pinterest Prompt Hub (2025)
- Real-time evaluation metrics; **centralised leaderboards comparing prompt approaches**; **cost estimate per million tokens** shown with each entry; **single-button deployment to production** without engineering; GUI preferred over APIs. Credited as the fastest-adopted internal platform, with finance staff among the top prompt authors.
- **Verdict: Adopt** cost-per-million beside every quality number; **Adapt** the leaderboard as the per-use-case quality page.

### Grab SpellVault (Nov 2025)
- No-code app builder; Knowledge Vaults with citations; native versus community-built tools; drag-and-drop workflows; apps exposed via browser, Slack, API and MCP; "thousands of apps". Engineers credit incremental evolution without breaking existing apps.
- **Verdict: Adapt** "app exposed as API and MCP" packaging for graduated blueprints; **Ignore** the builder.

### Netflix (Metaflow and Maestro, 2025)
- **Cards** render dashboards from a flow step, viewable in VS Code; artifacts persist per step for resume; Maestro "powers nearly every ML and AI system at Netflix". No portal screens described.
- **Verdict: Adapt** cards as the format for a training run's self-describing report.

### Meta Looper
- Product engineers declare a **blueprint** (features, objective); AutoML trains; **shadow deployment** logs predictions before go-live; 90+ teams, only 15% with AI engineers. Not a GenAI portal.
- **Verdict: Adapt** shadow mode as the first canary stage.

### Not found
DoorDash (2023 talk: principles only), Airbnb, Spotify, Stripe, Shopify, Salesforce, Booking.com, Zalando, Instacart: no public screen-level descriptions surfaced within budget.

---

## 5. Cross-cutting

### Table stakes: the twenty features that appear most often
1. One OpenAI-compatible endpoint for internal and external models (Uber, LinkedIn, TrueFoundry, Portkey, Databricks).
2. Usage page filtered by workspace, model, key and day, with group-by and CSV export (Anthropic, LangSmith, Helicone, PromptLayer).
3. Cost page with per-project or per-team attribution for chargeback (Anthropic, Azure, TrueFoundry, Uber).
4. Scoped API keys per project/team/app with per-key rate and budget limits (TrueFoundry, Portkey, Databricks, LangSmith, OpenAI).
5. Model catalog with detail page, filters and a Deploy button (Azure, Vertex, Hugging Face, Uber).
6. Playground with side-by-side model or prompt comparison (Databricks, Langfuse, Braintrust, Mistral, Bedrock, Vertex).
7. Prompt registry with immutable numbered versions, commit messages and a Compare/diff tab (MLflow, Bedrock, PromptLayer, LangSmith, Vertex).
8. Mutable alias/label/tag pointing at a version for staging and production (MLflow, Langfuse, LangSmith, Bedrock).
9. Trace viewer with span tree, timeline and conversation views plus cost and latency per trace (Braintrust, Arize, Opik, Galileo, LangSmith).
10. "Add to dataset" from a production trace (LangSmith, OpenAI, Braintrust, LinkedIn, Arize).
11. Evaluation runs with side-by-side comparison, pass rate per evaluator and per-row judge reasoning (Azure, Braintrust, LangSmith, Patronus).
12. Evaluator library mixing code, LLM-judge and human scorers (universal).
13. Annotation/review queues with rubrics and enforced feedback schema (LangSmith, Braintrust, Opik, Langfuse).
14. Continuous/online evaluation on live traffic with a monitor tab and alerts (Azure, LangSmith, Arize, Galileo).
15. Routing config: fallback, load balance, retries, circuit breaker, traffic split/canary (Portkey, TrueFoundry, Databricks).
16. Guardrails and PII redaction at the gateway (Uber, LinkedIn, Databricks, TrueFoundry, Azure).
17. Fine-tuning wizard: dataset upload and validation, job status page, metrics, one-click deploy, model appears in the playground dropdown (OpenAI, Fireworks, Cohere, Vertex, Azure).
18. Model registry with versions, lineage and model-card metadata (SageMaker, MLflow, Vertex).
19. Alerts and webhooks on prompt changes, error rate and spend (Langfuse, LangSmith, Helicone, Uber).
20. Workspaces/projects with RBAC, audit logs and an Owner column (LangSmith, Databricks, Uber, TrueFoundry).

### Differentiators: rare but praised
1. **Trade-off scatter plus scenario leaderboards plus three-way compare with Deploy** (Azure): the only catalog that turns benchmarks into a selection flow.
2. **Model tree with "Base only" toggle** (Hugging Face): lineage as navigation, not metadata.
3. **Stored completions → evals → fine-tune → re-eval on one dashboard** (OpenAI).
4. **Failure clustering into ranked issues with proposed fixes** (Arize Signal, Galileo Insights, Patronus Percival).
5. **Reviews become reusable evaluators** (Galileo CLHF; Arize evaluators built from Signal issues).
6. **Cost per million tokens next to every quality score, with one-button deploy** (Pinterest).
7. **Pre-deploy playground that exposes memory, authz rules and live traces** and **gradual rollout of prompt versions** (LinkedIn).
8. **Evaluation wizard with synthetic test-data generation and auto-suggested evaluators** (Azure).
9. **Per-model limit shown beside peak usage and cache rate, plus a list of rate-limited requests** (Anthropic).
10. **Training monitor that tells you to inspect sample rollouts and stop on regression, then promote checkpoint → deploy adapter** (Fireworks); honourable mentions: Uber's security review before gateway access, Azure's approval-gated fine-tuning, LangSmith's evaluator-spend chart, Databricks' importable gateway dashboard.

### Gaps to own: implied by the context, found nowhere
1. **Model cards by generation.** Hugging Face shows a tree per base model; nobody shows a family page that places generation N beside N-1 with the delta in quality, cost and the use cases still on the old one.
2. **One use-case record.** Approval (Uber review, SageMaker status), budget (Anthropic, TrueFoundry), routing config (Portkey), quality (LangSmith) and feedback live in four different products everywhere surveyed; no product has a page per use case that joins them, and none ties a budget or rate limit back to the approval that granted it.
3. **Canary with quality per arm and a promote button.** Gateways show traffic weights; eval tools show scores; none joins per-arm eval and feedback to the traffic share with a promote/rollback action. MLflow aliases are the closest semantics but have no screen for served models.
4. **Improvement loop as a state machine per use case.** OpenAI's loop stops at re-eval; nothing shows production data → dataset → specialist training → eval against the incumbent → canary → promote with the current stage visible, and no training monitor says which alias and version the job will become.
5. **Internal evaluation index on in-house tasks.** Azure ranks public benchmarks (its "try with your own data" is classic-only), Pinterest ranks prompts; nobody ranks own generations against external models on internal tasks with a trade-off chart and a link to deploy.
6. **Forkable blueprints and a provisioning assistant.** Uber starts a fine-tune from a model card, Grab packages apps as API and MCP, Alyx/Loop/Ollie answer questions; nobody offers "fork this use case with routing, eval set, budget and approval template prefilled", nor an assistant that provisions one.

---

## Sources
1. OpenAI, "Model Distillation in the API", https://openai.com/index/api-model-distillation/, 1 Oct 2024.
2. OpenAI Community, "Evals in the OpenAI dashboard", https://community.openai.com/t/evals-in-the-openai-dashboard/1025987, 20 Nov 2024.
3. Claude Support, "Cost and usage reporting in the Claude Console", https://support.claude.com/en/articles/9534590-cost-and-usage-reporting-in-the-claude-console, undated (updated Oct 2026).
4. Google Cloud Blog, "Your ultimate guide to the latest in generative AI on Vertex AI", https://cloud.google.com/blog/products/ai-machine-learning/your-ultimate-guide-to-the-latest-in-generative-ai-on-vertex-ai, 27 Sep 2024.
5. Google Cloud Docs, "Introduction to Model Registry", https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/model-registry/introduction, undated.
6. Microsoft Learn, "Benchmark models in the model catalog", https://learn.microsoft.com/en-my/Azure/foundry/how-to/benchmark-model-in-catalog, 27 May 2026.
7. Microsoft Dev Blogs, "What's new in Microsoft Foundry | May 2026", https://devblogs.microsoft.com/foundry/whats-new-in-microsoft-foundry-may-2026, 30 May 2026.
8. Jannik Reinhard, "How to Evaluate AI Agents in Microsoft Foundry Step by Step", https://jannikreinhard.com/microsoft-foundry-agent-evaluations/, 7 Jul 2026.
9. Hidekazu Konishi, "Prompt Lifecycle Management on AWS", https://hidekazu-konishi.com/entry/prompt_lifecycle_management_on_aws.html, 14 Jul 2026.
10. Hugging Face Docs, "Inference Endpoints: Analytics and Metrics", https://huggingface.co/docs/inference-endpoints/guides/analytics, undated.
11. Hugging Face Changelog, "Filter models by base models only", https://huggingface.co/changelog/filter-models-by-base-models-only, 28 May 2026.
12. Fireworks Docs, "Fine-tuning web UI guide (RFT)", https://docs.fireworks.ai/fine-tuning/web-ui-guide, undated (after 28 Oct 2026).
13. Mistral Docs, "AI Studio", https://docs.mistral.ai/deployment/ai-studio, undated (2026).
14. Cohere Docs, "Fine-tuning with Cohere's Dashboard", https://docs.cohere.com/docs/fine-tuning-with-the-web-ui, undated (deprecation note 15 Sep 2025).
15. Langfuse, "Langfuse July Update", https://langfuse.com/blog/2025-07-31-langfuse-july-update, 31 Jul 2025.
16. LangChain Docs, "LangSmith changelog", https://docs.langchain.com/langsmith/changelog.md, entries 21 Sep–26 Oct 2026.
17. Braintrust Docs, "Glossary", https://docs.braintrust.dev/reference/glossary.md, undated.
18. Arize Docs, "Arize AX", https://www.arize.com/docs/ax, undated.
19. PromptLayer Blog, "Humanloop shutdown: guide to migrating your prompts and evals", https://www.promptlayer.com/blog/humanloop-shutdown-guide-to-migrating-your-prompts-and-evals-to-promptlayer/, 17 Jul 2025.
20. Galileo Blog, "Galileo vs Patronus AI", https://galileo.ai/blog/galileo-vs-patronus, 27 Dec 2025.
21. Helicone Blog, "Helicone vs Comet", https://www.helicone.ai/blog/helicone-vs-comet, 22 Feb 2025.
22. Portkey Docs, "AI Gateway", https://portkey.ai/docs/product/ai-gateway, undated.
23. TrueFoundry Docs, "Intro to LLM Gateway", https://www.truefoundry.com/docs/ai-gateway/intro-to-llm-gateway, undated.
24. Comet, "Braintrust vs Opik", https://www.comet.com/site/products/opik/compare/braintrust-vs-opik/, modified 3 Sep 2026.
25. MLflow Docs, "Manage prompt lifecycles with aliases", https://mlflow.org/docs/latest/genai/prompt-registry/manage-prompt-lifecycles-with-aliases/, 2025.
26. Databricks Docs, "Prompt Registry (MLflow 3)", https://docs.databricks.com/aws/en/mlflow3/genai/prompt-version-mgmt/prompt-registry/, 15 Sep 2026.
27. Databricks Docs, "AI Gateway (legacy) on model serving endpoints", https://docs.databricks.com/aws/en/ai-gateway/overview-serving-endpoints, 8 Oct 2026.
28. Databricks Docs, "AI Playground", https://docs.databricks.com/aws/en/large-language-models/ai-playground, 14 Oct 2026.
29. AWS Docs, "Model Registration Deployment with Model Registry", https://docs.aws.amazon.com/sagemaker/latest/dg/modelregistryfaq.html, undated.
30. Uber Engineering, "Navigating the LLM Landscape: Uber's Innovation with GenAI Gateway", https://www.uber.com/en-GB/blog/genai-gateway/, 11 Jul 2024.
31. Uber Engineering, "From Predictive to Generative: How Michelangelo Accelerates Uber's AI Journey", https://www.uber.com/pa/en/blog/from-predictive-to-generative-ai, 2 May 2024.
32. ByteByteGo with LinkedIn Engineering, "The Evolution of LinkedIn's Generative AI Tech Stack", https://blog.bytebytego.com/p/the-evolution-of-linkedins-generative, 28 Oct 2025.
33. ZenML LLMOps Database, "Democratizing prompt engineering through platform architecture" (Pinterest), https://www.zenml.io/llmops-database/democratizing-prompt-engineering-through-platform-architecture-and-employee-empowerment, 2025.
34. Grab Engineering, "SpellVault: evolution beyond LLM", https://engineering.grab.com/spellvault-evolution-beyond-llm, 21 Nov 2025.
35. ZenML MLOps Database, "Netflix Metaflow: Spin" (summary of Netflix Tech Blog), https://www.zenml.io/mlops-database/netflix-metaflow-platform-for-diverse-ml-systems-metaflow-spin-interactive-stateful-step-execution-to-speed-up-ml-iterat, 2025.
36. Machine Learning at Scale, "Meta's AI platform for engineers across the company" (Looper), https://www.machinelearningatscale.com/meta-ai-platform/, undated.
37. ZenML LLMOps Database, "Building an Enterprise LLMOps Stack: Lessons from DoorDash", https://zenml.io/llmops-database/building-an-enterprise-llmops-stack-lessons-from-doordash, 2023.
