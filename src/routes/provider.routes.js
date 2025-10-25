const { Router } = require("express");
const router = Router();
const providerController = require("../controllers/providers.controller");


router.get("/", providerController.getProviders);          
router.get("/:id", providerController.getProviderById);   
router.post("/", providerController.createProvider);      
router.put("/:id", providerController.updateProvider);   
router.delete("/:id", providerController.deleteProvider); 

module.exports = router;
