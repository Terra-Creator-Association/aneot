<template>
  <div class="ads-container no-print">
    <p class="ads-hint">{{ adText }}<a :href="aboutLink">{{ adAbout }}</a></p>
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
  props: {},
  data() {
    return {
      randomAd: "",
      adLink: "",
      adText: "",
      adAbout: "",
      aboutLink: "",
      ads: {},
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
        this.ads = adsData;
      } catch (error) {
        console.error('Error fetching ads list:', error);
      }
    },
    loadRandomAdAndLink() {
      // 基于ads里的group标记选择广告组，在组内随机选择一个广告
      let cumulativeProbability = 0;
      const groups = Object.keys(this.ads);
      for (let i = 0; i < groups.length; i++) {
        const group = this.ads[groups[i]];
        cumulativeProbability += group.probability || 0;
        if (Math.random() < cumulativeProbability) {
          const selectedGroup = group;
          const randomAd = selectedGroup.files[Math.floor(Math.random() * selectedGroup.files.length)];
          this.randomAd = `/fake-ads/${randomAd}.webp`;
          this.loadAdLink(randomAd);
          return;
        }
      }
    },
    async loadAdLink(randomAd) {
      // 动态设定配置文件，配置文件应当有四行，分别为描述文本，链接描述文本，链接描述地址，广告大图链接
      const response = await fetch(`/fake-ads/${randomAd}.txt`);
      const fileContent = await response.text();
      const lines = fileContent.split('\n');
      this.adText = lines[0] || "";
      this.adAbout = lines[1] || "";
      this.aboutLink = lines[2] || "";
      this.adLink = lines[3] || "";
    },
  },
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
