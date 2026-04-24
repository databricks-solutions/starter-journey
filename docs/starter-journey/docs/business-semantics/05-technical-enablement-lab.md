---
sidebar_label: "Technical enablement (hands-on)"
description: Self-paced — define a sales metric view, add agent metadata, publish in Unity Catalog, and validate in SQL, AI/BI, and Genie.
---

# Technical enablement (hands-on)

> **You'll** **activate** the full business-semantics path in a workspace: one sales-style KPI as a **metric view**, with **governance and AI metadata**, then **check** the same result from SQL, dashboards, and Genie. Budget about **2–3 hours** of focus time, at your own pace.
>
> **Prereqs:** The earlier [topics in this path](/docs/business-semantics/), a SQL warehouse (or serverless SQL) with metric view support for your Databricks version, `CREATE` on a target schema, and access to [Genie spaces](/docs/databricks-aibi/genie-spaces) if you will validate natural language

**Who this is for:** Data engineers (analysts optional).  
**Outcome:** One end-to-end example you can show stakeholders as proof the features work for your data.

## What you will build

One **certified** metric view for a sales KPI (for example **total revenue** by **region** and **month**), with **measures, dimensions, filters, and agent metadata**, **published** in Unity Catalog, then used consistently from a SQL editor, a notebook, an [AI/BI dashboard](/docs/databricks-aibi/dashboards), and a [Genie space](/docs/databricks-aibi/genie-spaces). This is the main **adoption** checkpoint: same numbers, same object, every surface your customer cares about.

## What you need in the workspace

- A **silver** or **gold** table (or a sample) with the columns you need (for example, date, region, revenue).
- A **SQL warehouse** (or serverless SQL) that supports metric views.
- A principal with **USE CATALOG** / **USE SCHEMA** and **SELECT** on source data, and **CREATE** in the target schema, per your org. See [privileges in Unity Catalog](https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/).

## Follow these steps (self-paced)

### Define the metric view for a sales KPI

Create the metric view with `CREATE METRIC VIEW`, Catalog Explorer, or YAML. Compute your KPI (for example **sum of line revenue**), document the **grain**, and use **discoverable** catalog and object names in `sales` or an equivalent schema.

### Add dimensions, filters, and measures

- **Dimensions:** e.g. **month** and **region** (or the closest in your data).
- **Filters:** e.g. exclude voided lines — an explicit rule your org agrees is standard.
- **Measures:** the primary KPI and any **derived** fields at a **compatible** grain.

### Add agent metadata

Set **display name**, **synonyms**, a short **LLM instruction** (for example, fiscal year, currency), and **tags**. Apply **certification** and **format** if your process uses them. This **activates** the AI/BI and Genie behavior you designed in the previous topic.

### Publish in Unity Catalog and set permissions

Grant **groups** (not only individual users) **SELECT** on the metric view, record **ownership**, and **certify** if it is production-grade for your org.

### Query from three client surfaces

| Surface | What to check |
| --- | --- |
| **SQL editor** | Same scope → same value as a manual aggregation **spot-check** |
| **Notebook** | A cell with the same **slice** (for example, region × month) |
| **AI/BI** | A [dashboard](/docs/databricks-aibi/dashboards) tile bound to the metric view |

### Validate natural language (Genie)

In a [Genie space](/docs/databricks-aibi/genie-spaces) that includes this object, ask a few business-style questions. Answers should **agree** with SQL and the dashboard. Adjust **synonyms** or **instructions** if the wrong measure or time window is chosen.

## Done when (acceptance for activation)

**Pass criteria:** For a **fixed** filter context, **SQL, notebook, dashboard, and Genie** all return **agreeing** values, and a business partner recognizes the **metric** by name. That is a green light to **expand** the same pattern to the next priorities.

## Journey checklist (this hands-on)

- [ ] **Metric view** created and **documented** (name, grain, owners)
- [ ] **Permissions** and optional **certification** applied
- [ ] **SQL, notebook, AI/BI** show **matching** results for a test case
- [ ] **Genie** returns **consistent** results or metadata was updated until it does

## Troubleshoot

<details>
<summary>Genie does not pick the metric view</summary>

Confirm the object is **in the space**, the user can **SELECT** it, and **synonyms** + **description** + **space instructions** clearly express business intent.
</details>

<details>
<summary>SQL and UI do not match</summary>

Reconcile **time zone**, **fiscal vs. calendar**, and any **row filters**. The **LLM instruction** should record the “official” definition in words your users use.
</details>

## Next

- **Do next:** Harden the pattern in [Genie spaces](/docs/databricks-aibi/genie-spaces) for a wider group, or revisit the [Business semantics overview](/docs/business-semantics/) for another pass through the path
- **Learn why:** [Databricks AI/BI — overview](/docs/databricks-aibi/)
- **Reference:** [Business semantics in Unity Catalog — Databricks documentation](https://docs.databricks.com/aws/en/business-semantics/)
