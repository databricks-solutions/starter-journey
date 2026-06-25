# Sidebar & Progress Component Restructure

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the sidebar to reflect the new journey ordering (Query & Explore before the fork, three-way fork for Unified Analytics / Predictive Analytics / Agents, Automation & Orchestration after the fork), and update the `StarterJourneyProgress` component to match with visual fork connectors and track-specific background colors.

**Architecture:** The sidebar in `sidebars.ts` is reordered and gains two new container categories (Unified Analytics, Agents). The `StarterJourneyProgress` component collapses its two-level fork (levels 6-7) into a single fork level, adds Query & Explore before the fork, and renders SVG connectors above and below the fork row to show branching/merging. Track-specific CSS custom properties color the fork blocks.

**Tech Stack:** TypeScript, React, CSS Modules, Docusaurus 3 sidebar config.

---

## File map

| File | Action | Responsibility |
|---|---|---|
| `docs/starter-journey/sidebars.ts` | Modify | Reorder sections, add Unified Analytics and Agents containers |
| `docs/starter-journey/section-freshness.csv` | Modify | Rename/add/remove section rows to match new sidebar labels |
| `scripts/check_section_freshness.py` | Modify | Update `REQUIRED_SECTIONS` tuple |
| `docs/starter-journey/src/components/StarterJourneyProgress/journey-blocks.ts` | Modify | New 10-level model with single fork row, add Query & Explore |
| `docs/starter-journey/src/components/StarterJourneyProgress/index.tsx` | Modify | Render fork connectors (split/merge SVG elements) |
| `docs/starter-journey/src/components/StarterJourneyProgress/styles.module.css` | Modify | Fork connector styles, track-specific background colors |
| `docs/starter-journey/src/css/journey-progress-tokens.css` | Modify | Add `--sj-track-da`, `--sj-track-ml`, `--sj-track-ai` color tokens |
| `docs/starter-journey/docs/15-journey-progress-demo/index.mdx` | Modify | Update level numbers in demo renders |
| `docs/starter-journey/src/pages/journey-sandbox.tsx` | Modify | Update sandbox state presets |

No new files. No directory renames (physical directory numbers stay; sidebar labels control displayed order).

---

### Task 1: Restructure the sidebar

**Files:**
- Modify: `docs/starter-journey/sidebars.ts`

- [ ] **Step 1: Rewrite the `docsSidebar` array**

The new order moves Query & Explore to position 8, adds Unified Analytics (container wrapping Business Semantics + AI/BI) at 9, rebrands MLOps to Predictive Analytics at 10, adds Agents placeholder at 11, and pushes Automation & Orchestration to 12, Data Access Control to 13, CI/CD to 14. Section 15 (demo) stays.

Replace the full `docsSidebar` array contents in `docs/starter-journey/sidebars.ts` with:

```typescript
import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {type: 'doc', id: '01-get-started', label: '1. Get Started'},
    {
      type: 'category',
      label: '2. Before you Start',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Foundations',
          link: {type: 'doc', id: '02-before-you-start/foundations/index'},
          items: [
            '02-before-you-start/foundations/account-console',
            '02-before-you-start/foundations/workspace',
            '02-before-you-start/foundations/unity-catalog',
            '02-before-you-start/foundations/recap-and-learning',
          ],
        },
        {
          type: 'category',
          label: 'Cloud Tenant ready',
          link: {type: 'doc', id: '02-before-you-start/cloud-tenant-ready/index'},
          items: [
            '02-before-you-start/cloud-tenant-ready/single-tenant-setup',
            '02-before-you-start/cloud-tenant-ready/multi-tenant-setup',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '3. Infra Setup',
      collapsed: true,
      link: {type: 'doc', id: '03-infra-setup/index'},
      items: [
        {
          type: 'category',
          label: 'Create Workspaces',
          link: {type: 'doc', id: '03-infra-setup/create-workspaces/index'},
          items: [
            {
              type: 'category',
              label: 'AWS',
              collapsed: true,
              items: [
                '03-infra-setup/create-workspaces/aws/manual',
                '03-infra-setup/create-workspaces/aws/terraform',
                '03-infra-setup/create-workspaces/aws/sra',
              ],
            },
            {
              type: 'category',
              label: 'Azure',
              collapsed: true,
              items: [
                '03-infra-setup/create-workspaces/azure/manual',
                '03-infra-setup/create-workspaces/azure/terraform',
                '03-infra-setup/create-workspaces/azure/sra',
              ],
            },
            {
              type: 'category',
              label: 'GCP',
              collapsed: true,
              items: [
                '03-infra-setup/create-workspaces/gcp/manual',
                '03-infra-setup/create-workspaces/gcp/terraform',
                '03-infra-setup/create-workspaces/gcp/sra',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Add Users',
          link: {type: 'doc', id: '03-infra-setup/add-users/index'},
          items: [
            '03-infra-setup/add-users/manual',
            '03-infra-setup/add-users/scim',
          ],
        },
        {
          type: 'category',
          label: 'Add Groups',
          link: {type: 'doc', id: '03-infra-setup/add-groups/index'},
          items: [
            '03-infra-setup/add-groups/manual',
            '03-infra-setup/add-groups/scim',
          ],
        },
        {
          type: 'category',
          label: 'Metastore Admins',
          link: {type: 'doc', id: '03-infra-setup/metastore-admins/index'},
          items: [
            '03-infra-setup/metastore-admins/set-admin-group',
            '03-infra-setup/metastore-admins/uc-assets-ownership',
          ],
        },
        '03-infra-setup/activate-sso',
      ],
    },
    {
      type: 'category',
      label: '4. Cost monitoring',
      collapsed: true,
      link: {type: 'doc', id: '04-cost-monitoring/index'},
      items: [
        '04-cost-monitoring/import-usage-dashboard',
        '04-cost-monitoring/additional-dashboards',
        '04-cost-monitoring/tag-compute-and-jobs',
        '04-cost-monitoring/budget-alerts',
      ],
    },
    {
      type: 'category',
      label: '5. Data Governance Strategy',
      collapsed: true,
      link: {type: 'doc', id: '05-data-governance-strategy/index'},
      items: [
        '05-data-governance-strategy/small-organizations',
        '05-data-governance-strategy/medium-large-organizations',
      ],
    },
    {
      type: 'category',
      label: '6. Access your data',
      collapsed: true,
      link: {type: 'doc', id: '06-access-your-data/index'},
      items: [
        {
          type: 'category',
          label: 'Cloud object storage',
          link: {type: 'doc', id: '06-access-your-data/cloud-object-storage/index'},
          items: [
            '06-access-your-data/cloud-object-storage/aws',
            '06-access-your-data/cloud-object-storage/azure',
            '06-access-your-data/cloud-object-storage/gcp',
          ],
        },
        {
          type: 'category',
          label: 'Databases and SaaS ingestion',
          link: {type: 'doc', id: '06-access-your-data/managed-connectors/index'},
          items: [
            '06-access-your-data/managed-connectors/dabs-definition',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '7. Build the first ETL pipeline',
      collapsed: true,
      link: {type: 'doc', id: '07-build-first-pipeline/index'},
      items: [
        '07-build-first-pipeline/hands-on-lab',
        '07-build-first-pipeline/workspace-databricks-agent',
        '07-build-first-pipeline/dabs',
      ],
    },
    {type: 'doc', id: '09-query-and-explore', label: '8. Query and Explore'},
    {
      type: 'category',
      label: '9. Unified Analytics',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Business Semantics',
          collapsed: true,
          link: {type: 'doc', id: '11-business-semantics/index'},
          items: [
            '11-business-semantics/lab',
          ],
        },
        {
          type: 'category',
          label: 'Databricks AI/BI',
          collapsed: true,
          items: [
            '10-databricks-aibi/dashboards',
            {
              type: 'category',
              label: 'Genie Spaces',
              link: {type: 'doc', id: '10-databricks-aibi/genie-spaces'},
              items: [
                '10-databricks-aibi/try-a-sample-genie-space',
              ],
            },
            '10-databricks-aibi/databricks-apps',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '10. Predictive Analytics',
      collapsed: true,
      link: {type: 'doc', id: '14-mlops/index'},
      items: [
        '14-mlops/save-model-to-unity-catalog',
        '14-mlops/batch-inference',
        '14-mlops/prepare-datasets',
      ],
    },
    {
      type: 'category',
      label: '11. Agents',
      collapsed: true,
      items: [],
    },
    {
      type: 'category',
      label: '12. Automation & Orchestration',
      collapsed: true,
      items: [
        '08-orchestration/workspace',
        '08-orchestration/dabs',
      ],
    },
    {
      type: 'category',
      label: '13. Data Access Control',
      collapsed: true,
      link: {type: 'doc', id: '12-data-access-control/index'},
      items: [],
    },
    {
      type: 'category',
      label: '14. CI/CD and DevOps',
      collapsed: true,
      link: {type: 'doc', id: '13-ci-cd-devops/index'},
      items: [],
    },
    {type: 'doc', id: '15-journey-progress-demo/index', label: '15. Journey Progress (demo)'},
  ],
};

export default sidebars;
```

Key decisions:
- Physical directory names (`08-orchestration/`, `09-query-and-explore`, etc.) stay unchanged. Only sidebar labels and ordering change.
- `9. Unified Analytics` has no `link` property (no index page, just a container).
- `11. Agents` has no `link` and empty `items` (placeholder).
- `10. Predictive Analytics` keeps the `link` to `14-mlops/index` and all its existing items.

- [ ] **Step 2: Verify the sidebar compiles**

Run: `cd docs/starter-journey && npm run build 2>&1 | tail -20`
Expected: `[SUCCESS] Generated static files` (warnings about `14-mlops/batch-inference` anchors are pre-existing and acceptable).

- [ ] **Step 3: Commit**

```bash
git add docs/starter-journey/sidebars.ts
git commit -m "refactor(sidebar): reorder sections and add Unified Analytics, Predictive Analytics, Agents containers"
```

---

### Task 2: Update section-freshness.csv and check script

**Files:**
- Modify: `docs/starter-journey/section-freshness.csv`
- Modify: `scripts/check_section_freshness.py`

The sidebar labels changed. Both files must match `sidebars.ts` labels exactly.

- [ ] **Step 1: Rewrite section-freshness.csv**

Replace the full contents of `docs/starter-journey/section-freshness.csv` with:

```csv
section_name,last_update
1. Get Started,2026-06-14
2. Before you Start,2026-06-14
3. Infra Setup,2026-06-15
4. Cost monitoring,2026-06-14
5. Data Governance Strategy,2026-06-14
6. Access your data,2026-06-14
7. Build the first ETL pipeline,2026-06-15
8. Query and Explore,2026-06-14
9. Unified Analytics,2026-06-25
10. Predictive Analytics,2026-06-25
11. Agents,2026-06-25
12. Automation & Orchestration,2026-06-14
13. Data Access Control,2026-06-14
14. CI/CD and DevOps,2026-06-14
```

Notes:
- Old `8. Automation & Orchestration` becomes `12. Automation & Orchestration` (same date, just renumbered).
- Old `9. Query and Explore` becomes `8. Query and Explore`.
- Old `10. Databricks AI/BI` and `11. Business Semantics` are removed (absorbed into `9. Unified Analytics`).
- Old `14. MLOps` is removed (becomes `10. Predictive Analytics`).
- New sections (`9. Unified Analytics`, `10. Predictive Analytics`, `11. Agents`) get today's date `2026-06-25`.

- [ ] **Step 2: Update REQUIRED_SECTIONS in check script**

Replace the `REQUIRED_SECTIONS` tuple in `scripts/check_section_freshness.py` with:

```python
REQUIRED_SECTIONS: tuple[str, ...] = (
    "1. Get Started",
    "2. Before you Start",
    "3. Infra Setup",
    "4. Cost monitoring",
    "5. Data Governance Strategy",
    "6. Access your data",
    "7. Build the first ETL pipeline",
    "8. Query and Explore",
    "9. Unified Analytics",
    "10. Predictive Analytics",
    "11. Agents",
    "12. Automation & Orchestration",
    "13. Data Access Control",
    "14. CI/CD and DevOps",
)
```

- [ ] **Step 3: Verify freshness check passes**

Run: `python scripts/check_section_freshness.py`
Expected: `All 14 sections are within 60 days.`

- [ ] **Step 4: Commit**

```bash
git add docs/starter-journey/section-freshness.csv scripts/check_section_freshness.py
git commit -m "chore(freshness): update section names and numbers to match new sidebar"
```

---

### Task 3: Update journey-blocks.ts data model

**Files:**
- Modify: `docs/starter-journey/src/components/StarterJourneyProgress/journey-blocks.ts`

The component collapses from a 2-level fork (levels 6-7) to a single fork level, adds Query & Explore before the fork, and reorders post-fork blocks.

- [ ] **Step 1: Replace JOURNEY_BLOCKS and MAX_LEVEL**

Replace the `JOURNEY_BLOCKS` array, `MAX_LEVEL`, and `getBlockState` in `docs/starter-journey/src/components/StarterJourneyProgress/journey-blocks.ts` with:

```typescript
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
 * The single fork row shares level 5. Levels 0-4 and 6-8 are full-width.
 */
export const JOURNEY_BLOCKS: JourneyBlock[] = [
  { id: "infra-setup",           label: "Infra Setup",                level: 0, icon: "server" },
  { id: "cost-monitoring",       label: "Cost Monitoring",            level: 1, icon: "dollar" },
  { id: "data-governance",       label: "Data Governance Strategy",   level: 2, icon: "shield" },
  { id: "access-data",           label: "Access Your Data",           level: 3, icon: "cloud-download" },
  { id: "first-pipeline",        label: "Build the First Pipeline",   level: 4, icon: "pipeline" },
  { id: "query-explore",         label: "Query and Explore",          level: 5, icon: "search" },
  // Fork row, level 6
  { id: "unified-analytics",     label: "Unified Analytics",          level: 6, forkColumn: "da",    tag: "DA",  icon: "dashboard" },
  { id: "predictive-analytics",  label: "Predictive Analytics",       level: 6, forkColumn: "ml",    tag: "ML",  icon: "brain" },
  { id: "agents",                label: "Agents",                     level: 6, forkColumn: "genai", tag: "AI",  icon: "bot" },
  // Full-width rows resume
  { id: "automation",            label: "Automation & Orchestration", level: 7, icon: "gear" },
  { id: "data-access-control",   label: "Data Access Control",        level: 8, icon: "key" },
  { id: "cicd-devops",           label: "CI/CD and DevOps",           level: 9, icon: "git-branch" },
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
    if (!block.forkColumn) return "completed";
    const currentIsFork = JOURNEY_BLOCKS.some(
      (b) => b.level === currentLevel && b.forkColumn,
    );
    if (!currentIsFork) return "completed";
    if (block.forkColumn === currentForkColumn) return "completed";
    return "pending";
  }

  // Same level as current
  if (!block.forkColumn) return "current";
  if (block.forkColumn === currentForkColumn) return "current";
  return "pending";
}
```

Changes from old model:
- Removed the 2 fork rows (old levels 6+7 with 6 blocks: Business Semantics, Feature Store, Document Intelligence, Unified Analytics, Predictive Analytics, Agents).
- Added `query-explore` at level 5 (new, was not in the component before).
- Single fork row at level 6: Unified Analytics / Predictive Analytics / Agents.
- `automation` moves from level 5 to level 7 (after the fork).
- `data-access-control` stays level 8, `cicd-devops` stays level 9.
- Removed `tag` from non-fork blocks (the "DE" tags on levels 0-5 are removed since the fork tracks now carry the meaning).

- [ ] **Step 2: Verify types compile**

Run: `cd docs/starter-journey && npx tsc --noEmit --pretty 2>&1 | grep -v 'Button/index.tsx'`
Expected: no new errors (the pre-existing Button JSX error is filtered out).

- [ ] **Step 3: Commit**

```bash
git add docs/starter-journey/src/components/StarterJourneyProgress/journey-blocks.ts
git commit -m "refactor(journey): collapse fork to single level, add Query and Explore"
```

---

### Task 4: Add track color tokens

**Files:**
- Modify: `docs/starter-journey/src/css/journey-progress-tokens.css`

Add three track-specific accent colors used for fork block backgrounds.

- [ ] **Step 1: Add track color tokens**

Add the following tokens to the `:root` block in `docs/starter-journey/src/css/journey-progress-tokens.css`, after the existing `--sj-prod` line:

```css
  --sj-track-da: #1b73e8;
  --sj-track-ml: #9334e6;
  --sj-track-ai: #0d9488;

  --sj-connector: #9ca3af;
```

Add matching dark-mode values to the `[data-theme='dark']` block, after the existing `--sj-prod` line:

```css
  --sj-track-da: #4d9cff;
  --sj-track-ml: #b388ff;
  --sj-track-ai: #2dd4bf;

  --sj-connector: #4b5563;
```

- [ ] **Step 2: Commit**

```bash
git add docs/starter-journey/src/css/journey-progress-tokens.css
git commit -m "style(journey): add track accent and connector color tokens"
```

---

### Task 5: Add fork connectors and track backgrounds to component and styles

**Files:**
- Modify: `docs/starter-journey/src/components/StarterJourneyProgress/index.tsx`
- Modify: `docs/starter-journey/src/components/StarterJourneyProgress/styles.module.css`

This adds:
1. A split connector (one line splitting into three) between Query & Explore and the fork row.
2. A merge connector (three lines merging into one) between the fork row and Automation & Orchestration.
3. Track-specific tinted backgrounds on fork blocks.

- [ ] **Step 1: Add connector CSS**

Add the following rules at the end of `docs/starter-journey/src/components/StarterJourneyProgress/styles.module.css` (before the `@media (prefers-reduced-motion)` block):

```css
/* Fork connectors: split (below fork) and merge (above fork).
   The stack is column-reverse so "split" renders visually below the fork
   and "merge" renders above it. */
.connector {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  position: relative;
}

.connectorSvg {
  width: 100%;
  max-width: 400px;
  height: 32px;
  overflow: visible;
}

.connectorLine {
  stroke: var(--sj-connector);
  stroke-width: 2;
  fill: none;
}

/* Track-specific fork block tints */
.trackDa {
  border-left: 3px solid var(--sj-track-da);
}
.trackMl {
  border-left: 3px solid var(--sj-track-ml);
}
.trackAi {
  border-left: 3px solid var(--sj-track-ai);
}
```

- [ ] **Step 2: Add connector components and track classes to index.tsx**

Replace the full render logic in `docs/starter-journey/src/components/StarterJourneyProgress/index.tsx` with:

```tsx
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

const TRACK_CLASS: Record<ForkColumn, string> = {
  da: styles.trackDa,
  ml: styles.trackMl,
  genai: styles.trackAi,
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
      className={clsx(
        styles.block,
        STATE_CLASS[state],
        isFoundation && styles.foundation,
        block.forkColumn && TRACK_CLASS[block.forkColumn],
      )}
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

function SplitConnector() {
  return (
    <div className={styles.connector}>
      <svg className={styles.connectorSvg} viewBox="0 0 400 32" preserveAspectRatio="none">
        <path className={styles.connectorLine} d="M200,0 L200,8 M200,8 L67,24 L67,32" />
        <path className={styles.connectorLine} d="M200,8 L200,32" />
        <path className={styles.connectorLine} d="M200,8 L333,24 L333,32" />
      </svg>
    </div>
  );
}

function MergeConnector() {
  return (
    <div className={styles.connector}>
      <svg className={styles.connectorSvg} viewBox="0 0 400 32" preserveAspectRatio="none">
        <path className={styles.connectorLine} d="M67,0 L67,8 L200,24 M200,24 L200,32" />
        <path className={styles.connectorLine} d="M200,0 L200,24" />
        <path className={styles.connectorLine} d="M333,0 L333,8 L200,24" />
      </svg>
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
              <React.Fragment key={level}>
                <MergeConnector />
                <div className={styles.fork}>
                  {blocksAtLevel.map((block) => (
                    <BlockRow
                      key={block.id}
                      block={block}
                      state={getBlockState(block, currentLevel, currentForkColumn)}
                      index={rowIndex++}
                    />
                  ))}
                </div>
                <SplitConnector />
              </React.Fragment>
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

Key changes from the old component:
- Added `TRACK_CLASS` map and applied it to fork blocks via `block.forkColumn`.
- Added `SplitConnector` and `MergeConnector` inline SVG components.
- The fork rendering wraps the fork `<div>` with `<MergeConnector />` above and `<SplitConnector />` below (remember: `column-reverse` means "above" in DOM = "below" visually, and "below" in DOM = "above" visually. The `SplitConnector` renders after the fork in DOM, so it appears *below* the fork visually (between Query & Explore and the fork). The `MergeConnector` renders before the fork in DOM, so it appears *above* the fork visually (between the fork and Automation & Orchestration).)

- [ ] **Step 3: Verify types compile**

Run: `cd docs/starter-journey && npx tsc --noEmit --pretty 2>&1 | grep -v 'Button/index.tsx'`
Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add docs/starter-journey/src/components/StarterJourneyProgress/index.tsx docs/starter-journey/src/components/StarterJourneyProgress/styles.module.css
git commit -m "feat(journey): add fork connectors and track-colored borders"
```

---

### Task 6: Update demo page and sandbox

**Files:**
- Modify: `docs/starter-journey/docs/15-journey-progress-demo/index.mdx`
- Modify: `docs/starter-journey/src/pages/journey-sandbox.tsx`

Level numbers changed. Update the rendered examples.

- [ ] **Step 1: Rewrite the demo page**

Replace the contents of `docs/starter-journey/docs/15-journey-progress-demo/index.mdx` with:

```mdx
---
sidebar_label: 15. Journey Progress (demo)
description: Live demo of the Starter Journey progress component.
---

import StarterJourneyProgress from '@site/src/components/StarterJourneyProgress';

# 15. Journey Progress (demo)

> A demo page to preview the `StarterJourneyProgress` component in context. Toggle the light/dark switch (top right) to see both themes.

This component shows where a reader sits in the Starter Journey. Completed sections are green and checked, the current one glows blue, and upcoming ones stay grey. Level 6 forks into the Unified Analytics, Predictive Analytics, and Agents tracks.

## Foundation (Infra Setup)

<StarterJourneyProgress currentLevel={0} />

## Early in the journey (Cost Monitoring)

<StarterJourneyProgress currentLevel={1} />

## Data ready (Query and Explore)

<StarterJourneyProgress currentLevel={5} />

## On the ML fork (Predictive Analytics)

<StarterJourneyProgress currentLevel={6} currentForkColumn="ml" />

## Journey complete (CI/CD)

<StarterJourneyProgress currentLevel={9} />
```

- [ ] **Step 2: Update the sandbox presets**

Replace the `STATES` array in `docs/starter-journey/src/pages/journey-sandbox.tsx` with:

```typescript
const STATES: SandboxState[] = [
  { title: 'Level 1 - Cost Monitoring: early progress', currentLevel: 1 },
  { title: 'Level 4 - Build the First Pipeline', currentLevel: 4 },
  { title: 'Level 5 - Query and Explore', currentLevel: 5 },
  { title: 'Level 6 - DA fork - Unified Analytics (current)', currentLevel: 6, currentForkColumn: 'da' },
  { title: 'Level 6 - ML fork - Predictive Analytics (current)', currentLevel: 6, currentForkColumn: 'ml' },
  { title: 'Level 6 - AI fork - Agents (current)', currentLevel: 6, currentForkColumn: 'genai' },
  { title: 'Level 9 - CI/CD: journey complete', currentLevel: 9 },
];
```

- [ ] **Step 3: Commit**

```bash
git add docs/starter-journey/docs/15-journey-progress-demo/index.mdx docs/starter-journey/src/pages/journey-sandbox.tsx
git commit -m "demo(journey): update demo and sandbox for new level numbers"
```

---

### Task 7: Full build verification

- [ ] **Step 1: Run a production build**

Run: `cd docs/starter-journey && npm run build`
Expected: `[SUCCESS] Generated static files`. No broken-link errors. Pre-existing anchor warnings on `14-mlops/batch-inference` are acceptable.

- [ ] **Step 2: Visual verification**

Run: `cd docs/starter-journey && npx docusaurus serve --port 4000`

Check:
1. Sidebar shows new order: sections 1-7 unchanged, 8 = Query and Explore, 9 = Unified Analytics (container with Business Semantics + AI/BI nested), 10 = Predictive Analytics, 11 = Agents (empty), 12 = Automation & Orchestration, 13 = Data Access Control, 14 = CI/CD and DevOps.
2. Navigate to section 15 demo page. Verify:
   - The component renders bottom-to-top: Infra Setup (bottom) through CI/CD (top).
   - Query and Explore appears as a full-width block above Build the First Pipeline.
   - A split connector (lines branching from 1 to 3) appears between Query & Explore and the fork row.
   - The fork row shows three blocks: Unified Analytics, Predictive Analytics, Agents.
   - Each fork block has a colored left border (blue for DA, purple for ML, teal for AI).
   - A merge connector (lines merging from 3 to 1) appears between the fork row and Automation & Orchestration.
   - Light and dark themes both render correctly.

- [ ] **Step 3: Run freshness check**

Run: `python scripts/check_section_freshness.py`
Expected: `All 14 sections are within 60 days.`

---

## Self-review checklist

1. **Spec coverage:**
   - Task 1 (sidebar reorder): covered by Task 1.
   - Task 2 (component data model, remove old fork row): covered by Task 3.
   - Task 3 (fork representation with arrows): covered by Tasks 4-5.
   - Background colors: covered by Tasks 4-5.
   - Section renaming: covered by Tasks 1-3.

2. **Placeholder scan:** no TBD, TODO, or "implement later" in any step. All code is complete.

3. **Type consistency:** `ForkColumn` type (`"da" | "ml" | "genai"`) is unchanged. `TRACK_CLASS` map keys match. Level numbers (0-9) are consistent across `journey-blocks.ts`, demo page, and sandbox. `--sj-connector` token is defined in tokens CSS and used in styles CSS.
