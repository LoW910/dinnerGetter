import React from 'react'
import 'materialize-css/dist/css/materialize.min.css';


function ShoppingList() {
    return (
      <div class="row">
      <div class="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Shopping List</span>
            <table className="highlight">
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
    </div>
    );
}

export default ShoppingList
