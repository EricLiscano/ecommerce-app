<template>
  <main class="catalog-page">
    <h1>Catálogo</h1>
    <ProductList :products="products" @add-to-cart="handleAddToCart" @toggle-favorite="handleToggleFavorite" :favorites="favorites" />
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductList from '../components/product/ProductList.vue';

export default {
  name: 'Catalog',
  components: { ProductList },
  computed: {
    ...mapState({
      products: state => state.products.products,
      favorites: state => state.favorites.items
    })
  },
  methods: {
    ...mapActions('products', ['fetchProducts']),
    ...mapActions('cart', ['addToCart']),
    ...mapActions('favorites', ['addFavorite', 'removeFavorite', 'fetchFavorites']),
    handleAddToCart(product) {
      this.addToCart({ productId: product.id, quantity: 1 });
    },
    handleToggleFavorite(product) {
      if (this.favorites.some(fav => fav.id === product.id)) {
        this.removeFavorite(product.id);
      } else {
        this.addFavorite(product.id);
      }
    }
  },
  created() {
    this.fetchProducts();
    this.fetchFavorites();
  }
};
</script>

<style scoped>
.catalog-page {
  padding: 2em 0 2em 0;
  min-height: 80vh;
}
h1 {
  font-size: 2.2em;
  font-weight: 700;
  margin-bottom: 1.2em;
  color: var(--color-primary);
}
</style>
