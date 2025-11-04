const db = require("./src/db/models");
const providersData = require("./src/db/seeders/prestadores.json");

const seedProviders = async () => {
    try {
        await db.sequelize.authenticate();
        console.log("✔️ Conectado a la base de datos.");

        // Solo para desarrollo: sincronizar tablas y alterar si hay cambios
        await db.sequelize.sync({ alter: true }); // reemplaza sync() normal
        console.log("✔️ Tablas sincronizadas (alter:true)");

        // ⚠️ Para producción, comentar la siguiente línea para no borrar datos
        // await db.Provider.destroy({ where: {} });

        await db.Provider.bulkCreate(providersData, { ignoreDuplicates: true });
        console.log(`🚀 ${providersData.length} prestadores cargados correctamente.`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Error al cargar prestadores:", error);
        process.exit(1);
    }
};

seedProviders();
