'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Providers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numeroDeCuit_Cuil: {
        type: Sequelize.STRING
      },
      nombreCompleto: {
        type: Sequelize.STRING
      },
      especialidad: {
        type: Sequelize.STRING
      },
      
      esCentro: {
        type: Sequelize.BOOLEAN
      },
      integraCentro: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      correoElectronico: {
        type: Sequelize.STRING
      },
      direccion: {
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
    await queryInterface.dropTable('Providers');
  }
};