---
sidebar_position: 0
sidebar_label: Business Semantics
description: Define KPIs once in Unity Catalog metric views — same number in SQL, AI/BI, and Genie.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# 11. Business Semantics

> **You'll** stop arguing about whose revenue number is right by defining KPIs once as Unity Catalog **metric views** — usable from SQL, dashboards, and Genie. Budget about **1 hour**: 20 min reading, 30–45 min hands-on.
>
> **Prereqs:** [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog), [Data governance strategy](/docs/data-governance-strategy/), [Databricks AI/BI](/docs/databricks-aibi/)

## Journey checklist

- [x] ~~Get started.~~
- [x] ~~Before you start.~~
- [x] ~~Infra setup.~~
- [x] ~~Cost monitoring.~~
- [x] ~~Data governance strategy.~~
- [x] ~~Access your data.~~
- [x] ~~Build the first pipeline.~~
- [x] ~~Automation and orchestration.~~
- [x] ~~Query and explore.~~
- [x] ~~Databricks AI/BI.~~
- [ ] **Business Semantics**
    - [ ] Understand the metric drift problem
    - [ ] Read and write a metric view in YAML
    - [ ] [Hands-on lab](/docs/business-semantics/lab) — same KPI returns the same number in SQL, AI/BI, and Genie

## UC Metric Views reference

Review this deck before proceeding. It covers the full metric views surface — motivation, architecture, dimensions, measures, and querying patterns.

<a target="_blank" href={useBaseUrl('/pdfs/UC-Metric-Views.pdf')}>**PDF — UC Metric Views**</a>

## The problem: same KPI, different numbers

Three teams report Q1 revenue. Three different numbers.

- **Sales:** `SUM(amount) WHERE status = 'closed'` → $4.2M
- **Finance:** `SUM(amount) WHERE invoice_date >= '2026-01-01'` → $4.0M
- **BI dashboard:** `SUM(net_amount)` joined to a refunds table → $3.8M

Each is reasonable. Each lives in a different SQL file or BI tool. Nobody owns the canonical definition. Leadership picks the one they trust most this week.

## The fix: define metrics once, in the catalog

A **metric view** is a Unity Catalog object that holds the formula, the grain, and the filters for a KPI. SQL editors, notebooks, AI/BI dashboards, and Genie all call the same object — they cannot drift.

```sql
SELECT `Order Month`, MEASURE(`Total Revenue`)
FROM main.sales.orders_metrics
WHERE `Order Month` >= '2026-01-01';
```

Same query in any tool. Same number, every time.

## Where it sits

* **Unity Catalog:** Contained inside a schema. Same level as tables, views, functions and models: [UC three-level namespace](/docs/before-you-start/foundations/unity-catalog#the-three-level-namespace)

* **BI Analytics and Reports:** Source of truth for first-party AI/BI or third-party apps.
    * Dashboard or Genie Space or Third-party app → Metric View → UC tables.

## Watch first

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/75zcOOk6How"
  title="Metric views in Databricks Unity Catalog"
></iframe>

## The four parts

| Part | What it does | Example |
|---|---|---|
| **Source** | The Unity Catalog table or SQL query the metric reads from | `samples.tpch.orders` |
| **Measures** | Aggregate expressions — the numbers | `SUM(o_totalprice)` |
| **Dimensions** | Slice/group columns | `DATE_TRUNC('MONTH', o_orderdate)` |
| **Filter** | Optional row scoping before aggregation | `o_orderdate > '1990-01-01'` |

A metric view is a first-class Unity Catalog object — discoverable, permissioned, and audited like a table. The body is YAML wrapped in a `CREATE VIEW … WITH METRICS LANGUAGE YAML` statement.

## Add metadata for AI/BI and Genie

Synonyms, display names, and format hints live in the YAML. [Genie](/docs/databricks-aibi/genie-spaces) uses synonyms to map business phrasing ("ARR", "bookings", "run rate") to your canonical metric. Dashboards inherit format hints automatically.

```yaml
measures:
  - name: Total Revenue
    expr: SUM(o_totalprice)
    display_name: Revenue (USD)
    synonyms: [revenue, sales, bookings]
    format:
      type: currency
      currency_code: USD
    tags: [certified, finance]
```

## SQL or UI — same object either way

| Path | Use it for |
|---|---|
| `CREATE OR REPLACE VIEW … WITH METRICS LANGUAGE YAML` | CI/CD, version control, repeatable promotion |
| Catalog Explorer → **Create > Metric view** | Iteration, AI-assisted measure suggestions, live preview |

Many teams iterate in the UI, then export the YAML and check it into Git.

## Joining multiple tables

When the metric spans tables, declare the join in a `joins:` block. Example: orders joined to customers and geography:

```yaml
source: SELECT * FROM samples.tpch.orders

joins:
  - name: customer
    source: samples.tpch.customer
    'on': o_custkey = c_custkey
    joins:
      - name: nation
        source: samples.tpch.nation
        'on': c_nationkey = n_nationkey
```

Dimensions and measures can then reference joined columns using dot notation: `customer.c_name`, `customer.nation.n_name`.

Keep join keys explicit and consistent with your gold-layer model. If two metrics need incompatible grains, build them as separate views — do not force one object to do both.

:::tip Materialize hot paths
For dashboards that scan the same monthly rollup repeatedly, back the metric view's source with a [materialized view](https://docs.databricks.com/aws/en/views/materialized) at that grain. Consumers still query the metric view; the engine reads pre-computed rows.
:::

## Go deeper

- [Sources for a metric view](https://docs.databricks.com/aws/en/business-semantics/metric-views/basic-modeling#define-a-source)
- [Advanced techniques for metric views](https://docs.databricks.com/aws/en/business-semantics/metric-views/advanced-techniques)
- [Model star and snowflake schemas](https://docs.databricks.com/aws/en/business-semantics/metric-views/basic-modeling#work-with-joins)

## Next

- **Do next:** [Hands-on lab](/docs/business-semantics/lab)
- **Learn why:** [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)
- **Reference:** [Business semantics in Unity Catalog](https://docs.databricks.com/aws/en/business-semantics/)
