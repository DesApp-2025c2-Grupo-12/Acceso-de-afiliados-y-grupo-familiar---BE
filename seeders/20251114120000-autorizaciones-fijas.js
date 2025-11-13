'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const autorizaciones = [
      {
        fechaDePrestacion: "2025-11-10",
        nombreDelAfiliado: "juan",
        nombreDelMedico: "Dr. Gonzalez",
        especialidad: "Cardiología",
        lugarDePrestacion: "Hospital Central",
        diasDeInternacion: 0,
        observaciones: "Chequeo general anual",
        estado: "Pendiente",
        affiliateId: 38,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fechaDePrestacion: "2025-11-11",
        nombreDelAfiliado: "gabriel",
        nombreDelMedico: "Dra. Fernandez",
        especialidad: "Traumatología",
        lugarDePrestacion: "Clínica del Oeste",
        diasDeInternacion: 2,
        observaciones: "Rehabilitación post fractura",
        estado: "Aprobada",
        affiliateId: 39,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fechaDePrestacion: "2025-11-12",
        nombreDelAfiliado: "minerba",
        nombreDelMedico: "Dra. Castro",
        especialidad: "Pediatría",
        lugarDePrestacion: "Sanatorio Norte",
        diasDeInternacion: 0,
        observaciones: "Control de crecimiento",
        estado: "Observada",
        affiliateId: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fechaDePrestacion: "2025-11-13",
        nombreDelAfiliado: "luciana",
        nombreDelMedico: "Dr. Medina",
        especialidad: "Dermatología",
        lugarDePrestacion: "Centro Médico Sur",
        diasDeInternacion: 0,
        observaciones: "Tratamiento de alergia cutánea",
        estado: "Pendiente",
        affiliateId: 41,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Authorizations', autorizaciones, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Authorizations', null, {});
  }
};
