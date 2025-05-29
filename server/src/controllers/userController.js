// Controlador de usuario
/**
 * Obtener perfil de usuario
 */
exports.getProfile = async (req, res) => {
  try {
    const db = require('../models');
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ error: 'No autenticado' });
    const [rows] = await db.sequelize.query('SELECT "id", "email", "name" FROM "Users" WHERE "id" = :id', {
      replacements: { id: userId },
      type: db.Sequelize.QueryTypes.SELECT
    });
    const user = rows && rows[0];
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};

/**
 * Actualizar preferencias
 */
exports.updatePreferences = async (req, res) => {
  // Simula actualización de preferencias
  res.json({ message: 'Preferencias actualizadas (demo)', preferences: req.body });
};
