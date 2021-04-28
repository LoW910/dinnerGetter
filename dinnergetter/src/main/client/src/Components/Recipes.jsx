import React, {useState, useEffect, useContext} from 'react'
import { ExternalApi } from "../Api";
import MyContext from "../MyContext";
import axios from "axios";
import {navigate} from "@reach/router";

const apiKey = process.env.API_KEY;
function Recipes() {
  const { allRecipes, setAllRecipes, hasBeenPopulated, setHasBeenPopulated, userIngredientList} = useContext(MyContext);
  
  // useEffect(() => {
  //   if(userIngredientList.length > 2){
  //     axios.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
  //     {params: {
  //         ingredients: `${userIngredientList}`,
  //         number: '10',
  //         ignorePantry: 'true',
  //         ranking: '1'},
  //     headers: {
  //         'x-rapidapi-key': "fee6666f90msh1746015aef307d1p1f3a8ejsn6c2902c996f6",
  //         'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  //     }}).then( res => {
  //       console.log(res);
  //       setAllRecipes(res.data);
  //       setHasBeenPopulated(true);
  //     }).catch(err => console.log(err));
  //   }
  // }, [userIngredientList]);

    return (
        <div className="row">
          <div className="col s10 offset-s1 card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Top Matches</span>
              <table className="highlight">
                <thead>
                  <tr className="grey darken-1">
                    <th>Recipe</th>
                  </tr>
                </thead>
                <tbody>
                  { hasBeenPopulated ? allRecipes.map((r,i)=>{
                    return(
                      <tr key={i}>
                        <td>{r.title}</td>
                      </tr>
                    );
                  }) : <tr></tr> }
                </tbody>
              </table>
            </div>
        </div>
        <button className="btn waves-effect waves-effect-light pink accent-2 center" onClick={() => navigate("/dashboard")}>Add your own recipe</button>
      </div>
            
    )
}

export default Recipes
