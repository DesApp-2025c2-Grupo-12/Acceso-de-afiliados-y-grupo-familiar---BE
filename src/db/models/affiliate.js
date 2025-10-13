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
    tipoDeDocumento: {type:DataTypes.STRING,allowNull:false},
    numeroDeDocumento: {type:DataTypes.STRING,allowNull:false,unique:true},
    nombre: {type:DataTypes.STRING,allowNull:false},
    apellido: {type:DataTypes.STRING,allowNull:false},
    fechaDeNacimiento:{ type:DataTypes.DATEONLY,allowNull:false},
    numeroDeAfiliado: {type:DataTypes.STRING,allowNull:false},
    situacionTerapeutica: {type:DataTypes.STRING,allowNull:false},
    parentesco: {type:DataTypes.STRING,allowNull:false},
    perteneceA: {type:DataTypes.STRING,allowNull:false},
    planMedico: {type:DataTypes.STRING,allowNull:false},
    telefono: {type:DataTypes.STRING,allowNull:false},
    correoElectronico: {type:DataTypes.STRING,allowNull:false},
    direccion: {type:DataTypes.STRING,allowNull:false},
    password: {type:DataTypes.STRING}
  }, {
    sequelize,
    modelName: 'Affiliate',
    timestamps: true
  });
  return Affiliate;
};