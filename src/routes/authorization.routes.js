const { Router } = require("express");
const router = Router();
const AuthorizationControllers = require("../controllers/authorization.controller");
const { validateAuthorization, validateAuthorizationUpdate } = require("../middlewares/authorization.middleware");
const { canManageFamilyMember } = require('../middlewares/affiliateMiddlewares');

// Obtener todas las autorizaciones
router.get("/", AuthorizationControllers.getAuthorizations);


//Obtener todas las autorizaciones de un mismo afiliado
router.get("/affiliateId/:affiliateId",AuthorizationControllers.getAuthorizationFromAffiliate)
//Obtener las autorizaciones de los hijos de un afiliado si este los tuviera
router.get("/childrensAffiliate/:affiliateId",AuthorizationControllers.getAuthorizationFromChildren)
// Obtener una autorización por ID
router.get("/:id", AuthorizationControllers.getAuthorizationById);

// Crear una nueva autorización (valida el body con Joi)
router.post("/", validateAuthorization, canManageFamilyMember, AuthorizationControllers.createAuthorization);

// Actualizar una autorización existente (valida el body con Joi)
router.put("/:id/usuario/:usuarioLogueadoId/afiliado/:affiliateId", canManageFamilyMember, AuthorizationControllers.updateAuthorization);

// Eliminar una autorización
router.delete("/:id/usuario/:usuarioLogueadoId/afiliado/:affiliateId", canManageFamilyMember, AuthorizationControllers.deleteAuthorization);

module.exports = router;
