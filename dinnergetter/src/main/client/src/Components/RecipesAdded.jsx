import React, {useContext} from "react";
import { useAuth0 } from '@auth0/auth0-react';
import MyContext from "../MyContext";
import M from "materialize-css";

function RecipesAdded() {

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
                      {r.name}
                    </div>
                    <div className="collapsible-body white">
                      <span className="blue-grey-text text-darken-1 white">{r.id}: {r.steps}</span>
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
