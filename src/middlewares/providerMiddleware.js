const { validateProviderQuery } = require("../db/utils/validations/providerValidation");

const validateCreateProvider = (req, res, next) => {
 
  next();
};

const validateUpdateProvider = (req, res, next) => {
 
  next();
};

module.exports = {
  validateProviderQuery,
  validateCreateProvider,
  validateUpdateProvider,
};
