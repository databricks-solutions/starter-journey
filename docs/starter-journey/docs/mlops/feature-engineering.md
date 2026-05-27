---
sidebar_position: 1
sidebar_label: Feature engineering
description: Create governed feature tables in Unity Catalog for offline training and online serving.
---

# Feature engineering

> **You'll** register reusable features in Unity Catalog so training and serving read the same definitions instead of re-deriving columns in every notebook.
>
> **Prereqs:** [14. MLOps](/docs/mlops/), [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)

## What you'll build

A **feature table** in Unity Catalog that stores precomputed feature values keyed by an entity (for example `customer_id` or `device_id`). Downstream training jobs and serving endpoints reference that table instead of copying feature SQL into each project.

## How it works

**Databricks Feature Store** (feature tables in Unity Catalog) is the central registry for ML features. Feature tables are first-class UC objects — discoverable, permissioned, and lineage-tracked like any other table.

- **Offline feature serving** — batch reads from feature tables when you build training datasets or run batch scoring jobs. Point-in-time joins keep labels aligned with feature values as they existed at training time.
- **Online feature serving** — low-latency lookups at inference time (for example through online tables or feature serving endpoints) so production requests get fresh feature values without re-running batch pipelines.

Define features once. Train with them. Serve with the same definitions. That removes training/serving skew when feature logic drifts between notebooks.

## Verify

Open **Catalog Explorer**, find your feature table under the target catalog and schema, and confirm the entity key column and feature columns match what your training notebook expects.

## Next

- **Do next:** [Model training](/docs/mlops/model-training)
- **Learn why:** [14. MLOps](/docs/mlops/)
- **Reference:** [Databricks Feature Store](https://docs.databricks.com/aws/en/machine-learning/feature-store/)
