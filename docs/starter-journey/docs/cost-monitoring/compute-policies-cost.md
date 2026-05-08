---
sidebar_position: 7
sidebar_label: Compute policies
description: Enforce auto-termination, cluster size caps, DBU-per-hour limits, and required cost tags with workspace compute policies.
---

# Compute policies

> **You'll publish** workspace policies that block oversized clusters and force attribution tags before workloads start in ~20 min.
>
> **Prereqs:** [Tags and attribution](/docs/cost-monitoring/tag-compute-and-jobs), workspace admin access

## What you'll build

Policies that shape **creation-time** guardrails: auto-termination, **`autoscale.max_workers`** ceilings, **`dbus_per_hour`** caps, allowed **node types**, and mandatory **`custom_tags`**. This complements monitoring ([Import usage dashboard](/docs/cost-monitoring/import-usage-dashboard), [Budget alerts](/docs/cost-monitoring/budget-alerts)) by preventing runaway configurations up front.

## Prerequisites

- **Workspace admin** to author policies and assign **CAN USE**.
- Agreed tag taxonomy if you enforce **`team`** / **`project`** keys.

:::warning

Policies evaluate when resources are **created**. They do **not** terminate existing clusters when you tighten rules, and they do **not** cap overall account spend.

:::

:::tip

**`dbus_per_hour`** behaves like an estimated ceiling — communicate that autoscaling and marketplace VMs can surprise operators.

:::

<!-- TODO: dossier open question #11 — dbus_per_hour semantics -->

## Steps

### 1. Author a baseline policy

1. **Compute** → **Policies** → **Create policy**.
2. Name it (for example **Standard – Small**).
3. Optionally start from a **policy family** (personal/shared/job templates).
4. Under advanced definitions add:
   - **`autotermination_minutes`** fixed (for example **60**).
   - **`autoscale.max_workers`** range capped (for example max **10**).
   - **`dbus_per_hour`** range capped (for example max **50**).
5. Under **Tags**, mark **`team`** **required** and enforce **`project`** via regex or fixed values mirroring [Tags and attribution](/docs/cost-monitoring/tag-compute-and-jobs).

### 2. Assign access

Open **See all permissions** → grant groups **CAN USE**. Remove **Unrestricted** policy access for users who must stay inside governed profiles.

### 3. Offer T-shirt sizes (recommended pattern)

- **Small** — low **`max_workers`**, **30** minute auto-termination, narrow node allow-list.
- **Medium** — moderate ceilings, **60** minute termination.
- **Large** — highest approved ceilings with optional administrative approval workflows outside this doc.

### 4. Validate enforcement

Attempt to create clusters above **`max_workers`** or omit **`project`** — saves should fail fast.

## Example policy JSON

Policies serialize to JSON definitions similar to:

```json
{
  "autotermination_minutes": {"type": "fixed", "value": 60, "hidden": true},
  "autoscale.max_workers": {"type": "range", "maxValue": 10, "defaultValue": 4},
  "dbus_per_hour": {"type": "range", "maxValue": 50},
  "custom_tags.team": {"type": "fixed", "value": ""},
  "custom_tags.project": {"type": "regex", "pattern": ".+"}
}
```

Interpretation: hidden **60** minute termination, **1–10** workers (default **4**), **≤50** DBU/hour ceiling, non-empty **`project`** tag required.

## SQL spotlight — expensive interactive clusters

```sql
SELECT
  usage_metadata.cluster_id,
  MIN(usage_start_time) AS first_seen,
  MAX(usage_end_time) AS last_seen,
  DATEDIFF(HOUR, MIN(usage_start_time), MAX(usage_end_time)) AS hours_running,
  SUM(u.usage_quantity * lp.pricing.effective_list.default) AS cost_usd
FROM system.billing.usage u
JOIN system.billing.list_prices lp
  ON u.sku_name = lp.sku_name
  AND u.cloud = lp.cloud
  AND u.usage_start_time >= lp.price_start_time
  AND (u.usage_end_time <= lp.price_end_time OR lp.price_end_time IS NULL)
WHERE u.usage_date >= CURRENT_DATE - INTERVAL 7 DAY
  AND u.billing_origin_product IN ('ALL_PURPOSE', 'INTERACTIVE')
GROUP BY 1
ORDER BY cost_usd DESC
LIMIT 10;
```

Use the results to justify tighter **`autotermination_minutes`** or **`dbus_per_hour`** limits.

## Verify

1. Users under the policy no longer see forbidden fields in the cluster UI.
2. Policy violations raise explicit errors at save time.
3. **Policies** UI shows attached compute adopting the new templates.

## Troubleshoot

<details>
<summary>Users still spawn unrestricted clusters</summary>

They retain **Unrestricted** **CAN USE**. Remove it when governance requires enforcement.

</details>

<details>
<summary>Running clusters ignore updates</summary>

Terminate and recreate after policy changes — running clusters keep old shapes.

</details>

<details>
<summary>Save fails with invalid settings</summary>

Rename conflicting **`custom_tags`** keys so they do not collide with Databricks defaults inside policies.

</details>

## Next

- **Do next:** [Get started](/docs/get-started) — revisit the full journey map
- **Learn why:** [Workspace foundations](/docs/before-you-start/foundations/workspace)
- **Reference:** [Compute policy reference](https://docs.databricks.com/aws/en/admin/clusters/policy-definition)
