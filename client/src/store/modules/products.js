import api from '../../api';

export default {
  namespaced: true,
  state: {
    products: [],
    current: null
  },
  mutations: {
    setProducts(state, products) {
      state.products = products.map(p => {
        const cover = p.coverImage;
        let images = [];
        if (Array.isArray(cover)) {
          images = cover;
        } else if (typeof cover === 'string' && cover.trim()) {
          try {
            const parsed = JSON.parse(cover);
            images = Array.isArray(parsed) ? parsed : [cover];
          } catch {
            images = [cover];
          }
        }
        return { ...p, images };
      });
    },
    setCurrent(state, product) {
      let images = [];
      if (Array.isArray(product.coverImage)) {
        images = product.coverImage;
      } else if (typeof product.coverImage === 'string' && product.coverImage.trim()) {
        try {
          const parsed = JSON.parse(product.coverImage);
          images = Array.isArray(parsed) ? parsed : [product.coverImage];
        } catch {
          images = [product.coverImage];
        }
      }
      state.current = { ...product, images };
    }
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
