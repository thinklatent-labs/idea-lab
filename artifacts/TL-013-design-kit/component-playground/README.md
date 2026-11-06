<!-- Pointer to a claude.ai artifact, exported 2026-11-05. Read-only; the live page and the design-kit source are the source. -->
# ThinkLatent component playground (TL-013 design-kit)

Live page: https://claude.ai/artifact/JRE7gG189EucQ2xWPDxkvv (version 1793937433-4032, version 5, published 2026-11-06)

Not copied here: the built app is 234 files and 31 MB of generated code, rebuilt from source on every change. It is reproducible from the private repository thinklatent-labs/design-kit at commit 10fc4d8:

    pnpm install
    pnpm --filter catalog build      # needs ~6.6 GB of memory; output in apps/catalog/dist

## What it is

Every component ThinkLatent can legally copy, vendored into design-kit as local source and rendered in the ThinkLatent design DNA (shell D, kit surfaces and tiles, colour system v1.1, light off-white and dark black).

- 2,524 components from 16 libraries, 1,141 upstream demos: ThinkLatent kit, shadcn on Base UI (with shadcn's official Base UI examples), AI Elements, prompt-kit, shadcn-chat, kokonutui, Magic UI, Motion Primitives, Animate UI, React Bits, Cult UI, Eldora UI, Syntax UI, Indie UI, coss ui, Origin UI.
- Browse by group (ThinkLatent kit, AI and chat, Animated, Component sets), by library or by kind; search; each component's page shows its demos and its import line.
- Render status on every card, from a headless walk of all 2,543 entries (scripts/catalog-walk.mjs): 2,243 render on their own, 205 show nothing alone, 92 need props, 3 building blocks or heavy WebGL. Zero external requests.
- "Left out, and why": the 48 components not copied because they reach the network or need code from a library's website. Animate UI and React Bits carry the Commons Clause (legal check before product use). Aceternity, Skiper UI and Hover.dev are not included (their licences forbid copying the source).

Version 2 (2026-11-05): version 1 showed a blank page on claude.ai because its asset paths were absolute (/assets/...), which point nowhere when the page is served under a path. Built with relative paths now, and the first load is 46 files (6 MB) instead of 129 (13 MB). Checked headless with the host's page wrapper, under a path, in a cross-origin frame, with storage blocked and a strict CSP.

Version 3 (2026-11-05): dark mode showed dark cards on a white page with black text in the claude.ai viewer, whose page wrapper sets its own background, text colour and font outside any CSS layer. The kit now states the page canvas, ink and type the same way, so the viewer's styles no longer win; inside a copy of the wrapper the page matches the plain render pixel for pixel, light and dark.

Decision record: TL-013 idea card, decision log 2026-11-05; scout-brief-animated-libraries.md beside this folder.

Version 4 (2026-11-05): one name on screen. The playground shows everything as the ThinkLatent kit: no library names, licence labels, upstream commits or source paths; it is browsed by group (Core, AI and chat, Animated, Everyday components) and by kind. Text inside vendored components and demos is shown under the kit's name by a build transform; the vendored source files and their provenance (folders, manifests, licence files) are unchanged in the repo. The list above names the sources for the record; the playground itself does not.

Version 5 (2026-11-06): AI components and demos show ThinkLatent's own models (the TLM line) instead of other providers' models, and a placeholder ThinkLatent mark for intelligence stands in for AI provider icons, inside components only; it is not ThinkLatent's logo. No legal-check marker: licence review is ThinkLatent's own process at the Enterprise before any product use, outside the kit.
