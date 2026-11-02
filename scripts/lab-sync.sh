#!/usr/bin/env bash
# The lab's sync, one command for every writer: validate the register, snapshot it, render the idea
# docs, rebuild the dashboard, commit and push. Runs from the Claude session (the writer) and from
# GitHub Actions nightly. Read-only on a laptop: `git pull` is all that is needed there.
#
#   scripts/lab-sync.sh                 validate, snapshot if changed, render, build, commit, push
#   scripts/lab-sync.sh --no-push       everything but the push (local check)
#   scripts/lab-sync.sh --message "..." custom commit message
set -euo pipefail
cd "$(dirname "$0")/.."

PUSH=1
MSG=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --no-push) PUSH=0; shift ;;
    --message|-m) MSG="$2"; shift 2 ;;
    *) echo "unknown option $1" >&2; exit 2 ;;
  esac
done

echo "1/5 validate"
node dashboard/scripts/validate-register.mjs register/register.json

echo "2/5 snapshot"
node scripts/snapshot.mjs

echo "3/5 render idea docs"
node scripts/render-ideas.mjs

echo "4/5 build dashboard"
( cd dashboard && npm ci --no-audit --no-fund --legacy-peer-deps >/dev/null 2>&1 || npm install --no-audit --no-fund --legacy-peer-deps >/dev/null 2>&1; npm run -s build )
mkdir -p docs
cp dashboard/dist/index.html docs/index.html
rm -rf docs/data && cp -r dashboard/public/data docs/data
touch docs/.nojekyll

echo "5/5 commit and push"
git add -A
if git diff --cached --quiet; then
  echo "nothing to commit"
else
  ASOF=$(node -e "console.log(JSON.parse(require('fs').readFileSync('register/register.json','utf8')).asOf)")
  REV=$(node -e "console.log(JSON.parse(require('fs').readFileSync('register/register.json','utf8')).source.registerRev)")
  git commit -q -m "${MSG:-lab sync: register rev ${REV}, as of ${ASOF}}"
  echo "committed: ${MSG:-lab sync: register rev ${REV}, as of ${ASOF}}"
fi
if [[ $PUSH -eq 1 ]]; then
  BRANCH=$(git rev-parse --abbrev-ref HEAD)
  git push -q origin "$BRANCH"
  echo "pushed to origin/$BRANCH"
else
  echo "push skipped"
fi
