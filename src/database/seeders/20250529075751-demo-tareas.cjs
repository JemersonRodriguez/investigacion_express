'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(_queryInterface, Sequelize) {
    const { Tarea } = require('../../models/index.cjs');

    await Tarea.bulkCreate([
      {
        titulo: 'Comprar insumos',
        descripcion: 'Comprar papel y tinta para la impresora',
        fecha_vencimiento: '2025-06-10',
        estado_tarea: 'pendiente',
        prioridad: 'alta',
        lugar: 'Oficina principal',
        cantidad_horas: 2.5,
        imagen_ruta: null,
        esta_lista: false,
        usuarioId: 1, // Debe existir usuario con id 1
      },
      {
        titulo: 'Revisar correos',
        descripcion: 'Responder a los correos pendientes del cliente',
        fecha_vencimiento: '2025-06-05',
        estado_tarea: 'en progreso',
        prioridad: 'media',
        lugar: 'Casa',
        cantidad_horas: 1,
        imagen_ruta: null,
        esta_lista: false,
        usuarioId: 2, // Debe existir usuario con id 2
      }
    ]);
  },

  async down(_queryInterface, Sequelize) {
    const { Tarea } = require('../../models/index.cjs');
    await Tarea.destroy({ where: {}, truncate: true });
  }
};
