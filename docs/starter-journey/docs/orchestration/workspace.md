---
sidebar_label: Workspace
description: Create and configure Lakeflow Jobs using the Databricks Workspace.
---

# Workspace

> **You'll learn** how to create and schedule a Lakeflow Job using the Databricks Workspace in ~10 min.
>
> **Prereqs:** [Build the first pipeline](/docs/build-first-pipeline)

## Why this matters

The Workspace is the fastest path to a running job. You can define tasks, set dependencies, configure a schedule, and monitor execution — all without writing configuration files. This is the recommended starting point before moving to DABs for production deployments.

## How it works

The Databricks Workspace includes a Jobs page where you create workflows visually. You add tasks (notebooks, pipelines, SQL), define their execution order, set a schedule, and configure retry and notification settings.

### Video walkthrough

<iframe width="560" height="315" src="https://www.youtube.com/embed/zQ8YOrD_f8c"></iframe>

## When to use / when not to

**Use the Workspace when:**

- You are setting up your first job and want to see results quickly.
- You need to run an ad-hoc or one-off workflow.
- You want to prototype a task graph before defining it in code.

**Use DABs instead when:**

- The job needs to be version-controlled and deployed across environments.
- You want infrastructure (pipelines, schemas, compute) defined alongside the job.

## Next

- **Do next:** [Orchestration — DABs](/docs/orchestration/dabs)
- **Learn why:** [Build the first pipeline](/docs/build-first-pipeline)
- **Reference:** [Create and manage jobs — Databricks docs](https://docs.databricks.com/aws/en/jobs/create-run-jobs.html)
