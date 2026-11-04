<!-- Exported from Idea Lab project knowledge (claude/agent-portfolio-seed.md, created 2026-11-02T08:53:30.558850Z) on 2026-11-04. Read-only mirror; edit the project doc, not this file. -->
# Agent portfolio (agent-portfolio) — Seed note

2026-11-02 · captured in the VI-011 domain-model-portfolio session (Brainstorm, no evaluation yet). Register ID VI-012. Jithin will take this into its own chat.

**Hypothesis.** A portfolio of agents powered by the VGLM family (one model or several per agent) is the demand side of the Domain tier: it is the set of use cases that justify each Domain model, and almost every multi-model agent is Core plus a Judge.

Models in brackets: C = Core, D = Distil, J = Judge family, S = speech model (VGLM1), W = VGLM5 world model.

## Servicing and Advice (the flagship's lineage)
1. Call companion: live summary, entity capture, next-best-question while the call runs [S + C]
2. After-call agent: summary, CRM write, follow-up draft, task creation (today's flagship, made agentic) [S + C + J]
3. Client-intent router: reads the first turns and routes to the right queue, script or specialist [D]
4. Advisor prep agent: client brief before a meeting from CRM, prior calls, holdings and house views [C + retrieval]
5. Portfolio commentary agent: analytics to narrative in the house voice, suitability-checked [C + J + deterministic layer]
6. Client correspondence agent: letters and emails against methodology and tone rules, flags regulated statements [C + J]
7. Complaint handling agent: classifies, drafts the resolution letter, tracks the case [D triage, C drafting]
8. Conversation foresight agent: predicts where an interaction is heading and pre-stages answers or escalations [W]
9. Prompt-steering agent: VGLM5 shaping a frontier model's prompt from Vanguard history for cases that stay on vendor models [W + external]

## Compliance
10. Marketing pre-review agent: flag, explain, suggest rewrite on marketing and client copy [C + J]
11. Communications surveillance triage agent: scores alerts, writes the rationale, closes known false positives under a human [D + C]
12. Regulatory change agent: reads new rules, extracts obligations, maps to controls and owners [C + retrieval]
13. Policy Q&A agent: answers staff questions from policy with citations [C + retrieval + J groundedness]
14. KYC and document extraction agent: structured fields from onboarding and contract documents [D]
15. Investigation narrative agent: drafts SAR-style narratives from case evidence [C + J]

## Cybersecurity
16. Alert triage agent: summarises, scores, proposes disposition, never acts [C]
17. Detection engineering agent: NL to query, Sigma-style rule drafts with schema validation and staging [C + validator]
18. Threat-intel digest agent: CTI to ATT&CK mapping, daily brief for the SOC [C]
19. Incident report agent: timeline and write-up from tickets and logs [C + J]
20. Secure-code review agent: reviews internal PRs for known vulnerability classes [C]

## Judge and evaluation
21. Groundedness checker on every retrieval answer [J]
22. Rubric grader per output type: advisor summary, letter, incident report [J family]
23. Regression agent: nightly eval of every served endpoint against the index, flags drift [J + VAI]
24. Red-team agent: adversarial prompts per use case, scores the response [C + J]
25. Preference collector: turns human corrections into reward data for Core post-training [J]

## Platform and VI operations
26. Harness agent per use case: answers at once, background entity, summary, knowledge-graph and abuse work on the session (VI-008) [C + D]
27. Onboarding assistant: captures the use case, recommends model size from the index, explains access [C + retrieval]
28. Task-mining agent: clusters production prompts to find the tasks hiding behind one model, privacy-thresholded [D + C]
29. Specialist-training agent: the "train in N hours" button, gap report to adapter to offline eval [self-healing + J]
30. Canary agent: proposes and runs 5/50/100 traffic shifts and reads the feedback [J + gateway]
31. SRE agent: reads the telemetry store, diagnoses latency and error patterns, drafts runbooks [C]
32. Hermes research agent and plugins: literature and prior-art scouting [C + external]
33. Data-curation agent: filters and labels call and document data for the next Core refresh [D + J]
34. Model-card agent: writes and refreshes catalogue cards, lineage and retirement notes from the register [C]

## Enterprise-wide, cross-domain
35. Internal meeting agent: transcript to notes, decisions, actions [S + C]
36. Knowledge assistant over internal docs with citations [C + retrieval + J]
37. Code and engineering assistant on internal repos and standards [C or open code model]
38. Executive briefing agent: weekly synthesis across business lines [C + J]
39. Translation and plain-language agent for client-facing and multilingual content [C]
40. Workflow agent builder: a blueprint letting a business team compose the above without engineering [all, via the portal]

## Observations (not yet evaluated)
- Almost every multi-model agent is Core plus a Judge: the Judge family is the shared dependency.
- Agents 26 to 30 are the portal's improvement loop and exist independently of any business domain.
- Agents cluster to the four Domain candidates plus a platform set, which is the evidence VI-011 needs for "domain only when several use cases exist".

## Next step
Own chat (VI-012 agent-portfolio): Shaping. Converge on a shortlist, name owners and the first three to build, and link each to the VI-011 Domain model it depends on.
