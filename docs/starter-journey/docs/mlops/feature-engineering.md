---
sidebar_position: 1
sidebar_label: Feature engineering
description: Create governed feature tables in Unity Catalog for offline training and online serving.
---

# Feature engineering

> **You'll** register reusable features as governed tables in Unity Catalog, so every model and pipeline reads the same definitions.
>
> **The problem:** When feature logic lives in notebooks, every team that needs a feature copies the SQL and the definitions slowly diverge. Each team computes the feature slightly differently, no one owns the canonical version, and the model trained on one definition breaks when the serving pipeline uses another. Nobody catches it until predictions are wrong in production.
>
> **Prereqs:** [14. MLOps](/docs/mlops/), [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)

## What this stage does

The first stage of an MLOps pipeline turns raw data into a governed feature table that every later stage reads from. The [MLOps Quickstart](https://github.com/databricks-solutions/mlops-quickstart) illustrates this with an `iris_data` table in Unity Catalog: four feature columns — `sepal_length_cm`, `sepal_width_cm`, `petal_length_cm`, `petal_width_cm` — plus the `species` label and an `id` primary key.

## How it works

**Databricks Feature Store** stores features as first-class Unity Catalog tables: one authoritative definition per feature, governed and lineage-tracked like any other data asset. Because training jobs and serving endpoints both read from that table, the logic behind the training data is identical to the logic used at inference time, so the two never drift apart.

The quickstart's `data_ingestion.ipynb` notebook loads the Iris dataset, adds an `id` column, and writes it to Unity Catalog as a Delta table with a primary key constraint:

```python
iris_data = datasets.load_iris(as_frame=True)
df_iris = pd.DataFrame(data=iris_data['data'], columns=iris_data['feature_names'])
df_iris['id'] = range(1, len(df_iris) + 1)

spark_df_iris = spark.createDataFrame(df_iris)
spark_df_iris.write.mode("overwrite").saveAsTable(f"{catalog_name}.{schema_name}.iris_data")
spark.sql(f"ALTER TABLE {catalog_name}.{schema_name}.iris_data ADD CONSTRAINT pk_id PRIMARY KEY (id)")
```

### Why a feature table needs a primary key

Every feature row describes one entity — here, one Iris sample identified by `id`. Databricks requires that entity column to be declared as a primary key. **Automatic feature lookup** uses it to join feature values onto a training set or an inference request, so you never hand-write the join and both paths read by the same key.

![Catalog Explorer showing the iris_data table columns: sepal_length_cm, sepal_width_cm, petal_length_cm, petal_width_cm, and species as doubles/bigint, with the id column marked as a primary key (PK).](/img/mlops-feature-table-schema.png)

## What to check

For any feature table, confirm in **Catalog Explorer** that the entity column is set as the primary key and the feature columns match what training expects. In the quickstart's `iris_data`, that is the four feature columns, the `species` label, and the `id` primary key.

## Next

- **Do next:** [Model training](/docs/mlops/model-training)
- **Learn why:** [14. MLOps](/docs/mlops/)
- **Reference:** [Databricks Feature Store](https://docs.databricks.com/aws/en/machine-learning/feature-store/), [data_ingestion.ipynb](https://github.com/databricks-solutions/mlops-quickstart/blob/master/notebooks/1_data_preprocessing/data_ingestion.ipynb)
