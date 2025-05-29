<template>
  <div class="checkout">
    <h2>Checkout</h2>
    <form @submit.prevent="pay">
      <label>Método de pago:</label>
      <select v-model="paymentMethod">
        <option value="mercadopago">MercadoPago</option>
        <option value="tarjeta">Tarjeta de crédito</option>
        <option value="abitab">Abitab</option>
      </select>
      <button type="submit">Pagar</button>
    </form>
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentMethod: 'mercadopago',
      msg: ''
    };
  },
  methods: {
    async pay() {
      // Simula pago
      this.msg = 'Pago procesado (demo)';
    }
  }
};
</script>

<style scoped>
.checkout {
  max-width: 400px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
select, button {
  margin-top: 1rem;
  padding: 0.5rem;
}
</style>
