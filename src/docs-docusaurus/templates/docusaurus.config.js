/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'wemogy',
  tagline: 'Web & Mobile Technology',
  url: 'https://internal.wemogy.com/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'wemogy', // Usually your GitHub org/user name.
  projectName: 'documentation-internal', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Internal Documentation',
      logo: {
        alt: 'wemogy logo',
        src: 'img/logo.svg'
      },
      items: [
        // {
        //   type: 'doc',
        //   docId: 'overview',
        //   position: 'left',
        //   label: 'General'
        // },
        {
          type: 'doc',
          docId: 'overview',
          docsPluginId: 'general',
          position: 'left',
          label: 'General'
        },
        {
          type: 'doc',
          docId: 'overview',
          docsPluginId: 'knowhow',
          position: 'left',
          label: 'Know How'
        },
        {
          type: 'doc',
          docId: 'overview',
          docsPluginId: 'modules',
          position: 'left',
          label: 'Modules'
        },
        {
          type: 'doc',
          docId: 'overview',
          docsPluginId: 'libs',
          position: 'left',
          label: 'Libraries'
        },
        {
          type: 'doc',
          docId: 'overview',
          docsPluginId: 'third-party',
          position: 'left',
          label: 'Third-Party'
        },
        {
          type: 'doc',
          docId: 'overview',
          docsPluginId: 'company',
          position: 'left',
          label: 'Company'
        },
        {
          href: 'https://docs.wemogy.com',
          label: 'Public Documentation',
          position: 'right'
        },
        {
          href: 'https://github.com/wemogy',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Overview',
              to: '/general/overview'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/wemogy'
            }
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/wemogy'
            }
          ]
        }
      ],
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
          editUrl: 'https://github.com/wemogy/documentation-internal/edit/main/'
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/wemogy/documentation-internal/edit/main/blog/'
        },
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
        routeBasePath: 'general',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/wemogy/documentation-internal/edit/main/'
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'knowhow',
        path: 'docs-knowhow',
        routeBasePath: 'knowhow',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/wemogy/documentation-internal/edit/main/'
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'modules',
        path: 'docs-modules',
        routeBasePath: 'modules',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/wemogy/documentation-internal/edit/main/'
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'libs',
        path: 'docs-libs',
        routeBasePath: 'libs',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/wemogy/documentation-internal/edit/main/'
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'company',
        path: 'docs-company',
        routeBasePath: 'company',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/wemogy/documentation-internal/edit/main/'
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'third-party',
        path: 'docs-third-party',
        routeBasePath: 'third-party',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/wemogy/documentation-internal/edit/main/'
      }
    ]
  ]
};
