const { authorizationSchema } = require("../schemas/authorization.schema");

const validateAuthorization = (req, res, next) => {
  const { error } = authorizationSchema.validate(req.body, { abortEarly: false });

  if (error) {
    // 🔹 Log técnico para el desarrollador
    console.error("Error de validación Joi:", error.details.map((e) => e.message));

    // 🔹 Respuesta simplificada para el usuario
    return res.status(400).json({
      error: "Faltan campos obligatorios o algunos son inválidos.",
    });
  }

  next();
};

module.exports = { validateAuthorization };