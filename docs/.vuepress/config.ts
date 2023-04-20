import { defineUserConfig } from "@vuepress/core";
import { searchPlugin } from "@vuepress/plugin-search";
import theme from "./theme";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { path } from "@vuepress/utils";

// 导入生成广告 JSON 的脚本
const generateAdsJson = require('./generateAdsJson.js');

export default defineUserConfig({
  lang: "zh-CN",
  title: "回归线",
  description: "Another End of Terra",
  base: "/",
  shouldPrefetch: false,
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://unpkg.com/lxgw-wenkai-screen-webfont@1.6.0/style.css",
      },
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
      `,
    ],
    [
      "script",
      {
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3488523212284726",
        crossorigin: "anonymous",
        async: "async",
      },
      "",
    ],
  ],

  theme,

  plugins: [
    searchPlugin({
      locales: {
        "/": { placeholder: "搜索..." },
      },
      hotKeys: [""],
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
  ],
  alias: {
    "@theme-hope/modules/blog/components/BlogHero": path.resolve(
      __dirname,
      "./components/MyBlogHero.vue"
    ),
  },
  // 在构建前生成广告 JSON
  chainWebpack: (config, isServer) => {
    if (!isServer) {
      config.plugin("before-build").use(
        new (class BeforeBuildPlugin {
          apply(compiler) {
            compiler.hooks.beforeCompile.tapAsync("BeforeBuildPlugin", (params, callback) => {
              generateAdsJson();
              callback();
            });
          }
        })()
      );
    }
  },
});
