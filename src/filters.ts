import { VueConstructor as Vue } from "vue";

const unitLabel = (word: string, boundNumber: number) => {
  if (boundNumber === 1) {
    return `${boundNumber} ${word}`;
  } else {
    return `${boundNumber} ${word}s`;
  }
};


export default {
  install(vue: Vue) {
    vue.filter('unitLabel', unitLabel);
  },
};
