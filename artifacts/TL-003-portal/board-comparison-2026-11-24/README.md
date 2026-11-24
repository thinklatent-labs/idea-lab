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
