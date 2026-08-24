import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {type: 'doc', id: '01-get-started', label: '1. Get started'},
    {
      type: 'category',
      label: '2. Before you start',
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
      label: '3. Infra setup',
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
                '03-infra-setup/create-workspaces/aws/sra',
              ],
            },
            {
              type: 'category',
              label: 'Azure',
              collapsed: true,
              items: [
                '03-infra-setup/create-workspaces/azure/manual',
                '03-infra-setup/create-workspaces/azure/terraform',
                '03-infra-setup/create-workspaces/azure/sra',
              ],
            },
            {
              type: 'category',
              label: 'GCP',
              collapsed: true,
              items: [
                '03-infra-setup/create-workspaces/gcp/manual',
                '03-infra-setup/create-workspaces/gcp/terraform',
                '03-infra-setup/create-workspaces/gcp/sra',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Add Users',
          collapsed: true,
          items: [
            '03-infra-setup/add-users/manual',
            '03-infra-setup/add-users/scim',
          ],
        },
        {
          type: 'category',
          label: 'Add Groups',
          collapsed: true,
          items: [
            '03-infra-setup/add-groups/manual',
            '03-infra-setup/add-groups/scim',
          ],
        },
        {
          type: 'category',
          label: 'Metastore Admins',
          collapsed: true,
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
      label: '5. Governance strategy',
      collapsed: true,
      link: {type: 'doc', id: '05-data-governance-strategy/index'},
      items: [
        '05-data-governance-strategy/groups',
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
          label: 'Databases and SaaS ingestion',
          link: {type: 'doc', id: '06-access-your-data/managed-connectors/index'},
          items: [
            '06-access-your-data/managed-connectors/dabs-definition',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '7. Build the first ETL pipeline',
      collapsed: true,
      link: {type: 'doc', id: '07-build-first-pipeline/index'},
      items: [
        '07-build-first-pipeline/hands-on-lab',
        '07-build-first-pipeline/genie-code',
      ],
    },
    {type: 'doc', id: '08-query-and-explore', label: '8. Query and explore'},
    {
      type: 'category',
      label: '9. Unified analytics',
      collapsed: false,
      className: 'sidebar-track-da',
      link: {type: 'doc', id: '09-unified-analytics/index'},
      items: [
        {
          type: 'category',
          label: 'Business Semantics',
          collapsed: true,
          link: {type: 'doc', id: '09-unified-analytics/business-semantics/index'},
          items: [
            '09-unified-analytics/business-semantics/lab',
          ],
        },
        {
          type: 'category',
          label: 'Databricks AI/BI',
          collapsed: true,
          items: [
            '09-unified-analytics/databricks-aibi/dashboards',
            {
              type: 'category',
              label: 'Genie Spaces',
              link: {type: 'doc', id: '09-unified-analytics/databricks-aibi/genie-spaces'},
              items: [
                '09-unified-analytics/databricks-aibi/try-a-sample-genie-space',
              ],
            },
            '09-unified-analytics/databricks-aibi/databricks-apps',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '10. Predictive analytics',
      collapsed: true,
      className: 'sidebar-track-ml',
      link: {type: 'doc', id: '10-predictive-analytics/index'},
      items: [
        '10-predictive-analytics/save-model-to-unity-catalog',
        '10-predictive-analytics/batch-inference',
        '10-predictive-analytics/prepare-datasets',
      ],
    },
    {
      type: 'category',
      label: '11. Agents',
      collapsed: true,
      className: 'sidebar-track-ai',
      link: {type: 'doc', id: '11-agents/index'},
      items: [],
    },
    {
      type: 'category',
      label: '12. Orchestration and Jobs',
      collapsed: true,
      link: {type: 'doc', id: '12-orchestration/index'},
      items: [],
    },
    {
      type: 'category',
      label: '13. Data access control',
      collapsed: true,
      link: {type: 'doc', id: '13-data-access-control/index'},
      items: [
        '13-data-access-control/lab',
      ],
    },
    {
      type: 'category',
      label: '14. CI/CD and DevOps',
      collapsed: true,
      link: {type: 'doc', id: '14-ci-cd-devops/index'},
      items: [],
    },
  ],
};

export default sidebars;
