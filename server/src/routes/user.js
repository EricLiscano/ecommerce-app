// Rutas para perfil y configuración de usuario
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/profile', userController.getProfile);
router.post('/preferences', userController.updatePreferences);

module.exports = router;
