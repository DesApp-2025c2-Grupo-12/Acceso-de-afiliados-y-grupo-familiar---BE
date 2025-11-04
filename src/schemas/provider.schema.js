const Joi = require('joi');

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

// Schema para body (POST / PUT)
const providerBodySchema = Joi.object({
  numeroDeCuit_Cuil: Joi.string().required(),
  nombreCompleto: Joi.string().max(50).required(),
  especialidad: Joi.string().valid(...ESPECIALIDADES).required(),
  esCentro: Joi.boolean().required(),
  integraCentro: Joi.string().valid(...ZONAS).allow(null, ''),
  telefono: Joi.string().required(),
  correoElectronico: Joi.string().email().required(),
  direccion: Joi.string().required(),
  horarioInicio: Joi.string().pattern(/^\d{2}:\d{2}:\d{2}$/).required(),
  horarioFin: Joi.string().pattern(/^\d{2}:\d{2}:\d{2}$/).required(),
  dias: Joi.string().required()
});

// Schema para query params (GET /provider)
const providerQuerySchema = Joi.object({
  nombre: Joi.string().max(50).pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]*$/),
  especialidad: Joi.string().valid(...ESPECIALIDADES),
  location: Joi.string().valid(...UBICACIONES),
  zona: Joi.when('location', {
    is: 'Buenos Aires',
    then: Joi.string().valid(...ZONAS),
    otherwise: Joi.forbidden()
  })
});

module.exports = { providerBodySchema, providerQuerySchema };
