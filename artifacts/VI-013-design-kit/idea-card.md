<!-- Exported from https://claude.ai/artifact/UyE1iU6au9kWBcVRoyangw (rev 53) on 2026-11-05. Read-only mirror; edit the live doc, not this file. -->
# VI design kit (design-kit) — Idea card

Nov 2, 2026 · @Jithin Pradeep

## Lab record

| Field | Value |
| --- | --- |
| ID | VI-013 |
| Slug | design-kit |
| Aliases | VI Kit, the kit, design language, design system, tokens |
| Type | Capability (an idea in its own right; serves several products) |
| Parent | none |
| Theme | T-001 Sovereign AI (a capability under it, not a bet on it) |
| Stage | Shaping (from Seed, 2026-11-02) |
| Horizon | H1 |
| Score | not set until Stress test |
| Sponsor | Head of VI |
| Owner | kit core team of two to three, to be named |
| Links | VI-003 vi-portal reuses VI-013; VI-013 enables VI-003, VI-007 lab-dashboard, VI-010 blueprints; VI-013 reuses open-source candidates (see Components) |
| Scout brief | claude/scout-brief-design-kit.md in project knowledge, 2026-11-02 |
| Doc standard | v1 |

## Problem

Three VI surfaces are being built or sketched at once (VI Portal, lab dashboard, blueprints), each with its own look, spacing, status colours and accessibility baseline, and none with a shared answer for the things VI screens show that generic kits do not: intervals as one value, unmeasured placeholders, governed records with who, what, when and why, and an engineering view layered over a business view.

Who feels it today: the portal sketch (20 screens) carries an implicit language that nobody can reuse; the lab dashboard was styled by hand; every blueprint would restyle again. The cost is not yet measured. That is the idea's thinnest point and is named in hypothesis H1 below.

What the kit is not solving: VI has no customer-facing surface, so brand consistency is not the driver. The driver is build speed and an evidenced accessibility baseline across internal data products.

## Hypotheses, pre-registered

| # | Hypothesis | Confirms | Refutes |
| --- | --- | --- | --- |
| H1 | A shared kit cuts the cost of a new VI screen enough to pay for itself within two consumers | The second consumer (VI-007 or VI-010) builds its first page on the kit in under two engineer-days with no new components | The second consumer needs more than two days or forks the styling; or no second consumer appears within one quarter of the portal adopting it |
| H2 | The owned-code kit on shadcn/ui with Base UI reaches an evidenced accessibility baseline on VI's data surfaces without a dependency kit (Salt dropped by decision 2; the test now checks the chosen base rather than comparing two) | The three kit-test pages (Portal home, the VGLM4 Core model record, the usage-approval page, as written in the Design DNA tab section 8), built on the Base UI kit with TanStack Table for the lists, pass WCAG 2.2 AA (axe plus a manual keyboard and screen-reader pass) at comfortable and compact density with under a day of override work on the primitives | Either page needs more than a day of primitive overrides to reach AA, or the Record page's grid cannot reach AA on Base UI plus TanStack; then React Aria Table is swapped in for grids only, and the decision log records why |
| H3 | The ten design-language principles hold on real VI screens without exceptions | Re-skinning the portal sketch with the kit needs no exception to any principle on the 20 screens | More than two screens need an exception; then the principle is wrong, not the screen, and gets rewritten |

What the brief did not test and this card does not assume: that an enterprise design system exists at Vanguard (decision 1), or that the team has two to three people to give the kit (decision 4). Either answer can refute the whole shape of the idea rather than one hypothesis.

## Goals and non-goals

Goals

- One token source, one component kit, one chart and grid convention, one font and icon set, versioned and published as an inner-source package every VI product installs.
- An accessibility baseline that is evidenced, not asserted: keyboard, screen reader and contrast tests in the kit's Storybook for every component, WCAG 2.2 AA at both densities.
- First-class answers for VI's own data: intervals, unmeasured placeholders, status with icon and text, governed-record headers, the engineering-view layer.
- The VI Portal re-skinned with the kit as the proof; the second consumer named at Shaping.

Non-goals

- Not a Vanguard enterprise brand system; if one exists the kit inherits its primitives and adds only the semantic and component tiers (decision 1).
- Not a Figma-first process: Git is the source of truth; Figma imports the token file.
- Not a general-purpose UI library: components exist only when a VI product needs them; no speculative components.
- Not charts for every shape: the exhibit set is the five the portal needs (heatmap, stacked bar, scatter with thresholds, funnel, small multiples) until a consumer asks for more.

## Design language

The starting point is the portal sketch's implicit language: Inter, an 8 px spacing scale, 12 px radii, one accent, a neutral scale, at most four headline tiles, one primary exhibit per page, honest placeholders, intervals as one unit, states instead of greyed buttons, the engineering view as a layer. The ten principles from the scout brief make it explicit; each is tested by H3 against the 20 portal screens.

1. Never let colour carry meaning alone: colour plus icon shape plus text label; series get decals, line styles or direct labels.
2. One question per page, one primary exhibit: at most four headline tiles, one exhibit, one secondary list, in that order.
3. Density is a mode, not a different design: comfortable by default, compact through the engineering view; only spacing and size tokens change.
4. Show uncertainty wherever you show a score: `0.82 ± 0.03` as one unit; whiskers or bands in charts.
5. Unmeasured is not zero: one explicit placeholder with a reason, styled unlike 0, null or error, excluded from aggregates and said so.
6. Align numbers so they can be compared: tabular figures, right-aligned, units in headers, fixed decimals per column.
7. Every governed record shows who, what, when and why: latest decision in the business view, full history behind the engineering toggle.
8. Plain language first, jargon behind disclosure: labels as outcomes, definitions in tooltips or the engineering view.
9. Thresholds are content, not decoration: every threshold states its value and source policy in text and appears in a threshold table.
10. Accessible by default and evidenced: tests in Storybook for every component; a table alternative for every chart; WCAG 2.2 AA including target size.

Principle 2 is also Jithin's stated stance: clear, uncramped screens, split across more pages rather than crowding one.

## Components

| Layer | Candidate (licence) | Decided | Note |
| --- | --- | --- | --- |
| Token format | DTCG 2025.10 `.tokens.json` | yes, no alternative worth testing | three tiers: primitive (inherited if an enterprise system exists), semantic, component |
| Token build | Style Dictionary v5 (Apache-2.0); Terrazzo as second option | yes | outputs: CSS variables per theme and density, Tailwind `@theme`, TypeScript map, ECharts theme, Figma-importable file; contrast checks in CI |
| Component kit | shadcn-style owned code on React Aria Components (Apache-2.0); or Salt DS (Apache-2.0) | decided: shadcn/ui on Base UI (2026-11-02) | own the styling, depend on the behaviour |
| Grid | TanStack Table (MIT) with React Aria grid semantics; TanStack Virtual; AG Grid Community only as escalation | yes | Enterprise grouping, pivot and export are commercial; stay on Community |
| Charts | Apache ECharts 6 (Apache-2.0) or Recharts 3 (MIT) | decision 3 | every exhibit has a view-as-table toggle; SVG by default; labelled thresholds |
| Fonts | Inter (OFL) with `tnum`; JetBrains Mono or IBM Plex Mono for ids and traces | yes | tabular figures on every numeric column, tile and interval |
| Icons | Lucide (ISC) | yes | one fixed glyph per status: good, warning, critical, info, neutral |
| Kit operations | Storybook with the a11y addon; Playwright screenshots; Changesets; Storybook Docs | yes | axe-core as an unmodified dev dependency only (MPL-2.0, legal sign-off) |

Excluded: Atlassian (licence), Polaris React (archived), MUI and Ant as the base (opinionated; advanced grid commercial), Carbon as a dependency (borrow its guidance). Full comparison in the scout brief.

## Capabilities reused and created

Reused first (from the catalogue and the brief's open-source list)

| Reused | Source | How |
| --- | --- | --- |
| Portal sketch v3.1 language and 20 screens | VI-003 vi-portal | the kit's starting tokens and the H3 test bed |
| Register data contract (register.json) | VI-007 lab-dashboard | the dashboard is the candidate second consumer; the kit re-skins its nine views without touching the contract |
| Scheduled-task and brief patterns | Neo, nightly sync | kit release notes and visual-regression results can ride the nightly sync; optional |
| Vanguard enterprise design system, if one exists | enterprise (decision 1) | primitive token tier and chrome |
| Open-source candidates | see Components | permissive licences only |

Created for others (catalogue rows at Idea maturity until the kit test passes)

| Created | Kind | First reused by | Demand |
| --- | --- | --- | --- |
| VI tokens (`@vi/tokens`, DTCG) | Platform | VI Portal, lab dashboard, blueprints | 3 |
| VI Kit components (`@vi/kit`) | Platform | VI Portal, lab dashboard, blueprints | 3 |
| VI charts theme and wrappers (`@vi/charts`) | Platform | VI Portal exhibits, VAI index pages | 2 |
| Accessibility evidence pack (Storybook a11y runs, contrast report) | Evidence | any VI product's governance record; the usage-approval record can cite it | 1 |
| Design System artifact on the canvas | Process | every future screen sketched in the lab | 1 |

## Site walk (Jithin, 2026-11-02)

Jithin's notes as he reviews the candidate sites, recorded one at a time without comment; compiled into the decisions once he says he is done.

| # | Site | Jithin's note | Question raised |
| --- | --- | --- | --- |
| 1 | [shadcn/ui](https://ui.shadcn.com) | Looks good. Three primitive options seen: [Base UI](https://ui.shadcn.com/docs/ai-elements/base/chat), [React Aria](https://ui.shadcn.com/docs/ai-elements/aria/chat), [Radix UI](https://ui.shadcn.com/docs/ai-elements/radix/chat). Also ships default UI for AI elements (chat and the like). We can use it to build any kind of app we like by modifying the output to our liking | What are the three primitives and how do they differ? |
| 2 | Apache ECharts; also visx gallery, Observable Plot, Nivo components | ECharts looks good; we should be able to use it and adapt it to the theme we build out with shadcn/ui. Also looked at visx, Observable Plot and Nivo. Confirm the licence for all. Done with the walk | Licences for all four chart libraries |

### Compiled from the walk (2026-11-02)

**The three shadcn primitives.** shadcn/ui is not a component library but a set of component source files copied into your repo and styled with Tailwind; underneath each component sits a headless primitive library that supplies behaviour (focus, keyboard, screen-reader roles, popovers). shadcn now offers three such bases and you pick one at `shadcn init`:

| Base | Who | Licence | What it is | Fit for VI |
| --- | --- | --- | --- | --- |
| [Base UI](https://www.base-ui.com) | MUI team, the same people who built Radix | MIT (not re-read this pass) | Radix's successor; shadcn's default since July 2026, chosen 2 to 1 on shadcn/create, 1.6.0 with 6M+ weekly downloads per shadcn's changelog | Momentum and the fullest shadcn coverage; every new shadcn component ships for it first |
| [React Aria Components](https://react-aria.adobe.com) | Adobe | Apache-2.0 | Adobe's accessibility-first primitives; strongest keyboard, screen-reader and internationalisation behaviour; Table and Grid with sort, select, resize and expandable rows built in | The brief's recommendation for data-dense screens; added to shadcn as a third base in July 2026, so coverage may lag Base UI |
| [Radix UI](https://www.radix-ui.com) | WorkOS | MIT (not re-read this pass) | shadcn's original base from 2023; still supported, no longer default; new components ship for it unless Base UI-only | Mature, but the predecessor of Base UI; no reason to start a new kit on it |

The choice is between Base UI and React Aria. Radix is history. What should decide it: the portal's hardest components are tables and grids, where React Aria has the deeper behaviour; Base UI has the momentum and the most shadcn components. The kit test (decision 2) can carry this as a sub-question by building the Record page on each base.

**AI Elements.** shadcn ships a set of AI interface components (chat, message, prompt input, reasoning, tool, sources, model selector, plan, subagent, trace, test results and others), for all three bases. They are code you own, like the rest of shadcn. Relevant to the portal's agent library and any chat or trace surface; a reuse candidate for VI-012 agent-portfolio, noted in its register row rather than worked here.

**Chart licences, confirmed against each repository's licence file on 2026-11-02.**

| Library | Licence | Kind | Note |
| --- | --- | --- | --- |
| [Apache ECharts](https://echarts.apache.org) | Apache-2.0 | Full charting library, canvas or SVG, themeable from a JSON theme object | The brief's recommendation; decals and generated descriptions for accessibility; the one library that covers all five portal exhibit shapes |
| [visx](https://github.com/airbnb/visx) | MIT | Low-level React primitives over d3 (v4, React 18 or 19) | Build-your-own; no charts out of the box, no accessibility layer; a kit built on it is a chart library the team then owns |
| [Observable Plot](https://github.com/observablehq/plot) | ISC | Grammar-of-graphics library, SVG, framework-agnostic | Fast for exploratory charts; no React bindings, limited interactivity and no first-class accessibility features |
| [Nivo](https://github.com/plouc/nivo) | MIT | Declarative React charts over d3, SVG, HTML and canvas; theming, patterns and gradients built in | Closest React-native alternative to ECharts; heavier bundle per chart type; accessibility is per component |

All four are permissive; none changes the licence picture. The honest read: four chart libraries is three too many for a kit whose rule is one look and one accessibility baseline. One library, themed once from the token build, is the recommendation; ECharts remains the first choice and Nivo the React-native fallback if the team rejects ECharts' non-React render tree. visx and Plot are for one-off engineering explorations, not the kit.

## Shaping decisions

Taken one at a time in this chat; the thinking partner's recommendation is in the last column, and nothing is decided until Jithin's line lands in the decision log.

| # | Question | Options | Recommendation | Decided |
| --- | --- | --- | --- | --- |
| 1 | Does Vanguard have an enterprise design system the kit must inherit from? | yes, inherit primitives and chrome; no, the kit owns all three tiers; unknown, ask the enterprise front-end group | Settle before anything else: it decides the primitive tier, the chrome and half of decision 2's work | pending |
| 2 | Owned code (shadcn on React Aria) or dependency (Salt DS)? | run the pre-registered kit test; pick Salt without the test; pick owned code without the test | Run the test (H2): both pages, both kits, in Storybook, one engineer plus a coding agent, about four engineer-days total; cheap against a quarter of regret | Decided 2026-11-02: owned code on shadcn/ui with Base UI as the primitive base (Jithin). Salt dropped; React Aria not the base. The kit test narrows to an accessibility check of the Base UI build at both densities |
| 3 | Chart library | ECharts 6; Recharts 3 | ECharts: one library covers the portal's five exhibit shapes, decals give a second channel for colour, and the `aria` module writes descriptions; Recharts wins only if the team refuses a non-React render tree | pending |
| 4 | Who owns the kit, and which product is second after the portal? | core team of two to three from the five streams; VI-007 or VI-010 second | Name one engineer plus a coding agent as the core until the kit test passes, then two; VI-007 second, because it is Building now and has nine views to re-skin, which is the fastest read on H1 | pending |
| 5 | Record the language as a Design System artifact and re-skin the portal sketch | now; after decision 2 | After decision 2, so the artifact carries the kit that won rather than a placeholder | pending |

### Kit shape (decision 2a, Jithin, 2026-11-02)

The shadcn code is brought into the VI repo and owned outright: every change is ours, including the default colour scheme. On top of the components the kit builds **VI blocks**, composed page sections in the shadcn block style but relevant to the VI Portal, and those blocks become the design theme for every system VI develops.

**Revised 2026-11-02 (Jithin's second thought, thinking partner's view agreed).** Do not fork the shadcn code into a VI-owned copy that drifts. shadcn has no npm form (its package-imports feature is only an alias scheme), so its components are always generated into a repo; the dependencies are Base UI, Tailwind, TanStack and ECharts. The split that gives both goals: a `packages/ui` workspace holds the generated shadcn files untouched, re-pulled with the CLI when upstream changes; a `packages/vi-kit` workspace holds everything VI owns (tokens, the theme, variants, formatters, VI blocks) and imports from `ui`. VI never edits a generated file; a change that seems to need one becomes a variant or a wrapper in `vi-kit`. The registry publishes `vi-kit`; consumers add `ui` from upstream and `vi-kit` from VI.

How that is delivered, so other products get it with one command rather than copy-paste:

| Layer | What it is | Published as |
| --- | --- | --- |
| Tokens | DTCG tokens, the VI default colour scheme set here, light and dark, comfortable and compact | `@vi/tokens` plus the shadcn `theme` registry item |
| Components | shadcn components on Base UI, vendored and modified | `@vi/kit` registry items (`npx shadcn add @vi/button`) |
| Blocks | VI page sections composed from the components and charts | `@vi/blocks` registry items (`npx shadcn add @vi/record-header`) |
| Registry | A private shadcn registry (GitHub registry or self-hosted `registry.json`) that every VI product points its `components.json` at | one URL, versioned with Changesets |

First blocks, taken from the portal sketch pages the kit test already builds (Overview and Record), so the test and the first blocks are the same work:

1. Headline tiles: up to four numbers with interval, placeholder and status states
2. Primary exhibit: one ECharts chart (or Nivo, per decision 3) with the view-as-table toggle and labelled thresholds
3. Secondary list: a TanStack data table at comfortable and compact density
4. Record header: who, what, when and why, with the latest decision in the business view
5. Engineering view layer: the toggle that reveals history, traces and definitions without changing hierarchy
6. Status label: icon, colour and text as one unit, five statuses
7. Placeholder cell: unmeasured, with its reason, styled unlike zero

Blocks after these are added only when a portal page or a second consumer needs them. Each block ships with its Storybook story, a11y run and screenshot test.

### The one VI theme: what it must fix before any page is built

A theme is the set of decisions every screen inherits without asking. If any of these is left to the page, two pages will answer it differently. All of it lives in the token file; the colour scheme and palette are items 1 and 2.

| # | Area | Decide once | Rule it carries |
| --- | --- | --- | --- |
| 1 | Colour, interface | One neutral scale (about 11 steps), one accent, three surface levels (base, raised, overlay), border and text scales, light and dark as modes of the same tokens | Contrast checked in CI: 4.5:1 text, 3:1 controls and graphics; the accent is for actions and selection only, never status |
| 2 | Colour, status | Five statuses (good, warning, critical, info, neutral), each with foreground, background, border and icon tokens | Colour never alone: fixed glyph plus text label with every status |
| 3 | Colour, exhibits | Categorical palette of at most six, colour-blind safe, each with a decal; one sequential and one diverging ramp; a placeholder grey distinct from any data colour | Series beyond six get grouped; thresholds use the status tokens |
| 4 | Typography | Inter for text, one mono for ids, hashes and traces; a type scale of six to eight steps; weights 400, 500, 600 only; line heights per step | Tabular figures everywhere a number can be compared; fixed decimals per column; units in headers |
| 5 | Numbers and dates | Formats for integers, decimals, percentages, currency, durations, intervals (`0.82 ± 0.03`), dates and times with time zone, and the unmeasured placeholder | One formatter library in the kit; pages never format by hand |
| 6 | Spacing and size | 4 px base, 8 px scale, radii (one for controls, one for containers), border widths, two densities (comfortable, compact) as size tokens only | Density changes spacing and size, never hierarchy or content |
| 7 | Elevation | Minimal shadows, two levels; z-index scale for overlays | No decorative shadows; separation by surface level and border |
| 8 | Layout | Page shell (sidebar, top bar, content), breakpoints, content max width, the page template (tiles, exhibit, list) and a one-column mobile fallback | One question per page; split content across pages rather than crowd one |
| 9 | States | Hover, focus, active, selected, loading, empty, error, read-only, and unavailable-with-reason instead of greyed disabled | Every component has every state in Storybook before it ships |
| 10 | Focus and targets | One focus ring, visible on every surface in both modes; minimum target 24 px (WCAG 2.2 2.5.8), 32 px for controls at comfortable density | Keyboard order follows reading order |
| 11 | Motion | Two durations, two easings, reduced-motion respected | Motion explains a state change or does not exist |
| 12 | Icons | Lucide, two sizes, one stroke width; the five status glyphs fixed; no second icon set | Icons never carry meaning without a label or tooltip |
| 13 | Content | Plain-language labels as outcomes; jargon behind disclosure; date, time and number wording; empty-state and error-message patterns | Written in the kit's content guide; pages follow it |
| 14 | Mechanics | CSS variables from the token build; Tailwind `@theme`; `data-theme` for light and dark and `data-density` for comfortable and compact on the root; no page-level colour literals | A lint rule fails any hard-coded colour or spacing |

### Design kit component inventory

The full set the kit will need, grouped, with priority: P0 is the kit test and the first blocks; P1 is VI Portal phase 1; P2 waits for a page that asks. Items marked shadcn exist in the vendored code and need theming and states only; items marked VI are built.

| Group | Components | Source | Priority |
| --- | --- | --- | --- |
| Foundations | Tokens, theme and density switches, typography styles, icon set, formatter library | VI | P0 |
| Shell and layout | App shell, sidebar, top bar, page header with breadcrumb, tabs, resizable panels, scroll area, separator, stack and grid helpers | shadcn | P0 shell and page header; rest P1 |
| Navigation | Command palette, dropdown and context menus, pagination, link styles, keyboard-shortcut help | shadcn | P1 |
| Data display | Headline tile with interval and placeholder states; data table (sort, filter, column resize, virtual rows, density); description list (key and value); tree; badge and status label; tag; avatar; timeline and history list; code block; diff view; tooltip; hover card; empty state; placeholder cell; skeleton; progress; kbd | tile, status label, placeholder, timeline VI; rest shadcn plus TanStack | tile, table, status, placeholder P0; rest P1 |
| Charts | Chart frame (title, caption, source, legend, view-as-table toggle, threshold labels); line; bar and stacked bar; scatter with thresholds; heatmap; funnel; small multiples; sparkline; distribution with whiskers | VI wrappers over ECharts or Nivo (decision 3) | frame, bar, scatter P0; heatmap, funnel, small multiples P1; rest P2 |
| Forms and input | Field (label, help, error), input, textarea, select and combobox, checkbox, radio, switch, slider, date picker, file upload, search, form layout | shadcn | P1 |
| Feedback and overlay | Dialog, alert dialog, sheet and drawer, popover, toast, alert and banner, confirmation | shadcn | P1 |
| Governance and record | Record header (who, what, when, why); decision card; approval stepper; audit and history list; threshold table; policy citation | VI | record header P0; rest P1 |
| Engineering view | Engineering toggle; trace panel; raw JSON viewer; log view | toggle VI; trace and code from shadcn | toggle P0; rest P1 |
| AI elements | Chat, message, prompt input, reasoning, tool call, sources and inline citation, model selector, plan, subagent, trace, test results | shadcn AI Elements | P2, pulled forward by the agent library (VI-012) |
| Utilities | Theme toggle, density toggle, copy button, relative time, number and interval formatters | VI | P0 |

What is deliberately not in the kit: marketing and landing patterns, carousels, rich text editors, maps, and anything no VI page has asked for.

The working inventory, one row per component with priority and status to change in place: Inventory

### Reference walk (Jithin's screenshots, 2026-11-03)

Jithin's direction before the walk: the kit is built monochrome first (neutrals, surfaces, type, spacing, states), and the colour palette is added on top later as its own decision, the way shadcn's own defaults are shown in greys. Recorded one screenshot at a time, no compile until he says done. Colour is noted only where it carries meaning the kit must reproduce another way.

| # | Screen | What it does well | Informs rows |
| --- | --- | --- | --- |
| 1 | ShipNow analytics (logistics dashboard) | One dark hero tile beside three light tiles for the headline set; signed deltas beside values; busy-period heatmap with an hour axis; shipment list with status pills and a progress bar; sidebar items with count badges | 7, 8, 19, 20, 21, 40 |
| 2 | Cortex chat home | Empty-state greeting with one prompt box; mode chips inside the input (Deeper Research), saved prompts and attach on the box's footer; three suggestion cards; history grouped by Today, Yesterday, 7 days in the sidebar | 31, 74, 75, 8 |
| 3 | Nixtio banking dashboard | Large numbers with lighter decimals (weight contrast carries hierarchy); dark pill tooltip with value, delta and period; category tiles with signed change text | 19, 36, 6 |
| 4 | Notivo notifications dashboard | Monochrome with one accent; chart-or-table toggle beside the time-range segment; striped progress bars that read without colour; a dark card used once as the primary panel | 36, 33, 19, 14 |
| 5 | Freight CRM, Customers list | Collapsed icon rail with badge counts (close to the dock idea); KPI strip of six numbers with delta chips and one-line captions; agent cards with a category tag (Risk, Growth, Service), one sentence and one action link; table rows with object avatar plus subtitle, person avatar plus role, status pill; pagination with a rows selector | 7, 19, 20, 26, 27, 65 |
| 6 | Account brief dialog (agent-authored) | The strongest single reference. Agent chip above the title; a provenance line (written from 296 shipments, 48 messages, 36 documents, updated 11:56); four tiles each with a plain-language caption instead of a bare delta; Going well and Watch columns with status glyphs; recommendation card with a confidence figure and View sources; footer line stating every figure links to its source | 57, 64, 65, 76, 78, principles 4 and 7 |
| 7 | Message templates dialog | Master-detail inside a dialog; variable chips that are also insertable; live preview with real values; an autonomy toggle whose label states the condition (may send on its own, only when the new ETA stays inside the window); footer note on scope of the change | 57, 56, 83, VI-012 propose-only policy |
| 8 | Conversation with agent draft | Agent-attributed bubble with approver and time (Customer Agent, approved by Priya, 11:33); inline event line for another agent's proposal; draft card with tone chips and Edit, Regenerate, Send; right rail with thread summary and suggested replies | 74, 75, 83, 27, 28 |
| 9 | Notifications panel | Tabs All, Approvals (count), Mentions, System; a Needs you group with Approve and Review inline; source badge per agent; earlier items plain | 61, 62, 66, 10 (notifications deferred) |
| 10 | Shipments list | Tab counts; a filter-chip row with Add filter; selected rows tinted with checkbox; status as glyph plus text; risk as a three-bar glyph plus word; a floating dark bulk-action bar at the bottom with the agent action last; a banner that agents are watching 18 at-risk loads | 20, 21, 17, 48, 59 |
| 11 | Instagram capture of screen 10 | Same screen; source credit: ui.iliasmiah000 (freight concept); the first clip is a different post (gitfinds, a RAG document-chat UI) | attribution only |
| 12 | Account page (Acme Retail) | The Record-page archetype: back arrow, object avatar, title, status pill, three actions right; left column of key-value pairs under small-caps captions, contacts, top lanes, contracts; tabs with counts; agent brief card with one summary sentence, fact chips, an Opportunity callout, action chips; line chart with a target line and dark tooltip; tiles in a 2 by 2 | 9, 11, 24, 64, 65, 36, 39 |
| 13 | Exception page (Failed delivery) | Metadata strip (severity, status, customer, driver, opened, owner) under the title; four tiles with a one-line caption in the status colour; case timeline, vertical, glyph per actor, newest at the bottom with future items greyed; evidence column (photo, driver note, document, address with hours); agent recommendation card with What happened, Why, Recommendation, three outcome numbers, a Needs your approval bar and Approve, Other slots, Dismiss; pattern callout; approval-policy line with a lock | 28, 64, 65, 66, 67, 83, 13 |
| 14 | Fennel research workspace | Agent plan as a checklist with step progress and sub-task bars; a live note of which row the agent is writing; credits meter; three panes (navigation, thread, sheet) | 80, 81, 20, 12 |
| 15 | Botrix command centre | Top pill navigation; tiles with a barcode-style sparkline; chart with an annotated point callout; server cards with ring gauges and three actions; activity feed with filter chips | 43, 36, 33; ring gauges not borrowed |
| 16 | Orbix cash flow | Three tiles with signed deltas and period caption; multi-series line with a dashed hover line and one dark tooltip listing all series; stacked proportion bar; sources list with percentage bars | 19, 36, 39, 33 |
| 17 | Orbix tooltip, zoomed | The tooltip pattern in detail: dark pill, swatch per series, values aligned; hatched area for the forecast or uncertain range | 36, principle 4 (uncertainty drawn, not implied) |
| 18 | Ebbline reports | Chart with the table underneath it rather than behind a toggle; forecast months ghosted and a Today marker; stacked bar with rounded segments; light-card tooltip with a total row; change chips in the table; reports list with cadence; settings rail grouped by data source, metric, grouping, visualisation, with toggles | 36, 37, 60, 20 |
| 19 | Add driver form (ui.iliasmiah000, FleetFlow concept) | Agent pre-fill banner at the top (read from two documents, 13 fields filled, 1 needs a check) with Replace scans and Ask to upload; numbered sections 01 to 03 each with a one-line purpose; a field-level warning chip inside a section header (Hazmat needs a TSA letter); right rail with the entity summary card, an agent checklist with a status glyph per check and an action where one is needed (Send request, Upload), onboarding toggles whose labels state the condition; footer lock line (stays off the board until every check passes); toast on save with what remains (3 checks left) | 45, 56, 51, 61, 64, 66, 83 |
| 20 to 22 | Account brief dialog, Notifications panel, Account page (Instagram captures) | Same screens as rows 6, 9 and 12; nothing new, confirms the source as one product family | as 6, 9, 12 |
| 23 | Analytics with an Operations Analyst panel | Six-metric KPI strip with a delta chip and a caption under each; line chart with a dashed target and a dark tooltip; revenue-by-customer list with proportion bars; bar chart with the delayed share marked on each bar top; donut with legend counts; four small tiles with a sparkline; an analyst chat pane inside the page: question bubble, plain answer, contributor bars with percentages, a sources line (based on 1,212 deliveries, ELD logs and the Caltrans feed), recommended actions each with its own button (Enable rule, Draft request), a follow-up input with an example | 19, 36, 37, 41, 43, 65, 74 to 78 |
| 24 | Schedule a report dialog | Report select, frequency segment, send-at select, recipients, format chips; a toggle to add an agent-written summary with its provenance line; a preview box; footer states when the first one goes out. Reusable for the lab digest and the Neo weekly message | 57, 56, 48; scheduled-task patterns (reuse) |
| 25 | Analytics, cropped | Same as row 23 | as 23 |
| 26 | Context chat pane over a list | Context chips at the top of the pane (Shipments, 3 selected, Today) so the question is grounded; numbered recommendation cards each with the object id, a status pill, one sentence, Approve and Why?, and the agent name with its confidence; a sources line; suggestion chips at the bottom | 65, 74, 75, 78, 83 |
| 27 | Agent pane, empty | The pane's header (name, 6 agents, sees what you see) with an empty body; a reminder that the empty and loading states of the agent pane are components too | 31, 32 |
| 28 | Shipments list, clearer capture | Same as row 10; the bulk bar reads 2 selected with four actions and the agent action last | as 10 |
| 29 | Command palette | Query at the top with Esc; scope chips with counts (All 8, Shipments 1, Customers 1 and so on); an Ask the Operations Analyst row with the question pre-written and Tab to take it; results grouped by object type, each with a subtitle and a status pill; footer keyboard hints (navigate, open, search anywhere, ask AI). Matches rows 16 and 18 and adds the ask-AI row as the P2 extension | 16, 18, 21 |
| 30 | Operations home (Good morning, Sarah) | Date line and a one-sentence purpose under the greeting; six KPI strip; a flagged-item card with the window, ETA now and ETA with detour side by side, a route progress line with the detour dotted; an operations brief card with agent count and confidence, one sentence, contributing causes with bars, proposed actions as rows with chevrons, one primary button; live map; a dispatch timeline (Gantt) with a now line and dashed agent suggestions; a Monitoring chip in the top bar with approvals count | 19, 28, 36, 65, 80; Gantt is a new chart shape, candidate inventory row at P2 |
| 31 | Analytics, repeat | Same as row 23 | as 23 |
| 32 | Sandbox results dialog | Agent chip, title, one line saying what was replayed and that nothing reached live; Replayed on and Compared with selects; four outcome tiles with a caption each; a list of the decisions that would change (id, sentence, outcome chip); footer line (sandbox runs never touch live data) and Keep editing or Publish draft. This is the variant comparison card from VI-012 and the harness sandbox from VI-008 in one dialog | 57, 19, 65; VI-012 comparison card, VI-008 sandbox |
| 33 | Agent settings page (Dispatch Agent) | Dark hero card with the agent's purpose in one sentence, live-since date and version; Agent active toggle, Test in sandbox, Save; four counters (recommendations, approved, dismissed, pending) over one stacked proportion bar; an autonomy matrix: each capability gets a segmented control Observe, Recommend, Draft, Approve first, Autonomous, with a lock glyph on Approve first and a note that anything above Draft is logged; guardrails as toggles with a one-line description each. This is the agent admission record (VI-012) and its autonomy tier as a screen | 64, 66, 83, 51, 33; VI-012 admission record and autonomy tier |
| 34, 35 | AI agents overview | Dark summary band: one sentence (1,912 actions today, 94 percent needed no human, 3 decisions waiting), four small numbers (time saved, accuracy, override rate, awaiting you), and two lists, Runs on its own and Asks you first; agent cards with a Needs you count, purpose line, two metrics, the latest action with a Waiting or Auto chip, and an autonomy bar; Activity log, Permissions and Pause all agents in the header. The agent library page (VI-012) as a reference | 19, 21, 26, 65; VI-012 library page |
| 36, 37 | Operations home in English and in Arabic | Same page as row 30 with a language toggle, and the full right-to-left mirror: rail on the right, numbers and charts mirrored, timeline reversed. Adds a theme item the list did not have: direction and locale (logical CSS properties, a dir attribute on the root, Base UI's Direction component, number and date locale from the formatter library). A decision for Jithin: whether VI products need RTL at all; if not, logical properties still cost nothing and keep the door open | theme item 15 (new), 6 |
| 38 | Monitoring agent timeline (Mandate concept) | Same page as row 30 with a language toggle, and a right-to-left mirror. Jithin: ignore the mirror; no RTL or locale item for the kit (2026-11-03) | as 30 |
| 39 | Mental models infographic | Not a UI; a content reference. Seven models grouped Think, Influence, Decide with a two-colour legend. Useful for the content guide (theme item 13): one-line captions that say what to do, and 2-way doors as the rule for which inventory decisions get a quick call | theme item 13; lab practice |
| 40 | Overview Panel with green glass insight cards | Glass reference: a stack of translucent insight cards floating above the page header; pill top navigation; KPI tiles with a mini bar, arc gauge and segment bar inside; an AI assistant pane as a page column with a conversation, an attachment card with id, and Files, Images, Audio chips on the input | glass, 19, 74, 75 |
| 41 | Botrix, frosted version of screen 15 | Glass reference: the whole page frosted with a soft gradient behind; tiles, cards and the tooltip all translucent; dark anchor pills for the active tab and primary button. Shows the failure mode too: text over the frosted chart area reads softer than AA would allow | glass (both sides of the rule) |
| 42 to 44 | Workflow canvas, dark (Quarn, n8n-style) | Dark canvas with a dot grid; node cards in dark glass with a check for configured; edges that glow at the ports and carry a count chip (1 item); an inline configuration card for the selected node (credential, model); a left rail of tool icons; Editor, Executions, Tests tabs; a chat strip at the bottom with the run id. A new surface type: the workflow canvas | glass dark; canvas surface (P2, VI-012 workflow builder, VI-010) |
| 45 | Chat home concept with a dark glass sidebar | Dark translucent sidebar floating over a warm light page; a mode list (Think Longer, Deep Research, Create Image, More with a count); Pinned and Shared tabs; a document list with type icons and edited-ago; prompt box with a plus and the chosen mode as a chip; suggestion chips below; a daily-limits bar at the top | glass, 74, 75, 8 |
| 46, 47 | Approvio workflow design, dark | Glass sidebar with a folder tree carrying counts per node (the tree with counts from row 25); workflow nodes as document thumbnails with tool glyphs; review cards with image, Info line, note and tag chips; an agent card in the sidebar (I verified 14 of 30 requirements); a dark chart card with the active range lit; task groups as collapsibles with a one-line summary each; Smart Insights with document thumbnails, three numbers and an agent narrative; an In progress status pill as a select | 25, 65, 36, 28; canvas surface |
| 48 | Prompt box with a thinking-mode selector | Dark input with a soft glow border; a plus for attachments; two selects on the left (style: Normal; depth: Quick answer, Balanced, DeepThink, Research); Voice and a gradient send on the right. The depth selector maps onto VI's model tiers (Distil for quick, Core for balanced, Core with reasoning for deep, the research harness for research), which gives the portal's prompt box a second chip with real meaning | 75; VI-011 tiers as the depth modes |
| 49 | Cargo distribution (UPS concept) | Four panes side by side (list, diagram, grid, detail form) on a light page with a thin icon rail; selected list item as a dark anchor card; route as a mini timeline with times; compact inputs. The dense-but-calm reference for the detail-pane decision (row 12), and a warning: at 11 to 12 px body type it fails the 14 px rule | 12, 13, 15 |
| 50 to 52 | Chat concept, dark mode (Gemini-style) and a dark chat history | Dark glass sidebar with an icon rail beside it; pinned modes as a gradient highlight; integrations list; tabs as pills; pinned chats as cards with a type icon, a snippet and a date; suggestion chips; prompt box with a gradient notice band, Attach and the mode chip; a credits ring at the sidebar foot; a history list with Saved topic (starred) and Recent chats, each with edited time | glass dark, 74, 75, 8, 2 |
| 53 | Management overview with a glass side panel (Celoxis) | Glass reference for the overlay family: a side panel slides over the page, the page blurs behind it; inside, an AI insight card, folder cards with counts and a chevron; on the page, status pills in tables and an arc gauge | glass, 59, 26 |
| 54 | Visitors insights (Synthex) | Whole-page frost with a cool gradient; a dimension tree with counts in the sidebar; drop zones for filters and segments; a KPI with four sub-metrics beside the chart; dot-and-line chart on a hatched band; glass tooltips with a close | glass, 25, 19, 36 |
| 55 | Collision analytics (Vector concept) | Light page with one bold blue; a very large number with a one-line caption; a dot-density scatter against labelled thresholds (Low, Moderate, Extreme) with an incident card pinned to a point; a trend chart with hatched event bands and group comparison tabs; bottom row of group cards. The best reference for scatter with thresholds (row 38) and for drawing ranges as hatching | 38, 39, 19, principle 9 |
| 56, 57 | Credit health (Health Karma concept) | Light upper half over a warm blurred backdrop, dark lower half; white rounded tiles with an outlined icon, a dark round arrow button, a big number with lighter decimals or unit, and a tiny chart; one tile frosted as the selected state; an alert dot on an icon; pill segment for period; offers as dark glass cards; gauge with needle. Glass over a colour backdrop is the tint-phase reference | glass (tint phase), 19, 43, 6 |
| 58 | Visual priority (n8n-style explainer) | Dark glass card with a green glow; a bar chart where the active bars carry a hatched fill and a lit top edge while the rest stay flat grey; the rule stated in the card: high-contrast accents surface active nodes, progress and execution states only | 37, model rule 5, glass dark |
| 59 to 62, 68, 71, 72 | Quarn AI workflow builder case study (rondesignlab, template by zoe.eldr), dark | One family. Big statements with weight contrast (the key words bright, the rest grey); step charts with the active area hatched and the top edge lit, values labelled at the step; two-series legends as dots; dark glass cards with a green glow for the one number that matters, each with a check-led label and one sentence; a process map as node cards (Discovery, Architecture, Flow Mapping, Interface Design) joined by glowing edges; a glass card over a photo with a slider that reads Step 2 of 2 and a progress figure; a mobile view with a Latest logs from the agent node panel (timestamped lines, mono) and Test, Hide chat, run time; pricing cards with the middle one lit. The whole family keeps model rule 5 strictly: one accent, used only on active edges, selected nodes, progress and the one headline number | glass dark, 36, 37, 73, 19, principle 9 |
| 69 | Quarn node palette (What happens next?) | A dark glass panel listing node types with an icon, a name and a one-line description each, an arrow per row and a search at the top: AI, Action in an app, Data transformation, Flow, Code, Human in the loop. Human in the loop as a first-class node type is the propose-then-approve rule drawn on a canvas | canvas surface; model rule 3; VI-012 |
| 70 | Quarn colour system | Four colours with roles drawn as a tree: Brand (deep green) with Focused (bright green), Dynamic (grey) and Technical (near-black) branches; a stated rule that the accent exists to highlight active states, progress and successful execution. The model for VI's palette phase: a palette is a few colours with jobs, not a swatch book. Record for the palette decision; do not apply in the monochrome phase | theme items 1 to 3 (palette phase) |
| 63 | Health records tiles, light glass | Large rounded tiles in frosted white over a soft colour wash; a title and a round plus; a document stack as the preview; a nested pill (Existing records, 2 files); an Out of range pill; a dot calendar with one coloured day. Tinted glass, palette phase | glass (tint phase), 19, 26 |
| 64 to 66 | Customer journeys (SugarCRM concept), light glass | Pill top navigation with a dark anchor on the active item; a vertical icon rail of round buttons; an avatar stack with count badges; a journey as four stage columns on a frosted board, each stage a rounded panel of task rows (avatar, task, done ticks, a calendar button), connected by thin coloured lines with port dots; unassigned tasks as a plus-avatar; the next stage as a tile grid with one dark anchor tile. A light-glass reference for process and lifecycle views (the lifecycle rail on the portal) | glass light, 7, 27, 28, 66 |
| 67 | Payno banking dashboard, light glass with a blue tint | Frosted panels over a blue wash; balance with a hide toggle; four quick actions as icon buttons with labels; small tiles with a delta chip; a weekly bar strip; transactions and upcoming payments as avatar or icon rows with the amount right-aligned; a send-money form as a stacked panel with the primary button full width. Tinted glass, palette phase | glass (tint phase), 19, 56 |

The DNA the kit is built towards, compiled from the whole walk (layout from screens 1 to 38, look and feel from 39 to 72, colour deferred): Design DNA

### The VI application model, compiled from the walk (draft v0, 2026-11-03)

What the screens Jithin kept share is not a look but a model of how a page works. Eight rules describe it; they sit above the ten principles and the fourteen theme items, and every block in vi-kit is a way of keeping one of them.

| # | Rule | Seen in | What it means for VI |
| --- | --- | --- | --- |
| 1 | A page is a brief, not a dashboard | 23, 30, 12 | Greeting or title with a one-line purpose; a KPI strip; one primary exhibit; one agent panel; one list. The agent is a column of the page, not a chat bubble in the corner |
| 2 | Everything an agent made carries its provenance | 6, 12, 13, 23, 26, 32 | Agent chip above; a basis line (from 296 shipments, 48 messages, updated 11:56); a confidence figure; View sources; who approved and when. The portal's who, what, when, why becomes a component |
| 3 | Agents propose; people decide | 9, 13, 26, 33, 34 | Approve, Review and Why? on every proposal; an autonomy ladder (Observe, Recommend, Draft, Approve first, Autonomous) per capability; guardrails as toggles whose label states the condition; Needs you groups first |
| 4 | Every number has a caption | 5, 6, 13, 23, 30, 32 | Value, a delta chip, and one plain-language line under it (target 95 percent; 24 open now; 2 on I-80 after 1 PM). Captions carry the meaning so colour never has to |
| 5 | Monochrome surfaces, one dark anchor per page | 4, 10, 16, 33, 34 | Greys and white carry the layout; one dark element per page is the anchor (the summary band, the bulk-action bar, the tooltip, the primary button); the accent is for selection and primary actions only; status colours only where a status is |
| 6 | Soft geometry, hairline structure | all | 12 to 16 px radii, 1 px borders at low contrast, no shadows, pill chips and pill buttons, 16 to 24 px padding; cards separate by surface step not by line |
| 7 | Every object has an identity | 5, 10, 12, 29 | Objects get a square avatar with a glyph and a two-line label (name, subtitle); people get a circle; both appear the same way in tables, cards, palettes and headers |
| 8 | Dialogs are documents | 6, 7, 24, 32 | Agent chip, title, provenance line, a tile row, two columns, a recommendation card, a footer trust line (every figure links back to its source) and two buttons; no free-form modals |

### Element inventory from the walk, and how each lands in vi-kit

The no-edit rule holds: packages/ui stays as generated. Everything below is one of three moves in packages/vi-kit: a **token** (CSS variable the generated code already reads), a **variant** (a cva variant or wrapper around one shadcn component), or a **VI block** (a new composition where shadcn has nothing).

| Section | Element | Borrowed from | Lands in vi-kit as |
| --- | --- | --- | --- |
| Shell | Icon rail with count badges; top bar with search and a Monitoring chip (n watched, n approvals) | 5, 10, 30 | Sidebar variant `rail` (the dock, row 7); `MonitoringChip` block |
| Shell | Page header: small-caps breadcrumb, back arrow, object avatar, title, status pill, actions right | 12, 13, 19 | `PageHeader` block composing Breadcrumb and Button |
| Shell | Metadata strip under the title (severity, status, customer, owner) | 13 | `MetaStrip` block |
| Numbers | KPI strip: label, 28 px tabular value, delta chip, caption | 5, 23, 30 | `KpiStrip` block (row 19 tile in strip form) |
| Numbers | Tile with a caption in the status colour; agent-authored tile row in dialogs | 6, 13, 32 | `Tile` block with `caption` and `captionTone` |
| Agent | Agent chip; provenance line; confidence; View sources; trust footer | 6, 12, 23, 32 | `AgentChip`, `ProvenanceLine`, `TrustFooter` blocks |
| Agent | Brief card: tinted raised surface, one sentence, fact chips, opportunity callout, action chips | 12, 30 | `BriefCard` block |
| Agent | Recommendation card: what happened, why, recommendation, outcome numbers, approval bar with lock, Approve, Other, Dismiss | 13, 26 | `RecommendationCard` block |
| Agent | Autonomy segmented control per capability; guardrail toggle row with description | 33 | `AutonomyControl` (ToggleGroup variant), `GuardrailRow` (Switch wrapper) |
| Agent | Agent summary band (dark anchor): one sentence, four numbers, Runs on its own and Asks you first lists | 34 | `AgentSummaryBand` block |
| Agent | Agent card: Needs you count, purpose, two metrics, latest action with Waiting or Auto chip, autonomy bar | 34 | `AgentCard` block |
| Status | Status pill: glyph, text, tinted background; risk glyph of three bars plus word | 10, 12 | Badge variant `status` (row 21), `RiskGlyph` block |
| Tables | Sortable small-caps headers; object cell (square avatar, two lines); person cell (circle, role); selected row tint; tab counts; filter-chip row with Add filter; floating dark bulk-action bar with the agent action last; pagination with rows selector | 5, 10 | DataTable wrapper with `ObjectCell`, `PersonCell`; Tabs variant `counts`; `FilterBar` block; `BulkActionBar` block |
| Charts | Dark multi-series tooltip; dashed labelled target line; per-bar marker for the delayed share; hatched forecast range; donut with count legend; proportion bars; sparkline tile; Gantt timeline; event timeline | 3, 16, 17, 18, 23, 30, 38 | ECharts theme from tokens; `ChartFrame` block; Gantt and event timeline as P2 inventory rows |
| Dialogs | Document dialog (rule 8); master-detail dialog with live preview and variable chips; schedule dialog with frequency segment and summary toggle | 6, 7, 24, 32 | `DocumentDialog`, `MasterDetailDialog`, `ScheduleDialog` wrappers over Dialog |
| Chat | Context chips over the pane; agent-attributed bubble with approver and time; inline agent event line; draft card with tone chips and Edit, Regenerate, Send; numbered recommendation list; suggestion chips; thread summary rail | 8, 26 | shadcn AI Elements plus `ContextChips`, `DraftCard`, `AgentEventLine` blocks |
| Notifications | Tabs All, Approvals (n), Mentions, System; Needs you group with inline Approve and Review; source glyph per agent | 9 | `NotificationPanel` block (Sheet variant) |
| Forms | Agent pre-fill banner (fields filled, needs a check); numbered sections with purpose line; field-level warning chip; checklist rail with status per check and an action; toggles with condition text; footer lock line; toast with what remains | 19 | `PrefillBanner`, `FormSection`, `ChecklistRail` blocks; Field wrapper with `warning` |
| Palette | Scope chips with counts; ask-AI row with Tab; grouped results with status; keyboard-hint footer | 29 | Command variant with `scopes` and an `askRow` slot |
| States | Agent pane empty and loading; greyed future items in a timeline | 27, 13 | Empty and Skeleton variants per block |

Token-level changes that make generated shadcn components look like these screens without editing them: radius 12 px controls and 16 px containers; border at neutral-200 equivalent; shadows set to none except overlays; Inter with tabular figures on numeric classes; muted foreground one step lighter than shadcn's default; chip and button `rounded-full` variants; the accent used for `primary` only; the dark anchor as a `tone="anchor"` variant on Card, Button and Tooltip.

### Glass (Jithin, 2026-11-03)

Jithin is a big fan of the glass theme (translucent, blurred surfaces, as in screens 2 and 3). Recorded as a stated preference and shaped as follows, pending his confirmation.

Where glass works and where it fails, from the person who would have to make it pass AA: glass is a surface, not a theme. It needs something behind it to blur, it costs GPU on large scrolling areas (`backdrop-filter` over a 2,000-row table is the common jank), and text on a translucent surface over a busy chart loses contrast unpredictably. So the proposal is a **fourth surface level**, `surface-glass`, used for the layers that float, never for the content plane:

| Use glass | Keep opaque |
| --- | --- |
| The shell: top bar and the dock or rail, over a soft page backdrop | Table rows, cards and tiles on the content plane |
| Overlays: dialogs, popovers, hover cards, command palette, notification panel, bulk-action bar | Any surface that carries body text over an exhibit |
| The chat and agent pane when it floats over a list (screen 26) | The agent pane when it is a page column (rule 1) |
| Tooltips (the dark anchor stays dark; glass is for the light overlay family) | Print and export views |

Rules that make it safe: blur 12 to 20 px with 72 to 85 percent opacity in light mode and 60 to 75 percent in dark; a 1 px inner hairline so the edge reads; contrast tested over the worst-case backdrop (a busy chart) in CI, not over white; `prefers-reduced-transparency` and the reduced-motion setting switch glass to opaque; no glass in the compact density. In the monochrome phase the backdrop is a very soft neutral gradient so the blur has something to catch; the accent tint comes with the palette later. Tokens: `--surface-glass`, `--glass-blur`, `--glass-border`; implemented as a `tone="glass"` variant on Card, Dialog, Popover, Sheet and the shell, never by editing generated files.

Addendum from screens 40 to 58 (2026-11-03): the glass references split into three families the kit should name separately. **Light glass** (40, 41, 53, 54): frosted white over a soft gradient; for the shell and overlays, as above. **Dark glass** (42 to 47, 50 to 52, 58): charcoal panels at 60 to 75 percent over a near-black backdrop with a dot grid or a single glow; the natural home of the workflow canvas, the chat sidebar and the engineering view in dark mode; accents only on active edges, selected nodes and progress (screen 58's rule, which is model rule 5 restated). **Tinted glass** (56, 57, 45): translucency over a colour backdrop; belongs to the palette phase, not the monochrome phase. Screen 41 is the counter-example to keep: a fully frosted content plane softens text over charts below AA.

### The chat interface (from screens 2, 8 and 26)

Three chat shapes appear in the references and the kit needs all three, built from shadcn AI Elements plus VI blocks:

1. **Home chat** (screen 2): greeting and a one-line question as the empty state; one prompt box with mode chips inside it (the portal's equivalents: Ask the index, Ask about this model, Deeper research), attach and saved prompts on the box's footer; three suggestion cards; history grouped by Today, Yesterday, 7 days in the sidebar. Lands as `ChatHome` block.
2. **Conversation with an agent in the loop** (screen 8): human bubbles plain; agent bubbles attributed with the agent, the approver and the time; inline event lines when another agent acts; a draft card with tone chips and Edit, Regenerate, Send; a right rail with the thread summary and suggested replies. Lands as AI Elements Message plus `AgentEventLine`, `DraftCard`, `ThreadSummaryRail`.
3. **Context pane over a page** (screen 26): context chips naming what the question is about (the page, the selection, the period); numbered recommendation cards with Approve and Why?; a sources line; suggestion chips. Lands as `ContextPane` block, glass when floating.

All three share the provenance and propose-then-approve rules (model rules 2 and 3), the agent square avatar (rule 7), and one input component with the same mode chips.

### Inventory decisions (Jithin, one row at a time, 2026-11-02)

| Row | Component | Decision | Against recommendation? |
| --- | --- | --- | --- |
| 1 | Tokens | Light and dark both ship at v0; contrast checked for both in CI | no |
| 2 | Theme switch | Follows the OS setting; manual override in the top bar, saved per user | no |
| 3 | Density switch | A separate density toggle for every user, on any page, independent of the engineering view | yes: recommended tying compact to the engineering view so business screens stay uncramped; dissent recorded, Jithin's call stands; the kit test must show compact on the business view still meets AA |
| 4 | Typography | 14 px body, seven steps (12 to 36 px); compact drops body to 13 px; tabular figures on numeric styles | no |
| 5 | Icons | Lucide, 16 and 20 px, 1.5 stroke; status glyphs fixed: check-circle, triangle-alert, octagon-x, info, minus-circle | no |
| 6 | Formatters | Interval as value ± half-width, one unit, fixed decimals per metric; unmeasured as an em dash with the reason on hover, excluded from aggregates | no |
| 7 | App shell | Decided 2026-11-03 after five options on the canvas: two shells. C2 (full-width glass bottom bar, always present) for business views; D (dock inside the frame, top-anchored) for engineering views and dark mode. The original floating dock outside the frame was dropped for asymmetry. Thinking partner's conditions, recorded as acceptance criteria: tooltips on hover and focus, at most seven dock items; expand pushes content (never an overlay); no hover magnification, 40 px targets; a 72 px left gutter in collapsed state; 150 ms transition, reduced motion cuts straight. Convention risk (navigation not top-left) to be tested in the kit test with one approver and one engineer | open; recommended standard collapsible sidebar as the fallback |
| 8 | Sidebar | Grouped by object: models, use cases, agents, evidence, approvals (five dock items when collapsed) | yes: recommended grouping by the four audiences; object-led navigation suits power users and costs business users a lookup; the page header now carries the audience view (row 9) |
| 9 | Page header | Breadcrumb from the object path, title, one-line plain-language description, primary actions on the right, audience view as a small label beside the title | no |
| 10 | Top bar | 48 px: search (command palette trigger) left; theme, density and engineering toggles, then user menu, right. Notifications and environment badge deferred until the backend emits events | no |
| 11 | Tabs | Record sections as tabs (Overview, Evidence, Usage, Approvals, History), each with its own URL | no |
| 12 | Resizable panels | Any page may offer a detail pane on the right; pane sizes remembered per user | yes: recommended panels only in the workbench and trace view; with panes on any page, the main area reflows to 8 columns (row 15) and each pane scrolls on its own (row 13) |
| 13 | Scroll area | Each pane scrolls independently; top bar and page header fixed; table headers sticky within their pane | no |
| 14 | Separator | Surface level and spacing first (24 to 32 px); 1 px hairline only where same-level surfaces touch | no |
| 15 | Grid | 12 columns, max content width 1440 px, tiles span 3; 4 columns on tablet, 1 on phone; 8 columns when a detail pane is open | no |
| 16 | Command palette | Cmd or Ctrl + K; finds objects by name or id and every page, then a short list of actions; natural-language questions to a VI model are a P2 extension | no |
| 17 | Menus | Every table row has a visible ⋯ button; right-click mirrors it; destructive actions last, separated, in the critical colour | no |
| 18 | Shortcuts | Fixed set in vi-kit: Cmd/Ctrl+K, /, G then a letter, E engineering view, D density, ? help sheet | no |
| 19 | Headline tile | Label, value ± interval, status label when a threshold applies, signed change vs last period, source and as-of on hover; four per page at most | no |
| 20 | Data table | Server-side paging at 50 rows, sort and filter on the server, virtual scroll above 200 rows; column choice, order and width saved per user; sticky header and first column | no |
| 21 | Status label | Five statuses only (Good, Warning, Critical, Info, Neutral); each product maps its own words onto them in one vi-kit table | no |
| 22 | Placeholder cell | Five fixed reasons: Not yet run, Not applicable, Insufficient data, Withheld, Failed to compute (linked to the error) | no |
| 23 | Tooltip | Definitions and reasons only, never actions or required information; opens on hover and focus after 300 ms | no |
| 24 | Description list | Label above value, two pairs per row on desktop, one on phone; empty values use the placeholder | no |
| 25 | Tree | Trees for every object group (models, use cases, agents, evidence, approvals) | yes: recommended trees for model lineage only; flat collections need a declared hierarchy (by owner, domain or status), and every tree shows child counts and offers a table view of the same nodes |
| 26 | Badge and tag | Badge: system-set count or short state, read-only. Tag: neutral user-set label, filterable and removable. Status never uses a badge colour | no |
| 27 | Avatar | People: initials in a circle, directory photo if available. Agents and services: a square with a model glyph. Name beside or on hover | no |
| 28 | Timeline | Vertical, newest first, one line per event, expand for before and after; business view shows the latest decision only, full list in the engineering view | no |
| 29 | Code block | JetBrains Mono, ligatures off; highlighting generated from tokens for light and dark; copy, line numbers, wrap toggle; JSON collapsible by key; read-only | no |
| 30 | Hover card | Summary card after 500 ms (name, type, status, owner, one metric with interval, Open link); opens on focus and long-press; one design per object type | no |

## Risks and licence flags

| Risk | Why it matters | Mitigation |
| --- | --- | --- |
| Attention sink | A kit is the kind of work engineers enjoy and products do not ship on; it can absorb a stream for a quarter with no consumer read | Appetite capped (Phasing); the kit only adds a component when a consumer screen needs it; H1 is read at the second consumer, not at the kit's own release |
| Owned-code maintenance | The team owns visual bugs and regressions forever | Visual regression (Playwright screenshots) mandatory from v0; two-week release train; named core review |
| Enterprise system collision | If an enterprise system exists and the kit ignores it, the portal will be asked to re-skin later | Decision 1 before any build |
| Primitive churn | shadcn moved its default base from Radix to Base UI in 2026 | Pin React Aria explicitly; never depend on shadcn's default |
| Token standard maturity | DTCG 2025.10 is a Community Group report; Style Dictionary support is partial | Pin versions; validate in CI; keep the token schema small |
| Salt high density | Fails WCAG 2.2 AA target size by Salt's own documentation | If Salt wins the test, medium and low densities only |
| Charts licence | Salt charts depend on commercial Highcharts | ECharts or Recharts regardless of the kit decision |
| axe-core, Pa11y | MPL-2.0 file-level copyleft; LGPL | Dev and CI dependencies only, never bundled, never modified; legal sign-off |
| AG Grid, MUI X | Enterprise and Pro tiers are commercial | Stay on Community APIs; procurement decision if grouping or pivot is ever needed |

## Phasing and appetite

1. Shaping (this chat): decisions 1 to 5 taken; capabilities declared; appetite set.
2. Kit test (about one engineer-week, one engineer plus a coding agent): the portal's Overview and Record pages built both ways in Storybook with the a11y addon; the H2 read recorded in the critique log.
3. Stress test (own session): critique log, kill criteria, rubric score; the kit test result is the critique object.
4. v0 on the portal (appetite proposed: three engineer-weeks across one stream): tokens, the components the portal sketch needs and no more, ECharts theme, Storybook, visual regression; the portal sketch re-skinned; the Design System artifact recorded.
5. Second consumer (VI-007): nine dashboard views re-skinned; the H1 read.
6. Shipped: the kit is published inner-source and the third consumer (VI-010 blueprints) adopts it without the core team's help.

Total appetite proposed: four engineer-weeks to the H1 read. If the kit test shows Salt wins, phase 4 shrinks to a theme and the appetite halves.

## Open questions

| Question | Owner | Due |
| --- | --- | --- |
| Is there a Vanguard enterprise design system, and who owns it? | Head of VI | decision 1, this chat |
| Who is the kit core (one engineer now, two after the test)? | Head of VI | decision 4 |
| Can the kit's accessibility evidence pack be cited in the usage-approval record, or does governance want its own test? | portal product lead, when named | Stress test |
| Is Figma in use on the team at all? If not, the Figma import path is dropped from scope | kit core | kit test |
| Does legal accept axe-core (MPL-2.0) as a dev dependency? | kit core | before v0 |

## Critique log

Empty until the Stress test session. The kit test result (H2) is the first entry.

## Decision log

| Date | Decision | By |
| --- | --- | --- |
| 2026-11-02 | Split out of the VI-003 session and registered as VI-013 at Seed; scout brief recorded with a recommendation for owned code on React Aria, DTCG tokens, ECharts and TanStack, Salt as the alternative | Jithin (split); thinking partner (brief) |
| 2026-11-02 | Idea card written at Shaping: problem, hypotheses H1 to H3, goals and non-goals, design language, components, capabilities reused and created, five decisions queued with recommendations, phasing and a four-engineer-week appetite proposed | Thinking partner, pending Jithin |
| 2026-11-02 | Decision 2: owned code on shadcn/ui with Base UI as the primitive base. Salt and the two-kit comparison dropped; React Aria not the base. Thinking partner's dissent recorded: React Aria's Table and Grid carry deeper keyboard and screen-reader behaviour than Base UI; mitigated because the kit's grids run on TanStack Table, and H2 now carries a React Aria-for-grids-only fallback if the Record page cannot reach AA | Jithin (the thinking partner had recommended React Aria) |
| 2026-11-02 | Decision 2a revised: shadcn code is not forked. Generated shadcn files live untouched in packages/ui and are re-pulled from upstream; everything VI owns (tokens, theme, variants, formatters, blocks) lives in packages/vi-kit and imports from ui. The registry publishes vi-kit | Jithin (second thought); thinking partner agreed |
| 2026-11-02 | Inventory rows 1 to 30 decided one at a time (see Inventory decisions). Four against the recommendation: row 3 density toggle for everyone; row 8 sidebar grouped by object; row 12 detail pane on any page; row 25 trees for every object group. Row 7 app shell pending Jithin's example (dock-style collapsed sidebar with four conditions) | Jithin |
| 2026-11-03 | Reference walk complete (72 screens); the Design DNA v0 tab written (five jobs, six page archetypes, surfaces, geometry, type, charts, interaction, content); glass shaped as a fourth surface level in three families; the kit test fixed as three portal screens, one per archetype: Portal home (Home brief), VGLM4 Core model record (Record), usage approval UA-0291 (Decision), as written in DNA section 8. Colour deferred to the palette phase, which follows the DNA | Jithin (confirmed) |
| 2026-11-03 | Kit-test screens v0 built on a Design canvas from DNA section 8, monochrome: Portal home, VGLM4 Core model record, usage approval UA-0291; dock, top bar, inset content frame, light-glass shell, status as glyph plus word, intervals as one unit, placeholder with reason. Canvas: [VI design kit — kit-test screens v0](https://claude.ai/artifact/U3eDnJ7sLzNb6AvBhA92up). For Jithin's alignment check before the palette phase | Thinking partner, pending Jithin |
| 2026-11-03 | Glass adopted as the kit's true DNA, both modes (Jithin: go all in; the backdrop must give the glass something to reflect). Canvas now nine artboards: five light-glass screens (home, model record, approval, chat home, conversation) on a layered neutral backdrop with the content plane at 80 percent frosted; a glass specimen sheet with four surface levels per mode, the anchor and the lit state; three dark-glass screens (home, conversation, model record engineering view) on a near-black dot-grid backdrop with the active edge, node or series as the only lit thing. Rules carried: reduced transparency and compact density fall back to opaque; contrast tested over the worst backdrop | Jithin (direction); thinking partner (build) |
| 2026-11-03 | Row 7 app shell decided: the floating dock outside the frame is dropped (it offset every page). Two shells: C2, a full-width glass bottom bar, always present, for business views in light glass; D, the dock inside the frame and top-anchored, for engineering views and dark mode. One NavItems component carries the active state and badges for both. Options A to D and C2 kept on the canvas as the record. Carried through all eight screens. vi-kit repo skeleton committed locally (tokens v0 as DTCG, package layout, kit-test artboards, the vi-kit skill, CI); push waits on Jithin creating the private repo thinklatent-labs/vi-kit | Jithin (shell choice); thinking partner (build) |
| 2026-11-03 | Row 7 revised: shell D everywhere, light and dark. C2 (the full-width bottom bar) was tried on the light screens and dropped: a permanent bar over the bottom of every table blocks the UI. One shell, one NavItems component; A, B, C and C2 stay on the canvas as the record. All fourteen artboards and the repo updated. | Jithin |
| 2026-11-03 | Palette set: six teals (#05161A, #072E33, #0C7075, #0F969C, #6DA5C0, #294D61; ref @uiuxaadi), mapped by job rather than by name: ink #05161A for text; anchor #072E33 (light) inverting to steel #6DA5C0 (dark); accent #0C7075 on actions, selection and the active chart series; slate #294D61 for secondary text; bright #0F969C as the lit state in dark mode and a backdrop glow in both; cool neutrals derived for hairlines, chips and tracks. Light backdrop #DCE7EB with steel and teal blobs; dark backdrop #05161A with a steel dot grid and a teal glow; panels tinted #072E33. Tokens carry it as teal.\* (the palette) and role.\* (the jobs); components use roles only. Open: warning and critical status hues are not in this palette and must not be invented from it; status stays glyph plus word until decided. Canvas v15 and renders delivered; repo commit c727adb | Jithin (palette); thinking partner (mapping) |
| 2026-11-03 | Palette revised, supersedes the six-teal decision above. Jithin rejected the teal palette on sight (thinking partner's diagnosis: one hue family, no neutral, no room for status). Bases fixed: white in light, black in dark. Three families (cool, warm, green) rendered on the same two screens; green preferred. Final palette derived from Vanguard's own colours (logo red #96151D Pantone 7628 C; site ink #040505, charcoal #3F4444, muted #717777, link blue #145BFF; FF Mark, Inter as the free match): neutrals carried over; anchor #1F2A26; accent emerald #047857 on actions, selection and the active series; brand red on the VI tile and critical only, because red must mean critical in a decision portal; status hues set (good #2E6E52, warning #B45309, critical #96151D, info #2A5BD7), glyph plus word unchanged. Dark: text #E8EBEA, secondary #9AA3A0, anchor #D6DDD9, lit #10B981, brand #D23B48, panels #141A17. Sources are a logo analysis and a third-party capture of investor.vanguard.com, not the official brand guide; verify against the internal guide before the kit ships. Tokens v2 as vanguard.\* and role.\*; canvas v17; palette sheet in the repo (commit 8d9db57) | Jithin (direction, family, approval); thinking partner (derivation) |
| 2026-11-03 | Dark mode rule: black, nothing else. The Vanguard-derived dark mode still read as a dark teal because panels carried the palette's darkest tint and the backdrop a coloured glow; both removed. Dark backdrop #000 with a neutral dot grid, panels rgba(16,16,16,.62), text #ECECEC, secondary #9A9A9A, anchor inverts to #E2E2E2; the only hue on a dark page is the lit element and the brand red. In consequence a palette choice is a light-mode choice; in dark a plate only sets the lit colour. | Jithin |
| 2026-11-03 | Light palette, provisional: Steel on Graphite. The emerald accent was judged not to cut it; Jithin supplied seven plates (Wine, Steel, Forest, Navy, Graphite, Aqua, Emerald depth), each rendered on the light home and the dark conversation with Vanguard ink and red fixed. Thinking partner's recommendation: Steel accent #477C8B on the Graphite neutral ramp (ink #17151C, anchor #292531, secondary #45404F, muted #716879, tints from #E2DDE7), with Wine as the on-brand alternative that would cost the critical signal. Jithin: leave it at Steel on Graphite, to be revisited. Applied to all fourteen boards, tokens v3 (role.\*, plates recorded), repo commit 677f7de. Dark lit colour #6FA9BB. | Jithin (provisional); thinking partner (recommendation) |
| 2026-11-03 | Glass references adopted: Apple Liquid Glass (the rules: glass on the control layer, never on content; regular and clear variants), Framer, Vercel and Reflect (light shell, glass on nav and hero cards with solid surfaces under text), Raycast (the dark floating overlay), Mercury (clean, readable finance light mode). From a scout of 24 options in four groups (Apple reference, products, live code demos, galleries). How glass lands on shadcn without editing generated files: semantic CSS variables from the token build; a vi-kit stylesheet targeting shadcn data-slot hooks for every overlay (popover, dialog, menu, sheet, tooltip, command, sidebar); a surface variant on the vi-kit wrappers; rules: one visible glass layer at a time, lens only on the dock and command palette, opaque fallback under @supports, reduced transparency and compact density, contrast tested over the worst backdrop, slot list pinned by the kit test. Recorded in packages/vi-kit/src/README.md. | Jithin (references); thinking partner (mechanics) |
| 2026-11-03 | Reference walk 73–82 (ten modern product shots: document fan library, lit node graph on black, dot-field risk analytics, credit tiles on colour fields, glass device status, dark finance dashboard, mobile credit tiles, glass payment timeline). Shared language: display numerals carry the page (48–96 px, light weight, unit dropped to small grey); squircle tiles with 24–32 px radii, ring icon top-left, round arrow top-right, number bottom-left, mono sparkline or dot-matrix bottom-right; pill controls; glass tinted by blurred colour fields behind it with data tiles opaque; black dark mode with one lit path; almost no hairlines; one expressive hero per screen. Limits noted: 3D fans and dot-matrix numerals are concept-shot moves, kept to one hero on the Home brief; colour fields live only under the hero zone so the white base holds; consumer warmth does not transfer. v4 modern Portal home built in this language beside v3 (canvas v24, ModernHome board). DNA v2 pending Jithin's reaction: display type tier, the VI tile atom, the colour-field rule, radius 24/32, borders only on glass. | Jithin (references, direction); thinking partner (build) |
| 2026-11-04 | v4 modern confirmed as the look ("this is where I wanted it from a look perspective"). DNA v2 rules now standing: display type tier (52 px on tiles, 96 px on a hero; weight 300; unit or interval in small grey); the VI tile atom (ring icon, round arrow, display number, mono sparkline or dot-matrix; radius 28; no border; soft shadow); pill controls everywhere; colour fields only under the hero zone, glass tinted by them, data tiles opaque; white canvas; one expressive hero per archetype; hairlines only on glass; dark stays black with one lit path. v3 boards become the record; v4 is carried to Record, Approval, chat and dark next. | Jithin |
| 2026-11-04 | VI colour system v1 adopted from five reference batches (reference walk 83–110). Three mains: VI Green #3E9A5C (the brand; ramp 800 #0C3F09 to lit 200 #79F181; same hue in both modes; green unused elsewhere internally, VI is internal-only so no conflict with the Vanguard theme), Sea Teal #2F7A6D (companion: surfaces, glass tint, second series), Vanguard Red #C4262E (the decision colour: the VI mark's second tone, critical, irreversible actions; never decorative; corrected from the wordmark red to the live site crimson at Jithin's instruction). Neutrals: off-white canvas #ECECEA with frosted tiles in light; black with bordered neutral panels and one coloured card (green 800→500 gradient, grain) in dark. Extended set of six hues on one glass recipe (light: hue at 22% over canvas; dark: gradient plus grain) so chart categories are the same material; status hues set, glyph plus word unchanged; good moved to teal so green stays the brand. Logo is three-tone with one tone white (not shared); green and teal assumed as the chromatic tones. Command center rendered in both modes (canvas v28); tokens v4; system sheet in the repo. | Jithin (colours, direction); thinking partner (system, recipe) |
| 2026-11-04 | GitHub repo created by Jithin: thinklatent-labs/vi-kit (private). Six commits pushed to main (c304139 to 49ea566): skeleton, shell D, palette passes, tokens v4, CONTRIBUTING, system sheet and artboards. Branch protection and CODEOWNERS membership still to be set by Jithin. v4 layout confirmed as the look; modern home named the VI Portal command center; v4 nav (pill bar with the day's meetings plus dock D) fixed as the navigation. Open: whether the kit test (H2) is the team's first PR or drafted by the thinking partner. | Jithin |
| 2026-11-04 | shadcn/ui is in the codebase. packages/ui holds all 64 registry components generated on Base UI (style base-nova, neutral theme, Lucide) by the shadcn CLI (ui.shadcn.com allowed for the session at Jithin's request); components.json set so \`pnpm shadcn:update\` is the source of truth; scripts/vendor-shadcn.mjs as the GitHub fallback. Tokens build to --vi-\* CSS variables (Style Dictionary v5). @vi/kit: theme.css maps shadcn's semantic variables to role tokens; glass.css applies glass via data-slot hooks, defines the surface levels (frame, content, raised, coloured, ink, opaque) and the opaque fallbacks; first components Surface, Tile, Status, Interval. apps/playground runs the command center on the kit in light and dark; CI runs tokens, typecheck and the build. Commits 67e472b and dbf78f4. Decision: the kit test (H2) is drafted by the thinking partner; the team critiques a working playground. Branch protection and CODEOWNERS deferred until a third person joins the repo (currently Jithin and the thinking partner only). | Jithin (go-ahead, repo, allowlist); thinking partner (build) |
| 2026-11-04 | OPEN ITEM, owner Jithin: verify the colour system against the official Vanguard brand guide and the real VI logo tones. Steps: (1) in the brand guide read the primary red and the wordmark red and compare with the sampled #C4262E and #9A1B22; (2) note any defined neutrals or secondary palette; (3) eyedrop the VI logo's three tones and send the hexes (the logo itself need not be shared); (4) note usage rules for the red (minimum size, on black, tinting), which decides whether dark-mode #D9434C is allowed. Jithin has no access at the moment and will confirm later; tokens, sheet and card update in one commit when he does. | Jithin (pending) |
| 2026-11-04 | Kit test built as code (commit f0fa1ce): the three screens (command center, VGLM4 Core record, usage approval UA-0291) run on vi-kit in apps/playground in light and dark. Clarified for Jithin: the canvas artboards are hand-drawn HTML (the target); the playground is the first thing built with the kit. @vi/kit gained Shell (in the playground for now), Sparkline, Bars (dashed = projected), DotGrid, PillarStrip, AgentBrief, DataRows, Facts; Tile gained valueSize and caption. H2 evidence: all three screens render on Base UI at comfortable density; compact density and the AA contrast run over the worst backdrop still untested. Finding: the pillar strip in code inks four pillars below the 0.85 target (Retrieval 0.84, Reasoning 0.83 as well), where the artboard showed two; the artboard was wrong. Open product rule for Jithin: does 'below target' mean below the target, or below it by more than the interval? Large-chart wrapper (the dot-field index) waits on decision 3 (ECharts). | Jithin (approved); thinking partner (build) |
| 2026-11-04 | Playground published as a live page (the React build of commit f0fa1ce): https://claude.ai/artifact/LHMeaT54htG3mzg914N7Ew. Jithin reviewed it and approved the look. The canvas remains the design target; the playground is the kit. | Jithin |
| 2026-11-04 | Playground now covers all six canvas archetypes in code (commit 59e7382; live page version 2): command center with the dot-field index (DotField added to @vi/kit), Ask VI home, conversation with an agent in the loop (thread list, agent draft card with tone chips, context pane with suggested replies), engineering view (lit serving graph, traces, latency bars, history). Jithin's instruction: keep building until the playground matches the canvas. Remaining for H2: compact density (toggle is inert), the AA contrast run over the worst backdrop, and a chart library for the large charts (decision 3). | Jithin (direction); thinking partner (build) |
| 2026-11-05 | Green ramp extended at Jithin's request from a palette sheet (#6CB769, #FFFFFF, #000000, #1B5128): forest #1B5128 added as green 800 (dark gradient mid, selected item) and sage #6CB769 as green 300 (fills, tints, lit edges in light; fails AA for text so never a text or button-fill colour). Ramp renumbered 900 to 100; lit is green 100; the dark coloured card runs 900 → 800 → 500. Commit 22a6baf; sheet updated. | Jithin |
| 2026-11-05 | Colour system v1.1 made permanent after an A/B render of the command center in both modes. Roles: light accent is sage 300 (active dock item, calendar pill, active bars, lit dot, glass tint) with green 900 as its text colour; primary buttons and the selected pill are forest 800 (was ink). Dark: the coloured card runs black → forest → sage; lit is sage (the thinking partner would have kept mint for the dark lit; Jithin chose B as rendered). VI Green 500 remains the brand reference and the VI mark. Trial toggle removed; tokens v5, theme, shell, sheet v1.1 and all eleven playground renders updated; commit df979d8; live playground version 3. | Jithin |
| 2026-11-05 | Animated components come in as local source only, never as a service. New package @vi/motion: 92 of 102 free kokonutui components (MIT) vendored at upstream 4d497b7 by scripts/vendor-kokonut.mjs, never edited in place; 10 excluded (v0.dev link, remote Unsplash images, three Radix-only components to be ported to Base UI in @vi/kit). Next.js imports shimmed locally, demo URLs stripped, Inter self-hosted (Google Fonts removed). Network audit (scripts/audit-network.mjs) runs in CI and fails on any URL, fetch, socket, beacon, env or key access; a headless run of the Motion page records zero external requests. The look stays fixed: a bridge re-points Tailwind's palettes to the VI ramps; products import adopted wrappers from @vi/kit, never @vi/motion directly; 14 files with hard-coded hex and all demo copy are adopted one by one. Commit a834b42; live playground version 4 with a Motion page (24 curated, all 92 browsable). Scout of other libraries saved as claude/scout-brief-animated-libraries.md: Magic UI, Motion Primitives and Cult UI next under the same rules; Animate UI and React Bits wait for Vanguard legal (Commons Clause); Aceternity, Skiper and Hover.dev avoided on licence. | Jithin (constraint, kokonutui); thinking partner (vendoring, audit, scout) |
| 2026-11-05 | All AI and chat components brought in as local source in a new package, @vi/ai (commit 7587bbe): Vercel AI Elements 45 (Apache-2.0), prompt-kit 20 (MIT), shadcn-chat 5 (MIT) and kokonutui's ai-prompt, ai-input-search and smooth-drawer, completing kokonut's 18 AI components. They were written against Radix shadcn, so a 26-component Radix compatibility layer ships inside @vi/ai only; the kit stays on Base UI and adopted @vi/kit wrappers move each piece onto Base UI, so Radix shrinks rather than spreads (a deliberate, recorded exception to decision 2). Excluded: open-in-chat, persona, web-preview, speech-input (browser speech recognition sends audio to the browser vendor's cloud), prompt-kit source. AI SDK used for types only; tokenlens replaced by a VI price-table shim. Playground AI page: 24 curated demos, the composers, a chat sample and all 119 upstream demos; a headless walk of every demo in both themes made zero external requests. Correction: the network audit had not been in the CI workflow, and CI had failed on every commit since the repo was created (pnpm version pinned twice). Both fixed; CI green for the first time. Live playground version 7. | Jithin (scope: all AI components); thinking partner (vendoring, compatibility layer, CI fix) |
| 2026-11-05 | All free component libraries brought into vi-kit as local source, and a component playground built to review them in the VI look. Ten more libraries vendored by scripts/vendor-libs.mjs at pinned commits (Magic UI, Motion Primitives, Animate UI, React Bits, Cult UI, Eldora UI, Syntax UI, Indie UI, coss ui, Origin UI; about 2,400 files) beside kokonutui and the AI set. Same rules: imports mapped to the workspace; a new @vi/compat package holds the Radix shadcn layer (55) and Next.js stand-ins that upstream code expects (never product code); remote images become a built-in placeholder; anything that fetches, opens sockets, reads env, handles keys or uses an online service is left out with its reason (48 in all: tweet embeds, a map globe, GitHub stars, eight Origin components that fetch); every literal colour mapped onto the VI ramps (scripts/vi-colour.mjs) on top of the palette bridge; 4 files with missing exports left out, 50 with type-only mismatches kept as written (typed loosely). Animate UI and React Bits carry the Commons Clause: vendored for internal review, legal check before product use. Aceternity, Skiper UI and Hover.dev not copied (licences forbid it). Component playground (apps/catalog, published): 2,524 components from 16 libraries with 1,141 upstream demos, including shadcn's official Base UI examples for the kit's own base; a headless walk opened all 2,543 entries: 2,243 render on their own, 205 show nothing alone, 92 need props, 3 building blocks or heavy WebGL, zero external requests. The kit-test playground drops its Motion and AI pages. Commits ed6edc0, d63e4da, 82cd081; CI green. | Jithin (all libraries; playground in the DNA); thinking partner (vendoring, compat, colour mapping, playground, walk) |
| 2026-11-05 | Published pages use relative asset paths and are checked under the artifact host's conditions before they count as published. The component playground showed a blank page on claude.ai: both playgrounds were built with absolute /assets/ paths, which point nowhere when the host serves the page under a path. Rebuilt with relative paths (Vite base './') and republished: component playground version 2, whose first load drops from 129 files (13 MB) to 46 (6 MB) because the home page's manifests no longer pull whole libraries in; kit-test playground version 9, now without its Motion and AI pages (394 files down to 10). Headless check with the host's page wrapper, under a path, in a cross-origin frame, with storage blocked and a strict CSP: home renders in about a second, 36 of 36 sampled pages and components render, zero external requests. Not yet seen in the claude.ai viewer itself (no browser connected to the session). Commit 7f7bfd5. | Thinking partner (cause, fix, check), after Jithin found the page blank |
| 2026-11-05 | Dark mode fixed on claude.ai, and the check for published pages now compares pixels. Jithin confirmed the component playground renders in the viewer, then found dark mode broken: dark glass cards on a white page with black text. Cause: the viewer wraps the page in a skeleton with unlayered body styles (white background, black text, 14px system font) and color-scheme light; unlayered rules beat Tailwind's layers, so the kit's base-layer canvas, ink and Inter type lost in both modes. Fix in @vi/kit (packages/vi-kit/styles/index.css): the body's canvas, ink and type (font inherited from html) and the colour scheme stated outside any layer, with the theme tokens. Both playgrounds republished (component playground version 3, kit-test playground version 10); inside a copy of the viewer's skeleton the render now matches the plain page pixel for pixel, light and dark. Supersedes the line above as the check for published pages. Commit 969f885. | Thinking partner (cause, fix, check), after Jithin found dark mode broken |
