# Design and vocabulary audit: ThinkLatent Portal prototype against the v6 boards

Audit only; nothing outside /home/claude/work/audit/ was changed. The client is "the Enterprise".

**Evidence**
- Boards were rendered at 1440 wide in headless Chrome, as static HTML because support.js is missing. They are in `shots/boards/`: v6-Main, v6-J3-Overview, v6-V1-Approval, v6-J4-Traffic, v6-M2-ModelPage and Dark-Home.
- Prototype screens were taken with shot.py at 1280 wide on the pilot day. They are in `shots/`:
  - `p-app-home` and `p-journey`;
  - `p-approver-req` (/requests/UA-0291);
  - `p-ops-alerts`;
  - `p-models`;
  - `p-head-home`;
  - `p-journey-dark`.
- Readable slices of both sets are in `shots/sl/`.
- I also read the following:
  - the kit's rules in `design-kit/.claude/skills/design-kit/SKILL.md`;
  - `design/kit-test-v0`, including its README;
  - `vendor/design-kit/packages/design-kit/src/index.ts`, its wrappers and README;
  - the prototype source in `apps/portal/src`;
  - the "Experience rules (v6)" section of requirements-v1.md.

---

## A. Why the prototype feels like a stripped-down version of the boards

### The short answer
The prototype kept the boards' *information* and *journey logic* but dropped the kit's *visual system*. It has:
- no Shell, so there is no dock, glass field or top bar;
- no glass, because nothing sits behind the surfaces;
- no tiles except on the journey, and those have no sparklines and smaller numbers;
- at most one chart per page, and often none;
- no agent chips;
- almost no ⓘ;
- no sticky section bar;
- no Decision Red.

Every section is the same flat white card with a 16 px heading and 13 px grey text. That sameness is what reads as "stripped down". The boards are dense but layered: glass over a green field, number tiles, one strong exhibit, a red-edged decision block, then tabbed detail.

### Element by element

| Element | v6 boards | Prototype | Gap |
|---|---|---|---|
| Hero or exhibit | Each board has one strong exhibit straight after the tiles. **J3:** two line charts, quality against the bar and tasks per day. **J4:** a 30-day TTFT area chart with the SLO line and a "Reading the chart" fact panel. **V1:** "Evidence against the bars", a table with a dot, interval and dashed bar tick per measure. **M2:** a pillar profile with an interval strip per pillar against three releases. **Main:** "Quality against the bar", a table with an interval band per use case. | The "hero" is a pale-green coloured box with a sentence and a button: "Your next step", "What is asked" and "Where things stand". **Journey:** stage stepper, then a checklist, with no chart at all. **Head:** a bar chart of 2/2/2/0 with 0.5 ticks. **Models:** a card grid. **Alerts:** its one chart sits below the fold. | The boards answer "how is it doing" with a picture. The prototype answers with prose. |
| KPI tiles and density | A row of 4 Tiles on every board: ring icon, open arrow, 52 px number, caption, and a sparkline or bars at the bottom right. V1 makes one tile ink ("Similar approvals") and adds a meter in another ("Your decision 103 min left"). | Only the journey has tiles. Its 4 tiles use `valueSize={36}`, which the kit reserves for short words (numbers should be 52), and no `spark`. Approver, alerts, models, head and app home have none. | Kit `Tile.spark`, `Sparkline` and `Bars` are unused. |
| Glass and surfaces | A green radial "fields" backdrop sits behind the page head, so content surfaces read as frosted glass. Raised surfaces are used for side sheets. Ink is used for one contrast tile. Coloured is used for the agent brief, and in dark mode for the black-to-green brief. | No fields backdrop. `kit-surface-content` sits on a flat grey page, so it reads as plain white cards. `surface="coloured"` is used 18 times as a hero carrying body text. Raised and ink are never used. | Kit rule 7 is not visible. The vendored kit has no fields layer: it lives in the playground Shell. |
| Charts per page | **Main:** 4 tile sparks, 1 table with interval bands and 1 line chart in the "Why" sheet. **J3:** 4 sparks, 2 line charts, 1 adoption bar table and 1 adopted-teams strip. **J4:** 4 sparks, 1 area chart and 1 budget bar. **V1:** 4 tiles with a meter, plus 12 interval strips. **M2:** 1 spark, 5 pillar strips, 1 cost bar and 1 releases line. | Journey 0, app home 0, models 0, head 1 (a weak bar chart), approver 1 (a ForestPlot, good), alerts 1. | Unused: Sparkline, Bars, DotGrid, PillarStrip and DotField. |
| Agent briefs | **Every agent output** carries an agent monogram chip (EV, SR, GA, OB, TA, IX), a basis line, a confidence figure and View sources (rule 5). Examples: "Operations brief · 6 agents · 92% confidence", and the GA draft message with tone switch. | `AgentBrief` is used only in ops/Capacity. **Approver:** "The Evidence agent recommends … Basis: …" is prose with no chip, confidence or sources. **Head:** "Recommended: Send back…" names no agent at all. **Start:** "The agent recommends the Advice domain model". | Breaks kit rule 5. |
| Tooltips | ⓘ on tile titles, column headers ("AGAINST THE BAR ⓘ") and "As of 11:58 ET ⓘ" on every surface, at about 10 to 15 per board. | `InfoTip` appears only in flows/Start and flows/DataEvaluate. No as-of footers, so the "every number has a source and as-of" rule is missed outside charts. | |
| Sticky section bars | J3, J4 and M2 have a pill rail: Overview · Performance · Models · Quality · Improve · Record. J4 adds a sub-bar (Traffic, latency and errors · Capacity and cache · Traces). V1 has a section bar with counts: Decide 4 · What it names · Evidence · Policy checks 10 of 12 · Findings 1 critical · Conditions 3 · Attestations · Similar approvals · Audit trail. | No section bar. The kit `SectionBar` wrapper is vendored but unused. Detail sits behind "Look closer" cards that open sheets up to `max-w-3xl` (768 px). The v6 rule says side sheets stay within 420 px. | |
| Brand green | Dark-green primary buttons ("Open the record", "Decide", "Propose adapter"). Green dock active state with glow. Green stage chip ("Pilot in production"). Green series in every chart. | Green appears on the active menu pill and in the pale coloured box. Primary buttons are white pills ("Decide UA-0291 →", "Start →"). Stage shows as grey text with a ring glyph. | |
| Decision Red | Red count badge on "Needs a decision 4". Red-edged decision surface. Red primary for the recommended one-way door ("Send back", "Sign off"). Red regression line and markers. Red dock badges. | Red appears only on "Blocked" words, "Below bar" glyphs and the outline of "Hold to send back". There is no "Needs a decision" block anywhere. | |
| Typography scale | Page title about 40 px, light (kit-display). Section titles about 22 px. Tile numbers 52 px. Captions 12 px. | Page title 30 px (`md:text-3xl`), section titles 16 px (`text-base`), tile numbers 36 px. `text-[13px]` is used 121 times, so everything sits at one size. | Too little contrast between levels. |
| Dark mode | Dark-Home: black page with a dot grid, glass tiles, and the brief as the black-to-green coloured gradient with grain. Green bars in tiles. | Flat black cards, with no green except the active pill and the stepper. It is correct, but lifeless. | It inherits every gap above. |
| Shell and dock | **Shell D:** brand mark, search with ⌘K, the day's meetings chip, Theme / Comfortable / Engineering toggles, and a glass dock rail of 10 icon buttons with badges inside the frame. | Brand pill and "Portal", then a Workspace button and a moon icon. Below that, a second row holds a text menu of pills ("Home, My use cases, Models, Ask, All") and the story-day pill. There is no search, ⌘K, badges, density or engineering toggle. | Breaks kit rule 6. **The kit does not export `Shell`:** it lives only in `design-kit/apps/playground/src/shell.tsx`, even though the kit README lists `shells/`. This is a design-kit (TL-013) ask, not something to write in the portal (D-202). |
| Empty space | Dense but with air. Every surface is full width with two-column internals (a list plus a "Why" sheet beside it). | App home has about 560 px of content in a 900 px viewport. The coloured hero text is capped at `max-w-2xl`, so its right half is empty. The models grid has a 10th card alone in a row. Head home is 6 cards with one line each. | The air is empty, not structured. |
| Icons | Dock icons. Ring icons on every tile. Agent monograms. Status glyph plus word everywhere. Icons on tab counts. | Ring icons only on the journey tiles. Menu is text only. No agent monograms. Status uses a custom `StateLabel` in shell/parts.tsx rather than kit `Status`. | |
| Time window and compare | Live/24h/7d/30d segmented control, a "Compare to previous" toggle, and "Preview as" on Main. | None. | |

### Kit blocks the boards use and the prototype does not

| Block (kit name) | Where the boards use it | Prototype |
|---|---|---|
| `Shell` (D), dock, top bar, fields | Every board | Not used. The vendored kit does not export it, so it must be requested from TL-013. |
| `Surface` levels raised, ink and frame (glass) | V1 ink tile; side sheets on raised | Only content and coloured |
| `Tile` with `spark` (`Sparkline` / `Bars`) and 52 px value | Every board, 4 per page | Journey only: 36 px and no spark |
| `PillarStrip` (bars as ink, decision colour on the miss) | V1 evidence table, M2 pillar profile, Main quality table | Not used |
| `DotGrid` / `DotField` | Adoption and teams strip (J3), distribution hero | Not used |
| `AgentBrief` (chip, basis, confidence, View sources) | Main, J3, J4, V1, M2 | Only on ops/Capacity |
| `SectionBar` (sticky, with counts) | J3, J4, V1, M2 | Not used |
| `InfoTip` | All tiles, column headers, as-of lines | 2 flow files |
| `Interval` in tables | V1, M2, Main | Quality panel only |
| `Meter` | V1 "Your decision" SLA tile, policy checks | Ops home and capacity only |
| `DataRows` (floating rows, no table chrome) | Main "Needs a decision", V1 "What this approval names" | Not used (`Facts` is used) |
| KPI row (4 tiles), MetaStrip of chips under the title, RecommendationCard | Every board | Not present. MetaStrip and KpiStrip are named in the kit README but not exported yet. |
| `@kit/charts` LineChart against the bar, area chart with SLO | J3, J4 | Used in panels and alerts, but not on any first screen |

### What the prototype gets wrong against the kit rules (SKILL.md)
1. **Rule 1, orient → judge → decide → act → trace.**
   - The approver page puts "What is asked" first and the decision last, with no Decide anchor.
   - The journey has no *judge* exhibit; the checklist goes straight to act.
   - Head home's only exhibit is a 4-bar count chart with fractional ticks.
2. **Rule 5, agent outputs.** They lack the chip, confidence and View sources: approver, head home, Start flow and the journey's next step.
3. **Rule 6, Shell.** The prototype uses a hand-built top menu row, not Shell D with the dock inside the frame. The workaround is acknowledged in Shell.tsx.
4. **Rule 7, glass.**
   - The coloured surface carries paragraphs of body text as a page hero; it should hold a brief or a decision.
   - No glass is visible, because there is no backdrop.
   - Side sheets are 768 px rather than ≤ 420 px (v6 rule); whole pages sit in a sheet.
5. **Tile contract.** Numbers are at `valueSize 36` (the kit says 52 for numbers) and the spark slot is never used.
6. **Rule 2, status.** Status labels use a portal-local `StateLabel` instead of kit `Status`. The journey also marks the two actionable findings "Blocked" while giving them a "Fix this" button. They are below their bar and yours to fix: that is To do, not Blocked (see B).
7. **v6 text and tooltip rules.**
   - Paragraph text inside sections, such as the alerts "Why" and "Who owns the next step" blocks.
   - Almost no ⓘ, and no as-of on surfaces.
8. **Counterpart missing.** There is no model page: `/models` is the catalogue, and the M2 counterpart does not exist. The catalogue cards show no pillar profile or interval strip, which the board relies on.

### Ranked design changes (journey structure kept: stage tracker → "to reach" checklist → health → detail → history)

| # | Change | Effort |
|---|---|---|
| 1 | **Adopt Shell D.** Glass dock rail inside the frame with icon buttons and badges. Top bar with ⌘K search, the date/meetings chip, the Workspace switcher, Theme / density / Engineering toggles, and the fields backdrop. Move the story-day control into the top bar as a dashed "prototype" chip. First raise a TL-013 request to export `Shell` from `@kit/kit`: it exists only in the playground today. | M, plus the kit ask |
| 2 | **Put a KPI row of 4 `Tile`s with sparklines at 52 px on every first screen.** Journey (add spark and 52), approver (use-case score, checks n of m, your decision with SLA meter, similar approvals as ink), alerts (open, time to resolve, availability, error budget), head home (decisions waiting, attestations due, eval runs today, in production), app home (the selected use case's quality, safety, TTFT, tasks a day). | M |
| 3 | **One primary exhibit per page, straight after the tiles.** Journey: "Measures against the bars", a `PillarStrip` or interval-band row per measure. It explains the blockers visually, sits above the checklist, and keeps the checklist as the act step. Head home: the "Quality against the bar" table with interval bands, replacing the 2/2/2/0 bar chart. Alerts: move the INC chart up to the top. | M |
| 4 | **Replace every prose recommendation with `AgentBrief`** (agent chip, basis, confidence, View sources). Covers approver "What is asked", head "Your next step", journey "To reach Production", the Start-flow model pick and the alerts hero. | S |
| 5 | **Add a "Needs a decision" block with Decision Red** (red count badge, red-edged surface, numbered items, one primary per item, the recommended one-way door in red via HoldToConfirm). Add it to head home, approver (moved above the evidence, with a Decide anchor) and the journey when a request has come back. | M |
| 6 | **Add a sticky `SectionBar` under the page head.** Journey: Overview · Performance · Models · Quality · Improve · Record, as the v6 rail of six with Cost folded into Performance or Record. The tracker, checklist, health and history stay on Overview, and the "Look closer" cards go. Approver: Decide · Evidence · Checks · Test it · Record, with counts. Detail opens as sections, not 768 px sheets. Item sheets stay at 420 px or less. | M |
| 7 | **Turn on glass properly.** Fields backdrop behind the head (comes with 1). Content surfaces on glass. Raised for sheets. One ink tile per page at most. Coloured only for the agent brief or decision. Remove the pale coloured hero carrying body text. | S |
| 8 | **Fix the typography scale.** Page title 40 px light (kit-display). Section titles 20 to 22 px. Tile values 52 px. Captions 12 px. Cut `text-[13px]` back to captions, so body copy returns to 14 px. | S |
| 9 | **Add `InfoTip` and as-of everywhere.** Put an ⓘ on each tile title and table column header, and an "As of 11:58 ET ⓘ" footer on every surface, about 10 to 15 a page. Definitions move out of prose into the tips: bar, Official run, pass^3, floor. | S |
| 10 | **Add a meta-chip strip under the title** on the journey, approver and model views, with green for the live stage. Journey: stage chip, "Production · aggregates only", prod alias → model, canary → candidate, open alerts, owner. Make primary buttons brand dark green. | S |
| 11 | **Show intervals in the approver's checks.** Render "The checks" as a DataTable with a bar, run, interval strip, base run and result per measure (V1's "Evidence against the bars"), not prose rows. Keep the ForestPlot as the "against the model it replaces" exhibit. | M |
| 12 | **Fill the empty homes.** App home: a "What the agents found" list, open alerts, runs and jobs in flight, and what needs your approval (requirements H1/H3). Models: a pillar profile strip per card plus a model page route for the M2 counterpart. | M (L with the model page) |
| 13 | **Use the kit's icons and status.** Replace `StateLabel` with kit `Status` (glyph plus word, five tones). Put ring icons on all tiles, agent monograms on all agent lines and icons in the dock. | S |
| 14 | **Add a time window and compare control** (Live / 24 h / 7 d / 30 d, plus Compare to previous) on the journey, alerts and head home. Charts then show the previous window dashed, as on J3. | S |
| 15 | **Check dark mode once 1, 4 and 7 land.** The coloured AgentBrief becomes the black-to-green brief with grain, and tiles get green sparks. Check contrast of body text over the coloured gradient. | S |

---

## B. Journey vocabulary

### What the prototype says today (inventory)

**Stages.** The stepper is labelled "Stage" and reads Start · POC · Active build · Pilot in production · Production.
- The phone view says "Stage 4 of 5".
- Step states are Done / You are here / Upcoming.

**Day titles in the scenario** (each pairs with a stage): Project started (Start) · Sandbox ready (POC) · Building (Active build) · Ready to ask for a pilot (Active build) · Pilot, a month in · Fixing the findings · Ready to ask again (all three Pilot in production) · In Production (Production).

**Story-day control.** "Story day 5 of 8 · 5 Nov · Pilot, a month in", with the labels "Previous story day" and "Next story day". The aria label is "Story day (prototype control)". It also appears in prose: 'Use "Next story day" to see where it leads.'

**Journey sections.**
- **The checklist block.** Its heading is "To reach Production", or "Keeping it healthy" once there is no next stage. The hint beside it reads "3 left", "Ready" or "Nothing blocks you". Met items fold under "8 already met".
- **"How it is doing".** Hint: "Open a number for the detail". Empty state: "No live numbers yet. They start when the pilot does."
- **Other sections.** "Look closer" and "What has happened".
- **Labels elsewhere.** "Your next step" (homes), "Where things stand" (ops), "What is asked", "The checks", "Below their bar", "Test it yourself" and "Your decision" (approver).

**Panels.** Performance · Quality · Models and canary · Improve · Record · Cost. The v6 rail of six is Overview · Performance · Models · Quality · Improve · Record.

**Flows.** The flows and their button labels:
- Start a project (button "Continue setup", next step "Continue setup: step 2 of 4").
- Make your first call (button "Make the first call").
- Bring your data in and run an evaluation (button "Bring data and evaluate", checklist "Bring your evaluation data in").
- Ask for the next stage / Ask for {target} (buttons "Ask for a pilot", "Ask for Production", "Ask for Production again").
- Fix the findings (buttons "Fix this", next step "Fix the 2 findings blocking Production", panel "Improve").
- Watch the canary.

**Checklist states.** Done · To do · Blocked · Waiting, plus "already met".

**Workspaces.** Application team · Foundation team · Approver · Head of ThinkLatent · Operations · Explore.
- The requirements and board V1/Main instead use Application team · Foundation developer · Validator · Head of ThinkLatent · Everyone.

**Menus.**
- **Application team:** Home · My use cases · Models · Ask · All.
- **Approver:** Requests · Evidence · Playground.
- **Head:** Decisions · Portfolio · Index. "Index" goes to the same `/evidence` page that the approver menu calls "Evidence".
- **All:** groups pages under "Projects portfolio", "Requests and approvals" and "Index and leaderboard".

**Gate words.**
- "bar", "floor" (Safety floor, policy floor), "gate" (pilot gate, regression gate, "gate pillar"), "check" (8 of 10 checks met), "threshold" (requirements), "pillar", "measure" (V1 board header).
- Results are worded "met", "cleared", "clears every bar", "Below bar", "Below their bar" and "Within the bar".
- Run and stage terms: "Official run", "Official evaluation", "Practice", "canary", "candidate", "checkpoint", "Retraining", "Owner attestation", "Tier-2 review", "kept warm for roll-back", "pass^3, long threads".

**Object words.** "use case" (about 120 occurrences in the source) against "project" (17).
- "Start a project" creates a use case.
- Home says "Your use cases" next to a "+ Start a project" button.
- IDs UC-0291 (use case) and UA-0291 (request) differ by one letter: "Decide UA-0291", "See the use case".

### Problems

1. **"Use case" against "project".** The requirements make the *project* the unit of membership that holds use cases, and the phase stepper lives on the Project home (J2). The prototype has one use case per project, never shows a project, yet the flow is "Start a project". A new team member cannot tell whether these are two things.
2. **"Stage" against "phase".** The prototype says stage. The requirements (J2, J9, the access model, "Phase move") and the boards ("2 phase requests", "Phase · Pilot in production → Production") say phase.
3. **Stage names drift from the requirements.** Requirements: POC → Build → Pilot in production → Production, four phases, with a Draft record before POC. Prototype: 5 stages, adding "Start" and using "Active build".
   - "POC" is an acronym the stage itself calls "Sandbox".
   - "Active build" has no inactive counterpart.
   - "Pilot in production" against "Production" is the hardest pair for a newcomer: both are "in production".
4. **Five words for "the score you must clear":** bar, floor, gate, threshold and check.
   - "Gate" also means the regression gate and a pillar type ("gate pillar").
   - "Floor" is a bar set by policy, but nothing says so.
5. **"Blocked" is misused.** The two findings show "Blocked" with a "Fix this" button. Blocked should mean "can't start until something else is done"; these are actionable now.
6. **"Waiting" doesn't say on whom or until when.** The detail line carries it, but the state word reads the same for the canary (a date) and the attestation (a person).
7. **Section headings are conversational and change by page.** "How it is doing", "Look closer", "What has happened", "Where things stand", "What is asked" and "Your next step" are fine individually, but they do not match the v6 rail (Overview, Performance…). The requirements call the same thing "health" ("phase and health").
8. **"Story day" is a prototype mechanic dressed like product chrome.** A reviewer may think it is a real feature.
9. **Several verbs for the same action.**
   - **Fixing:** Fix this / Fix the findings / Improve / Fix the 2 findings blocking Production.
   - **Asking:** Ask for a pilot / Ask for the next stage / Ask for Production again / Request Build (requirements).
   - **Data:** Bring data and evaluate / Bring your evaluation data in / Bring your data in and run an evaluation.
10. **Workspace names mix kinds of word.** Most are roles (Application team, Operations), one is a verb (Explore), and they disagree with the requirements: Approver against Validator, Foundation team against Foundation developer, Explore against Everyone. The head menu's "Index" and the approver's "Evidence" are the same page.
11. **Jargon on the app-team journey:** "pass^3, long threads", "canary", "checkpoint promoted to candidate", "Official run", "Tier-2 review", "kept warm for roll-back". Each is fine behind an ⓘ, but none should be the only word on a checklist line.

### Controlled vocabulary

| Concept | Current words (all variants) | Proposed word | Why |
|---|---|---|---|
| The thing that moves through the lifecycle | use case, use-case, project, "Start a project", "My use cases", "Your use cases" | **use case** (and "Start a use case") | It is what the person owns and watches. "Project" stays as the membership container in Access settings only, never on the journey. If projects ever hold several use cases, show the project as a breadcrumb above the use case. |
| A step in the lifecycle | stage, phase, "Stage 4 of 5", "phase requests", "Phase move" | **stage** | It is plain English and already on screen and in the Lab's own vocabulary. Update the requirements (J2, J9, the data-point table) from "phase" to "stage". |
| The lifecycle stages | Start, POC, Active build, Pilot in production, Production; Draft; Sandbox | **Set up · Try · Build · Pilot · Production** (alternatives below) | Each is a plain verb or noun, there are no acronyms, and no two stages both say "production". |
| The approval to move to the next stage | pilot gate, request, ask for, Request Build, approval, decision, UA-0291 | **Pilot approval / Production approval**. The act is "Ask for pilot approval"; the object is "request". | "Gate" collides with the regression gate and gate pillars. "Approval" says who decides. |
| A score you must clear | bar, floor, threshold, gate, "the checks" | **bar**; a bar set by policy is a **policy bar** (e.g. "Safety policy bar 85%") | One word, defined once in an ⓘ: "cleared when the lower end of the interval is at or above it". "Floor" becomes "policy bar", because what matters is who set it. |
| One tested item in an approval | check, bar, measure, pillar | **check** ("8 of 10 checks met") | A check covers bars and rules (availability, review cadence). "Pillar" stays on Index pages. |
| What is measured | pillar, measure, dimension | **measure** (on use-case and approval pages); **pillar** (on Index pages only) | Matches V1's "MEASURE" header. "Pillar" is TL Index method language. |
| A failed bar or problem raised | finding, F-0412, "Below bar", "coming back with findings" | **finding** | It is already consistent; keep it. |
| An evaluation that counts as evidence | Official run, Official evaluation, evaluation, run 1183 | **Official run** (non-citable: **Practice run**) | It is a TL Index term the approver relies on. Always pair it with an ⓘ the first time on a page. |
| Fixing findings | Fix this, Fix the findings, Improve, "Fix the 2 findings blocking Production" | Flow **Fix findings**; row button **Fix**; panel **Improve** (the plan and its progress) | One verb for the action, one noun for the place. |
| Getting data in | Bring data and evaluate, Bring your evaluation data in, Bring your data in and run an evaluation | **Add evaluation data** (step) → **Run an evaluation** (step); flow **Add data and evaluate** | Short, parallel and imperative. |
| Asking for the next stage | Ask for a pilot, Ask for the next stage, Ask for {target}, Ask for Production again, Request Build | **Ask for {stage} approval**; resubmission is **Ask again** | Same sentence at every stage. |
| Checklist state: yours to do now | To do; "Blocked" (misused on actionable findings) | **To do** | Actionable findings are To do. |
| Checklist state: needs an earlier item | Blocked | **Blocked by {item}** | Says what unblocks it. |
| Checklist state: on someone else or a date | Waiting | **Waiting on {person}** / **Waiting until {date}** | Says whom or when. |
| Checklist state: complete | Done, already met, met, cleared | **Done** for steps; **Met** for bars and checks ("8 met") | Steps are done, bars are met. Don't mix them in one list. |
| Stepper states | Done, You are here, Upcoming | **Done · Now · Next** (or keep "You are here") | Shorter, and fits the phone. |
| Live numbers on the use case | How it is doing, health, Health is on the use-case page | **Health** | Matches the requirements ("stage and health") and works as a tile-row title. |
| More detail on the use case | Look closer, panels, rail | **The section bar:** Overview · Performance · Models · Quality · Improve · Record | The v6 rail of six. "Look closer" goes. Cost becomes a section of Performance (or Record). |
| History | What has happened, timeline, audit trail | **History** (the audit trail stays in Record) | One word. |
| Single next action | Your next step, Next:, nextStep | **Your next step** | Keep it, and use it on the journey too, not only on homes. |
| Prototype time control | Story day 5 of 8, Next story day, Previous story day | **Demo date** (see below) | Marks it as a demo control, not product chrome. |
| Workspaces | Application team, Foundation team, Approver, Head of ThinkLatent, Operations, Explore; requirements and boards: Foundation developer, Validator, Everyone | **Application team · Foundation team · Approver · Head of ThinkLatent · Operations · Everyone** | All are audience nouns. "Approver" says the job, and the requirements should be updated from "Validator". "Everyone" matches the requirements and the board's "Preview as". |
| The TL Index page | Index (head menu), Evidence (approver menu), Index and leaderboard (All) | **TL Index** | One page, one name, and it is the brand name. |
| Request IDs | UA-0291, UA-0291-R2 | Show "**Production request** · UA-0291" (the ID is secondary) | UC-/UA- differ by one letter; lead with words. |
| Consistency metric | "Consistency across attempts, pass^3, long threads" | **Consistency on long threads** (ⓘ: "same answer in 3 of 3 tries") | Removes notation from the checklist. |
| Canary | canary, candidate, checkpoint promoted | **Trial on 10% of traffic** (ⓘ: canary) for the application team; "canary" in engineering view | The app team needs the effect, not the term. |

### Journey names

**Stage names**

| # | Recommended | Alternative A (closest to the requirements) | Alternative B (plainest) |
|---|---|---|---|
| 1 | **Set up** | Draft | Set up |
| 2 | **Try** | Proof of concept | Sandbox |
| 3 | **Build** | Build | Build |
| 4 | **Pilot** | Pilot in production | Pilot |
| 5 | **Production** | Production | Live |

**My call: Set up · Try · Build · Pilot · Production.** "Pilot in production" is accurate on the access model: pilot traffic runs on production endpoints. But as a stage name it makes the last two stages sound the same. The production-endpoint fact belongs in the Pilot goal sentence and its environment chip. If the Enterprise's governance language requires "Pilot in production", use Alternative A, but still drop "Active".

**Goal of each stage** (one line under the stepper, as "Goal of this stage: …")
- **Set up:** Describe the job and its data boundary, pick a model and confirm the owner, so you get a sandbox key.
- **Try:** Make your first call and try the model on your own examples. Nothing here touches production.
- **Build:** Agree the bars with the owner, add your evaluation data and get an Official run that meets every pilot bar.
- **Pilot:** Serve a limited group of real users on production endpoints, and show on an Official run that every Production bar is met.
- **Production:** Keep it healthy: alerts answered, attestations and reviews on time, the previous model ready for roll-back.

**Gate names** (between stages)

| From → to | Recommended | Alternative | Notes |
|---|---|---|---|
| Set up → Try | **Sandbox key** (automatic) | Set-up complete | No person decides; it comes under the standing sandbox approval. Don't call it a gate. |
| Try → Build | **First call** (automatic) | Build start | It happens when the first traced call lands. |
| Build → Pilot | **Pilot approval** | Pilot gate | Needs the bars agreed, an Official run that meets them, and an approver's decision. |
| Pilot → Production | **Production approval** | Production gate | Same pattern; when the request is sent back, "Ask again". |

Choose "approval" if the audience is mainly application teams. Choose "gate" only if the Enterprise's governance already uses it, and then never use "gate" for anything else (rename "regression gate" to "regression check" and "gate pillar" to "required pillar").

**Story-day control**

| Option | Label | Notes |
|---|---|---|
| Recommended | **Demo date: 5 Nov · Pilot, a month in (5 of 8)**, with ‹ › buttons and a dashed "prototype" chip | Says it is a demo and keeps the day's title. |
| Alternative | **Walkthrough step 5 of 8 · Pilot, a month in** | Reads as a guided tour. Better if the prototype is shown live to stakeholders. |

Also change the in-page hint to: 'Use the demo date › to see what happens next.'

---

## Notes for the main session
- **Kit ask (TL-013).** The vendored kit (design-kit `1b277ff`, v0.6.2) exports no `Shell`, `KpiStrip`, `MetaStrip` or `RecommendationCard`. They are listed in `packages/design-kit/src/README.md` but exist only in `apps/playground/src/shell.tsx`, or not at all. Per the portal CLAUDE.md (D-202), changes 1 and 10 need a design-kit request, not a local wrapper.
- **Missing screen.** There is no model page route (`/models/$id`), so the M2 board has no counterpart in the prototype.
