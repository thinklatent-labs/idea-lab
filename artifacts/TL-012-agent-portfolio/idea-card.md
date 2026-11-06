<!-- Exported from https://claude.ai/artifact/T5rhguUBWXiUtPamFxxELT (rev 43) on 2026-11-04. Read-only mirror; edit the live doc, not this file. -->
# Agent portfolio (agent-portfolio) — Idea card

Nov 2, 2026 · @Jithin Pradeep

The agent portfolio is ThinkLatent's demand-side instrument: it decides which agents the TLM family powers, in what order, and which Domain model each one justifies. Shaping session of 2026-11-02; a first wave of three agents is proposed, pending the Head of ThinkLatent.

## Lab record

| Field | Value |
| --- | --- |
| ID | TL-012. Registered 2026-11-02 from the TL-011 session; a same-day double registration (agent-library, from the TL-003 session) was reconciled by that session into this single row, and the register now assigns IDs from a counter |
| Slug | agent-portfolio |
| Aliases | agent portfolio, the agents, TLM agents, agent variants, the 40 |
| Type | Idea |
| Parent | — |
| Theme served | T-001 Sovereign AI: owned models on owned infrastructure |
| Stage | Shaping (Idea card v1, 2026-11-02) |
| Horizon | H1 for wave 1 (TLM4 Core, the speech model, the first judge); H2 for compliance document intelligence and cyber; H3 for the TLM5-dependent agents and the workflow builder |
| Appetite | Proposed in the Appetite section; the Head of ThinkLatent sets it |
| Owner | Head of ThinkLatent (sponsor); one build owner per wave-1 agent and one business owner per purpose, to be named |
| Rubric composite | Not scored; set at Stress test |
| Links | serves T-001 · depends-on TL-011 domain-model-portfolio (Judge family, Compliance and Advice adapters) and TL-008 harness-served (the harness that turns a served model into an agent) · evidence-for TL-011 · enables TL-010 blueprints (each variant as a forkable blueprint); the agent library is this idea's publish step, shown as a portal page, which TL-003 enables · related-to TL-004 index (variants compared on the index), TL-009 telemetry-contract (task mining reads it), TL-005 self-healing · reuses and creates: Capabilities section |
| Sensitivity | None flagged: no client data; ThinkLatent's own roadmap only |
| Standard | Idea doc standard v1 |
| Last reviewed | 2026-11-02 |
| Register | [Idea Register](https://claude.ai/artifact/6WzPg7fvvAf2tn8Z9X2Q2h) |

## Problem

ThinkLatent does not know which agents to build on TLM, how to build each one, or which build to trust, so the Domain tier and the portal are being planned on instinct. The statement a stranger can repeat: forty candidate agents, one production precedent, no instrument for choosing.

Three decisions are waiting on that instrument:

1. **The Domain tier (TL-011).** Its rule is a Domain model only when a business domain has several real use cases. Today the demand side is a brainstorm list; the after-call summariser is the only agent with users, volume and corrections.
2. **The portal and its agent library (TL-003).** Nothing exists to prefill them: no agent has a record, an owner, a model recipe, a policy or an evaluation.
3. **The business team that asks for an agent.** It gets one build and no basis for trusting it. Nobody can see whether the same purpose built another way is better, cheaper or safer on the Enterprise's own tasks.

A list of forty agents is a backlog, not an idea. The idea underneath it, as the Head of ThinkLatent reframed it in this session, is a demand-side instrument with four moves: admit an agent purpose only when it has an owner, volume and labelled data; build each admitted purpose in two or three methodology variants on the TLM family; compare the variants on the index; publish the comparison and the winning variant in the library so people can start using it the same week.

## Who feels it

Today the pain is ThinkLatent's own; the business pain is observed for one purpose and assumed for the other thirty-nine.

| Who | What they feel today | What changes if this works |
| --- | --- | --- |
| Head of ThinkLatent and the foundation team | Which Domain model to train next is argued from the list, not from measured demand | Each Domain model is justified by named purposes with owners, volumes and a model recipe |
| Portal product lead (to be named) and the portal's agent library page | Nothing to onboard or prefill; every agent request starts from zero | A library of compared, adoptable variants with a record each; onboarding is a choice, not a build |
| Harness and platform lead (TL-008, to be named) | No first real agent to design the harness against | The after-call agent is the harness's first customer and its policy test case |
| Servicing associates and advisors (the flagship's users) | After-call work is manual after the summary: CRM entry, follow-up, tasks | One agent proposes all three for approval; minutes per call drop |
| Compliance reviewers of marketing and client copy | Every piece is read in full; the queue sets the pace of marketing | Pre-review flags, explains and suggests the rewrite; reviewers decide, faster |
| Business teams who want an agent | One build, one vendor demo, no way to compare | Two or three variants of the same purpose, scored on the index, with cost and latency beside quality |

The honest count: one purpose has observed pain, named users and labelled corrections (the after-call summariser). The compliance pre-review queue is a well-evidenced pattern elsewhere but unmeasured here. The other purposes are hunches until a business owner and a volume number are attached, which is the admission rule in First version.

## Hypotheses

Eight pre-registered claims. H3 is the one the Head of ThinkLatent's reframing stands on, and it has a kill condition of its own; H7 and H8 come from the Scout pass.

| # | Claim | Measurement | Confirmed if | Refuted if |
| --- | --- | --- | --- | --- |
| H1 | Admitted agent purposes cluster to the Domain candidates plus a platform set, with several purposes per domain sharing a model recipe | The admission ledger (owner, volume, data) plus task-mining clusters over the flagship and gateway logs | By the end of wave 1, servicing (Advice), Compliance and Judge each hold three or more admitted purposes with named owners | A domain holds one or fewer admitted purposes after a quarter; that domain is a single application and TL-011 should not carry it as a Domain model |
| H2 | Most multi-model agents are Core plus a judge, so the Judge family is the shared dependency and the first platform build | Model recipe per admitted purpose; demand counts in the capability catalogue | 70% or more of admitted multi-model purposes carry a judge component and the Judge family holds the highest demand count | Fewer than half carry one, or deterministic checks replace the judge in most; the Judge family is not the priority this demand implies |
| H3 | Methodology variants of one purpose differ enough on Enterprise tasks that the choice matters, and the simplest variant does not always win | Each wave-1 purpose built in two or three variants and scored on the index: house rubric, cost per task, latency, reliability (pass^k) | For at least two of the three purposes, variants differ by more than 5 rubric points, or by 2x on cost at equal quality | Variants sit within 3 points and 1.5x cost on all three purposes; stop building variants, ship the simplest build, spend the attention on data |
| H4 | The winning variant on TLM4 Core with the house judge matches a frontier baseline on the house rubric at lower cost, with data inside the boundary | Same inputs, frozen window, expert graders plus the rubric grader, through the index | Within 3 points of the frontier at half the cost or less | The frontier leads by more than 3 points after one retrain cycle; that purpose runs on a frontier model with house judges and is not evidence for a Domain model |
| H5 | A compared, adoptable variant is picked up by a business team without ThinkLatent engineering | Teams using a library variant within 60 days of publication; time from request to first use | Two or more teams adopt a wave-1 purpose within 60 days; first use inside two weeks | No adoption outside the originating team; the library is a ThinkLatent-internal tool, folded into portal onboarding |
| H6 | Wave 1 reduces human time on its two business purposes without losing recall | After-call: minutes of post-call work per call. Pre-review: reviewer minutes per item and recall on known true positives, frozen pre/post window | 30% less after-call time; 40% less reviewer time at no loss of recall | No change, or recall drops; the agent is withdrawn from that queue |
| H7 | On ThinkLatent's models, a change of harness or serving configuration moves pass^k more than a change of Core version does | Each wave-1 purpose run across two harness and serving configurations and across two Core versions, pass^k on the index | The harness and serving delta exceeds the model-version delta on at least two of the three purposes | Model swaps dominate; the portfolio's attention goes to model refreshes, and harness variants are not worth a stream |
| H8 | When shown quality, cost, latency and reliability side by side, business teams choose variants on the measured frontier | The index logs each team's choice beside the comparison card; no published precedent exists, so this is new data | 70% or more of choices sit on the accuracy-cost frontier | Choices cluster on a dominated variant; the comparison card is not legible and is redesigned before more purposes are published |

H3 and H4 are measured by the index (TL-004) and the Judge family (TL-011 Build 1), both still Proposed. Until they exist, a frontier panel and expert graders stand in, and every result is provisional.

## Why now, why us

**Why now.** Five things changed in the last quarter, and a sixth is dated.

- TLM4 Core is the version to drive adoption and every Domain model will sit on it (TL-011 decision, 2026-11-02). Agents are what Core is for.
- The serving backend is about to gain the harness (TL-008): an agent becomes a served model plus a harness, a session and a policy, not an application's private post-processing.
- The index (TL-004) is at Proposal with a decision spike due 2026-11-15. It is the first instrument that can compare two builds of the same purpose on Enterprise tasks.
- The after-call summariser runs in production with human corrections: the first purpose with users, volume and labelled data.
- Every platform vendor now ships a library of prebuilt agents. Business teams will adopt one by default unless ThinkLatent offers a compared, owned alternative; this is the side door the strategy spine names.
- From 20 November 2026 OpenAI prohibits using its outputs to train substitute models, and Anthropic already requires permission; corrections captured by the Enterprise's own agents are training data nobody can revoke (TL-011 scout brief, 2026-11-02).

**Why us.** A vendor library can only prompt; ThinkLatent can train, serve and measure. The Enterprise's calls, CRM, policies, review outcomes and gateway logs are data the frontier cannot see; the build-and-heal loop (TLM, compression, self-healing) turns a prompted variant into a trained one; owned infrastructure makes comparing three variants a matter of GPU hours rather than API spend; and the index is the only place variants can be scored on the Enterprise's own tasks. In Seven Powers terms the portfolio builds a cornered resource (data plus comparative evidence) and process power (the admit, build-variants, compare, publish loop); it does not build scale or network effects, and it should not claim to.

## What the 40 are

The forty sort into nine clusters; seven of the forty are single-call task heads rather than agents, two are platform, and the rest are agents or workflows with model steps. The full list with type, model recipe, domain and wave is on the second tab.

Model recipe: C = Core, D = Distil, J = Judge family, S = the speech model (TLM1), W = TLM5.

| Cluster | Agents (count) | Model recipe | Evidence for | Wave | Note |
| --- | --- | --- | --- | --- | --- |
| A. Judge and evaluation primitives | 21, 22, 23, 24, 25 (5) | J, with C for the red-team agent | Judge domain | 2, as soon as TL-011 Build 1 exists | Mostly task heads; the shared dependency of every C + J agent below |
| B. Servicing lineage of the flagship | 1, 2, 3, 4 (4) | S + C (+ J); D for the router | Advice (servicing) | 1 (agent 2), then 2 | The only cluster with production users, volume and corrections today |
| C. Regulated client communications | 5, 6, 7, 39 (4) | C + J + deterministic layer | Advice | 3 | Client-facing text is a supervised communication; waits for the suitability layer (TL-011 Build 4) |
| D. Compliance pre-review and triage | 10, 11 (2) | C or D + J | Compliance | 1 (agent 10), then 2 | Structured output, human upstream; the pattern with the best external evidence |
| E. Compliance document intelligence | 12, 13, 14, 15 (4) | C + retrieval + J; D for extraction | Compliance | 2 (agent 13), then 3 | Extraction and narrative drafting; TL-011 Build 7 |
| F. Cybersecurity | 16, 17, 18, 19, 20 (5) | C (+ validator) | Cybersecurity | 3, conditional | No gate, no action; TL-011 Build 5 evaluates open 8B models first |
| G. Platform and ThinkLatent operations | 26 to 34 (9) | C, D, J, self-healing | None directly; the Judge domain indirectly | 1 (agent 28), then 2 and 3 | The portal's own loop; six of nine already have homes (TL-008, TL-003, TL-004, TL-005, TL-009) and are linked, not registered twice |
| H. Enterprise-wide horizontal | 35, 36, 37, 38, 40 (5) | C or open models; 40 is all of them | None | Later | Vendors supply these; the spine says not to compete there unless data residency forces it; 40 is the H3 bet that needs waves 1 and 2 first |
| I. TLM5-dependent | 8, 9 (2) | W (+ external) | Advice | H3, parked | Need the world model; revisit when TLM5 serves |

Full list, one row per agent: The 40 agents

&#91;embedded content: portfolio map · 9 clusters by Domain model and wave\]

Read left to right: wave 1 is the accented column, three purposes across three rows; everything in the Judge row is a TL-011 build that the other rows consume, which is why it sits in wave 2 and why wave 1 compares with a frontier panel.

## What exists (Scout)

As of 2 November 2026, for a 7B to 27B model the harness decides more of an agent's quality, cost and reliability than the model does, and the cheapest structured build usually wins on bounded tasks. Three research passes (harness engineering; agent types and libraries; build methodologies and variant comparison) were synthesised into one brief with 203 citations, in project knowledge as claude/scout-brief-agent-portfolio.md; this section keeps what changes the card.

| Area | What the field does | What ThinkLatent borrows | Where it lands in this card |
| --- | --- | --- | --- |
| Harness engineering | Every reference architecture since December 2024 converges on one skeleton: a short loop, typed tools, a context manager, sessions, a permission layer, hooks, tracing. Production harnesses hold about a hundred lines of loop inside up to a million lines of control code; a controlled study put harness variance at 7.8 times model variance; the most common small-model failure is a parser or template mismatch mistaken for incapacity | Own the loop (TL-008) and standardise the edges: MCP for tools, OpenTelemetry for traces, A2A agent cards. Build the permission control plane, the approval ledger and the cache discipline first. Run a conformance suite per fine-tuned model before any capability verdict | First version (the harness variant); Governance story; one line to TL-008 |
| Agent types | No single taxonomy; three independent axes recur: control-flow shape, autonomy tier by the human's role (observe, advise, act with approval, autonomous), task class. The test: does the model's output change which code runs next (if not, a task head); are the path and step count fixed in code (a workflow); does the model choose action, tool and stop (an agent). Only 16% of enterprise deployments are true agents (Menlo Ventures, December 2025) | Classify all forty on the three axes; default every candidate to task head or workflow; promote to agent only when steps are unpredictable or tools are mandatory; the autonomy tier is the field governance reads first | The 40 agents tab (type; autonomy tier to add); the admission record |
| Build methodologies | Cost-controlled comparisons put the simplest structured build on the accuracy-cost frontier for bounded tasks: a retry baseline at 93.2% for $2.45 against a tree-search agent at 88.0% for $134.50; static workflows at 0.64 against a ReAct loop at 0.56 for half the cost. Freedom pays only for tool-mandatory tasks, loops with external verifiers, or breadth-first research at 4 to 15 times the tokens. Debate loses to self-consistency. Method-by-model interactions are large, so rankings do not transfer from frontier papers | A standard variant set per purpose: A, a task head or fixed workflow; B, a function-calling agent; C, orchestrator-workers, only for breadth-first purposes. Rerun every comparison on ThinkLatent's own models | First version, step 2; the wave-1 variants |
| Small open-weight models | A year-wide gap on tool calling (open 27B about 68% against frontier 73 to 77% on BFCL v4); trained small agents beat last year's frontier on narrow verifiable tasks and trail by 15 to 40 points on broad ones; extreme format sensitivity; constrained decoding helps once reasoning precedes the grammar; program optimisation (GEPA) lifts an 8B model more than RL at up to 35 times fewer rollouts; small models do not self-correct | Order of improvement: optimised program, then supervised training on verified trajectories, then RL. External validators in every loop; more structure, not more freedom; pin the serving configuration | First version (the trained variant's path); Capabilities (self-healing as the adapter route) |
| Comparing variants | The standard protocol: accuracy and cost on a convex Pareto frontier; pass^k rather than pass@k (an agent at 61% falls under 25% when all eight trials must pass); three to eight seeds with paired tests; judges calibrated against experts (agreement of 0.61 against a human ceiling of 0.69 at Shopify) and drawn from a different model line; the harness version pinned in the variant's identity. No published case reports which variant business users adopted | The comparison card carries exactly these fields; the Judge family scores from a different line than the agents it grades, or is cross-checked; the adoption log is new data | Hypotheses H3, H4, H7, H8; Capabilities (the comparison card) |
| Libraries and catalogues | Vendors ship three layers (prebuilt agents, templates and blueprints, components); public cards carry name, purpose, category, publisher, version and deploy path; owner, model, policy and evaluation live in a governance layer. Financial-services firms disclose posture, not schema: BNY's 130-plus digital employees with logins and managers; Citi's rule that agents do not deploy code; Goldman's agents that never act by themselves | The library entry is an A2A agent card plus identity and ownership, the three-axis classification, build and harness identity, per-tool policy classes, the evaluation record, and lifecycle and adoption fields | The admission record (Capabilities created); First version, step 4 |
| Regulation | SR 26-2 (17 April 2026) excludes generative and agentic AI from model-risk scope and defers to the firm's own governance; every published governance scheme grades controls by autonomy tier | An agent register separate from, and linked to, the model register, organised by autonomy tier, with the evaluation record and harness identity as its evidence and re-evaluation on any change to the variant's identity; default tier: no direct transactional authority | Governance story; the question for the governance team |

What the research could not close: no controlled harness study on 7B to 27B models specifically; no same-table comparison of a fine-tuned small agent against the contemporaneous frontier on quality, cost and latency; no enterprise case that offered business users several variants of one purpose and reported the choice; no primary asset-manager harness document; no end-to-end reference for gateway routing, cache-aware serving and a harness together. The first three are what wave 1 produces, which is the strongest argument for running it.

Primary sources behind this section (the brief holds the rest):

- [Barbaste et al., eleven production harnesses studied at source level](https://arxiv.org/pdf/2609.00006), July 2026
- [Zhang et al., harness variance against model variance on SWE-bench Verified](https://arxiv.org/pdf/2605.23950.pdf), 2026
- [Anthropic, Building effective agents](https://www.anthropic.com/research/building-effective-agents), December 2024
- [Kapoor et al., AI agents that matter: cost-controlled evaluation](https://arxiv.org/html/2407.01502v1), 2024
- [Holistic Agent Leaderboard](https://arxiv.org/pdf/2510.11977), 2025
- [τ-bench, pass^k reliability](https://arxiv.org/pdf/2406.12045), 2024
- [GEPA, program optimisation against RL on small models](https://arxiv.org/pdf/2507.19457v2), 2025
- [Menlo Ventures, the state of generative AI in the enterprise](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/), December 2025
- [Evident, agentic deployments across fifty banks](https://evidentinsights.com/bankingbrief/how-to-unchain-your-agent/), 2026
- [A2A protocol v1.0 specification](https://a2a-protocol.org/latest/specification/), 2026
- [Federal Reserve SR 26-2](https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm), 17 April 2026

## First version and what it is not

The first version is a loop, not a list: admit a purpose, build it in two or three methodology variants on the same TLM models, compare the variants on the index, publish the comparison and the winner in the library, and feed the corrections back. Wave 1 runs the loop on three purposes.

**The loop**

1. **Admit.** A purpose enters the portfolio only with a business owner, a volume number, labelled examples or corrections, a model recipe the family supports, and a rubric a judge can grade. The admission record is the agent record: this idea defines it, TL-008 supplies the policy and harness-version fields, and the portal shows it; until then it is a row on the second tab.
2. **Build variants.** The same purpose on the same models, built two or three ways. The default set, which the Scout section supports: A, a task head or a fixed workflow with model steps and programmatic gates (the cheapest and most predictable build); B, a function-calling agent in the harness with session state and tools (only where tools are mandatory, TL-008); C, orchestrator-workers (only for breadth-first purposes, at 4 to 15 times the tokens). Each variant is run first as prompted Core, then with an optimised program, then, where corrections exist, as a trained adapter on Core; the serving configuration (template, parser, strict level) is pinned as part of the variant's identity.
3. **Compare.** Same inputs, frozen window, scored on the index (TL-004): house rubric, cost per task, latency, reliability (pass^k), governance exposure, with a frontier baseline beside the variants.
4. **Publish.** The comparison card and the winning variant go into the agent library, this idea's publish step shown in the portal (TL-003), as a forkable blueprint (TL-010), adoptable without ThinkLatent engineering.
5. **Learn.** Corrections flow to the preference collector and the judge, then to the next Core refresh; demand counts flow to the Domain tier (TL-011).

**Wave 1: the first three purposes**

| # | Purpose | Models | Evidence for | Owners (roles) | Variants to compare | What it creates |
| --- | --- | --- | --- | --- | --- | --- |
| 28 | Task-mining agent: clusters production prompts from the flagship and the gateway logs to find the tasks hiding behind each served model, privacy-thresholded | D + C | TL-011, every domain; it supplies the first adapters from task mining on the flagship | Business: Head of ThinkLatent. Build: harness and platform lead | Two fixed workflows: embed, cluster, then label with Core; or Core summarises each prompt, then cluster. Judged by the foundation team on cluster usefulness | Task clusters per endpoint; the measured demand the rest of the portfolio is admitted against |
| 2 | After-call agent: the flagship made agentic. Summary, CRM write, follow-up draft, task creation, all proposed for approval | S + C + J | Advice (servicing) | Business: the flagship's current owner. Build: harness lead; the harness's first real agent | A: fixed workflow with gated steps (summary, CRM fields, follow-up, tasks); B: function-calling agent in the harness with session state and tools; A again on a Core adapter trained from the corrections | Correction capture as preference data; the harness's first owner-set policy (propose only) |
| 10 | Marketing and client-copy pre-review: flag, explain, suggest the rewrite, reviewer decides | C + J | Compliance | Business: compliance review lead. Build: a stream engineer | A: task head with the house policy in the prompt; A2: workflow with retrieval citing the rule behind each flag; A on a Core adapter trained from reviewed examples; no agent variant, the task is bounded | Policy-labelled review data; the flag-explain-rewrite pattern reused by purposes 6, 11 and 13 |

Each owner is a role until the Head of ThinkLatent names the person; the Building gate (no owner, no stream, no appetite, no start) applies to each purpose separately.

**What it is not**

- Not forty projects. Nothing outside wave 1 gets a build, an owner or a stream until it is admitted.
- Not a general assistant or a vendor-copilot replacement (cluster H), and not an advice engine (cluster C waits for the suitability layer).
- Not the portal page or the harness. The library's page is TL-003's and the harness with its policy field is TL-008's; this idea owns the agent record and the library's content.
- Not an evaluation harness. It consumes the index and the Judge family; it does not build them.
- Not autonomous. In wave 1 no agent commits an action; every write is a proposal a person approves.

## Appetite

Proposed: wave 1 is worth one quarter of two of the five streams, no more, and the Head of ThinkLatent sets the figure. The lab's capacity is five streams of one engineer plus a coding agent; S-A holds the dashboard (TL-007), S-B is queued for the index decision spike (TL-004), and the Judge family (TL-011 Build 1) and the portal's first journey will each ask for one. The portfolio cannot have more than two without starving the things it depends on.

How the two streams split, as a light plan for the team to detail:

- **Stream one (the harness lead's).** Task mining first as a two-week spike, because its output admits everything after it; then the after-call agent's variants, which are also the harness's first real customer (TL-008).
- **Stream two.** The pre-review variants. This is the same work as TL-011 Build 3 (the Compliance pre-review adapter), so the attention is spent once and the evidence counts for both ideas.

Two rules keep it inside the appetite. The comparison runs on the index's harness and judges, not on a parallel evaluation stack; if the index and the Judge family slip, wave 1 compares with a frontier panel and expert graders and marks every result provisional. And a purpose that does not fit its share of the quarter goes back to Shaping or to Parked, not forward; the loop is shaped to the appetite, not the reverse.

## Capabilities reused and created

Wave 1 builds nothing that the catalogue already holds; it reuses eleven capabilities, three of them still Proposed or Seed, and leaves six behind for others. Three of its dependencies (the harness, the telemetry store, the Judge family) are at Seed or Proposed maturity, and the idea inherits that risk in its feasibility score.

**Reused, before anything is built**

| Capability | Maturity | How wave 1 uses it |
| --- | --- | --- |
| AI Gateway and multi-tenant memory | In production | Every variant is served through it; sessions carry the after-call agent's state |
| HyperPod serving with per-setting endpoints | In production | One endpoint per variant, so cost and latency are measured per build |
| TLM4 Core and the TLM1 speech model | In production (not yet catalogue rows; a gap for the catalogue) | The models behind every variant |
| Self-healing gap-closing system | Built | The trained variant's path: gap report, adapter, offline eval |
| Scheduled-task and brief patterns | In production | Task mining as a nightly batch over the logs |
| Evaluation register and harness (TL-004) | Proposed | The comparison itself; demand count rises by one |
| Contribution flow (TL-004) | Proposed | Correction capture is an instance of it; demand count rises by one |
| Sandboxed tool replicas (TL-004) | Proposed | The after-call agent's CRM write is tested against a sandboxed replica before any proposal reaches a person |
| Usage-approval record (TL-003) | Idea | Each published variant carries its approval: model, setting, pillars, bars |
| Harness-served models (TL-008) | Seed | The loop variant; without it the loop runs application-side, as the flagship does today |
| Use-case telemetry contract and request store (TL-009) | Seed | Task mining reads it; v0 fields are enough for a first pass |
| Judge family (TL-011 Build 1) | Not started | The J slot in every C + J variant; a frontier panel stands in until it exists |

**Created, for others to reuse**

| Capability | Kind | Reused by |
| --- | --- | --- |
| Agent admission record: purpose, owner, volume, data, model recipe, rubric, policy | Process | The portal's agent library page (TL-003), TL-008 (its policy field), governance |
| Variant comparison card: variants against rubric, cost, latency, pass^k, governance exposure, with a frontier baseline | Evidence | The library and the portal, TL-011 build decisions, thought leadership |
| Task clusters per endpoint | Data | TL-011 (first adapters from the flagship), TL-003 catalogue recommendations, TL-009 |
| Correction capture as preference data | Data | Judge training, the Core refresh (TL-011 Build 6), the index |
| Flag-explain-rewrite pattern | Process | Purposes 6, 11 and 13, and any policy review outside compliance |
| Propose-only harness policy (no gate, no action) | Process | TL-008, as the default policy for every agent it serves |

## Governance story

No wave-1 agent owns a regulated decision or sends a client anything; every output is a proposal a person approves, and every published variant carries a record the governance team can read. Governance itself is a separate team's process and a row-level dependency: Core is validated once with the index methodology, and each published variant is a use case evaluated on top of that, carried by its usage-approval record.

| Purpose | Where the person sits | Exposure | Control |
| --- | --- | --- | --- |
| Task mining | Reads internal logs, writes clusters; no user-facing output | Access to the request store; prompts may hold client details | PII filtered before clustering; clusters under a privacy threshold are never shown; output is counts and labels, not prompts |
| After-call agent | Associate or advisor approves each CRM write, task and follow-up | A follow-up to a client is a supervised communication (FINRA 24-09) | Propose only; the draft is sent by the associate under existing supervision; the summary is the flagship's already-approved output |
| Pre-review | The compliance reviewer decides; the agent flags, explains and suggests | A missed true positive | Recall on known true positives measured on a frozen window; the agent is withdrawn from the queue if recall drops (H6) |

Three lines for later waves. Cluster C (client correspondence, portfolio commentary, complaint letters, translation) waits for the deterministic suitability layer and the house judges, because generative weights never own advice content. Cluster F runs under the SOC's no-gate-no-action rule. And the comparison card is the audit trail regulators are moving toward now that human review of individual outputs is no longer treated as sufficient on its own (TL-011 scout brief, Risk.net, July 2026).

One question only the governance team can answer: is a second variant of an approved purpose a new use case or a version of one? The answer sets how expensive the loop is to run, and the Head of ThinkLatent should ask it before wave 1 starts.

## Thin spots and the evidence that fixes them

The idea is thin in eight places; three of them can be fixed with names, the rest with the first wave's own output.

| Thin spot | Why it matters | Evidence that fixes it |
| --- | --- | --- |
| Evidence of need is one purpose deep | 37 of the 40 have no owner and no volume number; a 40-item list reads as demand but is a hunch | An admission ledger with a business owner and a volume per purpose; task-mining clusters over the flagship and gateway logs |
| The variant thesis may be false | External evidence (TL-011 scout brief; cost-controlled agent evaluations) says simple builds often match complex ones; the loop could spend a quarter proving the single call wins | H3's kill condition after wave 1; if variants sit within 3 points and 1.5x cost, stop building variants and ship the simplest |
| Four dependencies are at Seed or Proposed | The harness (TL-008), the telemetry contract (TL-009), the index (TL-004) and the Judge family (TL-011 Build 1) all precede a clean comparison; feasibility is capped by the weakest of them | Provisional comparison with a frontier panel and expert graders; the advisor-summary rubric grader as the Judge family's first adapter, built once and used by both ideas |
| No owner can be named here | The Building gate blocks all three purposes until the Head of ThinkLatent names a business owner and a build owner for each | Three names |
| Two register rows touch one product | TL-012 (the agents, the record and the library's content) and TL-010 blueprints (the packaging of each variant) could be shaped two ways in two chats | The split proposed here: TL-012 owns the agent record and the library's content, the portal (TL-003) owns the page, TL-010 owns the packaging; the Head of ThinkLatent confirms |
| The register assigned TL-012 twice (fixed the same day) | Two sessions read the same last ID within minutes | Fixed by a Lab-operations session on 2026-11-02: an ID counter claimed with a guarded edit, and a duplicate check in the nightly sync; the duplicate row was reconciled into this one |
| The loudest demand is in cluster H | Meeting notes and a knowledge assistant are what people ask for first, and the spine says not to compete with vendors there | A stated rule: a horizontal purpose is admitted only with a data-residency reason; otherwise the portal points to the vendor tool |
| Appetite assumes two free streams | TL-011 Build 1, the index spike and the portal each want a stream, and the five stream engineers are not yet named | The Head of ThinkLatent names the streams and sets the figure; task mining runs as a two-week spike so wave 1 shows something to the business inside the first month |

## Open questions

Three questions block the start of wave 1; all three are the Head of ThinkLatent's.

| # | Question | Owner | Blocking |
| --- | --- | --- | --- |
| 1 | Name a business owner and a build owner for each of the three wave-1 purposes | Head of ThinkLatent | Yes: the Building gate |
| 2 | Set the appetite: one quarter of two streams, or less | Head of ThinkLatent | Yes |
| 3 | Which two streams, once the five stream engineers are named | Head of ThinkLatent | Yes |
| 4 | Is a second variant of an approved purpose a new use case or a version of one | Head of ThinkLatent, with the governance team | For publishing, not for building |
| 5 | Closed: the TL-003 session reconciled the double registration into TL-012 agent-portfolio before this card was finished; this idea is TL-012 | Head of ThinkLatent | Closed |
| 6 | Is the agent library part of this idea or a feature of the portal? Proposed here: part of this idea, as its publish step and agent record, shown as a portal page the way the index is; TL-010 stays the packaging | Head of ThinkLatent | No |
| 7 | Confirm the default variant set the Scout section supports: A task head or fixed workflow, B function-calling agent, C orchestrator-workers for breadth-first purposes only, each at prompted, optimised and trained levels with the serving configuration pinned | Head of ThinkLatent | No; the default stands |
| 8 | Where the comparison card lives: the library, the portal catalogue or the index | Portal product lead and index lead, both to be named | No, for wave 1 |
| 9 | Run task mining as a TL-011 experiment rather than a TL-013 agent | Head of ThinkLatent | No; it runs first either way |
| 10 | Does the after-call agent's CRM write need a sandboxed replica before any proposal is shown to a person | Harness lead, to be named | No; propose-only covers version 1 |

## Decision log

| Date | Decision | By |
| --- | --- | --- |
| 2026-11-02 | Captured as a Seed in the TL-011 session with the 40-agent list; registered as TL-012 | Thinking partner, with the Head of ThinkLatent |
| 2026-11-02 | The same-day double registration (agent-library, from the TL-003 session) was reconciled by that session into this row; this idea stays TL-012 and the library thought is folded in. This session briefly used TL-013 before seeing the reconciliation; TL-013 is now design-kit | Thinking partner (TL-003 session) |
| 2026-11-02 | Shaping: Idea card v1. The idea reframed as a loop (admit, build variants, compare, publish, learn); wave 1 proposed as task mining, the after-call agent and pre-review, each in two or three methodology variants compared on the index | Thinking partner, pending the Head of ThinkLatent |
| 2026-11-02 | The agent library is part of this idea: its publish step and agent record, shown as a portal page the way the index is; not a separate feature row. TL-010 blueprints packages each variant | Thinking partner, pending the Head of ThinkLatent |
| 2026-11-02 | Scout pass on harness engineering, agent types and build methodologies commissioned inside the Shaping session | Head of ThinkLatent (asked); thinking partner (ran) |
| 2026-11-02 | Scout brief recorded (claude/scout-brief-agent-portfolio.md). Default variant set set to A, B and C by control-flow shape with the serving configuration pinned; the agent record follows the three-axis classification with the autonomy tier as the governance field; an agent register separate from the model register proposed under SR 26-2; H7 and H8 added | Thinking partner, pending the Head of ThinkLatent |

## Sources

- [Idea Register](https://claude.ai/artifact/6WzPg7fvvAf2tn8Z9X2Q2h), live doc, rev 67 as of 2026-11-02: rows TL-003 to TL-012, links, catalogue, strategy spine draft
- Agent portfolio seed note, project knowledge, claude/agent-portfolio-seed.md, 2026-11-02: the 40-agent list and the observations
- Specialists win tasks, frontier models win domains (TL-011 scout brief), project knowledge, claude/scout-brief-domain-model-portfolio.md, 2026-11-02: the build order, the task primitives, the licensing dates and the regulatory references cited above
- [Idea Lab (idea-lab) — Operating Model](https://claude.ai/artifact/2aygX2eWF1ddnJS68nUntF), rev 24: stages, modes, the Idea doc standard v1, the capability catalogue rules
- External sources: the primary ones under What exists (Scout); all 203 in the scout brief in project knowledge, claude/scout-brief-agent-portfolio.md, 2026-11-02
