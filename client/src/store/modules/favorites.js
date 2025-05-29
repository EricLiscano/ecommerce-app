import api from '../../api';

export default {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
    setFavorites(state, items) { state.items = items.map(f => f.Product); },
    clear(state) { state.items = []; }
  },
  actions: {
    async fetchFavorites({ commit }) {
      const { data } = await api.get('/favorites');
      commit('setFavorites', data);
    },
    async addFavorite({ dispatch }, productId) {
      await api.post('/favorites/add', { productId });
      await dispatch('fetchFavorites');
    },
    async removeFavorite({ dispatch }, productId) {
      await api.post('/favorites/remove', { productId });
      await dispatch('fetchFavorites');
    }
  }
};
