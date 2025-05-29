<template>
  <div class="product-card card">
    <router-link :to="`/product/${product.id}`" class="img-link">
      <div class="img-gallery">
        <img
          v-if="mainImage"
          :src="mainImage"
          class="product-img"
          :alt="product.name"
        />
        <img
          v-else
          src="/default-product.png"
          class="product-img"
          alt="Imagen no disponible"
        />
        <div v-if="Array.isArray(images) && images.length > 1" class="thumbnails">
          <img
            v-for="(img, idx) in images"
            :key="idx"
            :src="img"
            :alt="product.name + ' miniatura ' + (idx+1)"
            :class="{ active: img === mainImage }"
            @click.stop="mainImage = img"
          />
        </div>
      </div>
    </router-link>
    <div class="product-header">
      <h3 class="product-name">{{ product.name }}</h3>
      <button class="favorite-btn" :class="[isFavorite ? 'fas fa-heart' : 'far fa-heart']" @click.stop="$emit('toggle-favorite', product)">
        <i></i>
      </button>
    </div>
    <p class="price">${{ product.price }}</p>
    <AppButton class="add-cart-btn" @click="$emit('add-to-cart', product)">
      <i class="fas fa-cart-plus"></i> Añadir al carrito
    </AppButton>
  </div>
</template>

<script>
import AppButton from '../common/Button.vue';
export default {
  name: 'ProductCard',
  components: { AppButton },
  props: {
    product: { type: Object, required: true },
    isFavorite: { type: Boolean, default: false }
  },
  data() {
    return {
      images: [],
    };
  },
  computed: {
    mainImage() {
      return this.product.images && this.product.images.length ? this.product.images[0] : '';
    }
  },
  created() {
    this.images = this.product.images;
  },
  watch: {
    product: {
      immediate: true,
      handler(newProduct) {
        let imgs = [];
        if (newProduct && Array.isArray(newProduct.images)) {
          imgs = newProduct.images;
        } else if (newProduct && typeof newProduct.images === 'string' && newProduct.images.trim().length > 0) {
          try {
            imgs = JSON.parse(newProduct.images);
          } catch {
            imgs = [];
          }
        }
        if (!Array.isArray(imgs)) imgs = [];
        imgs = imgs.filter(Boolean);
        this.images = imgs;
      }
    }
  }
};
</script>

<style scoped>
.product-card {
  max-width: 340px;
  margin: 1.5em auto;
  background: #fff;
  border-radius: var(--radius);
  box-shadow: 0 2px 12px rgba(37,99,235,0.07);
  padding: 1.3em 1.2em 1.6em 1.2em;
  transition: box-shadow 0.18s, transform 0.16s;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-card:hover {
  box-shadow: 0 8px 32px rgba(37,99,235,0.13);
  transform: translateY(-3px) scale(1.025);
}
.img-link {
  width: 100%;
  display: block;
}
.img-gallery {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-img {
  width: 100%;
  max-width: 320px;
  height: 320px;
  object-fit: cover;
  border-radius: var(--radius);
  background: #f5f7fa;
  margin-bottom: 0.8em;
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
  transition: box-shadow 0.18s;
}
.thumbnails {
  display: flex;
  gap: 0.4em;
  margin-bottom: 0.5em;
}
.thumbnails img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 5px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: border 0.15s, box-shadow 0.12s;
  background: #f5f7fa;
}
.thumbnails img.active,
.thumbnails img:hover {
  border: 2px solid var(--color-primary);
  box-shadow: 0 2px 8px rgba(37,99,235,0.12);
}
.product-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.6em;
}
.product-name {
  font-size: 1.12em;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.7em;
  margin-top: 0.2em;
}
.favorite-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.3em;
  color: #bbb;
  transition: color 0.18s;
  margin-left: 0.4em;
}
.favorite-btn.active,
.favorite-btn:hover {
  color: var(--color-danger);
}
.favorite-btn .fa-heart {
  transition: color 0.18s;
}
.price {
  font-weight: bold;
  color: var(--color-primary);
  font-size: 1.1em;
  margin: 0.7em 0 1em 0;
}
.add-cart-btn {
  margin-top: 0.3em;
  width: 100%;
  font-size: 1.08em;
  font-weight: 600;
  border-radius: 7px;
  letter-spacing: 0.01em;
  padding: 0.8em 0;
  background: linear-gradient(90deg, var(--color-primary) 60%, var(--color-accent) 100%);
  box-shadow: 0 2px 8px rgba(37,99,235,0.10);
}
.add-cart-btn:hover {
  background: linear-gradient(90deg, var(--color-accent) 0%, var(--color-primary) 100%);
  color: #fff;
}
@media (max-width: 600px) {
  .product-card {
    max-width: 97vw;
    padding: 0.7em 0.2em 1em 0.2em;
  }
  .product-img {
    max-width: 95vw;
    height: 220px;
  }
  .thumbnails img {
    width: 36px;
    height: 36px;
  }
}
</style>
