import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "./Loading";

const ProtectedRoute = ({ element, ...args }: { element: any; args: any }) => {
    return (
        <Route
            element={withAuthenticationRequired(element, {
                onRedirecting: () => <Loading />
            })}
            {...args}
        />
    );
};

export default ProtectedRoute;
