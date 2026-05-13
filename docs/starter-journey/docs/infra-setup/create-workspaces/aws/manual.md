---
sidebar_label: Manual
description: Create a Databricks workspace on AWS using the automated configuration wizard.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# AWS — Manual Workspace Creation

> **You'll create** a Databricks workspace on AWS in ~10 min.
>
> **Prereqs:** [AWS account](/docs/before-you-start/cloud-tenant-ready/single-tenant-setup), [Databricks account console](/docs/before-you-start/foundations/account-console)

## What you'll build

A Databricks workspace deployed on your AWS account using the automated configuration wizard. The wizard creates the required IAM roles, S3 bucket, and networking resources for you.

## Prerequisites

- An AWS account with permissions to create IAM roles and S3 buckets.
- A Databricks account with account-admin privileges.
- Know which AWS region hosts your data sources (you'll deploy the workspace there).

## Steps

### 1. Create the development workspace

Open the PDF guide below and follow the step-by-step instructions. When prompted, select the target AWS account.

<a target="_blank" href={useBaseUrl('/pdfs/AWS-Automated-Configuration-Classic-Workspace-Deployment.pdf')}>**PDF — AWS Automated Configuration Classic Workspace Deployment**</a>

:::warning
Deploy the workspace in the same AWS region as your data sources. Cross-region traffic incurs egress fees that add up quickly.
:::

### 2. Repeat for staging and production

Run through the same PDF guide once more for each additional workspace. A standard setup uses three workspaces: **development**, **staging**, and **production**.

## Verify

1. Log in to the [Databricks account console](https://accounts.cloud.databricks.com/).
2. Navigate to **Workspaces** and confirm the new workspace shows a **Running** status.
3. Click the workspace URL to open it and verify you can reach the landing page.

## Troubleshoot

<details>
<summary>Workspace stuck in "Provisioning" status</summary>

The wizard is still creating AWS resources. Wait 5–10 minutes. If the status does not change, check AWS CloudFormation in the target region for stack errors and verify your IAM permissions.
</details>

<details>
<summary>IAM permission errors during creation</summary>

The account used to launch the wizard needs permission to create IAM roles, S3 buckets, and VPC resources. Ask your AWS administrator to attach the required policies or use an account with `AdministratorAccess` for the initial setup.
</details>

<details>
<summary>Workspace created in the wrong region</summary>

Databricks workspaces cannot be moved between regions after creation. Delete the workspace from the account console, then re-run the wizard selecting the correct region.
</details>

## Next

- **Do next:** [Configure Unity Catalog](/docs/before-you-start/foundations/unity-catalog)
- **Learn why:** [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)
- **Reference:** [Create a workspace — Databricks docs](https://docs.databricks.com/aws/en/admin/account-settings-e2/workspaces.html)
