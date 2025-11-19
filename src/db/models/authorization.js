'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Authorization extends Model {
    static associate(models) {
      // cada autorización pertenece a un afiliado
      this.belongsTo(models.Affiliate, {
        foreignKey: 'affiliateId',
        as: 'afiliado'
      });
    }
  }

  Authorization.init({
    fechaDePrestacion: { type: DataTypes.DATEONLY, allowNull: false },
    nombreDelAfiliado: { type: DataTypes.STRING, allowNull: false },
    nombreDelMedico: { type: DataTypes.STRING, allowNull: false },
    especialidad: { type: DataTypes.STRING, allowNull: false },
    lugarDePrestacion: { type: DataTypes.STRING, allowNull: false },
    diasDeInternacion: { type: DataTypes.INTEGER, allowNull: false },
    observaciones: { type: DataTypes.STRING },
    estado: {
      type: DataTypes.ENUM('Pendiente', 'Observada', 'Rechazada', 'En análisis', 'Aprobada', 'Recibido'),
      allowNull: false,
      defaultValue: 'Pendiente'
    },
    // campo FK (declarado en el modelo; la columna física debe existir en la BD)
    affiliateId: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    sequelize,
    modelName: 'Authorization',
    timestamps: true
  });

  return Authorization;
};
