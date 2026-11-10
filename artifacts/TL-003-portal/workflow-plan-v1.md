# ThinkLatent Portal (portal) — Workflow plan v1

10 Nov 2026 · TL-003 portal · decided with the Head of ThinkLatent on questions with recommendations · design-kit 1b277ff (v0.6.2, unchanged since the pin)

## 1. Why change

The 22 v6 pages are accurate but organised around what the portal knows, not what a person came to do.

| Today | Problem for a user |
| --- | --- |
| One 11-item menu for everyone, named after things (Models, Projects, Training, Data, Evaluation, Agents, Approvals…) | A person must work out which items matter to them and in what order |
| A use case has 6 tabs; each is a page 4,000–9,500 px long with 10–14 sections, all open | The one thing to act on sits among a dozen things to read |
| The lifecycle (POC → build → pilot → production) is a status chip | No page says "you are here, this blocks the next stage, do this" |
| Multi-step jobs are spread over several pages | Only "Start a project" is a guided flow |
| Pages fixed at 1440 px | Nothing works on a phone |

## 2. Decisions (10 Nov)

| # | Now | Decided |
| --- | --- | --- |
| 1 | Same 11-item menu for all | **Role workspaces.** Each role has its own home ("your next step") and a short menu; everything else under All |
| 2 | Home's "Preview as" has five views | **Five workspaces**: Application team, Foundation team, Approver, Head of ThinkLatent, Operations; plus a simple **Explore** home for people with no role. A person with two roles switches from their profile |
| 3 | Use case = 6 long tabs | **Journey page**: stage tracker, what blocks the next stage, one action each; detail on demand |
| 4 | Every page redrawn as a board before code (decision 16) | **Clickable prototype first**, in the portal repo on the kit and the sample data. Boards only where a page still needs design thinking |
| 5 | — | **First journey: Application team**, onboarding to production, on UC-0291 (Retail Advice) |
| 6 | No phone design | **Phone later**, but the prototype is responsive from the start. On phones the menu is a **bottom bar**; this needs a phone shell from the design-kit chat (request DK-002) |

## 3. The five workspaces

| Workspace | Their job | Home shows | Menu |
| --- | --- | --- | --- |
| Application team | Get my use case to production and keep it healthy | My use cases, each with its stage and one next step | Home · My use cases · Models and playground · Ask |
| Foundation team | Train, run and watch models | Runs in flight, models to watch, review queues | Home · Training · Models · Data · Evaluation |
| Approver | Decide with evidence | Requests waiting, oldest first, each with a recommendation | Home · Requests · Evidence (TL Index) · Playground |
| Head of ThinkLatent | What needs me today | Decisions waiting, portfolio by stage, what changed | Home · Decisions · Portfolio · TL Index |
| Operations | Keep the platform safe and running | Open alerts, capacity, unregistered usage, break-glass | Home · Alerts · Capacity · Usage · Audit |
| Explore (no role) | Find out what exists | Models, playground, start a project | Home · Models · Playground · Start a project |

Every menu ends with **All** (the full list) and search (⌘K). Access rules are unchanged: a workspace changes what is put in front of you, not what you are allowed to see.

## 4. The first journey: Application team

One page per use case. The top never changes: **stage tracker**, then **"To reach the next stage"** (a short checklist, each line with one action), then **"How it is doing"** (four numbers). Everything else opens on demand.

| Stage | What the person does | Guided flow | What exists today that it reuses |
| --- | --- | --- | --- |
| 1. Start | Describe the job, the data boundary, pick a model with the Onboarding agent | Start a project (4 steps) | v6 J0 |
| 2. POC | Get keys, make the first call, try in the playground | First call (3 steps) | v6 J10, J2 |
| 3. Active build | Bring data in, set bars, run the first evaluation | Bring data (upload or S3); Run an evaluation | v6 W2, E1 |
| 4. Request pilot | Check the gate, ask for a pilot | Request a stage change | v6 J2 gates, V1 |
| 5. Pilot in production | Watch health, answer alerts, read findings | — (journey page plus detail panels) | v6 J3, J4, J5, J7, W3 |
| 6. Fix findings | See what failed, start retraining, watch the canary | Improve (plan, train, canary) | v6 J8, T1, T6, J6 |
| 7. Request production | Resubmit with the new evidence | Request a stage change | v6 V1, V1b |
| 8. Production | Keep it healthy; the record is complete | — | v6 J9 |

**Detail on demand.** The six old tabs become panels opened from the journey page: Performance, Quality, Models and canary, Improve, Record, Cost. Their content and numbers come from the pages already drawn; nothing is thrown away.

**Story days.** The sample data already tells one story with dates (start 5 Nov for the custodian-breaks project; UC-0291 sent back 5 Nov, approved 20 Nov). The prototype gets a "story day" switch so the whole journey can be walked in a few minutes.

## 5. The prototype

- In `thinklatent-labs/portal`: React, Vite, TanStack Router and Query, Zod, a fake API on the scenario; the kit pinned at 1b277ff; only usable components, through kit wrappers; charts from `@kit/charts`; numbers through the kit's helpers.
- Responsive from the first screen (phone, tablet, desktop). The phone bottom bar arrives when the kit ships its phone shell; until then the phone uses a top menu drawer.
- Published as a private page you can open on desktop and phone.
- Scope of the first build: the Application team workspace (home, journey page, the five guided flows, six detail panels) and the workspace switcher. Other workspaces show their home only.

## 6. Pre-registered hypotheses

| | Hypothesis | Confirms | Refutes |
| --- | --- | --- | --- |
| W1 | A first-time application-team user can say their next step from Home within 10 seconds | In the walk-through, the next step is named without scrolling or opening All | The reviewer scrolls, opens All, or asks "where do I…" |
| W2 | The journey can be completed from Start to Production without the All menu | Zero uses of All across the eight stages | Any stage needs All |
| W3 | Detail on demand loses nothing people need | Every number asked for in review is reachable in two clicks or fewer | A needed number takes more, or is missing |

## 7. Where this is thin

- **One reviewer.** The Head of ThinkLatent is not an application-team user. Evidence that would fix it: two or three people from an application team walk the prototype.
- **Scope grew.** Operations is a fifth workspace. It gets only a home in the first build.
- **Fake data hides backend limits.** The prototype proves the workflow, not feasibility; the telemetry contract (TL-009) still decides what the real pages can show.
- **Sunk boards.** 22 pages were drawn in the old layout. Their content is reused as panels, but about 48 undrawn pages will now be designed in code, not on the canvas.

## 8. Next

1. Build the Application team journey prototype (this chat, on your go-ahead).
2. Design-kit chat: request DK-002, a phone shell with a bottom bar (phones only).
3. Walk-through with you; read W1 to W3; adjust.
4. Then the Approver workspace, then the others, then the phone design.
