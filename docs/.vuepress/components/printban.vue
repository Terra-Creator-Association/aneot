<template>
    <div></div>
  </template>
  
  <style>
.print-block {
  color: red;
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
}
</style>

  <script>
  export default {
    mounted() {
      // 检测打印事件
      window.onbeforeprint = (event) => {
        // 阻止打印事件默认行为
        event.preventDefault();
  
        // 删除所有界面元素
        document.body.innerHTML = '';

        // 添加提示信息
        const printBlock = document.createElement('div');
        printBlock.classList.add('print-block');
        printBlock.textContent = '对不起，您的打印已被网站管理员禁止。';
        document.body.appendChild(printBlock);

        //添加内容限制说明
        const link = document.createElement('a');
        link.setAttribute('href', '/limit.html#关于网页');
        link.textContent = '关于内容限制的说明';
        printBlock.appendChild(link);

        // 显示提示
        const result = confirm('对不起，该网页不允许打印。\n为了保护作者权益，您的访问已被禁止。\n是否重新加载页面以继续浏览？');
  
        if (result) {
          // 点击确定时重载页面
          window.location.reload();
          // 弹出限制网页
          window.open('/limit#关于网页', '_blank');
        }
      };
  
      // 禁用打印功能
      window.addEventListener('keydown', (event) => {
        // 屏蔽 Ctrl + P 快捷键
        if (event.ctrlKey && event.keyCode === 80) {
          event.preventDefault();
          event.stopPropagation();
  
          // 删除所有界面元素
          document.body.innerHTML = '';
  
          // 添加提示信息
          const printBlock = document.createElement('div');
          printBlock.classList.add('print-block');
          printBlock.textContent = '对不起，您的打印已被网站管理员禁止。';
          document.body.appendChild(printBlock);

          //添加内容限制说明
          const link = document.createElement('a');
          link.setAttribute('href', '/limit.html#关于网页');
          link.textContent = '关于内容限制的说明';
          printBlock.appendChild(link);
          
          // 显示提示
          const result = confirm('对不起，该网页不允许打印。\n为了保护作者权益，您的访问已被禁止。\n是否重新加载页面以继续浏览？');
  
          if (result) {
            // 点击确定时重载页面
            window.location.reload();
            // 弹出限制网页
            window.open('/limit#关于网页', '_blank');
          }
        }
      });
    },
  };
  </script>
  