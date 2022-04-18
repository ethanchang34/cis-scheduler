import "../App.css";
import React from "react";
import { Stack } from "react-bootstrap";
import { Plan } from "../interfaces/Plan";
import { Course } from "../interfaces/Course";
import { PlanView } from "./PlanView";

export const PlanList = ({
    plans,
    deletePlan,
    editPlan,
    modifiedCourses
}: {
    plans: Plan[];
    deletePlan: (id: number) => void;
    editPlan: (id: number, newPlan: Plan) => void;
    modifiedCourses: Record<string, Course>;
}) => {
    return (
        <div>
            <Stack gap={3}>
                {plans.map((plan: Plan) => (
                    <div key={plan.id} className="bg-light border m-2 p-2">
                        <PlanView
                            plan={plan}
                            deletePlan={deletePlan}
                            editPlan={editPlan}
                            modifiedCourses={modifiedCourses}
                        ></PlanView>
                    </div>
                ))}
            </Stack>
        </div>
    );
};
