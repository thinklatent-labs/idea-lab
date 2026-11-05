<!-- Exported from https://claude.ai/artifact/WFSu2rXsSAFzS6tqsDvHH8 (rev 26) on 2026-11-04. Read-only mirror; edit the live doc, not this file. -->
# Idea Lab dashboard (lab-dashboard) — Idea card

Nov 1, 2026 · @Jithin Pradeep, Head of VI · drafted by the thinking partner in the Idea Lab

## Lab record

VI-007 is a feature of the lab itself, at Shaping, unscored until its critique pass.

| Field | Value |
| --- | --- |
| ID | VI-007 |
| Slug | lab-dashboard |
| Aliases | the dashboard, lab dashboard, bird's-eye view, portfolio view |
| Type | Feature |
| Parent | VI-006 idea-lab |
| Theme served | None: inherited from VI-006, which serves no theme (a flag, not a failure) |
| Stage | Building (under S-A since 2026-11-02; rebuilt on VI Kit with the command center and Jarvis 2026-11-05) |
| Horizon | H1 |
| Appetite | Three sessions (one research and contract, two build), then a 30-day review |
| Owner | The thinking partner builds and holds the row under S-A until the stream engineer is named; Jithin sponsor |
| Rubric composite | Not scored; proposed at the critique pass before the build |
| Links | feature-of VI-006 idea-lab; reuses Idea Register, scheduled-task and brief patterns, Idea doc standard v1, VI-013 design-kit (VI Kit at 969f885) and the propose-only harness policy; creates Register data contract (register.json and schema) and the register assistant (Jarvis); related-to the weekly lab digest |
| Sensitivity | None in this doc; the dashboard honours the register's sensitivity flag |
| Standard version | v1 |
| Last reviewed | 2026-11-05 |
| Register | [Idea Register](https://claude.ai/artifact/6WzPg7fvvAf2tn8Z9X2Q2h) |

## Problem

The lab's state is spread over nine tables in one doc plus a doc per idea, and the questions a portfolio owner asks weekly need all of them at once.

Today the register holds six rows and two sessions. The Operating Model already asks for monthly portfolio reviews, staleness flags, a horizon mix, capability demand counts and a decision log. Answering "what needs my decision" means cross-reading the Register, Links, Sessions and Decision log tables by hand.

At six rows that takes minutes. At thirty it stops happening, and a lab whose review stops happening dies quietly: ideas go stale unflagged, parents graduate over unshaped features, and the decision log thins out.

The honest version: the pain is small today. The case for the dashboard rests on the register growing, and on fixing the data contract now while retrofits cost nothing.

## Who feels it

- Jithin, lab owner and the only decision-maker: weekly triage (what to touch) and the monthly portfolio review (where attention goes). The v1 user.
- The thinking partner: it reads the register at every session start, and a machine-readable register makes that read faster and less error-prone. A secondary beneficiary.
- Later, not v1: the team (the contribution path) and leadership (the portfolio deck). The design must not block them, so the sensitivity filter exists from day one.

## Hypotheses

Four claims, pre-registered before anything is built. H2 is the one that matters; a dashboard that changes no decision is decoration.

| Claim | Measurement | Confirmed if | Refuted if |
| --- | --- | --- | --- |
| H1 Use: once the register passes 15 rows, Jithin runs his weekly triage from the dashboard | His own count, or Sessions log rows that cite it | At least one visit a week over 8 weeks | Fewer than one visit a fortnight |
| H2 Decisions: the dashboard changes decisions | Decision log lines that cite a dashboard flag (stale, blocked, decision due) | At least one park, kill or booked session a month traced to a flag | Two monthly reviews pass with none |
| H3 Pipeline: the nightly sync exports register.json without manual repair | Sync log rows | 27 of 30 nights clean | The export breaks twice in a month for structural reasons |
| H4 Reach: a read-only snapshot is enough | Edits Jithin wants to make in the page but cannot | Fewer than one a week | Write-back asked for in two consecutive reviews |
| H5 Jarvis: Jithin works the lab through Jarvis | Conversations he starts, and cards confirmed from Jarvis in the decision inbox | Twice a week, and at least one confirmed card a month, over 8 weeks | Fewer than one conversation a fortnight after the first month |

## Why now, why us

Now: the lab is one day old, standard v1 is set, the register has fixed columns and a nightly sync already runs. A data contract fixed this week costs an hour; the same contract at fifty rows costs a retrofit of every doc. The Portfolio session 1 draft also asks for views (Now/Next/Later, horizon mix, capability demand) that a doc renders badly.

Us: this is internal tooling, so "why us" is thin and should not be dressed up. The one real angle is that a register-to-contract-to-views pattern is the same shape the VI Portal's catalogue and governance surfaces need, so the dashboard is a cheap prototype of those. That reuse is plausible, not proven, and earns no compounding points until a portal session confirms it.

## First version and what it is not

First version: one responsive page, a private artifact, read-only, regenerated from register.json by the nightly sync. Five P0 views and an idea detail panel (see Views). Mobile first, because triage happens on a phone; a laptop gets the three-column layout.

What it is not:

- Not a capture tool: "idea:" in any chat and notes in Neo stay the way in.
- Not a second source of truth: the register wins, and the page never writes to it in v1.
- Not a chat surface: it hands you a session line to paste into a new chat, nothing more.
- Not a leadership deck: the deck is generated from the same contract later.
- Not a paper-discovery feed: Zeta Alpha's navigator searches and summarises papers and draws semantic maps of a field; the lab borrows its "what changed since you looked" feed and its map, not its summariser.

## Appetite

Three sessions: one for research and the data contract, two for the build (P0, then P1). If P0 does not fit in two sessions, the graph view moves to P1; quality does not move. A 30-day review against the kill criteria follows, and a view unopened for 30 days is removed.

## Capabilities reused and created

The dashboard reuses four things and creates one, and the one it creates already has three claimants.

| Capability | Reuse or create | Note |
| --- | --- | --- |
| Idea Register | Reuse | The source of every number on the page |
| Scheduled-task and brief patterns | Reuse | The nightly sync exports the data and republishes the page |
| Idea doc standard v1 | Reuse | Defines the lab record fields the contract carries |
| Artifacts hosting | Reuse | A private page with supporting files; no servers to run |
| Register data contract (register.json, its JSON Schema, an exporter step in the sync) | Create | Reusable by the weekly digest, the portfolio deck, retrospectives and the thinking partner's session-start read. Demand already visible: 3 (digest, deck, sync), which by the lab's own rule makes it a platform priority. Becomes a catalogue row at Proposed maturity when the contract is written |

## Governance story

No client data and no regulated material: the register holds internal strategy only. The register's sensitivity flag is honoured: flagged rows are hidden by default and shown only on a per-view opt-in. The artifact stays private until Jithin shares it. If the audience widens to the team or leadership, the filter becomes a hard requirement and a shared build never includes flagged rows.

## The five questions the dashboard must answer

A view that serves none of these five does not ship.

1. What needs my decision? Scores pending, blocking open questions without an owner, proposals waiting for team comment, critique logs missing, parents waiting on a P0 feature.
2. What is stale or blocked? Rows past their stage window (Seed 60, Shaping 30, Stress test 21, Proposal 30 days), parked rows past re-check, depends-on chains, P0 features still Shaping under a parent at Proposal or later.
3. Where is attention going? Now/Next/Later by horizon against the mix the review set, the funnel from Seed to Graduated, what was killed and why.
4. What do ideas keep needing? Capability demand counts, maturity risk inherited by ideas, the next platform priority (three or more reuses).
5. Where do I pick up? For one idea: next step, last decision, doc, links, and a session line to paste into a new chat.

## Views, prioritised

Six P0 views ship first; everything below the line is a cut list, not a promise. "Answers" names the question each view serves.

| View | Priority | Answers | What it shows | On a phone |
| --- | --- | --- | --- | --- |
| Pulse strip | P0 | 1, 2, 3 | As-of date and last sync with its flags; counts by stage; decisions due; stale; blocked | First screen: four numbers and the as-of |
| Attention queue | P0 | 1, 2, 5 | Ranked rows with reason chips (decision due, stale N days, blocked by X, cheapest next step); tap for detail | Second screen; the triage view |
| Register | P0 | 5 | Every row; filter by type, stage, horizon, theme, owner, score; sort; search | Cards; filters in a bottom sheet |
| Portfolio board | P0 | 3 | Now/Next/Later lanes with H1/H2/H3 swimlanes; cards carry ID, slug, type, score, parent, days in stage | Lanes stack vertically |
| Idea graph | P0 | 2, 4 | Typed nodes (theme, idea, feature, capability, experiment) and the nine link types; focus a node; highlight depends-on chains and feature roll-ups | List fallback plus a pinch-zoom canvas |
| Idea detail | P0 | 5 | Lab record, links in and out, decision log, hypotheses, next step, doc link, copy the session line | Full-screen sheet |
| Scoring matrix | P1 | 1, 3 | Eight criteria by ideas as a heatmap; weight sliders for what-if ranking; proposed against set; the bar drawn as a line | Scrolls sideways |
| Capability catalogue | P1 | 4 | Demand counts, maturity, created-by, reused-by; the three-reuses rule and the two-quarters-idle flag rendered | Cards |
| Decision timeline | P1 | 1, 3 | Decisions by day; filter by idea or decider; pending-Jithin items first | List |
| Health panel | P1 | 2 | The sync's audit flags: missing lab record, missing sections, standard behind, no theme or owner | List |
| Horizon mix and funnel | P2 | 3 | Mix against target; Seed-to-Graduated conversion and cycle times (needs stage-since dates) | Two small charts |
| Sessions log | P2 | 5 | Which sessions touched which IDs, by mode | List |
| Critique coverage | P2 | 1 | Ideas at Proposal or later without a recorded critique; red-team names per month | List |
| Strategy spine | P2 | 3 | The spine and diagnosis from Portfolio session 1, once approved | Text |

Responsive rules: mobile first (pulse, then queue, the rest behind tabs); on a laptop three columns (queue, board or graph, detail). Tables become cards under 640 px. Dates read relative ("stale 12 days") with the absolute date on tap. One accent colour, reserved for "needs Jithin".

## Data contract: register.json

register.json is the product; the React page is its skin. The nightly sync exports the register's tables into one file with a schema, publishes it beside the page, and writes its sync log row. The page computes everything derived (days in stage, stale, lane, blocked, roll-ups) and stores nothing.

&#91;embedded content: data flow · register to page, and back through a session\]

Only the nightly sync writes register.json; a session, not the page, updates the register.

- Top level: asOf, syncRun, standardVersion, weights (eight criteria), stalenessWindows, portfolioBar, ideas, links, themes, capabilities, sessions, decisions, syncLog.
- Idea: id, slug, title, aliases, type, parentId, themeIds, stage, stageSince, horizon, appetite, owner, score (composite, status proposed or set, date, the eight criteria), docUrl, standardVersion, lastTouched, nextStep, sensitivity, priority (P0, P1, P2 for features), critiqueRecorded, flags.
- Link: fromId, type, toId, note. Capability: id, name, kind, maturity, createdBy, reusedBy, demand.

Gaps the contract exposes in today's register. Each is a register-structure change, so a Lab-operations chat decides them; none needs a bulk retrofit.

- stageSince: the register records only Last touched, so days in stage must be inferred from the decision log until a column exists.
- Per-criterion scores: only the composite is recorded; the scoring matrix needs the eight numbers.
- Appetite, sensitivity, feature priority and critique-recorded live in lab records, not register columns.
- Capability IDs: the catalogue is keyed by name, and reuses rows list names separated by semicolons.
- Dates are already ISO in every cell; the contract keeps it that way.

## Pre-mortem and kill criteria

It is November 2027 and the dashboard is dead. Five likely stories, each with the design response built in from day one.

1. It lied. The export broke in week three, nobody noticed, the as-of date drifted, trust went and never came back. Response: the as-of date is the first thing on screen, a banner appears when it is older than 36 hours, and the last sync log row sits in the pulse strip.
2. It was decorative. The register plus a session answered every question; the page added looks, not decisions. Response: only views that serve the five questions ship, and H2 counts decisions that cite a flag.
3. It grew. Twelve views, three used, a session a month on upkeep. Response: the P0/P1/P2 list is a cut list, and a view unopened for 30 days is removed.
4. Two truths. Scores set in the page and overwritten by the sync, or the reverse. Response: read-only v1; any write-back needs a single-writer rule and its own decision.
5. It leaked. Shared with leadership while a Parked row carried unreleased strategy. Response: the sensitivity filter from day one, hidden by default.

Kill criteria. Park or kill when any of these holds: the register is under ten rows two quarters from now; Jithin opens it less than weekly after 60 days; the export needs manual repair more than twice in a month and the fix is not structural; a portfolio review runs without it and loses nothing.

Strongest case against: the weekly digest (already scheduled for Mondays) answers questions 1 and 2 with no page at all, so the page earns its keep only on questions 3 to 5. Strongest case for: the digest cannot show a board, a graph or a what-if ranking, and it needs the same data contract; build the contract once and both run on it.

## Research plan

One session, six to ten sources opened, no literature review: a dashboard does not deserve one. Skills: competitive-brief for A to C; deep-research only if E turns up a real fork. The scout brief lands in this doc with sources and as-of dates.

| Area | What is studied | Borrow or reject | Output |
| --- | --- | --- | --- |
| A. Portfolio and prioritisation tools | Jira Product Discovery, Productboard, airfocus, ProdPad, Aha! Ideas, Linear | Borrow weighted scoring with live weights, Now/Next/Later lanes, insight-to-idea links, saved views. Reject feature-parity thinking | ERRC list; scoring matrix spec |
| B. Innovation and stage-gate tools | Brightidea, IdeaScale, HYPE, Planview IdeaPlace | Borrow funnel and ageing views, kill and park reasons as first-class data, pipeline health | Funnel and health panel spec |
| C. Research-discovery tools (the Zeta Alpha pointer) | Zeta Alpha, Connected Papers, ResearchRabbit, Litmaps, Elicit, alphaXiv, Semantic Scholar | Borrow the graph canvas with focus mode, "new since last visit", one-line cards, trend panels. Reject summarisation as the core job | Graph view spec; the change feed |
| D. Dashboard design | Mission-control patterns, small multiples, responsive collapse rules, honest sparse states for a six-row register; the artifact-design skill | Information hierarchy, one accent colour, density rules | Layout rules |
| E. Technical verification (current versions, not memory) | React, Vite, TypeScript, Tailwind; graph: @xyflow/react, d3-force, cytoscape; charts: Recharts, visx; table: TanStack Table; JSON Schema validation; artifact hosting limits (CDN allowlist, multi-file publish) and the artifact runtime's live-data and database capabilities | Decides snapshot against live, and the library set | Stack choice with reasons |
| F. Internal | The Operating Model's portfolio rules and standard v1; the VAI proposal as the richest lab record; Neo and Think Latent as graduated precedents | The data model and the fields a detail page must show | The data contract, final |

## Scout brief

Sixteen reference products and four design systems, pages fetched 2026-11-01. Four patterns earned their way into the P0 build; everything crowd-shaped was left out. None of the sixteen offers typed idea-to-idea links or a capability catalogue with demand counts, so those stay the lab's own.

**What the build borrowed**

- Staleness as the dominant signal (ProdPad's recency colour, Linear's grey no-update dot, Brightidea's days per step, IdeaScale's fixed-rule alerts): every row carries days since its last touch and its last decision, and the Pulse view has a rule-based alert panel.
- A ranked attention feed with a one-line reason per item (alphaXiv's attention-ranked feed, Chiang's "briefing over dashboard"): the Queue view.
- Focus mode with a trail and a neighbour list by link type (Connected Papers, ResearchRabbit's 2025 revamp, Semantic Scholar's typed citations): the Graph view.
- Graduation gates as a per-idea checklist (Planview IdeaPlace's declared stage criteria) and rubric anchors beside every score (Productboard's rubric text per level): the detail panel.

**Deferred to P1**: airfocus-style normalised criteria with live weight sliders and rank delta against last quarter's weights; Aha!'s cut lines on one ranked list as an alternative to lanes; demand count as bubble size in the capability catalogue; HYPE and Brightidea's average dwell per stage once stage-since dates exist in the register.

**Rejected**: votes, pairwise and crowd scoring, reputation, campaigns, evaluator routing, drag-to-override of computed positions, shared-view permission models, and summarisation as the core job.

| Product | Borrowed | Not for us | Source (fetched 2026-11-01) |
| --- | --- | --- | --- |
| Jira Product Discovery | Threshold colouring on a computed score column; a two-axis matrix | Per-user vote budgets | [Fields reference](https://support.atlassian.com/jira-product-discovery/docs/jira-product-discovery-fields-reference/), [Matrix view](https://support.atlassian.com/jira-product-discovery/docs/create-a-matrix-view/) |
| Productboard | Rubric anchor text shown at the point of scoring | Drag-to-reposition on the matrix | [Drivers](https://support.productboard.com/hc/en-us/articles/360056348954), [Rubrics](https://support.productboard.com/hc/en-us/articles/28306158464787) |
| airfocus (Lucid) | Normalise criteria to 0–1 before weights; a third factor that only sizes bubbles | Per-workspace extension model | [Priority Ratings](https://help.lucid.co/hc/en-us/articles/43479026796820) |
| ProdPad | Recency colour mode and a not-updated-recently toggle | Drag-the-dot scoring; Fibonacci scales | [Priority scoring](https://help.prodpad.com/article/582-idea-priority-scoring), [Visualize priorities](https://help.prodpad.com/article/578-visualize-priorities) |
| Aha! Ideas | Cut lines that persist when a ranked list re-sorts | A scorecard swap that deletes prior scores | [Prioritization page](https://support.aha.io/aha-ideas/support-articles/ideas-management/prioritization-page~7444662714569291267) |
| Linear | Grey no-current-update dot beside health, latest update one click away | Velocity and cycle-time charts | [Initiatives](https://linear.app/docs/initiatives), [Mobile redesign](https://linear.app/changelog/2025-10-16-mobile-app-redesign) |
| Brightidea | Current items and average days per step; oldest active idea | Evaluator load balancing | [Pipeline Dashboard](https://support.brightidea.com/hc/en-us/articles/205844197-Pipeline-Dashboard) |
| IdeaScale | Fixed-rule alert panel with trigger, date and link | Crowd stages and vote leaderboards | [Outcome dashboard](https://help.ideascale.com/outcome-dashboard) |
| Planview IdeaPlace | Graduation criteria declared per stage; graduation as a push to a named system | Reputation points, crowd predictions | [Product page](https://www.planview.com/products-solutions/products/ideaplace/) (docs pages unreachable) |
| HYPE Innovation | Weight changes that re-rank live; dwell per phase over time | Community graduation by views | [Evaluation tools](https://www.hypeinnovation.com/hubfs/HYPE%20Evaluation%20Tools_EN_webversion.pdf) |
| Zeta Alpha | One-tap "related" on every item (two hops plus shared capabilities) | Social trending; no public screens | [Release note](https://www.zeta-alpha.com/post/release-update-add-your-own-documents-and-unleash-the-zeta-alpha-neural-discovery-engine) |
| Connected Papers | Click a node, side panel, re-root; upstream and downstream lists | Similarity-weighted force clustering | [Announcement](https://medium.com/connectedpapers/announcing-connected-papers-a-visual-tool-for-researchers-to-find-and-explore-academic-papers-89146a54c7d4) |
| ResearchRabbit | A focus-history trail | The old multi-column cascade | [2025 revamp review](https://aarontay.substack.com/p/researchrabbits-2025-revamp-iterative) |
| Litmaps | Deterministic, meaningful axes; an explicit label-collision rule | 288 axis combinations; a bigger-screen block on phones | [Visualization docs](https://docs.litmaps.com/en/articles/9181490-use-and-edit-litmaps-visualization) |
| Elicit | Evidence drill-down: a score opens its criteria and the decision line behind it | The wide extraction table | [Literature review](https://elicit.com/solutions/literature-review) |
| Semantic Scholar | Edge-type filters; a badge on the few edges that matter | A recommender trained on ratings | [Tutorials](https://www.semanticscholar.org/product/tutorials) |

**Graph stack (part E).** Hand-rolled SVG with a deterministic layered layout, chosen over React Flow (about 57 kB gzipped plus a layout library) and force graphs (non-deterministic, no edge labels without canvas painting): the same register draws the same picture every visit, the links are directional and read top-down, SVG nodes take keyboard focus, and the page stays a normally scrolling document on a phone. Sources: [React Flow layouting](https://reactflow.dev/learn/layouting/layouting), [@xyflow/react on npm](https://www.npmjs.com/package/@xyflow/react), [react-force-graph](https://github.com/vasturiano/react-force-graph).

**Mobile and sparse states (parts D and F).** Sticky summary, bottom tab bar, list-to-detail with a bottom sheet (Vercel's 2026 navigation, Linear mobile, Stripe's dashboard app, NN/g on bottom sheets and mobile tables); counts as "2 of 7", never percentages; text-only empties per widget; no trend charts under three points (NN/g, Shopify, Carbon and Atlassian empty-state guidance). Sources: [Vercel changelog](https://vercel.com/changelog/dashboard-navigation-redesign-rollout), [Stripe mobile](https://docs.stripe.com/dashboard/mobile), [NN/g bottom sheets](https://www.nngroup.com/articles/bottom-sheet/), [NN/g mobile tables](https://www.nngroup.com/articles/mobile-tables/), [NN/g empty states](https://www.nngroup.com/articles/empty-state-interface-design/), [Carbon empty states](https://carbondesignsystem.com/patterns/empty-states-pattern/).

## Build plan

Four phases after the go, each ending at a gate the next cannot pass without.

&#91;embedded content: build roadmap · 4 phases, 3 gates\]

The phases are sized in sessions, not dates; a gate that fails sends the work back, never forward.

1. Contract. Write the JSON Schema; an exporter that reads the live register and the idea docs' lab records; seed register.json by hand from today's register; a 40-row synthetic fixture for layout tests only, never published. Gate: the schema validates the live register with zero manual fixes.
2. P0 build. Vite, React, TypeScript, Tailwind; the six P0 views; mobile first; published as a private artifact with register.json as a supporting file; source kept and sent. Gate: Jithin runs one weekly triage from it.
3. P1 and wiring. Scoring matrix, catalogue, decision timeline, health panel; the nightly sync republishes register.json (a Lab-operations change); the Operating Model lists the dashboard under management systems. Gate: three clean nightly exports in a row.
4. Review at day 30. Usage against H1 and H2; unopened views removed; park, kill or promote.

## What was built (P0, 2026-11-01)

The dashboard is live as a private artifact, [Idea Lab Dashboard](https://claude.ai/artifact/X1ebYqg9d1QRr1GYJkaLMr), with register.json published beside it; the source is in this session's files (idea-lab-dashboard-src.zip).

**Views shipped.** Pulse (as-of stamp with a freshness pill and a 36-hour banner, four tiles that open the queue filtered, the stage bar with counts, the alert panel, the Portfolio session 1 draft with the spine, the red-team roster), Queue (attention-ranked with reason chips and four filters), Register (search, five filters, sortable columns; cards under 900 px), Board (Now, Next, Later, Graduated by the Operating Model rule, grouped by horizon, with capabilities to watch), Graph (themes, ideas, features and capabilities in layers; focus mode with a trail; a neighbour list by link type; typed edge styles with a legend), Log (decisions with pending-first and per-idea filters, sessions, sync runs), and the detail panel (decisions due, next step, a copy-able session line with a mode picker, the lab record, the rubric with anchors and the proposed-weights composite, links in and out, two-hop related ideas, graduation gates, open questions with blocking first, hypotheses, kill criteria, phasing, decisions, sessions, audit flags). "Changed since your last visit" marks rows and decisions newer than the previous visit, kept in the viewer's own browser only.

**Data contract v1.0.** schema/register.schema.json (JSON Schema 2020-12) plus a validator that checks references the schema cannot: parents, themes, link targets, capability reuse lists, decision ideas, weight sums, and that a composite matches the equal-weight mean of its criteria. The seed carries the live register at rev 27 and the lab records, hypotheses, open questions, kill criteria and phases of the VAI proposal, the VI Portal idea card and the self-healing capability record. Catalogue rows got ids CAP-001 to CAP-014; VI-005 and CAP-004 are the same thing and draw once.

**Rules in code, from the Operating Model.** Lanes: Now = Proposal; Next = Shaping or Stress test; Later = Seed or Parked; Graduated kept with a pointer; Capability rows in their own strip. Staleness: days since last touch past the stage window (Seed 60, Shaping 30, Stress test 21, Proposal 30); Parked by its re-check date. Blocked: a depends-on target not yet Graduated. A P0 feature still Seed or Shaping under a parent at Proposal or later holds the parent. Attention weight: decisions due 100 plus 10 each (max three), a proposed score 60, holding a parent 70, stale 50 plus the overdue days (max 30), parked overdue 45, blocking questions without an owner 20, waiting on another row 15, audit flags 8 each on active rows, no decision in 30 days 20; oldest touch breaks ties. Alerts: freshness, staleness, parked, feature-blocks-parent, Proposal without a critique, proposed score, no theme, no named owner, standard behind, a pending decision older than seven days.

**Checks run.** Schema and referential validation of the seed; 22 unit tests on the rules, the layout and the routing (composites 4.0 and 3.95 for VAI, lanes, staleness a month on, a parked row past re-check, a P0 feature holding a parent, graduation gates, deterministic layout, no edge dropping through a box); a TypeScript check; one render pass at laptop and phone width, which fixed heading spacing, edge routing into the wrapped capability row and a duplicated decision line.

**Refreshing the data.** The nightly sync exports the register into register.json, runs scripts/validate-register.mjs, and republishes only data/register.json to the artifact; the page shows the as-of stamp first and turns the freshness pill red after 36 hours. Until that step exists (a Lab-operations change), the page shows the manual seed and says so.

**Not in P0.** Scoring matrix with live weights, capability catalogue view, decision timeline, health panel (P1); horizon mix and funnel, critique coverage, sessions by mode (P2). Dwell per stage shows only where stage-since dates exist.

**Waves 1 to 3, built 2026-11-01 (version 2 of the artifact).** All three waves ship against contract v1.1, which adds optional fields the register does not carry yet; a view whose field is empty says so instead of inventing a number.

- Wave 1: a Catalogue view (demand as bubble size by maturity and kind, platform-priority and retirement-watch flags, collision candidates by the three-shared-capabilities rule), a dependency conflict check (rule R-16, also under the blocked tile), weight scenarios on a Scores view (sliders re-rank live and save nothing; proposed weights as a preset; the bar drawn), saved questions as Queue chips, a theme roll-up on Pulse, a depth control on the Graph.
- Wave 2: a Changes view that diffs the current register against the latest earlier snapshot in data/history (stage, lane, score, owner, horizon, theme, parent, next step, decisions due, appetite, plus rows, links and log lines), time in stage with a stalled filter on the Register, a health badge with an update-missing state (the thinking partner's call at session end, in the sessions log), a decision index with IDs, status, door type, information level, review-on dates and supersedes pointers, an appetite countdown with a circuit-breaker rule, kill signals with dates and lapse detection, a sixteen-rule table with warn and alert thresholds replacing the fixed windows, open next steps with due dates and the originating decision, and audience presets (Jithin, VI team, Enterprise) that hide sections and flagged rows.
- Wave 3: a stage funnel from each row's stage history (conversion, median days), a prediction ledger with confidence, evidence strength and resolve-by dates and a calibration note that stays empty until predictions resolve, a score-against-evidence map, a retrospective card on graduated rows (proposal against delivered, retro date), a backlinks line fed by sync mentions (empty until the sync scans docs), and a time-lapse on the Graph. Write-back stays deferred under H4.

What the seed carries today: health calls on the four sessions logged, decision IDs D-001 to D-020 with status (D-004 superseded by D-009), door type and review dates on the VI-007 lines only, stage histories for four rows, VI-007's appetite end (1 Dec), kill signals for VAI (undated, as the proposal records them) and VI-007 (dated), evidence at 0 for every pre-registered hypothesis, one earlier snapshot (rev 27, 16:45) so the Changes view has a real diff. Every other field is null and shows as not recorded. Checks: 34 unit tests (health, update missing, conflicts, collisions, ranking, the snapshot diff, the funnel, the ledger, four rules a month on, graph depth), a type check, one render pass at laptop and phone width.

**Lifecycle change, built 2026-11-02 (version 3 of the artifact, contract v1.2).** Decided in this chat and carried in the contract; the Operating Model amendment is the first item for the Lab-operations chat.

| Stage | Means | Enters when | Leaves when |
| --- | --- | --- | --- |
| Seed | A thought worth not losing | A one-line hypothesis is on the register | Shaped, or parked |
| Shaping | Problem, users, first version, production surface named | An idea card exists | The card names who uses it, where it lives and the number that moves |
| Stress test | Critique pass, kill signals and evidence written down | Shaping is complete | Critique recorded; kill signals dated; rubric scored |
| Proposal | Funded by default; Jithin rejects explicitly, everything else proceeds | Stress test passed | Owner (not Jithin), stream and appetite in engineer-weeks are all named |
| Building | Work running against the appetite | The Building gate passes (VAI's rule, generalised: unnamed, not started) | A first user is in production |
| Shipped | A first user in production, the metric read | The read is logged | Retrospective at six months |
| Graduated | A Project of its own with the Shipped evidence behind it | Retrospective held | Stays |
| Parked | Not now; a trigger and a re-check date | Any stage | Trigger fires or the date passes |
| Killed | Rejected by Jithin, or a kill signal fired; the reason kept | Any stage | Never |

What changed in the page and the contract: two stages and their colours; a rejection decision type (Jithin's log line kills a row); the Building gate as a checklist on the detail and as rule R-17 in the alert panel; production surface (users, system, metric) per idea, with an unnamed surface read as an H3 experiment; governance as a row field handled by a separate team and flagged only when on the critical path (R-18); a Shipped record (first user, metric read) and Shipped added to the graduation gates; streams (S-A to S-E, one engineer plus a coding agent each) and the three programme phases with their gates on the Pulse; lanes Now = Building or Shipped, Next = Proposal, Stress test or Shaping; Proposal window 14 days, Building by appetite, Shipped 30 days to the metric read. Retrospectives now ask for the Shipped line; Neo and Think Latent carry a flag that they graduated without one.

What the seed says today under the new rules: VAI is funded and cannot start (leads unnamed, appetite unset; next step due 15 Nov); the portal's governance is on the critical path; the dashboard is Building under S-A with the thinking partner as owner until the stream engineer is named; every stream owner is to be named. Checks: 43 unit tests (lanes, the gate on VAI and the dashboard, a sponsor not counting as an owner, R-17 and R-18, the 14-day Proposal window, Shipped as a graduation gate, the snapshot diff seeing the stage change, the funnel through Building and Shipped), a type check, one render pass.

**VI Kit, the command center and Jarvis (2026-11-05).** On Jithin's order the whole UI moved onto VI Kit (commit 969f885), vendored under dashboard/vendor/vi-kit and never edited there: `npm run kit:pull` refreshes it and refuses when a kit file was changed locally. The product's own wrappers live in dashboard/src/vi.

- Shell D on every view: the floating pill bar with the day's agenda, the dock inside the frame (a top strip on phones), one sage pill springing between items; light is off-white with colour fields behind the glass, dark is black with a dot grid.
- Motion on springs: segmented controls, count-ups, staggered arrivals, the record sheet (draggable on a phone), cards moving between Board lanes; all of it off under reduced motion.
- Pulse became the command center, in the kit's order: orient (greeting, revision, live rows), judge (Jarvis's brief and four tiles), the pipeline as the one exhibit, decide (quick calls and questions for the chat), act (streams with appetite burn, due this week), trace (decisions since the last visit, health and alerts, portfolio).
- Jarvis answers through Claude on Jithin's account (the artifact's sample capability), reading a digest of the register. It opens views and rows, reads a row in full, searches, and proposes quick calls or drafts requests for the next lab chat as cards Jithin confirms; nothing reaches the decision inbox before he does. Every answer carries its basis, a confidence line and its sources. It reads aloud with the device's own voices and does not listen. Off claude.ai it navigates by command only.
- Checks: 57 unit tests; the host check (D-107) matches the plain page pixel for pixel in light and dark; Google Fonts dropped for bundled Inter, so the page calls nothing outside claude.ai at runtime.
- Kill signal for Jarvis: unused for 30 days after the first month; then remove the panel and the sample capability and keep the brief the page writes from the rule table.

## Scout, second pass: how others run such sessions, and what to build next

Three things recur across the eight practices below: the strongest systems fix the revisit date at the moment of decision, pre-registration is what makes killing cheap, and only the engineering practice (ADRs) treats the decision record itself as the asset. The lab's rules already lean the right way; the gaps are a date on every next step, an evidence column beside the score, and a decision log that never overwrites.

**Part 1. Session and review practices** (pages fetched 2026-11-01)

| Practice | The ritual | How decisions are kept and revisited | Kill or park | Feature to borrow |
| --- | --- | --- | --- | --- |
| Stage-Gate (Cooper) | A gate meeting at each stage end; gatekeepers own the resources the next stage needs; deliverables fixed in advance; the output is a decision and a plan with the next gate's date | Each Go books the next gate; gates with no real no and no funding consequence decay into status meetings | Go, Kill, Hold (interest, not now; learnings kept), Recycle (back to the gate) | A gate record on every stage change: decision, resources committed, deliverables due, next gate date |
| Shape Up (Basecamp) | A betting table in the two-week cool-down after each six-week cycle; pitches with appetite side by side; one or two older pitches revived by a named person; under two hours | No central backlog; a person, not a queue, brings an idea back; multi-cycle work is re-bet one cycle at a time | Unbet pitches are let go; the circuit breaker stops unfinished work at cycle end instead of extending it | Appetite and circuit breaker per idea: a time budget set at Shaping; when it expires the idea returns to Shaping and must be re-pitched |
| Amazon | PR/FAQ review: twenty minutes reading in silence, forty of discussion, several drafts before a greenlight; OP1 and OP2 planning; a weekly business review that opens with last week's follow-ups | The narrative is the record and is revised between reviews; two-way doors get a light process, one-way doors a heavy one; decide at about 70 percent of the information | Most PR/FAQs are not approved, by design | Door type and information level on every decision line; two-way lines close on the Head of VI's call, one-way lines need a recorded Critic pass first |
| Google X | A funnel with a cadence per stage: rapid evaluation in weeks, investigation in months, Foundry in about a year, then graduation | Kill signals and risk-based milestones agreed at the start; knocking down a major risk unlocks budget | More than half the projects are meant to die; teams that end their own projects are applauded and paid | Pre-registered kill signals with expiry dates, flagged by the digest when they fire or lapse |
| Strategyzer and Lean Startup | An innovation project scorecard after each sprint and in pitch reviews: strategic fit, risk reduction (desirability, feasibility, viability, adaptability), size of opportunity | Each element scored by evidence gathered (none, one experiment, repeated), re-scored as evidence lands; metered funding | Small bets; further investment earned by evidence; a lab head stopped about half the projects to concentrate budget | An evidence-strength column per hypothesis, separate from the rubric score; no idea reaches Proposal on strategic fit alone |
| Venture studios and accelerators (YC, EF, Antler) | Sections of six to ten with group office hours every two weeks; weekly check-ins; investment committees as binary gates | The weakest record of the eight: feedback attached to the next attempt, no published decision log | Hard deadlines; Antler loops a failed team back with specific feedback to answer | A trackout loop: a failed Stress test returns the idea to Shaping with the feedback written into its row as the re-entry criterion |
| Design sprints (GV) | Five days with one Decider; silent note-and-vote; a Friday scorecard with one row per sprint question and one column per customer, yes or no per cell | The long-term goal and sprint questions are written on Monday and answered on Friday | Losing sketches become explicit maybe-laters | A sprint-question scorecard for the Stress test: pre-registered questions as rows, evidence sources as columns, the Head of VI's yes or no per row |
| ADRs (Nygard, GDS) | No meeting by default: a one-page record with context, decision, status and consequences, numbered, kept with the code; review meetings for decision-heavy work | Numbers are never reused; a reversed decision stays, marked superseded and linked to its replacement; a last-reviewed and next-review date | Statuses proposed, accepted, deprecated, superseded; nothing deleted | Immutable decision-log lines with an ID, a status and a supersedes pointer; the sync lists accepted decisions with no next-review date |

Sources: [Stage-Gate overview](https://stage-gate.com/blog/the-stage-gate-model-an-overview), [McKinsey on gates with teeth](https://www.mckinsey.com.br/capabilities/operations/our-insights/make-milestones-matter-with-decision-gatesstage-gates-with-real-teeth), [Shape Up, chapter 7](https://basecamp.com/shapeup/2.1-chapter-07) and [chapter 8](https://basecamp.com/shapeup/2.2-chapter-08), [Working Backwards on PR/FAQ](https://coda.io/@colin-bryar/working-backwards-how-write-an-amazon-pr-faq), [Amazon 2016 shareholder letter](https://www.aboutamazon.com/news/company-news/2016-letter-to-shareholders), [the Amazon WBR](https://commoncog.com/the-amazon-weekly-business-review/), [X's operating manual](https://x.company/blog/posts/a-peek-inside-the-moonshot-factory-operating-manual/), [Strategyzer scorecard](https://www.strategyzer.com/library/innovation-project-scorecard-evidence-trumps-opinion), [Lean Startup principles](https://theleanstartup.com/principles), [Antler programme structure](https://www.antler.co/blog/antler-australia-program-structure-guide-for-aspiring-founders), [EF FAQs](https://www.joinef.com/faqs/), [design sprint guide](https://www.character.vc/guide/design-sprint), [note and vote](https://www.character.vc/guide/note-and-vote), [Nygard on ADRs](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions), [GDS Way ADRs](https://gds-way.digital.cabinet-office.gov.uk/standards/architecture-decisions.html). Unreachable: the PDMA Stage-Gate page, Planview's gate-meeting guide, Antler's residency page (marketing only).

**Part 2. Keeping AI thinking-partner sessions continuous** (pages fetched 2026-11-01)

The pattern that holds across coding assistants, note systems and meeting tools: one always-loaded index with a hard cap, detail on demand, a log with fixed fields written deliberately at session end, and a date on every open item. The lab already has the index (the register) and the log; what it lacks is a health call per session, a date on next steps, and a log that starts from the previous line.

| Pattern | What it does well | Feature to borrow | Not for us |
| --- | --- | --- | --- |
| Claude Projects memory and project knowledge | Memory is per project and editable; large project knowledge is retrieved by search, steered by descriptive filenames | ID-first filenames for the nightly mirror (VI-### slug — type.md), named in the register row | Memory as the decision record: topic-level and unaudited |
| Claude Code memory and CLAUDE.md | An always-loaded index capped at 200 lines, one line per memory, topic files on demand; write only what cannot be rediscovered and anything corrected twice | The register stays the one always-loaded file, one line per idea with its last-session date; detail lives in the doc | Silent background memory; the log is written deliberately |
| Cursor rules, Copilot instructions | Rules are scoped (always, by path, on request, manual); short self-contained statements | Scoped mode playbooks: the Operating Model keeps the always-on rules; each mode gets a short doc loaded when declared | Precedence stacks |
| Session handoff notes (practitioners) | Fixed sections (completed, in progress, blocked, decisions, next steps, gotchas); the next session reads the note back and confirms before acting | Read-back-and-confirm on open: an idea chat's first reply restates the last log line and waits for a yes | One file per session, drifting from the doc |
| Zettelkasten | Fixed IDs; every link states why it was made | Every register edge carries a one-line why (the Note column, made mandatory) | Bottom-up emergence without stages |
| Progressive summarisation (Forte) | A summary layer above the full note, compressed opportunistically when already in the note | A "state of the idea" block at the top of each doc, rewritten only by a session that touches it; the digest reads those blocks | PARA folders |
| Obsidian daily notes and Dataview | Dated logs and stale-note dashboards on an explicit updated field, never file times | Staleness on explicit fields only (already the case) | Daily journaling cadence |
| Granola, Otter, Fellow, Notion meeting notes | Saved reusable questions over all notes; one view of every open action item linked to its moment; pre-meeting briefs of outstanding items; summary lines that cite their source | Saved questions on the dashboard; an open-next-steps digest with backlinks to the log line that created each | Auto-detected items without review |
| Loomio | A proposal closes on a date, the outcome is written above the votes, and a review date triggers a reminder | A review-on date on every stage decision, surfaced by the digest when due | Voting and quorum |
| Linear project and initiative updates | Cadenced lead-written updates with On track, At risk, Off track; Update Missing computed from the cadence; property changes logged beside the text | A health call per session (set at session end) and a computed update-missing state | Progress bars from counts |
| GitHub Projects status updates | Each new update is pre-filled from the previous one; latest on top, history beneath | The session-end log line starts from the previous one, so the thinking partner edits a delta | Free text with no required fields |
| Lab notebooks (LabArchives, Benchling, the paper norm) | Entries are timestamped and cannot be altered; a reviewed entry locks; errors are struck through, never erased | Lock-on-advance: passing Stress test signs the critique pass and freezes the line; later changes are new dated lines that reference the old | Witness and auditor roles |

Sources: [Claude memory](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context), [projects and RAG](https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects), [Claude Code memory](https://code.claude.com/docs/en/memory), [Cursor rules](https://docs.cursor.com/context/rules), [Copilot instructions](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions), [session handoff pattern](https://avisheksaha.com/agentic-playbook/reference/patterns/session-handoff.html), [Zettelkasten](https://zettelkasten.de/introduction/), [progressive summarisation](https://fortelabs.com/blog/progressive-summarization-ii-examples-and-metaphors/), [Obsidian stale notes](https://obsidian.rocks/finding-old-notes-in-obsidian-with-datavie), [Granola](https://docs.granola.ai/help-center/getting-more-from-your-notes/chatting-with-your-meetings), [Fellow](https://fellow.ai/features/action-items), [Notion meeting notes](https://www.notion.com/help/ai-meeting-notes), [Loomio](https://www.loomio.com/docs/en/user_manual/polls/intro_to_decisions), [Linear updates](https://linear.app/docs/initiative-and-project-updates), [GitHub status updates](https://docs.github.com/en/issues/planning-and-tracking-with-projects/sharing-project-updates), [LabArchives audit](https://help.labarchives.com/hc/en-us/articles/15056891877780-How-would-I-conduct-a-notebook-audit), [Benchling review](https://help.benchling.com/hc/en-us/articles/39952586404109-Create-and-use-legacy-review).

**Part 3. What review, decision and digest tooling offers** (pages fetched 2026-11-01)

One data investment unlocks most of this list: a dated snapshot of the register kept at every nightly export. It feeds the what-changed report, time in stage, the funnel and the calibration chart.

| Product or pattern | Feature | Candidate for the lab | Data it needs |
| --- | --- | --- | --- |
| Aha! roadmap history and audit | A panel of scope and timing changes over a chosen range, drillable to who and when | A "what changed since the last review" report over stage, score, lane, owner, next step and links | Dated snapshots |
| Aha! time in status | Time in status and in current status, usable in any list or chart | A time-in-stage column with a stalled filter | Stage-since dates |
| Aha! retrospective report | One page of plan against result per release | A graduation retro card: proposal against delivered at six months | A proposal snapshot and outcome fields |
| Aha! scenarios | A sandbox copy of a plan; nothing applies until reviewed | Weight scenarios: trial quarterly weights, rank deltas, nothing saved | Existing scores |
| Jira Product Discovery views | Publish a read-only view with chosen fields for outsiders | Audience presets (Jithin, team, enterprise) that whitelist fields | A field list per preset |
| Jira Advanced Roadmaps dependencies | Dependency tiles joined by arrows; a red arrow marks a conflict | A dependency conflict check: depends-on edges whose dependent sits in an earlier lane or horizon than its blocker | Links, lanes, horizons |
| Linear project updates | Health per update; Update Missing after a cycle plus three days; changes since the last update reported automatically | An idea health badge with an update-missing state | Session dates, a cadence per stage |
| Productboard roadmaps and insights | Objective to initiative to feature roll-ups with health; feedback weighted plus one to plus three into an importance score | Theme roll-up cards; weighted reuse links feeding demand | Theme links; link weights |
| airfocus portfolio roadmaps | Strategic drift detection for items diverging from objectives | A spine-drift flag: no serves link, or fit below the bar | Links, fit scores |
| Innovation accounting (Ries, Strategyzer boards) | A few leading indicators tracked weekly; boards judge on evidence, risk, money and time spent | An evidence-against-potential map: score against evidence count, bubble size = sessions | Evidence column, sessions |
| Idea-management metrics (HYPE, CrowdWorx) and GitLab value-stream analytics | Time to decision, implementation rate, stage conversion, median duration per stage | A stage funnel with conversion, median days per stage, kill and park rates | Stage transition dates |
| OKR check-ins (Tability, Quantive, Perdoo, WorkBoard) | A check-in records value, confidence and reason; two consecutive misses flagged; outliers between confidence and attainment flagged | A per-session confidence call with a two-ambers flag | A confidence column in the sessions log |
| Confluence decision blueprint, DACI | The first decision page creates a decision register; pages carry status, roles, due date, options, outcome | A decision index with status and closing dates; open decisions due this week digested | Status and due date per decision line |
| Reckon decision journal | A prediction with confidence and review date; check-ins never alter the original; resolution asks whether you would decide the same way; calibration charted | A prediction ledger: each proposal's confirm and refute statements with confidence, resolved at the six-month retro, charted as calibration | Statement, confidence, resolve date, result |
| Notion snapshot diffs, Google Docs change dots, GitHub Projects insights | Highlighted additions and deletions between snapshots; a dot when a file changed since you last viewed it; stage counts over time | An idea-doc diff between the last two sessions; ideas per stage by week | Snapshots |
| Digests (Linear, the Jira overdue digest, Slack recaps) | Batched by urgency, skipping what was already read; sections of ten rows with see-all | Digest sections by urgency, spanning since the viewer's last visit | Due dates on next steps, viewed flags |
| Alert rules (Grafana, Datadog) and nudges (Asana, monday) | A rule is a query, a threshold, an evaluation interval and a pending period, with explicit no-data handling; warn and alert levels; nudges escalate past a threshold | A rule table with warn and alert thresholds and a pending period (a 4+ score still in Seed: warn at two weeks, alert at four), plus an escalation column | Rule definitions, stage and session timestamps |
| Obsidian graph view, Roam backlinks | A local graph with a depth slider, colour groups and a time-lapse of creation order; unlinked mentions made linkable in a click | A depth slider and time-lapse on the graph; a backlinks panel with unlinked slug mentions | Dates; a text scan of the docs |

Sources: [Aha! history](https://www.aha.io/blog/now-track-changes-to-your-roadmap), [Aha! time in status](https://www.aha.io/blog/speed-up-delivery-by-seeing-where-work-stalls), [Aha! retrospectives](https://www.aha.io/blog/introducing-new-release-and-sprint-retrospective-reports), [Aha! scenarios](https://www.aha.io/blog/explore-different-planning-scenarios-in-aha-roadmaps), [Jira Product Discovery views](https://www.atlassian.com/software/jira/product-discovery/guides/views/overview), [Jira dependencies report](https://confluence.atlassian.com/jirasoftwareserver101/the-dependencies-report-in-advanced-roadmaps-1455426747.html), [Linear project updates](https://linear.app/docs/project-updates), [Productboard roadmaps](https://support.productboard.com/hc/en-us/articles/39533393517715), [airfocus roadmaps](https://airfocus.com/product/roadmaps), [IDEO U on innovation accounting](https://ideou.com/blogs/inspiration/innovation-accounting-what-it-is-and-how-to-get-started), [Strategyzer boards](https://www.strategyzer.com/library/how-should-your-innovation-board-make-decisions), [CrowdWorx metrics](https://www.crowdworx.com/resources/idea-management-metrics-a-complete-guide-to-measuring-your-innovation-funnel), [GitLab value stream analytics](https://docs.gitlab.com/user/group/value_stream_analytics/), [Tability check-ins](https://guides.tability.io/docs/tutorials/track-progress-with-check-ins), [Confluence decisions](https://confluence.atlassian.com/display/CONF60/Decisions+Blueprint), [Reckon](https://www.producthunt.com/products/reckon), [GitHub insights](https://docs.github.com/en/issues/planning-and-tracking-with-projects/viewing-insights-from-your-project/about-insights-for-projects), [Datadog monitors](https://docs.datadoghq.com/monitors/configuration/), [Grafana alert rules](https://grafana.com/docs/grafana/latest/alerting/fundamentals/alert-rules/), [Obsidian graph](https://obsidian.md/help/plugins/graph). Unreachable: Notion's page-history help, Perdoo's confidence post, Aha! support pages (blog posts used instead).

**Part 4. The feature backlog, scored**

Twenty-three candidates in three waves. Value is judged on whether the feature changes a decision in the next quarter with seven to thirty rows; size is small (a view over existing data), medium (new register columns or snapshots) or large (new data sources or write-back). Wave 1 needs nothing from the register and fits in half a build session. Wave 2 waits on the Lab-operations chat. Wave 3 is empty of data for a quarter or more and should not be built yet.

| # | Feature | Serves | Precedent | Data needed | Size | Value | Wave |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Capability catalogue view: demand as bubble size, the platform-priority and retirement-watch flags, who creates and who reuses | Q4 | airfocus bubble factor, Productboard, the Operating Model's own rule | Catalogue | S | High | 1 |
| 2 | Dependency conflict check: depends-on edges whose dependent sits in an earlier lane or horizon than its blocker | Q2 | Jira Advanced Roadmaps | Links, lanes, horizons | S | Medium | 1 |
| 3 | Collision candidates: pairs of ideas sharing three or more capabilities, offered as a collision session | Q4 | The Operating Model's rule; Productboard insight links | Links | S | Medium | 1 |
| 4 | Weight scenarios: the scoring matrix with trial weights and rank deltas, nothing saved | Q3 | Aha! scenarios, HYPE live re-rank | Scores | S | Medium (one scored row today) | 1 |
| 5 | Saved questions as one-tap filters: decisions pending, next steps older than 14 days, no theme, blocking questions without an owner | Q1, Q5 | Granola, Otter | Existing | S | Medium | 1 |
| 6 | Theme roll-up card with fit against the spine | Q3 | Productboard, airfocus drift | Themes, scores | S | Low | 1 |
| 7 | Graph depth slider: one hop, two hops, all | Q4 | Obsidian local graph | Links | S | Low | 1 |
| 8 | What changed since the last review: a diff of two snapshots on stage, score, lane, owner, next step and links; field-level "since your last visit" | Q3, Q5 | Aha! history, Notion snapshot diffs | Dated snapshots from the sync | M | High | 2 |
| 9 | Time in stage with a stalled filter; median days per stage on the Pulse | Q2 | Aha! time in status | Stage-since dates | S once the column exists | High | 2 |
| 10 | Health badge with an update-missing state, from a health call made at session end | Q2 | Linear project updates | A health column in the sessions log | M | High | 2 |
| 11 | Decision index: every line with an ID, a status, a door type and a review-on date; "due this week" on the Pulse | Q1 | ADRs, Loomio, Confluence decisions | Decision-log structure | M | High | 2 |
| 12 | Appetite circuit breaker: an appetite end date, a countdown chip, a return to Shaping on expiry | Q2, Q3 | Shape Up | An appetite-end column | S | Medium | 2 |
| 13 | Kill-signal and hypothesis expiry flags in the alert panel and the digest | Q2 | Google X | Signals with dates in the lab record | M | High | 2 |
| 14 | Rule table: warn and alert thresholds with a pending period, replacing the fixed staleness windows (a 4+ score still in Seed: warn at two weeks, alert at four) | Q2 | Grafana, Datadog | Rules in the contract | M | Medium | 2 |
| 15 | Open next steps with due dates and a backlink to the log line that created each; the digest sectioned by urgency | Q1, Q5 | Otter, Fellow, the Jira overdue digest | Next-step due dates and origin | M | High | 2 |
| 16 | Audience presets: a field whitelist per audience with the sensitivity filter | Sharing | Jira Product Discovery publish | A preset per audience | M | Medium, only when the audience widens | 2 |
| 17 | Stage funnel: conversion, median days per stage, kill and park rates | Q3 | CrowdWorx, GitLab value stream analytics | Transition history | M | Medium | 3 |
| 18 | Prediction ledger and calibration chart: confirm and refute statements with confidence at Proposal, resolved at the six-month retro | Q3 | Reckon; the Operating Model's retrospectives | Confidence, resolve dates, results | M | High from mid-2027 | 3 |
| 19 | Evidence-against-potential map: score against evidence strength, bubble size = sessions | Q3 | Strategyzer scorecard | An evidence value per hypothesis | S after the column | Medium | 3 |
| 20 | Graduation retro card: proposal against delivered | Q3 | Aha! retrospective report | A proposal snapshot and outcome fields | M | Medium | 3 |
| 21 | Backlinks from doc text: unlinked mentions of a slug or alias, linkable in a click | Q4 | Roam, Obsidian | A text scan in the sync | L | Low | 3 |
| 22 | Graph time-lapse in creation order | Q4 | Obsidian | Dates | S | Low | 3 |
| 23 | Write-back: set a score or log a decision from the page | Q1 | Jira Product Discovery, Productboard | A single-writer rule | L | Medium | Deferred: H4 says a snapshot is enough until two reviews ask otherwise |

**Process rules for the Lab-operations chat.** These cost nothing to adopt and create the data wave 2 needs; the Operating Model and the register structure change, so they are decided there, not here.

1. A gate record on every stage change: the decision (Go, Kill, Hold, Recycle), what it commits, the deliverables due and the next gate date (Stage-Gate).
2. A door type and an information level on every decision line; a one-way door needs a recorded Critic pass first (Amazon).
3. Decision lines are immutable, with an ID and a status; a reversal is a new line marked superseded that points at the old one (ADRs, lab notebooks).
4. A review-on date on every Park, Kill, Graduate and stage decision; the digest surfaces those due (Loomio).
5. Pre-registered kill signals with expiry dates at Shaping, beside the hypotheses (Google X).
6. Appetite as a time budget with a circuit breaker: expiry returns the idea to Shaping and is never extended (Shape Up).
7. An evidence-strength value per hypothesis (0 opinion, 1 one experiment, 2 repeated); nothing reaches Proposal on strategic fit alone (Strategyzer).
8. The trackout loop: a failed Stress test returns the idea to Shaping with the feedback written as its re-entry criterion (Antler).
9. A health call (On track, At risk, Off track) and a dated next step in every session-end log line, pre-filled from the previous line (Linear, GitHub Projects).
10. Read-back-and-confirm: an idea chat opens by restating the last log line and waiting for a yes (session handoff practice); the thinking partner can start this at once.
11. ID-first filenames for the nightly mirror and a "state of the idea" block at the top of each doc, rewritten only by a session that touches it (Claude Projects retrieval, Forte).
12. The weekly digest lists every open next step with a backlink to its log line, sectioned by urgency (Otter, the Jira digest).

**Critique.** With seven rows, the dashboard is not where the next value is. Rules 1, 4, 5 and 9 would change what the lab decides this month and cost nothing; wave 2 then falls out of the data they create. Wave 1 is cheap and worth half a session, but a catalogue view and a conflict check change few decisions until the register passes fifteen rows. The honest ordering: the Lab-operations chat first, wave 1 beside it, wave 2 after the first snapshots, wave 3 not before mid-2027.

**Recommendation.** Green-light wave 1 as the next build (half a session) and take rules 1 to 12 into the Lab-operations chat with the register columns and the sync export; wave 2 is scheduled when the first dated snapshot exists.

## Open decisions for Jithin

Decided 2026-11-01: Jithin accepted the recommendations (read-only v1, his own audience, a private artifact plus source, Lab-operations changes in their own chat). The Zeta Alpha reading stands.

- [x] Confirm VI-007 lab-dashboard as a feature of VI-006 (registered provisionally; reversible).
- [x] Read-only v1 (recommended), or write-back for scores and decisions.
- [x] v1 audience: Jithin only (recommended; the sensitivity filter is built regardless), or shareable now.
- [x] Delivery: a private artifact regenerated nightly plus the source files (recommended), or a GitHub repo the team can extend.
- [x] Confirm the Zeta Alpha reading of "zeta lab", or name the product meant.
- [x] The two Lab-operations changes (register columns; the sync's export step): decide them in a Lab-operations chat as the scope rule says, or allow them in this chat.
- [x] Go for the research session.

## Decision log

| Date | Decision | By |
| --- | --- | --- |
| 2026-11-01 | Registered as VI-007, a feature of VI-006; idea card and plan drafted; the build waits on the open decisions and a research session | Thinking partner, pending Jithin |
| 2026-11-01 | Recommendations accepted; data contract v1.0 written and validated; P0 dashboard built, tested (22 unit checks) and published as a private artifact with register.json beside it; source delivered; research folded into the scout brief | Jithin (go); thinking partner (build) |
| 2026-11-01 | Scout, second pass: 23-item backlog in three waves; wave 1 proposed as the next build; twelve process rules for the Lab-operations chat; wave 3 not before mid-2027 | Thinking partner, pending Jithin |
| 2026-11-01 | All three waves ordered and built; contract v1.1 with optional fields; version 2 published with a first snapshot in data/history; the register columns, the sync export and the process rules remain a Lab-operations decision | Jithin (order); thinking partner (build) |
| 2026-11-02 | Lifecycle change built into contract v1.2 and version 3: Building and Shipped stages, rejection as a decision type, the Building gate, production surface, governance as a dependency, streams and phases; dashboard moved to Building under S-A | Jithin (order); thinking partner (build) |
| 2026-11-05 | Rebuilt on VI Kit 969f885 (vendored, pinned, never edited in the product) with spring motion, the command center and Jarvis; Jarvis proposes and Jithin confirms; H5 pre-registered | Jithin (order); thinking partner (build) |

## Sources

- [Idea Lab (idea-lab) — Operating Model](https://claude.ai/artifact/2aygX2eWF1ddnJS68nUntF), as of 2026-11-01
- [Idea Register](https://claude.ai/artifact/6WzPg7fvvAf2tn8Z9X2Q2h), read 2026-11-01 (rev 26)
- [Zeta Alpha, A New Neural Search and Insights Platform for Navigating and Organizing AI Research (arXiv, 2020)](https://arxiv.org/pdf/2011.00061), abstract seen in search 2026-11-01, page not opened
