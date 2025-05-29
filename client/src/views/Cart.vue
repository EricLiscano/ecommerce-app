<template>
  <div class="cart">
    <h2>Carrito de compras</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.name }} - ${{ item.price }} x {{ item.qty }}
        <button @click="remove(item.id)">Eliminar</button>
      </li>
    </ul>
    <p v-if="cartItems.length === 0">El carrito está vacío.</p>
    <div v-else>
      <p><strong>Total:</strong> ${{ total }}</p>
      <router-link to="/checkout"><button>Ir al checkout</button></router-link>
      <button @click="clear">Vaciar carrito</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState('cart', ['items']),
    cartItems() { return this.items; },
    total() { return this.items.reduce((acc, item) => acc + item.price * item.qty, 0); }
  },
  methods: {
    ...mapActions('cart', ['removeFromCart', 'clearCart']),
    remove(id) { this.removeFromCart(id); },
    clear() { this.clearCart(); }
  }
};
</script>

<style scoped>
.cart {
  max-width: 500px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 1rem;
}
button {
  margin-left: 1rem;
}
</style>
