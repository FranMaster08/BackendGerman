const { Recipe, Diet } = require('../db');
const { Sequelize, Op }= require('sequelize');
const {API_KEY} = process.env;
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const API = require('../Helpers/API');





//Devuelve todas las recetas, las de las base de datos y las de la api
exports.getAllRecipes = (req, res, next) => {
    const myRecipes = Recipe
    .findAll({
        include: Diet
    })
    const apiRecipes = API.getAllApi();
    Promise.all([myRecipes,apiRecipes])
    .then((result) => {
        const [myRecipesResult, apiRecipesResult] = result;
        const response = myRecipesResult.concat(apiRecipesResult.data.results)
        res.send(response)
    })
    .catch((err) => next(err));
}



/* Un GET /recipes?name="" obtiene un listado de las primeras 9 recetas que contengan la palabra ingresada como query parameter
y si no existe ninguna receta mostrar un mensaje adecuado
**************************************************************************************************************************** */

exports.getRecipesByName = async (req,res) => {
    //Primero varifico si existe una query parameter.Si existe, continua la ejecucion.Primero buscamos en nuestra db FOOD
    if(req.query){
        try {
            /*recipes sera el objeto que retornara la funcion.*/
            const recipes = { };
            let query = req.query.name.toLowerCase();
            const name = query[0].toUpperCase() + query.slice(1);//primera letra en mayuscula para buscar con todas las dietas
            /*Setea la consulta para la base de datos. Necesito que me retorne los atributos detallados, y que verifique si el name ingresado por query
            coincide con alguno de los titulos que tengo guardados. Ademas necesito que retorne solo los nombres de las recetas pero excluyendo la tabla intermedia*/
            
            const searchByName = await Recipe.findAll({
                attributes: ['title', 'spoonacularScore', 'id' , 'summary','image'],
                where:{
                    title:{
                        [Sequelize.Op.like]: `%${name}%`
                    },
                },
                include: {
                    model: Diet,
                    attributes: ['name'],
                    through: {  
                        attributes: [],
                    },
                },
            });

            if(searchByName[0]){
                recipes['resultsInDB'] = searchByName;
            };        
            const apiResult = await API.requestApi(); /*En carpeta helpers*/
            const responseForApi = await apiResult.filter( e => e.title.includes(nameRecipe));
            
            /*Analizamos posibles resultados*/
            /*Escenario uno: No encontro coincidencias en food DB pero si en la api*/
            if(responseForApi.length){
                
                
                if (!recipes.resultsInDB) {
                    recipes['resultsInDB'] = responseForApi;
                    res.status(200).json(recipes);
            /*Escenario dos: Se encontraron coincidencias en food DB y en api.*/
                
        } else {
                    recipes.resultsInDB  = recipes.resultsInDB.concat(responseForApi);
                    res.status(200).json(recipes);
                };
            /*Escenario tres: No encontro coincidencias ni en food DB ni en api*/
            } else {
                
                if(!recipes.resultsInDB){
                    res.status(404).json({msg: {Error : "No recipes were found with this name"}});
                } else {
                    res.json(recipes);
                };
            };         
        
        } catch (error){
            console.log(error);
            res.status(500).send({msg: {Error : "Server error"}});
        };

    } else {
        res.status(404).send("Error")
    };
}





//citripa



exports.getRecipesByName = async (req,res) =>  {

    try {
        
        if (req.query) {
        const data = {};
        const name = req.query.name;
        let searchInDB = await Recipe.findAll({
            attributes: ['id', 'title', 'image', 'spoonacularScore'],
            where: {
                title: { 
                [Sequelize.Op.like]: `%${name}%` 
                },
            },
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                attributes: [],
                },
            },
        });

            searchInDB[0] ? ( data['results'] = searchInDB) : (data['results'] = [] );

            const apiResult = await API.requestApi();
            apiResult[0] ? (data.results = data.results.concat(apiResult)) &&  res.json(data)
            : 
            data.results[0] ? res.json(data) : res.status(404).json({ results: {
                error: 'No se encontraron datos que coincidan con la búsqueda',
            },
        });
        } 
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: {
                Error : "No recipes were found with this name"
            }
        });
    }
};
















/*Un GET a  /recipes/idReceta obtiene el detalle de una receta en particular.Debe traer solo los datos pedidos en la ruta de detalle de receta
Incluir los tipos de dieta asociados
******************************************************************************************************************************************* */
exports.getRecipesById = async (req,res) => {
    try {
        const id = req.params.idRecipe;
        let recipeSearch;
            if(id > 0){

                recipeSearch = await Recipe.findOne({
                    where:{
                        id: id
                    },
                    include: {
                        model: Diet,
                        attributes: ['name'],
                        through: {
                            attributes: [],
                        },
                    },
                });
            
            } else {
            const idRecipe = id * (-1);
            const responseForApi = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`); 
            
            recipeSearch = {
                title: responseForApi.data.title,
                summary: responseForApi.data.summary,
                spoonacularScore: responseForApi.data.spoonacularScore,
                healthScore: responseForApi.data.healthScore,
                instructions:responseForApi.data.instructions,
                idApi: responseForApi.data.id,
                diets: responseForApi.data.diets,
                image: responseForApi.data.image,
                dishTypes: responseForApi.data.dishTypes,
            };
        };
        if(recipeSearch){
            return res.status(200).json(recipeSearch);
        } else {
            return res.status(404).json({msg: "No matches found"});
        };
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Sever Error");
    }
    
};
























/* RUTA PARA LA CREACION DE NUEVAS RECETAS: 
Esta ruta recibe los datos recolectados desde el formulario controlado y crea una receta en la base de datos con;
Nombre , Resumen del plato ,Puntuación, Nivel de "comida saludable", Paso a paso*/

exports.addNewRecipe = async (req,res) => {
    /*Hago el destructuring de los datos que deberian llegar a traves del body request*/
    let { title, summary, spoonacularScore, healthScore, instructions, diets } = req.body;
    /*Si la data llega correctamente a traves del body creo una nueva receta
    !!Esa informacion la debo recoletar de mi formulario en la UI*/
    try {
        /*Antes de crear verifico que ninguno sea un string vacio*/
        if (title !== "" && summary !== "" && spoonacularScore !== "" &&  healthScore !== "" && instructions !== ""){
            const newRecipe = await Recipe.create({
                title: title,
                summary:summary,
                healthScore: healthScore,
                spoonacularScore:spoonacularScore,
                instructions:instructions
            });
            //si no hay mas de una dieta seleccionada la convierto en array para que sea iterable como los demas
            if (!Array.isArray(diets)){
                diets = [diets];
            };
            const dietsOfNewRecipe = await Diet.findAll({
                where: {
                    name: {
                        [Sequelize.Op.in]: diets
                    },
                },
            });
            /*Una vez localizadas las dietas que coincidan con el name, se las seteo a la nueva receta que estoy creando*/
            await newRecipe.setDiets(dietsOfNewRecipe);
            return res.status(201).json(newRecipe);
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).send("Sever Error");
        
    }
};




/*Ruta para eliminar una receta de la base de datos*/
exports.deleteRecipe = async (req, res ) => {
    try {

        let recipe = await Recipe.findByPk(req.params.idRecipe);
        if(!recipe) {
            return res.status(404).json({msg: 'Recipe not found'})
        }

        // Eliminar la receta
        await Recipe.destroy({ 
            where: {id : req.params.idRecipe} 
        });
        res.json({ msg: 'Recipe deleted'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error')
    }
}








