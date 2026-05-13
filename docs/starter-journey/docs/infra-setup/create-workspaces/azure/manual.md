---
sidebar_label: Manual
description: Create a Databricks workspace on Azure manually through the Azure portal.
---

# Azure — Manual Workspace Creation

> **You'll create** a Databricks workspace on Azure in ~10 min.
>
> **Prereqs:** [Azure subscription](/docs/before-you-start/cloud-tenant-ready), [Databricks account console](/docs/before-you-start/foundations/account-console)

## What you'll build

A Databricks workspace deployed into your Azure subscription using the Azure portal. The portal creates the managed resource group, VNet resources, and workspace configuration for you.

## Prerequisites

- An Azure subscription with Contributor permissions on the target resource group.
- A Databricks account with account-admin privileges.
- Know which subscription and resource group the workspace belongs to (e.g., dev workspace on the dev subscription).

## Steps

### 1. Create the development workspace

Follow the video tutorial below. When deploying:

- Select the correct **subscription** and **resource group** for the target environment.
- Example: deploy the dev workspace into the dev subscription and dev Databricks resource group.

:::warning
Match the subscription and resource group to the environment. Deploying a dev workspace into a production subscription creates confusion that is hard to untangle later.
:::

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/hb_cQ8d3750"
></iframe>

### 2. Repeat for staging and production

Run through the same process for each additional workspace, selecting the corresponding subscription and resource group each time.

## Verify

1. Log in to the [Databricks account console](https://accounts.azuredatabricks.net/).
2. Navigate to **Workspaces** and confirm the new workspace shows a **Running** status.
3. Click the workspace URL to open it and verify you can reach the landing page.

## Troubleshoot

<details>
<summary>Workspace deployment fails in the Azure portal</summary>

Check the Azure Activity Log for the resource group. Common causes: insufficient permissions on the subscription, resource provider `Microsoft.Databricks` not registered, or a quota limit on the target region.
</details>

<details>
<summary>Cannot access the workspace after creation</summary>

Verify your user account has been added to the workspace. If using Entra ID (Azure AD), confirm the user exists in the linked directory and has been assigned to the Databricks enterprise application.
</details>

## Next

- **Do next:** [Azure Terraform deployment](/docs/infra-setup/create-workspaces/azure/terraform)
- **Learn why:** [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)
- **Reference:** [Azure Databricks workspace setup](https://learn.microsoft.com/en-us/azure/databricks/getting-started/)
