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
            <p>{course}</p>
            <p>Code:{modifiedCourses[course].code}</p>
            <p>Credits:{modifiedCourses[course].credits}</p>
            <Button onClick={() => deleteCourse(course)}>-</Button>
        </div>
    );
};
