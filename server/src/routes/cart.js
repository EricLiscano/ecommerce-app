// Rutas para el carrito de compras
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

const { authRequired } = require('../middleware/auth');

router.get('/', authRequired, cartController.getCart);
router.post('/add', authRequired, cartController.addToCart);
router.post('/remove', authRequired, cartController.removeFromCart);
router.post('/update', authRequired, cartController.updateCartItem);

module.exports = router;
