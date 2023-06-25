<template>
  <div>
    <p>你的浏览器版本可能过旧。你想要跳转到我们的兼容版网站以获取最佳体验吗？</p>
    <button @click="goToOldSite">是，我要跳转</button>
    <button @click="stayHere">不，我要留在这里</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToOldSite() {
      window.location.href = 'https://old.your-website.com' + this.$route.query.redirect;
    },
    stayHere() {
      this.$router.push(this.$route.query.redirect);
    }
  }
}
</script>
