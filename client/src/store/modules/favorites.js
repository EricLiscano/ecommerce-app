import api from '../../api';

export default {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
    setFavorites(state, items) { state.items = items; },
    clear(state) { state.items = []; }
  },
  actions: {
    async fetchFavorites({ commit }) {
      const { data } = await api.get('/favorites');
      commit('setFavorites', data);
    },
    async addFavorite({ dispatch }, bookId) {
      await api.post('/favorites/add', { bookId });
      await dispatch('fetchFavorites');
    },
    async removeFavorite({ dispatch }, bookId) {
      await api.post('/favorites/remove', { bookId });
      await dispatch('fetchFavorites');
    }
  }
};
