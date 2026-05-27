---
sidebar_position: 2
sidebar_label: Model training
description: Track experiments with MLflow, register models in Unity Catalog, and use AutoML for tabular baselines.
---

# Model training

> **You'll** log reproducible training runs with MLflow and register the winning model in Unity Catalog so deployment always points at a versioned, governed artifact.
>
> **Prereqs:** [Feature engineering](/docs/mlops/feature-engineering)

## What you'll build

An **MLflow experiment** with one or more **runs** (parameters, metrics, artifacts) and a **registered model** in the Unity Catalog model registry linked to the run that produced it.

## How it works

### MLflow tracking

Each training attempt is a **run** under an **experiment**. Log hyperparameters, metrics, and artifacts (plots, model files, conda env) as you train. Compare runs in the MLflow UI or API and promote the best run to the registry.

### Unity Catalog model registry

Register the model with `mlflow.register_model` (or the UI) into a UC **catalog.schema.model** name. Permissions, lineage, and stage transitions (for example Staging → Production) follow Unity Catalog. Serving endpoints and batch jobs reference a specific **model version**, not a path on DBFS.

### AutoML for tabular baselines

For structured/tabular problems, **AutoML** trains and compares multiple algorithms, logs everything to MLflow, and registers the top model — a fast baseline before you invest in custom training code.

## Verify

In **Experiments**, open your experiment and confirm the best run shows the expected metrics. In **Catalog Explorer**, open the registered model and confirm at least one **version** exists with lineage back to the source run.

## Next

- **Do next:** [Model deployment](/docs/mlops/model-deployment)
- **Learn why:** [Feature engineering](/docs/mlops/feature-engineering)
- **Reference:** [MLflow on Databricks](https://docs.databricks.com/aws/en/mlflow), [Manage the model lifecycle](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle)
