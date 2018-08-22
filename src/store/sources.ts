import * as Vuex from 'vuex';
import { State, Source, AuthContext, Entry, Frequency, Job } from '@/store/state';
import { Context } from '@/store/store';
import axios from 'axios';
import Vue from 'vue';

const url = 'http://localhost:4000';

const actions: Vuex.ActionTree<State, State> = {
  async createSource(context: Context, req) {
    const resp = await axios.post(`${url}/api/source`, req);
    context.commit('ADD_SOURCE', resp.data);
    return resp.data;
  },
  async fetchSources(context: Context) {
    const resp = await axios.get(`${url}/api/sources`);
    context.commit('UPDATE_SOURCES', resp.data);
  },
  async fetchEntries(context: Context, sourceId: string) {
    // Not a big fan of this, maybe create an initStoreMethod
    if (!context.state.sources[sourceId]) {
      await context.dispatch("fetchSources");
    }
    const resp = await axios.get(`${url}/api/source/${sourceId}/entry?direction=1`);
    context.commit('UPDATE_ENTRIES', { entries: resp.data.data, sourceId });
  },
  async createAuthContext(context: Context, req) {
    const resp = await axios.post(`${url}/api/source/${req.sourceId}/auth`, { name: req.name });
    context.commit('ADD_AUTH_CONTEXT', resp.data);
    return resp.data;
  },
  async toggleAuthContext(context: Context, req: { contextId: string, sourceId: string }) {
    const resp = await axios.patch(`${url}/api/source/${req.sourceId}/auth/${req.contextId}/toggle`, {});
    context.commit('UPDATE_AUTH_CONTEXT', resp.data);
    return resp.data;
  },
  async requestToken(context: Context, req: { contextId: string, sourceId: string }) {
    const resp = await axios.get(`${url}/api/source/${req.sourceId}/auth/${req.contextId}/token`);
    return resp.data.token;
  },
  async createJob(context: Context, req: { name: string, tolerance: number, frequency: Frequency, sourceId: string }) {
    const resp = await axios.post(`${url}/api/source/${req.sourceId}/jobs`, req);
    context.commit('ADD_JOB', resp.data);
    return resp.data;
  },
  async fetchJobDescriptors(context: Context, sourceId: string) {
    const resp = await axios.get(`${url}/api/source/${sourceId}/jobs`);
    context.commit('UPDATE_JOB_DESCRIPTORS', resp);
  },
};
const mutations: Vuex.MutationTree<State> = {
  ADD_SOURCE(state, { id, name }) {
    if (!state.sources[id]) {
      Vue.set(state.sources, id, {
        name, id, entries: [], contexts: [], jobs: [],
      });
    }
  },
  UPDATE_AUTH_CONTEXT(state, authContext: AuthContext) {
    Vue.set(state.sources[authContext.source_id].contexts, authContext.id, authContext);
  },
  ADD_AUTH_CONTEXT(state, authContext: AuthContext) {
    const old: Source = state.sources[authContext.source_id];
    Vue.set(state.sources, authContext.source_id, {
      id: old.id,
      name: old.name,
      entries: old.entries,
      contexts: [...old.contexts, authContext],
      jobs: old.jobs,
    });
  },
  UPDATE_SOURCES(state, sources: Source[]) {
    const newSources = sources.filter((x) => !state.sources[x.id]);
    newSources.forEach((source) => {
      Vue.set(state.sources, source.id, {
        id: source.id,
        name: source.name,
        entries: source.entries || [],
        contexts: source.contexts || [],
        jobs: source.jobs || [],
      });
    });
  },
  UPDATE_ENTRIES(state, { entries, sourceId }: { entries: Entry[], sourceId: string }) {
    Vue.set(state.sources, sourceId, Object.assign(state.sources[sourceId] || {},
      { entries: [...entries] },
    ));
  },
  ADD_JOB(state, job: Job) {
    const old = state.sources[job.source_id];
    Vue.set(state.sources, job.source_id, {
      id: old.id,
      name: old.name,
      entries: old.entries,
      contexts: old.contexts,
      jobs: [...old.jobs, job],
    });
  },
};
const getters: Vuex.GetterTree<State, State> = {
  getSource(state) {
    return (id: string) => {
      return state.sources[id];
    };
  },
  getEntries(state) {
    return (id: string) => {
      return state.sources[id] ? state.sources[id].entries : [];
    };
  },
  getJobs(state) {
    return (id: string) => {
      return state.sources[id] ? state.sources[id].jobs : [];
    };
  },
};


export { actions, mutations, getters };

