<template>
  <form class="search-bar" @submit.prevent="$emit('search', query)">
    <input v-model="query" type="text" placeholder="Buscar productos..." />
    <button type="submit"><i class="fas fa-search"></i></button>
  </form>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return { query: '' };
  }
};
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 0.3em 0.6em;
  margin: 0 1em;
}
.search-bar input {
  border: none;
  outline: none;
  font-size: 1em;
  padding: 0.5em 0.7em;
  flex: 1;
  background: transparent;
}
.search-bar button {
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 1.2em;
  cursor: pointer;
  padding: 0.3em 0.6em;
}
</style>
