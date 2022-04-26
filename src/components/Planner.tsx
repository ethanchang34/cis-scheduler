import "../App.css";
import React from "react";
import { Plan } from "../interfaces/Plan";
import { Course } from "../interfaces/Course";
import { PlanList } from "./PlanList";

export const Planner = ({
    plans,
    addPlan,
    editPlan,
    deletePlan,
    modifiedCourses
}: {
    plans: Plan[];
    addPlan: () => void;
    editPlan: (id: number, newPlan: Plan) => void;
    deletePlan: (id: number) => void;
    modifiedCourses: Record<string, Course>;
}) => {
    return (
        <div>
            <PlanList
                plans={plans}
                addPlan={addPlan}
                editPlan={editPlan}
                deletePlan={deletePlan}
                modifiedCourses={modifiedCourses}
            ></PlanList>
            {/**<div>{plans.map((plan: Plan): string => plan.title)}</div>*/}
        </div>
    );
};
