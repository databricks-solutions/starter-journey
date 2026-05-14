---
sidebar_position: 0
sidebar_label: Infra Setup
description: Set up workspaces, users, groups, metastore administration, and SSO for your Databricks deployment.
---

# Infra Setup

> **You'll deploy** the core Databricks infrastructure — workspaces, identity, and governance — in this section.
>
> **Prereqs:** [Before you Start](/docs/before-you-start/foundations)

## Why this matters

A Databricks deployment without proper workspace layout, centralized identity, and metastore ownership becomes hard to govern and harder to scale. This section walks through each piece in the order it should be done.

## Journey checklist

- [x] ~~Get started.~~
- [x] ~~Before you start.~~
- [ ] **Infra setup**
    - [ ] Create workspaces.
    - [ ] Add users.
    - [ ] Add groups.
    - [ ] Change ownership to metastore admins.
    - [ ] Activate SSO.
- [ ] Cost monitoring.
- [ ] Data Governance Strategy.
- [ ] Access your data.
- [ ] Build the first pipeline.
- [ ] Automation and orchestration.
- [ ] Query and explore.
- [ ] Databricks AI/BI.
- [ ] Business semantics.

## What you'll set up

Work through these sub-sections in order. Each one depends on the previous.

- **[Create Workspaces](/docs/infra-setup/create-workspaces)** — Deploy workspaces on AWS, Azure, or GCP (manual or Terraform).
- **[Add Users](/docs/infra-setup/add-users)** — Register users manually or via SCIM provisioning.
- **[Add Groups](/docs/infra-setup/add-groups)** — Create groups that map to data personas and assign users.
- **[Metastore Admins](/docs/infra-setup/metastore-admins)** — Set the admin group and transfer UC asset ownership.
- **[Activate SSO](/docs/infra-setup/activate-sso)** — Configure single sign-on with your identity provider.

## Next

- **Do next:** [Create Workspaces](/docs/infra-setup/create-workspaces)
- **Learn why:** [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)
- **Reference:** [Databricks administration overview](https://docs.databricks.com/aws/en/admin/)
