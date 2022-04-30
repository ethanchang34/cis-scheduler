import React from "react";
import { LoginButton } from "./login_components/LoginButton";
import { LogoutButton } from "./login_components/LogoutButton";
import { Profile } from "./login_components/Profile";

export const LoginPage = () => {
    return (
        <div className="login">
            <h1 className="login-header">Auth0 Login</h1>
            <div className="flex space-x-2">
                <LoginButton />
                <LogoutButton />
            </div>
        </div>
    );
};
