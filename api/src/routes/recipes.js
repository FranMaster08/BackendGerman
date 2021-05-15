const { Router } = require('express');
const controller= require('../controllers/recipeController');
const Controlador=new controller()
const router = Router();
router.get("/getAllRecipes", Controlador.getAllRecipes);
router.get("/", Controlador.getRecipesByName);
router.get("/:idRecipe", Controlador.getRecipesById);
router.post("/",Controlador.addNewRecipe);
router.delete("/:idRecipe",Controlador.deleteRecipe);
module.exports = router;












