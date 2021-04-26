import './App.css';
import Main from "./Components/Main";
import MyContext from './MyContext';
import { useState } from 'react';

function App() {
  const [ getSearch, setSearch ] = useState("");
  return (
    <div className="d-flex">
      <MyContext.Provider value = {{ getSearch, setSearch}}>
        {/* some router react/reach */}
        <Main>
        {/* Main children, allows us to keep the nav in the same place every time*/}
        </Main>
      </MyContext.Provider>
    </div>
  );
}

export default App;
