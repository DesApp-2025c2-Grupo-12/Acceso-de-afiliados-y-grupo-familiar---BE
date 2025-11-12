'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const reintegros = [
      {
        fechaDePrestacion: "2025-12-09",
        nombreDelAfiliado: "juan",
        nombreDelMedico: "Dr García",
        especialidad: "pediatria",
        lugarDeAtencion: "calle blibli 245",
        facturacion_Fecha: "2025-12-13",
        facturacion_Cuit: "20-38322514-8",
        facturacion_ValorTotal: 50000,
        facturacion_NombreDePersonaACobrar: "juan",
        formaDePago: "transferencia",
        cbu: "2850590940090418135201",
        observaciones: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId: null
      },
      {
        fechaDePrestacion: "2025-12-15",
        nombreDelAfiliado: "juan",
        nombreDelMedico: "Dr Gonzalez",
        especialidad: "Cardiología",
        lugarDeAtencion: "calle wallabi 42,Sydney",
        facturacion_Fecha: "2025-12-19",
        facturacion_Cuit: "20-38322514-8",
        facturacion_ValorTotal: 160000,
        facturacion_NombreDePersonaACobrar: "juan",
        formaDePago: "cheque",
        cbu: "2850590940090098765432",
        observaciones: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId: null
      },
      {
        fechaDePrestacion: "2025-12-23",
        nombreDelAfiliado: "juan",
        nombreDelMedico: "Dr Robledo",
        especialidad: "clinico",
        lugarDeAtencion: "calle siempreviva 245",
        facturacion_Fecha: "2025-12-29",
        facturacion_Cuit: "20-38322514-8",
        facturacion_ValorTotal: 25000,
        facturacion_NombreDePersonaACobrar: "juan",
        formaDePago: "efectivo",
        cbu: "1910000412000099001122",
        observaciones: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId: null
      },
      {
        fechaDePrestacion: "2025-12-25",
        nombreDelAfiliado: "juan",
        nombreDelMedico: "Dr Robledo",
        especialidad: "clinico",
        lugarDeAtencion: "calle siempreviva 245",
        facturacion_Fecha: "2025-12-30",
        facturacion_Cuit: "20-38322514-8",
        facturacion_ValorTotal: 30000,
        facturacion_NombreDePersonaACobrar: "juan",
        formaDePago: "deposito",
        cbu: "3210047620000005556667",
        observaciones: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId: null
      }
    ]
    await queryInterface.bulkInsert('Refunds', reintegros, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Refunds', null, {});
  }
};
