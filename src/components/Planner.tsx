import "../App.css";
import React, { useState } from "react";
import { Plan } from "../interfaces/Plan";
import { Course } from "../interfaces/Course";
import { PlanList } from "./PlanList";
import { ReqCoursePlanner } from "./ReqCoursePlanner";
import styled from "styled-components";
import { Requirement } from "../interfaces/Requirement";

const Table = styled.div`
    border: 1px solid #bfbfbf;
    border-radius: 0.3rem;
`;

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
    plans,
    setPlans,
    modifiedCourses,
    coursePool,
    addToPool,
    removeFromPool
}: {
    plans: Plan[];
    setPlans: (newPlans: Plan[]) => void;
    modifiedCourses: Record<string, Course>;
    coursePool: Course[];
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
                plans={plans}
                setPlans={setPlans}
                modifiedCourses={modifiedCourses}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
                reqs={reqs}
            ></PlanList>
            <section>
                <Table>
                    <ReqCoursePlanner reqs={reqs}></ReqCoursePlanner>
                </Table>
            </section>
        </div>
    );
};
