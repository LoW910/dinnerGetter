import axios from 'axios';
import React from 'react'

function SaveRecipeBtn({rId, uEmail}) {

    const bcuz = false;
    const onClickHandler= (e)=>{
        e.preventDefault();
        console.log("Inside the save/favorite recipe button vvvvvvvvvvvvvvvvvvvvv")
        axios.post(`http://localhost:8080/api/recipes/${rId}/save`)
            .then(res => {
                console.log("inside saveRecipeAxiosPost then")
            }).catch(err => console.log("",err))
        console.log("Inside the save/favorite recipe button ^^^^^^^^^^^^^^^^^^^^^")
    }
    return (
        <button className="waves-effect waves-dark btn" onClick={(e) => onClickHandler(e)}>
            {bcuz?<i className="material-icons left">leak_add</i>:<i className="material-icons left">leak_remove</i>}
        </button>
    )
}

export default SaveRecipeBtn
