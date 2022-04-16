import React from "react";
import { Button } from "react-bootstrap";
import "../App.css";
import { Plan } from "../interfaces/Plan";
import { PlanList } from "./PlanList";

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
            <PlanList
                plans={plans}
                editPlan={editPlan}
                deletePlan={deletePlan}
            ></PlanList>
            <Button onClick={addPlan}>+ Add Plan</Button>
            {/**<div>{plans.map((plan: Plan): string => plan.title)}</div>*/}
        </div>
    );
};
