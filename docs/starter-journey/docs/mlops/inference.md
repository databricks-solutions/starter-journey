---
sidebar_position: 4
sidebar_label: Inference
description: Run batch and streaming inference and monitor production traffic with AI Gateway inference tables.
---

# Inference

> **You'll** choose the right scoring pattern for your latency and throughput needs — batch jobs over Delta tables or Structured Streaming into Model Serving — and log production traffic for monitoring.
>
> **Prereqs:** [Model deployment](/docs/mlops/model-deployment)

## What you'll build

A defined **inference path** (batch or streaming) that writes scores to a Delta table or downstream system, plus optional **AI Gateway inference tables** that capture request/response payloads from your serving endpoint.

## How it works

### Batch inference

Score large volumes at rest:

1. Read input rows from a **Delta table** or other Unity Catalog table (often joined to offline features from the [Feature Store](/docs/mlops/feature-engineering)).
2. Run scoring in a **Lakeflow Job** — call the model with MLflow `pyfunc`, Spark UDF, or batch requests to the **Model Serving** endpoint.
3. Write predictions to an output Delta table for downstream analytics or reverse ETL.

Batch fits nightly refreshes, backfills, and workloads where minutes or hours of latency are acceptable.

### Streaming inference

Score data in motion when events must drive predictions within seconds:

1. Ingest with **Structured Streaming** (Kafka, Kinesis, Auto Loader, or another streaming source).
2. Apply transformations in Spark.
3. Call a **Model Serving endpoint** per micro-batch (or use built-in integration patterns documented for your source) and write results to a streaming sink (Delta table, another bus, etc.).

Streaming fits fraud detection, recommendation refreshes, and IoT pipelines where batch latency is too high.

### Monitor with AI Gateway inference tables

Enable **inference tables** on the serving endpoint (Unity AI Gateway). Databricks logs requests and responses to a Delta table in Unity Catalog. Use that table for drift checks, debugging bad predictions, and building retraining datasets — without building a separate logging pipeline.

:::warning
Do not rename, alter the schema of, or delete an inference table managed by the endpoint. Doing so can stop logging or corrupt the table.
:::

## Verify

- **Batch:** Query the output table and confirm row counts and prediction columns match the input batch.
- **Streaming:** Confirm the query is **Active** and output table row counts increase as events arrive.
- **Inference tables:** On the endpoint page, open the linked inference table and confirm recent requests appear after test traffic.

## Next

- **Do next:** [DABs for MLOps](/docs/mlops/dabs)
- **Learn why:** [Model deployment](/docs/mlops/model-deployment)
- **Reference:** [AI Gateway inference tables](https://docs.databricks.com/aws/en/ai-gateway/inference-tables), [Model Serving](https://docs.databricks.com/aws/en/machine-learning/model-serving)
