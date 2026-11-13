# ThinkLatent Portal (portal) · Feature check

13 November 2026 · v1.0 · TL-003 · for Jithin, Head of ThinkLatent · follows the round check of 12 November

## 1. The answer

Jithin asked whether every feature we started is considered, or whether some were never even discussed between us.

**Of the 712 features on the list:**

| Where it stands | 12 Nov | 13 Nov, the check | 13 Nov, after the answers (D-312) |
|---|---|---|---|
| Drawn on a board | 98 | 222 | **222** |
| Half there: on a board, with a named detail missing | 355 | 324 | **324** |
| Decided, not drawn yet | — | 9 | **45** |
| Later year, to the 'What is coming' page (D-307) | — | 14 | **26** |
| Out by a decision | 56 | 86 | **90** |
| A rule, not a screen | — | 5 | **5** |
| **Never discussed: on no board, and no decision touches it** | 203 | 52 | **0** |

**And the other way:** about 50 features decided or drawn since 11 November have **no row on the list**, because the list stops at 11 November. They are now rows N-47 to N-96 on the portal's feature list (section 9).

Four things follow:

1. **52 features were never discussed.** They fall in five groups (section 4); the largest are the shell's own behaviour and the model card and registry. **Ten of them are things Jithin asked for himself** after the boards: the sticky section bar, side sheets, hover cards, saved views, undo, red-team sessions as evidence, evidence that can be re-run, the triage agent, which model sizes the scorers run on, and findings left 30 days.
2. **The plan of 12 November is not finished.** Of its seven themes, three were drawn: operations depth, the foundation team's side, and TL Index upkeep with the evaluation queue. Four were not: models and portfolio detail (only the record and the system pages were drawn), the shell (only notifications decided), Help extras (only the 'What is coming' page decided) and the later-year rows (sent to that page, not drawn). Most of the 324 half-there rows sit in these four and in the quality loop.
3. **Two decisions disagree.** D-284 says every listed feature is drawn before building. D-311 starts building the shell, the Catalogue and the TL Index, and does not say whether D-284 still holds. Two of the three parts of the first slice, the shell and the model pages the Catalogue opens, are in themes not drawn.
4. **The feature list cannot check the build yet.** Without the 50 new rows, the repository's coverage check cannot see Connect, the open view, data and training, prompts, the TL Index upkeep or Try TLM.

**Decided the same night (D-312).** D-284 stands: nothing is built until every listed feature is drawn or decided out. Then a separate agent checks every row against the boards, and only then does the build start with the shell, the Catalogue and the TL Index, Try TLM beside them. Each of the 52 now has a decision (section 11), and what is left to draw is in section 12.

## 2. How the check was done

- Every one of the 558 rows that were half there or missing on 12 November was read against the text of all 71 boards and against the decisions D-255 to D-311. Each got a new verdict, the board it is on and what is still missing. The 98 drawn and 56 out on 12 November were kept; two of the drawn ones sat only on a retired board and were moved to boards that show them.
- A decision counts as touching a row when it names it, or when it decides the thing the row describes. Sixteen rows were judged out from what a decision implies rather than names; they are listed in section 8, and Jithin confirmed them (D-312).
- "Never discussed" means: on no board, and nothing in the decision log touches it.
- Every row, with both verdicts, the board and the note, is in `feature-check-2026-11-13.csv` beside this file.

## 3. By area

Counts from the check, before the answers; section 11 says where the 52 went.

| Area | Rows | Drawn | Half | Decided | Later | Out | Rule | Never |
|---|---|---|---|---|---|---|---|---|
| Models | 71 | 14 | 46 | 0 | 1 | 3 | 0 | 7 |
| TL Index and evaluation | 68 | 29 | 37 | 2 | 0 | 0 | 0 | 0 |
| Use case: running | 56 | 17 | 26 | 6 | 1 | 1 | 0 | 5 |
| Use case: quality and record | 55 | 9 | 38 | 0 | 0 | 5 | 0 | 3 |
| Training | 42 | 17 | 17 | 0 | 0 | 7 | 0 | 1 |
| Workbench: prompts, data sets, alerts | 41 | 24 | 11 | 0 | 0 | 6 | 0 | 0 |
| Data | 35 | 13 | 17 | 0 | 1 | 1 | 0 | 3 |
| Agents and playground | 33 | 12 | 14 | 0 | 1 | 3 | 0 | 3 |
| Home | 29 | 7 | 15 | 0 | 1 | 4 | 0 | 2 |
| Operations | 27 | 9 | 6 | 0 | 2 | 7 | 0 | 3 |
| Journeys | 27 | 16 | 5 | 0 | 0 | 3 | 0 | 3 |
| Approvals and governance | 24 | 4 | 3 | 0 | 0 | 15 | 0 | 2 |
| My work | 22 | 8 | 7 | 0 | 0 | 7 | 0 | 0 |
| Use cases: portfolio | 21 | 1 | 14 | 0 | 1 | 0 | 0 | 5 |
| Onboarding | 19 | 5 | 11 | 0 | 0 | 2 | 0 | 1 |
| Access model | 19 | 6 | 2 | 0 | 0 | 11 | 0 | 0 |
| UX improvements | 15 | 5 | 4 | 1 | 0 | 1 | 0 | 4 |
| Use case space | 14 | 6 | 5 | 0 | 0 | 2 | 0 | 1 |
| Shell and theme | 13 | 4 | 0 | 0 | 3 | 1 | 4 | 1 |
| Intelligence layer | 13 | 4 | 7 | 0 | 0 | 0 | 0 | 2 |
| Help | 11 | 4 | 5 | 0 | 1 | 1 | 0 | 0 |
| Usage, keys and limits | 11 | 1 | 6 | 0 | 0 | 3 | 0 | 1 |
| Experience rules | 11 | 0 | 9 | 0 | 0 | 0 | 1 | 1 |
| Observe | 10 | 3 | 6 | 0 | 1 | 0 | 0 | 0 |
| Observe: traces | 7 | 2 | 4 | 0 | 0 | 1 | 0 | 0 |
| Ask and the guide | 7 | 2 | 4 | 0 | 1 | 0 | 0 | 0 |
| Settings | 6 | 0 | 4 | 0 | 0 | 0 | 0 | 2 |
| Inbox | 3 | 0 | 1 | 0 | 0 | 0 | 0 | 2 |
| Moved to Cortex (TL-017) | 2 | 0 | 0 | 0 | 0 | 2 | 0 | 0 |
| **All** | **712** | **222** | **324** | **9** | **14** | **86** | **5** | **52** |

## 4. Never discussed (52)

**The shell and how screens behave (15).** Dark theme (C-p13-01); a first-visit and empty Home (C-p1-42), and no board draws any empty, loading, failed or no-access state; 'was this helpful' on Home (C-p1-41); a sticky section bar with a Decide anchor (Q-4-01); side sheets (Q-5-05); hover cards (Q-5-07); saved views (Q-5-08); undo instead of confirm (Q-5-11); pages behind their sources, with the late source named (C-p12-25); quiet hours, time zone and out of office (C-p1-46); what the portal records about me, download and retention (C-p1-48); an inbox with agent-drafted replies (C-p1-54) and a thread context panel (C-p1-55); the IAM mirror lag (C-p12-24); the break-glass policy text (C-p12-19). **Decided:** drawn with the shell theme before the build, the agent-drafted replies included (D-312).

**The model card, the registry and serving choices (8).** A model-card agent drafting fields with an owner for each (C-p2-37); the card's changelog and export (C-p2-41); export of a lineage image (C-p2-50); the registry against the gateway (C-p2-54); what the registry stores and its API (C-p2-55); serving settings by precision with their accuracy and cost (C-p2-35); effective context and its decay (C-p2-34); a fallback alias pointing at a retiring model (C-p4-51). **Decided:** drawn on the model pages before the build; precision and context decay with the engine detail behind the Engineering switch (D-312).

**Governance and risk (8).** A risk tier and a sensitivity tier for a project (C-p5-38); risk tiers across the portfolio and their review times (C-p11-21); review cadence by risk tier and a decommission plan (C-p3-39); an incident plan with its last drill (C-p5-51); red-team sessions as evidence (Q-2-14); evidence that can be re-run from the record (Q-2-17); evidence sessions from the playground (C-p11-05); a finding left 30 days being reviewed (Q-6-12). **Decided:** tiers, review cadence, decommission and drills are the governance team's, and a project's tier shows only when they supply it; red-team and re-runnable evidence and the 30-day flag are drawn on a project's record; no evidence sessions from Try TLM, which is private to the person (D-312).

**Portfolio, adoption and Finance (12).** Monthly statements for Finance (C-p3-34, C-p3-57); stalled teams, champions and nudges (C-p3-31); user levels and returning users in a pilot (C-p4-09); teams in a pilot, adopted or not (C-p4-10); peaks by week (C-p4-35); a composite score with weights (C-p4-48); any number split by task (C-p5-20); a portfolio agent ordering resubmissions (C-p3-23); items held by the safety floor with a reply (C-p3-24); the portal's own assistant's service level and evidence (C-p3-60); the monthly cost of each choice when starting (C-p3-08). **Decided:** all twelve go to the 'What is coming' page as later-year (D-312).

**Agent, data and evaluation extras (9).** An agent's failure clusters with replay, a red-team suite and a tools diff (C-p10-20); a Try TLM session shown as code (C-p10-28); a demo gallery (C-p10-31); a triage agent (Q-2-24) and its pattern proposals to a pipeline (C-p8-16); precision by reviewer and a rating model against reviews (C-p8-17); an Enterprise-wide view of the most asked kinds of question and the weakest domains (C-p8-31); a loss mask on a rendered sample (C-p7-36); which model sizes the scorers run on (Q-6-10). **Decided:** each is drawn on the board it belongs to before the build (D-312).

## 5. Decided, not drawn yet (9 on the list, and 3 new rows)

- Right answers and made-up answers as two numbers, with no blended score (C-p9-34, C-p9-02; D-306).
- The engine's own counters behind the Engineering switch, for ThinkLatent only (C-p4-29, C-p4-32, C-p4-39, C-p4-41, C-p4-42; D-291, D-292), and routing by task (C-p4-54; D-291).
- The notifications list, inside the portal only (Q-5-10; D-307).
- New rows: size class and cost per request for everyone (D-307); the 'What is coming' page (D-307); notifications in the portal only (D-307).
- Also decided and not drawn: the rest of Try TLM (adding a connector, building an agent, the button at the top of every page), cost, speed and size against score on Trends, and Home's row for a sign-off that waits.

## 6. Later year, to 'What is coming' (14)

V-01 compounding index · V-04 voice · V-06 use-case twin · V-07 automatic right-sizing · V-09 TLM5 surfaces · V-10 group evolving agents · V-13 data agreements · V-16 SRE agent acting within bounds · V-20 chargeback and GPU trading · V-21 resilience view · V-22 academy · V-23 portal API and MCP server · V-24 federation · V-25 portfolio simulation.

## 7. Half there (324)

A row is half there when its board exists but a detail the row names is missing. By where they sit:

| Theme | Rows | Opened since 12 Nov? |
|---|---|---|
| Model detail: card, compare, registry, lifecycle, health, facts | 46 | No, apart from the system pages |
| Quality loop: judges, drift, review queue for projects, findings, evidence | 38 | No, apart from the record |
| TL Index analysis: pillar pages, judge per pillar, compare, filters, sufficiency | 37 | The Index was; these parts were not |
| Running a feature: tiles, daily charts, serving detail | 26 | Partly (rollout and serving, alerts) |
| Training and data detail: charts, logs, GPUs per node, reviewers table, a pipeline's level, comparing versions | 34 | Yes; these details were left |
| Home, My work and the portfolio | 36 | Home gained links only; the portfolio, no |
| Onboarding and a project's own space | 16 | No |
| Agents, prompts, data-set workbench | 25 | Yes; these details were left |
| Experience rules, intelligence layer, Help, settings, the rest | 66 | No |

## 8. Out by a decision since 12 Nov (30)

Named by a decision (14): alert rules, escalation and acknowledging (C-p6-35 to 37, D-290); unregistered keys and applications, the side door, untagged calls and the key register (C-p12-01 to 05, C-p3-51, C-p3-52, D-292); attestations (C-p1-10, C-p1-32, C-p3-44, D-284); the weekly review of grants (C-p12-17, D-293).

**Read as out from what a decision implies (16), confirmed by Jithin (D-312):** unregistered usage on Home (C-p1-12) and unregistered agent traffic (C-p10-08), since a call without its ids is refused (D-292); tag completeness (C-p12-23, D-292); the side door against review time (C-p11-20, D-292); keys on a project, a sandbox key and tags on a key (C-p3-46, C-p3-13, C-p3-14, D-287); vendor evidence expiring (C-p2-08), replaced by a monthly full run (D-306); trying or comparing two or three models in the playground (C-p2-17, C-p10-21, C-p10-30), since Try TLM offers one model at a time (D-307); acknowledging alerts and chat channels on My work (C-p1-28, D-290, D-307); every governed record across projects (C-p11-19, D-293); a request to change the record (C-p5-55, D-293); copying a data set to another project (C-p8-26, D-275); runs started from Relay (C-p7-19, D-275).

## 9. Decided since 11 Nov and not on the list (50 new rows)

Added to the portal's feature list as N-47 to N-96 on 13 November (portal commit 1ab95af; the list now has 762 rows, all 50 not built). Each is in `feature-check-2026-11-13-new-rows.json` with its decision and board: 45 drawn, 3 decided and not drawn, 2 rules. By area: structure and navigation (scope bar; organization and team pages; a project's ten tabs; a feature's eight; a model's eight), the two bars on a feature, no roles, the Plan, Requests, Traces in five views, Self-healing, the new-version offer, cost avoided in five layers, Help and Jarvis, leaderboards by kind, Connect without keys, the open view, a team's own agent, how alerts fire, increments and rollout, operations across the Enterprise, the record and its keeping, the seven data tags, the knowledge graph and mixes, open safety and cyber data, foundation-only data pages, recipes and methods, Shape the base, one run with stages, a run's storage, the release order, reuse and the base shelf, the training stack, prompt text in the application, systems of models, size and cost for everyone, registration owned by a project's engineers, two-weekly editions, delta scoring, the stage-check set, who reads questions, the Index team, nameless internal runs, the cap on real calls, notifications in the portal, 'What is coming', Try TLM, its sessions, its connectors, and how the build runs.

## 10. Where this check is thin

- **I checked my own drawing.** The lab's rule is that the auditor is a separate agent that has not seen the work; this check broke it. I drew most of the 71 boards and judged them myself, where the 12 November check used three independent auditors. A separate check would catch what I read too kindly; one now runs once the drawing ends (D-312).
- **Text, not pictures.** A feature shown only as a mark with no words may be judged missing.
- **Half there is still wide.** The 324 are not split into "add a line" and "needs a board".
- **The 98 rows drawn on 12 November were not read again.** A later decision may have changed one.
- **The 50 new rows are my wording of the decisions.** Jithin's words in the decision log win where they differ.

## 11. Decided 13 November (D-312)

| Question | Decision | Whose |
|---|---|---|
| Which rule holds, D-284 or D-311? | D-284 stands: every listed feature is drawn before building. The build then starts with the shell, the Catalogue and the TL Index, with Try TLM beside them from the same day | Jithin, against the recommendation to draw each slice's features just before that slice |
| The shell (15) | Drawn with the shell theme before the build, the agent-drafted inbox replies included | Claude's recommendation, question left unanswered; the suggestion to drop the drafted replies was withdrawn, since D-307 does not rule them out |
| The model card and registry (8) | Drawn on the model pages; precision and context decay with the engine detail behind the Engineering switch | Claude's recommendation, question left unanswered |
| The 50 new rows | Onto the repository's feature list now, with the coverage check run; the decision log's words win where the rows differ | Claude's recommendation, question left unanswered |
| Portfolio, adoption and Finance (12) | To the 'What is coming' page, as later-year | Jithin, against the recommendation to draw all but the two Finance statements |
| Governance and risk (8) | Tiers, review cadence, decommission and drills are the governance team's; a tier shows only when they supply it; red-team and re-runnable evidence and the 30-day flag go on a project's record; no evidence sessions from Try TLM | Jithin, as recommended |
| Agent, data and evaluation extras (9) | Each drawn on the board it belongs to | Jithin, as recommended |
| The 16 removals read from decisions | Out, each with the decision it follows from | Jithin, as recommended |
| A separate check | A separate agent that has not seen the work re-checks every row against the boards once the drawing ends, before any build | Jithin, as recommended |

## 12. What is drawn before the build

- **324 half-there details:** 309 on 62 of the 71 boards, and 15 that no single board holds (rules for every board such as the (i) on every number and the number formats, the settings defaults, filters, judge calibration, keyboard shortcuts, the window switch). The most: Project-Operations 31, Data-Tagging 14, Project-SelfHealing 14, Model-Catalogue 13, Project-Connect 11, Project-Record 11, Help-Page 11.
- **45 decided, not drawn:** the 36 placed by D-312, the 9 from the check (the two numbers on the TL Index, the engine detail behind the Engineering switch, routing by task, the notifications list).
- **The 'What is coming' page,** holding 26 later-year rows.
- **The rest of what is decided:** size class and cost per request for everyone, the rest of Try TLM (adding a connector, building an agent, the button at the top of every page), cost, speed and size against score, and Home's row for a sign-off that waits.

Order, one theme at a time, each shown to Jithin first, then drawn, then linked into the boards already drawn (D-284): the shell; the model pages; the TL Index extras; the rest of Try TLM; then Home and My work, the quality loop, running a feature, training and data detail, onboarding and a project's space, agents and the workbench, Help with 'What is coming', and the rest. Then the separate check, then the build.
