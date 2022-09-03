<template>
  <div class="container">
    <ins
      class="adsbygoogle"
      style="display: block; text-align: center"
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