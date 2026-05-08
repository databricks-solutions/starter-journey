---
sidebar_position: 0
sidebar_label: Cost monitoring
description: Import dashboards, enable billing system tables, attribute usage with tags, set budgets and SQL alerts, and enforce compute policies.
---

# Cost monitoring

> **You'll stand up** cost observability, attribution, alerts, and guardrails across seven ordered topics — roughly **see → understand → control**.
>
> **Prereqs:** [Infra setup](/docs/infra-setup), [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)

## Why this matters

Spend often ramps before teams agree how to read it. Databricks already records **DBUs**; your job is surfacing that signal fast, explaining what feeds charts, tagging workloads, then layering proactive alerts and creation-time limits.

Expect **under an hour** of focused admin work spread across the steps below when schemas are already present.

This section follows the Starter Journey dossier **v3**: dashboards first (**show**), system tables next (**explain**), attribution and budgets (**monitor**), SQL alerts (**custom signals**), compute policies (**prevent**).

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
    - [ ] [Import usage dashboard](/docs/cost-monitoring/import-usage-dashboard)
    - [ ] [Demo dashboards (dbdemos)](/docs/cost-monitoring/system-tables-demo-dashboards)
    - [ ] [System tables](/docs/cost-monitoring/system-billing-usage)
    - [ ] [Tags and attribution](/docs/cost-monitoring/tag-compute-and-jobs)
    - [ ] [Budget alerts](/docs/cost-monitoring/budget-alerts)
    - [ ] [SQL cost alerts](/docs/cost-monitoring/sql-cost-alerts)
    - [ ] [Compute policies](/docs/cost-monitoring/compute-policies-cost)

## Recommended order

| Step | Topic | Why this slot |
|------|-------|----------------|
| 1 | [Import usage dashboard](/docs/cost-monitoring/import-usage-dashboard) | Fastest zero-code visibility from the account console. |
| 2 | [Demo dashboards (dbdemos)](/docs/cost-monitoring/system-tables-demo-dashboards) | Specialized forecasts and attribution packs on real data. |
| 3 | [System tables](/docs/cost-monitoring/system-billing-usage) | Understand **`system.billing`** once you have seen it in dashboards. |
| 4 | [Tags and attribution](/docs/cost-monitoring/tag-compute-and-jobs) | Forward-looking attribution for classic and serverless compute. |
| 5 | [Budget alerts](/docs/cost-monitoring/budget-alerts) | Account-wide monthly monitors with email. |
| 6 | [SQL cost alerts](/docs/cost-monitoring/sql-cost-alerts) | Workspace schedules with Slack/email/webhooks for nuanced rules. |
| 7 | [Compute policies](/docs/cost-monitoring/compute-policies-cost) | Block oversized clusters and enforce tags at creation time. |

## Next

- **Do next:** [Import usage dashboard](/docs/cost-monitoring/import-usage-dashboard)
- **Learn why:** [Account Console foundations](/docs/before-you-start/foundations/account-console)
- **Reference:** [Cost management tools on Databricks](https://docs.databricks.com/aws/en/admin/usage)
