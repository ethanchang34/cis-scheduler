import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./App.css";

export const LandingPage = ({ flipLanding }: { flipLanding: () => void }) => {
    return (
        <div>
            <h1 className="hero">UD CISC Course Schedule Planner</h1>
            <p>
                by
                <br />
                Aidan Tran, Ethan Chang, Colin Stetler
            </p>
            <Button onClick={flipLanding}>Get Started!</Button>
            <h2>Freshman?</h2>
            <ul>
                <li>
                    Click &quot;Get Started&quot; to begin editing your plan!
                </li>
                <li>Click &quot;Search Courses&quot; to look for courses!</li>
            </ul>
            <h2>Sophomore?</h2>
            <ul>
                <li>
                    Click &quot;Get Started&quot; to begin editing your plan!
                </li>
                <li>Click &quot;Search Courses&quot; to look for courses!</li>
            </ul>
            <h2>Junior?</h2>
            <ul>
                <li>
                    Click &quot;Get Started&quot; to begin editing your plan!
                </li>
                <li>Click &quot;Search Courses&quot; to look for courses!</li>
            </ul>
        </div>
    );
};
