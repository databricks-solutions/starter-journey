---
sidebar_label: 9. Query and Explore
description: Run interactive SQL queries against your lakehouse data using the Databricks SQL Editor and serverless warehouses.
---

# 9. Query and explore

> **You'll learn** how to query and explore your lakehouse data using the Databricks SQL Editor in ~5 min.
>
> **Prereqs:** [Automation & Orchestration](/docs/orchestration/workspace)

## Why this matters

A pipeline that writes data is only half the story. Analysts and engineers need to query that data interactively — validate transformations, explore distributions, and answer ad-hoc questions. The Databricks SQL Editor paired with a serverless warehouse gives you a zero-infrastructure query environment that starts in seconds.

## Journey checklist

- [x] ~~Get started.~~
- [x] ~~Before you start.~~
- [x] ~~Infra setup.~~
- [x] ~~Cost monitoring.~~
- [x] ~~Data Governance Strategy.~~
- [x] ~~Access your data.~~
- [x] ~~Build the first pipeline.~~
- [x] ~~Automation and orchestration.~~
- [ ] **Query and explore.**
- [ ] Databricks AI/BI.
- [ ] Business semantics.

## How it works

Every workspace comes with a **Starter Serverless Warehouse** — a managed compute endpoint optimized for interactive SQL. Open the SQL Editor, write a query, and run it against any table your identity has access to through Unity Catalog grants.

:::tip
You can drag and drop tables from the schema browser directly into the editor. No need to type fully qualified names by hand.
:::

### Video walkthrough

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/0XWf1V40SdI"
></iframe>

## When to use / when not to

**Use the SQL Editor when:**

- You need to validate pipeline output or inspect table contents.
- You want to prototype a query before embedding it in a dashboard or notebook.
- You are running one-off exploratory analysis.

**Use notebooks instead when:**

- You need Python, Scala, or R alongside SQL.
- The analysis spans multiple steps that benefit from cell-by-cell execution.

## Common pitfalls

- **Running queries on a pro warehouse when serverless is available** — serverless warehouses start faster and scale automatically. Use them for interactive work unless your admin has configured a specific warehouse for your team.
- **Querying without schema context** — always select a catalog and schema in the editor's context bar. Without it, every query needs fully qualified three-part names (`catalog.schema.table`).

## Next

- **Do next:** [Databricks AI/BI](/docs/databricks-aibi)
- **Learn why:** [Automation & Orchestration](/docs/orchestration/workspace)
- **Reference:** [SQL Editor — Databricks docs](https://docs.databricks.com/aws/en/sql/user/sql-editor)
