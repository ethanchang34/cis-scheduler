import "../App.css";
import React from "react";
import { Plan } from "../interfaces/Plan";
import { Course } from "../interfaces/Course";
import { PlanList } from "./PlanList";

export const Planner = ({
    plans,
    setPlans,
    modifiedCourses
}: {
    plans: Plan[];
    setPlans: (newPlans: Plan[]) => void;
    modifiedCourses: Record<string, Course>;
}) => {
    return (
        <div>
            <PlanList
                plans={plans}
                setPlans={setPlans}
                modifiedCourses={modifiedCourses}
            ></PlanList>
        </div>
    );
};
