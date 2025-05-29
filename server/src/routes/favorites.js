// Rutas para favoritos de usuario
const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');

const { authRequired } = require('../middleware/auth');

router.get('/', authRequired, favoritesController.getFavorites);
router.post('/add', authRequired, favoritesController.addFavorite);
router.post('/remove', authRequired, favoritesController.removeFavorite);

module.exports = router;
