// Modelo Favorite
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    }
  }, {
    tableName: 'Favorites',
    timestamps: true
  });

  Favorite.associate = models => {
    Favorite.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
    Favorite.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id' });
  };


  Favorite.associate = models => {
    Favorite.belongsTo(models.User, { foreignKey: 'userId' });
    Favorite.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  return Favorite;
};
