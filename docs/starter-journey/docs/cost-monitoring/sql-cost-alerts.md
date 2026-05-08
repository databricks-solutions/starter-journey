---
sidebar_position: 6
sidebar_label: SQL cost alerts
description: Create workspace SQL alerts on schedules against system billing tables with Slack, email, or webhook destinations.
---

# SQL cost alerts

> **You'll configure** a workspace **SQL alert** that evaluates billing SQL on a cadence and notifies Slack or email when a threshold trips in ~20 min.
>
> **Prereqs:** [System tables](/docs/cost-monitoring/system-billing-usage), SQL warehouse (serverless recommended), optional notification destinations

## What you'll build

Scheduled evaluations over **`system.billing.usage`** (plus **`system.billing.list_prices`** joins) with **`OK` / `TRIGGERED` / `ERROR`** states — finer-grained than monthly account budgets.

## Prerequisites

- Alert owner can **SELECT** billing tables.
- Warehouse stays available on schedule (serverless warehouses simplify this).
- Workspace admins configure external destinations under **Settings → Notification destinations** when you need Slack, Teams, PagerDuty, or webhooks.
- Workspace admins may need to enable the SQL alerts preview on the workspace **Previews** page before the new alert builder appears.

**Public Preview — SQL alerts:** Feature guardrails still evolve; legacy alerts may coexist.

<!-- TODO: dossier open question #9 — SQL alerts GA and migration -->

## Steps

### 1. Author the SQL

Workspace sidebar → **Alerts** → **Create Alert**.

Example — yesterday’s estimated spend:

```sql
SELECT
  SUM(u.usage_quantity * lp.pricing.effective_list.default) AS yesterday_cost_usd
FROM system.billing.usage u
JOIN system.billing.list_prices lp
  ON u.sku_name = lp.sku_name
  AND u.cloud = lp.cloud
  AND u.usage_start_time >= lp.price_start_time
  AND (u.usage_end_time <= lp.price_end_time OR lp.price_end_time IS NULL)
WHERE u.usage_date = CURRENT_DATE - INTERVAL 1 DAY;
```

Use **`CURRENT_DATE - INTERVAL 1 DAY`** (or similar) so partially loaded **today** rows do not false-trigger.

### 2. Define the condition

Pick the aggregate or scalar column (**`yesterday_cost_usd`**), operator (**>**), and threshold (**500**). Click **Test condition** after **Run all**.

### 3. Add notifications and schedule

Attach recipients or destinations, then set the cadence (ranges span **5 minutes** to **daily** per workspace capabilities).

### 4. Save and monitor

Open **View alert** — status must not stay **`ERROR`**.

## More alert patterns

Spiky job (**DBU**) consumption:

```sql
SELECT
  usage_metadata.job_id,
  COALESCE(usage_metadata.job_name, 'unknown') AS job_name,
  SUM(usage_quantity) AS dbus_24h
FROM system.billing.usage
WHERE usage_date >= CURRENT_DATE - INTERVAL 1 DAY
  AND billing_origin_product = 'JOBS'
GROUP BY 1, 2
HAVING SUM(usage_quantity) > 1000
ORDER BY dbus_24h DESC
LIMIT 5;
```

Condition idea: **number of rows > 0**.

Untagged share of usage:

```sql
SELECT
  ROUND(
    SUM(CASE WHEN custom_tags['team'] IS NULL THEN usage_quantity ELSE 0 END) * 100.0 /
    NULLIF(SUM(usage_quantity), 0),
  1) AS untagged_pct
FROM system.billing.usage
WHERE usage_date >= CURRENT_DATE - INTERVAL 7 DAY;
```

Condition idea: **`untagged_pct > 20`**.

:::warning

Preview alerts own a single query text — no shared datasets or parameter bindings yet.

:::

## Verify

1. Alert dashboard shows **`OK`** or **`TRIGGERED`**, not **`ERROR`**.
2. Force a **`TRIGGERED`** state with a deliberately low threshold and confirm Slack/email delivery.

## Troubleshoot

<details>
<summary>ERROR status</summary>

Run the SQL manually on the same warehouse; fix syntax or permissions.

</details>

<details>
<summary>No Slack message</summary>

Validate the webhook or destination entry with a workspace admin.

</details>

<details>
<summary>Never triggers</summary>

Threshold may exceed reality — temporarily lower it to test.

</details>

<details>
<summary>Stale numbers</summary>

Billing ingestion lags hours behind real time — design predicates around completed days.

</details>

## Next

- **Do next:** [Compute policies](/docs/cost-monitoring/compute-policies-cost)
- **Learn why:** [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)
- **Reference:** [Databricks SQL alerts](https://docs.databricks.com/aws/en/sql/user/alerts/)
