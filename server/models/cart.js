// Modelo Cart
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    // solo userId por ahora
  });
  Cart.associate = models => {
    Cart.belongsTo(models.User);
    Cart.hasMany(models.CartItem);
  };
  return Cart;
};
