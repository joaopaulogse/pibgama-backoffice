import axios from "axios";
import store from "../store";
import main from "../main";
const api = axios.create({
  baseURL: process.env.VUE_APP_HOST,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  config => {
    store.commit("loader/setLoading", true);
    return config;
  },
  error => {
    store.commit("loader/setLoading", false);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    store.commit("loader/setLoading", false);
    return response;
  },
  error => {
    //  const { config, response: { status } } = error
    const {
      response: {
        status,
        data: { code, message }
      }
    } = error;
    // const originalRequest = config
    if (status === 401) {
      store.dispatch("auth/logout");
      main.$router.push("/auth");
    }
    if (code) {
      main.$buefy.toast.open({
        duration: 5000,
        message,
        position: "is-bottom",
        type: "is-danger"
      });
    }
    store.commit("loader/setLoading", false);
    return Promise.reject(error);
  }
);

export default api;
