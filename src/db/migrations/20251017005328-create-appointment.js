'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      presentacion: {
        type: Sequelize.STRING
      },
      nombreDelPrestador: {
        type: Sequelize.STRING
      },
      especialidad: {
        type: Sequelize.STRING
      },
      nombreDelPaciente: {
        type: Sequelize.STRING
      },
      fechaDeEmision: {
        type: Sequelize.DATEONLY
      },
      hora: {
        type: Sequelize.TIME
      },
      lugarDeAtencion: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Appointments');
  }
};