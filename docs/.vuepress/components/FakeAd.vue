<template>
  <div class="FakeAd"></div>
</template>

// 该片段用于泰拉广告随机播放，尚未完工，这里是草稿
<template>
  <div class="ads-container">
    <p class="ads-hint">此处可能展示泰拉广告。<a href="/about-fake-ads">了解详情</a></p>
  </div>
</template>

<script language=javascript>
id=Math.round(Math.random()*2)+1
document.write(".\docs\.vuepress\fake-ads\<img src="+id+".webp>")
document.write("<a href="https://www.bilibili.com/video/BV1GJ411x7h7/">"+".\docs\.vuepress\fake-ads\<img src="+id+".webp>")
</script>
