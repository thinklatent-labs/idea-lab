<!-- Exported from https://claude.ai/artifact/UyE1iU6au9kWBcVRoyangw (rev 4) on 2026-11-04. Read-only mirror; edit the live doc, not this file. -->
# VI design DNA, v0

Nov 3, 2026 · Written as chief UI and chief UX designer in one seat: every line says what the user gets and what the screen does to give it. Colour is deferred to the palette phase; nothing here depends on a hue.

## 0. Method

- **Layout** comes from the first batch (screens 1 to 38, the web-application references, above all the FleetFlow family 5 to 13 and 19 to 35): where things sit, how a page is zoned, what a record, a list, a decision and a conversation look like.
- **Look and feel** comes from the last two batches (39 to 72, the glass and Quarn references) and from the first batch's surfaces: how the zones are rendered, what is opaque, what floats, how numbers and charts are drawn.
- **Colour** is ignored for now. Where a reference uses colour to mean something, the DNA states the meaning and leaves the hue to the palette decision.
- Each DNA line names the screens it comes from so it can be checked, and where the kit's inventory row or model rule already covers it, that row is named.

## 1. Who it is for, and the five jobs a page serves

VI's users are enterprise users who need an answer, SLM builders who need a workbench, the foundation team who needs the engineering truth, and governance who needs to decide. One screen family has to serve all four without becoming four products. Every VI page therefore serves five jobs in a fixed order, and the layout is the order made visible:

1. **Orient**: where am I, what is this, what changed since I was last here (page header, greeting line, KPI strip).
2. **Judge**: is it good or bad, against what (captions, thresholds, intervals, status labels).
3. **Decide**: what is proposed, what will happen if I do nothing (agent column, recommendation card, Needs you).
4. **Act**: approve, review, ask why, draft, send (buttons that live beside the thing they act on, never in a toolbar far away).
5. **Trace**: where did this come from, who did what, when (provenance line, history, engineering view).

From the references: 23, 30 and 12 put all five on one page in this order; 13 is the purest example (strip, tiles, timeline and evidence, recommendation with approval, draft).

## 2. Layout DNA (from the first batch)

### 2.1 The shell

- A thin icon rail on the left with count badges on the items that have work waiting (5, 10, 12, 13, 19, 33, 34); Jithin's dock variant is the collapsed state (row 7). Expanded, it is a normal sidebar grouped by object (row 8).
- A 48 px top bar: search as a command-palette trigger on the left, a Monitoring chip (n watched, n approvals) in the middle when agents run, and the switches and user on the right (10, 30; row 10).
- The content plane sits in a rounded, inset frame with a 16 px gutter from the rail, which is why every reference reads calm: the page never touches the window edge (5, 10, 12, 34).

### 2.2 The page header

- Small-caps breadcrumb from the object path, a back arrow, the object's square avatar, the title, a status pill, a one-line purpose, and two to three actions on the right with the primary one filled (12, 13, 19, 33; row 9).
- A metadata strip under the title for records with many facts (severity, status, customer, owner), each as a small-caps label over a value (13).
- The greeting form for home pages: date line, greeting, one sentence of purpose (30).

### 2.3 The six page archetypes

Every VI page is one of six. Each has a fixed zone order; the kit ships the zones as blocks and a page is assembled, not designed.

| Archetype | Zones, top to bottom | From | VI pages |
| --- | --- | --- | --- |
| Home brief | Greeting; KPI strip (6); flagged-item card beside the agent brief card; one exhibit; one list | 30, 23 | Portal home, lab dashboard home |
| List | Header; tab counts; filter-chip row; data table with object and person cells; floating bulk bar; pagination | 5, 10, 28 | Models, use cases, agents, evidence, approvals |
| Record | Header with status pill and actions; left column of key-value groups; tabs with counts; agent brief card; exhibit with target line; 2 by 2 tiles; two lists | 12 | Model record, use-case record, agent record |
| Decision (exception) | Metadata strip; four tiles with captions; case timeline beside evidence; right column with the recommendation card, approval bar, draft, pattern callout, approval policy line | 13 | Approval, incident, failed evaluation |
| Agent | Dark summary band or hero card; counters over a proportion bar; capability autonomy matrix; guardrail toggles; agent cards with latest action | 33, 34 | Agent library, agent settings (VI-012) |
| Workspace | Three panes: navigation, thread or plan, sheet or canvas; panes scroll on their own; the agent writes into the sheet live | 14, 42 to 44 | Workbench, workflow builder, index authoring |

Dialogs (6, 7, 24, 32) and the chat pane (8, 26) are not pages; they are overlays that follow the same zone grammar in miniature (model rule 8).

### 2.4 The zone grammar inside a page

- **KPI strip**: four to six numbers in one row, each with a small-caps label, a tabular value, a delta chip and a one-line caption (5, 23, 30; row 19). Never more than six; the seventh becomes a chart.
- **Agent column**: when an agent has something to say it gets a column or a card at the top right, never a floating bubble: the brief card (12, 30), the analyst pane (23), the recommendation card (13). Its parts are always chip, sentence, facts, action, provenance.
- **One primary exhibit** with its table beneath or behind a toggle, a labelled target line, a dark tooltip, hatched ranges (12, 18, 23, 55; row 36).
- **Lists** are tables with identity cells (square avatar plus two lines; circle plus role), status as glyph plus text, right-aligned numbers, a kebab per row, and selection that tints the row and summons the bulk bar (5, 10; rows 17, 20, 21, 27).
- **Evidence** is a column of typed cards: photo, note, document with page count, address with hours (13).
- **Timelines** are vertical, glyph per actor, newest where the action is, future items greyed (13; row 28).
- **Forms** are numbered sections with a purpose line, an agent pre-fill banner, field-level warnings and a checklist rail (19).

### 2.5 Density and panes

- Comfortable is the default; compact is a user toggle (row 3) and never changes the zone order, only spacing and size.
- Any page may open a detail pane on the right (row 12); the main area reflows to 8 of 12 columns, each pane scrolls alone, header and top bar stay fixed (rows 13, 15; 14, 49).

## 3. Look-and-feel DNA (from the last two batches, applied to the layout above)

### 3.1 Surfaces: four levels, three families

- **Content plane** is opaque: tables, tiles, cards and text sit on the base and raised surfaces; separation by surface step and 24 to 32 px of space, hairline only where same-level surfaces touch (model rule 6, row 14; 5, 12, 23).
- **Light glass** is the shell and the overlay family: top bar, dock, dialogs, popovers, palette, notification panel, bulk bar, the floating chat pane (40, 41, 53, 54, 64 to 66). Frosted at 72 to 85 percent over a soft neutral gradient so the blur has something to catch; an inner hairline so the edge reads.
- **Dark glass** is the engineering world: the workflow canvas, the engineering view in dark mode, logs and traces, the chat sidebar in dark mode (42 to 47, 50 to 52, 58 to 72). Charcoal at 60 to 75 percent over near-black with a dot grid or one glow; edges glow at ports; the active thing is the only lit thing.
- **Tinted glass** over colour washes (56, 57, 63, 67) is reserved for the palette phase.
- **One dark anchor per page** in light mode: the summary band, the bulk bar, the tooltip or the primary button, never two (4, 10, 16, 33, 34; model rule 5).

### 3.2 Geometry

- Radii: 12 px controls, 16 px containers, 24 px for the content frame and large tiles (5, 12, 56); pills for chips, segments and small buttons (10, 30, 64).
- Borders 1 px at low contrast; no drop shadows on the content plane; overlays get one soft shadow or the glass hairline (model rule 6).
- The content frame is inset from the window with rounded corners; references that touch the edge (1, 3) read heavier for it.

### 3.3 Type and numbers

- Headlines use weight and tone contrast, not size alone: the words that matter in the heavier weight and full tone, the rest lighter and greyer (59, 60, 70, 38). On VI pages this is the one-sentence brief: the finding bright, the context quiet.
- Big numbers carry a lighter unit or decimals (3, 56, 57: 137,036 with the thousands light), and always a caption underneath (model rule 4).
- Small-caps labels for every field and column header (5, 12, 13, 19); sentence case for everything a user reads.
- Tabular figures everywhere a number can be compared (row 4).

### 3.4 Charts

- Flat grey series by default; the active or selected series, bar or range is the only one with weight: hatched fill and a lit top edge (58, 59, 68, 71), a bolder line (16, 23), or a filled dot (55).
- Targets and thresholds as dashed labelled lines (12, 23); ranges and forecasts as hatching (17, 18, 55); events as bands (55).
- Step charts for anything that changes at discrete moments: releases, policy versions, index generations (60, 68, 71).
- Dot-density for distributions with named zones (55); event timelines for severity over days (38).
- One dark tooltip style listing every series with swatch, name and value (16, 17, 12).
- No gauges and no donuts for anything that will be compared; a proportion bar instead (33, 34, 4).

### 3.5 Motion and feedback

- Motion explains a change of state and nothing else: 150 ms for layout, 200 ms for overlays, reduced motion cuts straight (theme item 11).
- Toasts say what remains, not only what happened (19: Kyle added, 3 checks left).
- Glow and pulse are reserved for the newest critical thing and for the active edge on a canvas (38, 42).

## 4. Interaction DNA

- **Propose, then approve.** Every agent output is a proposal with Approve, Review or Why beside it; nothing commits without a person (9, 13, 26, 33; model rule 3). Autonomy is set per capability on a five-step ladder with Approve first as the lock (33).
- **Provenance is always one line away.** Chip, basis line, confidence, View sources, approver and time (6, 12, 23, 32; model rule 2).
- **Context before question.** The chat pane names what it is looking at with chips before the user types (26, 29).
- **Selection summons action.** Selecting rows raises a floating bar; the agent action is last on it (10, 28).
- **Keyboard first for daily users.** Cmd/Ctrl+K, scope chips, the ask-AI row with Tab, a hint footer (29; rows 16, 18).
- **Conditions on the toggle.** Any switch that gives an agent latitude states the condition in its label (7, 19, 33).

## 5. Content DNA

- One sentence of purpose under every title; one sentence of finding at the top of every agent card.
- Captions are outcomes in plain words (below the 95 percent target; 2 on I-80 after 1 PM), never raw deltas alone.
- Status words are the product's own, mapped to five tones (row 21).
- Unmeasured is said with a reason (row 22).
- Numbers are written once, in the formatter library's form (row 6).

## 6. What VI is not

- Not a marketing page: no hero gradients, no illustrations, no trucks (3, 30).
- Not a dashboard wall: no page with more than one primary exhibit or more than six KPIs.
- Not a chat product with a dashboard attached: the agent is a column of the page.
- Not colour-coded: colour is a later layer on a design that already reads in grey.
- Not a spreadsheet: compact density tightens, it never crowds.

## 7. Open questions for the DNA

| Question | Owner | When |
| --- | --- | --- |
| Does the inset rounded content frame survive the detail pane on a 13-inch screen, or does the frame drop below 1280 px? | kit core | kit test |
| Light glass shell on the business view and dark glass on the engineering view: is that the right split, or is dark glass only for canvases? | Jithin | before v0 |
| Settled 2026-11-03: the kit test builds Home brief, Record and Decision (section 8) | Jithin | done |
| Palette: the few-colours-with-jobs model (70) or a status-only palette with no brand accent? | Jithin | palette phase |

## 8. Three portal screens, as they come through the DNA

Three of the portal sketch's screens rewritten against the DNA, one per archetype the kit test is likely to build. Monochrome throughout; where a reference used colour, the meaning is carried another way. Each zone cites its DNA source.

### 8.1 Portal home (Home brief archetype, from 30 and 23)

**Shell.** Dock on the left, five icons (models, use cases, agents, evidence, approvals), a badge on approvals with the count waiting for this user. Top bar: search with the ⌘K hint, a Monitoring chip (6 agents, 3 approvals) in the middle, theme, density and engineering toggles, user. Content sits in the inset rounded frame.

**Orient.** Date line in small caps (Tuesday, 3 November, 11:58 ET), then the greeting (Good morning, Jithin) and one sentence of purpose: Here is what needs your attention across VI today.

**KPI strip, six numbers.** Active use cases 42, caption: 3 onboarded this week. Models in production 9, caption: 2 Domain, 7 Core adapters. Index sufficiency 0.81 ± 0.02, caption: target 0.85, chip: up 0.03. Approvals waiting 3, caption: oldest 2 days. Exceptions 4, caption: 1 critical. Evaluation runs today 118, caption: 94 percent passed. Every value tabular, every caption an outcome in words.

**Flagged item beside the agent brief.** Left: a flagged-item card from the evaluation agent (small-caps: Evaluation agent flagged, 26 min ago), the use case name with a Critical status label (glyph plus word), the window, the score now and the score after the proposed fix side by side, and a thin progress line showing the regression point. Right: the Operations brief card on the raised surface: 6 agents, 92 percent confidence, 11:56; one sentence (Four use cases may miss their quality windows this week; the rest of the portfolio is on plan); contributing causes as rows with proportion bars; proposed actions as rows with chevrons (Rerun 2 evaluations, Retrain 1 adapter, Notify 3 owners, drafts ready); one primary button, Review recommendations; the trust line, every figure links to its source.

**One exhibit.** Index sufficiency over 30 days: flat grey line, the dashed labelled target at 0.85, the interval as a hatched band, the dark tooltip on hover listing score and n. Table beneath on a toggle.

**One list.** Needs you: five rows, object cell (square avatar, name, subtitle), person cell (owner), status label, age, and Approve and Review inline. Nothing else on the page.

### 8.2 Model record: VGLM4 Core on the index (Record archetype, from 12)

**Header.** Breadcrumb MODELS / VGLM4 / CORE in small caps; back arrow; the square model avatar; VGLM4 Core; status label Approved (glyph plus word); one sentence (General Core model for Vanguard tasks; base for the Domain tier); actions right: Message owner, Model brief, and the filled primary, Request usage.

**Left column, key-value groups.** Model health 86 of 100 with a segmented bar and a caption (up 3 since the October release). Owner, generation, released, lineage (VGLM4 → Core), serving (HyperPod, 2 endpoints), governance (validated 14 Oct, next review Mar 2027), with the unmeasured placeholder and its reason where a value is not yet measured. Then Contacts, Top use cases (three rows with load), Documents (model card, validation report).

**Tabs with counts.** Overview, Evaluations 312, Use cases 18, Documents 6, Approvals 2, History. Each with its own URL.

**Agent brief card.** Small caps: Index agent, model brief, updated 11:56. One sentence: Core is above target on seven of nine pillars; compliance and entity recognition sit below target after the October data refresh. Fact chips: 7 of 9 pillars above target, 0.81 ± 0.02 sufficiency, 18 active use cases, 2 pillars below target. An Opportunity callout: a compliance adapter would lift the two weak pillars; evidence from 3 use cases. Action chips: Open pillar detail, Propose adapter (drafts the VI-011 request), Schedule review.

**Exhibit with target line.** Sufficiency by pillar over 90 days, nine flat grey series, the two below target drawn with weight, the dashed target line labelled, the dark tooltip listing all nine. Period segment 30d, 90d, 1y.

**Tiles, 2 by 2.** Active use cases 18, caption 3 onboarded this quarter. Evaluation runs 312, caption last 30 days. Cost per 1k tasks, value with lighter decimals, caption down 4 percent after quantisation. Latency p95, caption inside target.

**Two lists.** Recent evaluations (three rows, status label, score with interval, open arrow) and Conversations about this model (two rows with avatar and snippet).

**Engineering view** adds, without changing the hierarchy: full history list, the serving configuration as a code block, the raw evaluation JSON, and compact density if the user chose it.

### 8.3 Usage approval for a use case (Decision archetype, from 13)

**Header.** Breadcrumb APPROVALS / UA-0291 / ADVISOR SUMMARY; back arrow; title: Approve Advisor summary on VGLM4 Core; actions: Assign, Open use case, and the filled primary, Approve usage.

**Metadata strip.** Severity, Status (Waiting for you), Use case, Model, Opened (by the Governance agent, 11:48), Owner, as small-caps labels over values, the owner with a circle avatar.

**Four tiles with captions.** Evaluation score 0.84 ± 0.03, caption: above the 0.80 threshold. Policy checks 11 of 12, caption: one check needs a human. Similar approvals 4, caption: in the last 90 days, all granted. Exposure, Medium, caption: customer-facing, propose-only.

**Case timeline beside evidence.** Left: the vertical timeline, glyph per actor: evaluation run completed; policy checks run by the Governance agent; one check routed to a human; waiting for your approval; next review scheduled (greyed, future). Right: evidence cards: the evaluation report (document, 4 pages), the failing check with its rule text (note), the threshold table (every threshold with its value and source policy), the harness policy (propose-only, with a lock).

**Right column, the recommendation card.** Small caps: Governance agent, 94 percent confidence, 7 min ago. Title: Approve with one condition. What happened, Why, Recommendation in three labelled lines. Three outcome numbers: 0.84 score, 0 new policy breaks, 30-day review. The approval bar: Needs your approval, customer-facing. Buttons: Approve with condition, Other conditions, Dismiss.

**Below it,** a draft message to the use-case owner from the Governance agent with tone chips and Edit, Don't send, Send; a pattern callout (second approval for this model this month; set up a standing review); and the approval-policy line with the lock: your approval, 15 min SLA, escalates to the Head of VI at 12:10.

### 8.4 What these three expose

- The home page needs the agent brief and the Needs-you list before it needs anything else; both depend on VI-009 telemetry and VI-012 agents, so the kit test can ship them with sample data and the portal with real data later.
- The model record is the heaviest page and is where compact density and the detail pane (rows 3 and 12) will be judged.
- The approval page is where the kit meets governance: the threshold table, the approval-policy line and the propose-only lock are kit blocks, and governance will read them before the usage-approval record cites them.
