---
sidebar_position: 0
sidebar_label: 9. Databricks AI/BI
description: Build dashboards, Genie spaces, and applications to surface lakehouse data to business users.
---

# 10. Databricks AI/BI

> **You'll learn** how Databricks AI/BI turns lakehouse data into dashboards, natural-language analytics, and custom applications in ~5 min.
>
> **Prereqs:** [Query and explore](/docs/query-and-explore)

## Why this matters

Data sitting in tables is useful to engineers. Business users need dashboards, self-service Q&A, and purpose-built applications. Databricks AI/BI is the presentation layer of the lakehouse — it connects directly to Unity Catalog tables, respects row- and column-level security, and removes the need to export data to a separate BI tool.

## Journey checklist

- [x] ~~Get started.~~
- [x] ~~Before you start.~~
- [x] ~~Infra setup.~~
- [x] ~~Cost monitoring.~~
- [x] ~~Data Governance Strategy.~~
- [x] ~~Access your data.~~
- [x] ~~Build the first pipeline.~~
- [x] ~~Automation and orchestration.~~
- [x] ~~Query and explore.~~
- [ ] **Databricks AI/BI.**
- [ ] Business semantics.

## How it works

Databricks AI/BI has three components, each targeting a different audience:

| Component | Audience | Purpose |
|---|---|---|
| **Dashboards** | Analysts, stakeholders | Visual reports with charts, filters, and scheduled refreshes |
| **Genie Spaces** | Business users | Natural-language interface — ask questions about data in plain English |
| **Databricks Apps** | Developers | Custom web applications hosted on Databricks with built-in auth and data access |

All three read from the same governed tables. A dashboard, a Genie Space, and an app can point at the same gold-layer table — one source of truth, three consumption patterns.

## When to use / when not to

**Use Databricks AI/BI when:**

- You want a single platform for data engineering and data presentation.
- Governance (row/column security, lineage) must extend to the BI layer.
- Business users need self-service analytics without learning SQL.

**Use an external BI tool when:**

- Your organization has standardized on a third-party tool (Tableau, Power BI) and migration is not planned.
- You need features specific to that tool (e.g., Tableau's spatial visualizations).

## In this section

- **[Dashboards](/docs/databricks-aibi/dashboards)** — Create and share visual reports.
- **[Genie Spaces](/docs/databricks-aibi/genie-spaces)** — Let business users ask data questions in natural language.
- **[Databricks Apps](/docs/databricks-aibi/databricks-apps)** — Build and deploy custom web applications.

## Next

- **Do next:** [Dashboards](/docs/databricks-aibi/dashboards)
- **Learn why:** [Query and explore](/docs/query-and-explore)
- **Reference:** [Databricks AI/BI — Databricks docs](https://docs.databricks.com/aws/en/aibi/index.html)
