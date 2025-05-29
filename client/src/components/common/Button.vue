<template>
  <button :class="['btn', variant]" :type="type" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    type: { type: String, default: 'button' },
    variant: { type: String, default: 'primary' }
  }
};
</script>

<style scoped>
.btn {
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  padding: 0.7em 1.2em;
  font-size: 1em;
  cursor: pointer;
  transition: var(--transition);
  font-family: inherit;
}
.btn:hover {
  background: var(--color-primary-dark);
}
.btn.secondary {
  background: var(--color-accent);
  color: #fff;
}
.btn.secondary:hover {
  background: #f97316;
}
.btn.icon {
  padding: 0.7em;
  width: 2.5em;
  height: 2.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3em;
}
</style>
