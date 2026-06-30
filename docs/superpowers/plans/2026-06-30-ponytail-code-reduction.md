# Ponytail code reduction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove verified-dead and over-engineered code from starter-journey without changing what the site builds or renders.

**Architecture:** Three surgical deletion tasks grouped by kind (dead files, dead TS code, dead CSS). Each task ends by confirming the production build still succeeds, then commits.

**Tech Stack:** Docusaurus 3, TypeScript/React, CSS modules + global CSS.

## Global Constraints

- Verification gate per task: `npm run build` from `docs/starter-journey/` must end with `[SUCCESS] Generated static files in "build".`. The only acceptable warnings are the pre-existing broken-anchor warnings on `10-predictive-analytics/batch-inference` (`#spark-udf`, `#pandas-single-node`, `#pandas-udf-for-images`). No new warnings or errors.
- `tsc` is NOT a gate: the baseline already fails on a pre-existing `JSX.Element` error in `Button/index.tsx`. Do not attempt to fix it; out of scope.
- Behavior-preserving: no visible or behavioral change to the published site.
- Do not touch `node_modules/`, `build/`, `.docusaurus/`.
- Commit only on this branch: `feature/ponytail-superpowers-rewrite`. End commit messages with `Co-authored-by: Isaac`.
- All `npm` commands run from `docs/starter-journey/`.

---

### Task 1: Delete dead page files

**Files:**
- Delete: `docs/starter-journey/src/pages/markdown-page.md`
- Delete: `docs/starter-journey/src/pages/journey-sandbox.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing. Both files have zero inbound references (verified: `journey-sandbox` and `markdown-page` are referenced nowhere in `src`, `docs`, `blog`, or config).

- [ ] **Step 1: Confirm zero references**

Run: `cd docs/starter-journey && grep -rn "journey-sandbox\|markdown-page" src docs blog sidebars.ts docusaurus.config.ts`
Expected: no output.

- [ ] **Step 2: Delete the files**

```bash
cd docs/starter-journey
git rm src/pages/markdown-page.md src/pages/journey-sandbox.tsx
```

- [ ] **Step 3: Build**

Run: `cd docs/starter-journey && npm run build`
Expected: ends with `[SUCCESS] Generated static files`. Same warning set as baseline.

- [ ] **Step 4: Commit**

```bash
cd /Users/ivan.calvo/Documents/repos/starter-journey
git commit -m "chore: remove dead page files (markdown-page, journey-sandbox)

Co-authored-by: Isaac"
```

---

### Task 2: Remove dead TypeScript code

**Files:**
- Modify: `docs/starter-journey/src/components/StarterJourneyProgress/icons.tsx` — remove 4 unused icon entries
- Modify: `docs/starter-journey/src/pages/index.tsx:2` — remove unused `clsx` import
- Modify: `docs/starter-journey/src/components/HomepageFeatures/index.tsx:2,44` — drop pointless `clsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `BLOCK_ICONS` keeps all keys referenced by `JOURNEY_BLOCKS` (server, dollar, shield, cloud-download, activity, search, grid, cpu, bot, settings, key, git-branch). The 4 removed keys (`brain`, `dashboard`, `database`, `tag`) are referenced by no block.

- [ ] **Step 1: Remove unused icons from `icons.tsx`**

Delete these four entries from the `BLOCK_ICONS` object (the full `key: ( <svg>...</svg> ),` blocks): `tag`, `database`, `dashboard`, `brain`. Leave the other 12 untouched. After editing, the object opens with `server` and the remaining keys in their current order minus those four.

- [ ] **Step 2: Verify icon keys match blocks**

Run:
```bash
cd docs/starter-journey
comm -23 \
  <(grep -oE "icon: \"[a-z-]+\"" src/components/StarterJourneyProgress/journey-blocks.ts | sed 's/icon: "//;s/"//' | sort -u) \
  <(grep -oE "^  '?[a-z-]+'?:" src/components/StarterJourneyProgress/icons.tsx | tr -d " :'" | grep -vE "^(fill|stroke)$" | sort -u)
```
Expected: no output (every icon a block needs still exists).

- [ ] **Step 3: Remove unused `clsx` import from `index.tsx`**

Delete line 2 (`import clsx from 'clsx';`). `clsx` is imported but never called in this file.

- [ ] **Step 4: Drop pointless `clsx` in `HomepageFeatures/index.tsx`**

Change `className={clsx('col col--4')}` to `className="col col--4"`, then delete the now-unused `import clsx from 'clsx';` (line 2).

- [ ] **Step 5: Build**

Run: `cd docs/starter-journey && npm run build`
Expected: ends with `[SUCCESS] Generated static files`. Same warning set as baseline.

- [ ] **Step 6: Commit**

```bash
cd /Users/ivan.calvo/Documents/repos/starter-journey
git commit -am "chore: remove dead icons and unused clsx usage

Co-authored-by: Isaac"
```

---

### Task 3: Remove dead CSS

**Files:**
- Modify: `docs/starter-journey/src/components/HomepageFeatures/styles.module.css` — remove `.sectionTitle`, `.featureSvg`
- Modify: `docs/starter-journey/src/css/custom.css` — remove `.button--secondary` (+hover), `.font-mono`, `.font-sans`, and `.header-github-link` selector halves
- Modify: `docs/starter-journey/src/css/journey-progress-tokens.css` — remove `--sj-bg`, `--sj-surface`, `--sj-completed-tag-bg` (both themes)

**Interfaces:**
- Consumes: nothing.
- Produces: nothing. All removed selectors confirmed absent from built HTML (`font-mono`, `font-sans`, `button--secondary`, `header-github-link` = 0 occurrences in `build/**/*.html`); the removed tokens are consumed by no `var(--sj-...)`. `.navbar-item-github` (the live GitHub-link class) is preserved.

- [ ] **Step 1: HomepageFeatures module CSS**

Delete the `.sectionTitle { ... }` rule (text-align/font-size/font-weight/margin-bottom) and the `.featureSvg { ... }` rule (height/width 200px). Both are unreferenced by `HomepageFeatures/index.tsx`.

- [ ] **Step 2: `custom.css` — unused button + font utilities**

Delete the `.button--secondary { ... }` and `.button--secondary:hover { ... }` rules (the BUTTONS section, keep `.button` and `.button--primary`). Delete the FONT UTILITIES section: `.font-mono { ... }` and `.font-sans { ... }` (and the section comment banner).

- [ ] **Step 3: `custom.css` — dead GitHub-link selector halves**

In the GITHUB ICON section, remove the `.header-github-link...` halves from each grouped selector, keeping the `.navbar-item-github...` halves:
- `.header-github-link::before,` → remove that line, keep `.navbar-item-github::before { ... }`
- `.header-github-link:hover::before,` → remove, keep `.navbar-item-github:hover::before { ... }`
- `.header-github-link.navbar__link,` → remove, keep `.navbar-item-github.navbar__link { ... }`

- [ ] **Step 4: `journey-progress-tokens.css` — unused tokens**

Remove these three declarations from BOTH the `:root` block and the `[data-theme='dark']` block: `--sj-bg`, `--sj-surface`, `--sj-completed-tag-bg`. (6 lines total.)

- [ ] **Step 5: Verify no remaining references**

Run:
```bash
cd docs/starter-journey
grep -rn "font-mono\|font-sans\|button--secondary\|header-github-link\|sectionTitle\|featureSvg\|--sj-bg\|--sj-surface\|--sj-completed-tag-bg" src
```
Expected: no output (all definitions gone, no references remain).

- [ ] **Step 6: Build**

Run: `cd docs/starter-journey && npm run build`
Expected: ends with `[SUCCESS] Generated static files`. Same warning set as baseline.

- [ ] **Step 7: Commit**

```bash
cd /Users/ivan.calvo/Documents/repos/starter-journey
git commit -am "chore: remove dead CSS rules and unused theme tokens

Co-authored-by: Isaac"
```

---

## Final verification (after all tasks)

- [ ] `npm run build` green with only the baseline broken-anchor warnings.
- [ ] Spot-check rendering: homepage (hero animation + 3 feature cards), and a docs page with `<StarterJourneyProgress>` (e.g. `/docs/04-cost-monitoring/`) — progress component and feature cards render unchanged. GitHub navbar icon still visible.
- [ ] Run `ponytail-gain` for the LOC/files scoreboard.
