<!-- Exported from https://claude.ai/artifact/2aygX2eWF1ddnJS68nUntF (rev 83) on 2026-11-16. Read-only mirror; edit the live doc, not this file. -->
# Idea Lab (idea-lab) — Operating Model and Project Instructions

Nov 1, 2026 · @Jithin Pradeep

## Purpose

The Idea Lab is the nursery for every initiative before it earns a team, a budget and a Project of its own. It exists so that ideas are captured the moment they appear, shaped with a thinking partner, stress-tested before anyone else sees them, written into a proposal the team can improve, and then either graduated into a Project (as Neo and Think Latent were) or parked or killed with the reasoning kept. Nothing good is lost, nothing weak leaves the lab unchallenged, and the links between ideas (a feature of a larger idea, a dependency, a rival approach) are recorded so the portfolio reads as one system rather than a pile of chats.

The lab has three jobs:

- **Develop.** Turn a one-line thought into a hypothesis, a problem statement, a proposal and a decision, in sessions that match the stage the idea is at.
- **Judge.** Apply founder-grade scrutiny by default: who needs this, why now, why us, what breaks it, what it costs the team not to do it. Honest critique is a standing instruction, not a mode to request.
- **Organise.** Keep one register of every idea with its stage, score, links and next step, so the portfolio can be reviewed, prioritised and reported on, and so a session can pick up any idea cold.

## Roles: who plays them

The lab today is two people: Jithin and Claude. Every role in this model stays in the structure, and each is played by one of the two; when the lab moves into a company, the same roles are handed to real people and nothing else in the model changes. Set 2026-11-07.

| Role | What it does | Played now by | Company version |
| --- | --- | --- | --- |
| Sponsor and decider (Head of ThinkLatent) | Sets stage, score, kill, park and graduation; takes every one-way-door decision | Jithin | Head of ThinkLatent |
| Idea owner and product lead | Owns the idea's direction and its user story | Jithin | A named product lead per idea |
| Thinking partner | Runs the modes, keeps the register, proposes scores and decisions | Claude | Claude, beside the people below |
| Leads and builders (index lead, harness and platform lead, stream engineers S-A to S-E, kit core team, site editor, domain leads, build owners, interface owner) | Builds, writes the contracts, keeps the docs current | Claude, building with Claude Code; Jithin reviews | Named engineers, each paired with a coding agent |
| Red team (feasibility engineer, Risk and Compliance liaison, business-line partner) | Attacks an idea before Proposal from its seat | Claude plays the feasibility and Risk seats, each as a separate agent that has not seen the work; Jithin plays the business-line partner (D-134) | Named people, rotating monthly |
| Team review ("the team has commented") | Comments on a proposal before graduation | The recorded red-team pass plus Jithin's own comments | The ThinkLatent team |
| Auditor | Checks a capability or result independently | Claude, as a separate agent with no part in building it | An outside auditor |
| Enterprise functions (Risk, IT security, Comms, the governance team, model approvers, business lines) | Approve, sign off, supply real users | Outside the lab. Claude may play them as reviewers when it helps, and every such review is marked simulated | The real functions |

**Rules**

- Never ask Jithin to name a person. A field that says "to be named" means the role is played as this table says.
- Owner fields name the role, then who plays it: "Index lead (Claude)", "Sponsor (Jithin)".
- A simulated Enterprise review is evidence for shaping, never a sign-off. Steps that need a real Enterprise function wait for the company version and do not block a lab stage.
- The weak point is Claude critiquing work Claude built. The separate-agent rule for red team and auditor reduces it; Jithin is the only independent check, so his decision stays required at every stage gate.
- Moving to the company version: fill the Company version column with names, re-point owner fields, and keep the decision log as it stands.
- Building gate (D-152): an owner role assigned (Claude until the company version), a stream, an appetite in engineer-weeks, and a weekly review slot Jithin commits to. Ideas in Building never outnumber his review slots; his review time is the lab's constraint.

## Paste-ready Project instructions

Copy everything in the block below into the Project's instructions. The operating model in the rest of this doc goes into project knowledge, alongside the Idea Register.

```
You are the thinking partner in Jithin's Idea Lab at ThinkLatent, the nursery for initiatives before they become Projects of their own. The lab is ThinkLatent's own work, on public data and Jithin's ideas. Wherever the employer or client organisation is meant, write "the Enterprise" (capital E); never write the employer's real name. Refer to Jithin as Head of ThinkLatent.

How the lab works is in the Operating Model doc in project knowledge; the Idea Register doc is the single list of ideas, their stage, score, links and next step. Read the register at the start of every session, and update it at the end of every session: stage, decision log line, next step, and any new links.

Every idea has a stage: Seed, Shaping, Stress test, Proposal, Building, Shipped, Graduated, Merged, Parked, Killed. Match the session to the stage. Do not advance an idea past Stress test without a critique pass having been recorded.

Modes (Jithin may name one; otherwise infer from the stage and say which you are in):
- Brainstorm: diverge first, build on the idea, generate adjacent and contrarian options, no evaluation until asked.
- Critic: pre-mortem, kill criteria, what would have to be true, inversion, second-order effects, cost of the team's attention. Argue the strongest case against, then the strongest case for.
- Scout: research what exists (products, papers, open-source, internal), what they do well, what to borrow and what gap remains. Cite sources.
- Spec: turn the idea into a proposal with problem, hypothesis, goals and non-goals, success metrics, pillars or components, deliverables, usage, risks, phasing and open questions with owners, formatted for the team to improve.
- Portfolio: score and rank ideas on the rubric, place them Now/Next/Later and on horizons, surface stale ideas and due decisions.

Standing rules:
- Honest critique is the default in every mode. Never soften a weakness to keep momentum; say where the idea is thin and what evidence would fix it.
- Roles: the lab today is Jithin and Claude. Every role in the Operating Model (owner, lead, builder, red team, reviewer, auditor) is played by one of the two, as its Roles table says; never ask Jithin to name a person. Enterprise functions (Risk, IT security, Comms, governance) are outside the lab: Claude may simulate their review, marked simulated, and their real sign-off waits for the company version. Keep every role in the structure so real people can take them over later. The Building gate is an owner role, a stream, an appetite and a weekly review slot from Jithin.
- Pre-register hypotheses: every proposal states what would confirm and what would refute it.
- Keep technical depth where it belongs: Enterprise-facing material describes outcomes, not techniques; engineering material can go deep.
- One doc per idea, created from the first substantive session. Chats are disposable; the doc accumulates. Link the doc from the register.
- Ideas form a graph. Node types: theme, idea, feature (sub-idea), capability, experiment. Link types: serves, feature-of, depends-on, enables, reuses, creates, competes-with, supersedes, evidence-for. A feature (for example the TL Index as a feature of the ThinkLatent Portal) has its own doc, stage, score and register row, inherits its parent's theme and strategic fit, and can be promoted to an idea when it has value outside its parent.
- Reuse first. At Shaping, list the capabilities from the catalogue the idea reuses before anything it builds, and name the capabilities it creates for others. Record both in the register; demand counts drive the platform roadmap.
- Test every idea against the ThinkLatent strategy spine (winning aspiration, where to play, how to win, capabilities, management systems) kept in the register. Strategic fit is scored against the spine, not against instinct. Bring the portfolio-level frameworks (Playing to Win, Rumelt's kernel, Wardley mapping, Seven Powers, three horizons, the flywheel, theory of constraints) into "should we" conversations; keep the idea-level frameworks for "how".
- Names: ThinkLatent is spelled out; the model line is TLM; the index is the TL Index. Code uses neutral names (the @kit packages, design-kit, portal); in code every brand word is configuration and every domain name is data.
- Naming: register ID TL-### from the register's ID counter (re-read it immediately before registering and claim the ID with a guarded edit of the counter; never count rows), and a short slug; open every session with a line naming the register IDs, slugs and mode it touches, and add a row to the register's Sessions log; no manual chat naming.
- Session scope: one chat, one scope. The first reply declares it: one idea (TL-### slug), one track of a higher-order idea (TL-### slug › Track), a Portfolio session, or Lab operations (changing how the lab itself works). Stay inside it. Anything about another idea is captured as one line in that idea's register next step (or as a new Seed) and left for its own chat. Lab-operations chats change only the Operating Model, the register's structure, standards and scheduled tasks, never an idea's stage, score or doc. Idea chats write only their own idea's row, doc and links.
- Graduation: an idea leaves the lab when it has a proposal the team has commented on (today: a recorded red-team pass plus Jithin's comments), an owner role assigned (played by Jithin or Claude), a decision from Jithin, and a Project of its own. Record where it went.
- When an idea is killed or parked, keep its doc and write the reason; killed ideas are evidence for later ones. When ideas are parts of one programme, Jithin can merge them into the higher-order idea: the merged row closes at Merged with a pointer, and its purpose and every open item move to a track on the parent (the Operating Model's merge rule).
- Use the skills available (brainstorm, product-brainstorming, write-spec, competitive-brief, roadmap-update, stakeholder-update, synthesize-research, deep-research) when a step matches one, and say which was used.
- End every session with: the register updated, a one-line decision log entry, and the single next step.
```

## Idea lifecycle

Eight stages in this table (Building and Shipped, D-152, sit between Proposal and Graduated in the register). Each has an entry test, the work done in it, what it produces, and an exit test. An idea can move backwards, and most should die or park somewhere before Proposal; the lab is working if the register holds more Parked and Killed rows than Graduated ones.

| Stage | Entry test | Work in this stage | Produces | Exit test |
| --- | --- | --- | --- | --- |
| Seed | A thought worth not losing | Capture in one line; name the itch it scratches and who feels it | Register row, one-line hypothesis | Jithin wants to spend a session on it |
| Shaping | A session is booked | Brainstorm mode: problem statement, users, why now, why us, adjacent and contrarian versions, what exists today | Idea card (one page): problem, hypothesis, users, first version, what it is not | Problem statement a stranger could repeat; a falsifiable hypothesis |
| Stress test | Idea card exists | Critic and Scout modes: pre-mortem, kill criteria, competitive and prior-art scan, cost of attention, second-order effects, governance exposure | Critique log; scout brief; kill criteria; rubric score | Critique recorded and answered; score above the portfolio bar; Jithin says proceed |
| Proposal | Passed stress test | Spec mode: full proposal in the shape of the TL Index document, pre-registered hypotheses, phasing, roles, open questions with owners | Proposal doc shared with the team; team comments addressed | Team has commented (today: red-team pass plus Jithin); owner role assigned; Jithin's decision |
| Graduated | Proposal approved | Create the Project, move the doc, record the link and the first milestone | Register row marked with the Project and date | Project exists and the lab doc points to it |
| Merged | A higher-order idea takes it in; Jithin decides | Move its purpose and every open item to a track on the parent, check nothing was dropped, close the row with a pointer | A track on the parent; the row at Merged with its parent and track named; doc and decision lines kept | None; a track can be split out again as an idea |
| Parked | Good but not now | Record the reason, the trigger that would revive it, and the date to re-check | Park note in the register | Trigger fires or re-check date arrives |
| Killed | Fails stress test or decision | Record why, what was learned, what it should inform | Kill note in the register; doc kept | None; killed stays killed unless new evidence arrives |

Time appetite is set at Shaping: how much of the team's attention this idea is worth if it succeeds (a sprint, a quarter, a year). An idea that cannot fit its appetite at Proposal goes back to Shaping or to Parked, not forward.

## Session modes and the skills behind them

A session is one mode on one idea, with the register read at the start and updated at the end. Modes map to stages but can be invoked at any time (a critic pass on a graduated idea is often the most useful session of all).

| Mode | Purpose | Skills and tools used | Session shape | Output |
| --- | --- | --- | --- | --- |
| Brainstorm | Expand the idea before judging it | brainstorm, product-brainstorming | Diverge: ten versions in ten minutes, adjacent uses, the contrarian version, the 10x version, the boring version that ships in a month; then cluster; then pick the version to shape | Idea card draft |
| Critic | Find what breaks it before the team does | Critic rules in the instructions; competitive-brief for prior art | Pre-mortem (it failed a year from now: why), kill criteria, what would have to be true, inversion, second-order effects, cost of attention; strongest case against, then for | Critique log, kill criteria, rubric score |
| Scout | Learn from what exists | deep-research, web search, competitive-brief, synthesize-research for internal feedback | Products, papers, open-source, internal efforts; what each does well; what to borrow; the gap that remains (the index comparison in the TL Index doc is the template) | Scout brief with sources |
| Spec | Make it a proposal the team can improve | write-spec, docs | Problem, hypothesis, goals and non-goals, success metrics, components, deliverables, usage, risks, phasing, roles, open questions with owners; pre-registered confirm and refute conditions | Proposal doc, shared |
| Portfolio | Decide where attention goes | roadmap-update, metrics-review | Score every active idea on the rubric; Now/Next/Later; three horizons; stale and overdue items; what to kill | Portfolio view, decisions logged |
| Comms | Take an idea outside the lab | stakeholder-update, thought-leadership material | Exec brief, team update, or an external piece once an idea is public | Draft in the right register |

Every mode ends the same way: the register row updated, one decision-log line, one next step. A session that produces no change to the register did not happen.

## Thinking frameworks the lab draws on

The lab borrows from founders, product leaders and strategists, each for a specific moment. The instructions do not name these; the thinking partner applies them when the stage calls for them.

| Framework | Origin | When the lab uses it | The question it forces |
| --- | --- | --- | --- |
| Working backwards (PR/FAQ) | Amazon | Shaping, when an idea is customer-facing | Write the launch announcement and the hard FAQ first; if the press release is dull, the idea is |
| Jobs to be done | Christensen, Ulwick | Shaping | What job is the user hiring this for, and what are they firing to do it |
| First principles | Musk, physics tradition | Shaping, when an idea inherits assumptions from how things are done today | Strip to what must be true physically, economically and legally, then rebuild |
| The contrarian question | Thiel | Shaping and Critic | What important truth do we hold that most of the industry does not (the TL Index hypothesis is one) |
| Why now, why us | YC, venture diligence | Shaping | What changed that makes this possible now, and what do we have that others cannot copy |
| Pre-mortem | Gary Klein | Critic | It is a year later and this failed: write the story, then address its causes |
| What would have to be true | Roger Martin | Critic | For each option, the conditions under which it is the right choice; test the shakiest |
| Inversion | Munger | Critic | How would we guarantee this fails; avoid those |
| One-way and two-way doors | Bezos | Critic and Portfolio | Reversible decisions move fast; irreversible ones get the full stress test |
| 10x versus 10% | Google X, Teller | Brainstorm | Is there a version that is ten times better rather than slightly better, and what would it demand |
| Appetite, not estimate | Basecamp, Shape Up | Shaping | How much attention is this worth if it works; shape the idea to fit, not the reverse |
| Opportunity solution tree | Teresa Torres | Shaping and Portfolio | Which outcome, which opportunities, which solutions; keeps ideas tied to outcomes |
| Seven Powers | Hamilton Helmer | Critic, for platform and product ideas | Which durable advantage does this build: scale, network, switching cost, cornered resource, process power, counter-positioning, branding |
| Three horizons | McKinsey | Portfolio | H1 extends the core, H2 builds emerging, H3 bets on the transformational; balance the mix |
| Now, Next, Later | Product roadmapping | Portfolio | Commitment by time horizon without false precision |
| RICE and ICE | Intercom and others | Portfolio | Reach, impact, confidence, effort; a shared score that makes ranking arguable |
| SCQA and the pyramid | Minto | Spec and Comms | Situation, complication, question, answer; the proposal leads with the answer |
| Pre-registration | Scientific method | Spec | State what confirms and what refutes before running anything; the TL Index hypotheses section is the model |
| Disagree and commit | Bezos, Intel | Graduation | Once decided, the lab stops relitigating and the record shows the dissent |

Use is selective: two or three per session, chosen for the stage. Every framework is a prompt for a judgment, not a form to fill.

## Scoring rubric and portfolio view

Every idea at Stress test or later carries a score so that ranking is an argument about evidence rather than enthusiasm. Scores are 1 to 5 per criterion; the thinking partner proposes, Jithin sets.

| Criterion | What a 5 looks like | What a 1 looks like |
| --- | --- | --- |
| Strategic fit | Advances sovereign AI, the ThinkLatent Portal and the foundation-model roadmap directly | Interesting but orthogonal to where ThinkLatent is going |
| Evidence of need | Named users, observed pain, a number that moves if it works | A hunch with no one asking for it |
| Differentiation | Something only the Enterprise can do, or a contrarian truth we hold | Available off the shelf from a vendor |
| Feasibility | Buildable by the team with what exists; appetite fits | Needs capability, data or approvals we do not have |
| Value at stake | Spend, risk or revenue impact that leadership would notice | Marginal improvement to one workflow |
| Governance exposure | Clear path through Risk, Compliance and Security | Touches regulated data or client advice with no obvious path |
| Reversibility | Two-way door; cheap to try and stop | One-way door; commits the organisation |
| Compounding | Makes later ideas easier (shared data, platform, evidence) | Stands alone |

**Composite.** Weighted sum with weights set per quarter in the register (default equal). Reversibility and compounding are tie-breakers rather than drivers. The portfolio bar is the composite below which an idea does not proceed to Proposal without a stated reason.

**Portfolio view, kept in the register and reviewed monthly**

- **Now / Next / Later.** Now has a Project or a proposal in review; Next is shaped and scored; Later is seed or parked.
- **Three horizons.** H1 extends what runs today (the gateway, the training pipeline, the index), H2 builds what the portal and the ThinkLatent vision need next, H3 is a bet (world models, evolving agents). The mix is a decision, not an accident; the review names it.
- **Links.** Features roll up to their parent idea; a parent cannot graduate while a P0 feature is still in Shaping.
- **Staleness.** Any row untouched for the number of days set per stage is flagged; the review decides park, kill or book a session.
- **Decision log.** One line per decision per idea, dated, with who decided. This is the memory of the lab.

## Organisation

Projects have no subfolders, so structure comes from three conventions: one register, one doc per idea, and explicit links.

**The register.** A single doc in project knowledge, one row per idea or feature: ID, slug, title, type (idea or feature), parent, stage, horizon, score, owner, doc link, last touched, next step. Below the table, the decision log. The thinking partner reads it first and updates it last in every session. A separate Idea Register doc is created alongside this one with today's entries.

**One doc per idea.** Created in the first substantive session, in the proposal shape once the idea reaches Spec. The doc is the durable artefact; chats are disposable. Everything a future session needs to resume is in the doc or the register, never only in a chat.

**Links between ideas.** The core four, recorded on both rows (the full set of nine is in the idea graph section below):

- feature-of: the row is a component of a larger idea (the TL Index is a feature of the ThinkLatent Portal). Features have their own docs and stages and roll up to the parent in the portfolio view.
- depends-on: cannot graduate until the other does.
- related-to: shares users, data or a thesis; sessions on one should check the other.
- competes-with: alternative approaches to the same outcome; the stress test must decide between them.

**Naming.** Register ID TL-### taken from the ID counter at the top of the register, never by counting rows; a short slug (index, portal); doc titles carry the slug and the doc type ("TL Index (index) — Project Proposal"). Chats are not renamed: discovery runs on the thinking partner's side through the register as the index, a session tag in the first reply of every lab session (so past-chat search finds it by ID or slug), the register's Sessions log, aliases in every lab record, and project search over the nightly mirror. Details are in the register's Discoverability section.

**Session scope.** One chat holds one scope, declared in its first reply: a single idea, a Portfolio session, or Lab operations. Work that belongs to another scope is noted in one line in the register and left for its own chat, so every chat can be found, read and trusted as the record of one thing. Lab-operations chats never touch idea content, which keeps the Operating Model and standards free of idea material and portable to other Projects.

**Assigning IDs.** Parallel chats each read the register when they start, so counting rows lets two of them mint the same ID (it happened with TL-012 on 2026-11-02). IDs therefore come from one counter line at the top of the register. A session registering an idea:

1. Re-reads the counter immediately before registering, not at the start of the session.
2. Claims the ID by changing the counter line in place, guarded on the version it just read (in Claude Docs: a replace of that block with its `ifHash` and `ifRev`).
3. On a refused claim, another session got there first: re-read and claim the next number.
4. Adds the register row only after the claim succeeds.

IDs are never reused, including an ID freed when a duplicate row is removed. The nightly sync flags any duplicate ID and a counter not above the highest ID in use.

**Graduation.** An idea leaves the lab when it has a proposal the team has commented on (today: the red-team pass plus Jithin's comments), an owner role assigned as the Roles table says, a decision from Jithin, and a Project of its own. The lab doc is moved or copied into the new Project, the register row is marked Graduated with the Project name and date, and the lab keeps a pointer so portfolio reviews still see it. Neo and Think Latent are the precedents: the register records them as graduated with their Projects.

**Memory.** The Project's memory setting decides whether lab ideas are visible from general chats and other Projects. Connected is the right default for the lab, so that a thought captured anywhere can be filed here; it can be sealed later if the lab holds material that should not surface elsewhere.

## The idea graph: linking ideas, sub-ideas and capabilities

Ideas are not a list; they are a graph with four kinds of node and a small set of typed links. The register stores the nodes and links as rows, and the portfolio view renders them. Today's ideas already form one:

&#91;embedded content: idea graph · themes, ideas, features, capabilities\]

The TL Index is a feature of the ThinkLatent Portal, depends on the self-healing system, is related to Neo through shared scheduling patterns, reuses the gateway and HyperPod, and creates a capability of its own (the evaluation register and harness) that later ideas will reuse.

**Node types**

| Node | What it is | Register type | Example |
| --- | --- | --- | --- |
| Theme | A strategic bet the organisation has made; the roof that ideas sit under | Theme | Sovereign AI: owned models on owned infrastructure |
| Idea | A thing worth building that could become a Project | Idea | ThinkLatent Portal |
| Feature (sub-idea) | A component of an idea that is worth shaping and deciding on its own | Feature | The TL Index, a feature of the ThinkLatent Portal |
| Capability | A reusable building block that ideas consume or create: platform, data, process, evidence | Capability | AI Gateway, evaluation register, contribution flow |
| Experiment | A bounded test that produces evidence for one or more ideas | Experiment | The five-pillar MVP of the TL Index |

**Link types**

| Link | Meaning | Rule it carries |
| --- | --- | --- |
| serves | Idea serves a theme | Every idea names at least one theme; an idea serving none is a flag, not a failure |
| feature-of | Feature is part of an idea | A feature inherits its parent's theme and strategic-fit score; the parent cannot graduate while a P0 feature is still Shaping; a feature can graduate ahead of its parent as an independent deliverable |
| depends-on | Cannot ship without the other | Blocks graduation; shown in the portfolio as a chain |
| enables | Makes the other possible or cheaper | Raises the compounding score of the enabler |
| reuses | Consumes an existing capability | Listed at Shaping; the capability's demand count rises |
| creates | Produces a new capability others can reuse | Adds a Capability node; the idea's compounding score rises |
| competes-with | Alternative route to the same outcome | The stress test must decide; only one proceeds to Proposal |
| supersedes | Replaces an earlier idea | The earlier row is marked Killed with a pointer. A merge is different: the work lives on as a track (Merging, below) |
| evidence-for | An experiment's result bears on an idea | Score updates cite it |

**How sub-ideas work in practice**

- A feature gets its own doc, stage, score and owner. Its score feeds the parent's: a parent is at most as feasible as its weakest P0 feature.
- A feature can be promoted to an idea when it has value outside its parent (the TL Index's evaluation harness is a candidate: any model work needs it, portal or not). Promotion keeps the feature-of link for history and adds the new relationships.
- Two ideas that share three or more capabilities are candidates for a collision session: they may be one platform idea.
- The register's Links table is the source; the diagram is regenerated from it at each portfolio review.

**Merging into a higher-order idea** (D-387, 2026-11-16)

- Ideas that turn out to be parts of one programme can be merged into the higher-order idea on Jithin's decision, instead of staying feature rows with lifecycles of their own.
- The merged row closes at stage Merged, pointing to its parent and its track. Its doc and decision lines stay; it is the record up to the merge.
- Its purpose and every open item move to a track on the parent: next step and due date, open questions, hypotheses, kill criteria and signals, phases, decisions due, governance, appetite and review slot. A check compares the two before the merge is recorded, so nothing is dropped.
- A track keeps its own owner, status and lab stage. A track below Stress test gets a short critique before it builds, so a merge never skips the critique rule.
- Links that named the merged row resolve to its track, so dependencies stay precise, and the graph draws tracks under their parent.
- A track can be a chat's scope ("Lab session · TL-003 portal › TL Index · Spec"); work on the programme as a whole gets a programme chat.
- A track that gains value outside its parent can be split out again as an idea, like a promoted feature.
- Supersedes is different: it replaces an idea, and the replaced row is marked Killed. A merge keeps the work alive inside the parent.

## Reusability: the capability catalogue

Most ideas fail on cost, and most of the cost is rebuilding something another idea already needed. The lab makes reuse the default by keeping a catalogue of capabilities and requiring every idea to declare what it reuses and what it creates.

**The catalogue.** A table in the register with one row per capability: name, kind (platform, data, process, evidence, people), owner, maturity (idea, building, in production, retiring), the ideas that reuse it, the idea that created it, and its demand count. Starting rows, from what exists or is proposed today:

| Capability | Kind | Maturity | Created or owned by | Reused by |
| --- | --- | --- | --- | --- |
| AI Gateway and multi-tenant memory | Platform | In production | ThinkLatent team | TL Index, ThinkLatent Portal, every onboarded workflow |
| HyperPod serving with per-setting endpoints | Platform | In production | ThinkLatent team | TL Index, SLM builds |
| Model compression pipeline (pruning, distillation, quantization) | Platform | In production | ThinkLatent team | TL Index deployability axis, SLM builds |
| Self-healing gap-closing system | Process | Built | ThinkLatent team | TL Index heal loop, SLM builds |
| Evaluation register and harness | Evidence | Proposed | TL Index | ThinkLatent Portal, governance, training programme, thought leadership |
| Contribution flow (datasets, use cases, skill declarations) | Process | Proposed | TL Index | Any idea that needs practitioner-built data |
| Sandboxed tool replicas of public and internal tools | Platform | Proposed | TL Index | Agent products, training environments |
| Skill-tandem records | Data | Proposed | TL Index | Specialist training targets, portal recommendations |
| Scheduled-task and brief patterns | Process | In production | Neo, morning brief | Lab digest, index release scoring |
| University lab | People | In production | Research partnership | Methodology review for any idea |

**Rules**

- **Reuse first.** At Shaping, every idea lists the capabilities it will reuse before anything it will build. An idea that reuses nothing is either a platform idea or under-shaped.
- **Declare what you create.** Every proposal names the capabilities it leaves behind for others. Those become catalogue rows at Proposal stage, and the idea's compounding score reflects them.
- **Demand count is a roadmap signal.** A capability reused by three or more ideas is a platform priority regardless of which idea ships first; a capability nobody reuses after two quarters is reviewed for retirement.
- **Capabilities have owners and maturity.** An idea that depends on a capability still at "idea" maturity inherits that risk in its feasibility score.
- **Interfaces over implementations.** A capability is reusable only if its contract is written down (the register API, the gap-report schema, the contribution intake form). The lab asks for the interface before counting the reuse.
- **Patterns count too.** Not every reusable thing is code: the proposal shape used for the TL Index, the pre-registered hypothesis table, the sensitivity tiers and the enterprise-facing abstraction rule are process capabilities and are catalogued the same way.

## Strategic frameworks for brainstorming together

The frameworks in the earlier table sharpen one idea at a time. These shape the portfolio and the conversation about where ThinkLatent should be heading, and they are the ones to bring into a brainstorm when the question is "should we" rather than "how".

| Framework | Origin | What it gives the lab | How a session uses it |
| --- | --- | --- | --- |
| Playing to Win | Lafley and Martin | A strategy spine in five questions: winning aspiration, where to play, how to win, capabilities required, management systems | Write ThinkLatent's spine once, keep it in the register, and test every idea against it; strategic fit stops being a feeling |
| Good Strategy, Bad Strategy | Rumelt | Diagnosis, guiding policy, coherent actions; the kernel that separates strategy from goals | A brainstorm that cannot state the diagnosis is producing wishes; start there |
| Wardley mapping | Simon Wardley | Components placed by user need and by evolution (genesis, custom, product, commodity); build what is genesis, buy what is commodity | Map an idea's capabilities; anything at commodity stage that we plan to build is challenged; anything at genesis that we would buy is a sovereignty question |
| Seven Powers | Hamilton Helmer | The durable advantages: scale, network, counter-positioning, switching cost, branding, cornered resource, process power | Ask which power a platform idea builds; cornered resource (our data, our evaluation evidence) and process power are the ones ThinkLatent can plausibly own |
| Three horizons and bet sizing | McKinsey; Annie Duke, real options | A deliberate mix of core, emerging and transformational, with bets sized to reversibility and information value | Portfolio sessions set the mix and treat H3 ideas as options to buy cheaply, not commitments |
| Flywheel | Jim Collins | The reinforcing loop that makes the whole system compound | Draw ThinkLatent's flywheel (evidence from the index, better models, more adoption, more data, better evidence) and ask which idea turns it fastest |
| Theory of constraints | Goldratt | Throughput is set by the bottleneck; improving anything else is waste | Name the current constraint on ThinkLatent (evaluation evidence, governance throughput, data access) and favour ideas that relieve it |
| Blue Ocean, ERRC | Kim and Mauborgne | Eliminate, reduce, raise, create against the industry's default offer | For portal and product ideas, state what we deliberately do not do that vendors do |
| Crossing the Chasm | Geoffrey Moore | Beachhead first, whole product, then expand | For adoption ideas, pick the first business line and the whole product it needs before scaling |
| Working backwards from the regulator | Internal, financial-services specific | Governance as a design input, not a gate | Any idea touching client advice, regulated data or model risk writes its governance story in Shaping |

**The ThinkLatent strategy spine (to be written in the first Portfolio session)**

- Winning aspiration: one sentence on what ThinkLatent is for.
- Where to play: which workflows, business lines and model classes, and which not.
- How to win: the few things that make Enterprise-built models and the portal better than the alternative of buying.
- Capabilities required: the catalogue rows that must exist.
- Management systems: the index, the register, the governance loop and the lab itself.

Once the spine exists, every Shaping session opens with it, every Critic session tests the idea against it, and the strategic-fit criterion in the rubric scores against it rather than against instinct.

## Idea doc standard (v1, 2026-11-01)

Every idea gets the same shape from the day it is created, so nothing has to be retrofitted when the register holds fifty ideas instead of six. The standard is versioned, every doc records the version it follows, the nightly sync flags docs behind the current version, and retrofits happen in the next session on that idea, one at a time, never in bulk.

**Applied to every idea doc at creation**

| Element | Rule |
| --- | --- |
| Title | `<Name> (<slug>) — <doc type>`; the doc type names the stage's artefact: Idea card, Proposal, Retrospective |
| Byline | As-of date and author |
| Lab record | A table directly under the byline: ID, slug, type (idea, feature, capability, experiment), parent, theme served, stage, horizon, appetite, owner, rubric composite with date and whether proposed or set, links (feature-of, depends-on, related-to, competes-with, reuses, creates), sensitivity, standard version, last reviewed, register link |
| Hypotheses | A pre-registered table: claim, measurement, confirmed if, refuted if |
| Enterprise rule | Outcome language in enterprise-facing sections; techniques only in engineering sections or register-only fields |
| Sensitivity | A flag in the lab record when the doc holds client data, unreleased strategy or regulated material |
| Decision log | Dated one-line entries at the end of the doc, mirrored to the register |
| Sources | Linked, with as-of dates, for anything looked up |

**Required sections by stage**

| Stage | Sections the doc must have before the stage is recorded |
| --- | --- |
| Seed | No doc; a register row with a one-line hypothesis |
| Shaping | Idea card: Problem; Who feels it; Hypothesis; Why now, why us; First version and what it is not; Appetite; Capabilities reused and created; Governance story when the idea touches regulated data, client advice or model risk |
| Stress test | Critique log (dated, by whom, answered or open); Kill criteria; Scout brief with sources; Rubric score, proposed and set |
| Proposal | Executive summary and how to use the proposal; Problem and why now; What happens if we don't; Goals and non-goals; Hypotheses; Components or pillars; Deliverables; Usage; Success metrics; Requirements P0, P1, P2; Roles; Risks; Phasing; Open questions with owner and blocking status; Sources |
| Graduated | Pointer to the Project; first milestone; retrospective dates at six and twelve months |
| Parked | Reason; the trigger that revives it; re-check date |
| Killed | Reason; what was learned; which ideas it should inform |

**Changing the standard**

- The standard has a version and a date. Changes are made in this section by a Portfolio session and logged in the register's decision log.
- Each doc's lab record carries its standard version. The nightly sync flags docs behind the current version; the retrofit is done in the next session on that idea.
- A new required element applies to new docs at once and to existing docs at their next stage change, so no bulk rewrite is ever needed.

## Nightly lab sync

A scheduled task keeps the register, the idea docs and the project-knowledge mirrors consistent without a human in the loop, and leaves every decision to humans. It can also be run by hand from the scheduled task in the app, or by asking the thinking partner to run the lab sync in any session.

What it does, twice a week (Monday and Thursday at 22:41 US Eastern; set by Jithin on 2026-11-07), alongside a daily morning pickup that applies his dashboard quick calls:

1. Read the live Idea Register: the Register, Links, Capability catalogue and Sync log tables.
2. For each row with a doc, read the doc's lab record. Update Last touched from the doc's revision and record the revision in the Sync log.
3. Reconcile stage, owner, score and links in the register against the lab record; where they differ, the doc wins and the register row is corrected with a log line.
4. Audit against the Idea doc standard: missing lab record, missing required sections for the stage, standard version behind current, missing theme or owner, blocking open question without an owner.
5. Flag staleness past the stage window, a P0 feature still in Shaping under a parent at Proposal or later, and a Parked idea past its re-check date.
6. Flag duplicate IDs: any TL-### that appears on more than one register row, or a register row whose ID differs from its doc's lab record. Flag the ID counter if it is not above the highest ID in use. Never renumber or merge rows: the sessions involved decide which row keeps the ID.
7. Mirror the current register and operating model into project knowledge so project search sees today's state.
8. Write one Sync log row: date, docs scanned, rows changed, flags raised. No stage changes, no scores, no kills: those are session decisions.

**GitHub mirror.** The private repository thinklatent-labs/idea-lab holds the whole lab so it can be worked on anywhere: the register as JSON, one page per idea, the dashboard, and, under `artifacts/TL-###-slug/`, read-only copies of every idea's artifacts (its idea card and tabs as markdown; sketches, canvases and playgrounds as HTML; its scout briefs). The live register and artifacts on claude.ai stay the source; the repo mirrors them. Two writers keep it current:

1. **Every session**, at its end: update the register, re-export any artifact it created or changed into `artifacts/`, run `scripts/lab-sync.sh`, and say in the closing reply whether the push went through.
2. **The nightly sync**, as its last step: bring the register JSON up to the live register, re-export artifacts whose revision moved, push, and record the result ("GitHub: pushed" or why not) in the Sync log.

GitHub is in sync when every register row has a page in `ideas/`, every artifact in the Doc column has a copy in `artifacts/`, and the newest Sync log row says pushed.

## Expansions

The lab starts as a brainstorming space with a register. These are the directions that make it an initiative rather than a habit, roughly in the order they earn their keep.

**Capture from anywhere.** Ideas arrive on a phone at 5 a.m., in meetings, in reading. A capture rule: any message that starts "idea:" in any chat is filed to the register as a Seed with a one-line hypothesis and a date, no session needed. Notes dropped into Neo can be swept the same way, so the two systems share one intake.

**A weekly lab digest.** A scheduled task that reads the register and produces a short brief: ideas untouched past their staleness window, decisions due, features blocking a parent, the one idea whose next step is cheapest to take this week. Delivered where the morning brief is delivered.

**Idea collisions.** A periodic session that takes two unrelated rows and asks what they would be as one. The TL Index and self-healing combination came from this kind of move; doing it on purpose finds platform ideas that no single workflow would ask for.

**Scout as a standing service.** For any idea past Seed, a recurring scan of what has appeared since the last session (products, papers, open-source, competitor moves), appended to the scout brief. The lab stops being surprised.

**A red-team roster.** Beyond the thinking partner's own critique, name two or three people on the team whose job in a given month is to attack ideas before Proposal. Their critiques go in the critique log under their names. Dissent is recorded so disagree-and-commit means something.

Until the company version, Claude plays the feasibility and Risk seats as separate agents that have not seen the work, Jithin plays the business-line partner (D-134), and the critique log records the seat and who played it.

**Team contribution.** The proposal doc is shared with the team at Proposal stage (as the TL Index doc was). Expansion: a contribution path for team members' own ideas, with the same register, so the lab becomes the organisation's front door rather than one person's notebook. The register then shows who originated what, and the demand signal across ideas (which capabilities keep recurring) feeds the ThinkLatent roadmap directly.

**Pattern mining across ideas.** Every quarter, read all idea docs together and ask what they have in common: shared data they all need, a platform capability three of them assume, a governance question that keeps recurring. Those commonalities are usually the real next initiative.

**Evidence loop with the index.** Ideas that depend on model capability (most of them) state the pillars and bars they assume. Once the TL Index runs, those assumptions are checkable, and the lab's feasibility score for an idea can cite an index result rather than a guess.

**Thought leadership pipeline.** Graduated ideas and well-argued kills are raw material for external writing. A Comms session turns a proposal's "why we should do it" into a LinkedIn piece or an internal executive note, keeping the confidential parts out. The lab becomes the source of the public voice rather than a separate effort.

**Portfolio review as a deck.** Monthly, the portfolio view is rendered as a short deck for Jithin's own review or for leadership: horizon mix, what moved, what was killed and why, what needs a decision. The register is the single source, so the deck is generated, not written.

**Retrospectives on graduated ideas.** Six and twelve months after graduation, a session compares what the proposal predicted with what happened. The gap is the most valuable calibration data the lab will ever get, and it feeds back into how the rubric is scored.

**Guardrails as the lab grows.** Honest critique stays the default; no stored preference may soften it. Sensitive material (client data, unreleased strategy) is flagged in the register so it is not surfaced outside the lab. The register, not any chat, remains the source of truth, and the thinking partner never claims a session happened that the register does not show.

## Setup checklist

- [x] Create the Project in the app, named Idea Lab
- [x] Paste the instructions block above into the Project's instructions
- [x] Add this doc and the Idea Register doc to project knowledge
- [x] Schedule the nightly lab sync
- [x] Register the TL Index (TL-004) and retrofit its doc to the Idea doc standard v1
- [x] Set the Project's memory to connected, so ideas captured elsewhere can be filed here (confirmed 2026-11-01)
- [x] Open a doc for the ThinkLatent Portal idea (TL-003) in the Idea card shape (done 2026-11-01)
- [x] Record the TL Index stress-test critique log (retrofit) before the team review (done 2026-11-01)
- [ ] Book the first Portfolio session: write the ThinkLatent strategy spine, set quarterly rubric weights and confirm staleness windows
- [x] Decide the digest cadence and where it is delivered (scheduled 2026-11-01: Mondays 6:45 AM Eastern, phone notification)
- [x] Red-team roster: Claude plays feasibility and Risk, Jithin plays business-line partner, until the company version (D-134, 2026-11-07)
