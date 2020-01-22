import api from "../../services/api";

export default {
  namespaced: true,
  state: {
    groups: [],
    payloadUser: {},
    groupTypes: [
      { value: "SMALL", label: "Pequeno Grupo" },
      { value: "SECTOR", label: "Setor" },
      { value: "AREA", label: "Área" },
      { value: "NETWORK", label: "Rede" },
      { value: "DISTRICT", label: "Distrito" }
    ],
    types: ["SMALL", "SECTOR", "AREA", "NETWORK", "DISTRICT"],
    dayOfTheWeek: [
      { value: "SUNDAY", label: "Domingo" },
      { value: "MONDAY", label: "Segunda" },
      { value: "TUESDAY", label: "Terça" },
      { value: "WEDNESDAY", label: "Quarta" },
      { value: "THURSDAY", label: "Quinta" },
      { value: "FRIDAY", label: "Sexta" },
      { value: "SATURDAY", label: "Sábado" }
    ]
  },
  getters: {
    getCountSmall: state =>
      state.groups.filter(group => group.type === "SMALL").length,
    getCountSector: state =>
      state.groups.filter(group => group.type === "SECTOR").length,
    getCountArea: state =>
      state.groups.filter(group => group.type === "AREA").length,
    getCountNetwork: state =>
      state.groups.filter(group => group.type === "NETWORK").length,
    getCountDistrict: state =>
      state.groups.filter(group => group.type === "DISTRICT").length
  },
  mutations: {
    setGroups(state, payload) {
      state.groups = payload;
    },
    setPayload(state, payload) {
      state.payloadUser = payload;
    }
  },
  actions: {
    async getGroups({ commit }) {
      try {
        const { data: groups } = await api.get("/groups");
        commit("setGroups", groups);
      } catch (error) {
        /* eslint-disable */
        console.error(error);
      }
    },
    async createOrUpdateGroup({ commit, dispatch }, payload) {
      let response;
      if (payload.edit !== false) {
        response = await api.put(`/groups/${payload._id}`, payload);
      } else {
        response = await api.post("/groups", payload);
      }
      await dispatch("getGroups");
      return response;
    },
    async removeGroup({ dispatch }, payload) {
      await api.delete(`/groups/${payload._id}`, payload);
      await dispatch("getGroups");
    }
  }
};
