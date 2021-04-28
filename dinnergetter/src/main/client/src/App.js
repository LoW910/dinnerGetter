import { Router, Redirect} from "@reach/router";
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import MyContext from './MyContext';
import Home from "./Views/Home";
import Main from "./Views/Main";
import LandingPad from "./Components/LandingPad";
import Nav from "./Components/Nav";
import LoginButton from "./Components/LoginButton";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [ recipe, setRecipe ] = useState({ name: ""});
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
  const [pantry, setPantry] = useState(false);
  const [ingredient, setIngredient] = useState({name: ""});

  return (
    <div className="App">
      <MyContext.Provider value = {{ recipe, setRecipe, curUser, setUser, pantry, setPantry, recipes, setRecipes, ingredient, setIngredient }}>
        <Nav />
        {isAuthenticated? 
          <Router>
            {/* some router react/reach */}
            {/* <Redirect noThrow from="/" to="/dashboard"/> */}
            <LandingPad path="/" />
            <Home path="/dashboard" />
            {/* Main children, allows us to keep the nav in the same place every time*/}
              {/* <Home /> */}
          </Router>
          :
          <div className="container">
              <div className="card">
                  <div className="card-content">
                      <LoginButton />
                  </div>
              </div>
          </div>
        }
      </MyContext.Provider>
    </div>
  );
}

export default App;
