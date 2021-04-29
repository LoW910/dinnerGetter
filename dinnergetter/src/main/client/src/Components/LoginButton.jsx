import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

function LoginButton() {
    const { loginWithRedirect } = useAuth0();
    return (
        <button className="btn orange accent-4" onClick={ () => loginWithRedirect()}>
            Log In
        </button>
    )
}

export default LoginButton
