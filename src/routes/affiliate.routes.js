const { Router } = require("express");
const router = Router();
const AffiliateController =require("../controllers/affiliate.controller");


router.get("/",AffiliateController.getAffiliates);
router.get("/:id",AffiliateController.getAffiliateById);
router.get("/verificar-documento/:documento", AffiliateController.verificarsiHayAfiliadoConDocumento);
router.get("/verificar-password/:documento",AffiliateController.tieneContraseña)
router.get("/es-su-contrasena/:documento/:password",AffiliateController.esSuContraseña)
router.get("/afiliado-por-documento/:documento",AffiliateController.getAffiliateByDocument)
router.get("/grupo-familiar/:documento",AffiliateController.getGrupoFamiliar)
router.post("/",AffiliateController.createAffiliate);
router.put("/agregar-password/:documento/:password",AffiliateController.agregarContraseña);
router.put("/:id",AffiliateController.updateAffiliate);
router.delete("/:id",AffiliateController.deleteAffiliate)



module.exports = router;