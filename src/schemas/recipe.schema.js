const Joi = require('joi');

const recipeBaseSchema = Joi.object({
  nombreDelMedicamento: Joi.string().max(60).required()
    .messages({
      'string.empty': 'Debe ingresar el nombre del medicamento',
      'string.max': 'El nombre del medicamento no puede superar los 60 caracteres',
      'any.required': 'Debe ingresar el nombre del medicamento'
    }),
  presentacion: Joi.string().max(50).required()
    .messages({
      'string.empty': 'Debe seleccionar la presentación',
      'any.required': 'Debe seleccionar la presentación'
    }),
  paciente: Joi.string().max(100).required()
    .messages({
      'string.empty': 'Debe seleccionar un paciente',
      'any.required': 'Debe seleccionar un paciente'
    }),
  numeroDeDocumento: Joi.string().max(20).required()
    .messages({
      'string.empty': 'Debe ingresar el número de documento',
      'any.required': 'Debe ingresar el número de documento'
    }),
  cantidad: Joi.number().integer().min(1).max(2).required()
    .messages({
      'number.base': 'La cantidad debe ser un número',
      'number.min': 'La cantidad mínima es 1',
      'number.max': 'La cantidad máxima es 2',
      'any.required': 'Debe ingresar la cantidad'
    }),
  estado: Joi.string().valid('Recibido','En análisis','Observado','Aprobado','Rechazado').required()
    .messages({
      'any.only': 'Estado inválido',
      'any.required': 'Debe ingresar el estado'
    }),
  observaciones: Joi.string().max(300).allow('').optional()
    .messages({
      'string.max': 'Las observaciones no pueden superar los 300 caracteres'
    }),
  fechaDeEmision: Joi.date().iso().optional(),
  affiliateId: Joi.number().integer().required()
    .messages({
      'any.required': 'Debe seleccionar un afiliado'
    }),
  
  usuarioLogueadoId: Joi.number().integer().required()
    .messages({
      'any.required': 'Error de autenticación'
    })
});

const createRecipeSchema = recipeBaseSchema;
const updateRecipeSchema = recipeBaseSchema.fork(Object.keys(recipeBaseSchema.describe().keys), field => field.optional());

module.exports = {
  createRecipeSchema,
  updateRecipeSchema
};
