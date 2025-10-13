const express = require("express");
const cors = require("cors");

const db = require("./db/models");
const rutaAfiliados = require("./routes/affiliate.routes");
const rutaRecetas = require("./routes/recipe.routes");

const affiliate = require("./db/models/affiliate");
const recipe = require("./db/models/recipe");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/affiliate", rutaAfiliados);
app.use("/recipes", rutaRecetas);

const start = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✔️ Conexión a la base de datos OK");

    await db.sequelize.sync({ alter: true });
    console.log("✔️ Generación de tablas OK");

    app.listen(PORT, () => {
      console.log(`🚀 La app arrancó en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  }
};

start();

