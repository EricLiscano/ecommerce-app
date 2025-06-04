<template>
  <div class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      :is-favorite="IsProductFavorite(product)"
      @add-to-cart="$emit('add-to-cart', $event)"
      @toggle-favorite="$emit('toggle-favorite', $event)"
    />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
export default {
  name: 'ProductList',
  components: { ProductCard },
  props: {
    products: { type: Array, required: true },
    favorites: { type: Array, default: () => [] }
  },
  methods: {
    /**
     * @param product 
     * @returns boolean
     */
    IsProductFavorite(product) {
      return Boolean(this.favorites.some(fav => fav.bookId === product.id));
    }
  }
};
</script>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5em 2em;
  margin: 2.5em 0 2em 0;
  justify-items: center;
  align-items: stretch;
  width: 100%;
  max-width: 1400px;
  padding: 0 1.5em;
}
@media (max-width: 900px) {
  .product-list {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.2em;
    padding: 0 0.5em;
  }
}
@media (max-width: 600px) {
  .product-list {
    grid-template-columns: 1fr;
    gap: 0.7em;
    margin: 1.2em 0 1em 0;
    padding: 0 0.1em;
  }
}

</style>
