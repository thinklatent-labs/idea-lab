<!-- Exported from https://claude.ai/artifact/9ZtoVU9roiRiACFjqe5nJu (rev 21) on 2026-11-04. Read-only mirror; edit the live doc, not this file. -->
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
| The ThinkLatent team (45 people, US, Canada, India) | One shared account of the vision and the wins; a place to publish | Chat threads and all-hands slides |
| Risk, Compliance and Governance partners | What exists, what is approved, what was published externally | Separate processes; no index of ThinkLatent's public footprint |
| Recruiters, new joiners, visiting researchers (the university lab) | The team's publications, blogs and press | Think Latent (external) and personal LinkedIn pages |

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

**B. Design canvas (TP; one board per page, light mode, desktop and phone)**

| ID | Deliverable | Needs | Done when |
| --- | --- | --- | --- |
| B1 | Design brief: SharePoint's grammar, what the kit can and cannot reach, type and spacing rules, image style | A3, A4 | J approves |
| B2 | Global chrome: header, logo, navigation (mega menu), footer, section backgrounds | B1 | Board marked keep |
| B3 | Home board: hero, three scoreboard tiles, News, Events, one win, call to action | B2 | Keep |
| B4 | Wins index board and win story page board | B2 | Keep |
| B5 | Products index board, product page board, release notes page board | B2 | Keep |
| B6 | Research board (three themes, the university lab) | B2 | Keep |
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
| D20 | Launch: link from the existing ThinkLatent SharePoint page, the intranet piece, announcement | All of D, G6 | Public inside the Enterprise |

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
| G6 | The intranet pitch and the first success story, submitted | A6, A8 | Submitted |
| G7 | Medium plan: three pieces, authors, Comms route | A8 | Approved |
| G8 | AI Perspectives v2: run of show, the Enterprise slide, the request form, recording and posting process; podcast pilot brief | A2 | First session run |
| G9 | Newsletter v2 template and the submission rule | TPM | First issue |
| G10 | Recognition playbook: award calendar, criteria, nomination review in the quarterly leadership meeting, points rule | — | First nominations entered |
| G11 | Canada and India office story briefs | A6 | One story each in motion |
| G12 | Release-day playbook for a TLM generation | F5 | Used at the next generation |
| G13 | ThinkLatent voice guide: how to talk to business, one page: gain before build, their problem first, a number, an invitation; with before and after examples | — | Adopted by the heads |
| G14 | Measurement plan: S1 to S5, C1, the three scoreboard numbers, who reads what when | A7 | Scheduled |
| G15 | Open roadmap page and answer rule (bold move) | J decision | Page live |
| G16 | ThinkLatent Fellows one-pager (bold move) | J decision | Pitched to one business line |

**H. Portal as the solution in hands (depends on TL-003)**

| ID | Deliverable | Needs | Done when |
| --- | --- | --- | --- |
| H1 | Portal preview page on the site, with what to expect and when | TL-003 status | Live |
| H2 | Pilot user group named with TL-003 | TL-003 | Named |
| H3 | Pilot feedback form and the loop back to the roadmap page | D8 | Responses flow |

Counts: 8 decisions, 12 design boards, 9 kit artefacts, 20 build items, 5 guide parts, 13 content pieces, 16 strategy artefacts, 3 portal links. The critical path is A1 to A4, then B1 and C1 to C3 in parallel, then B2 to B10, then E1 to E3 and D1 to D18, with F running alongside from A5 onward.

## Rundown, part 1 (Jithin, 2026-11-04): the team, the role, the measures, the diagnosis

Recorded from Jithin's spoken rundown; terms transcribed as red teaming, self-healing and pillar where the dictation read otherwise. Part 2 (what exists: products, wins, publications, press, channels) follows.

**The three functions**

| Function | Head | What it does | How it shows up outside the team |
| --- | --- | --- | --- |
| Research (Research) | Head of Research | The engine: internal research, methodology proved before anything is built, state-of-the-art compared and developed. Three research themes: autonomous AI (language-model development and its techniques); trustworthy AI (red-teaming methodology and guardrails on the offensive side; trustworthiness, emotion and decision-making in an industry like the Enterprise's, cognitive design, future-looking); cybersecurity (AI that defends infrastructure and resists other AIs). Also problem-driven research from use cases: SLM feasibility from a team's data before training; the self-healing loop; M-cube, a published red-teaming method. Never touches vendor data | Active publishers (an outside women-in-AI group, AI safety in Canada); the university lab, joint research with prominent PIs |
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
| AI Perspectives | A paper or technology discussion session, irregular | A few key individuals | About 200 attendees | Stops at the paper; never says what it means for the Enterprise or which ThinkLatent solution carries it | Paper, then the Enterprise use, then the ThinkLatent solution that delivers it, then a forum where attendees ask for it on the roadmap; later a podcast format with business leaders as guests; a senior team member who runs an outside women-in-AI group outside could run it |
| Team newsletter | Monthly (or weekly) round-up of what happened in ThinkLatent | The technical program manager, chasing people for items | The team | Pull, not push; no outside-world digest | Members submit their own items and blogs; a TL;DR; a monthly "what changed in AI" digest |
| Monthly reflection | Jithin's article to the team: what happened, what is new, where the team is going | Jithin | The team only | Internal only; could seed leadership blogs | Keep; mine it for public-facing pieces |
| Quarterly town hall and AMA | Team-wide | Jithin and the heads | The team | Fine as is | Keep |
| Enterprise tech talks, AI Summit, other fests | Enterprise forums | The Enterprise | Enterprise | ThinkLatent under-uses them | Regular ThinkLatent slots |
| External conferences, Jithin's external articles, LinkedIn | External voice | Jithin, some researchers | Industry | Team members publish research but rarely speak about products | More voices |
| Publications | Active research publishing (an outside women-in-AI group, AI safety in Canada, M-cube, the university lab) | Research | Research community | Invisible inside the Enterprise | Indexed on the site; translated for business |
| The intranet | The Enterprise's internal news; articles can be published there | Comms | Enterprise | Not one ThinkLatent success story has reached it, though use cases run three generations of TLM at good volume with good results | Translate the success stories; this alone would change the team's picture |
| The external blog | The Enterprise's external publication; slow to publish | Comms | Public | Unused by ThinkLatent | Pursue |
| Enterprise recognition (quarterly awards, recognition points) | Enterprise recognition | Managers nominate | Enterprise | ThinkLatent leadership does not make the case; morale is low; people feel unrecognised | A recognition habit: nominations every quarter, points used |
| Enterprise Canada office | About 200 people, 40 in IT; a strong proponent of ThinkLatent | Office leadership | Global office news | Untapped | Give them an AI success to own; they will publish it as office news |
| Enterprise India office | Global office | Office leadership | Global office news | Untapped | Same play as Canada |
| Team and leadership blogs | Do not exist yet | Nobody | None | No venue, no habit, leaders unsure what to write about | The site as the venue; a topic list per leader; one template for every post |

**Products and wins as given.** TLM is the product: all models and methodology, with generations of models arriving; no release plan or release story exists for a new generation. Success stories exist and run at volume on three generations of TLM, and none has been published. Named lists of products, wins with numbers, publications and off-limits items are still to come (part 3).

**The blog template Jithin asked for.** Every post, team or leadership: the problem in plain words; why it is relevant to the Enterprise; where ThinkLatent has heard people with the same problem; what ThinkLatent did or proposes; an invitation: do you have this problem, let us talk.

## Site map v0 (stream 1)

The site is organised by what a reader wants, not by the org chart: the three functions appear inside Team, never as top-level sections. Eight top-level pages, each with a job and the SharePoint web parts that carry it. Jithin marks keep, change or cut.

| Page | Job for the reader | Content on it | SharePoint grammar | Owner |
| --- | --- | --- | --- | --- |
| Home | In thirty seconds: what ThinkLatent is, what the Enterprise can do now, what is new | One-line aspiration; three scoreboard tiles (cycle time, solutions in hands, AI-native workforce, each with its current number or "first read in Q1"); latest three News items; next AI Perspectives; one win | Hero (image or video); Quick Links tiles; News; Events; Call to action | Head of ThinkLatent; site editor |
| What the Enterprise can do now (Wins) | The business reader's page: the gain in their terms | One story per win: the problem, the partner team, the number, which TLM generation, who to call; the three-generation use cases first | News page template per story; Highlighted content rolled up | Product leads with the partner team |
| Products | What exists and its status | TLM by generation (Core, Distil, Domain), the portal, the index, the gateway and endpoints; status, what it does for whom, how to start; release notes per generation | One page per product; Quick Links; link to the portal | Head of AI Products |
| Research | The engine, translated | The three themes (autonomous AI, trustworthy AI, cybersecurity), each with what it means for the Enterprise and which product carries it; the university lab; M-cube and the published methods | Text plus Quick Links; People for the lab | Head of Research |
| Publications and press | Credibility | Papers, talks, patents, press and Medium pieces: title, venue, date, authors, link, approval reference; one-line "why it matters here" each | A SharePoint list with a formatted view; News for press | Site editor; authors |
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

Thesis: ThinkLatent stops telling the Enterprise what it built and starts showing the Enterprise what it can do now, with the AI-augmented team as the proof and three numbers as the scoreboard. The site is the home; the portal is the solution in people's hands; every other channel points at one of the two.

| Audience | What they must come to believe | Story they get | Channels | Cadence |
| --- | --- | --- | --- | --- |
| C-suite and the three IT engagements (AI platform, data platform, builder experience) | ThinkLatent enriches what they are building and reuses what they build, at larger scale | Scoreboard plus one win per quarter tied to their platform | Quarterly ThinkLatent report (one page, from the site), the AI Summit, Jithin in person | Quarterly |
| Business lines and partner teams | ThinkLatent understands my problem and has something I can use next quarter | A win in their language, an invitation to the roadmap forum, the portal | Wins pages, the intranet, AI Perspectives, tech talks | A win a month; AI Perspectives monthly |
| Risk, Governance, Comms | ThinkLatent's footprint is visible and approved | Publications and press index; approval references | The site; a standing note to Comms | As published |
| The ThinkLatent team | We are seen, recognised and working in a new way | Newsletter TL;DR, recognition, the blog, the reflection | Newsletter, town hall, nominations | Monthly; quarterly |
| Canada and India offices | Our office owns an AI success | One success story each to own and publish | Office news, local events | One each by February |
| Industry and recruits | ThinkLatent publishes and speaks | Papers, Medium, LinkedIn, conferences | External, via Comms and Think Latent | Monthly piece |

**Six moves**

1. The intranet first: three success stories on three generations of TLM, written on the win template, through Comms, before the site launches. Cheapest, biggest change in how the team is seen.
2. AI Perspectives v2: every session ends with the Enterprise slide and the roadmap-request form; the senior member who runs an outside women-in-AI group is asked to lead it; podcast pilot in Q1 with one business-leader guest.
3. The blog habit: one template, a topic list per head (ten topics each, drafted by the thinking partner from their function), one post per head before launch, then one a month; team posts reviewed by the site editor within three working days.
4. Newsletter v2: members submit items; a TL;DR at the top; a monthly "what changed in AI" digest; blog posts reused, never rewritten; the TPM edits rather than chases.
5. Recognition as a system: a nomination review in every quarterly leadership meeting, every award cycle entered, recognition points spent on a published rule; morale is a comms problem too.
6. Release stories: every TLM generation ships with release notes, a what-it-means page and a the intranet line; the portal shows it live.

**The AI-augmented team page.** The ace needs evidence: the working principles, the tools in use, and three numbers (hours saved per engineer per week, time from draft to published page, share of pages drafted with AI then edited by a person). Measured on the site's own production, so it is true by February.

**Scoreboard definitions to fix now.** Cycle time: from the first Research write-up of a method to the first production use case on it, per method; baseline from the three-generation use cases. Solutions in hands: use-case records in production with an impact line signed by the business owner. AI-native workforce: people who have used a ThinkLatent solution or trained on the portal, plus the team's own three numbers.

**February plan (visible, seen, felt)**

| Weeks | Milestone | Done when |
| --- | --- | --- |
| Nov 4 to 15 | Decisions: site editor, AI Perspectives lead, palette confirmed, hub and app-catalog facts, part 3 of the rundown; scoreboard definitions fixed; three wins chosen with partners | All named in the card |
| Nov 16 to 29 | Design canvas of the eight pages; theme.json generated and applied to a test site; win and blog templates issued; first the intranet story submitted | Jithin marks the boards; test site matches |
| Dec 1 to 19 | Build guide; Jithin builds Home, Wins, Products; the heads' first posts drafted; AI Perspectives v2 session run; Canada and India stories chosen | Three pages live on the test site |
| Jan 5 to 23 | Remaining pages built; publications list filled; newsletter v2; nominations for the quarter entered; portal pilot users identified | Site complete on the test URL |
| Jan 26 to Feb 13 | Launch: the intranet piece on the site and the first win; AI Summit or tech-talk slot; the portal in pilot users' hands with the Wins page as their guide; first scoreboard read on Home | S1 read starts; February milestone met |

**Where this is thin.** The whole plan runs on two people who do not exist yet, the site editor and the AI Perspectives lead; the intranet and the external blog paths have Comms timelines ThinkLatent does not control, so the first story must go in November; and the portal reaching pilot hands by February depends on TL-003's own schedule, which is a quarter programme still at Shaping. If the portal slips, the site launches with a portal preview page and the pilot moves to Q2.

**Bold moves (the moonshot layer; Jithin asked for ambition and persistence, 2026-11-04)**

Each is a bet with a kill condition, so boldness stays honest.

| Move | What it is | Why it is bold | Kill if |
| --- | --- | --- | --- |
| The open roadmap | ThinkLatent's roadmap published on the site as a page anyone can read and request against; every request answered in public within two weeks; the quarterly report shows what moved because someone asked | No central team at the Enterprise runs in the open; it turns the timidity problem inside out, because the team is answering, not pitching | Fewer than ten requests in a quarter, or leadership asks for it to be taken down |
| Release day | Every TLM generation launches like a product: a date, a page, a ten-minute demo at AI Perspectives, a the intranet piece, a portal entry the same day, a Canada or India office story | The Enterprise has never seen an internal model launch; it makes generations legible and gives the three heads a stage each | Two launches in a row draw under 100 viewers |
| The AI-native team, in the open | A living page: the principles, the tools, the numbers, updated monthly; plus a quarterly "how we work" session open to any Enterprise team, run by team members, not Jithin | The ace, shown instead of claimed; the resistance Jithin describes is answered with a demonstration people can copy | Nobody outside ThinkLatent attends the second session |
| ThinkLatent Fellows | Five people from business lines per half-year embedded with ThinkLatent for a quarter, building one use case on TLM in the portal, presenting it at the AI Summit | Converts the audience into authors; the strongest form of democratisation | No business line releases a person |
| AI Perspectives as a channel, not a meeting | Recorded, indexed, podcast episodes with business leaders, a an outside women-in-AI group style of hosting, a request form at the end of every piece | Turns a 200-person meeting into an always-on channel with an archive | Episodes average under 50 plays |
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

The site holds no client data, no model weights and no live system access, so model-risk governance does not apply to it. Three other rules do.

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

## Decision log

| Date | Decision | By |
| --- | --- | --- |
| 2026-11-04 | Registered as TL-016 team-site at Shaping from Jithin's description: an internal home for ThinkLatent (vision, products, wins, publications, press, team blogs) built with Claude Code inside the boundary, on the ThinkLatent design kit as it is, touching no internal system | Jithin (idea); thinking partner (registration) |
| 2026-11-04 | Idea card v0 written: content-as-code static site on design-kit recommended (Option B); SharePoint kept as the link, not the site; the portal named as the designed exit; S1 to S5 pre-registered; appetite of two engineer-weeks proposed; thin spots and eight open questions recorded, Q1 to Q3 blocking | Thinking partner, pending Jithin |
| 2026-11-04 | Decision 1: the site is built inside Enterprise SharePoint by Jithin, designed outside it on the kit first; design-kit ships a SharePoint theme pack (colours, tier 1) and a tier-2 custom.css for an SPFx customizer that needs one IT request; the static site (Option B) is superseded and kept as the fallback. Scope widened to the communication and marketing strategy; five workstreams set, content organisation and the strategy first, from Jithin's rundown | Jithin (build path, scope); thinking partner (tiers, workstreams) |
