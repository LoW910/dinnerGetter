import LoginButton from "./Components/LoginButton";
import LandingPad from "./Components/LandingPad";
import NewRecipeForm from "./Components/NewRecipeForm";
import { Router, Redirect} from "@reach/router";
import { useAuth0 } from '@auth0/auth0-react';
import MyContext from './MyContext';
import Nav from "./Components/Nav";
import { useState, useEffect } from 'react';
import Main from "./Views/Main";
import Home from "./Views/Home";
import RecipePage from "./Views/RecipePage";
import './App.css';
import axios from "axios";
import $ from "jquery";
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [ recipe, setRecipe ] = useState({ name: ""});

  const [userEmail, setUserEmail] = useState(user?.email);

  const [ curUser, setUser ] = useState({
    firstName: "",
    lastName: "",
    email: "",
    addedRecipes: [],
    savedRecipes: [],
    pantry: [],
    shoppingList: []
  });

  const [ recipes, setRecipes ] = useState([]);
  const [ pantry, setPantry] = useState(false);
  const [ addedRecipes, setAddedRecipes] = useState(false);
  const [ ingredient, setIngredient] = useState({name: ""});
  const [ allRecipes, setAllRecipes ] = useState([]);
  const [ hasBeenPopulated, setHasBeenPopulated ] = useState(false);
  const [ userIngredientList, setUserIngredientList] = useState("");
  const [ redirectLocation, setRedirectLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="App grey lighten-1">
      <MyContext.Provider value = {{ recipe, setRecipe, curUser, setUser, pantry, setPantry, addedRecipes, setAddedRecipes, recipes, setRecipes, ingredient, setIngredient,allRecipes, setAllRecipes,hasBeenPopulated, setHasBeenPopulated,userIngredientList, setUserIngredientList, redirectLocation, setRedirectLocation, searchResults, setSearchResults }}>
        <Nav />
        {isAuthenticated? 
          <Router>
            {/* some router react/reach */}
            <LandingPad path="/" />
            <Home path="/dashboard" />
            {/* <NewRecipeForm path="/recipes/new" /> */}
            <RecipePage path="/recipes" />
          </Router>
          :
          // <div className="container ">
              <div className="card card-panel grey lighten-1">
                  <div className="card-content">
                      <LoginButton />
                  </div>
              </div>
          // </div>
        }
      </MyContext.Provider>
    </div>
  );
}

export default App;
