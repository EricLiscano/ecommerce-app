// Modelo User
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'usuario' }
  });
  User.associate = models => {
    User.hasMany(models.Cart);
    User.hasMany(models.Order);
    User.hasMany(models.Favorite);
  };
  return User;
};
