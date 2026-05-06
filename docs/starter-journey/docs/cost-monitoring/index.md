---
sidebar_position: 0
sidebar_label: Cost monitoring
description: Attribute spend with tags, enable billing system tables, use the account console, set budgets, and build cost dashboards.
---

# Cost monitoring

> **You'll set up** cost visibility and alerts across your account in under an hour of admin time, spread across the topics below.
>
> **Prereqs:** [Infra setup](/docs/infra-setup), [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)

## Why this matters

When organizations first adopt Databricks, spend can grow quickly, often before anyone sees what is driving the bill. Early cost monitoring prevents surprise invoices at month-end and the inability to answer who spent what and why once leadership asks.

Databricks records every unit of consumption automatically. Your work is enabling the data, labeling it with tags, and pointing a dashboard or alert at it. Doing that right after foundational setup pays off from day one.

This section walks five topics in order: tag resources so costs can be attributed, turn on system billing tables for raw data, use the built-in account console for quick answers, configure budget alerts for proactive email, then build a custom dashboard for ongoing team-level monitoring.

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
    - [ ] [Tag compute and jobs](/docs/cost-monitoring/tag-compute-and-jobs)
    - [ ] [Enable system billing usage](/docs/cost-monitoring/system-billing-usage)
    - [ ] [Use the cost management UI](/docs/cost-monitoring/cost-management-ui)
    - [ ] [Set up budget alerts](/docs/cost-monitoring/budget-alerts)
    - [ ] [Build a cost dashboard with AI/BI](/docs/cost-monitoring/cost-dashboard-aibi)

## What you'll set up

Work through these pages in order. Tagging is forward-only, so start there. System tables gate SQL alerts and custom dashboards. The account console works without SQL, but understanding billing tables helps you read the UI.

- **[Tag compute and jobs](/docs/cost-monitoring/tag-compute-and-jobs)** — Add custom tags to clusters, warehouses, pools, and serverless policies so usage rolls up by team, project, or cost center.
- **[Enable system billing usage](/docs/cost-monitoring/system-billing-usage)** — Turn on the `system.billing` schema and query `system.billing.usage` with list prices for DBU and dollar estimates.
- **[Use the cost management UI](/docs/cost-monitoring/cost-management-ui)** — Read the legacy usage chart, align list prices to your contract, and download usage CSVs. The **Consumption** tab is the entry point for the pre-built dashboard in [Build a cost dashboard with AI/BI](/docs/cost-monitoring/cost-dashboard-aibi#import-the-pre-built-usage-dashboard).
- **[Set up budget alerts](/docs/cost-monitoring/budget-alerts)** — Create monthly budgets with email thresholds scoped by workspace or tag, plus optional SQL alerts for custom rules.
- **[Build a cost dashboard with AI/BI](/docs/cost-monitoring/cost-dashboard-aibi#import-the-pre-built-usage-dashboard)** — Import the pre-built usage dashboard from the account console, or author a Lakeview dashboard on billing tables.

## Next

- **Do next:** [Tag compute and jobs](/docs/cost-monitoring/tag-compute-and-jobs)
- **Learn why:** [Account Console foundations](/docs/before-you-start/foundations/account-console)
- **Reference:** [Cost management tools on Databricks](https://docs.databricks.com/aws/en/admin/usage)
