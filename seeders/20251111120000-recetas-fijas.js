module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Recipes', [
      {
        nombreDelMedicamento: "Amoxicilina 500 mg x 16",
        presentacion: "Comprimidos",
        paciente: "Juan Perez",
        numeroDeDocumento: "38322514",
        cantidad: 1,
        estado: "Recibido",
        observaciones: "Tomar cada 8 horas durante 7 días, con comida",
        affiliateId: 94, // Juan
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombreDelMedicamento: "Ibuprofeno 400 mg x 20",
        presentacion: "Comprimidos",
        paciente: "Gabriel Perez",
        numeroDeDocumento: "38322515",
        cantidad: 2,
        estado: "En análisis",
        observaciones: "No exceder 3 dosis al día, tomar con agua",
        affiliateId: 95, // Gabriel
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombreDelMedicamento: "Paracetamol 500 mg x 16",
        presentacion: "Jarabe",
        paciente: "Minerba Perez",
        numeroDeDocumento: "38322516",
        cantidad: 1,
        estado: "Observado",
        observaciones: "Adecuado para fiebre y dolor, seguir dosis según edad",
        affiliateId: 96, // Minerba
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombreDelMedicamento: "Loratadina 10 mg x 10",
        presentacion: "Comprimidos",
        paciente: "Luciana Perez",
        numeroDeDocumento: "38322517",
        cantidad: 1,
        estado: "Recibido",
        observaciones: "Antihistamínico, ideal para alergias estacionales",
        affiliateId: 97, // Luciana
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Recipes', null, {});
  },
};
