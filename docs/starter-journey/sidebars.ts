import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {type: 'doc', id: '01-get-started', label: '1. Get Started'},
    {
      type: 'category',
      label: '2. Before you Start',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Foundations',
          link: {type: 'doc', id: '02-before-you-start/foundations/index'},
          items: [
            '02-before-you-start/foundations/account-console',
            '02-before-you-start/foundations/workspace',
            '02-before-you-start/foundations/unity-catalog',
            '02-before-you-start/foundations/recap-and-learning',
          ],
        },
        {
          type: 'category',
          label: 'Cloud Tenant ready',
          link: {type: 'doc', id: '02-before-you-start/cloud-tenant-ready/index'},
          items: [
            '02-before-you-start/cloud-tenant-ready/single-tenant-setup',
            '02-before-you-start/cloud-tenant-ready/multi-tenant-setup',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '3. Infra Setup',
      collapsed: true,
      link: {type: 'doc', id: '03-infra-setup/index'},
      items: [
        {
          type: 'category',
          label: 'Create Workspaces',
          link: {type: 'doc', id: '03-infra-setup/create-workspaces/index'},
          items: [
            {
              type: 'category',
              label: 'AWS',
              collapsed: true,
              items: [
                '03-infra-setup/create-workspaces/aws/manual',
                '03-infra-setup/create-workspaces/aws/terraform',
              ],
            },
            {
              type: 'category',
              label: 'Azure',
              collapsed: true,
              items: [
                '03-infra-setup/create-workspaces/azure/manual',
                '03-infra-setup/create-workspaces/azure/terraform',
              ],
            },
            {
              type: 'category',
              label: 'GCP',
              collapsed: true,
              items: [
                '03-infra-setup/create-workspaces/gcp/manual',
                '03-infra-setup/create-workspaces/gcp/terraform',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Add Users',
          link: {type: 'doc', id: '03-infra-setup/add-users/index'},
          items: [
            '03-infra-setup/add-users/manual',
            '03-infra-setup/add-users/scim',
          ],
        },
        {
          type: 'category',
          label: 'Add Groups',
          link: {type: 'doc', id: '03-infra-setup/add-groups/index'},
          items: [
            '03-infra-setup/add-groups/manual',
            '03-infra-setup/add-groups/scim',
          ],
        },
        {
          type: 'category',
          label: 'Metastore Admins',
          link: {type: 'doc', id: '03-infra-setup/metastore-admins/index'},
          items: [
            '03-infra-setup/metastore-admins/set-admin-group',
            '03-infra-setup/metastore-admins/uc-assets-ownership',
          ],
        },
        '03-infra-setup/activate-sso',
      ],
    },
    {
      type: 'category',
      label: '4. Cost monitoring',
      collapsed: true,
      link: {type: 'doc', id: '04-cost-monitoring/index'},
      items: [
        '04-cost-monitoring/import-usage-dashboard',
        '04-cost-monitoring/additional-dashboards',
        '04-cost-monitoring/tag-compute-and-jobs',
        '04-cost-monitoring/budget-alerts',
      ],
    },
    {
      type: 'category',
      label: '5. Data Governance Strategy',
      collapsed: true,
      link: {type: 'doc', id: '05-data-governance-strategy/index'},
      items: [
        '05-data-governance-strategy/small-organizations',
        '05-data-governance-strategy/medium-large-organizations',
      ],
    },
    {
      type: 'category',
      label: '6. Access your data',
      collapsed: true,
      link: {type: 'doc', id: '06-access-your-data/index'},
      items: [
        {
          type: 'category',
          label: 'Cloud object storage',
          link: {type: 'doc', id: '06-access-your-data/cloud-object-storage/index'},
          items: [
            '06-access-your-data/cloud-object-storage/aws',
            '06-access-your-data/cloud-object-storage/azure',
            '06-access-your-data/cloud-object-storage/gcp',
          ],
        },
        {
          type: 'category',
          label: 'Managed connectors',
          link: {type: 'doc', id: '06-access-your-data/managed-connectors/index'},
          items: [
            {
              type: 'category',
              label: 'Create connection',
              link: {type: 'doc', id: '06-access-your-data/managed-connectors/create-connection'},
              items: ['06-access-your-data/managed-connectors/create-connection/query-federation'],
            },
            {
              type: 'category',
              label: 'Create ingestion pipeline',
              link: {type: 'doc', id: '06-access-your-data/managed-connectors/create-ingestion-pipeline/index'},
              items: ['06-access-your-data/managed-connectors/create-ingestion-pipeline/dabs-definition'],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '7. Build the first pipeline',
      collapsed: true,
      link: {type: 'doc', id: '07-build-first-pipeline/index'},
      items: [
        '07-build-first-pipeline/workspace-databricks-agent',
        '07-build-first-pipeline/dabs',
      ],
    },
    {
      type: 'category',
      label: '8. Automation & Orchestration',
      collapsed: true,
      items: [
        '08-orchestration/workspace',
        '08-orchestration/dabs',
      ],
    },
    {type: 'doc', id: '09-query-and-explore', label: '9. Query and Explore'},
    {
      type: 'category',
      label: '10. Databricks AI/BI',
      collapsed: true,
      items: [
        '10-databricks-aibi/dashboards',
        {
          type: 'category',
          label: 'Genie Spaces',
          link: {type: 'doc', id: '10-databricks-aibi/genie-spaces'},
          items: [
            '10-databricks-aibi/try-a-sample-genie-space',
          ],
        },
        '10-databricks-aibi/databricks-apps',
      ],
    },
    {
      type: 'category',
      label: '11. Business Semantics',
      collapsed: true,
      link: {type: 'doc', id: '11-business-semantics/index'},
      items: [
        '11-business-semantics/lab',
      ],
    },
    {
      type: 'category',
      label: '12. Data Access Control',
      collapsed: true,
      link: {type: 'doc', id: '12-data-access-control/index'},
      items: [],
    },
    {
      type: 'category',
      label: '13. CI/CD and DevOps',
      collapsed: true,
      link: {type: 'doc', id: '13-ci-cd-devops/index'},
      items: [],
    },
    {
      type: 'category',
      label: '14. MLOps',
      collapsed: true,
      link: {type: 'doc', id: '14-mlops/index'},
      items: [],
    },
  ],
};

export default sidebars;
