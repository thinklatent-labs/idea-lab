# ThinkLatent Portal (portal) · Build plan

14 November 2026 · v0.1, for approval · TL-003 · for Jithin, Head of ThinkLatent

## 1. The answer

The 87 boards are built in **9 builds**, one section of the portal at a time. Each build ends with a section that works end to end inside the one portal, shown to Jithin before the next begins. Nothing starts until Jithin approves this plan (D-326).

## 2. What you get after the build

- **One working portal**, in the private repository `thinklatent-labs/portal`, opened from a private link. Every one of the 87 boards is a real screen you can click through: the shell, ⌘K, the inbox, Home, the Catalogue and model pages, the TL Index, projects, features, traces, agents, data and training, and Try TLM.
- **Built from the design kit**, so it looks like the boards at 1,440 wide, in light and dark.
- **On sample data.** Every number comes from one sample scenario (one set of made-up models, projects, runs and scores that agree with each other across pages). It is not connected to the Enterprise's systems.
- **A coverage page** that says, for each of the 762 listed features, built, missing or dropped.

**What you do not get from this build:**

- Real data. Relay, the trace store, the training stack, access management and the TL Index's own runs are not wired in. That needs the backend requirement documents (five are still to write) and the Enterprise's environment.
- A working Try TLM chat. Build 4 stands LibreChat up and sizes the work; until LibreChat's server runs inside the Enterprise, the Try TLM screens show sample conversations.
- Anything Risk, IT security or governance must approve. Those are outside the lab.

## 3. The nine builds

| # | Build | Boards | What works at the end |
|---|---|---|---|
| 1 | **The shell and Home** | 8 | The frame every page sits in: header, dock, ⌘K, shortcuts, inbox, settings, the six page states, light and dark; Home, My work, Requests, Help with 'What is coming', Jarvis |
| 2 | **Models** | 14 | The Catalogue; a model's eight tabs, card and versions; the speech model; the two systems of models |
| 3 | **TL Index** | 11 | Leaderboards, pillars, head to head, editions, trends, the queue, upkeep, offering a set, the programme |
| 4 | **Try TLM** | 3 | The chat, agents and tools, and the rest of LibreChat, as kit screens on sample conversations; LibreChat stood up unchanged beside it and the full rebuild sized |
| 5 | **A project** | 12 | Organization and team pages, All projects, starting a project, a project's Overview, open view, Plan, Features, Connect, Members and Record |
| 6 | **Running a project** | 11 | Operations for a project and across the Enterprise, an incident, sessions and traces in five views, Quality and the quality loop, value across the Enterprise |
| 7 | **Features and increments** | 10 | A feature's tabs, Models and flow, prompts, the evaluation set and building its next version, increments, rollout, new version, smaller model, self-healing |
| 8 | **Agents and prompts** | 5 | The library, the register, an agent's page, agents at work, the prompt library |
| 9 | **Data and training** | 13 | For the foundation team: data sets, tags, reviews, reviewers, mixes; recipes, runs, a run live, files, the base shelf |

Boards in each build:

1. Shell-Find, Shell-Settings, Home-Cockpit, My-Work, Requests-Status, Help-Page, Help-More, Jarvis-Ask
2. Model-Catalogue, Model-Page, Model-Card, Model-Versions, Model-TLIndex, Model-Usage, Model-Adoption, Model-CostAvoided, Model-Improvement, Model-BuiltFrom, Model-Training, Model-Speech, System-CallProcessing, System-NextBestAction
3. Index-Leaderboards, Index-Language, Index-Pillar, Index-HeadToHead, Index-Decision, Index-Edition, Index-Trends, Index-Queue, Index-Upkeep, Index-Offer, Index-Programme
4. Playground, Playground-Build, Playground-More
5. Organization-Page, Team-Page, Projects-All, Start-Project, Project-Start, Project-Page, Project-OpenView, Project-Plan, Project-Features, Project-Connect, Project-Members, Project-Record
6. Project-Operations, Enterprise-Operations, Project-Incident, Project-Sessions, Project-Traces, Traces-Timeline, Traces-Graph, Traces-Log, Project-Quality, Project-QualityLoop, Value-Enterprise
7. Feature-Page, Feature-Flow, Feature-Prompts, Feature-Evaluation, Feature-EvalBuild, Project-Increments, Increment-Rollout, Project-NewVersion, Project-SmallerModel, Project-SelfHealing
8. Agents-Library, Agents-Register, Agent-Page, Agents-AtWork, Prompt-Library
9. Models-Data, Data-Sets, Data-Set, Data-Tagging, Data-Review, Data-Reviewers, Data-Mix, Models-Training, Training-Recipe, Training-Runs, Training-Run, Training-Live, Training-Files

## 4. How each build runs

1. **Sample data first.** The numbers the build's boards show go into the one scenario, so every page agrees with every other.
2. **One tab at a time.** Each board becomes a screen from kit components, in the order listed; Jithin can look at any time.
3. **Side by side.** Each screen is put beside its board at 1,440 wide and what differs is written down.
4. **Rows checked.** The feature rows for that screen are marked built, missing or dropped (D-326). Missing ones come to Jithin with the build.
5. **Integrated.** The section is reachable from the dock, ⌘K and the links on other pages; the repository's checks pass.
6. **Shown.** A private link and a short note: what is built, what differs from the boards, what is missing. Jithin approves or sends back before the next build starts.

## 5. Where this plan is thin

- **No time estimate.** Jithin set no appetite and no weekly review slot; the lab's Building gate (D-152) asks for both. Without an appetite nothing forces a cut when a build runs long. A number per build would fix this after build 1 shows the pace.
- **The independent check did not finish.** Which details are missing is found screen by screen, so surprises arrive during the build, not before it.
- **The old prototype is in the way.** The repository holds about 20 pages built before these boards. Build 1 replaces the shell; whether the old pages are deleted at once or as each build replaces them is a choice inside build 1.
- **The kit may lack pieces.** Where a board shows something the kit cannot draw, the rule is to ask the design-kit session (TL-013) or hand-build and record it (D-247). Build 1 will show how often that happens.
- **Try TLM is the least known.** Three boards, but all of LibreChat behind them. Build 4 only sizes it.

## 6. Hypothesis

The portal can be built board by board from the kit without redrawing. Confirmed if builds 1 to 3 finish with fewer than one hand-built piece per three boards and Jithin sends back fewer than one screen in five. Refuted if the kit gaps or the send-backs run higher; then the boards or the kit are fixed before build 4.
