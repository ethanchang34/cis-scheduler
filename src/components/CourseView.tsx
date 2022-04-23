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
    return (
        <div>
            <h5 className="d-inline">{course}</h5>
            <i className="d-block" style={{ float: "right" }}>
                Credits:{modifiedCourses[course].credits}
            </i>
            <br></br>
            <Button className="btn-danger" onClick={() => deleteCourse(course)}>
                -
            </Button>
        </div>
    );
};
