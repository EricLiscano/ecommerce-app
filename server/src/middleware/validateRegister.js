const { body, validationResult } = require('express-validator');

const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/).withMessage('El nombre solo puede contener letras y espacios'),
  body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('El email no es válido'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-z]/).withMessage('La contraseña debe tener al menos una minúscula')
    .matches(/[A-Z]/).withMessage('La contraseña debe tener al menos una mayúscula')
    .matches(/[0-9]/).withMessage('La contraseña debe tener al menos un número')
    .matches(/[^A-Za-z0-9]/).withMessage('La contraseña debe tener al menos un carácter especial'),
  body('confirmPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Las contraseñas no coinciden'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = registerValidation;
