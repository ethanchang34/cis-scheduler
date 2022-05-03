import React, { useState } from "react";
import { Plan } from "../interfaces/Plan";
import { Year } from "../interfaces/Year";
import { Semester } from "../interfaces/Semester";
import { Requirement } from "../interfaces/Requirement";
import { Course } from "../interfaces/Course";

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
                margin: "10px"
            }}
        >
            <u>Requirements:</u>
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
