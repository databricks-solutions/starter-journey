---
sidebar_label: "Metric views fundamentals"
description: Build a metric view with SQL or YAML — measures, dimensions, joins, filters, and AI metadata.
---

# Metric views fundamentals

> **You'll** read a metric view definition and write your own — in **15 min**.
>
> **Prereqs:** [Why a semantic layer?](/docs/business-semantics/why-semantic-layer), [Unity Catalog basics](/docs/before-you-start/foundations/unity-catalog)

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

## Create one with SQL

This compiles against the [TPC-H sample data](https://docs.databricks.com/aws/en/discover/databricks-datasets) every Databricks workspace ships with, so you can paste and run it. Replace `main.sales` with a schema you have `CREATE` on.

```sql
CREATE OR REPLACE VIEW main.sales.orders_metrics
WITH METRICS LANGUAGE YAML AS $$
version: 1.1
comment: Orders KPIs for sales analysis.
source: samples.tpch.orders

filter: o_orderdate > '1990-01-01'

dimensions:
  - name: Order Month
    expr: DATE_TRUNC('MONTH', o_orderdate)
  - name: Order Status
    expr: |
      CASE
        WHEN o_orderstatus = 'O' THEN 'Open'
        WHEN o_orderstatus = 'P' THEN 'Processing'
        WHEN o_orderstatus = 'F' THEN 'Fulfilled'
      END

measures:
  - name: Order Count
    expr: COUNT(1)
  - name: Total Revenue
    expr: SUM(o_totalprice)
  - name: Open Order Revenue
    expr: SUM(o_totalprice) FILTER (WHERE o_orderstatus = 'O')
$$;
```

Query it like a regular view. The grouping is implicit — Databricks rewrites the query against the source:

```sql
SELECT `Order Month`, `Order Status`, `Total Revenue`, `Order Count`
FROM main.sales.orders_metrics
WHERE `Order Month` >= '1995-01-01'
GROUP BY ALL
ORDER BY `Order Month`;
```

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

When the metric spans tables, declare the join in the `source` SQL. Example: orders + lineitem to compute gross-vs-net revenue:

```yaml
source: |
  SELECT
    o.o_orderdate,
    o.o_orderstatus,
    l.l_extendedprice,
    l.l_discount
  FROM samples.tpch.orders o
  JOIN samples.tpch.lineitem l
    ON l.l_orderkey = o.o_orderkey

dimensions:
  - name: Order Month
    expr: DATE_TRUNC('MONTH', o_orderdate)

measures:
  - name: Gross Revenue
    expr: SUM(l_extendedprice)
  - name: Net Revenue
    expr: SUM(l_extendedprice * (1 - l_discount))
```

Keep join keys explicit and consistent with your gold-layer model. If two metrics need incompatible grains, build them as **separate** views — do not force one object to do both.

:::tip Materialize hot paths
For dashboards that scan the same monthly rollup repeatedly, back the metric view's source with a [materialized view](https://docs.databricks.com/aws/en/views/materialized) at that grain. Consumers still query the metric view; the engine reads pre-computed rows.
:::

## Next

- **Do next:** [Hands-on lab — build a sales KPI](/docs/business-semantics/technical-enablement-lab)
- **Learn why:** [AI/BI dashboards](/docs/databricks-aibi/dashboards), [Genie spaces](/docs/databricks-aibi/genie-spaces)
- **Reference:** [Create and edit metric views](https://docs.databricks.com/aws/en/business-semantics/metric-views/create-edit)
