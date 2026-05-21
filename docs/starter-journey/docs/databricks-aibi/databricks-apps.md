---
sidebar_label: Databricks Apps
description: Build and deploy custom web applications on Databricks with built-in authentication and direct data access.
---

# Databricks Apps

> **You'll learn** how Databricks Apps let you build custom web applications that run on Databricks with native auth and data access in ~5 min.
>
> **Prereqs:** [Query and explore](/docs/query-and-explore)

## Why this matters

Dashboards and Genie Spaces cover standard reporting and ad-hoc queries. Some use cases need a fully custom UI — an approval workflow, a data quality monitor, a customer-facing portal. Databricks Apps lets you deploy web applications (Streamlit, Dash, Gradio, or any framework) that run inside the Databricks environment with built-in authentication and direct access to Unity Catalog tables.

## How it works

A Databricks App is a containerized web application deployed to a Databricks-managed endpoint. The app inherits the deployer's service principal credentials, so it can read and write tables without managing separate connection strings. Users authenticate through the workspace SSO — no extra login flow required.

Apps are defined by an `app.yaml` configuration file and deployed via the Databricks CLI or UI.

:::tip
The [Databricks Apps Cookbook](https://apps-cookbook.dev/) has ready-to-deploy examples covering Streamlit, Dash, Gradio, and React patterns.
:::

## When to use / when not to

**Use Databricks Apps when:**

- You need a custom UI that goes beyond charts and tables (forms, workflows, interactive tools).
- The app needs direct, governed access to lakehouse data without ETL to an external database.
- You want single sign-on through the workspace — no separate auth infrastructure.

**Use dashboards or Genie Spaces instead when:**

- The use case is standard reporting or ad-hoc questions.
- No custom interactivity is required.

## Common pitfalls

- **Building an app when a dashboard would suffice** — apps require development and maintenance. If the use case is "show charts with filters," a dashboard is faster and cheaper.
- **Not using a service principal** — apps should run under a service principal with the minimum grants needed. Running under a personal identity creates a single point of failure when that person leaves or rotates credentials.

## Next

- **Learn why:** [Query and explore](/docs/query-and-explore)
- **Reference:** [Databricks Apps — Databricks docs](https://docs.databricks.com/aws/en/apps/index.html)
- **Resource:** [Databricks Apps Cookbook](https://apps-cookbook.dev/)
