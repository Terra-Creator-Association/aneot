import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "期刊",
    icon: "repo",
    prefix: "/posts/",
    children: [
      "",
      "2024-09/",
      "2024-12/",
      "2025-03/",
      "2025-06/",
      "2025-08/",
      "2025-11/",
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
    link: "https://icloud.wuyilingwei.com/arktca"
  }
]);
