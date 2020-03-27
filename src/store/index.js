import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baiduDB: {
      grant_type: "client_credentials",
      client_id: "UwELvyWkz5Q9rFZx8uIc0Qi5",
      client_secret: "GzHQM5nrA1dbaQFPnXkOoM6IYBNhtXZ3"
    },
    access_token: "",
    user: {
      user_id: "",
      password: ""
    }
  },
  mutations: {
    updateAccessToken(state, value) {
      state.access_token = value;
    },
    updateUser(state, obj) {
      [state.user.user_id, state.user.password] = [obj.user_id, obj.password];
    }
  },
  actions: {},
  modules: {}
});
