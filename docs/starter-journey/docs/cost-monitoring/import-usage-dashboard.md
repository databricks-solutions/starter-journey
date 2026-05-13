---
sidebar_position: 1
sidebar_label: Import usage dashboard
description: Account admins import the pre-built AI/BI usage dashboard and read Usage graphs, pricing, and downloads.
---

# Import usage dashboard

> **You'll import** the account-console usage dashboard into a workspace and know how to read the **Usage** page in ~10 min.

## What you'll build

A pre-built, editable dashboard in **AI/BI Dashboards**, scoped to your account or one workspace. Charts break down spend by product, SKU, and tags without authoring SQL first.

:::warning

Only **account admins** can import the dashboard from the account console.

:::

## Steps

### 1. Sign in to the account console

Open the account console for your cloud:

- **AWS:** [accounts.cloud.databricks.com](https://accounts.cloud.databricks.com)
- **Azure:** [accounts.azuredatabricks.net](https://accounts.azuredatabricks.net)
- **GCP:** [accounts.gcp.databricks.com](https://accounts.gcp.databricks.com)

### 2. Import the usage dashboard into a Workspace

![Setup usage dashboard dialog showing Account usage selected, Version 2.0, and a target workspace dropdown with the Import button highlighted](/img/import-usage-dashboard.webp)

1. Click **Usage** in the left sidebar.
2. Click **Setup dashboard**.
3. Choose the dashboard version. **Usage Dashboard version 2.0** is in **Public Preview**; it adds cost forecasting and object-level drill-down. The standard version covers usage by product, SKU, tags, and top usage sources.

<!-- TODO: verify before publishing — Usage Dashboard v2.0 GA / replacement of standard version -->

4. Choose scope: **entire account** or **single workspace**.
5. Pick the **target workspace** that should receive the dashboard.
6. Click **Import**. You land on the new dashboard in that workspace.

### 3. Customize and publish (optional)

1. Edit widgets, filters, and datasets like any AI/BI dashboard.
2. Click **Publish** when stakeholders need a stable URL.
3. Choose **Viewer credentials** (each viewer’s permissions apply) or **Editor credentials** (the editor’s permissions apply at refresh time).

### 4. Use the rest of the Usage page (graphs and downloads)

Still under **Usage** (same sidebar entry):

- **Usage graph** — Filter by workspace, SKU, or tag; toggle **USD** vs **DBU**; set the date range (UTC).
- **Usage details** — Tabular workspace breakdown aligned to the graph’s range.
- **Pricing settings** — Adjust per-SKU **list** rates so console estimates move closer to your contract. Invoices still include discounts and credits the UI does not model.
- **Budgets** — Account budgets live here too; follow [Budget alerts](/docs/cost-monitoring/budget-alerts) and the [official budgets guide](https://docs.databricks.com/aws/en/admin/account-settings/budgets).
- **Download** — Export aggregated or raw usage (**CSV**). Large exports may hit row caps; use **`system.billing.usage`** for full fidelity when you outgrow exports.

Some tenants split legacy visuals under **Consumption (Legacy)**. If you only see **Setup dashboard** on **Consumption**, open **Consumption (Legacy)** (or equivalent) for the graph, details, pricing, and downloads.

:::tip

Graphs and downloads reconcile to **`system.billing.usage`**. When numbers diverge from invoices, remember discounts and credits. See [Usage dashboards](https://docs.databricks.com/aws/en/admin/account-settings/usage).

:::

### 5. Optional: build your own dashboard in AI/BI Dashboards

Add datasets from SQL on **`system.billing.usage`** and joined **`system.billing.list_prices`**. Start from [Databricks AI/BI dashboards](/docs/databricks-aibi/dashboards) and [Dashboards (AI/BI)](https://docs.databricks.com/aws/en/dashboards).

## Verify

![Dashboards page in a Databricks workspace showing the imported Account Usage Dashboard featured at the top of the list](/img/verify-usage-dashboard.webp)

1. Open the imported dashboard and confirm charts return data for a recent date range.
2. Open the **Custom tags** view — untagged usage looks sparse until you tag compute ([Tags and attribution](/docs/cost-monitoring/tag-compute-and-jobs)).
3. Ask a colleague with **SELECT** on **`system.billing`** (and warehouse access if you published with viewer credentials) to open the published dashboard.



## Troubleshoot

<details>
<summary>Dashboard tiles show permission denied</summary>

Grant **SELECT** on **`system.billing.usage`** and **`system.billing.list_prices`**, or republish with **Editor credentials**.

</details>

<details>
<summary>Imported dashboard only shows one workspace</summary>

You chose single-workspace scope. Re-import with entire-account scope or edit datasets.

</details>

<details>
<summary>No billing rows yet</summary>

Run a small job or notebook, then wait a few hours for usage rows to land.

</details>

<details>
<summary>Cannot find the dashboard after import</summary>

Open the workspace you selected and search the workspace **Dashboards** list for **Usage**.

</details>

## Next

- **Do next:** [Additional dashboards](/docs/cost-monitoring/additional-dashboards)
- **Learn why:** [Account Console foundations](/docs/before-you-start/foundations/account-console)
- **Reference:** [Usage dashboards](https://docs.databricks.com/aws/en/admin/account-settings/usage)
