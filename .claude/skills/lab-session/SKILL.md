---
name: lab-session
description: Open or close an Idea Lab session on one idea or one track of a higher-order idea: read the register row (or track) back, declare the mode, and at the end write the row, decision line and sessions row before syncing. Use whenever a chat names a TL-### id, a slug or a track.
---

# Lab session

## Opening

1. Read `register/register.json`; find the row by id, slug or alias. A row at stage `Merged` is closed: its work lives on the track named by its `trackId` (in `tracks`, under its `mergedInto` parent), so open the track instead and say so.
2. Reply first with `Lab session · TL-### slug · Mode`, or `Lab session · TL-### slug › Track · Mode` for one track (mode by the row's or the track's stage unless Jithin names one), and restate the last decision-log line and the next step. Wait for a yes before acting on anything else.
3. Read `ideas/TL-###-slug.md` for the prose (a track's detail is in its parent's doc, under Tracks).

## Closing

Write to the register, never to the idea doc's generated block:

- the row: stage (with a `stageHistory` entry on change), `nextStep` with `nextStepDue`, `lastTouched`, `decisionsDue`, links;
- `decisions`: one new line with the next `D-###` id, `status` (`accepted`, or `proposed` when pending Jithin), `type` (`decision`, `rejection`, `gate`, `retro`), `door`, `reviewOn`; never edit an old line, add one that `supersedes` it;
- `sessions`: one row with date, scope, ideaIds, mode, outcome, docsTouched, `health` and `healthNote`, `nextStepDue`;
- `asOf` (now, with offset) and `source.registerRev` (+1).

A session on one track writes the track in `tracks` (its `stage`, `status`, `nextStep` with `nextStepDue`, `lastTouched`, open questions, hypotheses, kill signals, `decisionsDue`) and the parent's `lastTouched`; its decision line carries the parent's `ideaId` and the `trackId`, and its sessions row lists the parent in `ideaIds` and the track in `trackIds`.

Then write the session's prose under `## Notes` in the idea doc (the parent's, for a track), and run the lab-sync skill.

## Gates to respect

- Nothing passes Stress test without `critiqueRecorded: true`.
- Nothing enters Building unless the Building gate passes (D-152): an owner role assigned (played by Claude until the company version), a `streamId`, an `appetiteWeeks`, and a weekly review slot Jithin commits to; ideas in Building never outnumber his review slots. Roles are played by Jithin or Claude (CLAUDE.md, Roles); never ask him to name a person.
- Nothing is Shipped without `shipped.date` and `shipped.firstUser`; the metric read follows within 30 days.
- A rejection by Jithin is a decision of type `rejection`; it sets the row to Killed with `rejectedBy`.
- Merging (D-387) is Jithin's decision: the row goes to `Merged` with `mergedInto` and `trackId`, and every open item moves to a track on the parent (`tracks`), checked for nothing dropped before it is recorded. A track keeps its own stage; one below Stress test gets a short critique before it builds.
