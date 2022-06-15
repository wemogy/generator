/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: '<%= name %> Documentation',
  tagline: '<%= name %>',
  url: 'https://internal.wemogy.com/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: '<%= repoOwner %>', // Usually your GitHub org/user name.
  projectName: '<%= repoName %>', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '<%= name %> Documentation',
      logo: {
        alt: 'wemogy logo',
        src: 'img/logo.svg'
      },
      items: [
        {
          href: 'https://wemogy.com',
          label: 'Website',
          position: 'right'
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
          id: 'general',
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/<%= repoOwner %>/<%= repoName %>/edit/main/',
          remarkPlugins: [require('mdx-mermaid')]
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ],
  plugins: []
};
