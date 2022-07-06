import { defineThemeConfig } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default defineThemeConfig({
  hostname: "https://aneot.vercel.app",
  author: {
    name: "Another End of Terra",
  },
  iconPrefix: "iconfont icon-",
  logo: "/logo.svg",
  editLink: false,
  contributors: false,
  lastUpdated: false,
  docsDir: "docs",
  // navbar
  navbar: navbar,
  // sidebar
  sidebar: sidebar,
  footer: "本页作品由作者原创，请勿转载。",
  displayFooter: true,
  copyright: "泰拉创作者联合会保留所有权利 | Copyright © 2022 TCA",
  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime","Word"],

  blog: {
    description: "泰拉创作者联合会<br>泰拉通讯枢纽<br>杜兰兹移动大学<br>《回归线》编辑部",
    intro: "/intro.html",
    medias: {
      // Baidu: "https://example.com",
      // Bitbucket: "https://example.com",
      // Dingding: "https://example.com",
      // Discord: "https://example.com",
      // Dribbble: "https://example.com",
      // Email: "https://example.com",
      // Evernote: "https://example.com",
      // Facebook: "https://example.com",
      // Flipboard: "https://example.com",
      // Gitee: "https://example.com",
      // GitHub: "https://example.com",
      // Gitlab: "https://example.com",
      // Gmail: "https://example.com",
      // Instagram: "https://example.com",
      // Lines: "https://example.com",
      // Linkedin: "https://example.com",
      // Pinterest: "https://example.com",
      // Pocket: "https://example.com",
      // QQ: "https://example.com",
      // Qzone: "https://example.com",
      // Reddit: "https://example.com",
      // Rss: "https://example.com",
      // Steam: "https://example.com",
      // Twitter: "https://example.com",
      // Wechat: "https://example.com",
      // Weibo: "https://example.com",
      // Whatsapp: "https://example.com",
      // Youtube: "https://example.com",
      // Zhihu: "https://example.com",
    },
  },
  themeColor: {
    green: "#7b8b6f",
    grey: "#656565",
    darkblue: "#8696a7",
    red: "#965454",
    purple: "#c9c0d3"
  },
  encrypt: {
    config: {

    },
  },

  plugins: {
    blog: {
      autoExcerpt: false,
    },
    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
    pwa: true,

  },
});
