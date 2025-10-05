'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recipe.init({
    nombreDelMedicamento: DataTypes.STRING,
    presentacion: DataTypes.STRING,
    paciente: DataTypes.STRING,
    numeroDeDocumento: DataTypes.STRING,
    fechaDeEmision: DataTypes.DATEONLY,
    cantidad: DataTypes.INTEGER,
    estado: DataTypes.STRING,
    observaciones: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipe',
    timestamps: false
  });
  return Recipe;
};