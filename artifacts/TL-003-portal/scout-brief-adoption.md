<!-- Exported from Idea Lab project knowledge (claude/scout-brief-adoption.md, created 2026-11-02T08:02:11.318933Z) on 2026-11-04. Read-only mirror; edit the project doc, not this file. -->
# Scout brief: what makes an internal AI platform get pulled, and how to measure it

**Date:** 2026-11-02
**Lane:** platform adoption, adoption metrics, enablement playbooks, enterprise GenAI adoption evidence, "pull" product patterns. (Temporal KPIs, feature catalogues, evaluation and governance, and serving metrics are covered by other briefs.)
**Method:** public web only, about 30 searches and fetches. Numbers are as reported by the source; "[unverified]" marks claims I could not confirm from an original source, and "[synthesis]" marks framings that are mine rather than a source's.

---

## 1. What makes internal platforms get adopted

**Platform as a product, not a mandate.** Team Topologies frames the purpose of every internal platform as reducing the cognitive load of the teams that use it, treats "should this platform exist?" as the first question a platform leader must answer, and pairs the platform team with temporary *enabling teams* whose job is to drive fast, consistent adoption. The NAV (Norway) case states the guiding principle as making the platform attractive to use (Team Topologies, undated). The "proven value" figures on that page carry no attribution [unverified].

**Paved road (Netflix).** Netflix's QCon 2017 talk describes the paved road as a sensibly configured but customisable platform: core components pre-assembled, metrics and logs on by default, a CLI, first-class mocks for local development, single-command deploys with canary analysis, and the platform team running its own services on every new platform version. The road is pluggable; freedom-and-responsibility is balanced by making the paved road the easiest option, not the only one (InfoQ, 2017). No adoption numbers were published.

**Golden paths (Spotify).** A Golden Path is the opinionated *and supported* way to build a given kind of thing (backend service, data pipeline, ML model): a step-by-step tutorial, blessed tools surfaced in the portal's Explore section, and an explicit rule that engineers can leave the path but then lose the same support. It replaced "Rumour-driven development", learning by asking a colleague. New engineers complete their discipline's tutorial in their first two weeks; the tutorials became Spotify's most-read documentation. A "Golden State" checklist (is this system on the path?) was still exploratory in 2020 (Spotify Engineering, 2020).

**Backstage outcomes.** Spotify reports that time to a new engineer's tenth merged pull request fell from over 60 days to under 20 after Backstage (Spotify Engineering, 2021). Its measurement post adds 86% of internal users satisfied, 80% of contributions from outside the core team, and most engineers visiting daily (Spotify Backstage blog, undated). The head of Backstage engineering told The New Stack that roughly 99% of Spotify's developers used Backstage about a year after internal launch, that use is voluntary, and that the approach is to "make it easier to do the right thing". She also said many companies stall at about 10% adoption, stuck at proof of concept, because developers see no day-to-day benefit (The New Stack, 2023). Note the definitional gap: the official Backstage docs say about 50% of Spotify engineers use Backstage *monthly* (Backstage.io, undated). "Adoption" must be defined before it is reported.

**Backstage adoption guidance.** The project's docs prescribe a central team that operates the deployment, drives adoption, encodes best practice into software templates, and promotes the portal to other infrastructure teams; contributing teams are customers expected to run their plugins as products. The docs warn against optimising for time spent in the portal (Backstage.io, undated).

**DevEx, DORA and the amplifier finding.** The DevEx framework (the SPACE authors) measures feedback loops, cognitive load and flow state with both perceptual and workflow measures, under north-star KPIs of productivity, satisfaction, engagement and retention, and recommends transactional surveys at touchpoints such as a failed CLI install (InfoQ, 2023). DORA's 2025 report (nearly 5,000 respondents) finds AI use near-universal (about 90%) but acting as an amplifier of existing strengths and weaknesses; 90% of organisations have internal platforms, 76% have platform teams, and a high-quality internal platform is one of seven capabilities that let AI benefits scale, though it also correlates with slightly higher delivery instability, read as risk compensation (InfoQ, 2025; DORA, 2025).

**Portal survey baseline.** Port's survey of 100 engineering leaders found 75% measured productivity through surveys or custom reports rather than DORA or SPACE, and only 34% used their portal to drive standards even though standards were the stated goal (Port, 2023, updated 2025). Gartner's forecast that 80% of software engineering organisations would have platform teams by 2026 was not checked against an original source [unverified].

---

## 2. Adoption metrics platform teams actually use

| Metric | Framing | Source |
|---|---|---|
| Time to first value | Time to a new engineer's 10th merged PR: >60 days to <20 | Spotify Engineering, 2021 |
| Time to first call (TTFC) | Sign-up or first doc visit to first *successful* call; Ably scores <30 min as 5/5; Twilio aims for 5 minutes; manual key approval is the main roadblock | Nordic APIs, 2021 |
| Active users and teams | MAU/DAU, page views, number of teams contributing at least one plugin; caution against optimising time in portal | Backstage.io, undated |
| Contribution ratio | 80% of contributions from outside the core team; 150+ plugins from 100+ squads | Spotify Backstage blog, undated |
| Satisfaction | 86% satisfied on the quarterly EngSat survey; eNPS covering productivity, findability, tool satisfaction | Spotify Backstage blog; Backstage.io |
| Findability | Search success rate, click-through, result relevance | Spotify Backstage blog |
| Context switching | Number of tools needed to ship and validate a change | Spotify Backstage blog |
| Fragmentation | Variance in framework versions, languages, deployment methods (experimental) | Spotify Backstage blog |
| Scorecards / golden state | Production-readiness and migration scorecards that gate standards; only 34% of orgs use portals to drive standards | Cortex, 2023; Port, 2023 |
| Ticket deflection | Internal assistant cut IT help-desk calls by more than half | American Banker (Bank of America), 2025 |
| Capacity | Cost of a human doing a task 100 times versus the AI doing it | Fortune (Citi), 2025 |
| Pilot-to-production conversion | 47% of AI deals reach production versus 25% for traditional SaaS | Menlo Ventures, 2025 |
| Solutions in production | 75% more AI solutions in production quarter on quarter; adoption up 175% | BNY, 2025 |
| Training completion | 99% of employees trained and onboarded, from about a third in January | BNY, 2025 |
| Formal value tracking | Firms that track AI value on the P&L realise 3.6% versus 1.2% | BCG, 2026 |

Two gaps. No public source defines an adoption *funnel* for an internal AI platform; the practical funnel (discover, sandbox, key issued, first successful call, first production call, retained at 90 days) is my synthesis of the TTFC literature and the Backstage metrics [synthesis]. And team-level retention and churn are reported nowhere I found; DevEx lists retention as a KPI for people, not for teams on a platform. The portal would be measuring something the public literature does not benchmark.

---

## 3. Internal marketing and enablement playbooks

**Backstage's playbook.** Lunch-and-learns such as "build your first plugin"; embedding a central-team engineer with a team for a sprint or two during its first contribution; portal hack days; quarterly show-and-tell, which also surfaces overlapping work; weekly usage-digest emails to plugin owners; and proactively approaching teams whose internal UIs could consolidate into the portal (Backstage.io, undated). Spotify's first Golden Path tutorial was built by eight engineers in a Hack Week, and the platform organisation publishes survey results and promotes wins internally (Spotify Engineering, 2020; The New Stack, 2023).

**BNY's playbook (the fullest public bank case).** Role-based learning paths for engineering, operations, product, client coverage and corporate functions; leader-led briefings and town halls plus peer learning circles; a standing network of AI champions and pioneers; gamified formats including hackathons, promptathons and weekly demos with leaderboards; bootcamps and certifications. The bank reports 99% of employees trained and onboarded, adoption up 175% in the year, 75% more solutions in production than the prior quarter, and most AI builders now coming from outside engineering (BNY, 2025). A spokesperson told Fortune the majority of employees use the platform daily (Fortune, 2025).

**Citi.** A cross-company group of "AI accelerators" acts as champions and shaped the tools; feedback is collected inside the tools; rollout was phased by regulatory stability of the country; and the assistant is being placed inside the chat apps employees already use. The CTO's stated strategy is "Get the tools out at scale" (Fortune, 2025).

**Goldman Sachs.** About 10,000 employees used the assistant before the firmwide launch, which turned the pilot cohort into the social proof for the launch memo (ODSC/Reuters, 2025).

**JPMorgan.** Access for nearly all of roughly 250,000 employees, about 200,000 active; connected internal data; a model abstraction layer so employees pick models per task; and compute-only internal pricing so unused seats cost nothing, which business leaders found appealing (American Banker, 2025).

**Morgan Stanley.** Trust as the enablement lever: advisors and prompt engineers graded answers for accuracy and coherence, every use case went through an evaluation framework before deployment, and a daily regression suite of sample questions runs in production. Over 98% of advisor teams use the assistant (OpenAI, undated).

**Champions networks.** A CSO Online practitioner piece recommends 5–10% of the initial user base as champions, one lead per 10–20, quarterly rotation and direct access to the core team; it cites no companies or numbers, so treat the ratios as opinion (CSO Online, 2025). MIT NANDA's related finding is that successful deployments empower line managers to drive adoption rather than a central AI lab (Fortune, 2025).

**Evidence quality.** Every effect above is correlational and self-reported. I found no public A/B evidence for any single tactic, and nothing at all on "prompt doctor" hotlines [unverified]. What the cases share is a bundle: default access, embedded champions, weekly visible demos, and a count of things in production that leaders repeat.

---

## 4. Enterprise generative-AI adoption evidence, 2024–2026

**The failure base rate.** MIT NANDA's *GenAI Divide* (about 150 interviews, 350 employees, 300 deployments) finds only about 5% of pilots produce rapid revenue impact. It blames a learning gap in tools and organisations, not model quality: generic tools work for individuals but do not adapt to company workflows. Purchased or partnered tools succeed about 67% of the time; internal builds about a third as often (roughly 22%, derived) (Fortune, 2025). Gartner predicted at least 30% of GenAI projects would be abandoned after proof of concept by end-2025, citing poor data quality, inadequate risk controls, escalating costs and unclear value (Gartner, 2024).

**What the scalers do differently.** McKinsey (1,993 respondents, 105 countries): 88% use AI somewhere, about a third are scaling, 39% report any EBIT impact. The 6% "high performers" are roughly three times as likely to have fundamentally redesigned workflows, three times as likely to report strong senior-leader ownership, deploy about twice as many use cases, and have defined processes for when outputs need human validation (McKinsey, 2025). BCG's Applied AI Index (1,300+ executives) puts effort at 10% algorithms, 20% technology and data, 70% people, process and organisation; 7.5% of firms are "future-built"; more than two-thirds of those are committing to a single enterprise-wide AI platform, and 61% run a multiyear enterprise programme versus 17% of laggards (BCG, 2026).

**Buy is beating build.** Menlo Ventures (495 US decision-makers): 76% of use cases were purchased rather than built in 2025, up from 53% in 2024, because ready-made solutions reach production faster (Menlo, 2025). a16z (100 CIOs): enterprises are shifting from building to buying because internal tools are hard to maintain, with regulated industries the main exception; buyers filter on public leaderboards but decide on internal benchmarks, golden datasets and employee feedback; 37% use five or more models; and switching is getting harder because prompts and guardrails in agentic workflows are tuned to one model (a16z, 2025).

**Bank cases not covered in section 3.** Bank of America: more than 90% of 213,000 employees use the internal assistant, help-desk calls down more than half, developers report 20%+ efficiency; the method behind the 90% is not described (American Banker, 2025). Wells Fargo: 245.4 million assistant interactions in 2024, an orchestration layer that picks the model per task, and a CIO who says the gap between top models is small so model-agnosticism is essential: "We're poly-model and poly-cloud" (VentureBeat, 2025). JPMorgan's self-reported value figure is 1–2 hours saved per employee per week (American Banker, 2025). Not found within budget: public adoption numbers for BlackRock Aladdin Copilot, Fidelity, Capital One, Allianz or ING [unverified].

**What distinguishes adoption that sticks, and the portal's role** [synthesis of the above]:
1. Access is default and self-serve for everyone, not gated by a project (JPM, BoA, Citi).
2. The tool sits inside an existing workflow or surface: chat apps, help desk, meeting notes (Citi, BoA, Morgan Stanley).
3. Trust is manufactured deliberately through evals and regression suites that users can see (Morgan Stanley; a16z on internal benchmarks).
4. One abstraction layer offers model choice, so the in-house model competes on the same shelf as vendors (JPM, Wells Fargo).
5. Value is measured in a unit leaders repeat: hours, capacity, solutions in production, P&L (Citi, BNY, BCG).
6. Training reaches near 100% and champions are embedded in business lines (BNY, Citi, MIT NANDA).
7. A senior executive owns it visibly (McKinsey, BNY CEO).

The catalogue or portal shows up in every case as the shelf: JPM's LLM Suite abstraction, BNY's Eliza menu of models any employee can build with, Spotify's Explore section of blessed tools. Nobody reports the portal itself as the cause of adoption; it is where the other six levers become visible.

---

## 5. Product patterns for "pull"

**Self-serve onboarding.** TTFC is the north-star metric of developer platforms: count only successful calls; the single biggest roadblock is manual approval before a key is issued; Twilio's public target is five minutes (Nordic APIs, 2021). JPM's firmwide default access and compute-only pricing are the enterprise version of the same pattern (American Banker, 2025).

**Sandbox first.** Sandboxes and public workspaces that show how the API responds before any commitment (Nordic APIs, 2021); Netflix ships first-class mocks so a developer can stub the platform locally (InfoQ, 2017).

**Showrooms and live demos.** BNY's weekly demos with leaderboards and Backstage's quarterly show-and-tell are the published analogues (BNY, 2025; Backstage.io). I found no public case study of an internal portal that displays live production scale as a showroom; the closest pattern is firms publishing interaction counts externally as proof (Wells Fargo's 245M; Bank of America's 23M Ask Merrill interactions) [unverified as an internal pattern].

**Trust signals.** Morgan Stanley's eval framework and daily regression suite; Netflix's semantic versioning and dogfooding; a16z's finding that buyers decide on internal benchmarks and golden datasets; DORA's finding that AI use is near-universal but trust lags (OpenAI; InfoQ 2017; a16z 2025; InfoQ 2025).

**Social proof.** Spotify publishes survey results and promotes wins; the Backstage adopters list (260+ organisations) is external proof; Goldman's 10,000-user pilot and BNY's solutions-in-production counts are internal proof (The New Stack, 2023; ODSC, 2025; BNY, 2025).

**Reducing switching cost.** JPM's abstraction layer and Wells Fargo's orchestration layer let a model be swapped per task; a16z documents that prompts and guardrails tuned to one model make switching expensive; Menlo documents that ready-made solutions win because they reach production faster. The implication for an in-house model is API parity with the vendor shape teams already call, a migration guide, and blueprints as ready-made as a bought product (American Banker 2025; VentureBeat 2025; a16z 2025; Menlo 2025). Spotify's version is gravity, not a wall: leave the path and you lose support, not permission (Spotify Engineering, 2020).

---

## What the portal should do and measure

Ranked by evidence strength and fit to the adoption problem (people cannot see what the models do, the platform team cannot evangelise at scale, the lift is higher than a vendor API).

| # | Build | Measure | Evidence |
|---|---|---|---|
| 1 | Instant self-serve keys, no manual approval, with a sandbox and one runnable blueprint per model | TTFC: first successful call, target under 30 minutes, stretch 5 | Nordic APIs 2021; Netflix 2017 |
| 2 | Vendor-API-compatible endpoint plus a migration guide ("change the base URL and the model name") | Share of teams migrated from a vendor API; lines changed to switch | a16z 2025; JPM 2025; Wells Fargo 2025 |
| 3 | Published evals, regression-suite status and uptime per model, visible on the model card | Eval pass-rate trend; survey trust score; incidents | Morgan Stanley; a16z 2025; DORA 2025 |
| 4 | Showroom: live production counters, named internal case cards, "who else uses this" | Showroom to sandbox conversion; sandbox to key conversion | BNY 2025; Spotify (social proof); synthesis |
| 5 | Onboarding assistant that drives a cohort to its first production call | Time to first value (first production call) by cohort; 60-to-20-day style target | Spotify 2021 |
| 6 | Forkable blueprints as golden paths with a "golden state" scorecard | % of production AI use cases on-path; scorecard pass rate | Spotify 2020; Cortex 2023; Port 2023 |
| 7 | Model choice behind one abstraction, in-house models on the same shelf as vendors | Share of calls routed to in-house per task type | JPM 2025; Wells Fargo 2025 |
| 8 | Champions/accelerators programme with a weekly demo slot and leaderboard | Teams activated per quarter; % of blueprints contributed outside the platform team (Spotify: 80%) | BNY 2025; Citi 2025; Backstage docs |
| 9 | In-product transactional feedback at failure points plus a quarterly satisfaction survey | Satisfaction (Spotify benchmark 86%); eNPS; findability | DevEx 2023; Citi 2025 |
| 10 | Usage digests to team owners and a value ledger (capacity hours, solutions in production) | Weekly active teams; teams retained at 90 days; capacity hours; formal P&L tracking | Backstage docs; Citi 2025; BCG 2026 |

Define "adopted team" once (for example, a team with a production call in the last 30 days) and report every number against that definition; the Spotify 99%-versus-50% discrepancy shows what happens otherwise.

---

## Warnings: what kills adoption

1. **The 10% stall.** Portals that give no day-to-day benefit plateau around 10% of developers, stuck at proof of concept (The New Stack, 2023). Mandates do not fix this; incentives and lower lift do. Measuring time-in-portal makes it worse (Backstage.io).
2. **Buy is the current.** 76% of enterprise use cases were bought in 2025, up from 53%; internal builds succeed about a third as often as bought tools; ready-made reaches production faster (Menlo 2025; Fortune/MIT 2025). An in-house model will be judged against a vendor's five-minute TTFC, API shape and polish. If the lift is not at parity, the showroom will attract visitors and not users.
3. **Unmeasured value and undefined adoption.** Firms that do not formally track AI value realise a third of the value of those that do (BCG 2026); Gartner's abandonment drivers are unclear value and escalating cost (2024); bank adoption claims (90%, 98%, 99%) are inconsistently defined and mostly self-reported. A portal that reports "users" without a definition and "hours saved" without a method will not survive a budget review.
4. **Amplifier risk.** AI, and a portal, amplify the platform underneath; a high-quality platform correlates with more AI benefit but also with risk compensation and more instability (DORA 2025). Shipping the showroom before the regression suite inverts the trust signal.
5. **Over-standardisation.** Spotify's path works because it is "just enough" standardisation with a reviewed radar of three options per layer, and leaving the path costs support, not permission (The New Stack 2023; Spotify 2020). A single blessed model with no choice reads as a mandate.

---

## Sources

1. Spotify Engineering, "How We Use Golden Paths to Solve Fragmentation in Our Software Ecosystem" (Gary Niemen), https://engineering.atspotify.com/2020/8/how-we-use-golden-paths-to-solve-fragmentation-in-our-software-ecosystem, 2020-08-17.
2. Spotify Engineering, "How Backstage Made Our Developers More Effective, and How It Can Help Yours, Too", https://engineering.atspotify.com/2021/9/how-backstage-made-our-developers-more-effective-and-how-it-can-help-yours-too, 2021-09-23.
3. Spotify for Backstage blog, "How we measure Backstage success at Spotify", https://backstage.spotify.com/discover/blog/how-we-measure-backstage-success-at-spotify/, undated.
4. The New Stack, "How Spotify Achieved a Voluntary 99% Internal Platform Adoption Rate" (Jennifer Riggins), https://thenewstack.io/how-spotify-achieved-a-voluntary-99-internal-platform-adoption-rate/, 2023-09-05.
5. Backstage.io docs, "Strategies for adopting", https://backstage.io/docs/overview/adopting, undated.
6. InfoQ, "Paved PaaS at Netflix" (QCon NY, Yunong Xiao), https://www.infoq.com/news/2017/06/paved-paas-netflix, 2017-06-30.
7. Team Topologies, "Platform Engineering", https://teamtopologies.com/platform-engineering, undated.
8. Cortex, "Why Scorecards are critical to your developer portal", https://www.cortex.io/post/why-scorecards-are-critical-to-your-developer-portal, 2023-04-27.
9. Port, "The 2024 state of internal developer portal report", https://www.port.io/blog/the-2024-state-of-internal-developer-portal-report, 2023-12-13 (updated 2025-06-18).
10. InfoQ, "DevEx: A New Metrics Framework from the Authors of SPACE" (Abi Noda), https://www.infoq.com/articles/devex-metrics-framework, 2023-05-16.
11. DORA, "2025 DORA Report: State of AI-assisted Software Development", https://dora.dev/dora-report-2025/, 2025.
12. InfoQ, "DORA 2025: AI as amplifier" (summary of the DORA report), https://www.infoq.com/news/2025/09/dora-state-of-ai-in-dev-2025, 2025-09-29.
13. Nordic APIs, "Why Time To First Call Is a Vital API Metric" (Art Anthony), https://nordicapis.com/why-time-to-first-call-is-a-vital-api-metric/, 2021-11-09.
14. Gartner, "Gartner Predicts 30% of Generative AI Projects Will Be Abandoned After Proof of Concept By End of 2025", https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025, 2024-07-29.
15. Fortune, "MIT report: 95% of generative AI pilots at companies are failing" (Sheryl Estrada, on MIT NANDA's *GenAI Divide*), https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/, 2025-08-18.
16. McKinsey, "The state of AI in 2025: Agents, innovation, and transformation", https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-state-of-ai-2025, 2025-11-05.
17. BCG, "The Formula for Agentic AI Value: The Applied AI Index 2026", https://www.bcg.com/publications/2026/the-formula-for-agentic-ai-value, 2026-09-30.
18. Menlo Ventures, "2025: The State of Generative AI in the Enterprise", https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/, 2025-12-09.
19. a16z, "How 100 Enterprise CIOs Are Building and Buying Gen AI in 2025", https://a16z.com/ai-enterprise-2025/, 2025-06-10.
20. American Banker, "How JPMorganChase democratized employee access to gen AI" (Penny Crosman), https://www.americanbanker.com/news/how-jpmorganchase-democratized-employee-access-to-gen-ai, 2025-05-22.
21. OpenAI, "Morgan Stanley" customer story, https://openai.com/index/morgan-stanley/, undated.
22. American Banker, "Bank of America: more than 90% of its employees now use AI" (Penny Crosman), https://americanbanker.com/news/bank-of-america-more-than-90-of-its-employees-now-use-ai, 2025-04-08.
23. Fortune, "How Citi's CTO is rolling out new gen AI productivity tools to more employees across the globe", https://fortune.com/2025/04/09/how-citis-cto-is-rolling-out-new-gen-ai-productivity-tools-to-more-employees-across-the-globe, 2025-04-09.
24. Open Data Science (citing Reuters), "Goldman Sachs Rolls Out AI Assistant Firmwide to Boost Employee Productivity", https://opendatascience.com/goldman-sachs-rolls-out-ai-assistant-firmwide-to-boost-employee-productivity/, 2025-06-24.
25. BNY, "AI In the Next Phase: Driving Adoption", https://www.bny.com/corporate/global/en/insights/unlocking-potential-enterprise-ai-platform-bny.html, 2025-10-20.
26. Fortune, "BNY unveils updated Eliza platform as it touts that majority of employees use AI tools daily", https://fortune.com/2025/09/29/bny-unveils-updated-eliza-platform-as-it-touts-that-majority-of-employees-use-ai-tools-daily, 2025-09-29.
27. VentureBeat, "Wells Fargo's AI assistant just crossed 245 million interactions", https://www.venturebeat.com/ai/wells-fargos-ai-assistant-just-crossed-245-million-interactions-with-zero-humans-in-the-loop-and-zero-pii-to-the-llm, 2025-04-08.
28. CSO Online, "Gen AI success requires an AI champions network" (Tyler Farrar), https://csoonline.com/article/4080674/gen-ai-success-requires-an-ai-champions-network.html, 2025-11-04.
