#!/usr/bin/env bash
# Build the Databricks Cheatsheet PDF from cheatsheet.html with headless Chrome.
# Usage: ./build.sh [output.pdf]
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
OUT="${1:-$HERE/../starter-journey/static/pdfs/Databricks-Cheatsheet-2026-Ready.pdf}"

CHROME="${CHROME:-}"
if [[ -z "$CHROME" ]]; then
  for c in \
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    "$(command -v google-chrome || true)" \
    "$(command -v chromium || true)" \
    "$(command -v chromium-browser || true)"; do
    if [[ -n "$c" && -x "$c" ]]; then CHROME="$c"; break; fi
  done
fi
if [[ -z "$CHROME" ]]; then
  echo "Chrome or Chromium not found. Set CHROME=/path/to/chrome." >&2
  exit 1
fi

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=10000 \
  --print-to-pdf="$OUT" "file://$HERE/cheatsheet.html" 2>/dev/null

echo "Wrote $OUT"
