---
id: TL-012
slug: agent-portfolio
title: "Agent portfolio — one agent purpose, several methodology variants on TLM, compared on the index and published in the library; the demand side of the Domain tier"
aliases: []
type: Idea
parent: null
themes: ["T-001"]
stage: "Stress test"
stage_since: "2026-11-07"
horizon: "H1"
stream: "S-D"
appetite_weeks: 12
appetite_ends: null
owner: "Head of ThinkLatent, sponsor (Jithin). Task mining: business, Head of Applied Research (Jithin); build, Applied Research engineer (Claude). After-call agent: business, Head of AI Products (Jithin); build, harness and platform lead (Claude). Pre-review: business, Head of Applied Research, interim (Jithin); build, Applied Research engineer (Claude)"
score: 3.15
score_status: set
doc_url: "https://claude.ai/artifact/T5rhguUBWXiUtPamFxxELT"
standard: "v1"
last_touched: 2026-11-07
sensitivity: none
critique_recorded: true
next_step: "Spec session (pre-Proposal changes from the Stress test pack): cap each purpose at two variants x two levels; write the judge stand-in calibration plan (frontier-panel judge from a different model line, human audit, published agreement); harden the after-call design (no CRM write credential in v1, protected fields excluded, injection test set, approved-with-error measure); declare each purpose's dataset and what it can prove; record the loop's governance cost under both answers to the variant question. Then move to Proposal. Building can start at week 8 (2026-12-28) with slots Tuesday and Friday, 30 minutes, if TL-004's week-4 gate (2026-12-04) is met; otherwise pre-review only. Quick call TL-012-q3 (kill-criteria read dates) on the dashboard From TL-003 (2026-11-07, D-178): the agent library's first entry is marketing pre-review, matching wave-1 order; the knowledge agent shows as coming next. From TL-007 (2026-11-08, D-204): D-051 still reads proposed although D-159 accepted it; add a line that marks it accepted so it leaves the 'awaiting your accept' count."
next_step_due: "2026-11-21"
---

# Agent portfolio — one agent purpose, several methodology variants on TLM, compared on the index and published in the library; the demand side of the Domain tier

<!-- generated:start -->
## Lab record

**TL-012 agent-portfolio** · Idea · Stress test (Critique recorded 2026-11-07 (D-170); score set 3.15 (D-172); appetite 12 engineer-weeks, weeks 8 to 13 (D-171). Stays at Stress test until the pack's pre-Proposal changes land) · H1 · S-D

Owner: Head of ThinkLatent, sponsor (Jithin). Task mining: business, Head of Applied Research (Jithin); build, Applied Research engineer (Claude). After-call agent: business, Head of AI Products (Jithin); build, harness and platform lead (Claude). Pre-review: business, Head of Applied Research, interim (Jithin); build, Applied Research engineer (Claude). Appetite: 12 engineer-weeks. Score: 3.15 (set).

Next step: Spec session (pre-Proposal changes from the Stress test pack): cap each purpose at two variants x two levels; write the judge stand-in calibration plan (frontier-panel judge from a different model line, human audit, published agreement); harden the after-call design (no CRM write credential in v1, protected fields excluded, injection test set, approved-with-error measure); declare each purpose's dataset and what it can prove; record the loop's governance cost under both answers to the variant question. Then move to Proposal. Building can start at week 8 (2026-12-28) with slots Tuesday and Friday, 30 minutes, if TL-004's week-4 gate (2026-12-04) is met; otherwise pre-review only. Quick call TL-012-q3 (kill-criteria read dates) on the dashboard From TL-003 (2026-11-07, D-178): the agent library's first entry is marketing pre-review, matching wave-1 order; the knowledge agent shows as coming next. From TL-007 (2026-11-08, D-204): D-051 still reads proposed although D-159 accepted it; add a line that marks it accepted so it leaves the 'awaiting your accept' count. (due 2026-11-21)

Production surface: not named (reads as an H3 experiment).

Governance (separate team): not started, Agent register by autonomy tier; whether a second variant of an approved purpose is a new use case

### Decisions due
_None._

### Hypotheses
| Claim | Confirmed if | Refuted if | Evidence | Confidence | Result |
| --- | --- | --- | --- | --- | --- |
| H1 (company version). Admitted agent purposes cluster to the Domain candidates plus a platform set, with several purposes per domain sharing a model recipe | By the end of wave 1, servicing (Advice), Compliance and Judge each hold three or more admitted purposes with named owners | A domain holds one or fewer admitted purposes after a quarter; TL-011 should not carry it as a Domain model | opinion | not set | open |
| H2 (lab, near-circular). Most multi-model agents are Core plus a judge, so the Judge family is the shared dependency and the first platform build | 70% or more of admitted multi-model purposes carry a judge component and the Judge family holds the highest demand count | Fewer than half carry one, or deterministic checks replace the judge in most | opinion | not set | open |
| H3 (lab, proxy). Methodology variants of one purpose differ enough that the choice matters, and the simplest variant does not always win | For at least two purposes, variants differ by more than 5 rubric points, or by 2x on cost at equal quality | Variants within 3 points and 1.5x cost on all purposes: stop building variants, ship the simplest build (kill criterion I-5) | opinion | not set | open |
| H4 (lab, provisional). The winning variant on TLM4 Core with the house judge matches a frontier baseline at lower cost, with data inside the boundary | Within 3 points of the frontier at half the cost or less | The frontier leads by more than 3 points after one retrain cycle; that purpose is not evidence for a Domain model | opinion | not set | open |
| H5 (company version). A compared, adoptable variant is picked up by a business team without ThinkLatent engineering | Two or more teams adopt a wave-1 purpose within 60 days; first use inside two weeks | No adoption outside the originating team | opinion | not set | open |
| H6 (company version). Wave 1 reduces human time on its two business purposes without losing recall | 30% less after-call time; 40% less reviewer time at no loss of recall | No change, or recall drops; the agent is withdrawn from that queue | opinion | not set | open |
| H7 (lab, narrowed). A change of harness or serving configuration moves pass^k materially on one Core version; the Core-version comparison waits for the company version | The serving-configuration delta exceeds 5 pass^k points on at least two purposes | Serving-configuration deltas sit within noise; harness variants are not worth a stream | opinion | not set | open |
| H8 (company version). Shown quality, cost, latency and reliability side by side, business teams choose variants on the measured frontier | 70% or more of choices sit on the accuracy-cost frontier | Choices cluster on a dominated variant; the comparison card is redesigned | opinion | not set | open |

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
| depends-on | TL-020 judge-family | Wave 1 rubric grader |

### Artifacts
| Artifact | Kind | In this repo | Live | Exported |
| --- | --- | --- | --- | --- |
| Agent portfolio (agent-portfolio) — Idea card: Idea card | doc | [artifacts/TL-012-agent-portfolio/idea-card.md](../artifacts/TL-012-agent-portfolio/idea-card.md) | [claude.ai](https://claude.ai/artifact/T5rhguUBWXiUtPamFxxELT) | 2026-11-04 |
| Agent portfolio (agent-portfolio) — Idea card: The 40 agents | doc | [artifacts/TL-012-agent-portfolio/the-40-agents.md](../artifacts/TL-012-agent-portfolio/the-40-agents.md) | [claude.ai](https://claude.ai/artifact/T5rhguUBWXiUtPamFxxELT) | 2026-11-07 |
| scout-brief-agent-portfolio.md | brief | [artifacts/TL-012-agent-portfolio/scout-brief-agent-portfolio.md](../artifacts/TL-012-agent-portfolio/scout-brief-agent-portfolio.md) | [claude.ai](project-knowledge:claude/scout-brief-agent-portfolio.md) | 2026-11-04 |
| agent-portfolio-seed.md | brief | [artifacts/TL-012-agent-portfolio/agent-portfolio-seed.md](../artifacts/TL-012-agent-portfolio/agent-portfolio-seed.md) | [claude.ai](project-knowledge:claude/agent-portfolio-seed.md) | 2026-11-04 |
| Agent portfolio (agent-portfolio) — Idea card: Stress test pack | doc | [artifacts/TL-012-agent-portfolio/stress-test-pack.md](../artifacts/TL-012-agent-portfolio/stress-test-pack.md) | [claude.ai](https://claude.ai/artifact/T5rhguUBWXiUtPamFxxELT) | 2026-11-07 |

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-043 | 2026-11-02 | Registered at Seed from a brainstorm in the TL-011 session: 40 candidate agents in six groups (servicing and advice, compliance, cybersecurity, judge, platform operations, enterprise-wide) with the TLM models that power each; to be shaped in its own chat | Jithin | accepted |
| D-051 | 2026-11-02 | Moved to Shaping with an Idea card and a scout brief: the portfolio is a loop, not a list; wave 1 is task mining, the after-call agent and marketing pre-review, each built as A (task head or fixed workflow), B (function-calling agent in the harness) and, where corrections exist, a trained adapter on Core, compared on the index with the serving configuration pinned; the agent library is part of TL-012 (publish step and agent record), shown as a portal page; an agent register separate from the model register proposed under SR 26-2; H3 carries the kill condition for the variant thesis. Thin point named: evidence of need is one purpose deep | Thinking partner, pending Jithin | proposed |
| D-159 | 2026-11-07 | D-051 accepted as the base for the Stress test: the portfolio is a loop (admit, build variants A/B/C on TLM, compare on the TL Index, publish in the agent library inside TL-012, learn); wave 1 is task mining (#28), the after-call agent (#2) and marketing pre-review (#10) | Jithin | accepted |
| D-160 | 2026-11-07 | Wave-1 owner roles: task mining, business Head of Applied Research (Jithin), build Applied Research engineer (Claude); after-call agent, business Head of AI Products (Jithin), chosen over the flagship's servicing owner, build harness and platform lead (Claude); pre-review, business Head of Applied Research as interim owner (Jithin), chosen over the Enterprise's compliance review lead, build Applied Research engineer (Claude). The card's task-mining owner (Head of ThinkLatent) is replaced, as the Building gate requires | Jithin | accepted |
| D-161 | 2026-11-07 | Appetite 26 engineer-weeks: a full quarter (weeks 1 to 13) on two streams, S-D and S-E, which absorb TL-012 into their current focus; their other work, including the self-healing v0.1 handover and S-E's task sets for the TL Index, slips past week 8. The thinking partner recommended 12 engineer-weeks in weeks 8 to 13 so the variant comparisons land after the TL Index's week-10 gate; Jithin chose the full quarter. The circuit breaker is 26 engineer-weeks, never extended | Jithin | accepted |
| D-162 | 2026-11-07 | Moved to Stress test to prepare the critique: a red-team pass (feasibility and Risk seats, the Risk seat simulated) run by a separate agent that has not seen the work, with a proposed score of 3.00 under the 3.5 bar; Jithin plays the business-line seat in the Stress test session. critiqueRecorded stays unset until that session | Thinking partner, on Jithin's instruction | accepted |
| D-170 | 2026-11-07 | Stress test critique recorded: Jithin played the business-line seat on the red-team pack. (1) Lab version split from company version: the lab reads H2, H3 and H4 on declared public or synthetic proxies, H7 narrowed to the serving configuration on one Core version; H1, H5, H6, H8 and H7's Core-version half move to the company version. (2) S-E stays on the TL Index task sets until TL-004's week-4 gate. (3) Two weekly review slots for TL-012, Tuesday and Friday, 30 minutes each (D-152). (4) Wave-1 order: marketing pre-review first, task mining as a two-week spike, the after-call agent on variant A only until TL-008 is shaped. (5) The cluster-H rule stands for what TL-012 builds; whether the knowledge agent stays the library's first entry is TL-003's call. (6) Kill criteria I-1 to I-6 and the per-purpose thresholds accepted as written | Jithin | accepted |
| D-171 | 2026-11-07 | Appetite reduced to 12 engineer-weeks: weeks 8 to 13 of the quarter (2026-12-28 to 2027-02-05) on S-D and S-E, so the variant comparisons land after the TL Index's week-10 gate and nothing TL-004 needs is absorbed. Supersedes D-161 (26 engineer-weeks over the full quarter). Review budget: two 30-minute slots a week over six weeks, about 6 review hours. The circuit breaker is 12 engineer-weeks, never extended | Jithin | accepted |
| D-172 | 2026-11-07 | Score set at 3.15 on the quarter weights, under the 3.5 bar: the red team's 3.00 with feasibility raised from 2 to 3 for the protected S-E, the later and smaller appetite and the ordered wave 1. Evidence of need stays 2 because every business owner is still Jithin. Funded by default; the score is the case for the smaller bet, which D-171 takes | Jithin | accepted |
| D-173 | 2026-11-07 | Kill-criteria read dates re-timed to the new appetite (thresholds unchanged), proposed by the thinking partner: I-1 end of week 8 (2027-01-01); I-2 TL-004's week-4 gate (2026-12-04) read as a start condition, missed means wave 1 starts with pre-review only; pre-review labelled set ready end of week 8, read week 11; task-mining spike read end of week 9; after-call (c) TL-008 shaped by week 8, (a) and (b) read week 12; I-3 judge agreement week 10; I-5 H3 deltas week 12; I-6 burn read week 11; I-4 rolling from week 8. Quick call on the dashboard (TL-012-q3) | Thinking partner, pending Jithin | proposed |
| D-174 | 2026-11-07 | Re-time the kill-criteria read dates to the 12-week appetite in weeks 8 to 13 (thresholds unchanged): Accept the proposed read dates (decided on the dashboard 2026-11-07). D-173 accepted; killCriteria now carry only the re-timed dates | Jithin (dashboard) | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._

### 2026-11-07 · Spec (Building-gate inputs) and Stress test preparation

- The Head of ThinkLatent accepted D-051 (D-159) and set the wave-1 owner roles (D-160). Task mining: Head of Applied Research (Jithin) for the business, Applied Research engineer (Claude) for the build. After-call agent: Head of AI Products (Jithin) for the business, chosen over the flagship's servicing owner; harness and platform lead (Claude) for the build. Pre-review: Head of Applied Research as interim owner (Jithin) for the business, chosen over the Enterprise's compliance review lead; Applied Research engineer (Claude) for the build.
- Appetite (D-161): 26 engineer-weeks, a full quarter on S-D and S-E, absorbed into their current focus. The thinking partner recommended 12 engineer-weeks in weeks 8 to 13 and recorded the trade-off: S-D's platform fixes and the self-healing v0.1 handover, and S-E's contribution flow and the TL Index's task sets, slip past week 8.
- Moved to Stress test (D-162). The Stress test pack is a third tab on the Idea card. A red-team pass (feasibility seat, plus the Risk seat, simulated) was run by a separate agent that had not seen the work. An autonomy-tier column was added to the 40-agents tab. The critique is not recorded until the Head of ThinkLatent plays the business-line seat.
- Honest flags for the Stress test:
  - With ThinkLatent owners on both business purposes, H5 (adoption by business teams) and H6 (human time saved) have no business user or queue to be measured against in the lab version.
  - The full-quarter appetite starts variant comparisons before the TL Index exists, so early results are provisional.

### 2026-11-07 · Critic (Stress test)

- The Head of ThinkLatent played the business-line seat on the red-team pack, and the critique is recorded (D-170). His answers: the lab and company versions are split (the lab reads H2, H3, H4 on proxies and H7 narrowed to the serving configuration); S-E is protected until TL-004's week-4 gate; two review slots a week (Tuesday and Friday, 30 minutes); pre-review goes first, then a two-week task-mining spike, then the after-call agent on variant A until TL-008 is shaped; the cluster-H rule stands, and the library's first entry is TL-003's call; the kill criteria are accepted as written.
- The appetite is cut to 12 engineer-weeks in weeks 8 to 13 (2026-12-28 to 2027-02-05), superseding D-161 (D-171). The score is set at 3.15, under the 3.5 bar, with feasibility raised to 3 (D-172).
- Thinking-partner flag: the accepted kill criteria were timed for a week-1 start, and most of their read dates now fall before the appetite. Re-timed dates are proposed (D-173) as quick call TL-012-q3.
- Honest view: six build weeks for three purposes with variants is tight. If I-2 trips, wave 1 is pre-review alone, and that is the likeliest outcome worth planning for. Evidence of need cannot rise above 2 in the lab.
