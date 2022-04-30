import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as uri from "../uri";

export const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button
            onClick={() => logout({ returnTo: uri.AUTH0_REDIRECT_URI })}
            className="rounded-xl border-4 border-indigo-500 p-4 text-2xl font-bold text-indigo-500"
        >
            Log Out
        </button>
    );
};
