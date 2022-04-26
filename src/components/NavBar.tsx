import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useNavigate
} from "react-router-dom";

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

export const NavBar = ({
    pageTitle,
    setPageTitle,
    prevPage,
    setPrevPage
}: {
    pageTitle: string;
    setPageTitle: (newTitle: string) => void;
    prevPage: string;
    setPrevPage: (newTitle: string) => void;
}) => {
    const navigate = useNavigate();

    return (
        <Nav>
            <NavCol>
                {pageTitle !== "Course Search" && (
                    <Button
                        onClick={() => {
                            if (pageTitle === "Home") {
                                setPageTitle("Plans");
                                setPrevPage(pageTitle);
                                navigate("Planner");
                            } else {
                                setPageTitle("Home");
                                setPrevPage(pageTitle);
                                navigate("/");
                            }
                        }}
                    >
                        {pageTitle === "Home" ? "Get Started" : "Home"}
                    </Button>
                )}
            </NavCol>
            <NavCol style={{ justifyContent: "center" }}>
                <NavText>{pageTitle}</NavText>
            </NavCol>
            <NavCol>
                {pageTitle !== "Course Search" ? (
                    <Button
                        style={{ marginLeft: "auto", display: "block" }}
                        onClick={() => {
                            setPrevPage(pageTitle);
                            setPageTitle("Course Search");
                            navigate("course-search");
                        }}
                        className={
                            pageTitle === "Course Search" ? "btn-danger" : ""
                        }
                    >
                        Search Courses
                    </Button>
                ) : (
                    <Button
                        style={{ marginLeft: "auto", display: "block" }}
                        onClick={() => {
                            setPageTitle(prevPage);
                            navigate(-1);
                        }}
                        className={
                            pageTitle === "Course Search" ? "btn-danger" : ""
                        }
                    >
                        Back
                    </Button>
                )}
            </NavCol>
        </Nav>
    );
};
