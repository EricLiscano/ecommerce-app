'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [{
      name: 'Producto de Prueba',
      description: 'Este es un producto de ejemplo para el eCommerce.',
      price: 199.99,
      stock: 10,
      images: JSON.stringify([
        'https://via.placeholder.com/400x300?text=Producto+1',
        'https://via.placeholder.com/400x300?text=Producto+1b'
      ]),
      shippingInfo: 'Envío a todo el país en 48h',
      category: 'Demo',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
