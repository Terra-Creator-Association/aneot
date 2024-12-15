import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "期刊",
    icon: "repo",
    prefix: "/posts/",
    children: [
      "",
      "2024-02/",
      "2024-03/",
      "2024-04/",
      "2024-07/",
      "2024-09/",
      "2024-12/",
    ],
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
    text: "下载",
    icon: "storage",
    link: "https://pan.arktca.com"
  },
  {
    text: "泰讯枢纽",
    icon: "link",
    link: "https://terrach.net/"
  }
]);
