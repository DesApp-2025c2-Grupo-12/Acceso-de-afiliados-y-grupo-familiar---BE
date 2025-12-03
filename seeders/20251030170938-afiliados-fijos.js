'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    await queryInterface.bulkInsert('affiliates', [
      {
        id: 1,
        tipoDeDocumento: 'DNI',
        numeroDeDocumento: '30123456',
        nombre: 'Juan',
        apellido: 'Pérez',
        fechaDeNacimiento: '1980-05-15',
        numeroDeAfiliado: 'TIT001',
        situacionTerapeutica: 'Estable',
        parentesco: 'TITULAR',
        planMedico: 'Plan Oro',
        telefono: '1122334455',
        correoElectronico: 'juanP@email.com',
        direccion: 'Calle 123',
        password: null,
        titularId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        tipoDeDocumento: 'DNI',
        numeroDeDocumento: '28987654',
        nombre: 'María',
        apellido: 'Pérez',
        fechaDeNacimiento: '1982-08-20',
        numeroDeAfiliado: 'CON001',
        situacionTerapeutica: 'Estable',
        parentesco: 'CONYUGE',
        planMedico: 'Plan Oro',
        telefono: '1166778899',
        correoElectronico: 'mariaP@email.com',
        direccion: 'Calle 123',
        password: null,
        titularId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        tipoDeDocumento: 'DNI',
        numeroDeDocumento: '56123456',
        nombre: 'Gabriel',
        apellido: 'Pérez',
        fechaDeNacimiento: '2015-03-10',
        numeroDeAfiliado: 'HIJ001',
        situacionTerapeutica: 'Estable',
        parentesco: 'HIJO',
        planMedico: 'Plan Oro',
        telefono: '1122334455',
        correoElectronico: 'gabrielP@email.com',
        direccion: 'Calle 123',
        password: null,
        titularId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        tipoDeDocumento: 'DNI',
        numeroDeDocumento: '45123456',
        nombre: 'Luciana',
        apellido: 'Pérez',
        fechaDeNacimiento: '2017-01-05',
        numeroDeAfiliado: 'HIJ002',
        situacionTerapeutica: 'Estable',
        parentesco: 'HIJO',
        planMedico: 'Plan Oro',
        telefono: '1122334455',
        correoElectronico: 'lucianaP@email.com',
        direccion: 'Calle 123',
        password: null,
        titularId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        tipoDeDocumento: 'DNI',
        numeroDeDocumento: '35000000',
        nombre: 'Joaquin',
        apellido: 'Pérez',
        fechaDeNacimiento: '2000-01-30',
        numeroDeAfiliado: 'OTR002',
        situacionTerapeutica: 'Estable',
        parentesco: 'OTRO',
        planMedico: 'Plan Oro',
        telefono: '1122334455',
        correoElectronico: 'joaquinPe@email.com',
        direccion: 'Calle 123',
        password: null,
        titularId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('affiliates', null, {});
  }
};