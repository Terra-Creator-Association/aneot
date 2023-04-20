<template>
  <div class="ads-container no-print">
    <p class="ads-hint">{{ adText }}<a :href="aboutLink">了解详情</a></p>
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
  props: {/*
      <fake-ads :ads="['filename1', 'filename2']"></fake-ads> 使用此方法限定广告图片内容
      每个图片应该有其对应的txt描述文件，第一行为要显示的提示字样，第二行是详情的详细链接，第三行为图片所指的链接
      */
  },
  data() {
    return {
      randomAd: "",
      adLink: "",
      adText: "",
      aboutLink: "",
      ads: []
    };
  },
  async mounted() {
    await this.fetchAdsList();
    this.loadRandomAdAndLink();
  },
  methods: {
    async fetchAdsList() {
      try {
        const response = await fetch('/fake-ads/ads.json');
        const adsData = await response.json();
        this.ads = adsData.files;
      } catch (error) {
        console.error('Error fetching ads list:', error);
      }
    },
    loadRandomAdAndLink() {
      const randomNumber = this.ads[Math.floor(Math.random() * this.ads.length)];
      this.randomAd = `/fake-ads/${randomNumber}.webp`;
      this.loadAdLink(randomNumber);
    },
    async loadAdLink(randomNumber) {
      const response = await fetch(`/fake-ads/${randomNumber}.txt`);
      const fileContent = await response.text();
      const lines = fileContent.split('\n');
      this.adText = lines[0] || "";
      this.aboutLink = lines[1] || "";
      this.adLink = lines[2] || "";
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
