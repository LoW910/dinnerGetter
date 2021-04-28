import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import { ExternalApi } from "../Api";
const apiKey = process.env.API_KEY;
function Recipes() {
  const [ allRecipes, setAllRecipes ] = useState([]);
  const [ hasBeenPopulated, setHasBeenPopulated ] = useState(false);

  useEffect(() => {
    // query db for user's ingredients and set them to a variable
    // use that variable in the api call below

    // axios.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
    // {params: {
    //     ingredients: ***{ userIngredients }***,
    //     number: '10',
    //     ignorePantry: 'true',
    //     ranking: '1'},
    // headers: {
    //     'x-rapidapi-key': apiKey,
    //     'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    // }}).then( res => {
    //   console.log(res);
    //   setAllRecipes(res.data);
    //   setHasBeenPopulated(true);
    // }).catch(err => console.log(err));
  }, []);

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
      </div>
            
    )
}

export default Recipes
