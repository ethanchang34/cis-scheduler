import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Hero = styled.section`
    background-color: var(--primary-color);
    padding-top: 15vh;
    padding-bottom: 15vh;
    color: var(--secondary-color);
`;

const Title = styled.h1`
    font-size: 3em;
    text-align: center;
`;

const SubTitle = styled.h3`
    font-size: 1.5rem;
    text-align: center;
    line-height: 2.5rem;
`;

export const LandingPage = ({
    setPageTitle,
    setPrevPage
}: {
    setPageTitle: (newTitle: string) => void;
    setPrevPage: (prevTitle: string) => void;
}) => {
    const navigate = useNavigate();
    return (
        <div>
            <Hero>
                <Title>UD CISC Course Schedule Planner</Title>
                <SubTitle>
                    by
                    <br />
                    Aidan Tran, Ethan Chang, Colin Stetler
                </SubTitle>
            </Hero>
            <section style={{ backgroundColor: "var(--secondary-color)" }}>
                <Link to="planner">
                    <Button
                        style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginBottom: "20px",
                            display: "block"
                        }}
                        onClick={() => {
                            setPageTitle("Plans");
                            setPrevPage("Home");
                            navigate("/Planner");
                        }}
                        className="btn-lg"
                    >
                        Get Started!
                    </Button>
                </Link>

                <h2>Freshman?</h2>
                <ul>
                    <li>
                        Click &quot;Get Started&quot; to begin editing your
                        plan!
                    </li>
                    <li>
                        Click &quot;Search Courses&quot; to look for courses!
                    </li>
                </ul>
                <h2>Sophomore?</h2>
                <ul>
                    <li>
                        Click &quot;Get Started&quot; to begin editing your
                        plan!
                    </li>
                    <li>
                        Click &quot;Search Courses&quot; to look for courses!
                    </li>
                </ul>
                <h2>Junior?</h2>
                <ul>
                    <li>
                        Click &quot;Get Started&quot; to begin editing your
                        plan!
                    </li>
                    <li>
                        Click &quot;Search Courses&quot; to look for courses!
                    </li>
                </ul>
            </section>
        </div>
    );
};
