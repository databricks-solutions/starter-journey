---
sidebar_position: 5
sidebar_label: Cost dashboard AI/BI
description: Import the account-console usage dashboard or build a Lakeview dashboard on system billing tables.
---

# Cost dashboard AI/BI

> **You'll publish** a shareable AI/BI (**Lakeview**) dashboard on billing data in ~30 min.
>
> **Prereqs:** [Enable system billing usage](/docs/cost-monitoring/system-billing-usage), [Databricks AI/BI](/docs/databricks-aibi)

## What you'll build

A live dashboard in your workspace that charts cost and usage from `system.billing.usage`, refreshed on a schedule, shareable to stakeholders who should not use the account console.

## Prerequisites

- Enable and grant **SELECT** on `system.billing.usage` and `system.billing.list_prices` for the dashboard owner and viewers. Follow [Enable system billing usage](/docs/cost-monitoring/system-billing-usage); that page owns system schema enablement steps.
- A **SQL warehouse** (serverless or pro/classic) to execute dashboard datasets.
- **Account admin** access to import the pre-built usage dashboard from the account console. Workspace members can build custom dashboards without account admin if they already have data access.

## Journey checklist

- [x] ~~Identify target cloud tenant(s).~~
- [x] ~~Infra setup.~~
- [x] ~~Data Governance Strategy.~~
- [x] ~~Access your data.~~
- [x] ~~Build the first pipeline.~~
- [x] ~~Automation and orchestration.~~
- [x] ~~Query and explore.~~
- [x] ~~Databricks AI/BI.~~
- [ ] **Cost monitoring**
    - [x] Tag compute and jobs.
    - [x] Enable system billing usage.
    - [x] Use the cost management UI.
    - [x] Set up budget alerts.
    - [ ] **Build a cost dashboard with AI/BI.**

## Steps

### 1. Import the pre-built usage dashboard {#import-the-pre-built-usage-dashboard}

1. Sign in to the account console as an **account admin**.
2. Open **Usage** in the sidebar, then the **Consumption** tab.
3. Click **Setup dashboard**.
4. Choose the dashboard version.

**Public Preview — Usage Dashboard version 2.0:** Version 2.0 is in **Public Preview**. It adds cost forecasting and object-level drill-down. The standard version is generally available.

<!-- TODO: verify before publishing — open question #2: Dashboard v2.0 GA status -->

5. Pick **entire account** or **single workspace** scope.
6. Select the **target workspace** for the import.
7. Click **Import** and complete the redirect into the workspace dashboard experience.

Imported dashboards query `system.billing.usage` and `system.billing.list_prices`, so every viewer needs **SELECT** on both.

### 2. Create a custom AI/BI dashboard

1. **+** → **Dashboard** (or **Dashboards** → **Create Dashboard**).
2. **Data** → **Add dataset** → SQL on `system.billing.usage` (join `system.billing.list_prices` when you need dollars).
3. Drag charts, bind datasets, pick line or bar types.
4. Add filters for dates, workspace, or tags.
5. **Publish** with **Viewer credentials** or **Editor credentials** as required.
6. **Share** to users or groups; add a **refresh schedule** and subscriptions after publish if you need push updates.

Lakeview supports AI-assisted authoring, cross-filtering, drill-through, scheduled refresh, iframe embedding, and account-level publish for registered users without workspace access.

### 3. Optional: import the Lakeflow monitoring dashboard artifact

Databricks publishes a separate Lakeflow job cost dashboard JSON on GitHub. Import it manually for failed-job analysis and job-level drill-down beyond the account usage import.

## Starter datasets

Daily spend by product for the last 30 days (line chart friendly):

```sql
SELECT
  usage_date,
  billing_origin_product,
  SUM(u.usage_quantity * lp.pricing.effective_list.default) AS daily_cost_usd
FROM system.billing.usage u
JOIN system.billing.list_prices lp
  ON u.sku_name = lp.sku_name
  AND u.cloud = lp.cloud
  AND u.usage_start_time >= lp.price_start_time
  AND (u.usage_end_time <= lp.price_end_time OR lp.price_end_time IS NULL)
WHERE u.usage_date >= CURRENT_DATE - INTERVAL 30 DAY
GROUP BY 1, 2
ORDER BY 1;
```

Month-to-date total (counter widget friendly):

```sql
SELECT
  SUM(u.usage_quantity * lp.pricing.effective_list.default) AS mtd_cost_usd
FROM system.billing.usage u
JOIN system.billing.list_prices lp
  ON u.sku_name = lp.sku_name
  AND u.cloud = lp.cloud
  AND u.usage_start_time >= lp.price_start_time
  AND (u.usage_end_time <= lp.price_end_time OR lp.price_end_time IS NULL)
WHERE u.usage_date >= DATE_TRUNC('month', CURRENT_DATE);
```

Top workspaces and products by cost:

```sql
SELECT
  workspace_id,
  billing_origin_product,
  SUM(u.usage_quantity * lp.pricing.effective_list.default) AS cost_usd
FROM system.billing.usage u
JOIN system.billing.list_prices lp
  ON u.sku_name = lp.sku_name
  AND u.cloud = lp.cloud
  AND u.usage_start_time >= lp.price_start_time
  AND (u.usage_end_time <= lp.price_end_time OR lp.price_end_time IS NULL)
WHERE u.usage_date >= CURRENT_DATE - INTERVAL 30 DAY
GROUP BY 1, 2
ORDER BY cost_usd DESC
LIMIT 10;
```

Spend by `team` tag for a pie or bar chart:

```sql
SELECT
  COALESCE(custom_tags['team'], '(untagged)') AS team,
  SUM(u.usage_quantity * lp.pricing.effective_list.default) AS cost_usd
FROM system.billing.usage u
JOIN system.billing.list_prices lp
  ON u.sku_name = lp.sku_name
  AND u.cloud = lp.cloud
  AND u.usage_start_time >= lp.price_start_time
  AND (u.usage_end_time <= lp.price_end_time OR lp.price_end_time IS NULL)
WHERE u.usage_date >= CURRENT_DATE - INTERVAL 30 DAY
GROUP BY 1
ORDER BY cost_usd DESC;
```

## Verify

1. Open the imported or custom dashboard and confirm widgets render without permission errors.
2. Confirm the default date window covers the usage you expect for new accounts.
3. Publish, then sign in as a non-admin viewer with **SELECT** grants and confirm read-only access works.
4. If a schedule exists, wait for the next refresh and confirm the **Last refreshed** timestamp advances.

## Troubleshoot

<details>
<summary>Setup dashboard button is missing</summary>

Only **account admins** see the import control in the account console.

</details>

<details>
<summary>Dashboard tiles show permission denied</summary>

Grant **SELECT** on `system.billing.usage` and `system.billing.list_prices`, or republish with **Editor credentials** so the editor's permissions apply at refresh time.

</details>

<details>
<summary>Data only shows one workspace after import</summary>

You may have imported with single-workspace scope. Re-import with entire-account scope or edit the dataset SQL to remove unintended workspace filters.

</details>

<details>
<summary>Published viewers see empty tiles</summary>

**Viewer credentials** require the viewer to hold warehouse access and **SELECT** on the underlying tables. Either grant those privileges or publish with **Editor credentials**.

</details>

<details>
<summary>Dashboard refresh looks stale</summary>

Configure a refresh schedule in the dashboard settings so Lakeview pulls new billing rows regularly.

</details>

## Learn more

- [Cost management UI](/docs/cost-monitoring/cost-management-ui) — **Usage** tabs, **Consumption (Legacy)** graph, and **Consumption** entry for **Setup dashboard**
- [Usage dashboards](https://docs.databricks.com/aws/en/admin/account-settings/usage)
- [Monitor costs using system tables](https://docs.databricks.com/aws/en/admin/usage/system-tables)
- [Dashboards (AI/BI)](https://docs.databricks.com/aws/en/dashboards)
- [Create a dashboard (tutorial)](https://docs.databricks.com/aws/en/dashboards/tutorials/create-dashboard)
- [Monitor job costs and performance with system tables](https://docs.databricks.com/aws/en/admin/system-tables/jobs-cost)
- [Easy ways to optimize your costs (blog)](https://www.databricks.com/blog/easy-ways-optimize-your-costs)

## Next

- **Do next:** [Get started](/docs/get-started) to revisit the full journey map
- **Learn why:** [Databricks AI/BI](/docs/databricks-aibi)
- **Reference:** [Dashboards (AI/BI)](https://docs.databricks.com/aws/en/dashboards)
