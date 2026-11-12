# ThinkLatent Portal (portal): trace and session requirement, v1.3, 2026-11-12

Lab session · TL-003 portal · Spec. Jithin asked for the trace and the session to be specified in full detail, as the requirement the ThinkLatent AI engineering team builds the backend to, with nothing held back: it supports the five-year vision, and fields can be removed later. Serving is vLLM behind the gateway, called through Relay with the OpenAI-compatible API; request logging is the team's modified Langfuse store.

How to read it: every number on every portal page must be computable from the fields below, per request. If a page shows a number that no field here can produce, the field is missing and belongs in this document.

Status words used in the tables:

- **vLLM gives it**: in the API response, the engine's trace span, or its metrics endpoint today.
- **Relay must send it**: the application passes it on each call; Relay refuses or warns when it is absent.
- **Gateway adds it**: stamped by the gateway (Envoy and the harness) as the request passes.
- **Background adds it**: written after the answer has gone back, by a background job on the logged request.
- **App sends it back**: the application reports it later, against the turn or the session.
- **Portal works it out**: derived when the request is stored or read; never sent by anyone.
- **To check**: the name or behaviour should be confirmed against the deployed vLLM (0.26.0 on HyperPod) and the team's Langfuse schema.

## 1. Decisions this rests on (12 Nov)

1. **Everything is visible for now, behind one seal switch.** Request and answer text, entities and retrieved passages show in the portal. A switch seals the text. Later the switch goes away and IAM roles decide, once Jithin has agreed the roles with governance. So every field below is marked content or not: the seal hides content fields only.
2. **The request is the unit.** Every metric on Home, a model, an organization, a team, a project and a feature is a sum, a share or a percentile over requests. No page keeps its own counters.
3. **A request always belongs to a session.** A single call gets a session of one turn.
4. **Background results join the request later.** Guardrail, sensitive-data, entity, classification, novelty and judge results arrive after the answer; each carries the request id, its own time, and the version of the model or rule that produced it.
5. **Feedback comes from the application.** Thumbs for a turn and for a whole session are sent back by the application's own back end; the portal never invents them. It is accepted for 30 days after the turn.
6. **Project and feature ids are required on every call**, from the next Relay release. A call without them is refused.
7. **User and session ids are Relay's.** Relay already carries a user id and a session id into the Langfuse-compatible store; the portal reads them as they are and adds no scheme of its own.
8. **What runs in the background today:** sensitive-data redaction only. The guardrail check as a service, classification and entities, and the check for kinds of request not seen in training are to build; the fields in 3.8 and 3.9 say what each must write.
9. **Nothing Langfuse keeps on a trace is left out** (v1.2). Jithin asked that every field Langfuse records on a trace is in this requirement. v1.1 was then checked against Langfuse's full export field list and was short: it named 22 of the 45 fields Langfuse keeps on a step and 11 of the 23 it keeps on a score. Section 3.14 and the additions to 3.2, 3.3, 3.11 and 3.13 close the gap, and section 7 sets every Langfuse field beside ours. One is left unused on purpose: `public`.
10. **A session opens as a tree** (v1.2). The Traces page shows a session, its turns and every step under each turn, each level opening and closing. Section 9 says what the page must do.
11. **Sessions is not a page of its own** (v1.3). Jithin folded it into Traces: one tab in a project. Traces opens on the list of sessions; the session picked is read in one of five views (Tree, Timeline, Graph, Log, Conversation), and selecting the session itself shows the session's figures.

## 2. The shape

```
Organization › Team › Project › Feature
  Session            one conversation, or one piece of work
    Turn (a trace)   one request from the application and its answer
      Step           one thing done for the turn: a model call, a retrieval, a tool, a guardrail check
        Model call   a step that reached a vLLM endpoint
      Background result   attached to the turn or a step after the answer went back
      Score          a number, a label or yes/no about a turn, a step or a session
      Feedback       what the user of the application did or said about the turn or the session
```

Langfuse already stores this shape: steps (it calls them observations) are grouped into a trace, traces into a session, and scores attach to any of the three. The portal's turn is Langfuse's trace.

## 3. Fields

Level: S session, T turn, P step, C model call. Content = hidden when the seal is on.

### 3.1 Identity and lineage

| Field | Level | Type | Where it comes from | Content |
|---|---|---|---|---|
| `tl.organization.id`, `tl.team.id`, `tl.project.id`, `tl.feature.id` | S T | string | Relay must send project and feature on every call (required from the next release); the portal resolves team and organization | No |
| `tl.project.stage` (set up, try, build, pilot, production) | T | enum | Gateway adds it from the project's record; never trusted from the caller | No |
| `tl.increment.id` | T | string | Gateway adds it from the deployment that served the call | No |
| `tl.environment` (lower, pilot, production) | T | enum | Gateway adds it | No |
| `session.id` (`gen_ai.conversation.id`) | S T | string | Relay creates it; the application may pass its own | No |
| `trace.id`, `span.id`, `parent.span.id` (W3C `traceparent`, `tracestate`) | T P | string | Relay starts the trace; every hop passes the headers on; vLLM continues it | No |
| `gen_ai.request.id` | C | string | vLLM gives it | No |
| `gen_ai.response.id` | C | string | vLLM gives it (the completion id) | No |
| `tl.turn.index` | T | int | Portal works it out from the order in the session | No |
| `user.id` | S T | string | Relay sends it today, into the Langfuse-compatible store; the portal reads it as it is | No |
| `tl.user.group` (for example advisor, operations) | S | string | Relay may send it | No |
| `tl.application.name`, `tl.application.release` | T | string | Relay must send it; needed to compare releases | No |
| `tl.relay.sdk`, `tl.relay.version`, `tl.relay.language` | T | string | Relay adds it | No |
| `tags[]`, `metadata{}` | S T P | list, map | Relay may send them; the keys in use are listed per project | Keys no, values may be |
| `tl.caller.key.ref` | T | string | Gateway adds it: which key or service identity called | No |
| `tl.replayed_from` | T | string | Portal adds it when a request is rerun in the playground or an evaluation | No |

### 3.2 What was asked for (the request)

| Field | Level | Type | Where it comes from | Content |
|---|---|---|---|---|
| `gen_ai.operation.name` (chat, text_completion, embeddings, retrieval, execute_tool, invoke_agent, plus ThinkLatent's: transcribe, classify, decide, rerank, redact, guard) | P C | enum | Relay or the harness sets it | No |
| `gen_ai.request.model` | C | string | Relay must send it (in Relay this is the endpoint name) | No |
| `tl.model.id`, `tl.model.generation`, `tl.model.kind`, `tl.model.version`, `tl.model.trained_for_project` | C | string | Gateway adds them from the catalogue | No |
| `tl.adapter.id` (a LoRA or decision adapter) | C | string | Gateway adds it; vLLM labels running adapters (to check) | No |
| `gen_ai.system_instructions` | C | text | The call itself | Yes |
| `gen_ai.input.messages` | C | structured | The call itself | Yes |
| `tl.prompt.id`, `tl.prompt.name`, `tl.prompt.version`, `tl.prompt.variables{}` | C | string, map | Relay must send id, name and version when a managed prompt is used | Variables yes |
| `gen_ai.request.temperature`, `top_p`, `top_k`, `max_tokens`, `seed`, `stop_sequences`, `frequency_penalty`, `presence_penalty`, `choice.count` (n), `stream` | C | number, bool | The call itself; vLLM echoes several on its span | No |
| `tl.request.repetition_penalty`, `min_tokens`, `logprobs`, `top_logprobs` | C | number, bool | The call itself (vLLM's extra parameters, to check) | No |
| `gen_ai.output.type` (text, json, speech) and `tl.request.structured` (schema, choice list, regex, grammar) | C | enum, ref | The call itself | Schema no |
| `gen_ai.tool.definitions`, `tl.request.tool_choice` | C | structured | The call itself | Yes |
| `tl.request.priority` | C | int | The call itself (to check) | No |
| `tl.request.bytes`, `tl.request.messages.count`, `tl.request.images.count`, `tl.request.audio.seconds` | C | int, number | Gateway adds them | No |
| `tl.request.language` | T | string | Background adds it | No |
| `tl.request.truncated` (the input was cut to fit the window) | C | bool | vLLM or the harness (to check) | No |
| `tl.context.window`, `tl.context.used_share` | C | int, share | Portal works it out from the model's limit and the tokens in | No |

### 3.3 What came back (the response)

| Field | Level | Type | Where it comes from | Content |
|---|---|---|---|---|
| `gen_ai.output.messages` | C | structured | vLLM gives it | Yes |
| `gen_ai.response.model` | C | string | vLLM gives it | No |
| `gen_ai.response.finish_reasons[]` (stop, length, tool_calls, content_filter, abort) | C | enum | vLLM gives it; its success counter is labelled by the same reason | No |
| `tl.response.stop_reason` (which stop string or token ended it) | C | string | vLLM gives it (to check) | No |
| `tl.response.tool_calls[]` (name, call id, arguments) | C | structured | vLLM gives it | Arguments yes |
| `tl.response.tool_call_names[]` (the names alone, so a trace can be found by the tool it called) | C | list | Portal works it out | No |
| `tl.response.reasoning` (reasoning text, when the model returns it apart) | C | text | vLLM gives it (to check) | Yes |
| `tl.response.logprobs`, `tl.response.confidence` (mean and lowest token probability) | C | structured, number | vLLM gives log probabilities when asked; the portal works out the summary | Tokens yes |
| `tl.response.structured.valid` (the answer parsed against the schema) | C | bool | Harness adds it | No |
| `tl.response.bytes`, `tl.response.language` | C | int, string | Gateway and background | No |
| `tl.response.refusal` (the model declined) | T | bool, reason | Background adds it | No |
| `tl.response.empty` | C | bool | Portal works it out | No |
| `tl.stream.chunks`, `tl.stream.client_disconnected` | C | int, bool | Gateway adds them | No |

### 3.4 Tokens

| Field | Level | Type | Where it comes from |
|---|---|---|---|
| `gen_ai.usage.input_tokens` (vLLM's span names it `prompt_tokens`) | C | int | vLLM gives it |
| `gen_ai.usage.output_tokens` (`completion_tokens`) | C | int | vLLM gives it |
| `gen_ai.usage.cache_read.input_tokens` (prefix cache hits) | C | int | vLLM gives it when prompt token details are switched on (to check) |
| `gen_ai.usage.reasoning.output_tokens` | C | int | vLLM gives it for reasoning models (to check) |
| `tl.usage.audio.input_tokens`, `tl.usage.audio.seconds` | C | int, number | The speech endpoint (ThinkLatent's own) |
| `tl.usage.tool.tokens` (tokens spent in tool definitions and results) | C | int | Portal works it out |
| `tl.usage.system.tokens`, `tl.usage.history.tokens`, `tl.usage.retrieved.tokens`, `tl.usage.user.tokens` | C | int | Harness adds the split; without it the portal cannot say what fills the window |
| `tl.size.bucket.in`, `tl.size.bucket.out` (fixed buckets, for example under 256, 256 to 1k, 1k to 4k, 4k to 16k, over 16k) | C T | enum | Portal works it out |
| `tl.size.out_spread` (how far this answer's length sits from the usual for its input bucket and feature) | T | number | Portal works it out |
| Turn and session totals of all of the above | T S | int | Portal works it out |

### 3.5 Time

| Field | Level | Type | Where it comes from |
|---|---|---|---|
| `tl.time.received`, `tl.time.answered` (at the gateway, UTC) | T | timestamp | Gateway adds them |
| `tl.latency.client` (as the application saw it) | T | seconds | Relay reports it |
| `tl.latency.gateway` (auth, routing, harness before the model) | T | seconds | Gateway adds it |
| `gen_ai.latency.time_in_queue` | C | seconds | vLLM gives it on its span |
| `gen_ai.latency.time_in_scheduler` | C | seconds | vLLM gives it |
| `gen_ai.latency.time_to_first_token` | C | seconds | vLLM gives it |
| `gen_ai.latency.time_in_model_prefill`, `time_in_model_decode`, `time_in_model_inference` | C | seconds | vLLM gives them |
| `gen_ai.latency.time_in_model_forward`, `time_in_model_execute` | C | seconds | vLLM gives them (older names; to check which the deployed version emits) |
| `gen_ai.latency.e2e` | C | seconds | vLLM gives it |
| `tl.latency.inter_token.mean`, `.p95` | C | seconds | Portal works it out from stream timings, or vLLM's inter-token histogram |
| `tl.rate.output_tokens_per_second` | C | number | Portal works it out |
| `tl.latency.step` for each non-model step (retrieval, tool, guardrail, post-processing) | P | seconds | Harness or the application's own spans |
| `tl.latency.background.*` (how long after the answer each background result landed) | T | seconds | Background adds it |
| `tl.sla.target`, `tl.sla.met` | T | seconds, bool | Portal works it out from the project's agreed service levels |
| Session: start, end, duration, idle gaps, turns | S | mixed | Portal works it out |

### 3.6 Where it ran

| Field | Level | Type | Where it comes from |
|---|---|---|---|
| `tl.endpoint.name`, `tl.endpoint.kind` (dedicated, shared) | C | string, enum | Gateway adds it |
| `tl.replica.id`, `tl.node.id`, `tl.cluster` | C | string | Gateway adds it |
| `tl.gpu.type`, `tl.gpu.count`, or `tl.cpu` | C | string, int | Gateway adds it from the deployment record |
| `tl.engine.name`, `tl.engine.version` (vLLM version), `tl.engine.flags` (quantisation, speculative decoding) | C | string | Gateway adds it |
| `tl.weights.ref` (which weights, by hash) | C | string | Gateway adds it; this is what ties a request to a training run |
| `tl.route.reason` (why this replica: least loaded, session kept on one, fallback) | C | enum | Gateway adds it |
| `tl.route.retries`, `tl.route.fallback_from` | C | int, string | Gateway adds them |
| `tl.load.running`, `tl.load.waiting`, `tl.load.cache_share` at the moment of the call | C | int, share | Gateway samples vLLM's gauges (to check names) |
| `tl.harness.mode` (off, on, stepped aside on the first turn) | T | enum | Harness adds it |

### 3.7 What went wrong

| Field | Level | Type | Where it comes from |
|---|---|---|---|
| `http.status`, `error.type`, `tl.error.message` | T C | int, string | Gateway and vLLM |
| `tl.outcome` (ok, refused, cut short at the length limit, timed out, cancelled by the caller, rate limited, over the context window, guardrail blocked, engine error) | T | enum | Portal works it out from the fields above |
| `tl.timeout.limit`, `tl.timeout.hit` | T | seconds, bool | Gateway adds them |
| `tl.rate_limit.key`, `tl.rate_limit.hit` | T | string, bool | Gateway adds them |
| `tl.preempted` (the engine set the request aside and resumed it) | C | bool | vLLM counts these (to check) |

### 3.8 What the request was about (background)

Each result carries: the value, a confidence, the model or rule and its version that produced it, and when.

| Field | Level | Type | Content |
|---|---|---|---|
| `tl.class.intent`, `tl.class.topic`, `tl.class.task` (summarise, answer, extract, draft, classify, translate) | T | label + confidence | No |
| `tl.class.business_line`, `tl.class.product[]` | T | label | No |
| `tl.entities[]` (type, count, where: request or answer; the text itself) | T | list | Types and counts no; text yes |
| `tl.sensitive.found[]` (kind of sensitive data, count, request or answer) | T | list | Kinds and counts no; spans yes |
| `tl.sensitive.exposed` (sensitive data reached the model or came back in the answer unredacted) | T | bool + severity | No |
| `tl.sensitive.redacted` (how many spans the redaction model removed before the call) | T | int | No |
| `tl.novelty.seen_in_training` (is this kind of request in the data the model was trained on) | T | yes, near, new + distance | No |
| `tl.novelty.cluster` (which cluster of past requests it falls in; a new cluster is a new kind of use) | T | id | No |
| `tl.drift.flag` (the feature's mix has moved from its baseline) | feature, by day | flag | No |
| `tl.sentiment`, `tl.urgency`, `tl.complexity` | T | label | No |
| `tl.session.summary`, `tl.session.entities`, `tl.session.graph.ref` | S | text, ref | Yes |
| `tl.abuse.flag`, `tl.injection.flag` (an attempt to misuse the model or to override its instructions) | T | bool + kind | No |
| `tl.duplicate.of` (same request seen before; and how far the two answers differ) | T | id + distance | No |

### 3.9 Guardrail

| Field | Level | Type |
|---|---|---|
| `tl.guard.checked` (request, answer, or both) and `tl.guard.mode` (blocking, background) | T | enum |
| `tl.guard.verdict` (pass, flag, block) | T | enum |
| `tl.guard.categories[]` with a score each | T | list |
| `tl.guard.model`, `tl.guard.version`, `tl.guard.latency` | T | string, seconds |
| `tl.guard.action` (nothing, answer replaced, held for review, session flagged from the next call) | T | enum |
| `tl.guard.review` (who reviewed a held answer, verdict, when) | T | record |

### 3.10 Retrieval, tools and agents

| Field | Level | Type | Content |
|---|---|---|---|
| `gen_ai.data_source.id`, `gen_ai.retrieval.query.text` | P | string | Query yes |
| `gen_ai.retrieval.documents[]` (id, score, rank, source, age) | P | list | Ids and scores no; text yes |
| `tl.retrieval.count`, `tl.retrieval.used` (how many passages the answer drew on) | P | int | No |
| `gen_ai.embeddings.dimension.count`, `tl.embedding.model` | P | int, string | No |
| `gen_ai.tool.name`, `gen_ai.tool.type`, `gen_ai.tool.call.id`, `tl.tool.status`, `tl.tool.latency` | P | mixed | No |
| `gen_ai.tool.call.arguments`, `gen_ai.tool.call.result` | P | structured | Yes |
| `gen_ai.agent.id`, `gen_ai.agent.name`, `gen_ai.agent.version`, `gen_ai.workflow.name` | T P | string | No |
| `tl.agent.steps`, `tl.agent.loops`, `tl.agent.handoffs[]`, `tl.agent.stopped_because` | T | int, list, enum | No |
| `tl.decision.options[]`, `tl.decision.chosen`, `tl.decision.probabilities[]`, `tl.decision.confidence` (decision models) | C | list, number | Options may be |
| `tl.speech.audio.seconds`, `tl.speech.channel`, `tl.speech.speakers`, `tl.speech.confidence.mean` (speech) | C | number | No |

### 3.11 Quality

Stored as scores, in Langfuse's shape: a name, a value (number, category, yes or no, or text), a source, an optional comment, and what it is attached to (a turn, a step or a session).

| Field | Level | Where it comes from |
|---|---|---|
| `score.name`, `score.value`, `score.data_type`, `score.comment` | T P S | As below |
| `score.source` (application, evaluator, person) | | Langfuse sets it |
| `score.id`, `score.timestamp`, `score.string_value` (the label or text, when the value is not a number), `score.metadata{}` | T P S | Langfuse sets them; whoever writes the score fills the metadata |
| `score.config_id` (the measure's own definition: its range, or its list of labels) | | From the feature's evaluation set-up |
| `score.author_user_id` (who scored it, when a person did) | | The portal |
| `score.evaluator_id`, `score.evaluation_rule_id` (which evaluator, and which rule picked this request for it) | | Background adds them |
| `score.execution_trace_id` (the judge's own run, so its model call opens under the evaluator step in the tree) | | Background adds it |
| `score.dataset_run_id` (the score belongs to a run of an evaluation set, not to live traffic) | | The evaluation runner |
| `tl.score.method` (exact match, F1, closeness, standard judge, own judge, people) | | Background adds it, from the feature's evaluation set-up |
| `tl.score.judge.model`, `tl.score.judge.version`, `tl.score.rubric.version` | | Background adds it |
| `tl.score.judge.agreement` (share of hand-scored answers the judge agrees with; an own judge counts as evidence only above the set level) | feature | Portal works it out |
| `tl.score.sampled` (this request was picked for scoring, and the sampling rate) | T | Background adds it |
| `tl.score.expected` (what the project team expects on this measure) and `tl.score.met` | feature, T | Portal works it out |
| `tl.review.queue`, `tl.review.by`, `tl.review.verdict`, `tl.review.at` | T | The reviewer, in the portal |
| `tl.dataset.added_to` (this request was added to an evaluation or training set, which, by whom) | T | The portal |

### 3.12 Feedback from the application

| Field | Level | Type | Content |
|---|---|---|---|
| `tl.feedback.thumb` (up, down) | T and S | enum | No |
| `tl.feedback.reason[]` (from the application's own list: too long, missed something, wrong, unsafe, other) | T S | list | No |
| `tl.feedback.comment` | T S | text | Yes |
| `tl.feedback.rating` (a scale, when the application has one) | T S | number | No |
| `tl.feedback.edited` (the user changed the answer before using it) and `tl.feedback.edit_distance` | T | bool, number | No |
| `tl.feedback.final_text` (what the user actually kept) | T | text | Yes |
| `tl.feedback.used` (accepted, copied, sent, discarded, regenerated) | T | enum | No |
| `tl.feedback.regenerations` | T | int | No |
| `tl.feedback.time_to_action` | T | seconds | No |
| `tl.feedback.escalated` (handed to a person) | S | bool | No |
| `tl.feedback.outcome` (the business result the application records: resolved, converted, no action) | S | enum | No |
| `tl.feedback.at`, `tl.feedback.channel` | T S | timestamp, string | No |

Feedback arrives late. It is sent with the turn's `trace.id` or the `session.id`; the portal accepts it for 30 days after the turn (decided 12 Nov).

### 3.13 Cost

| Field | Level | Where it comes from |
|---|---|---|
| `tl.cost.input`, `tl.cost.output`, `tl.cost.total` | C T S | Portal works it out from tokens and the endpoint's price |
| `tl.cost.basis` (per token on a shared endpoint; a share of the machine-hours on a dedicated one) | C | Portal works it out |
| `tl.cost.by_kind{}` (cost split the way tokens are: input, cached, output, reasoning, audio) | C | Portal works it out |
| `tl.cost.price.input`, `tl.cost.price.output`, `tl.cost.price.call` (the unit prices applied) and `tl.cost.price.ref` (which price list and tier) | C | Portal works it out; kept on the request so a later price change does not rewrite old cost |
| `tl.cost.background` (guardrail, judge and other background calls made for this turn) | T | Portal works it out |
| `tl.cost.avoided.unit` and `tl.cost.avoided` (what one accepted answer avoids, as the project team states it, and the total) | feature, T | The project team states the unit; the portal multiplies |

### 3.14 The step itself, and housekeeping (v1.2)

What Langfuse keeps on every step and v1.1 did not name. The tree on the Traces page is drawn from these.

| Field | Level | Type | Where it comes from | Content |
|---|---|---|---|---|
| `step.type` (span, generation, event, embedding, agent, tool, chain, retriever, evaluator, guardrail: Langfuse's ten) | P | enum | Relay or the harness sets it; each background job sets its own | No |
| `step.name`, `trace.name` | P, T | string | Relay or the harness names the step; the turn takes the feature's name unless the application gives one | No |
| `step.start_time`, `step.end_time` | P | timestamp | Whoever ran the step | No |
| `step.completion_start_time` (the moment the first token left, on a model call) | C | timestamp | vLLM gives it | No |
| `step.is_root` | P | bool | Portal works it out | No |
| `step.level` (debug, default, warning, error) | P | enum | Whoever ran the step; the portal raises it to warning when a score falls under what is expected or the guardrail flags | No |
| `step.status_message` | P | string | Whoever ran the step | May be |
| `step.input`, `step.output` (any step, not only a model call) | P | text or structured | Whoever ran the step | Yes |
| `trace.input`, `trace.output` (what the application sent and got back for the turn, before and after the harness) | T | text or structured | Relay | Yes |
| `step.version`, `trace.version` (a label the application puts on its own code path) | P, T | string | Relay may send it | No |
| `tl.record.created_at`, `tl.record.updated_at` (on every stored record: step, turn, session, score) | all | timestamp | The store | No |
| `tl.bookmarked`, `tl.bookmarked.by` | S T | bool, string | A person, in the portal | No |
| `tl.comment[]` (on a session, a turn or a step: text, author, time, who is mentioned, what it replies to) | S T P | record | A person, in the portal | Yes |
| `public` | T | bool | Not used. Langfuse can open a trace to anyone by link; ThinkLatent never does. It stays false and nothing in the portal sets it. | No |

## 4. The seal

Content fields are the ones marked Yes in the last column: the instructions, the messages in and out, the input and output of any step and of the turn, prompt variables, tool arguments and results, retrieved text, reasoning text, entity and sensitive-data text, session summaries, comments, feedback comments and the text a user kept. Everything else is metadata and stays visible when the seal is on.

- **Now:** one switch on the Traces page, in every view, off by default, so the team can see what a full trace holds. With it on, content fields show as "sealed" with their size.
- **Later:** no switch. An IAM role decides who reads content, per environment, with break-glass for production.
- **To build either way:** content is stored apart from metadata, so the read path can leave it out without touching the rest.

## 5. Every page's numbers, from these fields

| The page shows | Worked out as |
|---|---|
| Requests today (any level) | Count of turns by `tl.time.received`, grouped by organization, team, project or feature |
| Tokens in → out (Home, model, project, feature) | Sum of input and output tokens over model calls, grouped by `tl.model.id` or by the level |
| Calls today (a model) | Count of model calls by `tl.model.id` |
| Live and background requests | Turns split by `tl.guard.mode` and `gen_ai.operation.name` (steps that ran after the answer) |
| Typical time, slowest 5% | Percentiles of `tl.latency.client`; the breakdown from queue, first token, prefill and decode |
| Service level met | Share of turns with `tl.sla.met` |
| Size buckets against time, cost and quality | Turns grouped by `tl.size.bucket.in` and `.out` |
| What requests are about, week by week | Shares of `tl.class.topic`, `tl.class.task`, entity types |
| New kinds of request | Turns with `tl.novelty.seen_in_training` = new, and new values of `tl.novelty.cluster` |
| Threshold deviations, quality against what is expected | Scores by `score.name` against `tl.score.expected`; TL Index runs are not request data |
| Thumbs up share | `tl.feedback.thumb` up over all thumbs, for turns and for sessions |
| Held by the guardrail | Turns with `tl.guard.verdict` flag or block |
| Sensitive data exposure | Turns with `tl.sensitive.exposed` |
| Spend | Sum of `tl.cost.total` and `tl.cost.background` |
| Cost avoided | Accepted answers (`tl.feedback.used`) times `tl.cost.avoided.unit` |
| Adoption (a model) | Distinct projects, features and `user.id` over a period |
| Improvement by version | Scores and feedback grouped by `tl.model.version` or `tl.weights.ref` |
| Capacity and queue | vLLM's gauges by endpoint, beside `gen_ai.latency.time_in_queue` per request |
| By business line (speech) | Model calls grouped by `tl.class.business_line` |
| The tree on Traces | Steps nested by `parent.span.id`, ordered by `step.start_time`; the bar from start and end against the turn; the chip from `step.type`; the warning from `step.level`; totals on a parent are sums over its children |

## 6. What the engine's metrics add (per endpoint, not per request)

For Operations and the SRE agent, read from each vLLM endpoint's metrics page: time to first token, time between tokens, end-to-end time, time waiting in the queue, prefill and inference time, tokens generated, tokens per engine step, successful requests by finish reason, the largest answer a request asked for, the acceptance rate of speculative decoding, and the cache configuration. Requests running and waiting, cache use, prompt tokens and preemptions are expected there as well and are to check on the deployed version. Every one is labelled by model name, so a dedicated endpoint gives its project's figures directly.

## 7. Against Langfuse

v1.1 said the Langfuse shape was "already there" without going through it field by field. This version does. The list is Langfuse's own export reference (every column it writes for a step, a turn and a score), read 12 Nov.

### 7.1 On every step (Langfuse: an observation), 45 fields

| Langfuse | Ours | In v1.1? |
|---|---|---|
| `id` | `span.id` | Yes |
| `trace_id` | `trace.id` | Yes |
| `project_id` | `tl.project.id` (how the team's store maps a Langfuse project to ours: to check) | Yes |
| `environment` | `tl.environment` | Yes |
| `type` | `step.type` | Added |
| `parent_observation_id` | `parent.span.id` | Yes |
| `is_root_observation` | `step.is_root` | Added |
| `start_time`, `end_time` | `step.start_time`, `step.end_time` | Added |
| `name` | `step.name` | Added |
| `metadata` | `metadata{}` | Yes |
| `level` | `step.level` | Added |
| `status_message` | `step.status_message` | Added (v1.1 had only the error message on a turn) |
| `version` | `step.version` | Added |
| `input`, `output` | `step.input`, `step.output`; on a model call, the messages in 3.2 and 3.3 | Added for steps that are not model calls |
| `provided_model_name` | `gen_ai.request.model` | Yes |
| `model_parameters` | The settings in 3.2 | Yes |
| `usage_details` | 3.4 | Yes |
| `cost_details` | `tl.cost.input`, `tl.cost.output`, `tl.cost.by_kind{}` | Yes; the split by kind added |
| `total_cost` | `tl.cost.total` | Yes |
| `completion_start_time` | `step.completion_start_time` | Added (v1.1 had the duration, not the moment) |
| `latency` | `gen_ai.latency.e2e`; end minus start on other steps | Yes |
| `time_to_first_token` | `gen_ai.latency.time_to_first_token` | Yes |
| `prompt_name`, `prompt_version` | `tl.prompt.name`, `tl.prompt.version` | Yes |
| `prompt_id` | `tl.prompt.id` | Added |
| `model_id` | `tl.model.id` | Yes |
| `created_at`, `updated_at` | `tl.record.created_at`, `tl.record.updated_at` | Added |
| `tool_calls` | `tl.response.tool_calls[]` | Yes |
| `tool_call_names` | `tl.response.tool_call_names[]` | Added |
| `tool_definitions` | `gen_ai.tool.definitions` | Yes |
| `usage_pricing_tier_id`, `usage_pricing_tier_name` | `tl.cost.price.ref` | Added |
| `input_price`, `output_price`, `total_price` | `tl.cost.price.input`, `tl.cost.price.output`, `tl.cost.price.call` | Added |
| `user_id`, `session_id` | `user.id`, `session.id` | Yes |
| `trace_name` | `trace.name` | Added |
| `tags` | `tags[]` | Yes |
| `release` | `tl.application.release` | Yes |
| `bookmarked` | `tl.bookmarked` | Added |
| `public` | Kept false; nothing in the portal sets it | Not used, on purpose |

22 were in v1.1; 22 are added; 1 is left unused.

### 7.2 On the turn (Langfuse: a trace)

Beyond what a step already carries: `timestamp` is `tl.time.received` (in v1.1); `name` is `trace.name`, `input` and `output` are `trace.input` and `trace.output`, `version` is `trace.version` (all added).

### 7.3 On a score, 23 fields

| Langfuse | Ours | In v1.1? |
|---|---|---|
| `id`, `timestamp` | `score.id`, `score.timestamp` | Added |
| `project_id`, `environment` | Taken from the turn | Yes |
| `trace_id`, `observation_id`, `session_id` | What the score is attached to | Yes |
| `dataset_run_id` | `score.dataset_run_id` | Added |
| `name`, `value`, `data_type`, `comment`, `source` | The same names under `score.` | Yes |
| `string_value` | `score.string_value` | Added |
| `created_at`, `updated_at` | `tl.record.created_at`, `tl.record.updated_at` | Added |
| `metadata` | `score.metadata{}` | Added |
| `author_user_id` | `score.author_user_id` | Added (v1.1 had the reviewer only inside the review queue) |
| `config_id` | `score.config_id` | Added |
| `queue_id` | `tl.review.queue` | Yes |
| `evaluator_id`, `evaluation_rule_id` | `score.evaluator_id`, `score.evaluation_rule_id` | Added (v1.1 had the judge's model and version, not the evaluator's own id) |
| `execution_trace_id` | `score.execution_trace_id` | Added |

11 were in v1.1; 12 are added.

### 7.4 Kept by Langfuse beside the fields

Comments on a session, a turn or a step (`tl.comment[]`, added); review queues (`tl.review.*`, in v1.1); evaluation sets and their runs (`tl.dataset.added_to` in v1.1, `score.dataset_run_id` added).

### 7.5 What ours asks for that Langfuse does not keep

To add to the team's schema: the organization, team, feature and increment ids; the vLLM latency breakdown as columns, not buried in metadata; the token split by what filled the window; where it ran (replica, GPU, engine version, weights); every background result in 3.8 and 3.9 as first-class, versioned records; feedback beyond a thumb (3.12); the size buckets and the spread; the outcome; cost basis and cost avoided; and the split of content from metadata that the seal needs.

## 8. Thin spots and open questions

- Fields marked "to check" were named from the OpenAI-compatible API and vLLM as generally documented, not read off the deployed 0.26.0. AI engineering should confirm each.
- Background jobs for classification, entities and novelty do not exist yet as services; this document only says what they must write.
- The user id is whatever each application passes to Relay. If two applications name the same person differently, the portal counts two users; whether that matters is for AI engineering to say.
- Size bucket edges are a proposal; they should be set from real traffic.
- Storing log probabilities for every request is expensive. Proposal: keep the summary always, the full detail for a sample.
- The team's store is Langfuse-compatible, so the columns in section 7 should exist. Whether each is filled today is not known here. The ones to look at first are those that only the caller or a background job can set: step type, name, level, status message, version, prompt id and the judge's own trace. AI engineering should say which are filled.
- Section 7 follows Langfuse's export reference as read on 12 Nov. The team runs a modified Langfuse; if its version is older, some columns (the pricing tier, the tool call columns) may not exist yet.
- All five views in section 9 are drawn as first or second drafts. The Graph's sample session has no agent in it (both features are fixed chains), so the view is not yet tested on the case it exists for: loops and tool calls.
- The Timeline needs a start and an end on every step, including background ones; the Log needs every step's input and output. A step that writes neither shows as a gap in both.

## 9. The Traces page (v1.3)

Langfuse shows a trace as a tree of its steps and lets the reader switch to a timeline, a graph of the agent's steps and one continuous log. The portal's page does the same one level higher: it opens on the session. There is no separate Sessions page (decision 11).

1. **Where it opens.** The list of sessions, newest first, each with its turns, tokens, user and flags; filters by feature, feedback and flag; find by session, user or word. The session picked opens in the Conversation view; the list folds away in the other four views.
2. **Five views of the same session:** Conversation (turn by turn as a transcript, with the session's figures), Tree, Timeline, Graph, Log.
3. **The tree.** Session, then turns, then every step under a turn, to any depth. Each level opens and closes; Open all and Close all. A closed parent shows the totals of what is under it (time, tokens in and out, cost, the worst level). Each row shows the step's type and name, a bar for when it ran against the turn, its time, tokens, result, and any score or warning.
4. **During and after.** Steps that ran after the answer went back (guardrail check, entities, classification, novelty, judges) sit in their own group under the turn, marked on the bar. What the application sent back later (edit, thumbs) is a third group, as events.
5. **The timeline.** A strip for the whole session (turns as marks, feedback as marks, drag to zoom), and under it the open turn's steps as bars on one clock, coloured by type; a model call's bar split into queue, prefill and decode with the first token marked; one line for when the answer went back and one for the agreed service level; where the turn's time went as shares.
6. **The graph.** Each distinct step drawn once with how many times it ran and what led to it, for the whole session or for one turn; background steps and events in their own bands; picking a step lists its runs.
7. **The log.** Every step's input and output in the order it happened, in one scroll, with earlier turns folded; find a word across all of it, with the matches counted per step; copy as text or JSON.
8. **Show or hide:** scores, comments, colour by type, and the engine's detail (queue, prefill, decode). Filter by level. Find within the session.
9. **The open node.** For a step: Preview (messages as text, long ones folded), JSON, All fields (everything in section 3 that is filled), Scores, Comments. For a turn: what it was about, feedback, service level. For the session: its figures, what it was about, feedback, who and where.
10. **From any node:** score it by hand, comment and mention a person, bookmark, add it to an evaluation set, open it in the playground, copy its ids.
11. **The seal** applies in every view: to the Conversation, the Preview, the JSON, the Log and comments alike.

## Sources

Read 12 Nov 2026: vLLM documentation, Production Metrics and the `vllm.tracing` reference (docs.vllm.ai); Langfuse documentation, observability data model and scores data model, the blob storage export field reference and the Observations API field groups (the lists section 7 follows), and its pages on the trace view, observation types, sessions and comments (langfuse.com/docs); OpenTelemetry semantic conventions, GenAI attribute registry (opentelemetry.io/docs/specs/semconv). The portal's own Observability map of 11 Nov and Jithin's description of the serving backend.
