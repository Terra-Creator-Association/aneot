<template>
  <span><img class="eod-image" src="/eod.png" /></span>
</template>

<script>
export default {
  name: "eod",
}
</script>

<style>
.eod-image {
  /* 正常模式下的样式 */
}

/* 暗色模式下自动反色 */
@media (prefers-color-scheme: dark) {
  .eod-image {
    filter: invert(100%);
  }
}
</style>
