---
sidebar_label: "Why a semantic layer?"
description: The metric drift problem, Unity Catalog as governance, define-once use-everywhere, and where business semantics fit on the platform.
---

# Why a semantic layer?

> **You'll** name the business and trust issues a **semantic layer** addresses, and place **business semantics** in the Databricks stack — in about **20 minutes** of reading.
>
> **Prereqs:** [Business semantics — overview](/docs/business-semantics/)

**Who this is for:** Engineers, analysts, business users, and leadership.  
**Outcome:** Shared vocabulary and a clear “why” before you change anything in a workspace.

## The metric drift problem

In most organizations, “revenue,” “active user,” and “fiscal quarter” mean different things in each team’s spreadsheets, dashboards, and ad hoc SQL. Small differences add up to **inconsistent KPIs** — leadership sees conflicting numbers, and it is hard to know which version is **authoritative**.

**Metric drift** is not one bad query; it is **parallel definitions** of the same business idea with no single place that **owns** the logic.

## Unity Catalog as the governance foundation

[Unity Catalog](/docs/before-you-start/foundations/unity-catalog) is where **who can see what** meets **where data comes from**. Grants and row filters control access; lineage and audit logs show how assets connect. When **metric** logic also lives in that layer, you govern **definitions** with the **data** — not in each tool separately.

## Define once, use everywhere

A central semantic definition means **one** implementation of a KPI, used wherever it is needed. Teams still slice by region, time, or product — the **core formula and grain** stay the same. The same object can feed SQL, notebooks, AI/BI, and natural-language features on the lakehouse **without** re-copying rules into every surface. That is what this path helps you **activate** as a first-class feature.

## Where business semantics fits in the platform

**Business semantics** (as **metric views** in Unity Catalog) is the **definition layer** above curated tables. Queries, jobs, dashboards, and agents **call** that layer instead of re-deriving metrics in silos. The other Starter Journey sections (pipelines, [AI/BI](/docs/databricks-aibi/), and so on) work best when you can **trust** those shared definitions.

:::tip Reflection (self-paced)
On your own or with a few stakeholders, write how **one** business concept is defined (for example **revenue** or **active user**), each from a different function. If definitions disagree, you have a concrete case for a governed semantic layer — no slide deck required.
:::

## Topic checklist

- [ ] I can explain **metric drift** in one sentence
- [ ] I can name **one** way Unity Catalog supports **governed** metric definitions
- [ ] I understand **where** metric views sit relative to **tables and BI**

## Next

- **Do next:** [Metric views fundamentals](/docs/business-semantics/metric-views-fundamentals)
- **Learn why:** [Data governance strategy](/docs/data-governance-strategy/)
- **Reference:** [Unity Catalog — Databricks documentation](https://docs.databricks.com/aws/en/data-governance/unity-catalog/index.html)
