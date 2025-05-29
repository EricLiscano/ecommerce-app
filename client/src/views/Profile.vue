<template>
  <div class="profile">
    <h2>Mi Perfil</h2>
    <div v-if="user">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <form @submit.prevent="savePreferences">
        <label>Preferencia de tema:</label>
        <select v-model="preferences.theme">
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
        </select>
        <button type="submit">Guardar preferencias</button>
      </form>
      <p v-if="msg">{{ msg }}</p>
    </div>
    <div v-else>
      <p>Debes iniciar sesión para ver tu perfil.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      preferences: { theme: 'light' },
      msg: ''
    };
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  created() {
    if (this.user && this.user.preferences) {
      this.preferences = { ...this.user.preferences };
    }
  },
  methods: {
    async savePreferences() {
      // Simula guardado
      this.msg = 'Preferencias guardadas (demo)';
    }
  }
};
</script>

<style scoped>
.profile {
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
