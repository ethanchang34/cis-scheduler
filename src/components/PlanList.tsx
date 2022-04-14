import React from "react";
import { Stack } from "react-bootstrap";
// import { Button } from "react-bootstrap";
import "../App.css";
import { Plan } from "../interfaces/Plan";
import { PlanView } from "./PlanView";

export const PlanList = ({
    plans,
    deletePlan,
    editPlan
}: {
    plans: Plan[];
    deletePlan: (id: number) => void;
    editPlan: (id: number, newPlan: Plan) => void;
}) => {
    return (
        <div>
            <Stack gap={3}>
                {plans.map((plan: Plan) => (
                    <div key={plan.id} className="bg-light border m-2 p-2">
                        <PlanView
                            plan={plan}
                            addPlan={addPlan}
                            deletePlan={deletePlan}
                            editPlan={editPlan}
                        ></PlanView>
                    </div>
                ))}
            </Stack>
        </div>
    );
};
