---
sidebar_position: 3
sidebar_label: Datasets as Feature Tables
description: Install the Feature Store and Online Inference dbdemo to explore feature engineering with Unity Catalog, online tables, and Lakeflow Declarative Pipelines.
---

# Datasets as Feature Tables

> **You'll install** the **Feature Store and Online Inference** dbdemo and explore three notebooks that cover feature engineering from basics to production patterns in ~15 min.
>
> **Prereqs:** [14. MLOps](/docs/10-predictive-analytics/), [Unity Catalog foundations](/docs/02-before-you-start/foundations/unity-catalog)

## The big picture

A working Feature Store demo with three notebooks, sample travel data, and feature tables registered in Unity Catalog. The demo covers the full lifecycle from feature creation through online serving.

**Official source (Demo Center):** [Feature Store and Online Inference](https://www.databricks.com/resources/demos/tutorials/data-science-and-ai/feature-store-and-online-inference)

## Steps

### 1. Install the demo from the dbdemos library.

Run the following cells in a new Python notebook.

```python
%pip install dbdemos
```

```python
dbutils.library.restartPython()
```

```python
import dbdemos
dbdemos.install('feature-store', catalog='main', schema='dbdemos_fs_travel')
```

Swap `main` and `dbdemos_fs_travel` for any Unity Catalog catalog and schema where your user has **CREATE** privileges.

### 2. Explore the installed notebooks.

The demo installs three notebooks that build on each other:

| Notebook | What it covers |
|---|---|
| [`01_Feature_store_introduction`](https://notebooks.databricks.com/demos/feature-store/01_Feature_store_introduction.html) | Ingest data, create and register Feature Tables in Unity Catalog, use `FeatureLookup` to join features, train a model with the Feature Engineering Client. |
| [`02_Feature_store_advanced`](https://notebooks.databricks.com/demos/feature-store/02_Feature_store_advanced.html) | Point-in-time lookups to prevent data leakage, Online Tables for real-time serving, Feature Specs, Feature Serving endpoints. |
| [`03_Feature_store_pipeline`](https://notebooks.databricks.com/demos/feature-store/03_Feature_store_pipeline.html) | Build and manage feature tables declaratively using a Lakeflow Declarative Pipeline. |

:::tip
Feature engineering is a data engineering task — not an ML task. Notebook 03 shows the recommended approach: define feature tables as a **Lakeflow Declarative Pipeline** so they refresh automatically and stay governed in Unity Catalog. Start there before writing any model training code.
:::

## Watch the walkthrough

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/SXvVj_pSAXU"
  title="Feature Store and Online Inference walkthrough"
></iframe>

## Troubleshoot

<details>
<summary>`ModuleNotFoundError: dbdemos`</summary>

Run `%pip install dbdemos`, then `dbutils.library.restartPython()` before importing.

</details>

<details>
<summary>Permission denied writing catalog or schema</summary>

Pick a catalog and schema where your user can create tables, or ask a metastore admin to grant **CREATE**.

</details>

## Next

- **Do next:** [14. MLOps overview](/docs/10-predictive-analytics/)
- **Learn why:** [14. MLOps](/docs/10-predictive-analytics/)
- **Reference:** [Feature Store and Online Inference (Demo Center)](https://www.databricks.com/resources/demos/tutorials/data-science-and-ai/feature-store-and-online-inference), [Feature tables in Unity Catalog](https://docs.databricks.com/aws/en/machine-learning/feature-store/uc/feature-tables-uc)
