import React, { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import "../App.css";
import { Plan } from "../interfaces/Plan";
import { Course } from "../interfaces/Course";
import { PlanView } from "./PlanView";
import { SectionContent } from "../App";

export const PlanList = ({
    plans,
    addPlan,
    deletePlan,
    editPlan,
    coursePool,
    modifiedCourses,
    addToPool,
    removeFromPool
}: {
    plans: Plan[];
    addPlan: () => void;
    deletePlan: (id: number) => void;
    editPlan: (id: number, newPlan: Plan) => void;
    coursePool: Course[];
    modifiedCourses: Record<string, Course>;
    addToPool: (course: Course) => boolean;
    removeFromPool: (course: Course) => void;
}) => {
    const [selectedID, setSelectedID] = useState<number | null>(() => {
        const saved = localStorage.getItem("CISC275-4-selectedID");
        if (saved) {
            return JSON.parse(saved);
        } else {
            return null;
        }
    });

    useEffect(() => {
        localStorage.setItem(
            "CISC275-4-selectedID",
            JSON.stringify(selectedID)
        );
    }, [selectedID]);

    const changeSelectedID = (id: number) => {
        if (selectedID === null) {
            setSelectedID(id);
        } else {
            setSelectedID(null);
        }
    };

    return (
        <section>
            <SectionContent>
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
                                        coursePool={coursePool}
                                        addToPool={addToPool}
                                        removeFromPool={removeFromPool}
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
                        <div className="text-center">
                            <Button className="m-2" onClick={addPlan}>
                                Add Plan
                            </Button>
                        </div>
                    </div>
                )}
                <Stack gap={3}>
                    {plans.map((plan: Plan) => (
                        <div key={plan.id}>
                            {plan.id === selectedID && (
                                <div className="m-2 p-2">
                                    <PlanView
                                        plan={plan}
                                        deletePlan={deletePlan}
                                        editPlan={editPlan}
                                        modifiedCourses={modifiedCourses}
                                        selected={true}
                                        coursePool={coursePool}
                                        addToPool={addToPool}
                                        removeFromPool={removeFromPool}
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
            </SectionContent>
        </section>
    );
};
