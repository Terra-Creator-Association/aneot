<template>
    <div>正在载入更新，请稍等</div>
  </template>
  
  <script>
  export default {
    name: 'ForceFlash',
    mounted() {
      if (localStorage.getItem('forceflashReloaded')) {
        localStorage.removeItem('forceflashReloaded');
        this.$router.push('/');
      } else {
        localStorage.setItem('forceflashReloaded', 'true');
        location.reload();
      }
    },
  }
  </script>
  