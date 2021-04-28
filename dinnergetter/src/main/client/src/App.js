import { Router } from "@reach/router";
import { useState } from 'react';
import './App.css';
import MyContext from './MyContext';
import Home from "./Views/Home";
import Main from "./Views/Main";
import LandingPad from "./Components/LandingPad"

function App() {
  const [ recipe, setRecipe ] = useState({ name: ""});
  const [ user, setUser ] = useState({
    firstName: "",
    lastName: "",
    email: "",
    addedRecipes: [],
    savedRecipes: [],
    pantry: [],
    shoppingList: []
  });
  const [ recipes, setRecipes ] = useState([]);

  return (
    <div className="App">
      <MyContext.Provider value = {{ recipe, setRecipe, user, setUser }}>
        <Router>
          {/* some router react/reach */}
          <LandingPad path="/login" />
          <Main path="/">
          {/* Main children, allows us to keep the nav in the same place every time*/}
            <Home path="/" />
          </Main>
        </Router>
      </MyContext.Provider>
    </div>
  );
}

export default App;
