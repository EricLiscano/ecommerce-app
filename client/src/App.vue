<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
export default {
  components: { Navbar }
};
</script>

<style>
body {
  font-family: 'Segoe UI', Arial, sans-serif;
  background: #f8f9fa;
  margin: 0;
}
#app {
  min-height: 100vh;
}
</style>
