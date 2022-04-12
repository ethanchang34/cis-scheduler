import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Plan } from "../interfaces/Plan";
import { PlanEdit } from "./PlanEdit";

export const PlanView = ({
    plan,
    //addPlan,
    deletePlan,
    editPlan
}: {
    plan: Plan;
    addPlan: () => void;
    deletePlan: (id: number) => void;
    editPlan: (id: number, newPlan: Plan) => void;
}) => {
    const [editing, setEditing] = useState<boolean>(false);

    function changeEditing() {
        setEditing(!editing);
    }

    return editing ? (
        <PlanEdit
            changeEditing={changeEditing}
            plan={plan}
            editPlan={editPlan}
            deletePlan={deletePlan}
        ></PlanEdit>
    ) : (
        <div>
            <p>Id: {plan.id}</p>
            <p>Title: {plan.title}</p>
            <p>Description: {plan.description}</p>
            <Button className="float-right" size="sm" onClick={changeEditing}>
                Edit
            </Button>
        </div>
    );
};
