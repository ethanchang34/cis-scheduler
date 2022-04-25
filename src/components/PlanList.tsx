import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import "../App.css";
import { Plan } from "../interfaces/Plan";
import { Course } from "../interfaces/Course";
import { PlanView } from "./PlanView";

export const PlanList = ({
    plans,
    addPlan,
    deletePlan,
    editPlan,
    modifiedCourses
}: {
    plans: Plan[];
    addPlan: () => void;
    deletePlan: (id: number) => void;
    editPlan: (id: number, newPlan: Plan) => void;
    modifiedCourses: Record<string, Course>;
}) => {
    const [selectedID, setSelectedID] = useState<number | null>(null);

    const changeSelectedID = (id: number) => {
        if (selectedID === null) {
            setSelectedID(id);
        } else {
            setSelectedID(null);
        }
    };

    return (
        <div>
            {selectedID === null && (
                <div>
                    <Stack gap={3}>
                        {plans.map((plan: Plan) => (
                            <div
                                key={plan.id}
                                className="bg-light border m-2 p-2"
                            >
                                <PlanView
                                    plan={plan}
                                    deletePlan={deletePlan}
                                    editPlan={editPlan}
                                    modifiedCourses={modifiedCourses}
                                    selected={false}
                                ></PlanView>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            fontStyle: "italic",
                                            cursor: "pointer"
                                        }}
                                        onClick={() =>
                                            changeSelectedID(plan.id)
                                        }
                                    >
                                        Click to expand
                                    </span>
                                </div>
                            </div>
                        ))}
                    </Stack>
                    <Button onClick={addPlan}>Add Plan</Button>
                </div>
            )}
            <Stack gap={3}>
                {plans.map((plan: Plan) => (
                    <div key={plan.id}>
                        {plan.id === selectedID && (
                            <div className="bg-light border m-2 p-2">
                                <PlanView
                                    plan={plan}
                                    deletePlan={deletePlan}
                                    editPlan={editPlan}
                                    modifiedCourses={modifiedCourses}
                                    selected={true}
                                ></PlanView>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            fontStyle: "italic",
                                            cursor: "pointer"
                                        }}
                                        onClick={() =>
                                            changeSelectedID(plan.id)
                                        }
                                    >
                                        Click to minimize
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </Stack>
        </div>
    );
};
