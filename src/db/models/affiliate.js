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
      //RELACION GRUPO FAMILIAR Y TITULAR
      this.belongsTo(models.Affiliate, {
        foreignKey: 'titularId',
        as: 'titular',
        onDelete: 'CASCADE',
      });

      this.hasMany(models.Affiliate, {
        foreignKey: 'titularId',
        as: 'familiares',
        onDelete: 'CASCADE',
      });
      //RELACION CON TURNOS
      this.hasMany(models.Appointment, {
        foreignKey: 'affiliateId',
        as: 'turnos',
        onDelete: 'CASCADE',
      }),
        //RELACION CON AUTORIZACIONES
        this.hasMany(models.Refund, {
          foreignKey: {
            name: 'affiliateId',
            allowNull: false
          },
          as: 'afiliado',
          onDelete: 'CASCADE',
        })
      this.hasMany(models.Authorization, {
        foreignKey: 'affiliateId',
        as: 'autorizaciones'
      })
      //RELACION DE RECETAS
      this.hasMany(models.Recipe, {
        foreignKey: {
          name: 'affiliateId',
          allowNull: false
        },
        as: 'recetas',
        onDelete: 'CASCADE',
      })

    }
  }
  Affiliate.init({
    tipoDeDocumento: { type: DataTypes.STRING, allowNull: false },
    numeroDeDocumento: { type: DataTypes.STRING, allowNull: false, unique: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    fechaDeNacimiento: { type: DataTypes.DATEONLY, allowNull: false },
    numeroDeAfiliado: { type: DataTypes.STRING, allowNull: false },
    situacionTerapeutica: { type: DataTypes.STRING, allowNull: false },
    parentesco: {
      type: DataTypes.ENUM('TITULAR', 'CONYUGE', 'HIJO', 'OTRO'),
      allowNull: false
    },
    planMedico: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    correoElectronico: { type: DataTypes.STRING, allowNull: false },
    direccion: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING,allowNull:true },
    titularId: {
      type: DataTypes.INTEGER,
      allowNull: true, 
      references: {
        model: 'Affiliates', 
        key: 'id'
      }
    }

  }, {
    sequelize,
    modelName: 'Affiliate',
    timestamps: true
  });
  return Affiliate;
};