<!-- Exported from https://claude.ai/artifact/T5rhguUBWXiUtPamFxxELT (rev 1) on 2026-11-04. Read-only mirror; edit the live doc, not this file. -->
# The 40 agents

The seed list of 2026-11-02, each agent with its cluster, what it is (task head, agent or platform), the model recipe, the Domain model it is evidence for, and the wave proposed in the Idea card. Owners are blank until the Head of VI names them; a blank is a hunch, not a demand.

Model recipe: C = Core, D = Distil, J = Judge family, S = the speech model (VGLM1), W = VGLM5.

| # | Agent | Cluster | Type | Models | Evidence for | Wave | Note |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Call companion: live summary, entity capture, next-best-question while the call runs | B Servicing | Agent | S + C | Advice (servicing) | 2 | Needs the harness's live session |
| 2 | After-call agent: summary, CRM write, follow-up draft, task creation | B Servicing | Agent | S + C + J | Advice (servicing) | 1 | Today's flagship made agentic; wave-1 purpose |
| 3 | Client-intent router: reads the first turns, routes to queue, script or specialist | B Servicing | Task head | D | Advice (servicing) | 2 | Routing is the Distil tier's job |
| 4 | Advisor prep agent: client brief before a meeting from CRM, prior calls, holdings, house views | B Servicing | Agent | C + retrieval | Advice | 2 | Retrieval with citations; groundedness checked |
| 5 | Portfolio commentary agent: analytics to narrative in the house voice, suitability-checked | C Client comms | Agent | C + J + deterministic layer | Advice | 3 | Behind the suitability layer |
| 6 | Client correspondence agent: letters and emails against methodology and tone rules | C Client comms | Agent | C + J | Advice | 3 | A supervised communication; reuses flag-explain-rewrite |
| 7 | Complaint handling agent: classifies, drafts the resolution letter, tracks the case | C Client comms | Agent | D triage, C drafting | Advice | 3 | The UK-bank letter pattern |
| 8 | Conversation foresight agent: predicts where an interaction is heading, pre-stages answers | I VGLM5 | Agent | W | Advice | H3, parked | Needs the world model |
| 9 | Prompt-steering agent: VGLM5 shapes a frontier model's prompt from Vanguard history | I VGLM5 | Task head | W + external | Advice | H3, parked | For cases that stay on vendor models |
| 10 | Marketing pre-review agent: flag, explain, suggest the rewrite | D Pre-review | Agent | C + J | Compliance | 1 | Wave-1 purpose; same work as VI-011 Build 3 |
| 11 | Communications surveillance triage: scores alerts, writes the rationale, closes known false positives under a human | D Pre-review | Agent | D + C | Compliance | 2 | Needs the surveillance vendor's alert feed |
| 12 | Regulatory change agent: reads new rules, extracts obligations, maps to controls and owners | E Document intelligence | Agent | C + retrieval | Compliance | 3 | VI-011 Build 7 |
| 13 | Policy Q&A agent: answers staff questions from policy with citations | E Document intelligence | Agent | C + retrieval + J | Compliance | 2 | Groundedness checker on every answer |
| 14 | KYC and document extraction: structured fields from onboarding and contract documents | E Document intelligence | Task head | D | Compliance | 3 | Compare with open 4B extractors first |
| 15 | Investigation narrative agent: SAR-style narratives from case evidence | E Document intelligence | Agent | C + J | Compliance | 3 | Human signs every narrative |
| 16 | Alert triage agent: summarises, scores, proposes disposition, never acts | F Cyber | Agent | C | Cybersecurity | 3, conditional | After VI-011 Build 5 |
| 17 | Detection engineering agent: NL to query, Sigma-style rule drafts with schema validation and staging | F Cyber | Agent | C + validator | Cybersecurity | 3, conditional | Rule emission gated by validation and approval |
| 18 | Threat-intel digest agent: CTI to ATT&CK mapping, daily SOC brief | F Cyber | Agent | C | Cybersecurity | 3, conditional | Open 8B security models compared first |
| 19 | Incident report agent: timeline and write-up from tickets and logs | F Cyber | Agent | C + J | Cybersecurity | 3, conditional |  |
| 20 | Secure-code review agent: reviews internal PRs for known vulnerability classes | F Cyber | Agent | C | Cybersecurity | 3, conditional | Overlaps 37 |
| 21 | Groundedness checker on every retrieval answer | A Judge | Task head | J | Judge | 2 | A VI-011 Build 1 adapter |
| 22 | Rubric grader per output type: advisor summary, letter, incident report | A Judge | Task head | J | Judge | 2 | The advisor-summary rubric first; wave 1's judge |
| 23 | Regression agent: nightly eval of every served endpoint against the index, flags drift | A Judge | Agent | J + index | Judge | 2 | Belongs with VI-004 release scoring |
| 24 | Red-team agent: adversarial prompts per use case, scores the response | A Judge | Agent | C + J | Judge | 2 |  |
| 25 | Preference collector: turns human corrections into reward data for Core post-training | A Judge | Task head | J | Judge | 2 | Fed by wave-1 corrections |
| 26 | Harness agent per use case: answers at once, background entity, summary, knowledge-graph and abuse work | G Platform | Platform | C + D | None | Is VI-008 | Linked, not registered here |
| 27 | Onboarding assistant: captures the use case, recommends model size from the index, explains access | G Platform | Agent | C + retrieval | None | 2 | A VI-003 portal feature |
| 28 | Task-mining agent: clusters production prompts to find the tasks hiding behind one model, privacy-thresholded | G Platform | Agent | D + C | None; serves VI-011 | 1 | Wave-1 purpose; the portfolio's own instrument |
| 29 | Specialist-training agent: the train-in-N-hours button, gap report to adapter to offline eval | G Platform | Agent | Self-healing + J | Judge, indirectly | 2 | VI-005's button |
| 30 | Canary agent: proposes and runs 5/50/100 traffic shifts, reads the feedback | G Platform | Agent | J + gateway | None | 3 | Needs gateway traffic shifting |
| 31 | SRE agent: reads the telemetry store, diagnoses latency and error patterns, drafts runbooks | G Platform | Agent | C | None | 3 | Reads VI-009's store |
| 32 | Hermes research agent and plugins: literature and prior-art scouting | G Platform | Agent | C + external | None | Exists | The team's research agent; reused as is |
| 33 | Data-curation agent: filters and labels call and document data for the next Core refresh | G Platform | Agent | D + J | None; serves the Core refresh | 3 |  |
| 34 | Model-card agent: writes and refreshes catalogue cards, lineage and retirement notes | G Platform | Agent | C | None | 2 | A VI-003 catalogue feature |
| 35 | Internal meeting agent: transcript to notes, decisions, actions | H Horizontal | Agent | S + C | None | Later | Admitted only with a data-residency reason |
| 36 | Knowledge assistant over internal docs with citations | H Horizontal | Agent | C + retrieval + J | None | Later | Same rule |
| 37 | Code and engineering assistant on internal repos and standards | H Horizontal | Agent | C or open code model | None | Later | Vendor tools exist |
| 38 | Executive briefing agent: weekly synthesis across business lines | H Horizontal | Agent | C + J | None | Later |  |
| 39 | Translation and plain-language agent for client-facing and multilingual content | C Client comms | Task head | C | Advice | 3 | Client-facing text |
| 40 | Workflow agent builder: a blueprint letting a business team compose the above without engineering | H Horizontal | Platform | All, via the portal | None | H3 | After waves 1 and 2 |
