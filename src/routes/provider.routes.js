const express = require("express");
const router = express.Router();

const {
  getProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider,
} = require("../controllers/providers.controller.js");

const {
  validateProviderQuery,
  validateCreateProvider,
  validateUpdateProvider,
} = require("../middlewares/providerMiddleware.js");

// Rutas
router.get("/", validateProviderQuery, getProviders);
router.get("/:id", getProviderById);

// CRUD (solo pruebas o mantenimiento)
router.post("/", validateCreateProvider, createProvider);
router.put("/:id", validateUpdateProvider, updateProvider);
router.delete("/:id", deleteProvider);

module.exports = router;
