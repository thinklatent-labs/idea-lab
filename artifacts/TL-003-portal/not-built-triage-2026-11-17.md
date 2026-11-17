# ThinkLatent Portal (portal) — Triage of the "Not built" features, 17 Nov 2026

Lab session · TL-003 portal · Building. Jithin asked (D-436) for a triage, with recommendations, of the features the portal's list still marks "Not built". A separate helper read every such row (373 on integration 75d757d3) against the built pages' code and facts, the approved boards and the decision log. Read only; no screen was opened. Row by row: `not-built-triage-2026-11-17.json` beside this file.

## The answer

Only 61 of the 373 rows are real work. More than half are already delivered by a built page whose row was never re-marked, and almost a quarter were removed by a recorded decision.

| Recommendation | Rows | What it means |
|---|---|---|
| Built already | 207 | A built page delivers it; the row is stale. Most would land as Partly. None is marked Built until looked at, at 1,440 and on a phone. |
| Decided out | 87 | A recorded decision removed or replaced it (approvals 16, access roles 11, keys and unregistered usage, and others). |
| Build from the nearest board | 45 | No board draws it; it fits a built page in a drawn form. 37 small, 7 medium, 1 large. |
| Build from a board | 2 | A board draws it and the build left it out. Both medium. |
| Draw first | 14 | Needs a board of its own: four candidate boards. |
| Later | 18 | The real product or a later year, not a prototype on sample data. |

## The 20 to build first

1. Hover cards and the section bar across the portal (in hand, D-431).
2. A thread on the page it is about (in hand, D-431).
3. Place in the queue on Requests.
4. Size class and cost per request on the Catalogue's rows (D-307).
5. Service levels, shared against dedicated, on the Plan.
6. Red-team findings as a line on a project's record (Jithin's ask, D-312).
7. "Run again" on an evidence line of the record (Jithin's ask, D-312).
8. The triage agent (Jithin's ask).
9. A project's tier line, "Not supplied yet" (D-312).
10. Tokens over the window, on a feature's flow and on Usage.
11. Limited and rejected requests by hour on Connect.
12. Capacity by day on a project's Operations.
13. Signal coverage by calling application, and signals not yet captured (Jithin's ask, D-236).
14. The pillars not live, named as rows on the TL Index.
15. More filters on the leaderboard (D-319).
16. A weak judge greyed on a pillar's page.
17. Numbered versions of a project's requirements, two compared.
18. Asks: add your support to one, and declined with a reason.
19. An agent's metrics at step, trace and thread (D-325).
20. Ingestion into the graph by batch on Data.

One more is decided but large: an (i) on every number (D-227); best done with item 1.

## Four boards to draw for the 14

- **Engineering view** (6 rows): first-token time by input length, error-budget burn, cache detail, the throughput sweep, routing by task, the loss mask. ThinkLatent only (D-291).
- **Topics and coverage** (3 rows): topic clusters with a privacy floor, coverage by topic group, most-asked question kinds against Index score.
- **A run's results** (3 rows): a page per Index run, the questions a model fell on, the judge's recalibration plan (the last two Index team only).
- **Which model is enough** (2 rows): a filter by pillars, thresholds and request size, cheapest first.

## Surprises

- No build ever assessed these rows: 149 carry the 14 Nov reset line, 224 have no status entry at all.
- 87 rows removed by decision still read "Not built": the list has no state for "out by decision".
- Two "out" verdicts of the 13 Nov feature check are stale (start from a base, add a base: drawn by D-298 and built).
- One row (Q-2-19) was set to Partly by its track and lost in a merge.
- The "What is coming" list on Help misses six later-year rows.
- Four rows are rules, not screens. Nine groups of duplicates.

## Where the triage is thin

- "Built already" rests on reading code and facts, not on looking at screens; 71 of the 207 rest on the 13 Nov check's "Drawn" plus every board being built (36 spot-checked, one miss).
- Two "decided out" calls are implied by a decision, not named in it: a blended grade (against D-306) and the text budget. For Jithin to confirm.
- Six calls could go the other way (a demo gallery, break-glass policy text, four "later" rows a small sample exhibit could show).
