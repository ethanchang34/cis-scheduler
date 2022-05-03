import React, { useState } from "react";
import { Course } from "../../interfaces/Course";
import { PlanList } from "./PlanList";
import { Requirement } from "../../interfaces/Requirement";
import { DefaultRequirement } from "../../data/TestData";

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
    const [reqs /* , setReqs */] = useState<Requirement>(DefaultRequirement);

    /* function addReq(req: string) {
        setReqs([...reqs, req]);
    }

    function deleteReq(req: string) {
        setReqs(reqs.filter((r: string): boolean => req !== r));
    } */

    return (
        <div>
            <PlanList
                modifiedCourses={modifiedCourses}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
                reqs={reqs}
            ></PlanList>
        </div>
    );
};
