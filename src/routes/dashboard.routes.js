const { Router } = require("express");
const { getDashboardResumen } = require("../controllers/dashboard.controller");

const router = Router();

router.get("/resumen/:affiliateId", getDashboardResumen);

module.exports = router;
