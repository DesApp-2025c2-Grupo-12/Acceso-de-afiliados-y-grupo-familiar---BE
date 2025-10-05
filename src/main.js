const express = require("express");
const db = require("./db/models");
const app = express ();
const PORT = 3306;
app.use(express.json());

app.listen(PORT, async () => {
  console.log(`La app arrancó en el puerto ${PORT}.`);
  // ¡No sincronizar porque ya estamos usando migraciones!
  // await db.sequelize.sync({ force: true });
});