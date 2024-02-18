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

  // print button
  print:false,

  //enable full screen button
  fullscreen: true,

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
  除非另有声明，作品其他内容不得以<b>任何形式转载、摘编。</b><br>
  本刊所有内容<b>不得</b>用于人工智能生成模型训练，<b>包括但不限于个人、科研、教学和商业化应用。</b><br>
  完整协议请查看<a href="/statement.html" target="_blank"> 《回归线网站用户协议》</a>，使用本站即视为同意本协议。
  `,

  copyright: "泰拉创作者联合会保留所有权利 | Copyright © 2022-2024 TCA. All rights reserved.",

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "Word", "ReadingTime", "PageView"],

  blog: {
    description: "泰拉创作者联合会<br>泰拉通讯枢纽<br>《回归线》编辑部",
    intro: "/intro.html",
    medias: {
      // Baidu: "https://example.com",
      Bilibili: "https://space.bilibili.com/1317574696/",
      // Bitbucket: "https://example.com",
      // Dingding: "https://example.com",
      // Discord: "https://example.com",
      // Dribbble: "https://example.com",
      Email: "mailto:TCA_doc@163.com",
      // Evernote: "https://example.com",
      // Facebook: "https://example.com",
      // Flipboard: "https://example.com",
      // Gitee: "https://example.com",
      GitHub: "https://github.com/TCA-Arknights",
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
      // Rss: "https://aneot.terrach.net/rss.xml",
      // Steam: "https://example.com",
      // Twitter: "https://example.com",
      // Wechat: "https://example.com",
      Weibo: "https://weibo.com/u/7414874331",
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
    searchPro: {
      // 这里放置 searchProPlugin 的配置
      customFields: [
        {
          getter: (page) => page.frontmatter.author,
          formatter: "作者：$content",
        },
        {
          getter: (page) => page.frontmatter.category,
          formatter: "分类：$content",
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: "标签：$content",
        },
      ],
    },
    comment: {
      provider: "Waline",
      serverURL: "https://waline.terrach.net/",
      requiredMeta: ['nick'],
      wordLimit: [5, 200],
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
      devServer: true, // 启用在开发环境中预览 Feed 的功能
    },
    pwa: {
      cachePic: true,
      cacheHTML: true,
      maxSize: 2048,
      maxPicSize: 1024,
      update: "force",
    },
  },
},
{
  custom: true
});
