// Controlador de autenticación
const db = require('../models');
const bcrypt = require('bcryptjs');
const { signJwt } = require('../utils/jwt');
const nodemailer = require('nodemailer');
const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * Registro de usuario
 */
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  try {
    const db = require('../models');
    const { validationResult } = require('express-validator');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    // Validar existencia de email
    const [existsRows] = await db.sequelize.query('SELECT "id" FROM "Users" WHERE "email" = :email', {
      replacements: { email },
      type: db.Sequelize.QueryTypes.SELECT
    });
    if (existsRows && existsRows[0]) return res.status(409).json({ errors: [{ param: 'email', msg: 'Ya existe un usuario con ese email' }] });
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash(password, 10);
    const [userRows] = await db.sequelize.query(
      'INSERT INTO "Users" ("name", "email", "password", "createdAt", "updatedAt") VALUES (:name, :email, :password, NOW(), NOW()) RETURNING *',
      {
        replacements: { name, email, password: hash },
        type: db.Sequelize.QueryTypes.INSERT
      }
    );
    const user = userRows && userRows[0] ? userRows[0] : userRows;
    const { signJwt } = require('../utils/jwt');
    const token = signJwt(user);
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
    res.json({ user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    const isDev = process.env.NODE_ENV !== 'production';
    res.status(500).json({ error: isDev ? (err.message || err.toString()) : 'Error en el registro' });
  }
};

exports.login = async (req, res) => {
  try {
    const db = require('../models');
    const { email, password } = req.body;
    const [rows] = await db.sequelize.query('SELECT * FROM "Users" WHERE "email" = :email', {
      replacements: { email },
      type: db.Sequelize.QueryTypes.SELECT
    });
    const user = rows && rows[0];
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
    const bcrypt = require('bcryptjs');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });
    const { signJwt } = require('../utils/jwt');
    const token = signJwt(user);
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
    res.json({ user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(500).json({ error: 'Error en login' });
  }
};

/**
 * Logout
 */
exports.logout = async (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout exitoso' });
};

/**
 * Usuario actual
 */
exports.me = async (req, res) => {
  try {
    const db = require('../models');
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });
    const [rows] = await db.sequelize.query('SELECT "id", "name", "email", "isAdmin" FROM "Users" WHERE "id" = :id', {
      replacements: { id: req.user.id },
      type: db.Sequelize.QueryTypes.SELECT
    });
    const user = rows && rows[0];
    res.json({ user });
  } catch (err) {
    const error = isDevelopment ? err : 'Error al obtener usuario';
    res.status(500).json({ error });
  }
};

/**
 * Solicitud de recuperación de contraseña (demo)
 */
exports.forgotPassword = async (req, res) => {
  res.json({ message: 'Email de recuperación enviado (demo)' });
};

/**
 * Reseteo de contraseña (demo)
 */
exports.resetPassword = async (req, res) => {
  res.json({ message: 'Contraseña cambiada (demo)' });
};
