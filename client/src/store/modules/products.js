import api from '../../api';

export default {
  namespaced: true,
  state: {
    products: [],
    current: null
  },
  mutations: {
    setProducts(state, products) {
  state.products = products.map(p => ({
    ...p,
    images: Array.isArray(p.images)
      ? p.images
      : (typeof p.images === 'string' && p.images.trim() ? JSON.parse(p.images) : [])
  }));
},
    setCurrent(state, product) { state.current = product; }
  },
  actions: {
    async fetchProducts({ commit }) {
      const { data } = await api.get('/products');
      commit('setProducts', data);
    },
    async fetchProduct({ commit }, id) {
      const { data } = await api.get(`/products/${id}`);
      commit('setCurrent', data);
    }
  }
};
