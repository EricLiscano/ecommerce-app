<template>
  <div class="admin">
    <h2>Panel de Administración</h2>
    <form @submit.prevent="addProduct">
      <input v-model="newProduct.name" placeholder="Nombre del producto" required />
      <input v-model.number="newProduct.price" type="number" placeholder="Precio" required />
      <input v-model.number="newProduct.stock" type="number" placeholder="Stock" required />
      <button type="submit">Agregar producto</button>
    </form>
    <ul>
      <li v-for="p in products" :key="p.id">
        {{ p.name }} - ${{ p.price }} (Stock: {{ p.stock }})
        <button @click="editProduct(p)">Editar</button>
        <button @click="deleteProduct(p.id)">Eliminar</button>
      </li>
    </ul>
    <div v-if="editing">
      <h3>Editar producto</h3>
      <form @submit.prevent="updateProduct">
        <input v-model="editing.name" required />
        <input v-model.number="editing.price" type="number" required />
        <input v-model.number="editing.stock" type="number" required />
        <button type="submit">Guardar</button>
        <button @click="editing=null">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newProduct: { name: '', price: 0, stock: 0 },
      products: [
        { id: 1, name: 'Producto 1', price: 100, stock: 5 },
        { id: 2, name: 'Producto 2', price: 200, stock: 10 }
      ],
      editing: null
    };
  },
  methods: {
    addProduct() {
      const id = Date.now();
      this.products.push({ ...this.newProduct, id });
      this.newProduct = { name: '', price: 0, stock: 0 };
    },
    editProduct(p) {
      this.editing = { ...p };
    },
    updateProduct() {
      const idx = this.products.findIndex(pr => pr.id === this.editing.id);
      if (idx !== -1) this.products.splice(idx, 1, this.editing);
      this.editing = null;
    },
    deleteProduct(id) {
      this.products = this.products.filter(p => p.id !== id);
    }
  }
};
</script>

<style scoped>
.admin {
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
input {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}
button {
  margin-right: 0.5rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 0.7rem;
}
</style>
