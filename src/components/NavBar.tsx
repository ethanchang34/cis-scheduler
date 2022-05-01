import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../login_components/LoginButton";
import { LogoutButton } from "../login_components/LogoutButton";
import Profile from "../login_components/Profile";

const Nav = styled.section`
    background-color: var(--tertiary-color);
    // padding-top: 10px;
    // padding-bottom: 10px;
    padding: 10px 10%;
    color: var(--secondary-color);
`;

const NavContent = styled.div`
    margin: 0 auto;
    max-width: 1100px;
    display: grid;
    grid-template-columns: 33% 33% 33%;
`;

const NavCol = styled.div`
    display: flex;
    align-items: center;
`;

const NavText = styled.h2`
    font-size: 2rem;
    font-weight: 600;
`;

const PageTitles: Record<string, string> = {
    "/": "Home",
    // "/cis-scheduler-team-4/": "Home",
    "/planner": "Plans",
    "/course-search": "Course Search"
};

export const NavBar = () => {
    const navigate = useNavigate();
    const myLocation = useLocation();
    const { isAuthenticated } = useAuth0();

    return (
        <Nav>
            <NavContent>
                <NavCol>
                    {PageTitles[myLocation.pathname] !== "Course Search" && (
                        <Button
                            onClick={() => {
                                if (
                                    PageTitles[myLocation.pathname] === "Home"
                                ) {
                                    navigate("planner");
                                } else {
                                    navigate("/");
                                }
                            }}
                        >
                            {PageTitles[myLocation.pathname] === "Home"
                                ? "Get Started"
                                : "Home"}
                        </Button>
                    )}
                </NavCol>
                <NavCol style={{ justifyContent: "center" }}>
                    <NavText>{PageTitles[myLocation.pathname]}</NavText>
                </NavCol>
                <NavCol>
                    {PageTitles[myLocation.pathname] !== "Course Search" ? (
                        <Button
                            style={{ marginLeft: "auto", display: "block" }}
                            onClick={() => {
                                navigate("course-search");
                            }}
                            className={
                                PageTitles[myLocation.pathname] ===
                                "Course Search"
                                    ? "btn-danger"
                                    : ""
                            }
                        >
                            Search Courses
                        </Button>
                    ) : (
                        <Button
                            style={{ marginLeft: "auto", display: "block" }}
                            onClick={() => {
                                navigate(-1);
                            }}
                            className={
                                PageTitles[myLocation.pathname] ===
                                "Course Search"
                                    ? "btn-danger"
                                    : ""
                            }
                        >
                            Back
                        </Button>
                    )}
                    {!isAuthenticated ? <LoginButton /> : <Profile />}
                </NavCol>
            </NavContent>
        </Nav>
    );
};
