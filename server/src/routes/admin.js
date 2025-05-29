// Rutas protegidas para administración
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/products', adminController.createProduct);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);

module.exports = router;
