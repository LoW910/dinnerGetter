import { useAuth0 } from "@auth0/auth0-react";
import 'materialize-css/dist/css/materialize.min.css';
import React, {useState, useContext} from 'react';
import axios from "axios";
import MyContext from "../MyContext";
import AddIngredientForm from "./AddIngredientForm";



function ShoppingList({handleFormChange, handleFormSubmit, shoppingList}) {
  const {user, isAuthenticated, isLoading } = useAuth0();

  const {curUser} = useContext(MyContext);

  

  if (isLoading) return(<div>Loading...</div>)
    return (
      isAuthenticated && (
          <div className="responsive-table row">
            <div className="col s10 offset-s1 card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Shopping List</span>

                  <ul className="collection">
                    <li className="grey lighten-3">
                        <AddIngredientForm
                          handleChange={handleFormChange}
                          handleSubmit={handleFormSubmit}
                        />
                    </li>
                      {shoppingList?
                        shoppingList.map( (i, idx) =>
                        <li key={idx} className="collection-item blue-grey-text text-darken-1">
                          {i.name}
                        </li> 
                        )
                        :
                        <></>
                      }
                  </ul>

              </div>
            </div>
            <button className="btn black" onClick={() => console.log(curUser)}>Log user</button>
            <button className="btn black" onClick={() => console.log(shoppingList)}>Log List</button>
          </div>
        )
    );  









    //   isAuthenticated && (
    //       <div className="responsive-table row">
    //         <div className="col s10 offset-s1 card blue-grey darken-1">
    //           <div className="card-content white-text">
    //             <span className="card-title">Shopping List</span>
    //             <table className=" highlight">
    //               <thead>
    //                 <tr className="grey darken-1">
    //                   <th>Recipe</th>
    //                   <th>Missing Ingredient</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 <tr className="grey lighten-3">
    //                   <td style={{padding: "0px",}}>
    //                     <AddIngredientForm
    //                       handleChange={handleFormChange}
    //                       handleSubmit={handleFormSubmit}
    //                     />
    //                   </td>
    //                 </tr>
    //                 <tr>
    //                   <td>Lasangua</td>
    //                   <td>noodles</td>
    //                 </tr>
    //                 <tr>
    //                   <td>Grapes </td>
    //                   <td>Jellybean</td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //           </div>
    //         </div>
    //         <button className="btn black" onClick={() => console.log(curUser)}>Log user</button>
    //         <button className="btn black" onClick={() => console.log(shoppingList)}>Log List</button>
    //       </div>
    //     )
    // );  
}

export default ShoppingList
