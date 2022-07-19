import { sidebar } from "vuepress-theme-hope";

export default sidebar([
  "",
  {
    text: "期刊",
    icon: "repo",
    prefix: "posts/",
    children: ["",
      {
        text: "2022年05月号",
        icon: "repo",
        collapsable: true,
        prefix: "2022-05/",
        children: [
          "",
          "article1",
          "article2",
          "article3",
          "article4",
          "article5",
          "article6",
          "article7",
          "article8",
          "article9"],
      },
      {
        text: "2022年06月号",
        icon: "repo",
        collapsable: true,
        prefix: "2022-06/",
        children: [
          "",
          "intro",
          "article1",
          "article2",
          "article3",
          "article4",
          "article5",
          "article6",
          "comic1",
          "paintings"],
      },
      {
        text: "2022年07月号",
        icon: "repo",
        collapsable: true,
        prefix: "2022-07/",
        children: [
          "",
          "intro",
          "article1",
          "article2",
          "article3",
          "article4",
          "article5",
          "comic1",
          "paintings"],
      }
    ],
  },
  "call"
]);
