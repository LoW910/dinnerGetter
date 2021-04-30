import { useAuth0 } from "@auth0/auth0-react";
import 'materialize-css/dist/css/materialize.min.css';
import React, {useState, useContext} from 'react';
import GWTH from '../static/img/GWTH.jpg'
import axios from "axios";
import MyContext from "../MyContext";
import AddIngredientForm from "./AddIngredientForm";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import ShopListEditMode from "./ShopListEditMode";



function ShoppingList({handleFormChange, handleFormSubmit}) {
  const {user, isAuthenticated, isLoading } = useAuth0();
  const {curUser, setUser} = useContext(MyContext);
  const [storeMode, setStoreMode] = useState(false);

  const handleDrop = move => {
    if(!move.destination) return;
    let adjList = [...curUser.shoppingList];

    const [movedItem] = adjList.splice(move.source.index, 1);
    adjList.splice(move.destination.index, 0, movedItem);

    setUser({...curUser, shoppingList:adjList});
  }

  const switchMode = () => {
    setStoreMode(!storeMode);
  }

  const toggleItemCrossed = (e, idx) => {
    if(storeMode){
      let adjList = [...curUser.shoppingList];
      e.target.style.cssText = (e.target.style.cssText === ""? "text-decoration: line-through; color: lightgrey;" : "");
      

      if(!adjList.dummyUserEmail){
        adjList[idx].dummyUserEmail = true;
      }
      if(adjList.dummyUserEmail){
        adjList[idx].dummyUserEmail = false;
      }
      setUser({...curUser, shoppingList:adjList});
      // console.log(e.target.)
    }
  }

  const saveListOrder = () => {
    let listOrder = [...curUser.shoppingList];
    let names = listOrder.map(x => x.name);
    axios.post(`http://localhost:8080/api/users/${curUser.email}/savelistorder`, names)
      .then(response => {
        console.log(response);
      }).catch(err => console.log(err));
  }

  // e.target.style.cssText

  if (isLoading) return(<div>Loading...</div>)
    return (
          <div className="responsive-table row">
            <div className="col s10 offset-s1 card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Shopping List</span>
                  <ul className="collection" style={{marginBottom: "0px"}}>
                    <li className="collection-item blue-grey darken-1">
                      {/* <span>STORE MODE:</span> */}
                      <div className="switch">
                        <label className="white-text">
                          EDIT MODE
                          <input
                            type="checkbox"
                            ischecked={storeMode? "true" : "false"}
                            onChange={switchMode}
                          />
                          <span className="lever"></span>
                          STORE MODE
                        </label>
                      </div>
                    </li>
                    {storeMode?
                      <></>
                      :
                      <>
                        <li className="grey lighten-3">
                            <AddIngredientForm
                              handleChange={handleFormChange}
                              handleSubmit={handleFormSubmit}
                            />
                        </li>
                        <li className="white">
                          <button
                            className="btn orange lighten-2 black-text center"
                            style={{marginTop: "-10px", marginBottom: "5px"}}
                            onClick={saveListOrder}
                          >
                            <i className="material-icons right">save</i>
                            Save List Order
                          </button>
                        </li>
                      </>
                    }
                  </ul>

                  <ShopListEditMode
                    handleDrop={handleDrop}
                    curUser={curUser}
                    storeMode={storeMode}
                    toggleItemCrossed={toggleItemCrossed}
                  />


              </div>
            </div>
          </div>
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







{/* <DragDropContext onDragEnd={handleDrop}>

  <Droppable droppableId={`blarg${idx1 + 1}`} key={idx1}>
    { provided => (
      <ul className={styles.ulStyle} {...provided.droppableProps} ref={provided.innerRef} >
        <li>{listobj.name}:</li>
        {listobj.items.map( (word, idx2) => 
          <Draggable key={idx2} draggableId={word + idx2} index={idx2}>
            { prov =>
              <li className={styles.liStyle} {...prov.draggableProps} {...prov.dragHandleProps} ref={prov.innerRef}>{word}</li>
            }
          </Draggable>
        )}
        {provided.placeholder}
      </ul>
    )}
  </Droppable>

  
</DragDropContext> */}