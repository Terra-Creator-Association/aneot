import { Plugin } from '@vuepress/core';

const watermarkPlugin: Plugin = {
  name: 'watermark-plugin',
  enhanceAppFiles: () => `${__dirname}/components/Watermark.vue`,
  clientDynamicModules() {
    return {
      name: 'watermark.js',
      content: `
        export default ({ Vue }) => {
          Vue.mixin({
            mounted() {
              if (this.$parent.$options.name === 'Layout') {
                this.$nextTick(() => {
                  const watermark = document.createElement('div');
                  watermark.className = 'watermark';
                  this.$el.appendChild(watermark);
                });
              }
            },
          });
        };
      `,
    };
  },
};

export default watermarkPlugin;