import { navbar } from "vuepress-theme-hope";
import { getNavBarSource } from "./utils/NavBarHelper";

export default navbar([
  "/",
  {
    text: "期刊",
    icon: "repo",
    prefix: "/posts/",
    children: getNavBarSource()
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
