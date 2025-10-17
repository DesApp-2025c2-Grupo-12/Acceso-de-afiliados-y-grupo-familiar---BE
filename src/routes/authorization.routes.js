const { Router } = require("express");
const router = Router();
const AuthorizationControllers = require("../controllers/authorization.controller");

router.get("/", AuthorizationControllers.getAuthorizations);
router.get("/:id", AuthorizationControllers.getAuthorizationById);
router.post("/", AuthorizationControllers.createAuthorization);
router.put("/:id", AuthorizationControllers.updateAuthorization);
router.delete("/:id", AuthorizationControllers.deleteAuthorization);

module.exports = router;