---
sidebar_position: 0
sidebar_label: Metastore Admins
description: Configure metastore administration and transfer Unity Catalog asset ownership to the admin group.
---

# Metastore Admins

> **You'll configure** metastore admin ownership and transfer UC assets to the correct group in ~10 min.
>
> **Prereqs:** [Add Groups](/docs/infra-setup/add-groups)

## Why this matters

The metastore is the top-level Unity Catalog container. Whoever owns it controls catalog creation, external locations, and storage credentials. If a single user or service principal owns the metastore, that ownership becomes a single point of failure — the person leaves, the service principal is deleted, and governance breaks.

Transferring ownership to a group ensures continuity and shared responsibility.

## Journey checklist

- [x] ~~Get started.~~
- [x] ~~Before you start.~~
- [ ] Infra setup
    - [x] ~~Create workspaces.~~
    - [x] ~~Add users.~~
    - [x] ~~Add groups.~~
    - [ ] **Change ownership to metastore admins.**
    - [ ] Activate SSO.
- [ ] Cost monitoring.
- [ ] Data Governance Strategy.
- [ ] Access your data.
- [ ] Build the first pipeline.
- [ ] Automation and orchestration.
- [ ] Query and explore.
- [ ] Databricks AI/BI.
- [ ] Business semantics.

## How it works

Metastore ownership determines who can create catalogs, manage external locations, and control storage credentials. By default, the user who created the metastore owns it. This section walks through transferring that ownership to a dedicated admin group and then reassigning existing UC assets.

## What you'll configure

- **[Set admin group](/docs/infra-setup/metastore-admins/set-admin-group)** — Transfer metastore ownership from an individual to the admin group.
- **[UC assets ownership](/docs/infra-setup/metastore-admins/uc-assets-ownership)** — Reassign existing catalogs, external locations, and credentials to the admin group.

## Next

- **Do next:** [Set admin group](/docs/infra-setup/metastore-admins/set-admin-group)
- **Learn why:** [Unity Catalog foundations](/docs/before-you-start/foundations/unity-catalog)
- **Reference:** [Unity Catalog administration](https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/)
