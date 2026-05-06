---
sidebar_position: 2
sidebar_label: System billing usage
description: Enable the system.billing schema, grant access, and query billable usage and list prices across your account.
---

# System billing usage

> **You'll enable** the `system.billing` schema and run your first cost queries in ~25 min.
>
> **Prereqs:** [Infra setup](/docs/infra-setup), [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)

## What you'll build

The **system schema** named `system.billing` is enabled on your **metastore** (the top-level Unity Catalog container for governance in a region). You can query `system.billing.usage` and `system.billing.list_prices` for granular **DBU** consumption and estimated dollar cost across the account.

## Prerequisites

- **Account admin** role and **metastore admin** role. The same person often holds both; both are required to enable the schema and grant access cleanly.
- At least one Unity Catalog-enabled workspace in the account.
- Metastore on Unity Catalog Privilege Model Version 1.0.
- Databricks CLI configured, or a token for the REST API.

:::warning

Enabling the billing system schema requires **account admin** and **metastore admin** privileges. If either role is missing, enablement or grants will fail until an appropriate admin completes the steps.

:::

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
    - [ ] **Enable system billing usage.**
    - [ ] Use the cost management UI.
    - [ ] Set up budget alerts.
    - [ ] Build a cost dashboard with AI/BI.

## Steps

### 1. Find your metastore ID

<!-- TODO: verify before publishing — open question #1: system schema auto-enablement on newer accounts -->

Run:

```bash
databricks unity-catalog metastore-summary
```

Or use the UI: open **Catalog**, open the metastore gear icon for **Metastore details**, then copy the Metastore ID.

### 2. Enable the billing schema with the CLI

Run (replace `<METASTORE_ID>`):

```bash
databricks system-schemas enable <METASTORE_ID> system.billing
```

The `system.billing` schema is **not** on by default. An **account admin** or **metastore admin** must enable it. You can use the CLI or REST API; there is no dedicated per-schema UI toggle for individual schemas.

### 3. Enable the billing schema with the REST API (alternative)

```bash
curl -X PUT \
  "https://<workspace-url>/api/2.0/unity-catalog/metastores/<metastore-id>/systemschemas/billing" \
  -H "Authorization: Bearer <token>"
```

Use your workspace URL, metastore id, and a valid bearer token.

### 4. Confirm the schema state

```bash
databricks system-schemas list <METASTORE_ID>
```

Look for `billing` with state `AVAILABLE` or `ENABLE_COMPLETED`.

### 5. Grant access to non-admin groups

A user who is both **account admin** and **metastore admin** runs grants for analysts or engineers (replace `` `group_name` ``):

```sql
GRANT USE CATALOG ON CATALOG system TO `group_name`;
GRANT USE SCHEMA ON SCHEMA system.billing TO `group_name`;
GRANT SELECT ON SCHEMA system.billing TO `group_name`;
```

**System tables** are read-only tables inside a system schema. Databricks maintains the data and shares it into your metastore.

### 6. Run a smoke query

```sql
SELECT * FROM system.billing.usage LIMIT 10;
```

## How the tables fit together

`system.billing.usage` holds billable **DBU** rows with about **365 days** of retention at no charge. `system.billing.list_prices` holds **SKU** list prices over time. Join them on `sku_name` and `cloud`, align `usage_start_time` / `usage_end_time` to `price_start_time` / `price_end_time`, and use `pricing.effective_list.default` inside the `pricing` struct for dollar estimates.

**Key columns on `system.billing.usage`:** `usage_date`, `sku_name`, `usage_quantity`, `billing_origin_product` (e.g. `JOBS`, `SQL`), `workspace_id`, `custom_tags`, `usage_metadata` (e.g. `cluster_id`, `job_id`, `warehouse_id`, `budget_policy_id`), `identity_metadata.run_as`, `record_type`.

**Key columns on `system.billing.list_prices`:** `sku_name`, `cloud`, `currency_code`, `usage_unit`, `pricing` (struct including `effective_list.default`), `price_start_time`, `price_end_time`.

Usage rows usually appear within a few hours of the workload; initial backfill after enablement can take longer. The billing table is **global** (all regions); some other system tables are regional.

## Example analysis queries

Total DBUs by product for the current month:

```sql
SELECT
  billing_origin_product,
  usage_date,
  SUM(usage_quantity) AS total_dbus
FROM system.billing.usage
WHERE month(usage_date) = month(CURRENT_DATE)
  AND year(usage_date) = year(CURRENT_DATE)
GROUP BY billing_origin_product, usage_date
ORDER BY usage_date, total_dbus DESC;
```

Top jobs by estimated list cost over the last 30 days:

```sql
SELECT
  usage_metadata.job_id AS job_id,
  COALESCE(usage_metadata.job_name, CAST(usage_metadata.job_id AS STRING)) AS job_name,
  SUM(u.usage_quantity * lp.pricing.effective_list.default) AS estimated_cost_usd,
  COUNT(DISTINCT usage_metadata.job_run_id) AS run_count
FROM system.billing.usage u
JOIN system.billing.list_prices lp
  ON u.sku_name = lp.sku_name
  AND u.cloud = lp.cloud
  AND u.usage_start_time >= lp.price_start_time
  AND (u.usage_end_time <= lp.price_end_time OR lp.price_end_time IS NULL)
WHERE u.usage_date >= CURRENT_DATE - INTERVAL 30 DAY
  AND u.billing_origin_product = 'JOBS'
GROUP BY 1, 2
ORDER BY estimated_cost_usd DESC
LIMIT 10;
```

## Verify

1. Run `SHOW SCHEMAS IN system` and confirm `billing` appears.
2. Run `SELECT COUNT(*) FROM system.billing.usage`. Count may be zero immediately after enablement; data fills within hours and backfill can take up to about a day in edge cases.
3. Run `SELECT * FROM system.billing.list_prices LIMIT 5;` and confirm rows return.

## Troubleshoot

<details>
<summary>SCHEMA_NOT_FOUND when querying system.billing.usage</summary>

Enable the schema with `databricks system-schemas enable <metastore-id> system.billing`, then wait for completion.

</details>

<details>
<summary>PERMISSION_DENIED on the enable command</summary>

The caller must be **account admin** or **metastore admin**. On accounts created after November 2023 there may be no default metastore admin; assign a metastore admin first, then retry.

</details>

<details>
<summary>Non-admin users see PERMISSION_DENIED on queries</summary>

An admin must grant `USE CATALOG` on `system`, `USE SCHEMA` on `system.billing`, and `SELECT` on the billing schema objects.

</details>

<details>
<summary>Table exists but returns zero rows right after enablement</summary>

Wait for backfill. Initial population can take several hours and in some cases up to about 24 hours.

</details>

## Learn more

- [System tables reference](https://docs.databricks.com/aws/en/admin/system-tables/)
- [Billable usage system table reference](https://docs.databricks.com/aws/en/admin/system-tables/billing)
- [Pricing system table reference](https://docs.databricks.com/aws/en/admin/system-tables/pricing)
- [Monitor costs using system tables](https://docs.databricks.com/aws/en/admin/usage/system-tables)
- [system-schemas CLI command group](https://docs.databricks.com/aws/en/dev-tools/cli/reference/system-schemas-commands)
- [Monitor job costs and performance with system tables](https://docs.databricks.com/aws/en/admin/system-tables/jobs-cost)

## Next

- **Do next:** [Use the cost management UI](/docs/cost-monitoring/cost-management-ui)
- **Learn why:** [Account Console foundations](/docs/before-you-start/foundations/account-console)
- **Reference:** [Billable usage system table reference](https://docs.databricks.com/aws/en/admin/system-tables/billing)
