import "./LoginPage.css";
import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import App from "./App";
//removed     "proxy": "http://127.0.0.1:5000", from package.json

export const LoginPage = () => {
    /* const responseGoogle = (response: any) => {
        console.log(response);
    }; */
    const [loginData, setLoginData] = useState(() => {
        const saved = localStorage.getItem("loginData");
        if (saved) {
            return JSON.parse(saved);
        } else {
            return null;
        }
    });

    const handleLogin = async (googleData: any) => {
        const res = await fetch("/api/google-login", {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        setLoginData(data);
        localStorage.setItem("loginData", JSON.stringify(data));
    };

    /* const handleLogout = () => {
        localStorage.removeItem("loginData");
        setLoginData(null);
    }; */

    const handleFailure = (result: any) => {
        alert(result);
    };

    return (
        <div className="login">
            <header className="login-header">
                <h1>Google Login</h1>
                <div>
                    {loginData ? (
                        <App />
                    ) : (
                        <GoogleLogin
                            clientId="583898615812-104vkalmholh77posqtqoouns9kbk9ak.apps.googleusercontent.com"
                            //clientId={process.env.REACT_GOOGLE_APP_CLIENT_ID}
                            buttonText="Login"
                            onSuccess={handleLogin}
                            onFailure={handleFailure}
                            cookiePolicy={"single_host_origin"}
                            isSignedIn={true}
                        />
                    )}
                </div>
            </header>
        </div>
    );
    // document.getElementById("googleButton");
    /*  return (
        <div className="login">
            <header className="login-header">
                <h1>Google Login</h1>
                <div>
                    <GoogleLogin
                        clientId="583898615812-104vkalmholh77posqtqoouns9kbk9ak.apps.googleusercontent.com"
                        //clientId={'${process.env.REACT_APP_GOOGLE_CLIENT_ID}'}
                        buttonText="Log in with Google"
                        onSuccess={handleLogin}
                        onFailure={handleFailure}
                        cookiePolicy={"single_host_origin"}
                    ></GoogleLogin>
                </div>
            </header>
        </div>
    ); */
};
