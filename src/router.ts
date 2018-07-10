import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import NewSource from './views/Sources/new-source.vue';
import Source from './views/Sources/source.vue';
import Sources from './views/Sources/sources.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/sources',
      name: 'Sources',
      component: Sources,
    },
    {
      path: '/source/new',
      name: 'New Source',
      component: NewSource,
    },
    {
      path: '/sources/:id',
      name: 'Source',
      component: Source,
      props: true,
    },
  ],
});
