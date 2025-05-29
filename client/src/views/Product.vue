<template>
  <div class="product" v-if="product">
    <h2>{{ product.name }}</h2>
    <p>Precio: ${{ product.price }}</p>
    <p>Stock: {{ product.stock }}</p>
    <div v-if="product.images && product.images.length">
      <img :src="product.images[0]" alt="Imagen producto" style="max-width: 100%; margin-bottom: 1rem;" />
    </div>
    <p v-if="product.shippingInfo">Envío: {{ product.shippingInfo }}</p>
    <button @click="handleAddToCart">Agregar al carrito</button>
    <button @click="addFavorite">Agregar a favoritos</button>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
  <div v-else>Cargando producto...</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  computed: {
    ...mapState('products', ['current']),
    product() { return this.current; }
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
    ...mapActions('favorites', ['addFavorite']),

    async handleAddToCart() {
      this.error = '';
      try {
        await this.addToCart({ productId: this.product.id, quantity: 1 });
      } catch (e) {
        this.error = e?.response?.data?.error || 'Error al agregar al carrito';
      }
    },

    async addFavorite() {
      this.error = '';
      try {
        await this.addFavorite(this.product.id);
      } catch (e) {
        this.error = e?.response?.data?.error || 'Error al agregar a favoritos';
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
