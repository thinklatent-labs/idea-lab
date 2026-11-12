# ThinkLatent Portal (portal) · Requirement round check

12 November 2026 · v1.0 · TL-003 · for Jithin, Head of ThinkLatent

## 1. The answer

The 42 boards are approved as the design. The portal is not ready to build from them yet, for three reasons:

1. **The feature list and the new canvas have drifted apart.** Of the 712 listed features, 98 are fully on a board, 355 are half there, 56 were removed by a recorded decision, and 203 are on no board with no decision removing them.
2. **The repository cannot build these boards yet.** None of the sample world the boards use is in the scenario package, the repository's rule still names the old boards as the ones that come first, and the feature list stops at 11 November.
3. **The boards disagree in nine places**, and 479 of the 886 links between them lead nowhere.

Jithin's decision on 12 November: **draw everything that is listed before building.** So the next step is more drawing, in the order in section 9, with the Playground last.

## 2. How the check was done

- **Three independent auditors** (separate agents that had not seen the design work) each took a third of the 712 features and gave every row one verdict against the text of all 42 boards and a list of 23 recorded decisions. They were told to be strict: a button that names a thing, with no board showing the thing, counts as half there.
- **My own checks:** every link on every board; the prototype repository (sample data, board rule, feature list, existing pages); the design kit's charts and components against what the boards draw; the backend requirement documents; and Jithin's stated requirements since 11 November, one by one.
- **Not checked:** whether the numbers on each board are right against each other beyond what the auditors caught; the phone layout (later, by decision); real data.

Every row's verdict is in `requirement-round-check-verdicts.csv`, beside this file.

## 3. The result in numbers

| Source of the feature | Rows | Drawn | Half there | Removed by decision | On no board |
|---|---|---|---|---|---|
| The old approved boards | 556 | 51 | 297 | 39 | 169 |
| Asked for (journeys, access, experience rules) | 85 | 18 | 39 | 15 | 13 |
| New since 11 November | 46 | 28 | 12 | 1 | 5 |
| Later-year vision | 25 | 1 | 7 | 1 | 16 |
| **All** | **712** | **98** | **355** | **56** | **203** |

Removed by decision, by which decision: approvals outside the portal 22, no roles 14, no direct training by projects 7, development activity moved to Cortex 5, no budgets 2, the seal switch 2, desktop first 2, others 2.

How to read the "half there" figure: the old boards were dense, role-based pages. The new canvas re-homes most of what they did, but rarely with every detail a row names. About half of these rows need a line or a control added to a board that exists; the rest need a board of their own.

## 4. What is missing, by theme

Half there plus on no board: 558 rows, in 21 themes. Ordered by how many are on no board.

| Theme | Rows | On no board | What it is |
|---|---|---|---|
| Data work | 49 | 27 | Tagging pipelines, review queues with assigned reviews, self-healing marks on data, the data-set register with versions, retention and withdrawal, mined tasks and topics |
| Agents | 29 | 19 | The library of reusable agents, an agent's page, pick a model then its agent, agent evaluation, the agents' action log, pause and runbooks |
| Later-year vision and TL Index extras | 27 | 18 | The 2027 to 2031 rows and Index ideas not yet placed |
| TL Index upkeep and evaluation queue | 61 | 16 | Editions and their differences, corrections, pillar pages, contributed data, evaluation requests and their queue, live runs, judge calibration, trends |
| Rollout and serving detail | 53 | 16 | Aliases, how a canary is judged, routing, right-sizing, rate limits and temporary increases, capacity detail |
| Enterprise-wide operations and audit | 29 | 14 | Unregistered usage, capacity and GPUs across the cluster, the audit trail and its export, access logging |
| Shell, settings, notifications | 37 | 13 | Settings, the inbox and notifications, search results, dark theme, tooltips, side sheets, saved views, undo |
| Sign-offs and governance portfolio | 21 | 12 | Attestations, the Index edition sign-off, review queues, risk tiers, policy sources, evidence export |
| Prompt workbench | 12 | 11 | Prompt versions, compare, library, rollout |
| Playground | 14 | 10 | Try a model, compare two, open a result in a project. Today only a button |
| Alerts, incidents, drift, red-team | 47 | 10 | Where an alert lives, escalation, incidents, drift watch, red-team results, the weekly digest |
| Keys and how to call a model | 12 | 8 | The key register, the tags every call must carry, how to call through Relay, what an untagged call does |
| Catalogue facts and model health | 40 | 8 | The model card, compare models, the registry, health, retirement |
| Portfolio, adoption, value, Finance statements | 35 | 7 | Portfolio views across projects, monthly statements |
| Training run detail | 31 | 6 | Run history, compare runs, the registry, charts, GPU and logs beyond the one Training tab |
| Process rules no board can show | 5 | 4 | Rules about how the team works, and open decisions |
| The record | 15 | 2 | Risk tier, findings, limits, completeness, the audit pack |
| Onboarding intake | 15 | 1 | The intake queue behind Start a project |
| Help extras | 6 | 1 | Office hours, articles, unanswered questions |
| Production quality signals | 12 | 0 | Details of the loop and the canary |
| Journey and Home details | 8 | 0 | Details of the plan and the Home leaderboard |

Two more gaps the feature list does not carry, found in my own pass:

- **What a non-member sees.** Every project board is drawn as its owner sees it. The open view, which most of the Enterprise will see, is on no board.
- **States.** Empty, first-run, loading, failed, sealed and "you cannot open this" are drawn nowhere.

## 5. Asked for since 11 November, and not yet on the feature list

The list's newest rows are from 11 November. Everything drawn since is not on it, so the repository's coverage check cannot see it: the Organization, Team, Project, Feature structure and the scope bar; a project's nine tabs; a model's eight tabs; Traces in five views; Self-healing and training; the new-version offer and the 90-day window; ranges for measures and requirements; support on decisions; cost avoided in five layers and the Value page; Requests and their status in four kinds; My work; Start a project with Jarvis; the Plan with lead times; Help; Ask Jarvis; Head to head; leaderboards by kind; the consulting-session door. These need rows before the build, or the "nothing is dropped" check passes while missing them.

## 6. Where the boards disagree

All three auditors found the first five on their own.

1. **The three early option boards** (Main, B, C) still show the tabs Sessions, Training and Data, the reranker and "Approvals". They were options for the navigation, not design. They should leave the canvas.
2. **The harness is named on Traces** ("Harness on from turn 2", "Gateway and harness", "Kept by the harness"). Decided 12 November: the harness is a backend feature and does not come into the portal. To remove.
3. **The project page** still has a card "Sessions · production text is sealed, totals only". Sessions are folded into Traces and text sits behind the seal switch.
4. **The Decision adapter** is "TLM1 · task model" on the Features tab and TLM4 in the catalogue. TLM4 is right.
5. **The Plan** says "Train on the project's data … once data is staged". Projects bring no data.
6. **Home** counts "1 model validation" among requests; the Requests page has no such kind.
7. **My work** lists evidence as "Pilot traffic, the model card, the rollback plan"; Increments has five different pieces.
8. **Core 4.2's dates:** "live since 14 Jan" on the Training tab, "cleared 2 Sep" on Built from, while version 1 of Domain-Advice (14 Jul) is drawn on Core 4.1.
9. **Who starts a project's own version:** "Started by the project" on Built from; "run by ThinkLatent AI engineering outside the portal" on Self-healing.

Also: 479 of 886 links lead nowhere, and 12 boards cannot be reached from any other board (among them a model's Improvement, Usage, TL Index, Built from and Training tabs, and three of the Traces views).

## 7. The backend requirement

Written (3): traces and sessions; self-healing and training; model training and release.

Not written (about 12 areas): value in five layers; quality, ranges and evaluation sets; increments, evidence and change requests; requests and problems, with tickets; members, access and the seal; operations and the SRE agent; the TL Index, leaderboards and Head to head; the catalogue, usage and adoption; Jarvis and the other agents; Help and answered questions; Home and the roll-ups; the plan and its lead times.

The wireframe is meant to be what the team builds the backend to. Until these exist, the team has screens without field lists for most of the product.

## 8. Is the repository ready?

| Check | Finding |
|---|---|
| Sample data | The scenario package has none of the boards' world: no Advisor desktop, Retail Business, Advice Tech, Call summary, increments or change requests. Every number must come from there, so this is the first build task. |
| "The boards come first" | The repository's instruction file names the old boards (interface v5.1). It must name the new canvas for the pages it covers, or a build will copy the old ones. |
| Feature list | Stops at 11 November (section 5). States need resetting from this audit. |
| Existing pages | Twenty pages and the workspaces, homes and journey folders are built on roles, which were dropped. Most will be replaced, not edited. |
| Design kit | Good fit. The kit has a chart or component for nearly every exhibit drawn: bullet chart for ranges, dumbbell for version change, heat map, funnel, waterfall, sankey, timeline, tree view, a node-and-edge canvas for lineage, and the chat pieces for Jarvis. A few pieces will be hand-built to match the board, which is allowed. |
| Per-screen choice of form | Not done for any new board. Each page file needs its lines (the reader's question, the form, the component, why not the next best) before it is built. |

## 9. The next step, in order

Decided 12 November: draw all that is listed, then build. **One theme at a time:** each is discussed with Jithin first, then drawn, then linked into the boards that already exist, before the next one starts.

1. **Put the canvas in order.** Fix the nine disagreements, take the harness out of Traces, retire the three option boards, bring the earliest boards (project page, team page, model page, Home) up to the later decisions, and make the links work.
2. **Draw the main-path gaps:** Connect (keys, tags, how to call, rate limits); what a non-member sees; the Agents library, an agent's page and the agents' action log.
3. **Draw the rest, theme by theme:** operations depth (alerts and incidents, rollout and serving, enterprise-wide operations, the audit trail); the foundation team's side (data work, training run detail, prompt workbench); TL Index upkeep and the evaluation queue; models and portfolio detail (model card, compare, portfolio, statements, the record); the shell (settings, notifications, search, dark theme, states); Help extras; the later-year rows.
4. **Draw the Playground, last,** with Jithin, who wants to design it further.
5. **Then prepare the repository:** new rows on the feature list and states from this audit; the board rule pointed at the new canvas; the sample world written into the scenario package.
6. **Then build,** shell first (dock, scope bar, tabs by level), one board at a time, each set side by side with its board at 1,440 wide.
7. **Alongside:** the backend requirement for each area, written in the order its screens are drawn.

Rough size of steps 1 to 4: 25 to 30 more boards.

## 10. Decisions taken on 12 November

- The 42 boards are approved as the design.
- Connect, the non-member view, the Agents library and the Playground are all drawn before the build; the Playground last.
- Every other listed feature is drawn before building, one theme at a time: discussed first, then drawn, then linked into what is already drawn.
- Attestations, the TL Index edition sign-off and the approval review queues leave with approvals. The portal prepares evidence and shows status. (Review queues for tagging and sensitive data stay, as data work.)
- The harness is a backend feature and is not shown in the portal.

## 11. Where this check is thin

- The auditors read text, not pictures. A feature shown only as a chart with no words may have been marked missing.
- "Half there" is a wide verdict. The 355 have not been split into "add a line" and "needs a board".
- The three auditors each saw a third of the list, so a feature split across two rows in different thirds was judged twice, separately.
- Section 5 is a list from the decision log, not a count.
