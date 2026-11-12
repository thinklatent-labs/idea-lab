# ThinkLatent Portal (portal): self-healing and training requirement, v1.0, 2026-11-12

Lab session · TL-003 portal · Spec. Jithin set what the project's "Self-healing and training" page shows (D-271, D-272). This document says what the ThinkLatent AI engineering team's backend must expose so that page, and its roll-ups on the team, organization and Home pages, can be drawn from real data. It is written the way the trace and session requirement was: everything the page shows must come from a field here.

It also draws a boundary. The page shows where today's model falls short and what is being done about it. It never shows the data.

Status words used in the tables:

- **The lead states it**: typed or said by the project's owner, in the portal.
- **Self-healing writes it**: produced by the self-healing system and stored in the backend.
- **The project team does it**: an action by a member of the project, in the portal.
- **Portal works it out**: derived when read; never sent by anyone.
- **To check**: to be confirmed by AI engineering against what the self-healing system does today.

## 1. Decisions this rests on (12 Nov)

1. **No training data is shown, ever.** Not the training set, not ThinkLatent's foundation data, not what self-healing builds. No call from the portal returns their rows.
2. **What self-healing builds stays in the backend.** It is not displayed, exported or copied to another project. Jithin: it is a unique feature and must not go out.
3. **The page shows the self-healing loop instead.** The lead says what the feature needs in plain words; the system says back what it thinks the model is being asked for; it shows how today's production model does against each; it finds the gaps and builds what is missing from requests and answers; at some point it says there is enough to train a model of the project's own without losing what works; a member starts the run; the candidate is checked three ways.
4. **One list of requirements per feature**, shared with the feature's quality expectations. A requirement stated here is a measure on the feature's page and, where the team sets one up, on its evaluation set.
5. **The scale** is the share of production requests that meet a requirement.
6. **The lead validates every gap.** Self-healing proposes a gap with a few of the project's own production examples; nothing is built for it until the lead confirms. Their buy-in is the point.
7. **A gap the lead rejects is dropped**, and the reason goes back to tune how self-healing reads that requirement.
8. **Self-healing's scoring is checked against hand scores**: about 50 answers per requirement, scored once by the project team. A gap can lead to training only after that.
9. **Self-healing itself judges when there is enough to train**, case by case. Not a fixed count, not a rule set by people. The page shows the judgement, what it rests on and how sure it is.
10. **Counts and readiness may be shown** for the hidden data: how many examples are built, how many held back, the pace.
11. **The candidate is checked three ways** before it is offered: the self-healing benchmark, the TL Index, and the feature's own evaluation set. Passing, it becomes an increment and a change request goes to AI engineering, outside the portal.
12. **Self-healing scores every production request**, harness or not, against the lead's requirements (as Jithin described the backend). The page therefore says "every request", not "a sample".

## 2. The shape

```
Feature
  Requirement          the lead's words, stated once
    Reading            what self-healing thinks is being asked: one or more measures
      Measure          one thing that can be scored, with the level the lead expects
        Production score    share of requests that meet it, day by day
        Hand-score check    the project team's 50, and how often self-healing agrees
        Gap                 where today's model falls short of the expected level
          Example           a production turn of this project that shows it (a pointer to its trace)
          Build             what self-healing has built for the gap: counts only
  Readiness            self-healing's judgement that there is enough to train
  Run                  one training run, started by a member
    Candidate          the model the run produced
      Check            the self-healing benchmark, the TL Index, the feature's evaluation set
```

## 3. Fields

Content = text a person wrote or text taken from a request or an answer; it follows the seal on Traces.

### 3.1 Requirement

| Field | Type | Where it comes from | Content |
|---|---|---|---|
| `sh.requirement.id`, `tl.feature.id`, `tl.project.id` | string | Portal | No |
| `sh.requirement.text` | text | The lead states it, to Jarvis or on the page | Yes |
| `sh.requirement.stated_by`, `sh.requirement.stated_at` | string, timestamp | Portal | No |
| `sh.requirement.status` (stated, read back, confirmed, changed, withdrawn) | enum | Portal works it out | No |
| `sh.requirement.version` | int | Portal; a change makes a new version and keeps the old | No |

### 3.2 Reading (what self-healing thinks is being asked)

| Field | Type | Where it comes from | Content |
|---|---|---|---|
| `sh.reading.id`, `sh.requirement.id` | string | Self-healing writes it | No |
| `sh.reading.items[]` (a category such as decide, hold back, write, extract, stay on the source; one plain sentence; the measure proposed for it) | list | Self-healing writes it | Sentence yes |
| `sh.reading.proposed_expected[]` (the level it would propose for each measure, from traffic so far) | list | Self-healing writes it | No |
| `sh.reading.basis` (what it rests on: the lead's text, how many requests) and `sh.reading.confidence` | text, number | Self-healing writes it | No |
| `sh.reading.agent`, `sh.reading.agent_version` | string | Self-healing writes it | No |
| `sh.reading.decided_by`, `sh.reading.decided_at`, `sh.reading.verdict` (confirmed, changed) | mixed | The lead does it | No |
| `sh.reading.changes[]` (what the lead changed, in their words) | list | The lead states it; it is fed back to self-healing | Yes |

### 3.3 Measure

| Field | Type | Where it comes from |
|---|---|---|
| `sh.measure.id`, `sh.measure.name` | string | Self-healing proposes, the lead confirms |
| `sh.measure.kind` (judged, counted, matched) | enum | Self-healing writes it. A counted measure (length) needs no hand-score check |
| `sh.measure.expected`, `sh.measure.expected_set_by`, `sh.measure.expected_set_at` | share, string, timestamp | The lead states it |
| `sh.measure.score_name` (the `score.name` it writes on each trace, so a trace and this page agree) | string | Self-healing writes it |
| `sh.measure.evaluation_ref` (the same measure on the feature's evaluation set, when the team has set one up) | ref | Portal |
| `sh.measure.index_related` (a TL Index pillar it bears on, and any accepted deviation there) | ref | Portal works it out |

### 3.4 Production score

Per request, the score is a row in the trace store (the trace requirement, 3.11): `score.name` is the measure, `score.source` is evaluator, `score.evaluator_id` is the self-healing scorer and its version. The page reads the roll-up.

| Field | Type | Where it comes from |
|---|---|---|
| `sh.prod.window`, `sh.prod.requests_scored` | period, int | Self-healing writes it |
| `sh.prod.met_share` | share | Portal works it out from the scores |
| `sh.prod.day_spread` (how far the share moved from day to day in the window) | share | Portal works it out. Every request is scored, so there is no sampling interval to show |
| `sh.prod.by_day[]` | list | Portal works it out |
| `sh.prod.by_segment[]` (size bucket, topic, what the request was about) | list | Portal works it out from the trace fields |
| `sh.prod.met` (at or above the expected level) | bool | Portal works it out |

### 3.5 Hand-score check

| Field | Type | Where it comes from | Content |
|---|---|---|---|
| `sh.handcheck.id`, `sh.measure.id` | string | Portal | No |
| `sh.handcheck.items[]` (pointers to the project's own production turns picked for scoring) | list of trace ids | Self-healing picks them; to check how | No |
| `sh.handcheck.scored_by`, `sh.handcheck.scored_at`, `sh.handcheck.size` | mixed | The project team does it, once per measure | No |
| `sh.handcheck.agreement` (how many of the hand scores self-healing's score matches) | n of N | Portal works it out | No |
| `sh.handcheck.passes` and `sh.handcheck.level` (the agreement at which the scoring counts) | bool, share | The level is not set yet: see section 7 | No |
| `sh.handcheck.disagreements[]` (the turns where the two differ, for the lead to look at) | list of trace ids | Portal works it out; they are fed back to self-healing | No |

### 3.6 Gap

| Field | Type | Where it comes from | Content |
|---|---|---|---|
| `sh.gap.id`, `sh.measure.id` | string | Self-healing writes it | No |
| `sh.gap.title` (one plain sentence) | text | Self-healing writes it | No |
| `sh.gap.found_at`, `sh.gap.miss_share`, `sh.gap.day_spread` | timestamp, share | Self-healing writes it | No |
| `sh.gap.breakdown[]` (the kinds of miss, each with its share) | list | Self-healing writes it | No |
| `sh.gap.supporting_feedback` (thumbs down that gave a matching reason, edits that put the missing thing back: counts) | counts | Portal works it out from the trace fields | No |
| `sh.gap.related[]` (an accepted deviation, a TL Index pillar, another gap) | refs | Portal works it out | No |
| `sh.gap.basis`, `sh.gap.confidence`, `sh.gap.agent_version` | text, number, string | Self-healing writes it | No |
| `sh.gap.status` (proposed, confirmed, rejected, enough built, closed by an increment, reopened) | enum | Portal works it out | No |
| `sh.gap.decided_by`, `sh.gap.decided_at` | string, timestamp | The lead does it | No |
| `sh.gap.reject_reason` | text | The lead states it; it is fed back to self-healing | Yes |

### 3.7 Example (to confirm a gap)

| Field | Type | Where it comes from | Content |
|---|---|---|---|
| `sh.example.trace_id`, `sh.example.turn`, `sh.example.at` | string, int, timestamp | Self-healing picks it from this project's own production | No |
| `sh.example.asked` and `sh.example.got` (one line each: what the requirement called for in this turn, what the answer did) | text | Self-healing writes it from the trace | Yes |
| `sh.example.shown_count`, `sh.example.more_available` | int | Portal | No |

An example is always one of the project's own production turns and opens in Traces. It is never a row self-healing built.

### 3.8 Build (the hidden data, as counts)

| Field | Type | Where it comes from |
|---|---|---|
| `sh.build.gap_id`, `sh.build.started_at`, `sh.build.last_built_at` | string, timestamp | Self-healing writes it |
| `sh.build.count`, `sh.build.per_day` | int, number | Self-healing writes it |
| `sh.build.benchmark_count` (held back, never trained on) | int | Self-healing writes it |
| `sh.build.source_mix` (shares by where it came from: production requests and answers, what users kept after editing, generated) | shares | To check whether this may be shown |

Nothing else about the build leaves the backend: no row, no row id, no sample, no download.

### 3.9 Readiness (the system's own judgement)

| Field | Type | Where it comes from |
|---|---|---|
| `sh.ready.state` (not yet, nearly, enough) | enum | Self-healing writes it |
| `sh.ready.judged_at`, `sh.ready.covers_gaps[]` | timestamp, list | Self-healing writes it |
| `sh.ready.expected_lift` (the measure, from what, to about what) | record | Self-healing writes it |
| `sh.ready.holds[]` (the measures and thresholds it expects a run to hold) | list | Self-healing writes it |
| `sh.ready.basis`, `sh.ready.confidence` | text, number | Self-healing writes it |
| `sh.ready.estimate_when` (for "not yet" and "nearly": about when, at the present pace) | date | Self-healing writes it; to check |
| `sh.ready.outcome` (after a run: was the judgement right) | enum | Portal works it out from the checks; kept so the judgement can be judged |

### 3.10 Run

| Field | Type | Where it comes from |
|---|---|---|
| `sh.run.id`, `sh.run.started_by`, `sh.run.started_at` | string, timestamp | The project team does it |
| `sh.run.base_model`, `sh.run.base_increment`, `sh.run.covers_gaps[]` | refs | Portal |
| `sh.run.status` (queued, running, checking, offered, not offered, failed, cancelled) | enum | The training job reports it |
| `sh.run.machines`, `sh.run.queue_position`, `sh.run.eta`, `sh.run.duration` | mixed | The training job (Slurm on HyperPod) reports it |
| `sh.run.cost` | money | Portal works it out; shown as spend, there are no budgets |
| `sh.run.job_ref`, `sh.run.recipe_ref` (the commit of the TLM package it ran) | string | The training job reports it |
| `sh.run.weights_ref` (the same reference a trace carries as `tl.weights.ref`) | string | The training job reports it |
| `sh.run.notified[]` (the project's members, the ThinkLatent leads) | list | Portal |
| Loss, validation loss, step, tokens a second | series | The training job reports them; for the run's own page, not drawn yet |

### 3.11 Candidate and its three checks

| Field | Type | Where it comes from |
|---|---|---|
| `sh.candidate.id`, `sh.run.id`, `sh.candidate.weights_ref` | string | The training job reports it |
| `sh.check.kind` (self-healing benchmark, TL Index, the feature's evaluation set) | enum | Portal |
| `sh.check.lines[]`: the measure or pillar, today's model, the candidate, the rule (must reach, must not drop, threshold), the verdict | list | Self-healing for the benchmark; the TL Index runner; the evaluation runner |
| `sh.check.edition` (TL Index edition; evaluation set version; benchmark version) | string | Each runner |
| `sh.check.not_run_reason` (for example: the measure is not set up on the evaluation set) | text | Portal works it out |
| `sh.check.verdict` and `sh.candidate.verdict` (offered, not offered, and which check failed) | enum | Portal works it out |
| `sh.candidate.increment_id`, `sh.candidate.change_request_ref` | refs | Portal, once offered; the request is approved outside |

## 4. What never leaves the backend

- Rows of the training set, for any model.
- ThinkLatent's foundation data.
- Rows self-healing builds, the held-back benchmark's rows, and any identifier of a row.
- Any export or copy of the above, to a file or to another project.

What the page may show: the lead's own words; self-healing's reading of them; scores and shares; kinds of miss with their shares; counts; the system's judgement with its basis and how sure it is; and a few of the project's own production turns, which are already in Traces and follow its seal.

## 5. Every number on the page, from these fields

| The page shows | Worked out as |
|---|---|
| Where each feature is in the loop | The furthest step with a record: requirement, confirmed reading, production score, gap, readiness, run |
| "5 requirements · 3 met in production" | Count of measures; those with `sh.prod.met` |
| "We think you are asking for four things" | `sh.reading.items[]` with `sh.reading.proposed_expected[]` |
| Today, in production: 74% ± 3 | `sh.prod.met_share` and `sh.prod.day_spread`; the mark is `sh.measure.expected` |
| Agrees with your hand scores, 47 of 50 | `sh.handcheck.agreement` |
| On your evaluation set | The score on `sh.measure.evaluation_ref`, or why there is none |
| Gap, confirmed · gap, waits for you | `sh.gap.status` with who decided and when |
| "A rounded amount 52%…" | `sh.gap.breakdown[]` |
| "58 of 147 thumbs down gave 'missed an action'" | `sh.gap.supporting_feedback`, from the feedback fields of the trace requirement |
| The three examples | `sh.example.*`, each opening its trace |
| 3,050 examples built, about 220 a day, 300 held back | `sh.build.count`, `sh.build.per_day`, `sh.build.benchmark_count` |
| "There is enough to train" with what it expects and how sure | `sh.ready.*` |
| The least needed before you start | Gap confirmed; `sh.ready.state`; `sh.handcheck.passes`; benchmark held back; machines free (`sh.run.queue_position` for a new run); the evaluation set's state |
| The three checks | `sh.check.*`, today's model as the baseline |
| Runs so far | `sh.run.*` with what each became |

## 6. Roll-ups

- **Team and organization pages:** the features with real traffic, each with its step in the loop and what waits on whom.
- **Home, "Improved from feedback":** increments in the period whose candidate came from a self-healing run (`sh.candidate.increment_id`).
- **A model's page:** the projects where a version of it is being strengthened, and the gaps most often found across them, as kinds only.

## 7. Thin spots and open questions

- Jithin said the self-healing data "is not completely there" yet. This page is ahead of the system. Which of sections 3.2 to 3.9 exist today is for AI engineering to say.
- "Enough" is the system's own call and the lead cannot verify it. A wrong call wastes a run; the three checks are the only net. `sh.ready.outcome` is asked for so that, over time, how often the call was right is known.
- The agreement at which a hand-score check passes is not set. 47 of 50 is drawn as passing; whether 40 of 50 would is undecided.
- Scoring every request with a judge is costly at 26k requests a day for one feature. If the system in fact samples, decision 12 and the page's wording are wrong and an interval must come back.
- An example is content. With the seal on, the lead cannot read it, and so cannot confirm a gap. Either the lead is always allowed their own project's examples, or gaps wait. Not decided.
- The feature's evaluation set must never be built from or trained on. Nothing here says who enforces that.
- The measures drawn are for a language feature. Speech (word error rate) and decision features need their own readings; not drawn.
- Whether the mix of sources behind the build may be shown.

## Sources

Jithin's answers of 12 Nov 2026 (D-271, D-272) and his earlier description of the serving backend and the self-healing system; the board "Self-healing and training in a project" on the design canvas; the trace and session requirement v1.3 for the fields it reuses.
