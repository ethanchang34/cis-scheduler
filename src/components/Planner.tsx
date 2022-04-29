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
    modifiedCourses,
    downloadPlans
}: {
    plans: Plan[];
    addPlan: () => void;
    editPlan: (id: number, newPlan: Plan) => void;
    deletePlan: (id: number) => void;
    modifiedCourses: Record<string, Course>;
    downloadPlans: () => void;
}) => {
    return (
        <div>
            <PlanList
                plans={plans}
                addPlan={addPlan}
                editPlan={editPlan}
                deletePlan={deletePlan}
                modifiedCourses={modifiedCourses}
                downloadPlans={downloadPlans}
            ></PlanList>
        </div>
    );
};
