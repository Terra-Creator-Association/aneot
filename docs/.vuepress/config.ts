import { defineUserConfig } from "vuepress";
import theme from "./theme";
import { path } from 'vuepress/utils';
import { viteBundler } from '@vuepress/bundler-vite';

export default defineUserConfig({
  lang: "zh-CN",
  title: "回归线",
  description: "Another End of Terra",
  base: "/",
  shouldPrefetch: false,
  theme, // 使用主题
  bundler: viteBundler({
    // ... Vite 特定的配置 ...
  }),
  head: [
    ['link', { rel: 'icon', href: '/eod.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#31509d' }], // 主题色
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
    ['link', { rel: 'apple-touch-icon', href: '/icon/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/eod.svg', color: '#FFFFFF' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icon/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#31509d' }], // 磁贴颜色
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://unpkg.com/lxgw-wenkai-screen-webfont@1.6.0/style.css",
      }
    ],
    [
      "script",
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?5a7388e8b9935ce907b84d7147b3a31d";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
      `
    ],
    [      
      'script',
      {
        src: '//instant.page/5.2.0',
        type: 'module',
        integrity: 'sha384-jnZyxPjiipYXnSU0ygqeac2q7CVYMbh84q0uHVRRxEtvFPiQYbXWUorga2aqZJ0z',
      },
      `
        document.addEventListener('DOMContentLoaded', (event) => {
          document.body.setAttribute('data-instant-allow-external-links', '');
          document.body.setAttribute('data-instant-intensity', 'viewport');
        });
      `,
    ],
  ],
  plugins: [],
  alias: {
    '@theme-hope/modules/blog/components/BlogHero': path.resolve(
      __dirname,
      './components/MyBlogHero.vue'
    ),
  },
},
{
  custom: true
});
