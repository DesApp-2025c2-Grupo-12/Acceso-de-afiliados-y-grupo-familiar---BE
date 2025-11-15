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

module.exports = {
  validateRefundSchema,
  validateRefundQuerySchema
};