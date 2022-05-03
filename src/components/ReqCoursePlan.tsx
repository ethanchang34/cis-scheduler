import React from "react";
import { Plan } from "../interfaces/Plan";
import { Year } from "../interfaces/Year";
import { Semester } from "../interfaces/Semester";
import { Requirement } from "../interfaces/Requirement";
import styled from "styled-components";

const FixedRequirements = styled.div`
    @media only screen and (max-width: 768px) {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    @media only screen and (min-width: 769px) {
        text-align: center;
        border-radius: 8px;
        border: 1px solid var(--tertiary-color);
        display: block;
        position: fixed;
        top: 25vh;
        right: 0;
        padding: 1rem;
        margin-right: 0.75rem;
    }

    @media only screen and (min-width: 1530px) {
        left: 50%;
        right: auto;
        transform: translate(590px, 0);
    }
`;

const MobileHeader = styled.hr`
    @media only screen and (min-width: 769px) {
        display: none;
    }
`;

const CoursesListDiv = styled.div`
    @media only screen and (max-width: 768px) {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
`;

export const ReqCoursePlan = ({
    plan,
    reqs
}: {
    plan: Plan;
    reqs: Requirement;
}) => {
    let userCourses: string[] = [];
    return (
        <FixedRequirements>
            <h5>Requirements</h5>
            {plan.years.forEach((year: Year) =>
                year.semesters.forEach((sem: Semester) =>
                    sem.courses.forEach(
                        (course: string) =>
                            (userCourses = [...userCourses, course])
                    )
                )
            )}
            <CoursesListDiv>
                {reqs.courses.map((req: string) => (
                    <div
                        key={req}
                        style={
                            userCourses.includes(req)
                                ? { color: "green" }
                                : { color: "black" }
                        }
                    >
                        {req}
                    </div>
                ))}
            </CoursesListDiv>

            <MobileHeader></MobileHeader>
        </FixedRequirements>
    );
};
