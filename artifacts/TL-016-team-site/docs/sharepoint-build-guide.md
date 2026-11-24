# ThinkLatent site — SharePoint build guide (v10)

Nov 16, 2026 · @Jithin Pradeep

This guide builds the ThinkLatent site in SharePoint Online from design canvas v11 (D-490, the design kit's colour v5, updated 23 Nov 2026), on a test site first. A site owner can do nearly all of it with native web parts, the theme's colour pairs and image backgrounds; the type scale is typed into each Text web part, and one IT request (custom.css) makes it automatic and brings the pill buttons, the red main action and emerald links.

## Before you start

You need Full Control on a new communication site, the theme pack, and the page copy doc open beside you. Every step below says who can do it.

**The page copy.** Every word of every page and template, section by section with its web part and text style, is in [ThinkLatent site — page copy for SharePoint (v10)](https://claude.ai/artifact/SYuzrTCs1uxD9f5b3H9Ru5). Copy from there; the canvas is the picture of each page.

| Tier | Who | What it covers |
| --- | --- | --- |
| 1 | Site owner | The site, the theme (Site branding route), the type scale typed into Text web parts, navigation, sections on the theme's colour pairs or image backgrounds, Text, Hero, Button, Image, Quick links, News, Events, People, List views, Forms, Call to action, Viva Engage |
| 1a | One admin action, optional | The theme for the whole tenant (Add-SPOTheme with colour pairs) and Inter as a brand font (Brand Center). Skip both and the site still works |
| 2 | IT, one request | custom.css through one SPFx application customizer: the type scale applied by itself, pill buttons with the main action in red, emerald links, the header stripe, card radii |

**Time.** The stress test put the full build at 150 to 210 hours of hands-on work and 25 to 35 hours a month to keep it current (D-191). There is no hour budget: the site is built continuously, with Claude alongside (D-386). Log the hours per page anyway, so the retrospective can say what it cost.

**The theme pack.** In GitHub at thinklatent-labs/idea-lab, folder artifacts/TL-016-team-site/theme-pack, and attached in the chat.

| File | Use |
| --- | --- |
| gradients/meadow-2880x1200.png | Meadow, white with one soft field: background of every page hero |
| gradients/canopy-2880x900.png | Canopy, flat #0C2822: the Call to action background in the closing band |
| gradients/lagoon-2880x1200.png | Lagoon, flat #E3F0EF: the three teal moments, where the colour pair is not offered |
| gradients/mint-rise-2880x600.png | Mint rise, flat #E6F2EC: attention sections, where the colour pair is not offered |
| drawings/mandate-\*.png | The Mandate diagrams in the v11 colours (SVG sources beside them) |
| thinklatent-theme.json | The theme: four colour pairs, the colours for the no-admin route, and the full palette for older tenants |
| Add-ThinkLatentTheme.ps1 | Registers the theme with its colour pairs (SharePoint administrator) |
| custom.css | The tier 2 stylesheet |
| stage-column-format.json | The process-stage column on How we build responsibly |

The pack's lists folder holds the five lists as CSV files for New > List > From CSV: glossary (all 46 terms), publications (eight seed rows), wins, process-stage and citations.

## Step 1 · The test site

Build everything on a test site first; the real site is built the same way once the checks in step 10 pass. Tier 1.

1. Create a communication site named ThinkLatent, description "The Enterprise's own intelligence, compounding.", language English, on a test address such as /sites/thinklatent-test.
2. Settings > Change the look > Header: Compact layout, site title shown.
3. Settings > Change the look > Navigation: Horizontal, Mega menu.
4. Settings > Change the look > Footer: on. The links go in in step 3.
5. Turn page comments on for the site, then off on Home only.
6. Add two site owners. Their names stay \[Name\] until the company version; in the lab the site editor role is played by Claude.
7. Leave the site out of any hub until the theme and fonts are settled, so nothing is inherited by accident.

## Step 2 · Theme, fonts and the header

The theme makes every button the kit's black button, and its colour pairs carry the flat backgrounds. The red main action, emerald links and the header stripe come only with custom.css in step 9, so black buttons and black links at this point are expected.

1. **Theme, no admin (tier 1).** Settings > Site branding > Theme > + New theme. With + Add color, add #0B0F0C as the primary colour and #FFFFFF, #0B5F33, #E6F2EC, #E3F0EF and #0C2822 as secondary colours. With + New combination, add three pairs: background #E6F2EC with accent #0B0F0C (Mint rise), background #E3F0EF with accent #0B0F0C (Lagoon), background #0C2822 with accent #FFFFFF (Canopy). Name it ThinkLatent v11, save, then apply it under Settings > Change the look > Theme. SharePoint builds its own shades from black, so hover and selected states are greys, and it sets text on each pair to black or white by contrast.
2. **Theme for the whole tenant (tier 1a).** A SharePoint administrator runs Add-ThinkLatentTheme.ps1 from the pack; it registers the four colour pairs exactly (Add-SPOTheme -ColorPairs), or the full palette with -Legacy on an older management shell. Then the site owner applies it: Settings > Change the look > Theme > From your organization > ThinkLatent v11. The legacy palette has no pairs, so its tints go in as images, and its Strong section background is black: do not use it.
3. **Fonts (tier 1a).** Custom fonts come only through the Brand Center: a brand manager uploads Inter there. The site owner then creates a font package under Settings > Site branding > Font packages, with Inter for headings and body. Without it the site uses SharePoint's own font.
4. **Header.** Site title "ThinkLatent". The logo stays the red TL tile until the ThinkLatent mark can be shared.

## Step 3 · Navigation and footer

Two levels in the mega menu, labels exactly as below. Home is the logo. Tier 1.

| Label | Opens | Under it |
| --- | --- | --- |
| Mandate | Mandate | — |
| Products | Products | TLM; ThinkLatent Portal ↗; The TL Index ↗; How we build responsibly |
| Our work | Wins | Wins; Research; Publications |
| Stories | Blog | Blog; AI Perspectives; ThinkLatent Day (hidden until the Summit date is set) |
| Team | Team | — |
| Write for ThinkLatent | Write for ThinkLatent | — (a plain link; SharePoint's menu cannot show the board's black pill) |

The ThinkLatent Portal and TL Index addresses are \[to come\]; until the portal is live, those two links point to the Products page sections.

**Footer**, four groups: ThinkLatent (Follow this site; ThinkLatent on Viva Engage) · Site (Mandate, Products, Our work, Stories, Team, Glossary, ThinkLatent at a glance) · Products (TLM, ThinkLatent Portal ↗, TL Index ↗, How we build responsibly) · Elsewhere (the university lab ↗, \[Enterprise recognition portal\] ↗, Write for ThinkLatent, Contact the editors). Footer line: "The Enterprise's own intelligence, compounding. Internal to the Enterprise."

## Step 4 · Columns, lists and forms

Create these before any page, because the pages show them. Tier 1.

**Site columns**, added to the Site Pages library so every page and template carries them:

| Column | Type | Why |
| --- | --- | --- |
| Category | Choice: Perspective, Deep dive, Release, Roundup, Partner, Win, Leadership, Awards, Session, Use case, Model card, Paper explained | Drives every News filter on the site |
| Owner, Second owner | Person | Two owners on every evergreen page |
| Review by | Date | The stale-page check |
| Source, As of | Text, Date | Every number names where it came from and when |
| Business line | Choice | Wins and the proof panel rows |

**Lists**

| List | Columns | Shown on |
| --- | --- | --- |
| Publications | Title, Type (paper, talk, patent, internal memo), Year, Theme, With the university (yes/no), Status, Authors (Person, several), Link, Comms approval reference | Publications; Research (filtered to the university) |
| Wins | Title, Partner team, Business line, Product, Number, Unit, Source, As of, Quote, Consent stored at (link), Story page | Wins; Home |
| Process stage | Product, Stage (Intake, Risk classification, Developer evaluation, Independent validation, Human review, Monitoring), Inventory record (link), As of, Contact (Person) | How we build responsibly; format Stage with stage-column-format.json |
| Glossary | Term, Letter (A to Z), Definition, Link | Glossary, filtered by letter |

Create each list from its CSV in the pack: New > List > From CSV, then check each column's type in the preview (Choice for Type, Status and Stage; Date for As of; Yes/No for With the university). Add the Person columns (Authors, Contact) and the stage format after import. The Glossary CSV holds all 46 terms, so that list is done on import; the others carry seed rows to replace. A fifth list, Citations, is the S2 log: one row each time a meeting, message or deck links to the site.

**Forms** (Microsoft Forms, each with an owner role named on the page):

| Form | Fields | Owner role |
| --- | --- | --- |
| Bring us a problem | Your team; the problem in your words; how it is done today; what better looks like; how often; contact. A line under the form: no client data | Intake owner |
| Ask a governance question | Your team; product or use case; the question; does it block something today | The product's owner; questions for Risk are passed to Risk |
| Submit a draft | Title; template used; link to the draft; author | Site editor |
| Ask for an AI Perspectives topic | Topic; why it matters to your team; would you present | AI Perspectives lead |
| ThinkLatent Day sign-up | Team; idea in one line; business sponsor | Deferred until the Summit date is set |

## Step 5 · Backgrounds and drawings

Meadow, the white hero with its one soft field, is an image; the three flat backgrounds are the theme's colour pairs, with flat images of the same colours where a pair is not offered. None needs an IT request. Tier 1.

1. Upload the theme pack's gradients and drawings folders to Site Assets, in a folder named ThinkLatent.
2. **Hero sections:** edit the top section of each page > Edit section > Background > Image > meadow-2880x1200.png. SharePoint adds a see-through overlay to image backgrounds for readability; set it as low as it goes so the field stays soft.
3. **Closing band:** the last section of every page takes the Canopy colour pair (background #0C2822), with the Call to action web part in it; give the Call to action canopy-2880x900.png as its background. White text, a white button, or the red main action once custom.css is on.
4. **Teal moments:** the Lagoon colour pair (background #E3F0EF), or lagoon-2880x1200.png, behind the AI Perspectives hero, the university lab on Research, and Where TLM works on Products.
5. **Attention sections:** the Mint rise colour pair (background #E6F2EC), or mint-rise-2880x600.png, on the sections the page copy names, such as the four doors on Home. Every other section stays white, and no section is black.
6. **Drawings:** Image web part, the PNG from the drawings folder, alt text from the canvas caption. No text is typed over an image.

When a news post is sent as email, SharePoint swaps section backgrounds for theme colours. That is expected and needs no fix.

## Step 6 · Team-first pages

Build each page top to bottom, one row per section, copying the words from the page copy doc. Brackets stay in brackets until the fact has an owner, a source and a date. Every page ends with the closing band: a Call to action on Canopy, "Which part of your work should the model learn next?", button Start a use case to the Bring us a problem form. Its link ends ?tl=main, which custom.css turns into the red main action; mark one button per screen that way.

### Home

Comments off on this page only.

| # | Section | Web parts | Background | Tier |
| --- | --- | --- | --- | --- |
| 1 | Hero: "The Enterprise shouldn't have to start from zero.", "Owned models. Inside the boundary.", the supporting line, two buttons, the portal running underneath | Text; Button ×2 (Start a use case; How we build responsibly); Stream for the looping capture once the portal runs, an Image of the system map until then | Meadow | 1; red button 2 |
| 2 | Running on TLM: business-line names, each with its team's agreement | Text, one line | none | 1 |
| 3 | Kept, proven, compounding | Text in three columns | none | 1 |
| 4 | Proof: four numbers, a row per business line with source and as-of; the latest win, this quarter's awards, the new-partner post and This month under it | Text (numbers at the largest heading); List view of Wins; Highlighted content | none | 1; number sizes 2 |
| 5 | Named products | Quick links, grid, with images | none | 1 |
| 6 | Four doors and the Work with ThinkLatent ladder | Quick links; Text in three columns | Mint rise | 1 |
| 7 | Latest from the team, the community, Use AI at the Enterprise | News (Category filter); Viva Engage; Quick links | none | 1 |
| 8 | Closing band | Call to action | Canopy | 1 |

### Mandate

| # | Section | Web parts | Background | Tier |
| --- | --- | --- | --- | --- |
| 1 | Opening line, chapter links, the spine image | Text; Quick links (buttons to the chapter headings); Image (mandate-spine.png) | Meadow | 1 |
| 2 | 01 Today, with the Head of ThinkLatent quote | Two columns: Text; Image (mandate-01-today.png) | none | 1 |
| 3 | 02 Vision | Two columns: Text; Image (mandate-02-vision.png) | none | 1 |
| 4 | "One system, every team, every lesson kept." | Text, one heading, centred | none | 1 |
| 5 | 03 Approach | Two columns: Text; Image (mandate-03-system.png) | none | 1 |
| 6 | 04 Generations | Two columns: Text; Image (mandate-04-generations.png) | none | 1 |
| 7 | 05 The loop, then the four measured targets | Text; the panel only once sourced counts exist; Text in four columns for latency, cost, scale, competitive advantage | none | 1 |
| 8 | Close: the fan, the closing line, two buttons | Image (mandate-close-fan.png); Text; Button ×2 | none | 1 |

The dotted spine down the canvas board is not built in SharePoint: the chapters stand as numbered sections, and the spine appears in the opening and closing images. Chapter 04's line waits on Applied Research.

### Products

| # | Section | Web parts | Background | Tier |
| --- | --- | --- | --- | --- |
| 1 | Hero, in-page links, three stat tiles (5 generations; \[n\] in use per the model inventory; \[n\] client interactions a year from AI Gateway telemetry) | Text; Quick links (buttons) | Meadow | 1 |
| 2 | The models: "TLM first. Frontier models where the TL Index shows they win." | Text; Quick links (buttons) as the model strip | none | 1 |
| 3 | Six things, each shown as it looks | Quick links, grid, images = portal captures | none | 1 |
| 4 | TLM lineage and the three tiers | Image (lineage); Text in three columns | none | 1 |
| 5 | Where TLM works | Text in three columns | Lagoon | 1 |
| 6 | Agents, in the order they ship | Text rows, or a list once the agent library has one | none | 1 |
| 7 | Generations, the ThinkLatent Portal and platform, the TL Index tile | Text; Quick links | none | 1 |
| 8 | Use AI at the Enterprise; Releases | Quick links; News (Category = Release) | none | 1 |
| 9 | Closing band | Call to action | Canopy | 1 |

### How we build responsibly

Goes live only after the real Risk review of its wording (company version).

| # | Section | Web parts | Background | Tier |
| --- | --- | --- | --- | --- |
| 1 | Hero, page links, the six chips | Text; Quick links (buttons) | Meadow | 1 |
| 2 | The six steps and who is responsible | Text in three columns, two rows | none | 1 |
| 3 | Six questions teams ask first | Text in three columns | none | 1 |
| 4 | What we show and what we don't | Text in two columns | none | 1 |
| 5 | Process stage by product | List view of Process stage, Stage formatted | none | 1 |
| 6 | Policy, the model inventory and owners | Text; Quick links ×4 | none | 1 |
| 7 | The two pinned explainers | News, two posts pinned | none | 1 |
| 8 | Ask a governance question; owners, review line, corrections | Forms; Text | none | 1 |
| 9 | Closing band | Call to action | Canopy | 1 |

### Team

| # | Section | Web parts | Background | Tier |
| --- | --- | --- | --- | --- |
| 1 | Hero | Text | Meadow | 1 |
| 2 | Three functions: Research, Applied Research, AI Products, each with its head and a quarterly output count | Text in three columns | none | 1 |
| 3 | Profiles, heads first, each listing the person's posts | People; Highlighted content filtered by author | none | 1 |
| 4 | Everyone, three locations, how we work | People; Text | none | 1 |
| 5 | Awards and recognition | Text; Quick links to the Enterprise recognition portal | none | 1 |
| 6 | Closing band | Call to action | Canopy | 1 |

## Step 7 · Our work and Stories pages

Same method: one row per section, words from the page copy doc, the closing band last. Every hero is on Meadow except AI Perspectives, which is on Lagoon.

| Page | Sections, top to bottom | Web parts |
| --- | --- | --- |
| Wins | Hero · featured win (story, before and after number with source and date, partner quote, what compounded) · all wins with filters for year, business line and product · new partners · what partner teams say · Bring us a problem · closing band | Text; Image; List view of Wins; News (Category = Partner); Forms; Call to action |
| Research | Hero · three themes · the university lab on Lagoon (introduction and link to the lab's site, four project cards, the Head of ThinkLatent quote, joint outputs, interns, events) · methods in use · closing band | Text; Quick links; List view of Publications filtered to the university; People; Events; Call to action |
| Publications | Hero · every paper, talk and patent with filters for type, year, theme, the university and status · conference roundups · in the news (links only, Comms reference kept per row) · closing band | List view of Publications; News (Category = Roundup); Quick links; Call to action |
| Blog | Hero · filters as buttons (Perspective, Deep dive, roundups, year in review) · featured post · posts · ThinkLatent in 2026 · the leadership series · how the blog runs · newsletter archive · closing band | Quick links (buttons); News (featured, then list layout; Category filters); Text; Call to action |
| AI Perspectives | Hero on Lagoon · next session with abstract, host and guest · schedule as text · recordings · ask for a topic, and the community feed · Coming: the demo edition and the podcast · closing band | Text; Events; Stream or Highlighted content; Forms; Viva Engage; Call to action |
| ThinkLatent Day | Built on the test site, published once the AI Summit date is set: hero · how it runs · themes and judging · sign up · at the AI Summit · past winners · closing band | Text; Forms; Events; Call to action |

## Step 8 · Reference pages and the eleven templates

| Page | Sections | Web parts |
| --- | --- | --- |
| Glossary | Hero · letters as buttons · every term, one line each, including Independent validation and Model inventory · closing band | Quick links (buttons); List view of Glossary filtered by letter; Call to action |
| ThinkLatent at a glance | One plain page of headings and lists, every number with its source, refreshed each quarter, so search and Copilot can answer "what has ThinkLatent done on X?" · closing band | Text only; Call to action |
| Write for ThinkLatent | Hero · the eleven templates · Perspective or Deep dive · three steps, reviewed within five working days · how the blog runs · the ThinkLatent voice · submit · closing band | Quick links (grid); Text; Forms; Call to action |

**Templates.** Build each one once as a page with the blocks listed for it in the page copy doc, set its Category, then Page details > Save as template. Authors start every post from these.

| Template | Category | What it holds |
| --- | --- | --- |
| Blog post | Perspective or Deep dive | Problem in plain words, why it matters to the Enterprise, where else it was heard, an invitation to talk |
| Win story | Win | One moment, one number with source and date, the partner's quote, what compounded |
| Paper explained | Paper explained | The paper in plain words, what it means here, who to ask |
| Model card | Model card | What it is for, who uses it, limits plainly, the TL Index result, access; status \[In use, Preview, Retired\] and the inventory record. The portal card wins where they differ |
| Release notes | Release | What is new in outcomes, getting started, acknowledgements, contact |
| Leadership series | Leadership | One post a month, the four leaders in turn |
| Use case | Use case | One page per use case, kept current, for business readers |
| AI Perspectives session | Session | Topic, abstract, host and guest, recording, what came out of it |
| Conference roundup | Roundup | Who went, three things we bring back, who to ask |
| New partner | Partner | The problem in their words, what starts, the first milestone, contact |
| ThinkLatent quarterly awards | Awards | The six categories and their winners, with a link to the recognition portal |

## Step 9 · custom.css: the one IT request

custom.css is the only part that needs IT, and the site works without it. The type scale does not wait for it: the Text web part's font size box takes any size from 8 to 250, so every size in the page copy can be typed by hand (tier 1). The file makes those sizes apply by themselves, sets the page title size, and adds pill-shaped buttons, the red main action (the button whose link carries ?tl=main), emerald links, the header stripe and the card radii. Tier 2.

| What custom.css changes | Without it |
| --- | --- |
| The type scale applied by itself: page title 72, sections 48, cards 26, lead 22, body 17 | The same sizes typed by hand in each Text web part; the page title keeps SharePoint's size |
| Buttons in page content become pills; the one marked ?tl=main turns red | Buttons stay the theme's black, square-cornered; the main action is black too |
| The 4 px red stripe on the site header | No stripe |
| Text links in emerald #0B5F33 | Links stay black and underlined |
| Large radii on cards; visible focus rings | SharePoint's square cards |
| Inter as the page font, once it is in the Brand Center or Site Assets | SharePoint's font |

The backgrounds, the Mandate drawings and the large numerals do not depend on it: they are theme colours, images or native sizes.

The file targets SharePoint class names and automation ids, which Microsoft can change without notice. Each rule falls back to SharePoint's own look if it stops matching, and the file marks with VERIFY each selector to check on the test site.

**The request, ready to send:**

```text
Request: add one SharePoint Framework application customizer to one site.
Site: https://[tenant].sharepoint.com/sites/thinklatent-test (then the live site).
What it does: adds one stylesheet link to each page of that site. The CSS file sits in the
site's own Site Assets library (ThinkLatent/custom.css). No other script, no data access,
no calls outside the Enterprise.
Why: the ThinkLatent team site's type sizes, button colours and header stripe.
If IT already has an approved CSS-loading customizer, we would use that one.
Rollback: remove the customizer from the site; the site returns to SharePoint's own look.
Owner: Head of ThinkLatent. Wanted by: 12 Dec 2026, the date the team decides whether the
launch design gets the pill buttons, the red main action and automatic sizes, or keeps typing sizes by hand.
```

## Step 10 · Before launch

The site goes past the test site only when every box below is ticked. The dated checks are the stress test's kill criteria (D-191); since D-386 the 19 Dec one reads progress only.

- [ ] Nov 21, 2026 At least 86 of the 171 launch brackets in the launch brackets doc have a value, a source system and a date; otherwise launch with six pages (Home, Mandate and Products, Wins, Team, Blog, At a glance).
- [ ] Dec 5, 2026 Three of the five sponsors or partner leads shown the v11 Home board asked for the link; otherwise re-score and decide proceed or park.
- [ ] Dec 12, 2026 IT has a date for custom.css; otherwise launch with sizes typed by hand and black buttons.
- [ ] Dec 19, 2026 Home, Wins and Products are on the test site with the hours logged per page. A progress read, not a cut: there is no hour budget (D-386).
- [ ] Every number on a live page names its source and date. A person is not a source. Blocks without one come off.
- [ ] How we build responsibly: the real Risk review is done, questions 6 and 7 answered, and the review line dated.
- [ ] Every win has written consent stored for each channel it goes to, and the corrections procedure has an owner.
- [ ] The site carries the Internal classification label, and Comms has reviewed the launch content.
- [ ] Two owners and a review date are set on Mandate, Products, How we build responsibly, Glossary, ThinkLatent at a glance and Write for ThinkLatent.
- [ ] Site usage is on, so S1 (readers outside ThinkLatent in month 2) can be read.

## Sources

Checked 16 Nov 2026; the theme sources again on 23 Nov 2026. Test each step on the test site, because SharePoint changes month to month.

- [Site branding: site owners create themes; font packages come from Brand Center fonts](https://support.microsoft.com/en-us/sharepoint/sites-in-sharepoint/site-branding) (Microsoft Support)
- [Site owners can create and apply custom themes without IT](https://sharepointmaven.com/how-to-configure-and-apply-a-custom-theme-in-sharepoint-online) (SharePoint Maven)
- [Add-SPOTheme needs a SharePoint administrator](https://sympmarc.com/?p=39658) (Marc D Anderson)
- [Brand center font packages](https://learn.microsoft.com/sharepoint/brand-center-font-packages) (Microsoft Learn)
- [Brand managers upload fonts; site owners build packages from them](https://sharepointmaven.com/how-to-create-and-configure-custom-fonts-in-sharepoint/) (SharePoint Maven)
- [MC724124: image and gradient section backgrounds in Pages and News](https://mc.merill.net/message/MC724124) (Message Center archive)
- [Setting a section background image](https://learn.microsoft.com/en-us/answers/questions/1692827/using-a-background-behind-quick-links-in-modern-sh) (Microsoft Q&A)
- [Section backgrounds in pages and news posts](https://sharepointmaven.com/sharepoint-page-section-backgrounds) (SharePoint Maven)
- [MC752513: Text web part heading sizes 24, 20 and 18](https://mc.merill.net/message/MC752513/v/2024-06-19T20-52-35-793Z) (Message Center archive)
- [News emails swap section backgrounds for theme colours](https://supersimple365.com/new-sharepoint-section-backgrounds-for-pages-and-news/) (Super Simple 365)
- [MC799209: Text web part font sizes from 8 to 250](https://mc.merill.net/message/MC799209) (Message Center archive)
- [MC888883: Text web part custom font colours](https://mc.merill.net/message/MC888883) (Message Center archive)
- [MC668787: create a list from a CSV file](https://petri.com/microsoft-changelog/m365-changelog-sharepoint-microsoft-lists-create-a-list-from-csv-and-export-to-csv/) (Petri changelog)
- [Create a list based on a spreadsheet or CSV](https://support.microsoft.com/office/380cfeb5-6e14-438e-988a-c2b9bea574fa) (Microsoft Support)
- [Site theme: colour combinations for sections and the Text web part; text set to black or white by contrast](https://learn.microsoft.com/en-us/sharepoint/site-theme) (Microsoft Learn)
- [Site branding: + New combination, up to 16 pairs](https://support.microsoft.com/en-us/sharepoint/sites-in-sharepoint/site-branding) (Microsoft Support)
- [Add-SPOTheme -ColorPairs, up to 16 colour pairs](https://learn.microsoft.com/en-us/powershell/module/sharepoint-online/add-spotheme) (Microsoft Learn)
- [Theme JSON schema 2.0.0: secondary colour pairs and the accent slot](https://learn.microsoft.com/en-us/sharepoint/dev/declarative-customization/site-theming/sharepoint-site-theming-json-schema) (Microsoft Learn)
- [Section backgrounds come from white, neutralLighter, themeLighterAlt and themePrimary](https://learn.microsoft.com/en-us/answers/questions/469680/sharepoint-online-section-background-color) (Microsoft Q&A)
