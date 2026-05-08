---
sidebar_label: "Why a semantic layer?"
description: How Unity Catalog metric views fix metric drift across SQL, dashboards, and AI.
---

# Why a semantic layer?

> **You'll** see the metric drift problem and where Unity Catalog metric views fix it — in **5 min**.
>
> **Prereqs:** [Business semantics — overview](/docs/business-semantics/)

## The problem: same KPI, different numbers

Three teams report Q1 revenue. Three different numbers.

- **Sales:** `SUM(amount) WHERE status = 'closed'` → $4.2M
- **Finance:** `SUM(amount) WHERE invoice_date >= '2026-01-01'` → $4.0M
- **BI dashboard:** `SUM(net_amount)` joined to a refunds table → $3.8M

Each is reasonable. Each lives in a different SQL file or BI tool. Nobody owns the canonical definition. Leadership picks the one they trust most this week.

## The fix: define metrics once, in the catalog

A **metric view** is a Unity Catalog object that holds the formula, the grain, and the filters for a KPI. SQL editors, notebooks, AI/BI dashboards, and Genie all call the same object — they cannot drift.

```sql
SELECT `Total Revenue`
FROM main.sales.orders_metrics
WHERE `Order Month` >= '2026-01-01';
```

Same query in any tool. Same number, every time.

## Where it sits

```
[curated tables]  →  [metric views]  →  [SQL / AI/BI / Genie / agents]
                          ↑
                   governed in Unity Catalog
```

Consumers still slice by region, time, or product. The formula stays in one place.

:::tip Quick alignment exercise
Ask three people on different teams to write the SQL for "active customer." If you get three answers, you have a concrete case for a metric view — no slide deck required.
:::

## Next

- **Do next:** [Metric views fundamentals](/docs/business-semantics/metric-views-fundamentals)
- **Learn why:** [Data governance strategy](/docs/data-governance-strategy/)
- **Reference:** [Business semantics in Unity Catalog](https://docs.databricks.com/aws/en/business-semantics/)
