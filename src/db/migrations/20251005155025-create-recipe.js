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
        type: Sequelize.STRING,
        allowNull: false
      },
      presentacion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      paciente: {
        type: Sequelize.STRING,
        allowNull: false
      },
      numeroDeDocumento: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fechaDeEmision: {
        type: Sequelize.DATEONLY,
        allowNull: true   // <-- Cambiado para permitir null
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      observaciones: {
        type: Sequelize.STRING,
        allowNull: false
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
