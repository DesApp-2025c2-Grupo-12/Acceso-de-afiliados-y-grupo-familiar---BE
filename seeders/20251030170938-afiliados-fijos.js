'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const afiliados = [
      {

        tipoDeDocumento: "DNI",
        numeroDeDocumento: "38322514",
        nombre: "juan",
        apellido: "Perez",
        fechaDeNacimiento: "1994-05-30",
        numeroDeAfiliado: "11111",
        situacionTerapeutica: "hernia",
        parentesco: "afiliado",
        perteneceA: "38322514",
        planMedico: "933",
        telefono: "1162378565",
        correoElectronico: "facu@gmail.com",
        direccion: "siempreviva 123",
        password: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {

        tipoDeDocumento: "DNI",
        numeroDeDocumento: "38322515",
        nombre: "gabriel",
        apellido: "Perez",
        fechaDeNacimiento: "2000-05-30",
        numeroDeAfiliado: "11112",
        situacionTerapeutica: "diabetes",
        parentesco: "hijo",
        perteneceA: "38322514",
        planMedico: "933",
        telefono: "1155555555",
        correoElectronico: "gabi@gmail.com",
        direccion: "siempreviva 123",
        password: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {

        tipoDeDocumento: "DNI",
        numeroDeDocumento: "38322516",
        nombre: "minerba",
        apellido: "perez",
        fechaDeNacimiento: "1996-07-30",
        numeroDeAfiliado: "11113",
        situacionTerapeutica: "hipotiroidismo",
        parentesco: "conyugue",
        perteneceA: "38322514",
        planMedico: "933",
        telefono: "1166666666",
        correoElectronico: "minerba@gmail.com",
        direccion: "siempreviva 123",
        password: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {

        tipoDeDocumento: "DNI",
        numeroDeDocumento: "38322517",
        nombre: "luciana",
        apellido: "perez",
        fechaDeNacimiento: "2002-07-13",
        numeroDeAfiliado: "11114",
        situacionTerapeutica: "ninguna",
        parentesco: "hija",
        perteneceA: "38322514",
        planMedico: "933",
        telefono: "117777777",
        correoElectronico: "luciana@gmail.com",
        direccion: "siempreviva 123",
        password: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('affiliates', afiliados, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('affiliates', null, {});
  }
};
