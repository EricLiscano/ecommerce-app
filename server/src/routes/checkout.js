// Rutas para el checkout y pagos
const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

router.post('/', checkoutController.processCheckout);

module.exports = router;
