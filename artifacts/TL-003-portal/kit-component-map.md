# ThinkLatent Portal (portal) — Kit component map

7 Nov 2026 · TL-003 portal · design-kit v0.3.0 (efd0a0f) · prepared by the thinking partner for the Head of ThinkLatent

## 1. Summary

The kit now has four layers the portal can draw from:

| Layer | What it holds | Status |
| --- | --- | --- |
| `@kit/kit` (packages/design-kit) | The portal's own blocks: Surface, Tile, Status and Interval, Meter, Sparkline, Bars, DotGrid, PillarStrip, DotField, DataRows, Facts, AgentBrief, and the agent conversation (AgentConversation, Markdown, Reasoning, ToolCall, Confirmation, Sources, Composer, ContextMeter) | Owned, product-ready |
| `@kit/ui` | 63 base components (shadcn on Base UI): table, sheet, drawer, command, tabs, tooltip, hover-card, popover, combobox, calendar, field, input-group, empty, skeleton, sonner, resizable, sidebar, trace, message-scroller, code-block, questionnaire and the rest | Product-ready; never edited, wrapped in `@kit/kit` |
| Vendored, usable through the seven gates | 2,208 of 2,449 components in `@kit/motion` and `@kit/ai` pass licence, network, colour, Base UI, content, render and type gates; `check-usable.mjs` fails a product build that imports anything outside `gates/usable.json` | Usable, but "usable" is a safety bar, not a fit for the portal |
| `@kit/charts` | A specification only: ChartFrame around ECharts wrappers (line, bar, scatter with thresholds, heatmap, funnel, small multiples, distribution with whiskers) | **Not built.** The biggest gap for the portal |

Where the 2,208 come from: animate-ui 856 (771 of them animated icons), origin 607 (form, data and navigation pieces), cult-ui 125, react-bits 125, syntax-ui 94, kokonut 91, magicui 77, coss 54, indie-ui 41, eldora 39, motion-primitives 33, and the AI sets: elements 40, prompt-kit 19, chat 4, kokonut AI 3.

**Choosing order.** Use a `@kit/kit` block if one exists. Otherwise use a `@kit/ui` base component. Take a vendored component only when it does something neither has, and wrap it in `@kit/kit` before the portal imports it. A wrapper is where the kit's tokens, status glyphs, intervals and reduced-motion rules get applied once, instead of on every page.

**Headline findings.**

1. About 250 vendored components earn a place in the portal. The rest are marketing, decoration or novelty, and the kit's rules exclude them (section 2).
2. The strongest new fits are:
   - Origin's steppers, timelines, trees, data tables and file upload.
   - The `@kit/ai` elements for flows, plans, queues, test results, commits and code.
   - Kokonut's uptime card, activity terrain, hold-to-confirm, redaction, diff review, token alternatives, slot picker and timezone planner.
3. Charts are the gap. Every evaluation and operations page needs line, interval and distribution charts. The kit has sparklines and a pillar strip, but no line chart with thresholds, no forest plot for paired differences and no heatmap. Build `@kit/charts` before the portal app goes past Home.
4. Seven of the v6 pilot's asks to the kit can be met from the vendored set by wrapping: info tooltip, sticky section bar, stepper, timeline, light-surface agent chip, dark-tile tooltip and the number rule. The meter already exists.

## 2. Rules for picking

The gates say a component is safe. The kit's rules decide whether it belongs on a portal page:

- **Status is a glyph plus a word.** Any component that signals state by colour alone (dots, coloured bars, badge tints) gets a glyph and a word added in its wrapper.
- **Intervals travel with their numbers** (`84% ± 1`). Count-up and ticker components may animate only the point value, and the interval appears with it.
- **No gauges or donuts for anything compared.** Liquid gauge, spending ring and circular progress are excluded wherever two values sit side by side. A single quota can use the Meter.
- **Motion is for state change, not decoration.** It moves a card between lanes, opens a sheet, or counts a tile up once. Everything honours reduced motion.
- **Glass only at frame, content, raised and overlay levels.** Never body text over an exhibit on glass.
- **The proprietary data is never on screen.** Components that show raw records stay out of data pages unless they render masked text.

**Excluded from the portal** (they pass the gates but break the rules or have no job here):

| Group | Examples | Why |
| --- | --- | --- |
| WebGL and canvas backgrounds | react-bits Backgrounds (Hyperspeed, Lightning, Ballpit), shader and dither heroes (cult-ui), caustics, ink and topo backgrounds (kokonut), warp, meteors and particles (magicui) | Decoration; costly on low-end laptops; 218 of the 241 gate failures are this kind |
| Device and browser mockups | iPhone, Android, MacBook, Safari, Apple keyboard and display (cult-ui, eldora, magicui) | Marketing; the site (TL-016) may use them, the portal does not |
| Marketing blocks | syntax-ui pricing, testimonials, logo clouds, cookie banner, footers; cult-ui marketing hero | Not a product surface |
| Novelty buttons and text effects | glitch, swoosh, plucked and split-flap text; eye-catching, neubrutalism, Star Wars and heartbeat buttons; cursors and trails | They pull attention from the one exhibit |
| Gauges and rings | liquid gauge, spending ring, animated circular progress | Kit rule: no gauges for comparisons |
| Commerce and travel widgets | cart button, boarding pass, seat map, stay picker, tip selector, currency transfer, receipt printer | No job in the portal |
| 3D and gallery carousels | three-d carousel, dome gallery, circular carousel | No job in the portal |
| Rendered JSX from model output | `@kit/ai` jsx-preview | Executes model-written markup; a content risk even inside the gates |
| Animated icon set (771) | animate-ui icons and hugeicons | Lucide stays the icon set. Animated icons are allowed only for one-off state feedback (copy, check, bell) inside a wrapped button |

## 3. Page-by-page map

Paths are the import paths a wrapper uses. "kit" means `@kit/kit`; "ui" means `@kit/ui`. **Bold** marks the pick when several fit.

### 3.1 Home and shell (Home for everyone, app team, foundation developer, validator)

| Need | Component | Note |
| --- | --- | --- |
| Shell with the dock inside the frame | kit Shell D, from the lab dashboard's `dashboard/src/kit` | Upstream it into `@kit/kit` first; the portal is its second consumer |
| Global search and jump-to | **ui `command`**, kokonut `action-search-bar` for the open state | ⌘K: models, projects, runs, use cases, people |
| Breadcrumb across deep pages | ui `breadcrumb` | |
| Six KPI tiles | kit `Tile`, `Sparkline`, `Bars`; motion-primitives `sliding-number` for a count-up once | Interval next to the value, never alone |
| Decision inbox | kit `DataRows`, ui `item`, coss `toolbar` | Each row: agent chip, basis, confidence, one action |
| Agent briefs | kit `AgentBrief` | |
| Active alert or break-glass banner | kokonut `status-island` | One live pill: "Break-glass active · 42 min left" |
| Theme and density | ui `toggle-group` | Not magicui's animated theme toggler |

### 3.2 Models (catalogue, model page, catalogue card, release bundle, lineage, registry, lifecycle)

| Need | Component | Note |
| --- | --- | --- |
| Catalogue cards and filters | kit `Surface`; **coss `segmented-control`** and ui `toggle-group` for filters; origin badges (129–425) | One card grammar for every model |
| Compare two or three models | **origin data tables (466–478)** on TanStack: pinned first column, sorting, column ⓘ | A paired comparison is a table with intervals, not a chart |
| Pillar profile | kit `PillarStrip` | Already the portal's look |
| Release bundle contents | `@kit/ai` elements `package-info`, `file-tree`, `commit`, `schema-display` | A release reads like a package |
| How to call | ui `code-block` (kit grammar set), elements `snippet`; animate-ui primitives `buttons/copy` | Python, TypeScript and curl tabs; OpenAI-compatible |
| Lineage graph (TLM1 to TLM5, Core to Domain) | **elements `canvas`, `node`, `edge` (React Flow, MIT)**; origin `tree` (565–599) for the text view | Graph and tree show the same data; the tree is the accessible one |
| Lifecycle stages | origin `timeline` (530–541) | Proposed, candidate, current, previous, retiring |
| Registry and vendor models | origin data table, ui `hover-card` for the vendor's terms | |

### 3.3 Projects (start a project, projects, project home, usage and keys, live view)

| Need | Component | Note |
| --- | --- | --- |
| Start a project | **origin `stepper` (513–529)**; coss `form`, `fieldset`, `field`, `number-field`; coss `autocomplete` for business line | The v6 step-by-step flow |
| Bring data in | **origin file upload (125–554)**; the S3 staging path as a form | Shows status, never content |
| Phases and gates | origin `timeline` | POC, active build, pilot, production, with gate checks |
| Members | magicui `avatar-circles` or animate-ui `avatar-group`; kokonut `team-selector` to add people | Membership is IAM; the picker only proposes |
| Keys and first call | elements `snippet`; origin inputs with reveal and copy (1–586) | A key is shown once |
| Quotas and limits | kit `Meter`; coss `meter` | One quota, one meter |
| Availability, 30 days | **kokonut `uptime-card`** | Day bars, each with glyph and word on focus |
| Projects portfolio | origin data table; kit `DotGrid` for stage counts | |

### 3.4 Use case running (overview, traffic, latency and errors, capacity, models and canary, traces)

| Need | Component | Note |
| --- | --- | --- |
| Traffic, latency, errors over time | `@kit/charts` line with thresholds (to build) | p50 and p95 as one line each; the SLO as a dashed labelled line |
| Request heatmap by hour and day | **kokonut `activity-terrain`** for the look; `@kit/charts` heatmap for the data view | |
| Error detail | elements `stack-trace` | Engineering view only |
| Capacity and cache | kit `Meter`, `Bars`; coss `progress` | |
| Canary and promotion | kit `Interval` and paired verdicts; **kokonut `hold-button`** to promote to 100% or roll back | Hold to confirm is the one-way-door gesture |
| Routing rules | elements `canvas` and `node` | Read-only in the portal |
| Traces | **ui `trace`**; elements `chain-of-thought`, `tool`, `queue` | Production traces stay sealed; pilot and POC only, by role |
| Call transcripts (speech model) | kokonut `synced-transcript` | Masked text only |

### 3.5 Use case quality and record (quality, improve, record)

| Need | Component | Note |
| --- | --- | --- |
| Review queue | origin data table; ui `kbd` for shortcuts; prompt-kit `feedback-bar` for thumbs | Keyboard-first review |
| Compare two outputs (A and B) | **kokonut `ai-diff-review`**; magicui `code-comparison` for structured output | |
| Citations in an answer | elements `inline-citation`, kit `Sources` | |
| Improve loop: plan, queue, checkpoints | elements `plan`, `queue`, `checkpoint` | The retrain plan as steps a person approves |
| Agents working in parallel (self-healing, SRE) | kokonut `ai-agent-lanes` | One lane per agent, each with its chip |
| Record and evidence | kit `Facts`, `DataRows`; origin `timeline` for history; elements `commit` for versions | |
| Approval checks list | elements `test-results`, restyled with glyph plus word | Checks read as tests that pass or fail |

### 3.6 Workbench (prompts, datasets, alerts)

| Need | Component | Note |
| --- | --- | --- |
| Prompt library and versions | origin data table; elements `commit`; ai-diff-review for version diffs | |
| Prompt editing | prompt-kit `prompt-input`, coss `composer` | |
| Datasets: import and generate | origin file upload; origin `stepper` | |
| Eval sets | origin data table, kit `Interval` | |
| Alert rules | coss `form`, origin `slider` with input (240–561) for thresholds | |
| Escalation chain | origin `timeline` | |
| Digest | kit `DataRows` | |

### 3.7 Training (new run, runs in flight, run history, base models, preflight, checkpoints)

| Need | Component | Note |
| --- | --- | --- |
| New training run | **origin `stepper`**; elements `model-selector` for the base; origin `slider` with input for hyperparameters; coss `number-field`; origin calendar (490–512) to schedule | The Unsloth-referenced fields, on the kit |
| Preflight | elements `test-results` | |
| Runs in flight | coss `progress`; elements `terminal` for logs; `@kit/charts` line for loss curves (to build) | |
| Checkpoints | origin data table, kit `Interval`; paired verdicts | |
| Run history | origin data table with pagination (454–465) | |
| Base models | kit `Surface` cards | |

### 3.8 Data (review queue, tagging pipelines, approvals insight, self-healing marks, dataset versions, knowledge graph)

| Need | Component | Note |
| --- | --- | --- |
| Review queue by stage | **cult-ui `kanban-board`** (motion moves cards between lanes) or origin data table | Kanban for reviewers, table for leads |
| Masked record previews | **kokonut `ai-redact`** | The only way a record appears; real data never leaves the backend |
| Tagging pipelines | elements `canvas`, `node`, `edge` | Pipeline steps as a graph, with status per node |
| Self-healing marks | kit `Status`, origin badges | |
| Dataset versions and diffs | magicui `code-comparison`, ai-diff-review on schema and counts | Counts and schema, not rows |
| Retention | origin calendar | |
| Knowledge graph | elements `canvas` and `node`; origin `tree` for the list view | |

### 3.9 Evaluation (results, index, leaderboard, corrections, requests, trials, contribute, pillars)

| Need | Component | Note |
| --- | --- | --- |
| Run results | kit `PillarStrip`, `Interval`; `@kit/charts` distribution with whiskers (to build) | |
| Paired comparison | forest plot (to build in `@kit/charts`); origin data table | +5 pts ± 2 · Better as a row with a dot and bar |
| Item drill-down | ui `sheet` or `drawer`; prompt-kit `markdown` through kit `Markdown` | |
| Judge calibration | kit `Meter` with word bands for κ | |
| Leaderboard | origin data table: sticky header, pinned model column, column ⓘ | |
| Arena (side by side) | ui `resizable`, ai-diff-review | |
| Requests with votes | cult-ui `feature-voting`, `vote-tally` | |
| Corrections feed | origin `timeline` | |
| Contribute | origin file upload, coss `form` | |

### 3.10 Agents and playground (agent library, agent page, agent evaluation, playground)

| Need | Component | Note |
| --- | --- | --- |
| Agent conversation | **kit `AgentConversation`** (v0.2.0) | Already built for this |
| Prompt suggestions | prompt-kit `prompt-suggestion`, elements `suggestion` | |
| Model choice | elements `model-selector` | Lists TLM first |
| Token alternatives and probabilities | **kokonut `ai-token-alternatives`** | Shows a decision model's (TL-014) choice and its probabilities |
| Agent memory | kokonut `ai-memory` | Shows what a harness session holds |
| Plan and tool approvals | elements `plan`; kit `Confirmation` (not kokonut ai-tool-approval) | One approval grammar |
| Generated files | elements `artifact`, `file-tree` | |
| Variant comparison | origin data table, kit `Interval` | |
| Side-by-side playground | ui `resizable`; origin `slider` for temperature | |
| View code | elements `snippet`, ui `code-block` | |

### 3.11 Approvals and governance (approval, validation, governance portfolio)

| Need | Component | Note |
| --- | --- | --- |
| Check table | origin data table with kit `Status` and `Interval`; elements `test-results` as the compact view | |
| Decision | kit `Confirmation`; **kokonut `hold-button`** to approve or send back | The sign-off is a one-way door |
| Audit trail | origin `timeline`; elements `checkpoint` | |
| Draft validation document | kit `Markdown`; elements `artifact` | |
| Portfolio heatmap | `@kit/charts` heatmap (to build) | |

### 3.12 Operations (unregistered usage, capacity, agents' activity, break-glass, audit export, contract health)

| Need | Component | Note |
| --- | --- | --- |
| Unregistered usage | origin data table; origin `timeline` for the grace policy (day 0, 14, 30) | |
| GPU and team capacity | kit `Meter`, `Bars` | |
| Agents' activity | **kokonut `ai-agent-lanes`**, `activity-terrain` | |
| Break-glass | **kokonut `hold-button`** to request; `status-island` while active; ui `alert-dialog` for the reason | One hour, logged |
| Audit export | coss `form`, origin date-range calendar | |
| Contract health and freshness | **kokonut `uptime-card`** per field | |

### 3.13 Help, settings, Ask ThinkLatent, inbox

| Need | Component | Note |
| --- | --- | --- |
| Ask an expert | kit `AgentConversation` | The agent answers first, then pages a person |
| Knowledge base and FAQ | ui `accordion`; ui `command` for search | |
| Log a problem | coss `form`; origin data table for the open list | Jira-backed status (the ticket, not development work, which is Cortex) |
| Office hours across the US, Canada and India | **kokonut `slot-picker`** and `timezone-planner` | Fits the team's three time zones |
| Settings | coss `fieldset`, ui `switch`, `select` | |
| Inbox | ui `item`; kokonut `notification-stack` for the open state | |
| Empty states | ui `empty` | One empty grammar: what is missing, why, what to do |
| Loading | ui `skeleton`; kit `Reasoning` shimmer for agents | No novelty loaders |
| Toasts | ui `sonner` | |

## 4. Cross-cutting patterns

| Pattern | Use | Wrapper to add in `@kit/kit` |
| --- | --- | --- |
| Numbers | Whole percent, ± in points, κ and PSI as word bands, differences in points | `Num` and `Diff` (the number rule under kit rule 3) |
| Info tooltip (ⓘ) | ui `tooltip` on hover and focus, ui `popover` on tap | `InfoTip`: definition plus source, opens on tap like the context meter |
| Sticky section bar | kokonut `scroll-index`; motion-primitives `scroll-progress` | `SectionBar`: anchor links, current section lit |
| Stepper | origin `stepper` (513–529) | `Steps`: number, title, state as glyph plus word |
| Timeline | origin `timeline` (530–541) | `Timeline`: dated events, gates as checks |
| Data table | origin table pieces on TanStack | `DataTable`: sticky header, pinned first column, one ⓘ per column, intervals in cells, view-as-table for every chart |
| Graphs (lineage, pipelines, routing, knowledge) | elements `canvas`, `node`, `edge` | `FlowGraph` with a tree twin for accessibility |
| One-way-door confirmation | kokonut `hold-button` | `HoldToConfirm`: label states the consequence |
| Masked data | kokonut `ai-redact` | `Masked`: never receives raw text in the client |
| Agent chip on light surfaces | from `AgentBrief`'s chip | `AgentChip` usable outside AgentBrief |
| Uptime and freshness bars | kokonut `uptime-card` | `UptimeBars` with glyph plus word per day |
| Diff | kokonut `ai-diff-review`, magicui `code-comparison` | `Diff` |

## 5. Gaps the kit must close for the portal

These belong to TL-013 design-kit; the portal is asking.

1. **`@kit/charts` is a specification with no code.** Needed: line with thresholds, forest plot for paired differences, distribution with whiskers, heatmap, small multiples, and ChartFrame with view-as-table. P0 for every evaluation and operations page.
2. **Shell D and the record sheet** live in the lab dashboard's wrappers. Upstream them into `@kit/kit` so the portal does not copy them.
3. **The twelve wrappers in section 4**, starting with the five the v6 pages already use: InfoTip, SectionBar, Steps, Timeline, DataTable.
4. **Fourteen components went blank after the Base UI port**, including indie-ui tooltip, toggle-group and slider, and coss menu. None is on this map. Keep it that way until they pass the render gate.
5. **A data-volume check.** The origin tables and React Flow need a test at the portal's sizes (1,186 items, 100-node lineage) before they are committed to.

## 6. Adoption order for the portal build, and decisions

**Order** (matches the build: Home first, then onboarding to production):

1. Shell D and `@kit/charts` line, forest plot and distribution, both in the kit (TL-013).
2. DataTable, InfoTip, SectionBar, Steps and Timeline wrappers.
3. Pages in v6 order:
   - Start a project: Steps, file upload.
   - Project home: Timeline, Meter, uptime bars.
   - Usage: snippet.
   - Training: Steps, model selector, slider.
   - Evaluation: PillarStrip, forest plot, DataTable.
   - Approval: DataTable, HoldToConfirm, Timeline.
   - Models and canary.
4. Graph pieces (FlowGraph) when the lineage, pipelines and knowledge graph pages come up.
5. The kokonut specials, each wrapped once: activity terrain, agent lanes, token alternatives, redaction, slot picker, timezone planner.

**Decisions for the Head of ThinkLatent** (asked as questions in the chat, with the recommendation first):

1. Who builds `@kit/charts`? Recommended: TL-013, before the portal app passes Home, with the portal as first consumer.
2. A vendored component goes through a `@kit/kit` wrapper before a page imports it. Recommended: always; `check-usable` stays the build gate.
3. Hold-to-confirm for one-way doors (promote, approve, break-glass). Recommended: yes, using kokonut's hold button.
4. Batch 2's boards are drawn with these components named in each board's notes. Recommended: yes, so the board and the build use the same parts.
