---
sidebar_position: 0
sidebar_label: 4. Cost monitoring
description: Day-zero cost visibility after infra setup—import usage dashboards, optional dbdemos dashboards, tags, and budgets.
---

# 4. Cost monitoring

> **You'll complete** a short **day-zero** cost path right after infra: see spend in the account console, optionally add dashboards in a workspace, tag workloads, and set budgets.
>
> **Prereqs:** [Infra setup](/docs/infra-setup)

## Why this matters

Organizations that wait on cost monitoring inherit two predictable problems: **surprise invoices** when usage scales before anyone is watching, and **no credible story** when finance asks who drove which spend. Day-zero monitoring fixes that by making consumption visible **while** you still have a small number of workspaces and owners. You align expectations before teams multiply, pipelines land in production, and tags become painful to retrofit.

## Mental model (system tables)

**System tables** are the read-only billing and operations tables in the **`system`** catalog (for example **`system.billing.usage`** and **`system.billing.list_prices`**). Imported dashboards and SQL you write later both read from them. You do not need to master the schema on day zero; you need to know they are the **source of truth** for consumption and list-price dollars.

For depth, use the official references:

- [System tables reference](https://docs.databricks.com/aws/en/admin/system-tables/)
- [Billable usage system table reference](https://docs.databricks.com/aws/en/admin/system-tables/billing)
- [Monitor costs using system tables](https://docs.databricks.com/aws/en/admin/usage/system-tables)
- [Top 10 queries to use with System Tables](https://community.databricks.com/t5/technical-blog/top-10-queries-to-use-with-system-tables/bc-p/89393) (community walkthrough)

## Journey checklist

- [x] ~~Get started.~~
- [x] ~~Before you start.~~
- [x] ~~Infra setup.~~
- [ ] **Cost monitoring (day zero)**
    - [ ] [Import usage dashboard](/docs/cost-monitoring/import-usage-dashboard)
    - [ ] [Additional dashboards](/docs/cost-monitoring/additional-dashboards)
    - [ ] [Tags and attribution](/docs/cost-monitoring/tag-compute-and-jobs)
    - [ ] [Budget alerts](/docs/cost-monitoring/budget-alerts)
- [ ] [Data governance strategy](/docs/data-governance-strategy)
- [ ] [Access your data](/docs/access-your-data)
- [ ] [Build the first pipeline](/docs/build-first-pipeline)
- [ ] [Automation & orchestration](/docs/orchestration/workspace)
- [ ] [Query and explore](/docs/query-and-explore)
- [ ] [Databricks AI/BI](/docs/databricks-aibi/dashboards)
- [ ] [Business semantics](/docs/business-semantics)

## Recommended order

| Step | Topic | Why this slot |
|------|-------|----------------|
| 1 | [Import usage dashboard](/docs/cost-monitoring/import-usage-dashboard) | Fast visibility from the account console—no SQL. |
| 2 | [Additional dashboards](/docs/cost-monitoring/additional-dashboards) | Optional packaged dashboards on your catalog and schema. |
| 3 | [Tags and attribution](/docs/cost-monitoring/tag-compute-and-jobs) | Forward-only labels for team and project rollups. |
| 4 | [Budget alerts](/docs/cost-monitoring/budget-alerts) | Account-level monthly monitors with email. |

## Next

- **Do next:** [Import usage dashboard](/docs/cost-monitoring/import-usage-dashboard)
- **Learn why:** [Account Console foundations](/docs/before-you-start/foundations/account-console)
- **Reference:** [Cost management tools on Databricks](https://docs.databricks.com/aws/en/admin/usage)
