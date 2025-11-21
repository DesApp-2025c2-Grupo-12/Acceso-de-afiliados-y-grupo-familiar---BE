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
        type: Sequelize.STRING,
        allowNull: false
      },
      numeroDeDocumento: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apellido: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fechaDeNacimiento: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      numeroDeAfiliado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      situacionTerapeutica: {
        type: Sequelize.STRING,
        allowNull: false
      },
      parentesco: {
        type: Sequelize.ENUM('TITULAR', 'CONYUGE', 'HIJO', 'OTRO'),
        allowNull: false
      },
      planMedico: {
        type: Sequelize.STRING,
        allowNull: false
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: false
      },
      correoElectronico: {
        type: Sequelize.STRING,
        allowNull: false
      },
      direccion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      titularId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Affiliates',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    
    await queryInterface.addIndex('Affiliates', ['titularId']);
    await queryInterface.addIndex('Affiliates', ['numeroDeDocumento']); // Ya debería ser único
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Affiliates');
  }
};