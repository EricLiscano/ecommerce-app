const db = require('../models');
// Controlador de favoritos
const isDevelopment = process.env.NODE_ENV !== 'production';
/**
 * Obtener favoritos del usuario
 */
exports.getFavorites = async (req, res) => {
  try {
    const db = require('../models');
    if (!req.user || !req.user.id) {
      return res.json([]);
    }
    const userId = req.user.id;
    const [results] = await db.sequelize.query(`
      SELECT f."id" as favoriteId, f."userId", f."bookId",
             b."id" as bookId, b."title", b."author", b."description", b."price", b."stock", b."coverImage", b."genre", b."year"
      FROM "Favorites" f
      LEFT JOIN "Books" b ON f."bookId" = b."id"
      WHERE f."userId" = :userId
    `, {
      replacements: { userId },
      type: db.Sequelize.QueryTypes.SELECT
    });
    if (!results || results.length === 0) return res.json([]);
    res.json(Array.isArray(results) ? results.filter(r => r.bookId) : [results]);
  } catch (err) {
    const error = isDevelopment ? err : 'Error al obtener favoritos';
    res.status(500).json({ error });
  }
};

/**
 * Agregar a favoritos
 */
exports.addFavorite = async (req, res) => {
  try {
    const db = require('../models');
    const { bookId } = req.body;
    const userId = req.user && req.user.id;
    if (!bookId) return res.status(400).json({ error: 'Falta bookId' });
    // Verificar si ya existe
    const [exists] = await db.sequelize.query('SELECT "id" FROM "Favorites" WHERE "userId" = :userId AND "bookId" = :bookId', {
      replacements: { userId, bookId },
      type: db.Sequelize.QueryTypes.SELECT
    });
    if (exists && exists.id) return res.status(409).json({ error: 'Ya es favorito' });
    // Insertar favorito
    const [result] = await db.sequelize.query('INSERT INTO "Favorites" ("userId", "bookId", "createdAt", "updatedAt") VALUES (:userId, :bookId, NOW(), NOW()) RETURNING *', {
      replacements: { userId, bookId },
      type: db.Sequelize.QueryTypes.INSERT
    });
    res.status(201).json(result && result[0] ? result[0] : result);
  } catch (err) {
    const error = isDevelopment ? err : 'Error al agregar favorito';
    res.status(500).json({ error });
  }
};

/**
 * Remover de favoritos
 */
exports.removeFavorite = async (req, res) => {
  try {
    const db = require('../models');
    const { bookId } = req.body;
    const userId = req.user && req.user.id;
    // Verificar si existe
    const [fav] = await db.sequelize.query('SELECT "id" FROM "Favorites" WHERE "userId" = :userId AND "bookId" = :bookId', {
      replacements: { userId, bookId },
      type: db.Sequelize.QueryTypes.SELECT
    });
    if (!fav || !fav.id) return res.status(404).json({ error: 'No es favorito' });
    await db.sequelize.query('DELETE FROM "Favorites" WHERE "id" = :id', {
      replacements: { id: fav.id },
      type: db.Sequelize.QueryTypes.DELETE
    });
    res.json({ message: 'Eliminado de favoritos' });
  } catch (err) {
    const error = isDevelopment ? err : 'Error al eliminar favorito';
    res.status(500).json({ error });
  }
};
