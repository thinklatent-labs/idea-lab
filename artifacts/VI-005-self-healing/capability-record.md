<!-- Exported from https://claude.ai/artifact/9wU5GVJYZW5CoBik1xU5Gz (rev 7) on 2026-11-04. Read-only mirror; edit the live doc, not this file. -->
# Self-healing model system (self-healing) — Capability record

Nov 1, 2026 · @Jithin Pradeep

The self-healing system is built and in use by the VI team; this record writes down its contract with VAI so the reuse can be counted. Engineering document: techniques are named here on purpose.

**Lab record** (Idea Lab standard v1)

| Field | Value |
| --- | --- |
| ID and slug | VI-005 · self-healing |
| Type | Capability (process) |
| Theme served | T-001 Sovereign AI |
| Stage | Graduated (built by the VI team); interface v0.1 drafted 2026-11-01, pending VI team review |
| Owner | VI team; interface owner to be named |
| Reused by | VI-004 vai (heal loop); SLM builds; VI-003 vi-portal (Build an SLM surface) |
| Links | VI-004 vai depends-on this · VI-003 vi-portal reuses this |
| Sensitivity | Internal engineering; no client data in this doc |
| Standard and last reviewed | v1 · 2026-11-01 |
| Register | [Idea Register](https://claude.ai/artifact/6WzPg7fvvAf2tn8Z9X2Q2h) |

## Gap-report interface

VAI sends a gap report; the self-healing system answers with a heal return. Those two versioned records are the whole contract: neither side calls into the other's internals.

&#91;embedded content: heal loop · 2 records, 6 steps\]

The loop runs per checkpoint in VAI's sequential mode. VAI owns the scoring and the report; the VI team owns the heal and the return. Either side can change its internals freely as long as both records keep their schema version.

## Gap report schema (VAI to self-healing), v0.1

A gap report describes **what a model fails at, never which test items it failed**. It carries skills, pillars, error classes and distributions, so the heal system can target data without ever seeing evaluation content.

| Field | Type | Meaning | Rule |
| --- | --- | --- | --- |
| `schema_version` | string | Interface version, `0.1` | Both sides reject an unknown major version |
| `report_id` | id | Unique per report | Cited by the heal return |
| `model_ref` | id | Model, build or checkpoint id, serving setting | Same id the VAI register uses |
| `run_manifest_id` | id | VAI run that produced the scores | Lets anyone reproduce the report from the register |
| `application` | string | The SLM or workflow the gaps are judged against | Gaps are always relative to an application's bars |
| `gaps[]` | list | One entry per pillar or skill below its bar | Ranked by priority |
| `gaps[].pillar` | id | VAI pillar, e.g. `7 entity recognition` | Must exist in the pillar registry |
| `gaps[].skill` | string | Skill from the skill-tandem taxonomy, e.g. `CUSIP disambiguation` | Taxonomy term, not free text |
| `gaps[].score`, `gaps[].bar`, `gaps[].ci` | number | Current score, production bar, confidence interval | Copied from the register |
| `gaps[].error_classes[]` | list | Named failure modes with share of failures, e.g. `ticker read as common word: 0.4` | Classes, not examples |
| `gaps[].slice` | map | Where failures concentrate: token-shape cell, document type, language, context fill | Distributions only |
| `gaps[].domain_hint` | string | Plain description of the data that would help | Written by VAI; reviewed so it paraphrases no test item |
| `gaps[].priority` | enum | `blocking` (safety, compliance, client care), `bar`, `stretch` | Blocking gaps are healed or the model is not released |
| `regressions[]` | list | Pillars that dropped versus the previous checkpoint or the foundation model | Same shape as `gaps[]` |
| `excluded` | list | What the report deliberately omits: item ids, inputs, outputs, rubrics | Fixed; the audit checks it |

No field may carry a task input, a model output on a task, a rubric, or text within an edit distance of either. VAI's report builder enforces this before sending.

## Heal return contract (self-healing to VAI), v0.1

The heal return tells VAI what was done about each gap, so the next score can be read against it and over-fitting can be caught.

| Field | Type | Meaning | Rule |
| --- | --- | --- | --- |
| `schema_version` | string | `0.1` | As for the gap report |
| `report_id` | id | The gap report answered | One return per report |
| `new_model_ref` | id | Checkpoint produced after healing | Must be registered before VAI scores it |
| `actions[]` | list | One entry per gap addressed | Gaps not addressed are listed with a reason |
| `actions[].gap_ref` | id | Pillar and skill of the gap | Matches the report |
| `actions[].data_source` | enum | `generated`, `located`, `mixed` |  |
| `actions[].volume` | number | Examples added to the training pool |  |
| `actions[].provenance` | id | Pointer to the batch manifest in the training pool | Used by the quarterly audit |
| `actions[].dedup_check` | record | Result of the near-duplicate check against the task library fingerprint | Required; a failed or missing check blocks scoring |
| `rescore_scope` | list | Pillars and use cases to re-score, always including safety and the application's other pillars | VAI may widen it, never narrow it |

**What VAI does with it.** Re-scores the new checkpoint on the full scope, including datasets of the same pillar that the gap report did not name. A gain on the named skill with no gain on sibling datasets, or a drop elsewhere, is flagged as likely over-fitting in the next gap report.

## The evaluation wall

The heal loop is the most likely path for a task set to leak into training, which is the failure the VAI pre-mortem fears most. The wall is enforced by both sides and checked by someone outside both.

1. **Access.** The task library is readable only by the VAI orchestrator. The self-healing system and training jobs hold no credentials for it.
2. **Content.** Gap reports carry classes and distributions, never items (schema above). VAI's report builder rejects any field that matches task content.
3. **Fingerprint check.** VAI publishes a fingerprint of the task library (hashes plus near-duplicate signatures, not the text). Every heal batch is checked against it before entering the pool; the result travels in `dedup_check`.
4. **Located data.** Data found in internal stores is checked the same way, because a task set built from real procedures may have a sibling in the same database.
5. **Audit.** Each quarter someone outside both programmes samples training batches against the task library. Any hit triggers the VAI kill criterion: both programmes freeze until the wall is rebuilt.
6. **Rotation.** Held-out slices rotate each quarter, so a slow leak loses value even before the audit finds it.

## Open questions

| Question | Owner | Blocking |
| --- | --- | --- |
| Does the self-healing system's current input match this schema, or does it need an adapter? | VI team interface owner | Yes, for VAI Phase 1 |
| Which skill taxonomy is canonical: VAI's skill-tandem terms or the healer's own gap labels? | Index lead with VI team | Yes |
| Who runs the quarterly wall audit, outside both programmes? | Head of VI | Yes, before the first heal batch |
| Fingerprint method and threshold for near-duplicates | Harness and platform lead | No, until Phase 1 |
| Is the `domain_hint` reviewed by a person or by a check, and by whom? | Index lead | No |

## Decision log

| Date | Decision | By |
| --- | --- | --- |
| 2026-11-01 | Capability record created; gap-report interface v0.1 drafted: two versioned records, item-free gap reports, fingerprint check, quarterly outside audit | Thinking partner, pending VI team review and Jithin |
