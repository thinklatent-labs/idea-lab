---
id: TL-013
slug: design-kit
title: "ThinkLatent design kit and design language — tokens, an accessible component kit, chart and grid conventions, fonts and icons, shared by every ThinkLatent product; the ThinkLatent Portal is the first consumer and proving ground"
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
owner: "Head of ThinkLatent (sponsor); kit core team of two to three to be named"
score: null
score_status: none
doc_url: "https://claude.ai/artifact/UyE1iU6au9kWBcVRoyangw"
standard: "v1"
last_touched: 2026-11-07
sensitivity: none
critique_recorded: null
next_step: "Jithin: push the v0.1.0 tag from his laptop (git fetch origin && git tag -a v0.1.0 8653232 -m 'design-kit v0.1.0' && git push origin v0.1.0); this session's proxy blocks tag pushes. Then, in the TL-013 chat: build v0.2.0, the AgentConversation block in @kit/kit (D-138): ThinkLatent message type and AI SDK adapter first, then Meter, then the eight pieces with Radix moved to Base UI, demo copy stripped and markdown prefixes restricted; playground page with a scripted TLM exchange; checked headless in light and dark. Still open after that: Jithin rules on 'below target'; compact density and the AA contrast run to close H2; decision 3 (ECharts); colour system against the brand guide when he has access; branch protection when a third person joins; decisions 1 and 4 and inventory from row 31. Carried asks: the v6 pilot pieces from TL-003 (info tooltip, sticky section bar, stepper, timeline, light-surface agent chip, dark-tile tooltip, number rule); the Cortex blocks from TL-017; the dashboard wrappers and Jarvis panel from TL-007; the site's light system and the pattern generator from TL-016."
next_step_due: "2026-11-14"
---

# ThinkLatent design kit and design language — tokens, an accessible component kit, chart and grid conventions, fonts and icons, shared by every ThinkLatent product; the ThinkLatent Portal is the first consumer and proving ground

<!-- generated:start -->
## Lab record

**TL-013 design-kit** · Capability · Shaping (idea card 2026-11-02; decision 2 taken: shadcn on Base UI, not forked; look, navigation and colour system v1.1 fixed; the kit runs as code in the kit-test playground; every free component library vendored and reviewed in the component playground, 2026-11-05; open: decisions 1, 3, 4, H2's compact density and AA contrast run, inventory from row 31; 2026-11-07: first adoption set chosen (AgentConversation, eight pieces, ThinkLatent message type); v0.1.0 release commit 8653232, tag pending) · H1

Owner: Head of ThinkLatent (sponsor); kit core team of two to three to be named. Appetite: not set. Score: not scored .

Next step: Jithin: push the v0.1.0 tag from his laptop (git fetch origin && git tag -a v0.1.0 8653232 -m 'design-kit v0.1.0' && git push origin v0.1.0); this session's proxy blocks tag pushes. Then, in the TL-013 chat: build v0.2.0, the AgentConversation block in @kit/kit (D-138): ThinkLatent message type and AI SDK adapter first, then Meter, then the eight pieces with Radix moved to Base UI, demo copy stripped and markdown prefixes restricted; playground page with a scripted TLM exchange; checked headless in light and dark. Still open after that: Jithin rules on 'below target'; compact density and the AA contrast run to close H2; decision 3 (ECharts); colour system against the brand guide when he has access; branch protection when a third person joins; decisions 1 and 4 and inventory from row 31. Carried asks: the v6 pilot pieces from TL-003 (info tooltip, sticky section bar, stepper, timeline, light-surface agent chip, dark-tile tooltip, number rule); the Cortex blocks from TL-017; the dashboard wrappers and Jarvis panel from TL-007; the site's light system and the pattern generator from TL-016. (due 2026-11-14)

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
| enables | TL-003 portal | One look and one accessibility baseline across ThinkLatent products; demand count starts at three |
| enables | TL-007 lab-dashboard | One look and one accessibility baseline across ThinkLatent products; demand count starts at three |
| enables | TL-010 blueprints | One look and one accessibility baseline across ThinkLatent products; demand count starts at three |
| reuses | Open source, to be decided at Shaping: shadcn/ui on React Aria Components or Salt DS | Permissive licences only; flags in the brief (axe-core MPL, Pa11y LGPL, Atlassian licence, Highcharts behind Salt charts) |
| reuses | DTCG tokens with Style Dictionary | Permissive licences only; flags in the brief (axe-core MPL, Pa11y LGPL, Atlassian licence, Highcharts behind Salt charts) |
| reuses | Apache ECharts or Recharts | Permissive licences only; flags in the brief (axe-core MPL, Pa11y LGPL, Atlassian licence, Highcharts behind Salt charts) |
| reuses | TanStack Table | Permissive licences only; flags in the brief (axe-core MPL, Pa11y LGPL, Atlassian licence, Highcharts behind Salt charts) |
| reuses | Inter | Permissive licences only; flags in the brief (axe-core MPL, Pa11y LGPL, Atlassian licence, Highcharts behind Salt charts) |
| reuses | Lucide | Permissive licences only; flags in the brief (axe-core MPL, Pa11y LGPL, Atlassian licence, Highcharts behind Salt charts) |

### Artifacts
| Artifact | Kind | In this repo | Live | Exported |
| --- | --- | --- | --- | --- |
| ThinkLatent design kit (design-kit) — Idea card: Design DNA | doc | [artifacts/TL-013-design-kit/design-dna.md](../artifacts/TL-013-design-kit/design-dna.md) | [claude.ai](https://claude.ai/artifact/UyE1iU6au9kWBcVRoyangw) | 2026-11-04 |
| ThinkLatent design kit (design-kit) — Idea card: Idea card | doc | [artifacts/TL-013-design-kit/idea-card.md](../artifacts/TL-013-design-kit/idea-card.md) | [claude.ai](https://claude.ai/artifact/UyE1iU6au9kWBcVRoyangw) | 2026-11-06 |
| ThinkLatent design kit (design-kit) — Idea card: Inventory | doc | [artifacts/TL-013-design-kit/inventory.md](../artifacts/TL-013-design-kit/inventory.md) | [claude.ai](https://claude.ai/artifact/UyE1iU6au9kWBcVRoyangw) | 2026-11-04 |
| ThinkLatent design kit — kit-test screens v3 (Steel on Graphite) | design | [artifacts/TL-013-design-kit/kit-test-screens-v3/project/canvas.json](../artifacts/TL-013-design-kit/kit-test-screens-v3/project/canvas.json) | [claude.ai](https://claude.ai/artifact/U3eDnJ7sLzNb6AvBhA92up) | 2026-11-07 |
| scout-brief-design-kit.md | brief | [artifacts/TL-013-design-kit/scout-brief-design-kit.md](../artifacts/TL-013-design-kit/scout-brief-design-kit.md) | [claude.ai](project-knowledge:claude/scout-brief-design-kit.md) | 2026-11-04 |
| scout-brief-animated-libraries.md | brief | [artifacts/TL-013-design-kit/scout-brief-animated-libraries.md](../artifacts/TL-013-design-kit/scout-brief-animated-libraries.md) | [claude.ai](project-knowledge:claude/scout-brief-animated-libraries.md) | 2026-11-06 |
| ThinkLatent component playground | page | [artifacts/TL-013-design-kit/component-playground/README.md](../artifacts/TL-013-design-kit/component-playground/README.md) | [claude.ai](https://claude.ai/artifact/JRE7gG189EucQ2xWPDxkvv) | 2026-11-07 |

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-049 | 2026-11-02 | Design kit and design language split out of TL-003 as its own idea (a capability for every ThinkLatent product), registered at Seed with a scout brief and a recommendation; the ThinkLatent Portal is its first consumer; decisions deferred to its own chat | Jithin (split); thinking partner (registration) | accepted |
| D-050 | 2026-11-02 | Moved to Shaping with an idea card: H1 (the kit pays for itself by the second consumer), H2 (owned code beats Salt in the pre-registered kit test), H3 (the ten principles hold on the 20 portal screens); five decisions queued with recommendations (settle the enterprise-system question first; run the kit test; ECharts; one engineer plus a coding agent as the core, TL-007 second; Design System artifact after the test); appetite of four engineer-weeks proposed. Thin point named: the cost the kit saves is unmeasured | Thinking partner, pending Jithin | proposed |
| D-052 | 2026-11-02 | Decision 2: owned kit on shadcn/ui with Base UI (thinking partner had recommended React Aria; React Aria Table kept as a grids-only fallback in H2). shadcn code not forked: generated files in packages/ui re-pulled from upstream, ThinkLatent's tokens, theme, variants and blocks in packages/design-kit. Inventory rows 1 to 30 decided; against the recommendation on row 3 (density toggle for everyone), row 8 (sidebar by object), row 12 (detail pane on any page), row 25 (trees for every object group). Row 7 app shell: dock-style collapsed sidebar, pending Jithin's example | Jithin | accepted |
| D-069 | 2026-11-03 | Design DNA v0 adopted as the target the kit is built towards (layout from the web-application references, look and feel from the glass and Quarn references, colour deferred); glass accepted as a surface level for the shell, overlays and the engineering world, never the content plane; the kit test fixed as Portal home, the TLM4 Core model record and usage approval UA-0291; no RTL or locale work; the design-kit repo to be created in thinklatent-labs once the palette and decisions 1, 3 and 4 land | Jithin | accepted |
| D-077 | 2026-11-03 | Shell D everywhere (C2 dropped: a permanent bottom bar blocks every table); the six-teal palette adopted and mapped by job in tokens, components use roles only; warning and critical status hues left open rather than invented from the palette; glass confirmed as core DNA in both modes with reflective backdrops | Jithin | accepted |
| D-078 | 2026-11-03 | Six-teal palette dropped; bases fixed as white (light) and black (dark); palette derived from the Enterprise's own colours with an emerald accent and the brand red reserved for the ThinkLatent tile and critical; status hues set; applied to all fourteen boards, tokens v2 and the repo. Verify against the official brand guide before shipping | Jithin | accepted |
| D-079 | 2026-11-03 | Dark mode is black, nothing else; light palette provisionally Steel on Graphite (to revisit); glass references adopted: Apple Liquid Glass, Framer, Vercel, Reflect, Raycast, Mercury; glass lands on shadcn via tokens, data-slot styles and design-kit variants, never by editing generated files | Jithin | accepted |
| D-080 | 2026-11-04 | v4 is the look (command center, pill nav, dock D); ThinkLatent colour system v1 adopted: Brand Green brand, Sea Teal companion, Decision Red #C4262E as the decision colour, off-white light, black dark; design-kit repo live on GitHub with the tokens and artboards | Jithin | accepted |
| D-084 | 2026-11-04 | shadcn on Base UI is in the design-kit codebase via the CLI; tokens, theme map, glass layer and first ThinkLatent components landed; the command center runs on the kit in both modes; the kit test is drafted by the thinking partner for the team to critique | Jithin | accepted |
| D-086 | 2026-11-04 | Kit test built as code: the three screens run on design-kit in both modes; H2 has first evidence (Base UI at comfortable density renders all three), compact density and AA contrast still open | Jithin | accepted |
| D-102 | 2026-11-05 | Third-party animated components enter design-kit only as vendored MIT source at a pinned commit, with no runtime connection to the vendor (CI network audit, zero external requests) and the ThinkLatent look imposed by a palette bridge; products use adopted @kit/kit wrappers. kokonutui done (@kit/motion); Magic UI, Motion Primitives and Cult UI next; Commons Clause libraries (Animate UI, React Bits) wait for legal | Jithin (constraint); thinking partner (mechanism) | accepted |
| D-103 | 2026-11-05 | All AI and chat components come in as @kit/ai, local source only; Radix is allowed inside @kit/ai as a compatibility layer and is removed piece by piece as components are adopted into @kit/kit on Base UI | Jithin (scope); thinking partner (mechanism) | accepted |
| D-105 | 2026-11-05 | Every free component library ThinkLatent can legally copy is vendored into design-kit (16 sources) and reviewed in one component playground in the ThinkLatent look; adoption into @kit/kit is chosen from there. Commons Clause libraries (Animate UI, React Bits) are in for review only until Enterprise legal clears them | Jithin (scope); thinking partner (mechanism) | accepted |
| D-106 | 2026-11-05 | Published pages use relative asset paths (Vite base './') and count as published only after a headless check under the artifact host's conditions: its page wrapper, served under a path, in a cross-origin frame, with storage blocked | Thinking partner (after Jithin found the component playground blank) | accepted |
| D-107 | 2026-11-05 | Supersedes the line above: a published page counts as published only when a headless render inside the host's page wrapper (served under a path, in a cross-origin frame, with storage blocked) matches the plain page pixel for pixel in light and dark; the kit states its page canvas, ink and type outside any layer so a host's own styles cannot override them | Thinking partner (after Jithin found dark mode broken) | accepted |
| D-112 | 2026-11-05 | Everything on screen is the ThinkLatent kit: no source library names, licence labels or source paths in the playground or in products. Provenance (folders, manifests, licence files) stays in the repo, and a legal check stays visible, without naming the source, where a licence needs one | Jithin (one name); thinking partner (mechanism) | accepted |
| D-113 | 2026-11-06 | Licence review sits outside the kit: components are reviewed through ThinkLatent's process at the Enterprise before any product use; the kit and its playground carry no legal marker or legal guidance, while licence files and source folders stay in the repo. Supersedes the legal-check clause of the line above | Jithin | accepted |
| D-114 | 2026-11-06 | AI components show ThinkLatent's own models: in the playground, other providers' model and provider names read as the TLM line, and a placeholder ThinkLatent mark for intelligence stands in for AI provider icons, inside components only (it is not ThinkLatent's logo) | Jithin (TLM names, placeholder mark); thinking partner (mapping, mark) | accepted |
| D-138 | 2026-11-07 | First adoption into @kit/kit: the Portal agent conversation as one AgentConversation block of eight pieces: conversation and scroll button, message with a streaming markdown renderer (code plugin only; image and link prefixes limited to ThinkLatent origins), composer, reasoning with shimmer, tool, confirmation, sources, and a context meter built on a new kit Meter (no dollar cost). Leanest version per slot; Radix parts move to Base UI; a playground page runs a scripted TLM exchange. Ships as v0.2.0 | Jithin; thinking partner (shortlist) | accepted |
| D-139 | 2026-11-07 | The kit's conversation components take a ThinkLatent message type, not the AI SDK's message format; an adapter maps the AI SDK format where a product needs it | Jithin (on the thinking partner's recommendation) | accepted |
| D-140 | 2026-11-07 | Tag design-kit v0.1.0 as the baseline under neutral names, before adoption: every package at 0.1.0 and private (@kit/tokens was public and @kit/charts unmarked); consumers pin to the tag. Release commit 8653232 is on main; the tag is pending because this session cannot push tags | Jithin; thinking partner (privacy fix) | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._

### 2026-11-07 · Spec · first adoption and v0.1.0

- **Adoption set (D-138).** The Portal's agent conversation becomes one `AgentConversation` block in `@kit/kit`, so the Portal uses the block rather than eight loose parts. For each slot we take the leanest vendored version: the conversation container, scroll button, composer and reasoning come from the prompt-kit family; the message, tool, confirmation, sources and context meter come from the elements family. Shimmer is the "thinking" state. Message markdown uses the streaming renderer with only the code plugin, and image and link addresses are limited to ThinkLatent origins. The context meter sits on a new kit Meter, the same meter the TL-003 v6 pilot asked for, and shows no dollar cost because the TLM models are self-hosted. About 1,400 lines; collapsible, tooltip, hover card, progress and alert move from Radix to Base UI. Ships as v0.2.0, with a playground page that runs a scripted TLM exchange.
- **Message type (D-139, one-way).** The kit uses its own ThinkLatent message type, with an adapter for the AI SDK format. This fits the rule that every domain name is data, and the self-hosted stance.
- **v0.1.0 (D-140).** Every package was bumped to 0.1.0 and made private. `@kit/tokens` was marked public and `@kit/charts` was unmarked, so `pnpm release` could have published them. A changelog was added. Release commit `8653232` is on main. The session proxy refused the tag push, and a workflow to write the tag was also refused, so Jithin pushes the tag himself.
- **Critique carried forward.** v0.2.0 is real build work with no named kit engineer. Until one is named, the "kit core team of two to three" in the owner field is a hope, not a team.
