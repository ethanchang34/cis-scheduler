import "../App.css";
import React, { useState } from "react";
import { Course } from "../interfaces/Course";
import { PlanList } from "./PlanList";
import { Requirement } from "../interfaces/Requirement";

const REQUIREMENTS: Requirement = {
    courses: [
        "EGGG 101",
        "CISC 108",
        "MATH 241",
        "ENGL 110",
        "CISC 181",
        "CISC 210",
        "MATH 242",
        "CISC 220",
        "CISC 260",
        "MATH 210",
        "CISC 355",
        "CISC 275"
    ],
    tech: 6,
    creative: 3,
    history: 3,
    social: 3,
    math: 3
};

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
    const [reqs /* , setReqs */] = useState<Requirement>(REQUIREMENTS);

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
