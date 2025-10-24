const db = require("./src/db/models"); // apunta a tus modelos Sequelize
const providersData = require("./src/db/seeders/prestadores.json"); // tu JSON

const seedProviders = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✔️ Conectado a la base de datos.");

    await db.sequelize.sync();

    // Limpiar tabla antes de cargar
    await db.Provider.destroy({ where: {} });

    // Insertar prestadores del JSON
    await db.Provider.bulkCreate(providersData);
    console.log(`🚀 ${providersData.length} prestadores cargados correctamente.`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error al cargar prestadores:", error);
    process.exit(1);
  }
};

seedProviders();
