import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    access_token: ""
  },
  mutations: {
    updateAccessToken(state, value) {
      state.access_token = value;
    }
  },
  actions: {},
  modules: {}
});
