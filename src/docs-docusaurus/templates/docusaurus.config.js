/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: '<%= name %> Documentation',
  tagline: '<%= name %>',
  url: 'https://<%= url %>/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: '<%= repoOwner %>', // Usually your GitHub org/user name.
  projectName: '<%= repoName %>', // Usually your repo name.
  markdown: {
    mermaid: true
  },
  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        docsRouteBasePath: '/'
      })
    ]
  ],
  themeConfig: {
    navbar: {
      title: '<%= name %> Documentation',
      logo: {
        alt: 'wemogy logo',
        src: 'img/logo.svg'
      },
      items: [
        {
          type: 'doc',
          docId: 'overview',
          docsPluginId: 'general',
          position: 'left',
          label: 'General'
        },
        {
          href: 'https://github.com/<%= repoOwner %>/<%= repoName %>',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} wemogy GmbH.`
    },
    prism: {
      //theme: require('prism-react-renderer/themes/dracula'),
      // Check here: https://prismjs.com/#supported-languages
      additionalLanguages: ['csharp', 'hcl']
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/<%= repoOwner %>/<%= repoName %>/edit/main/',
          remarkPlugins: []
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'general',
        path: 'docs-general',
        routeBasePath: '/',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/<%= repoOwner %>/<%= repoName %>/edit/main/'
      }
    ]
  ]
};
