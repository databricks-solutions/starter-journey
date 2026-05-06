---
sidebar_position: 4
sidebar_label: Budget alerts
description: Create account-console budgets with email thresholds and optional SQL alerts backed by system billing tables.
---

# Budget alerts

> **You'll configure** monthly budgets and optional SQL alerts so cost spikes generate email in ~20 min.
>
> **Prereqs:** [Account Console foundations](/docs/before-you-start/foundations/account-console), [Tag compute and jobs](/docs/cost-monitoring/tag-compute-and-jobs)

## What you'll build

One or more budgets in the account console track monthly spending at account scope or filtered by workspace and tag. Email notifications fire when spend crosses thresholds you define. Optional workspace **SQL alerts** run queries on a schedule for finer rules.

## Prerequisites

- **Account admin** role to create and manage budgets.
- Custom tags on resources if you want tag-scoped budgets beyond workspace filters. See [Tag compute and jobs](/docs/cost-monitoring/tag-compute-and-jobs).
- **System schema** enablement is **not** required for account budgets themselves. Budgets use account telemetry and **list prices** in USD.

**SQL alerts** (workspace sidebar **Alerts**) query `system.billing.usage`. Those alerts require the billing schema enabled and a running SQL warehouse. Complete [Enable system billing usage](/docs/cost-monitoring/system-billing-usage) before you rely on SQL alerts.

**Public Preview — budgets:** Budgets are in **Public Preview**. Limits and GA timing may change. Budgets measure USD using **list prices** and platform add-ons; they do not include credits or negotiated discounts.

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
    - [ ] **Set up budget alerts.**
    - [ ] Build a cost dashboard with AI/BI.

## Steps

### 1. Create a budget in the account console

1. Sign in to the account console.
2. Open **Usage** in the sidebar.
3. Open the **Budgets** tab with the **Preview** badge (under **Usage**, beside **Consumption** and **Cost Overview**).
4. Click **Add budget**.
5. Enter a **Name** (for example `Data engineering monthly`).
6. Under **Definitions**, optionally pick specific workspaces and optional tag key:value filters for **custom tags**.
7. Under alert thresholds, enter a **Monthly threshold** in dollars, add comma-separated **Email addresses**, then use **Add alert threshold** for up to **four** distinct thresholds per budget. Each amount must be unique.
8. Click **Create**.

Recipients do not need to be Databricks users.

:::warning

**Budgets do not stop usage.** They are monitoring-only. Charges continue after a threshold is crossed.

:::

### 2. Understand latency

Usage can lag by up to about **24 hours** before an alert email sends. Newly created budgets can also take time before details populate.

### 3. Create a SQL alert for a custom condition

<!-- TODO: verify before publishing — see dossier open question #8: SQL alerts GA status and migration path from legacy alerts -->

**Public Preview — SQL alerts:** The newer **SQL alerts** experience is in **Public Preview**. Legacy alerts can still appear alongside it. Pick the workspace flow that matches your tenant.

1. In the workspace sidebar, open **Alerts**, then **Create Alert**.
2. Author SQL against `system.billing.usage`, joining `system.billing.list_prices` when you need dollar estimates.
3. Set the alert **Condition** (column, operator, threshold).
4. Configure **Notifications** (email, Slack, webhooks, or PagerDuty destinations supported by your workspace).
5. Set a **Schedule** (for example hourly).
6. Save and open **View alert** to confirm status.

Navigation path: Workspace sidebar → **Alerts** → **Create Alert**.

Example query for last-day spend above a dollar threshold:

```sql
SELECT
  SUM(u.usage_quantity * lp.pricing.effective_list.default) AS last_24h_cost_usd
FROM system.billing.usage u
JOIN system.billing.list_prices lp
  ON u.sku_name = lp.sku_name
  AND u.cloud = lp.cloud
  AND u.usage_start_time >= lp.price_start_time
  AND (u.usage_end_time <= lp.price_end_time OR lp.price_end_time IS NULL)
WHERE u.usage_date >= CURRENT_DATE - INTERVAL 1 DAY;
```

Example query to flag jobs over 1000 DBUs in a day:

```sql
SELECT
  usage_metadata.job_id,
  usage_metadata.job_name,
  SUM(usage_quantity) AS dbus_24h
FROM system.billing.usage
WHERE usage_date >= CURRENT_DATE - INTERVAL 1 DAY
  AND billing_origin_product = 'JOBS'
GROUP BY 1, 2
HAVING SUM(usage_quantity) > 1000
ORDER BY dbus_24h DESC
LIMIT 5;
```

Example query for month-to-date cost by `team` tag:

```sql
SELECT
  custom_tags['team'] AS team,
  SUM(u.usage_quantity * lp.pricing.effective_list.default) AS mtd_cost_usd
FROM system.billing.usage u
JOIN system.billing.list_prices lp
  ON u.sku_name = lp.sku_name
  AND u.cloud = lp.cloud
  AND u.usage_start_time >= lp.price_start_time
  AND (u.usage_end_time <= lp.price_end_time OR lp.price_end_time IS NULL)
WHERE u.usage_date >= DATE_TRUNC('month', CURRENT_DATE)
GROUP BY 1
ORDER BY mtd_cost_usd DESC;
```

## Verify

1. Open **Usage** → **Budgets** (Preview tab) and confirm your budget appears.
2. Open the budget name and confirm the chart shows spend with dotted threshold lines.
3. For SQL alerts, confirm the alert shows `OK` or `TRIGGERED`, not `ERROR`.
4. To exercise email, set a threshold below current month-to-date spend and wait up to 24 hours, checking spam folders.

## Troubleshoot

<details>
<summary>Budget shows zero spend</summary>

New budgets can lag. Wait up to 24 hours for the first numbers.

</details>

<details>
<summary>No alert email arrived</summary>

Confirm the threshold is below accrued month-to-date spend, verify recipient addresses, and check spam. Remember the 24-hour latency window.

</details>

<details>
<summary>Budget totals do not match discounted invoices</summary>

Budgets intentionally use **list prices**. Model discounts inside SQL alerts or external tools if you need contract-accurate thresholds.

</details>

<details>
<summary>You cannot create a budget</summary>

Only **account admins** can create budgets. Ask an account admin to create it or to grant you admin access if appropriate.

</details>

<details>
<summary>SQL alert status is ERROR</summary>

Confirm `system.billing` is enabled, the query text runs in a notebook, and the SQL warehouse is running or set to auto-start.

</details>

## Learn more

- [Create and monitor budgets](https://docs.databricks.com/aws/en/admin/account-settings/budgets)
- [Databricks SQL alerts](https://docs.databricks.com/aws/en/sql/user/alerts/)
- [Cost management tools on Databricks](https://docs.databricks.com/aws/en/admin/usage)
- [Best practices for cost management on Databricks](https://www.databricks.com/blog/best-practices-cost-management-databricks)

## Next

- **Do next:** [Build a cost dashboard with AI/BI](/docs/cost-monitoring/cost-dashboard-aibi)
- **Learn why:** [Enable system billing usage](/docs/cost-monitoring/system-billing-usage)
- **Reference:** [Create and monitor budgets](https://docs.databricks.com/aws/en/admin/account-settings/budgets)
