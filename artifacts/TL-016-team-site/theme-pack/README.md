# ThinkLatent site · theme pack v11.1

Everything SharePoint needs to look like canvas v11.1 of the ThinkLatent site. Made 23 Nov 2026 from the design kit's colour v5 (design-kit v0.11.4; TL-016, D-490); v11.1, 24 Nov 2026, adds the kit's brain mark as the logo and the pictures drawn from it (D-498). The build guide says where each file goes.

What changed in v11.1: the red TL tile gives way to the design kit's brain mark (`logo/`), and every post, product card and hero can take a picture drawn from the mark (`images/`): three hero variants, 26 post thumbnails, six product tiles and five patterns, none with text in it. The kit's other candidate, the two-spark mark, waits in `logo/alternate` until the kit settles on one.

What changed from v10: the theme's main colour is black, so every SharePoint button is the kit's black button; red is kept for the one main action and the header stripe; links are emerald; the hero is white with one soft field, and the other three backgrounds are flat colours that the theme itself can carry.

| File | What it is | Who can use it |
| --- | --- | --- |
| `gradients/meadow-2880x1200.png` | Meadow: white, with one soft field of forest (40%) and signal green (18%) at the top right, kept clear of the text. Background of every page hero. | Site owner (Hero or section background image) |
| `gradients/canopy-2880x900.png` | Canopy: deep forest #0C2822, flat. The closing band on every page. Only needed where the theme's Canopy colour pair cannot be used, such as the Call to action web part. | Site owner (Call to action or section background) |
| `gradients/lagoon-2880x1200.png` | Lagoon: teal #E3F0EF, flat. AI Perspectives hero, the university lab, Where TLM works. Fallback for the Lagoon colour pair. | Site owner (section background) |
| `gradients/mint-rise-2880x600.png` | Mint rise: green #E6F2EC, flat. Attention sections. Fallback for the Mint rise colour pair. | Site owner (section background) |
| `logo/site-logo-thumbnail-white-tile-256.png` (and `-64`) | The site logo thumbnail: the brain mark, full colour, on a white square. SharePoint requires it and shows it in search results, on site cards and wherever a square logo is needed. | Site owner (Change the look > Header) |
| `logo/brain-full-colour-256.png` (64, 256, 512; SVG beside them) | The site logo: the brain mark, full colour, transparent, shown in the header beside the site title. | Site owner (Change the look > Header) |
| `logo/brain-white-tonal-*.png`, `logo/site-logo-thumbnail-deep-tile-*.png` | The mark for the deep band and any other colour, alone or on a deep forest square. | Site owner (Image web part), only if a mark goes on a deep field |
| `logo/alternate/two-sparks-*` | The kit's other candidate, on white only. | Only if the kit chooses it |
| `images/heroes/meadow-lobes.png`, `meadow-spark.png`, `meadow-orbit.png` | Meadow with art on the right, 2880 × 1200: lobes for heroes with text only, sparks for releases, the awards and ThinkLatent Day, an orbit for AI Perspectives and events. The title's half stays clear. Plain Meadow stays `gradients/meadow-2880x1200.png`. | Site owner (section background, top section) |
| `images/thumbnails/*.png` | Post thumbnails, 1600 × 900: an a and a b for each template's category (perspective, deep-dive, win, use-case, paper, model-card, release, leadership, roundup, partner, awards) and four for sessions. The focus sits inside the centre 4:3, so every News crop keeps it. | Authors (Page details > Change thumbnail) |
| `images/tiles/*.png` | Product tiles, 1600 × 1200 (4:3): TLM, ThinkLatent Portal, TL Index, How we build responsibly, Bring us a problem, Outcomes. | Site owner (Quick links in the Tiles layout; Hero web part tiles) |
| `images/patterns/*` | Five optional patterns, as 240 px tiles (SVG, PNG) and 2880 × 1200 PNGs: dots and lace on white, sparks and halves on Mint rise, rings on Lagoon. One a page at most, behind a section with little text. | Site owner (section background) |
| `images/web/` | The same heroes, thumbnails, tiles and patterns as lighter WebP files (heroes and patterns 1440 px wide, thumbnails and tiles 800 px wide), for web pages and decks | Anyone reusing a picture |
| `images/README.md` | A gallery of every picture and logo file, with its use, that GitHub shows as a page | Anyone reusing a picture |
| `images/src/*.svg`, `tools/imagery/` | The editable sources of the thumbnails and tiles, and the script that draws every picture and logo file from the kit's tokens (same output on every run; see its README). | Whoever changes a picture |
| `drawings/mandate-*.png` and `.svg` | The Mandate diagrams in the v11 colours: the spine, 01 Today, 02 Vision, 03 the system map (placeholder counts), 04 Generations, the closing fan. A miss is marked in the kit's status colour, not red. PNG to upload, SVG as the editable source. | Site owner (Image web part) |
| `thinklatent-theme.json` | The theme: four colour pairs, the colours for the no-admin route, and the full palette for older tenants. | Site owner (colours) or admin (script) |
| `Add-ThinkLatentTheme.ps1` | Registers the theme in the tenant gallery with `Add-SPOTheme -ColorPairs` (or `-Legacy` for the full palette). | SharePoint administrator |
| `custom.css` | Type scale, pill buttons, the red main action, emerald links, header stripe, card radii, focus rings. | IT, through one SPFx application customizer |
| `stage-column-format.json` | Column formatting for the process-stage list on How we build responsibly: a glyph and a word, never colour alone. | Site owner (list column, Format this column) |
| `lists/glossary.csv` | The Glossary list: all 46 terms with their one-line definitions, done on import. | Site owner (New > List > From CSV) |
| `lists/publications.csv` | The Publications list: eight seed rows from the boards, brackets where a value is still to come. | Site owner (From CSV) |
| `lists/wins.csv` | The Wins list: one sample row; replace it with the first real win before importing, or delete it after. | Site owner (From CSV) |
| `lists/process-stage.csv` | The Process stage list: TLM4 Core, TLM4 Distil, TLM4 Domain · Advice, TLM5 (Intake). Stages come from the model inventory. | Site owner (From CSV) |
| `lists/citations.csv` | The Citations list, the S2 log: one row each time a meeting, message or deck links to the site. | Site owner (From CSV) |
| `lists/launch-brackets.csv` | Optional: the 190 brackets as a tracker list on the test site (171 for launch, 19 for ThinkLatent Day). | Site owner (From CSV) |

## How this pack helps SharePoint

SharePoint cannot import a design, so the pack holds the parts it can take, each in a form SharePoint accepts:

| From the design | In the pack | In SharePoint |
| --- | --- | --- |
| The colours | `thinklatent-theme.json`, `Add-ThinkLatentTheme.ps1` | The site theme: black buttons everywhere, and three colour pairs page authors can put on a section |
| The backgrounds | `gradients/*.png` | Meadow as the hero image; the flat three as images wherever a colour pair cannot be used |
| The logo | `logo/*.png` | Change the look > Header: site logo thumbnail and site logo |
| Pictures for posts, cards and heroes | `images/` | Page details thumbnails, Quick links and Hero tiles, section backgrounds |
| The Mandate diagrams | `drawings/*.png` (SVG sources beside them) | Image web parts |
| The lists | `lists/*.csv` | Lists created straight from the files |
| The status glyphs | `stage-column-format.json` | Column formatting on the Process stage list |
| Type sizes applied automatically, pill buttons, the red main action, emerald links, the stripe | `custom.css` | Applied by one IT customizer; until then, sizes are typed by hand and every button is black |

The words come from the page copy, the order from the build guide.

## Set it up, step by step

1. **Unzip the pack** on your laptop. Keep the [page copy](https://claude.ai/artifact/SYuzrTCs1uxD9f5b3H9Ru5) open beside SharePoint.
2. **Create the test site.** SharePoint start page > + Create site > Communication site. Name it ThinkLatent, on a test address such as /sites/thinklatent-test.
3. **Header, logo, menu and footer.** Settings (gear) > Change the look > Header: Compact, site title shown; Site logo thumbnail > Change > `logo/site-logo-thumbnail-white-tile-256.png`; Site logo > Change > `logo/brain-full-colour-256.png`; Save. Navigation: Horizontal, Mega menu. Footer: on.
4. **Colours, no admin needed.** Settings > Site branding > Theme > + New theme. With + Add color, add #0B0F0C as the primary colour and #FFFFFF, #0B5F33, #E6F2EC, #E3F0EF and #0C2822 as secondary colours. With + New combination, add three pairs: background #E6F2EC with accent #0B0F0C (Mint rise), background #E3F0EF with accent #0B0F0C (Lagoon), background #0C2822 with accent #FFFFFF (Canopy). Name it ThinkLatent v11 and save. Then Settings > Change the look > Theme > ThinkLatent v11 > Save. Every button on the site is now black. For the same theme across the tenant instead, a SharePoint administrator runs `Add-ThinkLatentTheme.ps1` and you pick ThinkLatent v11 in Change the look.
5. **Font (optional).** Inter needs the brand center, which an administrator sets up. Then Settings > Site branding > Font packages > + New font package, Inter for both slots, and apply it in Change the look. Without it the site uses SharePoint's own font.
6. **Images.** Settings > Site contents > Site Assets > + New > Folder, named ThinkLatent. Open it and upload the four PNGs from `gradients/`, the PNGs from `drawings/`, and the folders `heroes`, `thumbnails`, `tiles` and `patterns` from `images/` (Upload > Folder).
7. **Lists.** Site home > + New > List > From CSV > upload `lists/glossary.csv`, check the column types in the preview, name it Glossary, Create. Repeat for `publications.csv` (Publications), `wins.csv` (Wins; replace the sample row first), `process-stage.csv` (Process stage) and `citations.csv` (Citations). `launch-brackets.csv` is an optional tracker for the test site.
8. **Status column.** In Process stage: Stage column > Column settings > Format this column > Advanced mode, paste the contents of `stage-column-format.json`, Save.
9. **Page columns.** In Site Pages add Category, Owner, Second owner, Review by, Source, As of and Business line (build guide, step 4).
10. **Build a page.** + New > Page > Blank. For each section in the page copy: add a section and give it the background the copy names. Meadow: Edit section > Background > Image > `meadow-2880x1200.png` from Site Assets > ThinkLatent, overlay as low as it goes. Mint rise, Lagoon or Canopy: Edit section > pick the theme's colour pair with that background (#E6F2EC, #E3F0EF or #0C2822); if the pane offers no pairs, use the image of the same name instead. For a hero with text only, a variant from `images/heroes` can take Meadow's place. Leave every other section white, and do not use the Strong background. Add the web parts listed, paste the text, set the style and type the size (Heading 1, 48, and so on). On the page's one main action, add `?tl=main` to the end of its link (custom.css turns that button red).
11. **Mandate drawings.** Image web parts with the PNGs from `drawings/`, alt text from the page copy.
12. **Pictures.** Each template's Category has a pair in `images/thumbnails`. On every post and page: Edit > Page details > Change thumbnail, as the last step before posting, then check it on Home's News web part, because SharePoint can swap it for the first image in the post. Product cards (Quick links, Tiles layout) and Hero tiles take the files in `images/tiles`.
13. **Order.** Home, Wins and Products first, then the rest. Fill each bracket from the system it names as you go, and log the hours per page.
14. **custom.css (IT).** Send the request in build guide step 9. Once IT switches the customizer on, upload `custom.css` to Site Assets > ThinkLatent: the sizes apply by themselves, buttons become pills, the button marked `?tl=main` turns red, text links turn emerald and the header stripe appears. Until then everything works with typed sizes, black buttons and black links.
15. **Before launch.** Run the checklist in build guide step 10.

## Lists

Create each list from its file: New > List > From CSV, then check the column types in the preview (Choice for Type, Status and Stage; Date for As of; Yes/No for With the university). Person columns (Authors, Contact) and the stage format are added after import. SharePoint keeps a copy of each uploaded CSV in Site Assets.

The words for every page are not in this pack: they are in the page copy doc, ThinkLatent site — page copy for SharePoint, and in GitHub at artifacts/TL-016-team-site/docs/page-copy.md.

## Colours

Every colour in the pack is a design kit token (colour v5), with one exception the kit itself records: the brain mark's middle lobe, #2E8F6A, is not yet a token (design/marks in the kit). Nothing else is derived. The roles:

| Colour | Role on the site |
| --- | --- |
| Ink #0B0F0C | Text, and every everyday button |
| White #FFFFFF | The canvas: every section without a named background |
| Emerald 700 #0B5F33 | Links, labels, focus rings; never a button |
| Mint rise #E6F2EC | Attention sections and cards |
| Lagoon #E3F0EF | The three teal moments |
| Canopy #0C2822 | The closing band, with white text |
| Forest 500 #2E7562 and signal #13FC4A | The one soft field under each hero (Meadow), lines and dots in the drawings |
| Enterprise red #C20028 | The one main action of a page and the 4 px header stripe |

## Ways to apply the theme

1. **Site owner, no admin (step 4):** Site branding > Theme > New theme, with the colours and the three combinations. SharePoint builds its own shades from black, so hover and selected states are greys.
2. **Admin, whole tenant:** a SharePoint administrator runs `Add-ThinkLatentTheme.ps1`; it registers the four colour pairs exactly. The site owner then picks ThinkLatent v11 under Settings > Change the look > Theme > From your organization.
3. **Admin, older management shell:** `Add-ThinkLatentTheme.ps1 -Legacy` registers the full palette instead. It has no colour pairs, so the three tints go in as images, and the Strong section background is black: do not use it.

## Limits, stated plainly

- Meadow is an image. SharePoint adds a see-through overlay on section background images; set it as low as it goes so the field stays soft.
- Without `custom.css`, type sizes are typed by hand in the Text web part (it takes 8 to 250), the main action is black like every other button, and links are black.
- Inter needs the Brand Center (a brand manager uploads it), or font files in this site's Site Assets loaded by `custom.css`.
- Nothing in this pack calls a service outside the Enterprise.
