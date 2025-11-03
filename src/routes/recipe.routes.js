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

// Middleware solo para crear recetas
const recipeMiddleware = require("../middlewares/recipeMiddleware");

// Rutas de recetas
router.get("/", getRecipes);
router.get("/buscar", getRecipesByName);
router.get("/:id", getRecipeById);

// Crear receta con middleware de validación
router.post("/", recipeMiddleware, createRecipe);

// Actualizar receta (PUT) sin middleware
router.put("/:id", updateRecipe);

// Eliminar receta
router.delete("/:id", deleteRecipe);

module.exports = router;
