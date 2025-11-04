'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    static associate(models) {
      // En esta app no hay relación directa con recetas
      // (solo se consulta la cartilla)
    }
  }
  
  Provider.init({
    numeroDeCuit_Cuil: {type:DataTypes.STRING, allowNull:false},
    nombreCompleto: {type:DataTypes.STRING, allowNull:false},
    especialidad: {type:DataTypes.STRING, allowNull:false},
    esCentro: {type:DataTypes.BOOLEAN, allowNull:false},
    integraCentro: {type:DataTypes.STRING},
    telefono: {type:DataTypes.STRING, allowNull:false},
    correoElectronico: {type:DataTypes.STRING, allowNull:false},
    direccion: {type:DataTypes.STRING, allowNull:false},
    horarioInicio: {type:DataTypes.TIME, allowNull:false},
    horarioFin: {type:DataTypes.TIME, allowNull:false},
    dias: {type:DataTypes.STRING, allowNull:false},
  }, {
    sequelize,
    modelName: 'Provider',
  });
  return Provider;
};