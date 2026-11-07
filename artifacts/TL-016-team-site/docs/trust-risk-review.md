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

The page opens: "ThinkLatent's delivery process supports, and does not replace, the Enterprise's model risk management." It then lists the steps ThinkLatent takes before and after a model is used in a business process. Approval and validation belong to the Enterprise's model risk management; the page links to that policy and to the model inventory instead of repeating them. A use case that does not meet a step does not proceed. A model in use that falls below its agreed bar is escalated under the Enterprise's model risk management, which may restrict or suspend its use.

| Step | What the page says happens | Who is responsible |
| --- | --- | --- |
| 1. Intake | The team records the business purpose, the data involved, who the model will affect and what it must not do; the model is registered in the Enterprise's model inventory | ThinkLatent product lead with the partner team's owner |
| 2. Risk classification | Every use case is referred to Risk for classification before training starts; Risk decides the class and the validation required | ThinkLatent product lead refers; Risk decides the class |
| 3. Developer evaluation | The model is scored on the TL Index for the skills the use case needs, against the last release and a frontier baseline, with weaker results shown. This is ThinkLatent's own evaluation, not model validation | Index lead |
| 4. Independent validation | Validation under the Enterprise's model risk management, as Risk requires for the use case | Risk; ThinkLatent supplies the evidence and does not sign |
| 5. Human review | Reviewers from the partner team check outputs at the level and frequency the approval sets out | Partner team's reviewers |
| 6. Monitoring | Calls through the ThinkLatent gateway are logged as the approval requires; drift, refusals and escalations are watched; a use case below its agreed bar is reported to Risk through the model risk issue process within the timeframe the approval sets | AI Products, with the use case's owner; periodic revalidation by Risk |

## What the page shows, and what it leaves out

**Shown:** each product's ThinkLatent process stage with an as-of date; developer evaluation results for models registered in the inventory, with interval and run and the label "developer evaluation, not model validation" on every chart, frontier baselines unnamed unless Legal clears naming them; what each model must not do, in plain words; for approved models only, the limits and use conditions stated in the approval; a named contact for every product.

**Left out:** code, data and architecture; training data details; client names; policy text, which is linked to its owner; approval and validation status, which the model inventory holds; limits of models still in validation, which stay with their sponsors and Risk.

**Status by product:** a list headed "ThinkLatent process stage, as of \[date\]. The Enterprise's model inventory is authoritative for approval and validation \[link\]." ThinkLatent reconciles the list against the inventory before each update and at least monthly; any difference found is unpublished within one working day and corrected. Stages use neutral labels: "Production", "Live" or "Approved" appear only where the inventory shows the model approved for that use, and every row links to its inventory record.

**Corrections:** anything restated after publication gets a dated correction note on the page, owned by the Head of AI Products.

**Questions:** a governance-question form routed to the product's owner. Questions for Risk are passed to Risk under Risk's own process; the page promises no response time for Risk.

## What we ask Risk to confirm

| Question | Risk's answer |
| --- | --- |
| 1. Are the six steps accurate, and is step 4 described in Risk's terms? |  |
| 2. Which Risk role co-owns the page and confirms its wording when the steps change and once a year? |  |
| 3. May the page show each product's ThinkLatent process stage, dated, with the model inventory linked as authoritative? |  |
| 4. May developer evaluation results appear on a page every Enterprise reader can see, with the "not model validation" label? |  |
| 5. May known limits of models still in validation be shown to all Enterprise readers, or are they restricted? |  |
| 6. Are the policy links right (AI policy, model risk management, model inventory, approved tools), and who owns each? |  |
| 7. Does the page need Comms review, a classification label or a retention rule? |  |

Edits to the page wording can be made inline or left as comments. Once Risk confirms the wording, the page goes live with the line: "Wording reviewed by the Enterprise's model risk management on \[date\]. This review is not approval or validation of any model."

## Simulated Risk review, 7 Nov 2026

Claude's Risk seat reviewed this wording as a simulation; the Enterprise's Risk function has not seen it. Verdict: sign off with changes. The changes are applied above; the answer column stays empty for the real review.

| # | Simulated answer |
| --- | --- |
| 1 | Yes with change: every use case goes to Risk for classification, inventory registration added at intake, escalation through the model risk issue process (applied) |
| 2 | A role, not a person: the model-risk coverage lead for ThinkLatent's models; wording confirmed when the steps change and yearly (applied) |
| 3 | Yes with change: neutral stage labels, approval words only where the inventory shows approval, every row linked to its record (applied) |
| 4 | Yes with change: registered models only, label on every chart, frontier baselines unnamed unless Legal clears; not evidence of fitness for use (applied) |
| 5 | No: limits of models in validation stay restricted; publish only the limits and conditions in an approval (applied) |
| 6 | Needs the four real URLs and their claimed owners (open, company version) |
| 7 | Yes: Comms review, Internal label, records retention with superseded versions and corrections kept (open, company version) |
