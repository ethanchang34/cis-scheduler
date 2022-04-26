import React from "react";
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
            <h5 className="d-inline" style={{ marginRight: 5 }}>
                {course}
            </h5>
            <i>{modifiedCourses[course].credits} Credits</i>
            <span
                onClick={() => deleteCourse(course)}
                style={{
                    float: "right"
                }}
            >
                ❌
            </span>
        </div>
    );
};
