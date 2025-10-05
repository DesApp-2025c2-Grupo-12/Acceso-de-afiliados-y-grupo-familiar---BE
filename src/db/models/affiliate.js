'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Affiliate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Affiliate.init({
    tipoDeDocumento: DataTypes.STRING,
    numeroDeDocumento: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    fechaDeNacimiento: DataTypes.DATEONLY,
    numeroDeAfiliado: DataTypes.STRING,
    situacionTerapeutica: DataTypes.STRING,
    parentesco: DataTypes.STRING,
    planMedico: DataTypes.STRING,
    telefono: DataTypes.STRING,
    correoElectronico: DataTypes.STRING,
    direccion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Affiliate',
    timestamps: false
  });
  return Affiliate;
};