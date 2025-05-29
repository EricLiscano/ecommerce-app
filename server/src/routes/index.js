// Archivo central de rutas
const express = require('express');
const router = express.Router();

// Importar sub-rutas
router.use('/auth', require('./auth'));
router.use('/products', require('./products'));
router.use('/cart', require('./cart'));
router.use('/favorites', require('./favorites'));
router.use('/user', require('./user'));
router.use('/admin', require('./admin'));
router.use('/checkout', require('./checkout'));

module.exports = router;
