'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tarea.init({
    id: DataTypes.INTEGER,
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    fechaVencimiento: DataTypes.DATE,
    estado: DataTypes.STRING,
    prioridad: DataTypes.STRING,
    lugar: DataTypes.STRING,
    cantidadHoras: DataTypes.INTEGER,
    img: DataTypes.STRING,
    listo: DataTypes.BOOLEAN,
    idUsuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tarea',
  });
  return Tarea;
};