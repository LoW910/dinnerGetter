import React, {useState, useContext, useEffect} from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { navigate} from "@reach/router";
import NewRecipeForm from "../Components/NewRecipeForm";
import RecipesAdded from "../Components/RecipesAdded";
import RecipesSaved from "../Components/RecipesSaved";
import MyContext from "../MyContext";
import axios from "axios";
import M from "materialize-css";

const RecipePage = props =>{
    
    const {curUser, setUser, setRedirectLocation, redirectLocation, addedRecipes, setAddedRecipes} = useContext(MyContext);
    
    useEffect( ()=>{
        M.AutoInit();
        if(curUser.email === ""){
            // while(redirectLocation !== "/recipes") {
                setRedirectLocation("/recipes");
            // }
            navigate("/");
        }
        if(!curUser.addedRecipes){
            setAddedRecipes([]);
            return;
        }

        // because of the way the relational database creates JSON objects, sometimes instead of getting an actual recipe we just get a recipe ID.  Which is not ideal for, you know, showing your recipe on the page
        let adds = curUser.addedRecipes;
        for(let i=0; i<adds.length; i++){
            if(typeof adds[i] === "number"){
                console.log("HERE IS OUR AXIOS CALL FOR NUMBER", adds[i]);
                axios.get(`http://localhost:8080/api/recipes/${adds[i]}`)
                    .then(res => {
                        adds.splice(i, 1, res.data);
                        setUser({...curUser,
                            addedRecipes: adds
                        });
                        setAddedRecipes(adds);

                    }).catch(err => console.log(err));
            }
        }
        setAddedRecipes(curUser?.addedRecipes);
    },[]);

    return(
        <div className="row">
            <div className="col m6 s12">
                {/* 
                EVENTUALLY WE'LL HAVE THIS HERE:
                <RecipesSaved /> 
                But for now we'll just do
                */}
                <RecipesAdded />
            </div>
            <div className="col m6 s12">
                <NewRecipeForm />
                {/*
                EVENTUALLY THIS WILL PROBS GO BACK DOWN HERE:
                <RecipesAdded />
                but it's just on the left for now while we work out saving recipes
                */}
                <button className="btn purple accent-3 center" onClick={() => console.log(addedRecipes)}>Log Recipes</button>
            </div>
        </div>
    );
}
export default RecipePage;