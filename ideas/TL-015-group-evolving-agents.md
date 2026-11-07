---
id: TL-015
slug: group-evolving-agents
title: "Group evolving agents — a true agentic system of many agents on the TLM model mix that evolves and encodes enterprise institutional knowledge"
aliases: []
type: Idea
parent: null
themes: ["T-001"]
stage: "Shaping"
stage_since: "2026-11-07"
horizon: "H3"
stream: null
appetite_weeks: null
appetite_ends: null
owner: "Idea owner and product lead (Jithin); harness lead and builder (Claude)"
score: null
score_status: none
doc_url: null
standard: "pre-v1"
last_touched: 2026-11-07
sensitivity: none
critique_recorded: null
next_step: "Claude (harness lead): backfill decision traces for 20 lab decisions from the register and sessions log to test H1 and fix the trace schema; Scout prior art on playbook evolution and decision-trace memory; then Jithin reviews the schema and the backfill"
next_step_due: "2026-11-21"
---

# Group evolving agents — a true agentic system of many agents on the TLM model mix that evolves and encodes enterprise institutional knowledge

<!-- generated:start -->
## Lab record

**TL-015 group-evolving-agents** · Idea · Shaping (Shaping since 2026-11-07: L1 playbooks and skills evolve first; the knowledge unit is the decision trace (trigger, request, action and why, precedent, outcome, next goal); first arena is ThinkLatent's own work (the lab, then TL-017 Cortex)) · H3

Owner: Idea owner and product lead (Jithin); harness lead and builder (Claude). Appetite: not set. Score: not scored .

Next step: Claude (harness lead): backfill decision traces for 20 lab decisions from the register and sessions log to test H1 and fix the trace schema; Scout prior art on playbook evolution and decision-trace memory; then Jithin reviews the schema and the backfill (due 2026-11-21)

Production surface: not named (reads as an H3 experiment).

Governance: not recorded.

### Decisions due
_None._

### Hypotheses
| Claim | Confirmed if | Refuted if | Evidence | Confidence | Result |
| --- | --- | --- | --- | --- | --- |
| H1. Decision traces can be captured cheaply | At least 80% of a 20-decision backfill complete with one question or fewer each | Under 50% complete, or Jithin needs more than 15 minutes a week to fill gaps | not set | not set | open |
| H2. Playbooks evolved from traces cut rework | Rework falls by 30% or more over 6 weeks once evolved playbooks are in use | No fall, or a rise | not set | not set | open |
| H3. Precedent helps the next decision | At least half of proposals over 6 weeks | Under 20% | not set | not set | open |
| H4. A shared library beats private ones | At least 5 cross-role adoptions that improve the adopter in 6 weeks | None | not set | not set | open |

### Kill signals
| Signal | By | Status | Action |
| --- | --- | --- | --- |
| Library bloat: the playbook library doubles in size while rework stays flat | 2027-01-09 | open |  |
| Gaming: playbooks pass the Judge or auditor but fail Jithin's review at least a third of the time | 2027-01-09 | open |  |
| Capture cost: keeping traces costs Jithin more than 15 minutes a week | 2026-12-05 | open |  |

### Open questions
| Question | Owner | Blocking |
| --- | --- | --- |
| Which models run the first slice: TLM through Relay, Claude in the lab, or a mix, given the idea is defined on the TLM model mix? | Harness lead (Claude) proposes; Jithin decides | Yes, for Stress test |
| Is the lab's volume (tens of decisions a week) enough signal for selection, or does Cortex (TL-017) have to join before H2 can be read? | Index lead (Claude) | Yes, for Stress test |
| What is new here against published playbook and skill-library evolution, beyond the decision-trace knowledge unit? | Research function (Claude), Scout | Yes, for Stress test |
| Where do traces live: the per-use-case knowledge graph in the harness, or the register itself extended? | Harness lead (Claude) | No |

### Links
| Link | To | Note |
| --- | --- | --- |
| depends-on | TL-014 model-mix | Agents run on the model mix and the harness; the Judge family is the likely fitness function for evolution |
| depends-on | TL-012 agent-portfolio | Agents run on the model mix and the harness; the Judge family is the likely fitness function for evolution |
| depends-on | TL-008 harness-served | Agents run on the model mix and the harness; the Judge family is the likely fitness function for evolution |
| depends-on | TL-011 domain-model-portfolio (Judge family) | Agents run on the model mix and the harness; the Judge family is the likely fitness function for evolution |
| reuses | TL-005 self-healing | Self-healing already closes gaps in a model; evolution of a group of agents may be the same loop one level up |
| reuses | Evaluation register and harness | Judge and auditor scores are the selection signal for playbooks |
| reuses | Harness runtime (Hermes with Relay sessions, per-use-case knowledge graph) | Candidate home for the decision-trace graph |
| reuses | Correction capture as preference data | Jithin's corrections are the strongest selection pressure |
| reuses | Propose-only harness policy | Evolved playbooks propose; Jithin approves anything that ships |
| reuses | Register assistant (Jarvis) | Dashboard quick calls are decisions the trace captures |
| reuses | Scheduled-task and brief patterns | The nightly sync is an observer that flags exceptions |
| reuses | Blueprints registry | Candidate store for versioned playbooks and their lineage |
| creates | Decision-trace record and graph | Created at Shaping 2026-11-07 |
| creates | Playbook evolution loop | Created at Shaping 2026-11-07 |
| related-to | Idea Lab | First arena: the lab's own decisions and skills |
| related-to | team-hub (Cortex) | Second arena if lab volume is too thin for selection |

### Artifacts
_None recorded._

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-132 | 2026-11-07 | Register row corrected: stage restored to Seed (since 2026-11-02) with its own next step; the TL-013 design-kit stage note and next step that had been written into TL-015's row on 2026-11-03 removed (TL-013's own row already carries newer content, so nothing moved). Clears the 2026-11-04 nightly flag. First Brainstorm held; stays at Seed until Jithin picks the layer that evolves and the first arena. | Jithin (correction); thinking partner (brainstorm) | accepted |
| D-157 | 2026-11-07 | Moved to Shaping. First slice: L1 (playbooks and skills) evolves first; institutional knowledge is everything (procedures, routing, rationale, exceptions) held as a decision trace: the real-world need, the business request, the action and why, past precedent, what actually happened, and the next goal it set off; first arena is ThinkLatent's own work. Reuses seven capabilities, creates CAP-031 decision trace and CAP-032 playbook evolution loop; H1 to H4 and three kill signals pre-registered. | Jithin (layer, knowledge, arena, stage); thinking partner (hypotheses, reuse) | accepted |
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

### 2026-11-07 · Shaping 1 · idea card v0

**Jithin's calls (D-157).** L1 playbooks and skills evolve first. Institutional knowledge covers everything (procedures, routing, rationale, exceptions), recorded as a full decision trace. The first arena is ThinkLatent's own work.

**The knowledge unit: a decision trace.** Each decision is captured as a chain:

| Field | Question it answers |
| --- | --- |
| Trigger | What real-world event or need started this? |
| Request | What business request did it turn into? |
| Action and why | What was done, what else was weighed, and the reason |
| Precedent | What happened before in similar cases, and what was learned |
| Outcome | What actually happened afterwards |
| Next goal | What new goal this decision set off |

Traces link to each other (caused-by, led-to, supersedes), so the record is a graph of how the organisation reasons, not a list of facts. Playbooks are what evolves. Traces are the evidence they evolve from.

**Why our own work first.** The lab already produces traces in rough form: decision lines with supersedes, sessions, next steps, nightly flags and dashboard quick calls. Its playbooks already exist too, in the lab, lab-session, lab-decisions and lab-sync skills. Today's row error (TL-013 text written into TL-015's row on 2026-11-03, caught by a nightly flag, fixed in D-132) is a complete trace from trigger to next goal: exactly the kind of exception a playbook should learn from. The group is the lab's agent roles (scout, critic, spec writer, sync, auditor), sharing one library.

**Selection signals.** Auditor findings, Jithin's corrections, nightly-sync flags and Judge scores, with corrections weighted highest. Propose-only: an evolved playbook never ships without Jithin's approval.

**Strategy spine fit (honest).** This sits on the spine's management systems (the lab, the register) and on how to win (an owned build-and-heal loop). It is outside where to play as written, which is bounded, high-volume Enterprise workflows. The arena is small and internal. Fit is fair for an H3 bet, not strong.

**Thin points carried into Stress test.**
- Volume: tens of decisions a week is little signal for selection. Cortex (TL-017) may have to join before H2 can be read.
- Novelty: playbook and skill-library evolution is published ground. What is distinctive is the decision trace as the knowledge unit, and the Scout has to confirm that.
- The idea is defined on the TLM model mix, but the lab runs on Claude. Which model runs the first slice is open.

Hypotheses H1 to H4, kill signals and open questions are in the lab record above.

**Next step (due 2026-11-21).** Backfill traces for 20 lab decisions to test H1 and fix the schema; Scout prior art; then Jithin reviews.
