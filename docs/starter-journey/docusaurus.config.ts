import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Starter Journey',
  tagline: 'Go from an empty Databricks account to a production-ready setup, one step at a time.',
  favicon: 'img/databricks-logo-orange.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here.
  url: 'https://databricks-solutions.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/starter-journey/',

  // GitHub pages deployment config
  organizationName: 'databricks-solutions',
  projectName: 'starter-journey',

  onBrokenLinks: 'throw',

  // Load before preset client modules so window.gtag exists when the gtag
  // plugin fires on client-side navigations (blocked scripts / race conditions).
  clientModules: [require.resolve('./src/clientModules/gtag-shim.ts')],

  plugins: [
    [
      require.resolve('docusaurus-plugin-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        searchResultLimits: 15,
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          ...['aws', 'azure', 'gcp'].flatMap((c) => [
            {
              from: `/docs/02-account-workspaces/create-workspaces/${c}/manual`,
              to: `/docs/02-account-workspaces/create-workspaces/${c}/serverless`,
            },
            {
              from: `/docs/02-account-workspaces/create-workspaces/${c}/terraform`,
              to: `/docs/02-account-workspaces/create-workspaces/${c}/classic`,
            },
            {
              from: `/docs/02-account-workspaces/create-workspaces/${c}/sra`,
              to: `/docs/02-account-workspaces/create-workspaces/${c}/private-link`,
            },
          ]),
          {
            from: '/docs/05-genie-ontology/business-semantics',
            to: '/docs/05-genie-ontology/metric-views',
          },
          {
            from: '/docs/05-genie-ontology/business-semantics/lab',
            to: '/docs/05-genie-ontology/metric-views',
          },
          {
            from: '/docs/05-genie-ontology/databricks-aibi/dashboards',
            to: '/docs/05-genie-ontology/dashboards',
          },
          {
            from: '/docs/05-genie-ontology/databricks-aibi/genie-agents',
            to: '/docs/05-genie-ontology/genie-agents',
          },
          {
            from: '/docs/05-genie-ontology/databricks-aibi/try-a-sample-genie-agent',
            to: '/docs/05-genie-ontology/genie-agents',
          },
          {
            from: '/docs/05-genie-ontology/databricks-aibi/databricks-apps',
            to: '/docs/05-genie-ontology/',
          },
          {
            from: '/docs/05-genie-ontology/databricks-aibi/genie-spaces',
            to: '/docs/05-genie-ontology/genie-agents',
          },
          {
            from: '/docs/05-genie-ontology/databricks-aibi/try-a-sample-genie-space',
            to: '/docs/05-genie-ontology/genie-agents',
          },
        ],
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          numberPrefixParser: false,
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: [
            './src/css/custom.css',
            './src/css/journey-progress-tokens.css',
          ],
        },
        gtag: {
          trackingID: 'G-QX34J60J8M',
          anonymizeIP: false,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/starter-journey-social-card.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: false,
      disableSwitch: false,
    },
    navbar: {
      title: 'Starter Journey',
      logo: {
        alt: 'Starter Journey Logo',
        src: 'img/databricks.ico',
      },
      items: [
        {
          type: 'doc',
          docId: '01-introduction/index',
          position: 'left',
          label: 'Get Started',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/databricks-solutions/starter-journey',
          label: 'GitHub',
          position: 'right',
          className: 'navbar-item-github',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Databricks Industry Solutions`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
