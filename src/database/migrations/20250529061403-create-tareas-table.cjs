"use strict";
/**
 * @type {import('sequelize-cli').Migration}
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tareas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      fecha_vencimiento: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      estado_tarea: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "ASIGNADA",
      },
      prioridad: {
        type: Sequelize.ENUM("baja", "media", "alta"),
        allowNull: false,
        defaultValue: "media",
      },
      lugar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cantidad_horas: {
        type: Sequelize.FLOAT, // Horas pueden ser decimales
        allowNull: true,
      },
      imagen_ruta: {
        type: Sequelize.STRING,
        allowNull: true,
        // aquí solo guardamos la ruta o nombre del archivo
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios", // nombre de la tabla de usuarios
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Tareas");
  },
};
