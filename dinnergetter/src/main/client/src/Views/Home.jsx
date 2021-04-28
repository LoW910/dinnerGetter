import LoginButton from "../Components/LoginButton";
import LogoutButton from "../Components/LogoutButton";
import OnHand from "../Components/OnHand";
import Profile from "../Components/Profile";
import Recipes from "../Components/Recipes";
import ShoppingList from "../Components/ShoppingList";
import { useAuth0 } from '@auth0/auth0-react'


const Home = props =>{

    const { user, isAuthenticated, isLoading } = useAuth0();



    return(
        <>

            <div className="row">
                <div className="col m6 s12 row">
                    <Recipes />
                </div>
                <div className="col m6 s12 row">
                    <OnHand />
                </div>
            </div>
            <div className="row">
                <div className="col m6 offset-m3 s12 row">
                    <ShoppingList />
                </div>
                <LoginButton />
                <LogoutButton />
                <Profile />
            </div>
        </>
    );
}
export default Home;