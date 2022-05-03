import React from "react";
import { Requirement } from "../interfaces/Requirement";

export const ReqCoursePlanner = ({ reqs }: { reqs: Requirement }) => {
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
                    Tech: {reqs.tech}
                    {","}&nbsp;
                </div>
                <div>
                    Creative: {reqs.creative}
                    {","}&nbsp;
                </div>
                <div>
                    History: {reqs.history}
                    {","}&nbsp;
                </div>
                <div>
                    Social: {reqs.social}
                    {","}&nbsp;
                </div>
                <div>Math: {reqs.math}</div>
            </div>
        </div>
    );
};
