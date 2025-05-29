'use strict';
//Sequelize model for Usuario tanto los models como las migraciones deben de usar commonjs
// Las demas capas del servidor usan EMS pero no tienen problema con commonjs
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tarea extends Model {
    static associate(models) {
      // Cada tarea pertenece a un usuario
      Tarea.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
    }
  }

  Tarea.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: DataTypes.TEXT,
    fecha_vencimiento: DataTypes.DATEONLY,
    estado_tarea: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pendiente',
    },
    prioridad: {
      type: DataTypes.ENUM('baja', 'media', 'alta'),
      allowNull: false,
      defaultValue: 'media',
    },
    lugar: DataTypes.STRING,
    cantidad_horas: DataTypes.FLOAT,
    imagen_ruta: DataTypes.STRING,
    esta_lista: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: true, // o false si usas onDelete CASCADE
    },
  }, {
    sequelize,
    modelName: 'Tarea',
    tableName: 'Tareas',
    timestamps: true,
  });

  return Tarea;
};
