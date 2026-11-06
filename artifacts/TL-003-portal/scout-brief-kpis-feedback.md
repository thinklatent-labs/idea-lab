<!-- Exported from Idea Lab project knowledge (claude/scout-brief-kpis-feedback.md, created 2026-11-02T08:02:10.407212Z) on 2026-11-04. Read-only mirror; edit the project doc, not this file. -->
# Scout brief: temporal KPIs, derived metrics, feedback-loop data and proactive intelligence for an internal LLM-platform portal

As of 2026-11-02. Public sources only. Scope: what mature LLM-ops, ML-platform, observability and product-analytics products do with (A) time, (B) ratios and composites, (C) feedback capture, (D) proactive delivery, and (E) what an internal portal with per-use-case telemetry, quality, routing-alias canaries, an improvement loop, a training monitor, a model registry and an evaluation index should adopt. *(unverified)* marks claims not confirmed from a fetched source.

## A. Temporal KPIs: how products express time

| Framing | Product and exact framing | Decision supported |
|---|---|---|
| Full-granularity long retention | Datadog LLM Observability: span count, duration, errors; input/output/reasoning tokens; cache read/write/non-cached tokens; estimated cost in nanodollars; 100% of traffic; 15 months at full granularity [1] | Year-long trends; sets the portal's retention target |
| Time buckets with group-by | OpenAI Usage API: buckets with start/end time; group by project, user, API key, model, batch, service tier; input_tokens, output_tokens, input_cached_tokens, num_model_requests; separate Costs endpoint [20]. 1 min/1 h/1 d widths *(unverified)* | Chargeback per use case; cost run-rate |
| One time range, per-chart bucket override | LangSmith dashboards: count; latency avg/p50/p99; TTFT p50/p99; tokens and cost (sum/avg/percentile); feedback avg/min/max; a *ratio* of two filtered series for error rate; group by run name, tag, metadata, feedback label [12] | Error rate over time; latency by model; prompt-version comparison |
| Curated plus custom dashboards | Langfuse: Latency, Cost, Usage dashboards; count, p95 latency, cost, scores; group by user, model, time, trace name; trace/user/session aggregation [7] | Per-use-case cost and latency drill-down |
| Streaming-specific latency | Bedrock/CloudWatch: TimeToFirstToken (streaming only), InvocationLatency to last token, InvocationThrottles, client/server errors, EstimatedTPMQuotaUsage (not for capacity planning alone), cache read/write tokens; ModelId and ContextWindow dimensions [24] | Throttle trend; quota headroom |
| Requests, TTFT, tools over time | Braintrust: requests, duration and TTFT, tokens, estimated cost with cache tokens and pricing tiers, online scores, tool-call frequency and success; group by model, environment, user, metadata [16] | Score regressions over time |
| Rolling 28 days, 6-month weekly trendline, 12-week levels | Microsoft Copilot Dashboard: active user = >=1 action in previous 28 days; Power (>=15 actions/week in >=9 of 12 weeks), Habitual, Novice, Other; week-over-week level distribution; returning users = active in current and preceding period; up to 6-day delay; minimum group size [30] | Adoption, intensity, retention per use case |
| Trailing 28-day cohorts recalculated daily | GitHub Copilot metrics: DAU/WAU/MAU, acceptance rate, lines suggested/added/deleted, PR counts, median time to merge; adoption phases (Passive, Code first, Agent first, Multi-agent) need >=2 active days; no backfill [31] | Time-to-X; adoption-phase migration |
| Retention curves by cohort | Amplitude: "Return On" (N-day), "Return On or After" (unbounded), custom brackets; cohort by starting event; Change Over Time aligns a dip with a release [27] | Is the use case sticky; did a migration change behaviour |
| Stickiness and period growth | Pendo PES: stickiness = DAU/MAU; growth from quick ratio vs previous period; trend of four preceding periods [29] | One engagement number per use case |
| Window vs previous window, window vs baseline | Databricks Lakehouse Monitoring: profile metrics per window x slice; drift table with *consecutive* and *baseline* types; granularities per monitor; 30-day lookback [22] | Release-over-release and drift comparisons |
| Moving or fixed baselines | Arize: baseline = pre-production set or fixed/moving window (last 30/60 days); saved baselines across model versions; hourly granularity under 3 days; autothreshold = 14-day mean +/- 1 SD [6] | Drift alerts without hand-set thresholds |
| Scheduled vs on-demand jobs | Vertex AI Model Monitoring: scheduled or on-demand runs against baseline/target datasets [23]; JS and L-infinity distances *(unverified)* | Periodic drift checks |
| Seasonality-aware bands | Datadog anomaly monitors: basic (rolling quantile), agile (robust SARIMA), robust (seasonal-trend decomposition); hourly/daily/weekly seasonality; needs 3x the period, uses up to 6 weeks [3]. Amplitude: Prophet; agile = 95% CI over 120 days with daily/weekly seasonality; robust = 365 days [26]. Mixpanel: confidence interval; hourly alerts give more false positives [28] | Hour-of-day and day-of-week-aware spike detection |
| Forecast to threshold crossing | Datadog forecast monitors: linear or seasonal (>=2 seasons); windows 12 h to 3 months; warn a week before a disk fills [4]. Amplitude: forecast period in months [26] | Capacity and budget exhaustion dates |
| Error-budget burn rate | SRE Workbook: burn rate 1 exhausts the budget at window end; for 99.9%: 14.4x over 1 h / 5 min short (2% budget, page), 6x over 6 h / 30 min (5%, page), 1x over 3 d / 6 h (10%, ticket); short window = 1/12 of long [25] | Page vs ticket on per-use-case SLOs |
| Scheduled analysis with compare-to | Datadog Patterns: daily/weekly/custom runs, "Compare to" previous run, NEW label on new topics [2]. LangSmith Insights: daily 08:00 UTC, weekly or cron; relative ranges resolved at run time; compare saved reports [13] | Week-over-week change in what users ask |
| Threshold-for-duration alerts | Braintrust: error rate >5% for 10 min, daily cost over budget, score <0.8 [16]. Langfuse: lookback 1 h/1 d/1 w; static thresholds only; renotify 1-10,080 min; no-data modes [11] | Operational alerting |
| Pre-deploy model comparison | New Relic AI Monitoring: response time, tokens, errors, model cost/performance across environments, feedback correlated with responses [5] | Model choice before rollout |
| Gateway analytics | Portkey: cost, tokens, mean latency, requests, users; requests rescued by gateway strategies; cache latency and cost savings; per-metadata success rate and "last seen"; no period comparison documented [17]. Helicone: cache hits, cost and time saved per user [18] | Fallback and cache value |
| Sampled judge trend | W&B Weave monitors: random sampling plus filters, LLM-judge scorers, compare snapshots to spot drift [19] | Quality trend without scoring every call |

Gap: no fetched product names *time to first call* or *time to production*; those come from the use-case record (approval, first call, first canary, migration dates) *(absence unverified)*.

## B. Derived metrics

### Secondary (one ratio or grouping)

| Metric | Formula / grouping | Inputs | Used by | Decision |
|---|---|---|---|---|
| Automation rate | involvement x resolution; involvement = AI-involved / all conversations; resolution = resolved / involved; by topic | conversation log, involvement and resolution flags | Intercom Fin [40] | Separate coverage from quality problems |
| Goodput, SLO attainment | requests/s meeting both TTFT and TPOT SLOs; attainment = share meeting (e.g. 90% with TTFT <200 ms, TPOT <50 ms) | per-request TTFT, decode time, output tokens | DistServe [38] | Capacity in SLO units, per task |
| Burn rate | error rate / (1 - SLO); budget consumed = rate x window / period | SLI events, target | SRE Workbook [25] | Page or ticket |
| Cache efficiency | cache_read / all input tokens; savings = cache_read x price delta; cached reads exempt from TPM quota | cache token metrics | Datadog [1], Bedrock [24], Portkey [17] | Prompt layout, cache-friendly routing |
| Acceptance rate | accepted / shown | UI events | GitHub [31]; Ziegler et al. [32] | Headline quality signal |
| Persistence, edit distance | share of accepted output unchanged after 30 s, 2, 5, 10 min; fuzzy = Levenshtein <33% | accepted text, later state | Ziegler et al. [32] | How much output survives editing |
| Satisfaction rate | thumbs-up / reactions, rolling 28 days; hidden below 30 responses from 5 users | thumbs events | Copilot Dashboard [30] | Feedback-weighted quality with a privacy floor |
| Rate from boolean score | mean of a boolean score = share true (hallucination rate); ratio of two filtered counts | scores | Langfuse [11], LangSmith [12] | Any judge becomes a trend |
| Rescued-request rate | rescued by fallback or retry / total | gateway events | Portkey [17] | Value of fallback routing |
| Quality per request shape | per-topic cost, errors, median latency, evals, dataset coverage | cluster label per trace | Datadog Patterns [2], LangSmith Insights [13] | Apply the same grouping to input x output buckets; no vendor buckets by length *(absence unverified)* |
| Cost per unit of quality | cost / score by model, environment, user | cost, online scores | Braintrust [16], W&B [19] group both; no named metric found *(unverified)* | Model and routing choice |
| Adoption multiplier | merged PRs per engaged user / per passive user (20/10 = 2x) | outcome events, cohort flag | GitHub impact dashboard [31] | Same shape gives specialist-vs-generalist uplift |
| Assisted hours and value | actions x assistance factor (6 min); hours x $72/h default | action counts | Copilot Dashboard [30] | Cost per business outcome once spend is joined |
| Stickiness, quick ratio | DAU/MAU; (new + recovered) / dropped | user activity | Pendo [29] | Engagement per use case |
| Tabular drift | categorical: chi-squared, TV, L-infinity, JS; numeric: KS, Wasserstein, PSI (<0.1 none, 0.1-0.2 moderate, >=0.2 significant); avg_delta of a length column = output-length drift | windowed profiles, baseline | Databricks [22]; Arize PSI/KL/KS/JS, % unseen categories, % out of range [6] | Retrain or investigate |
| Embedding drift | domain-classifier ROC AUC as score (default, e.g. 0.55); share of drifted components (Wasserstein 0.1 per dim, 20% share); Euclidean distance to track size | reference and current embeddings | Evidently [35] | Input drift for text |

### Tertiary (composites, scores, alert logic)

| Composite | Logic | Used by | Decision |
|---|---|---|---|
| Canary score | per-metric Mann-Whitney U at 98% confidence; High/Low only if CI outside +/-25% tolerance and effect exceeds allowed change, direction-aware; critical breach scores 0; weighted pass-%; >=50% no-data fails; pass/marginal thresholds | Kayenta [39] | Automatic promote/rollback of an alias canary |
| Pairwise ranking with uncertainty | Bradley-Terry by reweighted MLE; sandwich CIs; active sampling of pairs that shrink CIs most | Chatbot Arena [34] | Specialist vs generalist with CIs |
| Multiwindow burn-rate alert | long and short windows both above threshold; 1/12 ratio | SRE Workbook [25] | Precision, recall, reset time |
| Seasonal band and forecast | SARIMA/decomposition or Prophet band; forecast bound vs capacity = headroom days | Datadog [3][4], Amplitude [26], Mixpanel [28] | Exhaustion dates |
| Autothreshold | 14-day mean +/- 1 SD | Arize [6] | Monitors without tuning |
| Product Engagement Score | (adoption + stickiness + growth) / 3, each 0-100 | Pendo [29] | One number per use case |
| Usage levels | Power/Habitual/Novice from 12-week counts | Copilot Dashboard [30] | Who to onboard, who is churning |
| Feedback-weighted judge quality | human-vs-AI agreement from queues; judge calibration on reviewer labels | Langfuse [10] | Trust a judge before acting |
| Hierarchical usage clusters | facets (topic, turns, language) -> embeddings -> clusters -> privacy-screened summaries; cluster rate vs base rate | Clio [33]; Patterns (UMAP + HDBSCAN, outliers group) [2]; Insights [13] | New failure clusters, coverage gaps |
| Prompt-version regression | score(n) - score(n-1) on matched traffic; version metadata must be on root and LLM runs | LangSmith [12], Braintrust [16]; Kayenta logic for confidence | Roll back a prompt |

## C. Data to capture for feedback loops

| Signal | How captured | Source | Unlocks |
|---|---|---|---|
| Explicit thumbs, ratings, comments | Browser SDK `score()` with trace id, name, value, type, comment; scores-only API key; backend returns the active trace id to the frontend | Langfuse [9] | Filter by score, route to annotation, judge ground truth; low response rate and negative skew noted |
| Implicit copy, accept, retry, regenerate, time on output | stored as scores; backend `create_score` for later signals; judge as implicit-at-scale | Langfuse [9] | High-volume quality proxy |
| Acceptance and persistence | editor events: shown, accepted, unchanged after 30 s-10 min, Levenshtein fuzzy persistence; acceptance rate correlated best with perceived productivity; lower in weekday working hours than nights and weekends | Ziegler et al. [32]; GitHub [31] | Edit distance to final human version; time-of-day effects |
| Click-style implicit feedback | treat as *relative* preferences; "Click > Skip Above" agreed with judges ~81%; position and trust bias | Joachims et al. [36] | Read regenerate/retry as a preference between outputs |
| Outcome events | ticket-resolution score from the backend; involvement and resolution flags; PR merged, time to merge | Langfuse [9], Fin [40], GitHub [31] | Cost per outcome, deflection, delayed-label joins |
| Pairwise preference | anonymous side-by-side, win/tie/both-bad, identity revealed after voting; pairwise queues (A/B/Equal per rubric item) | Chatbot Arena [34]; LangSmith [15] | Bradley-Terry ranking, DPO pairs |
| Annotation queues | rules add items matching filters (errors, low scores; threads when idle); rubric keys; notes; assertions saved as expected outputs; add to dataset; reservations; reviewers blind to each other | LangSmith [15]; Langfuse: score configs, corrected outputs, keyboard-driven, human-vs-AI agreement, API-managed [10] | Labels, regression tests, judge calibration |
| Stored completions with metadata | `store=true` plus user/session metadata; review, filter, tag into datasets; evals from stored completions; fine-tune a student and compare with the teacher; capture more examples where the model underperforms | OpenAI [21]; >=30-day retention for stored Responses [20] | Train-from-production loop |
| Online scoring, dataset flagging | online scoring on production; sampled judges; flag examples worth adding; auto-curate datasets for under-covered topics | Braintrust [16], W&B [19], Patterns [2] | Eval coverage per topic |
| Prompt versions, experiments | metadata on root and LLM runs; tags fixed at creation, scores mutable | LangSmith [12], Langfuse [8] | Version-over-version comparison |
| Session, cohort, role | session scores; `_user` metadata; group by user or API key; cohorts by group/org/function with minimum size; facets with minimum unique users and screened summaries | Langfuse [8], Portkey [17], OpenAI [20], Copilot [30], Clio [33] | Cohort views with a privacy floor |
| Harness and agent actions | tool spans; tool run counts, errors, latency; tool-call success; throttles | Datadog [1], LangSmith [12], Braintrust [16], Bedrock [24] | Agent-step quality |
| RLHF data | demonstrations (SFT), labeler rankings of several outputs (reward model), RL; 1.3B aligned model preferred over 175B base | InstructGPT [37] | What the specialist pipeline needs from the queues |
| Delayed labels | InferenceLog profile needs model id, prediction and label columns | Databricks [22] | Delayed-outcome join design |

## D. Proactive, product-level intelligence

| Product | What is pushed | Evidence of value |
|---|---|---|
| Datadog | Seasonal anomaly monitors; forecast monitors that warn before a threshold is crossed [3][4]; scheduled Patterns with NEW topics, evaluation-coverage gaps, auto-curated datasets [2] | Vendor docs only |
| LangSmith Insights Agent | Scheduled executive summary: % of traces per pattern, notable traces, poor interactions clustered by root cause; GA 2025-10-23; about $1-2 per 1,000 threads [13][14] | Vendor claim that manual trace review does not scale |
| Langfuse | Alerts to Slack, webhook or GitHub Actions (can trigger a re-eval); static thresholds only [11] | None published |
| Braintrust | Threshold alerts by email, Slack, webhook [16] | None published |
| Arize | 14-day autothresholds; heatmap of worst-performing slices [6] | None published |
| Amplitude | Emailed digest of all project anomalies; automatic and custom Insights monitors [26] | None published |
| Mixpanel | Threshold, change-vs-previous and anomaly alerts; AI root-cause analysis launched from the notification; weekday-only windows [28] | RCA added after anomaly detection *(changelog date unverified)*, suggesting alerts alone were insufficient |
| Microsoft Copilot | Usage-intensity and retention insights; internal and external benchmarks [30]; feedback-exploration agent *(page thin, unverified)* | Vendor docs only |
| GitHub Copilot | Impact dashboard: adoption multiplier, industry comparison, leverage ratio [31] | Acceptance rate validated against surveys [32] |
| Anthropic Clio | Bottom-up use clusters; found an SEO-spam account network no single conversation would flag; agreed with safety classifiers (r = 0.71) and cut false positives; no automated enforcement [33] | Operational outcomes reported by the vendor |
| W&B Weave | Flags production examples worth adding to datasets [19] | None published |
| Fin | Automation rate by topic [40] | None published |

Assessment: evidence that users value proactive insight is thin and vendor-authored. The strongest independent evidence is Ziegler et al.: acceptance rate tracks perceived productivity, so a weekly "acceptance fell in use case X" card is defensible. No fetched product issues a "switch this task to a smaller model" recommendation; New Relic and Braintrust show cost-vs-performance and leave the call to the user *(absence unverified)*. Academic work on proactive insight delivery was not searched in this pass.

## E. Feature scan (ranked)

| # | Feature | Source | What it does | Why | Type |
|---|---|---|---|---|---|
| 1 | Time-bucketed metric store with long full-granularity retention; group by use case, model, alias, prompt version, cohort | [1][20] | Turns the static inventory into series | Everything else depends on it | Table stakes |
| 2 | Prebuilt per-use-case dashboard: count, latency and TTFT p50/p99, tokens, cost, error ratio, feedback | [12][7][16] | Standard first screen | Present in every mature tool | Table stakes |
| 3 | SLO per use case with error budget, multiwindow burn-rate alerts, goodput as capacity unit | [25][38] | Page vs ticket; SLO-respecting capacity | No LLM-ops vendor does burn rate | Differentiator |
| 4 | Rolling-28-day adoption, Power/Habitual/Novice levels, returning-user retention, 6-month trendline | [30][27][31] | Adoption and retention per use case | Only product-analytics tools do this for AI | Differentiator |
| 5 | Scheduled topic clustering with compare-to and NEW labels; per-topic cost, error, latency, eval, coverage | [2][13][33] | Mined tasks become a weekly delta | Finds failure clusters before tickets do | Differentiator |
| 6 | Statistical canary judgement on alias traffic | [39][34] | Mann-Whitney per metric, critical metrics, composite score | Makes migrate/rollback automatic | Differentiator |
| 7 | Score data model (numeric/categorical/boolean on trace/observation/session, comments); boolean mean = rate | [8][11] | One object for judge, human and user signals | Simplifies feedback-weighted quality | Table stakes |
| 8 | Feedback SDK tying explicit and implicit events (copy, accept, retry, regenerate, outcome) to the trace id | [9][32] | Acceptance, persistence, edit distance | Acceptance rate is the validated headline signal | Table stakes |
| 9 | Rule-fed annotation queues with rubrics, corrections as expected outputs, add-to-dataset, human-vs-judge agreement | [15][10] | Labels and judge calibration | Needed before trusting judge scores | Table stakes |
| 10 | Stored-completion loop: filter/tag, dataset, eval, train specialist, compare with teacher | [21] | Improvement loop with a compare step | Adopt metadata filtering and teacher comparison | Table stakes |
| 11 | Input/output drift with consecutive vs baseline windows, PSI bands, embedding drift via domain classifier | [22][6][35] | Drift scores incl. output-length drift | Early warning for retraining | Differentiator |
| 12 | Seasonal anomaly bands and forecast-to-threshold | [3][4][26] | Headroom days, run-rate vs budget | Dates leaders ask for | Differentiator |
| 13 | Alerts with Slack/webhook/CI triggers, for-duration thresholds, no-data handling | [11][16] | Operational alerting | Expected by every team | Table stakes |
| 14 | Cache efficiency and rescued-request panels | [1][24][17] | Hit ratio, savings, fallback value | Cheap cost lever | Table stakes |
| 15 | Pairwise preference capture, Bradley-Terry with CIs | [34][15] | Specialist vs generalist with uncertainty; DPO pairs | Feeds the training loop | Differentiator |
| 16 | Impact composites: assisted hours/value, adoption multiplier, satisfaction rate with suppression floor | [30][31] | Business-facing numbers | Exec reporting per use case | Differentiator |
| 17 | Weekly digest with % of traffic per pattern and trace links | [13][26] | Push, not pull | The proactive surface teams read | Differentiator |
| 18 | Period-over-period controls, change-vs-previous alerts | [28][27] | WoW/MoM deltas | Missing today | Table stakes |
| 19 | Privacy floor on cluster summaries (minimum users, screened text) | [33][30] | Safe aggregation | Required in a regulated setting | Table stakes |
| 20 | Root-cause analysis launched from an alert | [28] | Explains the spike | Later phase | Differentiator |

## Sources

1. Datadog, "LLM Observability metrics" (docs), https://docs.datadoghq.com/llm_observability/monitoring/metrics/ , undated, as of 2026-11-02
2. Datadog, "Patterns" (docs), https://docs.datadoghq.com/llm_observability/monitoring/patterns/ , undated
3. Datadog, "Anomaly monitors" (docs), https://docs.datadoghq.com/monitors/types/anomaly/ , undated
4. Datadog, "Forecast monitors" (docs), https://docs.datadoghq.com/monitors/types/forecasts/ , undated
5. New Relic, "Introduction to AI monitoring" (docs), https://docs.newrelic.com/docs/ai-monitoring/intro-to-ai-monitoring/ , undated (GA 2024-03-28)
6. Arize, "ML product overview" (docs), https://arize.com/docs/ax/machine-learning/machine-learning/how-to-ml/product.md , undated
7. Langfuse, "Custom dashboards" (docs), https://langfuse.com/docs/metrics/features/custom-dashboards , undated
8. Langfuse, "Scores overview" (docs), https://langfuse.com/docs/evaluation/scores/overview , undated
9. Langfuse, "User feedback" (docs), https://langfuse.com/docs/observability/features/user-feedback , undated
10. Langfuse, "Annotation queues" (docs), https://langfuse.com/docs/evaluation/evaluation-methods/annotation-queues , undated (video 2025-12-19)
11. Langfuse, "Monitors and alerts" (docs), https://langfuse.com/docs/metrics/features/monitors , undated (monitors changelog 2026-06-19, unverified)
12. LangChain, "LangSmith dashboards" (docs), https://docs.langchain.com/langsmith/dashboards , undated
13. LangChain, "LangSmith Insights" (docs), https://docs.langchain.com/langsmith/insights , undated
14. LangChain blog, "Improve agent quality with Insights Agent and Multi-turn Evals", https://www.langchain.com/blog/insights-agent-multiturn-evals-langsmith , 2025-10-23
15. LangChain, "LangSmith annotation queues" (docs), https://docs.langchain.com/langsmith/annotation-queues , undated
16. Braintrust, "Monitor" (docs), https://docs.braintrust.dev/deploy/monitor , undated
17. Portkey, "Analytics" (docs), https://portkey.ai/docs/product/observability/analytics , undated
18. Helicone, "Features / caching" (docs), https://docs.helicone.ai/features , undated
19. Weights & Biases, "Online evaluations" (Weave), https://site.wandb.ai/online-evaluations , modified 2026-04-03
20. OpenAI, "Usage and Costs API reference", https://developers.openai.com/api/docs/api-reference/usage , undated; "Your data" guide, https://developers.openai.com/api/docs/guides/your-data , undated
21. OpenAI, "Model Distillation in the API", https://openai.com/index/api-model-distillation/ , 2024-10-01
22. Databricks, "Monitor metric tables" (Lakehouse Monitoring docs), https://docs.databricks.com/aws/en/lakehouse-monitoring/monitor-output , undated
23. Google Cloud, "Introduction to Vertex AI Model Monitoring" (docs), https://docs.cloud.google.com/vertex-ai/docs/model-monitoring/overview , undated (body truncated in fetch)
24. AWS, "Monitor bedrock-runtime inference using CloudWatch metrics" (docs), https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-runtime-metrics.html , undated
25. Google, "Site Reliability Workbook, ch. 5: Alerting on SLOs", https://sre.google/workbook/alerting-on-slos/ , 2018
26. Amplitude, "Anomaly + Forecast" (docs), https://www.amplitude.com/docs/analytics/anomaly-forecast , updated 2026-10-27
27. Amplitude, "Interpret your Retention Analysis chart" (docs), https://amplitude.com/docs/en/analytics/charts/retention-analysis/retention-analysis-interpret , updated 2026-09-08
28. Mixpanel, "Alerts" (docs), https://docs.mixpanel.com/docs/features/alerts , undated (sample payload 2026-02-06)
29. Pendo, "Product Engagement Score (PES)" (help center), https://support.pendo.io/hc/en-us/articles/360054782691 , updated 2026-01-16
30. Microsoft Learn, "Use Microsoft Copilot Dashboard advanced features with a Viva Insights subscription", https://learn.microsoft.com/viva/insights/org-team-insights/copilot-dashboard-advanced-features , updated 2026-10-07
31. GitHub Docs, "Copilot metrics" (concepts), https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/copilot-metrics , undated (org-level reports from 2025-12-12)
32. Ziegler et al., "Measuring GitHub Copilot's Impact on Productivity", Communications of the ACM, https://cacm.acm.org/research/measuring-github-copilots-impact-on-productivity , 2024 (arXiv 2205.06537, 2022)
33. Anthropic, "Clio: Privacy-Preserving Insights into Real-World AI Use", https://anthropic.com/news/clio , 2024-12-12
34. Chiang et al., "Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference", https://arxiv.org/html/2403.04132v1 , 2024-03-07
35. Evidently AI, "Embedding drift detection: which test is best?", https://evidentlyai.com/blog/embedding-drift-detection , 2023-05-17, updated 2025-07-16
36. Joachims et al., "Accurately Interpreting Clickthrough Data as Implicit Feedback", SIGIR 2005, https://www.sigir.org/wp-content/uploads/2017/06/p003.pdf , 2005
37. Ouyang et al., "Training language models to follow instructions with human feedback" (InstructGPT), https://arxiv.org/abs/2203.02155 , 2022-03-04
38. Hao AI Lab, "DistServe: disaggregating prefill and decoding for goodput-optimized LLM serving" (blog), https://haoailab.com/blogs/distserve/ , 2024-03-17
39. Spinnaker/Kayenta, "How canary judgment works" (docs), https://spinnaker.io/docs/guides/user/canary/judge , undated
40. Intercom Fin, "Fin AI Agent automation rate" (help center), https://fin.ai/help/en/articles/13976251-fin-ai-agent-automation-rate , 2026-06-23
