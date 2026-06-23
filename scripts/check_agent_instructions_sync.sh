#!/usr/bin/env bash
# Ensure CLAUDE.md and .cursorrules stay byte-identical.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if ! diff -q CLAUDE.md .cursorrules >/dev/null 2>&1; then
  echo "ERROR: CLAUDE.md and .cursorrules differ. Update both in the same commit."
  diff -u CLAUDE.md .cursorrules || true
  exit 1
fi

echo "CLAUDE.md and .cursorrules are in sync."
