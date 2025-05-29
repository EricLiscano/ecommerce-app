// Modelo Product
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    images: { type: DataTypes.JSON, allowNull: true },
    shippingInfo: { type: DataTypes.STRING, allowNull: true },
    category: { type: DataTypes.STRING, allowNull: true }
  });
  Product.associate = models => {
    Product.hasMany(models.CartItem);
    Product.hasMany(models.OrderItem);
    Product.hasMany(models.Favorite);
  };
  return Product;
};
