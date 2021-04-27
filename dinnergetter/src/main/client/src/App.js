import './App.css';
import Main from "./Views/Main";
import MyContext from './MyContext';
import { useState } from 'react';
import { Router } from "@reach/router";
import Home from "./Views/Home";

function App() {
  const [ search, setSearch ] = useState("");

  return (
    <div className="App">
      <MyContext.Provider value = {{ search, setSearch }}>
        <Router>
          {/* some router react/reach */}
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
