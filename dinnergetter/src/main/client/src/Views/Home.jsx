import { useAuth0 } from '@auth0/auth0-react';
import { navigate } from "@reach/router";
import axios from 'axios';
import { useContext, useEffect } from "react";
import LoginButton from "../Components/LoginButton";
import LogoutButton from "../Components/LogoutButton";
import OnHand from "../Components/OnHand";
import Profile from "../Components/Profile";
import Recipes from "../Components/Recipes";
import ShoppingList from "../Components/ShoppingList";
import MyContext from "../MyContext";
import M from "materialize-css";


const Home = props =>{

    const { user, isAuthenticated, isLoading } = useAuth0();
    const {curUser,pantry,setPantry,ingredient, setIngredient, setRedirectLocation, setUserIngredientList, userIngredientList, searchResults, setUser} = useContext(MyContext);

    useEffect( ()=>{
        M.AutoInit();
        if(curUser.email == ""){
            setRedirectLocation("/dashboard");
            navigate("/");
        } 

        if(!curUser.pantry){
            setPantry([]);
            return;
        }

        // because of the way the relational database creates JSON objects, sometimes instead of getting an actual recipe we just get a recipe ID.  Which is not ideal for, you know, showing your recipe on the page
        let ingredients = curUser.pantry;
        for(let i=0; i<ingredients.length; i++){
            if(typeof ingredients[i] === "number"){
                console.log("HERE IS OUR AXIOS CALL FOR NUMBER", ingredients[i]);
                axios.get(`http://localhost:8080/api/ingredients/${ingredients[i]}`)
                    .then(res => {
                        ingredients.splice(i, 1, res.data);
                        setUser({...curUser,
                            pantry: ingredients
                        });
                        setPantry(ingredients);

                    }).catch(err => console.log(err));
            }
        }
        setPantry(curUser?.pantry);
    },[]);
    
    //==================================================================================
    //  Handling the ingredients on hand
    //==================================================================================
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
        ingredient.dummyUserEmail = curUser.email;
        axios.post("http://localhost:8080/api/ingredients/removefrompantry", ingredient)
        .then(response => {
            let tempPantry = [...pantry];
            tempPantry.splice(tempPantry.indexOf(ingredient), 1);
            setPantry(tempPantry);
        }).catch( err => console.log(err));
    }
    //==================================================================================
    return(
        <>
            <div className="row">
                {/* 
                supposed to display the search results but doesn't do a super great job at it, needs work
                ideally, it would overlap other components but idk how to do that with materialize yet
                */ }
                {/* <div className="row">
                    {searchResults?.length > 0 ? 
                        <div className="col s4 offset-s8 grey darken-3" style={{ minHeight:" 0px"}}>
                            <ul>
                                {searchResults?.map((r,idx )=>
                                    <p key={idx}><li>{r.name}</li></p>
                                )}
                            </ul>
                        </div>
                    : null
                    }
                    {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}               
                {/* </div> */} 
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
                {/* <div className="col m6 offset-m3 s12 row">
                    <ShoppingList />
                </div> */}
                <LoginButton />
                <LogoutButton />
                <Profile />
            </div>
        </>
    );
}
export default Home;