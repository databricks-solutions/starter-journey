#!/usr/bin/env bash
# Create or update the stale-sections GitHub issue and @mention repo contributors.
set -euo pipefail

REPORT_FILE="${1:-stale-sections-report.md}"
TITLE="Stale documentation sections"
LABEL="section-freshness"
REPO="${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}"

run_url="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}"

if [[ -f "$REPORT_FILE" ]]; then
  report="$(<"$REPORT_FILE")"
else
  report="Section freshness check failed. See workflow logs."
fi

logins=()
while IFS= read -r login; do
  [[ -n "$login" ]] && logins+=("$login")
done < <(
  gh api "/repos/${REPO}/contributors" --paginate \
    -q '.[] | select(.type=="User") | .login' | sort -u
)

if ((${#logins[@]})); then
  mentions="$(printf '@%s ' "${logins[@]}")"
  notify_line="**Notifying repo contributors:** ${mentions}"
else
  notify_line="_No human contributors returned by the API; watch this issue or check Actions._"
fi

issue_body="${report}

---

${notify_line}
"

comment_body="Section freshness check failed ([workflow run](${run_url})).

${report}

---

${notify_line}
"

gh label create "$LABEL" --repo "$REPO" --color d93f0b \
  --description "Journey section past freshness threshold" 2>/dev/null || true

issue_num="$(
  gh issue list --repo "$REPO" --label "$LABEL" --state open --limit 100 \
    --json number,title -q '.[] | select(.title=="'"$TITLE"'") | .number' | head -n1
)"

tmp_body="$(mktemp)"
tmp_comment="$(mktemp)"
trap 'rm -f "$tmp_body" "$tmp_comment"' EXIT
printf '%s' "$issue_body" >"$tmp_body"
printf '%s' "$comment_body" >"$tmp_comment"

if [[ -n "$issue_num" ]]; then
  gh issue edit "$issue_num" --repo "$REPO" --body-file "$tmp_body"
  gh issue comment "$issue_num" --repo "$REPO" --body-file "$tmp_comment"
  echo "Updated issue #${issue_num} and notified ${#logins[@]} contributor(s) via comment"
else
  gh issue create --repo "$REPO" --title "$TITLE" --body-file "$tmp_body" --label "$LABEL"
  echo "Created stale-sections issue and notified ${#logins[@]} contributor(s)"
fi
