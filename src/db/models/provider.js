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
    esCentroOIndep: {type:DataTypes.STRING, allowNull:false},
    integraCentro: {type:DataTypes.STRING, allowNull:false},
    telefono: {type:DataTypes.STRING, allowNull:false},
    correoElectronico: {type:DataTypes.STRING, allowNull:false},
    direccion: {type:DataTypes.STRING, allowNull:false},
    horarioDeAtencion: {type:DataTypes.STRING, allowNull:false}
  }, {
    sequelize,
    modelName: 'Provider',
  });
  return Provider;
};