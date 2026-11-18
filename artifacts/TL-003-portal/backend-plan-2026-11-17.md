# ThinkLatent Portal (portal) - Backend plan and build order, v0.1, 2026-11-17

Lab session · TL-003 portal · Spec. Jithin, Head of ThinkLatent, asked on 17 Nov for the backend the whole portal needs: the databases, schemas and service behind every screen, so that what a person does is recorded and replayed, not only displayed. Out of scope by his word: model calls in the playground and anything that only works in the real environment with the real interfaces. Those are left as named seams.

This plan builds on the *Backend set-up checklist* (16 Nov, v0.2). Where the two differ, the checklist's "Stated" lines win.

## 1. Shape

```
Browser (the portal's web app, unchanged screens)
   │  HTTPS, JSON, one typed contract shared by both sides
   ▼
Portal service (Node, TypeScript)  ── sign-in: OpenID Connect, groups from claims
   ├── Postgres ........ the portal's own records (system of record)
   ├── DocumentDB ...... Try TLM: sessions, messages, a person's own things
   ├── Request store ... READ ONLY (the team's Langfuse-compatible store)   [seam]
   ├── Object storage .. files, run folders, exports (pointers kept in Postgres) [seam]
   └── Seams ........... Relay/models, Slurm, change system, incident tool, Jira, mail
```

- **One service, one contract.** Every screen's question is one typed function in a contract package; the service answers it over HTTP; the web app calls it. The sample world stays as demo mode and as the test fixture behind the same contract.
- **Postgres holds everything with relationships and rules**: people, projects, requests, models, increments, the Index, data and training, the record. One database, one schema per area.
- **DocumentDB holds what is a person's own and document-shaped**: Try TLM sessions and messages, memory, saved prompts and skills, agents a person built, schedules, shares. It is written for DocumentDB 5.0 instance-based rules (no `$facet`, `retryWrites=false`, no unique index on an elastic cluster, TTL index for the 30-day expiry).
- **Every number on a volume page comes from rollup tables**, filled by an ingester from the request store. The ingester's reader is a seam; until the real store is reachable a stand-in fills the rollups from the sample world. No screen ever scans raw requests.
- **Seams** are interfaces with a stand-in implementation and a contract test, so the in-region team replaces one file each: model calls, Slurm, the request-store reader, object storage, the change system, the incident tool, Jira, mail, the access system's production-text role.

## 2. Rules every table and endpoint follows

1. **Ids** are stable text keys the screens already use where they exist (`advisor-desktop`, `IX-0412`, `F-0425`), otherwise UUIDv7. Never a serial number in an address.
2. **Every row** has `created_at`, `created_by`, `updated_at`; soft delete only where a screen shows "removed".
3. **Append-only where the screen says so**: the project record, decisions, audit, Index scores, data set versions. Enforced by trigger, not by convention.
4. **One-way doors** (promote, approve or send back, break-glass, retire, withdraw) write a decision row and an audit row in the same transaction and are idempotent by a client key.
5. **Access is enforced in the service and again in Postgres** (row-level security by project membership and group), never only in the screen. Sealed production text is never read by the portal's identity (D-324).
6. **Lists page by key, not by offset**: `?after=<cursor>&limit=`, stable sort, total only when asked. Default 50 rows, most 200.
7. **Reads are cheap**: an index for every filter and sort a screen offers; `ETag` and conditional requests; rollups for anything counted over time.
8. **Writes are safe to repeat** (idempotency key) and say what changed (the row and its new version) so the screen can update without a reload.
9. **Live updates** go by server-sent events per page topic, not polling.
10. **Migrations are plain SQL files**, numbered, forward-only, run by one command; the same command installs a fresh environment.
11. **Names**: no employer name anywhere; brand words in configuration; domain names are data.

## 3. Speed budget

| What | Budget | How |
|---|---|---|
| First load of the web app | Under 2 s on the Enterprise network; first chunk under 500 KB | Split by area (today one 9.2 MB file), sample world out of the bundle, long-cache hashed assets |
| A page's data | p95 under 150 ms in the service | One request per page section, indexes, rollups, no N+1 (joins or batched loaders) |
| A list | First 50 rows; next page on scroll or button | Keyset pagination; virtual rows above 200 |
| Moving between pages | About 100 ms felt | Cached answers shown at once and refreshed behind (stale-while-revalidate), prefetch on hover |
| An action | Shows at once | Optimistic update, rollback with a plain message on failure |
| Live pages | Seconds, not a refresh | Server-sent events |
| Database | No query over 50 ms at seed size ×100 | `EXPLAIN` test in the suite for the heaviest queries; connection pool (RDS Proxy or PgBouncer in region) |

## 4. Build order

Each build is a set of migrations, the endpoints over them, the seed from the sample world, and tests against a real Postgres. A build is done when its screens' questions are answered from the database with the same figures the sample world shows.

| Build | What | Stores | Screens it serves |
|---|---|---|---|
| **B0 Foundation** | Service skeleton, contract package, migration runner, sign-in (OpenID Connect against a stand-in issuer), sessions, groups from claims, audit, idempotency, paging, errors, events, health; install guide | Postgres `core` | Shell, sign-in, every page |
| **B1 People and structure** | People, groups, organizations, teams, projects, stages, members and owners, features; follows, saved views, notification settings, what a person has been told | Postgres `core`, `org` | All projects, organization and team pages, project Overview, Members, Settings; My work; You |
| **B2 Work** | Requests of four kinds (deployment, access, ask, problem), their forms and states; threads and messages; inbox items; approvals and decisions; links to the change system, incident tool and Jira (seams) | Postgres `work` | Requests, Inbox, My work, Help's problems, threads on every page |
| **B3 Catalogue** | Models, generations, versions and lineage, model cards, approved uses and limits, systems, outside models; agents register and library; prompt and template registry with versions and reviews | Postgres `catalogue` | Models, a model's ten tabs, System, Agents, Agents at work, Prompts |
| **B4 Delivery** | Feature thresholds and measures; plans; increments, evidence, rollout steps; application registrations and limits (Connect); the project record (append-only, exportable); topics | Postgres `delivery` | A project's tabs, a feature's tabs, Increments, Connect, Record, Topics |
| **B5 TL Index** | Editions, pillars, question pools (Index team only), runs, scores with intervals and sample sizes, queue, offers, head-to-head votes, upkeep, programme, "which model is enough" inputs | Postgres `tlindex` | Every TL Index page |
| **B6 Data and training** | Data sets and versions (never changed once cut), tags, reviews and reviewers, mixes; recipes, runs, stages, checkpoints, live run numbers (partitioned by day), run files as pointers; self-healing's report per feature (seam) | Postgres `data`, `training` | Data, Data sets, Tags and reviews, Mixes; Training, a run, Live, Every run; Self-healing |
| **B7 Numbers** | Rollups by hour and day per project, feature, model and endpoint (requests, tokens, time to first token, latency, errors, feedback, spend, cost avoided); findings; agents' proposals; baselines; the ingester and its stand-in | Postgres `metrics`; request store (read, seam) | Home, Operations, Value, a project's Operations and Quality, a model's Usage, traces lists (metadata only) |
| **B8 Try TLM** | Sessions, messages and branches, a person's agents, memory, folders, saved prompts and skills, files' records, schedules, shares to named people, connectors' state (no keys, D-412), daily limit and usage, 30-day expiry; the model call is a seam with a stub | DocumentDB `try`; object storage (seam) | Every Try TLM page except the live answer |
| **B9 Wiring** | The web app asks the service through the contract; caching, paging, optimistic actions, events; area-split bundle; demo mode on the sample world. No screen changes how it looks. | none | All |

B0 and B1 come first, in that order. B2 to B8 then run side by side, each on its own schema. B9 goes area by area as each build lands.

## 5. What each area must record (not only show)

- **Who did what, when, from where**: `core.audit` for every write, with the person, the action, the object, before and after.
- **Every decision** with its evidence at the time (a frozen copy, not a link that can change).
- **Every state change** of a request, an increment, a run, a data set version, an Index run: a row in that object's history table, so the screen can replay it.
- **Every thing a person follows, saves, dismisses or is told**, so My work and the bell are the same on every device.
- **Every figure's source and as-of time**, carried with the figure from the rollup to the screen.

## 6. What cannot be proven here

- **DocumentDB.** No DocumentDB and no MongoDB-compatible server can run in this workspace (no container runtime; the download host is refused). B8's collections, validators and indexes are written to DocumentDB 5.0's rules and tested for shape only. They must be run against a test cluster in region before anything rests on them.
- **The request store, Relay, Slurm, object storage, the change system, the incident tool, Jira, mail, the access system.** Each is a seam with a stand-in.
- **Sizes.** The sample numbers are made up; indexes and partitions are chosen for the access paths, not sized.
- Postgres is real here (version 16): migrations, row-level security, triggers and query plans are run and tested.

## 7. Open questions for Jithin (none blocks B0 to B2)

1. Is a person identified by the sign-in's subject or by company email when the two disagree? Proposed: subject is the key, email is an attribute.
2. Does the portal database live in one Postgres with a schema per area (proposed) or one database per area?
3. The seven questions for AI engineering in the checklist still stand, first of all which fields the request store fills today.
