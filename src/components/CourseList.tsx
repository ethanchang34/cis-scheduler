import React from "react";
import { Stack } from "react-bootstrap";
import { Course } from "../interfaces/Course";
import { CourseView } from "./CourseView";

export const CourseList = ({
    courses,
    deleteCourse,
    modifiedCourses
}: {
    courses: string[];
    deleteCourse: (code: string) => void;
    modifiedCourses: Record<string, Course>;
}) => {
    return (
        <div>
            <Stack gap={3}>
                {courses.map((course: string) => (
                    <div key={course} className="bg-light border m-1 p-2">
                        <CourseView
                            course={course}
                            deleteCourse={deleteCourse}
                            modifiedCourses={modifiedCourses}
                        ></CourseView>
                    </div>
                ))}
            </Stack>
        </div>
    );
};
