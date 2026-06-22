---
sidebar_position: 3
sidebar_label: Prepare Datasets
description: Create a governed feature table in Unity Catalog, reference it from a training set, and set up an MLflow experiment.
---

# Prepare Datasets

> **You'll create** a governed feature table in Unity Catalog, reference it from a training set, and set up an MLflow experiment in ~15 min.
>
> **Prereqs:** [14. MLOps](/docs/mlops/), [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)

## What you'll build

A feature table at `<catalog>.<schema>.<feature_table>` with a primary key on its entity column, a training set that joins those features by key, and an MLflow experiment to hold the runs you log during training. Training and serving both read from the one feature table, so the feature logic never diverges between them.

## Prerequisites

- A Unity Catalog catalog and schema where you have `CREATE TABLE`.
- A notebook on serverless or a cluster with `databricks-feature-engineering` and `mlflow` available.
- A source dataset you can load into a Spark or pandas DataFrame.

## Steps

### 1. Create a feature table in Unity Catalog

Compute the columns your model needs into a DataFrame with an entity column that uniquely identifies each row. Then create the feature table in one governed call with the Feature Engineering client — it sets the primary key and records feature metadata for you.

```python
import pandas as pd
from databricks.feature_engineering import FeatureEngineeringClient

# Replace with your own feature logic
df = pd.DataFrame({
    "feature_1": [...],
    "feature_2": [...],
    "label": [...],
})
df["id"] = range(1, len(df) + 1)
spark_df = spark.createDataFrame(df)

catalog, schema, table = "<catalog>", "<schema>", "<feature_table>"
full_name = f"{catalog}.{schema}.{table}"

fe = FeatureEngineeringClient()
fe.create_table(
    name=full_name,
    primary_keys=["id"],
    df=spark_df,
    description="<what these features represent>",
)
```

Recompute features on a schedule and write them back with `fe.write_table`. Use `mode="merge"` to update only changed entities.

```python
fe.write_table(name=full_name, df=new_features, mode="merge")
```

Once the table is created, it appears in **Catalog Explorer** with your feature columns and the `id` column marked as the primary key:

![Catalog Explorer showing a feature table with feature columns and an id column marked as a primary key (PK).](/img/mlops-feature-table-schema.png)

### 2. Reference features in a training set

In your training code, look up features by primary key with `FeatureLookup` and build a training set. The join is automatic — you never hand-write it, and serving reads the same definitions.

```python
from databricks.feature_engineering import FeatureLookup

training_set = fe.create_training_set(
    df=labels_df,                      # rows with the entity key + label
    feature_lookups=[FeatureLookup(
        table_name=full_name,
        feature_names=["feature_1", "feature_2"],
        lookup_key="id",
    )],
    label="label",
    exclude_columns=["id"],            # keep the key out of the feature matrix
)
training_df = training_set.load_df()
```

### 3. Create an MLflow experiment for training

An **experiment** is the container for your training runs. Each **run** records the parameters, metrics, and model from one training attempt. Point MLflow at Unity Catalog, then name the experiment — MLflow creates it on first use.

```python
import mlflow

mlflow.set_registry_uri("databricks-uc")
mlflow.set_experiment("/Users/<you>/<experiment_name>")
```

Open the experiment from the **Experiments** tab. Each run lists its metrics; select two or more runs to compare them side by side.

![Databricks Experiments page with Create model training options and an experiments list filtered to names starting with mlflow-.](/img/mlops-experiments-list.png)

![MLflow experiment runs view for mlflow-classic-ml-e2e-mlflow-3, showing nested runs with duration, source, and metric columns such as best_rmse.](/img/mlops-experiment-runs.png)

## Troubleshoot

<details>
<summary>`create_table` fails on the primary key column</summary>

The primary key column must be non-null and unique. Remove null `id` values from the DataFrame before calling `create_table`, and confirm `primary_keys` names a real column.
</details>

<details>
<summary>Feature lookup returns duplicate or missing rows</summary>

The lookup key must be unique per entity. Check for duplicate `id` values in the feature table, and confirm the `lookup_key` matches the primary key column name.
</details>

## Next

- **Do next:** [14. MLOps overview](/docs/mlops/) — section complete
- **Learn why:** [14. MLOps](/docs/mlops/)
- **Reference:** [Feature tables in Unity Catalog](https://docs.databricks.com/aws/en/machine-learning/feature-store/uc/feature-tables-uc), [Train models with Feature Store](https://docs.databricks.com/aws/en/machine-learning/feature-store/train-models-with-feature-store), [MLflow experiments](https://docs.databricks.com/aws/en/mlflow/experiments)
