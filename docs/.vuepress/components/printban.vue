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
  
// 更改页面以避免打印
// 获取所有具有“theme-hope-content”类的元素
const contents = document.querySelectorAll('.theme-hope-content');

// 遍历并删除每个元素内的所有子节点
contents.forEach((content) => {
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
});

// 获取具有“theme-hope-content”类的元素
const content = document.querySelector('.theme-hope-content');

// 创建并添加打印限制提示
const printBlock = document.createElement('div');
printBlock.classList.add('print-block');
printBlock.textContent = '对不起，您的打印请求已被网站策略禁止。';

// 添加内容限制说明链接
const link = document.createElement('a');
link.setAttribute('href', '/bulletin/access_limit.html#关于网页');
link.textContent = '《关于内容限制》';

// 将链接添加到提示中
printBlock.appendChild(link);

// 将提示添加到内容元素中
content.appendChild(printBlock);

// 创建并添加继续浏览按钮
const refreshButton = document.createElement('button');
refreshButton.textContent = '点击我继续浏览';
refreshButton.addEventListener('click', () => {
  location.reload();
});
printBlock.appendChild(refreshButton);

        // 显示提示
        const result = confirm('对不起，该网页不允许打印。\n为了保护作者权益，您的访问已被禁止。\n是否重新加载页面以继续浏览？');
  
        if (result) {
          // 点击确定时重载页面
          window.location.reload();
          // 弹出限制网页
          window.open('bulletin/access_limit#关于网页', '_blank');
        }
      };
  
      // 禁用打印功能
      window.addEventListener('keydown', (event) => {
        // 屏蔽 Ctrl + P 快捷键
        if (event.ctrlKey && event.keyCode === 80) {
          event.preventDefault();
          event.stopPropagation();
  
// 更改页面以避免打印
// 获取所有具有“theme-hope-content”类的元素
const contents = document.querySelectorAll('.theme-hope-content');

// 遍历并删除每个元素内的所有子节点
contents.forEach((content) => {
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
});

// 获取具有“theme-hope-content”类的元素
const content = document.querySelector('.theme-hope-content');

// 创建并添加打印限制提示
const printBlock = document.createElement('div');
printBlock.classList.add('print-block');
printBlock.textContent = '对不起，您的打印请求已被网站管理员禁止。';

// 添加内容限制说明链接
const link = document.createElement('a');
link.setAttribute('href', '/bulletin/access_limit.html#关于网页');
link.textContent = '《关于内容限制》';

// 将链接添加到提示中
printBlock.appendChild(link);

// 将提示添加到内容元素中
content.appendChild(printBlock);

// 创建并添加继续浏览按钮
const refreshButton = document.createElement('button');
refreshButton.textContent = '点击我继续浏览';
refreshButton.addEventListener('click', () => {
  location.reload();
});
printBlock.appendChild(refreshButton);
          
          // 显示提示
          const result = confirm('对不起，该网页不允许打印。\n为了保护作者权益，您的访问已被禁止。\n是否重新加载页面以继续浏览？');
  
          if (result) {
            // 点击确定时重载页面
            window.location.reload();
            // 弹出限制网页
            window.open('/bulletin/access_limit.html#关于网页', '_blank');
          }
        }
      });
    },
  };
  </script>
  