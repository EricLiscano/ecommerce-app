<template>
  <div class="favorites">
    <h2>Favoritos</h2>
    <ul>
      <li v-for="fav in favorites" :key="fav.id">{{ fav.name }}</li>
    </ul>
    <p v-if="favorites.length === 0">No tienes productos favoritos.</p>
  </div>
</template>

<script>
export default {
  name: 'Favorites',
  computed: {
    favorites() {
      return this.$store.state.favorites.items;
    }
  },
  created() {
    this.$store.dispatch('favorites/fetchFavorites');
  }
};
</script>

<style scoped>
.favorites {
  max-width: 400px;
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
</style>
