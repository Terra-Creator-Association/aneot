<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'refresh',

  mounted() {
    // 检查是否需要刷新
    if (!window.location.hash.includes('refreshed')) {
      window.location.href = window.location.href.split('#')[0] + '#refreshed';
      window.location.reload();
    }
  }
};
</script>
