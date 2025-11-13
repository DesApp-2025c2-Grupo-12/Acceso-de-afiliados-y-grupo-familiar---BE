'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const reintegros = [
      {
        fechaDePrestacion: "2025-10-15",
        nombreDelAfiliado: "juan",
        nombreDelMedico: "Dr Garcia",
        especialidad: "pediatria",
        lugarDeAtencion: "calle blibli 245",
        facturacion_Fecha: "2025-10-20",
        facturacion_Cuit: "20-38322514-8",
        facturacion_ValorTotal: 45000,
        facturacion_NombreDePersonaACobrar: "juan",
        formaDePago: "transferencia",
        cbu: "2850590940090418135201",
        observaciones: "Consulta por hernia",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId: null
      },
      {
        fechaDePrestacion: "2025-10-18",
        nombreDelAfiliado: "gabriel",
        nombreDelMedico: "Dr Santilla",
        especialidad: "pediatria",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        facturacion_Fecha: "2025-10-22",
        facturacion_Cuit: "20-38322514-8",
        facturacion_ValorTotal: 38000,
        facturacion_NombreDePersonaACobrar: "juan",
        formaDePago: "deposito",
        cbu: "2850590940090418135201",
        observaciones: "Control diabetes",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId: null
      },
      {
        fechaDePrestacion: "2025-10-22",
        nombreDelAfiliado: "minerba",
        nombreDelMedico: "Dr Robledo",
        especialidad: "clinico",
        lugarDeAtencion: "calle siempreviva 245",
        facturacion_Fecha: "2025-10-25",
        facturacion_Cuit: "20-38322514-8",
        facturacion_ValorTotal: 52000,
        facturacion_NombreDePersonaACobrar: "juan",
        formaDePago: "cheque",
        cbu: "2850590940090418135201",
        observaciones: "Control hipotiroidismo",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId: null
      },
      {
        fechaDePrestacion: "2025-10-28",
        nombreDelAfiliado: "juan",
        nombreDelMedico: "Dr Shepherd",
        especialidad: "Neurologia",
        lugarDeAtencion: "Grey-Sloan Memorial",
        facturacion_Fecha: "2025-11-02",
        facturacion_Cuit: "20-38322514-8",
        facturacion_ValorTotal: 75000,
        facturacion_NombreDePersonaACobrar: "juan",
        formaDePago: "transferencia",
        cbu: "2850590940090418135201",
        observaciones: "Estudios neurológicos",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId: null
      },
      {
        fechaDePrestacion: "2025-11-05",
        nombreDelAfiliado: "luciana",
        nombreDelMedico: "Dr Gonzalez",
        especialidad: "cardiologia",
        lugarDeAtencion: "calle wallabi 42,Sydney",
        facturacion_Fecha: "2025-11-08",
        facturacion_Cuit: "20-38322514-8",
        facturacion_ValorTotal: 42000,
        facturacion_NombreDePersonaACobrar: "juan",
        formaDePago: "efectivo",
        cbu: "2850590940090418135201",
        observaciones: "Control cardiológico rutinario",
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
