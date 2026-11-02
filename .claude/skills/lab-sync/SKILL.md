---
name: lab-sync
description: Sync the Idea Lab to GitHub: validate the register, snapshot it, render the idea docs, rebuild the dashboard, commit and push. Use at the end of every lab session or when Jithin says sync, push, or publish the lab.
---

# Lab sync

Run from the repository root:

    scripts/lab-sync.sh

What it does, in order: validates `register/register.json` against the contract and the referential checks; writes a dated snapshot to `register/history/` when `asOf` is newer than the latest one; renders `ideas/*.md` from the register (frontmatter and the generated block only; prose under Notes is kept); rebuilds the dashboard into `docs/`; commits everything with a message naming the register revision and as-of stamp; pushes the current branch.

Before running it, make sure the session's changes are in the register: the row, the decision line, the Sessions row with a health call, and a bumped `asOf` and `source.registerRev`. If validation fails, fix the register, never the validator.

After a push on `main`, the GitHub Action runs the same script once more (it is idempotent) and, nightly, keeps the snapshots coming. To republish the claude.ai artifact, publish `docs/index.html` with `docs/data/**` as supporting files to the existing artifact URL.

Options: `--no-push` for a local check; `--message "..."` for a custom commit message.
