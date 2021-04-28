import React, {useEffect, useContext} from "react";
import MyContext from "../MyContext";
import { navigate } from "@reach/router";
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

const LandingPad = () => {
    const { setUser } = useContext(MyContext);

    const { user, isAuthenticated } = useAuth0();
    
    if (isAuthenticated) {
        
        console.log(user.email);
        axios.post('http://localhost:8080/api/users/checkdb', user)
            .then(res =>{
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%" +user)
                console.log(res);
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
                // redirect to the home page automatically
                
            })
            .then(() => {
                navigate("/dashboard");
            })
            .catch( e => console.error({errors: e}));

    }
    // useEffect( () => {
    //     // if(!isAuthenticated) navigate("/");
    //     // if we want to add the authentication code, we'd probably do that here
    //     console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%" +user)

    //     axios.post('http://localhost:8080/api/users/checkdb', user)
    //         .then(res =>{
    //             console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%" +user)
    //             console.log(res);
    //             // I was just guessing on how the data is going to be returned idk if this below will work but fuck it
    //             setUser({
    //                 firstName: res.data.firstName,
    //                 lastName: res.data.lastName,
    //                 email: res.data.email,
    //                 addedRecipes: res.data.addedRecipes,
    //                 savedRecipes: res.data.savedRecipes,
    //                 pantry: res.data.pantry,
    //                 shoppingList: res.data.shoppingList
    //             });
    //             // redirect to the home page automatically
    //             navigate("/");
    //         })
    //         .catch( e => console.error({errors: e}));
    // }, [] );

    return (
        isAuthenticated && (
            <div>
                {/* {JSON.stringify(user, null, 2)} */}
                <p></p>
                <p>{user.email}</p>
                
                <p>Hold your dad-blamed horses, we're logging you in</p>
            </div>
        )
    );
}

export default LandingPad;