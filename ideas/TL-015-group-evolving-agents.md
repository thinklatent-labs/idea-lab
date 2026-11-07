---
id: TL-015
slug: group-evolving-agents
title: "Group evolving agents — a true agentic system of many agents on the TLM model mix that evolves and encodes enterprise institutional knowledge"
aliases: []
type: Idea
parent: null
themes: ["T-001"]
stage: "Seed"
stage_since: "2026-11-02"
horizon: "H3"
stream: null
appetite_weeks: null
appetite_ends: null
owner: "Jithin"
score: null
score_status: none
doc_url: null
standard: "pre-v1"
last_touched: 2026-11-07
sensitivity: none
critique_recorded: null
next_step: "In the TL-015 chat: Jithin picks what evolves first (playbooks and skills, team design, institutional memory, or model weights), what counts as institutional knowledge for the first slice, and the first arena from the brainstorm in the idea doc; then Shaping: reuse list from the catalogue, pre-registered hypotheses with kill criteria, idea card"
next_step_due: "2026-11-21"
---

# Group evolving agents — a true agentic system of many agents on the TLM model mix that evolves and encodes enterprise institutional knowledge

<!-- generated:start -->
## Lab record

**TL-015 group-evolving-agents** · Idea · Seed (registered 2026-11-02 in the TL-011 chat; first Brainstorm 2026-11-07 (eight directions across four layers that can evolve); TL-013 design-kit text removed from this row) · H3

Owner: Jithin. Appetite: not set. Score: not scored .

Next step: In the TL-015 chat: Jithin picks what evolves first (playbooks and skills, team design, institutional memory, or model weights), what counts as institutional knowledge for the first slice, and the first arena from the brainstorm in the idea doc; then Shaping: reuse list from the catalogue, pre-registered hypotheses with kill criteria, idea card (due 2026-11-21)

Production surface: not named (reads as an H3 experiment).

Governance: not recorded.

### Decisions due
_None._

### Hypotheses
_None recorded._

### Kill signals
_None recorded._

### Open questions
_None recorded._

### Links
| Link | To | Note |
| --- | --- | --- |
| depends-on | TL-014 model-mix | Agents run on the model mix and the harness; the Judge family is the likely fitness function for evolution |
| depends-on | TL-012 agent-portfolio | Agents run on the model mix and the harness; the Judge family is the likely fitness function for evolution |
| depends-on | TL-008 harness-served | Agents run on the model mix and the harness; the Judge family is the likely fitness function for evolution |
| depends-on | TL-011 domain-model-portfolio (Judge family) | Agents run on the model mix and the harness; the Judge family is the likely fitness function for evolution |
| reuses | TL-005 self-healing | Self-healing already closes gaps in a model; evolution of a group of agents may be the same loop one level up |

### Artifacts
_None recorded._

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-132 | 2026-11-07 | Register row corrected: stage restored to Seed (since 2026-11-02) with its own next step; the TL-013 design-kit stage note and next step that had been written into TL-015's row on 2026-11-03 removed (TL-013's own row already carries newer content, so nothing moved). Clears the 2026-11-04 nightly flag. First Brainstorm held; stays at Seed until Jithin picks the layer that evolves and the first arena. | Jithin (correction); thinking partner (brainstorm) | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._

### 2026-11-07 · Brainstorm 1 (Seed)

**Row correction.** From 2026-11-03 to 2026-11-07 this row held TL-013 design-kit text in its stage note and next step and read Shaping. It was registered at Seed on 2026-11-02 and never had a session of its own. Restored to Seed (D-132).

**The seed as stated.** A real agentic system of many agents running on the TLM model mix that evolves over time and encodes the Enterprise's institutional knowledge.

**What the seed doesn't say yet** (these are the questions to settle before Shaping, not judgements): *what* evolves, *what counts as* institutional knowledge, *what selects* (the fitness signal), and *where* it runs first.

#### Four layers that can evolve

| Layer | What changes | Speed | Reversibility |
| --- | --- | --- | --- |
| L1 Playbooks and skills | prompts, tool recipes and procedures held in a shared library | hours | high (versioned text) |
| L2 Team design | roles, routing, which TLM model sits in which seat (Core, Distil, Domain, decision model) | days | high (blueprints) |
| L3 Institutional memory | a knowledge graph of who handles what, why decisions were taken, exceptions | continuous | medium (needs consolidation and forgetting) |
| L4 Weights | the group's best trajectories distilled back into TLM Core or Domain models | weeks | low (a model release) |

"Group" can mean a **population** (many variants of one agent competing, with the winners kept) or a **society** (different agents that share what they learn). Those are different systems, and the seed reads as both.

#### Directions

1. **Shared playbook library (L1).** Every agent writes to and reads from one library of playbooks. Variants that pass the Judge on task clusters get promoted; failing ones are retired. Evolution happens as text, so no training is needed.
2. **Evolve the team, not the agent (L2).** Search over team designs: which roles, which handoffs, which model in which seat. The output is blueprints and variant cards. This is TL-012's "one purpose, several variants" made automatic.
3. **Institutional memory is the product (L3).** The agents are mainly a way to *harvest* knowledge. Every resolved case updates a per-use-case knowledge graph, and evolving means consolidating it, resolving conflicts and forgetting what's stale. The lasting asset is the graph, which outlives any agent.
4. **The group teaches the model (L4).** The self-healing loop (TL-005) one level up. The group's best trajectories become SFT and preference data for TLM Core and Domain models, and the next generation of agents starts from a stronger model.
5. **Apprentice society.** Agents shadow people and propose only. Each correction a person makes is the selection pressure, captured as preference data. Fitness is set by people, not by a Judge.
6. **Internal market.** The TL-014 decision model acts as auctioneer and routes each task to the agent with the best expected score per unit of cost. Agents that win work get copied and the rest die out. Cost per task becomes a selection pressure from the start.
7. **Contrarian: evolve offline, ship frozen.** Nothing evolves in production. Evolution runs in sandboxed tool replicas, and only versioned, approved generations ship under the propose-only policy. The system evolves, but no live agent does.
8. **Contrarian: evolve the examiner.** Co-evolve red-team and Judge agents with the workers, so the fitness function doesn't get gamed. What gets evolved is the evaluation, and the agents improve as a result of it.

Adjacent options: (a) group trajectories as training data for TLM5, the trajectory engine, which learns from observation; (b) a first arena on ThinkLatent's own work (the lab, TL-017 Cortex), where the knowledge is the team's own and the data is its own.

#### Candidate reuse (to confirm at Shaping)

CAP-004 self-healing loop · CAP-005 evaluation register and harness · CAP-007 sandboxed tool replicas · CAP-019 harness runtime with per-use-case knowledge graph · CAP-020 blueprints registry · CAP-021 agent admission record · CAP-022 variant comparison card · CAP-023 task clusters per endpoint · CAP-024 correction capture as preference data · CAP-026 propose-only harness policy · CAP-001 multi-tenant memory. Candidate new capabilities: an evolution loop (population store, selection, lineage) and an institutional-knowledge graph with consolidation.

#### Choices put to Jithin

1. Which layer evolves first (L1 to L4)?
2. For the first slice, what is institutional knowledge: procedures, routing (who handles what), decision rationale, or exceptions?
3. Where is the first arena: an Enterprise use case through the agent portfolio, or ThinkLatent's own work?
