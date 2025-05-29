<template>
  <div class="login">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
    </form>
    <router-link to="/register">¿No tienes cuenta? Regístrate</router-link>
    <a @click="forgotPassword" href="#">¿Olvidaste tu contraseña?</a>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return { email: '', password: '', error: '' };
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['loginAction']),
    async login() {
      this.error = '';
      try {
        await this.loginAction({ email: this.email, password: this.password });
        this.$router.push('/');
      } catch (e) {
        this.error = 'Credenciales inválidas';
      }
    },
    forgotPassword() {
      alert('Funcionalidad de recuperación simulada');
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 350px;
  margin: 3rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
input {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 0.7rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
}
.error {
  color: #e74c3c;
}
</style>
