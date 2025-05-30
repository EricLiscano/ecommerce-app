// Controlador de productos
const db = require('../models');
const isDevelopment = process.env.NODE_ENV !== 'production';
/**
 * Listar todos los productos
 */
exports.getAll = async (req, res) => {
  try {
    const db = require('../models');
    const productos = await db.sequelize.query('SELECT * FROM "Books"', {
      type: db.Sequelize.QueryTypes.SELECT
    });
    // Siempre devolver un array, incluso si hay un solo producto
    const safeArray = Array.isArray(productos) ? productos : (productos ? [productos] : []);
    res.json(safeArray);
  } catch (err) {
    const error = isDevelopment ? err : 'Error al obtener productos';
    res.status(500).json({ error });
  }
};

/**
 * Obtener producto por ID
 */
exports.getById = async (req, res) => {
  try {
    const db = require('../models');
    const rows = await db.sequelize.query('SELECT * FROM "Books" WHERE "id" = :id', {
      replacements: { id: req.params.id },
      type: db.Sequelize.QueryTypes.SELECT
    });
    const producto = rows && rows[0];
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    const error = isDevelopment ? err : 'Error al obtener producto';
    res.status(500).json({ error });
  }
};

/**
 * Crear producto (solo admin)
 */
exports.create = async (req, res) => {
  try {
    const db = require('../models');
    const { name, description, price, stock, images, shippingInfo, category } = req.body;
    if (!name || !description || !price || !stock) return res.status(400).json({ error: 'Campos obligatorios faltantes' });
    const result = await db.sequelize.query(
      'INSERT INTO "Books" ("name", "description", "price", "stock", "images", "shippingInfo", "category", "createdAt", "updatedAt") VALUES (:name, :description, :price, :stock, :images, :shippingInfo, :category, NOW(), NOW()) RETURNING *',
      {
        replacements: { name, description, price, stock, images: JSON.stringify(images), shippingInfo, category },
        type: db.Sequelize.QueryTypes.INSERT
      }
    );
    const nuevo = result && result[0] ? result[0] : result;
    res.status(201).json(nuevo);
  } catch (err) {
    const error = isDevelopment ? err : 'Error al crear producto';
    res.status(500).json({ error });
  }
};

/**
 * Actualizar producto (solo admin)
 */
exports.update = async (req, res) => {
  try {
    const db = require('../models');
    const { name, description, price, stock, images, shippingInfo, category } = req.body;
    const rows = await db.sequelize.query('SELECT * FROM "Books" WHERE "id" = :id', {
      replacements: { id: req.params.id },
      type: db.Sequelize.QueryTypes.SELECT
    });
    const producto = rows && rows[0];
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    await db.sequelize.query(
      'UPDATE "Books" SET "title" = :title, "author" = :author, "description" = :description, "price" = :price, "stock" = :stock, "coverImage" = :coverImage, "publisher" = :publisher, "edition" = :edition, "condition" = :condition, "isbn" = :isbn, "language" = :language, "genre" = :genre, "year" = :year, "updatedAt" = NOW() WHERE "id" = :id',
      {
        replacements: { id: req.params.id, name, description, price, stock, images: JSON.stringify(images), shippingInfo, category },
        type: db.Sequelize.QueryTypes.UPDATE
      }
    );
    // Devuelve el producto actualizado
    const updatedRows = await db.sequelize.query('SELECT * FROM "Books" WHERE "id" = :id', {
      replacements: { id: req.params.id },
      type: db.Sequelize.QueryTypes.SELECT
    });
    res.json(updatedRows && updatedRows[0] ? updatedRows[0] : updatedRows);
  } catch (err) {
    const error = isDevelopment ? err : 'Error al actualizar producto';
    res.status(500).json({ error });
  }
};

/**
 * Eliminar producto (solo admin)
 */
exports.remove = async (req, res) => {
  try {
    const db = require('../models');
    const rows = await db.sequelize.query('SELECT * FROM "Books" WHERE "id" = :id', {
      replacements: { id: req.params.id },
      type: db.Sequelize.QueryTypes.SELECT
    });
    const producto = rows && rows[0];
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    await db.sequelize.query('DELETE FROM "Books" WHERE "id" = :id', {
      replacements: { id: req.params.id },
      type: db.Sequelize.QueryTypes.DELETE
    });
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    const error = isDevelopment ? err : 'Error al eliminar producto';
    res.status(500).json({ error });
  }
};
