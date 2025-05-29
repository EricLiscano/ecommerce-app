<template>
  <transition name="fade">
    <div v-if="visible" class="toast" :class="type">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    type: { type: String, default: 'success' },
    duration: { type: Number, default: 2500 }
  },
  data() {
    return { visible: false };
  },
  methods: {
    show() {
      this.visible = true;
      setTimeout(() => { this.visible = false; }, this.duration);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 2em;
  left: 50%;
  transform: translateX(-50%);
  min-width: 220px;
  max-width: 90vw;
  background: #fff;
  color: var(--color-text);
  border-radius: var(--radius);
  box-shadow: 0 4px 16px rgba(0,0,0,0.13);
  padding: 1em 2em;
  z-index: 9999;
  font-weight: 500;
  font-size: 1.05em;
  opacity: 0.95;
  text-align: center;
}
.toast.success {
  border-left: 5px solid var(--color-success);
}
.toast.error {
  border-left: 5px solid var(--color-danger);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
