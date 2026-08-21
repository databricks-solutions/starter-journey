# Starter Journey: writing style

This site should read like a person who has done this work is walking you through it. Engaging,
plain-spoken, occasionally opinionated. Not a press release, not a spec sheet, not a chatbot.

Two voices, one per page type. Both obey the same anti-slop rules.

| Page type | Use for | Voice | Goal |
|---|---|---|---|
| **Technical** (how-to, setup, step-by-step) | "Do this and you'll have a working thing" | **Build Log** | Reader finishes with the thing built |
| **Educational** (concept, architecture, decision) | "Here's how to think about it" | **Field Notes** | Reader can make the call themselves |

Every page is one or the other. Pick the voice from the type, then write.

---

## Run the humanizer before you ship

All prose goes through the `humanizer` skill (`skills/humanizer/SKILL.md`) before it lands.
Do the skill's loop, not a vibe check: draft, then ask "what still sounds AI here?", then fix what
you find. The mechanical rules below are the part a build can't catch, so they are on you.

---

## Voice 1: Build Log (technical pages)

You're a practitioner writing up how you got something working, for the next person.

- **Lead with the outcome.** "What you'll walk away with," stated concretely. Not a topic, a result.
- **Steps read like a log.** Numbered, imperative, with the command and what you expect to see back.
- **Momentum over ceremony.** Short setup, then go. No throat-clearing.
- **A first-person aside is allowed when it carries information.** "I always click the first one by
  hand even when I'll Terraform the rest, seeing the resources appear makes the code make sense."
  One per page, tops. If it doesn't teach something, cut it.
- **Failure modes get a real home.** Use a "Where people trip" section instead of a cold
  "Troubleshooting" heading. Name the actual snag and the actual fix.

## Voice 2: Field Notes (educational pages)

You're the experienced engineer telling a colleague how to think about a decision.

- **Open with the call.** State the conclusion in the first paragraph, then back it up. Don't make
  the reader scroll for the recommendation.
- **One mental model.** A plain analogy beats an abstract definition. Carry it, don't stack five.
- **Tradeoffs stated straight.** "Use X when... use Y when..." Real conditions, not "it depends."
- **Gotchas from experience.** What actually goes wrong, with the consequence. A decision table is
  fine when there's a genuine fork.
- **Opinions are welcome here.** "A monolithic repo looks tidy. It isn't." Say the thing.

---

## Anti-slop rules (every page, non-negotiable)

These are the humanizer rules that matter most for this site. A build won't flag them.

1. **No em dashes or en dashes.** Not "use sparingly," zero. Replace with a period, comma, colon, or
   parentheses. Scan the final text for `—` and `–` before you call it done.
2. **Cut AI vocabulary.** Banned: leverage, robust, seamless, seamlessly, pivotal, crucial, delve,
   vibrant, landscape (figurative), testament, underscore, foster, intricate, realm, tapestry,
   "powerful feature," "in today's data-driven world."
3. **Use `is`/`are`/`has`.** Not "serves as," "boasts," "features," "represents."
4. **No significance inflation.** State what a thing does. Skip "marks a pivotal moment," "plays a
   key role," "reflects a broader shift."
5. **Drop the `-ing` padding.** No "...ensuring reliability and fostering growth" tails. If it holds
   real information, promote it to its own sentence.
6. **Don't force the rule of three.** Use the natural number of items. Two is fine. Four is fine.
7. **No promotional language.** No "stunning," "world-class," "groundbreaking," "must-try."
8. **No generic upbeat conclusions.** End on a concrete next action, not "the future looks bright."
9. **No signposting.** Skip "Let's dive in," "Here's what you need to know." Just say it.
10. **Vary sentence length.** Mix short and long. Three same-length sentences in a row reads like a
    machine. Read it aloud; if it drones, break it up.
11. **Sentence case in headings.** "Create the workspace," not "Create The Workspace."

---

## Shared chrome (every page, both voices)

These are functional and stay exactly as-is, even though some look like patterns the humanizer flags
(the bold labels are navigation, not decoration).

**Top**: frontmatter, a one-line value prop, prereqs:

```md
---
sidebar_label: <short label>
description: <one line, used by search and social previews>
---

# <Page title>

> **You'll <verb> ...** in ~<N> min.
>
> **Prereqs:** [<link>](...)
```

**Bottom**: always a `## Next` block:

```md
## Next
- **Do next:** [<link>](...)
- **Learn why:** [<link>](...)
- **Reference:** [<official docs>](...)
```

Cross-link every technical page to its educational counterpart through this block, and back again.

---

## Admonitions

Three, no more:

| Admonition | When |
|---|---|
| `:::tip` | Optional improvement, not required for the steps to work |
| `:::warning` | Reader hits a problem if they skip this |
| `:::danger` | Irreversible, security-impacting, or costs money |

No `:::info`, `:::success`, or `:::note`. Turn those into prose or a numbered step.

---

## Screenshot guides

A screenshot guide is a Build Log page that walks the reader through a console task one screenshot at a time.
Use it for click-through setup where seeing the screen matters more than reading prose.
`03-infra-setup/metastore-admins/set-admin-group` is the canonical single-flow example, and `03-infra-setup/metastore-admins/uc-assets-ownership` the canonical multi-part one.
Copy their shape.

On top of the shared chrome:

- **The big picture**: one or two sentences on the end state.
- **Prerequisites**: roles and access needed.
- **Steps**: each is `### N. <imperative>`, a sentence or two of what to do and what you expect to see, then the screenshot.
- **Verify**: how to confirm it worked, with expected-output screenshots. Say where you are (account console vs workspace) when it changes.
- **Where people trip**: a `<details>` per snag.

For a task with distinct parts (for example, transferring first-level securables and then catalogs), use one `## <imperative>` section per part instead of a single `## Steps`, each with its own `### N.` steps restarting at 1. Screenshots still number continuously across the whole page.

Screenshots:

- Store per guide in `static/img/<guide-slug>/`, numbered in the order they appear (`1.png`, `2.png`, ...).
- Reference with `<img src={useBaseUrl('/img/<guide-slug>/1.png')} alt="what the shot shows"/>`. Always write `alt`.

Prompt alternatives:

- Where a step can also be done with a prompt or a SQL command, offer it in a `:::tip[Prefer a prompt?]` with a fenced code block. Docusaurus gives the code block a copy button.
- Add it only where the prompt is a genuine alternative to the click, not on every step.

---

## Structure that must survive a rewrite

Changing the voice does not mean breaking the site. Keep all of this intact:

- Frontmatter (`sidebar_label`, `sidebar_position`, `description`).
- Internal links in `/docs/<path>` form (never repo-relative file paths).
- YouTube `<iframe>` embeds and their titles.
- Images under `static/img/`: one-off images use a section prefix (`uc-*.png`, `infra-*.png`, `aibi-*.png`); screenshot guides use a per-guide subfolder `static/img/<guide-slug>/` (see Screenshot guides).
- Journey checklists on section index pages.
- The `## Next` block on every page.
- **Section freshness:** when you meaningfully change a section, bump its `last_update` in
  `docs/starter-journey/section-freshness.csv` to today (`YYYY-MM-DD`) in the same change.

---

## The test

Read the page out loud. If it sounds like a person who has actually done this telling you how, it's
right. If it sounds like a brochure or a chatbot, it isn't. Rewrite until it's the first one.
