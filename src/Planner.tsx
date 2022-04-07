import React from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import { Plan } from "./interfaces/Plan";

export const Planner = ({
    plans,
    addPlan
}: {
    plans: Plan[];
    addPlan: () => void;
}) => {
    return (
        <div>
            <p>You are on the Planner Page</p>
            <Button onClick={addPlan}>+ Add Plan</Button>
            <div>{plans.map((plan: Plan): string => plan.title)}</div>
        </div>
    );
};
