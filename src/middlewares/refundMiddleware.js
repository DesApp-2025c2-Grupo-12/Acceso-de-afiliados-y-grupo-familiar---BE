const { validateSchema } = require('../db/utils/validations/validation');
const {
  createRefundSchema,
  updateRefundSchema,
  refundQuerySchema
} = require('../schemas/refund.schema');

const validateRefundSchema = (req, res, next) => {
  const schema =
    req.method === 'POST'
      ? createRefundSchema
      : updateRefundSchema;

  return validateSchema(schema)(req, res, next);
};

const validateRefundQuerySchema = (req, res, next) => {
  return validateSchema(refundQuerySchema, 'query')(req, res, next);
};

const defaultRefundValues = (req, res, next) => {
    if (!req.body.observaciones) {
        req.body.observaciones = 'Sin observaciones';
    }
    next();
};

const billingConsistency = (req, res, next) => {
    if (
        req.body.facturacion_Fecha &&
        req.body.fechaDePrestacion &&
        req.body.facturacion_Fecha < req.body.fechaDePrestacion
    ) {
        return res.status(400).json({
            error: "La fecha de la facturación no puede ser anterior a la fecha de la prestación"
        });
    }

    next();
};

const normalizeRefund = (req, res, next) => {
    const body = req.body;

    // 1. TRIM GLOBAL 
    Object.keys(body).forEach(key => {
        if (typeof body[key] === 'string') {
            body[key] = body[key].trim();
            if (body[key] === '') body[key] = null; // Conversión de vacío → null
        }
    });

    // 2. CAPITALIZAR TEXTOS IMPORTANTES 
    const capitalize = str =>
        str
            .toLowerCase()
            .replace(/\b\w/g, c => c.toUpperCase()); // Primera letra de cada palabra en mayúscula

    const fieldsToCapitalize = [
        'nombreDelAfiliado',
        'nombreDelMedico',
        'especialidad',
        'lugarDeAtencion',
        'facturacion_NombreDePersonaACobrar'
    ];

    fieldsToCapitalize.forEach(field => {
        if (body[field]) {
            body[field] = capitalize(body[field]);
        }
    });

    // 3. LIMPIEZA AVANZADA DE OBSERVACIONES
    if (body.observaciones) {
        body.observaciones = body.observaciones
            .replace(/\s+/g, ' ')      // Reducir espacios múltiples
            .replace(/\s,/, ',')       // Quitar espacios antes de coma
            .trim();
    }

    req.body = body;
    next();
};

module.exports = {
  validateRefundSchema,
  validateRefundQuerySchema,
  defaultRefundValues,
  billingConsistency,
  normalizeRefund
};