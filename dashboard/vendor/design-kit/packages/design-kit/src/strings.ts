// The string catalog: the kit's own screen text (its components and the chrome of the two playground apps).
// Brand words come from brand.json and nowhere else; model names, business lines, people and numbers are data and
// live with the screens that show them. scripts/check-names.mjs keeps it that way (README, "Names").
import brand from "./brand.json"

/** The brand words, read from brand.json. */
export const BRAND = {
  name: brand.name,
  mark: brand.mark,
  modelLine: brand.modelLine,
  index: brand.index,
  enterprise: brand.enterprise,
} as const

/** A model of the line, for display: model("4 Core") is the line's name followed by "4 Core". */
export const model = (rest = "") => `${brand.modelLine}${rest}`
/** The same model as a lower-case serving id: modelId("4-core"). */
export const modelId = (rest = "") => `${brand.modelLine.toLowerCase()}${rest}`

const kit = `${brand.name} kit`

export const STRINGS = {
  kit: {
    /** The kit's name on screen. */
    name: kit,
    /** The look every vendored component is mapped onto. */
    look: `the ${brand.name} look`,
    palette: `the ${brand.name} palette`,
    /** A slug-shaped stand-in for a third-party library name (the repository's own name, not a brand word). */
    slug: "design-kit",
  },
  playground: {
    title: `${brand.name} Portal — playground`,
    mark: brand.mark,
    nav: { home: "Home", models: "Models", ask: `Ask ${brand.name}`, engineering: "Engineering", approvals: "Approvals" },
    ask: { title: `Ask ${brand.name}` },
    escalation: `Escalates to the Head of ${brand.name}'s delegate at 12:10`,
  },
  catalog: {
    title: `${brand.name} component playground`,
    mark: brand.mark,
    caption: `${kit} · component playground`,
    byKind: `${kit} · by kind`,
    heroTitle: `in the ${brand.name} look.`,
    heroBody: `Every component lives in the ${kit} as local source. Nothing calls home: a CI audit blocks URLs, fetches, sockets and keys, and every colour is mapped onto the ${brand.name} palette.`,
    inKinds: (kinds: number) => `in ${kinds} kinds, all in the ${kit}`,
    demosInLook: (demos: string) => `plus ${demos} demos in the ${brand.name} look`,
    kitDemo: `${brand.name} demo`,
    kitDemoLabel: `${kit} demo`,
    styleWord: `${brand.name}-style`,
  },
} as const
