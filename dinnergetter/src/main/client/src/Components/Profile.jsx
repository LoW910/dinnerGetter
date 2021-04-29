import { useAuth0 } from "@auth0/auth0-react";
import React, {useContext} from "react";
import MyContext from "../MyContext"

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const {curUser} = useContext(MyContext);


  if (isLoading) {
    return <div>Loading ...</div>;
  }
  // console.log(user.sub)

  // const logUser = () => {
    
  // };


  return (
    <div>
      {/* {JSON.stringify(user, null, 2)} */}
      <p></p>
      <p>{user.email}</p>
      <button onClick={() => console.log(user)} className="btn purple">
        Click to log user from Auth0
      </button>
      <button onClick={() => console.log(curUser)} className="btn purple">
        Click to log user from context
      </button>
    </div>
  );
}

export default Profile;
