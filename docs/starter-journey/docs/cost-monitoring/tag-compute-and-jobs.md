---
sidebar_position: 1
sidebar_label: Tag compute and jobs
description: Add custom tags to clusters, SQL warehouses, pools, and serverless usage policies so billing records attribute cost by team or project.
---

# Tag compute and jobs

> **You'll attach** custom tags to compute and jobs so usage shows up under the right team or project in billing in ~20 min.
>
> **Prereqs:** [Infra setup](/docs/infra-setup), [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)

## What you'll build

Custom tags on compute and serverless (for example `team:data-engineering`) propagate to billing so you can attribute spend by team or project in `system.billing.usage` and cloud consoles.

## Prerequisites

- Workspace admin role to add tags to compute resources in a workspace.
- Account admin role to add workspace-level tags through the Account API.
- Optional: compute policy **CAN USE** permission if you enforce tags through policy.

## Background

**Default tags** include `Vendor`, `ClusterId`, `ClusterName`, `Creator`, `RunName`, and `JobId`. **Custom tags** are pairs on compute, pools, warehouses, or serverless policies. A **SKU** names a billing category; a **DBU** is consumption priced per **SKU**. A **compute policy** can require tags at cluster creation.

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
    - [ ] **Tag compute and jobs.**
    - [ ] Enable system billing usage.
    - [ ] Use the cost management UI.
    - [ ] Set up budget alerts.
    - [ ] Build a cost dashboard with AI/BI.

## Steps

### 1. Add tags to clusters and SQL warehouses

**Cluster:** **Compute** → select cluster → **Edit** → **Advanced options** → **Tags** → add pairs (for example `team` = `data-engineering`) → **Confirm** or restart if needed.

**SQL warehouse:** **SQL Warehouses** → select warehouse → **Edit** → **Tags** → add pairs → save.

### 2. Enforce tags with a compute policy

**Compute** → **Policies** → **Create policy** → in **Tags**, add `fixed` or `required` rules → assign the policy to users or groups. Use a **compute policy** to require a tag when clusters are created.

### 3. Tag serverless workloads

**Public Preview — serverless usage policies:** Admins attach tags via policy and assign users or groups; tags land in `system.billing.usage` `custom_tags` for serverless notebooks, jobs, pipelines, and model serving.

1. Open **Settings** → **Compute** → **Serverless usage policies** → **Manage**.
2. Click **Create**, add a name and tags, then open **Permissions** and grant users or groups.

### 4. Set workspace-level tags with the API

Account admins can patch workspace tags with the Account API:

```bash
curl -X PATCH "https://accounts.cloud.databricks.com/api/2.0/accounts/{account_id}/workspaces/{workspace_id}" \
  -H "Authorization: Bearer {token}" \
  -d '{"custom_tags": [{"key": "cost_center", "value": "finance"}]}'
```

Replace `{account_id}`, `{workspace_id}`, and `{token}` with your values.

## Propagation and limits

Cluster tags propagate to AWS EC2 and EBS. If a cluster is created from a pool, EC2 instances inherit **workspace and pool tags** only; cluster tags still appear in DBU billing records and in `system.billing.usage.custom_tags`.

Allowed characters in tag keys and values are letters, numbers, and `+ - = . , _ : @` (no spaces or `/`). The key `Name` is reserved. Conflicting custom keys with Databricks default tags may get an `x_` prefix during cloud propagation; inside **compute policies**, a conflict can raise an error instead.

Up to **20 custom tags per workspace resource**. Jobs defined through Bundles allow up to **25** tags per job. <!-- TODO: verify before publishing — see dossier open question #7: max custom tags per cluster --> Changing tags on a cluster may require a restart for running instances. Workspace tag changes can take up to an hour to propagate.

:::warning

Tags only apply from the moment you add them. You cannot retroactively tag historical usage. Start tagging early so attribution covers more of your timeline.

:::

**Cloud:** **AWS** and **Azure** propagate tags to VMs with the dossier character set. **GCP** label rules differ; owner-related values may truncate at `@databricks.com`, and labels may not support the full character set above.

<!-- TODO: verify before publishing — see dossier open question #5: cloud-specific tag character limits -->

## Example query

With [billing enabled](/docs/cost-monitoring/system-billing-usage), rank usage by `team` and **SKU**:

```sql
SELECT
  custom_tags['team'] AS team,
  sku_name,
  SUM(usage_quantity) AS total_dbus
FROM system.billing.usage
WHERE usage_date >= CURRENT_DATE - INTERVAL 30 DAY
  AND custom_tags['team'] IS NOT NULL
GROUP BY 1, 2
ORDER BY total_dbus DESC;
```

Filter `system.billing.usage` with `custom_tags['team'] IS NULL` and non-null `usage_metadata.cluster_id` to list untagged compute.

## Verify

1. Create a test cluster tagged `test_tag:verification`, run a short notebook, then after one to two hours query `system.billing.usage` for that tag.
2. In your cloud console (for example AWS Cost Explorer), confirm the tag appears on EC2 where propagation applies.

## Troubleshoot

<details>
<summary>Custom tags do not appear in cloud billing</summary>

The cluster may have been created from a pool. Pool-launched EC2 instances inherit only workspace and pool tags. Move the tag to the pool or workspace level, or rely on DBU records in Databricks billing for cluster-level tags.

</details>

<details>
<summary>Cluster fails to start with invalid settings</summary>

A custom tag key may collide with a Databricks default tag key inside a compute policy. Rename the key to avoid the collision (for example use `x_vendor` instead of `vendor`).

</details>

<details>
<summary>Tags are missing in system.billing.usage for serverless usage</summary>

Classic cluster tags do not cover serverless. Create a serverless usage policy with the tags you need and assign users to that policy.

</details>

<details>
<summary>Workspace tag change is not visible yet</summary>

Wait up to an hour for workspace tags to propagate, then re-check billing.

</details>

## Learn more

- [Use tags to attribute and track usage](https://docs.databricks.com/aws/en/admin/account-settings/usage-detail-tags)
- [Attribute usage with serverless usage policies](https://docs.databricks.com/aws/en/admin/usage/budget-policies)
- [Compute policy reference — custom tag enforcement](https://docs.databricks.com/aws/en/admin/clusters/policy-definition)
- [Create and manage compute policies](https://docs.databricks.com/aws/en/admin/clusters/policies)

## Next

- **Do next:** [Enable system billing usage](/docs/cost-monitoring/system-billing-usage)
- **Learn why:** [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)
- **Reference:** [Use tags to attribute and track usage](https://docs.databricks.com/aws/en/admin/account-settings/usage-detail-tags)
