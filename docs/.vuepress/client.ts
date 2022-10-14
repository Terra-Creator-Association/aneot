import { defineClientConfig } from "@vuepress/client";
import AdsenseInline from "./components/ArticleAd.vue";
import eod from "./components/eod.vue";

export default defineClientConfig({
    enhance: ({ app, router, siteData }) => {
        app.component("ArticleAd", AdsenseInline)
        .component("eod", eod);
    },
});
