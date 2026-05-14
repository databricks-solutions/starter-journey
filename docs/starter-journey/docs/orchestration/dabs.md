---
sidebar_label: DABs
description: Define and deploy Lakeflow Jobs as code using Databricks Asset Bundles for repeatable, version-controlled orchestration.
---

# DABs

> **You'll learn** how to define a Lakeflow Job using Databricks Asset Bundles (DABs) for repeatable, code-first orchestration in ~10 min.
>
> **Prereqs:** [Automation & Orchestration — Workspace](/docs/orchestration/workspace)

## Why this matters

Jobs created through the UI are quick to set up, but they don't travel well across environments. DABs define jobs, pipelines, schemas, volumes, and compute in YAML files that live in version control. One `databricks bundle deploy` command provisions everything — the same way, every time, in dev, staging, or prod.

## How it works

A DABs project includes a `databricks.yml` file that declares all the Databricks resources the project needs. For orchestration, this means defining a job with tasks, dependencies, and a schedule alongside the pipeline and storage resources it operates on.

### Example: medallion pipeline with DABs

The [medallion-pipeline-dabs](https://github.com/ivancalvo-dbxs/medallion-pipeline-dabs) repository is a ready-to-deploy example that provisions:

| Resource | Details |
|---|---|
| 1 job | 2 tasks — Task 1: notebook (generate fake data), Task 2: pipeline (run after Task 1 completes) |
| 1 pipeline | Spark Declarative Pipeline for the medallion architecture |
| 3 schemas | `bronze`, `silver`, `gold` |
| 1 volume | Landing zone for raw files |
| 1 SQL warehouse | For downstream queries |

For the full list of resource types DABs can manage, see [DABs supported resources](https://docs.databricks.com/aws/en/dev-tools/bundles/resources).

### Video walkthrough

<iframe width="560" height="315" src="https://www.youtube.com/embed/W8ucHwzwdhc"></iframe>

## When to use / when not to

**Use DABs when:**

- You need the same job deployed across multiple environments (dev, staging, prod).
- The job definition should be code-reviewed and version-controlled.
- You want to co-locate infrastructure (schemas, volumes, compute) with orchestration logic.

**Use the UI instead when:**

- You are prototyping a new workflow and iterating quickly.
- The job is a one-off execution that doesn't need to be reproduced.

## Common pitfalls

- **Forgetting to run `databricks bundle validate`** before deploy. Syntax errors in `databricks.yml` fail at deploy time with cryptic messages. Validate first.
- **Hardcoding catalog or schema names** — use DABs variable substitution (`${var.catalog}`) so the same bundle works across environments.
- **Not setting task dependencies** — without explicit `depends_on`, tasks run in parallel. If Task 2 reads data written by Task 1, define the dependency or you get empty results.

## Next

- **Learn why:** [Automation & Orchestration — Workspace](/docs/orchestration/workspace)
- **Reference:** [Databricks Asset Bundles — Databricks docs](https://docs.databricks.com/aws/en/dev-tools/bundles/index.html)
