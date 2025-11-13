const { authorizationSchema, authorizationUpdateSchema } = require("../schemas/authorization.schema");

// Validación para crear una autorización (POST)
const validateAuthorization = (req, res, next) => {
  const { error } = authorizationSchema.validate(req.body, { abortEarly: false });

  if (error) {
    console.error("Error de validación Joi:", error.details.map((e) => e.message));

    return res.status(400).json({
      message: "Error en los datos enviados",
      errors: error.details.map((d) => d.message),
    });
  }

  next();
};

// Validación para actualizar una autorización (PUT)
const validateAuthorizationUpdate = (req, res, next) => {
  const { error } = authorizationUpdateSchema.validate(req.body, { abortEarly: false });

  if (error) {
    console.error("Error de validación Joi (update):", error.details.map((e) => e.message));

    return res.status(400).json({
      message: "Error en los datos enviados para la actualización",
      errors: error.details.map((d) => d.message),
    });
  }

  next();
};

module.exports = { validateAuthorization, validateAuthorizationUpdate };
