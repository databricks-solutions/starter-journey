---
sidebar_position: 3
sidebar_label: Tags and attribution
description: Attribute spend with custom tags on classic compute and serverless usage policies so billing breaks down by team or project.
---

# Tags and attribution

> **You'll tag** classic compute and configure **serverless usage policies** so **`system.billing.usage`** rolls up by team or project in ~25 min.
>
> **Prereqs:** [Infra setup](/docs/infra-setup)

## What you'll build

Consistent **`custom_tags`** on billable rows: classic clusters, warehouses, and pools via **custom tags**; serverless notebooks, jobs, Lakeflow pipelines, and serving endpoints via **serverless usage policies** (docs also call these **budget policies** — the billing column is **`usage_metadata.budget_policy_id`**).

## Prerequisites

- **Workspace admin** for tagging compute and creating serverless usage policies.
- **Account admin** for workspace-level tags through the Account API and for tag-aware budgets on [Budget alerts](/docs/cost-monitoring/budget-alerts).

:::warning

Tags apply **from creation forward**. Historical rows stay untagged. Start early if you need chargeback.

:::

## Serverless compute

**Public Preview — serverless usage policies**

Serverless notebooks, jobs, Lakeflow pipelines, and model serving pick up tags from policies instead of cluster tags.

1. Avatar → **Settings** → **Compute**.
2. Next to **Serverless usage policies**, click **Manage**.
3. **Create** → name the policy → add tag pairs (for example `team:data-engineering`).
4. **Permissions** → **Grant access** → assign **User** or **Manager** roles.

One assigned policy auto-attaches; multiple policies force an explicit pick at creation; if none is chosen, the UI may default to the first alphabetical policy; changes affect **new** usage only.

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/KngmFckrabU"
  title="Serverless usage policies walkthrough"
></iframe>

## Classic compute

**Custom tags** apply to clusters, SQL warehouses, pools, and job compute (GA).

**Cluster:** **Compute** → cluster → **Edit** → **Advanced options** → **Tags** → add keys and values → confirm or restart.

**SQL warehouse:** **SQL Warehouses** → warehouse → **Edit** → **Tags** → save.

**Pools / jobs:** Use the Pools UI or Jobs compute tags; bundles allow up to **25** tags per job definition.

**Workspace tags:** Account admins only — Account API `PATCH` workspaces with `custom_tags`.

Default tags (`Vendor`, `ClusterId`, `ClusterName`, `Creator`, `RunName`, `JobId` on job compute) remain automatic.

**Video:** [Tagging clusters for cost attribution](https://www.youtube.com/watch?v=0fRmMBe4vxE) — the walkthrough uses **Azure** in the title; the same tagging flow applies on **AWS** and **GCP** workspaces.

**Compute policies** can **require** tags at cluster creation (**Compute** → **Policies**). For policy JSON and limits, see [Create and manage compute policies](https://docs.databricks.com/aws/en/admin/clusters/policies) and the [policy reference](https://docs.databricks.com/aws/en/admin/clusters/policy-definition).

### Limits and cloud rules

- Characters: letters, digits, `+ - = . , _ : @` (no spaces or `/`).
- Up to **20** custom tags per workspace-managed compute resource; bundles extend jobs separately.
- Do **not** use reserved key **`Name`** for custom tags.
- Cluster tag edits often need restarts to reach cloud instances; workspace tags may lag up to **one hour**.
- Pool workloads propagate **workspace + pool** tags to cloud VMs — cluster-only tags still appear in Databricks billing.
- Matching default keys may gain an **`x_`** prefix in the cloud; policy conflicts can hard-fail cluster creation instead.

:::tip

**GCP** labels are more restrictive (length, lowercase). Expect truncation on email-like values.

:::

## Example queries

Cost by **`team`** tag:

```sql
SELECT
  custom_tags['team'] AS team,
  SUM(u.usage_quantity * lp.pricing.effective_list.default) AS estimated_cost_usd
FROM system.billing.usage u
JOIN system.billing.list_prices lp
  ON u.sku_name = lp.sku_name
  AND u.cloud = lp.cloud
  AND u.usage_start_time >= lp.price_start_time
  AND (u.usage_end_time <= lp.price_end_time OR lp.price_end_time IS NULL)
WHERE u.usage_date >= CURRENT_DATE - INTERVAL 30 DAY
GROUP BY 1
ORDER BY estimated_cost_usd DESC;
```

Untagged classic clusters (gap hunt):

```sql
SELECT
  workspace_id,
  sku_name,
  usage_metadata.cluster_id,
  SUM(usage_quantity) AS total_dbus
FROM system.billing.usage
WHERE usage_date >= CURRENT_DATE - INTERVAL 30 DAY
  AND custom_tags['team'] IS NULL
  AND usage_metadata.cluster_id IS NOT NULL
GROUP BY 1, 2, 3
ORDER BY total_dbus DESC;
```

Serverless usage by **`budget_policy_id`**:

```sql
SELECT
  usage_metadata.budget_policy_id,
  billing_origin_product,
  SUM(u.usage_quantity * lp.pricing.effective_list.default) AS estimated_cost_usd
FROM system.billing.usage u
JOIN system.billing.list_prices lp
  ON u.sku_name = lp.sku_name
  AND u.cloud = lp.cloud
  AND u.usage_start_time >= lp.price_start_time
  AND (u.usage_end_time <= lp.price_end_time OR lp.price_end_time IS NULL)
WHERE u.usage_date >= CURRENT_DATE - INTERVAL 30 DAY
  AND u.usage_metadata.budget_policy_id IS NOT NULL
GROUP BY 1, 2
ORDER BY estimated_cost_usd DESC;
```

More patterns: [Top 10 queries to use with System Tables](https://community.databricks.com/t5/technical-blog/top-10-queries-to-use-with-system-tables/bc-p/89393).

## Verify

1. Tag a cluster `test_tag:verification`, run work, wait **2–4 hours**, then filter **`system.billing.usage`** on that map key.
2. Assign yourself a serverless usage policy, run serverless work, then confirm **`budget_policy_id`** is populated.
3. In **AWS Cost Explorer** (or equivalent), confirm propagated tags when classic compute backs the bill.

## Troubleshoot

<details>
<summary>Tags missing on serverless rows</summary>

Classic tags never apply to fully serverless runs. Use a **serverless usage policy**.

</details>

<details>
<summary>Cluster creation fails inside a policy</summary>

Rename conflicting keys (for example use `x_vendor` instead of colliding with defaults).

</details>

<details>
<summary>Cloud billing lacks cluster tags on pooled workloads</summary>

Move tags to **pool** or **workspace**, or rely on Databricks **`system.billing.usage`** for attribution.

</details>

<details>
<summary>Policy never attaches to an old notebook</summary>

Policies are not retroactive — update the notebook compute selector (**More…**) to pick the policy.

</details>

## Next

- **Do next:** [Budget alerts](/docs/cost-monitoring/budget-alerts)
- **Learn why:** [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)
- **Reference:** [Use tags to attribute and track usage](https://docs.databricks.com/aws/en/admin/account-settings/usage-detail-tags)
