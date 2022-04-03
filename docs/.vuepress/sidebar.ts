import { defineSidebarConfig } from "vuepress-theme-hope";

export default defineSidebarConfig([
  "",
  {
    text: "文章",
    icon: "repo",
    prefix: "posts/",
    children: [
      {
        text: "2022年05月号",
        icon: "repo",
        collapsable: true,
        prefix: "2022-05/",
        children: ["intro",
          "article1",
          "article2",
          "article3",
          "article4"],
      },
    ],
  },
]);
