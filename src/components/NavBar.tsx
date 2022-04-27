import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const Nav = styled.section`
    background-color: var(--tertiary-color);
    // padding-top: 10px;
    // padding-bottom: 10px;
    padding: 10px 10%;
    color: var(--secondary-color);
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
    "/cis-scheduler-team-4": "Home",
    "/cis-scheduler-team-4/planner": "Plans",
    "/cis-scheduler-team-4/course-search": "Course Search"
};

export const NavBar = () => {
    const navigate = useNavigate();
    const myLocation = useLocation();

    return (
        <Nav>
            <NavCol>
                {PageTitles[myLocation.pathname] !== "Course Search" && (
                    <Button
                        onClick={() => {
                            if (PageTitles[myLocation.pathname] === "Home") {
                                navigate("/cis-scheduler-team-4/planner");
                            } else {
                                navigate("/cis-scheduler-team-4");
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
                            navigate("cis-scheduler-team-4/course-search");
                        }}
                        className={
                            PageTitles[myLocation.pathname] === "Course Search"
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
                            PageTitles[myLocation.pathname] === "Course Search"
                                ? "btn-danger"
                                : ""
                        }
                    >
                        Back
                    </Button>
                )}
            </NavCol>
        </Nav>
    );
};
