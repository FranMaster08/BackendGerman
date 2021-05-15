const { Recipe, Diet } = require('../db');



/* -GET /types__:
Obtener todos los tipos de dieta posibles
En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los siguientes tipos de dietas
*/

exports.getTypesOfDiets = async (req, res) => {
    try {
        const diets = await Diet.findAll();
        return res.status(200).send(diets);
    
    } catch (error) {
        console.log(error);
        res.status(500).send({msg:"Error server"});
    }
    
}









// let result = await Diet.findAll();
        
// if (result === []) {

//     var dietGlutenFree =  await Diet.create({
//     name: "Gluten Free",
// });

// var dietKatogenic =  Diet.create({
//     name: "Ketogenic",
// });
 
// var dietVegetarian =  Diet.create({
//     name: "Vegetarian",
// });

// var dietLactoVegetarian = Diet.create({
//     name: "Lacto-Vegetarian",
// });
 
// var dietOvoVegetarian = Diet.create({
//     name: "Ovo-Vegetarian"
// });
 
// var dietVegan = Diet.create({
//     name: "Vegan",
// });
 
// var dietPescetarian =  Diet.create({
//     name: "Pescetarian",
// });
 
// var dietPaleo =  Diet.create({
//     name: "Paleo",
// });
 
// var dietPrimal =  Diet.create({
//     name: "Primal",
// });
// var dietWhole30 = Diet.create({
//     name: "Whole30",
// });
// Promise.all([dietGlutenFree, dietKatogenic , dietVegetarian, dietLactoVegetarian, 
//             dietOvoVegetarian , dietVegan , dietPescetarian, dietPaleo, dietPrimal, dietWhole30])
//     .then(res => {
//     console.log("Dietas precargadas");
//     });


// }
// console.log(dietGlutenFree);
// res.json(result);
