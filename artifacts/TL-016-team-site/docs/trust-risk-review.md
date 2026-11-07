# How we build responsibly — page wording for Risk review

Nov 7, 2026 · @Jithin Pradeep

ThinkLatent's internal site will have a page called How we build responsibly. It describes ThinkLatent's own delivery process, which supports and does not replace the Enterprise's model risk management. The page will not go live until Risk confirms the wording below. We ask for your sign-off or edits by Nov 28, 2026. Sent by the Head of AI Products.

## What changed from the first draft

- Renamed from "ThinkLatent Trust" so the page does not read as a branded control program.
- Independent validation is now its own step. Risk owns it and ThinkLatent does not sign it.
- Absolute claims are gone: "no model reaches a client without all five", "five signatures", "every call is logged" and "never vendor data".
- Status shows ThinkLatent's process stage only, dated, with the model inventory named as authoritative.
- The question form no longer promises a response time on Risk's behalf.

## What the page says

The page lists the steps ThinkLatent takes before and after a model is used in a business process. Approval and validation belong to the Enterprise's model risk management; the page links to that policy and to the model inventory instead of repeating them. A use case that does not meet a step goes back to the step before.

| Step | What the page says happens | Who is responsible |
| --- | --- | --- |
| 1. Intake | The team records the business purpose, the data involved, who the model will affect and what it must not do | ThinkLatent product lead with the partner team's owner |
| 2. Risk classification | The use case is classed by who it affects and what could go wrong; client-facing or regulated use cases are referred to Risk before training starts | ThinkLatent product lead refers; Risk decides the class |
| 3. Developer evaluation | The model is scored on the TL Index for the skills the use case needs, against the last release and a frontier baseline, with weaker results shown. This is ThinkLatent's own evaluation, not model validation | Index lead |
| 4. Independent validation | Validation under the Enterprise's model risk management, as Risk requires for the use case | Risk; ThinkLatent supplies the evidence and does not sign |
| 5. Human review | People who do the job today check outputs before and after go-live, as the use case's approval sets out | Partner team's reviewers |
| 6. Monitoring | Calls through the ThinkLatent gateway are logged as the approval requires; drift, refusals and escalations are watched; a use case below its agreed bar goes back a step and Risk is told | AI Products, with the use case's owner |

## What the page shows, and what it leaves out

**Shown:** each product's ThinkLatent process stage with an as-of date; developer evaluation results with their interval and run, labelled "developer evaluation, not model validation"; what each model must not do, in plain words; known limits, subject to Risk's answer to question 5; a named contact for every product.

**Left out:** code, data and architecture; training data details; client names; policy text, which is linked to its owner; approval and validation status, which the model inventory holds.

**Status by product:** a list headed "ThinkLatent process stage, as of \[date\]. The Enterprise's model inventory is authoritative for approval and validation \[link\]." The Head of AI Products and the Risk co-owner review it every quarter. If it ever differs from the inventory, the list is unpublished within one working day and corrected.

**Corrections:** anything restated after publication gets a dated correction note on the page, owned by the Head of AI Products.

**Questions:** a governance-question form routed to the product's owner. Questions for Risk are passed to Risk under Risk's own process; the page promises no response time for Risk.

## What we ask Risk to confirm

| Question | Risk's answer |
| --- | --- |
| 1. Are the six steps accurate, and is step 4 described in Risk's terms? |  |
| 2. Who in Risk co-owns the page and confirms its wording each quarter? |  |
| 3. May the page show each product's ThinkLatent process stage, dated, with the model inventory linked as authoritative? |  |
| 4. May developer evaluation results appear on a page every Enterprise reader can see, with the "not model validation" label? |  |
| 5. May known limits of models still in validation be shown to all Enterprise readers, or are they restricted? |  |
| 6. Are the policy links right (AI policy, model risk management, model inventory, approved tools), and who owns each? |  |
| 7. Does the page need Comms review, a classification label or a retention rule? |  |

Edits to the page wording can be made inline or left as comments. Once Risk signs off, the page goes live with the sign-off date on it.
