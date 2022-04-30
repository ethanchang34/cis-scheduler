import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Menu } from "@headlessui/react";
import { LogoutButton } from "../login_components/LogoutButton";

export const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <div className="rounded-xl border-4 border-indigo-200 p-4">
            {isLoading ? (
                // loading
                <div>
                    <p className="text-xl">Loading...</p>
                </div>
            ) : isAuthenticated && user ? (
                // logged in and user profile is loaded
                <Menu>
                    <Menu.Button>
                        <img
                            src={user.picture}
                            alt="Profile"
                            className="profile-pic"
                        />
                    </Menu.Button>
                    <Menu.Items
                        style={{
                            position: "absolute",
                            background: "white",
                            padding: "0.5rem",
                            color: "black",
                            borderRadius: "0.3rem"
                        }}
                    >
                        <Menu.Item>
                            {({ active }) => (
                                <div style={{ paddingBottom: "0.3rem" }}>
                                    {user.name}
                                </div>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => <LogoutButton />}
                        </Menu.Item>
                    </Menu.Items>
                </Menu>
            ) : null}
        </div>
    );
};

// {/* <span className="flex flex-col items-center">
//                     <img
//                         src={user.picture}
//                         alt="Profile"
//                         className="h-32 w-32 rounded-full"
//                     />
//                     <span className="text-2xl font-bold">{user.name}</span>
//                     {/* <p className="text-xl">{user.email}</p> */}
//                 </span> */}
