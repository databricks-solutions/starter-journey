---
sidebar_position: 1
sidebar_label: Save a Model to Unity Catalog
description: Train and register a model in Unity Catalog, and register existing models from a UC Volume or Hugging Face.
---

# Save a Model to Unity Catalog

> **You'll register** a model in Unity Catalog in ~20 min — whether you train it fresh, load it from a Volume, or pull it from Hugging Face.
>
> **Prereqs:** [Prepare Datasets](/docs/mlops/prepare-datasets)

## What you'll build

A model registered to `<catalog>.<schema>.<model_name>` with the `challenger` alias — a candidate that downstream stages can promote without a code change.

## Prerequisites

- `CREATE MODEL` on the target catalog and schema.
- A notebook on serverless or a cluster with MLflow 3 installed:

```python
%pip install --upgrade "mlflow[databricks]>=3.1"
dbutils.library.restartPython()
```

## Options

Pick the path that matches where your model comes from. All three end with a model version registered in Unity Catalog.

### Option A — Train and register

Use the [MLflow 3 traditional ML workflow example notebook](https://docs.databricks.com/aws/en/mlflow/mlflow3-ml-workflow#example-notebook). Click **Copy link for import** to bring it into your workspace.

### Option B — Load from a UC Volume

**Upload model weights to a UC Volume** → **Load the weights in a notebook and register to UC**

```python
import joblib
import mlflow
from mlflow.models import infer_signature

mlflow.set_registry_uri("databricks-uc")
full_model_name = "<catalog>.<schema>.<model_name>"

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

Swap `joblib.load` for `torch.load` or `keras.models.load_model` to match your framework.

### Option C — Register from Hugging Face

Wrap the model in a `transformers` pipeline and log it with the transformers flavor. The pipeline carries the tokenizer and config, so the registered model serves without extra setup.

```python
import mlflow
from transformers import pipeline

mlflow.set_registry_uri("databricks-uc")
full_model_name = "<catalog>.<schema>.<model_name>"

summarizer = pipeline("summarization", model="<hf_model_id>")

with mlflow.start_run(run_name="huggingface"):
    mlflow.transformers.log_model(
        transformers_model=summarizer,
        name="model",
        task="summarization",
        registered_model_name=full_model_name,
    )
```

## Next

- **Do next:** [Batch Inference](/docs/mlops/batch-inference)
- **Learn why:** [14. MLOps](/docs/mlops/)
- **Reference:** [Install MLflow 3](https://docs.databricks.com/aws/en/mlflow/mlflow-3-install), [Manage the model lifecycle](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle), [View training results with MLflow runs](https://docs.databricks.com/aws/en/mlflow/runs)
