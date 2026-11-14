# ThinkLatent Portal (portal) · Build 2 check

14 November 2026 · v0.1, for approval · TL-003 · for Jithin, Head of ThinkLatent

## 1. The answer

Build 2, Models, is complete on the branch `build-2-models` and on the private build page. All 14 boards have their screen, every screen was put beside its board at 1,440 wide, and every repository check passes. It waits for Jithin's approval before it goes to main and build 3 begins.

The check found two small faults, both fixed, and two things that stay as they are on a phone (section 3). There are 27 places where boards disagreed and Claude settled the value (section 5); one is still open (section 7).

## 2. What is built

| Board | Screen | Where |
|---|---|---|
| Model-Catalogue | The Catalogue | `/models` |
| Model-Page | A model's Overview, for all ten models | `/models/<model>` |
| Model-Card | Card tab | `/models/<model>/card` |
| Model-Improvement | Improvement tab | `/models/<model>/improvement` |
| Model-Usage | Usage tab | `/models/<model>/usage` |
| Model-Adoption | Adoption tab | `/models/<model>/adoption` |
| Model-CostAvoided | Cost avoided tab | `/models/<model>/cost-avoided` |
| Model-TLIndex | TL Index tab | `/models/<model>/tl-index` |
| Model-BuiltFrom | Built from tab | `/models/<model>/built-from` |
| Model-Training | Training tab | `/models/<model>/training` |
| Model-Versions | Versions tab | `/models/<model>/versions` |
| Model-Speech | The speech model's own Overview, with two tabs of its own | `/models/speech-recognition` |
| System-CallProcessing | Call processing | `/models/systems/call-processing` |
| System-NextBestAction | Next best action | `/models/systems/next-best-action` |

Every model in the Catalogue has every tab (Jithin's answer, D-334). Domain-Advice v2 is the model the boards draw; Core 4.2 is the one the Training board draws; the other models carry made-up sample data kept to the Catalogue's facts.

## 3. What the check did and found

**Done by machine, on every screen of build 2** (104 screens, each at 1,440 wide, on a phone at 390 wide, and in dark: 312 page loads):

- No screen is wider than its window.
- No page error and no console error.
- No stray text (`undefined`, `NaN`, `null`, a placeholder such as `$[cost]`, or 'Not built yet').
- One page title on every screen, and no button, link, tab or mark without a name.
- Every link was followed: 60 open a built page, 3 open a page a later build makes (Projects, TL Index, Try TLM), none is dead.
- The employer's name appears nowhere in the code, the built page or the register.

**Done by eye:**

- Each of the 14 screens beside its board at 1,440 wide (the pictures sent with each tab).
- On a phone: the Catalogue, all ten tabs of a model, the speech model's three screens and both systems.
- In dark: the same set, at reduced size, enough to see that nothing is unreadable or left white.

**One sample world.** 13 tests with 174 checks hold the pages to each other: the Catalogue against Home, each model's page against the Catalogue, cost avoided counted once, the speech model's lines adding up to the model, the systems' models carrying the Catalogue's scores.

**Found and fixed:**

1. A feature in Build was said to be 'trying' its model. It now reads 'is building on'.
2. On a phone the 'This model' mark on the speech leaderboard broke across two lines.

**Found and left, with the reason:**

1. On a phone the day charts (14 days on Overview, 30 days on Usage) run their dates together. The kit's bar chart draws every label and the kit is not edited here; it is an ask of the design-kit session. The table behind the chart still reads.
2. On a phone the lineage picture on Built from scrolls sideways. The portal is a desktop application first.

## 4. What differs from the boards

The same few differences recur, because the screens are made from kit components:

- **Charts** are the kit's, with an axis and a table twin. They do not draw the boards' shaded bands, checkpoint marks or notes at a point.
- **Scores** read `84% ± 1` and changes `+5 pts`, as the kit's number rule writes them.
- **Status** is the kit's glyph and word, not a coloured chip.
- **Rows** float as the kit's row list does, where the boards rule them; the kit's tables carry page controls.
- **Steps** are the kit's numbered steps, not the boards' bars of chips.
- **Tiles** carry the kit's icons.

By screen, beyond those:

| Screen | What else differs |
|---|---|
| Catalogue | Three shelves no board draws say 'not drawn yet' |
| Overview | The first chip is the highlighted one, not 'Live' |
| Card | Confirming a draft is hold-to-confirm, not a plain button; exports make no file; links to Data and a project's Plan wait for builds 9 and 5 |
| Usage | Hours to come are filled bars; tokens out share the scale of tokens in |
| Adoption | The boxes do not open a list |
| Cost avoided | A layer shows its working in the row, it does not open |
| TL Index | Parts of a pillar are a dot against the threshold; head to head has no line at the even split |
| Built from | Boxes are rounder and a little wider |
| Training | No shaded 'still to run' on the loss chart; no 'open all' on the log |
| Versions | No link to 'the offer, as the project sees it' until project pages exist |
| Speech | Tokens read 720M where the board writes 0.72B |
| Systems | A model's measure is named as the Catalogue names it |

Seven pieces were hand-built to match a board because the kit cannot draw them, each recorded (D-247): the Home teams table, the score mark in a row, the mark for two versions of a score, the dots of a field, the lineage picture, the GPU cells, and scores written with one decimal.

## 5. Board clashes Claude settled

Rule (D-334): where boards disagree on a sample fact, take the value most boards use, or the one from the board about that thing itself, keep every page on it, and list it. To overrule one, name its number.

**Across pages**

| # | Settled as | Instead of | Decision |
|---|---|---|---|
| C1 | 'Today' is the day so far, to 11:58 | A full day, as the Overview board draws it | D-337 |
| C2 | Home's 7 days, 30 days and quarter follow that calendar | Claude's earlier round figures | D-337 |
| C3 | Home counts 7 projects, with Email triage in Build | 8 projects with one in Try, on Home's tile | D-342 |
| C4 | Help shows 7 open problems | 4, on the Help board | D-342 |
| C5 | 'Used in' counts every project and feature that has chosen a model, at any stage | 1 project and 2 features for Domain-Advice on three boards | D-334 |
| C6 | Cost avoided is counted once, on the model that carries the feature | Shown on every model a feature touches | D-334 |

**Models**

| # | Settled as | Instead of | Decision |
|---|---|---|---|
| C7 | Calls that fail read 0.13% for Domain-Advice | 0.12% | D-337 |
| C8 | Domain-Advice writes 405M tokens out in 30 days | 415M | D-337 |
| C9 | Next best action shows its Pilot score, 94% ± 3 | 'Scored in Pilot' | D-338 |
| C10 | Pillar scores and speech versions follow the two leaderboards | Claude's earlier made-up values | D-340 |
| C11 | Core has no version 4.0; a project's own version shows only for Advisor desktop | Claude's earlier made-up version | D-341 |
| C12 | Claims intake is on Distil 4.2 | Directly on Core, on the Training board | D-342 |
| C13 | Email triage's feature on Call classification waits for build 5 | Shown now, from the Organization board | D-342 |
| C14 | Version 1 of Domain-Advice scores 79 ± 1 | 'Before the Index scored it' | D-343 |
| C15 | The strengthened version is Advisor desktop's Call summary | A second project's | D-343 |
| C16 | The registry counts 2 endpoints for Domain-Advice | 3 | D-343 |
| C17 | 3 replicas at release | 2 machines | D-343 |
| C18 | A project's own results run when the new version is released | Already run when it is told | D-343 |
| C19 | Engine detail follows the Engineering switch | Shown with the switch off | D-343 |

**The speech model and the systems**

| # | Settled as | Instead of | Decision |
|---|---|---|---|
| C20 | Speech has eleven tabs: the board's eight, plus Card, Training and Versions | Eight | D-344 |
| C21 | 'Enterprise call platform · Call processing' | 'Call processing · Every call to text' | D-344 |
| C22 | 'Speech recognition' on its page, 'Speech recognition v6' elsewhere | One name everywhere | D-344 |
| C23 | The 'Shared endpoint' chip stays | Left out | D-344 |
| C24 | A system's volume is its calls so far today, 154k and 5k | 38,400 and 2,100 a day | D-345 |
| C25 | Next best action is in Pilot since 28 Oct | 12 Oct | D-345 |
| C26 | Claims intake is in Pilot, under Claims Ops Tech | 'Claims · Production' | D-345 |
| C27 | 'Ready in 40 seconds for a 6-minute call' kept as drawn | Reconciled with 12 seconds for speech alone | D-345 |

## 6. Made up by Claude, on no board

These fill the nine models the boards do not draw, and the places where a board prints a placeholder.

- **Money.** All money is sample money (D-329). The outside prices behind cost avoided ($45 and $135 a million tokens) were chosen so the working gives Home's total. They are far above real list prices; at real prices the first layer would be much smaller. Real prices and a real endpoint cost are needed before anyone outside ThinkLatent sees these figures (D-339).
- **Each model's history.** Earlier versions, their dates and scores; time to answer, failures, replicas and headroom; calls by hour.
- **People and features.** Two contacts, Elena V. and Tomás B.; the features Reply drafts and Email summary; Chat answers' scores on Core 4.2 and Core 3.4.
- **The TL Index.** Votes between pairs that do not involve Domain-Advice; the parts of a pillar for three models.
- **Versions.** Core 4.2 ends 7 Feb and its projects were told 26 Oct; scores at lower precision and at longer inputs for Core, Distil and Core 3.4; cost and speed at full and 4-bit precision.
- **Speech.** The tabs 'By business line' and 'Speech leaderboard' are named on the board and drawn on no board. They were built from the Overview's table and the leaderboards board.

## 7. Open with Jithin

1. **Home's count of features under their threshold.** Next best action has a line under its threshold (answers within 2 seconds: 93% against 95%). Home counts one, Claims triage. Recommendation: Home counts both and names both, so the number means the same thing on every page.
2. **'Bar' or 'threshold'.** The boards use both ('Its bar: 8% or lower' on the speech model, 'Threshold 85%' on the systems), and the screens follow each board. The controlled vocabulary (D-229) lists 'bar'. One word would be better; it touches every build, so it is a decision, not a fix.
3. **An appetite for each build** (section 9).
4. Carried from before: real outside prices and endpoint costs; which outside image model; an estimate for rebuilding LibreChat's screens; the weekly review slot the Building gate asks for (D-152).

## 8. Features and asks of the kit

**Coverage:** 762 features · Built 29 · Partly 63 · Not built 631 · the rest moved, not a screen, open or later. Since the Catalogue was built, the first screen of build 2, Built has gone from 23 to 29 and Partly from 35 to 63. Most rows stay Partly because the feature spans a later build (the offer to a project, the registry across models, the leaderboards page).

**Asks of the design-kit session (TL-013)**, none blocking:

1. A mark inside a row (a score against a line, two versions of a score, the dots of a field).
2. A decimal in the number helpers.
3. A table without page controls when its rows fit, and rows that open and close.
4. A graph of nodes and edges, with a tree twin.
5. A meter drawn as cells; a line chart on a numeric axis with a mark for 'now'.
6. A bar chart that thins its labels when they do not fit.

## 9. A proposed appetite for builds 3 to 9

**What the pace has been.** Build 2's 14 boards took one working day of sessions, record included: about half an hour a board. Build 1's 8 boards took less than a day.

**The proposal: one hour a board, twice the pace so far,** so there is room for the harder screens, plus two days in build 4 to stand LibreChat up and size its rebuild.

| Build | Boards | Appetite, working days |
|---|---|---|
| 3 · TL Index | 11 | 1.5 |
| 4 · Try TLM | 3 | 2.5 |
| 5 · A project | 12 | 1.5 |
| 6 · Running a project | 11 | 1.5 |
| 7 · Features and increments | 10 | 1.5 |
| 8 · Agents and prompts | 5 | 0.5 |
| 9 · Data and training | 13 | 1.5 |
| **Total** | **65** | **10.5, about 2 engineer-weeks** |

A build that reaches its number stops and comes to Jithin with what is done and what to cut. It is not extended. Each build ends with one review by Jithin; seven reviews in all.

**Where this is thin.** The pace was measured on two builds in one day, on screens with sample data only. Build 4 depends on LibreChat running, which has not been tried. Build 6 has traces in five views, the most complex screens on the canvas. Jithin's review time, not build time, sets the calendar.

## 10. Where this check is thin

- **The builder checked its own work.** The lab's rule is a separate agent that has not seen the work; none ran here. A second pass by a fresh session would be worth more than this one.
- **By eye, on a phone and in dark, only Domain-Advice was looked at tab by tab.** The other nine models were checked by machine: width, errors and stray text, not layout.
- **No screen reader was run.** Names and headings were checked by machine; reading order and the charts' table twins were not listened to.
- **The keyboard was tried on a few controls** (hold-to-confirm, tabs), not on every screen.
- **The numbers agree with each other; none is real.**
