<template>
  <div class="register">
    <h2>Registro</h2>
    <form @submit.prevent="register">
      <div>
        <label>Nombre</label>
        <input v-model="name" type="text" @input="validateName" required />
        <div v-if="errors.name" class="error">{{ errors.name }}</div>
      </div>
      <div>
        <label>Email</label>
        <input v-model="email" type="email" @input="validateEmail" required />
        <div v-if="errors.email" class="error">{{ errors.email }}</div>
      </div>
      <div>
        <label>Contraseña</label>
        <input v-model="password" type="password" @input="validatePassword" required />
        <div v-if="errors.password" class="error">{{ errors.password }}</div>
      </div>
      <div>
        <label>Confirmar contraseña</label>
        <input v-model="confirmPassword" type="password" @input="validateConfirmPassword" required />
        <div v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</div>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="success" class="success">{{ success }}</div>
      <button type="submit" :disabled="hasErrors">Registrarse</button>
    </form>
    <router-link to="/login">¿Ya tienes cuenta? Inicia sesión</router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      success: '',
      errors: {}
    };
  },
  computed: {
    hasErrors() {
      return Object.values(this.errors).some(Boolean);
    }
  },
  methods: {
    ...mapActions('auth', ['registerAction']),
    validateName() {
      if (!this.name) this.errors.name = 'El nombre es obligatorio';
      else if (this.name.length < 2) this.errors.name = 'El nombre debe tener al menos 2 caracteres';
      else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(this.name)) this.errors.name = 'El nombre solo puede contener letras y espacios';
      else this.errors.name = '';
    },
    validateEmail() {
      if (!this.email) this.errors.email = 'El email es obligatorio';
      else if (!/^\S+@\S+\.\S+$/.test(this.email)) this.errors.email = 'El email no es válido';
      else this.errors.email = '';
    },
    validatePassword() {
      if (!this.password) this.errors.password = 'La contraseña es obligatoria';
      else if (this.password.length < 8) this.errors.password = 'La contraseña debe tener al menos 8 caracteres';
      else if (!/[a-z]/.test(this.password)) this.errors.password = 'Debe tener al menos una minúscula';
      else if (!/[A-Z]/.test(this.password)) this.errors.password = 'Debe tener al menos una mayúscula';
      else if (!/[0-9]/.test(this.password)) this.errors.password = 'Debe tener al menos un número';
      else if (!/[^A-Za-z0-9]/.test(this.password)) this.errors.password = 'Debe tener al menos un carácter especial';
      else this.errors.password = '';
    },
    validateConfirmPassword() {
      if (!this.confirmPassword) this.errors.confirmPassword = 'Debes confirmar la contraseña';
      else if (this.confirmPassword !== this.password) this.errors.confirmPassword = 'Las contraseñas no coinciden';
      else this.errors.confirmPassword = '';
    },
    validateAll() {
      this.validateName();
      this.validateEmail();
      this.validatePassword();
      this.validateConfirmPassword();
    },
    async register() {
      this.error = '';
      this.success = '';
      this.validateAll();
      if (this.hasErrors) return;
      try {
        await this.registerAction({ name: this.name, email: this.email, password: this.password, confirmPassword: this.confirmPassword });
        this.success = '¡Registro exitoso! Redirigiendo al login...';
        setTimeout(() => this.$router.push('/login'), 1800);
      } catch (e) {
        if (e && e.errors && Array.isArray(e.errors)) {
          e.errors.forEach(err => {
            if (err.param && Object.prototype.hasOwnProperty.call(this.errors, err.param)) this.errors[err.param] = err.msg;
          });
          this.error = '';
        } else {
          this.error = typeof e === 'string' ? e : 'Error en el registro';
        }
      }
    }
  }
};
</script>

<style scoped>
.register {
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
  background: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
}
.error {
  color: #e74c3c;
  margin-bottom: 0.5rem;
}
.success {
  color: #27ae60;
  margin-bottom: 0.5rem;
}
</style>
