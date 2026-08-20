---
name: screenshot-guide
version: 0.1.0
description: Turn a reference doc, a folder of screenshots, and optional prompts into a published Starter Journey screenshot guide. Use when adding a step-by-step click-through guide to the docs site.
---

# Screenshot guide authoring

You are creating a step-by-step screenshot guide for the Starter Journey docs site.
The reader follows console screenshots to complete one setup task.

## Inputs

Ask the author for anything missing:

- **Reference**: a `.md` describing the task and its steps.
- **Screenshots**: a folder of images in step order.
- **Prompts** (optional): natural-language or SQL alternatives to UI steps.
- **Target**: the doc path under `docs/starter-journey/docs/...` and a guide slug (derive the slug from the filename if not given).

## Before you write

1. Read `docs/STYLE.md`, especially the "Screenshot guides" and Build Log sections.
2. Open `docs/starter-journey/docs/03-infra-setup/metastore-admins/set-admin-group.mdx`. That is the shape to copy.
3. Read the reference and view every screenshot. Map each screenshot to a step.

## Build the guide

1. Copy the screenshots into `docs/starter-journey/static/img/<guide-slug>/`, renamed `1.png`, `2.png`, ... in step order.
2. Write the `.mdx` in Build Log voice, following the layout in STYLE.md: shared chrome, The big picture, Prerequisites, Steps (each with its screenshot), Verify, Where people trip, Next.
3. Add a `:::tip[Prefer a prompt?]` with a fenced code block only on steps where a prompt is a real alternative.
4. Register the page in `docs/starter-journey/sidebars.ts` (skip if already present).

## Finish

1. Run the `humanizer` skill over the prose. Fix what it flags. Scan for `—`/`–` and the banned vocabulary in STYLE.md.
2. Bump the guide's top-level section row in `docs/starter-journey/section-freshness.csv` to today's date.
3. From `docs/starter-journey/`, run `npm run build`. Fix any broken links or doc-id errors until it passes.
