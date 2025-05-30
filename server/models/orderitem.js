// Modelo OrderItem
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    price: { type: DataTypes.FLOAT, allowNull: false }
  });
  OrderItem.associate = models => {
    OrderItem.belongsTo(models.Order);
    OrderItem.belongsTo(models.Book, { foreignKey: 'bookId' });
  };
  return OrderItem;
};
