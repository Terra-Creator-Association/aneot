import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "期刊",
    icon: "repo",
    prefix: "/posts/",
    children: [
      "",
      "2023-08/",
      "2023-09/",
      "2023-10/",
      "2023-12/",
      "2024-02/",
      "2024-03/",
    ],
  },
  {
    text: "《回归线》PDF下载",
    icon: "storage",
    link: "https://aneotpan.wuyilingwei.com"
  },
  {
    text: "关于我们",
    icon: "creative",
    prefix: "/",
    children: [
      "bulletin/",
      "description",
      "call",
      "intro",
      "statement",
    ]
  },
  {
    text: "泰讯枢纽",
    icon: "link",
    link: "https://terrach.net/"
  }
]);
