<template>
    <div></div>
  </template>
  
  <script>
  export default {
    mounted() {
      window.onbeforeprint = (event) => {
        // 阻止打印事件默认行为
        event.preventDefault();
  
        // 弹出警告框
        const result = confirm('警告：受限于版权限制，部分内容在打印中不可用 \n 是否查看关于页面？');
  
         if (result) {
         // 点击确定时打开关于页面
         window.open('/bulletin/access_limit.html#关于网页', '_blank');
        }

      };
    },
  };
  </script>
  