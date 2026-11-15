# ThinkLatent site · theme pack v10.2

Everything SharePoint needs to look like canvas v10 of the ThinkLatent site. Made 2026-11-16 from the ThinkLatent kit colour system v1.1 (TL-016, D-381). The build guide says where each file goes.

| File | What it is | Who can use it |
| --- | --- | --- |
| `gradients/meadow-2880x1200.png` | Meadow: off-white to mint, sage glow top right, teal glow bottom left. Background of every page hero. | Site owner (section or Hero background image) |
| `gradients/canopy-2880x900.png` | Canopy: forest to teal at 135°, sage glow. The closing band on every page. | Site owner (Call to action or section background) |
| `gradients/lagoon-2880x1200.png` | Lagoon: teal deep to teal at 140°, sage glow. AI Perspectives hero, the university lab, Where TLM works. | Site owner (section background) |
| `gradients/mint-rise-2880x600.png` | Mint rise: canvas to mint. Soft bands between sections. | Site owner (section background) |
| `drawings/mandate-*.png` and `.svg` | The Mandate diagrams: the spine, 01 Today, 02 Vision, 03 the system map (placeholder counts), 04 Generations, the closing fan. PNG to upload, SVG as the editable source. | Site owner (Image web part) |
| `thinklatent-theme.json` | The theme palette (Fluent slots) plus the two colours for the no-admin route. | Admin (full palette) or site owner (two colours) |
| `Add-ThinkLatentTheme.ps1` | Registers the theme in the tenant gallery with `Add-SPOTheme`. | SharePoint administrator |
| `custom.css` | Type scale, red pill buttons, header stripe, card radii, focus rings. | IT, through one SPFx application customizer |
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
| The palette | `thinklatent-theme.json`, `Add-ThinkLatentTheme.ps1` | The site theme (two colours with no admin, or the exact palette through one admin script) |
| The gradients | `gradients/*.png` | Section background images |
| The Mandate diagrams | `drawings/*.png` (SVG sources beside them) | Image web parts |
| The lists | `lists/*.csv` | Lists created straight from the files |
| The status glyphs | `stage-column-format.json` | Column formatting on the Process stage list |
| Type sizes, red buttons, the stripe | `custom.css` | Applied by one IT customizer; until then, sizes are typed by hand |

The words come from the page copy, the order from the build guide.

## Set it up, step by step

1. **Unzip the pack** on your laptop. Keep the [page copy](https://claude.ai/artifact/SYuzrTCs1uxD9f5b3H9Ru5) open beside SharePoint.
2. **Create the test site.** SharePoint start page > + Create site > Communication site. Name it ThinkLatent, on a test address such as /sites/thinklatent-test.
3. **Header, menu and footer.** Settings (gear) > Change the look > Header: Compact. Navigation: Horizontal, Mega menu. Footer: on.
4. **Colours, no admin needed.** Settings > Site branding > Theme > + New theme > + Add color: #2E6B3C as primary and #2F7A6D as secondary. Name it ThinkLatent v10 and save. Then Settings > Change the look > Theme > ThinkLatent v10 > Save. For the exact palette instead, a SharePoint administrator runs `Add-ThinkLatentTheme.ps1` (it reads `thinklatent-theme.json`), and you pick ThinkLatent v10 in Change the look.
5. **Font (optional).** Inter needs the brand center, which an administrator sets up. Then Settings > Site branding > Font packages > + New font package, Inter for both slots, and apply it in Change the look. Without it the site uses SharePoint's own font.
6. **Images.** Settings > Site contents > Site Assets > + New > Folder, named ThinkLatent. Open it and upload the four PNGs from `gradients/` and the PNGs from `drawings/`.
7. **Lists.** Site home > + New > List > From CSV > upload `lists/glossary.csv`, check the column types in the preview, name it Glossary, Create. Repeat for `publications.csv` (Publications), `wins.csv` (Wins; replace the sample row first), `process-stage.csv` (Process stage) and `citations.csv` (Citations). `launch-brackets.csv` is an optional tracker for the test site.
8. **Status column.** In Process stage: Stage column > Column settings > Format this column > Advanced mode, paste the contents of `stage-column-format.json`, Save.
9. **Page columns.** In Site Pages add Category, Owner, Second owner, Review by, Source, As of and Business line (build guide, step 4).
10. **Build a page.** + New > Page > Blank. For each section in the page copy: add a section; Edit section > Background > Image > the gradient it names (Meadow, Canopy, Lagoon or Mint rise) from Site Assets > ThinkLatent, overlay as low as it goes; add the web parts listed; paste the text; set the style and type the size (Heading 1, 48, and so on).
11. **Mandate drawings.** Image web parts with the PNGs from `drawings/`, alt text from the page copy.
12. **Order.** Home, Wins and Products first, then the rest. Fill each bracket from the system it names as you go, and log the hours per page.
13. **custom.css (IT).** Send the request in build guide step 9. Once IT switches the customizer on, upload `custom.css` to Site Assets > ThinkLatent: the sizes apply by themselves, buttons turn red and the header stripe appears. Until then everything works with typed sizes and green buttons.
14. **Before launch.** Run the checklist in build guide step 10.

## Lists

Create each list from its file: New > List > From CSV, then check the column types in the preview (Choice for Type, Status and Stage; Date for As of; Yes/No for With the university). Person columns (Authors, Contact) and the stage format are added after import. SharePoint keeps a copy of each uploaded CSV in Site Assets.

The words for every page are not in this pack: they are in the page copy doc, ThinkLatent site — page copy for SharePoint (v10), and in GitHub at artifacts/TL-016-team-site/docs/page-copy.md.

## Derived colours

SharePoint needs nine theme shades; the kit names six greens. Four values in `thinklatent-theme.json` are interpolations between two kit tokens: `themeLighterAlt` #F4FAF6 (canvas to mint), `themeDarkAlt` #256035 (green 700 to forest), `neutralTertiaryAlt` #C8C8C4 and `neutralDark` #141414 (between the kit's neutrals). Everything else is a kit token.

## Two ways to apply the theme

1. **No admin:** Settings > Site branding > Theme > New theme. Add primary #2E6B3C and secondary #2F7A6D. SharePoint builds its own shades, so the result is close to the palette, not identical.
2. **Admin, exact palette:** a SharePoint administrator runs `Add-ThinkLatentTheme.ps1`; then the site owner picks "ThinkLatent v10" under Settings > Change the look > Theme > From your organization.

## Limits, stated plainly

- Gradients are images. SharePoint adds a see-through overlay on section background images; set it as low as it goes so the colours stay true.
- The v10 type sizes need `custom.css`. Without it SharePoint's own heading sizes apply (24, 20, 18).
- Inter needs the Brand Center (a brand manager uploads it), or font files in this site's Site Assets loaded by `custom.css`.
- Nothing in this pack calls a service outside the Enterprise.
