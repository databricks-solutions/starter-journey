---
sidebar_position: 2
sidebar_label: Additional dashboards
description: Install the dbdemos system-tables package for optional forecasting and attribution AI/BI dashboards on your catalog and schema.
---

# Additional dashboards

> **You'll install** the community **`system-tables`** demo so optional AI/BI dashboards run against your real billing data in ~25 min.

## What you'll build

Multiple dashboards plus notebooks: consumption tracking, **DBU** forecast, model-endpoint cost attribution, warehouse attribution, and UC/volume analysis. Intermediate tables land in a **Unity Catalog catalog and schema you choose** (not necessarily `main`).

**Official source (Demo Center):** [System Tables: Billing Forecast, Usage Analytics, and Access Auditing with Unity Catalog](https://www.databricks.com/resources/demos/tutorials/governance/system-tables?itm_data=demo_center&itm_source=www&itm_category=home&itm_page=home&itm_component=card&itm_offer=system-tables)

:::tip

Confirm the demo slug is still **`system-tables`** on PyPI or GitHub before you standardize this in enablement.

:::

<!-- TODO: verify before publishing — dbdemos demo name drift -->

## Steps

### 1. Install dbdemos in a Python notebook

1. Open a Python notebook attached to cluster or serverless.
2. Run:

```python
%pip install dbdemos
```

3. Restart Python:

```python
dbutils.library.restartPython()
```

### 2. Install the system-tables demo

Set **`catalog`** and **`schema`** to a location where you have **CREATE** (replace placeholders with your real names):

```python
import dbdemos

catalog = "mycatalog"
schema = "myschema"

dbdemos.install("system-tables", catalog=catalog, schema=schema)
```

Wait until the notebook finishes and prints status for notebooks and dashboards.

### 3. Open dashboards in the workspace

In the workspace sidebar, open **Dashboards**. Open the new dashboards from the install output (or search by title, for example **DBU Consumption Forecast**). Confirm each loads against non-sample usage.

## Verify

1. **Billing Forecast** shows history and a projected trend when enough history exists (**30+** days helps).
2. **Warehouse Cost Attribution** shows non-null **`warehouse_id`** rows when SQL warehouses drove usage.
3. Open an installed notebook and trace the SQL behind a chart.

## Troubleshoot

<details>
<summary>ModuleNotFoundError: dbdemos</summary>

Run `%pip install dbdemos`, then `dbutils.library.restartPython()` before importing.

</details>

<details>
<summary>Permission denied writing catalog or schema</summary>

Pick a catalog and schema where your user may create tables, or ask a metastore admin to grant **CREATE**.

</details>

<details>
<summary>Permission denied on system tables</summary>

An admin must grant **SELECT** on **`system.billing`** (and **`system.access`** for audit-backed tiles).

</details>

<details>
<summary>Empty charts</summary>

New accounts need accumulated usage. Forecast tiles may stay thin until enough daily history exists.

</details>

<details>
<summary>Install hangs</summary>

Confirm the cluster has internet egress to PyPI and enough resources.

</details>

## Next

- **Do next:** [Tags and attribution](/docs/cost-monitoring/tag-compute-and-jobs)
- **Learn why:** [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)
- **Reference:** [System Tables demo (Demo Center)](https://www.databricks.com/resources/demos/tutorials/governance/system-tables?itm_data=demo_center&itm_source=www&itm_category=home&itm_page=home&itm_component=card&itm_offer=system-tables)
