import React, { useState, useContext } from 'react'
import MyContext from "../MyContext";
import { navigate } from '@reach/router'
// import axios from 'axios'

export default function NewRecipeForm({ handleSubmit, recipeInputs, setRecipeInputs }) {
    const {curUser, ingredient} = useContext(MyContext);
    const

    // ============================================================
    // ************************************************************
    //                  G O D       D A M N
    // ************************************************************
    // ============================================================
    
    
    return (
        <div className="container row">
            <div className="col s8 offset-s2 card blue-grey darken-1">
                <form className="card-content">
                    <div className="input-field">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            // placeholder="Name"
                        />
                        <label htmlFor="name" className="active">
                            Name
                        </label>
                    </div>

                    <div className="input-field">
                        <textarea
                            className="materialize-textarea"
                            type="text"
                            name="steps"
                            id="steps"
                            // placeholder="steps"
                        />
                        <label htmlFor="steps" className="active">
                            Steps
                        </label>
                    </div>
                </form>
            </div>
        </div>
    )
}
