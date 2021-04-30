import React, {useContext} from "react";
import MyContext from "../MyContext";
import GWTH from '../static/img/GWTH.jpg'
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import axios from "axios";

const ShopListEditMode = ({handleDrop, curUser, storeMode, toggleItemCrossed}) => {

  const {setUser} = useContext(MyContext);

  const removeIngredientFromList = (name, idx) => {

    console.log(name);
    let i = {name};
    i.dummyUserEmail = curUser.email;
    axios.post('http://localhost:8080/api/ingredients/removefromshoppinglist', i)
      .then( response => {
        console.log(response.data);
        let adjList = [...curUser.shoppingList];
        adjList.splice(idx, 1);
        setUser({...curUser, shoppingList: adjList});
        
      })
      .catch(err => console.log(err));
  }

  const crossedStyle = {

  }

  return (
    <>

      <DragDropContext onDragEnd={handleDrop}>

        <Droppable droppableId="grocerylist">
          { provided => (
            <ul className="collection" style={{marginTop: "0px", backgroundImage: `url(${GWTH})`}} {...provided.droppableProps} ref={provided.innerRef} >
              
              {curUser.shoppingList?
                  curUser.shoppingList.map( (i, idx) => 
                  <Draggable 
                    key={idx}
                    draggableId={`id-${i.name}-${idx}`}
                    index={idx}
                    isDragDisabled={storeMode}
                  >

                      { prov =>
                      <li
                        className="collection-item left-align blue-grey-text text-darken-1"
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        ref={prov.innerRef}
                        // onClick={toggleItemCrossed}
                        >

                        {/* <input type="checkbox" /> */}
                        <span
                          style={i.dummyUserEmail? {textDecoration: "line-through", color: "lightgrey"} : {textDecoration: "none"}}
                          onClick={(e) => toggleItemCrossed(e, idx)}
                        >
                          {i.name}
                        </span>

                        {storeMode?
                          <></>
                          : 
                          <button
                            className="btn red darken-2 right"
                            style={{marginTop: "-5px"}}
                            onClick={() => removeIngredientFromList(i.name, idx)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                        }
                      </li>
                      }

                  </Draggable>
                  )
                  :
                  <></>
              }

              {provided.placeholder}
            </ul>
          )}
        </Droppable>


      </DragDropContext>
    </>
  );

}

export default ShopListEditMode;