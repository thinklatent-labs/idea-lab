# Defect DK-001 · `@kit/charts` is specified but not built

**Raised** 7 Nov 2026 by the TL-003 portal session, for the TL-013 design-kit session
**Severity** Blocker for TL-003 portal. Portal work, including the v6 batch 2 redraw, is paused until this ships (Head of ThinkLatent, 7 Nov).
**Kit version** design-kit v0.3.0 (efd0a0f)
**Owner** Kit lead (Claude), in the TL-013 chat

## What is wrong

The kit's README and changelog list `@kit/charts` as a package. It is meant to be ChartFrame (title, caption, source, legend, view-as-table toggle, labelled thresholds) around ECharts wrappers: bar and stacked bar, scatter with thresholds, line, heatmap, funnel, small multiples, sparkline, and distribution with whiskers.

In the repository, `packages/charts/` holds only `package.json` and `src/README.md`. No component, no export, no test and no playground page exists. `@kit/kit` has small charts (Sparkline, Bars, DotGrid, PillarStrip, DotField) and nothing larger.

## Why it blocks the portal

Every evaluation, training and operations page in the portal needs at least one of these charts, and the portal imports only from the kit (decision: always wrap, 7 Nov):

| Portal page | Chart it needs |
| --- | --- |
| Evaluation results; models and canary; checkpoints; approval | **Forest plot of paired differences**: one row per pillar, the difference as a dot, its interval as a bar, zero line, verdict as glyph plus word |
| Evaluation results; leaderboard | **Distribution with whiskers** per pillar or model |
| Traffic, latency and errors; runs in flight (loss); capacity | **Line with labelled thresholds** (SLO, bars), p50 and p95 as separate series, forecast as hatching |
| Governance portfolio; request heatmap | **Heatmap** with a word legend |
| Projects portfolio; index by business line | **Small multiples** |
| Every chart | **ChartFrame** with view-as-table, so every chart has an accessible twin |

## Expected

The specification in `packages/charts/src/README.md`, built and exported, and held to the kit's rules:

- Flat grey series by default; the active series is the only one with weight (hatched fill, lit top edge).
- Targets as dashed labelled lines; ranges and forecasts as hatching.
- One dark tooltip that lists every series.
- SVG renderer by default; `aria.enabled` and `aria.decal.show` on.
- No gauges or donuts for anything compared.
- Colours from tokens only, following theme changes. Light and dark both pass AA.
- Numbers through the number rule: whole percent, ± in points, differences as "+5 pts ± 2".
- Licence: ECharts is Apache-2.0, which is allowed.

## Acceptance

1. `@kit/charts` exports at least `ChartFrame`, `LineChart` (thresholds, multiple series, hatched forecast), `ForestPlot` (paired differences), `Distribution` (whiskers), `Heatmap` and `SmallMultiples`. Every chart has view-as-table.
2. Tests render each chart from fixtures taken from the portal's scenario (`thinklatent-labs/portal`, `packages/scenario/out/scenario.json`). For example, run 1183 against 1162:
   - Quality: +5 pts ± 1 · Better, 1,186 shared items.
   - Pillars: financial data processing +4 ± 2, client care +8 ± 2, compliance +4 ± 2, safety and grounding +4 ± 2 (all Better).
   - The forest plot must draw these exactly, and the table view must read them back.
3. The playground has a Charts page in both modes, and the host check passes. The network audit stays at zero external requests.
4. A changeset bumps the kit to v0.4.0 and records the release in the changelog. The portal pins to that tag.
5. The defect is closed in TL-013's register row with a decision line, and one line goes to TL-003's next step to say the portal can resume.

## Also asked of the same session (portal needs, not part of this defect's acceptance)

The portal decided on 7 Nov to wrap every vendored component in `@kit/kit` before use, and to use hold-to-confirm for one-way doors. The wrappers it will need first, from `claude/ThinkLatent Portal (portal) - Kit component map.md`, section 4:

- `InfoTip`
- `SectionBar`
- `Steps` (origin stepper)
- `Timeline` (origin timeline)
- `DataTable` (origin tables on TanStack)
- `HoldToConfirm` (kokonut hold button)

The design-kit session decides whether these ship with v0.4.0 or after it.
