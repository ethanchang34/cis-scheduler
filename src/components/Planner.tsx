import "../App.css";
import React from "react";
import { Course } from "../interfaces/Course";
import { PlanList } from "./PlanList";

export const Planner = ({
    modifiedCourses,
    coursePool,
    addToPool,
    removeFromPool
}: {
    modifiedCourses: Record<string, Course>;
    coursePool: string[];
    addToPool: (course: Course) => boolean;
    removeFromPool: (course: Course) => void;
}) => {
    return (
        <div>
            <PlanList
                modifiedCourses={modifiedCourses}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
            ></PlanList>
        </div>
    );
};
