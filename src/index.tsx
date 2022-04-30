// You will not need to modify this file

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
//import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { LoginPage } from "./LoginPage";
import * as uri from "./uri";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter basename="/cis-scheduler-team-4">
            <Auth0Provider
                domain="dev--0t6-2tu.us.auth0.com"
                clientId="sI0gFY8VJTI1guaDRmSsadvUKZNr4K37"
                redirectUri={uri.AUTH0_REDIRECT_URI}
            >
                <LoginPage />
            </Auth0Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
