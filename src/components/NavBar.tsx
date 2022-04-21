import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

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
    return (
        <Nav>
            <NavCol>
                {!search && (
                    <Button onClick={flipLanding}>
                        {landing ? "Get Started" : "Home"}
                    </Button>
                )}
            </NavCol>
            <NavCol style={{ justifyContent: "center" }}>
                <NavText>
                    {search ? "Course Search" : landing ? "Home Page" : "Plans"}
                </NavText>
            </NavCol>
            <NavCol>
                <Button
                    style={{ marginLeft: "auto", display: "block" }}
                    onClick={flipSearch}
                    className={search ? "btn-danger" : ""}
                >
                    {search ? "Back" : "Search Courses"}
                </Button>
            </NavCol>
        </Nav>
    );
};
