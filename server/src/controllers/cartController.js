// Controlador del carrito de compras
const isDevelopment = process.env.NODE_ENV !== 'production';
/**
 * Obtener el carrito del usuario
 */
exports.getCart = async (req, res) => {
  try {
    const db = require('../models');
    const userId = req.user && req.user.id;
    if (!userId) return res.json({ items: [], total: 0 });
    // Buscar el carrito
    const [carts] = await db.sequelize.query(
      'SELECT "id" FROM "Carts" WHERE "userId" = :userId LIMIT 1',
      { replacements: { userId }, type: db.Sequelize.QueryTypes.SELECT }
    );
    if (!carts || !carts.id) return res.json({ items: [], total: 0 });
    // Buscar items del carrito con productos
    const [items] = await db.sequelize.query(`
      SELECT ci."bookId", ci."quantity", b."title", b."author", b."price", b."coverImage", b."stock"
      FROM "CartItems" ci
      JOIN "Books" b ON ci."bookId" = b."id"
      WHERE ci."cartId" = :cartId
    `, {
      replacements: { cartId: carts.id },
      type: db.Sequelize.QueryTypes.SELECT
    });
    const cartItems = (Array.isArray(items) ? items : [items]).filter(Boolean).map(item => ({
      id: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: (() => { try { const imgs = typeof item.images === 'string' ? JSON.parse(item.images) : item.images; return Array.isArray(imgs) ? imgs[0] : ''; } catch { return ''; } })(),
      stock: item.stock
    }));
    const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    res.json({ items: cartItems, total });
  } catch (err) {
    const error = isDevelopment ? err : 'Error al obtener carrito';
    res.status(500).json({ error });
  }
};

/**
 * Agregar producto al carrito
 */
exports.addToCart = async (req, res) => {
  try {
    const db = require('../models');
    const userId = req.user && req.user.id;
    const { bookId, quantity } = req.body;
    if (!userId || !bookId || !quantity || quantity < 1) return res.status(400).json({ error: 'Datos inválidos' });
    // Buscar o crear carrito
    let cartId;
    const [carts] = await db.sequelize.query(
      'SELECT "id" FROM "Carts" WHERE "userId" = :userId LIMIT 1',
      { replacements: { userId }, type: db.Sequelize.QueryTypes.SELECT }
    );
    if (carts && carts.id) {
      cartId = carts.id;
    } else {
      const [created] = await db.sequelize.query(
        'INSERT INTO "Carts" ("userId", "createdAt", "updatedAt") VALUES (:userId, NOW(), NOW()) RETURNING "id"',
        { replacements: { userId }, type: db.Sequelize.QueryTypes.INSERT }
      );
      cartId = created[0].id || created[0];
    }
    // Verificar producto y stock
    const [books] = await db.sequelize.query(
      'SELECT "id", "stock" FROM "Books" WHERE "id" = :bookId',
      { replacements: { bookId: productId }, type: db.Sequelize.QueryTypes.SELECT }
    );
    if (!books || !books.id) return res.status(404).json({ error: 'Libro no encontrado' });
    if (quantity > books.stock) return res.status(400).json({ error: 'No hay suficiente stock' });
    // Buscar item
    const [items] = await db.sequelize.query(
      'SELECT "id", "quantity" FROM "CartItems" WHERE "cartId" = :cartId AND "bookId" = :bookId',
      { replacements: { cartId, bookId }, type: db.Sequelize.QueryTypes.SELECT }
    );
    if (items && items.id) {
      // Actualizar cantidad
      const newQty = items.quantity + quantity;
      if (newQty > books.stock) return res.status(400).json({ error: 'No hay suficiente stock' });
      await db.sequelize.query(
        'UPDATE "CartItems" SET "quantity" = :quantity, "updatedAt" = NOW() WHERE "id" = :id',
        { replacements: { quantity: newQty, id: items.id }, type: db.Sequelize.QueryTypes.UPDATE }
      );
      res.json({ success: true, updated: true });
    } else {
      // Crear item
      await db.sequelize.query(
        'INSERT INTO "CartItems" ("cartId", "bookId", "quantity", "createdAt", "updatedAt") VALUES (:cartId, :bookId, :quantity, NOW(), NOW())',
        { replacements: { cartId, bookId, quantity }, type: db.Sequelize.QueryTypes.INSERT }
      );
      res.json({ success: true, created: true });
    }
  } catch (err) {
    const error = isDevelopment ? err : 'Error al agregar al carrito';
    res.status(500).json({ error });
  }
};

// Quitar producto del carrito
exports.removeFromCart = async (req, res) => {
  try {
    const db = require('../models');
    const userId = req.user && req.user.id;
    const { bookId } = req.body;
    // Buscar carrito
    const [carts] = await db.sequelize.query('SELECT "id" FROM "Carts" WHERE "userId" = :userId LIMIT 1', {
      replacements: { userId },
      type: db.Sequelize.QueryTypes.SELECT
    });
    const cartId = carts && carts.id;
    if (!cartId) return res.status(404).json({ error: 'Carrito no encontrado' });
    // Buscar item
    const [items] = await db.sequelize.query('SELECT * FROM "CartItems" WHERE "cartId" = :cartId AND "bookId" = :bookId', {
      replacements: { cartId, bookId },
      type: db.Sequelize.QueryTypes.SELECT
    });
    const item = items && items[0];
    if (!item) return res.status(404).json({ error: 'Producto no está en el carrito' });
    await db.sequelize.query('DELETE FROM "CartItems" WHERE "id" = :id', {
      replacements: { id: item.id },
      type: db.Sequelize.QueryTypes.DELETE
    });
    res.json({ message: 'Producto eliminado del carrito' });
  } catch (err) {
    const error = process.env.NODE_ENV !== 'production' ? err : 'Error al quitar producto';
    res.status(500).json({ error });
  }
};

// Modificar cantidad de un producto en el carrito
exports.updateCartItem = async (req, res) => {
  try {
    const db = require('../models');
    const userId = req.user && req.user.id;
    const { bookId, quantity } = req.body;
    if (!bookId || !quantity || quantity < 1) return res.status(400).json({ error: 'Datos inválidos' });
    // Buscar carrito
    const [carts] = await db.sequelize.query('SELECT "id" FROM "Carts" WHERE "userId" = :userId LIMIT 1', {
      replacements: { userId },
      type: db.Sequelize.QueryTypes.SELECT
    });
    const cartId = carts && carts.id;
    if (!cartId) return res.status(404).json({ error: 'Carrito no encontrado' });
    // Verificar producto
    const [books] = await db.sequelize.query('SELECT * FROM "Books" WHERE "id" = :bookId', {
      replacements: { bookId },
      type: db.Sequelize.QueryTypes.SELECT
    });
    const book = books && books[0];
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    if (quantity > product.stock) return res.status(400).json({ error: 'No hay suficiente stock' });
    // Buscar item
    const [items] = await db.sequelize.query('SELECT * FROM "CartItems" WHERE "cartId" = :cartId AND "bookId" = :bookId', {
      replacements: { cartId, bookId },
      type: db.Sequelize.QueryTypes.SELECT
    });
    const item = items && items[0];
    if (!item) return res.status(404).json({ error: 'Producto no está en el carrito' });
    // Actualizar cantidad
    await db.sequelize.query('UPDATE "CartItems" SET "quantity" = :quantity, "updatedAt" = NOW() WHERE "id" = :id', {
      replacements: { quantity, id: item.id },
      type: db.Sequelize.QueryTypes.UPDATE
    });
    // Devolver item actualizado
    const [updatedItems] = await db.sequelize.query('SELECT * FROM "CartItems" WHERE "id" = :id', {
      replacements: { id: item.id },
      type: db.Sequelize.QueryTypes.SELECT
    });
    res.json(updatedItems && updatedItems[0] ? updatedItems[0] : updatedItems);
  } catch (err) {
    const error = process.env.NODE_ENV !== 'production' ? err : 'Error al actualizar cantidad';
    res.status(500).json({ error });
  }
};

// Vaciar carrito
exports.clearCart = async (req, res) => {
  try {
    const db = require('../models');
    const userId = req.user && req.user.id;
    // Buscar carrito
    const [carts] = await db.sequelize.query('SELECT "id" FROM "Carts" WHERE "userId" = :userId LIMIT 1', {
      replacements: { userId },
      type: db.Sequelize.QueryTypes.SELECT
    });
    const cartId = carts && carts.id;
    if (!cartId) return res.status(404).json({ error: 'Carrito no encontrado' });
    await db.sequelize.query('DELETE FROM "CartItems" WHERE "cartId" = :cartId', {
      replacements: { cartId },
      type: db.Sequelize.QueryTypes.DELETE
    });
    res.json({ message: 'Carrito vaciado' });
  } catch (err) {
    const error = process.env.NODE_ENV !== 'production' ? err : 'Error al vaciar carrito';
    res.status(500).json({ error });
  }
};
