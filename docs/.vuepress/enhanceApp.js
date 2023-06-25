export default ({ router }) => {
    // 路由切换事件处理
    router.beforeEach((to, from, next) => {
        // 检查浏览器版本，如果过旧就重定向到兼容版网站
        // 你可能需要根据你的需求来更改这个条件
        if (!('fetch' in window)) {
            if (confirm('你的浏览器版本可能过旧。是否要跳转到我们的兼容版网站以获取最佳体验？')) {
              window.location.href = 'https://old.aneot.terrach.net' + to.fullPath;
              return;
            }
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
    });
    */
  };
  

