import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import cart from './modules/cart';
import favorites from './modules/favorites';
import products from './modules/products';
import orders from './modules/orders';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    cart,
    favorites,
    products,
    orders
  }
});
