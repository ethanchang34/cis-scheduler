import React, { useState } from "react";
import { Stack } from "react-bootstrap";
// import { Button } from "react-bootstrap";
import "../App.css";
import { Plan } from "../interfaces/Plan";
import { PlanView } from "./PlanView";

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
    //const [editing, setEditing] = useState<boolean>(false);

    /*function changeEditing() {
        setEditing(!editing);
    }*/

    const [selectedID, setSelectedID] = useState<number | null>(null);

    const changeSelectedID = (id: number) => {
        if (selectedID === null) {
            setSelectedID(id);
        } else {
            setSelectedID(null);
        }
        console.log(selectedID);
    };

    return (
        <div>
            {selectedID === null && (
                <Stack gap={3}>
                    {plans.map((plan: Plan) => (
                        <div
                            key={plan.id}
                            className="bg-light border m-2 p-2"
                            onClick={() => changeSelectedID(plan.id)}
                        >
                            <PlanView
                                plan={plan}
                                addPlan={addPlan}
                                deletePlan={deletePlan}
                                editPlan={editPlan}
                            ></PlanView>
                        </div>
                    ))}
                </Stack>
            )}
            <Stack gap={3}>
                {plans.map((plan: Plan) => (
                    <div key={plan.id}>
                        {plan.id === selectedID && (
                            <div
                                className="bg-light border m-2 p-2"
                                onClick={() => changeSelectedID(plan.id)}
                            >
                                <PlanView
                                    plan={plan}
                                    addPlan={addPlan}
                                    deletePlan={deletePlan}
                                    editPlan={editPlan}
                                ></PlanView>
                            </div>
                        )}
                    </div>
                ))}
            </Stack>
        </div>
    );
};
