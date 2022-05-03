import "../App.css";
import React from "react";
import { Plan } from "../interfaces/Plan";
import { Course } from "../interfaces/Course";
import { PlanList } from "./PlanList";
import { RequiredCourses } from "./RequiredCourses";
import styled from "styled-components";

const Table = styled.div`
    border: 1px solid #bfbfbf;
    border-radius: 0.3rem;
`;

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
    return (
        <div>
            <PlanList
                plans={plans}
                setPlans={setPlans}
                modifiedCourses={modifiedCourses}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
            ></PlanList>
            <section>
                <Table>
                    <RequiredCourses></RequiredCourses>
                </Table>
            </section>
        </div>
    );
};
