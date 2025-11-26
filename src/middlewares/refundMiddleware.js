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

    // SOLO TRIM Y LIMPIEZA BÁSICA - SIN CAPITALIZACIÓN
    Object.keys(body).forEach(key => {
        if (typeof body[key] === 'string') {
            body[key] = body[key].trim();
            if (body[key] === '') body[key] = null;
        }
    });

    // LIMPIEZA DE OBSERVACIONES (se mantiene)
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