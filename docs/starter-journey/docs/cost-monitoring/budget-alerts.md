---
sidebar_position: 4
sidebar_label: Budget alerts
description: Account admins configure monthly budgets with email thresholds; follow the official budgets guide and use the example Development Workspace budget.
---

# Budget alerts

> **You'll configure** account-level budgets that email stakeholders when spend crosses list-price thresholds.
>
> **Prereqs:** [Account Console foundations](/docs/before-you-start/foundations/account-console)

## What you'll build

Monthly **USD** budgets driven by **list prices** (including platform add-ons). Alerts email external recipients; budgets never throttle workloads.

## Prerequisites

- **Account admin** role.
- Optional: live **custom tags** if you filter budgets per team ([Tags and attribution](/docs/cost-monitoring/tag-compute-and-jobs)).

:::warning

Only **account admins** create budgets. Budgets **monitor only** — usage keeps accruing after you cross a threshold.

:::

**Public Preview — budgets:** Limits may change before GA.

## Open the account console

Sign in as an account admin:

- **AWS:** [accounts.cloud.databricks.com](https://accounts.cloud.databricks.com)
- **Azure:** [accounts.azuredatabricks.net](https://accounts.azuredatabricks.net)
- **GCP:** [accounts.gcp.databricks.com](https://accounts.gcp.databricks.com)

## Steps

Follow the official guide end to end: **[Create and monitor budgets](https://docs.databricks.com/aws/en/admin/account-settings/budgets)**.

That guide covers **Usage** → **Budgets** → **Add budget**, definitions, thresholds, and email recipients.

## Example: Development Workspace budget

Use this pattern when you want a **development** slice of the account with two early-warning thresholds:

- **Budget name:** `Development Workspace budget`
- **Definitions:** restrict to your non-production workspace (and optional tag filters if you use them on [Tags and attribution](/docs/cost-monitoring/tag-compute-and-jobs)).
- **Alert thresholds:** add **$500** and **$1000** as two separate monthly lines with the right distribution lists.

## Expect latency

Alerts may lag usage by up to **24 hours**. New budgets can show **$0** briefly while telemetry catches up.

## Verify

1. **Usage** → **Budgets** lists the new budget.
2. Open it — cumulative spend plots against dotted threshold lines.
3. For a dry-run email, set a threshold below month-to-date spend and wait (check spam).

## Troubleshoot

<details>
<summary>Budget stuck at zero</summary>

Wait up to a day for telemetry; confirm the account generated usage this month.

</details>

<details>
<summary>No email</summary>

Verify addresses, spam folders, and that spend crossed the configured threshold after latency.

</details>

<details>
<summary>Totals mismatch invoices</summary>

Budgets intentionally ignore credits and discounts. Model contracts in SQL or external tools if you need invoice-accurate thresholds.

</details>

<details>
<summary>Cannot create budgets</summary>

Only **account admins** manage budgets.

</details>

<details>
<summary>Tag filters empty</summary>

Confirm resources emitted that tag before the budget month ([Tags and attribution](/docs/cost-monitoring/tag-compute-and-jobs)).

</details>

## Next

- **Do next:** [Data governance strategy](/docs/data-governance-strategy)
- **Learn why:** [Account Console foundations](/docs/before-you-start/foundations/account-console)
- **Reference:** [Create and monitor budgets](https://docs.databricks.com/aws/en/admin/account-settings/budgets)
