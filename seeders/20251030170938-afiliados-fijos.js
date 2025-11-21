'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // PRIMERO: Insertar solo el titular
    await queryInterface.bulkInsert('affiliates', [{
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
      correoElectronico: 'juan@email.com',
      direccion: 'Calle 123',
      password: null,
      titularId: null, 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    // SEGUNDO: Insertar familiares que referencian al titular
    await queryInterface.bulkInsert('affiliates', [
      {
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
        correoElectronico: 'maria@email.com',
        direccion: 'Calle 123',
        password: null,
        titularId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipoDeDocumento: 'DNI',
        numeroDeDocumento: '56123456',
        nombre: 'Pedro',
        apellido: 'Pérez',
        fechaDeNacimiento: '2015-03-10', 
        numeroDeAfiliado: 'HIJ001',
        situacionTerapeutica: 'Estable',
        parentesco: 'HIJO', 
        planMedico: 'Plan Oro',
        telefono: '1122334455',
        correoElectronico: 'pedro@email.com',
        direccion: 'Calle 123',
        password: null,
        titularId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipoDeDocumento: 'DNI',
        numeroDeDocumento: '45123456',
        nombre: 'Ana',
        apellido: 'Pérez',
        fechaDeNacimiento: '2000-01-05', 
        numeroDeAfiliado: 'HIJ002',
        situacionTerapeutica: 'Estable',
        parentesco: 'HIJO', 
        planMedico: 'Plan Oro',
        telefono: '1122334455',
        correoElectronico: 'ana@email.com',
        direccion: 'Calle 123',
        password: null,
        titularId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('affiliates', null, {});
  }
};