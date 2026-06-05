---
sidebar_position: 4
sidebar_label: Inference
description: Run batch and streaming inference and monitor production traffic with AI Gateway inference tables.
---

# Inference

> **You'll** choose the right scoring pattern for your latency and throughput needs — batch jobs over Delta tables or Structured Streaming into Model Serving — and log production traffic for monitoring.
>
> **Prereqs:** [Model deployment](/docs/mlops/model-deployment)

## What this stage does

The inference stage turns a deployed model into predictions — in bulk (batch) or as events arrive (streaming) — and optionally logs production traffic to **AI Gateway inference tables** for monitoring. The quickstart illustrates the batch path: scoring samples with the Champion model and writing results to a Delta table.

## How it works

### Batch inference

You have 10 million rows that need scores by 6 AM. Calling a serving endpoint one row at a time would take hours and generate unnecessary per-request overhead. The right path is to load the model directly and score in bulk.

The quickstart's `batch_inference.ipynb` loads the **Champion** model by alias, scores new samples, tags each row with the model version and a timestamp, and writes to the `iris_inferences` table:

```python
model = load_model(f"models:/{full_model_name}@champion")
predictions = model.predict(df_samples)
df_samples['prediction'] = predictions
df_samples['model_id'] = mlflow_client.get_model_version_by_alias(full_model_name, "champion").version
df_samples['prediction_timestamp'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

# Enable Change Data Feed so Lakehouse Monitoring can track only newly appended rows
spark.sql(f"ALTER TABLE {catalog}.{schema}.iris_inferences SET TBLPROPERTIES (delta.enableChangeDataFeed = true)")
```

Loading by the `@champion` alias means this job automatically picks up whatever model was last approved and promoted — promotion never requires editing the inference code. The `model_id` and `prediction_timestamp` columns plus Change Data Feed set the table up for drift monitoring later.

Each scored row keeps the input features alongside the `prediction`, the `model_id` that produced it, and a `prediction_timestamp`:

![Catalog Explorer Sample Data view of the iris_inferences table, showing the four iris feature columns with prediction, actual_label, prediction_timestamp, and model_id for each row.](/img/mlops-inference-table.png)

### Streaming inference

A fraud signal is only useful if it arrives before the transaction clears. A nightly batch job is too slow. Streaming inference scores data as it moves:

1. Ingest with **Structured Streaming** (Kafka, Kinesis, Auto Loader, or another streaming source).
2. Apply transformations in Spark.
3. Call a **Model Serving endpoint** per micro-batch and write results to a streaming sink (Delta table, another bus, etc.).

### Monitor with AI Gateway inference tables

Once a model is live, you lose visibility into what it is actually seeing and predicting. Bugs, drift, and bad inputs are invisible until users complain. Enable **inference tables** on the serving endpoint (Unity AI Gateway) and Databricks logs every request and response to a Delta table in Unity Catalog automatically. Use that table for drift checks, debugging bad predictions, and building retraining datasets — without writing a separate logging pipeline.

:::warning
Do not rename, alter the schema of, or delete an inference table managed by the endpoint. Doing so can stop logging or corrupt the table.
:::

## What to check

- **Batch:** the output table's row count and prediction columns match the scored input.
- **Streaming:** the query stays **Active** and the output row count grows as events arrive.
- **Inference tables:** recent requests appear in the linked table after test traffic.

## Next

- **Do next:** [14. MLOps overview](/docs/mlops/) — section complete for now
- **Learn why:** [Model deployment](/docs/mlops/model-deployment)
- **Reference:** [AI Gateway inference tables](https://docs.databricks.com/aws/en/ai-gateway/inference-tables), [Model Serving](https://docs.databricks.com/aws/en/machine-learning/model-serving), [batch_inference.ipynb](https://github.com/databricks-solutions/mlops-quickstart/blob/master/notebooks/3_inference/batch_inference.ipynb), [realtime_inference.ipynb](https://github.com/databricks-solutions/mlops-quickstart/blob/master/notebooks/3_inference/realtime_inference.ipynb)
