const { providerBodySchema, providerQuerySchema } = require('../schemas/provider.schema');

const validateProviderBody = (req, res, next) => {
  const { error } = providerBodySchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errores = error.details.map(d => d.message);
    return res.status(400).json({ errores });
  }
  next();
};

const validateProviderQuery = (req, res, next) => {
  const { error } = providerQuerySchema.validate(req.query, { abortEarly: false });
  if (error) {
    const errores = error.details.map(d => d.message);
    return res.status(400).json({ errores });
  }
  next();
};

module.exports = { validateProviderBody, validateProviderQuery };
