# Scout brief: an open-source base for the portal's Playground ("Try TLM")

Lab session · TL-003 portal · Scout. 13 Nov 2026. Owner: Site lead (Claude). Decider: Jithin, Head of ThinkLatent.

## The question

Jithin wants the Playground to be the place where anyone at the Enterprise tries a TLM the way they would try Claude.ai: advanced prompting, agents that use tools, artifacts, files. Which open-source project can be built into the portal to show that on day one?

## What was looked at

| Project | What it is | Licence, as read on 13 Nov | Fit |
|---|---|---|---|
| LibreChat | A complete multi-user chat application: agents, Model Context Protocol tools, artifacts, a code interpreter, files, custom model endpoints, sign-in through OAuth2, SAML or LDAP | MIT | **Chosen.** Permissive, and it already has every feature asked for |
| assistant-ui | A React library: chat primitives and a runtime, with adapters for several agent back ends | MIT | The alternative if the Playground were built from the kit's own components. Not chosen |
| Open WebUI | A complete chat application | Its own licence since v0.6.6 (April 2025): BSD-3 plus a clause that forbids removing or replacing its branding above 50 users without an enterprise licence | Ruled out: it could not carry the ThinkLatent look |
| LobeChat | A complete chat application | The LobeHub Community License; a derivative work that is distributed needs a commercial licence (read on Open WebUI's comparison page, a competitor's, so to be confirmed) | Ruled out until its licence is read first hand |

Not looked at in this pass: Chainlit, Hugging Face Chat UI, the Vercel AI SDK's own components.

## What Jithin decided (D-308)

1. LibreChat is the base. It is part of the portal, not an app beside it: it carries the ThinkLatent look and is reached from a button at the top of every page ("Try TLM").
2. Every LibreChat feature is there on day one: advanced prompting, agents with tools, artifacts, files.
3. A person may add any connector (tool server) of their own.

Standing from D-307: open to everyone at the Enterprise; one model at a time; sessions private to the person and kept 30 days; no client data, with a check on what is pasted.

## What this means for the build

- LibreChat is an application of its own: a React client, a Node server, MongoDB, a search index, and separate services for files and for running code. "Part of the portal" means its client is restyled with the ThinkLatent tokens and mounted inside the portal's shell, its server runs behind the portal's sign-in, and its model list is the TLM endpoints through Relay (it accepts any OpenAI-compatible endpoint).
- Its client does not use the design kit's components. The portal's rule is kit components only, so this needs a recorded exception, like the one for hand-built board pieces (D-247). For the design-kit session (TL-013) to weigh; not decided here.
- Its store keeps every conversation. The 30-day rule, "only the person sees it" and "counted without its text" have to be set up in its configuration or added; none is confirmed yet.
- LibreChat was acquired by ClickHouse; the project says it stays open source. A fork that restyles the client has to be kept in step with a fast-moving upstream.

## Where this is thin

- **"Any connector a person adds" and "no client data" pull against each other.** The check stops client data that is pasted. A connector a person adds can bring such data in, or carry text out, without passing that check. This is the largest open risk in the Playground.
- **A fork is a standing cost.** Every upstream release has to be merged under a restyled client.
- **The demonstration is only as good as the model's tool use.** Core's run for choosing the right tool is still training. An agent demo on a model that picks tools badly will show the opposite of what is intended.
- **Nothing here was run.** Features and licences are from the projects' own pages and package registries.

## Hypothesis

Confirmed if: a TLM behind LibreChat completes a three-step agent task with two tools, in the ThinkLatent look, signed in through the portal, within four weeks of starting. Refuted if: the restyle needs changes in more than a few dozen client files, or the 30-day and privacy rules cannot be met without changing LibreChat's server.

## Sources

- LibreChat, features and licence: https://github.com/danny-avila/librechat · https://www.mintlify.com/danny-avila/librechat · https://openapps.pro/apps/librechat · https://www.everydev.ai/developers/librechat
- Open WebUI licence: https://docs.openwebui.com/license/ · https://wz-it.com/en/blog/open-webui-license-branding-business/
- LobeChat licence, as described by Open WebUI: https://docs.openwebui.com/alternatives/lobehub
- assistant-ui: https://assistant-ui.com/ · https://www.npmjs.com/package/@assistant-ui/react
