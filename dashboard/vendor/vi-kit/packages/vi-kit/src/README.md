# @vi/kit · what lives here

- `shells/` — `Shell` (D: dock inside the frame, top-anchored), one component for light and dark; `NavItems` carries the active state and badges.
- `components/` — variants and wrappers over `packages/ui`: `StatusLabel` (glyph plus word, five tones), `Tile`, `KpiStrip`, `PlaceholderCell`, `ObjectCell`, `PersonCell`, `FilterBar`, `BulkActionBar`, `tone="glass"` and `tone="anchor"` variants on Card, Dialog, Popover, Sheet, Button, Tooltip.
- `blocks/` — the P0 set first: `PageHeader`, `MetaStrip`, `AgentChip`, `ProvenanceLine`, `TrustFooter`, `BriefCard`, `RecommendationCard`, `RecordHeader`, `EngineeringToggle`, `ChatHome`, `ContextPane`, `DraftCard`, `AgentEventLine`.
- `formatters/` — one library: numbers, intervals (`0.82 ± 0.03`), percentages, currency, durations, dates with zone, relative time, and the five placeholder reasons.
- `status-map.ts` — each product's words mapped to the five tones.

Rules: no hard-coded colour or spacing (the lint rule fails it); every block ships with its Storybook story, a11y run and screenshot test; glass resolves to opaque under `prefers-reduced-transparency` and compact density.

## How glass lands on shadcn without editing `packages/ui`

1. Semantic variables (`--background`, `--card`, `--popover`, `--border`, `--ring`, radii) are written by the token build per mode and density.
2. Glass is a set of properties, not a colour, so `vi-kit/styles/glass.css` targets shadcn's `data-slot` hooks: `[data-slot="popover-content"]`, `dialog-content`, `dropdown-menu-content`, `sheet-content`, `tooltip-content`, `command`, `sidebar` → `.vi-glass-overlay`. One stylesheet, every overlay.
3. Wrappers in `vi-kit` add a `surface` variant (`frame | content | raised | overlay | opaque`) with `cva`; blocks compose wrappers.
4. Rules: one visible glass layer at a time (a popover opened from the glass dock renders opaque); lens (SVG displacement) only on the dock and the command palette; `@supports not (backdrop-filter)`, `prefers-reduced-transparency` and compact density resolve to opaque; contrast over the worst backdrop is a CI test; the slot list is pinned by the kit test so a shadcn upgrade that renames a slot fails loudly.

## What exists now (2026-11-04)
- `Surface` with `surface="frame|content|raised|coloured|ink|opaque"`, the glass levels as one component.
- `Tile`: the VI tile atom (ring icon, round arrow, display number, sparkline slot).
- `Status` (glyph plus word, five tones) and `Interval` (`0.82 ± 0.03`, em dash with a reason when unmeasured).
- `styles/theme.css` maps shadcn's semantic variables to VI role tokens; `styles/glass.css` applies glass through `data-slot` hooks and defines the surface classes and fallbacks.
- Charts (`charts/spark.tsx`): `Sparkline`, `Bars` (solid measured, dashed projected), `DotGrid`, `PillarStrip` (below-target pillars go ink, with the decision colour on the bar). Token-themed SVG; the large-chart wrapper waits on decision 3 (ECharts).
- Blocks: `AgentBrief` (agent chip, confidence, basis, actions; coloured or content surface), `DataRows` (floating rows, no table chrome), `Facts`.
- `DotField`: the distribution hero (one dot per observation, target line, today ring).
Six screens run on these in `apps/playground`: `#home` (command center), `#models` (record), `#approvals` (decision), `#usecases` (Ask VI), `#conversation` (agent in the loop), `#evidence` (engineering view); `?dark` for the dark theme.
