'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const recetas = [
      {
        nombreDelMedicamento: "Amoxicilina 500 mg x 16",
        presentacion: "Comprimidos",
        paciente: "Juan Perez",
        numeroDeDocumento: "38322514",
        fechaDeEmision: new Date(),
        cantidad: 16,
        estado: "Recibido",
        observaciones: "Tomar cada 8 horas durante 7 días, con comida",
        affiliateId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombreDelMedicamento: "Ibuprofeno 400 mg x 20",
        presentacion: "Comprimidos",
        paciente: "Gabriel Perez",
        numeroDeDocumento: "38322515",
        fechaDeEmision: new Date(),
        cantidad: 20,
        estado: "En análisis",
        observaciones: "No exceder 3 dosis al día, tomar con agua",
        affiliateId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombreDelMedicamento: "Paracetamol 500 mg x 16",
        presentacion: "Jarabe",
        paciente: "Minerba Perez",
        numeroDeDocumento: "38322516",
        fechaDeEmision: new Date(),
        cantidad: 16,
        estado: "Observado",
        observaciones: "Adecuado para fiebre y dolor, seguir dosis según edad",
        affiliateId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombreDelMedicamento: "Loratadina 10 mg x 10",
        presentacion: "Comprimidos",
        paciente: "Luciana Perez",
        numeroDeDocumento: "38322517",
        fechaDeEmision: new Date(),
        cantidad: 10,
        estado: "Recibido",
        observaciones: "Antihistamínico, ideal para alergias estacionales",
        affiliateId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombreDelMedicamento: "Salbutamol 100 mcg x 1 inhalador",
        presentacion: "Inhalador",
        paciente: "Martin Lopez",
        numeroDeDocumento: "38322518",
        fechaDeEmision: new Date(),
        cantidad: 1,
        estado: "Recibido",
        observaciones: "Usar según necesidad para crisis de asma",
        affiliateId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombreDelMedicamento: "Naproxeno 250 mg x 14",
        presentacion: "Comprimidos",
        paciente: "Ana Martinez",
        numeroDeDocumento: "38322519",
        fechaDeEmision: new Date(),
        cantidad: 14,
        estado: "En análisis",
        observaciones: "Analgésico y antiinflamatorio, tomar con alimentos",
        affiliateId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Recipes', recetas, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Recipes', null, {});
  }
};
