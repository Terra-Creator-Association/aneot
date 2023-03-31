export default ({ router, Vue }) => {
    // 添加一个全局的混入
    Vue.mixin({
      mounted() {
        // 创建一个div元素
        const watermark = document.createElement('div');
        // 设置div元素的样式
        watermark.style.position = 'fixed';
        watermark.style.zIndex = 9999;
        watermark.style.pointerEvents = 'none';
        watermark.style.opacity = '0.2'; // 设置水印透明度
        watermark.style.top = 0;
        watermark.style.left = 0;
        watermark.style.width = '100%';
        watermark.style.height = '100%';
        // 创建一个img元素，并设置img元素的src属性
        const img = document.createElement('img');
        img.src = '/assets/watermark.png'; // 设置水印图片的路径
        img.style.position = 'absolute';
        img.style.top = '50%';
        img.style.left = '50%';
        img.style.transform = 'translate(-50%, -50%)';
        img.style.width = '300px'; // 设置水印图片的宽度
        img.style.height = '300px'; // 设置水印图片的高度
        // 将img元素添加到div元素中
        watermark.appendChild(img);
        // 将div元素添加到文档中
        document.body.appendChild(watermark);
      }
    });
  
    // 路由切换事件处理
    router.beforeEach((to, from, next) => {
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
  };
  