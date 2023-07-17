<template>
    <div>正在载入更新，请稍等</div>
  </template>
  
  <script>
  export default {
    name: 'ForceFlash',
    mounted() {
      if (localStorage.getItem('forceflashReloaded')) {
        localStorage.removeItem('forceflashReloaded');
        if ('caches' in window) {
          caches.keys()
            .then(function(keyList) {
              return Promise.all(keyList.map(function(key) {
                return caches.delete(key);
              }));
            })
            .then(function() {
              window.location = '/';
            });
        }
        this.$router.push('/');
      } else {
        localStorage.setItem('forceflashReloaded', 'true');
        location.reload();
      }
    },
  }
  </script>
  