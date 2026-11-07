# Idea Lab

The nursery for initiatives at ThinkLatent before they become Projects of their own. Jithin Pradeep, Head of ThinkLatent, owns the lab. This repository is the lab's source of truth; the claude.ai Idea Lab Project reads and writes it, Jithin's laptop reads it.

## Who writes

Only the Claude session in the Idea Lab Project writes to this repository (through `scripts/lab-sync.sh`). Jithin reads on his laptop and makes changes by asking Claude. The nightly GitHub Action rebuilds and pushes, it does not author content. This single-writer rule is what keeps the register and the docs from drifting.

## Layout

- `register/register.json`: the single list of every idea, link, capability, decision, session and sync run (contract v1.2, `register/schema/register.schema.json`). Read it first, update it last, every session.
- `register/history/`: one dated snapshot per export plus `index.json`; the dashboard diffs the two most recent.
- `ideas/TL-###-slug.md`: one doc per idea. Frontmatter and the block between `<!-- generated:start -->` and `<!-- generated:end -->` are rendered from the register by `scripts/render-ideas.mjs`; write prose under `## Notes` and the headings after it.
- `artifacts/TL-###-slug/`: read-only mirrors of each idea's claude.ai artifacts (idea card and its tabs as markdown, sketches, canvases and playgrounds as HTML) and its scout briefs from project knowledge, listed in `artifacts/index.json`. The live versions stay on claude.ai and win; edit there, then re-export. Every session that creates or changes an artifact re-exports it here before `scripts/lab-sync.sh`, and the nightly sync re-exports anything whose revision moved.
- `dashboard/`: the React dashboard (Vite, TypeScript) on ThinkLatent kit. The kit is vendored under `dashboard/vendor/design-kit` at a pinned commit by `npm run kit:pull` (a design-kit checkout next to idea-lab); never edit it there, `npm run kit:check` fails if anyone did. Product wrappers live in `dashboard/src/kit`, Jarvis in `dashboard/src/jarvis`. `npm test`, `npm run build`, then `node scripts/host-check.cjs` before publishing (D-107). It reads `register/` through `scripts/sync-data.mjs`.
- `docs/`: the built dashboard, for a private GitHub Pages site or for publishing as a claude.ai artifact.
- `scripts/lab-sync.sh`: validate, snapshot, render, build, commit, push. Run it at the end of every session.

## Lifecycle

Seed, Shaping, Stress test, Proposal, Building, Shipped, Graduated, Parked, Killed.

- Proposal is funded by default; Jithin rejects explicitly with a decision of type `rejection`, everything else proceeds.
- The Building gate: an owner role assigned (played by Claude until the company version), a stream, an appetite in engineer-weeks, and a weekly review slot Jithin commits to (D-152). Missing any of the four means no start. Ideas in Building never outnumber Jithin's review slots: his review time, not build capacity, is the lab's constraint.
- Shipped means a first user in production and the metric read. Retrospectives measure Shipped, not Graduated.
- Governance is handled by a separate team; it is a row-level dependency (`governance` field), flagged only when on the critical path.
- Staleness: Seed 60, Shaping 30, Stress test 21, Proposal 14, Shipped 30 days; Building by its appetite (the circuit breaker, never extended); Parked by its re-check date.
- Five streams (S-A to S-E), one engineer plus a coding agent each in the company version; until then Claude, building with Claude Code, plays every stream engineer. `streams` and `phases` in the register.

## Roles

The lab today is Jithin and Claude (D-134, D-151). Every role stays in the structure and is played by one of the two until the lab moves into a company, when real people take them and nothing else changes:

- Jithin: sponsor and decider (stage, score, kill, graduation, every one-way door), idea owner and product lead, the business-line red-team seat, and the weekly review slots behind the Building gate.
- Claude: thinking partner, every lead and builder (index, harness, platform, kit, site, streams S-A to S-E), the feasibility and Risk red-team seats and the auditor; critic and auditor run as a separate agent that has not seen the work.
- Enterprise functions (Risk, IT security, Comms, governance, model approvers) are outside the lab: simulated at most, marked simulated, never a blocker for a lab stage.
- Never ask Jithin to name a person. "To be named" means played as above. Owner fields read role then player: "Index lead (Claude)".

## Modes

Brainstorm, Critic, Scout, Spec, Portfolio, Comms. Match the session to the stage: Seed and Shaping take Brainstorm, Stress test takes Critic, Proposal and Building take Spec, Shipped and Graduated take Critic (the retrospective), Parked and Killed take Portfolio. Honest critique is the default in every mode.

## Every session

1. Apply any waiting dashboard decisions first (lab-decisions skill). Then open with the session line: `Lab session · TL-### slug · Mode`, and read the row's last decision and next step back before acting.
2. One chat, one scope: a single idea, a Portfolio session, or Lab operations. Lab-operations sessions change the Operating Model, the register's structure, standards and scheduled tasks, never an idea's stage, score or doc. Idea sessions write only their own idea's row, doc and links.
3. Do not advance an idea past Stress test without a critique pass recorded.
4. At the end: update the register row (stage, score, next step with a due date, links), add a decision-log line (immutable; a reversal is a new line that supersedes the old), add a Sessions row with a health call (on-track, at-risk, off-track), bump `asOf` and `source.registerRev`, re-export any artifact the session created or changed into `artifacts/` (with its `index.json` entry), then run `scripts/lab-sync.sh`. GitHub must match the live register and artifacts at the end of every session; a session that cannot push says so in its closing reply.

## Rules in the register

Alert rules live in `register.json` under `rules` (R-01 to R-18) and are evaluated by the dashboard, not hard-coded. The rubric has eight criteria weighted per quarter (`weights`, `proposedWeights`), with a portfolio bar. Links are typed: serves, feature-of, depends-on, enables, reuses, creates, competes-with, supersedes, evidence-for, related-to. Capabilities reused by three or more ideas are platform priorities.

## Privacy

Everything in the thinklatent-labs organisation is private. Never make this repository, its Pages site or any artifact built from it public. The register holds internal strategy and no client data; rows flagged `sensitivity: flagged` are hidden from every audience preset but Jithin's.

## Decisions on the dashboard

Due items are either quick calls (fixed options, decided by Jithin on the claude.ai dashboard and stored in the artifact's `inbox` collection) or input-needed (decided in a chat). Claude applies quick calls with the lab-decisions skill at the start of every session and in the morning pickup, then syncs. Jarvis, the dashboard's assistant, answers through Claude on claude.ai (the artifact's `sample` capability) and can queue requests for the next lab chat (`kind: request` in the inbox); the lab-decisions skill raises them and never applies them. The GitHub copy of the dashboard is read-only and cannot take decisions or reach Claude.
