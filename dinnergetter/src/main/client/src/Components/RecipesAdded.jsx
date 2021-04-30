import React, {useContext} from "react";
import { useAuth0 } from '@auth0/auth0-react';
import MyContext from "../MyContext";
import M from "materialize-css";
import SaveRecipeBtn from "./SaveRecipeBtn";

function RecipesAdded() {
  // what does this do
  // this initialized the materializ jqery nonsense built into it

  M.AutoInit();

  const { user, isAuthenticated, isLoading } = useAuth0();
  const {addedRecipes} = useContext(MyContext);




  return (
    <div className="row">
      <div className="col s10 offset-s1 card blue-grey darken-1">
        <div className="card-content white-text">
          <p className="card-title">What Recipes I've added</p>
          {/* <table className="highlight">
            <thead>
              <tr className="grey darken-1">
                <th>Recipes</th>
              </tr>
            </thead>
            <tbody> */}
            <ul className="collapsible"> 
              {addedRecipes? addedRecipes.map( (r, idx) =>
                
                  <li key={idx}>
                    <div className="collapsible-header blue-grey darken-1">
                      {/* <p style={{whiteSpace: "pre-wrap"}}>{r.name}</p> */}
                      <p>{r.name}</p>
                    </div>
                    <div className="collapsible-body white">
                      <span className="blue-grey-text text-darken-1 white">
                        {r.steps}
                        {/* <SaveRecipeBtn /> */}
                      </span>
                    </div>
                  </li>
                
              )
              :
              <li className="collection-item">Loading...</li>
            }
            </ul>
              {/* <tr>
                <td></td>
              </tr>
            </tbody>
          </table> */}
        </div>
      </div>
    </div>

  );
}

export default RecipesAdded;
