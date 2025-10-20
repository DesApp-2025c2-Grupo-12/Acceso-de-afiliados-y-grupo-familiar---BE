const express = require("express");
const cors = require("cors");

const db = require("./db/models");
const rutaAfiliados = require("./routes/affiliate.routes");
const rutaRecetas = require("./routes/recipe.routes");
const rutaReintegros = require("./routes/refund.routes")
const rutaAutorizaciones = require("./routes/authorization.routes")
const rutaTurnos = require("./routes/appointment.routes")
const rutaAgendaDeTurnos = require("./routes/appointmentSchedule.routes")
const rutaPrestadores = require("./routes/provider.routes")

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/affiliate", rutaAfiliados);
app.use("/recipes", rutaRecetas);
app.use("/refund", rutaReintegros)
app.use("/authorization", rutaAutorizaciones)
app.use("/appointment", rutaTurnos)
app.use("/appointmentSchedule", rutaAgendaDeTurnos)
app.use("/provider", rutaPrestadores)

// Función de inicio
const start = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✔️ Conexión a la base de datos OK");
    //await db.sequelize.sync({ force: true })
    await db.sequelize.sync({alter: true});

    console.log("✔️ Generación de tablas OK");

    app.listen(PORT, () => {
      console.log(`🚀 La app arrancó en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  }
};

start();
