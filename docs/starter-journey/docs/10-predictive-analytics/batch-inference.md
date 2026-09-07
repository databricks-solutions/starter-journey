---
sidebar_position: 2
sidebar_label: Batch Inference
description: Score data with a registered model using pandas single-node or distributed Spark UDFs.
---

# Batch Inference

> **You'll score** data with a registered model — using pandas for quick checks or Spark UDFs for production scale — in ~10 min.
>
> **Prereqs:** [Save a Model to Unity Catalog](/docs/10-predictive-analytics/save-model-to-unity-catalog)

## The big picture

A batch job that loads a model from Unity Catalog by alias, scores rows, and writes predictions to a Delta table.

## Prerequisites

- A model registered in Unity Catalog (see [Save a Model to Unity Catalog](/docs/10-predictive-analytics/save-model-to-unity-catalog)).
- Data available in a Delta table or DataFrame to run inference against.

## Inference methods

| Method | Best for | Reference |
|---|---|---|
| 🥇 [Spark UDF](#spark-udf) | Production-scale tabular data distributed across a cluster | [How to speed up inference](https://community.databricks.com/t5/machine-learning/how-to-speed-up-inference/td-p/135900) |
| [Pandas single-node](#pandas-single-node) | Small batches, quick validation, single-node notebooks | <ul><li>[Load model by alias](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/#load-model-version-by-alias-for-inference-workloads)</li><li>[Load model by version](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/#load-model-version-by-version-number-for-inference-workloads)</li></ul> |
| [Pandas UDF for images](#pandas-udf-for-images) | Computer vision workloads with images stored in object storage | [Distributed inference with pandas UDF](https://docs.databricks.com/aws/en/machine-learning/reference-solutions/images-etl-inference#perform-distributed-inference-using-pandas-udf) |

## Next

- **Do next:** [Datasets as Feature Tables](/docs/10-predictive-analytics/prepare-datasets)
- **Learn why:** [14. MLOps](/docs/10-predictive-analytics/)
- **Reference:** [Model lifecycle in Unity Catalog](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/), [How to speed up inference](https://community.databricks.com/t5/machine-learning/how-to-speed-up-inference/td-p/135900), [Image ETL and inference](https://docs.databricks.com/aws/en/machine-learning/reference-solutions/images-etl-inference)
