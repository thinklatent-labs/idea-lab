---
name: lab-decisions
description: Apply the quick calls Jithin made on the Idea Lab dashboard (the decision inbox) to the register, sync to GitHub and mark them applied. Use at the start of every lab session, in the morning pickup, or when Jithin says "apply my decisions".
---

# Apply dashboard decisions

The dashboard artifact (https://claude.ai/artifact/X1ebYqg9d1QRr1GYJkaLMr) keeps Jithin's quick calls in its database, collection `inbox`, one document per due item, id = the item id (`TL-004-q2`). Fields: `itemId`, `ideaId`, `itemText`, `optionId`, `optionLabel`, `effect`, `decidedAt`, `decidedBy`, `status` (`waiting`, `applied`, `needs-chat`).

## Steps

1. List the inbox: `ArtifactData` action `list`, collection `inbox`, on the artifact URL above. Keep only `status: "waiting"`. None waiting: say so in one line and stop.
   - A document with `kind: "request"` (id `REQ-…`) is a request Jarvis drafted on the dashboard and Jithin queued for the next lab chat: `itemText` is the request, `ideaId` the row it concerns (empty for the lab as a whole). Never apply it as a quick call. Raise it at the top of the session's brief as a request from Jithin, act on it only inside the scope its row allows (an idea's request belongs to that idea's chat; capture it as one line in that row's next step otherwise), then update the document to `status: "needs-chat"` with `appliedNote` saying where it was raised. Requests are not register changes, so they need no decision line of their own.
2. For each waiting document, find the item in `register/register.json`: the idea `ideaId`, a `decisionsDue` entry with the same `id`, an option with the same `optionId`.
   - Not found, or the idea has moved stage since `decidedAt` in a way that makes the option meaningless: do not apply. Update the inbox document to `status: "needs-chat"` with `appliedNote` saying what changed, and tell Jithin.
3. Apply the option's `effect` to the register, exactly as written (for example "score status set, composite 4.0"; "appetiteWeeks 9"). Then:
   - remove the item from `decisionsDue` (an option whose effect says "item stays due" keeps it; an effect that says "item becomes input-needed" sets its `kind` to `input` and drops `options`);
   - add a decision-log line: next `D-###`, `date` today, `ideaId`, `decision` = "<item text>: <option label> (decided on the dashboard <decidedAt date>)", `by` = "Jithin (dashboard)", `status` accepted, `type` decision, `door` two-way unless the effect is a stage change or a rejection;
   - if the effect resolves a pending thinking-partner line, add a line that supersedes it rather than editing the old one.
4. Bump `asOf` and `source.registerRev`, add a Sessions row (scope "Decision inbox", mode "Apply", outcome naming the items applied, health unchanged), then run `scripts/lab-sync.sh` (lab-sync skill).
5. Mark each applied document: `ArtifactData` action `update`, collection `inbox`, doc id = item id, data `{status: "applied", appliedAt: <now ISO>, decisionId: "D-###", appliedNote: <one short sentence of what changed>}`. Use one `batch` when there are several.
6. Republish the dashboard's data so the page shows the applied state: publish `dashboard/dist/artifact.html` to the artifact URL with `files` `data/register.json` and `data/history/**` from `dashboard/public/data/`, omitting `capabilities` so the stored declaration carries forward.
7. Report in two or three lines: what was applied, anything sent back to the chat, and that GitHub is up to date.

## Rules

- Never apply anything not in the inbox, and never invent an effect: the option's `effect` text is the instruction.
- Never change a document Jithin has not decided (`status` other than `waiting`).
- An inbox document whose item kind is `input` is not a quick call: mark it `needs-chat`.
