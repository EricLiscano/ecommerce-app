<template>
  <transition name="sidebar">
    <aside v-if="open" class="cart-sidebar">
      <header>
        <h2>Carrito</h2>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </header>
      <div v-if="cart.length" class="cart-items">
        <div v-for="item in cart" :key="item.product.id" class="cart-item">
          <img :src="Array.isArray(item.product.images) ? item.product.images[0] : JSON.parse(item.product.images)[0]" alt="img" />
          <div class="info">
            <h4>{{ item.product.name }}</h4>
            <p>${{ item.product.price }} x {{ item.quantity }}</p>
            <button @click="$emit('remove', item.product.id)">Eliminar</button>
          </div>
        </div>
        <div class="subtotal">
          <strong>Subtotal:</strong> ${{ subtotal.toFixed(2) }}
        </div>
        <AppButton class="checkout-btn" @click="$emit('checkout')">Finalizar compra</AppButton>
      </div>
      <div v-else class="empty">Tu carrito está vacío.</div>
    </aside>
  </transition>
</template>

<script>
import AppButton from '../common/Button.vue';
export default {
  name: 'CartSidebar',
  components: { AppButton },
  props: {
    open: { type: Boolean, default: false },
    cart: { type: Array, default: () => [] },
    subtotal: { type: Number, default: 0 }
  }
};
</script>

<style scoped>
.cart-sidebar {
  position: fixed;
  top: 0; right: 0;
  width: 350px;
  height: 100vh;
  background: var(--color-bg-card);
  box-shadow: -4px 0 16px rgba(0,0,0,0.10);
  z-index: 1000;
  padding: 2em 1.5em 1.5em 1.5em;
  display: flex;
  flex-direction: column;
  animation: slideIn .2s;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2em;
}
.close-btn {
  background: none;
  border: none;
  font-size: 2em;
  color: var(--color-primary);
  cursor: pointer;
  line-height: 1;
}
.cart-items {
  flex: 1;
  overflow-y: auto;
}
.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
}
.cart-item img {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: var(--radius);
  margin-right: 1em;
}
.info {
  flex: 1;
}
.subtotal {
  margin: 1.5em 0 1em 0;
  font-size: 1.2em;
  text-align: right;
}
.checkout-btn {
  width: 100%;
}
.empty {
  text-align: center;
  color: var(--color-border);
  margin-top: 3em;
}
.sidebar-enter-active, .sidebar-leave-active {
  transition: transform 0.2s;
}
.sidebar-enter, .sidebar-leave-to {
  transform: translateX(100%);
}
</style>
