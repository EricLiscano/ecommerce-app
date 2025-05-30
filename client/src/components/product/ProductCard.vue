<template>
  <div class="product-card-windsurf card">
    <!-- BADGES -->
    <div class="badges">
      <span v-if="product.isNew" class="badge badge-new">Nuevo</span>
      <span v-if="product.isOnSale" class="badge badge-sale">Oferta</span>
      <span v-if="product.isLimited" class="badge badge-limited">Edición limitada</span>
    </div>
    <!-- IMAGEN PRINCIPAL -->
    <router-link :to="`/product/${product.id}`" class="img-link">
      <div class="img-gallery">
        <img
          v-if="mainImage"
          :src="mainImage"
          class="product-img-windsurf"
          :alt="product.name"
        />
        <img
          v-else
          src="/default-product.png"
          class="product-img-windsurf"
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
    <!-- NOMBRE Y FAVORITO -->
    <div class="product-header-windsurf">
      <h3 class="product-name-windsurf">{{ product.name }}</h3>
      <button class="favorite-btn-windsurf" :class="[isFavorite ? 'fas fa-heart' : 'far fa-heart']" @click.stop="$emit('toggle-favorite', product)">
        <i></i>
      </button>
    </div>
    <!-- PRECIO -->
    <p class="price-windsurf">${{ product.price }}</p>
    <!-- DESCRIPCIÓN BREVE -->
    <p class="desc-windsurf">{{ product.description ? product.description.slice(0, 80) + (product.description.length > 80 ? '...' : '') : 'Sin descripción' }}</p>
    <!-- BOTÓN CTA -->
    <AppButton class="add-cart-btn-windsurf" @click="$emit('add-to-cart', product)">
      <i class="fas fa-cart-plus"></i> Agregar al carrito
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');
.product-card-windsurf {
  font-family: 'Montserrat', 'Roboto', Arial, sans-serif;
  max-width: 350px;
  margin: 1.5em auto;
  background: #fafdff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0, 90, 180, 0.10);
  padding: 1.5em 1.2em 2em 1.2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: box-shadow 0.18s, transform 0.15s;
}
.product-card-windsurf:hover {
  box-shadow: 0 10px 38px rgba(0, 90, 180, 0.18);
  transform: translateY(-3px) scale(1.025);
}
.badges {
  position: absolute;
  top: 1.1em;
  left: 1.2em;
  display: flex;
  gap: 0.5em;
  z-index: 2;
}
.badge {
  font-size: 0.8em;
  padding: 0.3em 0.8em;
  border-radius: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
}
.badge-new { background: linear-gradient(90deg, #00b4d8 60%, #0096c7 100%); }
.badge-sale { background: linear-gradient(90deg, #ff7b54 60%, #ffb26b 100%); }
.badge-limited { background: linear-gradient(90deg, #4361ee 60%, #48cae4 100%); }
.img-link {
  width: 100%;
  display: block;
  margin-bottom: 0.7em;
}
.img-gallery {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-img-windsurf {
  width: 100%;
  max-width: 320px;
  height: 260px;
  object-fit: cover;
  border-radius: 14px;
  background: #e3f6fd;
  margin-bottom: 0.6em;
  box-shadow: 0 2px 14px rgba(0,90,180,0.09);
  border: 2px solid #caf0f8;
  transition: box-shadow 0.18s, border 0.18s;
}
.thumbnails {
  display: flex;
  gap: 0.35em;
  margin-bottom: 0.4em;
}
.thumbnails img {
  width: 42px;
  height: 42px;
  object-fit: cover;
  border-radius: 7px;
  border: 2px solid #caf0f8;
  cursor: pointer;
  background: #fafdff;
  transition: border 0.15s, box-shadow 0.12s;
}
.thumbnails img.active,
.thumbnails img:hover {
  border: 2px solid #00b4d8;
  box-shadow: 0 2px 8px rgba(0,180,216,0.14);
}
.product-header-windsurf {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.5em;
}
.product-name-windsurf {
  font-size: 1.25em;
  font-weight: 700;
  color: #023e8a;
  margin-bottom: 0.2em;
  margin-top: 0.2em;
  letter-spacing: 0.01em;
}
.favorite-btn-windsurf {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.45em;
  color: #90e0ef;
  transition: color 0.18s;
  margin-left: 0.5em;
}
.favorite-btn-windsurf.active,
.favorite-btn-windsurf:hover {
  color: #ff7b54;
}
.price-windsurf {
  font-weight: bold;
  color: #00b4d8;
  font-size: 1.22em;
  margin: 0.5em 0 0.4em 0;
  letter-spacing: 0.01em;
}
.desc-windsurf {
  color: #495057;
  font-size: 1em;
  margin-bottom: 1em;
  min-height: 2.3em;
  line-height: 1.4;
}
.add-cart-btn-windsurf {
  margin-top: 0.2em;
  width: 100%;
  font-size: 1.09em;
  font-weight: 600;
  border-radius: 8px;
  letter-spacing: 0.01em;
  padding: 0.85em 0;
  background: linear-gradient(90deg, #00b4d8 60%, #4361ee 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,180,216,0.14);
  border: none;
  transition: background 0.18s, color 0.18s;
}
.add-cart-btn-windsurf:hover {
  background: linear-gradient(90deg, #4361ee 0%, #00b4d8 100%);
  color: #fff;
}
@media (max-width: 600px) {
  .product-card-windsurf {
    max-width: 98vw;
    padding: 0.7em 0.2em 1.2em 0.2em;
  }
  .product-img-windsurf {
    max-width: 95vw;
    height: 170px;
  }
  .thumbnails img {
    width: 32px;
    height: 32px;
  }
}
</style>


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
