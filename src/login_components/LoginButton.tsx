import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <button
            onClick={() => loginWithRedirect()}
            className="rounded-xl bg-indigo-500 p-4 text-2xl font-bold text-white"
        >
            Log In
        </button>
    );
};
