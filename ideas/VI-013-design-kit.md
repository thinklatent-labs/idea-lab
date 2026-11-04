---
id: VI-013
slug: design-kit
title: "VI design kit and design language — tokens, an accessible component kit, chart and grid conventions, fonts and icons, shared by every VI product; the VI Portal is the first consumer and proving ground"
aliases: []
type: Capability
parent: null
themes: ["T-001"]
stage: "Shaping"
stage_since: null
horizon: "H1"
stream: null
appetite_weeks: null
appetite_ends: null
owner: "Head of VI (sponsor); kit core team of two to three to be named"
score: null
score_status: none
doc_url: "https://claude.ai/artifact/UyE1iU6au9kWBcVRoyangw"
standard: "v1"
last_touched: 2026-11-03
sensitivity: none
critique_recorded: null
next_step: "In the VI-013 chat: Jithin reviews the three kit screens and rules on 'below target' (below the target, or by more than the interval); then compact density and the AA contrast run to close H2, decision 3 (ECharts) to unblock the large-chart wrapper, Storybook; Jithin, when he has access: verify the colour system against the brand guide and the logo tones; branch protection when a third person joins; then decisions 1 and 4 and inventory from row 31"
next_step_due: null
---

# VI design kit and design language — tokens, an accessible component kit, chart and grid conventions, fonts and icons, shared by every VI product; the VI Portal is the first consumer and proving ground

<!-- generated:start -->
## Lab record

**VI-013 design-kit** · Capability · Shaping (idea card 2026-11-02; decision 2 taken: shadcn on Base UI, not forked; inventory of 85 components with rows 1 to 30 decided; decisions 1, 3, 4 and row 7 open) · H1

Owner: Head of VI (sponsor); kit core team of two to three to be named. Appetite: not set. Score: not scored .

Next step: In the VI-013 chat: Jithin reviews the three kit screens and rules on 'below target' (below the target, or by more than the interval); then compact density and the AA contrast run to close H2, decision 3 (ECharts) to unblock the large-chart wrapper, Storybook; Jithin, when he has access: verify the colour system against the brand guide and the logo tones; branch protection when a third person joins; then decisions 1 and 4 and inventory from row 31

Production surface: not named (reads as an H3 experiment).

Governance: not recorded.

### Decisions due
_None._

### Hypotheses
_None recorded._

### Kill signals
_None recorded._

### Open questions
_None recorded._

### Links
| Link | To | Note |
| --- | --- | --- |
| enables | VI-003 vi-portal | One look and one accessibility baseline across VI products; demand count starts at three |
| enables | VI-007 lab-dashboard | One look and one accessibility baseline across VI products; demand count starts at three |
| enables | VI-010 blueprints | One look and one accessibility baseline across VI products; demand count starts at three |
| reuses | Open source, to be decided at Shaping: shadcn/ui on React Aria Components or Salt DS | Permissive licences only; flags in the brief (axe-core MPL, Pa11y LGPL, Atlassian licence, Highcharts behind Salt charts) |
| reuses | DTCG tokens with Style Dictionary | Permissive licences only; flags in the brief (axe-core MPL, Pa11y LGPL, Atlassian licence, Highcharts behind Salt charts) |
| reuses | Apache ECharts or Recharts | Permissive licences only; flags in the brief (axe-core MPL, Pa11y LGPL, Atlassian licence, Highcharts behind Salt charts) |
| reuses | TanStack Table | Permissive licences only; flags in the brief (axe-core MPL, Pa11y LGPL, Atlassian licence, Highcharts behind Salt charts) |
| reuses | Inter | Permissive licences only; flags in the brief (axe-core MPL, Pa11y LGPL, Atlassian licence, Highcharts behind Salt charts) |
| reuses | Lucide | Permissive licences only; flags in the brief (axe-core MPL, Pa11y LGPL, Atlassian licence, Highcharts behind Salt charts) |

### Artifacts
| Artifact | Kind | In this repo | Live | Exported |
| --- | --- | --- | --- | --- |
| VI design kit (design-kit) — Idea card: Design DNA | doc | [artifacts/VI-013-design-kit/design-dna.md](../artifacts/VI-013-design-kit/design-dna.md) | [claude.ai](https://claude.ai/artifact/UyE1iU6au9kWBcVRoyangw) | 2026-11-04 |
| VI design kit (design-kit) — Idea card: Idea card | doc | [artifacts/VI-013-design-kit/idea-card.md](../artifacts/VI-013-design-kit/idea-card.md) | [claude.ai](https://claude.ai/artifact/UyE1iU6au9kWBcVRoyangw) | 2026-11-04 |
| VI design kit (design-kit) — Idea card: Inventory | doc | [artifacts/VI-013-design-kit/inventory.md](../artifacts/VI-013-design-kit/inventory.md) | [claude.ai](https://claude.ai/artifact/UyE1iU6au9kWBcVRoyangw) | 2026-11-04 |
| VI design kit — kit-test screens v3 (Steel on Graphite) | design | [artifacts/VI-013-design-kit/kit-test-screens-v3/project/canvas.json](../artifacts/VI-013-design-kit/kit-test-screens-v3/project/canvas.json) | [claude.ai](https://claude.ai/artifact/U3eDnJ7sLzNb6AvBhA92up) | 2026-11-04 |
| scout-brief-design-kit.md | brief | [artifacts/VI-013-design-kit/scout-brief-design-kit.md](../artifacts/VI-013-design-kit/scout-brief-design-kit.md) | [claude.ai](project-knowledge:claude/scout-brief-design-kit.md) | 2026-11-04 |

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-049 | 2026-11-02 | Design kit and design language split out of VI-003 as its own idea (a capability for every VI product), registered at Seed with a scout brief and a recommendation; the VI Portal is its first consumer; decisions deferred to its own chat | Jithin (split); thinking partner (registration) | accepted |
| D-050 | 2026-11-02 | Moved to Shaping with an idea card: H1 (the kit pays for itself by the second consumer), H2 (owned code beats Salt in the pre-registered kit test), H3 (the ten principles hold on the 20 portal screens); five decisions queued with recommendations (settle the enterprise-system question first; run the kit test; ECharts; one engineer plus a coding agent as the core, VI-007 second; Design System artifact after the test); appetite of four engineer-weeks proposed. Thin point named: the cost the kit saves is unmeasured | Thinking partner, pending Jithin | proposed |
| D-052 | 2026-11-02 | Decision 2: owned kit on shadcn/ui with Base UI (thinking partner had recommended React Aria; React Aria Table kept as a grids-only fallback in H2). shadcn code not forked: generated files in packages/ui re-pulled from upstream, VI's tokens, theme, variants and blocks in packages/vi-kit. Inventory rows 1 to 30 decided; against the recommendation on row 3 (density toggle for everyone), row 8 (sidebar by object), row 12 (detail pane on any page), row 25 (trees for every object group). Row 7 app shell: dock-style collapsed sidebar, pending Jithin's example | Jithin | accepted |
| D-069 | 2026-11-03 | Design DNA v0 adopted as the target the kit is built towards (layout from the web-application references, look and feel from the glass and Quarn references, colour deferred); glass accepted as a surface level for the shell, overlays and the engineering world, never the content plane; the kit test fixed as Portal home, the VGLM4 Core model record and usage approval UA-0291; no RTL or locale work; the vi-kit repo to be created in thinklatent-labs once the palette and decisions 1, 3 and 4 land | Jithin | accepted |
| D-077 | 2026-11-03 | Shell D everywhere (C2 dropped: a permanent bottom bar blocks every table); the six-teal palette adopted and mapped by job in tokens, components use roles only; warning and critical status hues left open rather than invented from the palette; glass confirmed as core DNA in both modes with reflective backdrops | Jithin | accepted |
| D-078 | 2026-11-03 | Six-teal palette dropped; bases fixed as white (light) and black (dark); palette derived from Vanguard's own colours with an emerald accent and the brand red reserved for the VI tile and critical; status hues set; applied to all fourteen boards, tokens v2 and the repo. Verify against the official brand guide before shipping | Jithin | accepted |
| D-079 | 2026-11-03 | Dark mode is black, nothing else; light palette provisionally Steel on Graphite (to revisit); glass references adopted: Apple Liquid Glass, Framer, Vercel, Reflect, Raycast, Mercury; glass lands on shadcn via tokens, data-slot styles and vi-kit variants, never by editing generated files | Jithin | accepted |
| D-080 | 2026-11-04 | v4 is the look (command center, pill nav, dock D); VI colour system v1 adopted: VI Green brand, Sea Teal companion, Vanguard Red #C4262E as the decision colour, off-white light, black dark; vi-kit repo live on GitHub with the tokens and artboards | Jithin | accepted |
| D-084 | 2026-11-04 | shadcn on Base UI is in the vi-kit codebase via the CLI; tokens, theme map, glass layer and first VI components landed; the command center runs on the kit in both modes; the kit test is drafted by the thinking partner for the team to critique | Jithin | accepted |
| D-086 | 2026-11-04 | Kit test built as code: the three screens run on vi-kit in both modes; H2 has first evidence (Base UI at comfortable density renders all three), compact density and AA contrast still open | Jithin | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._
