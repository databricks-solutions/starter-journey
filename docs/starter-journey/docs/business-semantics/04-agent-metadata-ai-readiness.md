---
sidebar_label: "Agent metadata for AI readiness"
description: Synonyms, tags, LLM instructions, certification, and Genie spaces for AI-ready Unity Catalog metric views.
---

# Agent metadata for AI readiness

> **You'll** know how to add **metadata** so **Genie** and other experiences on the lakehouse can **find and use** your metric views correctly. About **35 minutes** of reading, then apply in a workspace.
>
> **Prereqs:** [Data modeling for metric views](/docs/business-semantics/data-modeling-metric-views), optional: [Genie spaces](/docs/databricks-aibi/genie-spaces)

**Who this is for:** Data engineers and teams responsible for **AI/BI and Genie** rollout.  
**Outcome:** You can **activate** the metadata features that make natural-language and AI-assisted answers align with your governed metrics.

## Synonyms and display names

**Display names** make objects readable in the catalog and in answers. **Synonyms** map how the business *actually* speaks (“ARR,” “bookings,” “run rate”) to your **canonical** metric. The point is **alignment** between the catalog and everyday language, which speeds **adoption** without everyone learning internal object names.

## Discovery tags and domains

**Tags and domain labels** group related metrics (for example, Sales, Finance) for **search** and **browsing**. When a Genie or workspace is scoped to a domain, tags help route questions to the right governed assets instead of the whole lakehouse. Use tags consistently as you **roll out** more metrics.

## LLM instructions and verified queries

**LLM instructions** (where supported) carry short, explicit rules: units, exceptions, **fiscal vs. calendar**, preferred dimensions. **Example queries** (where you maintain them) show repeatable questions your org trusts. Both improve **grounding** so assistants prefer **certified** objects over inventing new logic. That is a feature you **turn on** deliberately per metric.

## Certification and display formats

**Certify** metrics that leadership and compliance rely on. **Display formats** (currency, percent, rounding) make answers look the same in every experience. For humans, certification is trust; for automated features, it signals which objects to **suggest** first as you **activate** AI/BI at scale.

## Connecting to Genie spaces

A **Genie space** includes governed **tables and metric views** for a natural language experience. [Set up the space](/docs/databricks-aibi/genie-spaces) with the right objects and **instructions** that match your metrics. This is a practical step to **activate** self-service for business users on top of Unity Catalog semantics.

> **Why this matters:** Without the right metadata, a metric view is easy to **misread** as a generic table. With synonyms, instructions, and certification, Genie and related experiences can connect **phrasing** to the **right** object, time filter, and **format** — a major part of successful feature adoption on Databricks.

## Topic checklist

- [ ] I added (or plan to add) at least one **synonym** and a clear **display name** for a pilot metric
- [ ] I can explain how **tags** will organize metrics as we add more
- [ ] I know how to connect objects to a **[Genie space](/docs/databricks-aibi/genie-spaces)** for a pilot group

## Next

- **Do next:** [Technical enablement (hands-on)](/docs/business-semantics/technical-enablement-lab)
- **Learn why:** [Databricks AI/BI overview](/docs/databricks-aibi/)
- **Reference:** [Agent metadata in metric views — Databricks documentation](https://docs.databricks.com/aws/en/business-semantics/agent-metadata)
