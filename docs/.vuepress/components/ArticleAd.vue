<template>
  <div class="ads-container no-print">
    <p class="ads-hint">此处可能展示赞助商广告。<a href="/about-ads">了解详情</a></p>
    <ins
      class="adsbygoogle"
      style="display: block; text-align: center; width:100%"
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-3488523212284726"
      data-ad-slot="6701959665"
    ></ins>
  </div>
</template>

<script>
export default {
  name: "AdsenseInline",
  mounted() {
    this.adsenseAddLoad();
  },
  methods: {
    adsenseAddLoad() {
      let inlineScript = document.createElement("script");
      inlineScript.type = "text/javascript";
      inlineScript.text = '(adsbygoogle = window.adsbygoogle || []).push({});'
      document.getElementsByTagName('body')[0].appendChild(inlineScript);
    }
  }
}
</script>

<style scoped>
.ads-hint {
  text-align: right;
  margin: 10px;
  font-size: 9px;
  font-style: italic;
}
.ads-container {
  text-align: center;
  margin-top: 75px;
  min-width: 250px;
  min-height: 50px;
}

@media print {
  .no-print {
    display: none !important;
  }
}
</style>
