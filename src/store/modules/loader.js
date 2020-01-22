export default {
  namespaced: true,
  state: {
    loading: false
  },
  getters: {
    getLoading: state => state.loading
  },
  mutations: {
    setLoading: (state, payload) => {
      state.loading = payload;
    }
  }
};
