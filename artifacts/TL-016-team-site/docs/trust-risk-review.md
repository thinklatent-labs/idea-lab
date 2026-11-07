# ThinkLatent Trust — page wording for Risk review

Nov 7, 2026 · @Jithin Pradeep

ThinkLatent's internal team site will have a page called ThinkLatent Trust. It explains how a ThinkLatent model reaches the people who use it. The page will not go live until Risk confirms the wording below. We ask for your sign-off or edits by Nov 28, 2026. Sent by the Head of AI Products.

## What the page says

The page says no ThinkLatent model reaches a client without passing all five steps, and a use case that fails a step goes back. It says ThinkLatent runs the controls and the Enterprise owns the policy. The page links to the policy instead of repeating it.

| Step | What the page says happens | Who signs |
| --- | --- | --- |
| 1. Intake | The team records the business, the data involved, who the model will face, and what it must never do | ThinkLatent product lead and the partner team's owner |
| 2. Risk review | The use case is classed by who it affects and what could go wrong; anything client-facing or regulated goes to Risk before training starts | Risk and Compliance liaison (name to come) |
| 3. TL Index evaluation | The model is scored on the skills the use case needs, against the last release and a frontier baseline, with worse results shown too | Index lead |
| 4. Human review | People who do the job today check the outputs; people decide, in production too | Partner team's reviewers |
| 5. Monitoring | Every call is logged; drift, refusals and escalations are watched; a use case below target goes back a step | AI Products, continuously |

## What the page shows, and what it leaves out

**Shown:** which step each use case is at and who signed last; the index score with its interval and run; what each model must never do, in plain words; known limits and worse results; a named contact for every product.

**Left out:** code, data and architecture; training data beyond "curated Enterprise data, never vendor data"; client names; policy text, which is linked to its owner instead.

**Status by product:** a list showing the step each product has reached. Today it shows TLM4 Core and TLM4 Distil in production, TLM4 Domain · Advice in human review, TLM5 at intake, and the ThinkLatent Portal at risk review. It is reviewed every quarter by the Head of AI Products and the Risk liaison.

**Questions:** a governance-question form, answered within five working days by the product's owner and, where it matters, Risk.

## What we ask Risk to confirm

| Question | Risk's answer |
| --- | --- |
| 1. Is step 2 right as written: anything client-facing or regulated reaches Risk before training starts? |  |
| 2. Who is the named Risk and Compliance liaison who signs step 2 and co-owns the page? |  |
| 3. Can the page say "no ThinkLatent model reaches a client without all five"? If not, what may it say? |  |
| 4. Can each product's step and its last signer be shown to everyone at the Enterprise? |  |
| 5. Are the three policy links right (AI policy, model risk management, approved tools), and who owns each? |  |

Edits to the page wording can be made inline or left as comments. Once Risk signs off, the page goes live with the date of the sign-off on it.
