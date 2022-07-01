import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { SectionContent } from "../App";

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

export const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Hero>
                <Title>UD CISC Course Schedule Planner</Title>
                <SubTitle>
                    by
                    <br />
                    Ethan Chang, Aidan Tran, Colin Stetler
                </SubTitle>
            </Hero>
            <section style={{ backgroundColor: "var(--secondary-color)" }}>
                <SectionContent>
                    <Link to="planner">
                        <Button
                            style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                marginBottom: "20px",
                                display: "block"
                            }}
                            onClick={() => {
                                navigate("planner");
                            }}
                            className="btn-lg"
                        >
                            Get Started!
                        </Button>
                    </Link>
                    <h2>Tips</h2>
                    <ul>
                        <li>
                            Click &quot;Get Started&quot; to begin editing your
                            plan!
                        </li>
                        <li>
                            Click &quot;Search Courses&quot; to look for
                            courses!
                        </li>
                    </ul>
                    <h2>Freshman?</h2>
                    <ul>
                        <li>Plan out your four years of college</li>
                        <li>
                            Pay attention to the total credits per semester to
                            ensure proper workload
                        </li>
                    </ul>
                    <h2>Sophomore?</h2>
                    <ul>
                        <li>
                            Look at different concentrations and their
                            respective graduation requirements
                        </li>
                    </ul>
                    <h2>Junior?</h2>
                    <ul>
                        <li>
                            Decide on a concentration and check to make sure you
                            will take the correct courses to graduate
                        </li>
                    </ul>
                    <h2>Senior?</h2>
                    <ul>
                        <li>Stay on track to graduate!</li>
                    </ul>
                </SectionContent>
            </section>
        </div>
    );
};
