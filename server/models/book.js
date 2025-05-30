// Modelo Book especializado para marketplace de libros usados
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    publisher: { type: DataTypes.STRING },
    edition: { type: DataTypes.STRING },
    condition: { type: DataTypes.STRING, allowNull: false }, // nuevo, usado, como nuevo, etc.
    price: { type: DataTypes.FLOAT, allowNull: false },
    isbn: { type: DataTypes.STRING },
    language: { type: DataTypes.STRING },
    genre: { type: DataTypes.STRING },
    year: { type: DataTypes.INTEGER },
    coverImage: { type: DataTypes.STRING }, // URL imagen
    description: { type: DataTypes.TEXT },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
  });
  Book.associate = models => {
    Book.belongsTo(models.User, { foreignKey: 'userId' }); // vendedor
    Book.hasMany(models.CartItem, { foreignKey: 'bookId' });
    Book.hasMany(models.OrderItem, { foreignKey: 'bookId' });
    Book.hasMany(models.Favorite, { foreignKey: 'bookId' });
    // TODO: Book.hasMany(models.Review, { foreignKey: 'bookId' });
  };
  return Book;
};
