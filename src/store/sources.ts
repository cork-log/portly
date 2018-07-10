import * as Vuex from 'vuex';
import { State, Source, AuthContext } from '@/store/state';
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
};
const mutations: Vuex.MutationTree<State> = {
  ADD_SOURCE(state, { id, name }) {
    if (!state.sources[id]) {
      Vue.set(state.sources, id, {
        name, id, entries: [], contexts: [],
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
      entries: [...old.entries],
      contexts: [...old.contexts, authContext],
    });
  },
  UPDATE_SOURCES(state, sources: Source[]) {
    const newSources = sources.filter((x) => !state.sources[x.id]);
    newSources.forEach((source) => {
      Vue.set(state.sources, source.id, { id: source.id, name: source.name, entries: [], contexts: source.contexts });
    });
  },
};
const getters: Vuex.GetterTree<State, State> = {
  getSource(state) {
    return (id: string) => {
      return state.sources[id];
    };
  },
};


export { actions, mutations, getters };

