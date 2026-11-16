# Team hub (team-hub) · Console build 5

16 November 2026, afternoon (US Eastern) · TL-017 Cortex 0.17.0 · cortex PR 47 (`build/0.17.0`), all six CI jobs green, waiting for Jithin's merge · design kit v0.9.0 (e2a4cac) · for Jithin, Head of ThinkLatent · follows "Team hub (team-hub) - Console build 1 2026-11-16", which covers builds 1 to 4 (0.14.0 to 0.16.2)

## 1. The answer

Everything that needs nobody else is built. Cortex 0.17.0 adds:

- the five features the register had left for later, P-11 to P-15;
- away status;
- notifications you can read one at a time.

A browser check of the demo found two faults that had shipped since 0.14.0, and this build fixes both:

- Opening the account menu or the project and epic switchers stopped the whole console.
- Below 1,536 px the header pushed the account menu and the theme switch off-screen.

When Jithin merges PR 47, CI tags `v0.17.0` by itself.

## 2. Jithin's decisions, 16 November 2026

1. **Build everything out, and V-1a is no dependency.** In his words, more or less: no need to run the live test, it should not be a dependency, build everything out, and he will run it when he judges the time is right.
   - What follows: no build work waits on V-1a, and Claude neither asks about it nor runs it.
   - The backlog, issue #15, `docs/enterprise/verify-when-available.md` and `bedrock-integration.md` now say so.
2. **Release tags come from CI.** Claude Code cloud sessions cannot push tags: Anthropic's GitHub proxy accepts branch pushes only, and no setting changes that. PR 45 added the `release-tag` job, and CI tagged `v0.16.2` by itself.
3. **The backlog as of 16 November** (PR 46, merged): GitHub issues for shipped work are closed. Two stay open:
   - #13, kit blocks, for the design kit's own work;
   - #15, the Blocked list.

## 3. What was built

| Feature | Where | Hub | Notes |
|---|---|---|---|
| P-11 Search | ⌘K palette | `GET /v1/search` | Covers people, epics, issues (which open their epic), requirements, ADRs, rooms, flows, team memory and learnings. Each kind is filtered as the asker may see it: invite-only rooms stay with their members, draft learnings with their author. A query needs two characters. |
| P-12 Needs you from the keyboard | Needs you | — | j and k move the open card. Enter goes to its options and a second Enter acts. s snoozes for an hour and x marks not useful, then the next card opens. Keys typed in a field, dialog or menu are ignored. |
| P-13 Answers with tables and charts | Assistant, Remote | The session's instruction, assistant path only (`link.py`) | "ask my session …" is proposed, and you allow it. The session's next reply is the answer. Fenced `cortex-table` blocks (8 columns, 40 rows) and `cortex-chart` blocks (bar or line, 24 points) are drawn with the kit's DataRows and charts. |
| P-14 Code status | Epic board; Work part 3 | Epic graph and signals | Board cards show the pull request and its checks. Work part 3 shows each session's latest test run (pass or fail with counts, never the output) and the commits, newest first. |
| P-15 Training-data counts | Evidence › Feedback, part 5 | `GET /v1/feedback/datasets` | Curators only, counts only. Records per decision question are measured against about 1,000 for a first adapter (TL-014). Also shows how many records carry no model output, correction pairs per source, and how many people opted out. |
| Away | Account menu; `cortex out 2h\|3d\|back [note]`; People; person page; focus room | `POST /v1/me/away`; event `person.away` | Lasts 1 minute to 24 hours, or 1 to 60 days, with a note of up to 80 characters. Everyone sees the end time and the note; the privacy statement says so. |
| Notifications, one at a time | The bell's list | `POST /v1/me/notifications/seen {id}`; `?before=` | Open marks that item read. Show older pages back 40 at a time. Mark all read still clears everything. |
| Who could take work now | Focus room | `prefs` hours | Uses each person's own working hours, falling back to their session's time zone. States: free, busy, in Focus, away, off hours, hours not known. |
| My session's plan | My work › My session | Epic graph | Built from the plan in Jira; the sample stays only when there is no plan. Session health comes from `cortex doctor`. |
| What is coming | Help | — | Lists the new features under "Built and running". |
| Board S-05 | Canvas "Cortex console: boards" | — | Now shows six numbers, as built (the kit's limit). "Needs you" stays on the dock badge and in part 1. |
| Demo | Replay | — | Answers search, away, per-item reads, paging, and an asked question with a table and a chart. The seed adds nine requirements with links and two ADRs. Republished as version 1794861284-05c2. |

## 4. Fixed

| Fault | Since | Found by | Fix |
|---|---|---|---|
| Opening the account menu or the project or epic switcher blanked the console (Base UI error 31: a menu label outside its group) | 0.14.0 | The browser check, opening each menu | Every menu label now sits in a `DropdownMenuGroup` |
| Below 1,536 px the header ran past the window, hiding the account menu and theme switch | 0.14.0, worse with the bell in 0.16.2 | Measuring the header at seven widths | The status pill drops the date, then the flows chip, and below xl the working chip. The Assistant is an icon below 2xl and Focus below xl. Fits from 768 to 1,920 px. |
| The Needs keys threw on card ids that hold a colon | This build | The browser check | Looks cards up by id, not by CSS selector |
| The Assistant matched the answer by clock time | This build | The browser check (the demo's clock is shifted) | Matches by event id, so the hub's clock and the laptop's need not agree |
| The training meters printed "18 of 1000" | This build | The browser check | Numbers go through the kit's `count` |

## 5. Results

- **Tests:**
  - The full list in CLAUDE.md passes on SQLite (307 tests) and on local PostgreSQL 16 (307).
  - CI is green on PR 47: all six jobs.
  - New tests cover: per-item read and paging; away and Focus in Who could take work now; search, with its privacy cases; dataset counts for curators only; the assistant's answer instruction; away in the privacy statement; `cortex out` end to end.
- **Builds and checks:**
  - First load is 247 KB of the 250 KB budget.
  - The plugin validates.
  - The console's usable-imports and responsive checks pass.
- **Headless Chrome against the demo:**
  - Home shows six numbers.
  - Per-item read works (19 new became 18).
  - Away from the menu shows on People.
  - Palette search works.
  - j, k, Enter and s work in Needs you.
  - The epic shows its tests and commits.
  - My session shows the plan from Jira.
  - The training counts show.
  - An asked question comes back with a table and a chart.
  - The header fits at every width.
  - The phone sheet is full width at 390 px.
  - No page errors.

## 6. Honest gaps

- **The first load is 3 KB from its budget.** The next feature that lands in the first chunk needs a split.
- **P-13 has not run in a live session.** It relies on the session following the instruction to write fenced blocks. It has run only against the replay.
- **P-14's pull requests and checks come from a mock** until the hosted hub has a read-only GitHub token (`CORTEX_GITHUB=api`).
- **Search matches substrings, capped per group.** It is not semantic, and it ranks only by order.
- **Away is what people declare.** Cortex does not read calendars.
- **Nothing automated opens the console.** The menu fault shipped in three releases because the tests cover the hub and the plugin, and the console's checks are build-time only. A browser smoke test in CI would have caught it. It is put to Jithin as a question.

## 7. Next

Jithin merges PR 47, and CI tags `v0.17.0`.
