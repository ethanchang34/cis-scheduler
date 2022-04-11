import React, { useState } from "react";
import { Stack } from "react-bootstrap";
// import { Button } from "react-bootstrap";
import "../App.css";
import { Plan } from "../interfaces/Plan";

export const PlanList = ({
    plans,
    addPlan,
    deletePlan,
    editPlan
}: {
    plans: Plan[];
    addPlan: () => void;
    deletePlan: (id: number) => void;
    editPlan: (id: number, newPlan: Plan) => void;
}) => {
    const [editing, setEditing] = useState<boolean>(false);

    function changeEditing() {
        setEditing(!editing);
    }

    return (
        <div>
            <p>You are on the PlansList Page</p>
            <Stack gap={3}>
                {plans.map((plan: Plan) => (
                    <div key={plan.id} className="bg-light border m-2 p-2">
                        <p>Id: {plan.id}</p>
                        <p>Title: {plan.title}</p>
                        <p>Description: {plan.description}</p>
                    </div>
                ))}
            </Stack>
        </div>
    );
};
