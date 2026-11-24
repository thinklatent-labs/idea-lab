# Board comparison by words, 24 Nov 2026

Portal main 53c68a36 (kit v0.11.3). 119 boards in `navigation-options/project` against 535 pages of the build
(Engineering view on, every tab address).

Method: each board's printed phrases of three words or more (12,341), looked for on any page, then in the portal's code.
This is a comparison of words, not of pictures: it shows whether what a board says is in the build, not whether the
layout matches.

- On a page: 9,595 (78%)
- In the code, behind a dialog, menu or state the crawl did not open: 1,211 (10%)
- Not found word for word: 1,535 (12%). Read by hand for the 17 lowest boards: board annotations ("Where it goes on You"),
  first-draft boards later replaced (Playground-More, Playground-Build), 'bar' reworded to 'threshold' (D-347) and
  figures put together from data. Only 6 phrases use a word the portal never uses (Slack, import of chats, both left out on the boards themselves).
- 44 concepts checked in code (summarise a session, speech, helpers, share, hand-over, download, context meter, find, shortcuts, live training log…): all present.

No drawn function was found missing. Not checked: the side-by-side look of each screen against its board.
`coverage.json` holds the counts and the unmatched phrases per board.

## Second pass, by named section (portal main 4236a98c)

Each board's named sections (its aria-labels, 959 across 119 boards) looked for by name on the board's screen, in order.

- 464 found on the board's own screen by the same name; 40 boards have every named section.
- 477 not found by name. Read through: labels of buttons on the boards ("More for…", "Open step 1"), the spoken descriptions of
  charts (which carry figures and are worded differently in the build), and the state galleries of the Try TLM boards, which draw
  one state after another and are not one page. 34 section names that looked like real sections were checked by their words on the
  screen's text: all present.
- Order: three boards differed in the page's code order; by position on the page two are the same as the board (Index-Trends,
  Try-Agent: side-by-side columns). One is left to look at by eye: Try-Settings, where 'Speaking and listening' and 'The client-data
  check' sit in the top row on the screen and lower on the board.

Still not done: looking at each screen beside its board's picture. Neither pass can say that a layout matches.
`sections.json` holds the result per board.

## Third pass, by eye (23 Nov, all 119 read)

All 119 boards are rendered beside their best-matching screen at 1,440 and published as a private page for Jithin:
https://claude.ai/artifact/CSyz2hooe7w25etje1NxaU (slug 5cb53c98-05ef-474a-a360-25d8c5309eb9; pictures from portal main 4236a98c).
Claude read every pair at reduced size, at the level of sections and their order. Spacing, type and fine detail were not judged.

Result: no board has a section missing from its screen. Many screens carry more than their board (sections added by later decisions).

Found and fixed (portal main 89d3abf0):
1. Tab groups (D-474) were not applied on the project pages built on two other page frames (Increments, Members, Quality, Traces,
   Self-healing, Topics, a rollout): they showed all ten tabs. Now grouped everywhere.
2. Home: the 'Under its threshold' tile was dark; now quiet like the other four.

Differences left for Jithin to rule on:
3. Bright green in charts and in one selected row (TL Index pillar bars, Ask Jarvis's chart, the Engineering view's first chart, a model's
   calls by hour, the prompt library's selected row), where the boards draw dark green.
4. Project page: 'Needs a decision' and the readiness summary sit above the tiles; the board starts with the tiles.
5. Home: a 'Start here' strip the board does not have; money figures where the board prints placeholders.
6. Figures that differ from the boards' printed ones: Value (uses that needed no new model 7 of 17 against 5 of 15; time given back 128k
   against 134k hours) and All projects (features with real traffic, in Production, under their threshold).
7. Phone: board Try-Phone draws the icon rows at the top; since D-485 the build has one Menu button there.

Not comparable as one page:
8. 18 boards draw states one after another (16 Try TLM boards, Shell-Find, Shell-Settings): the standing parts match; each state behind a
   button, menu or address was not opened and compared one by one.
9. The three first-draft Playground boards have no screen of their own; the Try TLM boards replaced them.
10. Training-Live is paired with another run than the board's example; the sections are the same.

## Fourth pass: the state boards, state by state (started 24 Nov)

Each state a board draws is opened on the running build (portal main e929cc02) and looked at beside the board's part.

### Try-Artifact (6 parts): all present and working
1. The pane beside the chat: opens from 'Open wider'; Preview and Code, the version stepper, Change by hand, Download, Its own window, Close; the table, bars and five-line note as drawn.
2. Its code: the code block with Copy.
3. Its versions: version 2 'Showing', version 1 with Read and Make it the newest. Read shows version 1 (funds in A, B, C order); Make it the newest makes version 3.
4. Take it with you: the four ways (as a document, its table as a sheet, save to your files, hand it to a project). Save answers 'Saved to your files'; Choose a project opens the hand-over.
5. What can open beside the chat: the five kinds and 'Not here: images made by a model', in a small panel opened from the pane's foot (the board draws it as a section).
6. Its own window: the card 'Open in its own window' with 'Close the window'. The preview that cannot be shown: on the session with the charge calculator, with 'See the code' and 'Ask for a version that needs nothing from outside'.
Change by hand saves a new version. Close puts the artifact back as the small card. No page error in any step.
Differences: the kinds are a panel, not a section; the tab row shows one group (D-474); 'its own window' says a prototype opens no window.

### The rest of the state boards (24 Nov, portal main e929cc02): about 175 states opened, none missing

Each state was reached on the running build by acting on the page (press, type, hold), at 1,440 wide and, for Try-Phone, at 390; the words the board gives that state were then looked for, and a sample of the pictures was read by eye. No page error in any step.

| Board | States opened | Result |
| --- | --- | --- |
| Try-Box | 12 | All there. Speak first says the browser will ask (Carry on, Not now), then 'Stop listening' and 'Listening'; sample words go into the box. |
| Try-Message | 13 | All there. |
| Try-Setup | 7 | All there. The agent's own prompt reads 216 tokens where the board prints 180 (the lead's ruling of 17 Nov). |
| Try-Context | 6 | All there: the dialog, remove the file (12%, 3,860), what does not count, summarise (92% to 21%), the summary used, nearly full. |
| Try-Helpers | 8 | All there: six states of a helper, one opened, open all, stop all, an answer, a message added while it works, three helpers at work, the marks on the sessions list. |
| Try-Steps | 10 | All there: the list, five kinds of step opened, the filters, the download, a session with no steps, the way in from an answer. |
| Try-Share | 8 | All there: the dialog, picking a person, stopping with Undo, the list, the reader's page, start my own, no longer shared. |
| Try-Limit | 2 | The page with its three card states, and a session at the limit. |
| Try-Speech | 4 | Listening, an answer read aloud (Pause, four speeds, Stop), the dialog, the microphone blocked. |
| Try-Workspace | 5 | All there: in the session, the pane, what changed, about the workspace, a failure shown as a sample. |
| Try-Leave | 4 | The download dialog and what you get, the hand-over form, the request. The fees session now opens with a hand-over already waiting (HO-0007). |
| Try-Agents | 8 | All there: the menu, offering, waiting, sent back, accepted, shared with you. |
| Try-Agent | 4 | The builder, an inside service, an outside address refused, a new agent. |
| Try-Connectors | 8 | All there: connecting, what you must supply, a state shown on Team wiki, its tools, add your own, an outside address refused, disconnecting with '1 agent of yours uses it'. |
| Try-Memory | 8 | All there, with the hold to forget everything and the page that follows. |
| Try-Folders | 6 | Make one, add a file (checking), after 30 days, remove with a hold. |
| Try-Skills | 6 | Write one, upload refused, share, versions. |
| Try-Prompts | 8 | Make one, a blank, try it, versions, share, offer, nothing found. |
| Try-Files | 5 | The menu, a file opened, add a file (checking), nothing found. |
| Try-Sessions | 6 | The list, the menu, search (3 matches in 2 sessions), nothing found, archived, before removal. |
| Try-Schedules | 6 | The form, More, the runs, a run opened as a session, stopped by the check. |
| Try-Settings, Try-Admin | 2 | Each page opens with its content. |
| Shell-Find | 8 | The box, results for 'core 4', Try TLM's group for 'notes', the shortcuts sheet with what the box finds and never shows, the inbox, a Try TLM line opened. |
| Shell-Settings, Try-You | 9 | You (Look, dark, the download in two states); the six states a page can be in and the patterns (side sheet, hold to sign) on Help's 'How pages behave'. |
| Try-Portal | 5 | The Agents library, the prompt library, Requests, starting a project from Try TLM, a feature's prompts. |
| Try-Phone | 7 | The six screens at 390 (chat, sessions drawer, set-up sheet, steps opened, artifact full screen, a message's More) and the Menu drawer; nothing scrolls sideways. |

Not opened, and why:
- Listed on the page but not reachable by acting, as the build records say: 'Context 78% used' and 'Context full' (no sample session); a schedule paused after 3 failed runs.
- Not tried in this pass: the 'nothing yet' states that need everything removed first (agents, folders, skills, prompts, files, schedules, sessions; memory's was tried), 'You have 10 schedules', 'Memory is full', the ready and removed states of the download on You, and dark for each state.

Figures that have moved since the build records of 16 to 18 Nov, none of them new: the inbox reads 'Try TLM · 10' and 'All · 22' (the records say 8 and 20); a session started by a schedule makes the list read 'All 15'.

Scripts and pictures: /home/claude/work/states (h.py, b1 to b6, chat.py; folders chat, chatb, tabs, join, phone).
