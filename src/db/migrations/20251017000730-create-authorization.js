'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Authorizations', {
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
      lugarDePrestacion: {
        type: Sequelize.STRING
      },
      diasDeInternacion: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Authorizations');
  }
};