# Changelog: Starter Journey Progress component

Handoff notes for the `StarterJourneyProgress` work. Written for a future agentic session picking this up cold. Last updated 2026-06-25.

## TL;DR

A reusable React component that visualizes a reader's position in the Starter Journey (completed / current / pending blocks, with a 3-column fork for the DA / ML / GenAI tracks). It is a DOM/CSS port of the Remotion composition `JourneyProgressPreview`. Built and committed on branch **`feature/blocks-progress`** (local only, not pushed). A demo page is live as **sidebar section 15**.

- **Repo:** `/Users/ivan.calvo/Documents/repos/starter-journey`
- **Docusaurus site root (run all `npm` here):** `docs/starter-journey/`
- **Branch:** `feature/blocks-progress` (NOT pushed to origin)
- **Reference source (read-only, different repo):** `/Users/ivan.calvo/Documents/repos/remotion-framework/src/previews/` (`JourneyProgressPreview.tsx`, `journey-blocks.ts`, `components/branding/{light,dark}-theme.ts`). The component is a faithful port of these; the rendered `.mp4`s in `remotion-framework/out/Starter-Journey/` are the visual reference.

## What exists (files)

All paths relative to `docs/starter-journey/`:

| File | Purpose |
|---|---|
| `src/components/StarterJourneyProgress/journey-blocks.ts` | Block data + types (`ForkColumn`, `JourneyBlock`, `ProgressState`) + `getBlockState()`. Pure TS, no React. |
| `src/components/StarterJourneyProgress/icons.tsx` | `BLOCK_ICONS` map (inline SVGs, `stroke="currentColor"`). |
| `src/components/StarterJourneyProgress/styles.module.css` | Layout (responsive flex/grid), state styling via CSS vars, entrance + breathing-glow animations, reduced-motion guard, fork-specific compact sizing. |
| `src/components/StarterJourneyProgress/index.tsx` | The component. Default export `StarterJourneyProgress`; named export `StarterJourneyProgressProps`. |
| `src/css/journey-progress-tokens.css` | Theme tokens as CSS custom properties (`--sj-*`); light on `:root`, dark on `[data-theme='dark']`. Registered in `docusaurus.config.ts` `theme.customCss` array. |
| `src/pages/journey-sandbox.tsx` | Standalone sandbox page at route `/journey-sandbox` (multi-state preview, no nav link). |
| `docs/15-journey-progress-demo/index.mdx` | Demo doc page (sidebar section 15) importing and rendering the component in several states. |
| `sidebars.ts` | Section 15 entry added after section 14. |
| `docs/superpowers/plans/2026-06-25-starter-journey-progress-component.md` | The original implementation plan. |

## Component API

```tsx
import StarterJourneyProgress from '@site/src/components/StarterJourneyProgress';

<StarterJourneyProgress
  currentLevel={4}              // 0..9, default 1
  currentForkColumn="ml"        // 'da' | 'ml' | 'genai' — only meaningful on fork levels 6 & 7
  showTitle={true}             // default true
  showLegend={true}            // default true
  title="Starter Journey Progress"
  className={undefined}
/>
```

Progress is **prop-driven storytelling** — there is NO per-user state, no localStorage. `getBlockState` derives completed/current/pending from `currentLevel` + `currentForkColumn`. Theme follows the site light/dark toggle automatically via CSS variables (no JS theme detection, SSR-safe).

## The journey model (IMPORTANT: 10 levels, not 14)

The component models the **Remotion 10-level forked journey**, NOT the flat 14-item markdown "Journey checklist" in the docs. Levels:

- 0 Infra Setup · 1 Cost Monitoring · 2 Data Governance Strategy · 3 Access Your Data · 4 Build the First Pipeline · 5 Automation & Orchestration
- 6 (fork) Business Semantics (da) / Feature Store (ml) / Document Intelligence (genai)
- 7 (fork) Unified Analytics (da) / Predictive Analytics (ml) / Agents (genai)
- 8 Data Access Control · 9 CI/CD and DevOps

**Display order:** level 0 (Infra Setup) renders at the BOTTOM as the foundation, level 9 (CI/CD) at the TOP (via `flex-direction: column-reverse` on `.stack`).

⚠️ **Unresolved mapping gap.** The 14 sidebar sections don't map 1:1 onto these 10 levels. Sidebar sections with NO corresponding block: *Get started, Before you start, Query and explore, Databricks AI/BI*. The Remotion fork blocks (Feature Store, Document Intelligence, Agents, Unified Analytics, Predictive Analytics) aren't all sidebar sections either. A suggested mapping table is in the plan's "Out of scope" section. This must be resolved before replacing the per-page markdown `## Journey checklist` blocks with the component.

## Verification reality (read before you build)

- `npm run typecheck` has ONE **pre-existing, out-of-scope** error: `src/components/Button/index.tsx(15,18) TS2503 Cannot find namespace 'JSX'` (React 19 typing; predates this work, last touched in `f27c215`). Do not "fix" it as part of this feature. The component intentionally does NOT annotate return types as `JSX.Element` to avoid adding to this error class.
- **The real gate is `npm run build`** (run from `docs/starter-journey/`) — it must end with `[SUCCESS] Generated static files`. Pre-existing broken-anchor warnings on `14-mlops/batch-inference` are not errors.
- No test runner exists in this project (no jest/vitest/ts-node, no `test` script) — by design. Verification = typecheck (only the Button error allowed) + build + browser visual check.
- ⚠️ Do NOT run `docusaurus serve --build` while another build is in flight — concurrent builds clobber `build/`. To preview a production build: `npm run build` once, then `npx docusaurus serve --port <PORT>` (no `--build`).

## How to view it

```bash
cd /Users/ivan.calvo/Documents/repos/starter-journey/docs/starter-journey
git checkout feature/blocks-progress
npm run clear && npm run start          # restart if a server predated these files
```
- Section 15 in the left sidebar, or directly: `http://localhost:3000/starter-journey/docs/15-journey-progress-demo/`
- Standalone sandbox (unlinked): `http://localhost:3000/starter-journey/journey-sandbox`

## Commit history (branch `feature/blocks-progress`, base = `main` @ 0df7c95)

```
5f5c054 fix(journey): shrink fork block contents to keep checks aligned
eb84855 fix(journey): foundation-at-bottom order and align fork rows
39a4e53 demo(journey): add section 15 demo page rendering StarterJourneyProgress
5711868 style(journey): remove em dashes per repo anti-slop rule
dae842e feat(journey): add progress component sandbox page
784dc3e feat(journey): add StarterJourneyProgress component
ed113f2 feat(journey): add progress component stylesheet
7999982 feat(journey): add inline svg icon set
659819f feat(journey): add progress theme tokens and register global css
ab43f47 feat(journey): add progress block data and state logic
8ffbfe0 docs(journey): add progress component implementation plan
```

## Timeline of what happened

1. **Plan + build (subagent-driven).** Wrote the implementation plan, then executed it as 6 tasks (data → tokens → icons → stylesheet → component → sandbox), each with a fresh implementer + reviewer. All tasks passed review. Final whole-branch review: "Ready to merge."
2. **Repo anti-slop fix.** Removed em/en dashes (repo CLAUDE.md rule: "No em dashes or en dashes. Zero.") from the new files (`5711868`).
3. **"Can't see the changes" investigation.** Confirmed the work landed in starter-journey (NOT the remotion repo, which was only read). Causes of the confusion: nested path (`docs/starter-journey/src/...`), branch is local-only, and the sandbox page had no nav link. Verified the page renders by grepping the built HTML.
4. **Section 15 demo page** added so the component shows up in normal sidebar navigation (`39a4e53`).
5. **Remediation round 1** (`eb84855`): foundation order flipped (Infra Setup bottom / CI/CD top) and fork rows aligned to full-width rows (`min-width: 0` fix for CSS-grid overflow).
6. **Remediation round 2** (`5f5c054`): fork-block contents shrunk (icon 18px, label 0.72rem, smaller tag/check, `overflow-wrap: break-word`) so labels/tags/checks stay inside the fork blocks and align. Verified in-browser via screenshots — fork checks now sit inside and "Document Intelligence" wraps as whole words.

## Current state / known issues

- ✅ Component built, builds clean, visually verified light + dark and across states.
- ⚠️ **Uncommitted working-tree changes NOT made by this work** (left untouched; likely concurrent user edits):
  - `docs/15-journey-progress-demo/index.mdx` — an added `## WS` section rendering `currentLevel={0}` (test edit).
  - `package.json` + `package-lock.json` — `@playwright/test` added and `@docusaurus/module-type-aliases` bumped 3.9.2 → 3.10.0. If unintentional, revert with `git checkout package.json package-lock.json`.
- ⚠️ Branch `feature/blocks-progress` is **local only** — `git push -u origin feature/blocks-progress` to share.
- On mobile widths the 3-column fork stays 3 columns (cramped but legible); labels wrap. Not yet stress-tested below ~390px.

## Deferred / next steps (not done)

1. **Replace the markdown `## Journey checklist` blocks** on the 15 doc pages that have them with `<StarterJourneyProgress currentLevel={…} currentForkColumn={…} />`. Requires:
   - Resolving the 14↔10 mapping gap above.
   - Registering the component globally for MDX via `src/theme/MDXComponents.tsx` (so pages don't each need an import).
2. **Decide the fate of section 15 / the sandbox.** They are demo/preview artifacts. If section 15 is kept permanently, add it to `section-freshness.csv` + `REQUIRED_SECTIONS` in `scripts/check_section_freshness.py` (currently it's ignored by the freshness CI). To remove the demo: revert `39a4e53`.
3. Optionally push the branch and open a PR (CI runs `docusaurus build`).
