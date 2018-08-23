import * as Vuex from 'vuex';
import { State, Source, AuthContext, Entry, JobDescriptor } from '@/store/state';
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
  async fetchContexts(context: Context, sourceId) {
    const resp = await axios.get(`${url}/api/source/${sourceId}/auth`);
    context.commit('UPDATE_AUTH_CONTEXTS', { sourceId, authContexts: resp.data });
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
    context.commit('UPDATE_AUTH_CONTEXT', resp.data);
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
  async createJob(context: Context, req: { name: string, tolerance: number, frequency: number, source_id: string }) {
    const resp = await axios.post(`${url}/api/source/${req.source_id}/job`, req);
    context.commit('ADD_JOB', resp.data);
    return resp.data;
  },
  async fetchJobDescriptors(context: Context, sourceId: string) {
    const resp = await axios.get(`${url}/api/source/${sourceId}/job`);
    context.commit('UPDATE_JOB_DESCRIPTORS', {sourceId, jobDescriptors: resp.data});
  },
};
const mutations: Vuex.MutationTree<State> = {
  ADD_SOURCE(state, { id, name }) {
    Vue.set(state.sources, id, { id, name } as Source);
  },
  UPDATE_AUTH_CONTEXT(state, authContext: AuthContext) {
    Vue.set(state.contexts[authContext.source_id], authContext.id, authContext);
  },
  UPDATE_AUTH_CONTEXTS(state, { sourceId, authContexts }: { authContexts: AuthContext[], sourceId: string }) {
    if (!state.contexts[sourceId]) {
      Vue.set(state.contexts, sourceId, {});
    }
    authContexts.forEach((authContext) => {
      Vue.set(state.contexts[authContext.source_id], authContext.id, authContext);
    });
  },
  UPDATE_SOURCES(state, sources: Source[]) {
    sources.forEach((source) => {
      Vue.set(state.sources, source.id, {
        id: source.id, name: source.name,
      } as Source);
    });
  },
  UPDATE_ENTRIES(state, { entries, sourceId }: { entries: Entry[], sourceId: string }) {
    if (!state.entries[sourceId]) {
      Vue.set(state.entries, sourceId, {});
    }
    entries.forEach((entry) => {
      Vue.set(state.entries[sourceId], entry.id, entry);
    });
  },
  ADD_JOB(state, job: JobDescriptor) {
    Vue.set(state.jobs[job.source_id], job.id, job);
  },
  UPDATE_JOB_DESCRIPTORS(state, { jobDescriptors, sourceId }: { jobDescriptors: JobDescriptor[], sourceId: string }) {
    if (!state.jobs[sourceId]) {
      Vue.set(state.jobs, sourceId, {});
    }
    jobDescriptors.forEach((job) => {
      Vue.set(state.jobs[sourceId], job.id, job);
    });
  },
};
const getters: Vuex.GetterTree<State, State> = {
  getSource(state) {
    return (id: string) => {
      return state.sources[id];
    };
  },
  getContexts(state) {
    return (sourceId: string) => {
      return state.contexts[sourceId] ? Object.values(state.contexts[sourceId] || {}) : [];
    };
  },
  getEntries(state) {
    return (sourceId: string) => {
      return state.entries[sourceId] ? Object.values(state.entries[sourceId] || {}) : [];
    };
  },
  getJobs(state) {
    debugger;
    return (id: string) => {
      return state.jobs[id] ? Object.values(state.jobs[id] || {}) : [];
    };
  },
};


export { actions, mutations, getters };

