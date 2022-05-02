import React, { useState } from "react";
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

export const RequiredCourses = () => {
    const [reqs, setReqs] = useState<Requirement>(REQUIREMENTS);

    /* function addReq(req: string) {
        setReqs([...reqs, req]);
    } */

    /* function deleteReq(req: string) {
        setReqs(reqs.filter((r: string): boolean => req !== r));
    } */

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    textAlign: "left"
                }}
            >
                {reqs.courses.map((course: string) => (
                    <div key={course}>{course}</div>
                ))}
            </div>

            <div>tech: {reqs.tech}</div>
            <div>creative: {reqs.creative}</div>
            <div>history: {reqs.history}</div>
            <div>social: {reqs.social}</div>
            <div>math: {reqs.math}</div>
        </div>
    );
};
