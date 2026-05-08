---
sidebar_position: 5
sidebar_label: Budget alerts
description: Create account-console budgets with monthly USD thresholds and email alerts scoped by workspace or tags.
---

# Budget alerts

> **You'll create** account-level budgets that email stakeholders when spend crosses list-price thresholds in ~15 min.
>
> **Prereqs:** [Account Console foundations](/docs/before-you-start/foundations/account-console), [Tags and attribution](/docs/cost-monitoring/tag-compute-and-jobs) (recommended for tag filters)

## What you'll build

Monthly **USD** budgets driven by **list prices** (including platform add-ons). Alerts email external recipients; budgets never throttle workloads.

## Prerequisites

- **Account admin** role.
- Optional: live **custom tags** if you filter budgets per team ([Tags and attribution](/docs/cost-monitoring/tag-compute-and-jobs)).

:::warning

Budgets **monitor only**. Usage keeps accruing after you cross a threshold.

:::

**Public Preview — budgets:** Limits may change before GA.

<!-- TODO: dossier open question #8 — Budget GA timeline and alert caps -->

## Steps

### 1. Create a budget

1. Sign in to the [account console](https://accounts.cloud.databricks.com).
2. Open **Usage**.
3. Open the **Budgets** tab.
4. Click **Add budget**.
5. Enter a **Name**.
6. Under **Definitions**, optionally choose workspaces and/or **custom tag** key:value filters — leave blank for account-wide scope.
7. Add up to **four** unique **Monthly threshold** amounts. Each threshold carries its own comma-separated **Email** list.
8. Click **Create**.

Recipients do not need Databricks accounts.

### 2. Expect latency

Alerts may lag usage by up to **24 hours**. New budgets can show **$0** briefly while telemetry catches up.

<!-- TODO: dossier open question #10 — billing latency vs formal SLA -->

### 3. Validate scope with SQL (optional)

Workspace rollups month-to-date:

```sql
SELECT
  workspace_id,
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

Tag rollups:

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
  AND custom_tags['team'] IS NOT NULL
GROUP BY 1
ORDER BY mtd_cost_usd DESC;
```

## Verify

1. **Usage** → **Budgets** lists the new budget.
2. Open it — cumulative spend plots against dotted thresholds.
3. For a dry-run email, set a threshold below month-to-date spend and wait (check spam).

## Troubleshoot

<details>
<summary>Budget stuck at zero</summary>

Wait up to a day for telemetry; confirm the account generated usage this month.

</details>

<details>
<summary>No email</summary>

Verify addresses, spam folders, and that spend crossed the configured threshold after latency.

</details>

<details>
<summary>Totals mismatch invoices</summary>

Budgets intentionally ignore credits/discounts. Model contracts in SQL or external tools if needed.

</details>

<details>
<summary>Cannot create budgets</summary>

Only **account admins** manage budgets.

</details>

<details>
<summary>Tag filters empty</summary>

Confirm resources emitted that tag before the budget month ([Tags and attribution](/docs/cost-monitoring/tag-compute-and-jobs)).

</details>

## Next

- **Do next:** [SQL cost alerts](/docs/cost-monitoring/sql-cost-alerts)
- **Learn why:** [Account Console foundations](/docs/before-you-start/foundations/account-console)
- **Reference:** [Create and monitor budgets](https://docs.databricks.com/aws/en/admin/account-settings/budgets)
