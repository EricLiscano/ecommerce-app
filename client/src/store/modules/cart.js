import api from '../../api';

export default {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
    setCart(state, items) { state.items = items; },
    clear(state) { state.items = []; }
  },
  actions: {
    async fetchCart({ commit }) {
      const { data } = await api.get('/cart');
      commit('setCart', data.items || []);
    },
    async addToCart({ dispatch }, { bookId, quantity }) {
      await api.post('/cart/add', { bookId, quantity });
      await dispatch('fetchCart');
    },
    async removeFromCart({ dispatch }, bookId) {
      await api.post('/cart/remove', { bookId });
      await dispatch('fetchCart');
    },
    async updateCartItem({ dispatch }, { bookId, quantity }) {
      await api.post('/cart/update', { bookId, quantity });
      await dispatch('fetchCart');
    },
    async clearCart({ commit }) {
      await api.post('/cart/clear');
      commit('clear');
    }
  }
};
