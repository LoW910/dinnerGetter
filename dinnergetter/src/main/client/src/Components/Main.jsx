import Nav from "./Nav";

const Main = ({ children }) =>{
    //handle logic


    //manipulate the html
    return(
        <div className="d-flex">
            <Nav />
            { children }
        </div>
    );
}

export default Main;