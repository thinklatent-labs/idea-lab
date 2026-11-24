# ThinkLatent imagery

Pictures drawn by script from the design kit's brain mark, in the kit's colours. None carries text, so one file works for any title. They were made for the ThinkLatent site (TL-016, D-498) and can be reused on any ThinkLatent page, post, deck or product screen inside the Enterprise.

| Folder | What it holds | Format |
| --- | --- | --- |
| `heroes/` | Three hero backgrounds; plain Meadow is `../gradients/meadow-2880x1200.png` | PNG, 2880 × 1200 |
| `thumbnails/` | Post thumbnails: an a and a b for each category, four for sessions | PNG, 1600 × 900 |
| `tiles/` | Product tiles | PNG, 1600 × 1200 |
| `patterns/` | Five patterns, each as a 240 px tile and a 2880 × 1200 background | SVG and PNG |
| `web/` | The same heroes, thumbnails, tiles and patterns as lighter files: heroes and patterns 1440 px wide, thumbnails and tiles 800 px wide | WebP |
| `src/` | Editable sources of the thumbnails, tiles and full-size patterns | SVG |
| `../logo/` | The logo files | PNG, SVG |

## Reusing them

- Use a file as it is or resized. Keep the focus in view, keep the colours, and never put text over the art: a title sits beside it, as on the heroes.
- They come from the ThinkLatent team's mark, so they stay inside the Enterprise: the site, Viva Engage, decks, the portal. They do not go on the public Think Latent blog.
- A new shape (a square, a banner) or a new category is a new composition in `../tools/imagery`, run again, so the set stays one family. The scripts make the same files on every run; `web.py` remakes `web/`.

## Heroes

The art sits on the right; the title goes in the left half.

| Picture | File | Use |
| --- | --- | --- |
| <img src="web/heroes/meadow.webp" width="320" alt="White with one soft forest-and-signal field at the top right"> | [Meadow, plain](../gradients/meadow-2880x1200.png) | Every page hero; the default |
| <img src="web/heroes/meadow-lobes.webp" width="320" alt="Pale brain lobes rising at the bottom right"> | [Meadow with lobes](heroes/meadow-lobes.png) | A hero with text only |
| <img src="web/heroes/meadow-spark.webp" width="320" alt="Two sparks at the right"> | [Meadow with sparks](heroes/meadow-spark.png) | Releases, the quarterly awards, ThinkLatent Day |
| <img src="web/heroes/meadow-orbit.webp" width="320" alt="Dotted orbits and two sparks at the right"> | [Meadow with an orbit](heroes/meadow-orbit.png) | AI Perspectives and events |

## Post thumbnails

The focus sits inside the centre 4:3, so the 4:3, 16:9 and 21:9 crops of SharePoint's News web part all keep it. Set one per post in Page details > Change thumbnail.

| Category and template | a | b |
| --- | --- | --- |
| **Perspective**<br>Blog post | <a href="thumbnails/perspective-a.png"><img src="web/thumbnails/perspective-a.webp" width="240" alt="Brain lobes with two sparks (a)"></a><br>`perspective-a.png` | <a href="thumbnails/perspective-b.png"><img src="web/thumbnails/perspective-b.webp" width="240" alt="Brain lobes with two sparks (b)"></a><br>`perspective-b.png` |
| **Deep dive**<br>Blog post | <a href="thumbnails/deep-dive-a.png"><img src="web/thumbnails/deep-dive-a.webp" width="240" alt="Split rings with two sparks (a)"></a><br>`deep-dive-a.png` | <a href="thumbnails/deep-dive-b.png"><img src="web/thumbnails/deep-dive-b.webp" width="240" alt="Split rings with two sparks (b)"></a><br>`deep-dive-b.png` |
| **Win**<br>Win story | <a href="thumbnails/win-a.png"><img src="web/thumbnails/win-a.webp" width="240" alt="Circles growing to the right, two sparks on the largest (a)"></a><br>`win-a.png` | <a href="thumbnails/win-b.png"><img src="web/thumbnails/win-b.webp" width="240" alt="Circles growing to the right, two sparks on the largest (b)"></a><br>`win-b.png` |
| **Use case**<br>Use case | <a href="thumbnails/use-case-a.png"><img src="web/thumbnails/use-case-a.webp" width="240" alt="Lobes inside a rounded frame with two sparks (a)"></a><br>`use-case-a.png` | <a href="thumbnails/use-case-b.png"><img src="web/thumbnails/use-case-b.webp" width="240" alt="Lobes inside a rounded frame with two sparks (b)"></a><br>`use-case-b.png` |
| **Paper**<br>Paper explained | <a href="thumbnails/paper-a.png"><img src="web/thumbnails/paper-a.webp" width="240" alt="Outlined circles and a spark (a)"></a><br>`paper-a.png` | <a href="thumbnails/paper-b.png"><img src="web/thumbnails/paper-b.webp" width="240" alt="Outlined circles and a spark (b)"></a><br>`paper-b.png` |
| **Model card**<br>Model card | <a href="thumbnails/model-card-a.png"><img src="web/thumbnails/model-card-a.webp" width="240" alt="A grid of shapes with one spark tile (a)"></a><br>`model-card-a.png` | <a href="thumbnails/model-card-b.png"><img src="web/thumbnails/model-card-b.webp" width="240" alt="A grid of shapes with one spark tile (b)"></a><br>`model-card-b.png` |
| **Release**<br>Release notes | <a href="thumbnails/release-a.png"><img src="web/thumbnails/release-a.webp" width="240" alt="Rising half circles with two sparks on the tallest (a)"></a><br>`release-a.png` | <a href="thumbnails/release-b.png"><img src="web/thumbnails/release-b.webp" width="240" alt="Rising half circles with two sparks on the tallest (b)"></a><br>`release-b.png` |
| **Leadership**<br>Leadership series | <a href="thumbnails/leadership-a.png"><img src="web/thumbnails/leadership-a.webp" width="240" alt="Half a brain in greys with two sparks (a)"></a><br>`leadership-a.png` | <a href="thumbnails/leadership-b.png"><img src="web/thumbnails/leadership-b.webp" width="240" alt="Half a brain in greys with two sparks (b)"></a><br>`leadership-b.png` |
| **Session**<br>AI Perspectives session | <a href="thumbnails/session-a.png"><img src="web/thumbnails/session-a.webp" width="240" alt="A small brain inside dotted orbits (a)"></a><br>`session-a.png` | <a href="thumbnails/session-b.png"><img src="web/thumbnails/session-b.webp" width="240" alt="A small brain inside dotted orbits (b)"></a><br>`session-b.png` |
| **Session**, continued | <a href="thumbnails/session-c.png"><img src="web/thumbnails/session-c.webp" width="240" alt="A small brain inside dotted orbits (c)"></a><br>`session-c.png` | <a href="thumbnails/session-d.png"><img src="web/thumbnails/session-d.webp" width="240" alt="A small brain inside dotted orbits (d)"></a><br>`session-d.png` |
| **Roundup**<br>Conference roundup | <a href="thumbnails/roundup-a.png"><img src="web/thumbnails/roundup-a.webp" width="240" alt="Scattered dots around a spark (a)"></a><br>`roundup-a.png` | <a href="thumbnails/roundup-b.png"><img src="web/thumbnails/roundup-b.webp" width="240" alt="Scattered dots around a spark (b)"></a><br>`roundup-b.png` |
| **Partner**<br>New partner | <a href="thumbnails/partner-a.png"><img src="web/thumbnails/partner-a.webp" width="240" alt="Two brain halves apart, a spark between (a)"></a><br>`partner-a.png` | <a href="thumbnails/partner-b.png"><img src="web/thumbnails/partner-b.webp" width="240" alt="Two brain halves apart, a spark between (b)"></a><br>`partner-b.png` |
| **Awards**<br>ThinkLatent quarterly awards | <a href="thumbnails/awards-a.png"><img src="web/thumbnails/awards-a.webp" width="240" alt="Sparks and lobes on green glass (a)"></a><br>`awards-a.png` | <a href="thumbnails/awards-b.png"><img src="web/thumbnails/awards-b.webp" width="240" alt="Sparks and lobes on green glass (b)"></a><br>`awards-b.png` |

## Product tiles

At 4:3, for Quick links in the Tiles layout and the Hero web part's tiles.

| Picture | File | Use |
| --- | --- | --- |
| <img src="web/tiles/tlm.webp" width="240" alt="Large brain mark on quiet glass"> | [TLM](tiles/tlm.png) | The TLM product card and its Hero tile |
| <img src="web/tiles/portal.webp" width="240" alt="A grid of rounded tiles, one holding a spark"> | [ThinkLatent Portal](tiles/portal.png) | The portal card until real screens replace it |
| <img src="web/tiles/tl-index.webp" width="240" alt="Dots placed along five lines, one a spark"> | [TL Index](tiles/tl-index.png) | The TL Index tile |
| <img src="web/tiles/responsible.webp" width="240" alt="Lobes inside a rounded frame"> | [How we build responsibly](tiles/responsible.png) | The governance card |
| <img src="web/tiles/bring-a-problem.webp" width="240" alt="Circles with a spark inside a dotted ring"> | [Bring us a problem](tiles/bring-a-problem.png) | The ask on Wins and Home |
| <img src="web/tiles/outcomes.webp" width="240" alt="Circles growing to the right in teal"> | [Outcomes](tiles/outcomes.png) | The proof panel and win round-ups |

## Patterns

Optional: at most one a page, behind a section with little text, never behind a hero or the closing band.

| Picture | Files | Background |
| --- | --- | --- |
| <img src="web/patterns/dots.webp" width="320" alt="Small green and grey dots"> | **Dots**: [tile SVG](patterns/dots-tile.svg), [tile PNG](patterns/dots-tile.png), [2880 × 1200](patterns/dots-2880x1200.png) | White |
| <img src="web/patterns/sparks.webp" width="320" alt="Small sparks"> | **Sparks**: [tile SVG](patterns/sparks-tile.svg), [tile PNG](patterns/sparks-tile.png), [2880 × 1200](patterns/sparks-2880x1200.png) | Mint rise, #E6F2EC |
| <img src="web/patterns/rings.webp" width="320" alt="Thin rings"> | **Rings**: [tile SVG](patterns/rings-tile.svg), [tile PNG](patterns/rings-tile.png), [2880 × 1200](patterns/rings-2880x1200.png) | Lagoon, #E3F0EF |
| <img src="web/patterns/lace.webp" width="320" alt="Fine linked circles"> | **Lace**: [tile SVG](patterns/lace-tile.svg), [tile PNG](patterns/lace-tile.png), [2880 × 1200](patterns/lace-2880x1200.png) | White, at the lowest contrast |
| <img src="web/patterns/halves.webp" width="320" alt="Half circles in rows"> | **Halves**: [tile SVG](patterns/halves-tile.svg), [tile PNG](patterns/halves-tile.png), [2880 × 1200](patterns/halves-2880x1200.png) | Mint rise, #E6F2EC |

## Logo

The design kit's two candidate marks, from its design/marks. The site uses the brain until the kit chooses.

| Picture | Files | Use |
| --- | --- | --- |
| <img src="../logo/brain-full-colour-256.png" width="96" alt="Brain mark, full colour"> | `../logo/brain-full-colour-64.png`, `-256`, `-512`, `.svg`, `-trimmed.svg` | Full colour on white, off-white or black; the SharePoint site logo |
| <img src="../logo/site-logo-thumbnail-white-tile-256.png" width="96" alt="Brain mark on a white square"> | `../logo/site-logo-thumbnail-white-tile-64.png`, `-256` | The SharePoint site logo thumbnail |
| <img src="../logo/site-logo-thumbnail-deep-tile-256.png" width="96" alt="Brain mark, white tonal, on deep forest"> | `../logo/brain-white-tonal-*.png`, `.svg`; on a square: `../logo/site-logo-thumbnail-deep-tile-*.png` | On deep forest, teal, green, red or any other colour; on a photo only inside a dark tile |
| <img src="../logo/alternate/two-sparks-256.png" width="96" alt="Two-spark mark"> | `../logo/alternate/two-sparks-*` | The kit's other candidate, on white only, until the kit chooses |
