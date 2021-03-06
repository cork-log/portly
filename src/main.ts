import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import filters from "./filters";
// @ts-ignore
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';

Vue.use(VueMaterial);
Vue.use(filters);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
