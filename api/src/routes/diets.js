const { Router } = require('express');
const dietController = require('../controllers/dietController');
const router = Router();



/* DEBERIA PRECARGAR ESTAS CATEGORIAS DE DIETAS CUANDO NO HAY NADA
Gluten Free
Ketogenic
Vegetarian
Lacto-Vegetarian
Ovo-Vegetarian
Vegan
Pescetarian
Paleo
Primal
Whole30
*/

router.get('/', dietController.getTypesOfDiets);


module.exports = router;
