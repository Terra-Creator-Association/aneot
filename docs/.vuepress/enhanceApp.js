export default ({ router }) => {
    // 路由切换事件处理
    router.beforeEach((to, from, next) => {
    // 检查浏览器是否过旧
    function isOldBrowser() {
      const userAgent = window.navigator.userAgent;

      // 检查是否是 Internet Explorer
      if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
        return true;
      }

      // 检查 Chrome/Chromium 版本
      const chromeMatch = userAgent.match(/Chrome\/(\d+)/);
      if (chromeMatch && Number(chromeMatch[1]) < 64) {
        return true;
      }

      // 检查 Firefox 版本
      const firefoxMatch = userAgent.match(/Firefox\/(\d+)/);
      if (firefoxMatch && Number(firefoxMatch[1]) < 58) {
        return true;
      }

      // 检查 Safari 版本
      const safariMatch = userAgent.match(/Version\/(\d+)/);
      if (safariMatch && Number(safariMatch[1]) < 11) {
        return true;
      }

      // 检查 Edge 版本
      const edgeMatch = userAgent.match(/Edge\/(\d+)/);
      if (edgeMatch && Number(edgeMatch[1]) < 16) {
        return true;
      }

      return false;
    }

    router.beforeEach((to, from, next) => {
      if (isOldBrowser()) {
        alarm('您的浏览器版本过旧，可能无法正常浏览本站。请升级您的浏览器。');
      }
        
        // console.log("切换路由", to.fullPath, from.fullPath);
        //触发百度的pv统计
        if (typeof _hmt != "undefined") {
            if (to.path) {
                _hmt.push(["_trackPageview", to.fullPath]);
                // console.log("上报百度统计", to.fullPath);
            }
        }
        next();
    });

    /*
    router.afterEach((to, from) => {
      if (/micromessenger|qq\//i.test(navigator.userAgent)) {
        router.push({ path: '/BrowserCheck', query: { redirect: to.fullPath } });
      }
    */
  });
};