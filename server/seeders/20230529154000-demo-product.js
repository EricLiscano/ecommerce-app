'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Books', [
      {
        title: 'Cien años de soledad',
        author: 'Gabriel García Márquez',
        publisher: 'Editorial Sudamericana',
        edition: '1ª',
        condition: 'usado',
        price: 15.99,
        isbn: '978-0307474728',
        language: 'Español',
        genre: 'Realismo mágico',
        year: 1967,
        coverImage: 'https://images.penguinrandomhouse.com/cover/9780307474728',
        description: 'La saga de la familia Buendía en Macondo.',
        userId: 1,
        stock: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '1984',
        author: 'George Orwell',
        publisher: 'Secker & Warburg',
        edition: '1ª',
        condition: 'como nuevo',
        price: 12.50,
        isbn: '978-0451524935',
        language: 'Inglés',
        genre: 'Distopía',
        year: 1949,
        coverImage: 'https://images.penguinrandomhouse.com/cover/9780451524935',
        description: 'Un clásico sobre el control totalitario.',
        userId: 1,
        stock: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'El nombre de la rosa',
        author: 'Umberto Eco',
        publisher: 'Bompiani',
        edition: '2ª',
        condition: 'usado',
        price: 18.00,
        isbn: '978-0156001311',
        language: 'Español',
        genre: 'Novela histórica',
        year: 1980,
        coverImage: 'https://images.penguinrandomhouse.com/cover/9780156001311',
        description: 'Misterio en una abadía medieval.',
        userId: 1,
        stock: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Harry Potter y la piedra filosofal',
        author: 'J.K. Rowling',
        publisher: 'Salamandra',
        edition: '1ª',
        condition: 'nuevo',
        price: 20.00,
        isbn: '978-8478884452',
        language: 'Español',
        genre: 'Fantasía',
        year: 1997,
        coverImage: 'https://images.penguinrandomhouse.com/cover/9788478884452',
        description: 'El inicio de la saga mágica.',
        userId: 1,
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
