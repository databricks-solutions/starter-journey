# Starter Journey Progress Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable Docusaurus React component that renders the "Starter Journey" progress visual (a forked, multi-state block tracker) to give readers a sense of progress and commitment, plus a sandbox page to preview it.

**Architecture:** Port the existing Remotion composition `JourneyProgressPreview.tsx` (from the `remotion-framework` repo) into a self-contained Docusaurus component. The block data/state logic ports verbatim (pure TS). The visual layer is re-implemented for the DOM: absolute pixel layout → responsive flex/grid, Remotion `useCurrentFrame` animation → pure CSS keyframes, and the dual light/dark theme → CSS custom properties keyed on Docusaurus's `[data-theme='dark']` selector (so it auto-follows the site theme toggle, SSR-safe). Progress is **prop-driven** (`currentLevel` + `currentForkColumn`) — it tells a per-page "you are here" story; there is no per-user state or localStorage.

**Tech Stack:** Docusaurus 3.9.2, React 19, TypeScript 5.9, CSS Modules + global CSS custom properties. No new dependencies.

## Global Constraints

- **Target repo:** `/Users/ivan.calvo/Documents/repos/starter-journey`. Docusaurus site root: `docs/starter-journey/`. **All component/page/css paths below are relative to `docs/starter-journey/`.**
- **Branch:** Work on `feature/blocks-progress` (already checked out). Do **not** work on `main`.
- **No new dependencies.** Use only what `package.json` already provides (React 19, clsx, Docusaurus). No Remotion runtime, no test framework, no state library.
- **No per-user state.** No `localStorage`, no `useState` persistence. Progress is purely a function of the `currentLevel`/`currentForkColumn` props.
- **Theme:** Never hardcode hex colors in the component or CSS module. All colors come from CSS custom properties defined once in `src/css/journey-progress-tokens.css` (light = `:root`, dark = `[data-theme='dark']`).
- **Accessibility:** Honor `prefers-reduced-motion: reduce` (disable animations).
- **Verification model:** This project has **no test runner** (confirmed: no `test` script, no jest/vitest/ts-node in `package.json`). Per the user's "Simplicity First" guideline, do **not** add a test framework for this visual component. Each task is verified by `npm run typecheck`, `npm run build` (Docusaurus build is strict — broken links `throw`), and browser visual inspection of the sandbox page. The `getBlockState` logic is ported verbatim from working Remotion code and is visually verified via the sandbox truth-table (Task 6).

---

## Source of truth (reference files — read, do not modify)

These live in the **`remotion-framework` repo** and are the originals being ported:

- `/Users/ivan.calvo/Documents/repos/remotion-framework/src/previews/journey-blocks.ts` — block data + `getBlockState` (port verbatim).
- `/Users/ivan.calvo/Documents/repos/remotion-framework/src/previews/JourneyProgressPreview.tsx` — layout, icons, states, glow (port the visuals).
- `/Users/ivan.calvo/Documents/repos/remotion-framework/src/components/branding/light-theme.ts` and `dark-theme.ts` — exact color tokens (port to CSS vars).

## File Structure

All paths relative to `/Users/ivan.calvo/Documents/repos/starter-journey/docs/starter-journey/`:

| File | Responsibility |
|---|---|
| `src/components/StarterJourneyProgress/journey-blocks.ts` | Block data, types (`ForkColumn`, `JourneyBlock`, `ProgressState`), and `getBlockState()`. Pure, no React. Ported verbatim. |
| `src/components/StarterJourneyProgress/icons.tsx` | `BLOCK_ICONS` map: inline SVGs stroked with `currentColor` (color comes from block state). |
| `src/css/journey-progress-tokens.css` | Global CSS custom properties for light (`:root`) and dark (`[data-theme='dark']`) progress-state palettes. |
| `src/components/StarterJourneyProgress/styles.module.css` | Component layout (responsive flex/grid), state styling via CSS vars, entrance + breathing-glow keyframes, reduced-motion guard. |
| `src/components/StarterJourneyProgress/index.tsx` | The `StarterJourneyProgress` component (default export) + `StarterJourneyProgressProps`. |
| `src/pages/journey-sandbox.tsx` | Preview page at route `/journey-sandbox` rendering a truth-table of states. |
| `docusaurus.config.ts` (modify line 65) | Register the new tokens CSS in `theme.customCss`. |

---

### Task 1: Port block data and state logic

**Files:**
- Create: `src/components/StarterJourneyProgress/journey-blocks.ts`

**Interfaces:**
- Produces: `JOURNEY_BLOCKS: JourneyBlock[]`, `MAX_LEVEL: number`, `getBlockState(block, currentLevel, currentForkColumn?): ProgressState`, and types `ForkColumn = "da" | "ml" | "genai"`, `JourneyBlock`, `ProgressState = "completed" | "current" | "pending"`. Consumed by Tasks 5 and 6.

- [ ] **Step 1: Create the file with verbatim ported content**

```typescript
// src/components/StarterJourneyProgress/journey-blocks.ts
export type ForkColumn = "da" | "ml" | "genai";

export interface JourneyBlock {
  id: string;
  label: string;
  level: number;
  /** If set, this block occupies one third of a fork row. */
  forkColumn?: ForkColumn;
  /** Track tag shown as a pill. */
  tag?: string;
  /** Key into the BLOCK_ICONS map. */
  icon: string;
}

/**
 * Blocks ordered foundation-first (index 0 = foundation, level 0).
 * Fork rows share the same `level` value.
 */
export const JOURNEY_BLOCKS: JourneyBlock[] = [
  { id: "infra-setup",         label: "Infra Setup",                level: 0, tag: "DE",    icon: "server" },
  { id: "cost-monitoring",     label: "Cost Monitoring",            level: 1, tag: "DE",    icon: "dollar" },
  { id: "data-governance",     label: "Data Governance Strategy",   level: 2, tag: "DE",    icon: "shield" },
  { id: "access-data",         label: "Access Your Data",           level: 3, tag: "DE",    icon: "cloud-download" },
  { id: "first-pipeline",      label: "Build the First Pipeline",   level: 4, tag: "DE",    icon: "pipeline" },
  { id: "automation",          label: "Automation & Orchestration", level: 5, tag: "DE",    icon: "gear" },
  // Fork row — level 6
  { id: "metric-views",        label: "Business Semantics",         level: 6, forkColumn: "da",    tag: "DA",    icon: "tag" },
  { id: "feature-store",       label: "Feature Store",              level: 6, forkColumn: "ml",    tag: "ML",    icon: "database" },
  { id: "vector-search",       label: "Document Intelligence",      level: 6, forkColumn: "genai", tag: "GenAI", icon: "search" },
  // Fork row — level 7
  { id: "aibi",                label: "Unified Analytics",          level: 7, forkColumn: "da",    tag: "DA",    icon: "dashboard" },
  { id: "mlops",               label: "Predictive Analytics",       level: 7, forkColumn: "ml",    tag: "ML",    icon: "brain" },
  { id: "agentbricks",         label: "Agents",                     level: 7, forkColumn: "genai", tag: "GenAI", icon: "bot" },
  // Full-width rows resume
  { id: "data-access-control", label: "Data Access Control",        level: 8, icon: "key" },
  { id: "cicd-devops",         label: "CI/CD and DevOps",           level: 9, icon: "git-branch" },
];

export const MAX_LEVEL = 9;

export type ProgressState = "completed" | "current" | "pending";

export function getBlockState(
  block: JourneyBlock,
  currentLevel: number,
  currentForkColumn?: ForkColumn,
): ProgressState {
  if (block.level > currentLevel) return "pending";

  if (block.level < currentLevel) {
    // Full-width blocks (no fork) are always completed if below current level
    if (!block.forkColumn) return "completed";
    // If the current level is a non-fork row, all fork blocks below are completed
    const currentIsFork = JOURNEY_BLOCKS.some(
      (b) => b.level === currentLevel && b.forkColumn,
    );
    if (!currentIsFork) return "completed";
    // Fork blocks below current level: only completed if on the active track
    if (block.forkColumn === currentForkColumn) return "completed";
    return "pending";
  }

  // Same level as current
  if (!block.forkColumn) return "current";
  if (block.forkColumn === currentForkColumn) return "current";
  return "pending";
}
```

- [ ] **Step 2: Verify it typechecks**

Run: `cd /Users/ivan.calvo/Documents/repos/starter-journey/docs/starter-journey && npm run typecheck`
Expected: PASS (exit 0), no errors referencing `journey-blocks.ts`.

- [ ] **Step 3: Commit**

```bash
cd /Users/ivan.calvo/Documents/repos/starter-journey
git add docs/starter-journey/src/components/StarterJourneyProgress/journey-blocks.ts
git commit -m "feat(journey): add progress block data and state logic"
```

---

### Task 2: Add theme color tokens as CSS custom properties

**Files:**
- Create: `src/css/journey-progress-tokens.css`
- Modify: `docusaurus.config.ts:65`

**Interfaces:**
- Produces: CSS custom properties consumed by the component's CSS module in Task 4 (`--sj-*`). Values copied exactly from `light-theme.ts` / `dark-theme.ts`.

- [ ] **Step 1: Create the tokens file**

```css
/* src/css/journey-progress-tokens.css
   Progress-state palette for <StarterJourneyProgress />.
   Light values from remotion-framework light-theme.ts; dark from dark-theme.ts. */
:root {
  --sj-bg: #f5f5f7;
  --sj-surface: #ffffff;
  --sj-text-primary: #1b2631;
  --sj-text-secondary: #5f6b7a;

  --sj-completed-border: #2ea44f;
  --sj-completed-fill: #ffffff;
  --sj-completed-tag-bg: #e6f4ea;

  --sj-current-border: #1b73e8;
  --sj-current-fill: #ebf5ff;
  --sj-current-tag-bg: #d6e8fb;
  --sj-current-glow-rgb: 27, 115, 232;

  --sj-pending-border: #d1d5db;
  --sj-pending-fill: #f9fafb;
  --sj-pending-text: #9ca3af;
  --sj-pending-tag-bg: #f3f4f6;

  --sj-dev: #00a9a5;
  --sj-staging: #d4a843;
  --sj-prod: #ff6f00;
}

[data-theme='dark'] {
  --sj-bg: #111111;
  --sj-surface: #1a1a1a;
  --sj-text-primary: #e8e8e8;
  --sj-text-secondary: #9ba1a6;

  --sj-completed-border: #3fb950;
  --sj-completed-fill: #1a1a1a;
  --sj-completed-tag-bg: #16321e;

  --sj-current-border: #4d9cff;
  --sj-current-fill: #16243a;
  --sj-current-tag-bg: #1e3354;
  --sj-current-glow-rgb: 77, 156, 255;

  --sj-pending-border: #3a3a3a;
  --sj-pending-fill: #161616;
  --sj-pending-text: #6b6b6b;
  --sj-pending-tag-bg: #262626;

  --sj-dev: #2dd4ce;
  --sj-staging: #e5c063;
  --sj-prod: #ff8a3d;
}
```

- [ ] **Step 2: Register the file in Docusaurus config**

In `docusaurus.config.ts`, change line 65 from:

```typescript
          customCss: './src/css/custom.css',
```

to:

```typescript
          customCss: [
            './src/css/custom.css',
            './src/css/journey-progress-tokens.css',
          ],
```

- [ ] **Step 3: Verify the build still starts and loads the CSS**

Run: `cd /Users/ivan.calvo/Documents/repos/starter-journey/docs/starter-journey && npm run typecheck`
Expected: PASS (config is valid TS).

Then run: `npm run build`
Expected: build completes with "Generated static files in build." and no config errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/ivan.calvo/Documents/repos/starter-journey
git add docs/starter-journey/src/css/journey-progress-tokens.css docs/starter-journey/docusaurus.config.ts
git commit -m "feat(journey): add progress theme tokens and register global css"
```

---

### Task 3: Port the icon set

**Files:**
- Create: `src/components/StarterJourneyProgress/icons.tsx`

**Interfaces:**
- Produces: `BLOCK_ICONS: Record<string, React.ReactNode>`. Keys exactly match the `icon` values in `JOURNEY_BLOCKS`: `server`, `dollar`, `shield`, `cloud-download`, `pipeline`, `gear`, `tag`, `database`, `search`, `dashboard`, `brain`, `bot`, `key`, `git-branch`. All SVGs use `stroke="currentColor"`. Consumed by Task 5.

- [ ] **Step 1: Create the icons file**

```tsx
// src/components/StarterJourneyProgress/icons.tsx
import React from 'react';

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Inline SVG icons keyed by JourneyBlock.icon. Stroked with currentColor so block state drives color. */
export const BLOCK_ICONS: Record<string, React.ReactNode> = {
  server: (
    <svg {...svgProps}>
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  dollar: (
    <svg {...svgProps}>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  shield: (
    <svg {...svgProps}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  'cloud-download': (
    <svg {...svgProps}>
      <polyline points="8 17 12 21 16 17" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
    </svg>
  ),
  pipeline: (
    <svg {...svgProps}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  gear: (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  tag: (
    <svg {...svgProps}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  database: (
    <svg {...svgProps}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  search: (
    <svg {...svgProps}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  dashboard: (
    <svg {...svgProps}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  brain: (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  bot: (
    <svg {...svgProps}>
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <line x1="12" y1="7" x2="12" y2="11" />
      <line x1="8" y1="16" x2="8" y2="16.01" />
      <line x1="16" y1="16" x2="16" y2="16.01" />
    </svg>
  ),
  key: (
    <svg {...svgProps}>
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
  'git-branch': (
    <svg {...svgProps}>
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
};
```

- [ ] **Step 2: Verify it typechecks**

Run: `cd /Users/ivan.calvo/Documents/repos/starter-journey/docs/starter-journey && npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
cd /Users/ivan.calvo/Documents/repos/starter-journey
git add docs/starter-journey/src/components/StarterJourneyProgress/icons.tsx
git commit -m "feat(journey): add inline svg icon set"
```

---

### Task 4: Write the component stylesheet

**Files:**
- Create: `src/components/StarterJourneyProgress/styles.module.css`

**Interfaces:**
- Produces CSS-module class names consumed by Task 5: `root`, `title`, `stack`, `fork`, `block`, `foundation`, `completed`, `current`, `pending`, `icon`, `label`, `tag`, `envBadges`, `envBadge`, `check`, `currentDot`, `legend`, `legendItem`, `legendSwatch`.
- Consumes: `--sj-*` custom properties from Task 2.
- **Design note:** State classes (`completed`/`current`/`pending`) ONLY set the `--state-*` custom properties — they apply no visual styles directly, so they can be reused on both blocks and legend swatches without side effects.

- [ ] **Step 1: Create the stylesheet**

```css
/* src/components/StarterJourneyProgress/styles.module.css */
.root {
  font-family: var(--ifm-font-family-base);
  max-width: 720px;
  margin: 1.5rem auto;
}

.title {
  text-align: center;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--sj-text-primary);
  margin: 0 0 1rem;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.fork {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

/* State classes only declare custom props — no direct visual styles. */
.completed {
  --state-border: var(--sj-completed-border);
  --state-fill: var(--sj-completed-fill);
  --state-text: var(--sj-text-primary);
  --state-tag-bg: var(--sj-completed-tag-bg);
}
.current {
  --state-border: var(--sj-current-border);
  --state-fill: var(--sj-current-fill);
  --state-text: var(--sj-text-primary);
  --state-tag-bg: var(--sj-current-tag-bg);
}
.pending {
  --state-border: var(--sj-pending-border);
  --state-fill: var(--sj-pending-fill);
  --state-text: var(--sj-pending-text);
  --state-tag-bg: var(--sj-pending-tag-bg);
}

.block {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 56px;
  padding: 0 20px;
  border: 2px solid var(--state-border);
  border-radius: 8px;
  background: var(--state-fill);
  color: var(--state-text);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  opacity: 0;
  animation: sjEnter 0.5s ease-out forwards;
}

.foundation {
  min-height: 72px;
}

.block.current {
  animation:
    sjEnter 0.5s ease-out forwards,
    sjBreathe 1.25s ease-in-out 0.5s infinite;
}

.icon {
  flex-shrink: 0;
  display: inline-flex;
  width: 26px;
  height: 26px;
}
.icon svg {
  width: 100%;
  height: 100%;
}

.label {
  flex: 1;
  font-size: clamp(0.85rem, 2.2vw, 1.05rem);
  font-weight: 600;
}
.block.current .label {
  font-weight: 700;
}

.tag {
  flex-shrink: 0;
  padding: 4px 12px;
  border-radius: 9999px;
  background: var(--state-tag-bg);
  color: var(--state-text);
  font-size: 0.72rem;
  font-weight: 700;
}

.envBadges {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}
.envBadge {
  padding: 3px 9px;
  border-radius: 4px;
  font-size: 0.66rem;
  font-weight: 700;
  color: var(--sj-env);
  background: color-mix(in srgb, var(--sj-env) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--sj-env) 38%, transparent);
}

.check {
  flex-shrink: 0;
  color: var(--sj-completed-border);
}
.currentDot {
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  border-radius: 9999px;
  background: var(--sj-current-border);
}

.legend {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 28px;
  margin-top: 1.25rem;
}
.legendItem {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--sj-text-secondary);
}
.legendSwatch {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 2px solid var(--state-border);
  background: var(--state-fill);
}

@keyframes sjEnter {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes sjBreathe {
  0%,
  100% {
    box-shadow:
      0 0 8px rgba(var(--sj-current-glow-rgb), 0.25),
      0 0 16px rgba(var(--sj-current-glow-rgb), 0.1);
  }
  50% {
    box-shadow:
      0 0 24px rgba(var(--sj-current-glow-rgb), 0.6),
      0 0 48px rgba(var(--sj-current-glow-rgb), 0.24);
  }
}

@media (prefers-reduced-motion: reduce) {
  .block,
  .block.current {
    animation: none;
    opacity: 1;
  }
}
```

- [ ] **Step 2: Commit (verified together with the component in Task 5)**

```bash
cd /Users/ivan.calvo/Documents/repos/starter-journey
git add docs/starter-journey/src/components/StarterJourneyProgress/styles.module.css
git commit -m "feat(journey): add progress component stylesheet"
```

---

### Task 5: Build the component

**Files:**
- Create: `src/components/StarterJourneyProgress/index.tsx`

**Interfaces:**
- Consumes: `JOURNEY_BLOCKS`, `getBlockState`, types from Task 1; `BLOCK_ICONS` from Task 3; `styles` from Task 4.
- Produces: default export `StarterJourneyProgress` and named export `interface StarterJourneyProgressProps { currentLevel?: number; currentForkColumn?: ForkColumn; showTitle?: boolean; showLegend?: boolean; title?: string; className?: string; }`. Consumed by Task 6 and future MDX usage.
- **Layout note:** Levels render ascending (0 → 9) in normal column order, so level 0 (Infra Setup) is at the **top** and level 9 (CI/CD) at the **bottom** — matching the reading order of the existing markdown "Journey checklist". To match the Remotion video's foundation-at-bottom stacking instead, change `.stack { flex-direction: column-reverse; }` in Task 4 (one line).

- [ ] **Step 1: Create the component**

```tsx
// src/components/StarterJourneyProgress/index.tsx
import React from 'react';
import clsx from 'clsx';
import {
  JOURNEY_BLOCKS,
  getBlockState,
  type ForkColumn,
  type JourneyBlock,
  type ProgressState,
} from './journey-blocks';
import { BLOCK_ICONS } from './icons';
import styles from './styles.module.css';

const ENV_BADGES = ['DEV', 'STG', 'PRD'] as const;
const ENV_VARS = ['--sj-dev', '--sj-staging', '--sj-prod'] as const;

const STATE_CLASS: Record<ProgressState, string> = {
  completed: styles.completed,
  current: styles.current,
  pending: styles.pending,
};

interface BlockRowProps {
  block: JourneyBlock;
  state: ProgressState;
  isFoundation?: boolean;
  index: number;
}

function BlockRow({ block, state, isFoundation, index }: BlockRowProps) {
  return (
    <div
      className={clsx(styles.block, STATE_CLASS[state], isFoundation && styles.foundation)}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <span className={styles.icon}>{BLOCK_ICONS[block.icon]}</span>
      <span className={styles.label}>{block.label}</span>

      {isFoundation && (
        <span className={styles.envBadges}>
          {ENV_BADGES.map((env, i) => (
            <span
              key={env}
              className={styles.envBadge}
              style={{ '--sj-env': `var(${ENV_VARS[i]})` } as React.CSSProperties}
            >
              {env}
            </span>
          ))}
        </span>
      )}

      {block.tag && !isFoundation && <span className={styles.tag}>{block.tag}</span>}

      {state === 'completed' && (
        <svg
          className={styles.check}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
      {state === 'current' && <span className={styles.currentDot} />}
    </div>
  );
}

export interface StarterJourneyProgressProps {
  currentLevel?: number;
  currentForkColumn?: ForkColumn;
  showTitle?: boolean;
  showLegend?: boolean;
  title?: string;
  className?: string;
}

export default function StarterJourneyProgress({
  currentLevel = 1,
  currentForkColumn,
  showTitle = true,
  showLegend = true,
  title = 'Starter Journey Progress',
  className,
}: StarterJourneyProgressProps) {
  const levels = Array.from(new Set(JOURNEY_BLOCKS.map((b) => b.level))).sort((a, b) => a - b);

  let rowIndex = 0;
  return (
    <section className={clsx(styles.root, className)} aria-label={title}>
      {showTitle && <h3 className={styles.title}>{title}</h3>}

      <div className={styles.stack}>
        {levels.map((level) => {
          const blocksAtLevel = JOURNEY_BLOCKS.filter((b) => b.level === level);
          const isFork = blocksAtLevel.length > 1;
          const isFoundation = level === 0;

          if (isFork) {
            return (
              <div key={level} className={styles.fork}>
                {blocksAtLevel.map((block) => (
                  <BlockRow
                    key={block.id}
                    block={block}
                    state={getBlockState(block, currentLevel, currentForkColumn)}
                    index={rowIndex++}
                  />
                ))}
              </div>
            );
          }

          const block = blocksAtLevel[0];
          return (
            <BlockRow
              key={block.id}
              block={block}
              state={getBlockState(block, currentLevel, currentForkColumn)}
              isFoundation={isFoundation}
              index={rowIndex++}
            />
          );
        })}
      </div>

      {showLegend && (
        <div className={styles.legend}>
          <span className={clsx(styles.legendItem, styles.completed)}>
            <span className={styles.legendSwatch} /> Completed
          </span>
          <span className={clsx(styles.legendItem, styles.current)}>
            <span className={styles.legendSwatch} /> Current
          </span>
          <span className={clsx(styles.legendItem, styles.pending)}>
            <span className={styles.legendSwatch} /> Pending
          </span>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Verify it typechecks**

Run: `cd /Users/ivan.calvo/Documents/repos/starter-journey/docs/starter-journey && npm run typecheck`
Expected: PASS, no errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/ivan.calvo/Documents/repos/starter-journey
git add docs/starter-journey/src/components/StarterJourneyProgress/index.tsx
git commit -m "feat(journey): add StarterJourneyProgress component"
```

---

### Task 6: Build the sandbox preview page

**Files:**
- Create: `src/pages/journey-sandbox.tsx`

**Interfaces:**
- Consumes: default export `StarterJourneyProgress` from Task 5 (via the `@site` alias).
- Produces: a page at route `/journey-sandbox`.
- **Purpose:** Renders a truth-table of `currentLevel`/`currentForkColumn` states so all three visual states and the fork logic are verifiable by eye in both light and dark mode.

- [ ] **Step 1: Create the sandbox page**

```tsx
// src/pages/journey-sandbox.tsx
import React from 'react';
import Layout from '@theme/Layout';
import StarterJourneyProgress from '@site/src/components/StarterJourneyProgress';
import type { ForkColumn } from '@site/src/components/StarterJourneyProgress/journey-blocks';

interface SandboxState {
  title: string;
  currentLevel: number;
  currentForkColumn?: ForkColumn;
}

const STATES: SandboxState[] = [
  { title: 'Level 1 · Cost Monitoring (DE) — early progress', currentLevel: 1 },
  { title: 'Level 4 · Build the First Pipeline (DE)', currentLevel: 4 },
  { title: 'Level 6 · ML fork · Feature Store (current)', currentLevel: 6, currentForkColumn: 'ml' },
  { title: 'Level 7 · GenAI fork · Agents (current)', currentLevel: 7, currentForkColumn: 'genai' },
  { title: 'Level 7 · DA fork · Unified Analytics (current)', currentLevel: 7, currentForkColumn: 'da' },
  { title: 'Level 9 · CI/CD — journey complete', currentLevel: 9 },
];

export default function JourneySandbox(): React.ReactElement {
  return (
    <Layout
      title="Journey Sandbox"
      description="Preview of the Starter Journey progress component"
    >
      <main className="container margin-vert--lg">
        <h1>Starter Journey Progress — Sandbox</h1>
        <p>
          Toggle the site light/dark switch (top-right) to verify both themes. Each card below
          renders the component with a different <code>currentLevel</code> /{' '}
          <code>currentForkColumn</code>. Verify that blocks below the current level are{' '}
          <strong>completed</strong> (green, checkmark), the current block is{' '}
          <strong>highlighted</strong> (blue, glowing dot), and blocks above are{' '}
          <strong>pending</strong> (grey). On a fork level, only the active track column should be
          current/completed; the other two columns should be pending.
        </p>

        {STATES.map((s) => (
          <div
            key={s.title}
            style={{
              marginBottom: '3rem',
              borderTop: '1px solid var(--ifm-color-emphasis-300)',
              paddingTop: '1.5rem',
            }}
          >
            <h2 style={{ fontSize: '1rem', color: 'var(--ifm-color-emphasis-700)' }}>{s.title}</h2>
            <StarterJourneyProgress
              currentLevel={s.currentLevel}
              currentForkColumn={s.currentForkColumn}
              showTitle={false}
            />
          </div>
        ))}
      </main>
    </Layout>
  );
}
```

- [ ] **Step 2: Verify typecheck and build**

Run: `cd /Users/ivan.calvo/Documents/repos/starter-journey/docs/starter-journey && npm run typecheck`
Expected: PASS.

Run: `npm run build`
Expected: "Generated static files in build." — no broken-link or compile errors. (This proves the page and component render under SSR.)

- [ ] **Step 3: Visual verification in the browser**

Run: `npm start` (serves at `http://localhost:3000`; the site `baseUrl` is `/starter-journey/`, so the sandbox is at `http://localhost:3000/starter-journey/journey-sandbox`).

Use the `fe-specialized-agents:web-devloop-tester` agent (or open manually) to confirm, for each card:
- Blocks below `currentLevel` are green with a checkmark.
- The `currentLevel` block is blue, bold label, with a pulsing glow + filled dot.
- Blocks above `currentLevel` are grey/muted.
- On fork levels, only the column matching `currentForkColumn` is current/completed; the other two columns are pending.
- The foundation row (Infra Setup) shows DEV/STG/PRD badges.
- Toggling the site theme switch flips the whole visual between the light and dark palettes.
- No console errors.

Expected: all checks pass in both light and dark mode.

- [ ] **Step 4: Commit**

```bash
cd /Users/ivan.calvo/Documents/repos/starter-journey
git add docs/starter-journey/src/pages/journey-sandbox.tsx
git commit -m "feat(journey): add progress component sandbox page"
```

---

## Out of scope (future work — documented, not built)

These were explicitly deferred by the user ("I'll replace all Journey checklist sections… later. For now, just create a sandbox page"). Captured here so the next session has the context.

### Replacing the per-page markdown "Journey checklist" sections

15 doc pages currently contain a markdown `## Journey checklist` (e.g. `docs/07-build-first-pipeline/index.mdx`, `docs/14-mlops/index.mdx`). To swap each for `<StarterJourneyProgress currentLevel={…} currentForkColumn={…} />`:

1. **Register the component globally for MDX** by creating `src/theme/MDXComponents.tsx` so pages can use `<StarterJourneyProgress />` without a per-file import:
   ```tsx
   import MDXComponents from '@theme-original/MDXComponents';
   import StarterJourneyProgress from '@site/src/components/StarterJourneyProgress';
   export default { ...MDXComponents, StarterJourneyProgress };
   ```
2. **Map each page to a `currentLevel`/`currentForkColumn`.** ⚠️ The markdown checklist (a flat 14-item sidebar list) does **not** map 1:1 onto the Remotion 10-level forked model. Suggested mapping:

   | Sidebar section | Maps to block (level / fork) |
   |---|---|
   | Get started | *no block* (pre-foundation) |
   | Before you start | *no block* (pre-foundation) |
   | Infra setup | level 0 |
   | Cost monitoring | level 1 |
   | Data Governance Strategy | level 2 |
   | Access your data | level 3 |
   | Build the first pipeline | level 4 |
   | Automation & orchestration | level 5 |
   | Query and explore | *no block* — decide: omit, or treat as part of level 5/6 |
   | Databricks AI/BI | level 7 `da` (Unified Analytics)? — needs a decision |
   | Business semantics | level 6 `da` |
   | Data Access Control | level 8 |
   | CI/CD and DevOps | level 9 |
   | MLOps | level 7 `ml` (Predictive Analytics) |

   The cells marked "no block" / "needs a decision" require a product call before replacement. Resolve these (extend `JOURNEY_BLOCKS` to add pre-foundation or Query/AI-BI blocks, **or** accept that some pages won't show the tracker) in a follow-up brainstorming session.

3. Replace each `## Journey checklist` block with the component invocation and verify the build.

### Other deferred items
- Per-user progress tracking / localStorage (user chose prop-driven storytelling instead).
- Embedding the rendered Remotion `.mp4` files (this plan builds a live component instead; the videos remain visual reference).

---

## Self-Review

- **Spec coverage:** Goal = reusable progress visual + sandbox. Tasks 1–5 build the component (data, theme, icons, styles, component); Task 6 builds the sandbox. ✓ All four locked decisions (forked Remotion model, CSS-var theming, pure-CSS high-fidelity animation, sandbox-only scope) are implemented. ✓
- **Placeholder scan:** No TBD/TODO/"add error handling" placeholders; every code step contains complete, runnable code. ✓
- **Type consistency:** `ForkColumn`, `JourneyBlock`, `ProgressState`, `getBlockState`, `JOURNEY_BLOCKS` defined in Task 1 and consumed with identical names in Tasks 5–6. `BLOCK_ICONS` keys (Task 3) match every `icon` value in `JOURNEY_BLOCKS` (Task 1). CSS-module class names produced in Task 4 match those consumed in Task 5. `--sj-*` custom properties defined in Task 2 match those referenced in Task 4. ✓
- **Known reconciliation gap** (14 sidebar sections vs 10 Remotion levels) is surfaced in "Out of scope" with a concrete mapping table and the open product decisions flagged — not silently glossed. ✓
