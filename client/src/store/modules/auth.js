import api from '../../api';

export default {
  namespaced: true,
  state: {
    user: null,
    token: null
  },
  mutations: {
    setUser(state, user) { state.user = user; },
    setToken(state, token) { state.token = token; },
    logout(state) { state.user = null; state.token = null; }
  },
  actions: {
    async loginAction({ commit }, { email, password }) {
      try {
        const { data } = await api.post('/auth/login', { email, password });
        commit('setUser', data.user);
      } catch (err) {
        throw err.response?.data?.error || 'Error de login';
      }
    },
    async registerAction({ commit }, { name, email, password, confirmPassword }) {
      try {
        const { data } = await api.post('/auth/register', { name, email, password, confirmPassword });
        commit('setUser', data.user);
      } catch (err) {
        // Soporta errores de express-validator
        if (err.response?.data?.errors) throw { errors: err.response.data.errors };
        throw err.response?.data?.error || 'Error de registro';
      }
    },
    async logout({ commit }) {
      await api.post('/auth/logout');
      commit('logout');
    },
    async fetchMe({ commit }) {
      try {
        const { data } = await api.get('/auth/me');
        commit('setUser', data.user);
      } catch {
        commit('logout');
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.token
  }
};
