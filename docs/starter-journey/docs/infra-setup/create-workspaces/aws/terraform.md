---
sidebar_label: Terraform
description: Deploy a Databricks workspace and Unity Catalog on AWS using Terraform with a customer-managed VPC.
---

# AWS — Terraform

> **You'll deploy** a Databricks workspace and catalog on AWS using Terraform in ~20 min.
>
> **Prereqs:** [AWS account](/docs/before-you-start/cloud-tenant-ready/single-tenant-setup), [Terraform CLI](https://developer.hashicorp.com/terraform/install), [Databricks account console](/docs/before-you-start/foundations/account-console)

## What you'll build

A Databricks workspace with a customer-managed VPC (BYOVPC) on AWS, plus a Unity Catalog catalog attached to that workspace. The Terraform modules handle IAM roles, S3 buckets, VPC networking, and metastore assignment.

:::warning
The workspace module does not create a default catalog. You must run the catalog deployment (Step 2) as well.
:::

## Prerequisites

- An AWS account with permissions to create IAM roles, S3 buckets, and VPC resources.
- A Databricks account with account-admin privileges.
- Terraform CLI installed locally.
- A service principal with workspace-admin access (for catalog deployment).

## Steps

### 1. Deploy the workspace

Clone the Terraform template and configure it for your environment.

1. Go to the template repository: [Databricks on AWS with Customer-Managed VPC (BYOVPC)](https://github.com/databricks-solutions/technical-services-solutions/tree/main/workspace-setup/terraform-examples/aws/aws-byovpc).
2. Follow the **README.md** instructions.
3. Copy `tf/terraform.tfvars.example` and fill in your values.

Use the `prefix` variable to name the workspace by environment:
- `dev` or `development` for the first workspace.
- Add a business-unit prefix if needed (e.g., `finance_dev`).

For networking, choose one of:
- **Option 1:** Create a new VPC (recommended — one Databricks VPC per tenant).
- **Option 2:** Use an existing VPC.

For the metastore, choose one of:
- **Option 1:** Create a new metastore (if none exists in the account console for this region).
- **Option 2:** Attach to an existing metastore.

4. Run `terraform init && terraform apply`.
5. Repeat for **staging** and **production** workspaces.

### 2. Deploy the catalog

Each workspace needs a catalog so users can create schemas, tables, and models.

1. Go to the catalog module: [Module to create a catalog](https://github.com/databrickslabs/sandbox/tree/main/uc-quickstart/aws/modules/environment).
2. See the usage example in [main.tf](https://github.com/databrickslabs/sandbox/blob/main/uc-quickstart/aws/main.tf) — it creates three catalogs (production, development, sandbox) on the same AWS account.

:::danger
The Terraform provider must use a workspace-level connection. See [Authenticating with Databricks-managed Service Principal](https://registry.terraform.io/providers/databricks/databricks/latest/docs#authenticating-with-databricks-managed-service-principal). The service principal needs workspace-admin access or the apply will fail.
:::

Example input variables for a **development** workspace:

```hcl
catalog_name             = "development"
external_location_name   = "development-catalog-default"
databricks_account_id    = "12341234"
aws_account_id           = "abc123abc123"
storage_prefix           = "development"
bucket_name              = "myorg-databricks-development-catalog"
```

3. Run `terraform init && terraform apply`.

:::tip
For production setups, isolate resources on different AWS accounts rather than deploying all catalogs from a single account.
:::

### 3. Video walkthrough (optional)

The video below uses an older version of the template but shows similar steps.

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/t5vyL1RKXUE"
  title="YouTube video player"
></iframe>

## Verify

1. Log in to the [Databricks account console](https://accounts.cloud.databricks.com/).
2. Navigate to **Workspaces** and confirm the new workspace shows a **Running** status.
3. Open the workspace and navigate to **Catalog** to confirm the new catalog appears.

## Troubleshoot

<details>
<summary>PERMISSION_DENIED: User is not an owner of Metastore while creating catalog</summary>

The service principal running Terraform does not have metastore-level permissions. Fix with one of:

- **Option 1:** Add the service principal to the metastore admins group.
- **Option 2:** Grant just the catalog creation privilege:

```sql
GRANT CREATE CATALOG ON METASTORE TO `service_principal_name`;
```
</details>

<details>
<summary>Terraform apply fails with VPC or IAM errors</summary>

Verify the AWS credentials used by Terraform have permission to create IAM roles, S3 buckets, and VPC resources. If using an existing VPC, confirm the subnet CIDRs and security groups match the template requirements.
</details>

<details>
<summary>Workspace created but catalog module cannot connect</summary>

The catalog module needs a workspace-level Databricks provider, not an account-level one. Confirm the provider block uses the workspace URL and a service principal with workspace-admin access.
</details>

## Next

- **Do next:** [Add Users](/docs/infra-setup/add-users)
- **Learn why:** [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)
- **Reference:** [Databricks Terraform provider](https://registry.terraform.io/providers/databricks/databricks/latest/docs)
