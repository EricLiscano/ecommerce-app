<template>
  <div class="single-product-page">
    <ProductCard
      v-if="product"
      :product="product"
      :isFavorite="isFavorite"
      @add-to-cart="handleAddToCart"
      @toggle-favorite="handleToggleFavorite"
    />
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="!product">Cargando producto...</div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ProductCard from '@/components/product/ProductCard.vue';
export default {
  components: { ProductCard },
  computed: {
    ...mapState('products', ['current']),
    ...mapState('favorites', ['items']),
    product() { return this.current; },
    isFavorite() {
      // Si tienes favoritos en store, compara por id
      if (!this.items || !this.product) return false;
      return this.items.some(fav => fav.bookId === this.product.id);
    }
  },
  data() {
    return { error: '' };
  },
  created() {
    this.fetchProduct(this.$route.params.id);
  },
  methods: {
    ...mapActions('products', ['fetchProduct']),
    ...mapActions('cart', ['addToCart']),
    ...mapActions('favorites', ['addFavorite', 'removeFavorite']),
    async handleAddToCart() {
      this.error = '';
      try {
        await this.addToCart({ bookId: this.product.id, quantity: 1 });
      } catch (e) {
        this.error = e?.response?.data?.error || 'Error al agregar al carrito';
      }
    },
    async handleToggleFavorite() {
      this.error = '';
      try {
        if (this.isFavorite) {
          await this.removeFavorite(this.product.id);
      } else {
          await this.addFavorite(this.product.id);
      }
      } catch (e) {
        this.error = e?.response?.data?.error || 'Error al actualizar favoritos';
      }
    }
  }
};
</script>


<style scoped>
.product {
  max-width: 400px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
button {
  margin-right: 1rem;
  margin-top: 1rem;
}
.error {
  color: #d32f2f;
  margin-top: 1rem;
}
</style>
