# ThinkLatent site (team-site) — Idea card

Nov 4, 2026 · @Jithin Pradeep

An internal home for the ThinkLatent team: vision, products, wins, publications, press and team blogs, built on the ThinkLatent design kit as a static site that touches no internal system.

## Lab record

| Field | Value |
| --- | --- |
| ID | TL-016 |
| Slug | team-site |
| Aliases | ThinkLatent site, team site, ThinkLatent home, the SharePoint, ThinkLatent showcase |
| Type | Idea |
| Parent | none |
| Theme served | T-001 Sovereign AI (as its narrative surface: the site is where the owned-model story is told inside the Enterprise) |
| Stage | Shaping (idea card v0, 2026-11-04) |
| Horizon | H1 |
| Appetite | Two engineer-weeks proposed (one engineer plus Claude Code), pending Jithin |
| Owner | Head of ThinkLatent (sponsor); site editor to be named |
| Rubric composite | Not scored; set at Stress test |
| Links | reuses TL-013 design-kit; related-to TL-003 portal (the portal shows models and use cases; the site tells the team's story); evidence-for TL-013 H1 (second consumer of the kit); related-to TL-002 think-latent (external voice) |
| Sensitivity | Low for the site; medium for content: publications and press mentions carry Enterprise comms and disclosure rules |
| Standard | v1 |
| Last reviewed | 2026-11-04 |
| Register | [Idea Register](https://claude.ai/artifact/6WzPg7fvvAf2tn8Z9X2Q2h) |

## Problem

ThinkLatent's work exists as models, endpoints, decks and papers scattered across repos, slide libraries and inboxes; nobody inside the Enterprise can go to one place and see what the team is, what it has built, what it has won and what it has published. The ThinkLatent Portal (TL-003) will show the models and use cases to the people who build on them, but it is a workbench and showroom for practitioners, not a narrative for the enterprise. The gap is the story: the vision, the products as products, the wins as evidence, the publications and press as credibility, and the team's own voices.

The cost of the gap is adoption and sponsorship. The lab's diagnosis (Portfolio session 1) names evidence for adoption as ThinkLatent's constraint; a story nobody can find is evidence nobody can use. Today a sponsor or a partner team learns about ThinkLatent from whoever last presented to them.

Constraint stated by Jithin: the site must be built with the Claude Code access he has inside the Enterprise, must not break or touch any internal system, and must use the ThinkLatent design kit (TL-013) as it is.

## Who feels it

| Audience | Comes for | Today they get it from |
| --- | --- | --- |
| Executive sponsors and business-line leaders | What ThinkLatent is, what it has delivered, what it is worth to them | A deck when someone presents; the Head of ThinkLatent in person |
| Partner teams deciding whether to build on TLM | Products, success stories, who to talk to | Word of mouth; the portal once it exists |
| The ThinkLatent team (US, Canada, India) | One shared account of the vision and the wins; a place to publish | Chat threads and all-hands slides |
| Risk, Compliance and Governance partners | What exists, what is approved, what was published externally | Separate processes; no index of ThinkLatent's public footprint |
| Recruiters, new joiners, visiting researchers (university lab) | The team's publications, blogs and press | Think Latent (external) and personal LinkedIn pages |

The audience the idea is thinnest on is the first: no sponsor has asked for this site. The register's evidence-of-need criterion is unmet until one does, or until the site is read.

## Hypothesis

| ID | Claim | Measurement | Confirmed if | Refuted if |
| --- | --- | --- | --- | --- |
| S1 | A single internal home for ThinkLatent's story is read by people outside the team without being pushed | Unique readers outside ThinkLatent per month, from the static host's access log or a privacy-safe counter | 100 readers outside ThinkLatent in the second month after launch, with at least 10 from outside the AI organisation | Fewer than 30 readers outside ThinkLatent in month 2 |
| S2 | The site changes conversations: sponsors and partner teams cite it | Count of meetings or messages where the site is referenced, logged by the team for one quarter | 10 citations in the first quarter, at least 3 from sponsors | Under 3 citations; the team still opens with a deck |
| S3 | The team will write for it without a mandate | Posts published per month by authors other than the Head of ThinkLatent | 4 posts a month by month 3, from at least 6 distinct authors | Under 2 posts a month, or the Head of ThinkLatent is the only author |
| S4 | The kit holds as the site's whole design: no component built outside it | Components added outside packages/design-kit during the build | Zero; every gap is filed as a kit issue | More than three site-only components, or the kit's tokens are overridden |
| S5 | A content-as-code site with no internal integration is enough: nothing live is needed for the story | Requests for live data (model counts, usage) in the first quarter's feedback | Fewer than 3 such requests; the portal link answers them | Readers ask for live numbers and leave when they find static ones |

S1 and S3 are the kill hypotheses: a site nobody reads or nobody writes for is a brochure, and ThinkLatent should not spend attention on brochures. S4 is also evidence for TL-013's H1 (the kit pays for itself by the second consumer).

## Why now, why us

Three things line up in November 2026. The ThinkLatent design kit (TL-013) has a repo, tokens v3 and a confirmed look (the v4 modern home), and needs a second consumer to prove H1; a content site is the cheapest second consumer there is, because it has no application logic to fight the kit. TLM4 is in production and the index (TL-004) and the portal (TL-003) are weeks from their first evidence, so there is finally a story worth a home. And Claude Code is available inside the boundary, which turns a site that used to cost a comms team a quarter into a two-week build by one engineer.

Why ThinkLatent and not Corporate Communications: the content is ThinkLatent's (products, publications, blogs by the team) and the look is ThinkLatent's (the kit, inside the boundary, no conflict with the Enterprise brand because ThinkLatent is internal-only). Comms owns anything that leaves the building; this site stays inside it and links out.

Why not wait for the portal: the portal is at least a quarter out and is built for practitioners; a story page bolted onto a workbench serves neither reader. The site can later be folded into the portal as its front door if S1 and S5 hold, and that fold is the designed exit (see Options).

## Options considered

Brainstorm pass (product-brainstorming pattern): five shapes, then two adjacent and three contrarian options. The recommendation is B.

| Option | Shape | What it gives | What it costs | Verdict |
| --- | --- | --- | --- | --- |
| A. A real SharePoint site | Pages and web parts in the Enterprise's SharePoint, styled as far as SharePoint allows | Zero hosting work; search and permissions for free; where people already look | The kit cannot be used as it is: SharePoint fixes Fluent UI, limits custom CSS and scripts, and custom web parts (SPFx) need a tenant deployment approval, which is the kind of internal change Jithin wants to avoid | Not as the site; as the link that points to it |
| B. Content-as-code static site on the kit | Markdown and front-matter in a repo; a static build (Next.js export or Astro) on design-kit; deployed to an internal static host; a SharePoint page links to it | The kit as it is; no server, no database, no integration; reviewable in pull requests; Claude Code writes pages and posts; rollback is a revert | Needs one internal static host (or an existing internal web host) and a URL; no comments or reactions without a backend | Recommended first version |
| C. The portal's front door | Build the story as the public landing of TL-003 | One product, one URL | Waits a quarter for the portal; mixes a narrative with a workbench; the portal team's attention | The designed exit for B, not the start |
| D. A Confluence or wiki space | Pages in the wiki the team already has | Fastest to fill | Looks like every other wiki; the kit cannot be used; wins and publications become pages nobody finds | No |
| E. A rich app with a CMS | Headless CMS, editor UI, live data from the portal API | Non-engineers edit; live numbers | A backend inside the boundary, an auth story and a data integration, which is exactly the internal surface Jithin wants to keep off; S5 says it is not needed yet | Later, only if S5 is refuted |

**Adjacent options worth keeping**

- The site as the kit's documentation: the kit's component gallery and tokens page ship as a section of the same build, so the kit's docs and ThinkLatent's story share one home and one look (serves TL-013 decision 5 on the Design System artifact).
- An external mirror: the publications and blog sections already have a public twin in Think Latent (TL-002); a shared Markdown source with an internal and an external build keeps one copy of each post, with the external build gated by Comms. Kept as a Later idea, not in the first version.

**Contrarian options**

- Do not build a site; build a quarterly ThinkLatent report (a doc from the index and the register) and let SharePoint host the PDF. Cheaper, but it fails S3 (no place for the team to publish) and ages the moment it is sent.
- Build only the blog: the team's voices are the one thing no other surface offers; vision and products can live in a deck. Strong on S3, weak on S1 and S2, and it leaves the products without a canonical page.
- Give the story to the portal's showroom and kill this idea. Honest, but the showroom is for models and use cases, and a quarter away; the strongest argument for this is that two surfaces about ThinkLatent is one too many, and the exit to C answers it.

## First version and what it is not

The first version is a static site generated from a repo of Markdown, built on design-kit, with no backend, no database, no authentication of its own and no call to any internal API. It is reached from one link on the existing ThinkLatent SharePoint page. Everything on it is a file that was reviewed in a pull request.

**Content model (seven sections, each a folder)**

| Section | What a page holds | Author | Source of truth |
| --- | --- | --- | --- |
| Vision | The ThinkLatent aspiration, where to play, how to win, in outcome language; the model line as a story, not a spec | Head of ThinkLatent | The strategy spine in the register |
| Products | One page per product or model family (TLM4 Core, Distil, Domain; the portal; the index; the gateway): what it does for whom, status, who to contact, link into the portal when it exists | Product leads | The register and the portal |
| Wins | Success stories: the problem, what ThinkLatent did, the measured outcome, the partner team named with their consent | Product leads with the partner | The index and use-case records |
| Publications | Papers, talks, patents, with venue, date, authors and the Comms approval reference | Authors | Comms approval record |
| In the news | External press and analyst mentions, as links with a one-line summary; never a copy of the article | Site editor | The external source |
| Blog | Posts by team members, under their own names, internal-only | Any team member | The repo |
| Team | Who ThinkLatent is, the three locations, how to work with the team, the university lab | Site editor | The org chart |

Jithin named a video of products and a success story as content; both fit Products and Wins as embedded media hosted where the Enterprise already hosts video (Stream or the intranet media service), linked, not re-hosted.

**Build shape, chosen so nothing internal can break**

- One repo (thinklatent-labs/team-site, or an internal GitHub repo if the content must stay inside the boundary; open question Q1). design-kit is a dependency pulled from the private registry, never copied in.
- Static generation only: the output is HTML, CSS, JS and images. No server-side code runs anywhere internal. The same output can be previewed from a laptop with no network.
- Deployment is a copy of a folder to an internal static host (whatever already serves static internal pages, or an S3-and-CloudFront pattern inside the boundary if one exists; Q2). A bad deploy is reverted by copying the previous folder back.
- Access control is the host's: the site is internal because the host is internal. The site stores nothing about its readers; the reader count for S1 comes from the host's own access log or a privacy-safe page counter the host already provides.
- Claude Code is used for the build and for drafting pages from the team's notes; every page still goes through a pull request with a named reviewer, so the agent never publishes.
- Authoring is Markdown with front-matter (title, author, date, section, status, approval reference). A template per section keeps posts consistent; the kit's typography does the rest.

**What it is not**

- Not a SharePoint site, a Confluence space or a wiki.
- Not the ThinkLatent Portal and not a product catalogue with live data; the Products pages link to the portal for anything live.
- Not external: nothing on it is readable outside the Enterprise; the external voice stays Think Latent.
- Not a CMS: no editor UI, no comments, no reactions, no search beyond a client-side index of its own pages.
- Not a place for anything a Comms, Legal or Risk approval has not covered: unpublished results, client names without consent, or press that mentions the Enterprise without Comms having seen it.

## SharePoint build path

Decision 1 (Jithin, 2026-11-04): the site is built inside the Enterprise's SharePoint by Jithin himself, designed outside it on the kit's language first; Option B (a static site) is superseded and kept as the fallback if the look cannot be reached in SharePoint. The scope widens to the communication and marketing strategy, since the site is one channel of it.

Modern SharePoint Online allows no custom CSS without an SPFx application customizer deployed through an app catalog, so the kit's reach is in two tiers (sources: Microsoft Tech Community, SharePoint Diary, SharePoint Maven, Microsoft message centre, as of 2026-11-04).

| Tier | Who can do it | What design-kit ships | What it gives the site |
| --- | --- | --- | --- |
| 1. Site branding, no IT | Jithin as site owner, from Settings, Change the look | A SharePoint theme pack: the ThinkLatent palette mapped to SharePoint's theme slots (primary, its tints and shades, neutrals, text), a light theme only; a section-background rule; a web-part grammar mapping kit blocks to SharePoint web parts | The ThinkLatent colours on every control, header, navigation, links and buttons; the page composition (hero, tiles, news, people, video); the content hierarchy |
| 2. Stylesheet injection, one IT request | A SharePoint admin deploying an SPFx application customizer to the site's app catalog | design-kit/sharepoint/custom.css: radii, spacing, card shadows, tile proportions, type scale, hiding chrome | The kit's geometry on SharePoint's own components; the closest the site gets to the portal's look |
| Fonts | Brand Center owner uploads; site owner applies | The kit's font package request (Inter, or the Enterprise typeface if Inter is refused) | The kit's type; blocked entirely if the site is joined to a hub |

**What the kit cannot reach in SharePoint, so the design must not promise it:** glass and blur, dark mode, squircle tiles with large radii (tier 2 can round corners, not reshape components), the floating pill bar and dock, display numerals as a component, and custom charts. The v4 home is the reference for mood and hierarchy, not a target to reproduce.

The theme pack is the primitive version Jithin asked for: colours first, in a form SharePoint accepts, generated from the kit's tokens so a palette change in design-kit regenerates the SharePoint theme. Tier 2 is the CSS version; it goes in the kit now and waits for the one request.

## Workstreams

Five streams, in the order they unblock each other. Jithin builds; the thinking partner designs, writes the kit pack, the guide and the strategy.

| # | Stream | Output | Needs first | Done when |
| --- | --- | --- | --- | --- |
| 1 | Content organisation | The site map: sections, pages per section, what goes on each page, what is missing, what is retired | Jithin's rundown of what exists (decks, papers, product names, wins, press, who writes) | Jithin signs the site map |
| 2 | Design outside SharePoint | A design canvas of every page in SharePoint's grammar (hero, sections, web parts) in the kit's palette and hierarchy, light only; one board per page, desktop and phone | Stream 1 site map; the kit's palette (provisional Steel on Graphite) | Jithin marks each board keep, change or cut |
| 3 | design-kit SharePoint pack | design-kit/sharepoint/: theme.json generated from tokens; custom.css for tier 2; the web-part grammar; a README on applying each | Stream 2 settles which components are used | Theme applied to a test site and matches the boards |
| 4 | Build guide | Page by page, web part by web part, setting by setting: what to click, what to type, what to upload, in the order SharePoint needs | Streams 2 and 3 | Jithin builds the home page from it without asking a question; then the rest |
| 5 | Communication and marketing strategy | Audiences, the message per audience, channels (the site, all-hands, newsletters, Viva, Think Latent, LinkedIn, conferences), cadence, owners, measures; the site's place in it | Stream 1 rundown, plus what channels ThinkLatent uses today | Jithin adopts it; the stakeholder-update and competitive-brief skills are used for the drafts |

Streams 1 and 5 share the rundown, so the next session starts there. Stream 3's theme can be generated the moment the palette is confirmed, independent of the rest, which is the first thing Jithin can apply to a test site.

## Deliverables plan (work breakdown, 2026-11-04)

Every deliverable has an ID, an owner, what it needs first and what done looks like. Owners: J = Jithin, TP = thinking partner, SE = site editor, AP = AI Perspectives lead, TPM = technical program manager, H = the three heads. Order within a group is build order.

**A. Decisions and inputs (J; everything else waits on these)**

| ID | Deliverable | Needs | Done when |
| --- | --- | --- | --- |
| A1 | Site editor named | — | Name in the card; two hours a week agreed |
| A2 | AI Perspectives lead named | — | Name in the card; the senior member asked |
| A3 | Palette confirmed for the theme | TL-013 current plate | One line: these five hexes |
| A4 | SharePoint facts: is the ThinkLatent site hub-joined; who owns the app catalog; is Brand Center enabled; does the site exist or is it new | A look at Site settings | Four answers |
| A5 | Rundown part 3: product names and status; wins with a number and partner; publications list; off-limits items | — | Received |
| A6 | Three wins chosen, partner consent asked | A5 | Three names, three partners, consent in writing |
| A7 | Scoreboard definitions signed | TP draft in the card | J signs; baseline source named |
| A8 | Comms contact for the intranet and the external blog; their lead time | — | Name and lead time |

Decided 2026-11-04 (Jithin, as answers to the questions above): A1 Jithin edits the site himself until it is built, then hands control to the technical program manager to run. A2 the senior member who runs an outside women-in-AI group leads AI Perspectives v2 and the podcast pilot. A3 the ThinkLatent theme generated from the kit's provisional plate, re-generated when TL-013 settles. A4 a new site built from scratch; the existing ThinkLatent site reflects nothing the team does and counts as not having one. A5 part 3 dictated in chat. A6 product leads propose five wins, Jithin picks three. A7 the scoreboard numbers come from the Jira board that already tracks this work; the site only reports them. A8 open: the Comms contact and lead time for the intranet and the external blog.

**B. Design canvas (TP; one board per page, light mode, desktop and phone)**

| ID | Deliverable | Needs | Done when |
| --- | --- | --- | --- |
| B1 | Design brief: SharePoint's grammar, what the kit can and cannot reach, type and spacing rules, image style | A3, A4 | J approves |
| B2 | Global chrome: header, logo, navigation (mega menu), footer, section backgrounds | B1 | Board marked keep |
| B3 | Home board: hero, three scoreboard tiles, News, Events, one win, call to action | B2 | Keep |
| B4 | Wins index board and win story page board | B2 | Keep |
| B5 | Products index board, product page board, release notes page board | B2 | Keep |
| B6 | Research board (three themes, university lab) | B2 | Keep |
| B7 | Publications and press board (list view formatting) | B2 | Keep |
| B8 | AI Perspectives board (next session, archive, request form, episodes) | B2 | Keep |
| B9 | Blog index board and post page board | B2 | Keep |
| B10 | Team and how we work board, including the AI-native team block | B2 | Keep |
| B11 | Phone views for B3 to B10 | B3 to B10 | Keep |
| B12 | Image set: hero images, tile icons, section illustrations, in the kit's style, with no third-party IP | B1 | Files delivered |

**C. design-kit SharePoint pack (TP, in thinklatent-labs/design-kit; J reviews)**

| ID | Deliverable | Needs | Done when |
| --- | --- | --- | --- |
| C1 | Token to SharePoint theme-slot mapping (primary, tints and shades, neutrals, text, link, error) | A3 | Reviewed |
| C2 | Theme generator script: tokens in, theme JSON out | C1 | Runs |
| C3 | ThinkLatent light theme JSON | C2 | Applied to the test site and matches B3 |
| C4 | Section background rule: which section backgrounds map to which kit surfaces | C1 | In README |
| C5 | Web-part grammar: kit block to SharePoint web part, with settings | B3 to B10 | In README |
| C6 | custom.css for tier 2: radii, spacing, shadows, type scale, hidden chrome | B2 | Renders on a local mock of SharePoint markup |
| C7 | SPFx application customizer package and deployment note, ready for the one IT request | C6, A4 | Package built; request drafted |
| C8 | Font package request for Brand Center (Inter, with the Enterprise typeface as fallback) | A4 | Request drafted |
| C9 | README: apply the theme, apply the CSS, regenerate on palette change | C1 to C8 | Reviewed |

**D. SharePoint build (J builds from the guide; SE assists)**

| ID | Deliverable | Needs | Done when |
| --- | --- | --- | --- |
| D1 | Site provisioned or confirmed: communication site; permission groups (owners, members = team, visitors = everyone) | A4 | Site URL |
| D2 | Theme applied (Change the look, Site branding) | C3 | Matches |
| D3 | Header, logo, navigation style, footer | B2 | Built |
| D4 | Navigation structure: eight top-level items, mega menu | B2 | Built |
| D5 | Site columns: Category (Win, Blog, Release, Press, Digest, Session), Function, Author, Partner team, TLM generation, Approval reference, Consent reference, Why it matters | C5 | Columns exist |
| D6 | Page templates: Win story, Blog post, Release notes, Product page, Session | B4, B5, B8, B9 | Five templates saved |
| D7 | Publications list with JSON view formatting | B7 | List exists; one row renders as designed |
| D8 | Microsoft Forms: Talk to us, Roadmap request, Blog submission, Nomination | — | Four forms; responses land with SE |
| D9 | Home page | D2 to D8, F1, F2 | Live on the test URL |
| D10 | Wins index and three win pages | D6, F3 | Live |
| D11 | Products index and product pages; release notes for the generations in use | D6, F4, F5 | Live |
| D12 | Research page | F6 | Live |
| D13 | Publications and press page | D7, F7 | Live |
| D14 | AI Perspectives page | D8, F8 | Live |
| D15 | Blog index and the first four posts | D6, F9 | Live |
| D16 | Team and how we work page | F10, F11, F12 | Live |
| D17 | News and Highlighted content web parts configured by Category and Function on every index | D5 | Roll-ups correct |
| D18 | Video embeds from the Enterprise's video service | F13 | Plays |
| D19 | Site usage report checked as the S1 reader count; fallback counter chosen | D1 | A number can be read |
| D20 | Launch: link from the existing ThinkLatent SharePoint page, an intranet piece, announcement | All of D, G6 | Public inside the Enterprise |

**E. Build guide (TP; setting by setting, in SharePoint's order)**

| ID | Deliverable | Needs | Done when |
| --- | --- | --- | --- |
| E1 | Part 1: site, permissions, theme, header, navigation (D1 to D4) | B2, C3 | J builds it without a question |
| E2 | Part 2: columns, content types, page templates, the list and its formatting, forms (D5 to D8) | B4 to B9 | Same |
| E3 | Part 3: each page, web part by web part, with every setting value (D9 to D18) | B3 to B11 | Same |
| E4 | Part 4: editorial operations: how SE publishes a win, a post, a release; how the newsletter is assembled from the feed | G3, G9 | SE runs one cycle |
| E5 | Part 5: launch checklist and the first quarterly read | D19 | Used |

**F. Content production (named owners; TP drafts from material, owners sign)**

| ID | Deliverable | Owner | Done when |
| --- | --- | --- | --- |
| F1 | Vision copy: aspiration, where to play, how to win, in outcomes | J | Signed |
| F2 | Scoreboard copy and first read of the three numbers | J, TPM | Three numbers or "first read in Q1" |
| F3 | Three win stories on the template | Product leads with partners | Partner-approved |
| F4 | Product pages: TLM Core, Distil, Domain, the portal, the index, the gateway | Head of AI Products | Signed |
| F5 | Release notes back-filled for the generations in use | Head of Applied Research | Signed |
| F6 | Research theme pages with "what it means for the Enterprise" and the university lab | Head of Research | Signed |
| F7 | Publications list: every item of the last 18 months with approval reference | Authors, SE | Rows entered |
| F8 | AI Perspectives archive: past sessions with recording links | AP | Entered |
| F9 | Four leadership posts, one per leader, from the topic seeds | J, H | Published |
| F10 | The AI-native team page: principles, tools, three numbers | J | Numbers real |
| F11 | Team page: three functions, heads, three locations, bios | SE | Entered |
| F12 | How to work with ThinkLatent: the intake path, the forum, the portal | Head of AI Products | Signed |
| F13 | Two-minute ThinkLatent film (script by TP; production with the Enterprise's video team) and product demos as they exist | J | Optional for launch |

**G. Communication and marketing strategy artefacts (TP drafts; J and H adopt)**

| ID | Deliverable | Needs | Done when |
| --- | --- | --- | --- |
| G1 | Strategy document for the heads to comment on (a Claude doc) | This card | Three comments resolved; J adopts |
| G2 | Editorial calendar for the first two quarters: wins, posts, sessions, releases, reports, by week and owner | A5, A6 | Filled |
| G3 | Five templates as page templates and as a doc for authors | — | Issued (done in the card) |
| G4 | Topic lists per leader with one-paragraph outlines for the first three | — | Seeds done; outlines on request |
| G5 | Quarterly ThinkLatent report template: one page, three numbers, three wins, three releases, three papers | A7 | Template approved |
| G6 | Intranet pitch and the first success story, submitted | A6, A8 | Submitted |
| G7 | External blog plan: three pieces, authors, Comms route | A8 | Approved |
| G8 | AI Perspectives v2: run of show, the Enterprise slide, the request form, recording and posting process; podcast pilot brief | A2 | First session run |
| G9 | Newsletter v2 template and the submission rule | TPM | First issue |
| G10 | Recognition playbook: award calendar, criteria, nomination review in the quarterly leadership meeting, points rule | — | First nominations entered |
| G11 | Canada and India office story briefs | A6 | One story each in motion |
| G12 | Release-day playbook for a TLM generation | F5 | Used at the next generation |
| G13 | ThinkLatent voice guide: how to talk to business, one page: gain before build, their problem first, a number, an invitation; with before and after examples | — | Adopted by the heads |
| G14 | Measurement plan: S1 to S5, C1, the three scoreboard numbers, who reads what when | A7 | Scheduled |
| G15 | Open roadmap page and answer rule (bold move) | J decision | Page live |
| G16 | ThinkLatent Fellows one-pager (bold move) | J decision | Pitched to one business line |

**H. Portal: out of scope (decision 2, Jithin, 2026-11-04).** The ThinkLatent Portal stays with TL-003. The site links to it from Products and from How to work with ThinkLatent, and nothing in this plan depends on its schedule; the portal pilot, preview page and feedback loop are removed from TL-016.

Counts: 8 decisions, 12 design boards, 9 kit artefacts, 20 build items, 5 guide parts, 13 content pieces, 16 strategy artefacts; 83 in all. The critical path is A1 to A4, then B1 and C1 to C3 in parallel, then B2 to B10, then E1 to E3 and D1 to D18, with F running alongside from A5 onward.

## Rundown, part 1 (Jithin, 2026-11-04): the team, the role, the measures, the diagnosis

Recorded from Jithin's spoken rundown; terms transcribed as red teaming, self-healing and pillar where the dictation read otherwise. Part 2 (what exists: products, wins, publications, press, channels) follows.

**The three functions**

| Function | Head | What it does | How it shows up outside the team |
| --- | --- | --- | --- |
| Research | Head of Research | The engine: internal research, methodology proved before anything is built, state-of-the-art compared and developed. Three research themes: autonomous AI (language-model development and its techniques); trustworthy AI (red-teaming methodology and guardrails on the offensive side; trustworthiness, emotion and decision-making in an industry like the Enterprise's, cognitive design, future-looking); cybersecurity (AI that defends infrastructure and resists other AIs). Also problem-driven research from use cases: SLM feasibility from a team's data before training; the self-healing loop; M-cube, a published red-teaming method. Never touches vendor data | Active publishers (an outside women-in-AI group, AI safety in Canada); the university lab, joint research with prominent PIs |
| Applied Research | Head of Applied Research | Proves the methods on the Enterprise's own data and builds TLM: the SLMs, the foundation models and the future models with Enterprise knowledge embedded. The heartbeat of the team; the first thing business feels as close to them | The models the enterprise uses |
| AI Products | Head of AI Products | Owns the ThinkLatent Portal and the infrastructure behind it; the standards, the production pushes, resilience at enterprise grade; the team that lets product teams run use cases with the wider enterprise | The portal, the endpoints, production |

**The role.** Head of ThinkLatent by title; treated as Chief AI Officer: the subject-matter expert on industry and research who steers the Enterprise's proprietary AI, meaning the models that carry the Enterprise's knowledge and the agents that will embed its institutional knowledge. Externally facing (conferences, talks) and the face of the team internally. Works directly with the C-suite; his leader runs three IT engagements, the AI platform, the data platform and the builder-experience platform, which ThinkLatent's work must visibly enrich, with reuse running both ways and at larger scale.

**How success is measured (stated)**

| Measure | Definition as given | What it needs before it can be read |
| --- | --- | --- |
| Innovation cycle time | Time from research to an impactful solution in production at the Enterprise; the central team's power is visible when it falls | A start event, an end event and a baseline; none exist yet |
| Impactful solutions in people's hands | Count of solutions in production that matter to the business | A register of solutions with an impact statement each; the use-case record (TL-003) is the candidate |
| Democratisation: an AI-native workforce | Are we building people who work natively with AI; the ace: the ThinkLatent team itself as a completely AI-augmented team, which the Enterprise resists and does not yet see the power of | A visible, repeatable demonstration, not a claim |

**The diagnosis, in Jithin's words, restated.** The technical work is brilliant; the execution around it is where the team loses. Seen from outside, ThinkLatent is not a team of storytellers: product-management muscle is thin, members are timid in front of business, UI takes too long and products do not look production-ready, and the team tells business what it built instead of what the business could gain from even a tenth of it. Time management is off. The fix he wants is an AI-augmented team with principles for working with AI, so that communication plans, business engagement and delivery change visibly: how to talk to business and how not to, what they want to hear, understanding their problem first and proposing against it, so they feel ThinkLatent is with them. The test for anything proprietary: it has to fuel the business, or being proprietary means nothing.

**Early read for the strategy (thinking partner, to be tested against part 2)**

- The story is not "what ThinkLatent built"; it is "what the Enterprise can do now that it could not", told per business audience, with the three measures as the scoreboard. The site's Wins and Products sections must be written in that voice or they repeat the problem.
- The AI-augmented team is the strongest single message ThinkLatent has, because it is the one claim nobody else at the Enterprise can make and it answers the diagnosis directly: the team that works natively with AI is also the team that ships faster and talks better. It needs proof on the site (how the team works, with numbers), not a slogan.
- The three measures are not instrumented. The strategy should commit to reading them quarterly, which means defining cycle time's two events and the impact statement now, before the first site content goes up, so the first ThinkLatent report on the site carries real numbers.
- Three audiences need three different stories: the C-suite and the three IT engagements (what ThinkLatent enriches and reuses), business lines (the gain, in their problem's terms), and the team itself (the principles of working with AI, the cadence, the pride in publishing).
- The gap between research publishing (strong) and business narrative (weak) is the comms strategy's whole job; the site is one channel of it, and a site alone will not fix timidity in a meeting.

## Rundown, part 2 (Jithin, 2026-11-04): what exists today

Names transcribed as AI Perspectives, the intranet and recognition points where the dictation read otherwise; Jithin to correct.

**Channels and rituals today**

| Channel | What it is | Runs it | Reach | What is wrong | What Jithin wants |
| --- | --- | --- | --- | --- | --- |
| AI Perspectives | A paper or technology discussion session, irregular | A few key individuals | About 200 attendees | Stops at the paper; never says what it means for the Enterprise or which ThinkLatent solution carries it | Paper, then the Enterprise use, then the ThinkLatent solution that delivers it, then a forum where attendees ask for it on the roadmap; later a podcast format with business leaders as guests; a senior team member who runs an outside women-in-AI group could run it |
| Team newsletter | Monthly (or weekly) round-up of what happened in ThinkLatent | The technical program manager, chasing people for items | The team | Pull, not push; no outside-world digest | Members submit their own items and blogs; a TL;DR; a monthly "what changed in AI" digest |
| Monthly reflection | Jithin's article to the team: what happened, what is new, where the team is going | Jithin | The team only | Internal only; could seed leadership blogs | Keep; mine it for public-facing pieces |
| Quarterly town hall and AMA | Team-wide | Jithin and the heads | The team | Fine as is | Keep |
| Enterprise tech talks, AI Summit, other fests | Enterprise forums | The Enterprise | Enterprise | ThinkLatent under-uses them | Regular ThinkLatent slots |
| External conferences, Jithin's external articles, LinkedIn | External voice | Jithin, some researchers | Industry | Team members publish research but rarely speak about products | More voices |
| Publications | Active research publishing (an outside women-in-AI group, AI safety in Canada, M-cube, the university lab) | Research | Research community | Invisible inside the Enterprise | Indexed on the site; translated for business |
| The intranet | The Enterprise's internal news; articles can be published there | Comms | Enterprise | Not one ThinkLatent success story has reached it, though use cases run three generations of TLM at good volume with good results | Translate the success stories; this alone would change the team's picture |
| the external blog | The Enterprise's external publication; slow to publish | Comms | Public | Unused by ThinkLatent | Pursue |
| Enterprise recognition (quarterly awards, recognition points) | Enterprise recognition | Managers nominate | Enterprise | ThinkLatent leadership does not make the case; morale is low; people feel unrecognised | A recognition habit: nominations every quarter, points used |
| Enterprise Canada office | An office; a strong proponent of ThinkLatent | Office leadership | Global office news | Untapped | Give them an AI success to own; they will publish it as office news |
| Enterprise India office | Global office | Office leadership | Global office news | Untapped | Same play as Canada |
| Team and leadership blogs | Do not exist yet | Nobody | None | No venue, no habit, leaders unsure what to write about | The site as the venue; a topic list per leader; one template for every post |

**Products and wins as given.** TLM is the product: all models and methodology, with generations of models arriving; no release plan or release story exists for a new generation. Success stories exist and run at volume on three generations of TLM, and none has been published. Named lists of products, wins with numbers, publications and off-limits items are still to come (part 3).

**The blog template Jithin asked for.** Every post, team or leadership: the problem in plain words; why it is relevant to the Enterprise; where ThinkLatent has heard people with the same problem; what ThinkLatent did or proposes; an invitation: do you have this problem, let us talk.

## Design canvas v1 (stream 2, 2026-11-04)

**Design canvas v4 (2026-11-04, night) — the kit's language.** Jithin rejected v3 as generic ("AI slop") and sent the work back to the design-kit and the playground. v4 redraws all sixteen boards on the kit's own grammar, read from the playground source rather than imitated: Shell D (ThinkLatent tile, search pill, the team's week as the pill bar, This week and Write for ThinkLatent in Decision Red, the glass dock at left); the three colour fields under the hero zone, tinted to each page's accent; 28px content tiles at white .72 with a ring icon, a round arrow, a 15px title, a light 52px numeral with its unit and a caption, and a spark; one coloured glass brief tile per page (the Head of ThinkLatent's weekly brief on Home, the next session on AI Perspectives, the win of the quarter on Our work); one ink tile per page; one exhibit per page with a 96px numeral and a dot field; rows with status as glyph and word and pill actions. Templates keep the same chrome: content-type chip, facts strip, body column with amber Instruction blocks, page properties and a checklist. The orb is drawn as dots (six rings in wave-like motion) so it belongs to the DotField language; it is an interpretation and waits on Jithin's check against the real logo. The boards are generated (gen/kit.py holds the chrome and blocks, gen/boards.py the pages), so a token change regenerates all sixteen. Canvas version 26.

Tier map for the build guide: tier 1 (no code) carries the layout with section backgrounds, Text, Quick Links, News, People, Events and the Page properties web part; tier 2 (SPFx application customizer) adds the shell, dock, glass, numerals and pills. Nothing on the boards needs anything beyond tier 2.

**Design canvas v5 (2026-11-04, late) — SharePoint pages.** Jithin's correction on v4: the colours and elements are right, but this is a SharePoint site, not a dashboard, and everything on it has to be reachable with SharePoint and the custom CSS. v5 redraws all sixteen boards from SharePoint's own page elements, each labelled on the board with the web part, its layout and the tier it needs: the tenant suite bar and the Compact site header with hub navigation; the Title area in the Overlap layout with a section background image; sections in one to four columns with Soft, Neutral or image backgrounds; Hero (Layers) for the five-tile openers; Quick Links (Grid, Button, Compact); News (Top story, List, filtered by Category); Text web parts with Heading 2 numerals for the scoreboards; Events, People, Button, Call to action, Image for exported charts, List web parts with JSON column formatting for status as glyph and word, Page properties, Embed and Microsoft Forms. The kit's language survives where custom.css can reach it: 28px radii, pill buttons and nav, glass over section images, light numerals. Nothing on the boards needs new DOM: no dock, no custom top bar, no inline charts. The imagery is a v5 set (gen/assets5.py): section backgrounds with the kit's three colour fields, sparse particles and the dot-drawn orb, one per accent; a teal band; tile images per accent plus ink. Canvas version 29.

**Decision 8 (2026-11-04):** the SharePoint theme primary is Decision Red, so every button, link and current-page marker is red natively; Soft sections are mint; green and teal live in the imagery. Alternatives considered: green 700 (closer to the kit, red comes through less) and ink (needs CSS for the red Write for ThinkLatent button). The board labels stay on the canvas as the build guide's map.

**Design canvas v6 (2026-11-05) — back to v3.** Jithin's verdict on v4 and v5: both missed the brief. The ask was to consult the kit's design DNA (its plate, type, surfaces, radii), not to build a dashboard like the playground; the purpose is a team site inside SharePoint; the kit's primary and secondary colours do not change, and Decision Red is added on buttons and banners because the site is internal to the Enterprise; the pattern imagery is to be left out for now, and the team will design new images later. v6 restores the v3 structure (rebuilt from the dark backup through relight.sed, since v3's files were overwritten), keeps the plate (primary green 500/700, secondary teal 600, neutrals, accent tints per content type), puts Decision Red on the primary buttons and the header stripe, aligns radii to the kit tokens (24 frame, 16 container, 999 pill), and replaces every image with a flat plate tint. Canvas version 32. v4 and v5 are kept as backups (project\_v4\_backup; v5 in gen/kit5.py and gen/boards5.py) and their one lasting contribution is the SharePoint web-part map per block, carried into the v6 canvas notes.

**Decision 8 withdrawn; decision 9 (2026-11-05):** the SharePoint theme primary stays the kit's green; secondary teal; Decision Red is an added accent on buttons, the header stripe and banners. Consequence for the build: theme buttons render green natively, so the red buttons and the stripe are custom.css (tier 2); red banners come from the image set when it exists, or the Call to action web part with a red background image.

**Colour system v1.1 taken in (2026-11-05, canvas v34).** Jithin changed the kit's colours in the TL-013 chat (design-kit commits 22a6baf and df979d8): the green ramp is renumbered 900 #0C3F09 · 800 forest #1B5128 (new) · 700 #2E6B3C · 500 #3E9A5C · 400 #4CA66A · 300 sage #6CB769 (new) · 200 mint #68E78E · 100 lit #79F181; in the light roles forest is the primary (buttons, the selected pill), sage with green 900 text is the active item (dock, calendar pill, active bars, the lit dot) and the glass tint is sage at 22%; in dark the coloured card runs black → forest → sage and lit is sage. The mains do not move: Brand Green 500 the brand, sea teal 600 the companion, Decision Red the decision colour. Applied to the site (gen/colour11.py): forest on the selected pill, the green glass card, the count badges and the call-to-action band; sage on the active nav item; green 700 stays the text green and link colour; Decision Red stays on the primary buttons and the header stripe per decision 9. The generators (gen/kit.py, kit5.py, assets5.py) carry the new ramp for when the image set is made. For the SharePoint theme pack this means the full-slot palette carries forest and sage in its slots; the three-colour generator in Change the look cannot express it, so the theme is Brand Center or one Add-SPOTheme request.

**Design canvas v7 (2026-11-05) — the 42 decisions built in.** All twenty-five boards regenerated from one source (gen/site6.py with pages\_a–e.py for the fourteen pages, gen/tpl6.py for the eleven templates) in the v6 language: the v3 structure, the kit's colour system v1.1, Decision Red on buttons and the stripe, no imagery. What changed on the boards, by decision: the navigation is Mandate · Products ▾ (TLM, ThinkLatent Portal, TL Index, ThinkLatent Trust) · Our work ▾ (Wins, Research, Publications) · Stories ▾ (Blog, AI Perspectives, ThinkLatent Day) · Team, with Home as the logo and Write for ThinkLatent in red (21). Home leads with the mandate line and two buttons, four editor-rotated tiles (38), a six-number compounding strip with source and date (4), four audience doors and the Work with ThinkLatent ladder (6), the latest win with its number and partner quote (8, 25), this quarter's award winners (29), the TL;DR from the email, the Viva Engage feed (20), the Use AI at the Enterprise links (40) and eight FAQ rows (24). New pages: Mandate in Jithin's words (3, 10); ThinkLatent Trust, the named program with the five-step lifecycle, status by product and the policy links (17); ThinkLatent Day with the business-plus-ThinkLatent hackathon, themes, sign-up, the Summit sessions and past winners (36, 37); Glossary, 44 terms (23); ThinkLatent at a glance, the plain index page (30). Products carries the static TLM lineage, three short outcome cards linking the portal's full cards, the TL Index summary tile with the three-line explainer and the release list (9, 18, 19). Team has function cards with mission, head and quarterly count, heads-first profiles that auto-list posts, locations, awards and the after-launch Work in ThinkLatent slot (5, 22, 35). Blog has the Perspective and Deep dive categories, the year-in-review block, the BAIR operating model and the email-only newsletter archive (11, 12, 15, 27). AI Perspectives is a seminar page with the schedule as text, bios and abstracts, the recordings library, the roadmap form, the community feed and the after-launch demo edition and podcast panels (13, 14, 26). Wins carry story, before/after number, quote and 'what compounded', plus new-partner posts and list filters (8, 25, 39). Research follows the Capital One order for the university lab (10). Publications is a filterable list with status and conference roundups (16). Write for ThinkLatent lists eleven templates, the two tiers, the operating model and jump links (31, 32, 42). Comments are on everywhere except Home; two owners and a review date sit on the evergreen pages (28, 33). Templates: Release gained Getting started, Acknowledgments and Contact; Win story, Model card, Conference roundup and New partner are new. The champions network (41) and the small later items (42) are noted in the canvas, not drawn. Canvas version 38; v6.1 kept as a backup.

**Design canvas v3 (2026-11-04, evening).** Jithin asked for imagery with a particle or network feel in the plate, then set the surface: white, welcoming, brand colour, no dark pages; green with white as the base (reference: a frosted card over a green glow), teal for the immersive moments (reference: teal glass over a scene), and a different accent per kind of content. Three passes were made in one session: dark on black (rejected: black is not the plate), dark on deep teal (rejected: not welcoming), then light. The light system now on the canvas:

| Element | Decision |
| --- | --- |
| Imagery | A generated pattern set in place of photography: particle clusters over soft colour fields, no connecting lines (Jithin: keep the particles, drop the graphs). Four accent heroes, four tiles, a teal band, a green wave, a light globe; PNG for SharePoint section and title-area backgrounds, SVG sources for design-kit |
| Surface | Off-white #F7F7F5 canvas, white cards, frosted white glass for data tiles, green glass for the one hero card |
| Accent per content | Green = brand, Home, Team, Blog posts, Write; teal = Research, Papers, AI Perspectives, Publications; steel #477C8B = Products, Releases; terracotta #C9663A = Wins, Use cases; Decision Red = Leadership series, Awards, the ThinkLatent tile. All from the kit's categorical set |
| Immersive moments | AI Perspectives hero and the Research lab section on teal 600 with teal glass cards; calls to action on green 700 |
| Decision Red | Jithin asked whether the reference's #FF1F22 is Decision Red: it is not; the kit's crimson #C4262E stays the decision colour, never a surface |
| Content | TLM generations and tiers, Relay, HyperPod, self-healing and the index from the register and his notes; the university lab's four projects, faculty leads, Enterprise scientists, directors and events from the public lab site; press from the May 2025 coverage. \[BRACKETS\] only where the team holds the fact |

For TL-013: the site's light system (colour fields, particle set, accent-per-content) is a candidate addition to the kit's light mode; captured as one line in TL-013's next step.

[ThinkLatent site — team-first boards](https://claude.ai/artifact/4uZUcDCHWPTqtzMXZrLKQD): fifteen page boards on the kit's v4 plate (Brand Green #3E9A5C, Sea Teal #2F7A6D, Decision Red #C4262E on off-white; Inter), each with a note naming the SharePoint web parts that carry it. Supersedes site map v0 below.

| Row | Boards |
| --- | --- |
| Team first | Home · Team and how we work · Blog · AI Perspectives · Write for ThinkLatent |
| Our work (enterprise reads our story) | Wins · Products · Research · Publications and press |
| Templates (saved as SharePoint page templates) | Blog post · Paper explained · Leadership series · Use case · Release notes · AI Perspectives session |

Template convention: orange boxes are writing instructions, deleted before publishing; \[BRACKETS\] are replaced; each template presets its Category and shows required page properties (approval reference for papers; consent and number source for use cases). Within SharePoint's reach by design: no glass, no dark mode; rounded cards and Inter need tier 2 (custom.css) and the Brand Center font package.

Placeholders that need Jithin or the team: names of the three heads, principles' one-liners, the AI-native numbers, TLM Core/Distil/Domain one-liners and generation statuses, all dates, wins and numbers (from Jira).

## Site map v0 (stream 1)

The site is organised by what a reader wants, not by the org chart: the three functions appear inside Team, never as top-level sections. Eight top-level pages, each with a job and the SharePoint web parts that carry it. Jithin marks keep, change or cut.

| Page | Job for the reader | Content on it | SharePoint grammar | Owner |
| --- | --- | --- | --- | --- |
| Home | In thirty seconds: what ThinkLatent is, what the Enterprise can do now, what is new | One-line aspiration; three scoreboard tiles (cycle time, solutions in hands, AI-native workforce, each with its current number or "first read in Q1"); latest three News items; next AI Perspectives; one win | Hero (image or video); Quick Links tiles; News; Events; Call to action | Head of ThinkLatent; site editor |
| What the Enterprise can do now (Wins) | The business reader's page: the gain in their terms | One story per win: the problem, the partner team, the number, which TLM generation, who to call; the three-generation use cases first | News page template per story; Highlighted content rolled up | Product leads with the partner team |
| Products | What exists and its status | TLM by generation (Core, Distil, Domain), the portal, the index, the gateway and endpoints; status, what it does for whom, how to start; release notes per generation | One page per product; Quick Links; link to the portal | Head of AI Products |
| Research | The engine, translated | The three themes (autonomous AI, trustworthy AI, cybersecurity), each with what it means for the Enterprise and which product carries it; the university lab; M-cube and the published methods | Text plus Quick Links; People for the lab | Head of Research |
| Publications and press | Credibility | Papers, talks, patents, press and external blog pieces: title, venue, date, authors, link, approval reference; one-line "why it matters here" each | A SharePoint list with a formatted view; News for press | Site editor; authors |
| AI Perspectives | The forum | Next session, past sessions with recording and the "what it means for the Enterprise" slide, the request-to-roadmap form, the podcast episodes when they exist | Events; Embed (video); Microsoft Form for requests | AI Perspectives lead |
| Blog | The team's voices | Team and leadership posts on the one template; monthly "what changed in AI" digest; Jithin's reflections when he chooses to open them | News pages with a Blog page template; author metadata; Highlighted content by author | Any team member; site editor reviews |
| Team and how we work | Who ThinkLatent is and the ace | The three functions and their heads, the three locations, how to work with ThinkLatent, and the AI-augmented team page: the principles, the tools, three numbers on how the team works | People web part; Text; Quick Links | Jithin |

**Rules that make it work in SharePoint**

- Wins, blog posts, press and digests are all News pages with different page templates and a Category property, so one News web part rolls them up anywhere and the newsletter is a filtered view, not a rewrite.
- Publications are a list, not pages, so authors add a row and the site formats it.
- Every page ends with the same call to action: "Have this problem? Talk to us", a form that lands with the site editor.
- Nothing live on the site: every number is typed, dated and sourced; the portal holds the live view, and the site links to it.

**Content debt before launch (from the rundown):** the three scoreboard numbers defined and read once; three wins written with the partner's consent; TLM release notes back-filled for the generations in use; the publications list assembled; one AI-augmented-team page with real numbers; one leadership post per head on the template.

## Communication and marketing strategy

In scope from 2026-11-04. The strategy is written from Jithin's rundown in the next session; the frame it will use is fixed here so the rundown can be given against it.

| Question | What the rundown should cover |
| --- | --- |
| What ThinkLatent has to say | Products and model families by name; wins with a number; publications, talks and press; the vision in one line |
| Who must hear it | Sponsors by name or role; partner teams; the ThinkLatent team; Risk and Governance; recruits and the university lab |
| Where ThinkLatent speaks today | All-hands, newsletters, Viva or Yammer, Teams channels, the SharePoint page, Think Latent, LinkedIn, conferences; what each reached |
| Who writes and presents | Jithin alone, or others; who has published or spoken |
| What is off limits | Anything Comms, Legal or Risk has ruled out, or that needs their approval |

Pre-registered hypothesis for the strategy, to be sharpened with the rundown: C1, a stated cadence (one story a fortnight on the site, one external piece a month) is kept for a quarter without the Head of ThinkLatent writing most of it; confirmed if two thirds of pieces come from others, refuted if the cadence lapses twice in a quarter.

**Strategy v0 (stream 5, 2026-11-04; stakeholder-update and product-brainstorming patterns used)**

Thesis: ThinkLatent stops telling the Enterprise what it built and starts showing the Enterprise what it can do now, with the AI-augmented team as the proof and three numbers as the scoreboard. The site is the home and every other channel points at it; the portal is TL-003's to deliver and the site only links to it.

| Audience | What they must come to believe | Story they get | Channels | Cadence |
| --- | --- | --- | --- | --- |
| C-suite and the three IT engagements (AI platform, data platform, builder experience) | ThinkLatent enriches what they are building and reuses what they build, at larger scale | Scoreboard plus one win per quarter tied to their platform | Quarterly ThinkLatent report (one page, from the site), the AI Summit, Jithin in person | Quarterly |
| Business lines and partner teams | ThinkLatent understands my problem and has something I can use next quarter | A win in their language, an invitation to the roadmap forum, the portal | Wins pages, the intranet, AI Perspectives, tech talks | A win a month; AI Perspectives monthly |
| Risk, Governance, Comms | ThinkLatent's footprint is visible and approved | Publications and press index; approval references | The site; a standing note to Comms | As published |
| The ThinkLatent team | We are seen, recognised and working in a new way | Newsletter TL;DR, recognition, the blog, the reflection | Newsletter, town hall, nominations | Monthly; quarterly |
| Canada and India offices | Our office owns an AI success | One success story each to own and publish | Office news, local events | One each by February |
| Industry and recruits | ThinkLatent publishes and speaks | Papers, the external blog, LinkedIn, conferences | External, via Comms and Think Latent | Monthly piece |

**Six moves**

1. The intranet first: three success stories on three generations of TLM, written on the win template, through Comms, before the site launches. Cheapest, biggest change in how the team is seen.
2. AI Perspectives v2: every session ends with the Enterprise slide and the roadmap-request form; the senior member who runs an outside women-in-AI group is asked to lead it; podcast pilot in Q1 with one business-leader guest.
3. The blog habit: one template, a topic list per head (ten topics each, drafted by the thinking partner from their function), one post per head before launch, then one a month; team posts reviewed by the site editor within three working days.
4. Newsletter v2: members submit items; a TL;DR at the top; a monthly "what changed in AI" digest; blog posts reused, never rewritten; the TPM edits rather than chases.
5. Recognition as a system: a nomination review in every quarterly leadership meeting, every award cycle entered, recognition points spent on a published rule; morale is a comms problem too.
6. Release stories: every TLM generation ships with release notes, a what-it-means page and an intranet line; the portal shows it live.

**The AI-augmented team page.** The ace needs evidence: the working principles, the tools in use, and three numbers (hours saved per engineer per week, time from draft to published page, share of pages drafted with AI then edited by a person). Measured on the site's own production, so it is true by February.

**Scoreboard definitions to fix now.** Cycle time: from the first Research write-up of a method to the first production use case on it, per method; baseline from the three-generation use cases. Solutions in hands: use-case records in production with an impact line signed by the business owner. AI-native workforce: people who have used a ThinkLatent solution or trained on the portal, plus the team's own three numbers.

**February plan (visible, seen, felt)**

| Weeks | Milestone | Done when |
| --- | --- | --- |
| Nov 4 to 15 | Decisions: site editor, AI Perspectives lead, palette confirmed, hub and app-catalog facts, part 3 of the rundown; scoreboard definitions fixed; three wins chosen with partners | All named in the card |
| Nov 16 to 29 | Design canvas of the eight pages; theme.json generated and applied to a test site; win and blog templates issued; first intranet story submitted | Jithin marks the boards; test site matches |
| Dec 1 to 19 | Build guide; Jithin builds Home, Wins, Products; the heads' first posts drafted; AI Perspectives v2 session run; Canada and India stories chosen | Three pages live on the test site |
| Jan 5 to 23 | Remaining pages built; publications list filled; newsletter v2; nominations for the quarter entered; portal pilot users identified | Site complete on the test URL |
| Jan 26 to Feb 13 | Launch: an intranet piece on the site and the first win; AI Summit or tech-talk slot; the portal in pilot users' hands with the Wins page as their guide; first scoreboard read on Home | S1 read starts; February milestone met |

**Where this is thin.** The whole plan runs on two people who do not exist yet, the site editor and the AI Perspectives lead; the intranet and the external blog paths have Comms timelines ThinkLatent does not control, so the first story must go in November; and the portal reaching pilot hands by February depends on TL-003's own schedule, which is a quarter programme still at Shaping. If the portal slips, the site launches with a portal preview page and the pilot moves to Q2.

**Bold moves (the moonshot layer; Jithin asked for ambition and persistence, 2026-11-04)**

Each is a bet with a kill condition, so boldness stays honest.

| Move | What it is | Why it is bold | Kill if |
| --- | --- | --- | --- |
| The open roadmap | ThinkLatent's roadmap published on the site as a page anyone can read and request against; every request answered in public within two weeks; the quarterly report shows what moved because someone asked | No central team at the Enterprise runs in the open; it turns the timidity problem inside out, because the team is answering, not pitching | Fewer than ten requests in a quarter, or leadership asks for it to be taken down |
| Release day | Every TLM generation launches like a product: a date, a page, a ten-minute demo at AI Perspectives, an intranet piece, a portal entry the same day, a Canada or India office story | The Enterprise has never seen an internal model launch; it makes generations legible and gives the three heads a stage each | Two launches in a row draw under 100 viewers |
| The AI-native team, in the open | A living page: the principles, the tools, the numbers, updated monthly; plus a quarterly "how we work" session open to any Enterprise team, run by team members, not Jithin | The ace, shown instead of claimed; the resistance Jithin describes is answered with a demonstration people can copy | Nobody outside ThinkLatent attends the second session |
| ThinkLatent Fellows | Five people from business lines per half-year embedded with ThinkLatent for a quarter, building one use case on TLM in the portal, presenting it at the AI Summit | Converts the audience into authors; the strongest form of democratisation | No business line releases a person |
| AI Perspectives as a channel, not a meeting | Recorded, indexed, podcast episodes with business leaders, hosting in the style of an outside women-in-AI group, a request form at the end of every piece | Turns a 200-person meeting into an always-on channel with an archive | Episodes average under 50 plays |
| The quarterly ThinkLatent report | One page, three numbers, three wins, three releases, three papers, sent to the C-suite and posted on Home; same format every quarter for two years | Persistence is the strategy; the format becomes the way the Enterprise reads ThinkLatent | Never; the report ships even when the numbers are bad |

**Templates (stream 1 deliverables; copy into SharePoint page templates)**

*Win story (a News page, Category = Win).* Title: the gain, not the product ("Advisors get call summaries in 40 seconds"). Lede: the problem in one sentence, in the partner's words. Then: who felt it; what changed (one number, dated, sourced); which TLM generation and which product carried it; what the partner says (a quote they approved); what it took (weeks, people); do you have this problem? a form link. Footer: partner team, owner, consent reference.

*Blog post (Category = Blog).* Problem in plain words (three sentences, no acronyms); why it matters at the Enterprise; where we have heard the same problem (teams, forums, without naming anyone who has not agreed); what we did or what we think; the invitation. 600 to 900 words; one picture; author with photo and function. Reviewed by the site editor within three working days.

*Release notes (Category = Release).* Generation and date; what is new, in three bullets of outcomes; what it replaces; who should move and by when; how to start in the portal; known limits; the index result against the previous generation.

*AI Perspectives session.* The paper or technology in ten minutes; what it means at the Enterprise in five; which ThinkLatent solution carries it and when; the request form; a recording and the Enterprise slide posted within two days.

*Newsletter.* TL;DR of five lines; this month's wins (from the site); releases; new posts (title and author); what changed in AI, five items; recognition; next AI Perspectives. Assembled from the site's News feed; nothing written twice.

**Topic seeds for leadership posts (ten each; the thinking partner drafts outlines on request)**

| Author | Topics |
| --- | --- |
| Head of ThinkLatent | Why proprietary only counts if it fuels the business; the three numbers we will be judged by; what an AI-native team looks like from inside; why we publish; what we learned from three generations of TLM in production; the open roadmap; what we will not build; the cost of renting intelligence; how to ask ThinkLatent for something; what Canada and India taught the team |
| Head of Research | Why we never touch vendor data in research; M-cube explained for a product manager; what trustworthy means in a firm like ours; emotion and decision-making, the research question; cybersecurity when the attacker is also an AI; SLM feasibility before training; how the university lab works; what a paper acceptance means for the Enterprise; the research questions we get from use cases; self-healing, explained |
| Head of Applied Research | How a method becomes a model; what TLM knows that a frontier model cannot; what a generation changes; how we choose what to train; the index and why we trust it; specialists versus generalists, with our numbers; what happens to your data; how long training really takes; what a Domain model is for; the next generation, in outcomes |
| Head of AI Products | What production-grade means for a model; the portal, in one page; from endpoint to use case in a week; how we keep an endpoint resilient; what the gateway does for you; governance as a service, not a gate; why the use-case record matters; what we learned from the first outages; release planning for models; how a team onboards |

## Appetite

Two engineer-weeks for the first version: one engineer paired with Claude Code, under one of the five lab streams, pending Jithin. Week 1 builds the repo, the seven templates, the home page and the deploy path on the chosen host; week 2 fills Vision, five Products pages, two Wins and the Publications list from existing material, and ships. The Blog opens empty with one post from the Head of ThinkLatent.

The standing cost is editorial, not engineering: an editor spending two hours a week on reviews and the news list. If nobody can give that, the site should not be built (see S3).

## Capabilities reused and created

**Reused (listed before anything built)**

| Capability | From | How the site uses it |
| --- | --- | --- |
| ThinkLatent design kit: tokens, components, blocks, the v4 home language, glass shell, dark mode | TL-013 | The site's entire design; the kit is a dependency from the private registry |
| Strategy spine and the register | TL-006 | The Vision pages are written from the spine; Products pages mirror register rows |
| Evaluation evidence from the index | TL-004 | Wins quote index results once they exist; no number on the site that the index cannot back |
| Use-case records | TL-003 | Wins and Products link to the record for anything live |
| Scheduled-task and brief patterns | Neo, morning brief | A weekly draft of the news list and a stale-page check |
| Think Latent | TL-002 | External twin of Publications and Blog; shared Markdown source as a Later option |

**Created for others**

| Capability | Kind | Maturity | Who would reuse it |
| --- | --- | --- | --- |
| Content-as-code site template on design-kit (repo skeleton, seven section templates, static build, deploy path) | Process | Idea | Any ThinkLatent product needing docs or a landing page; the kit's own documentation; blueprints (TL-010) |
| ThinkLatent publications and press index | Data | Idea | Thought leadership; the quarterly index report; Comms |
| Team blog pipeline (Markdown, review, publish, internal-only) | Process | Idea | Think Latent's internal mirror; any Enterprise team wanting the same |
| Second-consumer evidence for the kit | Evidence | Idea | TL-013 H1 and its H2 kit test |

## Governance story

The site holds no client data, no model weights and no live system access, but it makes statements about models under model-risk management, so it is a disclosure surface: every claim needs an owner, a source system and a date, and the governance page is co-owned by Risk (corrected at Stress test, 2026-11-07). Three other rules do.

- Publications and press: anything that was published externally already passed Comms and Legal; the site records the approval reference in front-matter and links to the public source rather than copying it. An item without a reference does not go up.
- Wins: a success story names a partner team and a measured outcome only with that team's written consent, kept in the pull request; numbers come from the index or a use-case record, never from a slide.
- Blogs: internal-only, under the author's name, reviewed by the site editor for anything unreleased, client-identifying or contrary to a published Enterprise position; the external version of any post is a separate decision through Think Latent and Comms.

The lab's rule applies: governance for lab ideas is a separate team's dependency, listed as a row-level dependency, not a blocker to building the site.

## Thin spots

Honest critique, recorded at Shaping so the Stress test has something to attack.

| Where it is thin | Why it matters | Evidence that would fix it |
| --- | --- | --- |
| Nobody outside ThinkLatent has asked for this | Evidence of need is the rubric's second-heaviest criterion and it is zero today | Three sponsors or partner leads say they would read it, or one asks for it unprompted; cheapest test: show the v4 home mock to five people and count who asks for the URL |
| Two surfaces about ThinkLatent | The portal's showroom and this site both describe ThinkLatent's products; readers will not know which is canonical | The split written down: the site tells, the portal shows and runs; every Products page links to the portal; the fold into the portal (Option C) has a trigger date |
| Content sites decay | Most internal team sites are dead within a year because nobody owns the editorial cadence | A named editor with two hours a week before the build starts; a stale-page check as a scheduled task; S3 read at month 3 |
| The host is unknown | The whole no-breakage story rests on an internal static host existing and being allowed; if the only option is SharePoint, the kit cannot be used and the idea changes shape | Q2 answered: a URL on an internal static host that serves a hello-world page built on design-kit, before any content is written |
| Where the repo lives | Content about Enterprise products and wins in a GitHub org outside the boundary may breach policy even as a private repo | Q1 answered by Jithin or the Security liaison; the template can live outside, the content inside |
| The kit is not finished | The palette is provisional and decisions 1, 3 and 4 are open; a second consumer on a moving kit either waits or forks | Pin to a kit release; the site uses only tokens and components already decided (rows 1 to 30); gaps become kit issues, never site code |
| No measurement path | S1 depends on a reader count the host may not give | Q2 includes the access log question; a privacy-safe counter is the fallback |
| The value is sponsorship, which is hard to measure | S2 counts citations, which the team must log by hand | A one-line log kept by the editor; the quarterly review reads it |

## Open questions

| # | Question | Owner | Blocking | Recommendation |
| --- | --- | --- | --- | --- |
| Q1 | Where does the content repo live: thinklatent-labs (outside the boundary, private) or an internal GitHub? | Jithin, with the Security liaison | Yes, before any content is written | Template and build in thinklatent-labs/team-site; content in an internal repo; the build pulls both |
| Q2 | Which internal host serves static pages, what is its URL pattern, and does it give an access log? | Site engineer, with the platform team | Yes, before the build | Prove it with a hello-world page on design-kit in week 1, day 1 |
| Q3 | Who is the site editor (two hours a week)? | Jithin | Yes, before the build | Someone on the team who already writes; not the Head of ThinkLatent |
| Q4 | Which kit release does the site pin to, and what happens when the palette changes? | TL-013 kit core | No | Pin to the first tagged release; re-pin at each kit release as a one-line PR |
| Q5 | What is the first Wins story, and who in the partner team consents to it? | Product leads | No, but the site launches thin without one | The flagship use case behind task mining (TL-012 wave 1) |
| Q6 | Does the site carry the kit's documentation (component gallery, tokens) as a section? | Jithin | No | Yes, as a hidden-by-default Kit section; it costs nothing on a static build |
| Q7 | Trigger and date for folding the site into the portal as its front door | Jithin | No | Review when the portal reaches Shipped and S1 and S5 have been read |
| Q8 | What did Jithin mean by the product video item: a demo reel per product, or one ThinkLatent film? | Jithin | No | One two-minute ThinkLatent film on the home page plus demos per product as they exist; hosted on the Enterprise's video service, embedded by link |

## Critique log (Stress test, 2026-11-07)

The critique scored v8 as it stands at 2.85 on the quarter weights, below the 3.5 bar; Jithin set 3.50 and held the full v8 scope for February. Seats: feasibility and Risk (simulated) played by Claude as separate agents that had not seen the work; business-line seat Jithin.

| Seat | Finding | Answer | Status |
| --- | --- | --- | --- |
| Feasibility | v8 build is 150–210 hours of the Head of ThinkLatent's own time (13 pages, 11 templates, 4 lists, Forms) before 13 Feb; about 15 hours a week through the holidays | Jithin holds full v8 for February; the 19 Dec kill check moves the date or cuts the scope if pages run over 8 hours | Open: dissent recorded |
| Feasibility | Upkeep is 25–35 hours a month, not the 2 hours a week the appetite budgets | Re-set appetite and editor budget in the build guide | Open |
| Feasibility | About 53 launch brackets empty two weeks before 21 Nov; how-we-work numbers, portal-registry counts and TL Index scores cannot be sourced by February | 21 Nov kill check: under half sourced triggers the six-page cut | Open |
| Feasibility | SPFx customizer often refused or slow in regulated tenants and targets markup Microsoft changes; no tier-1 fallback drawn | 12 Dec kill check: no IT date means every board is re-baselined to tier 1 | Open |
| Feasibility | A live Enterprise page needs real people on owner lines; in the lab the roles are played by Claude | Go-live is a company-version step; owner lines stay \[Name\] until then | Answered |
| Feasibility | Hypotheses S1 (measurement), S4 and S5 and the two-week appetite were written for the dropped static site | Re-register for SharePoint in the build-guide session | Open |
| Risk (simulated) | "35M+ client interactions" is sourced only to the Head of ThinkLatent; "In production" chips read as validation claims | Every number needs an owner, a source system and a date; a person is not a source | Open |
| Risk (simulated) | ThinkLatent Trust stated controls ThinkLatent does not own ("five signatures", status competing with the model inventory, no validation step) | Jithin: rewrite, then Risk review. Done: renamed "How we build responsibly", independent validation added as Risk's step, absolutes removed, inventory named authoritative, corrections note added | Answered; simulated review next |
| Risk (simulated) | TL Index tile and model cards are developer claims with no authoritative source until TL-003 and TL-004 are live | Label "developer evaluation, not model validation"; the tile and cards come off if the portal card or index is not live by January | Open |
| Risk (simulated) | No consent register, classification label, corrections path or retention rule | Minimum controls before go-live (below) | Open |
| Business line (Jithin) | No sponsor has asked for the site; evidence of need is 2/5 | Jithin shows the v8 Home board to five sponsors or partner leads by 5 Dec and counts who asks for the URL; three or more lifts evidence to 3 | Open |

**Kill criteria**

| Check | Criterion | Action |
| --- | --- | --- |
| 21 Nov 2026 | Under half the launch brackets have a source and date | Cut the launch to Home, Mandate and Products, Wins, Team, Blog, At a glance; the rest to Q2 |
| 5 Dec 2026 | Fewer than three of five shown ask for the URL | Evidence stays at 2; score re-read; Jithin decides proceed or park |
| 12 Dec 2026 | No IT date for the customizer | Re-baseline every board to tier 1 |
| 19 Dec 2026 | Home, Wins and Products not on the test site, or more than 8 hours a page | Launch moves to April 2027 or the six-page cut applies |
| Launch −2 weeks | No win with stored written consent covering every channel it goes to | Launch without Wins, no placeholder |
| Any time | Site status contradicts the model inventory | Unpublish the status list within one working day |
| May 2027 | Under 2 posts a month (S3), or more than 3 owned pages past review | Freeze to an About page |

**Minimum controls before go-live:** Risk signs the governance page; every number has an owner, a source system and a date; model cards and the TL Index tile labelled developer evaluation and signed by the model owner; consent register with channels named and withdrawal possible; a classification label; a corrections and takedown procedure with an owner; Comms review of launch content.

## Decision log

| Date | Decision | By |
| --- | --- | --- |
| 2026-11-04 | Registered as TL-016 team-site at Shaping from Jithin's description: an internal home for ThinkLatent (vision, products, wins, publications, press, team blogs) built with Claude Code inside the boundary, on the ThinkLatent design kit as it is, touching no internal system | Jithin (idea); thinking partner (registration) |
| 2026-11-04 | Idea card v0 written: content-as-code static site on design-kit recommended (Option B); SharePoint kept as the link, not the site; the portal named as the designed exit; S1 to S5 pre-registered; appetite of two engineer-weeks proposed; thin spots and eight open questions recorded, Q1 to Q3 blocking | Thinking partner, pending Jithin |
| 2026-11-04 | Decision 1: the site is built inside the Enterprise's SharePoint by Jithin, designed outside it on the kit first; design-kit ships a SharePoint theme pack (colours, tier 1) and a tier-2 custom.css for an SPFx customizer that needs one IT request; the static site (Option B) is superseded and kept as the fallback. Scope widened to the communication and marketing strategy; five workstreams set, content organisation and the strategy first, from Jithin's rundown | Jithin (build path, scope); thinking partner (tiers, workstreams) |
| 2026-11-04 | Decision 2: the ThinkLatent Portal is out of TL-016's scope; the site links to it and depends on nothing in TL-003. Group H removed from the deliverables plan; 83 deliverables remain. Deadline is Jithin's to manage; February stays the working target | Jithin |
| 2026-11-04 | Decisions A1 to A7 taken as questions with recommendations: Jithin edits until built then the TPM runs it; the member who runs an outside women-in-AI group leads AI Perspectives; ThinkLatent theme from the provisional plate; new site from scratch; part 3 dictated; five wins proposed by product leads, three picked by Jithin; scoreboard reported from the existing Jira board. A8 (Comms contact) open. Design brief (B1) and token mapping (C1) start now | Jithin |
| 2026-11-04 | Decision 3: the site is team-first. Navigation approved: Home · Team · Blog · AI Perspectives · Our work (Wins, Products, Research, Publications and press) plus a Write for ThinkLatent button and page holding six templates (blog post, paper explained, leadership series, use case, release notes, AI Perspectives session) and the publishing steps. Every content type ships as a SharePoint page template with its writing instructions built in, so the team keeps following them. Design canvas built on the kit's v4 plate (Brand Green, Sea Teal, Decision Red on off-white), which supersedes the provisional Steel on Graphite | Jithin |
| 2026-11-04 | Decision 4: the boards show only what SharePoint can build. Gaps redrawn native: forms as Microsoft Forms web parts, template instructions as highlighted one-cell tables, hero numbers without see-through tiles. Tier-2 parts (rounded cards, shadows, pills, light numerals; Inter via Brand Center) marked on each board's note. Checked against SharePoint's flexible sections and section background images; reading order in flexible sections follows the order web parts are added | Jithin |
| 2026-11-04 | Recognition: nominations happen in the Enterprise's internal recognition portal; the site links to it and hosts ThinkLatent's own quarterly awards (Jithin). Six categories proposed, three tied to the scoreboard (Research to Production, In People's Hands, AI-Native) and three to habits ThinkLatent wants more of (Storyteller, Published, Production Grade), each with its evidence; unawarded categories are left empty, never filled. Seventh template added: ThinkLatent quarterly awards (one post a quarter after the leadership review, consent to name and photo required). Categories pending Jithin | Jithin (portal, awards); thinking partner (categories, template) |
| 2026-11-04 | Decision 6: the site is light and welcoming: white canvas with the brand green, teal for immersive moments, an accent per kind of content (green, teal, steel, terracotta, Decision Red), particle imagery without connecting lines; dark pages rejected twice (black, then deep teal). Pattern set v3 generated from kit tokens and delivered; Decision Red stays the decision colour (#FF1F22 in the reference is not Decision Red). Real content pulled from the register, Jithin's notes and the public university lab site | Jithin (direction, references); thinking partner (system, patterns, content) |
| 2026-11-04 | Decision 7: the v3 boards were rejected as generic ("AI slop"); the site is redrawn in the design-kit's own language, taken from the playground (shell.tsx, glass.css, tile.tsx, agent-brief.tsx, command-center.tsx): Shell D with the pill top bar and glass dock, colour fields tinted to each page's accent, 28px content tiles with light 52/96px numerals and captions, one coloured glass brief tile and one ink tile per page, one exhibit per page, status as glyph and word, rows without table chrome, pill buttons with Write for ThinkLatent in Decision Red. Canvas v26 holds all 16 boards (9 pages, 7 templates) as gen/kit.py + gen/boards.py, regenerable. The ThinkLatent orb (six rings in wave-like motion) is drawn as a dot motif in the exhibits; it is an interpretation from the description, to be checked against the real logo. Tier map stays: section backgrounds, Text, Quick Links, News, People, Events are tier 1; shell, dock, glass, numerals and pills are tier 2 (SPFx) | Jithin (rejection, direction to the kit); thinking partner (rebuild) |
| 2026-11-04 | Decision 8: v4 corrected (a site, not a dashboard; everything must be reachable with SharePoint and the custom CSS). v5 built from SharePoint's own page elements with each block labelled (web part, layout, tier); the kit's language kept only where custom.css reaches it. Theme primary = Decision Red (buttons, links, current-page marker native); Soft sections mint; green and teal in the imagery. Labels stay on the canvas. Canvas v29 | Jithin (constraint, theme primary, labels); thinking partner (v5 rebuild) |
| 2026-11-05 | Decision 9: v4 and v5 set aside (dashboard grammar; red as theme primary). Back to the v3 site structure; the kit plate unchanged (primary green, secondary teal); Decision Red added on buttons, the header stripe and banners; no pattern imagery until the team designs the new image set. Decision 8 withdrawn. Canvas v32 | Jithin (direction); thinking partner (restore, record) |
| 2026-11-05 | Decision 10 (feature 1 of the scout inventory, the identity section): the site leads with the mandate, then the named products, then proof of outcomes. Mandate in Jithin's words: build AI infused with the Enterprise's proprietary data (language, speech, omni, foundation models and more) so the Enterprise's own intelligence compounds; vendor and frontier models make everyone as good as the vendor, but only the Enterprise's models carry its customer feedback loop and business knowledge; latency, cost and scale matter; if the Enterprise's intelligence does not compound over the next three to five years the risk is existential, because scale is the industry's hardest problem and an augmented workforce with the Enterprise's own model in front lets people who do 10 tasks today do 100. Named products show how the mandate is delivered (TLM, ThinkLatent Portal, TL Index). Wins, research and publications are shown as compounding KPIs over time, not one-off results | Jithin |
| 2026-11-05 | Features 2 to 10 (scout inventory, all as recommended): (2) Products as a top nav item: Home · Mandate · Products ▾ (TLM, ThinkLatent Portal, TL Index) · Our work ▾ (Wins, Research, Publications) · Blog · AI Perspectives · Team; (3) mandate as the Home hero line plus its own Mandate page; (4) Home trend strip of 4–6 sourced numbers with since-launch trend and as-of date, only numbers ThinkLatent can source today; (5) Team as three function cards (mission, head, quarterly output count) plus a row per location and People web parts; (6) four audience doors on Home (Bring us a problem, Build on TLM, See the outcomes, Governance and trust) plus a Work with ThinkLatent ladder (consult, co-build, dedicated model); (7) intake by Microsoft Forms with a named owner and reply-within promise, handing off to ThinkLatent Portal intake later; (8) each Win is a research-to-production story with one sourced before/after number, a business-partner quote and a 'what compounded' line; (9) Products shows a static TLM lineage with linked tiles to outcome summaries and the portal's model cards; (10) Research page for the university lab in the Capital One layout (area cards, Head of ThinkLatent quote, joint outputs, master's-programme interns, events, partner stories), linking to the lab's own site | Jithin |
| 2026-11-05 | Features 11 to 20: (11) blog on the BAIR model, researchers write, 2–3 editors with a function head as advisor, at most one post every two weeks, shared to the intranet and the Canada/India office news, the external blog later via Comms; (12) two writing tiers, Perspective (business readers, outcomes only) and Deep dive (practitioners); (13) AI Perspectives as a seminar page: schedule as text, speaker bio and abstract, past sessions, a Stream recordings library used for onboarding; (14) a quarterly demo edition after launch (8–12 minute talks, live demo each, one Q&A, recorded, recap); (15) 'ThinkLatent in 2026' year in review in January 2027, then yearly; (16) Publications as a filterable List (year, area, status: internal memo, external paper, patent, talk, in production) with authors linked and one 'ThinkLatent at \[conference\]' post per conference; (17) a named trust program as its own nav item, ThinkLatent Trust ('How every ThinkLatent model earns its place'): ThinkLatent's controls and lifecycle, policy text stays with the Enterprise's AI governance owner (chosen over the recommended lifecycle section under Products); (18) a short outcome card per model on the site, the full technical card in the ThinkLatent Portal, one template in Write for ThinkLatent; (19) a TL Index summary tile with as-of date and a three-line explainer, numbers from the TL Index only; (20) a ThinkLatent Viva Engage community embedded on Home and AI Perspectives. Nav now: Home · Mandate · Products · Our work · ThinkLatent Trust · Blog · AI Perspectives · Team | Jithin |
| 2026-11-05 | Features 21 to 30: (21) nav grouped to six: Mandate · Products ▾ (TLM, ThinkLatent Portal, TL Index, ThinkLatent Trust) · Our work ▾ (Wins, Research, Publications) · Stories ▾ (Blog, AI Perspectives) · Team + Write for ThinkLatent; Home is the logo (supersedes the nine-item nav in features 2 and 17); (22) profiles at launch for the Head of ThinkLatent, function heads and principal scientists, each auto-listing the person's posts and publications, author fields linked site-wide; (23) a \~40-term plain-language glossary as a List, owned by the blog editors; (24) 6–8 'questions teams ask first' as collapsible sections on Home; (25) a business-partner quote per Win plus a rotating Home quote, a short post for each new business unit or IT engagement, no logo walls; (26) podcast piloted after launch, 'ThinkLatent Perspectives: \[topic\] with \[business leader\]', hosted by team members who podcast; (27) the monthly newsletter stays email-only, the site links its archive (chosen over the recommended site-built digest); (28) two named site owners, 'Review by' dates on Mandate, Products, ThinkLatent Trust and Write for ThinkLatent, quarterly check, SAM policies if licensed; (29) quarterly awards page plus winners featured on Home for the quarter and a Viva Engage shout-out, nominations stay in the recognition portal; (30) one plain 'ThinkLatent at a glance' index page kept current quarterly so Copilot and search answer questions about ThinkLatent | Jithin |
| 2026-11-05 | Features 31 to 40: (31) Release template gains 'Getting started' (how a team starts, linking the portal), acknowledgments and a contact; links go to the portal model card and the TL Index run, not weights or code; (32) Write for ThinkLatent grows to eleven templates: + Model card, Win story, Conference roundup, New partner; (33) page comments on everywhere (chosen over the recommended Blog and Perspectives only), moderated by the editors; (34) session recordings at launch, a 2–3 minute outcome video per product after launch; (35) a 'Work in ThinkLatent' block on Team after launch linking internal roles and rotations; (36) tie to the Enterprise's AI Summit and own a yearly ThinkLatent Day with a hackathon on ThinkLatent products (Jithin's own option); (37) ThinkLatent Day hackathon: mixed business and ThinkLatent teams build on TLM, the ThinkLatent Portal or the TL Index over 1–2 days, demos judged by the Head of ThinkLatent and two business leaders, winners join the quarterly awards, the best idea enters the Idea Lab as a Seed; ThinkLatent Day page under Stories; (38) Home hero: fixed mandate line and two buttons plus four editor-rotated tiles (latest Win, next AI Perspectives, newest release, a Perspective post); (39) native filters only: category button links on Blog and Stories, List filter/sort/gallery on Publications and Wins, team chips by custom CSS; (40) a 'Use AI at the Enterprise' block on Home and Products linking the approved tools list and training (governance owner), the portal playground and model cards, and the TL Index; ThinkLatent copies none of them | Jithin |
| 2026-11-05 | Features 41 and 42, inventory review complete: (41) a business-side champions network six months after launch: one champion per business unit using ThinkLatent products, a one-page charter, a badge, a monthly call, feedback to the roadmap; office advocates stay as syndication; (42) small items accepted as a bundle. Adopt: jump links on long pages, role labels and start year on profiles, location rows on Team, a footer with Follow, Viva Engage, Portal and contact, native site search. Later: interactive lineage (portal), automatic team output counts (manual quarterly until then), Power Automate intake routing, university lab tours, corrections log (TL Index). Skip: breadcrumbs, logo walls, alumni page, docs-as-code blogging, prompt of the week, a separate AI Perspectives microsite. New pages the boards now need: Mandate, Products landing, ThinkLatent Trust, ThinkLatent Day, Glossary, ThinkLatent at a glance; four new templates | Jithin |
