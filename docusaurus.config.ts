import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import tailwindPlugin from "./plugins/tailwind-config.cjs";

const config: Config = {
  title: 'Encifher',
  tagline: 'Encrypting Bitcoin',
  favicon: 'img/logo.ico',

  // Set the production url of your site here
  url: 'https://encifer.vercel.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    tailwindPlugin,
    [
      "./plugins/blog-plugin",
      {
        id: "blog",
        routeBasePath: "blog",
        path: "./blog",

      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: '/img/twitter_cover.webp',
    metadata: [
      { name: 'keywords', content: 'encifher, bitcoin, encryption, blockchain, fhe' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@encifherio' },
      { name: 'twitter:title', content: 'Bitcoin, but Encrypted' },
      { name: 'twitter:description', content: "Encifher is the world\'s first FHE-enabled confidential execution engine over Bitcoin. It allows the creation of encrypted and trustless Apps on the most economically secure blockchain. By leveraging industry-leading TFHE, Encifher achieves blazing-fast composability between multiple private states. Encifher offers on-chain confidential computation using lattice-based cryptography methods, ensuring post-quantum security. More info can be found here: https://bananahq.notion.site/Encifher-public-2bc108ece90a42109369b414748b6b8a?pvs=4" },
      { name: 'twitter:image', content: 'https://encifher.vercel.app/assets/twitter_cover.webp' },
      {name: 'og:title', content: 'Bitcoin, but Encrypted 🔐'}
    ],
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
