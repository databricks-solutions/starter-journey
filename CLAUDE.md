# CLAUDE.md

Guidance for AI agents (Claude Code, Cursor, etc.) working in this repository.

## Project overview

Starter Journey is a Docusaurus 3 documentation site deployed to GitHub Pages at `https://databricks-solutions.github.io/starter-journey/`. It guides organizations through their first Databricks setup — from account creation through production pipelines and BI.

## Repository layout

```
starter-journey/
├── CLAUDE.md                          ← you are here
├── docs/
│   ├── STYLE.md                       ← writing style guide (read before editing docs)
│   └── starter-journey/               ← Docusaurus project root
│       ├── package.json
│       ├── docusaurus.config.ts
│       ├── sidebars.ts                ← sidebar navigation (manually managed)
│       ├── src/                       ← React components, CSS, pages
│       ├── static/img/               ← images (prefixed by section)
│       ├── blog/                      ← blog posts (.mdx)
│       └── docs/                      ← all documentation pages (.md)
│           ├── get-started.md
│           ├── query-and-explore.md
│           ├── before-you-start/
│           ├── infra-setup/
│           ├── data-governance-strategy/
│           ├── access-your-data/
│           ├── build-first-pipeline/
│           ├── orchestration/
│           └── databricks-aibi/
└── .github/workflows/
    ├── deploy.yml                     ← pushes to main → build → GitHub Pages
    └── test-deploy.yml                ← PRs to main → build only (no deploy)
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

```bash
python scripts/check_section_freshness.py
```

If any section is older than 60 days, the weekly workflow fails and opens or updates a GitHub issue labeled `section-freshness`. The issue @mentions every human [repo contributor](https://docs.github.com/en/rest/repos/repos#list-repository-contributors) (bots excluded) so they get a GitHub notification; repeat failures add a new comment with mentions again. When all sections are fresh again, that issue is closed automatically.

When adding a new numbered section, add a row to the CSV and to `REQUIRED_SECTIONS` in `scripts/check_section_freshness.py`.

## Documentation authoring

When creating or editing markdown under `docs/starter-journey/docs/`, follow **[docs/STYLE.md](docs/STYLE.md)**. The key rules are summarized below, but read the full style guide before writing.

### Page templates

| Template | Use for | Goal |
|---|---|---|
| **Template A — Technical** | Setup, how-to, step-by-step guides | Reader finishes with a working thing |
| **Template B — Educational** | Concepts, architecture, decision guides | Reader can make an informed decision |

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

### Writing voice

- **Technical pages:** imperative, direct language. Commands, expected output, done.
- **Educational pages:** explain the *why* tied to real engineering or business problems.
- One idea per sentence. Paragraphs under 4 sentences. Active voice.
- **No AI slop.** Banned phrases: "In today's data-driven world", "It's important to note", "Let's dive in", "seamlessly", "robust", "This powerful feature enables". Every sentence must carry new information.

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

Create a new directory under `docs/starter-journey/docs/<section-slug>/` with an `index.md` file. Use Template B (Educational) for the index page. Include:

- Frontmatter with `sidebar_position: 0`, `sidebar_label`, and `description`
- The section number in the title (e.g., `# 10. DevOps and CI/CD`)
- A journey checklist showing all prior sections checked off
- An `## In this section` block linking to subpages (if any)

### 2. Create subpages

Add `.md` files in the same directory. Each subpage needs the shared chrome (frontmatter, value prop, prereqs, `## Next` block). Use Template A or B depending on whether it is a how-to or a concept page.

### 3. Register in the sidebar

Edit `docs/starter-journey/sidebars.ts`. Add a new entry to the `docsSidebar` array. Follow the existing pattern:

```typescript
{
  type: 'category',
  label: '<N>. <Section Name>',
  collapsed: true,
  link: {type: 'doc', id: '<section-slug>/index'},
  items: [
    '<section-slug>/subpage-1',
    '<section-slug>/subpage-2',
  ],
},
```

For a standalone page with no subpages, use a simple doc entry instead:

```typescript
{type: 'doc', id: '<section-slug>', label: '<N>. <Section Name>'},
```

### 4. Wire navigation links

- Update the **previous section's last page** to add a `Do next:` link pointing to the new section.
- Ensure the new section's `## Next` block links forward (to subpages or the next section) and backward (to the previous section).

### 5. Validate

Run `npm run build` from `docs/starter-journey/` to verify no broken links. The build will throw on any dead internal link.

Add a row to `docs/starter-journey/section-freshness.csv` and to `REQUIRED_SECTIONS` in `scripts/check_section_freshness.py` (label must match `sidebars.ts` exactly).

## Adding a blog post

Blog posts go in `docs/starter-journey/blog/` as `.mdx` files. Follow the naming convention: `YYYY-MM-DD-<slug>.mdx`. Authors are defined in `blog/authors.yml` and tags in `blog/tags.yml`.

## Configuration files reference

| File | Purpose |
|---|---|
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
- **Using wrong link format** — internal doc links use `/docs/<path>` (e.g., `/docs/databricks-aibi/dashboards`). Do not use relative file paths.
- **Adding admonitions beyond the allowed three** — the build won't catch this, but it violates the style guide.
- **Forgetting the `## Next` block** — every page needs it. Technical pages link to educational counterparts and vice versa.
- **Images without section prefix** — `static/img/` is flat. Prefix images to avoid name collisions.

If a style-guide rule conflicts with an instruction in the conversation, ask before deviating.
