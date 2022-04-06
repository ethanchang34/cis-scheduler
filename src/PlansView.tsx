import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./App.css";

export const PlansView = ({ flipLanding }: { flipLanding: () => void }) => {
    return (
        <div>
            <p>You are on the PlansView Page</p>
            <Button onClick={flipLanding}>Home</Button>
        </div>
    );
};
