---
sidebar_position: 5
sidebar_label: DABs for MLOps
description: Package training jobs, feature pipelines, registered models, and serving endpoints in a Declarative Automation Bundle.
---

# DABs for MLOps

> **You'll** define the ML lifecycle as code in a **Declarative Automation Bundle (DAB)** so features, training, registration, and serving deploy across dev, staging, and prod with the same `databricks bundle deploy` workflow as data pipelines.
>
> **Prereqs:** [Inference](/docs/mlops/inference), [13. CI/CD and DevOps](/docs/ci-cd-devops/)

## What you'll build

A bundle project (typically `databricks.yml` plus resource definitions) that version-controls ML resources alongside your notebooks or Python modules — not a one-off notebook deploy.

## How it works

A **Declarative Automation Bundle (DAB)** is YAML (and optional Python) that declares Databricks resources and targets per environment. One repository holds the source of truth; CI/CD (see [13. CI/CD and DevOps](/docs/ci-cd-devops/)) runs validate/deploy against each target workspace.

You already touched DABs in [Build the first pipeline — DABs](/docs/build-first-pipeline/dabs) and [Automation & orchestration — DABs](/docs/orchestration/dabs). This page applies the same mechanism to ML workflows.

### ML-relevant bundle resources

Typical resources in an MLOps bundle:

| Resource | Role in the lifecycle |
|---|---|
| **Jobs** | Training, batch inference, retraining triggers, evaluation |
| **Pipelines** | Feature engineering with Spark Declarative Pipelines / Lakeflow |
| **Registered models** | Unity Catalog model definitions tied to training outputs |
| **Serving endpoints** | Model Serving config bound to a registered model version |
| **Schemas / volumes** | Feature store tables, artifact locations, permissions via bundle settings |

`databricks bundle validate` catches config errors before deploy. `databricks bundle deploy -t <target>` promotes the same definitions to staging or production with variables for catalog, schema, and workspace-specific names.

:::tip
Keep catalog and schema names as bundle **variables** (`${var.catalog}`) so one repo deploys to dev and prod without editing resource files per environment.
:::

### CI/CD wiring

GitHub Actions (or your CI system) should run `bundle validate` on pull requests and `bundle deploy` on merge — permissions, secrets, and approval gates are covered in [13. CI/CD and DevOps](/docs/ci-cd-devops/). This page stays focused on *what* belongs in the bundle for ML.

## Verify

From your bundle root, run `databricks bundle validate`. Fix any reported errors, then `databricks bundle deploy -t dev` and confirm jobs, models, and endpoints appear in the target workspace with the expected names.

## Next

- **Do next:** [14. MLOps overview](/docs/mlops/) — section complete for now
- **Learn why:** [13. CI/CD and DevOps](/docs/ci-cd-devops/)
- **Reference:** [DABs overview](https://docs.databricks.com/aws/en/dev-tools/bundles/), [DABs supported resources](https://docs.databricks.com/aws/en/dev-tools/bundles/resources)
