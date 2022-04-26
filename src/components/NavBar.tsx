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
    landing,
    flipLanding,
    search,
    flipSearch
}: {
    landing: boolean;
    flipLanding: () => void;
    search: boolean;
    flipSearch: () => void;
}) => {
    const [pageTitle, setPageTitle] = useState<string>("Home");
    const [prevPage, setPrevPage] = useState<string>("Home");
    const navigate = useNavigate();

    return (
        <Nav>
            <NavCol>
                <Button
                    onClick={() => {
                        setPageTitle("Home");
                        navigate("/");
                    }}
                >
                    Home
                </Button>
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
                        className={search ? "btn-danger" : ""}
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
                        className={search ? "btn-danger" : ""}
                    >
                        Back
                    </Button>
                )}
            </NavCol>
        </Nav>
    );
};
