'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(_queryInterface, Sequelize) {
    const { Usuario } = require('../../models/index.cjs');

    await Usuario.bulkCreate([
      {
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        password: '123456',
      },
      {
        nombre: 'Ana Torres',
        email: 'ana@example.com',
        password: 'abcdef',
      }
    ]);
  },

  async down(_queryInterface, Sequelize) {
    const { Usuario } = require('../../models/index.cjs');
    await Usuario.destroy({ where: {}, truncate: true });
  }
};

