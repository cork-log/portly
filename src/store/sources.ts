import * as Vuex from 'vuex';
import { State, Source } from '@/store/state';
import { Context } from '@/store/store';
import axios from 'axios';

const url = 'http://localhost:4000';

const actions: Vuex.ActionTree<State, State> = {
  async createSource(context: Context, req) {
    const resp = await axios.post(`${url}/api/source`, req);
    context.commit('ADD_SOURCE', resp.data);
    return resp.data.data;
  },
  async fetchSources(context: Context) {
    const resp = await axios.get(`${url}/api/sources`);
    context.commit('UPDATE_SOURCES', resp.data);
  },
};
const mutations: Vuex.MutationTree<State> = {
  ADD_SOURCE(state, { id, name }) {
    if (!state.sources[id]) {
      state.sources[id] = {
        name, id, entries: [],
      };
    }
  },
  UPDATE_SOURCES(state, sources: Source[]) {
    const newSources = sources.filter((x) => !state.sources[x.id]);
    newSources.forEach((source) => {
      state.sources[source.id] = {id: source.id, name: source.name, entries: []};
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

