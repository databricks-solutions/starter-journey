---
sidebar_position: 3
sidebar_label: Try a sample Genie Space
description: Install the AI/BI Analytics in Capital Markets dbdemo to explore a pre-built Genie Space on sample financial data.
---

# Try a sample Genie Space

> **You'll install** the **AI/BI: Analytics in Capital Markets** dbdemo so you can explore a pre-built Genie Space and dashboard on sample financial-services data in ~10 min.

## What you'll build

A ready-to-use Genie Space ("DBDemos - AI-BI - Portfolio Assistant") plus a companion AI/BI dashboard and notebook, all loaded with sample portfolio holdings, market sentiment, and stock data. Use it to test natural-language questions like *"What is the market sentiment for companies in my portfolio in the retail industry?"* without modeling your own data first.

**Official source (Demo Center):** [AI/BI: Analytics in Capital Markets with Dashboards and Genie](https://www.databricks.com/resources/demos/tutorials/aibi-analytics-in-capital-markets)

## Steps

### 1. Install the demo from the dbdemos library.

Run the following cells in a new Python notebook.

```python
%pip install dbdemos
```

```python
dbutils.library.restartPython()
```

```python
import dbdemos
dbdemos.install('aibi-portfolio-assistant', catalog='main', schema='dbdemos_aibi_fsi_portfolio_assistant')
```

Swap `catalog` and `schema` for any UC catalog and schema where your user has **CREATE** privileges.

![dbdemos installation in progress with %pip install and dbdemos.install for aibi-portfolio-assistant](/img/aibi-portfolio-install-1.png)

### 2. Wait for the installer to finish.

The notebook lists the installed assets: a notebook, an AI/BI dashboard, and a Genie Space.

![dbdemos ready screen listing the AI-BI Portfolio Assistant notebook, dashboard, and Genie Space](/img/aibi-portfolio-install-2.png)

## Verify

Open **Genie Spaces** in the workspace nav and confirm **DBDemos - AI-BI - Portfolio Assistant** appears. Click in and try one of the suggested questions.

![DBDemos AI-BI Portfolio Assistant Genie Space landing page with suggested questions](/img/aibi-portfolio-genie.png)

## Troubleshoot

<details>
<summary>ModuleNotFoundError: dbdemos</summary>

Run `%pip install dbdemos`, then `dbutils.library.restartPython()` before importing.

</details>

<details>
<summary>Permission denied writing catalog or schema</summary>

Pick a catalog and schema where your user can create tables, or ask a metastore admin to grant **CREATE**.

</details>

<details>
<summary>Install hangs</summary>

Confirm the cluster has internet egress to PyPI and enough resources.

</details>

## Next

- **Do next:** [Databricks Apps](/docs/databricks-aibi/databricks-apps)
- **Learn why:** [Genie Spaces](/docs/databricks-aibi/genie-spaces)
- **Reference:** [AI/BI: Analytics in Capital Markets demo (Demo Center)](https://www.databricks.com/resources/demos/tutorials/aibi-analytics-in-capital-markets)
