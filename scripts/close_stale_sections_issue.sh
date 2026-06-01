#!/usr/bin/env bash
# Close the open stale-sections issue when all sections are fresh.
set -euo pipefail

TITLE="Stale documentation sections"
LABEL="section-freshness"
REPO="${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}"

issue_num="$(
  gh issue list --repo "$REPO" --label "$LABEL" --state open --limit 100 \
    --json number,title -q '.[] | select(.title=="'"$TITLE"'") | .number' | head -n1
)"

if [[ -n "$issue_num" ]]; then
  gh issue close "$issue_num" --repo "$REPO" --reason completed
  echo "Closed issue #${issue_num}"
else
  echo "No open stale-sections issue to close"
fi
