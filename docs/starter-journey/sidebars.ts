import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: '1. Introduction',
      collapsed: true,
      link: {type: 'doc', id: '01-introduction/index'},
      items: [
        {
          type: 'category',
          label: 'Foundations',
          link: {type: 'doc', id: '01-introduction/foundations/index'},
          items: [
            '01-introduction/foundations/account-console',
            '01-introduction/foundations/workspace',
            '01-introduction/foundations/unity-catalog',
            '01-introduction/foundations/recap-and-learning',
          ],
        },
        {
          type: 'category',
          label: 'Cloud tenant ready',
          link: {type: 'doc', id: '01-introduction/cloud-tenant-ready/index'},
          items: [
            '01-introduction/cloud-tenant-ready/single-tenant-setup',
            '01-introduction/cloud-tenant-ready/multi-tenant-setup',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '2. Account and workspaces',
      collapsed: true,
      link: {type: 'doc', id: '02-account-workspaces/index'},
      items: [
        {
          type: 'category',
          label: 'Create workspaces',
          link: {type: 'doc', id: '02-account-workspaces/create-workspaces/index'},
          items: [
            {
              type: 'category',
              label: 'AWS',
              collapsed: true,
              items: [
                '02-account-workspaces/create-workspaces/aws/serverless',
                '02-account-workspaces/create-workspaces/aws/classic',
                '02-account-workspaces/create-workspaces/aws/private-link',
              ],
            },
            {
              type: 'category',
              label: 'Azure',
              collapsed: true,
              items: [
                '02-account-workspaces/create-workspaces/azure/serverless',
                '02-account-workspaces/create-workspaces/azure/classic',
                '02-account-workspaces/create-workspaces/azure/private-link',
              ],
            },
            {
              type: 'category',
              label: 'GCP',
              collapsed: true,
              items: [
                '02-account-workspaces/create-workspaces/gcp/serverless',
                '02-account-workspaces/create-workspaces/gcp/classic',
                '02-account-workspaces/create-workspaces/gcp/private-link',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Add users',
          collapsed: true,
          items: [
            '02-account-workspaces/add-users/manual',
            '02-account-workspaces/add-users/scim',
          ],
        },
        {
          type: 'category',
          label: 'Add groups',
          collapsed: true,
          items: [
            '02-account-workspaces/add-groups/manual',
            '02-account-workspaces/add-groups/scim',
          ],
        },
        {type: 'doc', id: '02-account-workspaces/metastore-admins/set-admin-group', label: 'Set admin group'},
        {type: 'doc', id: '02-account-workspaces/activate-sso', label: 'SSO'},
        {
          type: 'category',
          label: 'Workspace settings',
          items: [
            {
              type: 'category',
              label: 'Cost monitoring',
              link: {type: 'doc', id: '02-account-workspaces/workspace-settings/cost-monitoring/index'},
              items: [
                '02-account-workspaces/workspace-settings/cost-monitoring/import-usage-dashboard',
                '02-account-workspaces/workspace-settings/cost-monitoring/additional-dashboards',
                '02-account-workspaces/workspace-settings/cost-monitoring/tag-compute-and-jobs',
                '02-account-workspaces/workspace-settings/cost-monitoring/budget-alerts',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '3. Data access and ETL',
      collapsed: true,
      link: {type: 'doc', id: '03-data-access-etl/index'},
      items: [
        {
          type: 'category',
          label: 'Cloud object storage',
          link: {type: 'doc', id: '03-data-access-etl/cloud-object-storage/index'},
          items: [
            '03-data-access-etl/cloud-object-storage/aws',
            '03-data-access-etl/cloud-object-storage/azure',
            '03-data-access-etl/cloud-object-storage/gcp',
          ],
        },
        {
          type: 'category',
          label: 'Databases and SaaS ingestion',
          link: {type: 'doc', id: '03-data-access-etl/managed-connectors/index'},
          items: [
            '03-data-access-etl/managed-connectors/cdc',
            '03-data-access-etl/managed-connectors/query-based',
            '03-data-access-etl/managed-connectors/dabs-definition',
          ],
        },
        {type: 'doc', id: '03-data-access-etl/build-first-pipeline/index', label: 'Build the first ETL pipeline'},
        {type: 'doc', id: '03-data-access-etl/query-and-explore', label: 'Query and explore'},
        {type: 'doc', id: '03-data-access-etl/orchestration/index', label: 'Orchestration and Jobs'},
      ],
    },
    {
      type: 'category',
      label: '4. Governance',
      collapsed: true,
      link: {type: 'doc', id: '04-governance/index'},
      items: [
        '04-governance/groups',
        '04-governance/uc-assets-ownership',
        '04-governance/small-organizations',
        '04-governance/medium-large-organizations',
        {type: 'doc', id: '04-governance/unity-catalog-setup', label: 'Unity Catalog Setup'},
        {
          type: 'category',
          label: 'ABAC',
          link: {type: 'doc', id: '04-governance/abac/index'},
          items: ['04-governance/abac/lab'],
        },
      ],
    },
    {
      type: 'category',
      label: '5. Genie Ontology',
      collapsed: true,
      link: {type: 'doc', id: '05-genie-ontology/index'},
      items: [
        {type: 'doc', id: '05-genie-ontology/metadata-generation', label: 'Metadata Generation'},
        {type: 'doc', id: '05-genie-ontology/metric-views', label: 'Metric Views'},
        {type: 'doc', id: '05-genie-ontology/dashboards', label: 'Dashboards'},
        {type: 'doc', id: '05-genie-ontology/genie-agents', label: 'Genie Agents'},
        {type: 'doc', id: '05-genie-ontology/domains-subdomains-pages', label: 'Domains, subdomains, and pages'},
      ],
    },
    {
      type: 'category',
      label: '6. Data science',
      collapsed: true,
      link: {type: 'doc', id: '06-data-science/index'},
      items: [
        '06-data-science/save-model-to-unity-catalog',
        '06-data-science/batch-inference',
        '06-data-science/prepare-datasets',
      ],
    },
    {
      type: 'category',
      label: '7. Operations',
      collapsed: true,
      link: {type: 'doc', id: '07-operations/index'},
      items: [],
    },
  ],
};

export default sidebars;

