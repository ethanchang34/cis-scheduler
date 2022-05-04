import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserMetaData = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState<string | null>(null);

    //reading metadata?
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
                    setUserMetadata(user_metadata["CISC275-4-plans"]);
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

    //updating metadata?
    const setMetadata = async (userProgress: string) => {
        const domain = "dev--0t6-2tu.us.auth0.com";

        if (user && isAuthenticated) {
            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user update:current_user_metadata"
                });

                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

                await fetch(userDetailsByIdUrl, {
                    method: "PATCH",
                    body: userProgress,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "content-type": "application/json"
                    }
                });

                // const { user_metadata } = await metadataResponse.json();

                // setUserMetadata(user_metadata);
            } catch (e) {
                if (typeof e === "string") {
                    console.log(e.toUpperCase()); // works, `e` narrowed to string
                } else if (e instanceof Error) {
                    console.log(e.message); // works, `e` narrowed to Error
                }
            }
        }
    };

    const handle = () => {
        const userProgress = localStorage.getItem("CISC275-4-plans");

        if (userProgress) {
            const jsonProgress = JSON.parse(userProgress);
            const newMetaData = {
                user_metadata: { "CISC275-4-plans": jsonProgress }
            };
            const stringified = JSON.stringify(newMetaData);
            console.log(stringified);
            setMetadata(stringified);
            setUserMetadata(stringified);
        }
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
