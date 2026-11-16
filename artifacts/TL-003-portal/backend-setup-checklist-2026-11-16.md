# ThinkLatent Portal (portal): backend set-up checklist, v0.2, 2026-11-16

Changed in v0.2 (16 Nov, D-399): Try TLM's main database is Amazon DocumentDB 5.0 or later, instance-based, in place of MongoDB; a store for each person's own session text is added. Sections 1 and 5.

Lab session · TL-003 portal · Spec. Jithin, Head of ThinkLatent, asked what the portal needs behind it (databases and the rest) so his engineers can start setting it up in the environments now, while the screens are finished.

How to read it. Each line says where it comes from:

- **Stated**: Jithin said it, or it is in one of the portal's requirement documents (named at the end).
- **Proposed**: my reading of what the approved screens need. AI engineering should confirm or change it.
- **To check**: a fact someone has to verify before work starts.

Nothing here is sized. Sizes need real traffic figures, and the portal's sample numbers are made up.

## 1. What to ask for first

In this order, lower environment first. Items 1 to 3 unblock everything else.

1. **Sign-in and groups.** Register the portal as an application with the Enterprise's sign-in (OpenID Connect), and create the access groups in section 2.
2. **A home for the portal.** Somewhere to run two things behind the Enterprise's TLS: the portal's web application (static files) and one backend service of its own (section 4). Plus one Postgres database for the portal's own records (section 3).
3. **Read access to the request store.** The portal's backend reads the team's Langfuse-compatible store. It needs a read-only identity on it, and AI engineering's answer on which columns are filled today (section 6, question 1).
4. **Relay and the gateway.** The Relay release that refuses a call without a project id and a feature id, and the gateway stamping stage, increment and environment on every call.
5. **Training.** Slurm's REST service reachable from the portal's backend, the three S3 areas and the FSx path of section 3, and the tables a training job writes its live numbers to.
6. **Try TLM.** LibreChat's own stores and services (section 5). Start with an Amazon DocumentDB cluster (version 5.0 or later, instance-based): Jithin's call of 16 Nov, because there is no MongoDB at the Enterprise (D-399).
7. **Read-only connections** to the Enterprise's change system, incident tool and Jira (section 4).
8. **A model endpoint for the portal's own agents** (Jarvis first), called through Relay like any application.

## 2. People and access

| What | Detail | Source |
|---|---|---|
| Sign-in for people | The Enterprise's single sign-on. The portal keeps no passwords. | Stated |
| No roles inside the portal | A person is a member or an owner of a project, or neither. Members are added by company email. | Stated |
| Group: foundation team | Sees Data and Training; starts training runs. | Stated |
| Group: Index team | The only people who read TL Index questions. | Stated |
| Group: ThinkLatent AI engineering and on-call | Acts on alerts and on Operations across the Enterprise; approves a deployment's change request (in the change system, not the portal). | Stated |
| Group: ThinkLatent product and adoption | The contact assigned to each project. | Stated |
| Role: read-only for Risk and Audit | Reads every project's record, with export. Granted in the access system. | Stated |
| Role: production text for a period | Reads sealed request and answer text for a set time. Asked for, granted or refused in the Enterprise's access system only; the portal takes no request and has no button for it (D-324). It ends by itself. | Stated |
| Applications that call models | Registered separately and signed in through Okta, in both environments. The portal issues no keys; it shows where registration stands. | Stated |
| What the portal needs from the access system | To read a person's groups at sign-in; to read whether the production-text role was asked for, granted, and when it ends (the portal raises no request for it, D-324). | Proposed |

## 3. Stores

| Store | What it holds | Who writes | Exists today? | Source |
|---|---|---|---|---|
| **Request store** (the team's modified Langfuse: Postgres and ClickHouse, with object storage and a queue) | Every request, session, step, score and piece of feedback. Every number on every portal page is worked out from it. | Relay, the gateway, the engine, background jobs, applications (feedback) | Yes. To check which fields are filled. | Stated |
| Content apart from metadata | Request and answer text, retrieved passages, entities and comments stored so the read path can leave them out (the seal). | The request store | To check | Stated |
| **Portal database** (one Postgres) | The portal's own records: organizations, teams, projects, features and members; plans; increments and their evidence; requests, asks and problems; each project's record (written once, never changed); the prompt and template registry; the agents register; data sets, tags, reviews and mixes; recipes and runs; TL Index editions, pools and scores; what a person follows and has been told. | The portal's backend | No | Proposed |
| **Live run numbers** | Progress, loss, checks at each checkpoint, log lines and GPU use of a training run while it runs. | The training job | No. May be tables in the portal database. | Stated (the job writes to a database the portal reads) |
| **Training store** (S3, versioned) | Every data set as versions that never change once cut, with checksums. | The foundation team's pipelines | To check | Stated |
| **Runs area** (S3) | One folder per run id: the run's card, the frozen recipe, lists pointing at the data, each stage's best and last checkpoint, checks, logs. Kept 180 days after the run ends. | The portal at the start; the job after | No, as a fixed layout | Stated |
| **Released models** (S3) | What serving loads, with the small record of the run that made it. Written only after the TL Index run confirms the model works. | The portal, on release | To check | Stated |
| **Working area** (FSx on the cluster) | The fast copy a job trains from, and restart checkpoints. Cleared when the run ends. | The job | Yes | Stated |
| TL Index question pool | Questions, answers and corrections. Only the Index team reads it. | The Index team | To check | Stated |
| Self-healing's store | Gaps, their examples and the data it builds. Stays in the backend; the portal shows counts, readiness and a few examples to the project's owner. | Self-healing | Not complete yet | Stated |

Two rules from the team's licence list (from the Rust and Node scout brief) that apply when the request store is deployed: use Valkey, not Redis 7.4 or later, and S3, not MinIO.

## 4. Services and connections

| What | Why the portal needs it | Source |
|---|---|---|
| **The portal's backend service** | One service between the web application and everything else: reads the request store and the portal database, pushes live updates, submits jobs, calls the Enterprise's systems. The scout brief proposes Node 24. | Proposed |
| Relay, required ids | Project and feature ids on every call, user and session ids as Relay sends them today, the application's name and release. | Stated |
| Gateway (Envoy) | Stamps the project's stage, the increment and the environment; refuses a call with no project or feature. | Stated |
| Engine counters | vLLM's metrics (queue, running, time to first token, tokens) readable per endpoint and replica, for Operations and the SRE agent. | Stated |
| Background jobs on logged requests | Sensitive-data redaction runs today. Still to build: the guardrail check, entities, classification, the seen-in-training check, judges. Each writes back against the request id. | Stated |
| Feedback from applications | Thumbs for a turn and for a session, accepted for 30 days after the turn. | Stated |
| Slurm's REST service on HyperPod | The portal submits training and evaluation jobs and reads their state. The Python Slurm binding is not on the licence list; the REST service is. | Stated (the portal submits jobs); Proposed (the REST service) |
| TL Index runner | Runs an edition or a queued run and writes scores the portal reads. | Stated |
| Self-healing's report | The gap report the portal reads per feature (interface v0.1, with TL-005). | Stated |
| The Enterprise's change system | Read where a deployment's change request stands. The portal prepares evidence; approval happens there. | Stated |
| The Enterprise's incident and paging tool | Read where an incident stands. The tool pages people and keeps the record. | Stated |
| Jira | Logging a problem creates a ticket; its status shows until resolved. | Stated |
| A model endpoint for the portal's agents | Jarvis, the SRE agent, the Watch agent, the Quality agent and the Index agent call TLMs through Relay, with the access of the person who asked. | Proposed |
| Mail for one purpose | The note a person gets when added to a project. Everything else stays inside the portal. | To check (section 6, question 5) |

## 5. Try TLM (LibreChat)

LibreChat v0.8.9-rc1 (MIT) is in the portal's repository unchanged (branch `build-4-try-tlm`, folder `try-tlm/`), with its services and licences listed in `docs/try-tlm/`. On 16 Nov it was seen running in a scratch copy, on a stand-in database and a stub model, for pictures only; no real database or service below has been run by the lab. Its screens asked for three outside hosts (CodeSandbox and jsDelivr for artifacts, an icon host): artifact previews stay off until copies run inside.

| What | Why | Note |
|---|---|---|
| LibreChat's server (Node) | The chat, agents, tools and files behind Try TLM. | Runs behind the portal's sign-in. |
| Amazon DocumentDB 5.0 or later, instance-based (not an elastic cluster) | LibreChat's main database: people, conversations, agents, files' records. It takes the place of MongoDB, which the Enterprise does not have. | **Decided 16 Nov (D-399).** LibreChat's own documentation names DocumentDB 5.0+ instance-based clusters as a supported target: set the connection with `retryWrites=false`; elastic clusters are not supported (no unique indexes). **To check** in a test cluster before anything rests on it: that LibreChat's index builds succeed at start (it logs failures and carries on), and its admin-style counts (`$facet` is not in DocumentDB). Not yet run by us: the lab has only seen LibreChat on a stand-in. |
| A store for a person's own session text | Jithin's call of 16 Nov: Try TLM session text is recorded from the start, in a store only that person can read. | **To design.** Where it lives (a per-person partition or key in DocumentDB or S3), who holds the key, and how the 30-day expiry and 'never trained on' are enforced. Needed before any real session. |
| A search index (Meilisearch) | Search across a person's own conversations. | Optional; a setting turns it off. |
| Postgres with pgvector, and LibreChat's file service | Questions over attached files. | A second small service beside the server. |
| A sandbox for running code | The code tool. Decided: only in ThinkLatent's sandbox inside the Enterprise, with no network. | To build or choose. |
| Object storage for files | Attached files and generated images. | S3. |
| Sign-in | OpenID Connect to the same sign-on as the portal. | LibreChat supports it by configuration. |
| Models | The TLM endpoints through Relay; LibreChat accepts any OpenAI-compatible endpoint. | One model at a time (decided). |
| One outside image model | Image generation is on with one model ThinkLatent allows. | Which model is still open. |
| Retention | Sessions private to the person and removed after 30 days; memory kept until the person clears it. | To set in configuration or add; not confirmed yet. |

## 6. Questions for AI engineering

1. Which fields of the trace and session requirement are filled in the request store today? Look first at step type, name, level, status message, version, prompt id and the judge's own trace.
2. Is content already stored apart from metadata, so the seal can leave it out?
3. Which vLLM version do the environments run, and can different endpoints run different versions? (0.26.0 on 3 Nov; one endpoint needs 0.32 or later.)
4. Can the portal's backend reach Slurm's REST service on the training cluster, and under which identity are jobs submitted?
5. Does the note to a newly added member go by mail, or only inside the portal? Jithin said both at different times (11 and 13 Nov).
6. Is user id the same person across applications? If two applications name one person differently, the portal counts two.
7. Where do the portal's own agents run, and which TLM do they call?

## 7. What this does not cover

- Sizes, costs and network design.
- The harness, which stays a backend feature and is not shown in the portal.
- Requirement documents still to write: the TL Index (upkeep, editions, queue, offered sets), prompts, data with tags and mixes, Connect with limits and the record, and Try TLM on LibreChat.

## Sources

Project documents: *Trace and session requirement* (12 Nov), *Model training and release requirement* (12 Nov, v1.1), *Training run storage requirement* (13 Nov), *Self-healing and training requirement* (12 Nov), *scout-brief-rust-and-node*, *scout-brief-playground-chat*, *scout-brief-librechat-features*. Jithin's statements of 3, 11, 12 and 13 Nov on serving, Relay, the request store, access and approvals. LibreChat's `docker-compose.yml`, `deploy-compose.yml` and `rag.yml` at commit 9529c99.
