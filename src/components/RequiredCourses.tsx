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
    const [reqs /* , setReqs */] = useState<Requirement>(REQUIREMENTS);

    /* function addReq(req: string) {
        setReqs([...reqs, req]);
    } */

    /* function deleteReq(req: string) {
        setReqs(reqs.filter((r: string): boolean => req !== r));
    } */

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <u>Requirements</u>
            </div>
            <u>Courses:</u>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    textAlign: "left"
                }}
            >
                {reqs.courses.join(", ")}
            </div>
            <br></br>
            <u>Breadth credits:</u>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    textAlign: "left"
                }}
            >
                <div>
                    tech: {reqs.tech}
                    {","}&nbsp;
                </div>
                <div>
                    creative: {reqs.creative}
                    {","}&nbsp;
                </div>
                <div>
                    history: {reqs.history}
                    {","}&nbsp;
                </div>
                <div>
                    social: {reqs.social}
                    {","}&nbsp;
                </div>
                <div>math: {reqs.math}</div>
            </div>
        </div>
    );
};
