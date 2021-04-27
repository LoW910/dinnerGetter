import { useContext} from "react";
import MyContext from "../MyContext";
import {Link} from "@reach/router";

const Nav = props =>{
    const { search, setSearch } = useContext(MyContext);
    const searchHandler = (e) =>{
        setSearch(e.target.value);
        // axios get request to the backend api to return the saved recipes matching the current string in the search bar
    }

    return(
        <div className="d-flex flex-row justify-content-between bg-dark p-2 shadow">
            <div className="d-flex col-4 justify-content-around">
                <Link to="/" className="text-decoration-none  text-white">Home</Link> 
                <Link to="/" className="text-decoration-none text-white">My Recipes</Link>
                <Link to="/" className="text-decoration-none text-white">Shopping</Link>
            </div>
            <div className="d-flex col-4 justify-content-center text-white">
                <p>Dinner Picker</p>
            </div>
            <div className="d-flex col-4 justify-content-end">
                {/* this will have to talk with our java backend*/ }
                <form>
                    <input type="search" placeholder="search" value={search} onChange={(e)=>searchHandler(e)} className="form-control"/>
                </form>
            </div>
        </div>
    );
}

export default Nav;