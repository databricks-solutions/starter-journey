---
sidebar_label: "Data modeling for metric views"
description: Joins and sources in metric views, composable metrics, window-based measures, and materialization for production semantic models.
---

# Data modeling for metric views

> **You'll** connect **data modeling in Databricks** to metric views — including **joins and sources**, **composability**, time-based behavior, and **materialization** tradeoffs — so you can **operationalize** semantics, not just define them. About **40 minutes** of reading.
>
> **Prereqs:** [Metric views fundamentals](/docs/business-semantics/metric-views-fundamentals)

**Who this is for:** Data engineers.  
**Outcome:** A production-minded semantic model: correct joins, shared grains, and sensible cost/latency.

## Joins and sources in a metric view

In Databricks, a **metric view** lists one or more **source** tables in Unity Catalog and the **join** conditions between them. You define the relationship so a single business metric is computed from a **coherent** set of tables — not a one-off `JOIN` repeated in every notebook or dashboard. Keep join keys **explicit, documented, and consistent** with your curated tables (for example, gold-level facts and dimensions) so every slice and filter remains interpretable when you **roll out** metrics to more users. See [Model metric views](https://docs.databricks.com/aws/en/business-semantics/metric-views/basic-modeling) in the Databricks documentation for how multi-table sources and filters are expressed.

## Metric composability

A **higher-level** metric can **reference** other metric views. You can build hierarchies (for example, gross to net) or re-use a base “orders” or “revenue” definition across certified views. When the business changes a rule, you **fix it once** at the right layer. That is how you **keep** adoption: fewer surprises, clearer ownership.

**Key concept:** Composability only works with **clear grains**. If two metrics are incompatible, do not force them into one object — split or pre-aggregate on purpose.

## Window measures

**Rolling** metrics, **period-over-period** comparisons, and similar patterns use **window** or **time-relative** logic. Define that logic in the metric view (or in an approved upstream layer) so every consumer uses the same window and **calendar** rules. That reduces debate when leaders compare results across orgs you **activate** on the same platform.

## Materialization and auto-rewrite

**Materialized** metric views (where the product and policy allow) can **pre-compute** hot paths and cut scan cost. The engine can **rewrite** safe queries to use those materializations. You still choose **what** to pre-compute based on real usage — for example, monthly rollups for executive reporting — not “materialize everything by default.”

:::tip Consistency check
**Activate** a metric view in **three** places with the same filters: SQL, a notebook, and an [AI/BI Dashboard](/docs/databricks-aibi/dashboards). The numbers should **match** for the same time and scope — if not, fix the model before you expand rollout.
:::

## Topic checklist

- [ ] I can explain how **joins and sources** are declared for a metric view in our Databricks workspace
- [ ] I know when to **split** a metric view vs. **compose** from others
- [ ] I can name one reason to use **materialization** for our traffic pattern

## Next

- **Do next:** [Agent metadata for AI readiness](/docs/business-semantics/agent-metadata-ai-readiness)
- **Learn why:** [Query and explore](/docs/query-and-explore)
- **Reference:** [Model metric views — Databricks documentation](https://docs.databricks.com/aws/en/business-semantics/metric-views/basic-modeling)
