import React, {useEffect, useContext} from "react";
import MyContext from "../MyContext";
import { navigate } from "@reach/router";
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

const LandingPad = (props) => {
    const { curUser, setUser, setUserIngredientList, userIngredientList, redirectLocation} = useContext(MyContext);
    const { user, isAuthenticated } = useAuth0();
    
    if (isAuthenticated) {
        axios.post('http://localhost:8080/api/users/checkdb', user)
            .then(res =>{
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
                // // set the user ingredient list, which has to be a string to make the external api call
                // let pantryNames = res.data.pantry.map( i => (i.name));
                // console.log(pantryNames);
                // let templist = "";
                // for(let i = 0; i < res.data.pantry; i ++){
                //     // setUserIngredientList(userIngredientList = userIngredientList + "," + curUser.pantry[i].name);
                //     templist += res.data.pantry[i].name + ","
                // }
                // setUserIngredientList(templist);
                // // console.log(curUser.pantry);
                // console.log(templist);
                // // console.log(userIngredientList);
                return res;
            })
            .then((res) =>{
                console.log(curUser.pantry);
                let templist = "";
                for(let i = 0; i < curUser.pantry.length; i ++){
                    // setUserIngredientList(userIngredientList = userIngredientList + "," + curUser.pantry[i].name);
                    templist += curUser.pantry[i].name.toLowerCase() + ","
                }
                setUserIngredientList(templist.substring(0, templist.length - 1));
                console.log(templist.substring(0, templist.length - 1));
            })
            .then(() => {
                navigate(redirectLocation? redirectLocation : "/dashboard");
            })
            .catch( e => console.error({errors: e}));
    }

    return (
        isAuthenticated && (
            <div className="container">
                <div className="card">
                    <div className="card-content">
                        <div className="preloader-wrapper big active">
                            <div className="spinner-layer spinner-blue">
                                <div className="circle-clipper left">
                                <div className="circle"></div>
                                </div><div className="gap-patch">
                                <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                <div className="circle"></div>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-red">
                                <div className="circle-clipper left">
                                <div className="circle"></div>
                                </div><div className="gap-patch">
                                <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                <div className="circle"></div>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-yellow">
                                <div className="circle-clipper left">
                                <div className="circle"></div>
                                </div><div className="gap-patch">
                                <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                <div className="circle"></div>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-green">
                                <div className="circle-clipper left">
                                <div className="circle"></div>
                                </div><div className="gap-patch">
                                <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default LandingPad;