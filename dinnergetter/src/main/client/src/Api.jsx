import axios from "axios";

export class ExternalApi{
    findByIngredients(ingredients){
        axios.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
            {params: {
                ingredients: ingredients,
                number: '10',
                ignorePantry: 'true',
                ranking: '1'},
            headers: {
                'x-rapidapi-key':"",
                'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }}
        ).then(res => console.log(res));
    }
};