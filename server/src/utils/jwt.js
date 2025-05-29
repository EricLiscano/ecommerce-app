// Utilidad para generar JWT
const jwt = require('jsonwebtoken');

function signJwt(user) {
  return jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

module.exports = { signJwt };
