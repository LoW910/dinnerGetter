import React, { useState } from 'react'
import { navigate } from '@reach/router'
import axios from 'axios'

export default function AddIngredientForm() {

    const [ingredient, setIngredient] = useState({name: ""});
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Do some form submission shit here")
        console.log("inside form ingredient name: ", ingredient.name);
        axios.post('http://localhost:8080/api/ingredients/create', ingredient
            )
            .then(response => {
                console.log("should have new record", response)
                console.log("need to handle repop of onhand ingredients")
            }).catch( err => console.log(err));
    }
    // ************************************************************
    //                  G O D       D A M N
    // ************************************************************
    return (
        
            <form className="col s12" onSubmit={handleFormSubmit}>
                <div className="row">
                    <div className="input-field col s8">
                        <input
                            placeholder="Add Ingredient"
                            id="name"
                            type="text"
                            className="validate"
                            value={ingredient.name}
                            onChange={(e) => setIngredient({ name: e.target.value})}
                        />
                        <label htmlFor="name" className="active">{ingredient.name === "" ? null : "Add Ingredient"}</label>
                    </div>
                    <div className="col s3 offset-s1">
                        <button className="waves-effect waves-light btn right" style={{marginTop: "10px"}} type="submit">
                        <i className="material-icons">send</i></button>
                    </div>
                {/* <span className="bg-danger">{props.errors.name ? props.errors.name :""}</span> */}
                </div>
                
                {/* <button className="waves-effect waves-light btn" onClick={(e) => {e.preventDefault();navigate("/")}}>Reset</button> */}
            </form>
        
    )
}
