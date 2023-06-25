---
icon: info
title: 浏览器版本检查
date: 2022-05-15
article: false
index: false
---

我们检测到你可能正在使用一个较旧版本的浏览器或者在微信、QQ内置浏览器中访问本站。我们建议你在系统默认的浏览器中打开，以获得最佳的浏览体验。

<div id="browser-check">
  <p>你可以选择：</p>
  <button @click="goToOldSite">跳转到兼容版本网站</button>
  <button @click="stayHere">继续访问</button>
</div>

<script>
new Vue({
  el: '#browser-check',
  methods: {
    goToOldSite() {
      const redirectUrl = this.$route.query.redirect || '/';
      window.location.href = `https://old.aneot.terrach.net${redirectUrl}`;
    },
    stayHere() {
      const redirectUrl = this.$route.query.redirect || '/';
      this.$router.push(redirectUrl);
    }
  }
});
</script>
