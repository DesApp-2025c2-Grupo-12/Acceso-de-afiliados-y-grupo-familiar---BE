const Joi = require("joi");

const ESPECIALIDADES = [
  "Cardiología",
  "Pediatría",
  "Dermatología",
  "Clínica Médica",
  "Ginecología",
  "Neurología",
  "Traumatología",
];

const UBICACIONES = ["CABA", "Buenos Aires", "Córdoba", "Santa Fe", "Mendoza"];
const ZONAS = ["Norte", "Sur", "Este", "Oeste"];

// Schema de validación general de prestadores
const providerBaseSchema = Joi.object({
  numeroDeCuit_Cuil: Joi.string()
    .pattern(/^\d{2}-\d{8}-\d{1}$/)
    .required()
    .messages({
      "string.pattern.base": "El CUIT/CUIL debe tener el formato XX-XXXXXXXX-X",
      "any.required": "Debe ingresar el número de CUIT/CUIL",
    }),

  nombreCompleto: Joi.string()
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]{1,100}$/)
    .required()
    .messages({
      "string.pattern.base": "El nombre solo puede contener letras y hasta 100 caracteres",
      "any.required": "Debe ingresar el nombre del prestador",
    }),

  especialidad: Joi.string()
    .valid(...ESPECIALIDADES)
    .required()
    .messages({
      "any.only": `Especialidad inválida. Debe ser una de: ${ESPECIALIDADES.join(", ")}`,
    }),

  esCentro: Joi.boolean().required(),

  integraCentro: Joi.string()
    .valid(...ZONAS)
    .when("esCentro", {
      is: true,
      then: Joi.required(),
      otherwise: Joi.allow(null),
    })
    .messages({
      "any.only": `Zona inválida. Debe ser una de: ${ZONAS.join(", ")}`,
      "any.required": "Debe ingresar una zona si es un centro médico",
    }),

  telefono: Joi.string()
    .pattern(/^[0-9+\s-]{7,20}$/)
    .required()
    .messages({
      "string.pattern.base": "El teléfono solo puede contener números, espacios o guiones (7-20 caracteres)",
    }),

  correoElectronico: Joi.string().email().required().messages({
    "string.email": "Debe ingresar un correo electrónico válido",
  }),

  direccion: Joi.string().max(255).required(),

  horarioInicio: Joi.string()
    .pattern(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "El horario de inicio debe tener el formato HH:MM:SS",
    }),

  horarioFin: Joi.string()
    .pattern(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "El horario de fin debe tener el formato HH:MM:SS",
    }),

  dias: Joi.string().max(100).required(),
});

// Para creación
const createProviderSchema = providerBaseSchema;

// Para actualización
const updateProviderSchema = providerBaseSchema.fork(
  Object.keys(providerBaseSchema.describe().keys),
  (schema) => schema.optional()
);

// Para búsqueda (query params)
const providerQuerySchema = Joi.object({
  nombre: Joi.string().max(50).optional(),
  especialidad: Joi.string().valid(...ESPECIALIDADES).optional(),
  location: Joi.string().valid(...UBICACIONES).optional(),
  zona: Joi.string().valid(...ZONAS).optional(),
});

module.exports = {
  createProviderSchema,
  updateProviderSchema,
  providerQuerySchema,
};
