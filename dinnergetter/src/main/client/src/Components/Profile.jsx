import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  // console.log(user.sub)

  const logUser = () => {
    console.log(user);
  };

  return (
    <div>
      {/* {JSON.stringify(user, null, 2)} */}
      <p></p>
      <p>{user.email}</p>
      <button onClick={logUser} className="btn purple">
        Click to log user
      </button>
    </div>
  );
}

export default Profile;
