---
sidebar_position: 3
sidebar_label: Model deployment
description: Deploy Unity Catalog models to Model Serving endpoints and choose between endpoints and Databricks Apps.
---

# Model deployment

> **You'll** expose a registered Unity Catalog model through a **Model Serving** endpoint so applications and pipelines can call it over HTTPS with millisecond-scale latency.
>
> **Prereqs:** [Model training](/docs/mlops/model-training)

## What you'll build

A **Model Serving endpoint** backed by a specific **model version** from Unity Catalog, in **Ready** state and accepting inference requests.

## How it works

### Model Serving endpoints

From **Serving** in the workspace (or the REST API / a DAB resource), create an endpoint, pick the registered model and version, and choose compute (serverless or provisioned throughput depending on workload). Databricks routes requests, scales compute, and can attach **AI Gateway** policies and **inference tables** for monitoring (covered in [Inference](/docs/mlops/inference)).

### When to use a serving endpoint vs a Databricks App

| Factor | Model Serving endpoint | Databricks App |
|---|---|---|
| **Primary use** | Low-latency model inference API | Custom UI or multi-step app with auth |
| **Auth** | PAT/OAuth to the serving API; UC governs the model | User OAuth to the app; app resources for data |
| **Cost** | Pay for inference compute and throughput | Pay for app + backing SQL/Lakebase/serving resources |
| **Latency** | Optimized for scoring; typically single-digit to low tens of ms overhead | Adds app tier; better when you need a browser UI or orchestration beyond one model call |

Use a **serving endpoint** when callers need a governed scoring API. Use a **Databricks App** when you need a product-style interface, session state, or multiple services behind one URL — and you can still call a serving endpoint from inside the app.

## Verify

Open **Serving**, select your endpoint, and confirm status is **Ready**. Send a test request from the endpoint UI or with `curl`/the Python client and confirm a valid prediction response.

## Next

- **Do next:** [Inference](/docs/mlops/inference)
- **Learn why:** [Model training](/docs/mlops/model-training)
- **Reference:** [Model Serving](https://docs.databricks.com/aws/en/machine-learning/model-serving)
