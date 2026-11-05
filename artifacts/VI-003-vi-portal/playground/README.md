<!-- Pointer to a claude.ai artifact, exported 2026-11-05. Read-only; the live page and the vi-kit source are the source. -->
# VI Portal playground (the VI-013 kit test)

Live page: https://claude.ai/artifact/LHMeaT54htG3mzg914N7Ew (version 1793867553-2da9, published 2026-11-05)

The kit-test screens built on vi-kit: command center, VGLM4 Core record, usage approval UA-0291, Ask VI, conversation with an agent in the loop, engineering view, in light and dark.

Not copied here since version 4: the build grew to 393 files when it carried the Motion and AI review pages, which have since moved to the component playground (artifacts/VI-013-design-kit/component-playground). Rebuild from the private repository thinklatent-labs/vi-kit at commit e830138:

    pnpm install
    pnpm --filter playground build   # output in apps/playground/dist

The copy of version 1 that used to sit here was removed as out of date. The built files are mirrored again once the playground is republished without the Motion and AI pages (VI-013 next step).
