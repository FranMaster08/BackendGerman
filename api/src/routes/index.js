const { Router } = require('express');
// Importar todos los routers;
const recipesRouter = require('./recipes');
const dietsRouter = require('./diets');
const {Recipe, Diet} = require("../db");
const {API_KEY} = process.env;



//***************************************************   Aqui yo deberia traerme mi router de recipes and diets !!

const router = Router();

// Configuramos los routers

router.use("/recipes" , recipesRouter);
router.use("/diets" , dietsRouter);




module.exports = router;
