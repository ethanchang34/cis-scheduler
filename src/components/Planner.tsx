import React from "react";
import { Button } from "react-bootstrap";
import "../App.css";
import { Plan } from "../interfaces/Plan";
import { PlansList } from "./PlansList";

export const Planner = ({
    plans,
    addPlan,
    editPlan,
    deletePlan
}: {
    plans: Plan[];
    addPlan: () => void;
    editPlan: (id: number, newPlan: Plan) => void;
    deletePlan: (id: number) => void;
}) => {
    return (
        <div>
            <p>You are on the Planner Page</p>
            <Button onClick={addPlan}>+ Add Plan</Button>
            <PlansList
                plans={plans}
                addPlan={addPlan}
                editPlan={editPlan}
                deletePlan={deletePlan}
            ></PlansList>
            {/**<div>{plans.map((plan: Plan): string => plan.title)}</div>*/}
        </div>
    );
};
