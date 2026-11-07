---
id: TL-008
slug: harness-served
title: "Harness-served models — every endpoint wrapped in a harness agent (Envoy → harness → vLLM): answer at once, work on the session in the background"
aliases: []
type: Idea
parent: null
themes: ["T-001"]
stage: "Seed"
stage_since: null
horizon: "H2"
stream: null
appetite_weeks: null
appetite_ends: null
owner: "Head of ThinkLatent (sponsor); harness and platform lead to be named"
score: null
score_status: none
doc_url: null
standard: null
last_touched: 2026-11-02
sensitivity: none
critique_recorded: null
next_step: "Book a Shaping session: what a session holds, Hermes plugins, shadow mode, the owner-set policy; the five changes captured in the ThinkLatent Portal card are its stress-test inputs. From TL-003 (2026-11-02): a pre-registered cache-reuse hypothesis with seven measures is in the card and scout-brief-serving-telemetry.md. Also from TL-003 (2026-11-02): Jithin's queued thought that harness-served endpoints are agents, now folded into TL-012 agent-portfolio (Seed); the Shaping session should decide what an agent is to the gateway. From TL-012 (2026-11-02): the after-call agent is the harness's first customer, propose-only; the scout brief's harness findings (own the loop; permission control plane, approval ledger and cache discipline first; a conformance suite per fine-tuned model) are in claude/scout-brief-agent-portfolio.md From TL-018 (2026-11-07): one serving request for the whole TLM suite: an environment on vLLM 0.32+ beside 0.26, multi-LoRA so the decision, Judge and Domain adapters share one Core deployment, and a named exception path for omni's Talker (not stock vLLM)."
next_step_due: null
---

# Harness-served models — every endpoint wrapped in a harness agent (Envoy → harness → vLLM): answer at once, work on the session in the background

<!-- generated:start -->
## Lab record

**TL-008 harness-served** · Idea · Seed (captured 2026-11-02 in the ThinkLatent Portal Idea card) · H2

Owner: Head of ThinkLatent (sponsor); harness and platform lead to be named. Appetite: not set. Score: not scored .

Next step: Book a Shaping session: what a session holds, Hermes plugins, shadow mode, the owner-set policy; the five changes captured in the ThinkLatent Portal card are its stress-test inputs. From TL-003 (2026-11-02): a pre-registered cache-reuse hypothesis with seven measures is in the card and scout-brief-serving-telemetry.md. Also from TL-003 (2026-11-02): Jithin's queued thought that harness-served endpoints are agents, now folded into TL-012 agent-portfolio (Seed); the Shaping session should decide what an agent is to the gateway. From TL-012 (2026-11-02): the after-call agent is the harness's first customer, propose-only; the scout brief's harness findings (own the loop; permission control plane, approval ledger and cache discipline first; a conformance suite per fine-tuned model) are in claude/scout-brief-agent-portfolio.md From TL-018 (2026-11-07): one serving request for the whole TLM suite: an environment on vLLM 0.32+ beside 0.26, multi-LoRA so the decision, Judge and Domain adapters share one Core deployment, and a named exception path for omni's Talker (not stock vLLM).

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
| enables | TL-003 portal | The portal shows what the harness did and records its version in the use-case record |
| reuses | AI Gateway (Envoy) | Captured at Seed |
| reuses | multi-tenant memory substrate | Captured at Seed |
| reuses | Relay sessions | Captured at Seed |
| reuses | Hermes | Captured at Seed |

### Artifacts
_None recorded._

### Decision log
| ID | Date | Decision | By | Status |
| --- | --- | --- | --- | --- |
| D-038 | 2026-11-02 | Registered at Seed from the TL-003 session; TL-009 carries a v0 in the parent card; TL-010 is a promotion candidate; each gets its own chat before any stage change | Thinking partner | accepted |
<!-- generated:end -->

## Notes

_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by `scripts/render-ideas.mjs`, this section is kept._
