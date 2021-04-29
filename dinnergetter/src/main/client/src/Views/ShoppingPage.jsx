import { navigate } from '@reach/router';
// import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import M from "materialize-css";
import React, { useContext, useEffect, useState } from "react";
import ShoppingList from "../Components/ShoppingList";
import MyContext from "../MyContext";

const ShoppingPage = props => {
    const { curUser, setUser, shoppingList, setShoppingList, setRedirectLocation, ingredient, setIngredient } = useContext(MyContext);

    const [counter, setCounter] = useState(0);


    useEffect(() => {
        M.AutoInit();
        if (curUser.email == "") {
            setRedirectLocation("/shopping");
            navigate("/");
        }

        if (!curUser.shoppingList) {
            setShoppingList([]);
            return;
        }

        // because of the way the relational database creates JSON objects, sometimes instead of getting an actual recipe we just get a recipe ID.  Which is not ideal for, you know, showing your recipe on the page
        let ingredients = curUser.shoppingList;
        for (let i = 0; i < ingredients.length; i++) {
            if (typeof ingredients[i] === "number") {
                console.log("HERE IS OUR AXIOS CALL FOR NUMBER", ingredients[i]);
                axios.get(`http://localhost:8080/api/ingredients/${ingredients[i]}`)
                    .then(res => {
                        ingredients.splice(i, 1, res.data);
                        setUser({
                            ...curUser,
                            shoppingList: ingredients
                        });
                        console.log("vvvvvvvvvvvvvvvvvvv" +curUser.shoppingList)
                        setShoppingList(ingredients);

                    }).catch(err => console.log(err));
            }
        }
        setShoppingList(curUser?.shoppingList);
    }, []);

    const handleFormChange = e => {
        setIngredient({ name: e.target.value });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        ingredient.dummyUserEmail = curUser.email;
        // setIngredient({name: ""});
        console.log(ingredient.dummyUserEmail);

        axios.post('http://localhost:8080/api/ingredients/addtoshoppinglist', ingredient)
            .then(response => {
                console.log(response.data);
                if(response.data){
                    setShoppingList([...shoppingList, ingredient]);
                }
                // setShoppingList(response.data);
                // setCounter(counter + 1);
                setIngredient({ name: "" });
            }).catch(err => console.log(err));
    }

    const whatishappening = () => {
        
    }


    return (
        <div className="row">

            <div className="col s12 m6 offset-m3">

                <ShoppingList
                    handleFormSubmit={handleFormSubmit}
                    handleFormChange={handleFormChange}
                    shoppingList={shoppingList}
                />

                <p>{counter}</p>
                <button onClick={whatishappening}></button>

            </div>
        </div>
    );
}

export default ShoppingPage;