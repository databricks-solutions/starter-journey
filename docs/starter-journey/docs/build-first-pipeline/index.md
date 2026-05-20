---
sidebar_label: 7. Build the first pipeline
description: Build your first Spark Declarative Pipeline on Databricks using Lakeflow for ingestion, transformation, and orchestration.
---

# 7. Build the first pipeline

> **You'll learn** how Lakeflow and Spark Declarative Pipelines work and build your first transformation pipeline in ~20 min.
>
> **Prereqs:** [Access your data](/docs/access-your-data)

## Why this matters

Data is connected, governance is in place, but raw data sitting in storage does not answer business questions. Pipelines transform raw ingested data into clean, reliable tables that analysts and dashboards can trust. Databricks uses Spark Declarative Pipelines (SDP) for this — you declare *what* you want the data to look like, and the engine handles *how* to get there incrementally.

## Journey checklist

- [x] ~~Get started.~~
- [x] ~~Before you start.~~
- [x] ~~Infra setup.~~
- [x] ~~Cost monitoring.~~
- [x] ~~Data Governance Strategy.~~
- [x] ~~Access your data.~~
- [ ] **Build the first pipeline.**
- [ ] Automation and orchestration.
- [ ] Query and explore.
- [ ] Databricks AI/BI.
- [ ] Business semantics.

## Data engineering on Databricks

Databricks data engineering is built on three pillars. Each handles a different stage of the data lifecycle.

| Pillar | Purpose | Where to learn more |
|---|---|---|
| **Lakeflow Connect** | Ingest data from external sources into UC tables | [Access your data — ingestion pipelines](/docs/access-your-data/managed-connectors/create-ingestion-pipeline/) |
| **Spark Declarative Pipelines** | Transform raw data through bronze, silver, and gold layers | This section |
| **Lakeflow Jobs** | Orchestrate pipelines, notebooks, and tasks on a schedule | [Automation and orchestration](/docs/orchestration/workspace) |

### Lakeflow introduction

<iframe width="560" height="315" src="https://www.youtube.com/embed/n8XWOr6zIPo"></iframe>

### Lakeflow in action

<iframe width="560" height="315" src="https://www.youtube.com/embed/alP9qqk5J64"></iframe>

## How it works — Spark Declarative Pipelines

SDP is the Databricks implementation of [Apache Spark Declarative Pipelines](https://spark.apache.org/docs/latest/declarative-pipelines-programming-guide.html). You write Python (PySpark) or SQL declarations, and the engine figures out the execution plan, dependency order, and incremental processing.

Key capabilities:

- **Multi-source processing** — stream from Kafka, batch-load from cloud storage, or query external databases in the same pipeline.
- **Built-in incremental processing** — SDP tracks changes and processes only new or modified data, reducing compute cost and runtime.
- **Declarative data quality** — define expectations (constraints and business rules) inline with transformations. Rows that fail expectations are quarantined or flagged automatically.
- **Unity Catalog integration** — every table, view, and pipeline is governed by UC.

## SDP reference material

Read these before writing your first pipeline:

- [Load data in pipelines](https://docs.databricks.com/aws/en/ldp/load) — includes [AutoLoader](https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/) for incremental ingestion from cloud object storage.
- [Transform data with pipelines](https://docs.databricks.com/aws/en/ldp/transform) — when to use views, materialized views, and streaming tables.
- [Manage data quality with expectations](https://docs.databricks.com/aws/en/ldp/expectations) — data quality constraints and business rules.
- **Python:** [Python language reference](https://docs.databricks.com/aws/en/ldp/developer/python-ref) | [Develop SDP with Python](https://docs.databricks.com/aws/en/ldp/developer/python-dev)
- **SQL:** [SQL language reference](https://docs.databricks.com/aws/en/ldp/developer/sql-ref) | [Develop SDP with SQL](https://docs.databricks.com/aws/en/ldp/developer/sql-dev)

## Create the first pipeline

Two paths to build your first pipeline — pick the one that matches your workflow:

- **[Workspace + Genie Code](/docs/build-first-pipeline/workspace-databricks-agent)** — Build a pipeline interactively using the Databricks Workspace and Genie Code.
- **[DABs](/docs/build-first-pipeline/dabs)** — Deploy a complete medallion pipeline as code using Databricks Asset Bundles.

## Next

- **Do next:** [Workspace + Genie Code](/docs/build-first-pipeline/workspace-databricks-agent)
- **Learn why:** [Data Governance Strategy](/docs/data-governance-strategy)
- **Reference:** [Spark Declarative Pipelines — Databricks docs](https://docs.databricks.com/aws/en/ldp/)
