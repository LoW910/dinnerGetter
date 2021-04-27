import React from 'react'
import AddIngredientForm from './AddIngredientForm'

function OnHand() {
    return (
        <div class="row">
        <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">What Ingredients I Have</span>
              <table className="highlight">
                <thead>
                  <tr className="grey darken-1">
                    <th>Ingredient</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Whiskey</td>
                  </tr>
                  <tr>
                    <td> Water </td>
                  </tr>
                  <tr>
                    <td> Infused Butter </td>
                  </tr>
                  <tr>
                    <td> Something interesting here </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <AddIngredientForm />
      </div>
    )
}

export default OnHand
