import { Link, navigate } from "@reach/router";
import axios from "axios";
import { useContext, useEffect } from "react";
import MyContext from "../MyContext";
import M from "materialize-css";
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const MobileNav = () =>{

    useEffect( () => {
        M.AutoInit();
    }, []);
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { recipe, setRecipe, searchResults, setSearchResults, curUser, setRedirectLocation} = useContext(MyContext);

    const searchHandler = (e) =>{
        setRecipe( {name: e.target.value});
        // axios get request to the backend api to return the saved recipes matching the current string in the search bar
        axios.post("http://localhost:8080/api/recipes/search/name", recipe )
            .then( res => {
                // console.log(res);
                setSearchResults(res.data);
            }).catch( err => console.log(`Not yo day mf ${err}`));
    }
    // console.log(searchResults);

    const navigateThroughLandingPad = e => {
        e.preventDefault();
        setRedirectLocation(e.target.pathname);
        navigate("/");
    }

    return( 
        <>
            <ul className="sidenav row" id="mob-menu">
                {isAuthenticated?<li>
                    <h5>{user.name}</h5>
                </li>:<li><LoginButton /></li>}

                <li>
                    <Link to="/dashboard" className="text-decoration-none  text-white" onClick={navigateThroughLandingPad}>Home</Link>
                </li>
                <li>
                    <Link to="/recipes" className="text-decoration-none text-white" onClick={navigateThroughLandingPad}>My Recipes</Link>
                </li>
                <li>
                    <Link to="/shopping" className="text-decoration-none text-white" onClick={navigateThroughLandingPad}>Shopping</Link>
                </li>
                {isAuthenticated?
                    <li className="col s12">
                        <LogoutButton />
                    </li>
                    :
                    <></>
                }
                <li className="row">
                    <form className="input-field col s8 offset-s2">
                        <input
                            id="search"
                            type="search"
                            value={recipe.name}
                            onChange={(e)=>searchHandler(e)}
                            className="form-control dropdown-trigger grey-text text-darken-3"
                            data-target="search-results"
                        />
                        <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                        <ul className="dropdown-content" id="search-results">
                            {searchResults?.map((r,idx )=>
                                <p key={idx}><li>{r.name}</li></p>
                            )}
                        </ul>
                    </form>
                </li>
                
            </ul>
        </>
    );
}

export default MobileNav;