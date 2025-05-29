// Middleware de autenticación y roles usando JWT en cookies httpOnly
const jwt = require('jsonwebtoken');

function authRequired(req, res, next) {
  const token = req.cookies?.token || req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No autenticado' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

function adminRequired(req, res, next) {
  if (!req.user?.isAdmin) return res.status(403).json({ error: 'Solo admin' });
  next();
}

module.exports = { authRequired, adminRequired };
