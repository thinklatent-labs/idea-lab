---
id: TL-016
slug: team-site
title: "ThinkLatent site and communications — the team's SharePoint home (vision, products, wins, publications, press, team blogs) built on the ThinkLatent design kit's theme, and the communication and marketing strategy it serves"
aliases: []
type: Idea
parent: null
themes: ["T-001"]
stage: "Shaping"
stage_since: null
horizon: "H1"
stream: null
appetite_weeks: null
appetite_ends: null
owner: "Head of ThinkLatent (sponsor); site editor to be named"
score: null
score_status: none
doc_url: "https://claude.ai/artifact/9ZtoVU9roiRiACFjqe5nJu"
standard: "v1"
last_touched: 2026-11-07
sensitivity: none
critique_recorded: null
next_step: "Canvas v8 applies the v7 review (D-137): Home trimmed to about seven sections (FAQ to ThinkLatent at a glance, TL;DR folded into proof, strip launches with sourced numbers only); Mandate gains four measured targets as brackets; Blog cadence set to leaders rotating, one leadership post a month inside a cap of two posts a month; Use case template sharpened against Win story (ongoing per use case vs one moment, one number); ThinkLatent Trust goes live only after Risk signs off the wording; ThinkLatent Day built on the test site but published once the Summit date is set; AI Perspectives keeps the demo and podcast panels marked 'coming'. Everything else kept, all eleven templates included. In parallel the team fills the launch brackets (list in the idea doc Notes, 2026-11-07), including sources for Team's three how-we-work numbers, which stay at launch. Then the SharePoint build guide (stream 4) and the custom.css request; Stress test before the build goes past the test site. Still open from Jithin: rundown part 3, product leads' five wins, A8 Comms contact, intake owner, editorial board's three names From TL-013 (2026-11-07): design-kit v0.1.0 is the first release to pin to (commit 8653232; tag once Jithin pushes it)."
next_step_due: "2026-11-14"
---

# ThinkLatent site and communications — the team's SharePoint home (vision, products, wins, publications, press, team blogs) built on the ThinkLatent design kit's theme, and the communication and marketing strategy it serves

<!-- generated:start -->
## Lab record

**TL-016 team-site** · Idea · Shaping (idea card v0, 2026-11-04; decision 1: built in SharePoint by Jithin, designed outside on the kit; design-kit ships a theme pack (tier 1, no IT) and custom.css (tier 2, one IT request); scope widened to the communication and marketing strategy; five workstreams) · H1

Owner: Head of ThinkLatent (sponsor); site editor to be named. Appetite: not set. Score: not scored .

Next step: Canvas v8 applies the v7 review (D-137): Home trimmed to about seven sections (FAQ to ThinkLatent at a glance, TL;DR folded into proof, strip launches with sourced numbers only); Mandate gains four measured targets as brackets; Blog cadence set to leaders rotating, one leadership post a month inside a cap of two posts a month; Use case template sharpened against Win story (ongoing per use case vs one moment, one number); ThinkLatent Trust goes live only after Risk signs off the wording; ThinkLatent Day built on the test site but published once the Summit date is set; AI Perspectives keeps the demo and podcast panels marked 'coming'. Everything else kept, all eleven templates included. In parallel the team fills the launch brackets (list in the idea doc Notes, 2026-11-07), including sources for Team's three how-we-work numbers, which stay at launch. Then the SharePoint build guide (stream 4) and the custom.css request; Stress test before the build goes past the test site. Still open from Jithin: rundown part 3, product leads' five wins, A8 Comms contact, intake owner, editorial board's three names From TL-013 (2026-11-07): design-kit v0.1.0 is the first release to pin to (commit 8653232; tag once Jithin pushes it). (due 2026-11-14)

Production surface: not named (reads as an H3 experiment).

Governance: not recorded.

### Decisions due
_None._

### Hypotheses
_None recorded._

### Kill signals
_None recorded._

### Open questions
_None recorded._

### Links
| Link | To | Note |
| --- | --- | --- |
| reuses | TL-013 design-kit | Declared at Shaping 2026-11-04; the kit is the site's whole design, pulled as a dependency |
| reuses | strategy spine and register (TL-006) | Declared at Shaping 2026-11-04; the kit is the site's whole design, pulled as a dependency |
| reuses | index evidence (TL-004) | Declared at Shaping 2026-11-04; the kit is the site's whole design, pulled as a dependency |
| reuses | use-case records (TL-003) | Declared at Shaping 2026-11-04; the kit is the site's whole design, pulled as a dependency |
| reuses | scheduled-task patterns | Declared at Shaping 2026-11-04; the kit is the site's whole design, pulled as a dependency |
| reuses | Think Latent (TL-002) | Declared at Shaping 2026-11-04; the kit is the site's whole design, pulled as a dependency |
| evidence-for | TL-013 design-kit | Second consumer of the kit; S4 (no component built outside the kit) is a read of TL-013's H1 |
| related-to | TL-003 portal | The site tells, the portal shows and runs; Products pages link into the portal; folding the site into the portal as its front door is the designed exit (Q7) |
| creates | Content-as-code site template on design-kit | Catalogue rows at Idea maturity |
| creates | ThinkLatent publications and press index | Catalogue rows at Idea maturity |
| creates | team blog pipeline | Catalogue rows at Idea maturity |
| creates | second-consumer evidence for the kit | Catalogue rows at Idea maturity |
| depends-on | TL-003 portal | The site links into the portal for the ten handed-over features and all evaluation; it carries outcome summaries and static images only |

### Artifacts
| Artifact | Kind | In this repo | Live | Exported |
| --- | --- | --- | --- | --- |
| ThinkLatent site (team-site) — Idea card | doc | [artifacts/TL-016-team-site/idea-card.md](../artifacts/TL-016-team-site/idea-card.md) | [claude.ai](https://claude.ai/artifact/9ZtoVU9roiRiACFjqe5nJu) | 2026-11-04 |
| ThinkLatent site — v7: the 42 feature decisions on the v3 site | design | [artifacts/TL-016-team-site/design-canvas/project/canvas.json](../artifacts/TL-016-team-site/design-canvas/project/canvas.json) | [claude.ai](https://claude.ai/artifact/4uZUcDCHWPTqtzMXZrLKQD) | 2026-11-07 |

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-082 | 2026-11-04 | Registered at Shaping with an idea card: an internal home for ThinkLatent (vision, products, wins, publications, press, team blogs) built with Claude Code inside the boundary on the ThinkLatent design kit as it is; recommended as a content-as-code static site with no backend and no internal integration, linked from SharePoint rather than built in it; the portal named as the designed exit; S1 (read outside ThinkLatent) and S3 (the team writes for it) are the kill hypotheses; Q1 repo location, Q2 internal static host and Q3 site editor block the build; appetite of two engineer-weeks proposed | Jithin (idea); thinking partner (card and recommendation), pending Jithin | proposed |
| D-083 | 2026-11-04 | Decision 1: built inside Enterprise SharePoint by Jithin, designed outside it on the kit first; the static site (Option B) superseded and kept as fallback. Modern SharePoint allows no custom CSS without an SPFx application customizer, so design-kit ships two tiers: a theme pack mapping the ThinkLatent palette to SharePoint theme slots (site owner applies it alone) and a custom.css for the customizer (one IT request); fonts need the Brand Center and are blocked on hub-joined sites; glass, dark mode and the dock are out of reach and the design will not promise them. Scope widened to the communication and marketing strategy; five workstreams (content organisation, design, kit pack, build guide, strategy), the first and last from Jithin's rundown | Jithin (build path, scope); thinking partner (tiers, workstreams) | accepted |
| D-085 | 2026-11-04 | Rundown recorded and turned into site map v0, strategy v0 (thesis: show what the Enterprise can do now, the AI-augmented team as proof, three numbers as scoreboard), six bold moves with kill conditions, five templates and leadership topic seeds; success measures named by Jithin (innovation cycle time, impactful solutions in hands, an AI-native workforce) with definitions proposed; the ThinkLatent Portal named as the solution in people's hands; February set by Jithin as the working target, deadline his to manage. Thin: the site editor and AI Perspectives lead do not exist yet; the intranet and the external blog timelines are Comms's; the portal pilot depends on TL-003 | Jithin (rundown, measures, ambition); thinking partner (map, strategy, moves, templates), pending Jithin | proposed |
| D-088 | 2026-11-04 | Decision 2: the ThinkLatent Portal is out of TL-016's scope; the site links to it and depends on nothing in TL-003. Deliverables plan written: 83 items in seven groups (decisions, design boards, kit pack, SharePoint build, build guide, content, strategy artefacts) with owner, input and done-when; critical path is the eight decisions, then design brief and theme in parallel, then boards, then guide and build together | Jithin (scope); thinking partner (plan) | accepted |
| D-089 | 2026-11-04 | Decisions A1 to A7 taken as questions with recommendations: Jithin is the site editor until the build is done, then the technical program manager runs it; the senior member who runs an outside women-in-AI group leads AI Perspectives v2 and the podcast pilot; the SharePoint theme is generated from the kit's provisional plate; the site is built from scratch as a new site (the existing one reflects nothing); part 3 dictated in chat; product leads propose five wins and Jithin picks three; the scoreboard is reported from the Jira board that already tracks the work. A8 open. New lab practice: decisions go to Jithin as questions with a recommendation | Jithin | accepted |
| D-090 | 2026-11-04 | Decision 3: the site is team-first; navigation Home · Team · Blog · AI Perspectives · Our work plus a Write for ThinkLatent page; every content type ships as a SharePoint page template with built-in writing instructions. Design canvas v1 (15 boards) on the kit's v4 plate | Jithin (decisions); thinking partner (canvas) | accepted |
| D-091 | 2026-11-04 | Decision 4: design canvas made SharePoint-honest; gaps redrawn as native web parts (Microsoft Forms, highlighted table cells for template instructions, no see-through tiles) and tier-2 parts marked on every board | Jithin | accepted |
| D-092 | 2026-11-04 | Decision 5: nominations stay in the Enterprise's recognition portal; the site links to it and posts ThinkLatent's quarterly awards. Six categories approved: Research to Production, In People's Hands, AI-Native, Storyteller, Published, Production Grade. Seventh template (ThinkLatent quarterly awards) added to the canvas | Jithin | accepted |
| D-093 | 2026-11-04 | Decision 6: the site is light and welcoming (white canvas, brand green, teal for immersive moments, an accent per content type: green, teal, steel, terracotta); Decision Red comes through as the Enterprise brand on this internal site (primary buttons, header stripe, a red field in the brand hero, Leadership and Awards, the ThinkLatent tile), never a page surface; particle imagery without connecting lines, generated from kit tokens, in place of photography; dark pages rejected twice. Canvas v3 carries real TLM, platform and the university lab content | Jithin (direction); thinking partner (system, patterns, content) | accepted |
| D-094 | 2026-11-04 | Decision 7: v3 rejected as generic; the site is drawn in the design-kit's own language taken from the playground source (Shell D with pill top bar and glass dock, colour fields tinted per page accent, 28px content tiles with light 52/96px numerals and captions, one coloured glass brief and one ink tile per page, one exhibit per page, status as glyph and word, rows without table chrome, pill buttons; Write for ThinkLatent and the Our work pages carry Decision Red). Canvas v26, all 16 boards generated from gen/kit.py and gen/boards.py. The orb is drawn as dots (six rings in wave-like motion) pending Jithin's check against the logo. Tier map unchanged: sections and native web parts are tier 1; shell, dock, glass, numerals and pills are tier 2 | Jithin (rejection, direction to the kit); thinking partner (rebuild) | accepted |
| D-095 | 2026-11-04 | Decision 8: v4 corrected by Jithin (a site, not a dashboard; everything must be reachable with SharePoint and the custom CSS). v5 built from SharePoint's own page elements (suite bar, Compact header, Title area Overlap, sections with Soft/Neutral/image backgrounds, Hero Layers, Quick Links, News, Text numerals, Events, People, Call to action, Image, Lists with column formatting, Page properties, Embed, Forms), each block labelled with web part, layout and tier; the kit's language kept only where custom.css reaches it (radii, pills, glass, numerals); no dock, no custom top bar. Theme primary = Decision Red; Soft sections mint; green and teal in the imagery (assets5 set regenerated from kit tokens with the dot-drawn orb). Labels stay on the canvas. Canvas v29 | Jithin (constraint, theme primary, labels); thinking partner (v5 rebuild) | accepted |
| D-096 | 2026-11-05 | Decision 9: v4 (dashboard grammar from the playground) and v5 (SharePoint web-part boards with red as theme primary) set aside; back to the v3 site structure, restored from the dark backup through relight.sed. The kit plate unchanged: primary green, secondary teal, neutrals, accent tints per content type; Decision Red added on buttons, the header stripe and banners (custom.css for buttons, since theme buttons render green natively). No pattern imagery until the team designs the new image set; flat plate tints hold the slots. Decision 8 withdrawn. Canvas v32; the per-page SharePoint web-part map lives in the canvas notes | Jithin (direction); thinking partner (restore, record) | accepted |
| D-097 | 2026-11-05 | Decision 10: the site's identity runs mandate first (the Enterprise's own intelligence must compound; proprietary-data models carry the customer feedback loop vendors cannot), then named products (how), then proof of outcomes shown as compounding KPIs. Feature-by-feature review of the 84-item scout inventory started | Jithin | accepted |
| D-098 | 2026-11-05 | Scout inventory reviewed feature by feature (42 questions, each with a recommendation): mandate-led identity; nav Mandate · Products (TLM, ThinkLatent Portal, the TL Index, ThinkLatent Trust) · Our work · Stories · Team; sourced trend strip; four audience doors and a Work with ThinkLatent ladder; Forms intake handing off to the portal; Wins as story + number + partner quote; named trust program 'ThinkLatent Trust'; ThinkLatent Day with a business+ThinkLatent hackathon; newsletter stays email-only; comments on everywhere. Recommendations taken except features 17, 27, 33 and 36 | Jithin | accepted |
| D-100 | 2026-11-05 | The 42 feature decisions implemented on the canvas (v38): 25 boards regenerated from one source in the v6 language; navigation regrouped; Home rebuilt around the mandate, the compounding strip, four doors and the ladder; new pages Mandate, ThinkLatent Trust, ThinkLatent Day, Glossary and ThinkLatent at a glance; Products with the static lineage, outcome cards and the TL Index tile; Blog, AI Perspectives, Wins, Research, Publications, Team and Write for ThinkLatent reworked to their decisions; eleven templates, four of them new. Imagery still deferred; later items (champions network, demo edition, podcast, Work in ThinkLatent) marked on the boards as after launch | Jithin (go); thinking partner (build) | accepted |
| D-137 | 2026-11-07 | Design canvas v7 reviewed board by board (25 boards): keep 18, change 5 (Home trimmed to ~7 sections; Mandate gets four measured targets; Blog cadence = leaders rotate, one leadership post a month, cap two posts a month; Use case sharpened against Win story; ThinkLatent Trust kept but live only after Risk sign-off), defer 1 (ThinkLatent Day until the Summit date is set), AI Perspectives kept with demo edition and podcast marked 'coming'. All eleven templates kept, Model card included, against the recommendation to cut it; Team keeps its three how-we-work numbers, so they need sources before launch. No cuts | Jithin | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._

### 2026-11-07 · Spec · canvas v7 review (D-137)

| # | Board | Mark | Note |
|---|---|---|---|
| 1 | Home | Change | Cut to about 7 sections: FAQ moves to At a glance, TL;DR folds into proof, strip launches with sourced numbers only |
| 2 | Mandate | Change | Add one measured target to each of latency, cost, scale and competitive advantage |
| 3 | Products | Keep | |
| 4 | ThinkLatent Trust | Keep | Live only after Risk signs off the wording |
| 5 | Team | Keep | The three how-we-work numbers stay, so they need sources before launch |
| 6 | Wins | Keep | Launch needs one win with a partner quote approved in writing |
| 7 | Research | Keep | |
| 8 | Publications | Keep | |
| 9 | Blog | Change | Leaders rotate: one leadership post a month, cap of two posts a month |
| 10 | AI Perspectives | Keep | Demo edition and podcast panels stay, marked 'coming' |
| 11 | ThinkLatent Day | Defer | Built on the test site, published once the Summit date is set |
| 12 | Glossary | Keep | |
| 13 | ThinkLatent at a glance | Keep | Takes Home's FAQ |
| 14 | Write for ThinkLatent | Keep | All eleven templates |
| 15–18 | Blog post, Win story, Paper explained, Release notes | Keep | |
| 19 | Model card | Keep | Against the recommendation to cut; watch for drift from the portal card |
| 20 | Leadership series | Keep | |
| 21 | Use case | Change | Sharpen against Win story: Use case is per use case and ongoing, for business readers; Win story is one moment with one number |
| 22–25 | AI Perspectives session, Conference roundup, New partner, Quarterly awards | Keep | |

#### Launch brackets only the team can fill

Template slots (filled by each author when writing) and ThinkLatent Day (deferred) are excluded.

**People and owners**
- Names of the Head of Research, Head of Applied Research and Head of AI Products (Team, Home profiles); the principal scientists for launch profiles
- Head of ThinkLatent "since [YEAR]" and each head's start year
- Site editor / TPM, named on the owner lines of Mandate, Products, ThinkLatent Trust, Glossary, At a glance and Write
- Editorial board: three editors and the function-head advisor
- Risk and Compliance liaison (ThinkLatent Trust)
- Named intake owner for Bring us a problem (Wins)
- Headcount and city for each of the three locations

**Numbers, each with a source and date**
- Compounding strip: use cases in production, business units served, papers/talks/patents count; confirm the sources behind "35M+ interactions a year" and "~200 live per session"
- Mandate: the four measured targets (latency, cost, scale, competitive advantage), new from D-137
- Function output counts this quarter (Research, Applied Research, AI Products)
- Team's three how-we-work numbers: hours saved per person per week, days from draft to published page, % of pages drafted with AI (Jira or survey as source)
- TL Index tile: scores and as-of date (from the TL Index only)
- ThinkLatent Trust: status for each product

**Content**
- Five principle one-liners (Team: Draft with AI, Show the gain, Ship small, Write it down once, Measure how we work)
- First featured win: partner team, what they do now, time before and after, number, unit, source, date, partner quote approved in writing, what compounded
- Three "what they can do now" lines and three new-partner posts (business unit or IT engagement plus problem)
- TLM4 Core 7B FP8 release: what is new, in outcomes; what changed against TLM3; version; business units for each tier
- Home: this month's reflection title, the five TL;DR lines, who is recognised this month
- AI Perspectives: next session topic, date and time, host and bio, guest, the next three sessions
- Leadership series names (four leaders, rotating monthly)
- Research: faculty lead, an intern's project in outcomes, venue and year of the featured paper
- Publications: further conference roundups beyond Ai4 2026 and ARIA 2025; the first ThinkLatent success story on the intranet
- Review dates (DATE + 1 quarter) on the six owned pages
- Link to the Enterprise recognition portal (in every footer)
