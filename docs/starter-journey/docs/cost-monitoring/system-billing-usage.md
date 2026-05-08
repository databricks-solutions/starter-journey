---
sidebar_position: 3
sidebar_label: System tables
description: Understand billing system tables, enable system.billing, grant access, and run first cost queries on usage and list prices.
---

# System tables

> **You'll verify** `system.billing`, enable it if needed, grant analysts access, and run baseline cost queries in ~25 min.
>
> **Prereqs:** [Infra setup](/docs/infra-setup), [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)

## What you'll build

Read-only access to **`system.billing.usage`** (billable **DBUs**) and **`system.billing.list_prices`** (**SKU** list rates). Same tables power the dashboards in [Import usage dashboard](/docs/cost-monitoring/import-usage-dashboard) and [Demo dashboards (dbdemos)](/docs/cost-monitoring/system-tables-demo-dashboards).

## Prerequisites

- **Account admin** or **metastore admin** to enable schemas.
- To grant non-admins, the caller is typically **both** account admin **and** metastore admin (per current Unity Catalog rules).
- Databricks CLI or a PAT if you enable via API instead of SQL verification alone.

:::warning

Without **`system.billing`**, imports and SQL dashboards fail. Many accounts created after late 2023 already expose **`billing`** — always **`SHOW SCHEMAS IN system`** before forcing enablement.

:::

<!-- TODO: verify before publishing — dossier open question #1: exact auto-enable cutoff for system.billing -->

## Steps

### 1. Explain system tables in one pass

**System tables** live under the **`system`** catalog. They are **read-only**, maintained by Databricks, and queryable only from Unity Catalog workspaces even though rows include usage from all account workspaces.

High-signal objects for cost:

| Table | Path | Role | Retention (typical) |
|------|------|------|---------------------|
| Billable usage | `system.billing.usage` | Every **DBU** row | ~365 days at no extra storage charge |
| List prices | `system.billing.list_prices` | Join for estimated **USD** | Indefinite |
| Audit | `system.access.audit` | Who did what | ~365 days (pricing/preview terms apply) |

Important **`system.billing.usage`** fields: `usage_date`, `sku_name`, `usage_quantity`, `billing_origin_product`, `workspace_id`, `custom_tags`, `usage_metadata` (**cluster_id**, **job_id**, **warehouse_id**, **budget_policy_id**, pipelines, endpoints), `identity_metadata.run_as`.

Important **`system.billing.list_prices`** fields: `sku_name`, `cloud`, `pricing.effective_list.default`, `price_start_time`, `price_end_time`.

Join usage to prices on **`sku_name`** and **`cloud`**, and constrain intervals so **`usage_start_time`/`usage_end_time`** overlap the active price window.

### 2. Verify whether billing is enabled

Run:

```sql
SHOW SCHEMAS IN system;
```

If **`billing`** appears, skip enablement and jump to granting access.

### 3. Enable `system.billing` when missing

1. Find the metastore ID: `databricks unity-catalog metastore-summary` or Catalog Explorer → metastore details.
2. Enable:

```bash
databricks system-schemas enable <METASTORE_ID> system.billing
```

REST alternative:

```bash
curl -X PUT \
  "https://<workspace-url>/api/2.0/unity-catalog/metastores/<metastore-id>/systemschemas/billing" \
  -H "Authorization: Bearer <token>"
```

Initial backfill can take hours (sometimes up to ~24 hours).

### 4. Grant analysts access

Replace `` `data_team` `` with your group:

```sql
GRANT USE CATALOG ON CATALOG system TO `data_team`;
GRANT USE SCHEMA ON SCHEMA system.billing TO `data_team`;
GRANT SELECT ON SCHEMA system.billing TO `data_team`;
```

### 5. Run starter queries

Month-to-date **DBUs** by product:

```sql
SELECT
  billing_origin_product,
  usage_date,
  SUM(usage_quantity) AS total_dbus
FROM system.billing.usage
WHERE month(usage_date) = month(CURRENT_DATE)
  AND year(usage_date) = year(CURRENT_DATE)
GROUP BY 1, 2
ORDER BY usage_date, total_dbus DESC;
```

Top jobs by **DBU**:

```sql
SELECT
  usage_metadata.job_id AS job_id,
  COALESCE(usage_metadata.job_name, CAST(usage_metadata.job_id AS STRING)) AS job_name,
  SUM(usage_quantity) AS total_dbus
FROM system.billing.usage
WHERE usage_metadata.job_id IS NOT NULL
GROUP BY 1, 2
ORDER BY total_dbus DESC
LIMIT 10;
```

Estimated **USD** trend (last 30 days):

```sql
SELECT
  u.usage_date,
  SUM(u.usage_quantity * lp.pricing.effective_list.default) AS estimated_cost_usd
FROM system.billing.usage u
JOIN system.billing.list_prices lp
  ON u.sku_name = lp.sku_name
  AND u.cloud = lp.cloud
  AND u.usage_start_time >= lp.price_start_time
  AND (u.usage_end_time <= lp.price_end_time OR lp.price_end_time IS NULL)
WHERE u.usage_date >= CURRENT_DATE - INTERVAL 30 DAY
GROUP BY 1
ORDER BY 1;
```

Month-over-month growth by product:

```sql
SELECT
  after_t.billing_origin_product,
  before_dbus,
  after_dbus,
  ROUND(((after_dbus - before_dbus) / before_dbus * 100), 1) AS growth_rate_pct
FROM (
  SELECT billing_origin_product, SUM(usage_quantity) AS before_dbus
  FROM system.billing.usage
  WHERE usage_date BETWEEN add_months(CURRENT_DATE, -2) AND add_months(CURRENT_DATE, -1)
  GROUP BY billing_origin_product
) AS before_t
JOIN (
  SELECT billing_origin_product, SUM(usage_quantity) AS after_dbus
  FROM system.billing.usage
  WHERE usage_date BETWEEN add_months(CURRENT_DATE, -1) AND CURRENT_DATE
  GROUP BY billing_origin_product
) AS after_t
  ON before_t.billing_origin_product = after_t.billing_origin_product
WHERE before_dbus > 0
ORDER BY growth_rate_pct DESC;
```

More patterns: community walkthrough [Top 10 queries to use with System Tables](https://community.databricks.com/t5/technical-blog/top-10-queries-to-use-with-system-tables/bc-p/89393) (community content; not official docs).

<!-- TODO: dossier open question #5 — confirm internal linking policy for community.databricks.com -->

## Verify

1. `SHOW SCHEMAS IN system` lists **`billing`**.
2. `SELECT COUNT(*) FROM system.billing.usage` eventually returns non-zero after workloads run.
3. A granted non-admin runs `SELECT * FROM system.billing.usage LIMIT 5` successfully.

## Troubleshoot

<details>
<summary>SCHEMA_NOT_FOUND for system.billing.usage</summary>

Enable **`system.billing`**, then wait for **`ENABLE_COMPLETED`** via `databricks system-schemas list <METASTORE_ID>`.

</details>

<details>
<summary>PERMISSION_DENIED on enable</summary>

Caller must be **account admin** or **metastore admin**.

</details>

<details>
<summary>Non-admins cannot query</summary>

Re-run **USE CATALOG**, **USE SCHEMA**, and **SELECT** grants on **`system`** / **`system.billing`**.

</details>

<details>
<summary>Zero rows right after enablement</summary>

Wait for backfill. Generate fresh usage if the account was idle.

</details>

<details>
<summary>Only one workspace appears</summary>

The table is global. Filter or aggregate by **`workspace_id`** — absence of other workspaces usually means no usage elsewhere yet.

</details>

## Next

- **Do next:** [Tags and attribution](/docs/cost-monitoring/tag-compute-and-jobs)
- **Learn why:** [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)
- **Reference:** [Billable usage system table reference](https://docs.databricks.com/aws/en/admin/system-tables/billing)
