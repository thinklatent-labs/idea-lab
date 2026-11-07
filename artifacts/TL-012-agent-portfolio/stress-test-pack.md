<!-- Exported from https://claude.ai/artifact/T5rhguUBWXiUtPamFxxELT (Stress test pack tab, rev 10) on 2026-11-07. Read-only mirror; edit the live doc, not this file. -->
# Stress test pack

Prepared 2026-11-07 for the TL-012 Stress test (Critic). Seats: business-line partner, the Head of ThinkLatent (Jithin); feasibility and Risk (simulated), Claude as a separate agent that has not seen the work. The critique is recorded only when the Head of ThinkLatent has played his seat.

## The calls going in

The Head of ThinkLatent made these on 2026-11-07 (D-159 to D-162). The red team critiques them as given. Under the lab's roles rule, each owner reads as the role, then who plays it.

| Purpose | Autonomy tier | Business owner | Build owner | Against the thinking partner's recommendation |
| --- | --- | --- | --- | --- |
| #28 Task mining | Observe | Head of Applied Research (Jithin) | Applied Research engineer (Claude) | As recommended. The card's owner (Head of ThinkLatent) is replaced because the Building gate rules it out |
| #2 After-call agent | Act with approval | Head of AI Products (Jithin) | Harness and platform lead (Claude) | Recommended: the flagship's servicing owner. Chosen: a ThinkLatent owner, so H5 and H6 have no business user behind them |
| #10 Marketing pre-review | Advise | Head of Applied Research, interim (Jithin) | Applied Research engineer (Claude) | Recommended: the Enterprise's compliance review lead. Chosen: an interim ThinkLatent owner, so there is no reviewer queue to measure H6 against |

- **Appetite.** 26 engineer-weeks over a full quarter (weeks 1 to 13) on S-D and S-E, absorbed into their current focus. That is the circuit breaker, and it is never extended. The thinking partner recommended 12 engineer-weeks in weeks 8 to 13, so the comparisons would land after the TL Index's week-10 gate.
- **What gives way.** S-D's platform fixes and the self-healing v0.1 handover, and S-E's contribution flow and the TL Index's task sets. All of these slip past week 8.
- **D-051 accepted.** The loop, the A/B/C variant set, wave 1, and the library inside TL-012.
- **Not yet in place for Building.** A weekly review slot from the Head of ThinkLatent (D-152). The governance question is still open; it is simulated in the lab and doesn't block a stage.

## Red-team pass

A separate agent that had not seen the work read the card, the 40-agents tab, the scout brief and the register. It played the feasibility seat and the Risk seat. The Risk seat is simulated: it is evidence for shaping, not sign-off. Its verdict is that wave 1 as set is likely to produce provisional numbers on proxy data, and that it weakens the TL Index it depends on.

### Pre-mortem: week 13, wave 1 failed

| # | Most likely reason | Likelihood | First shows |
| --- | --- | --- | --- |
| 1 | No real data and no real users. The lab can't hold production prompts, call audio, CRM state or review outcomes, so every purpose runs on public or synthetic proxies that don't transfer | High | Weeks 1–2 |
| 2 | Dependencies don't arrive. The TL Index gate is due 2026-11-15; the Judge family hasn't started; the harness (TL-008) and the telemetry store (TL-009) are Seeds with no date | High | Week 4 |
| 3 | It starves its own dependencies. S-E builds the TL Index's task sets, the contribution flow and the sandboxed replicas, which are three things TL-012 reuses | High | Week 4 |
| 4 | The Head of ThinkLatent's review slots saturate across TL-003, TL-007, TL-004 and three wave-1 purposes | High | Week 3 |
| 5 | The variant matrix explodes: 3 purposes × 2–3 variants × 3 levels × seeds, plus a frontier baseline, plus H7's 2×2 | Medium | Week 6 |
| 6 | Deltas fall inside judge noise, so H3 is inconclusive | Medium | Weeks 9–10 |
| 7 | The evidence is self-certified: one person is every owner, grader and chooser | Medium | Week 13 |

### Feasibility seat

- **26 engineer-weeks is two streams at 100% for 13 weeks.** S-D's 20% slack is gone. In the lab the engineer is Claude, so engineer-weeks don't bind; the Head of ThinkLatent's review time does (D-152). The appetite should also be stated in review hours per week, or the circuit breaker guards the wrong resource.
- **The absorbed streams cost the idea its own inputs.** S-E's task sets gate TL-004 at week 4. S-D's self-healing v0.1 handover is the trained-variant path.
- **What can be read in the lab:**

| Hypothesis | Readable in the lab? | Honest proxy |
| --- | --- | --- |
| H2 (Judge is the shared dependency) | Yes, but near-circular | A count over the brainstorm's own recipes |
| H3 (variants differ) | Partly | Variant spread on public or synthetic tasks, paired tests, 3+ seeds; transfer to Enterprise tasks is untested |
| H4 (Core matches frontier at ≤ half cost) | Partly | Same frontier-panel judge for both arms plus a small audit graded by the Head of ThinkLatent (one grader, disclosed); provisional |
| H7 (harness beats model version) | Not as written | Serving-configuration delta on one Core version, under a narrower name |
| H1, H5, H6, H8 | No | None in the lab; they move to the company version |

### Risk seat (simulated)

- **Task mining: tier observe, but high data-access exposure.** It reads every raw prompt. The threshold value and the PII filter's recall aren't recorded, and small clusters can leak details through their labels. The lab's `sensitivity: none` holds only because the lab can't run it; the company version must be re-flagged.
- **After-call: tier act with approval.** Propose-only is safe only if the harness holds no CRM write credential. Approval fatigue turns approve into autopilot, so measure the approved-with-error rate, not just minutes saved. The transcript is untrusted input, so protected fields (address, beneficiary) are excluded from proposals. The new outputs don't ride on the summarizer's old approval.
- **Pre-review: tier advise.** The suggested rewrite is model-authored client copy that may be adopted verbatim, so log the rewrites accepted unchanged.
- **Is a second variant a new use case?** Simulated answer: yes, whenever the variant's identity changes its behavior. Offline comparison isn't a governance event; publishing a variant is, and switching a team's variant is a material change. Every retrained adapter is a fresh evaluation, so the learn step's cost scales with retraining.
- **SR 26-2.** Don't rely on it as a permission. Adapters and the house judge are models in the ordinary sense, and the judge chooses what is published, so it needs validation.

### Strongest case against

This spends a quarter of two streams comparing builds on instruments that don't exist yet, on data the lab can't touch, for users who are all one person. It takes capacity from the streams that feed the TL Index. Five of eight hypotheses can't be read in the lab, and the rest are read on proxies the scout brief says don't transfer. TL-003 has also decided the library's first agent is the knowledge agent, which is cluster H: the card says not to build that without a data-residency reason. The portfolio and the portal disagree on what ships first.

### Strongest case for

The lab's diagnosis is that the constraint is evidence for adoption and governance throughput, and this is the only idea that turns "which build should we trust" into a measured answer. It targets the three gaps the scout brief found nobody has closed. It is cheap to stop: H3 carries a kill condition, every write is a proposal, and lab build time is Claude's. Even a proxy-only wave 1 leaves the admission record, the comparison card, the flag-explain-rewrite pattern and a variant-run protocol for TL-003, TL-004 and TL-008 to use.

## Kill criteria (proposed)

The red team proposes these for the Head of ThinkLatent to accept or change at the Stress test. Weeks count from the start of the appetite: if week 1 starts 2026-11-09, week 4 ends 2026-12-04 and week 13 ends 2027-02-05.

**Idea level**

| # | What is read | When | Kill or park if |
| --- | --- | --- | --- |
| I-1 | A declared dataset for each purpose (public or synthetic, provenance written), with what it can and can't prove | End of week 1 | Fewer than 2 of 3 purposes have one: park the purposes without one |
| I-2 | S-B's week-4 gate for the TL Index, which entered Building on 2026-11-07 (S-E's first task set delivered) | Week 4 | The gate is missed, or the task set is missing because of TL-012: release S-E and cut wave 1 to one purpose |
| I-3 | Judge stand-in agreement with a human-graded audit of 100 or more items per purpose | Week 5 | Agreement below 0.6: H3 and H4 become descriptive only and drive no publish decision |
| I-4 | Weekly review slots for TL-012 kept by the Head of ThinkLatent | Rolling | 2 slots missed in a row: TL-012 leaves Building (D-152) |
| I-5 | H3: paired variant deltas with 95% intervals | Week 11 | All three purposes within 3 points and 1.5× cost, or intervals wider than ±5 points: stop building variants and ship variant A only |
| I-6 | Engineer-weeks and review hours burned against plan | Week 7 | More than 60% of either burned, with no purpose past its first comparison: park at the circuit breaker, never extend |

**Per wave-1 purpose**

| Purpose | What is read | When | Kill or park if |
| --- | --- | --- | --- |
| Task mining | Cluster stability across two seeds; clusters above the privacy threshold (value set in week 1) that map to a named Domain candidate | End of week 2 | Stability below 0.7 adjusted Rand, or fewer than 3 mappable clusters: kill the spike and read H1 from the admission ledger |
| After-call | (a) proposals touching protected fields on an injection test set; (b) variant A field accuracy against the frontier baseline; (c) TL-008 shaped | (a) and (b) week 6; (c) week 4 | (a) any such proposal: stop the purpose. (b) more than 5 points behind after the optimised level: park. (c) not shaped: drop variant B |
| Pre-review | Recall and precision on a frozen labelled set of 200 or more known violations | Set ready by week 3; read at week 8 | No set by week 3: park. Recall below 0.95 or precision below 0.5: withdraw |

## Proposed score: 3.00, under the 3.5 bar

This is scored on the quarter weights for the idea as it would run this quarter. TL-004, which it depends on, scored 3.95.

| Criterion | Weight | Score | Reason |
| --- | --- | --- | --- |
| Strategic fit | 0.20 | 4 | Servicing and compliance pre-review are named in where-to-play. Docked for the breadth of 40 agents and for the conflict with TL-003's knowledge-agent-first decision |
| Evidence of need | 0.15 | 2 | One purpose has observed pain; every wave-1 owner is played by the same person |
| Differentiation | 0.15 | 3 | The moat is Enterprise data plus an adoption record. The lab version has neither, so it differentiates on method only |
| Feasibility | 0.15 | 2 | Four Seed or Proposed dependencies; the absorbed streams feed its own dependencies; review slots are already loaded |
| Value at stake | 0.15 | 3 | High if it justifies the Domain tier, but volumes and minutes are unmeasured |
| Governance exposure (higher means less) | 0.10 | 3 | The propose-only and advise tiers help. A CRM write path, client prompts and generated client copy remain |
| Reversibility | 0.05 | 4 | It can be stopped at any gate |
| Compounding | 0.05 | 4 | It creates six reusable capabilities |

If the changes below land, feasibility and evidence of need each rise to 3, which gives 3.30: still under the bar. Clearing 3.5 needs real data or a real business owner, and only the company version can supply those. Under the funded-by-default rule a score below the bar doesn't stop the idea; it is the case for a smaller bet or for parking it.

## The business-line seat

The Head of ThinkLatent answers these at the Stress test, and his answers are what record the critique.

1. **Lab version or company version.** Do you accept that H1, H5, H6, H8 and H7's Core-version half can't be read in the lab, and move them to the company version, with each purpose declaring its dataset and what it can prove?
2. **Protecting S-E.** Should S-E stay on its focus until TL-004 passes its week-4 gate, even though the appetite stays at 26 engineer-weeks? That turns the quarter into about 22 engineer-weeks of real build time.
3. **Review slots.** How many weekly review slots will you commit to TL-012, given TL-003 and TL-007? The red team asks for the appetite to be stated in review hours as well.
4. **The order of wave 1.** Should pre-review go first (it is bounded, needs no harness, and is the same work as TL-011 Build 3), with task mining as a two-week spike and the after-call agent on variant A only until TL-008 is shaped?
5. **What ships first.** TL-003 put the knowledge agent first in the library, which is cluster H. Does the cluster-H rule bend, or does the library's first entry change?
6. **Kill criteria.** Do you accept the thresholds above, or change them?

### What must change before Proposal

1. Split the lab version from the company version, and narrow H7 to the serving configuration.
2. Don't absorb S-E before week 4. State the appetite in review hours too.
3. Cut wave 1 to what the dependencies allow, and cap each purpose at two variants × two levels.
4. Calibrate the judge stand-in (one frontier-panel judge from a different model line, with a human audit and a published agreement figure) before any comparison counts.
5. Harden the after-call design: no CRM write credential in v1, protected fields excluded from proposals, an injection test set, and an approved-with-error measure.
6. Reconcile the record. Put the kill criteria into the Idea card and record the loop's governance cost under both answers to the variant question. Settle the TL-003 knowledge-agent conflict and TL-010's retirement in favour of the library in their own chats.
