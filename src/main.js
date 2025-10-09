const express = require("express");
const db = require("./db/models");
const affiliate = require("./db/models/affiliate");
const recipe = require("./db/models/recipe")
const app = express();
const PORT = 3000;
const rutaAfiliados = require("./routes/affiliate.routes")
const rutaRecetas = require("./routes/recipe.routes")
const cors = require("cors");





app.use(cors());
app.use(express.json());
app.use("/affiliate", rutaAfiliados);
app.use("/recipes", rutaRecetas);



const start = async () => {
  
    // si exportaste sequelize como db.sequelize
    await db.sequelize.authenticate();
    console.log("✔️ Conexión a la base de datos OK");

    // NO sincronizar si usás migraciones (comentado intencionalmente)
    // await db.sequelize.sync();
    
    app.listen(PORT, async () => {
      console.log(`La app arrancó en el puerto ${PORT}.`);
      // ¡No sincronizar porque ya estamos usando migraciones!
      // await db.sequelize.sync({ force: true });
    });
  };

  start()

