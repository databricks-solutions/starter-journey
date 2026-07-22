#!/usr/bin/env python3
"""Fail if any journey section was last updated more than STALE_DAYS ago."""

from __future__ import annotations

import argparse
import csv
import sys
from datetime import date, timedelta
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_CSV = REPO_ROOT / "docs" / "starter-journey" / "section-freshness.csv"

# Top-level sidebar sections (must match sidebars.ts labels and section-freshness.csv).
REQUIRED_SECTIONS: tuple[str, ...] = (
    "1. Get started",
    "2. Before you start",
    "3. Infra setup",
    "4. Cost monitoring",
    "5. Governance strategy",
    "6. Access your data",
    "7. Build the first ETL pipeline",
    "8. Query and explore",
    "9. Unified analytics",
    "10. Predictive analytics",
    "11. Agents",
    "12. Orchestration using jobs",
    "13. Data access control",
    "14. CI/CD and DevOps",
)

STALE_DAYS = 60


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--csv",
        type=Path,
        default=DEFAULT_CSV,
        help="Path to section-freshness.csv",
    )
    parser.add_argument(
        "--report-file",
        type=Path,
        help="Write a markdown report to this path (for CI issue bodies)",
    )
    parser.add_argument(
        "--today",
        type=str,
        help="Override today's date (YYYY-MM-DD) for tests",
    )
    return parser.parse_args()


def load_updates(csv_path: Path) -> dict[str, date]:
    if not csv_path.is_file():
        raise SystemExit(f"CSV not found: {csv_path}")

    updates: dict[str, date] = {}
    with csv_path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames != ["section_name", "last_update"]:
            raise SystemExit(
                f"CSV must have columns section_name,last_update; got {reader.fieldnames}"
            )
        for row in reader:
            name = (row.get("section_name") or "").strip()
            raw_date = (row.get("last_update") or "").strip()
            if not name:
                continue
            if name in updates:
                raise SystemExit(f"Duplicate section in CSV: {name}")
            try:
                updates[name] = date.fromisoformat(raw_date)
            except ValueError as exc:
                raise SystemExit(
                    f"Invalid date for {name!r}: {raw_date!r} (use YYYY-MM-DD)"
                ) from exc
    return updates


def check_freshness(
    updates: dict[str, date], today: date
) -> tuple[list[str], list[tuple[str, date, int]]]:
    errors: list[str] = []
    stale: list[tuple[str, date, int]] = []

    missing = [s for s in REQUIRED_SECTIONS if s not in updates]
    extra = [s for s in updates if s not in REQUIRED_SECTIONS]
    if missing:
        errors.append(f"Missing sections in CSV: {', '.join(missing)}")
    if extra:
        errors.append(f"Unknown sections in CSV: {', '.join(extra)}")

    threshold = timedelta(days=STALE_DAYS)
    for section in REQUIRED_SECTIONS:
        if section not in updates:
            continue
        last = updates[section]
        age = today - last
        if age > threshold:
            stale.append((section, last, age.days))

    stale.sort(key=lambda item: item[2], reverse=True)
    return errors, stale


def format_report(
    errors: list[str], stale: list[tuple[str, date, int]], today: date
) -> str:
    lines = [
        "## Stale documentation sections",
        "",
        f"Checked on **{today.isoformat()}**. Sections must be updated at least "
        f"every **{STALE_DAYS} days** (`docs/starter-journey/section-freshness.csv`).",
        "",
    ]
    if errors:
        lines.append("### Configuration errors")
        lines.append("")
        for err in errors:
            lines.append(f"- {err}")
        lines.append("")

    if stale:
        lines.append("### Sections past the freshness threshold")
        lines.append("")
        for section, last, days in stale:
            lines.append(
                f"- **{section}**: last updated {last.isoformat()} ({days} days ago)"
            )
        lines.append("")
        lines.append(
            "Update the relevant docs, then set `last_update` for that section in "
            "`section-freshness.csv`."
        )
    return "\n".join(lines)


def main() -> int:
    args = parse_args()
    today = date.fromisoformat(args.today) if args.today else date.today()

    try:
        updates = load_updates(args.csv)
    except SystemExit as exc:
        print(exc, file=sys.stderr)
        return 1

    errors, stale = check_freshness(updates, today)
    report = format_report(errors, stale, today)

    if args.report_file:
        args.report_file.write_text(report + "\n", encoding="utf-8")

    if errors:
        print("Section freshness check failed (configuration):", file=sys.stderr)
        for err in errors:
            print(f"  - {err}", file=sys.stderr)
        return 1

    if stale:
        print("Section freshness check failed (stale sections):", file=sys.stderr)
        for section, last, days in stale:
            print(
                f"  - {section}: last updated {last.isoformat()} ({days} days ago)",
                file=sys.stderr,
            )
        print(
            f"\nUpdate docs and bump dates in {args.csv.relative_to(REPO_ROOT)}.",
            file=sys.stderr,
        )
        return 1

    print(f"All {len(REQUIRED_SECTIONS)} sections are within {STALE_DAYS} days.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
