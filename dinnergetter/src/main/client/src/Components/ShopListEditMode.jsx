import React, {useContext} from "react";
import MyContext from "../MyContext";
import GWTH from '../static/img/GWTH.jpg'
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

const ShopListEditMode = ({handleDrop, curUser, storeMode}) => {

  const toggleItemCrossed = (e) => {
    if(storeMode){
      // [this.style, this.altstyle] = [this.altstyle, this.style];
      console.log(e);
      // console.log(e.target.)
    }
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
                        className="collection-item blue-grey-text text-darken-1"
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        ref={prov.innerRef}
                        // onClick={toggleItemCrossed}
                        >

                        
                         <span
                          altstyle={{textDecoration: "line-through", color: "lightgrey"}}
                          style={{textDecoration: "none"}}
                          onClick={toggleItemCrossed}
                        >
                          {i.name}
                        </span>

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