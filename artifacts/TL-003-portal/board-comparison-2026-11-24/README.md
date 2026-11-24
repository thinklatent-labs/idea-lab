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

## Third pass, by eye (started 23 Nov)

All 119 boards are rendered beside their best-matching screen at 1,440 and published as a private page for Jithin:
https://claude.ai/artifact/CSyz2hooe7w25etje1NxaU (slug 5cb53c98-05ef-474a-a360-25d8c5309eb9, from portal main 4236a98c).

Looked at so far by Claude, at the level of sections and their order (13 of 119): Try-Chat, Try-Agents, Try-Files, Try-Memory,
Try-Schedules, Try-Settings, Try-Admin, Try-Sessions, Try-Agent (Try-Skills, Try-Connectors, Try-Folders and Try-Prompts are rendered,
not yet read), Home-Cockpit, Project-Page, Model-Page, Index-Language.

Differences seen:
1. Every tabbed page: the tab row shows the tabs of one group, not all of them (by decision, D-474).
2. Try TLM boards draw each state as a numbered part down the page; the screens show the standing parts, and the states sit behind
   their button, menu or address. Not a gap by itself, but each state has not been opened and compared.
3. Project-Page: the screen puts 'Needs a decision' and the readiness summary above the tiles; the board starts with the tiles.
4. Home-Cockpit: the screen has a 'Start here' strip the board does not, one dark tile in 'Running now' where the board's five are
   alike, and money figures where the board prints placeholders.
5. Try-Settings: no difference after all; the board's top card holds the same three columns.
