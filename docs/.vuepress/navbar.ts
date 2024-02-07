import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "期刊",
    icon: "repo",
    prefix: "/posts/",
    children: [
      "",
      "2023-07/",
      "2023-08/",
      "2023-09/",
      "2023-10/",
      "2023-12/",
      "2024-01/",
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
    text: "泰讯枢纽",
    icon: "link",
    link: "https://terrach.net/"
  }
]);
