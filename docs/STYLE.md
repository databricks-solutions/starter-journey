# Starter Journey — Recommended Page Layout

Based on review of:

- Technical sample: `infra-setup/create-workspaces/aws/manual.md`**
- Educational sample: `before-you-start/foundations/unity-catalog.md`

Both pages lean heavily on admonitions (`:::info`, `:::success`, `:::danger`) to do structural work that headings should be doing, and there's no consistent open/close pattern. The reader can't tell at a glance where they are in the learning flow.

Recommendation: **two templates, one shared chrome, strict admonition rules.**

---

## Shared chrome (every page)

**Top:**

```md
---
sidebar_label: <short>
description: <1 line — used by search & social previews>
---

# <Page title>

> **You'll <verb> ...** in ~<N> min.      ← one-line value prop
>
> **Prereqs:** <link, link>                ← empty if none
```

**Bottom (always):**

```md
## Next
- **Do next:** [<link>](...)
- **Learn why:** [<link>](...)              ← cross-links technical ↔ educational
- **Reference:** [<official docs>](...)
```

That's it — same opener and closer on every page. The reader always knows where they entered, what they'll get, and where to go.

---

## Template A — Technical (setup / how-to)

Goal: the reader finishes with a working thing.

```md
## What you'll build
<1-2 sentences + screenshot or small diagram>

## Prerequisites
<bulleted, with links — accounts, perms, tools>

## Steps
### 1. <Imperative verb + object>
<commands, screenshots, expected output>

### 2. <...>
...

## Verify
<how do you know it worked — a query, a UI check, a curl>

## Troubleshoot
<top 2–3 failure modes, each a collapsed <details>>

## Next
(shared closer)
```

**Rules:** no `:::info` for step content — steps are numbered `###` headings. Admonitions only for genuine callouts (see below).

---

## Template B — Educational (concept / why)

Goal: the reader can now make an informed decision.

```md
## Why this matters
<2-3 sentences. The *business or engineering pain* this concept solves.>

## Mental model
<one diagram + one paragraph. The single clearest mental image.>

## How it works
### <Concept 1>
### <Concept 2>
### <Concept 3>
<narrative, not a list of admonitions>

## When to use / when not to
<two short bullet lists — tradeoffs are the whole point of a concept page>

## Common pitfalls
<each pitfall = 1 short subsection>

## Next
(shared closer)
```

The "Lessons learned" Q&A block used on the UC page is genuinely good — fold that into **"When to use / when not to"** or **"Common pitfalls"** so it has a semantic home, not a dumping-ground name.

---

## Admonition rules (pick 3, drop the rest)

Today admonitions are used for summary, guide, best practice, lessons, danger — that makes them wallpaper. Reserve them for signal:

| Use | When |
|---|---|
| `:::tip` | An optional improvement that's *not* required for the steps to work |
| `:::warning` | Reader will hit a problem if they skip this |
| `:::danger` | Irreversible / security-impacting / costs-money action |

No `:::info`, no `:::success`, no `:::note`. Everything else is just prose or a numbered step.

---

## Writing voice

### Match tone to template

- **Technical pages** use direct, imperative language. Tell the reader exactly what to do. No motivation, no backstory — commands, expected output, done.
- **Educational pages** explain the *why* in concrete terms. Tie every concept to a real engineering or business problem. Skip the hand-waving.

### Keep sentences short

- One idea per sentence. If a sentence has a comma and a conjunction, split it.
- Paragraphs stay under 4 sentences. If you need more, add a subheading.
- Prefer active voice: "UC checks grants" not "grants are checked by UC."

### No AI slop

Every sentence must carry information the reader didn't already have. Cut filler ruthlessly.

| Ban | Why |
|---|---|
| "In today's data-driven world…" | Empty opener. Start with the actual point. |
| "It's important to note that…" | If it's important, just say it. |
| "This powerful feature enables…" | "Powerful" is marketing. Describe what it does. |
| "Seamlessly / effortlessly / robust" | Adjectives that add zero information. |
| "Let's dive in" / "Let's explore" | Filler. Delete and start the section. |
| "As mentioned above / below" | Link to the section or remove the reference. |
| Repeating the heading in the first sentence | The reader just read the heading. |

**Rule of thumb:** read the sentence out loud. If it sounds like a press release or a chatbot, rewrite it. If you can delete it and the page still makes sense, delete it.

---

## Two extra things worth standardising

1. **Page length cap.** Technical pages that exceed ~5 screens should be split. Educational pages that exceed ~7 screens should be split — one concept per page.
2. **Diagram naming.** Prefix images by section (`uc-<thing>.png`, `infra-<thing>.png`) so `static/img` doesn't become a soup. Already partly done.

---

## Next steps (optional)

- **(a) Write the two templates as actual files** — `docs/_templates/technical.md` + `docs/_templates/educational.md` — copy-paste ready.
- **(b) Rewrite one existing page** (e.g. `unity-catalog.md` or `aws/manual.md`) in the new format as a reference example.
