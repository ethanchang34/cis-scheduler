import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

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
                <div className="flex flex-col items-center">
                    <img
                        src={user.picture}
                        alt="Profile"
                        className="h-32 w-32 rounded-full"
                    />
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-xl">{user.email}</p>
                </div>
            ) : (
                // not logged in or user profile not loaded
                <div>
                    <h1 className="text-2xl font-bold">Welcome!</h1>
                    <p className="text-xl">
                        Please log in to view your profile.
                    </p>
                </div>
            )}
        </div>
    );
};
