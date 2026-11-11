# ThinkLatent Portal (portal): observability map, 2026-11-11

Lab session · TL-003 portal · Spec. Jithin reviewed Langfuse and asked for its content in the portal, in the portal's own design, at use-case level and rolled up at model level. The serving backend already logs to Langfuse, so every row below is data the backend holds; the portal reads it and does not copy the Langfuse screens.

Sources: Langfuse docs (langfuse.com/docs, /docs/observability/overview, /docs/evaluation/overview, /docs/analytics), read 2026-11-11. Rows marked (K) come from what is generally known of the product, not from those pages, and should be checked against the deployed version before build.

## Rules that do not come from Langfuse

- Open to everyone: steps, timings, tokens, cost and scores, for every use case.
- Text of Try and Integration traffic: members of the use case only (it is sample or synthetic).
- Text of Pilot and Production traffic: sealed on every screen; break-glass for one hour, approved by the Head of ThinkLatent, logged. Langfuse shows this text to anyone with project access; the portal must not. This needs masking at ingestion or a portal-side read that never requests input and output for those environments. Open question for the platform lead (Claude).
- Users are counted, never named.
- A judge score from sampled requests is a signal for the team. Approvals cite the TL Index score only.

## Feature by feature

| Langfuse feature | What it shows | Portal, use-case level | Portal, model level | State |
|---|---|---|---|---|
| Traces | One record per request with steps, timing, inputs, outputs | Traces list and one page per request | Requests by use case and by version on the model page | Built (sample) |
| Nested observations | Steps inside a trace, indented under their parent | Steps list with kind, time, tokens, cost | Time and cost by kind of step | Built, one level deep; deeper nesting for agents not built |
| Timeline | Each step as a bar on a time axis | "Step by step, on the clock" chart | Not applicable | Built |
| Agent graph | An agent's workflow as a graph | Not built | Not built | Next: needed for the Policy lookup agent |
| Sessions | Multi-turn work grouped into one view | Sessions list and replay | Sessions counted in the roll-up | Built |
| Users | Cost and usage per user id | Users table on Sessions, counted not named | Users counted | Built |
| Token and cost tracking | Usage and spend per model call | Per request, per step, per 1,000 requests | Cost per 1,000 by use case and version | Built; cost follows the Official run's cost per task |
| Scores | Numeric, boolean or categorical results on a trace | Scores on each request; Scores and review page | Judge score and feedback by use case | Built |
| LLM-as-a-judge, online evaluation | A model scores live traces | "Quality, from the judge" on a sample | Same, rolled up | Built as a score; evaluator set-up screen not built |
| User feedback | End-user feedback attached to traces | Thumbs up and down where the team shares it | Rolled up | Built |
| Annotation queues | Traces routed to human reviewers | Review queue: judged low or marked down | Waiting and reviewed counts | Built as a list; the reviewer's working screen not built |
| Score analytics | Scores over time; human and judge agreement | Judge score by weekday; reviewer agrees with judge | Judge score by use case | Built, basic |
| Code evaluators | Deterministic checks | "Claims supported" from the grounding check | Rolled up | Built for the grounding check only |
| Datasets | Reusable test cases built from examples | "Add to an evaluation set" on a request | Not applicable | Button only; lands in Evaluation, not wired |
| Experiments and comparison | Variants run against a dataset, side by side | Covered by Practice runs and the trial | TL Index runs | Exists elsewhere in the portal; not linked from traces yet |
| CI experiments | Fail a build when a score drops | Not built | Not built | Later; belongs to the harness |
| Prompt management | Versioned prompts with labels | Prompts page (exists) | Not applicable | Exists |
| Linked generations and metrics | Latency, cost and scores per prompt version | "By version" table: model version and prompt version | By version built on the model | Built |
| Playground | Try prompts and models | Playground (exists); "open this request in the playground" not built | Not applicable | Partly |
| Dashboard | Volume, cost, latency, scores | Key numbers and charts at the top of Traces | "Across every use case on this model" | Built |
| Custom dashboards | Configurable charts | Not built | Not built | Later; the Guide can build a chart in chat today |
| Alerts | Notify when a metric crosses a threshold | Alerts page (exists, from SLOs) | Not built | Exists for one use case; not driven by trace metrics yet |
| Environments (K) | Separate dev, staging, production data | Try, Integration, Pilot, Production on every request; decides who sees text | By environment in the data, not shown at model level | Built |
| Tags and metadata (K) | Filter by tag | Tags shown on a request; no tag filter | Not built | Partly |
| Releases and versions (K) | Compare app releases | Model version and prompt version per request | By version | Built for model and prompt; application release not captured |
| Masking (K) | Redact before storage | The sealing rule above | Same | Rule shown; backend work open |
| Comments (K) | Notes on a trace | Not built | Not built | Later |
| Metrics API, exports | Pull metrics out | Not built | Not built | Later; this is how the portal itself would read the backend |
| Gateway keys, model approval, gateway analytics | Keys per user or service, spend per key | Usage and keys page (exists) | Not built | Exists in part; compare with the gateway (TL-008) before building more |
| Multimodal tracing | Images and other inputs in a trace | Not built | Not built | When a use case needs it |

## What the model level adds that Langfuse does not have

Langfuse stops at its own project. The portal rolls every use case up to the catalogue model it runs on:

- requests, typical time, cost per 1,000, judge score and feedback, one row per use case, each linking to that use case's traces;
- the same by version built on the model (the base as it is, and each version trained for one use case);
- time and cost by kind of step across every use case.

This is where a model owner sees whether a gap is the model or one use case's prompts and data.

## Flow watch: what Jithin asked for that these tools do not show

Performance tools track time and errors. Jithin's point: the same request can come back as one word or two thousand, so an average hides how the platform behaves, and the content of the traffic is itself a signal. Built as the Flow watch page:

- requests by size: tokens in against tokens out, with time, cost and judge score for each cell, and how far the answer length spreads for the same size of request;
- what the requests are about (each classified when logged) and the kinds of entity in them, week by week;
- a Watch agent that compares the last 7 days with the 28 before and flags a change in topic mix, a new kind of entity, request or answer length, time, or the share refused or failed. It flags only what it can tell from chance. In the product it would run hourly and daily and raise alerts; here it is by day, on the sample.

Not built: the classifier and entity extraction themselves (the sample assigns them), flags at model level across use cases, and the agent acting on a flag.

## Thin spots, said plainly

- Every number is a seeded sample (412 requests across six use cases). The real volumes come from the daily totals; the sample is drawn so rated and reviewed requests show up, so shares read off it are not rates.
- The sealing rule is a portal promise the backend does not yet enforce.
- Nesting is one level; agent runs with tool loops will need the graph.
- No filter by tag, user or score yet; only use case and four quick filters.

## Next

1. Platform lead (Claude): decide masking at ingestion or a restricted read for Pilot and Production text. Due 2026-11-18.
2. Agent graph and deeper nesting for the agent use cases.
3. Wire "Add to an evaluation set" and "Send to data review" to the data loop.
4. Filters by tag, user and score; open a request in the playground.
