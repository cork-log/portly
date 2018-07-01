import * as Vuex from 'vuex';
import { State, Source } from '@/store/state';
import { Context } from '@/store/store';
import axios from 'axios';

const url = 'http://localhost:4000';

const actions: Vuex.ActionTree<State, State> = {
  async createSource(context: Context, req) {
    const resp = await axios.post(`${url}/api/source`, req);
    context.commit('ADD_SOURCE', resp.data.data);
    return context;
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
};


export { actions, mutations };

