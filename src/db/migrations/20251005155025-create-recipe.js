'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombreDelMedicamento: {
        type: Sequelize.STRING
      },
      presentacion: {
        type: Sequelize.STRING
      },
      paciente: {
        type: Sequelize.STRING
      },
      numeroDeDocumento: {
        type: Sequelize.STRING
      },
      fechaDeEmision: {
        type: Sequelize.DATEONLY
      },
      cantidad: {
        type: Sequelize.INTEGER
      },
      estado: {
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
    await queryInterface.dropTable('Recipes');
  }
};