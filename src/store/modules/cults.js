import api from "../../services/api";
import moment from "moment";

export default {
  namespaced: true,
  state: {
    cults: [],
    types: ["HOPE", "HYPE", "CELEBRACAO", "TADEL", "EVENTOS"]
  },
  mutations: {
    setCults: (state, payload) => {
      state.cults = payload;
    }
  },
  getters: {
    datacollectionCelebration: state => {
      let labels = state.cults.map(cult =>
        moment(cult.date).format("DD/MM/YYYY")
      );
      //Data to be represented on x-axis
      return {
        labels,
        datasets: [
          {
            label: "Celebrações",
            backgroundColor: "transparent",
            pointBackgroundColor: "white",
            borderWidth: 6,
            pointBorderColor: "#249EBF",
            //Data to be represented on y-axis
            data: state.cults
              .filter(cult => cult.type === "CELEBRACAO")
              .map(cult => cult.count)
          },
          {
            label: "TADEL",
            backgroundColor: "transparent",
            pointBackgroundColor: "white",
            borderWidth: 6,
            pointBorderColor: "red",
            //Data to be represented on y-axis
            data: state.cults
              .filter(cult => cult.type === "TADEL")
              .map(cult => cult.count)
          }
        ]
      };
    }
  },
  actions: {
    async getCults({ commit }) {
      try {
        const { data: cults } = await api.get("/cults");
        commit("setCults", cults);
      } catch (error) {
        /* eslint-disable */
        console.error(error);
      }
    },
    async createOrUpdateCult({ commit, dispatch }, payload) {
      let response;
      if (payload.edit !== false) {
        response = await api.put(`/cults/${payload._id}`, payload);
      } else {
        response = await api.post("/cults", payload);
      }
      await dispatch("getCults");
      return response;
    },
    async removeCult({ dispatch }, payload) {
      await api.delete(`/cults/${payload._id}`, payload);
      await dispatch("getCults");
    }
  }
};
