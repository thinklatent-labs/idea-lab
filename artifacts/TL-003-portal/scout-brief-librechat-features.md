# Scout brief · What LibreChat has today, against the Try TLM boards

14 November 2026 · v1.0 · TL-003 · for Jithin, Head of ThinkLatent · follows `scout-brief-playground-chat.md` (D-308)

## 1. The answer

Jithin asked for LibreChat's code to be fetched and read while the Try TLM boards are drawn, since Try TLM is LibreChat.

The code was fetched on 14 November: version v0.8.9-rc1, last commit 13 November 2026, MIT licence. It is a much larger product than the two Try TLM boards show. The boards cover its chat core. They leave out about a dozen features, and **six of those collide with decisions already taken for Try TLM**. "Every LibreChat feature on day one" (D-308) cannot hold as written until each collision is decided.

## 2. What was read

- The repository `danny-avila/LibreChat` at commit `fad2c51`: `README.md` (the feature list and what is new in v0.8.8), `librechat.example.yaml` (what an operator can switch on and off), `client/src/components` (about 35 areas of screen) and `api/server/routes` (what the server offers).
- Not done: nothing was run, and no feature was tried. A feature named in the README or present as a folder may be partial. Features marked experimental by LibreChat are named as such below.

## 3. On the boards already

| LibreChat feature | Where it is drawn |
|---|---|
| Choosing a model; model settings saved under a name (presets) | Try TLM; 'Saved settings for a model' |
| Agents built without code, with tools, files and starter questions | Agents, tools and sharing |
| Tools through the Model Context Protocol (connectors) | Add a connector; what the tools did |
| Running code in a sandbox | Run code, inside the Enterprise with no network (D-320) |
| Files in a chat | The attached sheet, checked for client data |
| Artifacts beside the chat | Fee comparison |
| One input to two models | Named (D-316) |
| Branching a conversation; search in own sessions | Named |
| Sharing | Named people only (D-320) |
| Thumbs up and down | Good, Not good |

## 4. In LibreChat and not on any board

| Feature | What it is | Collides with |
|---|---|---|
| **Memory** | Keeps facts about a person across chats | 'Private, 30 days, then removed' (D-307) |
| **Projects** | LibreChat's own: a folder of chats with instructions and up to 50 files | The portal's word 'project' means something else |
| **Channels** | Agents answering in Slack workspaces | Connectors stay inside the Enterprise (D-311); notifications stay in the portal (D-307) |
| **Shared links** | A link anyone holding it can open | Named people only, no open links (D-320) |
| **Import and export** | Chats out as markdown, text, JSON or a picture; chats in from other assistants | 30 days then removed (D-307) |
| **Agent marketplace, sharing with users and groups** | People publish and pick up agents directly | An agent reaches others only through the Agents library, accepted by ThinkLatent (D-320) |
| Schedules | An agent run at set times | Nothing decided |
| Skills, agent plugins, subagents | Reusable instruction bundles; child agents with their own context | Nothing decided |
| Attached code workspaces | An agent reads, edits and runs commands in a workspace, with Ask, Allow or Deny for each write. LibreChat calls it highly experimental | Code runs in a sandbox with no network (D-320) |
| Prompts library | Prompts with variables, shared with users and groups | The portal has its own prompt library for projects |
| Web search | Search, scrape and rerank | Decided: off until ThinkLatent allows it (D-320) |
| Image generation and editing | Through outside image models | No ThinkLatent image model exists |
| Speech | Talk to it and hear the answer | Fits: the portal has a speech model |
| Context use and compaction | Shows what fills the context window; summarises on request | Fits |
| Trace viewer, insights, Langfuse and OpenTelemetry | Each turn, tool round and cost | Fits: the backend already logs to Langfuse |
| Admin panel | Users, groups, roles and permissions per role | The portal has no roles; people come from the Enterprise's access management |
| Balance and token spend | A spend allowance per person | Try TLM has a daily request limit |
| Small ones | Bookmarks and pinned chats, reasoning shown, answers that resume after a dropped connection, about 30 interface languages, high-contrast themes, banners, a terms notice | None |

## 5. What follows

1. **D-308 needs a list.** Each row in section 4 is in on day one, off, or later. LibreChat lets an operator switch most of them in `librechat.yaml` (memory, prompts, bookmarks, the two-model chat, agents, the marketplace, sharing), so 'off' is a setting, not a code change.
2. **Rebuilding the screens is the cost, not the server.** D-311 rebuilds Try TLM's screens from the design kit on LibreChat's server. LibreChat's client has about 35 areas of screen. Every feature taken on day one is a set of screens to rebuild in the kit and to keep in step with LibreChat's releases, which are frequent (v0.8.8 to v0.8.9-rc1 within weeks).
3. **The server already fits two of the portal's rules.** It signs people in through OpenID, so the Enterprise's access management can be the only way in, and it exports traces to Langfuse, which the backend already uses.
4. **Two boards are not enough.** After the list is decided, Try TLM needs at least one more board for what stays in: speech, context use, and whichever of memory, folders, skills and schedules are kept.

## 5a. Decided 14 November (D-322)

| Feature | Decision | Whose |
|---|---|---|
| Memory | On. The person sees, edits and clears it; kept until cleared. The 30 days cover sessions only | Jithin, against the recommendation to switch it off |
| LibreChat's projects | Kept, called Folders; instructions and files kept until deleted, sessions inside still end after 30 days | Jithin, as recommended |
| Slack, open links, import | Off. A person can download their own session, recorded | Jithin, as recommended |
| Everything else | All of it on day one, the experimental parts included | Jithin, against the recommendation to take the stable parts first |
| Agent marketplace | It shows the Agents library; publishing still goes through ThinkLatent; an agent can be shared with named people | Jithin, as recommended |
| Code workspaces | In, only in ThinkLatent's sandbox with no network, asking before every write and command | Jithin, as recommended |
| Image generation | On, with one outside model ThinkLatent allows | Jithin, against the recommendation to build it switched off |
| Admin panel | ThinkLatent only, for settings; people come from the Enterprise's access management, no roles | Jithin, as recommended |

Drawn on the board 'Try TLM · everything else'. Open: which outside image model, and the Enterprise's Risk and IT security have not been asked about text leaving for it.

## 6. Where this is thin

- Read from code and the README, not from a running copy.
- My knowledge of LibreChat stopped before these versions; everything here is from the repository as fetched, and features may change again before the build.
- The count of screen areas is a count of folders, not of screens.

## 7. Sources

- [LibreChat repository](https://github.com/danny-avila/LibreChat), commit `fad2c51`, 13 November 2026
- [README: features and what is new](https://github.com/danny-avila/LibreChat/blob/main/README.md)
- [librechat.example.yaml](https://github.com/danny-avila/LibreChat/blob/main/librechat.example.yaml)
- [Licence (MIT)](https://github.com/danny-avila/LibreChat/blob/main/LICENSE)
