import api from '../../api';

export default {
  namespaced: true,
  state: {
    orders: [],
    adminOrders: []
  },
  mutations: {
    setOrders(state, orders) { state.orders = orders; },
    setAdminOrders(state, orders) { state.adminOrders = orders; }
  },
  actions: {
    async fetchMyOrders({ commit }) {
      const { data } = await api.get('/orders/mine');
      commit('setOrders', data);
    },
    async fetchAdminOrders({ commit }) {
      const { data } = await api.get('/orders');
      commit('setAdminOrders', data);
    },
    async createOrder({ dispatch }) {
      await api.post('/orders');
      await dispatch('fetchMyOrders');
    }
  }
};
