---
sidebar_position: 3
sidebar_label: Model deployment
description: Deploy Unity Catalog models to Model Serving endpoints and choose between endpoints and Databricks Apps.
---

# Model deployment

> **You'll** expose a registered Unity Catalog model through a **Model Serving** endpoint so applications and pipelines can call it over HTTPS with millisecond-scale latency.
>
> **Prereqs:** [Model training](/docs/mlops/model-training)

## What this stage does

The deployment stage promotes a vetted model to production and exposes it for scoring. In the quickstart, a gated deployment job promotes the **Challenger** to **Champion**, then creates a **Model Serving endpoint** backed by the Champion version.

## How it works

### The deployment job: evaluation → approval → deployment

A model that auto-deploys the moment it trains is a liability. A bad model reaches production with no human in the loop, and there is no audit trail of who approved what. The quickstart solves this with an **MLflow 3 Deployment Job** — three notebooks that run in sequence before any model serves traffic:

1. **Evaluation** (`1_model_evaluation.ipynb`) — compute metrics on the Challenger model and check them against thresholds.
2. **Approval** (`2_model_approval.ipynb`) — a human-in-the-loop gate. A model is only promoted if an approver signs off.
3. **Deployment** (`3_model_deployment.ipynb`) — promote the Challenger to **Champion** and create or update the serving endpoint.

![Databricks Deployment Job graph for the Iris Model Deployment Job dev run, showing three serverless tasks that ran in sequence and succeeded: evaluation, approval, and deployment.](/img/mlops-deployment-job.png)

### Promotion and serving endpoint

The deployment notebook promotes the approved version to **Champion** and then creates or updates a Model Serving endpoint pointing at it:

```python
# Promote the approved version to Champion
client.set_registered_model_alias(f'{model_name}', "Champion", model_version)

# Create or update the serving endpoint
w = WorkspaceClient()
served_entities = [ServedEntityInput(
    entity_name=model_name,
    entity_version=model_version,
    workload_size="Small",
    scale_to_zero_enabled=True,
)]
try:
    w.serving_endpoints.update_config(name=serving_endpoint_name, served_entities=served_entities)
except ResourceDoesNotExist:
    w.serving_endpoints.create(name=serving_endpoint_name, config=EndpointCoreConfigInput(served_entities=served_entities))
```

`scale_to_zero_enabled=True` means the endpoint costs nothing when idle. Because downstream jobs reference the **Champion** alias rather than a version number, rolling back is a single alias change — no redeploy of infrastructure, no code edit.

![Catalog Explorer page for iris_model: Version 2 tagged challenger, and Version 1 tagged champion with an approval tag and a linked active serving endpoint.](/img/mlops-model-champion-endpoint.png)

The serving endpoint reports **Ready** once the Champion version is live, with its invocations URL and active configuration:

![Model Serving endpoint page for main-esteban_castillo-iris_model-endpoint in Ready state, showing the invocations URL, AI Gateway options, and an active configuration serving Version 1 of iris_model on Small CPU compute at 100 percent traffic.](/img/mlops-serving-endpoint.png)

### When to use a serving endpoint vs a Databricks App

| Factor | Model Serving endpoint | Databricks App |
|---|---|---|
| **Best for** | A governed, low-latency scoring API | A custom UI or multi-step workflow with its own auth |
| **Auth** | PAT/OAuth to the serving API; UC governs the model | User OAuth to the app; app resources for data |
| **Cost** | Inference compute and throughput only | App tier plus backing SQL/Lakebase/serving resources |
| **Latency** | One hop to the model, tuned for scoring | Adds an app tier in front of the model |

Use a **serving endpoint** when callers need a governed scoring API. Use a **Databricks App** when you need a product-style interface, session state, or multiple services behind one URL — and you can still call a serving endpoint from inside the app.

## What to check

A deployed model shows up two ways: the model version carries the `champion` alias in **Catalog Explorer**, and its Model Serving endpoint reports **Ready** on the **Serving** page. A test request to the endpoint returns a valid prediction.

## Next

- **Do next:** [Inference](/docs/mlops/inference)
- **Learn why:** [Model training](/docs/mlops/model-training)
- **Reference:** [Model Serving](https://docs.databricks.com/aws/en/machine-learning/model-serving), [MLflow 3 deployment jobs](https://docs.databricks.com/aws/en/mlflow/deployment-job), [model deployment notebooks](https://github.com/databricks-solutions/mlops-quickstart/tree/master/notebooks/2_model_training_and_deployment/model_deployment)
