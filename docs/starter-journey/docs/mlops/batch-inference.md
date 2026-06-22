---
sidebar_position: 2
sidebar_label: Batch Inference
description: Score data with the challenger model in pandas and Spark batch jobs, and run large-scale tracked inference.
---

# Batch Inference

> **You'll score** data with the `challenger` model — in pandas and Spark batch jobs — and run large-scale inference as a tracked job in ~15 min.
>
> **Prereqs:** [Save a Model to Unity Catalog](/docs/mlops/save-model-to-unity-catalog)

## What you'll build

A batch job that loads the `challenger` model, scores rows, and writes predictions to a Delta table. You run it single-node with pandas for small batches and distributed with a Spark UDF for production-scale data.

## Prerequisites

- A registered model with the `challenger` alias from [Save a Model to Unity Catalog](/docs/mlops/save-model-to-unity-catalog).
- A notebook on serverless or a cluster with `mlflow` installed.
- A table or DataFrame of rows to score.

## Steps

### 1. Load the model by alias

Load `challenger` by alias, not by version. The job automatically picks up whatever model was last registered — promotion never edits the inference code.

```python
import mlflow

full_model_name = "<catalog>.<schema>.<model_name>"
model = mlflow.pyfunc.load_model(f"models:/{full_model_name}@challenger")
```

To reproduce a past result, pin a specific version instead.

```python
model = mlflow.pyfunc.load_model(f"models:/{full_model_name}/<version>")
```

### 2. Pandas batch inference

For small batches and quick checks, predict on a single node with pandas. Add columns that let you trace and monitor each prediction.

```python
from datetime import datetime
from mlflow.tracking import MlflowClient

df_samples["prediction"] = model.predict(df_samples)
df_samples["model_id"] = MlflowClient().get_model_version_by_alias(
    full_model_name, "challenger"
).version
df_samples["prediction_timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

output_table = "<catalog>.<schema>.<inferences_table>"
spark.createDataFrame(df_samples).write.mode("append").saveAsTable(output_table)
```

![Sample data view of an inferences table, showing feature columns with prediction, prediction_timestamp, and model_id for each row.](/img/mlops-inference-table.png)

### 3. Spark batch inference

For millions of rows or production pipelines, distribute the scoring across the cluster with a Spark UDF instead of pandas. Spark runs the model in parallel on every partition, which is the main lever for speeding up large batch jobs.

```python
predict_udf = mlflow.pyfunc.spark_udf(spark, model_uri=f"models:/{full_model_name}@challenger")
predictions = features_df.withColumn("prediction", predict_udf(*features_df.columns))
predictions.write.mode("append").saveAsTable(output_table)
```

Use the Spark UDF for large Delta-scale inputs; use single-node pandas for small batches and quick checks.

### 4. Run large-scale inference as a tracked job

For heavy workloads like image or document scoring, run inference as a job that reads from a source table, scores in Spark, and writes predictions back to Delta. Wrap the run in an MLflow run so the inputs, model version, and row counts are logged and reproducible.

```python
with mlflow.start_run(run_name="batch_inference"):
    mlflow.log_param("model_uri", f"models:/{full_model_name}@challenger")
    mlflow.log_metric("rows_scored", predictions.count())
    predictions.write.mode("append").saveAsTable(output_table)
```

The [image ETL and inference reference solution](https://docs.databricks.com/aws/en/machine-learning/reference-solutions/images-etl-inference) shows this end to end: ingest, transform, score in Spark, and persist.

## Verify

- **Pandas:** the output table's row count and prediction columns match the scored input.
- **Spark:** the distributed write appends the expected number of rows, and `prediction` is populated.
- **Tracked job:** the run appears in the experiment with the model URI and `rows_scored` logged.

## Troubleshoot

<details>
<summary>`load_model` cannot resolve the alias</summary>

Confirm the `challenger` alias exists on the model in Catalog Explorer and the model name is fully qualified as `<catalog>.<schema>.<model_name>`.
</details>

<details>
<summary>The Spark UDF run produces no predictions</summary>

Confirm the input column order and names match the model signature. `spark_udf` maps columns positionally — reorder `features_df` to match the training schema.
</details>

## Next

- **Do next:** [Prepare Datasets](/docs/mlops/prepare-datasets)
- **Learn why:** [14. MLOps](/docs/mlops/)
- **Reference:** [Load a model version by alias](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/#load-model-version-by-alias-for-inference-workloads), [How to speed up inference](https://community.databricks.com/t5/machine-learning/how-to-speed-up-inference/td-p/135900), [Image ETL and inference](https://docs.databricks.com/aws/en/machine-learning/reference-solutions/images-etl-inference)
