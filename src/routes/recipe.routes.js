const express = require("express");
const router = express.Router();
const { canManageFamilyMember } = require('../middlewares/affiliateMiddlewares');

const {
  createRecipe,
  getRecipes,
  getRecipesByName,
  updateRecipe,
  deleteRecipe,
  getRecipeById,
} = require("../controllers/recipe.controller");

const validateRecipeSchema = require('../middlewares/recipeMiddleware');

// Nueva ruta para obtener recetas de un afiliado (antes de /:id)
router.get("/affiliate/:id", async (req, res) => {
  try {
    const recetas = await require("../db/models").Recipe.findAll({
      where: { affiliateId: req.params.id },
      include: { model: require("../db/models").Affiliate, as: "afiliado" }
    });

    if (recetas.length === 0) {
      return res.status(404).json({ message: "No se encontraron recetas para este afiliado" });
    }

    res.status(200).json(recetas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rutas existentes
router.get("/", getRecipes);
router.get("/buscar", getRecipesByName);
router.get("/:id", getRecipeById);

// Crear y actualizar con middleware de schema
router.post("/", validateRecipeSchema,canManageFamilyMember, createRecipe);
router.put("/:id", validateRecipeSchema, updateRecipe);

// Eliminar receta
router.delete("/:id", deleteRecipe);

module.exports = router;
