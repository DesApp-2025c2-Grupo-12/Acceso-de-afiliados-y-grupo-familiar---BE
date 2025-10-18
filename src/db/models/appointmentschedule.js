'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppointmentSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AppointmentSchedule.init({
    nombreDelPrestador: {type:DataTypes.STRING, allowNull:false},
    lugarDeAtencion: {type:DataTypes.STRING, allowNull:false},
    especialidad: {type:DataTypes.STRING, allowNull:false},
    horarioInicio: {type:DataTypes.TIME, allowNull:false},
    horarioFin: {type:DataTypes.TIME,  allowNull:false}
  }, {
    sequelize,
    modelName: 'AppointmentSchedule',
  });
  return AppointmentSchedule;
};