---
name: lab-session
description: Open or close an Idea Lab session on one idea: read the register row back, declare the mode, and at the end write the row, decision line and sessions row before syncing. Use whenever a chat names a TL-### id or slug.
---

# Lab session

## Opening

1. Read `register/register.json`; find the row by id, slug or alias.
2. Reply first with `Lab session · TL-### slug · Mode` (mode by stage unless Jithin names one) and restate the row's last decision-log line and next step. Wait for a yes before acting on anything else.
3. Read `ideas/TL-###-slug.md` for the prose.

## Closing

Write to the register, never to the idea doc's generated block:

- the row: stage (with a `stageHistory` entry on change), `nextStep` with `nextStepDue`, `lastTouched`, `decisionsDue`, links;
- `decisions`: one new line with the next `D-###` id, `status` (`accepted`, or `proposed` when pending Jithin), `type` (`decision`, `rejection`, `gate`, `retro`), `door`, `reviewOn`; never edit an old line, add one that `supersedes` it;
- `sessions`: one row with date, scope, ideaIds, mode, outcome, docsTouched, `health` and `healthNote`, `nextStepDue`;
- `asOf` (now, with offset) and `source.registerRev` (+1).

Then write the session's prose under `## Notes` in the idea doc, and run the lab-sync skill.

## Gates to respect

- Nothing passes Stress test without `critiqueRecorded: true`.
- Nothing enters Building unless the Building gate passes (D-152): an owner role assigned (played by Claude until the company version), a `streamId`, an `appetiteWeeks`, and a weekly review slot Jithin commits to; ideas in Building never outnumber his review slots. Roles are played by Jithin or Claude (CLAUDE.md, Roles); never ask him to name a person.
- Nothing is Shipped without `shipped.date` and `shipped.firstUser`; the metric read follows within 30 days.
- A rejection by Jithin is a decision of type `rejection`; it sets the row to Killed with `rejectedBy`.
