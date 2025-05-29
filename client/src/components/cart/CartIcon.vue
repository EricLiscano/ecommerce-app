<template>
  <router-link to="/cart" class="cart-icon">
    <i class="fas fa-shopping-cart"></i>
    <span v-if="count" class="cart-count">{{ count }}</span>
  </router-link>
</template>

<script>
export default {
  name: 'CartIcon',
  props: {
    count: { type: Number, default: 0 }
  }
};
</script>

<style scoped>
.cart-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  font-size: 1.5em;
  color: var(--color-primary);
  margin-left: 1.5em;
}
.cart-count {
  background: var(--color-danger);
  color: #fff;
  border-radius: 50%;
  font-size: 0.9em;
  font-weight: bold;
  position: absolute;
  top: -8px;
  right: -12px;
  padding: 0.2em 0.6em;
  min-width: 1.5em;
  text-align: center;
  box-shadow: 0 1px 6px rgba(0,0,0,0.12);
}
</style>
