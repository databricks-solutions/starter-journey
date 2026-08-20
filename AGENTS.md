# Agent instructions — Starter Journey

Guidance for AI coding agents (Claude Code, Cursor, and similar tools) working in this repository.

## Single source of truth

This repository uses one root [AGENTS.md](AGENTS.md) for all agent guidance. Do not recreate `CLAUDE.md`, `.cursorrules`, or tool-specific instruction duplicates.

## Behavioral guidelines

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

### 5. Honest Collaboration

**Be a partner, not a yes-man. Push back when it matters.**

You are too agreeable by default. I want objective, honest collaboration — not validation.

- If my idea is bad, say so directly and explain why. Don't soften it into meaninglessness.
- If I'm wrong, tell me I'm wrong. Don't reframe my mistake as "a good start" or bury the correction.
- Never open with "You're absolutely right!", "Great idea!", or similar empty affirmations. If I'm right, just proceed. If I'm not, say so.
- Give your genuine assessment first, without mirroring my tone or enthusiasm. Anchoring bias kills honest feedback.
- When pushing back, always offer a concrete alternative or path forward. Criticism without a solution is just noise.
- If a better approach exists, name it upfront — not buried at the end after you've already validated my direction.

The test: Would a senior engineer with no incentive to flatter me give this same response? If not, revise it.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

## Agent workflow (repository)

### Git and GitHub

- Create feature branches from `main` for all changes.
- PRs to `main` run a build check via GitHub Actions (`test-deploy.yml`).
- Merges to `main` auto-deploy to GitHub Pages (`deploy.yml`).
- Weekly section freshness runs via `section-freshness.yml`; bump `docs/starter-journey/section-freshness.csv` when you meaningfully update a journey section.
- Do not commit `node_modules/`, `build/`, or `.docusaurus/`.
- Create commits and push to remote only when the user explicitly asks.
- Use `gh` for GitHub tasks (issues, PRs, checks) when the user requests them.

### Doc change checklist

Before and after editing documentation:

1. Read [docs/STYLE.md](docs/STYLE.md) for page templates and writing rules.
2. Check [docs/starter-journey/sidebars.ts](docs/starter-journey/sidebars.ts) for section numbering and doc IDs.
3. Edit `.mdx` files under `docs/starter-journey/docs/` (register new pages in `sidebars.ts`).
4. **Section freshness (required):** After you meaningfully update docs in a top-level journey section, bump that section's `last_update` in [`docs/starter-journey/section-freshness.csv`](docs/starter-journey/section-freshness.csv) to today's date (`YYYY-MM-DD`) in the **same change**. Infer the section from the doc path prefix (e.g. `docs/starter-journey/docs/03-infra-setup/...` → `3. Infra Setup`). The `section_name` value must match the category `label` in `sidebars.ts` exactly.
5. Run `npm run build` from `docs/starter-journey/` to catch broken links and doc IDs.

**Doc ID vs URL:** Sidebar and frontmatter use Docusaurus doc `id` values without extension (e.g. `03-infra-setup/index`). Published site links use `/docs/<path>` (e.g. `/docs/03-infra-setup/`). Do not use repo-relative file paths in doc content.

## Project overview

Starter Journey is a Docusaurus 3 documentation site deployed to GitHub Pages at `https://databricks-solutions.github.io/starter-journey/`. It guides organizations through their first Databricks setup — from account creation through production pipelines and BI.

## Repository layout

```
starter-journey/
├── AGENTS.md                          ← agent instructions (all tools)
├── docs/
│   ├── STYLE.md                       ← writing style guide (read before editing docs)
│   └── starter-journey/               ← Docusaurus project root
│       ├── package.json
│       ├── docusaurus.config.ts
│       ├── sidebars.ts                ← sidebar navigation (manually managed)
│       ├── section-freshness.csv      ← last-updated date per journey section
│       ├── src/                       ← React components, CSS, pages
│       ├── static/img/                ← images (prefixed by section)
│       ├── blog/                      ← blog posts (.mdx)
│       └── docs/                      ← all documentation pages (.mdx)
│           ├── 01-get-started.mdx
│           ├── 02-before-you-start/
│           ├── 03-infra-setup/
│           ├── 04-cost-monitoring/
│           ├── 05-data-governance-strategy/
│           ├── 06-access-your-data/
│           ├── 07-build-first-pipeline/
│           ├── 08-query-and-explore.mdx
│           ├── 09-unified-analytics/
│           ├── 10-predictive-analytics/
│           ├── 11-agents/
│           ├── 12-orchestration/
│           ├── 13-data-access-control/
│           ├── 14-ci-cd-devops/
│           └── 15-journey-progress-demo/
├── scripts/
│   └── check_section_freshness.py
└── .github/workflows/
    ├── deploy.yml                     ← pushes to main → build → GitHub Pages
    ├── test-deploy.yml                ← PRs to main → build only (no deploy)
    └── section-freshness.yml          ← weekly stale-section check
```

Key: the Docusaurus project lives at `docs/starter-journey/`, not the repo root. All `npm` commands run from that directory.

## Running the project locally

```bash
cd docs/starter-journey
npm install
npm run start -- --port 3000
```

The site opens at `http://localhost:3000/starter-journey/`. Hot-reload is enabled — saved changes appear immediately.

Other useful commands (all from `docs/starter-journey/`):

| Command | Purpose |
|---|---|
| `npm run build` | Production build (catches broken links) |
| `npm run serve` | Serve the production build locally |
| `npm run typecheck` | Run TypeScript type checking |

## CI/CD

- **PRs to `main`** trigger `test-deploy.yml` — runs `docusaurus build` to verify the site compiles. Broken links fail the build (`onBrokenLinks: 'throw'` in `docusaurus.config.ts`).
- **Pushes to `main`** trigger `deploy.yml` — builds and deploys to GitHub Pages.
- **Mondays 14:00 UTC** — `section-freshness.yml` checks that every top-level journey section was updated within the last 60 days (see below).
- npm packages are fetched from a JFrog registry via OIDC in CI. Locally, the default npm registry works.

## Section freshness tracker

Top-level sidebar sections (1–14 in `sidebars.ts`) must stay current. Dates live in `docs/starter-journey/section-freshness.csv` (`section_name`, `last_update` as `YYYY-MM-DD`).

**When you meaningfully update docs in a section**, bump that section's `last_update` in the same PR.

**Agent rule:** Do not finish a doc edit without updating `section-freshness.csv` when the change is meaningful. Map the edited file to its top-level section via the numbered folder under `docs/starter-journey/docs/` (for example `07-build-first-pipeline/` → `7. Build the first pipeline`). If you touch pages in multiple top-level sections, update every affected row. Skip the CSV bump only for trivial fixes (typos, formatting) that do not change reader-facing guidance.

```bash
python scripts/check_section_freshness.py
```

If any section is older than 60 days, the weekly workflow fails and opens or updates a GitHub issue labeled `section-freshness`. The issue @mentions every human [repo contributor](https://docs.github.com/en/rest/repos/repos#list-repository-contributors) (bots excluded) so they get a GitHub notification; repeat failures add a new comment with mentions again. When all sections are fresh again, that issue is closed automatically.

When adding a new numbered section, add a row to the CSV and to `REQUIRED_SECTIONS` in `scripts/check_section_freshness.py` (label must match `sidebars.ts` exactly).

## File patterns

- **Doc pages:** `docs/starter-journey/docs/**/*.mdx` — numbered section prefixes (e.g. `03-infra-setup/`) matching sidebar doc IDs.
- **Sidebar config:** `docs/starter-journey/sidebars.ts` — manually managed. Every new page must be registered here (IDs omit the `.mdx` extension).
- **Site config:** `docs/starter-journey/docusaurus.config.ts` — plugins, navbar, footer, gtag.
- **Images:** `docs/starter-journey/static/img/`. One-off images prefix with a section slug (e.g., `infra-*.png`); screenshot guides use a per-guide subfolder `static/img/<guide-slug>/`.
- **Blog posts:** `docs/starter-journey/blog/YYYY-MM-DD-<slug>.mdx`.

## Documentation authoring

When creating or editing content under `docs/starter-journey/docs/`, follow **[docs/STYLE.md](docs/STYLE.md)**. The key rules are summarized below, but read the full style guide before writing.

### Page voices

Two voices, one per page type. Pick the voice from the type. Full spec in [docs/STYLE.md](docs/STYLE.md).

| Page type | Use for | Voice | Goal |
|---|---|---|---|
| **Technical** | Setup, how-to, step-by-step | **Build Log** | Reader finishes with the thing built |
| **Educational** | Concepts, architecture, decisions | **Field Notes** | Reader can make the call themselves |

- **Build Log** (technical): a practitioner writing up how they got it working. Lead with the outcome, steps read like a log, failure modes go in a "Where people trip" section. One informative first-person aside allowed.
- **Field Notes** (educational): an experienced engineer explaining a decision. Open with the call, one plain analogy, tradeoffs stated straight, opinions welcome.

### Shared chrome (every page)

**Top** — YAML frontmatter + value prop + prereqs:

```md
---
sidebar_label: <short label>
description: <one line — used by search and social previews>
---

# <Page title>

> **You'll <verb> ...** in ~<N> min.
>
> **Prereqs:** [<link>](...)
```

**Bottom** — always a `## Next` block:

```md
## Next
- **Do next:** [<link>](...)
- **Learn why:** [<link>](...)
- **Reference:** [<official docs>](...)
```

Cross-link every technical page to its educational counterpart and vice versa via this block.

### Admonitions

Only three are allowed:

| Admonition | When to use |
|---|---|
| `:::tip` | Optional improvement, not required for steps to work |
| `:::warning` | Reader will hit a problem if they skip this |
| `:::danger` | Irreversible, security-impacting, or costs-money action |

Do **not** use `:::info`, `:::success`, or `:::note`. Convert those to prose or numbered steps.

### Anti-slop rules

All prose runs through the `humanizer` skill (`skills/humanizer/SKILL.md`) before it ships: draft, ask "what still sounds AI here?", fix it. The mechanical rules a build cannot catch:

- **No em dashes or en dashes.** Zero. Replace with a period, comma, colon, or parentheses. Scan for `—` and `–` before finishing.
- **Cut AI vocabulary:** leverage, robust, seamless, pivotal, crucial, delve, vibrant, landscape (figurative), testament, underscore, foster, "powerful feature," "in today's data-driven world."
- **Use is/are/has,** not "serves as," "boasts," "features."
- No significance inflation, no `-ing` padding, no forced rule of three, no promotional language, no generic upbeat conclusions, no signposting ("Let's dive in").
- Vary sentence length. One idea per sentence. Sentence case in headings.

See the full list in [docs/STYLE.md](docs/STYLE.md).

### Images

Place images under `docs/starter-journey/static/img/` with a section prefix (e.g., `uc-*.png`, `infra-*.png`, `aibi-*.png`).

### YouTube videos

Embed using a raw `<iframe>` tag:

```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/<VIDEO_ID>"
  title="<descriptive title>"
></iframe>
```

## Adding a new section

Follow these steps when adding a numbered section to the journey:

### 1. Create the directory and index page

Create a new directory under `docs/starter-journey/docs/<NN-section-slug>/` with an `index.mdx` file. Use Template B (Educational) for the index page. Include:

- Frontmatter with `sidebar_position: 0`, `sidebar_label`, and `description`
- The section number in the title (e.g., `# 10. DevOps and CI/CD`)
- A `<StarterJourneyProgress currentLevel={N}/>` component call after the intro blockquote (import it at the top of the file: `import StarterJourneyProgress from '@site/src/components/StarterJourneyProgress';`)
- An `## In this section` block linking to subpages (if any)

### 2. Create subpages

Add `.mdx` files in the same directory. Each subpage needs the shared chrome (frontmatter, value prop, prereqs, `## Next` block). Use Template A or B depending on whether it is a how-to or a concept page.

### 3. Register in the sidebar

Edit `docs/starter-journey/sidebars.ts`. Add a new entry to the `docsSidebar` array. Follow the existing pattern:

```typescript
{
  type: 'category',
  label: '<N>. <Section Name>',
  collapsed: true,
  link: {type: 'doc', id: '<NN-section-slug>/index'},
  items: [
    '<NN-section-slug>/subpage-1',
    '<NN-section-slug>/subpage-2',
  ],
},
```

For a standalone page with no subpages, use a simple doc entry instead:

```typescript
{type: 'doc', id: '<NN-section-slug>', label: '<N>. <Section Name>'},
```

### 4. Update the progress component

**This step is required every time a new top-level section is added to the sidebar.**

Open `docs/starter-journey/src/components/StarterJourneyProgress/journey-blocks.ts` and add a new entry to `JOURNEY_BLOCKS`:

- **`id`**: kebab-case slug matching the section (e.g. `"cicd-devops"`)
- **`label`**: display name shown in the component (e.g. `"CI/CD and DevOps"`)
- **`level`**: the next integer after the current `MAX_LEVEL`
- **`icon`**: a key from `BLOCK_ICONS` in `icons.ts` (pick the closest fit, or add a new icon if nothing matches)

Also update `MAX_LEVEL` to match the new block's level.

For fork sections (multiple parallel tracks at the same level, like section 6), add one block per track with the same `level` and a distinct `forkColumn` (`"da"`, `"ml"`, or `"genai"`).

Use the new block's `level` value as the `currentLevel` prop in the `<StarterJourneyProgress>` call on the section's `index.mdx`.

### 5. Wire navigation links

- Update the **previous section's last page** to add a `Do next:` link pointing to the new section.
- Ensure the new section's `## Next` block links forward (to subpages or the next section) and backward (to the previous section).

### 6. Validate

Run `npm run build` from `docs/starter-journey/` to verify no broken links. The build will throw on any dead internal link.

Add a row to `docs/starter-journey/section-freshness.csv` and to `REQUIRED_SECTIONS` in `scripts/check_section_freshness.py` (label must match `sidebars.ts` exactly).

## Adding a blog post

Blog posts go in `docs/starter-journey/blog/` as `.mdx` files. Follow the naming convention: `YYYY-MM-DD-<slug>.mdx`. Authors are defined in `blog/authors.yml` and tags in `blog/tags.yml`.

## Configuration files reference

| File | Purpose |
|---|---|
| `AGENTS.md` | Agent instructions for all coding tools |
| `docs/starter-journey/docusaurus.config.ts` | Site config (URL, presets, plugins, navbar, footer, gtag) |
| `docs/starter-journey/sidebars.ts` | Sidebar navigation — manually managed, not auto-generated |
| `docs/starter-journey/package.json` | Dependencies and scripts |
| `docs/STYLE.md` | Writing style guide for all doc pages |
| `.github/workflows/deploy.yml` | Production deployment workflow |
| `.github/workflows/test-deploy.yml` | PR build-check workflow |
| `.github/workflows/section-freshness.yml` | Weekly stale-section check |
| `docs/starter-journey/section-freshness.csv` | Last-updated date per journey section |
| `scripts/check_section_freshness.py` | Freshness checker (stdlib only) |

## Common mistakes to avoid

- **Editing `sidebars.ts` without building** — always run `npm run build` after sidebar changes to catch broken doc IDs.
- **Using wrong link format** — internal doc links use `/docs/<path>` (e.g., `/docs/09-unified-analytics/databricks-aibi/dashboards`). Do not use relative file paths.
- **Adding admonitions beyond the allowed three** — the build won't catch this, but it violates the style guide.
- **Forgetting the `## Next` block** — every page needs it. Technical pages link to educational counterparts and vice versa.
- **Images without section prefix** — `static/img/` is flat. Prefix images to avoid name collisions.
- **Recreating tool-specific instruction files** — keep guidance in `AGENTS.md` only.

If a style-guide rule conflicts with an instruction in the conversation, ask before deviating.

## PDF deck button standard

Every button that links to a PDF **must** use the `<Button>` component with `useBaseUrl`. Never use raw `<a>` tags for PDF links.

### Required imports

Every `.mdx` file that contains a PDF button must have these imports at the top (after frontmatter):

```mdx
import useBaseUrl from '@docusaurus/useBaseUrl';
import Button from '@site/src/components/Button';
```

### Component format

```jsx
<Button label="Deck - [Topic the deck addresses]" link={useBaseUrl('/pdfs/filename.pdf')} />
```

### Label naming

Labels **must** follow the pattern `"Deck - [Topic]"`:

```
"Deck - [Topic the deck addresses]"
```

Examples:

- Good: `Deck - Genie Best Practices`, `Deck - UC Best Practices`, `Deck - Metric Views`
- Bad: `UC Best Practices Deck`, `View PDF`, `Genie Spaces Implementation Guide`

### Placement

- Place deck buttons inside a `:::tip` admonition (never `:::warning` or `:::danger`).
- Add a short lead-in sentence before the button, e.g. "For a more elaborated explanation, check the following deck:"

## Journey overview table sync

The `## What you'll build` table in `docs/starter-journey/docs/01-get-started.mdx` lists every numbered journey section. It must stay in sync with `docs/starter-journey/sidebars.ts`.

### When this rule applies

Whenever you add, remove, rename, or restructure a numbered section in `sidebars.ts`, update the table in `01-get-started.mdx` in the same change.

### What to update

- **Add a row** for every new numbered section. Use the sidebar `label` (e.g. `'9. Unified Analytics'`) for the section number and name.
- **Remove a row** when a section is deleted from the sidebar.
- **Update the link** when a section's first doc ID changes.
- **Update the "What you'll have when done" description** when the section's scope changes meaningfully.

### Table format rules

- Link the section title to its index page (`/docs/<folder>/`). Use the `link.id` value from `sidebars.ts` to derive the URL.
- If a section has no direct index page (no `link:` property on the category in `sidebars.ts`), write the section title in bold without a link, then list the main sub-sections as bullets using `<br/>` within the table cell.
- If a sub-section also has no direct link, show it as a bold label and list its pages as indented bullets using `<br/>&nbsp;&nbsp;-`.
- Keep one row per numbered section. Do not create separate rows for sub-sections.

### Example: section with no top-level link

Sidebar entry:

```ts
{
  type: 'category',
  label: '9. Unified Analytics',
  items: [
    {
      type: 'category',
      label: 'Business Semantics',
      link: { type: 'doc', id: '09-unified-analytics/business-semantics/index' },
      items: [...],
    },
    {
      type: 'category',
      label: 'Databricks AI/BI',
      // no link property
      items: [
        '09-unified-analytics/databricks-aibi/dashboards',
        '09-unified-analytics/databricks-aibi/genie-spaces',
        '09-unified-analytics/databricks-aibi/databricks-apps',
      ],
    },
  ],
}
```

Table row:

```md
| 9 | **Unified Analytics**<br/>- [Business Semantics](/docs/09-unified-analytics/business-semantics/)<br/>- **Databricks AI/BI**<br/>&nbsp;&nbsp;- [Dashboards](/docs/09-unified-analytics/databricks-aibi/dashboards)<br/>&nbsp;&nbsp;- [Genie Spaces](/docs/09-unified-analytics/databricks-aibi/genie-spaces)<br/>&nbsp;&nbsp;- [Apps](/docs/09-unified-analytics/databricks-aibi/databricks-apps) | KPIs defined as Unity Catalog metric views; dashboards, Genie Spaces, and apps surfacing data to business users |
```
