const { Router } = require('express');


//*****  Aqui yo deberia traerme mi router de recipes and diets !!

const router = Router();

// Configuramos los routers

router.use("/recipes" ,  require('./recipes'));
router.use("/diets" , require('./diets'));




module.exports = router;
