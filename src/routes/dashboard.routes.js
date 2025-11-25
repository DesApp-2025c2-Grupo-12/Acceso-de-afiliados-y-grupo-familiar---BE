const { Router } = require("express");
const { getDashboardResumen } = require("../controllers/dashboard.controller");

const router = Router();

// IMPORTANTE: la ruta correcta debe iniciar con /dashboard
router.get("/resumen/:affiliateId", getDashboardResumen);

module.exports = router;
