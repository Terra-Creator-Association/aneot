import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";

export default hopeTheme({
  hostname: "https://aneot.terrach.net",

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
  sidebar: "structure",

  footer: `本站内容是游戏爱好者根据《明日方舟》二次创作而成，与鹰角网络官方无关。<br>
  本站使用的游戏图片、文本原文及相关设定/世界观版权属于上海鹰角网络科技有限公司。<br>
  除非另有声明，作品其他内容不得以任何形式转载、摘编。<br>
  本刊所有内容不得用于人工智能生成模型训练，包括但不限于个人、科研、教学和商业化应用。
  `,

  copyright: "泰拉创作者联合会保留所有权利 | Copyright © 2022-2023 TCA. All rights reserved.",

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "Word", "ReadingTime", "PageView"],

  themeColor: {
    brown: "#a52a2a",
    grey: "#656565",
    blue: "#4c88f3",
    coral: "#ff7f50",
    purple: "#9400d3"
  },

  blog: {
    description: "泰拉创作者联合会<br>泰拉通讯枢纽<br>《回归线》编辑部",
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
      excerptLength: 0,
    },
    comment: {
      provider: "Waline",
      serverURL: "https://waline.terrach.net/",
      requiredMeta: ['nick'],
      wordLimit: [5, 200],
      imageUploader: false,
      walineLocales: { "/": { admin: "打工人", placeholder: "发一条友善的评论" } },
      emoji: ["https://unpkg.com/@waline/emojis@1.0.1/tw-emoji","https://unpkg.com/@waline/emojis@1.0.1/bilibili"]
    },
    mdEnhance: {
      // enableAll: true,
      attrs: true,
      sub: true,
      sup: true,
      footnote: true,
      align: true,
      // presentation: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },
    },
    feed: {
      atom: true,
      json: true,
      rss: true,
    },
    pwa: {
      cachePic: true,
      maxPicSize: 512,
      showInstall: true,
    },
  },
});
