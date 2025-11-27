'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const autorizaciones = [
      {
        fechaDePrestacion: "2025-11-10",
        nombreDelAfiliado: "Juan Pérez",
        nombreDelMedico: "Dr. Gonzalez",
        especialidad: "Cardiología",
        lugarDePrestacion: "Hospital Central",
        diasDeInternacion: 0,
        observaciones: "Chequeo general anual",
        estado: "En análisis",
        affiliateId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fechaDePrestacion: "2025-11-11",
        nombreDelAfiliado: "Maria Pérez",
        nombreDelMedico: "Dra. Fernandez",
        especialidad: "Traumatología",
        lugarDePrestacion: "Clínica del Oeste",
        diasDeInternacion: 2,
        observaciones: "Rehabilitación post fractura",
        estado: "Aprobada",
        affiliateId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fechaDePrestacion: "2025-11-12",
        nombreDelAfiliado: "Minerba Pérez",
        nombreDelMedico: "Dra. Castro",
        especialidad: "Pediatría",
        lugarDePrestacion: "Sanatorio Norte",
        diasDeInternacion: 0,
        observaciones: "Control de crecimiento",
        estado: "Observada",
        affiliateId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fechaDePrestacion: "2025-11-13",
        nombreDelAfiliado: "Luciana Pérez",
        nombreDelMedico: "Dr. Medina",
        especialidad: "Dermatología",
        lugarDePrestacion: "Centro Médico Sur",
        diasDeInternacion: 0,
        observaciones: "Tratamiento de alergia cutánea",
        estado: "Recibido",
        affiliateId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fechaDePrestacion: "2025-12-10",
        nombreDelAfiliado: "Luciana Pérez",
        nombreDelMedico: "Dr. Romero",
        especialidad: "Cirujano",
        lugarDePrestacion: "Centro Médico La Trinidad",
        diasDeInternacion: 0,
        observaciones: "Rinoplastia",
        estado: "Rechazada",
        affiliateId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fechaDePrestacion: "2025-12-08",
        nombreDelAfiliado: "Gabriel Pérez",
        nombreDelMedico: "Dra. Castro",
        especialidad: "Pediatría",
        lugarDePrestacion: "Centro Médico La Trinidad",
        diasDeInternacion: 0,
        observaciones: "Mucha tos",
        estado: "Recibido",
        affiliateId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fechaDePrestacion: "2025-12-08",
        nombreDelAfiliado: "Gabriel Pérez",
        nombreDelMedico: "Dra. Castro",
        especialidad: "Pediatría",
        lugarDePrestacion: "Centro Médico La Trinidad",
        diasDeInternacion: 0,
        observaciones: "Mucha tos",
        estado: "Aprobada",
        affiliateId: 3,
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


//npx sequelize-cli db:seed:undo:all --config src/db/config/config.json --models-path src/db/models --seeders-path seeders --migrations-path src/db/migrations
//npm run seed:afiliados
//npm run seed:autorizaciones