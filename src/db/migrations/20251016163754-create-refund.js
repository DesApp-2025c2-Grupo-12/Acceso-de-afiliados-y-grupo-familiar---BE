'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Refunds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaDePrestacion: {
        type: Sequelize.DATEONLY
      },
      nombreDelAfiliado: {
        type: Sequelize.STRING
      },
      nombreDelMedico: {
        type: Sequelize.STRING
      },
      especialidad: {
        type: Sequelize.STRING
      },
      lugarDeAtencion: {
        type: Sequelize.STRING
      },
      facturacion_Fecha: {
        type: Sequelize.DATEONLY
      },
      facturacion_Cuit: {
        type: Sequelize.STRING
      },
      facturacion_ValorTotal: {
        type: Sequelize.INTEGER
      },
      facturacion_NombreDePersonaACobrar: {
        type: Sequelize.STRING
      },
      formaDePago: {
        type: Sequelize.STRING
      },
      cbu: {
        type: Sequelize.STRING
      },
      observaciones: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Refunds');
  }
};