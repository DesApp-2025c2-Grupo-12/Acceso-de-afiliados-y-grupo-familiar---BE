const { validateSchema } = require('../db/utils/validations/validation');
const { createRecipeSchema, updateRecipeSchema } = require('../schemas/recipe.schema');

const validateRecipeSchema = (req, res, next) => {
  // Elegimos el schema según método HTTP
  const schema = req.method === 'POST' ? createRecipeSchema : updateRecipeSchema;
  return validateSchema(schema)(req, res, next);
};

module.exports = validateRecipeSchema;
