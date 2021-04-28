import NewRecipeForm from "../Components/NewRecipeForm";
import React, {useState} from "react";

const CreateRecipe = props =>{
    const [recipeInputs, setRecipeInputs] = useState({
        name: "",
        steps: "",
        ingredients: [""],
    }); // setRecipeInputs({...recipeInputs, [...recipeInputs.ingredients, e.target.value ??]})
    let ingredients = [...recipeInputs.ingredients];
    

    const submitHandler = (e) =>{
        e.preventDefault();
        //babaghanoush
    }

    return(
        <div>
            <NewRecipeForm 
            submitHandler={submitHandler} recipeInputs = {recipeInputs} setRecipeInputs={setRecipeInputs}  
            />
        </div>
    );
}
export default CreateRecipe;