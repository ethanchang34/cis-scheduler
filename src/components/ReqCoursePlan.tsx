import React from "react";
import { Plan } from "../interfaces/Plan";
import { Year } from "../interfaces/Year";
import { Semester } from "../interfaces/Semester";
import { Requirement } from "../interfaces/Requirement";

export const ReqCoursePlan = ({
    plan,
    reqs
}: {
    plan: Plan;
    reqs: Requirement;
}) => {
    let userCourses: string[] = [];
    return (
        <div
            style={{
                display: "block",
                position: "fixed",
                right: "0",
                top: "25vh",
                marginLeft: "100%",
                padding: "1rem"
            }}
        >
            <u>Requirements</u>
            {plan.years.forEach((year: Year) =>
                year.semesters.forEach((sem: Semester) =>
                    sem.courses.forEach(
                        (course: string) =>
                            (userCourses = [...userCourses, course])
                    )
                )
            )}
            {reqs.courses.map((req: string) =>
                userCourses.includes(req) ? (
                    <div key={req} style={{ color: "green" }}>
                        {req}
                    </div>
                ) : (
                    <div key={req} style={{ color: "black" }}>
                        {req}
                    </div>
                )
            )}
        </div>
    );
};
