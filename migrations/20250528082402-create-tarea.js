'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tareas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      fechaVencimiento: {
        type: Sequelize.DATE
      },
      estado: {
        type: Sequelize.STRING
      },
      prioridad: {
        type: Sequelize.STRING
      },
      lugar: {
        type: Sequelize.STRING
      },
      cantidadHoras: {
        type: Sequelize.INTEGER
      },
      img: {
        type: Sequelize.STRING
      },
      listo: {
        type: Sequelize.BOOLEAN
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios', // Asegúrate de que el nombre coincide con el de tu tabla de usuarios
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tareas');
  }
};
