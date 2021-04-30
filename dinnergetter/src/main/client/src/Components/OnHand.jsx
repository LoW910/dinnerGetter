import React, { useContext } from 'react';
import MyContext from "../MyContext";
import AddIngredientForm from './AddIngredientForm';



function OnHand(props) {
  const {handleChange, handleSubmit, removeFromPantry} = props;
  const {pantry, ingredient} = useContext(MyContext);
    return (
        <div className="row">
          <div className="col s10 offset-s1">
            <div className=" card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">What Ingredients I Have</span>
                <table className="highlight">
                  <thead>
                    {/* <tr className="grey darken-1">
                      <th>Ingredient</th>
                    </tr> */}
                  </thead>
                  <tbody>
                    <tr className="grey lighten-3"><td style={{padding: "0px",}}>
                      <AddIngredientForm
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                      />
                    </td></tr>
                    {pantry?
                      pantry.map( (ingredient, idx) =>
                      <tr key={idx}>
                        <td>
                          {ingredient.name}
                          <button
                            className="btn red darken-3 right"
                            onClick={(e) => removeFromPantry(e, ingredient)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                        </td>
                      </tr>
                      )
                    :
                    <tr><td>Loading...</td></tr>}
                      
                  </tbody>
                </table>
              </div>
            </div>
        </div>
        {/* <button className="btn green lighten-3 black-text" onClick={() => console.log(pantry)}>Log Pantry</button> */}
        
      </div>
    )
}

export default OnHand
