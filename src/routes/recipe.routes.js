const express = require("express");
const router = express.Router();

const {
  createRecipe,
  getRecipes,
  getRecipesByName,
  updateRecipe,
  deleteRecipe,
  getRecipeById,
} = require("../controllers/recipe.controller");

const validateRecipeSchema = require('../middlewares/recipeMiddleware');

// Rutas de recetas
router.get("/", getRecipes);
router.get("/buscar", getRecipesByName);
router.get("/:id", getRecipeById);

// Crear y actualizar con middleware de schema
router.post("/", validateRecipeSchema, createRecipe);
router.put("/:id", validateRecipeSchema, updateRecipe);

// Eliminar receta
router.delete("/:id", deleteRecipe);

module.exports = router;
