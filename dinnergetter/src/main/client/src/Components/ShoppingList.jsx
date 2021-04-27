import React from 'react'
import 'materialize-css/dist/css/materialize.min.css';


function ShoppingList() {
    return (
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
    );
}

export default ShoppingList
