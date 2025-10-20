const { Router } = require("express");
const router = Router();
const ProviderControllers = require("../controllers/provider.controller");

router.get("/", ProviderControllers.getProviders);
router.get("/:id", ProviderControllers.getProviderById);
router.post("/", ProviderControllers.createProvider);
router.put("/:id", ProviderControllers.updateProvider);
router.delete("/:id", ProviderControllers.deleteProvider);

module.exports = router;