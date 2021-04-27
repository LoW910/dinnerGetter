import OnHand from "../Components/OnHand";
import Recipes from "../Components/Recipes";
import ShoppingList from "../Components/ShoppingList";

const Home = props =>{
    return(
        <div className="flex-container">
            <div className="row">
                <Recipes className="col s5 push-s6"/>
                <OnHand className="col s6 pull-s5"/>
            </div>
            <ShoppingList />
        </div>
    );
}
export default Home;