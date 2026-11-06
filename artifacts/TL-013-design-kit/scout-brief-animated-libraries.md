<!-- Exported from Idea Lab project knowledge (claude/scout-brief-animated-libraries.md, created 2026-11-05T08:07:00.785452Z, updated 2026-11-06) on 2026-11-06. Read-only mirror; edit the project doc, not this file. -->
# Scout brief: animated component libraries for design-kit (TL-013 design-kit)

Date: 2026-11-05 · Mode: Scout · Idea: TL-013 design-kit · Updated the same afternoon (see "Outcome" at the end)

## Question
Which free animated React component libraries can be brought into design-kit as local source, with no runtime connection to the vendor (no API keys, no fetches, no CDN), and restyled to the fixed ThinkLatent design DNA?

## Rules any library must pass
1. Licence allows us to copy source into a private internal repo and use it in internal products (MIT or equivalent). Anything with Commons Clause, attribution conditions or "no redistribution of source" goes to legal first.
2. Source vendored at a pinned commit; never edited in place; re-vendored by script.
3. Zero network at runtime: `scripts/audit-network.mjs` gate in CI (URLs, fetch, XHR, WebSocket, EventSource, sendBeacon, remote import, env/key access) plus a headless run that records zero external requests.
4. Look adopted, not inherited: colours bridged to ThinkLatent ramps; products import adopted wrappers from @kit/kit, never raw vendored components.

## Done first: kokonutui (free tier)
- MIT, © kokonutUI. 92 of 102 components vendored to `packages/motion` at upstream commit 4d497b7 (design-kit commit a834b42).
- Excluded 7: v0-button (opens v0.dev); clip-trimmer, contact-sheet, focal-point-picker, lightbox-grid, photo-straighten, rain-glass-background (remote Unsplash images). The three Radix-only composers (ai-prompt, ai-input-search, smooth-drawer) later moved into @kit/ai.
- Next.js imports shimmed locally; demo URLs rewritten; Inter self-hosted (Google Fonts link removed from the playground).
- Colour bridge re-points Tailwind palettes (zinc/neutral/… → ThinkLatent neutrals; emerald/green → ThinkLatent green; teal → teal; red → Decision Red; others → muted ThinkLatent accents). Hard-coded hex was later mapped too (see Outcome).

## Candidates (as scouted)
| Library | Licence | Fit | Network risk | Verdict at the time |
|---|---|---|---|---|
| Magic UI | MIT | React 19, Tailwind 4, motion 12 | tweet-card, client-tweet-card (Twitter API); icon-cloud needs local assets | Vendor next (exclude those) |
| Motion Primitives | MIT | motion only, low-level | none found | Vendor next; smoke-test on React 19 |
| Cult UI | MIT | already Base UI | text-gif/mac-screen (Giphy), YouTube, Vimeo, picsum, pravatar, paper.design, newcult.co; 14 next/* imports | Vendor with per-component review |
| Animate UI | MIT + Commons Clause | best Base UI fit | github-stars, preview-link-card (api.microlink.io) | Legal sign-off first |
| React Bits | MIT + Commons Clause | gsap / WebGL heavy | Google Fonts, jsDelivr face-api | Legal sign-off first |
| Eldora UI | MIT | overlaps Magic UI | nominatim fetch, Google Fonts | Later, only for gaps |
| coss ui / Origin UI | MIT | Base UI-native, not animation | none material | Reference for Base UI ports |
| Aceternity | Proprietary | — | — | Avoid ("cannot re-distribute source files") |
| Skiper UI | Attribution required, terms unverified | — | — | Avoid |
| Hover.dev | Redistribution needs written consent | — | — | Avoid |
| Syntax UI, Indie UI | MIT | old stack | — | Avoid |

## Outcome (2026-11-05, afternoon): everything that can legally be copied is in
Jithin asked for all of them, plus every AI and chat component, reviewed in one component playground in the ThinkLatent look.

| Library | Licence | Files vendored | Left out | Upstream demos |
|---|---|---|---|---|
| Magic UI | MIT | 78 | 2 (tweet cards) | 174 |
| Motion Primitives | MIT | 35 | 0 | 91 |
| Cult UI | MIT | 135 | 6 (env read, auth header sample, Next internals, newer shadcn APIs) | 88 |
| Eldora UI | MIT | 42 | 5 (globe fetches map data, tweet card, site-only icons) | 49 |
| coss ui | MIT | 64 | 0 | 528 |
| Origin UI | MIT | 667 | 8 (fetch) | — (its 612 components are compositions) |
| Animate UI | MIT + Commons Clause | 1,003 (incl. ~770 animated icons) | 2 (GitHub stars) | 30 |
| React Bits | MIT + Commons Clause | 214 | 4 (fetch) | — |
| Syntax UI | MIT | 96 | 3 | — |
| Indie UI | MIT | 62 | 3 | — |
| AI Elements, prompt-kit, shadcn-chat (@kit/ai) | Apache-2.0 / MIT | 73 | 5 | 119 |
| shadcn on Base UI (the kit's base) | MIT | 64 (already in @kit/ui) | — | 64 official Base UI examples |

How it holds:
- One script (`scripts/vendor-libs.mjs`) with a config per library; imports mapped to the workspace; a new `@kit/compat` package holds the Radix shadcn layer and Next.js stand-ins upstream code expects (never product code).
- Network: remote images become a built-in placeholder; anything that still fetches, opens sockets, reads env, handles keys or authorization headers, or uses an online-service package is left out with the reason. CI audit plus a headless walk of all 2,543 playground entries: **zero external requests**.
- Look: every literal colour mapped to the nearest step of the same ThinkLatent ramp (`scripts/kit-colour.mjs`), on top of the palette bridge; fonts resolve to Inter.
- Types: 4 files with missing exports left out; 50 with type-only mismatches kept as written ("typed loosely"); the walk is the runtime test.
- Playground (`apps/catalog`, published): 2,524 components from 16 libraries, 1,141 demos. Walk result: 2,243 render on their own, 205 show nothing alone, 92 need props, 3 building blocks or heavy WebGL.
- Not copied: Aceternity, Skiper UI, Hover.dev (licences forbid copying the source).

Open: adoption into @kit/kit starts with the ThinkLatent Portal's agent conversation pieces. Licence review (including the Commons Clause on Animate UI and React Bits) is ThinkLatent's own process at the Enterprise before any product use, outside the kit (decided 2026-11-06, D-113).

## What would change this
- Legal says MIT vendoring into a private repo needs a review step: add a LICENSES manifest and route each library through it.
- A component needs network to make sense (embeds, avatars, maps): it stays excluded; a ThinkLatent-native version is built instead.
