'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AppointmentSchedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombreDelPrestador: {
        type: Sequelize.STRING
      },
      lugarDeAtencion: {
        type: Sequelize.STRING
      },
      especialidad: {
        type: Sequelize.STRING
      },
      horarioInicio: {
        type: Sequelize.TIME
      },
      horarioFin: {
        type: Sequelize.TIME
      },
      dias: {
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
    await queryInterface.dropTable('AppointmentSchedules');
  }
};