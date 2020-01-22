import api from "../../services/api";

export default {
  namespaced: true,
  state: {
    users: [],
    payloadUser: {},
    memberType: [
      { value: "MEMBER", label: "Membro" },
      { value: "VISITOR", label: "Visitante" },
      { value: "FREQUENTER", label: "Frenquentador" },
      { value: "OFF", label: "Desligado" }
    ]
  },
  getters: {
    countUsers: state => state.users.length,
    countUsersMale: state =>
      state.users.filter(user => user.genre === "MALE").length,
    countUsersFemale: state =>
      state.users.filter(user => user.genre !== "MALE").length
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    setPayload(state, payload) {
      state.payloadUser = payload;
    }
  },
  actions: {
    async getUsers({ commit }) {
      try {
        const { data: users } = await api.get("/users");
        commit("setUsers", users);
      } catch (error) {
        /* eslint-disable */
        console.error(error);
      }
    },
    async createOrUpdateUser({ commit, dispatch }, payload) {
      let response;
      if (payload.edit !== false) {
        response = await api.put(`/users/${payload._id}`, payload);
      } else {
        response = await api.post("/users", payload);
      }
      await dispatch("getUsers");
      return response;
    },
    async plataformAccess({dispatch}, { _id, role }) {
      let { data: { url } } = await api.post(`/users/access`, { _id, role });
      return url;
    },
    async removeUser({ dispatch }, payload) {
      await api.delete(`/users/${payload._id}`, payload);
      await dispatch("getUsers");
    }
  }
};
