# ThinkLatent Portal (portal) — Board audit, 17 Nov 2026

Lab session · TL-003 portal · Building. Jithin, 17 Nov: "check in parallel if all boards we have draw anything missing from portal." Seven helpers each audited one group of the approved boards against the portal as built (integration 47c1a171), in parallel, read only. The lead put their reports together here.

## The answer

- **Every approved board has its screen. No page is missing.**
- **173 smaller gaps:** 78 broken, 48 partly there, 47 missing; 144 small, 28 medium, 1 large.
- **The main cause:** builds 1 and 2 (Home, Find, the inbox, Jarvis, Requests, Help, the model pages) were made before the pages they point at existed, so many links still go to All projects, the Catalogue or Requests in general. Those pages exist now.
- **The rest:** buttons that say something happened when nothing did; two pages that state one fact differently; states a board draws that no visit can reach; a few things the boards mention in words but never draw.
- **Being fixed now,** on eight tracks at once (below). Four groups of things no board draws were put to Jithin; he chose to build them all (D-431).

## By group

| Group | Findings | Broken | Partly | Missing |
|---|---|---|---|---|
| Home, the shell, Find, inbox, Jarvis, Requests, Help, Settings, organization and Enterprise pages | 41 | 20 | 8 | 13 |
| Models, the Catalogue, systems | 32 | 19 | 9 | 4 |
| Projects (All projects, a project's tabs, Start, Plan, Members, Value) and Try TLM's pieces on them | 32 | 12 | 11 | 9 |
| Try TLM, the chat | 25 | 7 | 8 | 10 |
| Try TLM, the tabs and the phone | 18 | 8 | 8 | 2 |
| Data, training, a feature's pages, increments | 14 | 7 | 1 | 6 |
| TL Index, traces, operations | 11 | 5 | 3 | 3 |
| **All** | **173** | **78** | **48** | **47** |

## What is being fixed, and where

- **Shell, Home, Jarvis, Requests, Help:** Find opens what it names and reaches every model, tab, run, decision and request; the keys the ? sheet lists work; a question asked anywhere arrives in Jarvis; Help's links and "Raise a request" do what they say; the Undo line in dark.
- **Model pages:** every link moved from its stand-in to the built page; the data set's withdrawal flag on Built from; the model card agrees with the incident and the trace.
- **Projects, My work, Settings, the inbox:** inbox lines open the page they name; saved views, compact and notifications do what Settings says; the scope menus open; the timeline's drag to zoom; the trace's window and the incident's date agree with the card.
- **Data, training, features, Agents at work:** the time window on a feature's pages; Agents at work lists the proposals the other pages show; CR-2204 on Requests; set v3's dates; money where the world holds it.
- **TL Index:** the head-to-head cells open; three links land where the boards send them; "Tell me when…" is kept and listed.
- **Try TLM, the chat:** speech settings reach the chat; memory, a folder and a skill at work in a session; sharing an agent; the context meter recounts on a model change; every drawn failure state reachable.
- **Try TLM, the tabs:** next, after a small phone change lands.
- **Try TLM on a phone:** lists on Agents, Connectors and Schedules lay their cells one under the other, so nothing is cut off at 390.

## Settled by the lead, for Jithin to overrule

- **The over-fitting warning** (asked for, D-325) shows on the Live page behind a switch marked as a sample, because run 7 has not tripped it; nothing in the world changes (as the joined template row, D-423).
- **Domain-Advice version 1:** retired on 5 Oct and kept ready until 3 Jan so Call summary can go back to it; every page says both.
- **Set v3 of Call summary** was uploaded on 2 Nov, the day it was offered to the TL Index (one page said 4 Nov).
- **Incident INC-20417** closed on 23 Oct, as its own page says (the model card said 28 Oct).
- **Domain-Advice v2's window** is 32,000 everywhere, the trace included.
- **Agents at work** dates the second gap 2 Nov, as Self-healing and the model page do.
- **Requests** gains CR-2204 (Priya N.'s deviation of 2 Oct); CR-2284 is matched to the prompt change it was for.
- **Memory in Try TLM:** two switches, as board Try-Memory draws them (the Tools menu's for one session, the Memory page's for everything). The lead's earlier one-switch call is withdrawn.
- **An agent shared with you** can be read as the builder with every control off.
- **Speech:** "Show Speak" and "Stop listening after silence" sit in the speech dialog and on Try TLM's settings page, one setting each.
- **Sharing in Try TLM:** the link opens only for the people named, so the two boards' words agree.
- **States no visit reaches** (the context meter full, speech and workspace failures, a helper stopped by the check) are reached by a sample session, or behind a switch marked as a sample.

## Decided by Jithin (D-431)

Four groups of things the boards mention but no board draws. Jithin chose the recommended answer on each, 17 Nov:

1. **Built from the nearest drawn board, marked where made up:** a project's engine settings on Operations and the engine's counters on Operations across the Enterprise, with Engineering on; adding a feature to an existing project; pausing or retiring a feature and removing a member; a feature's four tabs that say "Not built yet"; an organization's five layers of value; Help's three Try TLM guides and "All 63, by topic".
2. **The four behaviours the settings board promises, across the portal:** the section bar on long pages, hover cards, a wide row opening in place, a thread on its own page as well as in the inbox.
3. **Self-healing:** "Show me more" says the rest is sealed and is asked for in the Enterprise's access management; "Start the hand scoring" sends the gap's examples to data review.
4. **An increment may ask for Production** while a line of its service is under its threshold; that line is shown under its threshold to whoever approves.

## Not checked

Phone and dark where no board draws them; a screen reader; real phones and keyboards; sound, files, clipboard and sign-in windows, which a prototype does not have.

## Where the detail is

The seven reports and their findings, board by board: `docs/audit/2026-11-17/` in thinklatent-labs/portal.
