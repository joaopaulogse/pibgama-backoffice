import Vue from "vue";
import Vuex from "vuex";

import users from "./modules/users";
import auth from "./modules/auth";
import loader from "./modules/loader";
import groups from "./modules/groups";
import cults from "./modules/cults";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    auth,
    loader,
    groups,
    cults
  },
  state: {
    errors: []
  },
  getters: {
    getErrors: state => {
      return state.errors;
    }
  },
  mutations: {},
  actions: {}
});
