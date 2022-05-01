import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Menu, Transition } from "@headlessui/react";
import { LogoutButton } from "./LogoutButton";
import Loading from "./Loading";
import "./Profile.css";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <div>
            {isLoading ? (
                // loading
                <div>
                    <p className="text-xl">Loading...</p>
                </div>
            ) : isAuthenticated && user ? (
                // logged in and user profile is loaded
                <Menu as="div" className="menu">
                    <Menu.Button className="menu-button">
                        <img
                            src={user.picture}
                            alt="Profile"
                            className="profile-pic"
                        />
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="enter"
                        enterFrom="enterFrom"
                        enterTo="enterTo"
                        leave="leave"
                        leaveFrom="leaveFrom"
                        leaveTo="leaveTo"
                    >
                        <Menu.Items className="menu-items">
                            <Menu.Item as="div" className="menu-item">
                                <div style={{ paddingBottom: "0.3rem" }}>
                                    {user.name}
                                </div>
                            </Menu.Item>
                            <Menu.Item
                                as="div"
                                className="menu-item logout-item"
                            >
                                <LogoutButton />
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            ) : null}
        </div>
    );
};

export default Profile;
