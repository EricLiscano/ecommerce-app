<template>
  <div class="home">
    <h1>Bienvenido al E-Commerce Demo</h1>
    <p>Explora el catálogo, agrega productos al carrito y prueba todas las funcionalidades.</p>
    <div v-if="products.length">
      <ProductList :products="products" @add-to-cart="handleAddToCart" @toggle-favorite="toggleFavorite" :favorites="favorites" />
    </div>
    <div v-else>Cargando productos...</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductList from '@/components/product/ProductList.vue';
export default {
  name: 'Home',
  components: { ProductList },
  computed: {
    ...mapState('products', ['products']),
    ...mapState('favorites', ['favorites'])
  },
  created() {
    this.fetchProducts();
    this.fetchFavorites();
  },
  methods: {
    ...mapActions('products', ['fetchProducts']),
    ...mapActions('cart', ['addToCart']),
    ...mapActions('favorites', ['addFavorite', 'removeFavorite', 'fetchFavorites']),
    handleAddToCart(product) {
      this.addToCart({ productId: product.id, quantity: 1 });
    },
    toggleFavorite(product) {
      if (this.favorites.some(fav => fav.id === product.id)) {
        this.removeFavorite(product.id);
      } else {
        this.addFavorite(product.id);
      }
    }
  }
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 2rem;
}
.product-preview {
  margin: 1rem auto;
  padding: 1rem;
  max-width: 350px;
  background: #f9f9f9;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.product-preview:hover {
  background: #f1f7ff;
}
</style>
