# Directory Renumber Refactor

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename all doc directories under `docs/starter-journey/docs/` so their numeric prefixes match the sidebar order, and fix all internal links, page headings, and doc IDs that reference the old paths.

**Architecture:** Git-mv directories in dependency-safe order (higher numbers first to avoid collisions), then bulk-update doc IDs in `sidebars.ts`, internal links in all MDX/MD files, page headings/frontmatter, and the example URL in agent instructions (`CLAUDE.md` + `.cursorrules`).

**Tech Stack:** Git, Docusaurus 3, MDX.

---

## Rename mapping

| Sidebar # | Current path | New path |
|---|---|---|
| 8 | `09-query-and-explore.mdx` | `08-query-and-explore.mdx` |
| 9 (container) | `10-databricks-aibi/` | `09-unified-analytics/databricks-aibi/` |
| 9 (container) | `11-business-semantics/` | `09-unified-analytics/business-semantics/` |
| 10 | `14-mlops/` | `10-predictive-analytics/` |
| 11 | `16-agents/` | `11-agents/` |
| 12 | `08-orchestration/` | `12-orchestration/` |
| 13 | `12-data-access-control/` | `13-data-access-control/` |
| 14 | `13-ci-cd-devops/` | `14-ci-cd-devops/` |

Directories 01-07 and 15 are already correctly numbered and stay unchanged.

## Safe rename order (avoids filesystem collisions)

Collisions exist: renaming `12→13` collides with existing `13`, and `13→14` collides with existing `14`. Resolve by processing renames from highest target number down:

1. `14-mlops/` → `10-predictive-analytics/` (frees `14-*`)
2. `13-ci-cd-devops/` → `14-ci-cd-devops/` (14 is free, frees `13-*`)
3. `12-data-access-control/` → `13-data-access-control/` (13 is free, frees `12-*`)
4. Create `09-unified-analytics/`
5. `11-business-semantics/` → `09-unified-analytics/business-semantics/` (frees `11-*`)
6. `10-databricks-aibi/` → `09-unified-analytics/databricks-aibi/` (frees `10-*`)
7. `16-agents/` → `11-agents/`
8. `08-orchestration/` → `12-orchestration/` (frees `08-*` dir)
9. `09-query-and-explore.mdx` → `08-query-and-explore.mdx`

## Link replacement mapping

Every internal doc link (`/docs/<old-path>`) must be updated. Here is the full replacement table:

| Old link prefix | New link prefix |
|---|---|
| `/docs/08-orchestration/` | `/docs/12-orchestration/` |
| `/docs/09-query-and-explore` | `/docs/08-query-and-explore` |
| `/docs/10-databricks-aibi/` | `/docs/09-unified-analytics/databricks-aibi/` |
| `/docs/11-business-semantics` | `/docs/09-unified-analytics/business-semantics` |
| `/docs/12-data-access-control/` | `/docs/13-data-access-control/` |
| `/docs/13-ci-cd-devops/` | `/docs/14-ci-cd-devops/` |
| `/docs/14-mlops/` | `/docs/10-predictive-analytics/` |
| `/docs/14-mlops)` | `/docs/10-predictive-analytics)` |
| `/docs/16-agents/` | `/docs/11-agents/` |

## Sidebar doc ID replacement mapping

Every doc ID in `sidebars.ts` that references a renamed directory must be updated:

| Old doc ID prefix | New doc ID prefix |
|---|---|
| `08-orchestration/` | `12-orchestration/` |
| `09-query-and-explore` | `08-query-and-explore` |
| `10-databricks-aibi/` | `09-unified-analytics/databricks-aibi/` |
| `11-business-semantics/` | `09-unified-analytics/business-semantics/` |
| `12-data-access-control/` | `13-data-access-control/` |
| `13-ci-cd-devops/` | `14-ci-cd-devops/` |
| `14-mlops/` | `10-predictive-analytics/` |
| `16-agents/` | `11-agents/` |
| `15-journey-progress-demo/` | `15-journey-progress-demo/` (no change) |

## Page heading and frontmatter updates

| File (after rename) | Old heading | New heading |
|---|---|---|
| `08-query-and-explore.mdx` | `# 9. Query and explore` | `# 8. Query and explore` |
| `09-unified-analytics/business-semantics/index.mdx` | `# 11. Business Semantics` | `# Business Semantics` |
| `10-predictive-analytics/index.mdx` | `# 14. MLOps` | `# 10. Predictive Analytics` |
| `13-data-access-control/index.mdx` | `# 12. Data Access Control` | `# 13. Data Access Control` |
| `14-ci-cd-devops/index.mdx` | `# 13. CI/CD and DevOps` | `# 14. CI/CD and DevOps` |

Frontmatter `sidebar_label` values that contain old numbers must also be updated to match.

---

### Task 1: Rename directories with git mv

**Files:**
- All directories listed in the rename mapping above

- [ ] **Step 1: Run git mv commands in safe order**

Run all commands from `docs/starter-journey/docs/`:

```bash
cd /Users/ivan.calvo/Documents/repos/starter-journey/docs/starter-journey/docs

# Step 1: Free up higher numbers first
git mv 14-mlops 10-predictive-analytics
git mv 13-ci-cd-devops 14-ci-cd-devops
git mv 12-data-access-control 13-data-access-control

# Step 2: Create unified-analytics container and move children
mkdir 09-unified-analytics
git mv 11-business-semantics 09-unified-analytics/business-semantics
git mv 10-databricks-aibi 09-unified-analytics/databricks-aibi

# Step 3: Remaining renames
git mv 16-agents 11-agents
git mv 08-orchestration 12-orchestration
git mv 09-query-and-explore.mdx 08-query-and-explore.mdx
```

- [ ] **Step 2: Verify directory structure**

Run: `ls -1 docs/starter-journey/docs/` and confirm:
```
01-get-started.mdx
02-before-you-start/
03-infra-setup/
04-cost-monitoring/
05-data-governance-strategy/
06-access-your-data/
07-build-first-pipeline/
08-query-and-explore.mdx
09-unified-analytics/
10-predictive-analytics/
11-agents/
12-orchestration/
13-data-access-control/
14-ci-cd-devops/
15-journey-progress-demo/
```

Also verify: `ls docs/starter-journey/docs/09-unified-analytics/` shows `business-semantics/` and `databricks-aibi/`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "refactor(docs): renumber directories to match sidebar order"
```

---

### Task 2: Update sidebars.ts doc IDs

**Files:**
- Modify: `docs/starter-journey/sidebars.ts`

- [ ] **Step 1: Replace all doc IDs referencing renamed directories**

Apply these replacements in `docs/starter-journey/sidebars.ts`:

| Old | New |
|---|---|
| `'09-query-and-explore'` | `'08-query-and-explore'` |
| `'11-business-semantics/index'` | `'09-unified-analytics/business-semantics/index'` |
| `'11-business-semantics/lab'` | `'09-unified-analytics/business-semantics/lab'` |
| `'10-databricks-aibi/dashboards'` | `'09-unified-analytics/databricks-aibi/dashboards'` |
| `'10-databricks-aibi/genie-spaces'` | `'09-unified-analytics/databricks-aibi/genie-spaces'` |
| `'10-databricks-aibi/try-a-sample-genie-space'` | `'09-unified-analytics/databricks-aibi/try-a-sample-genie-space'` |
| `'10-databricks-aibi/databricks-apps'` | `'09-unified-analytics/databricks-aibi/databricks-apps'` |
| `'14-mlops/index'` | `'10-predictive-analytics/index'` |
| `'14-mlops/save-model-to-unity-catalog'` | `'10-predictive-analytics/save-model-to-unity-catalog'` |
| `'14-mlops/batch-inference'` | `'10-predictive-analytics/batch-inference'` |
| `'14-mlops/prepare-datasets'` | `'10-predictive-analytics/prepare-datasets'` |
| `'16-agents/index'` | `'11-agents/index'` |
| `'08-orchestration/workspace'` | `'12-orchestration/workspace'` |
| `'08-orchestration/dabs'` | `'12-orchestration/dabs'` |
| `'12-data-access-control/index'` | `'13-data-access-control/index'` |
| `'13-ci-cd-devops/index'` | `'14-ci-cd-devops/index'` |

- [ ] **Step 2: Verify build**

Run: `cd docs/starter-journey && npm run build 2>&1 | tail -5`
Expected: `[SUCCESS] Generated static files`

- [ ] **Step 3: Commit**

```bash
git add docs/starter-journey/sidebars.ts
git commit -m "refactor(sidebar): update doc IDs to match renamed directories"
```

---

### Task 3: Update internal links in all MDX and MD files

**Files:**
- Modify: every `.mdx` and `.md` file that contains links to renamed paths

Here is the complete list of files and the link replacements needed in each. Apply all replacements using find-and-replace. The replacements are listed in the order: old string → new string.

- [ ] **Step 1: Update links in files**

**`08-query-and-explore.mdx`** (was `09-query-and-explore.mdx`):
- `/docs/08-orchestration/workspace` → `/docs/12-orchestration/workspace`
- `/docs/10-databricks-aibi/dashboards` → `/docs/09-unified-analytics/databricks-aibi/dashboards`
- `/docs/10-databricks-aibi/genie-spaces` → `/docs/09-unified-analytics/databricks-aibi/genie-spaces`
- `/docs/10-databricks-aibi/databricks-apps` → `/docs/09-unified-analytics/databricks-aibi/databricks-apps`

**`01-get-started.mdx`**:
- `/docs/08-orchestration/workspace` → `/docs/12-orchestration/workspace`
- `/docs/09-query-and-explore` → `/docs/08-query-and-explore`
- `/docs/10-databricks-aibi/dashboards` → `/docs/09-unified-analytics/databricks-aibi/dashboards`
- `/docs/11-business-semantics/` → `/docs/09-unified-analytics/business-semantics/`

**`04-cost-monitoring/index.mdx`**:
- `/docs/08-orchestration/workspace` → `/docs/12-orchestration/workspace`
- `/docs/09-query-and-explore` → `/docs/08-query-and-explore`
- `/docs/10-databricks-aibi/dashboards` → `/docs/09-unified-analytics/databricks-aibi/dashboards`
- `/docs/11-business-semantics` → `/docs/09-unified-analytics/business-semantics`

**`04-cost-monitoring/import-usage-dashboard.mdx`**:
- `/docs/10-databricks-aibi/dashboards` → `/docs/09-unified-analytics/databricks-aibi/dashboards`

**`07-build-first-pipeline/index.mdx`**:
- `/docs/08-orchestration/workspace` → `/docs/12-orchestration/workspace`

**`12-orchestration/workspace.mdx`** (was `08-orchestration/workspace.mdx`):
- `/docs/08-orchestration/dabs` → `/docs/12-orchestration/dabs`

**`12-orchestration/dabs.mdx`** (was `08-orchestration/dabs.mdx`):
- `/docs/08-orchestration/workspace` → `/docs/12-orchestration/workspace`

**`09-unified-analytics/databricks-aibi/dashboards.mdx`** (was `10-databricks-aibi/dashboards.mdx`):
- `/docs/09-query-and-explore` → `/docs/08-query-and-explore`
- `/docs/10-databricks-aibi/genie-spaces` → `/docs/09-unified-analytics/databricks-aibi/genie-spaces`

**`09-unified-analytics/databricks-aibi/genie-spaces.mdx`** (was `10-databricks-aibi/genie-spaces.mdx`):
- `/docs/09-query-and-explore` → `/docs/08-query-and-explore`
- `/docs/10-databricks-aibi/try-a-sample-genie-space` → `/docs/09-unified-analytics/databricks-aibi/try-a-sample-genie-space`

**`09-unified-analytics/databricks-aibi/try-a-sample-genie-space.mdx`** (was `10-databricks-aibi/try-a-sample-genie-space.mdx`):
- `/docs/10-databricks-aibi/databricks-apps` → `/docs/09-unified-analytics/databricks-aibi/databricks-apps`
- `/docs/10-databricks-aibi/genie-spaces` → `/docs/09-unified-analytics/databricks-aibi/genie-spaces`

**`09-unified-analytics/databricks-aibi/databricks-apps.mdx`** (was `10-databricks-aibi/databricks-apps.mdx`):
- `/docs/09-query-and-explore` → `/docs/08-query-and-explore`

**`09-unified-analytics/business-semantics/index.mdx`** (was `11-business-semantics/index.mdx`):
- `/docs/10-databricks-aibi/dashboards` → `/docs/09-unified-analytics/databricks-aibi/dashboards`
- `/docs/11-business-semantics/lab` → `/docs/09-unified-analytics/business-semantics/lab`
- `/docs/12-data-access-control/` → `/docs/13-data-access-control/`
- `/docs/13-ci-cd-devops/` → `/docs/14-ci-cd-devops/`
- `/docs/14-mlops/` → `/docs/10-predictive-analytics/`

**`09-unified-analytics/business-semantics/lab.mdx`** (was `11-business-semantics/lab.mdx`):
- `/docs/11-business-semantics/` → `/docs/09-unified-analytics/business-semantics/`
- `/docs/10-databricks-aibi/dashboards` → `/docs/09-unified-analytics/databricks-aibi/dashboards`
- `/docs/10-databricks-aibi/genie-spaces` → `/docs/09-unified-analytics/databricks-aibi/genie-spaces`
- `/docs/12-data-access-control/` → `/docs/13-data-access-control/`

**`13-data-access-control/index.mdx`** (was `12-data-access-control/index.mdx`):
- `/docs/13-ci-cd-devops/` → `/docs/14-ci-cd-devops/`

**`14-ci-cd-devops/index.mdx`** (was `13-ci-cd-devops/index.mdx`):
- `/docs/08-orchestration/dabs` → `/docs/12-orchestration/dabs`

**`10-predictive-analytics/index.mdx`** (was `14-mlops/index.mdx`):
- `/docs/14-mlops/save-model-to-unity-catalog` → `/docs/10-predictive-analytics/save-model-to-unity-catalog`
- `/docs/14-mlops/batch-inference` → `/docs/10-predictive-analytics/batch-inference`
- `/docs/14-mlops/prepare-datasets` → `/docs/10-predictive-analytics/prepare-datasets`
- `/docs/13-ci-cd-devops/` → `/docs/14-ci-cd-devops/`

**`10-predictive-analytics/batch-inference.md`** (was `14-mlops/batch-inference.md`):
- `/docs/14-mlops/save-model-to-unity-catalog` → `/docs/10-predictive-analytics/save-model-to-unity-catalog`
- `/docs/14-mlops/prepare-datasets` → `/docs/10-predictive-analytics/prepare-datasets`
- `/docs/14-mlops/` → `/docs/10-predictive-analytics/`

**`10-predictive-analytics/prepare-datasets.md`** (was `14-mlops/prepare-datasets.md`):
- `/docs/14-mlops/` → `/docs/10-predictive-analytics/`

**`10-predictive-analytics/save-model-to-unity-catalog.md`** (was `14-mlops/save-model-to-unity-catalog.md`):
- `/docs/14-mlops/prepare-datasets` → `/docs/10-predictive-analytics/prepare-datasets`
- `/docs/14-mlops/batch-inference` → `/docs/10-predictive-analytics/batch-inference`
- `/docs/14-mlops/` → `/docs/10-predictive-analytics/`

**`11-agents/index.mdx`** (was `16-agents/index.mdx`):
- `/docs/14-mlops/` → `/docs/10-predictive-analytics/`
- `/docs/08-orchestration/workspace` → `/docs/12-orchestration/workspace`

- [ ] **Step 2: Verify no stale links remain**

Run a grep to verify no old paths remain:
```bash
cd /Users/ivan.calvo/Documents/repos/starter-journey
rg '/docs/(08-orchestration|09-query-and-explore|10-databricks-aibi|11-business-semantics|12-data-access-control|13-ci-cd-devops|14-mlops|16-agents)' docs/starter-journey/docs/
```
Expected: no matches.

- [ ] **Step 3: Verify build**

Run: `cd docs/starter-journey && npm run build 2>&1 | tail -5`
Expected: `[SUCCESS] Generated static files`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "fix(docs): update all internal links to match renamed directories"
```

---

### Task 4: Update page headings and frontmatter

**Files:**
- Modify: 5 files listed below

- [ ] **Step 1: Update headings and frontmatter**

**`docs/starter-journey/docs/08-query-and-explore.mdx`**:
- Change `# 9. Query and explore` → `# 8. Query and explore`
- If `sidebar_label` in frontmatter contains `9.`, change it to remove the number (sidebar config already has the label).

**`docs/starter-journey/docs/09-unified-analytics/business-semantics/index.mdx`**:
- Change `# 11. Business Semantics` → `# Business Semantics` (no longer a top-level numbered section)
- Change `sidebar_label: 11. Business Semantics` → `sidebar_label: Business Semantics` (if present in frontmatter)

**`docs/starter-journey/docs/10-predictive-analytics/index.mdx`**:
- Change `# 14. MLOps` → `# 10. Predictive Analytics`
- Change `sidebar_label: 14. MLOps` → `sidebar_label: Predictive Analytics`
- Change `description:` to reference Predictive Analytics instead of MLOps if appropriate

**`docs/starter-journey/docs/13-data-access-control/index.mdx`**:
- Change `# 12. Data Access Control` → `# 13. Data Access Control`
- If `sidebar_label` contains `12.`, change to `13.` or remove the number.

**`docs/starter-journey/docs/14-ci-cd-devops/index.mdx`**:
- Change `# 13. CI/CD and DevOps` → `# 14. CI/CD and DevOps`
- If `sidebar_label` contains `13.`, change to `14.` or remove the number.

Also update any journey checklists in these pages that reference old section numbers (e.g., `14-mlops/index.mdx` has a checklist with old section names).

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "fix(docs): update page headings and frontmatter to match new section numbers"
```

---

### Task 5: Update agent instructions (CLAUDE.md + .cursorrules)

**Files:**
- Modify: `CLAUDE.md`
- Modify: `.cursorrules`

Both files must stay identical (CI enforced by `scripts/check_agent_instructions_sync.sh`).

- [ ] **Step 1: Update the repository layout tree**

In both files, find the directory listing under `## Repository layout` and replace the docs directory tree with:

```
│ └── docs/ ← all documentation pages (.mdx)
│ ├── 01-get-started.mdx
│ ├── 02-before-you-start/
│ ├── 03-infra-setup/
│ ├── 04-cost-monitoring/
│ ├── 05-data-governance-strategy/
│ ├── 06-access-your-data/
│ ├── 07-build-first-pipeline/
│ ├── 08-query-and-explore.mdx
│ ├── 09-unified-analytics/
│ ├── 10-predictive-analytics/
│ ├── 11-agents/
│ ├── 12-orchestration/
│ ├── 13-data-access-control/
│ ├── 14-ci-cd-devops/
│ └── 15-journey-progress-demo/
```

- [ ] **Step 2: Update the example URL**

In both files, find:
```
`/docs/10-databricks-aibi/dashboards`
```
and replace with:
```
`/docs/09-unified-analytics/databricks-aibi/dashboards`
```

(This appears in the "Common mistakes to avoid" section under "Using wrong link format".)

- [ ] **Step 3: Verify sync**

Run: `bash scripts/check_agent_instructions_sync.sh`
Expected: passes (files are identical).

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md .cursorrules
git commit -m "docs(agent): update directory layout and example URL in agent instructions"
```

---

### Task 6: Full build verification

- [ ] **Step 1: Production build**

Run: `cd docs/starter-journey && npm run build`
Expected: `[SUCCESS] Generated static files`. No broken-link errors.

- [ ] **Step 2: Freshness check**

Run: `python scripts/check_section_freshness.py`
Expected: `All 14 sections are within 60 days.`

- [ ] **Step 3: Agent instructions sync check**

Run: `bash scripts/check_agent_instructions_sync.sh`
Expected: passes.

- [ ] **Step 4: Show commit log**

Run: `git log --oneline -10`

---

## Self-review checklist

1. **Spec coverage:** All three user requirements covered: sidebar number fix (Task 2+4), directory renaming (Task 1), cascading changes (Tasks 3-5).

2. **Placeholder scan:** No TBD, TODO, or "implement later" in any step. All file paths and replacement strings are explicit.

3. **Type consistency:** Doc IDs in `sidebars.ts` (Task 2) match the renamed directory paths from Task 1. Internal links (Task 3) use the same new paths. Headings (Task 4) match sidebar labels.
