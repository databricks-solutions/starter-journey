---
sidebar_position: 2
sidebar_label: Model training
description: Track experiments with MLflow and register the winning model in Unity Catalog with the Challenger alias.
---

# Model training

> **You'll** log reproducible training runs with MLflow and register the winning model in Unity Catalog so deployment always points at a versioned, governed artifact.
>
> **Prereqs:** [Feature engineering](/docs/mlops/feature-engineering)

## What this stage does

The training stage logs every attempt to MLflow and registers the best one as a governed, versioned model. In the quickstart, this trains a `DecisionTreeClassifier` on the `iris_data` table, logs each run to an **MLflow experiment**, and registers the best run as `iris_model` with the **Challenger** alias — a candidate for production that has not yet been approved.

## How it works

### MLflow tracking

A model performed well last quarter. Now it's degrading and nobody can reproduce it — the notebook was overwritten, the hyperparameters were never recorded, and the training data has since been updated. MLflow experiments prevent this. Each training attempt becomes a **run** under an **experiment**: log hyperparameters, metrics, and artifacts (plots, model files, environment) as you train. Every run is permanent.

The quickstart's `model_training.ipynb` trains the model inside an MLflow run, logs four metrics, and logs the model with an inferred signature:

```python
with mlflow.start_run() as run:
    model = DecisionTreeClassifier()
    model.fit(X_train, y_train)
    mlflow.log_metric("test_accuracy", accuracy_score(y_test, model.predict(X_test)))
    mlflow.sklearn.log_model(sk_model=model, name='model', signature=signature)
```

The Experiments UI lists every run with its metrics, and you can open two runs to compare them side by side:

![MLflow Experiments UI for the iris_model_main experiment, listing training runs with created time, dataset, duration, source, and logged models.](/img/mlops-mlflow-runs.png)

![MLflow run comparison showing two runs side by side with their test_accuracy, test_f1, test_precision, and test_recall metrics.](/img/mlops-mlflow-run-metrics.png)

### Unity Catalog model registry

Without a registry, "the model in production" is a file path someone remembers. The quickstart searches the experiment for the run with the best `test_accuracy`, registers it into a UC **catalog.schema.model** name, and tags it with the **Challenger** alias:

```python
registered_model = mlflow.register_model(model_uri, full_model_name)
client.set_registered_model_alias(name=registered_model.name, alias="challenger", version=registered_model.version)
```

The **Challenger** alias is the key MLOps pattern here. A newly trained model is a *candidate* — it gets the Challenger alias, but it does not serve production traffic until it passes evaluation and approval (covered in [Model deployment](/docs/mlops/model-deployment)). The model that does serve production traffic carries the **Champion** alias. Permissions, lineage, and version history all follow Unity Catalog, and downstream jobs reference the alias — not a hardcoded version — so promotion never requires a code change.

![Unity Catalog registry page for iris_model showing two versions: Version 2 tagged with the challenger alias and Version 1 tagged with the champion alias.](/img/mlops-model-aliases.png)

### MLflow 3 Logged Models

Tracking and the registry capture what was trained. What they leave open is the handoff to production: who approves a Challenger, and how does it become Champion without someone running notebooks by hand? **MLflow 3** closes that gap. **Logged Models** give each model a persistent identity that follows it from the run that created it, through registry versions, to the endpoints that serve it, so a production prediction always traces back to its exact training run. **Deployment jobs** automate the evaluation and approval steps between training and serving — the pattern the next stage builds on.

## What to check

A correct training run leaves two artifacts: an MLflow experiment whose best run shows the expected metrics, and a registered model version in Unity Catalog with lineage back to that run. In the quickstart, that is `iris_model` carrying the `challenger` alias.

## Next

- **Do next:** [Model deployment](/docs/mlops/model-deployment)
- **Learn why:** [Feature engineering](/docs/mlops/feature-engineering)
- **Reference:** [MLflow on Databricks](https://docs.databricks.com/aws/en/mlflow), [Manage the model lifecycle](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle), [model_training.ipynb](https://github.com/databricks-solutions/mlops-quickstart/blob/master/notebooks/2_model_training_and_deployment/model_training.ipynb)
