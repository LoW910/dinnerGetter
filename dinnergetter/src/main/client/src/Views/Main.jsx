import Nav from "../Components/Nav";
import ShoppingList from "../Components/ShoppingList";

const Main = ({children }) =>{
    //handle logic

    //manipulate the html
    return(
        <div className="flex-row">
            <Nav />
            { children }
        </div>
    );
}

export default Main;