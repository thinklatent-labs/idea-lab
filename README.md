# Idea Lab

Vanguard VI's nursery for initiatives: the register, one doc per idea, the dashboard, and the sync that keeps them together. Private to the thinklatent-labs organisation.

- Start with `CLAUDE.md`: how the lab works and the rules every session follows.
- `register/register.json` is the source of truth. `ideas/` and `docs/` are rendered from it.
- `scripts/lab-sync.sh` validates, snapshots, renders, builds, commits and pushes. Nightly via GitHub Actions; on demand from the Claude session.
- Read-only on a laptop: `git pull`, then open `docs/index.html` or `ideas/*.md`.

Dashboard development: `cd dashboard && npm install --legacy-peer-deps && npm test && npm run dev`.
