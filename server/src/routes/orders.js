const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const { authRequired, adminRequired } = require('../middleware/auth');

// Crear orden desde carrito
router.post('/', authRequired, ordersController.createOrder);
// Ver órdenes propias
router.get('/mine', authRequired, ordersController.getMyOrders);
// Ver todas las órdenes (admin)
router.get('/', authRequired, adminRequired, ordersController.getAllOrders);

module.exports = router;
