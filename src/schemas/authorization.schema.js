const Joi = require("joi");

const authorizationSchema = Joi.object({
  affiliateId: Joi.alternatives()
    .try(Joi.number().integer(), Joi.string().valid("")) // acepta número o string vacío
    .messages({
      "number.base": "El ID del afiliado debe ser un número.",
    }),

  fechaDePrestacion: Joi.date()
    .min("now")
    .required()
    .messages({
      "date.base": "La fecha de prestación debe ser una fecha válida.",
      "date.min": "La fecha no puede ser anterior a hoy.",
      "any.required": "El campo fechaDePrestacion es obligatorio.",
    }),

  nombreDelAfiliado: Joi.string()
    .min(2)
    .optional()
    .messages({
      "string.base": "El nombre del afiliado debe ser un texto.",
      "string.min": "El nombre del afiliado debe tener al menos 2 caracteres.",
    }),

  nombreDelMedico: Joi.string()
    .min(2)
    .required()
    .messages({
      "string.base": "El nombre del médico debe ser un texto.",
      "any.required": "El campo nombreDelMedico es obligatorio.",
    }),

  especialidad: Joi.string()
    .required()
    .messages({
      "string.base": "La especialidad debe ser un texto.",
      "any.required": "El campo especialidad es obligatorio.",
    }),

  lugarDePrestacion: Joi.string()
    .required()
    .messages({
      "string.base": "El lugar de prestación debe ser un texto.",
      "any.required": "El campo lugarDePrestacion es obligatorio.",
    }),

  diasDeInternacion: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      "number.base": "Los días de internación deben ser un número.",
      "number.min": "Los días de internación no pueden ser negativos.",
      "any.required": "El campo diasDeInternacion es obligatorio.",
    }),

  observaciones: Joi.string()
    .allow("")
    .max(255)
    .messages({
      "string.base": "Las observaciones deben ser texto.",
      "string.max": "Las observaciones no pueden superar los 255 caracteres.",
    }),

  estado: Joi.string()
    .valid("Pendiente", "En análisis", "Autorizado", "Rechazado", "Observado")
    .default("Pendiente")
    .messages({
      "any.only": "El estado debe ser uno de los valores válidos.",
    }),
})
  .or("affiliateId", "nombreDelAfiliado")
  .messages({
    "object.missing": "Faltan campos obligatorios o algunos son inválidos.",
  });

  // Nuevo schema flexible para updates (PUT)
const authorizationUpdateSchema = Joi.object({
  affiliateId: Joi.number().integer().optional(),
  fechaDePrestacion: Joi.date().optional(),
  nombreDelAfiliado: Joi.string().optional(),
  nombreDelMedico: Joi.string().optional(),
  especialidad: Joi.string().optional(),
  lugarDePrestacion: Joi.string().optional(),
  diasDeInternacion: Joi.number().integer().min(0).optional(),
  observaciones: Joi.string().allow("").max(255).optional(),
  estado: Joi.string()
    .valid("Pendiente", "En análisis", "Autorizado", "Rechazado", "Observado")
    .optional(),
});

module.exports = { authorizationSchema, authorizationUpdateSchema };
