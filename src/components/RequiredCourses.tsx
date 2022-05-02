import React, { useState } from "react";

const REQUIRED_COURSES = [
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
];

export const RequiredCourses = () => {
    const [reqs, setReqs] = useState<string[]>(REQUIRED_COURSES);

    function addReq(req: string) {
        setReqs([...reqs, req]);
    }

    function deleteReq(req: string) {
        setReqs(reqs.filter((r: string): boolean => req !== r));
    }

    return (
        <div style={{ display: "flex" }}>
            {reqs.map((req: string) => (
                <div key={req}>{req}</div>
            ))}
        </div>
    );
};
