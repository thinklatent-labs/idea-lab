<!-- Exported from Idea Lab project knowledge (claude/scout-brief-design-kit.md, created 2026-11-02T09:41:48.545148Z) on 2026-11-04. Read-only mirror; edit the project doc, not this file. -->
# Scout brief — VI design kit and design language (VI-013 design-kit)

2026-11-02 · Scout mode (deep research, launched from the VI-003 vi-portal session; registered as its own idea at Jithin's request so the kit can serve every VI product). Stage: Seed. Status of claims: ✅ verified against a 2025–2026 primary source in the research pass; ⚠️ from established knowledge, confirm in the repo LICENSE before procurement.

## Why a separate idea

The VI Portal sketch (VI-003, 20 screens) already carries an implicit design language: Inter, an 8 px spacing scale, 12 px radii, one accent, a neutral scale, headline tiles of at most four numbers, one primary exhibit per page, honest placeholders `[—]`, intervals written as one unit, states instead of greyed buttons, an engineering view as a layer. Making that explicit as tokens and a component kit gives the portal, the blueprints (VI-010), the lab dashboard (VI-007) and any future VI product one look and one accessibility baseline. The portal is the first consumer and the proving ground.

## Recommendation (to be decided in VI-013's own Shaping chat)

**Primary: an owned-code kit ("VI Kit") in the shadcn/ui style, on accessible headless primitives (React Aria Components, or Base UI where a component only exists there), styled from DTCG tokens built by Style Dictionary, published as one versioned inner-source package. TanStack Table for grids; Apache ECharts for the primary exhibits; Inter and Lucide.**

**Alternative: J.P. Morgan's Salt Design System as a dependency kit** — the closest open-source match for financial-services density and governance, with two catches: its high density fails WCAG 2.2 AA target size by its own documentation (use medium for compact engineering tables), and its charts package depends on commercial Highcharts.

**Either way:** if an enterprise design system already exists at Vanguard, its primitives (colour ramps, type scale, spacing) become the primitive token tier; the kit adds only semantic and component tiers, and enterprise components take the chrome (navigation, headers, forms) while VI Kit takes the data surfaces.

Why owned code for a 45-person inner-source organisation: the portal's distinctive needs — intervals as first-class values, unmeasured placeholders, a dual-audience engineering toggle, governed records — have no off-the-shelf answer, so a dependency kit would be wrapped or overridden across most of its visible surface anyway. Own the styling, depend on the behaviour (focus management, grid keyboard models, screen-reader announcements stay upstream). Cost: the team owns visual quality and regression; budget a core of two to three people.

## What changed in 2025–2026 (older comparisons are stale)

- shadcn/ui made Base UI its default primitive library in July 2026 and added React Aria as a third base the same month; Radix is supported but no longer default ✅. `shadcn eject` (May 2026) and GitHub registries (June 2026) exist ✅.
- Shopify archived Polaris React on 1 October 2025 ✅ — do not adopt.
- Perspective left FINOS for the OpenJS Foundation with v4.0.0; packages moved to `@perspective-dev/*` ✅.
- MUI went to v9 in April 2026 ✅.
- The Design Tokens (DTCG) format reached its first stable version, 2025.10, on 28 October 2025 ✅ — a W3C Community Group report, not a W3C Recommendation. Style Dictionary v5.7.0 (16 Oct 2026) supports it in part; full 2025.10 support is still open ✅.
- Salt DS `@salt-ds/core` 1.74.0 released 28 Oct 2026; release train of two weeks or faster ✅.

## Component kits

| Kit | Licence | Activity | Figma kit | Theming | Density / dark | Accessibility | Data-dense parts | Borrow | Gap |
|---|---|---|---|---|---|---|---|---|---|
| shadcn/ui (Base UI / React Aria / Radix + Tailwind) | MIT ⚠️ | monthly changelog ✅ | community kits ⚠️ | CSS variables, Tailwind v4 `@theme` | dark yes; no density system | inherited from primitives | Data Table recipe (TanStack), Sidebar, Badge, Trace component | owned-code model, registry distribution, Trace | no density, no status semantics, no governance |
| Salt DS (J.P. Morgan) | Apache-2.0 ✅ | 1.74.0, 28 Oct 2026 ✅ | Figma Community libraries with variables ✅ (file licence unconfirmed) | CSS variables `--salt-*` | light/dark; low/medium/high + mobile (touch deprecated) ✅ | strong, but high density fails AA target size ✅ | AG Grid theme, charts (Highcharts), data-grid patterns | density model, financial patterns | charts tied to Highcharts; JPMC defaults |
| IBM Carbon | Apache-2.0 ⚠️ | v11.119.0, 21 Oct 2026 ✅ | official v11 Figma library ✅ | tokens, four themes, layering | light/dark | strong | DataTable, TreeView, Tag, Toolbar | data-vis guidelines, status-indicator pattern, layering tokens | IBM look, Plex coupling |
| GitHub Primer | MIT ⚠️ | active ⚠️ | Primer Web Figma with variables ⚠️ | primitives → functional tokens | light, dark, high-contrast, colour-blind themes | strong | DataTable, TreeView, StateLabel | colour-blind themes; state labels with icon + text | tuned for GitHub |
| Adobe React Aria Components / Spectrum | Apache-2.0 ⚠️ | RAC v1.22, Oct 2026 ✅ | Spectrum 2 kit; RAC unstyled | unstyled | yours to build | best-in-class keyboard, screen reader, i18n | Table (sort, select, resize, expandable rows), Tree with drag-and-drop ✅ | use as the primitive layer | needs a visual layer |
| Mantine | MIT ✅ | 9.7.0, 6 Oct 2026 ✅ | community | CSS variables; status colour variables (9.4) | light/dark; no global density | good | Tree; no core grid | hooks, status colour variables | opinionated styling |
| MUI Material UI | MIT ⚠️ | v9.5.0, 9 Oct 2026 ✅ | official kit is paid ⚠️ | CSS variables, colour schemes | dark; Data Grid density prop | HighContrast enhancer (9.1) ✅ | grid and tree in MUI X (open core) | Data Grid density model | Material look; advanced grid commercial |
| Ant Design | MIT ⚠️ | 6.6.7, 20 Oct 2026 ✅ | official kit ⚠️ | CSS-in-JS tokens, algorithms | dark and compact algorithms | mixed record ⚠️ | Table with tree data, Tree, Descriptions | compact algorithm as a token transform | heavy visual opinion |
| Microsoft Fluent UI v9 | MIT ✅ | 9.74.11, 26 Oct 2026 ✅ | Fluent 2 Web kit with variables ⚠️ | theme tokens | light/dark/high contrast | strong | DataGrid, Table, Tree | high-contrast handling | Microsoft look; Griffel |
| GOV.UK / USWDS | MIT code, OGL content / CC0 | active | community | Sass / tokens | none / limited | very strong, research-backed | tables, summary lists, tags | content and pattern guidance | not React; not data-dense |
| Atlassian DS | restrictive ADS licence ✅ | active | official | `@atlaskit/tokens` | light/dark | strong guidance | DynamicTable, Lozenge | read the guidance only | licence risk |
| Chakra v3 / Park UI / Ark / Headless UI | MIT ⚠️ | — | mixed | recipes / Panda | colour modes | good (Ark on Zag) | thin | recipe variants, state-machine primitives | thin data components; small communities |

Do not choose: Atlassian (licence), Polaris React (archived), MUI or Ant as the base (heavy opinion; advanced grid commercial), Carbon as a dependency (IBM visual language and Plex coupling) — borrow Carbon's guidance instead.

## Token architecture

- **Format:** DTCG 2025.10 `.tokens.json` (`$value`, `$type`, `$description`, `$extensions`, `$deprecated`, aliases; a Resolver format for theming and density modes without combinatorial explosion).
- **Tiers:** primitive (colour ramps, type scale, spacing, radii — inherited from an enterprise system if one exists) → semantic (`surface.*`, `text.*`, `border.*`, single `accent.*`, `status.{good|warning|critical|info|neutral}.{fg|bg|border|icon}`, `data.placeholder.*`, `data.interval.*`, `exhibit.sequential.*`, `exhibit.diverging.*`, `density.{comfortable|compact}.*`) → component (`table.row.height`, `tile.padding`).
- **Build:** Style Dictionary v5 (Apache-2.0; pin the version, validate in CI) into CSS custom properties per theme and density, a Tailwind v4 `@theme` file, a TypeScript map, an ECharts theme object, and a Figma-importable DTCG file. Terrazzo is a credible second option.
- **Sync, code-first:** Git is the source of truth; designers propose token changes as pull requests or through Tokens Studio's GitHub sync; CI validates against the DTCG schema, runs contrast checks on every status and text pair, publishes `@vi/tokens`, and writes the Figma-format files imported as variable collections (modes: light/dark; comfortable/compact). Figma has imported and exported DTCG JSON natively since November 2025, but its export reportedly drops `$description` — one more reason to keep Git as the source. Tokens Studio's plugin is MIT; themes and multi-file sync need its Pro licence.

## Charts and grids

- **Apache ECharts 6.x (Apache-2.0)** wrapped as `@vi/charts`: heatmap/matrix, stacked bars, scatter with `markLine` thresholds, funnel, small multiples; canvas/SVG renderer switch; `aria.enabled` generates descriptions; `aria.decal.show` applies pattern fills as a secondary representation of colour ✅. Theme it from the token build.
- **Recharts 3 (MIT)** as the React-native SVG alternative: accessibility layer on by default from 3.0 ✅; weak at heatmaps, no pattern fills. shadcn/ui charts sit on Recharts.
- Rules regardless of library: every exhibit has a "view as table" toggle on the same data; SVG renderer by default; threshold lines carry a text label.
- **Grid:** TanStack Table (MIT) as the headless engine rendered with React Aria Table/Grid semantics; TanStack Virtual for long trace lists; density from row-height tokens. Escalation: AG Grid Community (MIT ✅) — grouping, pivoting, Excel export, tree data are Enterprise-only under a commercial EULA. Perspective (Apache-2.0) suits an engineering-only "explore traces" panel. Glide Data Grid is canvas-rendered, harder to evidence for AA.

## Fonts and icons

- **Inter (OFL-1.1 ✅)**, variable, tabular figures via `tnum`; set `font-variant-numeric: tabular-nums` on every numeric column, tile and interval. Alternatives: Public Sans, IBM Plex Sans, Source Sans 3, Geist (OFL ⚠️; confirm `tnum`). Monospace for ids, hashes and traces: JetBrains Mono or IBM Plex Mono (OFL ⚠️); ligatures off in data contexts.
- **Lucide (ISC ✅)**, `lucide-react` 1.66.0, `currentColor`, shadcn's default. Alternatives: Phosphor, Tabler, Heroicons, Radix Icons (MIT ⚠️), Material Symbols (Apache-2.0 ⚠️). One set; a fixed glyph per status: good = check-circle, warning = triangle, critical = octagon or x-circle, info = i-circle, neutral = dash-circle.

## Ten design-language principles (each with what it borrows from)

1. Never let colour carry meaning alone — colour plus icon shape plus text label; series get decals, line styles or direct labels (WCAG 2.2 SC 1.4.1; Carbon status indicators; ECharts decals).
2. One question per page, one primary exhibit — at most four headline tiles, one exhibit, one secondary list, in that reading order (GOV.UK "one thing per page"; dashboard guidance on leading with the key metric ⚠️).
3. Density is a mode, not a different design — comfortable by default, compact opt-in through the engineering view; only spacing and size tokens change, never hierarchy (Salt density foundations, including its AA warning).
4. Show uncertainty wherever you show a score — `0.82 ± 0.03` as one unit; whiskers or bands in charts (Carbon data-vis ⚠️; uncertainty-visualisation research ⚠️).
5. Unmeasured is not zero — one explicit placeholder with a reason, styled unlike 0, null or error; excluded from aggregates and said so (GOV.UK content guidance; USWDS tables ⚠️).
6. Align numbers so they can be compared — tabular figures, right-aligned, units in headers, fixed decimals per column (Inter `tnum`; Carbon tables ⚠️).
7. Every governed record shows who, what, when and why — latest decision in the business view, full history and traces behind the engineering toggle (Salt financial patterns ⚠️; Primer timeline and state labels ⚠️).
8. Plain language first, jargon behind disclosure — labels as outcomes, definitions in tooltips or the engineering view (GOV.UK content design; Atlassian content guidance, read only).
9. Thresholds are content, not decoration — every threshold states its value and source policy in text and appears in a threshold table (Carbon annotation guidance ⚠️; ECharts `markLine` labels).
10. Accessible by default and evidenced — keyboard, screen-reader and contrast tests in Storybook for every component; a table alternative for every chart; WCAG 2.2 AA including 2.5.8 target size (USWDS ⚠️; Recharts 3 defaults; React Aria).

## Risks and licence flags

| Item | Flag | Action |
|---|---|---|
| axe-core | MPL-2.0, file-level copyleft (an open issue questions the Exhibit B text) | fine as an unmodified dev or test dependency; legal sign-off; never vendor modified files |
| Pa11y | LGPL-3.0-only ✅ | CI tool only, not bundled; or prefer axe via Storybook / Playwright |
| Atlassian DS | restrictive licence; ADG-licensed assets | guidance only; do not install |
| Salt `@salt-ds/charts` | depends on commercial Highcharts | avoid, or license Highcharts |
| Salt high density | fails WCAG 2.2 AA target size (per Salt) | medium or low only |
| AG Grid Enterprise, MUI X Pro/Premium | commercial EULAs | procurement decision; stay on Community APIs unless licensed |
| Tokens Studio Pro | paid for themes and multi-file sync | not needed with Git + Style Dictionary + Figma native import |
| Chromatic, Zeroheight, Supernova | commercial SaaS | optional; Playwright screenshots, Storybook Docs or Docusaurus are the open route |
| Polaris React | archived | exclude |
| Perspective scope change | `@finos/*` frozen at 3.8.0 | use `@perspective-dev/*` |
| shadcn primitive churn | default moved Radix → Base UI in 2026 | pin the base (React Aria) explicitly |
| DTCG / Style Dictionary maturity | 2025.10 support partial; not a W3C Recommendation | pin versions; validate in CI |
| Owned-code maintenance load | the team owns visual bugs and regressions | staff a core team; visual regression mandatory |

## Operations of the kit

Storybook (MIT ⚠️) as the living kit with the a11y addon; Playwright screenshot tests for visual regression; Changesets for semver and changelogs; Storybook Docs or Docusaurus for documentation; a governance page modelled on Carbon's (independent semver per package, two-week release train with RCs, contribution tiers fix / enhance / new component, deprecation with `$deprecated` in tokens and `@deprecated` in code, one minor of warnings, removal in the next major, named core-team review).

## Open questions for the Shaping chat (owner: Head of VI unless named)

1. Does Vanguard have an enterprise design system the kit must inherit from? This decides the primitive tier and the chrome.
2. Owned code (shadcn on React Aria) or dependency (Salt)? Pre-registered test: build the VI Portal's Overview and Record pages both ways in Storybook; the kit that reaches WCAG 2.2 AA at comfortable and compact density with less than a day of override work wins.
3. Chart library: ECharts (one library, decals, heatmaps) or Recharts 3 (React-native SVG, weaker heatmaps)?
4. Who owns the kit — a named two-to-three-person core — and which product is second after the portal (lab dashboard VI-007, blueprints VI-010)?
5. Record the language as a Design System artifact so every future screen on the canvas inherits it, then re-skin the VI Portal sketch with it to see how the language holds.

## Caveats

Items marked ⚠️ were not checked against a 2025–2026 source in this pass. The Salt Figma Community file licence could not be read. Whether the MUI, Ant, Mantine, Chakra and Radix Figma kits use Figma variables is unconfirmed. List prices (AG Grid Enterprise, MUI X) change; confirm at procurement. Nielsen Norman Group dashboard and table articles are partly paywalled and were not fetched.

## Links to look at (the shortest tour: Salt and shadcn side by side, then ECharts)

Component kits: shadcn/ui https://ui.shadcn.com · Salt https://www.saltdesignsystem.com/salt/index (components https://www.saltdesignsystem.com/salt/components · density https://www.saltdesignsystem.com/salt/foundations/density · Figma https://www.figma.com/community/file/1461377800307374372/salt-ds-components-and-patterns) · Carbon https://carbondesignsystem.com · Primer https://primer.style · React Aria https://react-aria.adobe.com · Mantine https://mantine.dev · MUI https://mui.com · Ant Design https://ant.design · Fluent UI https://github.com/microsoft/fluentui · GOV.UK https://design-system.service.gov.uk · USWDS https://designsystem.digital.gov · Atlassian (guidance only) https://atlassian.design

Charts and grids: ECharts https://echarts.apache.org (aria https://echarts.apache.org/handbook/en/best-practices/aria/) · Recharts https://github.com/recharts/recharts · Observable Plot https://observablehq.com/plot · visx https://airbnb.io/visx · Nivo https://nivo.rocks · Vega-Lite https://vega.github.io/vega-lite · TanStack Table https://tanstack.com/table · AG Grid https://www.ag-grid.com (Community EULA https://www.ag-grid.com/eula/community/) · Perspective https://github.com/perspective-dev/perspective

Tokens: DTCG https://www.designtokens.org (stable-version note https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/) · Style Dictionary https://github.com/style-dictionary/style-dictionary · Tokens Studio https://docs.tokens.studio · Terrazzo https://npmx.dev/package/@terrazzo/cli

Fonts and icons: Inter https://rsms.me/inter/ · IBM Plex https://github.com/IBM/plex · Public Sans https://github.com/uswds/public-sans · JetBrains Mono https://github.com/JetBrains/JetBrainsMono · Lucide https://lucide.dev · Phosphor https://phosphoricons.com · Tabler https://tabler.io/icons

Governance and accessibility tooling: axe-core https://github.com/dequelabs/axe-core · Pa11y https://github.com/pa11y/pa11y · Storybook https://storybook.js.org · Playwright https://playwright.dev · Changesets https://github.com/changesets/changesets · WCAG 2.2 https://www.w3.org/TR/WCAG22/

Verified-source changelogs and releases: shadcn changelog https://ui.shadcn.com/docs/changelog (Base UI default https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default) · Salt releases https://github.com/jpmorganchase/salt-ds/releases · Carbon releases https://github.com/carbon-design-system/carbon/releases · Mantine 9.7.0 https://mantine.dev/changelog/9-7-0/ · MUI v9 https://mui.com/blog/introducing-material-ui-v9/ · Ant Design changelog https://ant.design/changelog/ · Fluent UI 9.74.11 https://github.com/microsoft/fluentui/releases/tag/%40fluentui/react-components_v9.74.11 · React Aria 1.22 https://react-aria.adobe.com/releases/v1-22-0 · Style Dictionary 5.7.0 https://github.com/style-dictionary/style-dictionary/releases/tag/v5.7.0 · Recharts 3.0 https://github.com/recharts/recharts/releases/tag/v3.0.0 · Perspective to OpenJS https://github.com/perspective-dev/perspective/discussions/3077 · Polaris archive https://github.com/Shopify/polaris-react-archive · Atlassian licence https://atlassian.design/license · Tokens Studio Pro https://github.com/tokens-studio/tokens-studio-for-figma-plugin-docs/blob/main/get-started/pro-licence.md · Inter tnum https://github.com/rsms/inter/discussions/813 · lucide-react https://www.npmjs.com/package/lucide-react · axe-core licence issue https://github.com/dequelabs/axe-core/issues/4695
