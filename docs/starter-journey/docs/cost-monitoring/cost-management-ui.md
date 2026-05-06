---
sidebar_position: 3
sidebar_label: Cost management UI
description: Use the account console Usage page for legacy charts, pricing settings, and CSV downloads; Consumption links to the pre-built dashboard import.
---

# Cost management UI

> **You'll use** the account console **Usage** page for legacy graphs, pricing, and downloads in ~15 min.
>
> **Prereqs:** [Account Console foundations](/docs/before-you-start/foundations/account-console)

## What you'll build

You read account-wide **DBU** and estimated **USD** usage, filter the legacy graph, tune per-**SKU** list-price estimates, and export CSVs from the account console without SQL.

Orientation under **Usage**:

- **Consumption** — Entry for **Setup dashboard** (pre-built Lakeview template). For full import steps, version choice, scope, workspace selection, and required **SELECT** grants, see [Import the pre-built usage dashboard](./cost-dashboard-aibi#import-the-pre-built-usage-dashboard).
- **Consumption (Legacy)** — **Usage graph (legacy)**, **Usage details**, pricing settings, and **Usage downloads (legacy)**. The steps below use this tab.
- **Budgets** — Account budgets. Use [Set up budget alerts](./budget-alerts).

## Prerequisites

- **Account admin** role. Only account admins can open **Usage** as described here.
- A Databricks account with at least one workspace that has generated usage.

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
    - [ ] **Use the cost management UI.**
    - [ ] Set up budget alerts.
    - [ ] Build a cost dashboard with AI/BI.

## Steps

### 1. Open the account console and Usage

1. Sign in to the account console: [AWS accounts console](https://accounts.cloud.databricks.com) or [Azure accounts portal](https://accounts.azuredatabricks.net).
2. Click the **Usage** icon in the left sidebar.

### 2. Read the legacy usage graph (Consumption (Legacy) tab)

1. Open the **Consumption (Legacy)** tab.
2. Pick a date range at the top (presets or custom range, in UTC).
3. Use the aggregation control for **Total usage**, **Workspace**, **SKUs**, or **Tags**.
4. Toggle **USD** / **DBU** at the top of the chart.

If there are more than ten workspaces, **SKUs**, or tag values, the chart shows the top nine series plus one **combined** line for the rest. For tags, usage without the selected tag rolls into a **(… tag absent)** line.

:::tip

Legacy graphs and CSV exports use **legacy** consumption logs. Databricks recommends **`system.billing.usage`** for the most accurate billing view. See [Usage dashboards](https://docs.databricks.com/aws/en/admin/account-settings/usage) and the [billable usage system table reference](https://docs.databricks.com/aws/en/admin/system-tables/billing).

:::

### 3. Filter the chart and review usage details

1. Click a line’s control in the legend or line picker to show or hide it.
2. Double-click to isolate one line; double-click again to restore all lines.
3. Open the **Usage details** panel. Read **DBU** or estimated **USD** in the table, aggregated by workspace and **SKU** groups. Match the date range to the graph. Search by workspace name when the list is long.

### 4. Align list prices for closer cost estimates

1. Stay on **Consumption (Legacy)**. Open the kebab menu in the upper-right of the **Usage** page.
2. Open **Pricing settings** and adjust cost-per-**DBU** per **SKU** to move estimates toward your contract.

Figures use **list price** estimates. Actual invoices include discounts, commits, and credits the UI does not model.

### 5. Download usage data

1. **Aggregated:** use the download control on the graph (up to 999 items per category; see **Usage downloads (legacy)** on [Usage dashboards](https://docs.databricks.com/aws/en/admin/account-settings/usage)).
2. **Unaggregated:** open the kebab menu, scroll to the bottom, pick a month range, optionally enable **Include usernames (email)**, then click **Download**.

## Verify

1. On **Consumption (Legacy)**, confirm the chart renders for your date range and **SKUs** aggregation shows multiple lines when your account uses several **SKUs**.
2. If you tagged resources in [Tag compute and jobs](./tag-compute-and-jobs), switch aggregation to **Tags** and confirm your custom keys appear.
3. On **Consumption**, confirm the **Pre-built usage dashboard** card and **Setup dashboard** appear if you need the import entry point.

## Troubleshoot

<details>
<summary>I only see “Setup dashboard” on Consumption—no graph</summary>

That is expected. Open **Consumption (Legacy)** for the account-wide graph, details, pricing, and downloads.

</details>

<details>
<summary>Legacy Usage page shows no data</summary>

New accounts may have no compute yet. Run a small workload, then wait about an hour for usage to appear.

</details>

<details>
<summary>You cannot access Usage</summary>

Only **account admins** see **Usage**. Ask an account admin to perform the review or grant you admin access if appropriate.

</details>

<details>
<summary>Cost estimate looks wrong versus your invoice</summary>

Defaults use **list prices**. Adjust per-**SKU** rates in the settings panel, or model spend in `system.billing.usage`.

</details>

<details>
<summary>Tag filter shows tag absent for most spend</summary>

Tags apply from the moment you add them. The tag-absent series is unattributed or historical untagged usage. Improve coverage by tagging resources early.

</details>

<details>
<summary>Downloaded CSV is missing workspaces</summary>

Downloads cap at 999 items per category. Use `system.billing.usage` for a full export when you hit that limit.

</details>

## Learn more

- [Usage dashboards](https://docs.databricks.com/aws/en/admin/account-settings/usage)
- [Cost management tools on Databricks](https://docs.databricks.com/aws/en/admin/usage)

## Next

- **Do next:** [Set up budget alerts](./budget-alerts) — or [Import the pre-built usage dashboard](./cost-dashboard-aibi#import-the-pre-built-usage-dashboard) first if you only need **Setup dashboard**.
- **Learn why:** [Tag compute and jobs](./tag-compute-and-jobs)
- **Reference:** [Usage dashboards](https://docs.databricks.com/aws/en/admin/account-settings/usage)
