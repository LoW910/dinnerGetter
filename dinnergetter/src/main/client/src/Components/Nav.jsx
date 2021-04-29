import { Link } from "@reach/router";
import axios from "axios";
import { useContext } from "react";
import MyContext from "../MyContext";
const Nav = props =>{
    const { recipe, setRecipe, searchResults, setSearchResults } = useContext(MyContext);

    const searchHandler = (e) =>{
        setRecipe( {name: e.target.value});
        // axios get request to the backend api to return the saved recipes matching the current string in the search bar
        axios.post("http://localhost:8080/api/recipes/search/name", recipe )
            .then( res => {
                console.log(res);
                setSearchResults(res.data);
            }).catch( err => console.log(`Not yo day mf ${err}`));
    }
    console.log(searchResults);

    return( 
        <div className="navbar-fixed">
            <nav>
                <div className = "nav-wrapper grey darken-3">
                    <span className="brand-logo center">Dinner Picker</span>
                    <ul className="left">
                        <li><Link to="/dashboard" className="text-decoration-none  text-white">Home</Link></li>
                        <li><Link to="/recipes" className="text-decoration-none text-white">My Recipes</Link></li>
                        <li><Link to="/" className="text-decoration-none text-white">Shopping</Link></li>
                    </ul>
                    <form className="input-field right">
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