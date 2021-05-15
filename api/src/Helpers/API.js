const {API_KEY} = process.env;
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');


exports.getAllApi = async () => {
    const request = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    return request;
}




exports.requestApi = async (nameRecipe) => {
    
    const requestapi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

    let result = await requestapi.data.results.filter( recipe =>
        recipe.title.includes(nameRecipe)
    );
    const response = await result.map((recipe) => {
        return {
            id: recipe.id * -1,
            title: recipe.title,
            image: recipe.image,
            spoonacularScore: parseInt(recipe.spoonacularScore),
            diets: recipe.diets.map(diet => {
                return { 
                    name: diet 
                };
            }),
        };
    });
    return response;
};