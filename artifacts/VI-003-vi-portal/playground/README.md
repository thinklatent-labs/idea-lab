<!-- Mirror of a claude.ai artifact, exported 2026-11-05. Read-only; the live page and the vi-kit source are the source. -->
# VI Portal playground (the VI-013 kit test)

Live page: https://claude.ai/artifact/LHMeaT54htG3mzg914N7Ew (version 1793880068-cbd6, version 10, published 2026-11-05)

The kit-test screens built on vi-kit: command center, VGLM4 Core record, usage approval UA-0291, Ask VI, conversation with an agent in the loop, engineering view, in light and dark.

The built files are mirrored here again (index.html and assets/, 10 files, 2.1 MB): version 9 drops the Motion and AI review pages, which made versions 4 to 7 too large to copy (393 files) and now live in the component playground (artifacts/VI-013-design-kit/component-playground). Asset paths are relative, so the copy opens from any folder served over http. Version 10 keeps the kit's canvas, ink and type when a host page (the claude.ai viewer) wraps it in its own styles. Rebuild from the private repository thinklatent-labs/vi-kit at commit 969f885:

    pnpm install
    pnpm --filter playground build   # output in apps/playground/dist
