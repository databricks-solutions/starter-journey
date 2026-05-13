---
sidebar_label: Automation & Orchestration
description: Orchestrate end-to-end Databricks projects using Lakeflow Jobs for scheduling, dependencies, retries, and notifications.
---

# Automation & Orchestration

> **You'll learn** how Lakeflow Jobs orchestrate pipelines, notebooks, and tasks into scheduled workflows in ~10 min.
>
> **Prereqs:** [Build the first pipeline](/docs/build-first-pipeline)

## Why this matters

A pipeline that only runs when someone clicks "Run" is not production-ready. Lakeflow Jobs handle the scheduling, task dependencies, retries, and failure notifications that turn a manual process into an automated workflow. Without orchestration, teams rely on ad-hoc execution that drifts, breaks silently, and produces stale data.

## Journey checklist

- [x] ~~Get started.~~
- [x] ~~Before you start.~~
- [x] ~~Infra setup.~~
- [x] ~~Cost monitoring.~~
- [x] ~~Data Governance Strategy.~~
- [x] ~~Access your data.~~
- [x] ~~Build the first pipeline.~~
- [ ] **Automation and orchestration.**
- [ ] Query and explore.
- [ ] Databricks AI/BI.
- [ ] Business semantics.

## How it works

Every aspect of your data + AI project that involves execution should be set up as one or more [Lakeflow Jobs](https://docs.databricks.com/aws/en/jobs):

- **Orchestration** — define which tasks run and in what order.
- **Task dependencies (DAGs)** — chain tasks so downstream steps only execute after upstream tasks succeed.
- **Scheduling and triggers** — run jobs on a cron schedule, on file arrival, or via API trigger.
- **Retries and notifications** — configure automatic retries on failure and alerts (email, Slack, PagerDuty) on success or failure.

A single job can combine notebook tasks, pipeline tasks, SQL tasks, and dbt tasks into one execution graph.

## Create the first job

Two paths — pick the one that matches your workflow:

- **[UI](/docs/orchestration/ui)** — Create and configure a job interactively in the Databricks workspace.
- **[DABs](/docs/orchestration/dabs)** — Define jobs as code using Databricks Asset Bundles for repeatable deployments.

## Next

- **Do next:** [Orchestration — UI](/docs/orchestration/ui)
- **Learn why:** [Build the first pipeline](/docs/build-first-pipeline)
- **Reference:** [Lakeflow Jobs — Databricks docs](https://docs.databricks.com/aws/en/jobs)
