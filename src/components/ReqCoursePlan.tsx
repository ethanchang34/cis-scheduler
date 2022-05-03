import React from "react";
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
            {reqs.courses.map((req: string) =>
                plan.years.map((year: Year) =>
                    year.semesters.map((sem: Semester) =>
                        sem.courses.map((course: string) =>
                            req === course ? (
                                <div style={{ color: "green" }}>{req}</div>
                            ) : null
                        )
                    )
                )
            )}
        </div>
    );
};
