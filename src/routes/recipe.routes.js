const { Router } = require("express");
const router = Router();
const RecipeControllers = require("../controllers/recipe.controller");

router.get("/", RecipeControllers.getRecipes); 
router.get("/buscar", RecipeControllers.getRecipesByName); 
router.get("/:id", RecipeControllers.getRecipeById); 
router.post("/", RecipeControllers.createRecipe);
router.put("/:id", RecipeControllers.updateRecipe);
router.delete("/:id", RecipeControllers.deleteRecipe);

module.exports = router;
