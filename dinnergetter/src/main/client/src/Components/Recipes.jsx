import React from 'react'

function Recipes() {
    return (
        <div className="row">
        <div className="col s5 pull-s7 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Top Matches</span>
              <table className="highlight">
                <thead>
                  <tr className="grey darken-1">
                    <th>Recipe</th>
                    <th>Number of Ingredients on hand</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Elk </td>
                    <td>80lbs</td>
                  </tr>
                  <tr>
                    <td>Venison</td>
                    <td>25lbs</td>
                  </tr>
                  <tr>
                    <td>Waygu Steak</td>
                    <td>5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
            
    )
}

export default Recipes
