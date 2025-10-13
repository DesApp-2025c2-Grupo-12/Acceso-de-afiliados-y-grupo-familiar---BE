'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Affiliates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipoDeDocumento: {
        type: Sequelize.STRING
      },
      numeroDeDocumento: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      fechaDeNacimiento: {
        type: Sequelize.DATEONLY
      },
      numeroDeAfiliado: {
        type: Sequelize.STRING
      },
      situacionTerapeutica: {
        type: Sequelize.STRING
      },
      perteneceA: {
        type: Sequelize.STRING
      },
      planMedico: {
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
    await queryInterface.dropTable('Affiliates');
  }
};