import Vue from 'vue';
import * as Vuex from 'vuex';
import { State, Source } from '@/store/state';
import { actions, mutations } from '@/store/sources';
Vue.use(Vuex);

export type Context = Vuex.ActionContext<State, State>;


const store: Vuex.StoreOptions<State> = {
  state: {
    sources: {},
  },
  actions: {
    ...actions,
  },
  mutations: {
    ...mutations,
  },
};
export default new Vuex.Store(store);
