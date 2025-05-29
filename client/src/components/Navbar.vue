<template>
  <nav class="navbar">
    <router-link to="/" class="logo">E-Commerce</router-link>
    <SearchBar @search="$emit('search', $event)" />
    <div class="links">
      <router-link to="/products">Catálogo</router-link>
      <router-link to="/favorites">Favoritos</router-link>
      <CartIcon :count="cartCount" />
      <router-link to="/profile">Perfil</router-link>
      <router-link v-if="isAdmin" to="/admin">Admin</router-link>
      <router-link v-if="!isLogged" to="/login">Login</router-link>
      <a v-if="isLogged" @click.prevent="logout">Salir</a>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SearchBar from '@/components/common/SearchBar.vue';
import CartIcon from '@/components/cart/CartIcon.vue';
export default {
  components: { SearchBar, CartIcon },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('cart', {
      cartCount: state => state.items ? state.items.reduce((sum, i) => sum + i.quantity, 0) : 0
    }),
    isLogged() { return !!this.user; },
    isAdmin() { return this.user && this.user.role === 'admin'; }
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 1.3rem 2.5rem;
  box-shadow: 0 2px 12px rgba(37,99,235,0.07);
  position: sticky;
  top: 0;
  z-index: 100;
}
.logo {
  font-weight: 800;
  color: var(--color-primary);
  text-decoration: none;
  font-size: 2rem;
  letter-spacing: 0.03em;
  transition: color 0.2s;
}
.logo:hover {
  color: var(--color-accent);
}
.links {
  display: flex;
  align-items: center;
}
.links a, .links .router-link-active {
  margin-left: 1.5rem;
  color: #222;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  letter-spacing: 0.01em;
  transition: color 0.2s;
}
.links a:hover {
  color: var(--color-primary);
}
@media (max-width: 900px) {
  .navbar {
    flex-direction: column;
    padding: 1rem 0.7rem;
    align-items: stretch;
  }
  .logo {
    text-align: left;
    font-size: 1.5rem;
  }
  .links {
    flex-wrap: wrap;
    margin-top: 0.7rem;
  }
  .links a {
    margin-left: 1rem;
    font-size: 1rem;
  }
}
</style>
