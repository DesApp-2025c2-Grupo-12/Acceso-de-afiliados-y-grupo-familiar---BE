const { Router } = require("express");
const router = Router();
const AffiliateController =require("../controllers/affiliate.controller");


router.get("/",AffiliateController.getAffiliates);
router.get("/:id",AffiliateController.getAffiliateById);
router.post("/",AffiliateController.createAffiliate);
router.put("/:id",AffiliateController.updateAffiliate);
router.delete("/:id",AffiliateController.deleteAffiliate)


module.exports = router;