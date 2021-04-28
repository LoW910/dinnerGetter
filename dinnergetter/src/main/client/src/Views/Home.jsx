import LoginButton from "../Components/LoginButton";
import LogoutButton from "../Components/LogoutButton";
import OnHand from "../Components/OnHand";
import Profile from "../Components/Profile";
import Recipes from "../Components/Recipes";
import ShoppingList from "../Components/ShoppingList";
import { useAuth0 } from '@auth0/auth0-react'
import React, {useState, useEffect, useContext} from "react";
import MyContext from "../MyContext";
import axios from 'axios'


const Home = props =>{

    const { user, isAuthenticated, isLoading } = useAuth0();
    const {curUser,pantry,setPantry,ingredient, setIngredient} = useContext(MyContext);



    useEffect( () => {
        setPantry(curUser.pantry);
    }, [curUser]);

    const handleFormChange = e => {
        setIngredient({ name: e.target.value});
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        ingredient.dummyUserEmail = curUser.email;

        axios.post('http://localhost:8080/api/ingredients/addtopantry', ingredient)
            .then(response => {
                if(response.data){
                    setPantry([...pantry, ingredient]);
                }
                setIngredient({name: ""});
            }).catch( err => console.log(err));
    }

    const removeFromPantry = (e, ingredient) => {
        console.log("blarg");
        ingredient.dummyUserEmail = curUser.email;
        axios.post("http://localhost:8080/api/ingredients/removefrompantry", ingredient)
            .then(response => {
                let tempPantry = [...pantry];
                tempPantry.splice(tempPantry.indexOf(ingredient), 1);
                setPantry(tempPantry);
            }).catch( err => console.log(err));
    }

    return(
        <>

            <div className="row">
                <div className="col m6 s12 row">
                    <Recipes />
                </div>
                <div className="col m6 s12 row">
                    <OnHand
                        pantry={pantry}
                        handleChange={handleFormChange}
                        handleSubmit={handleFormSubmit}
                        ingredient={ingredient}
                        removeFromPantry={removeFromPantry}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col m6 offset-m3 s12 row">
                    <ShoppingList />
                </div>
                <LoginButton />
                <LogoutButton />
                <Profile />
            </div>
        </>
    );
}
export default Home;