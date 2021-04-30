import { Link, navigate } from "@reach/router";
import { useAuth0 } from '@auth0/auth0-react';
import axios from "axios";
import { useContext, useEffect } from "react";
import MyContext from "../MyContext";
import M from "materialize-css";

const Nav = props =>{

    useEffect( () => {
        M.AutoInit();
    }, []);
    
    const { recipe, setRecipe, searchResults, setSearchResults, setRedirectLocation } = useContext(MyContext);
    const { logout, isAuthenticated } = useAuth0();

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
        <div className="navbar-fixed">
            <nav>
                <div className = "nav-wrapper grey darken-3">
                    <span className="brand-logo center">Dinner Picker</span>
                    <a data-target="mob-menu" className="sidenav-trigger" ><i className="material-icons">menu</i></a>
                    <ul className="left hide-on-med-and-down">
                        <li><Link to="/dashboard" className="text-decoration-none  text-white" onClick={navigateThroughLandingPad}>Home</Link></li>

                        <li><Link to="/recipes" className="text-decoration-none text-white" onClick={navigateThroughLandingPad}>My Recipes</Link></li>

                        <li><Link to="/shopping" className="text-decoration-none text-white" onClick={navigateThroughLandingPad}>Shopping</Link></li>

                        {isAuthenticated?
                            <li><Link to="/dashboard" className="text-decoration-none text-white" onClick={(e) => {e.preventDefault(); logout( { returnTo: window.location.origin }) }}>Log out</Link></li>
                            :
                            <></>
                        }

                    </ul>
                    <form className="input-field right hide-on-med-and-down">
                        <input
                            id="search"
                            type="search"
                            value={recipe.name}
                            onChange={(e)=>searchHandler(e)}
                            className="form-control autocomplete grey-text text-darken-3"
                        />
                        <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                    </form>
                </div>
            </nav>
        </div>
    );
}

export default Nav;