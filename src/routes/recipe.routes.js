const express = require("express");
const router = express.Router();
const {
  createRecipe,
  getRecipes,
  getRecipesByName,
  updateRecipe,
  deleteRecipe,
  getRecipeById
} = require("../controllers/recipe.controller");

// Definición de rutas
router.get("/", getRecipes);
router.get("/buscar", getRecipesByName);
router.get("/:id", getRecipeById);
router.post("/", createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
