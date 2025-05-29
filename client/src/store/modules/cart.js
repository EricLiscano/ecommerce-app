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
      commit('setCart', data.CartItems || []);
    },
    async addToCart({ dispatch }, { productId, quantity }) {
      await api.post('/cart/add', { productId, quantity });
      await dispatch('fetchCart');
    },
    async removeFromCart({ dispatch }, productId) {
      await api.post('/cart/remove', { productId });
      await dispatch('fetchCart');
    },
    async updateCartItem({ dispatch }, { productId, quantity }) {
      await api.post('/cart/update', { productId, quantity });
      await dispatch('fetchCart');
    },
    async clearCart({ commit }) {
      await api.post('/cart/clear');
      commit('clear');
    }
  }
};
