import { navigate } from "@reach/router";
import React, { useContext, useEffect, useState } from 'react';
import MyContext from "../MyContext";
import M from "materialize-css";
import axios from "axios";

const apiKey = process.env.API_KEY;
function Recipes() {

  const [ instructions, setInstructions] = useState([]);
  const RECIPES = require("../static/recipelist");
  const { allRecipes, hasBeenPopulated, setIngredient, ingredient, curUser, shoppingList, setShoppingList, setUser} = useContext(MyContext);
  
  useEffect( () => {
    M.AutoInit();
  }, []);

  const addIngredientToList = (e, name) => {
    console.log(name);
    let i = {name};
    i.dummyUserEmail = curUser.email;
    
    axios.post('http://localhost:8080/api/ingredients/addtoshoppinglist', i)
    .then(response => {
      console.log(response.data);
      if(response.data){
        console.log("got through that particular 'if' statement");
        let adjList = [...curUser.shoppingList];
        adjList.push(i);
        setUser({...curUser, shoppingList:adjList});
        console.log(adjList);
      }
    }).catch( err => console.log(err));
  }

  const removeIngredientFromList = (e, name) => {
    console.log(name);
    let i = {name};
    i.dummyUserEmail = curUser.email;
    axios.post('http://localhost:8080/api/ingredients/removefromshoppinglist', i)
      .then( response => {
        console.log(response.data);
        let adjList = [...curUser.shoppingList];
        adjList.splice(response.data, 1);
        setUser({...curUser, shoppingList: adjList});
      }
      )
      .catch(err => console.log(err));
  }
  
  // useEffect(() => {
  //   if(userIngredientList.length > 2){
  //     axios.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
  //     {params: {
  //         ingredients: `${userIngredientList}`,
  //         number: '10',
  //         ignorePantry: 'true',
  //         ranking: '1'},
  //     headers: {
  //         'x-rapidapi-key': "ha! you're too late!  You'll never find it now!",
  //         'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  //     }}).then( res => {
  //       console.log(res);
  //       setAllRecipes(res.data);
  //       setHasBeenPopulated(true);
  //     }).catch(err => console.log(err));
  //   }
  // }, [userIngredientList]);

  const clickHandler = (id) =>{
    // axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=`)
    //   .then(res => {
    //     console.log(res);
    //     setInstructions(res.data.analyzedInstructions);
    //   })
    //   .catch(err => console.log(err));
    console.log("gotcha! Nothing happened!");
  }
      return (
        <div className="row">
          <div className="col s10 offset-s1 card blue-grey darken-1">
            <div className="card-content white-text">
              <p className="card-title">Top Matches</p>
              {/* <button className="btn orange" onClick={() => console.log(instructions[0].steps)}>Log instructions</button> */}
                <ul className="collapsible"> 
                  {/* { hasBeenPopulated ? allRecipes.map((r,i)=>{ */}
                  {RECIPES.map( (r, i) => 
                      <li key={i}>
                        <div className="collapsible-header blue-grey darken-1" onClick={()=>{clickHandler(r.id)}}>
                          {r.title}
                        </div>
                        <div className="collapsible-body white">
                          <div className="blue-grey-text text-darken-1 white collection">
                            <a href="#!" className="collection-item">DESCRIPTION OF RECIPE:
                            <ul>
                              {
                                instructions[0]? 
                                  instructions[0].steps.map((s, idx)=>
                                  <li key={idx}>{s.step}</li>
                                  )
                                  :
                                  <></>
                              }
                            </ul>
                            </a>
                            <a className="collection-item">MISSING INGREDIENTS ({r.missedIngredientCount}):</a>
                            {r.missedIngredients.map( (ing, idx) =>
                              <a key={idx} className="collection-item row">
                                <div className="col s10 left-align">{ing.name}</div>
                                <div className="col s2">
                                  {!curUser.shoppingList.map(x => x.name).includes(ing.name) ? 
                                    <button className="btn waves-effect waves-light blue accent-2" onClick={e => addIngredientToList(e, ing.name)}>
                                      <i className="material-icons">add_circle_outline</i>
                                    </button>
                                    :
                                    <button className="btn waves-effect waves-dark red darken-3" onClick={e => removeIngredientFromList(e, ing.name)}>
                                      <i className="material-icons">remove_circle_outline</i>
                                    </button>
                                  }
                                </div>
                              </a>
                            )}
                          </div>
                        </div>
                      </li>
                  )}
                </ul>
                <button className="btn waves-effect waves-effect-light pink accent-2 center" onClick={() => navigate("/recipes")}>Add your own recipe</button>
            </div>
          </div>
          
        </div>
            
      )
}

export default Recipes
