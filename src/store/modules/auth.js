import api from "../../services/api";

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || null,
    user: null
  },
  getters: {
    getToken: state => state.token,
    getUser: state => state.user || JSON.parse(localStorage.getItem("user"))
  },
  mutations: {
    setToken: (state, payload) => {
      state.token = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    }
  },
  actions: {
    login: async ({ commit }, payload) => {
      const { data } = await api.post("/users/auth", payload);
      let { token, user } = data;
      await commit("setToken", token);
      await commit("setUser", user);
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    // eslint-disable-next-line
    createPassword: async ({ commit }, payload) => {
      return await api.post(
        "/users/pass",
        { password: payload.password },
        {
          headers: {
            Authorization: "Bearer " + payload.token
          }
        }
      );
    },
    me: async ({ commit }) => {
      try {
        const { data } = await api.get("/users/me");
        localStorage.setItem("user", JSON.stringify(data));
        commit("setUser", data);
        return data;
      } catch (error) {
        return false;
      }
    },
    logout: ({ commit }) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete api.defaults.headers["Authorization"];
      commit("setToken", null);
      commit("setUser", null);
    }
  }
};
