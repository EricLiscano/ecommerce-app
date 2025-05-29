import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Catalog from '../views/Catalog.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';
import Admin from '../views/Admin.vue';
import Product from '../views/Product.vue';
import Cart from '../views/Cart.vue';
import Favorites from '../views/Favorites.vue';
import Checkout from '../views/Checkout.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/products', name: 'Catalog', component: Catalog },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/admin', name: 'Admin', component: Admin },
    { path: '/product/:id', name: 'Product', component: Product },
    { path: '/cart', name: 'Cart', component: Cart },
    { path: '/favorites', name: 'Favorites', component: Favorites },
    { path: '/checkout', name: 'Checkout', component: Checkout }
  ]
});
