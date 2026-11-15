# ThinkLatent site · theme pack v10

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
