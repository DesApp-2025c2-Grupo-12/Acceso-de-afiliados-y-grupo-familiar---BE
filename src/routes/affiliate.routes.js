const { Router } = require("express");
const router = Router();
const AffiliateController =require("../controllers/affiliate.controller");
const validateIds = require('../middlewares/validateIds')
const { validateDocument, validatePassword } = require('../middlewares/affiliateMiddlewares');


router.get("/",AffiliateController.getAffiliates);
router.get("/:id",validateIds,AffiliateController.getAffiliateById);
router.get("/tieneHijos/:id",validateIds,AffiliateController.tieneHijos)
router.get("/verificar-documento/:documento", validateDocument,AffiliateController.verificarsiHayAfiliadoConDocumento);
router.get("/verificar-password/:documento",validateDocument,AffiliateController.tieneContraseña)
router.get("/es-su-contrasena/:documento/:password", validateDocument, validatePassword,AffiliateController.esSuContraseña)
router.get("/afiliado-por-documento/:documento",validateDocument,AffiliateController.getAffiliateByDocument)
router.get("/grupo-familiar/:documento",validateDocument,AffiliateController.getGrupoFamiliar)
router.post("/",AffiliateController.createAffiliate);
router.put("/agregar-password/:documento/:password",validateDocument, validatePassword,AffiliateController.agregarContraseña);
router.put("/:id",validateIds,AffiliateController.updateAffiliate);
router.delete("/:id",validateIds,AffiliateController.deleteAffiliate)



module.exports = router;