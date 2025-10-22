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
      this.belongsTo(models.Affiliate, {
        foreignKey: 'affiliateId',
        as: 'afiliado',
      })
    }
  }
  Appointment.init({
    nombreDelPrestador: { type: DataTypes.STRING, allowNull: false },
    lugarDeAtencion: { type: DataTypes.STRING, allowNull: false },
    especialidad: { type: DataTypes.STRING, allowNull: false },
    horario: { type: DataTypes.TIME, allowNull: false },
    fecha: { type: DataTypes.DATEONLY, allowNull: false }
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};