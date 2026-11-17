# ThinkLatent Portal (portal) · Build 4 check

17 November 2026 · v1.0, approved by Jithin (D-426, D-434) · TL-003 · for Jithin, Head of ThinkLatent

## 1. The answer

Build 4, Try TLM, is complete and on main, at `ec668a53`, approved by Jithin: 'Finish them all now looks good' (D-426), the phone screens accepted (D-428), and the phone tabs looked at and approved on 17 Nov (D-434). It was first published on the private build page as version `1794930599-b657`, together with the TL Index's first fixes from the board audit, which go to main later with the rest of the audit's fixes. Try TLM is the chat where anyone at the Enterprise can try ThinkLatent's models on made-up data: its own tab in the navigation, nine tabs of its own, and its place on the portal's other pages. All 28 Try TLM boards have their screen; every screen was put beside its board at 1,440 wide by the helper who built it, and the lead looked at 24 of the 28 beside theirs; every repository check passes on main's commit (633 scenario tests and 19 portal tests).

LibreChat itself, in the ThinkLatent look by its own theme and settings (step 0), stays on its own branch `build-4-try-tlm`, as D-399 set: it is not part of what goes to main.

The calls the lead made where boards disagreed or said nothing are in sections 5 and 6, each for Jithin to overrule. Section 9 lists what the real Try TLM needs that a prototype cannot show.

## 2. What is built

| Board | Screen | Where |
|---|---|---|
| Try-Chat | The chat: your sessions, the session, the right panel | `/try`, `/try/s/<session>` |
| Try-Message | Everything a message can hold, reached in four sample sessions | `/try/s/fees`, `/try/s/worked`, `/try/s/share-class`, `/try/s/went-wrong` |
| Try-Box | The writing box: attach, tools, `@` and `/`, speak, the context meter | the chat |
| Try-Setup | The set-up bar: model, agent, tools, system prompt, saved settings, a second model | the chat |
| Try-Sessions | All your sessions: search, archive, hold to remove | `/try/sessions` |
| Try-Artifact | The artifact pane: code, versions, change by hand, download | the chat |
| Try-Steps | What the tools did | `/try/s/<session>/steps` |
| Try-Share | Sharing with named people, and what is shared with you | the Share dialog, `/try/shared`, `/try/s/shared-charges` |
| Try-Limit | Your limit today | `/try/limit`, the card in the chat |
| Try-Context | The context meter, opened; summarising a long session | the chat, `/try/s/long` |
| Try-Speech | Speaking and reading aloud | the chat |
| Try-Helpers | Helpers at work | `/try/s/team-questions` |
| Try-Workspace | The code workspace | `/try/s/welcome-checklist` |
| Try-Leave | Download, hand a session to a project, copy | the chat |
| Try-Agents | Your agents | `/try/agents` |
| Try-Agent | Build or change an agent | `/try/agents/<agent>`, `/try/agents/new` |
| Try-Connectors | Connectors, by the Enterprise's sign-in only | `/try/connectors` |
| Try-Memory | What Try TLM remembers | `/try/memory` |
| Try-Folders | Folders | `/try/folders` |
| Try-Skills | Skills | `/try/skills` |
| Try-Prompts | Your saved prompts | `/try/prompts` |
| Try-Files | Your files | `/try/files` |
| Try-Schedules | Your schedules | `/try/schedules` |
| Try-Settings | Try TLM's settings | `/try/settings` |
| Try-Admin | What ThinkLatent sets for Try TLM | `/try/admin` |
| Try-You | The Try TLM card on You | `/you` |
| Try-Portal | Try TLM on the portal's other pages: top bar and keys, Find, inbox, You, the Agents library, the prompt library, a model's page and the catalogue, Requests, starting a project and a feature's Prompts page, Home, My work, Help | across the portal |
| Try-Phone | Try TLM at the width of a phone | every Try TLM address, at 390 |

Every answer in the chat is the same sample answer; nothing a person types or presses is sent anywhere, and nothing is kept once the page is left.

## 3. What the check did and found

**By machine, on every Try TLM address and the portal pages build 4 changed** (on main's commit: 315 page loads, 105 addresses each at 1,440, on a phone and in dark, 0 problems, 235 links followed; links from the organization and team pages to their people pages land on a page no build has made yet):

- No screen wider than its window; no page error or console error; no stray text; every link followed.
- Every repository check: `kit:check`, `licences`, `check:usable`, `check:representation`, `coverage`, `typecheck`, `test` (633 scenario tests and 19 portal tests).
- Browser scripts by the builders: about 1,000 checks of controls across the chat (427), the agents and connectors (168), what Try TLM keeps (249), schedules and settings (3 scripts), the portal pages and the joining-up round, each passing on its last run.

**By eye, by the lead**, each screen beside its board at 1,440: the six chat boards (D-416); Agents, Memory and Schedules (D-418); Settings and What ThinkLatent sets (D-419); the agent builder and Connectors (D-420); Folders, Skills, Prompts and Files (D-421); Steps, Sharing, the limit and the context meter (D-422); Try-Portal's parts 2, 5, 7 and 8 and Try-You (D-423, D-424); the phone's six screens and the three tabs on a phone (D-428, D-434).

**Faults found on the way, all fixed:** the phone board first drew a bottom navigation (redrawn with the navigation at the top); the connectors board drew a typed key (redrawn: sign-in only, D-412); the bell counted 5 while a project's page said 4 things wait (now one count everywhere, D-424); the boards' "Priya N." was the sample reader herself (now Marcus L., D-425); /coverage said "bar" (now "threshold", D-347); the context dialog's figure showed mid-count in pictures (now final at once); a line of code was cut off in the workspace pane (now wraps); two commits by helpers carried a type error into their own tests (fixed in the next commit, before merging).

## 4. What differs from the boards

On every Try TLM page:

- A board draws all of a page's states side by side; the screen is one working page, and each state is reached by using it (a menu, a button, a sample session), or by a sample row in that state.
- Lists are the kit's rows (soft boxes) where the boards draw hairlines; some marks are the kit's glyphs (a clock, an eye) where the boards draw their own.
- Panels the boards lay out together open one at a time.

The main differences by board are in the builders' notes (`docs/tracks/try-pages.md`, `try-agents.md`, `try-keeps.md`, `try-sets.md`, `try-join.md`, `try-portal-1.md`, `try-portal-2.md`, `try-phone.md`). The ones a reader will notice:

- Helpers and the code workspace each have a sample session of their own; the boards draw them inside the fees session.
- With the artifact pane open, the right panel's three cards sit under the two columns.
- Agents' states (offered, sent back, accepted, shared) open as one card beside the list, where the board lays five cards in the page.
- Reading aloud makes no sound, and says so.
- The joined template row on the prompt library and the accepted hand-over on a feature's Prompts page sit behind a switch, because their dates (6 and 9 Nov) fall after the sample day.
- On a phone: the bell reads 5 (the board 4) and the strip shows 7 of its 8 icons; answers keep the desktop's wording, so the first answer's actions sit under the box until scrolled; your message's actions show on a tap; the set-up sheet has more rows than the board (the second model, What is kept, the two links); the drawer blurs the chat where the board greys it; on Agents, Connectors and Schedules each list row lays its cells one under the other (no board draws those tabs on a phone).

## 5. Board clashes the lead settled

The sample world wins over a board; among boards, the board about the thing itself wins. Each is shown the same on every page.

| What | Boards say | Shown | Why |
|---|---|---|---|
| The bell | 4 on every board | 5 | Try TLM's sample holds a yes or no that waits for you, and Try-Portal puts such a line on the header count always; a project's page now says "5 things wait for her today" (D-424) |
| Your agents | Try-You 3 | 6 | the Agents tab's list is the fact (D-421, D-424) |
| Connectors on ThinkLatent's list | Try-Admin 3 | 4 | the Connectors tab's list |
| Your schedules | Try-You 1 | 5 | the Schedules tab's list |
| Your folders | Try-You 1 | 2 | the Folders tab's list |
| Shared by you / with you | Try-You 1 / 2 | 3 / 3 | the shared list |
| The colleague named Priya N. of Advice Tech | several boards | Marcus L. | Priya N. of Advice Tech is the sample reader herself (D-425) |
| A cost under each answer | Try-Steps, Try-Context: no price is set | the model card's sample cost | money shows wherever the sample world holds it (D-406) |
| Domain-Advice v2's context | Try-Context 8,000 tokens | 32,000 | the sample world holds 32,000 |
| The library agent in your list | the chat boards: "Meeting notes to actions · 41 people" | Meeting notes agent | the Agents library's own agent; "Meeting notes to actions" is shown on the shelf as an agent made in Try TLM (Try-Portal) |
| A search for "minutes" in the prompt library | 1 template | none | what the library holds |
| A hand-over's owners | Priya N. and Arjun K. | no names; "an owner of the project" | the reader is one of the owners |

Settled after this check by the lead's recommendation (D-426): the system prompt and agent instructions make 240 tokens (the instructions 216); the weekly summary's run of Mon 2 Nov counts 1 request on the limit page; the limit page's skipped run is the weekly sort. One stays as each board draws it: board Try-Steps gives the fees session a third message, where the six chat boards give it 2 exchanges; settling it waits for a board to be redrawn.

## 6. Made up by the lead and the builders, on no board

Every made-up value is marked `madeUp` in the sample facts or listed in the builders' notes. The main ones: nine of the fourteen sessions and their words; the daily limit of 23 of 60 used today (only Try TLM's facts hold it); what three steps open to; the helpers 4 and 5; the four request forms beside "What ThinkLatent sets" (an outside tool, a connector, a wrong stop by the check, the limit) and who decides each; the new hand-over HO-0008 when one is raised in a visit; the words of states no board draws (empty lists, "withdrawn just now", undo lines). Home's "1.9k requests by 148 people" is the board's own made-up figure.

## 7. Decided by Jithin for build 4

- **D-399, D-400:** Try TLM joins the portal in three stages (LibreChat restyled in place, rebuilt on the kit board by board, portal pages with Try TLM in the navigation); Amazon DocumentDB in place of MongoDB; both prompt libraries kept; a person's session text kept in their own store.
- **D-402:** Try TLM's pages are tabs, like a project; an icon in the navigation and the green button in the top bar.
- **D-411:** reading aloud drawn as working; anyone may offer a prompt, and the offer is a request.
- **D-412:** draw every board first, then build; connectors take no key, only the Enterprise's sign-in.
- **D-414, D-415:** your own message is white with a thin ThinkLatent green outline (form A).
- **D-416:** continue the build after the 28 boards were shown.
- **D-426:** 'Finish them all now looks good': the last board and the open clashes finished; build 4 to main after the phone board and the final check.
- **D-428:** the phone screens accepted; everything still pending built into the portal.
- **D-434:** the phone tabs looked at and approved; build 4 to main.

## 8. Features and asks of the kit

Coverage at the end of build 4: 762 features · Partly 270 · Built 73 · Not built 383 (6 moved, 6 not a screen, 2 open decisions, 22 later). Few of the 762 rows name Try TLM's tabs one by one; their notes say what is built and where.

Asks of the design kit (TL-013), from the builders: slots in the message view; tool-call rows with their detail; numbered sources; a composer with words and a files row; a flow graph; a diff view; a meter in two parts; clock and eye glyphs in Status, and a glyph prop on it; a name for the slider's thumb. One defect: the composer's Stop turns into Send in place, so pressing Stop with text in the box also sent it (worked around).

## 9. What the real Try TLM needs that a prototype cannot show

- **The store:** Amazon DocumentDB is chosen and not yet tried by us; a store where only the person can read their session text.
- **Running code:** LibreChat's default code service is outside the Enterprise, so Run is switched off there until an inside code service is named.
- **Artifacts:** previews need an inside bundler.
- **Reading aloud:** no TLM speaks today; a voice model is not chosen.
- **Pictures:** the outside image model is not chosen, so the images board is not drawn.
- **Administrators:** the first person to sign in to LibreChat becomes its administrator; ThinkLatent's people must be named by claim first.
- **One model at a time:** no LibreChat setting holds it for "ask a second model".
- **Set but not seen working in LibreChat:** asking before every tool, the inside-only list for connectors, removal after 30 days.

## 10. Where this check is thin

- The lead did not look at every side-by-side; those not looked at are the builders' own checks: Try-Speech, Try-Helpers, Try-Workspace and Try-Leave (merged on the helper's own check and controls scripts, D-422) and Try-Portal's parts 6 and 9 (D-423). The board audit of 17 Nov then checked all 28 Try TLM boards against the build with separate helpers.
- Dark and phone were looked at by the builders on every page, by the lead on a few.
- States that only a sample session reaches are not reachable by acting: three workspace failures, three of four speech failures, a context at 78% and full, a skipped scheduled run.
- Nothing carries on while the page is away, and nothing is kept between visits.
- The board audit of 17 Nov (D-430) found 43 smaller gaps on the Try TLM boards after this check (18 on the tabs, 25 in the chat): links, buttons and drawn states. They are fixed on the audit's tracks and go to main with those fixes, not with build 4.
