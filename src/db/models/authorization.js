'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Authorization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Authorization.init({
    fechaDePrestacion: {type:DataTypes.DATEONLY, allowNull:false},
    nombreDelAfiliado: {type:DataTypes.STRING, allowNull:false},
    nombreDelMedico: {type:DataTypes.STRING, allowNull:false},
    especialidad: {type:DataTypes.STRING, allowNull:false},
    lugarDePrestacion: {type:DataTypes.STRING, allowNull:false},
    diasDeInternacion: {type:DataTypes.INTEGER, allowNull:false},
    observaciones: {type:DataTypes.STRING},
    estado: {type: DataTypes.ENUM('Pendiente', "Observada", "Rechazada", "En análisis", "Aprobada"), allowNull: false, defaultValue: 'Pendiente'}
  }, {
    sequelize,
    modelName: 'Authorization',
  });
  return Authorization;
};