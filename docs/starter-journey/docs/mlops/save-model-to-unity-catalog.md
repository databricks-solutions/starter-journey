---
sidebar_position: 2
sidebar_label: Save a Model to Unity Catalog
description: Train and register a model in Unity Catalog, and register existing models from a UC Volume or Hugging Face.
---

# Save a Model to Unity Catalog

> **You'll train** a model and register it in Unity Catalog, then register existing models from a UC Volume and from Hugging Face in ~20 min.
>
> **Prereqs:** [Prepare Datasets](/docs/mlops/prepare-datasets)

## What you'll build

A model registered to `<catalog>.<schema>.<model_name>` with the `challenger` alias — a candidate that downstream stages can promote without a code change. You register a freshly trained model, plus two models that already exist: one loaded from a UC Volume and one pulled from Hugging Face.

## Prerequisites

- A training set or DataFrame from [Prepare Datasets](/docs/mlops/prepare-datasets).
- `CREATE MODEL` on the target catalog and schema.
- A notebook on serverless or a cluster with MLflow 3 installed:

```python
%pip install --upgrade "mlflow[databricks]>=3.1"
dbutils.library.restartPython()
```

## Steps

### 1. Train and register a model

Each training attempt is a **run**. Inside a run, log the parameters and metrics, infer the input/output schema, then log and register the model in one call. The signature lets serving validate requests later.

```python
import mlflow
from mlflow.models import infer_signature
from sklearn.metrics import accuracy_score, f1_score

mlflow.set_registry_uri("databricks-uc")
full_model_name = "<catalog>.<schema>.<model_name>"

with mlflow.start_run() as run:
    mlflow.log_param("max_depth", 5)

    model.fit(X_train, y_train)
    preds = model.predict(X_test)

    mlflow.log_metric("test_accuracy", accuracy_score(y_test, preds))
    mlflow.log_metric("test_f1", f1_score(y_test, preds, average="weighted"))

    signature = infer_signature(X_train, model.predict(X_train))
    mlflow.sklearn.log_model(
        sk_model=model,
        name="model",
        signature=signature,
        registered_model_name=full_model_name,
    )
```

Use the `mlflow.<flavor>` matching your framework — `mlflow.sklearn`, `mlflow.pytorch`, `mlflow.xgboost`, and so on. Passing `registered_model_name` registers the model in the same call.

Tag the new version `challenger` so downstream jobs reference the alias, not a version number.

```python
from mlflow.tracking import MlflowClient

client = MlflowClient()
version = client.search_model_versions(
    f"name='{full_model_name}'", order_by=["version_number DESC"], max_results=1
)[0].version
client.set_registered_model_alias(full_model_name, "challenger", version)
```

Downstream batch inference loads this version by its `challenger` alias, so promotion never edits the inference code.

### 2. Bring pre-existing models into Databricks

You do not always train from scratch. Load a saved artifact from a Volume, then log and register it the same way. Swap `joblib.load` for `torch.load` or `keras.models.load_model` to match the framework.

```python
import joblib
import mlflow
from mlflow.models import infer_signature

model = joblib.load("/Volumes/<catalog>/<schema>/<volume>/model.pkl")

with mlflow.start_run(run_name="from_volume"):
    signature = infer_signature(X_test, model.predict(X_test))
    mlflow.sklearn.log_model(
        model,
        name="model",
        signature=signature,
        registered_model_name=full_model_name,
    )
```

### 3. Register a Hugging Face model

Wrap the model in a `transformers` pipeline and log it with the transformers flavor. The pipeline carries the tokenizer and config, so the registered model serves without extra setup.

```python
import mlflow
from transformers import pipeline

summarizer = pipeline("summarization", model="<hf_model_id>")

with mlflow.start_run(run_name="huggingface"):
    mlflow.transformers.log_model(
        transformers_model=summarizer,
        name="model",
        task="summarization",
        registered_model_name=full_model_name,
    )
```

## Verify

Open the experiment from the **Experiments** tab. Each training attempt appears as a run in the runs table, with its metrics, source, and logged models. Click a run name to open it.

![Experiment runs table for mlflow-classic-ml-e2e-mlflow-3 listing runs with duration, source, logged models, and metric columns such as best_rmse.](/img/mlops-run-details-list.png)

The run detail page confirms the model landed in Unity Catalog. The **Details** panel shows the run ID and source, and the **Registered models** row links to your UC model version (here `main.default.xgboosttuna v3`), with the logged **Metrics** and **Parameters** below.

![Run detail Overview page for industrious-duck-421 showing the Details panel with Run ID, Source, Logged models, and a Registered models link to a Unity Catalog model version, plus Metrics and Parameters panels.](/img/mlops-run-details-overview.png)

## Troubleshoot

<details>
<summary>`log_model` registers to the workspace registry, not Unity Catalog</summary>

Confirm `mlflow.set_registry_uri("databricks-uc")` ran in the session, and that the model name is fully qualified as `<catalog>.<schema>.<model_name>`.
</details>

<details>
<summary>Serving later rejects requests with a schema error</summary>

The logged signature did not match the real input. Re-log the model with `infer_signature` on representative training data.
</details>

## Next

- **Do next:** [Batch Inference](/docs/mlops/batch-inference)
- **Learn why:** [14. MLOps](/docs/mlops/)
- **Reference:** [Install MLflow 3](https://docs.databricks.com/aws/en/mlflow/mlflow-3-install), [Manage the model lifecycle](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle), [View training results with MLflow runs](https://docs.databricks.com/aws/en/mlflow/runs)
