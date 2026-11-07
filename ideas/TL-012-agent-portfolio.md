---
id: TL-012
slug: agent-portfolio
title: "Agent portfolio — one agent purpose, several methodology variants on TLM, compared on the index and published in the library; the demand side of the Domain tier"
aliases: []
type: Idea
parent: null
themes: ["T-001"]
stage: "Shaping"
stage_since: null
horizon: "H1"
stream: null
appetite_weeks: null
appetite_ends: null
owner: "Head of ThinkLatent (sponsor); a business owner and a build owner per wave-1 purpose to be named"
score: null
score_status: none
doc_url: "https://claude.ai/artifact/T5rhguUBWXiUtPamFxxELT"
standard: "v1"
last_touched: 2026-11-02
sensitivity: none
critique_recorded: null
next_step: "Jithin: name a business owner and a build owner for each wave-1 purpose (task mining, after-call agent, marketing pre-review), set the appetite (one quarter of two streams proposed) and the two streams; confirm the library sits inside TL-012 and the A/B/C variant set; ask the governance team whether a second variant of an approved purpose is a new use case. Then the Stress test session (critique log, kill criteria, the scout brief answered, rubric score); add the autonomy-tier column to the 40-agents tab there. From TL-003 (2026-11-05): Jithin decided the knowledge agent ships first in the portal's agent library"
next_step_due: null
---

# Agent portfolio — one agent purpose, several methodology variants on TLM, compared on the index and published in the library; the demand side of the Domain tier

<!-- generated:start -->
## Lab record

**TL-012 agent-portfolio** · Idea · Shaping (Idea card v1 and scout brief, 2026-11-02; wave 1 and the variant set proposed; Stress test next) · H1

Owner: Head of ThinkLatent (sponsor); a business owner and a build owner per wave-1 purpose to be named. Appetite: not set. Score: not scored .

Next step: Jithin: name a business owner and a build owner for each wave-1 purpose (task mining, after-call agent, marketing pre-review), set the appetite (one quarter of two streams proposed) and the two streams; confirm the library sits inside TL-012 and the A/B/C variant set; ask the governance team whether a second variant of an approved purpose is a new use case. Then the Stress test session (critique log, kill criteria, the scout brief answered, rubric score); add the autonomy-tier column to the 40-agents tab there. From TL-003 (2026-11-05): Jithin decided the knowledge agent ships first in the portal's agent library

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
| depends-on | TL-011 domain-model-portfolio | Agents are the use cases that justify each Domain model; nearly every multi-model agent is Core plus Judge |
| depends-on | TL-008 harness-served | Agents are the use cases that justify each Domain model; nearly every multi-model agent is Core plus Judge |
| serves | T-001 Sovereign AI | Owned models, owned data, owned infrastructure; the agents are what Core is for |
| evidence-for | TL-011 domain-model-portfolio | Wave 1: task mining (every domain), the after-call agent (Advice, servicing), pre-review (Compliance); demand counts per Domain model are the evidence |
| reuses | AI Gateway | Declared at Shaping; the harness, the telemetry contract and the Judge family are at Seed or Proposed maturity, so feasibility inherits that risk |
| reuses | HyperPod serving | Declared at Shaping; the harness, the telemetry contract and the Judge family are at Seed or Proposed maturity, so feasibility inherits that risk |
| reuses | TLM4 Core and the TLM1 speech model | Declared at Shaping; the harness, the telemetry contract and the Judge family are at Seed or Proposed maturity, so feasibility inherits that risk |
| reuses | self-healing system | Declared at Shaping; the harness, the telemetry contract and the Judge family are at Seed or Proposed maturity, so feasibility inherits that risk |
| reuses | scheduled-task patterns | Declared at Shaping; the harness, the telemetry contract and the Judge family are at Seed or Proposed maturity, so feasibility inherits that risk |
| reuses | evaluation register and harness | Declared at Shaping; the harness, the telemetry contract and the Judge family are at Seed or Proposed maturity, so feasibility inherits that risk |
| reuses | contribution flow | Declared at Shaping; the harness, the telemetry contract and the Judge family are at Seed or Proposed maturity, so feasibility inherits that risk |
| reuses | sandboxed tool replicas | Declared at Shaping; the harness, the telemetry contract and the Judge family are at Seed or Proposed maturity, so feasibility inherits that risk |
| reuses | use-case record | Declared at Shaping; the harness, the telemetry contract and the Judge family are at Seed or Proposed maturity, so feasibility inherits that risk |
| reuses | harness runtime (TL-008) | Declared at Shaping; the harness, the telemetry contract and the Judge family are at Seed or Proposed maturity, so feasibility inherits that risk |
| reuses | telemetry contract and Langfuse store (TL-009) | Declared at Shaping; the harness, the telemetry contract and the Judge family are at Seed or Proposed maturity, so feasibility inherits that risk |
| reuses | Judge family (TL-011 Build 1) | Declared at Shaping; the harness, the telemetry contract and the Judge family are at Seed or Proposed maturity, so feasibility inherits that risk |
| creates | Agent admission record | Catalogue rows at Idea maturity; the admission record is the library's record and a candidate for the agent register |
| creates | variant comparison card | Catalogue rows at Idea maturity; the admission record is the library's record and a candidate for the agent register |
| creates | task clusters per endpoint | Catalogue rows at Idea maturity; the admission record is the library's record and a candidate for the agent register |
| creates | correction capture as preference data | Catalogue rows at Idea maturity; the admission record is the library's record and a candidate for the agent register |
| creates | flag-explain-rewrite pattern | Catalogue rows at Idea maturity; the admission record is the library's record and a candidate for the agent register |
| creates | propose-only harness policy | Catalogue rows at Idea maturity; the admission record is the library's record and a candidate for the agent register |
| enables | TL-010 blueprints | Each published variant is a forkable blueprint; the first three are wave 1 |
| related-to | TL-004 index | Variants are compared on the index; task mining reads the telemetry store; the trained variant goes through self-healing; the comparison card takes the kit's language |
| related-to | TL-009 telemetry-contract | Variants are compared on the index; task mining reads the telemetry store; the trained variant goes through self-healing; the comparison card takes the kit's language |
| related-to | TL-005 self-healing | Variants are compared on the index; task mining reads the telemetry store; the trained variant goes through self-healing; the comparison card takes the kit's language |
| related-to | TL-013 design-kit | Variants are compared on the index; task mining reads the telemetry store; the trained variant goes through self-healing; the comparison card takes the kit's language |

### Artifacts
| Artifact | Kind | In this repo | Live | Exported |
| --- | --- | --- | --- | --- |
| Agent portfolio (agent-portfolio) — Idea card: Idea card | doc | [artifacts/TL-012-agent-portfolio/idea-card.md](../artifacts/TL-012-agent-portfolio/idea-card.md) | [claude.ai](https://claude.ai/artifact/T5rhguUBWXiUtPamFxxELT) | 2026-11-04 |
| Agent portfolio (agent-portfolio) — Idea card: The 40 agents | doc | [artifacts/TL-012-agent-portfolio/the-40-agents.md](../artifacts/TL-012-agent-portfolio/the-40-agents.md) | [claude.ai](https://claude.ai/artifact/T5rhguUBWXiUtPamFxxELT) | 2026-11-04 |
| scout-brief-agent-portfolio.md | brief | [artifacts/TL-012-agent-portfolio/scout-brief-agent-portfolio.md](../artifacts/TL-012-agent-portfolio/scout-brief-agent-portfolio.md) | [claude.ai](project-knowledge:claude/scout-brief-agent-portfolio.md) | 2026-11-04 |
| agent-portfolio-seed.md | brief | [artifacts/TL-012-agent-portfolio/agent-portfolio-seed.md](../artifacts/TL-012-agent-portfolio/agent-portfolio-seed.md) | [claude.ai](project-knowledge:claude/agent-portfolio-seed.md) | 2026-11-04 |

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-043 | 2026-11-02 | Registered at Seed from a brainstorm in the TL-011 session: 40 candidate agents in six groups (servicing and advice, compliance, cybersecurity, judge, platform operations, enterprise-wide) with the TLM models that power each; to be shaped in its own chat | Jithin | accepted |
| D-051 | 2026-11-02 | Moved to Shaping with an Idea card and a scout brief: the portfolio is a loop, not a list; wave 1 is task mining, the after-call agent and marketing pre-review, each built as A (task head or fixed workflow), B (function-calling agent in the harness) and, where corrections exist, a trained adapter on Core, compared on the index with the serving configuration pinned; the agent library is part of TL-012 (publish step and agent record), shown as a portal page; an agent register separate from the model register proposed under SR 26-2; H3 carries the kill condition for the variant thesis. Thin point named: evidence of need is one purpose deep | Thinking partner, pending Jithin | proposed |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._
