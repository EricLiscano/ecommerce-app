// Configuración de Sequelize y modelos
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
const User = require('../../models/user')(sequelize, Sequelize);
const Book = require('../../models/book')(sequelize, Sequelize);
const Cart = require('../../models/cart')(sequelize, Sequelize);
const CartItem = require('../../models/cartitem')(sequelize, Sequelize);
const Order = require('../../models/order')(sequelize, Sequelize);
const OrderItem = require('../../models/orderitem')(sequelize, Sequelize);
const Favorite = require('../../models/favorite')(sequelize, Sequelize);

db.User = User;
db.Book = Book;
db.Cart = Cart;
db.CartItem = CartItem;
db.Order = Order;
db.OrderItem = OrderItem;
db.Favorite = Favorite;

// Asociaciones
Object.values(db).forEach(model => {
  if (model.associate) model.associate(db);
});

module.exports = db;
