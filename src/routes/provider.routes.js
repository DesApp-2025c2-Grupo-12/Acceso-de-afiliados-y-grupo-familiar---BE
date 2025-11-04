const express = require("express");
const router = express.Router();
const {
  getProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider
} = require("../controllers/providers.controller");

const { validateProviderBody, validateProviderQuery } = require("../middlewares/providerMiddleware");

// Rutas
router.get("/", validateProviderQuery, getProviders);
router.get("/:id", getProviderById);
router.post("/", validateProviderBody, createProvider);
router.put("/:id", validateProviderBody, updateProvider);
router.delete("/:id", deleteProvider);

module.exports = router;
