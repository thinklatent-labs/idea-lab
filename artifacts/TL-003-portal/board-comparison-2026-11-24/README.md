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
