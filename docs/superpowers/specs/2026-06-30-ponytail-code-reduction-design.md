# Ponytail + Superpowers code reduction — starter-journey

**Date:** 2026-06-30
**Branch:** `feature/ponytail-superpowers-rewrite`
**Status:** Approved, in execution

## Goal

Remove dead, duplicated, and over-engineered code from the starter-journey repo
without changing what the site builds or renders. `ponytail-review` finds the
targets; the superpowers brainstorm → plan → execute flow provides the discipline.

## Decisions (from brainstorming)

- **Scope:** Delegated to `ponytail-review`. It scans the custom code and ranks
  reduction opportunities; the human confirms the accepted set.
- **Cut bar:** Behavior-preserving (ponytail "full"). The site must build and
  render identically. Cut dead code, duplication, over-engineering, unused CSS.
  No visible or behavioral change.
- **Verification:** `npm run build` (the gate CI uses) must stay green, plus a
  spot-check of the interactive components when a cut touches them.

## Baseline (captured 2026-06-30)

- **Build:** GREEN (exit 0). Pre-existing non-fatal broken-anchor warnings on
  `10-predictive-analytics/batch-inference`. `onBrokenAnchors` is not `throw`.
- **Typecheck (`tsc`):** RED — pre-existing `JSX.Element` namespace error in
  `src/components/Button/index.tsx`. CI does NOT run `tsc` (it runs
  `docusaurus build`, which compiles via Babel), so this does not block CI.
  Because the baseline is already red, `tsc` is not a usable pass/fail gate; the
  build is the gate. Fixing this error is a candidate cut, not a requirement.
- **Custom LOC:** 1840 (`src/**` `.ts`/`.tsx`/`.css`).

## Stages

1. **Discovery** — Run `ponytail-review` over `docs/starter-journey/src/**`,
   `sidebars.ts`, `docusaurus.config.ts`, and `scripts/**`. Output: a ranked
   findings inventory — `file:line`, what to cut, why (yagni/dead/dup), estimated
   LOC saved, risk flag. MDX docs are included only where structural duplication
   is flagged (repeated snippets), never prose edits.
2. **Scoping gate** — Human accepts/rejects each finding. Accepted set = locked
   scope.
3. **Plan** — `writing-plans` turns the accepted findings into one implementation
   plan: ordered tasks, each task one coherent cut with its own verification step.
4. **Execute** — Work the plan task-by-task. Per task: make the cut, run
   `npm run build` (must stay green), spot-check touched interactive components
   (`StarterJourneyProgress`, `HeaderAnimation`, homepage).
5. **Scoreboard** — `ponytail-gain` reports total LOC/files removed.

## Verification bar (every cut)

- `npm run build` stays green (no new broken links; same warning set as baseline).
- Touched interactive components render unchanged (spot-check).
- No visible or behavioral change to the published site.

## Constraints / out of scope

- No prose rewriting of docs content (separate humanizer concern).
- Do not touch `node_modules/`, `build/`, `.docusaurus/`.
- Keep `CLAUDE.md` and `.cursorrules` identical if either is touched (CI enforces
  via `scripts/check_agent_instructions_sync.sh`).
- Bump `section-freshness.csv` only if a docs section's reader-facing content
  meaningfully changes (not expected for pure code cuts).

## Deliverable

One PR to `main`: accepted reductions, build green, plus a `ponytail-gain`
summary of LOC/files removed.

## Honest expectation

The `src/` code is already fairly lean (~1840 LOC; `StarterJourneyProgress` is
tight). Realistic wins are unused CSS in `custom.css` (510 lines) and
`styles.module.css` (347 lines) and small dead helpers. This is a cleanup, not a
dramatic rewrite.
