import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as uri from "../uri";
import { Button } from "react-bootstrap";

export const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button
            onClick={() => logout({ returnTo: uri.AUTH0_REDIRECT_URI })}
            className="logout-button"
            style={{}}
        >
            Log Out
        </button>
    );
};
