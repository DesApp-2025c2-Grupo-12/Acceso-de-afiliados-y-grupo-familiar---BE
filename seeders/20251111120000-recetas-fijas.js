'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const recetas = [
      {
        nombreDelMedicamento: "Paracetamol",
        presentacion: "Tabletas 500mg",
        paciente: "Juan Perez",
        numeroDeDocumento: "38322514",
        fechaDeEmision: new Date(),
        cantidad: 2,
        estado: "Recibido",
        observaciones: "Tomar después de las comidas",
        affiliateId: 1, // ID del afiliado correspondiente
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombreDelMedicamento: "Ibuprofeno",
        presentacion: "Tabletas 400mg",
        paciente: "Gabriel Perez",
        numeroDeDocumento: "38322515",
        fechaDeEmision: new Date(),
        cantidad: 1,
        estado: "En análisis",
        observaciones: "Evitar con estómago vacío",
        affiliateId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombreDelMedicamento: "Metformina",
        presentacion: "Tabletas 850mg",
        paciente: "Minerba Perez",
        numeroDeDocumento: "38322516",
        fechaDeEmision: new Date(),
        cantidad: 2,
        estado: "Observado",
        observaciones: "Controlar nivel de azúcar",
        affiliateId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombreDelMedicamento: "Omeprazol",
        presentacion: "Cápsulas 20mg",
        paciente: "Luciana Perez",
        numeroDeDocumento: "38322517",
        fechaDeEmision: new Date(),
        cantidad: 1,
        estado: "Recibido",
        observaciones: "Tomar antes del desayuno",
        affiliateId: 4,
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
