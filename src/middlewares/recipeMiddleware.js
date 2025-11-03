// Middleware específico para recetas usando validateRecipeData
const { validateRecipeData } = require("../db/utils/validations/recipeValidation");
const validateData = require("./validateData"); //  middleware genérico

module.exports = validateData(validateRecipeData);
