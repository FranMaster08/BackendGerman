const { Router } = require('express');
const recipeController = require('../controllers/recipeController');
const { Recipe, Diet } = require('../db');
const router = Router();


router.get("/", recipeController.getAllRecipes);
router.get("/", recipeController.getRecipesByName);
router.get("/:idRecipe", recipeController.getRecipesById);
router.post("/",recipeController.addNewRecipe);
router.delete("/:idRecipe",recipeController.deleteRecipe);


module.exports = router;












