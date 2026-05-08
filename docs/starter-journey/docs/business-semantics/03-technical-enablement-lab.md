---
sidebar_label: "Hands-on lab"
description: Build a certified sales KPI metric view and validate the same number in SQL, AI/BI, and Genie.
---

# Hands-on: build and validate a sales KPI

> **You'll** create a certified metric view and confirm the same number lands in SQL, a dashboard, and Genie — in **30–45 min**.
>
> **Prereqs:** [Metric views fundamentals](/docs/business-semantics/metric-views-fundamentals), a serverless SQL warehouse, `CREATE` on a target schema

**What you'll build:** `Total Revenue` by `Order Month` and `Order Status`, sourced from `samples.tpch.orders`, queryable from SQL, an [AI/BI dashboard](/docs/databricks-aibi/dashboards), and a [Genie space](/docs/databricks-aibi/genie-spaces).

## 1. Create the metric view

Open a SQL editor. Replace `main.sales` with a schema you have `CREATE` on.

```sql
CREATE SCHEMA IF NOT EXISTS main.sales;

CREATE OR REPLACE VIEW main.sales.orders_metrics
WITH METRICS LANGUAGE YAML AS $$
version: 1.1
comment: Certified orders KPIs for the Sales domain.
source: samples.tpch.orders

dimensions:
  - name: Order Month
    expr: DATE_TRUNC('MONTH', o_orderdate)
    format:
      type: date
      format: 'yyyy-MM'
  - name: Order Status
    expr: |
      CASE
        WHEN o_orderstatus = 'O' THEN 'Open'
        WHEN o_orderstatus = 'P' THEN 'Processing'
        WHEN o_orderstatus = 'F' THEN 'Fulfilled'
      END
    synonyms: [status, state]

measures:
  - name: Total Revenue
    expr: SUM(o_totalprice)
    display_name: Revenue (USD)
    synonyms: [revenue, sales, bookings]
    format:
      type: currency
      currency_code: USD
    tags: [certified, finance]
  - name: Order Count
    expr: COUNT(1)
    synonyms: [orders, order volume]
$$;
```

## 2. Grant access and certify

```sql
GRANT SELECT ON VIEW main.sales.orders_metrics TO `analysts`;
ALTER VIEW main.sales.orders_metrics SET TAGS ('certified' = 'true');
```

Use a **group**, not individual users. Set the owner in Catalog Explorer if it is not already a service principal or shared group.

## 3. Validate in three surfaces

Run the same query everywhere and compare.

### SQL editor

```sql
SELECT `Order Month`, `Order Status`, `Total Revenue`, `Order Count`
FROM main.sales.orders_metrics
WHERE `Order Month` BETWEEN '1995-01-01' AND '1995-12-31'
GROUP BY ALL
ORDER BY `Order Month`;
```

Spot-check by running the equivalent raw aggregation against `samples.tpch.orders`. The numbers must match.

### AI/BI dashboard

In a [dashboard](/docs/databricks-aibi/dashboards), add a dataset bound to `main.sales.orders_metrics` and a tile showing `Total Revenue` by `Order Month`. The currency format comes from the YAML — no extra config.

### Genie space

Add `main.sales.orders_metrics` to a [Genie space](/docs/databricks-aibi/genie-spaces). Ask:

- "What was revenue by month in 1995?"
- "Show me bookings for fulfilled orders." — uses your `bookings` synonym.

Genie should pick the metric view and return the same total.

## Done when

- [ ] All three surfaces return the same `Total Revenue` for the same filter
- [ ] A business partner recognizes the metric by display name
- [ ] The view is owned by a group and tagged `certified=true`

## Troubleshoot

<details>
<summary>Genie does not pick the metric view</summary>

Check that the object is in the space, the user has `SELECT`, and the metric has clear synonyms and a comment. Add space-level instructions if the wrong measure keeps getting chosen.
</details>

<details>
<summary>SQL and dashboard numbers do not match</summary>

Reconcile time zone, fiscal vs. calendar boundaries, and any row filters in the dashboard query. The metric view's `filter:` clause should hold any "official" exclusion the business cares about.
</details>

## Next

- **Do next:** Roll the same pattern to your next priority KPI
- **Learn why:** [Genie spaces](/docs/databricks-aibi/genie-spaces), [AI/BI overview](/docs/databricks-aibi/)
- **Reference:** [Create and edit metric views](https://docs.databricks.com/aws/en/business-semantics/metric-views/create-edit)
