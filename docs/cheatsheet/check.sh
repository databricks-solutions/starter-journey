#!/usr/bin/env bash
# Report slides where content runs into the footer.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
"$CHROME" --headless=new --disable-gpu --window-size=1200,1500 --virtual-time-budget=10000 \
  --dump-dom "file://$HERE/cheatsheet.html#check" 2>/dev/null \
  | sed -n '/<pre id="layout-report">/,/<\/pre>/p' | sed 's/<[^>]*>//g'
