'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Refund extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       this.belongsTo(models.Affiliate, {
        foreignKey:{
           name:'affiliateId',
           allowNull:true
        },
        as: 'afiliado',
      })
    }
  }
  Refund.init({
    fechaDePrestacion: {type:DataTypes.DATEONLY, allowNull:false},
    nombreDelAfiliado: {type:DataTypes.STRING, allowNull:false},
    nombreDelMedico: {type:DataTypes.STRING, allowNull:false},
    especialidad: {type:DataTypes.STRING, allowNull:false},
    lugarDeAtencion: {type:DataTypes.STRING, allowNull:false},
    facturacion_Fecha: {type:DataTypes.DATEONLY, allowNull:false},
    facturacion_Cuit: {type:DataTypes.STRING, allowNull:false},
    facturacion_ValorTotal: {type:DataTypes.INTEGER, allowNull:false},
    facturacion_NombreDePersonaACobrar: {type:DataTypes.STRING, allowNull:false},
    formaDePago: {type:DataTypes.STRING, allowNull:false},
    cbu: {type:DataTypes.STRING, allowNull:false},
    observaciones: {type:DataTypes.STRING},

    affiliateId: {
      type: DataTypes.INTEGER,
      allowNull: true,  
      references: {
        model: 'Affiliates',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Refund',
  });
  return Refund;
};