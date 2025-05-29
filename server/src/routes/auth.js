// Rutas de autenticación: registro, login, recuperación
const express = require('express');
const router = express.Router();

// Controladores de autenticación (a crear)
const authController = require('../controllers/authController');

const { authRequired } = require('../middleware/auth');

const registerValidation = require('../middleware/validateRegister');
router.post('/register', registerValidation, authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authRequired, authController.me);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
