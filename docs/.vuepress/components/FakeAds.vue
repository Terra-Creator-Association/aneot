<template>
  <div class="ads-container no-print">
    <p class="ads-hint">此处可能展示泰拉广告。<a href="/about-fake-ads">了解详情</a></p>
    <div class="image-container">
      <a :href="adLink" target="_blank" rel="noopener noreferrer">
        <img :src="randomAd" alt="Advertisement" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "FakeAds",
  props: {
    ads: {
      type: Array,
      // 此处存储的是广告图片的文件名，最好使用数字
      default: () => [1, 2, 3, 4]
      /*
      <fake-ads :ads="[2, 4]"></fake-ads> 使用此方法限定广告图片
      */
    }
  },
  data() {
    return {
      randomAd: "",
      adLink: "https://www.bilibili.com/video/BV1GJ411x7h7/"
    };
  },
  mounted() {
    this.loadRandomAd();
  },
  methods: {
    loadRandomAd() {
      const randomNumber = this.ads[Math.floor(Math.random() * this.ads.length)];
      this.randomAd = `/fake-ads/${randomNumber}.webp`;
    }
  }
};
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
.image-container {
  display: block;
  text-align: center;
  width: 100%;
}
@media print {
  .no-print {
    display: none !important;
  }
}
</style>
