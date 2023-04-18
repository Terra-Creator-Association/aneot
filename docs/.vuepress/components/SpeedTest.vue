<template>
    <div>
      <h1>网站测速</h1>
      <table>
        <thead>
          <tr>
            <th>网站</th>
            <th>响应时间 (ms)</th>
            <th>下载速度 (KB/s)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="result in results" :key="result.url">
            <td>{{ result.url }}</td>
            <td>{{ result.pingTime }}</td>
            <td>{{ result.downloadSpeed }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        results: [],
        urls: [
          "https://raw.fastgit.org/yige-yigeren/aneot-alpha/main/docs/.vuepress/public/downloadtest.webp",
          "https://github.nite07.com/yige-yigeren/aneot-alpha/raw/main/docs/.vuepress/public/downloadtest.webp",
          "https://raw.githubusercontent.com/yige-yigeren/aneot-alpha/main/docs/.vuepress/public/downloadtest.webp",
        ],
        expectedMd5: "abb10b6be4d153b414ad4104e1cbfcc6",
        fileSize: 12490, // 文件大小，单位是字节
      };
    },
    methods: {
      async runTest() {
        this.results = [];
        for (const url of this.urls) {
          const result = await this.testUrl(url);
          this.results.push(result);
        }
      },
      async testUrl(url) {
        const startPing = Date.now();
        const pingResult = await this.ping(url);
        const pingTime = Date.now() - startPing;
  
        const startDownload = Date.now();
        const downloadResult = await this.download(url);
        const downloadTime = Date.now() - startDownload;
        const downloadSpeed = downloadResult.size / downloadTime / 1024; // 转换为 KB/s
  
        return {
          url,
          pingTime,
          downloadSpeed: downloadSpeed.toFixed(2),
          status: downloadResult.md5 === this.expectedMd5 ? "正常" : "错误",
          message: downloadResult.message,
        };
      },
      async ping(url) {
        try {
          const response = await fetch(url, { mode: "no-cors" });
          return { success: response.ok };
        } catch (e) {
          return { success: false };
        }
      },
      async download(url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const md5 = await this.calculateMd5(arrayBuffer);
        const size = arrayBuffer.byteLength;
        if (md5 === this.expectedMd5) {
          return { success: true, md5, size };
        } else {
          return { success: false, md5, size, message: "MD5 校验失败" };
        }
      },
      async calculateMd5(arrayBuffer) {
        const data = new Uint8Array(arrayBuffer);
        const digest = await crypto.subtle.digest("MD5", data);
        return Array.from(new Uint8Array(digest))
          .map((b) => b.toString(16).padStart(2, "0"))
.join("");
},
},
mounted() {
this.runTest();
},
};
</script>

<style>
table {
  border-collapse: collapse;
}

th,
td {
  padding: 0.5rem;
  border: 1px solid #ccc;
}

th {
  background-color: #eee;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
  