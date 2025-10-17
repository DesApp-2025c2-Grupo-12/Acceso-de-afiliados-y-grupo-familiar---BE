'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Appointment.init({
    presentacion: {type:DataTypes.STRING, allowNull:false},
    nombreDelPrestador: {type:DataTypes.STRING, allowNull:false},
    especialidad: {type:DataTypes.STRING, allowNull:false},
    nombreDelPaciente: {type:DataTypes.STRING},
    fechaDeEmision: {type:DataTypes.DATEONLY, allowNull:false},
    hora: {type:DataTypes.TIME, allowNull:false},
    lugarDeAtencion: {type:DataTypes.STRING, allowNull:false},
    estado: {type:DataTypes.STRING, allowNull:false},
    observaciones: {type:DataTypes.STRING}
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};