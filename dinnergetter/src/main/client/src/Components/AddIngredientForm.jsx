import React, { useContext } from 'react';
import MyContext from "../MyContext";
// import axios from 'axios'

export default function AddIngredientForm(props) {
    const { ingredient} = useContext(MyContext);

    const {handleChange, handleSubmit} = props;

    
    // const handleFormSubmit = (e) => {
    //     e.preventDefault();

    //     ingredient.dummyUserEmail = curUser.email;

    //     console.log("Do some form submission shit here");
    //     console.log("inside form ingredient name: ", ingredient.name);
    //     console.log("user email dumb:", ingredient.dummyUserEmail);
    //     axios.post('http://localhost:8080/api/ingredients/addtopantry', ingredient)
    //         .then(response => {
    //             console.log("should have new record", response)
    //             console.log("need to handle repop of onhand ingredients")
    //         }).catch( err => console.log(err));
    // }
    // ************************************************************
    //                  G O D       D A M N
    // ************************************************************
    return (
        
            <form className="col s12 white" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-field col s8">
                        <input
                            placeholder="Add Ingredient"
                            id="name"
                            type="text"
                            className="validate"
                            value={ingredient.name}
                            onChange={handleChange}
                        />
                        <label htmlFor="name" className="active">
                            {ingredient.name? "" :
                                ingredient.name === "" ? "" : "Add Ingredient"}
                            </label>
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
