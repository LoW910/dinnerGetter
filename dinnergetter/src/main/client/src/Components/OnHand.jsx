import React, {useState} from 'react'
import AddIngredientForm from './AddIngredientForm'


function OnHand() {

  // const [ingredientName, setIngredientName] = useState("");

  



    return (
        <div className="row">
          <div className="col s10 offset-s1">
            <div className=" card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">What Ingredients I Have</span>
                <table className="highlight">
                  <thead>
                    <tr className="grey darken-1">
                      <th>Ingredient</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="grey lighten-3"><td style={{padding: "0px",}}><AddIngredientForm  /></td></tr>
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
      </div>
    )
}

export default OnHand
