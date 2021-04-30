import { navigate } from '@reach/router';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import M from "materialize-css";
import React, { useContext, useEffect, useState } from "react";
import ShoppingList from "../Components/ShoppingList";
import MyContext from "../MyContext";

const ShoppingPage = () => {
    const { curUser, setUser, shoppingList, setShoppingList, setRedirectLocation, ingredient, setIngredient } = useContext(MyContext);
    const { user } = useAuth0();
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
        //=======================================================
        // api post to make sure user exists         
        //=======================================================        
        axios.post('http://localhost:8080/api/users/checkdb', user)
            .then(res =>{
                // console.log(res);
                // I was just guessing on how the data is going to be returned idk if this below will work but fuck it
                setUser({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: user.email,
                    addedRecipes: res.data.addedRecipes,
                    savedRecipes: res.data.savedRecipes,
                    pantry: res.data.pantry,
                    shoppingList: res.data.shoppingList
                });
                setShoppingList([ ...curUser.shoppingList]);
                return res;
            })
            .then(res => {
                let ingredients = curUser.shoppingList;
                for (let i = 0; i < ingredients.length; i++) {
                    if (typeof ingredients[i] === "number") {
                        console.log("HERE IS OUR AXIOS CALL FOR NUMBER", ingredients[i]);
                        axios.get(`http://localhost:8080/api/ingredients/${ingredients[i]}`)
                            .then(res => {
                                console.log(res.data);
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
            });
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
                    let newList = [...curUser.shoppingList];
                    ingredient.dummyUserEmail = "";
                    newList.push(ingredient);
                    setUser({...curUser, shoppingList:newList});
                }
                // setShoppingList(response.data);
                // setCounter(counter + 1);
                setIngredient({ name: "" });
            }).catch(err => console.log(err));
    }



    return (
        <div className="row">

            <div className="col s12 m8 offset-m2 l6 offset-l3">

                <ShoppingList
                    handleFormSubmit={handleFormSubmit}
                    handleFormChange={handleFormChange}
                />


            </div>
        </div>
    );
}

export default ShoppingPage;