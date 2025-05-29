// Modelo Order
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' },
    total: { type: DataTypes.FLOAT, allowNull: false }
  });
  Order.associate = models => {
    Order.belongsTo(models.User);
    Order.hasMany(models.OrderItem);
  };
  return Order;
};
