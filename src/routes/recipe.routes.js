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
  getRecipeFromAffiliate,
  getChildrensRecipes,
} = require("../controllers/recipe.controller");

const validateRecipeSchema = require('../middlewares/recipeMiddleware');


router.get("/", getRecipes);
router.get("/buscar", getRecipesByName);
router.get("/affiliateId/:affiliateId",getRecipeFromAffiliate)
router.get("/childrensAffiliate/:affiliateId",getChildrensRecipes)
router.get("/:id", getRecipeById);



router.post("/", validateRecipeSchema,canManageFamilyMember, createRecipe);
router.put("/:id/usuario/:usuarioLogueadoId/afiliado/:affiliateId", validateRecipeSchema,canManageFamilyMember, updateRecipe);


router.delete("/:id", deleteRecipe);

module.exports = router;
