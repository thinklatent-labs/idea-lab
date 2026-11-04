<!-- Exported from Idea Lab project knowledge (claude/scout-brief-vi-portal.md, created 2026-11-02T06:34:38.647705Z) on 2026-11-04. Read-only mirror; edit the project doc, not this file. -->
# Scout brief: internal model portal — what exists, what to borrow, what is missing

Mode: Scout. Prepared 2026-11-02 from public web sources only; no firm, product or internal numbers were used in queries. Dates in Sources are published dates where shown, otherwise the fetch date. *Unverified* marks secondary, undated or vendor-claimed items.

Portal surfaces used to judge gaps: (1) catalogue and cards linked to use cases; (2) per-use-case live view; (3) improvement loop to specialist model, canary, migration; (4) blueprints; (5) onboarding assistant; (6) governance.

## A/B. Comparables by category

### 1. Enterprise model catalogues and model cards

| Example | Does well | Borrow | Gap |
|---|---|---|---|
| Hugging Face Hub, Enterprise Hub [S1, S2] | Card = README with YAML: `license`, `datasets`, `base_model` (relation inferred: fine-tune, adapter, quantised, merge), `pipeline_tag`, `new_version`, `model-index` eval results rendered as a widget; metadata drives filters and lineage. Enterprise: resource groups, audit logs, SCIM, storage regions, gating group collections. | Machine-readable front matter; `base_model` and `new_version` to express generation and latest; gating groups as the sensitivity-tier pattern. | No link from model to workloads; analytics are downloads, not traffic. |
| Azure AI Foundry catalog [S3] | Filters by collection, lifecycle (Preview, GA, Deprecated), task, features, industry; card tabs Quick facts, Details, Deployments, Benchmarks, License; Compare models; Request a model; retirement schedules; Responsible AI review outcomes. | Lifecycle state and retirement date on every card; the Deployments tab; Request-a-model as a demand signal. | Deployments are endpoints, not business use cases; no per-workload telemetry; generic benchmarks. |
| Databricks Unity Catalog, AI Gateway [S4] | System tables `endpoint_usage` (requester, status, token and character counts, `usage_context` tag, served entity) and `served_entities` (name, version, task, change time); payload logging to Delta; QPM/TPM limits per endpoint, user, principal or group; PII mask or block; percentage split across entities, 0% = fallback-only; two fallbacks on 429/5xx. | The two-table schema as the live-view backbone; `usage_context` for attribution; the 0% fallback slot. | Admin-only tables, about an hour of latency; no narrative card, task mining or training action. |
| SageMaker Model Registry cards [S5] | Cards attached to registered versions; register early with business metadata; one governance view across train, evaluate, deploy. | Card per version; register before production. | Classic ML; no LLM traffic or use-case view. |

### 2. LLM observability and usage analytics

| Example | Does well | Borrow | Gap |
|---|---|---|---|
| Langfuse [S6] | Traces, sessions, per-user cost; threshold alerts to Slack and webhooks; LLM-as-judge on production traces; annotation queues; end-user feedback SDK; numeric, boolean, categorical scores; prompt versions compared on latency, cost, eval. | Alerting; annotation queues; three-type score schema; prompt-version-to-trace link. | No SLO view per use case, no input-length distribution, no prompt clustering. |
| LangSmith Insights Agent [S7] | Clusters production traces into categories and subcategories by initial request; separately clusters poor interactions by root cause; latency, run counts and evals split by category; category to dataset or annotation queue in one click; saved configs; report within 15 minutes. | The published shape of "tasks hiding behind one model". | Cloud Plus/Enterprise only; no training or routing action follows. |
| Arize cluster summarisation [S8] | Groups prompt or response embeddings; an LLM writes a summary per cluster; poor-response clusters locate work. | Summaries written by the team's own model. | Summaries go to OpenAI by default; no privacy thresholds. |
| Anthropic Clio [S9] | Facet extraction, semantic clustering, titles that omit private details, multi-level hierarchy, minimum unique-user threshold, automated privacy check of summaries, analyst explorer. | The privacy design for content insights. | Internal system; built for consumer chat. |

### 3. AI gateways: routing, canary, governance

| Example | Does well | Borrow | Gap |
|---|---|---|---|
| LiteLLM proxy [S10] | Virtual keys per user or team; `max_budget`, `budget_duration`, temporary increases with expiry, self-serve budget policy (disabled, lower_only, ceiling); tpm, rpm, parallel limits; per-key model lists; model aliases mapped to model groups so traffic shifts by changing the mapping; spend per key, user, team, end user; policy hooks; scheduled rotation; required tags. | A stable use-case alias over a changing model group: the mechanism for 5/50/100 and migration without client changes; budget ceilings; required tags. | No feedback attribution per target. |
| Portkey [S11] | Canary = `loadbalance` with per-target `weight` (0.95/0.05) and `override_params` to swap the model per target; analytics compare cost, latency, errors, feedback across targets. | Weighted targets with per-target model override. | No stepped schedule; feedback-to-target attribution not described. |
| Kong AI Gateway [S12] | Token quotas by user, model and time window; token-spend tracking; semantic caching; prompt guards; MCP tool generation; audit of agent-to-agent calls. | Token quotas per model; MCP generation once blueprints add agents. | No canary or training loop. |
| Uber GenAI Gateway [S13] | OpenAI-mirrored interface so LangChain and LlamaIndex work unchanged; vendor and self-hosted models behind one API; PII replaced by numbered placeholders and restored on return; auth, metrics, audit logs for per-team cost; about 30 teams, 16M queries a month (July 2024). | One security review at the gateway; PII tokenisation before vendor models. | Internal; no catalogue or use-case view. |

### 4. Production-data-to-fine-tune loops

| Example | Does well | Borrow | Gap |
|---|---|---|---|
| OpenAI model distillation [S14] | `store=true` captures pairs with no latency; review, filter, tag into datasets; Evals set the small model's baseline; fine-tune; re-run Evals; iterate on underperforming examples. | The four-step loop as the UX of "train a specialist"; capture by default. | No task discovery; vendor-hosted; no canary. |
| OpenPipe [S15] | Drop-in OpenAI client; metadata tags such as `prompt_id`; log filters feed datasets directly; log both base and fine-tuned models. Docs say "searchable metadata tags are highly recommended." | Log incumbent and candidate under the same tags so canary comparison is free. | Hosted; no routing. |
| Predibase LoRAX [S16] | Many adapters served from one GPU; FP8; vendor claims 3–4x faster serving and 10,000+ SLMs fine-tuned (*unverified*). | Multi-adapter serving so a specialist per use case does not cost a GPU. | Marketing claims; no loop UI. |

### 5. Blueprints and reference implementations

| Example | Does well | Borrow | Gap |
|---|---|---|---|
| NVIDIA Blueprints [S17] | Each = NIM microservices, reference code, Helm chart, customisation guide; monthly releases; partner evaluation and monitoring; a "data flywheel" where interactions refine the model. | Deploy chart and customisation guide with every blueprint; a release cadence. | NIM-centric; no inner-source governance. |
| Microsoft AI app templates [S18] | Building blocks (endpoint load balancing, document-level security trimming, Locust load test, keyless auth) plus end-to-end solutions; `azd` provisioning; Azure Monitor; AI-assisted evaluation flows. | The building-block tier; security trimming suits a regulated firm. | Cloud-specific; CI/CD not described. |
| Google agent-starter-pack [S19] | Templates (ADK, agentic RAG, LangGraph, live multimodal); every project gets CI/CD, observability, Vertex evaluation, playground, Terraform; `create` and `enhance` (retrofit an existing agent); remote templates from any Git repo. Archived; successor `agents-cli`. | `enhance` to retrofit gateway and observability; remote templates as inner-source distribution. | Archived; cloud-specific. |

### 6. Internal AI platforms at large firms

| Example | Employees get | Drove adoption | Gap |
|---|---|---|---|
| JPMorganChase LLM Suite [S20] | About 200,000 of roughly 250,000 staff (May 2025); abstraction layer to swap models by task; vetted internal data; new models vetted before listing. | Self-service firmwide; only compute is variable cost so unused seats cost nothing; a "big, big bet" on access. | Assistant, not developer platform. |
| Goldman Sachs GS AI [S21] | 46,000 staff; choice of newest vendor models; automated tests decide which model to favour per question; prompts screened; over 1M prompts a month. | Year-long pilot across all levels with sample Q&A as benchmarks; readiness gates on data and safety; training; ROI tracked (developers about 20% more productive). | Vendor models only. |
| Morgan Stanley [S22] | Knowledge assistant; Debrief notes into CRM; over 98% of advisor teams active; document access 20% to 80%. | Advisors graded outputs; daily regression suite; humans review; data-retention worries answered; one win funded the next. Page undated. | Single domain. |
| Wells Fargo [S23] | 245.4M assistant interactions in 2024; orchestration picks the model per task; a small model detects PII; PII never reaches the LLM. | Compound systems over single-model choice; model size matched to job. | Customer-facing. |
| Pinterest [S24] (*unverified*, secondary summary of a talk) | Prompt Hub with cost per million tokens, leaderboards comparing prompts, fine-tuned and distilled models, one-button promotion; batch labelling tool. | "Prompt Doctor" hotline (over 200 sessions), hackathons, GUIs over APIs, production funded after lightweight tools showed demand, docathons. | No model catalogue. |
| Spotify AiKA [S25] | Knowledge assistant inside the developer portal; over 1,000 daily users, 25% weekly, 70% ever. | Conversational access where people work; usage exposed doc gaps that teams fixed; support load fell. | Knowledge Q&A only. |

### 7. Internal developer portals

- Red Hat Developer Hub on Backstage [S26]: model servers as Components (`model-server`), models as Resources (`ai-model`) with license, author, tags; API entities with a testable schema; TechDocs carrying the card, approved use cases, restrictions, sign-up steps, key retrieval and curl/Python samples; software templates asking for server URL, model and secret. Borrow the entity model and "card plus how to call it". Gap: no traffic or loop.
- Spotify Portal AI Gateway plugin [S27]: one admin surface for providers including self-hosted Ollama; defaults by type (language, rerank, embedding, image) consumed by other plugins. Borrow: the portal's own AI features run through the same gateway. Gap: no governance or usage tracking described.
- Port and Cortex: only comparison pages surfaced; no AI-model catalogue feature verified.

### 8. Model card and inventory standards

- Hugging Face [S2]: description, intended uses and limitations (bias, ethics), training, datasets, evaluation; metadata as above.
- EU AI Act Annex IV [S28]: general description and versions; development process including third-party pre-trained components, datasets and dated, signed validation logs; capabilities, limitations, accuracy across user groups; metric justification; risk management; a record of lifecycle changes; post-market monitoring plan. Bearing: the audit trail should be a dated change log per model version and per use case.
- NIST AI RMF GOVERN 1.6 [S29]: inventory mechanisms "resourced according to organizational risk priorities"; playbook attributes are documentation, source links, incident response plans, data dictionaries, AI-actor contacts; a named owner; defined scope and attributes. Read via a Playbook mirror.

### 9. Onboarding assistants inside platforms

- Spotify AiKA [S25]: RAG over TechDocs, ownership, standards, APIs; cites sources; tied to the catalogue and scorecards.
- Backstage catalog-assistant [S30] (community blog, June 2026): keyword retrieval over catalogue entities, prompt restricted to retrieved entities, entity refs as citations, runs on small local models because answers are grounded; weak on multi-hop questions; a confident wrong answer is "worse than no answer at all".
- Azure Request-a-model [S3] and Pinterest Prompt Doctor [S24]: a button and a human hotline as low-tech onboarding paths.

Borrow: ground the assistant in the catalogue and evaluation index with citations; keep a human escalation path. Gap: nothing found recommends model size from an evaluation index.

## C. Additional features to consider (ranked)

| # | Feature | Source | Why |
|---|---|---|---|
| 1 | Cost per use case on the live view, with a vendor-equivalent cost-avoided counter | [S24], [S20], [S6] | Bank adoption turned on cost structure; the live view has no cost line. |
| 2 | Use-case-scoped model alias with a 0% fallback-only slot | [S10], [S4] | Makes 5/50/100 and migration a config change, never a client change. |
| 3 | Lifecycle state, retirement date and latest-version pointer on every card | [S3], [S2] | Generations need a deprecation path or old endpoints never die. |
| 4 | Privacy-thresholded, hierarchical content insights with automated summary checks | [S9] | Output-derived insights on employee traffic need a minimum-user threshold to be safe to show. |
| 5 | The portal as its own first use case: assistant on the in-house model through the gateway, with a public live view | [S27], [S25] | A live demonstration of scale is the cheapest evangelism. |
| 6 | Self-serve budgets: duration, temporary increase with expiry, ceiling policy; token quotas per model | [S10], [S12], [S4] | Usage-based approvals need a budget object, not only an approval. |
| 7 | Mandatory request metadata at key issuance (use case, prompt id, hashed end user) | [S4], [S15], [S10] | Without tags the loop cannot filter datasets or attribute canary feedback. |
| 8 | Category view of mined tasks with metrics split by category and one click to dataset or annotation queue | [S7], [S6] | Turns discovered tasks into a backlog with evidence. |
| 9 | Threshold alerts per use case to chat and webhooks | [S6] | SLOs without alerts are dashboards nobody opens. |
| 10 | Blueprint `enhance` path and a building-block tier including document-level security trimming | [S19], [S18] | Most teams already have an app; retrofitting beats forking. |
| 11 | Multi-adapter serving for specialists | [S16] | Keeps "train a specialist" from costing a GPU per use case. |
| 12 | Inventory fields for audit: owner contact, incident plan link, dated change log, monitoring plan | [S29], [S28] | The governance surface becomes an inventory regulators recognise. |
| 13 | Request-a-model button and an unanswered-questions report from the assistant | [S3], [S25] | Demand signals for the roadmap; doc gaps surface themselves. |
| 14 | Office hours tracked as a funnel stage; daily regression suite shown beside SLOs | [S24], [S21], [S22] | The fastest-adopted tools paired software with people and reliability proof. |
| 15 | PII tokenisation at the gateway before any vendor model | [S13], [S23] | Needed the day blueprints admit vendor models. |

**Table stakes** (every comparable has them): OpenAI-compatible endpoint; per-key and per-team spend with rate limits; request, token, latency and error analytics; searchable trace logs with tags; weight-based traffic split with fallbacks; cards with license, intended use, limitations and eval results; lifecycle state; user feedback scores; datasets with offline evaluation.

**Nobody else does** (differentiators, with warning signs):

- Model card to production use cases to live traffic in one click. Azure stops at endpoints; Hugging Face at downloads. Differentiator.
- The coupled loop (mine tasks, gap against the index, train with an ETA, canary through the gateway, migrate) in one surface. The pieces exist across OpenAI, OpenPipe, LangSmith and Portkey; nobody joins them. Warning: OpenAI's own loop iterates several times before a distilled model passes, so design visible "not ready yet" states rather than a button that is usually greyed out.
- Model-size recommendation from an evaluation index inside a chatbot. Nearest is Goldman's automated model-by-question tests. Warning: grounded assistants fail on compound questions [S30]; make intake a form with the assistant as helper.
- Hiding variant details. Hugging Face and Azure expose lineage; engineers will ask what sits behind the alias. Hide by default, reveal for engineering roles.
- Content insights from outputs using the team's own model. Only Clio does this, internally and with restricted access; the privacy design is part of the feature.

## D. Adoption lessons from internal platforms

1. Remove the per-seat decision: unused access cost nothing, which business leaders accepted [S20].
2. Pilot across every level, use the pilot's Q&A as the benchmark, gate rollout on data and safety readiness, train people [S21].
3. Prove reliability with experts grading outputs and a daily regression suite; keep humans reviewing; answer data-retention worries; let one win fund the next [S22].
4. Put the assistant where people already work; usage exposed documentation gaps that teams then fixed, which cut support load [S25].
5. GUIs over APIs; a human hotline and hackathons; fund production after lightweight tools show demand [S24, *unverified*].
6. Match the native vendor API so switching is seamless; do the security review once at the gateway [S13].
7. Let an orchestration layer pick the model per task so teams do not have to [S23].
8. On every model entry show how to sign up, get a key and call it in curl and Python [S26].

## Sources

| ID | Title | URL | Date |
|---|---|---|---|
| S1 | Hugging Face Hub docs: Enterprise Hub | https://huggingface.co/docs/hub/enterprise-hub | as of 2026-11-02 |
| S2 | Hugging Face Hub docs: Model Cards | https://huggingface.co/docs/hub/model-cards | as of 2026-11-02 |
| S3 | Microsoft Learn: Foundry Models catalog overview | https://learn.microsoft.com/azure/ai-foundry/how-to/model-catalog-overview | as of 2026-11-02 |
| S4 | Databricks docs: Configure AI Gateway on model serving endpoints | https://docs.databricks.com/ai-gateway/configure-ai-gateway-endpoints.html | as of 2026-11-02 (notes a newer Unity Gateway is GA) |
| S5 | AWS What's New: SageMaker Model Registry supports ML governance information | https://aws.amazon.com/about-aws/whats-new/2024/06/amazon-sagemaker-model-registry-machine-learning-governance/ | 2024-06-06 |
| S6 | Langfuse docs: Core features | https://langfuse.com/docs/core-features | as of 2026-11-02 |
| S7 | LangChain blog: Insights Agent and Multi-turn Evals in LangSmith | https://www.langchain.com/blog/insights-agent-multiturn-evals-langsmith | 2025-10-23 |
| S8 | Arize docs: Embedding cluster summarization | https://docs.arize.com/arize/large-language-models/troubleshoot-retrieval-with-vector-stores/embedding-cluster-summarization | as of 2026-11-02 |
| S9 | Anthropic: Clio, privacy-preserving insights into real-world AI use | https://anthropic.com/news/clio | 2024-12-12 (later updated) |
| S10 | LiteLLM docs: Virtual keys | https://docs.litellm.ai/docs/proxy/virtual_keys | as of 2026-11-02 |
| S11 | Portkey docs: Canary testing | https://portkey.ai/docs/product/ai-gateway/canary-testing | as of 2026-11-02 |
| S12 | Kong: AI Gateway product page | https://konghq.com/products/kong-ai-gateway | as of 2026-11-02 |
| S13 | Uber Engineering: GenAI Gateway | https://www.uber.com/us/en/blog/genai-gateway/ | 2024-07-11 |
| S14 | OpenAI: API Model Distillation | https://openai.com/index/api-model-distillation/ | 2024-10-01 |
| S15 | OpenPipe docs: Logging requests | https://docs.openpipe.ai/features/request-logs/logging-requests | as of 2026-11-02 |
| S16 | Predibase press release via Silicon UK: next-gen inference stack for SLM serving | https://www.silicon.co.uk/press-release/predibase-launches-next-gen-inference-stack-for-faster-cost-effective-small-language-model-serving | 2024-10-15 |
| S17 | NVIDIA blog: NIM Agent Blueprints (renamed NVIDIA Blueprints) | https://blogs.nvidia.com/?p=73861 | 2024-08-27 (later modified) |
| S18 | Microsoft Learn: AI app templates | https://learn.microsoft.com/en-us/azure/developer/ai/intelligent-app-templates | as of 2026-11-02 |
| S19 | GitHub: GoogleCloudPlatform/agent-starter-pack README | https://github.com/GoogleCloudPlatform/agent-starter-pack | as of 2026-11-02 (archived) |
| S20 | American Banker: How JPMorganChase democratized employee access to gen AI | https://www.americanbanker.com/news/how-jpmorganchase-democratized-employee-access-to-gen-ai | 2025-05-22 |
| S21 | American Banker: Goldman Sachs staff now write a million gen AI prompts a month | https://www.americanbanker.com/news/goldman-sachs-staff-now-write-a-million-gen-ai-prompts-a-month | 2025-07-25 |
| S22 | OpenAI customer story: Morgan Stanley | https://openai.com/index/morgan-stanley/ | undated (as of 2026-11-02) |
| S23 | VentureBeat: Wells Fargo's AI assistant crossed 245 million interactions | https://www.venturebeat.com/ai/wells-fargos-ai-assistant-just-crossed-245-million-interactions-with-zero-humans-in-the-loop-and-zero-pii-to-the-llm | 2025-04-08 |
| S24 | ZenML LLMOps Database: Pinterest, democratizing prompt engineering (secondary summary of a talk) | https://www.zenml.io/llmops-database/democratizing-prompt-engineering-through-platform-architecture-and-employee-empowerment | 2025 (as of 2026-11-02) |
| S25 | Spotify Backstage blog: AI knowledge assistant and data plugins coming to Portal | https://backstage.spotify.com/blog/aika-data-plugins-coming-to-portal | 2025-04-15 (updated 2026-06-30) |
| S26 | Red Hat Developer: LLMs in Developer Hub, catalog AI assets | https://developers.redhat.com/articles/2024/11/12/llms-developer-hub-catalog-ai-assets | 2024-11-12 |
| S27 | Spotify Portal docs: AI Gateway | https://backstage.spotify.com/docs/portal/core-features-and-plugins/ai-gateway | as of 2026-11-02 |
| S28 | EU AI Act, Annex IV: Technical documentation (artificialintelligenceact.eu) | https://artificialintelligenceact.eu/annex/4/ | as of 2026-11-02 |
| S29 | NIST AI RMF Playbook, GOVERN 1.6 (STIG Viewer mirror) | https://www.stigviewer.com/controls/ai-rmf/GOVERN%201.6 | as of 2026-11-02 |
| S30 | The Platform Log: Catalog-aware LLM Q&A for Backstage (community blog) | https://theplatformlog.pages.dev/catalog-assistant | 2026-06-03 |

Not examined: LinkedIn's GenAI platform post (fetch blocked), Google Vertex Model Garden access-control page (fetch truncated), Port and Cortex AI features, Google Model Cards paper. Treat claims about those as unverified.
