module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Camiseta Demo',
        description: 'Camiseta de algodón 100% orgánico. Ideal para todos los días.',
        price: 19.99,
        images: JSON.stringify(['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80']),
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Zapatillas Urbanas',
        description: 'Zapatillas cómodas y modernas para uso diario.',
        price: 59.99,
        images: JSON.stringify(['https://images.unsplash.com/photo-1517263904808-5dc0d6e3b6e6?auto=format&fit=crop&w=400&q=80']),
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mochila Casual',
        description: 'Mochila resistente, perfecta para viajes y universidad.',
        price: 34.99,
        images: JSON.stringify(['https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80']),
        stock: 75,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
