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
    coursePool,
    addToPool,
    removeFromPool
}: {
    plans: Plan[];
    addPlan: () => void;
    editPlan: (id: number, newPlan: Plan) => void;
    deletePlan: (id: number) => void;
    modifiedCourses: Record<string, Course>;
    coursePool: Course[];
    addToPool: (course: Course) => boolean;
    removeFromPool: (course: Course) => void;
}) => {
    return (
        <section>
            <PlanList
                plans={plans}
                addPlan={addPlan}
                editPlan={editPlan}
                deletePlan={deletePlan}
                modifiedCourses={modifiedCourses}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
            ></PlanList>
            {/**<div>{plans.map((plan: Plan): string => plan.title)}</div>*/}
        </section>
    );
};
