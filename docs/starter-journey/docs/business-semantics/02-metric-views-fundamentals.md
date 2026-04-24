---
sidebar_label: "Metric views fundamentals"
description: Metric views vs SQL views, building blocks, SQL vs Catalog Explorer, and YAML for Unity Catalog business semantics.
---

# Metric views fundamentals

> **You'll** be able to describe a **metric view**, how it differs from a standard view, and how to **author** one (SQL, UI, or YAML) to **activate** business semantics in Unity Catalog — in about **30 minutes** of reading.
>
> **Prereqs:** [Why a semantic layer?](/docs/business-semantics/why-semantic-layer), familiarity with [Unity Catalog](/docs/before-you-start/foundations/unity-catalog)

**Who this is for:** Data engineers and analysts.  
**Outcome:** You know the catalog object, its parts, and how to create it.

## Metric view vs. SQL view

A **standard view** is often a **fixed** query: columns and sometimes implicit grouping are part of the `CREATE VIEW` statement. A **metric view** separates **measures** (how to aggregate), **dimensions** (how to slice and filter), and **filters** (scoping) so the **same** definition supports **different** dimension combinations at runtime, consistently.

That makes a metric view a **reusable, governed** catalog object — a strong fit when you are **adopting** a single source of truth for KPIs on Databricks.

## Anatomy of a metric view

| Building block | Role |
| --- | --- |
| **Sources** | One or more Unity Catalog tables, with join conditions when the metric spans multiple tables |
| **Measures** | Aggregated business quantities — sums, counts, rates from one definition |
| **Dimensions** | Attributes to group, filter, or order by (time, region, product, and so on) |
| **Filters** | Optional scoping to limit rows before aggregation (for example, order status) |

**Key concept:** A metric view is a **first-class Unity Catalog object** — discoverable, auditable, and permissioned like a table. Definitions **live in the catalog**, not inside a one-off report.

## SQL DDL vs. Catalog Explorer

| Path | When to use it |
| --- | --- |
| **Code-first: `CREATE METRIC VIEW` (SQL)** | Version control, CI/CD, repeatable promotion |
| **UI-first: Catalog Explorer** | Iteration, discovery, and collaboration with a visual editor |

Many teams use **both**: build in the UI, then check in SQL or YAML. The catalog object type is the same. Pick the path that helps your org **turn on** change safely in each environment.

## YAML syntax and validation

Metric views can be expressed in **YAML** with a public schema. YAML-aware editing gives you **schema validation** and clear diffs for review. Any authoring path (SQL, form-based UI, YAML) still creates the **same** type of object with the same building blocks.

:::tip Self-check
In a dev workspace, query **one** measure from a metric view with **two** different groupings (for example, revenue by month and by region). The “define once, slice many ways” idea should show up in the **same** object, not two separate ad hoc views.
:::

## Topic checklist

- [ ] I can name the four **building blocks** of a metric view
- [ ] I know when to use **SQL** vs. **Catalog Explorer** for our team
- [ ] I can point to the **docs** for **create** and **edit**

## Next

- **Do next:** [Data modeling for metric views](/docs/business-semantics/data-modeling-metric-views)
- **Learn why:** [Data governance strategy](/docs/data-governance-strategy/medium-large-organizations)
- **Reference:** [Create and edit metric views — Databricks documentation](https://docs.databricks.com/aws/en/business-semantics/metric-views/create-edit)
