"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // Un usuario tiene muchas tareas
      Usuario.hasMany(models.Tarea, { foreignKey: "usuarioId", as: "tareas" });
    }
  }

  Usuario.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["USER", "ADMIN"]],
        },
        defaultValue: "USER",
      },
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "Usuarios",
      timestamps: true,
    }
  );

  return Usuario;
};
