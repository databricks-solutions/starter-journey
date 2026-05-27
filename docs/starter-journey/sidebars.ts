import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {type: 'doc', id: 'get-started', label: '1. Get Started'},
    {
      type: 'category',
      label: '2. Before you Start',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Foundations',
          link: {type: 'doc', id: 'before-you-start/foundations/index'},
          items: [
            'before-you-start/foundations/account-console',
            'before-you-start/foundations/workspace',
            'before-you-start/foundations/unity-catalog',
            'before-you-start/foundations/recap-and-learning',
          ],
        },
        {
          type: 'category',
          label: 'Cloud Tenant ready',
          link: {type: 'doc', id: 'before-you-start/cloud-tenant-ready/index'},
          items: [
            'before-you-start/cloud-tenant-ready/single-tenant-setup',
            'before-you-start/cloud-tenant-ready/multi-tenant-setup',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '3. Infra Setup',
      collapsed: true,
      link: {type: 'doc', id: 'infra-setup/index'},
      items: [
        {
          type: 'category',
          label: 'Create Workspaces',
          link: {type: 'doc', id: 'infra-setup/create-workspaces/index'},
          items: [
            {
              type: 'category',
              label: 'AWS',
              collapsed: true,
              items: [
                'infra-setup/create-workspaces/aws/manual',
                'infra-setup/create-workspaces/aws/terraform',
              ],
            },
            {
              type: 'category',
              label: 'Azure',
              collapsed: true,
              items: [
                'infra-setup/create-workspaces/azure/manual',
                'infra-setup/create-workspaces/azure/terraform',
              ],
            },
            {
              type: 'category',
              label: 'GCP',
              collapsed: true,
              items: [
                'infra-setup/create-workspaces/gcp/manual',
                'infra-setup/create-workspaces/gcp/terraform',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Add Users',
          link: {type: 'doc', id: 'infra-setup/add-users/index'},
          items: [
            'infra-setup/add-users/manual',
            'infra-setup/add-users/scim',
          ],
        },
        {
          type: 'category',
          label: 'Add Groups',
          link: {type: 'doc', id: 'infra-setup/add-groups/index'},
          items: [
            'infra-setup/add-groups/manual',
            'infra-setup/add-groups/scim',
          ],
        },
        {
          type: 'category',
          label: 'Metastore Admins',
          link: {type: 'doc', id: 'infra-setup/metastore-admins/index'},
          items: [
            'infra-setup/metastore-admins/set-admin-group',
            'infra-setup/metastore-admins/uc-assets-ownership',
          ],
        },
        'infra-setup/activate-sso',
      ],
    },
    {
      type: 'category',
      label: '4. Cost monitoring',
      collapsed: true,
      link: {type: 'doc', id: 'cost-monitoring/index'},
      items: [
        'cost-monitoring/import-usage-dashboard',
        'cost-monitoring/additional-dashboards',
        'cost-monitoring/tag-compute-and-jobs',
        'cost-monitoring/budget-alerts',
      ],
    },
    {
      type: 'category',
      label: '5. Data Governance Strategy',
      collapsed: true,
      link: {type: 'doc', id: 'data-governance-strategy/index'},
      items: [
        'data-governance-strategy/small-organizations',
        'data-governance-strategy/medium-large-organizations',
      ],
    },
    {
      type: 'category',
      label: '6. Access your data',
      collapsed: true,
      link: {type: 'doc', id: 'access-your-data/index'},
      items: [
        {
          type: 'category',
          label: 'Cloud object storage',
          link: {type: 'doc', id: 'access-your-data/cloud-object-storage/index'},
          items: [
            'access-your-data/cloud-object-storage/aws',
            'access-your-data/cloud-object-storage/azure',
            'access-your-data/cloud-object-storage/gcp',
          ],
        },
        {
          type: 'category',
          label: 'Managed connectors',
          link: {type: 'doc', id: 'access-your-data/managed-connectors/index'},
          items: [
            {
              type: 'category',
              label: 'Create connection',
              link: {type: 'doc', id: 'access-your-data/managed-connectors/create-connection'},
              items: ['access-your-data/managed-connectors/create-connection/query-federation'],
            },
            {
              type: 'category',
              label: 'Create ingestion pipeline',
              link: {type: 'doc', id: 'access-your-data/managed-connectors/create-ingestion-pipeline/index'},
              items: ['access-your-data/managed-connectors/create-ingestion-pipeline/dabs-definition'],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '7. Build the first pipeline',
      collapsed: true,
      link: {type: 'doc', id: 'build-first-pipeline/index'},
      items: [
        'build-first-pipeline/workspace-databricks-agent',
        'build-first-pipeline/dabs',
      ],
    },
    {
      type: 'category',
      label: '8. Automation & Orchestration',
      collapsed: true,
      items: [
        'orchestration/workspace',
        'orchestration/dabs',
      ],
    },
    {type: 'doc', id: 'query-and-explore', label: '9. Query and Explore'},
    {
      type: 'category',
      label: '10. Databricks AI/BI',
      collapsed: true,
      items: [
        'databricks-aibi/dashboards',
        {
          type: 'category',
          label: 'Genie Spaces',
          link: {type: 'doc', id: 'databricks-aibi/genie-spaces'},
          items: [
            'databricks-aibi/try-a-sample-genie-space',
          ],
        },
        'databricks-aibi/databricks-apps',
      ],
    },
    {
      type: 'category',
      label: '11. Business Semantics',
      collapsed: true,
      link: {type: 'doc', id: 'business-semantics/index'},
      items: [
        'business-semantics/lab',
      ],
    },
    {
      type: 'category',
      label: '12. Data Access Control',
      collapsed: true,
      link: {type: 'doc', id: 'data-access-control/index'},
      items: [],
    },
    {
      type: 'category',
      label: '13. CI/CD and DevOps',
      collapsed: true,
      link: {type: 'doc', id: 'ci-cd-devops/index'},
      items: [],
    },
    {
      type: 'category',
      label: '14. MLOps',
      collapsed: true,
      link: {type: 'doc', id: 'mlops/index'},
      items: [
        'mlops/feature-engineering',
        'mlops/model-training',
        'mlops/model-deployment',
        'mlops/inference',
        'mlops/dabs',
      ],
    },
  ],
};

export default sidebars;
