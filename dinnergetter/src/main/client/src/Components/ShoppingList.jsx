import { useAuth0 } from "@auth0/auth0-react";
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';



function ShoppingList() {
  const {user, isAuthenticated, isLoading } = useAuth0();


  if (isLoading) return(<div>Loading...</div>)

    return (
      isAuthenticated && (
          <div className="responsive-table row">
            <div className="col s10 offset-s1 card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Shopping List</span>
                <table className=" highlight">
                  <thead>
                    <tr className="grey darken-1">
                      <th>Recipe</th>
                      <th>Missing Ingredient</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Lasangua</td>
                      <td>noodles</td>
                    </tr>
                    <tr>
                      <td>Grapes </td>
                      <td>Jellybean</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
    );  
}

export default ShoppingList
