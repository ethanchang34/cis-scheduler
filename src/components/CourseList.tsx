import React from "react";
//import { Stack } from "react-bootstrap";
import { Course } from "../interfaces/Course";
//import { CourseView } from "./CourseView";

export const CourseList = ({
    courses,
    //deleteCourse,
    modifiedCourses
}: {
    courses: string[];
    deleteCourse: (code: string) => void;
    modifiedCourses: Record<string, Course>;
}) => {
    return (
        <div>
            {/*<Stack gap={3}>
                {courses.map((course: string) => (
                    <div
                        key={course}
                        className="border m-1 p-3 text-white"
                        style={{
                            backgroundColor: "var(--primary-color)",
                            borderRadius: 20
                        }}
                    >
                        <CourseView
                            course={course}
                            deleteCourse={deleteCourse}
                            modifiedCourses={modifiedCourses}
                        ></CourseView>
                    </div>
                ))}
                    </Stack>*/}
            <ul>
                {courses.map((course: string) => (
                    <li key={course}>{modifiedCourses[course].code}</li>
                ))}
            </ul>
        </div>
    );
};
