// CartService: lógica dedicada para carrito (localStorage + API ready)
const CART_KEY = 'cart_items';

export default {
  getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  },
  saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  },
  addItem(product, quantity = 1) {
    const cart = this.getCart();
    const idx = cart.findIndex(i => i.product.id === product.id);
    if (idx > -1) {
      cart[idx].quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    this.saveCart(cart);
    return cart;
  },
  removeItem(productId) {
    let cart = this.getCart();
    cart = cart.filter(i => i.product.id !== productId);
    this.saveCart(cart);
    return cart;
  },
  updateQuantity(productId, quantity) {
    const cart = this.getCart();
    const idx = cart.findIndex(i => i.product.id === productId);
    if (idx > -1) {
      cart[idx].quantity = quantity;
      if (cart[idx].quantity <= 0) cart.splice(idx, 1);
    }
    this.saveCart(cart);
    return cart;
  },
  clearCart() {
    this.saveCart([]);
  },
  getCount() {
    return this.getCart().reduce((sum, i) => sum + i.quantity, 0);
  },
  getSubtotal() {
    return this.getCart().reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }
};
