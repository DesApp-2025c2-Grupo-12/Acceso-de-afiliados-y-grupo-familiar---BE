const Joi = require('joi');
const affiliate = require('../db/models/affiliate');

// Schema base para reintegro
const refundBaseSchema = Joi.object({
  fechaDePrestacion: Joi.date().iso().required()
    .messages({
      'date.base': 'La fecha de prestación debe ser una fecha válida',
      'date.format': 'La fecha de prestación debe estar en formato YYYY-MM-DD',
      'any.required': 'La fecha de prestación es obligatoria'
    }),

  nombreDelAfiliado: Joi.string().max(150).required()
    .messages({
      'string.empty': 'El nombre del afiliado es obligatorio',
      'string.max': 'El nombre del afiliado no puede exceder 150 caracteres',
      'any.required': 'El nombre del afiliado es obligatorio'
    }),

  nombreDelMedico: Joi.string().max(150).required()
    .messages({
      'string.empty': 'El nombre del médico es obligatorio',
      'string.max': 'El nombre del médico no puede exceder 150 caracteres',
      'any.required': 'El nombre del médico es obligatorio'
    }),

  especialidad: Joi.string().max(100).required()
    .messages({
      'string.empty': 'La especialidad es obligatoria',
      'string.max': 'La especialidad no puede exceder 100 caracteres',
      'any.required': 'La especialidad es obligatoria'
    }),

  lugarDeAtencion: Joi.string().max(255).required()
    .messages({
      'string.empty': 'El lugar de atención es obligatorio',
      'string.max': 'El lugar de atención no puede exceder 255 caracteres',
      'any.required': 'El lugar de atención es obligatorio'
    }),

  facturacion_Fecha: Joi.date().iso().required()
    .messages({
      'date.base': 'La fecha de facturación debe ser una fecha válida',
      'date.format': 'La fecha de facturación debe estar en formato YYYY-MM-DD',
      'any.required': 'La fecha de facturación es obligatoria'
    }),

  facturacion_Cuit: Joi.string().pattern(/^\d{11}$/).required()
    .messages({
      'string.pattern.base': 'El CUIT debe contener exactamente 11 dígitos',
      'string.empty': 'El CUIT es obligatorio',
      'any.required': 'El CUIT es obligatorio'
    }),

  facturacion_ValorTotal: Joi.number().integer().min(0).required()
    .messages({
      'number.base': 'El valor total debe ser un número',
      'number.integer': 'El valor total debe ser un número entero',
      'number.min': 'El valor total no puede ser negativo',
      'any.required': 'El valor total es obligatorio'
    }),

  facturacion_NombreDePersonaACobrar: Joi.string().max(150).required()
    .messages({
      'string.empty': 'El nombre de la persona a cobrar es obligatorio',
      'string.max': 'El nombre de la persona a cobrar no puede exceder 150 caracteres',
      'any.required': 'El nombre de la persona a cobrar es obligatorio'
    }),

  formaDePago: Joi.string().valid(
    'transferencia',
    'deposito',
    'cheque',
    'efectivo'
  ).required()
    .messages({
      'any.only': 'La forma de pago debe ser: transferencia, deposito, cheque o efectivo',
      'any.required': 'La forma de pago es obligatoria'
    }),

  cbu: Joi.string().length(22).pattern(/^\d+$/).required()
    .messages({
      'string.length': 'El CBU debe contener exactamente 22 dígitos',
      'string.pattern.base': 'El CBU solo puede contener números',
      'string.empty': 'El CBU es obligatorio',
      'any.required': 'El CBU es obligatorio'
    }),

  observaciones: Joi.string().max(1000).optional().allow('')
    .messages({
      'string.max': 'Las observaciones no pueden exceder 1000 caracteres'
    }),
  affiliateId: Joi.number().integer().min(1).required()
  .messages({
    'string.empty': 'El id del afiliado es obligatorio',
    'any.required': 'El id del afiliado es obligatorio',
    'number.base': 'El id del afiliado debe ser un número',
  })
});

// Schema para crear un nuevo reintegro
const createRefundSchema = refundBaseSchema;

// Schema para actualizar un reintegro (todos los campos opcionales)
const updateRefundSchema = Joi.object({
  fechaDePrestacion: Joi.date().iso().optional(),
  nombreDelAfiliado: Joi.string().max(150).optional(),
  nombreDelMedico: Joi.string().max(150).optional(),
  especialidad: Joi.string().max(100).optional(),
  lugarDeAtencion: Joi.string().max(255).optional(),
  facturacion_Fecha: Joi.date().iso().optional(),
  facturacion_Cuit: Joi.string().pattern(/^\d{11}$/).optional(),
  facturacion_ValorTotal: Joi.number().integer().min(0).optional(),
  facturacion_NombreDePersonaACobrar: Joi.string().max(150).optional(),
  formaDePago: Joi.string().valid(
    'transferencia',
    'deposito',
    'cheque',
    'efectivo'
  ).optional(),
  cbu: Joi.string().length(22).pattern(/^\d+$/).optional(),
  observaciones: Joi.string().max(1000).optional().allow('')
}).min(1) // Al menos un campo debe ser proporcionado para actualizar
.messages({
  'object.min': 'Se debe proporcionar al menos un campo para actualizar'
});

// Schema para queries/búsquedas
const refundQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  fechaDesde: Joi.date().iso().optional(),
  fechaHasta: Joi.date().iso().optional(),
  nombreDelAfiliado: Joi.string().max(150).optional(),
  especialidad: Joi.string().max(255).optional(),
  formaDePago: Joi.string().valid(
    'transferencia',
    'deposito',
    'cheque',
    'efectivo'
  ).optional()
});

module.exports = {
  createRefundSchema,
  updateRefundSchema,
  refundQuerySchema
};