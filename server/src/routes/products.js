// Rutas de productos
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { authRequired, adminRequired } = require('../middleware/auth');

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', authRequired, adminRequired, productsController.create);
router.put('/:id', authRequired, adminRequired, productsController.update);
router.delete('/:id', authRequired, adminRequired, productsController.remove);

module.exports = router;
