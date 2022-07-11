import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default hopeTheme({
  hostname: "https://aneot.vercel.app",

  author: {
    name: "Another End of Terra",
    url: "https://space.bilibili.com/1317574696/",
  },

  iconAssets: "iconfont",

  logo: "/logo.svg",

  // repo: "Nemo1166/aneot",
  lastUpdated: false,
  contributors: false,
  editLink: false,

  docsDir: "docs",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: "本页作品由作者原创，请勿转载。",

  copyright: "泰拉创作者联合会保留所有权利 | Copyright © 2022 TCA",

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  themeColor: {
    brown: "#a52a2a",
    grey: "#656565",
    blue: "#4c88f3",
    coral: "#ff7f50",
    purple: "#9400d3"
  },

  blog: {
    description: "泰拉创作者联合会<br>泰拉通讯枢纽<br>杜兰兹移动大学<br>《回归线》编辑部",
    intro: "/intro.html",
    medias: {
      // Baidu: "https://example.com",
      // Bitbucket: "https://example.com",
      // Dingding: "https://example.com",
      // Discord: "https://example.com",
      // Dribbble: "https://example.com",
      Email: "TCA_doc@163.com",
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

  encrypt: {
    config: {
      // "/guide/encrypt.html": ["1234"],
    },
  },

  plugins: {
    blog: {
      autoExcerpt: false,
    },
    comment: {
      provider: "Waline",
      serverURL: "https://waline-nemo1166.vercel.app/",
      requiredMeta: ['nick'],
      wordLimit: 200,
      imageUploader: false,
      walineLocales: { "/": { admin: "砖", } }
    },
    mdEnhance: {
      // enableAll: true,
      attrs: true,
      sub: true,
      sup: true,
      // presentation: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },
    },
    feed: {
      rss: true,
    },
    pwa: {
      cachePic: true,
      maxPicSize: 100,
    },
  },
});
