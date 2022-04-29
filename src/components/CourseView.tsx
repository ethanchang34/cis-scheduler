import React from "react";
import { Button } from "react-bootstrap";
import { Course } from "../interfaces/Course";

export const CourseView = ({
    course,
    deleteCourse,
    modifiedCourses
}: {
    course: string;
    deleteCourse: (code: string) => void;
    modifiedCourses: Record<string, Course>;
}) => {
    function handlePoolAdd(course: Course) {
        console.log(course);
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
            <Button
                className="mt-2"
                onClick={() => handlePoolAdd(modifiedCourses[course])}
            >
                Move to Pool
            </Button>
        </div>
    );
};
