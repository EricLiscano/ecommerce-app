// Controlador de órdenes
const db = require('../models');

// Crear orden desde el carrito
exports.createOrder = async (req, res) => {
  try {
    const db = require('../models');
    const userId = req.user && req.user.id;
    // Obtener el carrito y los items
    const [carts] = await db.sequelize.query('SELECT "id" FROM "Carts" WHERE "userId" = :userId LIMIT 1', {
      replacements: { userId },
      type: db.Sequelize.QueryTypes.SELECT
    });
    const cartId = carts && carts.id;
    if (!cartId) return res.status(400).json({ error: 'Carrito vacío' });
    const [items] = await db.sequelize.query(`
      SELECT ci.*, b."stock", b."title", b."price"
      FROM "CartItems" ci
      JOIN "Books" b ON ci."bookId" = b."id"
      WHERE ci."cartId" = :cartId
    `, {
      replacements: { cartId },
      type: db.Sequelize.QueryTypes.SELECT
    });
    if (!items || items.length === 0) return res.status(400).json({ error: 'Carrito vacío' });
    // Validar stock
    for (const item of items) {
      if (item.quantity > item.stock) {
        return res.status(400).json({ error: `Sin stock para ${item.name}` });
      }
    }
    // Crear orden
    const [orderResult] = await db.sequelize.query(
      'INSERT INTO "Orders" ("userId", "createdAt", "updatedAt") VALUES (:userId, NOW(), NOW()) RETURNING *',
      { replacements: { userId }, type: db.Sequelize.QueryTypes.INSERT }
    );
    const order = orderResult && orderResult[0] ? orderResult[0] : orderResult;
    // Crear order items y descontar stock
    for (const item of items) {
      await db.sequelize.query(
        'INSERT INTO "OrderItems" ("orderId", "bookId", "quantity", "price", "createdAt", "updatedAt") VALUES (:orderId, :bookId, :quantity, :price, NOW(), NOW())',
        {
          replacements: {
            orderId: order.id,
            bookId: item.bookId,
            quantity: item.quantity,
            price: item.price
          },
          type: db.Sequelize.QueryTypes.INSERT
        }
      );
      // Descontar stock
      await db.sequelize.query(
        'UPDATE "Books" SET "stock" = "stock" - :quantity WHERE "id" = :bookId',
        {
          replacements: { quantity: item.quantity, bookId: item.bookId },
          type: db.Sequelize.QueryTypes.UPDATE
        }
      );
    }
    // Vaciar carrito
    await db.sequelize.query('DELETE FROM "CartItems" WHERE "cartId" = :cartId', {
      replacements: { cartId },
      type: db.Sequelize.QueryTypes.DELETE
    });
    res.status(201).json({ orderId: order.id });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear orden' });
  }
};

// Obtener órdenes propias (usuario)
exports.getMyOrders = async (req, res) => {
  try {
    const db = require('../models');
    const userId = req.user && req.user.id;
    const [orders] = await db.sequelize.query(`
      SELECT o.*
      FROM "Orders" o
      WHERE o."userId" = :userId
      ORDER BY o."createdAt" DESC
    `, {
      replacements: { userId },
      type: db.Sequelize.QueryTypes.SELECT
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
};

// Obtener todas las órdenes (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const db = require('../models');
    const [orders] = await db.sequelize.query(`
      SELECT o.*, u."name" as userName, u."email" as userEmail
      FROM "Orders" o
      JOIN "Users" u ON o."userId" = u."id"
      ORDER BY o."createdAt" DESC
    `, {
      type: db.Sequelize.QueryTypes.SELECT
    });
    res.json(orders);
  } catch (err) {
    const error = isDevelopment ? err : 'Error al obtener órdenes';
    res.status(500).json({ error });
  }
};
