import React, { useState } from 'react'
import { navigate } from '@reach/router'

export default function AddIngredientForm() {
    const [ingredientName, setIngredientName] = useState("");

const handleformSubmit = (e) => {
    e.preventDefault();
    console.log("Do so form submission shit here")
}

    return (
        <div>
            <form class="col s12">{/* onSubmit={}*/}
                <div class="row">
                <div class="input-field col s6">
                <input placeholder="Add Ingredient" id="ingredientName" type="text" class="validate" />
                </div> 
                <br/>
                {/* <span className="bg-danger">{props.errors.ingredientName ? props.errors.ingredientName.message :""}</span> */}
                </div>
                <input className="waves-effect waves-light btn"  type="submit" />
                {/* <button className="waves-effect waves-light btn" onClick={(e) => {e.preventDefault();navigate("/")}}>Reset</button> */}
            </form>
        </div>
    )
}
