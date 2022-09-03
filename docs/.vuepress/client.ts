import { defineClientConfig } from "@vuepress/client";
import AdsenseInline from "./components/ArticleAd.vue";

export default defineClientConfig({
    enhance: ({ app, router, siteData }) => {
        app.component("ArticleAd", AdsenseInline);
    },
});
