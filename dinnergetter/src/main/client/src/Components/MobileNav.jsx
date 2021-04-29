import { Link } from "@reach/router";
import axios from "axios";
import { useContext, useEffect } from "react";
import MyContext from "../MyContext";
import M from "materialize-css";
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from "./LoginButton";

const MobileNav = () =>{

    useEffect( () => {
        M.AutoInit();
    }, []);
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { recipe, setRecipe, searchResults, setSearchResults, curUser} = useContext(MyContext);

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

    return( 
        <>
            <ul className="sidenav" id="mob-menu">
                {isAuthenticated?<li>
                    <h5>{user.name}</h5>
                </li>:<li><LoginButton /></li>}

                <li>
                    <Link to="/dashboard" className="text-decoration-none  text-white">Home</Link>
                </li>
                <li>
                    <Link to="/recipes" className="text-decoration-none text-white">My Recipes</Link>
                </li>
                <li>
                    <Link to="/shopping" className="text-decoration-none text-white">Shopping</Link>
                </li>
                <li>
                <form className="input-field right">
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