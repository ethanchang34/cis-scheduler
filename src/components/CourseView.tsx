import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Course } from "../interfaces/Course";

export const CourseView = ({
    course,
    deleteCourse,
    modifiedCourses,
    addToPool
}: {
    course: string;
    deleteCourse: (code: string) => void;
    modifiedCourses: Record<string, Course>;
    addToPool: (course: Course) => boolean;
}) => {
    const [errorMsg, setErrorMsg] = useState<string>("");

    function addPoolHandler() {
        if (addToPool(modifiedCourses[course]) === true) {
            deleteCourse(course);
            setErrorMsg("");
        } else {
            setErrorMsg("Course already in pool");
        }
    }
    return (
        <div>
            <h5 className="d-inline" style={{ marginRight: 5 }}>
                {course}: {modifiedCourses[course].name}
            </h5>
            <i>{modifiedCourses[course].credits} Credits</i>
            <span
                onClick={() => deleteCourse(course)}
                style={{
                    float: "right",
                    cursor: "pointer"
                }}
            >
                ❌
            </span>
            <div>{modifiedCourses[course].descr}</div>
            <Button className="mt-2" onClick={() => addPoolHandler()}>
                Move to Pool
            </Button>
            {errorMsg ? (
                <div
                    className="error-msg"
                    style={{ fontSize: "0.9rem", color: "red" }}
                >
                    *{errorMsg}
                </div>
            ) : null}
        </div>
    );
};
