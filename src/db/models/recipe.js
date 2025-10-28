'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      // define association here
    }
  }

  Recipe.init({
    nombreDelMedicamento: { type: DataTypes.STRING, allowNull: false },
    presentacion: { type: DataTypes.STRING, allowNull: false },
    paciente: { type: DataTypes.STRING, allowNull: false },
    numeroDeDocumento: { type: DataTypes.STRING, allowNull: false },
    fechaDeEmision: { type: DataTypes.DATEONLY, allowNull: true }, // allowNull ahora es true
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    estado: { type: DataTypes.STRING, allowNull: false },
    observaciones: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'Recipe',
    timestamps: true
  });

  return Recipe;
};
