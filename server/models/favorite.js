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
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Books',
        key: 'id'
      }
    }
  }, {
    tableName: 'Favorites',
    timestamps: true
  });

  Favorite.associate = models => {
    Favorite.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
    Favorite.belongsTo(models.Book, { foreignKey: 'bookId', targetKey: 'id' });
  };

  return Favorite;
};
