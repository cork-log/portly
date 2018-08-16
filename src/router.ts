import Vue from 'vue';
import Router from 'vue-router';
import NewSource from './views/Sources/new-source.vue';
import NewSourceJob from './views/Sources/new-source-job.vue';
import SourceEntries from './views/Sources/source-entries.vue';
import SourceKeys from './views/Sources/source-keys.vue';
import SourceJobs from './views/Sources/source-jobs.vue';
import Sources from './views/Sources/sources.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      redirect: '/sources',
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
      path: '/sources/:sourceId/entries',
      name: 'Source Entries',
      component: SourceEntries,
      props: true,
    },
    {
      path: '/sources/:sourceId/jobs',
      name: 'Jobs Reports',
      component: SourceJobs,
      props: true,
    },
    {
      path: '/sources/:sourceId/jobs/new',
      name: 'New Job Report',
      component: NewSourceJob,
      props: true,
    },
    {
      path: '/sources/:sourceId/keys',
      name: 'Source Keys',
      component: SourceKeys,
      props: true,
    },
  ],
});
