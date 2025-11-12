const { Router } = require("express");
const router = Router();
const AuthorizationControllers = require("../controllers/authorization.controller");
const { validateAuthorization } = require("../middlewares/authorization.middleware");

// Obtener todas las autorizaciones
router.get("/", AuthorizationControllers.getAuthorizations);

// Obtener una autorización por ID
router.get("/:id", AuthorizationControllers.getAuthorizationById);

// Crear una nueva autorización (valida el body con Joi)
router.post("/", validateAuthorization, AuthorizationControllers.createAuthorization);

// Actualizar una autorización existente (valida el body con Joi)
router.put("/:id", validateAuthorization, AuthorizationControllers.updateAuthorization);

// Eliminar una autorización
router.delete("/:id", AuthorizationControllers.deleteAuthorization);

module.exports = router;
