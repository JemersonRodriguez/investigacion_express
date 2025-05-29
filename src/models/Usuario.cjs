'use strict';
//Sequelize model for Usuario tanto los models como las migraciones deben de usar commonjs
// Las demas capas del servidor usan EMS pero no tienen problema con commonjs
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // Un usuario tiene muchas tareas
      Usuario.hasMany(models.Tarea, { foreignKey: 'usuarioId', as: 'tareas' });
    }
  }

  Usuario.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios',
    timestamps: true,
  });

  return Usuario;
};
