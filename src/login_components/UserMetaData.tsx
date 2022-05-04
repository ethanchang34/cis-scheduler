import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserMetaData = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState<string | null>(null);

    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = "dev--0t6-2tu.us.auth0.com";

            if (user && isAuthenticated) {
                try {
                    const accessToken = await getAccessTokenSilently({
                        audience: `https://${domain}/api/v2/`,
                        scope: "read:current_user update:current_user_metadata"
                    });

                    const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

                    const metadataResponse = await fetch(userDetailsByIdUrl, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });

                    const { user_metadata } = await metadataResponse.json();

                    setUserMetadata(user_metadata);
                } catch (e) {
                    if (typeof e === "string") {
                        console.log(e.toUpperCase()); // works, `e` narrowed to string
                    } else if (e instanceof Error) {
                        console.log(e.message); // works, `e` narrowed to Error
                    }
                }
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);

    const handle = () => {
        setUserMetadata(localStorage.getItem("CISC275-4-plans"));
    };

    return isAuthenticated && user ? (
        <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <h3>User Metadata</h3>
            {userMetadata && <pre>{JSON.stringify(userMetadata, null, 2)}</pre>}
            <button onClick={handle}>test</button>
        </div>
    ) : null;
};
