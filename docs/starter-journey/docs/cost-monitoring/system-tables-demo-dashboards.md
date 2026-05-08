---
sidebar_position: 2
sidebar_label: Demo dashboards (dbdemos)
description: Install the dbdemos system-tables package for forecasting, warehouse attribution, and related AI/BI dashboards on real billing data.
---

# Demo dashboards (dbdemos)

> **You'll install** the community **`system-tables`** demo so specialized AI/BI dashboards run against your real `system.billing` data in ~25 min.
>
> **Prereqs:** Unity Catalog-enabled workspace; **SELECT** on `system.billing` (see [System tables](/docs/cost-monitoring/system-billing-usage)). Audit dashboards also need **SELECT** on `system.access.audit`.

## What you'll build

Multiple dashboards plus notebooks: consumption tracking, **DBU** forecast, model-endpoint cost attribution, warehouse attribution, and UC/volume analysis. Intermediate tables land in a Unity Catalog schema you choose.

## Prerequisites

- Unity Catalog-enabled workspace with **`system.billing`** available.
- **Compute** for the install notebook (serverless or all-purpose cluster with outbound access to PyPI).
- **CREATE** privileges on your chosen catalog and schema.

:::warning

**dbdemos** is open source and **not** an officially supported Databricks product. Treat installs as best-effort; use GitHub issues for demo bugs.

:::

:::tip

Confirm the demo slug is still **`system-tables`** on PyPI/GitHub before you teach this broadly.

:::

<!-- TODO: verify before publishing — dossier open question #4: dbdemos demo name and package drift -->

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

Replace `main` and `dbdemos_system_tables` with your catalog and schema:

```python
import dbdemos
dbdemos.install('system-tables', catalog='main', schema='dbdemos_system_tables')
```

Wait until the notebook prints links to notebooks and dashboards.

### 3. Open dashboards

Follow the printed links. Confirm each dashboard loads against non-sample usage.

## Verify

1. **Billing Forecast** shows history and a projected trend (forecast quality improves with more history; allow **30+** days when possible).
2. **Warehouse Cost Attribution** shows non-null `warehouse_id` rows when SQL warehouses drove usage.
3. Open an installed notebook and trace the SQL behind a chart.

## Troubleshoot

<details>
<summary>ModuleNotFoundError: dbdemos</summary>

Run `%pip install dbdemos`, then `dbutils.library.restartPython()` before importing.

</details>

<details>
<summary>Permission denied writing catalog/schema</summary>

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

- **Do next:** [System tables](/docs/cost-monitoring/system-billing-usage)
- **Learn why:** [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)
- **Reference:** [System Tables billing demo (Demo Center)](https://www.databricks.com/resources/demos/tutorials/governance/system-tables)
