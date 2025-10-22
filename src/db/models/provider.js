'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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