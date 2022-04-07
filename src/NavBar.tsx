import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

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
    const Nav = styled.section`
        background-color: var(--tertiary-color);
        padding-top: 10px;
        padding-bottom: 10px;
        color: var(--secondary-color);
    `;

    return (
        <Nav>
            {!search && (
                <Button onClick={flipLanding}>
                    {landing ? "Get Started" : "Home"}
                </Button>
            )}
            <Button onClick={flipSearch}>
                {search ? "Back" : "Search Courses"}
            </Button>
        </Nav>
    );
};
