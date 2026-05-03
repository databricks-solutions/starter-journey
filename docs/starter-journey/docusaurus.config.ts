import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Starter Journey',
  tagline: 'The essential building blocks for organizations starting with Databricks',
  favicon: 'img/icon.ico',

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
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
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
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-QX34J60J8M',
          anonymizeIP: false,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
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
          docId: 'get-started',
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
