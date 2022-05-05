import React from "react";
import { Plan } from "../../../interfaces/Plan";
import { Year } from "../../../interfaces/Year";
import { Semester } from "../../../interfaces/Semester";
import { Requirement } from "../../../interfaces/Requirement";
import styled from "styled-components";
import { Course } from "../../../interfaces/Course";

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
        max-height: 84vh;
        overflow-y: auto;
        top: 12vh;
        right: 0;
        max-height: 84vh;
        overflow-y: auto;
        padding: 1rem;
        margin-right: 1rem;
    }

    @media only screen and (min-width: 1530px) {
        left: 50%;
        right: auto;
        transform: translate(568px, 0);
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
        text-align: center;
    }
`;

const ReqListing = styled.p`
    display: block;
    padding: 0 0.5rem;
    margin: 0 auto;
    margin-bottom: 0.5rem;
    border-radius: 5px;
    width: fit-content;
`;
export const ReqCoursePlan = ({
    plan,
    reqs,
    modifiedCourses
}: {
    plan: Plan;
    reqs: Requirement;
    modifiedCourses: Record<string, Course>;
}) => {
    let userCourses: string[] = [];
    let techCredits = 0;
    let creativeCredits = 0;
    let historyCredits = 0;
    let socialCredits = 0;
    let mathCredits = 0;
    const capstone = [0, 0, 0, 0];

    const normalStyle = {
        backgroundColor: "lightpink"
    };
    const completedStyle = {
        backgroundColor: "lightgreen"
    };

    plan.years.forEach((year: Year) =>
        year.semesters.forEach((sem: Semester) =>
            sem.courses.forEach((course: string) => {
                userCourses = [...userCourses, course];
                const myCourse = modifiedCourses[course];
                if (myCourse.code === "CISC 498") {
                    capstone[0] = 1;
                } else if (myCourse.code === "CISC 499") {
                    capstone[1] = 1;
                } else if (myCourse.code === "UNIV 401") {
                    capstone[2] = 1;
                } else if (myCourse.code === "UNIV 402") {
                    capstone[3] = 1;
                }
                if (myCourse.tech) {
                    techCredits += myCourse.credits;
                }
                if (
                    myCourse.subjectArea !== "CISC" &&
                    !reqs.courses.includes(myCourse.code)
                ) {
                    if (myCourse.breadth === "Creative Arts and Humanities") {
                        creativeCredits += myCourse.credits;
                    } else if (
                        myCourse.breadth === "History and Cultural Change"
                    ) {
                        historyCredits += myCourse.credits;
                    } else if (
                        myCourse.breadth === "Social and Behavioral Sciences"
                    ) {
                        socialCredits += myCourse.credits;
                    } else if (
                        myCourse.breadth ===
                        "Mathematics, Natural Sciences and Technology"
                    ) {
                        mathCredits += myCourse.credits;
                    }
                }
            })
        )
    );

    return (
        <FixedRequirements>
            <h5>Requirements</h5>
            <CoursesListDiv>
                {reqs.courses.map((req: string) => (
                    <ReqListing
                        key={req}
                        style={
                            userCourses.includes(req)
                                ? completedStyle
                                : normalStyle
                        }
                    >
                        {req}
                    </ReqListing>
                ))}
            </CoursesListDiv>
            <CoursesListDiv>
                <ReqListing
                    style={
                        (capstone[0] && capstone[1]) ||
                        (capstone[2] && capstone[3])
                            ? completedStyle
                            : normalStyle
                    }
                >
                    Capstone
                </ReqListing>
                <ReqListing
                    style={
                        techCredits >= reqs.tech ? completedStyle : normalStyle
                    }
                >
                    T: {techCredits + "/" + reqs.tech}
                </ReqListing>
                <ReqListing
                    style={
                        creativeCredits >= reqs.creative
                            ? completedStyle
                            : normalStyle
                    }
                >
                    C: {creativeCredits + "/" + reqs.creative}
                </ReqListing>
                <ReqListing
                    style={
                        socialCredits >= reqs.social
                            ? completedStyle
                            : normalStyle
                    }
                >
                    S: {socialCredits + "/" + reqs.social}
                </ReqListing>
                <ReqListing
                    style={
                        historyCredits >= reqs.history
                            ? completedStyle
                            : normalStyle
                    }
                >
                    H: {historyCredits + "/" + reqs.history}
                </ReqListing>
                <ReqListing
                    style={
                        mathCredits >= reqs.math ? completedStyle : normalStyle
                    }
                >
                    M: {mathCredits + "/" + reqs.math}
                </ReqListing>
            </CoursesListDiv>

            <MobileHeader></MobileHeader>
        </FixedRequirements>
    );
};
